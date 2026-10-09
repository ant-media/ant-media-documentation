---
title: Monitoring Ant Media Server with Prometheus
description: Step by step, see every Ant Media Server metric on a live Grafana dashboard, for a single server, a manual cluster, or an autoscaling cluster.
keywords: [Prometheus, Grafana, monitoring, metrics, dashboard, cluster, autoscaling, MongoDB, Ant Media Server]
---

# Monitoring Ant Media Server with Prometheus

Ant Media Server (AMS) constantly measures what it is doing: live streams, viewers, CPU, memory and much more. In this guide you'll turn those numbers into a **live dashboard in your browser**, using two free tools:

- **Prometheus** collects the numbers every 15 seconds and keeps 15 days of history.
- **Grafana** draws them as graphs, with a ready-made Ant Media dashboard.

![The finished Ant Media Server dashboard in Grafana](@site/static/img/monitoring/prometheus/grafana-ams-dashboard-overview.png)

At the end you'll be able to answer questions such as *"How many people are watching right now?"*, *"Is my server running out of CPU or disk?"* and *"Which node in my cluster is struggling?"* at a glance.

## Choose your setup

![Part 1: everything on one AMS server. Part 2: a monitoring server watching a fixed list of nodes. Part 3: a monitoring server that finds nodes automatically through MongoDB.](@site/static/img/monitoring/prometheus/three-setups.svg)

