---
title: Monitoring an Ant Media Server Cluster with Prometheus
description: A beginner-friendly, step-by-step guide to building an Ant Media Server cluster with MongoDB and monitoring every node automatically with Prometheus and Grafana.
keywords: [Prometheus, Grafana, cluster, MongoDB, service discovery, monitoring, Ant Media Server]
---

# Monitoring an Ant Media Server Cluster with Prometheus

This guide starts from empty servers. It builds a two-node Ant Media Server (AMS) cluster and sets up monitoring that **finds every node automatically**. When you add or remove a server, the dashboard follows on its own, with no configuration to edit.

Every step includes the exact commands to copy and paste and what you should see before moving on.

:::tip Monitoring only one server?
Follow [Monitoring Ant Media Server with Prometheus](/guides/monitoring/monitoring-ams-with-prometheus/) instead. It is shorter and runs everything on one machine.
:::

## What you'll have at the end

One Grafana dashboard that shows **all your AMS nodes together**: streams, viewers, CPU, memory and more. You can look at each node on its own or at all of them at once.

![Grafana dashboard showing two AMS nodes, with a live stream on each](@site/static/img/monitoring/prometheus/cluster-grafana-dashboard-two-nodes.png)

You will also see the monitoring **adapt by itself**. Stop a node and it disappears from the dashboard within 30 seconds. Start it again and it comes back.

## How it works

![Two AMS nodes register in MongoDB. On the monitoring server, a discovery program reads that list and tells Prometheus which nodes to collect from. Grafana shows the results in your browser.](@site/static/img/monitoring/prometheus/cluster-architecture.svg)

You will use **four servers**:

| Server | What runs on it | Its job |
| --- | --- | --- |
| **MongoDB** | MongoDB database | The cluster's shared database. Every AMS node writes its address here and updates a "heartbeat" every few seconds. |
| **AMS node 1** | Ant Media Server | Streaming. Publishes metrics on port 9090. |
| **AMS node 2** | Ant Media Server | Streaming. Publishes metrics on port 9090. |
| **Monitoring** | Prometheus, Grafana, and a small discovery program | Every 30 seconds, the discovery program reads the node list from MongoDB. Prometheus collects metrics from every node on that list, and Grafana draws the dashboard. |

:::info Why a separate monitoring server?
If monitoring ran on an AMS node and that node crashed, you would lose your monitoring exactly when you need it. A separate server keeps recording and shows you which node went down. It also keeps monitoring from using CPU and memory that your streams need.
:::

## Before you begin

You need:

- [ ] **Four Ubuntu 24.04 servers** in the **same private network**. On AWS, that means the same VPC, which is the default if you don't change it. Suggested sizes:

  | Server | Size (AWS example) | Disk |
  | --- | --- | --- |
  | MongoDB | 2 vCPU, 2 GB RAM (t3.small) | 20 GB |
  | AMS node 1 and node 2 | 4 vCPU, 8 GB RAM or more (c5.xlarge) | 30 GB |
  | Monitoring | 2 vCPU, 2 GB RAM (t3.small) | **30 GB** (Prometheus stores up to 15 GB of history) |

- [ ] An **Ant Media Server Enterprise license key**. Clustering is not available in Community Edition.
- [ ] An **SSH key** for connecting to the servers, for example `your-key.pem`.
- [ ] About **60–90 minutes**.

### Write down your server addresses

Every server has a **public IP**, which you use to connect from your computer, and a **private IP**, which the servers use to talk to each other. Connect to each server with SSH and run:

```bash title="Run on each server"
hostname -I
```

The first address printed is the **private IP**, for example `172.31.15.60`. Fill in a small table like this one and keep it open. You'll need it in almost every step:

| Server | Public IP | Private IP |
| --- | --- | --- |
| MongoDB | | `MONGODB_PRIVATE_IP` |
| AMS node 1 | `NODE1_PUBLIC_IP` | `NODE1_PRIVATE_IP` |
| AMS node 2 | `NODE2_PUBLIC_IP` | `NODE2_PRIVATE_IP` |
| Monitoring | `MONITORING_PUBLIC_IP` | `MONITORING_PRIVATE_IP` |

:::tip Copy and paste tips
- Replace every `UPPERCASE_NAME` in the commands with the value from your table.
- The title of each code block tells you **which server** to run it on.
- Paste one block at a time and check **You should see** before continuing.
:::

