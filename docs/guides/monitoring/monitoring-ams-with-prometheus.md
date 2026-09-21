---
title: Monitoring Ant Media Server with Prometheus
description: Monitor a single Ant Media Server, a fixed cluster, or a scaling cluster using cloud service discovery or MongoDB-based file discovery.
keywords: [Prometheus, Grafana, monitoring, cluster, MongoDB, service discovery, Ant Media Server]
---

# Monitoring Ant Media Server with Prometheus

Ant Media Server (AMS) exposes standard Prometheus metrics by default at `http://AMS_ADDRESS:9090/metrics`. [Prometheus](https://prometheus.io/) collects and stores these metrics, while [Grafana](https://grafana.com/oss/grafana/) queries Prometheus to display them in dashboards.

**Scraping** means that Prometheus periodically sends an HTTP request to an AMS `/metrics` endpoint and records the returned values. Prometheus initiates these requests; AMS does not push metrics to Prometheus. This guide uses a scrape interval of 15 seconds.

![Monitoring architecture: Prometheus pulls metrics from AMS nodes and supplies query results to Grafana. Target addresses come from a static list, cloud discovery, or MongoDB registration exported to a JSON file.](@site/static/img/prometheus-monitoring-architecture.svg)

The solid arrows show metric data flowing from AMS through Prometheus to Grafana. The dashed arrows show the alternative sources of **target addresses**—the servers Prometheus should scrape. Choose one target source for a set of nodes; service discovery updates that list as nodes join or leave. With MongoDB discovery, the exporter reads node registration records and writes the target file; metrics still come directly from AMS.

Choose a target configuration for your deployment:

| Deployment | Target configuration |
| --- | --- |
| One AMS instance | One entry in `static_configs` |
| A cluster with a fixed set of nodes | One static entry per node |
| A cluster that adds and removes nodes | Cloud service discovery, or MongoDB node registration exported to `file_sd_configs` |

The installation steps are shared. Choose the scenario below that matches your deployment. For a scaling cluster, first choose between provider discovery and the MongoDB alternative.

## Before you begin

These examples use Ubuntu 24.04, systemd, and a Prometheus process running directly on a server. You need sudo access to install services. The cluster scenarios require an existing [AMS Enterprise cluster](../clustering-and-scaling/manual-configuration/cluster-installation.md).

These examples scrape the AMS nodes at their registered public IP addresses and restrict metrics access to the monitoring server’s public source IP. MongoDB remains on the private network. Replace the documentation-only addresses below with your own:

| Component | Example address |
| --- | --- |
| AMS node 1 (public) | `203.0.113.11` |
| AMS node 2 (public) | `203.0.113.12` |
| MongoDB (private) | `10.0.0.20` |
| Monitoring host (public source IP) | `198.51.100.30` |
| Monitoring host (private, for MongoDB access) | `10.0.0.30` |

## 1. Enable and check AMS metrics

On each AMS host, check `/usr/local/antmedia/conf/red5.properties`:

```properties
prometheus.enabled=true
prometheus.port=9090
```

These are the default settings. If you change the configuration, restart AMS, then check the endpoint:

```bash
sudo systemctl restart antmedia
curl --fail http://127.0.0.1:9090/metrics
```

A successful response contains Prometheus text metrics such as `antmedia_streams_live`, `antmedia_viewers_webrtc`, and JVM metrics. Metrics are served on the dedicated port, not at `http://localhost:5080/metrics`.

Allow TCP 9090 **from the monitoring host only**. For example, with UFW on each AMS host:

```bash
sudo ufw allow from 198.51.100.30 to any port 9090 proto tcp
```

This assumes your firewall already denies other incoming connections to that port. Apply the same restriction in any cloud firewall. The native AMS metrics endpoint does not use the dashboard login, so restrict access to the monitoring host rather than opening the port to everyone. If the monitoring host uses outbound NAT, allow its actual public egress IP.

From the monitoring host, verify the route you will actually scrape:

```bash
curl --fail http://203.0.113.11:9090/metrics
```

Repeat for every node in a fixed cluster. New instances in a scaling cluster need the same AMS configuration and firewall rule in their provisioning template.

## 2. Install Prometheus

The following is an example installation for a **new monitoring host**, using the Linux amd64 Prometheus 3.14.0 package used for this deployment. Choose the appropriate architecture and a supported version from the [Prometheus downloads page](https://prometheus.io/download/), and verify its published checksum if you use a different package.

```bash
sudo apt-get update
sudo apt-get install -y curl ca-certificates

curl -fLO https://github.com/prometheus/prometheus/releases/download/v3.14.0/prometheus-3.14.0.linux-amd64.tar.gz
printf '%s\n' 'f665c6da19eb7ba399c915d30c7d9793c9b417bf8a749b504bc470678631478d  prometheus-3.14.0.linux-amd64.tar.gz' | sha256sum -c -
tar -xzf prometheus-3.14.0.linux-amd64.tar.gz
sudo install -m 755 prometheus-3.14.0.linux-amd64/prometheus prometheus-3.14.0.linux-amd64/promtool /usr/local/bin/

sudo useradd --system --no-create-home --shell /usr/sbin/nologin prometheus
sudo install -d -o root -g prometheus -m 750 /etc/prometheus
sudo install -d -o prometheus -g prometheus -m 750 /var/lib/prometheus
```

Create `/etc/systemd/system/prometheus.service`:

```ini
[Unit]
Description=Prometheus
Wants=network-online.target
After=network-online.target

[Service]
User=prometheus
Group=prometheus
ExecStart=/usr/local/bin/prometheus --config.file=/etc/prometheus/prometheus.yml --storage.tsdb.path=/var/lib/prometheus --storage.tsdb.retention.time=15d --storage.tsdb.retention.size=15GB --web.listen-address=127.0.0.1:9091
ExecReload=/bin/kill -HUP $MAINPID
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

This guide binds the **Prometheus UI/API to localhost port 9091**. AMS keeps its metrics endpoint on **9090**, so both processes can run on the same machine without a port conflict. On a dedicated monitoring server you can instead use Prometheus's default port 9090; adjust UI URLs and the Grafana data source accordingly.

Keep the Prometheus UI private, or use an authenticated TLS endpoint for remote access. See [Prometheus HTTPS and authentication](https://prometheus.io/docs/prometheus/latest/configuration/https/). Grafana installed on this same host can query the loopback address directly.

## 3. Choose your target configuration

Save the configuration for your scenario as `/etc/prometheus/prometheus.yml`. The examples deliberately use the same `job_name: antmedia`, so queries work across all three scenarios.

### Scenario A: A single server

When Prometheus runs on the AMS host:

```yaml
global:
  scrape_interval: 15s
  scrape_timeout: 5s

scrape_configs:
  - job_name: antmedia
    metrics_path: /metrics
    static_configs:
      - targets: ['127.0.0.1:9090']
        labels:
          deployment: standalone
```

If Prometheus runs on a separate host, replace `127.0.0.1` with the AMS host's registered public address, for example `203.0.113.11`. Loopback addresses refer to the machine running Prometheus.

### Scenario B: A fixed cluster

List **every AMS node**, not the load balancer. Scraping a load balancer can alternate between nodes and produce misleading time series.

```yaml
global:
  scrape_interval: 15s
  scrape_timeout: 5s

scrape_configs:
  - job_name: antmedia
    metrics_path: /metrics
    static_configs:
      - targets: ['203.0.113.11:9090']
        labels:
          cluster: production
          node: ams-node1
      - targets: ['203.0.113.12:9090']
        labels:
          cluster: production
          node: ams-node2
```

Edit this list and reload Prometheus whenever a node is added or removed. Both nodes should appear as separate targets, each with its own `instance` label.

### Scenario C: A scaling cluster

#### Choose a service discovery mechanism

The Prometheus ecosystem includes dedicated discovery mechanisms for **AWS, Azure, GCP, and OVHcloud**. Consider the provider integration first when your AMS nodes run on one of these platforms:

| Platform | Prometheus discovery configuration | Resources |
| --- | --- | --- |
| AWS | [`ec2_sd_configs`](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#ec2_sd_config) | EC2 instances |
| Azure | [`azure_sd_configs`](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#azure_sd_config) | Virtual machines, including VM scale sets |
| GCP | [`gce_sd_configs`](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#gce_sd_config) | Compute Engine instances |
| OVHcloud VPS / dedicated servers | [`ovhcloud_sd_configs`](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#ovhcloud_sd_config) | VPS and dedicated server inventory |
| OVHcloud Public Cloud | [`openstack_sd_configs`](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#openstack_sd_config) | Public Cloud instances through OpenStack discovery, using the `instance` role |

These integrations refresh targets from the provider API as infrastructure changes. Configure the required API read permissions, filter the inventory to your AMS nodes using provider filters or relabeling, and select reachable addresses with metrics port **9090** and path **`/metrics`**. Discovery does not enable the AMS endpoint or open network access.

Do not scrape the same nodes through both provider discovery and the MongoDB job below. Choose one mechanism for that set of nodes to avoid duplicate collection.

#### Alternative: Discover nodes from MongoDB registration

If you are not using a provider-specific discovery mechanism, **AMS cluster node registration in MongoDB is an alternative source of targets**. This works independently of the hosting provider, including on-premises and mixed environments, as long as Prometheus can reach the registered nodes and the discovery process can read the shared database.

Run a small exporter on the monitoring host. It periodically reads the AMS node registry from MongoDB and writes a JSON target list for Prometheus file-based service discovery. The exporter discovers **addresses**; Prometheus still retrieves metrics directly from AMS, not from MongoDB.

The following steps implement this alternative. It is a separately managed script and timer, not a built-in AMS discovery service. The recipe was deployed on a two-node Ubuntu cluster: repeated exports produced both targets and Prometheus successfully scraped them. Check the registry schema against your installed version before using it.

#### Check the registry and network access

The implementation used here stores nodes in **`clusterdb.clusternode`**:

- `ip`: the address registered by AMS.
- `lastUpdateTime`: the node heartbeat timestamp, as Unix epoch **milliseconds**.
- The displayed node `status` is calculated by AMS; it is **not** a stored field to query.

Confirm the database and collection with an authenticated `mongosh` session:

```javascript
db.getSiblingDB("clusterdb").clusternode.find(
  {}, { _id: 1, ip: 1, lastUpdateTime: 1 }
).limit(5)
```

The monitoring host needs access to MongoDB TCP 27017 as well as AMS TCP 9090. For example, on a MongoDB host using UFW:

```bash
sudo ufw allow from 10.0.0.30 to any port 27017 proto tcp
```

MongoDB must listen on the private interface. Keep other sources blocked and use authentication. Synchronize the clocks on the AMS, database, and monitoring hosts so heartbeat ages are meaningful.

:::note Scrape the registered addresses directly
The exporter uses the `ip` stored in each MongoDB node record as the scrape address. In this setup those are the nodes' public IPs, even though MongoDB connections use the private network. No separate address map is needed.

Provision each new node with its correct advertised IP, the metrics endpoint enabled, and TCP 9090 allowed from the monitoring server's public source IP. Registration in MongoDB then makes it discoverable automatically. Discovery does not change firewall rules or network routing.
:::

#### Create a database account for discovery

In an administrative MongoDB session, create a user with read access to the cluster database:

```javascript
use admin
db.createUser({
  user: "ams_discovery",
  pwd: passwordPrompt(),
  roles: [{ role: "read", db: "clusterdb" }]
})
```

The exporter does not need the AMS application's write privileges or MongoDB administrator credentials. MongoDB's [built-in roles](https://www.mongodb.com/docs/manual/reference/built-in-roles/) allow access to be scoped to the database.

#### Install the exporter

On the monitoring host:

```bash
sudo apt-get -o DPkg::Lock::Timeout=180 install -y python3-pymongo
sudo useradd --system --no-create-home --shell /usr/sbin/nologin --gid prometheus ams-discovery
sudo install -d -o ams-discovery -g prometheus -m 750 /var/lib/prometheus/file_sd
sudo install -d -o root -g prometheus -m 750 /etc/ams-discovery
```

Create `/etc/ams-discovery/environment` using `sudoedit`:

```ini
MONGODB_URI="mongodb://ams_discovery:REPLACE_WITH_URL_ENCODED_PASSWORD@10.0.0.20:27017/?authSource=admin"
MONGODB_DATABASE=clusterdb
MONGODB_COLLECTION=clusternode
AMS_METRICS_PORT=9090
MAX_NODE_AGE_SECONDS=300
TARGET_FILE=/var/lib/prometheus/file_sd/antmedia.json
```

Percent-encode reserved characters in the URI password. Use the TLS options and CA required by your MongoDB deployment. The connection URI supports these [PyMongo connection options](https://www.mongodb.com/docs/languages/python/pymongo-driver/current/connect/connection-options/).

Protect the file; systemd reads it before switching to the service user:

```bash
sudo chown root:root /etc/ams-discovery/environment
sudo chmod 600 /etc/ams-discovery/environment
```

Save this script as `/usr/local/bin/ams-prometheus-discovery.py`:

```python
#!/usr/bin/python3
import ipaddress
import json
import os
from pathlib import Path
import sys
import tempfile
import time

from pymongo import MongoClient


def export_targets():
    output = Path(os.environ["TARGET_FILE"])
    port = int(os.environ.get("AMS_METRICS_PORT", "9090"))
    max_age = int(os.environ.get("MAX_NODE_AGE_SECONDS", "300"))
    if not 1 <= port <= 65535 or max_age <= 0:
        raise ValueError("Invalid port or heartbeat age")
    cutoff_ms = int(time.time() * 1000) - max_age * 1000

    with MongoClient(
        os.environ["MONGODB_URI"],
        serverSelectionTimeoutMS=5000,
        connectTimeoutMS=5000,
        socketTimeoutMS=10000,
    ) as client:
        database = client[os.environ.get("MONGODB_DATABASE", "clusterdb")]
        collection = os.environ.get("MONGODB_COLLECTION", "clusternode")
        if collection not in database.list_collection_names():
            raise ValueError("Node registry collection does not exist")
        # Finish reading before opening a replacement target file.
        nodes = list(database[collection].find(
            {"lastUpdateTime": {"$gte": cutoff_ms}},
            {"_id": 0, "ip": 1},
        ))

    targets = []
    seen = set()
    for node in nodes:
        node_ip = ipaddress.ip_address(node["ip"])
        host = f"[{node_ip}]" if node_ip.version == 6 else str(node_ip)
        address = f"{host}:{port}"
        if address in seen:
            continue
        seen.add(address)
        targets.append({
            "targets": [address],
            "labels": {"ams_node_ip": str(node_ip)},
        })
    targets.sort(key=lambda group: group["targets"][0])

    temporary = None
    try:
        # Same-directory rename gives Prometheus a complete JSON file at once.
        with tempfile.NamedTemporaryFile(
            mode="w", dir=output.parent, prefix=".antmedia-", delete=False
        ) as handle:
            temporary = Path(handle.name)
            os.fchmod(handle.fileno(), 0o640)
            json.dump(targets, handle, indent=2)
            handle.write("\n")
            handle.flush()
            os.fsync(handle.fileno())
        os.replace(temporary, output)
    finally:
        if temporary is not None and temporary.exists():
            temporary.unlink()
    print(f"Exported {len(targets)} AMS targets")


if __name__ == "__main__":
    try:
        export_targets()
    except Exception as error:
        # Do not log the URI or credentials. Keep the previous file on failure.
        print(f"Discovery failed ({type(error).__name__}); target file unchanged",
              file=sys.stderr)
        sys.exit(1)
```

```bash
sudo chown root:root /usr/local/bin/ams-prometheus-discovery.py
sudo chmod 755 /usr/local/bin/ams-prometheus-discovery.py
```

A successful query with no recent nodes writes `[]`, removing the discovered targets. A connection failure, invalid address, or missing collection leaves the previous file in place and makes the service fail visibly. This distinction prevents a database outage from silently erasing the target list.

The five-minute age limit is an **exporter policy**, not the AMS dashboard's alive/dead threshold. It allows a failed node to remain visible as `up == 0` for a while before removal. After a target is removed, its `up` series becomes stale: do not rely solely on a long-duration `up == 0` alert to detect disappeared nodes. Monitor discovery failures and expected cluster capacity separately.

#### Schedule the export

Create `/etc/systemd/system/ams-prometheus-discovery.service`:

```ini
[Unit]
Description=Export AMS cluster nodes for Prometheus
Wants=network-online.target
After=network-online.target

[Service]
Type=oneshot
User=ams-discovery
Group=prometheus
EnvironmentFile=/etc/ams-discovery/environment
ExecStart=/usr/bin/python3 /usr/local/bin/ams-prometheus-discovery.py
TimeoutStartSec=30
UMask=0027
NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=true
PrivateTmp=true
ReadWritePaths=/var/lib/prometheus/file_sd
```

Create `/etc/systemd/system/ams-prometheus-discovery.timer`:

```ini
[Unit]
Description=Refresh AMS Prometheus targets every 30 seconds

[Timer]
OnBootSec=10s
OnUnitActiveSec=30s
AccuracySec=1s
Unit=ams-prometheus-discovery.service

[Install]
WantedBy=timers.target
```

Generate the first file and enable periodic refresh:

```bash
sudo systemctl daemon-reload
sudo systemctl start ams-prometheus-discovery.service
sudo -u prometheus cat /var/lib/prometheus/file_sd/antmedia.json
sudo systemctl enable --now ams-prometheus-discovery.timer
```

Before switching an existing Prometheus job from static targets to file discovery, confirm that this command succeeds and the generated file contains the expected nodes. `promtool check config` alone only warns if a discovery file is missing.

Example output:

```json
[
  {"targets": ["203.0.113.11:9090"], "labels": {"ams_node_ip": "203.0.113.11"}},
  {"targets": ["203.0.113.12:9090"], "labels": {"ams_node_ip": "203.0.113.12"}}
]
```

The target address and `ams_node_ip` label both come directly from the registered node IP.

#### Configure file-based discovery

Use this `/etc/prometheus/prometheus.yml`:

```yaml
global:
  scrape_interval: 15s
  scrape_timeout: 5s

scrape_configs:
  - job_name: antmedia
    metrics_path: /metrics
    file_sd_configs:
      - files:
          - /var/lib/prometheus/file_sd/antmedia.json
        refresh_interval: 30s
```

Prometheus watches the target file for changes and also refreshes it periodically. Changing the JSON target list does **not** require a Prometheus restart or configuration reload. See the [file-based service discovery guide](https://prometheus.io/docs/guides/file-sd/) and [`file_sd_configs` reference](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#file_sd_config).

## 4. Start Prometheus and check targets

After saving your chosen configuration:

```bash
sudo chown root:prometheus /etc/prometheus/prometheus.yml
sudo chmod 640 /etc/prometheus/prometheus.yml
sudo -u prometheus promtool check config /etc/prometheus/prometheus.yml
sudo systemctl daemon-reload
sudo systemctl enable --now prometheus
```

If Prometheus was already running, apply changes to `prometheus.yml` with:

```bash
sudo -u prometheus promtool check config /etc/prometheus/prometheus.yml && sudo systemctl reload prometheus
```

Check targets locally:

```bash
curl --fail http://127.0.0.1:9091/api/v1/targets
curl --fail --get --data-urlencode 'query=up{job="antmedia"}' http://127.0.0.1:9091/api/v1/query
```

Each expected target should have `health: "up"`; the query should return `1` for each node. To open the private UI from your workstation, use an SSH tunnel:

```bash
ssh -L 9091:127.0.0.1:9091 ubuntu@MONITORING_HOST
```

Then open `http://localhost:9091` and view the targets page.

For discovery problems, inspect the exporter separately:

```bash
sudo journalctl -u ams-prometheus-discovery.service -n 30 --no-pager
systemctl list-timers ams-prometheus-discovery.timer
sudo stat /var/lib/prometheus/file_sd/antmedia.json
```

## 5. Display metrics in Grafana

Install Grafana on the monitoring host using the [official Ubuntu installation instructions](https://grafana.com/docs/grafana/latest/setup-grafana/installation/debian/), then enable its service:

```bash
sudo systemctl enable --now grafana-server
```

Sign in to Grafana, change the initial password, and add a **Prometheus** data source with URL `http://127.0.0.1:9091`. Select **Save & test**. If you chose another Prometheus port or enabled authentication, use that port and configure the corresponding credentials in the data source.

This loopback URL assumes Grafana and Prometheus are native services on the same host. With separate hosts or containers, use an address reachable from the Grafana process.

Useful panel queries include:

| Panel | PromQL |
| --- | --- |
| Metrics endpoint availability | `up{job="antmedia"}` |
| Total live streams | `sum(antmedia_streams_live{job="antmedia"})` |
| WebRTC viewers per node | `antmedia_viewers_webrtc{job="antmedia"}` |
| HLS viewers per node | `antmedia_viewers_hls{job="antmedia"}` |
| Process CPU usage | `process_cpu_usage{job="antmedia"}` |
| JVM heap memory used | `sum by (instance) (jvm_memory_used_bytes{job="antmedia",area="heap"})` |

Use `{{instance}}` as a per-node legend. CPU usage is a ratio; use Grafana's **Percent (0.0–1.0)** unit. Stream and viewer counts are gauges: zero is valid when the server is idle.

## Troubleshooting

| Symptom | What to check |
| --- | --- |
| Connection refused on 9090 | Confirm the AMS build includes Prometheus, then inspect `sudo ss -lntp` and AMS startup logs. |
| `/metrics` returns 404 on 5080 | Use the dedicated metrics port, normally 9090. |
| Port already in use | AMS and Prometheus cannot both bind the same address and port. Use 9091 for the Prometheus UI when colocated. |
| Metrics worked before an upgrade but stopped | Check the connector in `conf/jee-container.xml` and servlet mapping in `webapps/root/WEB-INF/web.xml`. Restoring an older connector file can discard the new metrics listener. |
| Local metrics work but the target is down | Check routing, host/cloud firewalls, the monitoring host’s public egress IP, and the exact target address. |
| Discovery has no targets | Confirm the database, `clusternode` collection, millisecond heartbeat values, time synchronization, and age cutoff. |
| Target file stops changing | Check the timer, database read permissions, MongoDB connectivity, and exporter directory ownership. The previous file intentionally survives a failed export. |
| New node is discovered but its public endpoint is unreachable | Ensure its registered IP is correct and allow TCP 9090 from the monitoring host’s public source IP in both host and cloud firewalls. |
| Grafana is empty, but Prometheus is healthy | Check the data source URL from Grafana's host, the time range, and the metric/job names in the query. |