| Your Ant Media Server | Follow | Time |
| --- | --- | --- |
| One server | [Part 1: Standalone server](#part-1-standalone-server) | 15 min |
| A cluster with a fixed set of nodes | [Part 2: Manual cluster](#part-2-manual-cluster) | 20 min |
| A cluster that adds and removes nodes automatically | [Part 3: Autoscaling cluster](#part-3-autoscaling-cluster) | 30 min |

Parts 2 and 3 reuse steps from Part 1, so it helps to read Part 1 first.

**You'll need:** Ubuntu 24.04 servers, SSH access with `sudo`, and permission to change your firewall or cloud security groups.

:::tip How to read the commands
Each code block's title says **where** to run it. After each step, compare your output with **You should see**. Replace anything written like `THIS` with your own value.
:::

---

## Part 1: Standalone server {#part-1-standalone-server}

Everything runs on your AMS server.

### Step 1: Check that AMS publishes metrics

AMS publishes its metrics on port **9090**. This is switched on by default.

```bash title="Run on your AMS server"
curl -s http://127.0.0.1:9090/metrics | grep "^antmedia_streams_live"
```

**You should see** a line ending in a number, the live streams right now:

```text
antmedia_streams_live{antmedia_instance_id="…",antmedia_instance_ip="…",antmedia_private_ip="…"} 0.0
```

:::info Nothing printed?
Make sure `/usr/local/antmedia/conf/red5.properties` contains `prometheus.enabled=true` and `prometheus.port=9090`, then run `sudo systemctl restart antmedia` and try again.
:::

### Step 2: Install Prometheus and Grafana {#install}

Paste this whole block. It installs Prometheus 3.14.0 (and checks that the download isn't damaged) and Grafana:

```bash title="Run on your AMS server"
# --- Prometheus ---
cd ~
sudo apt-get update
sudo apt-get install -y curl ca-certificates apt-transport-https wget gnupg
curl -fLO https://github.com/prometheus/prometheus/releases/download/v3.14.0/prometheus-3.14.0.linux-amd64.tar.gz
printf '%s\n' 'f665c6da19eb7ba399c915d30c7d9793c9b417bf8a749b504bc470678631478d  prometheus-3.14.0.linux-amd64.tar.gz' | sha256sum -c -
tar -xzf prometheus-3.14.0.linux-amd64.tar.gz
sudo install -m 755 prometheus-3.14.0.linux-amd64/prometheus prometheus-3.14.0.linux-amd64/promtool /usr/local/bin/
id prometheus >/dev/null 2>&1 || sudo useradd --system --no-create-home --shell /usr/sbin/nologin prometheus
sudo install -d -o root -g prometheus -m 750 /etc/prometheus
sudo install -d -o prometheus -g prometheus -m 750 /var/lib/prometheus
sudo tee /etc/systemd/system/prometheus.service > /dev/null <<'EOF'
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
EOF

# --- Grafana ---
sudo mkdir -p /etc/apt/keyrings/
wget -q -O - https://apt.grafana.com/gpg.key | gpg --dearmor | sudo tee /etc/apt/keyrings/grafana.gpg > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/grafana.gpg] https://apt.grafana.com stable main" | sudo tee /etc/apt/sources.list.d/grafana.list
sudo apt-get update
sudo apt-get install -y grafana
sudo systemctl daemon-reload
sudo systemctl enable --now grafana-server
systemctl is-active grafana-server
```

**You should see** `prometheus-3.14.0.linux-amd64.tar.gz: OK` near the top and `active` at the end.

:::info Good to know
- Prometheus listens on **9091**, inside the server only, because AMS already uses 9090.
- Prometheus keeps up to **15 GB** of history. If `df -h /` shows less than 20 GB free, change `15GB` to about half your free space in `/etc/systemd/system/prometheus.service`.
:::

### Step 3: Tell Prometheus what to watch

```bash title="Run on your AMS server"
sudo tee /etc/prometheus/prometheus.yml > /dev/null <<'EOF'
global:
  scrape_interval: 15s
  scrape_timeout: 5s

scrape_configs:
  - job_name: antmedia
    metrics_path: /metrics
    static_configs:
      - targets: ['127.0.0.1:9090']
EOF
sudo chown root:prometheus /etc/prometheus/prometheus.yml
sudo chmod 640 /etc/prometheus/prometheus.yml
sudo systemctl enable prometheus && sudo systemctl restart prometheus
```

Wait **20 seconds**, then check that Prometheus can read AMS:

```bash title="Run on your AMS server"
curl -s http://127.0.0.1:9091/api/v1/targets | grep -o '"scrapeUrl":"[^"]*"\|"health":"[a-z]*"'
```

**You should see:**

```text
"scrapeUrl":"http://127.0.0.1:9090/metrics"
"health":"up"
```

### Step 4: Open Grafana and import the dashboard {#grafana}

**1. Allow port 3000 from your own IP address.** On AWS: **EC2 → Security Groups →** your server's group **→ Edit inbound rules → Add rule**, then set **Custom TCP**, port **3000**, source **My IP**, and save. Other clouds have the same setting in their firewall.

![AWS inbound rule: TCP 3000 from My IP](@site/static/img/monitoring/prometheus/aws-security-group-port-3000.png)

**2. Sign in.** Open `http://YOUR_SERVER_IP:3000`, sign in with **admin** / **admin**, and choose a new password.

![Grafana sign-in page](@site/static/img/monitoring/prometheus/grafana-login.png)

**3. Connect Prometheus.** Go to **Connections → Data sources → Add new data source → Prometheus**. Enter `http://127.0.0.1:9091` as the **Prometheus server URL**, scroll down, and click **Save & test**. A green success message appears.

![Prometheus server URL set to http://127.0.0.1:9091](@site/static/img/monitoring/prometheus/grafana-data-source-url.png)

**4. Import the Ant Media dashboard.** Download **[ams-prometheus-grafana-dashboard.json](pathname:///files/ams-prometheus-grafana-dashboard.json)**. In Grafana, go to **Dashboards → New → Import**, upload the file, choose your **Prometheus** data source, and click **Import**.

![Importing the dashboard file in Grafana](@site/static/img/monitoring/prometheus/grafana-import-dashboard.png)

### 🎉 Step 5: Watch it come alive {#come-alive}

Send a 2-minute test stream to your server:

```bash title="Run on your AMS server"
sudo apt-get install -y ffmpeg
timeout 120 ffmpeg -re -f lavfi -i testsrc=size=640x360:rate=25 -f lavfi -i sine=frequency=440 \
  -c:v libx264 -preset veryfast -tune zerolatency -g 50 -c:a aac \
  -f flv rtmp://127.0.0.1/LiveApp/test-stream
```

Within 30 seconds, **Live streams** on your dashboard jumps from **0** to **1**. Open the stream in the AMS web panel and the **viewer** count rises too.

![Live streams rising to 1 during the test stream](@site/static/img/monitoring/prometheus/grafana-ams-dashboard-streaming.png)

**That's it, your server is monitored.** Prometheus keeps recording in the background, even after reboots. Come back to this dashboard any time to see how your server is doing now, or how it did last week.

---

## Part 2: Manual cluster {#part-2-manual-cluster}

A **cluster** is a group of AMS servers (*nodes*) that share the streaming load and a common database. In a **manual cluster** you decide which servers belong to it, and that list rarely changes.

Already have a cluster? Continue below. If not, set one up first:

- [Clustering and Scaling](/guides/clustering-and-scaling/) explains how a cluster works.
- [Cluster Installation](/guides/clustering-and-scaling/manual-configuration/cluster-installation/) is the step-by-step setup.
- [Self-Managed MongoDB](/guides/clustering-and-scaling/supported-databases/scaling-with-mongodb/) sets up the shared database.

For a cluster, run Prometheus and Grafana on a **separate monitoring server**, for example 2 vCPU, 2 GB RAM and a 30 GB disk. If a node crashes, your monitoring keeps running and shows you which one went down. Put it in the **same private network** (on AWS, the same VPC) as your nodes.

### Step 1: Let the monitoring server read each node {#allow-9090}

Every node needs to accept port **9090** from the monitoring server, **and nobody else**, because the metrics page has no password.

On AWS, add this inbound rule to the security group of your **AMS nodes**: **Custom TCP**, port **9090**, source = the **monitoring server's security group** (or its private IP followed by `/32`).

![AMS nodes security group: TCP 9090 allowed from the monitoring server](@site/static/img/monitoring/prometheus/cluster-sg-ams-nodes.png)

Find each node's **private IP** by running `hostname -I` on it. The first address is the private IP. Then, from the monitoring server, test every node:

```bash title="Run on the monitoring server"
curl -s -m 5 http://NODE_PRIVATE_IP:9090/metrics | grep -c "^antmedia_"
```

**You should see** a number, about `12`, for every node. `0` after a 5-second pause means port 9090 is still blocked.

### Step 2: Install Prometheus and Grafana

On the **monitoring server**, run the block from [Part 1, Step 2](#install).

### Step 3: List your nodes

Add one entry per node, using **private** IPs. Never list the load balancer.

```bash title="Run on the monitoring server"
sudo tee /etc/prometheus/prometheus.yml > /dev/null <<'EOF'
global:
  scrape_interval: 15s
  scrape_timeout: 5s

scrape_configs:
  - job_name: antmedia
    metrics_path: /metrics
    static_configs:
      - targets: ['NODE1_PRIVATE_IP:9090']
      - targets: ['NODE2_PRIVATE_IP:9090']
EOF
sudo chown root:prometheus /etc/prometheus/prometheus.yml
sudo chmod 640 /etc/prometheus/prometheus.yml
sudo systemctl enable prometheus && sudo systemctl restart prometheus
```

Wait **20 seconds**, then check:

```bash title="Run on the monitoring server"
curl -s http://127.0.0.1:9091/api/v1/targets | grep -o '"scrapeUrl":"[^"]*"\|"health":"[a-z]*"'
```

**You should see** every node with `"health":"up"`.

When you add or remove a node later, edit this file and run `sudo systemctl reload prometheus`.

### Step 4: Open Grafana

Follow [Part 1, Step 4](#grafana), using the **monitoring server's** public IP and security group.

### 🎉 Your whole cluster on one screen

The **Instance** menu at the top of the dashboard now lists **every node**. Choose **All** to compare them side by side, or pick one to focus on it. Run the test stream from [Part 1, Step 5](#come-alive) on two nodes and watch **Live streams** add up to **2**.

![Instance menu listing every node in the cluster](@site/static/img/monitoring/prometheus/cluster-grafana-instance-dropdown.png)

---

## Part 3: Autoscaling cluster {#part-3-autoscaling-cluster}

An **autoscaling cluster** adds nodes when traffic grows and removes them when it drops. Your cloud does this for you. See [Choose a Clustering and Scaling Option](/guides/clustering-and-scaling/choose-deployment-option/), [AWS CloudFormation](/guides/clustering-and-scaling/aws/aws-cloudformation/scale-with-aws-cloudformation/), [Azure ARM Template](/guides/clustering-and-scaling/azure/scale-with-azure-arm-template/) or [GCP](/guides/clustering-and-scaling/gcp/gcp-cluster-deployment/).

Because nodes come and go, you can't type their addresses into Prometheus. You don't need to: **every AMS node registers itself in the cluster's MongoDB database**. A small program on the monitoring server reads that list every 30 seconds and passes it to Prometheus.

![AMS nodes register in MongoDB. On the monitoring server, a discovery program reads the list, Prometheus collects metrics from every node, and Grafana shows them.](@site/static/img/monitoring/prometheus/cluster-architecture.svg)

This part uses a self-managed MongoDB database. On Kubernetes, see [Collecting Logs and Metrics on Kubernetes](/guides/monitoring/loki-prometheus-setup/) instead.

### Step 1: Prepare the monitoring server

1. Do [Part 2, Step 1](#allow-9090). Using the **security group** as the source matters here, because every new node then gets the rule automatically.
2. Allow the monitoring server to reach MongoDB: in **MongoDB's** security group, allow **TCP 27017** from the monitoring server's security group.
3. Run [Part 1, Step 2](#install) on the monitoring server.

### Step 2: Create a read-only database login

The discovery program needs its own MongoDB login to read the node list. You'll create a new login named **`ams_discovery`** that can **only read**, never change anything.

**1. Sign in to MongoDB as the administrator.** On the **MongoDB server**, run this. Replace `ADMIN_USERNAME` with your MongoDB admin username; MongoDB then asks for the **admin password**:

```bash title="Run on the MongoDB server"
mongosh "mongodb://127.0.0.1:27017/admin" -u ADMIN_USERNAME -p
```

:::info Where is the admin login?
It was created when MongoDB was installed. If you used Ant Media's `install_mongodb.sh --auto-create`, both the username and the password are in the `mongo_credentials.txt` file the script created.
:::

**2. Create the read-only login.** Paste this into the MongoDB shell:

```javascript title="Paste into mongosh"
db.getSiblingDB("admin").createUser({
  user: "ams_discovery",
  pwd: passwordPrompt(),
  roles: [{ role: "read", db: "clusterdb" }]
})
```

MongoDB shows `Enter password:`. **Type a new password for `ams_discovery`** (the screen stays blank while you type), press **Enter**, and **write it down**. You'll need it in the next step.

**You should see** `{ ok: 1 }`. Type `exit`.

You now have a login with username **`ams_discovery`** and the password you just typed.

### Step 3: Install the discovery program

On the **monitoring server**, install what the program needs:

```bash title="Run on the monitoring server"
sudo apt-get install -y python3-pymongo
sudo useradd --system --no-create-home --shell /usr/sbin/nologin --gid prometheus ams-discovery
sudo install -d -o ams-discovery -g prometheus -m 750 /var/lib/prometheus/file_sd
sudo install -d -o root -g prometheus -m 750 /etc/ams-discovery
sudoedit /etc/ams-discovery/environment
```

The last command opens an editor. Paste the following and replace:
- `DISCOVERY_PASSWORD` with the **`ams_discovery` password you typed in Step 2** (not the admin password)
- `MONGODB_PRIVATE_IP` with your MongoDB server's private IP

Then save with **Ctrl+O**, **Enter**, **Ctrl+X**:

```ini
MONGODB_URI="mongodb://ams_discovery:DISCOVERY_PASSWORD@MONGODB_PRIVATE_IP:27017/?authSource=admin"
MONGODB_DATABASE=clusterdb
MONGODB_COLLECTION=clusternode
AMS_METRICS_PORT=9090
MAX_NODE_AGE_SECONDS=300
TARGET_FILE=/var/lib/prometheus/file_sd/antmedia.json
```

If the password contains `@ : / ? # %`, write them as `%40 %3A %2F %3F %23 %25`.

Now install the program and its 30-second timer. Expand the block, copy it, and paste it as a whole:

<details>
<summary><b>Show the install block</b></summary>

```bash title="Run on the monitoring server"
sudo chown root:root /etc/ams-discovery/environment
sudo chmod 600 /etc/ams-discovery/environment

sudo tee /usr/local/bin/ams-prometheus-discovery.py > /dev/null <<'EOF'
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
        # Never log the URI or password. Keep the previous file on failure.
        print(f"Discovery failed ({type(error).__name__}); target file unchanged",
              file=sys.stderr)
        sys.exit(1)
EOF
sudo chmod 755 /usr/local/bin/ams-prometheus-discovery.py

sudo tee /etc/systemd/system/ams-prometheus-discovery.service > /dev/null <<'EOF'
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
EOF

sudo tee /etc/systemd/system/ams-prometheus-discovery.timer > /dev/null <<'EOF'
[Unit]
Description=Refresh AMS Prometheus targets every 30 seconds

[Timer]
OnBootSec=10s
OnUnitActiveSec=30s
AccuracySec=1s
Unit=ams-prometheus-discovery.service

[Install]
WantedBy=timers.target
EOF

sudo systemctl daemon-reload
sudo systemctl start ams-prometheus-discovery.service
sudo systemctl enable --now ams-prometheus-discovery.timer
sudo journalctl -u ams-prometheus-discovery.service -n 1 --no-pager -o cat
sudo -u prometheus cat /var/lib/prometheus/file_sd/antmedia.json
```

</details>

**You should see** `Exported 2 AMS targets` (one per running node), followed by a list of your nodes' private IPs, like this:

```json
[
  { "targets": ["172.31.1.195:9090"], "labels": { "ams_node_ip": "172.31.1.195" } },
  { "targets": ["172.31.36.209:9090"], "labels": { "ams_node_ip": "172.31.36.209" } }
]
```

### Step 4: Point Prometheus at the discovered nodes

```bash title="Run on the monitoring server"
sudo tee /etc/prometheus/prometheus.yml > /dev/null <<'EOF'
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
EOF
sudo chown root:prometheus /etc/prometheus/prometheus.yml
sudo chmod 640 /etc/prometheus/prometheus.yml
sudo systemctl enable prometheus && sudo systemctl restart prometheus
```

Wait **30 seconds**, then run the same check as before:

```bash title="Run on the monitoring server"
curl -s http://127.0.0.1:9091/api/v1/targets | grep -o '"scrapeUrl":"[^"]*"\|"health":"[a-z]*"'
```

**You should see** every node with `"health":"up"`. Then open Grafana as in [Part 1, Step 4](#grafana).

### 🎉 Watch your monitoring follow the cluster

This is the reward. Stop AMS on one node:

```bash title="Run on any AMS node"
sudo systemctl stop antmedia
```

Within **30 seconds** the node disappears from the dashboard. Nothing to edit, nothing to reload.

![The dashboard after one node was stopped](@site/static/img/monitoring/prometheus/cluster-grafana-node-removed.png)

Start it again with `sudo systemctl start antmedia`, and within 30 seconds it's back. New nodes created by autoscaling appear the same way. **Your monitoring now grows and shrinks with your cluster, on its own.**

:::tip If a node crashes
A node that stops normally disappears right away. A node that **crashes** stays on the dashboard with **Scrape target up = 0** for 5 minutes before it is removed, so you notice it. That's a good moment to [create a Grafana alert](https://grafana.com/docs/grafana/latest/alerting/) on `up{job="antmedia"} == 0`.
:::

---

## What's on the dashboard

The dashboard shows every metric AMS publishes. Use **Instance** to pick a server and the time picker (top right) to look back up to 15 days.

| Section | What it tells you | Watch out for |
| --- | --- | --- |
| **Overview** | Up/down, streams, viewers, CPU, uptime | **Scrape target up** = `0`: Prometheus can't reach that server |
| **Streaming** | Streams, viewers per protocol, encoder problems, publish timeouts | Blocked encoders or publish timeouts above `0` |
| **System / host** | CPU, load, memory, disk, open files | CPU near 100% or disk almost full |
| **JVM memory & GC** | Memory and pauses inside the Java engine that runs AMS | Heap **used** close to **max**; long GC pauses |
| **Logging** | Error and warning messages per second | A sudden rise in **error** |

To see the raw numbers, run `curl -s http://127.0.0.1:9090/metrics` on any AMS server.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| A target shows `"health":"down"` | AMS is stopped on that server, or port 9090 is blocked from Prometheus. Run `systemctl is-active antmedia` on the node and recheck the security group. |
| Grafana doesn't open on port 3000 | Check the port 3000 rule and that it uses your **current** IP. Check `systemctl is-active grafana-server`. |
| **Save & test** fails in Grafana | The URL must be exactly `http://127.0.0.1:9091`, and `systemctl is-active prometheus` must say `active`. |
| Dashboard says **No data** | Set **Instance** to **All** and the time range to **Last 15 minutes**. Make sure you picked the Prometheus data source when importing. |
| `Discovery failed (ServerSelectionTimeoutError)` | The monitoring server can't reach MongoDB on 27017. Check MongoDB's security group. |
| `Discovery failed (OperationFailure)` | Wrong password in `/etc/ams-discovery/environment`, or special characters not encoded. |
| A security-group IP range doesn't work | The range must contain the servers' **private** IPs: `172.0.0.0/16` does **not** include `172.31.5.10`, but `172.31.0.0/16` does. Using a security group as the source avoids this. |