---

## Step 1: Open the network ports

The servers need permission to talk to each other. The easiest and safest way on AWS is to create **three security groups** and let them refer to each other. In the AWS console, go to **EC2 → Security Groups → Create security group** and create:

**`ams-nodes`** (attach to both AMS nodes):

| Type | Port | Source | Why |
| --- | --- | --- | --- |
| SSH | 22 | My IP | Connect with SSH |
| Custom TCP | 5080 | My IP | AMS web panel |
| Custom TCP | 1935 | My IP | Send test streams (RTMP) |
| Custom TCP | 5000 | `ams-nodes` | Cluster traffic between AMS nodes |
| Custom TCP | **9090** | **`ams-monitoring`** | Prometheus reads each node's metrics |

![Inbound rules of the ams-nodes security group](@site/static/img/monitoring/prometheus/cluster-sg-ams-nodes.png)

**`ams-mongodb`** (attach to the MongoDB server):

| Type | Port | Source | Why |
| --- | --- | --- | --- |
| SSH | 22 | My IP | Connect with SSH |
| Custom TCP | **27017** | **`ams-nodes`** | AMS nodes use the database |
| Custom TCP | **27017** | **`ams-monitoring`** | The discovery program reads the node list |

![Inbound rules of the ams-mongodb security group](@site/static/img/monitoring/prometheus/cluster-sg-mongodb.png)

**`ams-monitoring`** (attach to the monitoring server):

| Type | Port | Source | Why |
| --- | --- | --- | --- |
| SSH | 22 | My IP | Connect with SSH |
| Custom TCP | 3000 | My IP | Open Grafana in your browser |

![Inbound rules of the ams-monitoring security group](@site/static/img/monitoring/prometheus/cluster-sg-monitoring.png)

To attach a security group to a server: select the instance, choose **Actions → Security → Change security groups**, add the group, and click **Save**.

To create the `ams-nodes` rule that points at its own group, save the group once first, then edit its inbound rules and choose `ams-nodes` as the source.

:::warning Using IP ranges instead of security groups?
Make sure the range really contains your servers' **private IPs**. For example, `172.0.0.0/16` does **not** include `172.31.15.60`. The first two numbers must match, so you'd need `172.31.0.0/16`. A wrong range is the most common reason AMS can't reach MongoDB.

Never open 27017 (MongoDB) or 9090 (metrics) to `0.0.0.0/0`. The metrics page has no password.
:::

The other AMS ports (5443, 4200/udp, 50000–60000/udp) are only needed when real viewers and publishers connect. See [Server ports](/guides/installing-on-linux/installing-ams-on-linux/#server-ports).

## Step 2: Install MongoDB

Connect to the **MongoDB server**. Ant Media provides a script that installs MongoDB, creates an administrator login with a random password, turns on password protection, and lets other servers connect:

```bash title="Run on the MongoDB server"
cd ~
wget https://raw.githubusercontent.com/ant-media/Scripts/master/install_mongodb.sh
sudo chmod +x install_mongodb.sh
sudo ./install_mongodb.sh --auto-create
```

**You should see**, at the end:

```text
MongoDB credentials saved to /tmp/mongo_credentials.txt
```

Look at the login that was created and keep it somewhere safe, such as a password manager. You'll need it in Steps 4 and 7:

```bash title="Run on the MongoDB server"
sudo cat /tmp/mongo_credentials.txt
```

```text
MongoDB username: 1a2b3c4d5e6f
MongoDB password: 0123456789abcdef01234567
```

Files in `/tmp` are deleted on reboot and readable by other users, so move the file to a safe place:

```bash title="Run on the MongoDB server"
sudo install -o root -g root -m 600 /tmp/mongo_credentials.txt /root/mongo_credentials.txt
sudo shred -u /tmp/mongo_credentials.txt
```

Raise MongoDB's limits so it doesn't fail under load:

```bash title="Run on the MongoDB server"
sudo tee -a /etc/security/limits.conf > /dev/null <<'EOF'
root soft       nproc          65535
root hard       nproc          65535
root soft       nofile         65535
root hard       nofile         65535
mongodb soft    nproc          65535
mongodb hard    nproc          65535
mongodb soft    nofile         65535
mongodb hard    nofile         65535
EOF
```

Check that MongoDB is running and listening:

```bash title="Run on the MongoDB server"
systemctl is-active mongod
sudo ss -ltn | grep 27017
```

**You should see:**

```text
active
LISTEN 0      4096         0.0.0.0:27017      0.0.0.0:*
```

## Step 3: Install Ant Media Server on both nodes

Do this on **AMS node 1** and **AMS node 2**. Replace `YOUR_LICENSE_KEY` with your Enterprise license key:

```bash title="Run on AMS node 1 and on AMS node 2"
cd ~
wget -O install_ant-media-server.sh https://raw.githubusercontent.com/ant-media/Scripts/master/install_ant-media-server.sh
sudo chmod 755 install_ant-media-server.sh
sudo ./install_ant-media-server.sh -l 'YOUR_LICENSE_KEY'
```

When it finishes, check that AMS is running and publishing metrics:

```bash title="Run on AMS node 1 and on AMS node 2"
systemctl is-active antmedia
curl -s http://127.0.0.1:9090/metrics | grep "^antmedia_streams_live"
```

**You should see** `active`, then a line that starts with `antmedia_streams_live{` and ends with `0.0`.

Check that each node can reach MongoDB over the private network:

```bash title="Run on AMS node 1 and on AMS node 2"
timeout 5 bash -c '</dev/tcp/MONGODB_PRIVATE_IP/27017' && echo "MongoDB reachable" || echo "MongoDB NOT reachable"
```

**You should see** `MongoDB reachable`. If not, fix the security group from Step 1 before continuing.

## Step 4: Join both nodes into a cluster

On **each AMS node**, switch to cluster mode and point it at MongoDB. Use the username and password from Step 2 and MongoDB's **private** IP:

```bash title="Run on AMS node 1 and on AMS node 2"
cd /usr/local/antmedia
sudo ./change_server_mode.sh cluster "mongodb://MONGODB_USERNAME:MONGODB_PASSWORD@MONGODB_PRIVATE_IP"
```

AMS restarts. Wait about **30 seconds**, then check:

```bash title="Run on AMS node 1 and on AMS node 2"
systemctl is-active antmedia
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:5080/
```

**You should see:**

```text
active
200
```

:::warning If AMS shows `inactive`
AMS stops if it can't reach MongoDB. Run `sudo grep -m1 MongoTimeoutException /usr/local/antmedia/log/antmedia-error.log`. If it prints a line, repeat the reachability check from Step 3 and fix the security group, then run `sudo systemctl start antmedia`.
:::

Now open the web panel at `http://NODE1_PUBLIC_IP:5080` in your browser. The first time, it asks you to create an administrator account. After signing in, open the **Cluster** page. You should see **both nodes**:

![AMS web panel Cluster page listing both nodes](@site/static/img/monitoring/prometheus/cluster-ams-panel-nodes.png)

## Step 5: Install Prometheus on the monitoring server

Connect to the **monitoring server** and paste this block. It downloads Prometheus, checks that the download isn't damaged, and installs it:

```bash title="Run on the monitoring server"
cd ~
sudo apt-get update
sudo apt-get install -y curl ca-certificates

curl -fLO https://github.com/prometheus/prometheus/releases/download/v3.14.0/prometheus-3.14.0.linux-amd64.tar.gz
printf '%s\n' 'f665c6da19eb7ba399c915d30c7d9793c9b417bf8a749b504bc470678631478d  prometheus-3.14.0.linux-amd64.tar.gz' | sha256sum -c -
tar -xzf prometheus-3.14.0.linux-amd64.tar.gz
sudo install -m 755 prometheus-3.14.0.linux-amd64/prometheus prometheus-3.14.0.linux-amd64/promtool /usr/local/bin/

id prometheus >/dev/null 2>&1 || sudo useradd --system --no-create-home --shell /usr/sbin/nologin prometheus
sudo install -d -o root -g prometheus -m 750 /etc/prometheus
sudo install -d -o prometheus -g prometheus -m 750 /var/lib/prometheus
```

**You should see** `prometheus-3.14.0.linux-amd64.tar.gz: OK`.

Create the Prometheus service. It keeps 15 days of history, up to 15 GB:

```bash title="Run on the monitoring server"
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
```

:::info Small disk?
Check free space with `df -h /`. If the monitoring server has less than about 20 GB free, lower the limit to half of the free space. For example, replace `15GB` with `5GB` in the file above.
:::

Check that the monitoring server can reach both nodes' metrics:

```bash title="Run on the monitoring server"
curl -s -m 5 http://NODE1_PRIVATE_IP:9090/metrics | grep -c "^antmedia_"
curl -s -m 5 http://NODE2_PRIVATE_IP:9090/metrics | grep -c "^antmedia_"
```

**You should see** a number (around `12`) for each node. If you see `0` after a 5-second pause, port 9090 is blocked. Check the `ams-nodes` security group from Step 1.

## Step 6: Create a read-only database login for monitoring

The discovery program only needs to **read** the list of nodes. Give it its own login that can't change anything.

On the **MongoDB server**, open the MongoDB shell as the administrator. Use the username from Step 2; it asks for the password:

```bash title="Run on the MongoDB server"
mongosh "mongodb://127.0.0.1:27017/admin" -u MONGODB_USERNAME -p
```

First, look at the list of nodes AMS registered:

```javascript title="Paste into mongosh"
db.getSiblingDB("clusterdb").clusternode.find({}, { _id: 0, ip: 1, lastUpdateTime: 1 })
```

**You should see** two entries, one per node, each with the node's **private** IP (for example `ip: '172.31.1.195'`) and a `lastUpdateTime`, the time of its latest heartbeat. Run the command again a few seconds later and `lastUpdateTime` will have increased.

Now create the read-only login. It asks you to type a new password. Choose one and write it down:

```javascript title="Paste into mongosh"
db.getSiblingDB("admin").createUser({
  user: "ams_discovery",
  pwd: passwordPrompt(),
  roles: [{ role: "read", db: "clusterdb" }]
})
```

**You should see** `{ ok: 1 }`. Type `exit` to leave the shell.

## Step 7: Install the discovery program

On the **monitoring server**, install the MongoDB library for Python and create a dedicated user and folders:

```bash title="Run on the monitoring server"
sudo apt-get install -y python3-pymongo
sudo useradd --system --no-create-home --shell /usr/sbin/nologin --gid prometheus ams-discovery
sudo install -d -o ams-discovery -g prometheus -m 750 /var/lib/prometheus/file_sd
sudo install -d -o root -g prometheus -m 750 /etc/ams-discovery
```

Create the settings file. This command opens a text editor:

```bash title="Run on the monitoring server"
sudoedit /etc/ams-discovery/environment
```

Paste the following. Replace `DISCOVERY_PASSWORD` with the password from Step 6 and `MONGODB_PRIVATE_IP` with your MongoDB server's private IP:

```ini
MONGODB_URI="mongodb://ams_discovery:DISCOVERY_PASSWORD@MONGODB_PRIVATE_IP:27017/?authSource=admin"
MONGODB_DATABASE=clusterdb
MONGODB_COLLECTION=clusternode
AMS_METRICS_PORT=9090
MAX_NODE_AGE_SECONDS=300
TARGET_FILE=/var/lib/prometheus/file_sd/antmedia.json
```

Save and close: **Ctrl+O**, **Enter**, **Ctrl+X**.

:::info Password with special characters?
If your password contains characters such as `@ : / ? # %`, replace each one with its code (`@` → `%40`, `:` → `%3A`, `/` → `%2F`, `?` → `%3F`, `#` → `%23`, `%` → `%25`). Passwords made only of letters and numbers need no changes.
:::

Protect the file so only the system can read the password:

```bash title="Run on the monitoring server"
sudo chown root:root /etc/ams-discovery/environment
sudo chmod 600 /etc/ams-discovery/environment
```

Now create the discovery program itself. Paste the whole block:

```bash title="Run on the monitoring server"
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
EOF
sudo chown root:root /usr/local/bin/ams-prometheus-discovery.py
sudo chmod 755 /usr/local/bin/ams-prometheus-discovery.py
```

Make it run automatically every 30 seconds:

```bash title="Run on the monitoring server"
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
```

Run it once and look at what it found:

```bash title="Run on the monitoring server"
sudo systemctl daemon-reload
sudo systemctl start ams-prometheus-discovery.service
sudo journalctl -u ams-prometheus-discovery.service -n 3 --no-pager -o cat
sudo -u prometheus cat /var/lib/prometheus/file_sd/antmedia.json
```

**You should see** `Exported 2 AMS targets` followed by both nodes' private IPs:

```json
[
  {
    "targets": ["172.31.1.195:9090"],
    "labels": {"ams_node_ip": "172.31.1.195"}
  },
  {
    "targets": ["172.31.36.209:9090"],
    "labels": {"ams_node_ip": "172.31.36.209"}
  }
]
```

If it works, turn on the 30-second timer:

```bash title="Run on the monitoring server"
sudo systemctl enable --now ams-prometheus-discovery.timer
```

## Step 8: Start Prometheus

Tell Prometheus to collect from whichever nodes the discovery program found:

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
sudo -u prometheus promtool check config /etc/prometheus/prometheus.yml
sudo systemctl daemon-reload
sudo systemctl enable --now prometheus
```

**You should see** `SUCCESS: /etc/prometheus/prometheus.yml is valid prometheus config file syntax`.

Wait about **30 seconds**, then check that Prometheus is collecting from both nodes:

```bash title="Run on the monitoring server"
curl -s http://127.0.0.1:9091/api/v1/targets | grep -o '"scrapeUrl":"[^"]*"\|"health":"[a-z]*"'
```

**You should see** both nodes with `"health":"up"`:

```text
"scrapeUrl":"http://172.31.1.195:9090/metrics"
"health":"up"
"scrapeUrl":"http://172.31.36.209:9090/metrics"
"health":"up"
```

## Step 9: Install Grafana and import the dashboard

On the **monitoring server**:

```bash title="Run on the monitoring server"
sudo apt-get install -y apt-transport-https wget gnupg
sudo mkdir -p /etc/apt/keyrings/
wget -q -O - https://apt.grafana.com/gpg.key | gpg --dearmor | sudo tee /etc/apt/keyrings/grafana.gpg > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/grafana.gpg] https://apt.grafana.com stable main" | sudo tee /etc/apt/sources.list.d/grafana.list
sudo apt-get update
sudo apt-get install -y grafana
sudo systemctl daemon-reload
sudo systemctl enable --now grafana-server
systemctl is-active grafana-server
```

**You should see** `active`.

Now, in your browser:

1. Open **`http://MONITORING_PUBLIC_IP:3000`**. Port 3000 was allowed from your IP in Step 1. Sign in with **`admin`** / **`admin`** and choose a new password.

   ![Grafana sign-in page](@site/static/img/monitoring/prometheus/grafana-login.png)

2. Go to **Connections → Data sources → Add new data source → Prometheus**. Set **Prometheus server URL** to `http://127.0.0.1:9091`, then click **Save & test**. You should see a green success message.

   ![The Prometheus server URL set to http://127.0.0.1:9091](@site/static/img/monitoring/prometheus/grafana-data-source-url.png)

3. Download **[ams-prometheus-grafana-dashboard.json](pathname:///files/ams-prometheus-grafana-dashboard.json)**, then in Grafana go to **Dashboards → New → Import**, upload the file, select your **Prometheus** data source, and click **Import**.

   ![Grafana Import dashboard page](@site/static/img/monitoring/prometheus/grafana-import-dashboard.png)

The **Ant Media Server - All Prometheus Metrics** dashboard opens. The **Instance** drop-down at the top lists **both nodes**:

![Instance drop-down listing both AMS nodes](@site/static/img/monitoring/prometheus/cluster-grafana-instance-dropdown.png)

## Step 10: See your whole cluster come alive

Send a 2-minute test stream to **each** node. Run this on **node 1**, and in a second SSH window on **node 2**:

```bash title="Run on AMS node 1 and on AMS node 2"
sudo apt-get install -y ffmpeg
timeout 120 ffmpeg -re -f lavfi -i testsrc=size=640x360:rate=25 -f lavfi -i sine=frequency=440 \
  -c:v libx264 -preset veryfast -tune zerolatency -g 50 -c:a aac \
  -f flv rtmp://127.0.0.1/LiveApp/test-$(hostname)
```

On the dashboard, with **Instance = All**, **Live streams** shows **2**, and every graph shows one line per node. Pick a single node in the **Instance** drop-down to see just that server.

![Dashboard with both nodes streaming: Live streams = 2](@site/static/img/monitoring/prometheus/cluster-grafana-dashboard-two-nodes.png)

## Step 11: Watch the monitoring follow your cluster

This is what the discovery program is for. Stop AMS on **node 2**:

```bash title="Run on AMS node 2"
sudo systemctl stop antmedia
```

Within about **30 seconds**, node 2 disappears from the target list and from the dashboard, and only node 1 remains:

```bash title="Run on the monitoring server"
sudo -u prometheus cat /var/lib/prometheus/file_sd/antmedia.json
```

![Dashboard after node 2 was stopped: only node 1 remains](@site/static/img/monitoring/prometheus/cluster-grafana-node-removed.png)

Start it again:

```bash title="Run on AMS node 2"
sudo systemctl start antmedia
```

Within about **30 seconds** it's back, and you didn't touch Prometheus or Grafana.

**Congratulations!** Your cluster is monitored from one place. Any new AMS node that joins the same MongoDB and allows port 9090 from the `ams-monitoring` security group appears on the dashboard automatically.

---

## How nodes are added and removed

| What happens to a node | What you see in monitoring |
| --- | --- |
| A new node joins the cluster | Appears within about 30 seconds. |
| AMS is stopped normally (`systemctl stop`, reboot, scale-in) | AMS removes itself from MongoDB, so it disappears within about 30 seconds. |
| A node **crashes, hangs or loses its network** | Its **Scrape target up** value drops to **0** within about 30 seconds, so you can see that something is wrong. After **5 minutes** without a heartbeat (`MAX_NODE_AGE_SECONDS=300`), it is removed from the list. |
| MongoDB can't be reached, or the password is wrong | The discovery program **keeps the last known list**, so monitoring keeps working. The error shows up in `journalctl -u ams-prometheus-discovery.service`. |

:::tip Alert on crashed nodes
A crashed node stays visible as **up = 0** for 5 minutes. Set a Grafana alert on `up{job="antmedia"} == 0` lasting **1–2 minutes** so it fires before the node is removed from the list.
:::

## Optional: list the nodes by hand instead

If your cluster never changes, you can skip Steps 6 and 7 and type the nodes into Prometheus directly. Use this `/etc/prometheus/prometheus.yml` in Step 8:

```yaml
global:
  scrape_interval: 15s
  scrape_timeout: 5s

scrape_configs:
  - job_name: antmedia
    metrics_path: /metrics
    static_configs:
      - targets: ['NODE1_PRIVATE_IP:9090']
        labels:
          node: ams-node1
      - targets: ['NODE2_PRIVATE_IP:9090']
        labels:
          node: ams-node2
```

List **every node**, never the load balancer. Whenever you add or remove a node, edit this file and run `sudo systemctl reload prometheus`.

## Troubleshooting

| Problem | What to check |
| --- | --- |
| **AMS web panel doesn't load after Step 4** | AMS couldn't reach MongoDB and stopped. Run the reachability check from Step 3. Check that the MongoDB security group allows 27017 from `ams-nodes` (or a range that really contains the nodes' private IPs), then run `sudo systemctl start antmedia`. |
| Only one node on the AMS **Cluster** page | Both nodes must use exactly the same MongoDB address in Step 4. Check `grep clusterdb.host /usr/local/antmedia/conf/red5.properties` on each node. |
| `curl` to `NODE_PRIVATE_IP:9090` hangs in Step 5 | Port 9090 on `ams-nodes` must allow the `ams-monitoring` security group. |
| `Discovery failed (ServerSelectionTimeoutError)` | The monitoring server can't reach MongoDB. Check that `ams-mongodb` allows 27017 from `ams-monitoring`. |
| `Discovery failed (OperationFailure)` | Wrong username or password in `/etc/ams-discovery/environment`, or special characters in the password that aren't encoded (Step 7). |
| `Exported 0 AMS targets` | No node sent a heartbeat in the last 5 minutes. Are the AMS nodes running, and are the servers' clocks correct (`timedatectl`)? |
| A target shows `"health":"down"` | That node is stopped or unreachable on port 9090. Check `systemctl is-active antmedia` on the node. |
| Grafana shows only one node | Set **Instance** to **All**, and check the time range (try **Last 15 minutes**). |

## Useful commands

```bash title="Run on the monitoring server"
# What the discovery program found last
sudo -u prometheus cat /var/lib/prometheus/file_sd/antmedia.json

# The discovery program's recent runs and errors
sudo journalctl -u ams-prometheus-discovery.service -n 20 --no-pager -o cat

# When it will run next
systemctl list-timers ams-prometheus-discovery.timer

# Status of all monitoring services
systemctl status prometheus grafana-server ams-prometheus-discovery.timer
```
