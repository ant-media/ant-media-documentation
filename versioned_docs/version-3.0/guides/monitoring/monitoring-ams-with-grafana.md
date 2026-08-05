---
title: Monitoring with Grafana
description: Monitor Ant Media Server instance statistics on VMs with Apache Kafka, Elasticsearch, Logstash, and Grafana.
keywords: [Monitoring AMS with Grafana, Grafana, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 5
sidebar_label: Grafana
---

# Monitoring with Grafana

Monitor Ant Media Server **instance statistics** — CPU, memory, stream counts, and viewer metrics — on Linux VMs by streaming JSON events through **Apache Kafka**, indexing them in **Elasticsearch** with **Logstash**, and visualizing them in **Grafana**.

:::info
For Kubernetes clusters, see [Collecting Logs and Metrics on Kubernetes](/guides/monitoring/loki-prometheus-setup/). For Ant Media's managed centralized logging, see [Centralized Logging Setup](/guides/monitoring/centralized-logging/).
:::

## What you'll accomplish

By the end of this guide, you will:

1. Run **Apache Kafka** (with ZooKeeper) as a message bus for AMS statistics.
2. Point Ant Media Server at the Kafka broker in `red5.properties`.
3. Install **Elasticsearch** and **Logstash** to consume Kafka topics and index events.
4. Install **Grafana**, connect it to Elasticsearch, and import the Ant Media dashboard.

## How it works

Ant Media Server publishes JSON statistics to Kafka topics such as `ams-instance-stats`. **Logstash** consumes those topics and writes documents to **Elasticsearch**. **Grafana** queries Elasticsearch to render dashboards for CPU load, viewer counts, instance count, and related metrics.

```
AMS → Kafka → Logstash → Elasticsearch → Grafana
```

## Metrics available from Ant Media Server

Kafka topics include fields such as:

| Category | Fields |
|----------|--------|
| Identity | `instanceId`, `host-address` |
| CPU & memory | `cpuUsage`, `jvmMemoryUsage`, `jvmNativeMemoryUsage`, `systemMemoryInfo` |
| System | `systemInfo`, `fileSystemInfo`, `server-timing` |
| Streams & viewers | `localWebRTCLiveStreams`, `localLiveStreams`, `localWebRTCViewers`, `localHLSViewers` |
| Errors & queues | `encoders-blocked`, `encoders-not-opened`, `publish-timeout-errors`, `vertx-worker-thread-queue-size`, `webrtc-vertx-worker-thread-queue-size` |

## Prerequisites

Before you begin, confirm the following:

- A dedicated Linux server (Ubuntu 18.04, 20.04, or 20.10 recommended) with at least **4 GB RAM** for Elasticsearch.
- `sudo` access on the monitoring server and on each Ant Media Server node that will publish stats.
- Network connectivity from AMS nodes to the Kafka broker on port **9092**.
- Java 11 (`openjdk-11-jdk`) for Kafka and the Elastic Stack.

## Quick install (optional)

Ant Media provides a script that installs Kafka, Elasticsearch, Logstash, and Grafana, configures Logstash, registers systemd services, and imports the Grafana dashboard and Elasticsearch data source:

```bash
wget https://raw.githubusercontent.com/ant-media/Scripts/master/install-monitoring-tools.sh
chmod +x install-monitoring-tools.sh
sudo ./install-monitoring-tools.sh
```

For unattended installation (server not behind NAT):

```bash
sudo ./install-monitoring-tools.sh -y
```

If Elasticsearch fails to start due to memory limits, pass a heap size:

```bash
sudo ./install-monitoring-tools.sh -y -m 2g
```

When the script finishes, open Grafana at `http://{YOUR_SERVER_IP}:3000/` and log in with **`admin` / `admin`**. Then configure Kafka on each Ant Media Server node (see Step 2 below).

For manual installation, continue with the steps below.

## Step 1: Install and run Apache Kafka

1. Install Java 11:

   ```bash
   sudo apt-get update && sudo apt-get install openjdk-11-jdk -y
   ```

2. Download and extract Kafka:

   ```bash
   wget https://archive.apache.org/dist/kafka/2.8.1/kafka_2.13-2.8.1.tgz
   tar -zxvf kafka_2.13-2.8.1.tgz
   sudo mv kafka_2.13-2.8.1 /opt/kafka
   ```

3. Edit `/opt/kafka/config/server.properties` and set the listener to your server IP:

   ```ini
   listeners=PLAINTEXT://{YOUR_SERVER_IP}:9092
   ```

4. Start ZooKeeper and Kafka:

   ```bash
   sudo /opt/kafka/bin/zookeeper-server-start.sh /opt/kafka/config/zookeeper.properties &
   sudo /opt/kafka/bin/kafka-server-start.sh /opt/kafka/config/server.properties &
   ```

   Kafka requires ZooKeeper; start ZooKeeper first.

5. Verify both services are listening:

   ```bash
   netstat -tpln | egrep "9092|2181"
   ```

   Ports **9092** (Kafka) and **2181** (ZooKeeper) should appear in `LISTEN` state.

### Run Kafka as a systemd service (recommended)

Create `/lib/systemd/system/kafka-zookeeper.service`:

```ini
[Unit]
Description=Apache Zookeeper Server
Requires=network.target remote-fs.target
After=network.target remote-fs.target

[Service]
Type=simple
Environment=JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
ExecStart=/opt/kafka/bin/zookeeper-server-start.sh /opt/kafka/config/zookeeper.properties
ExecStop=/opt/kafka/bin/zookeeper-server-stop.sh

[Install]
WantedBy=multi-user.target
```

Create `/lib/systemd/system/kafka.service`:

```ini
[Unit]
Description=Apache Kafka Server
Requires=network.target remote-fs.target
After=network.target remote-fs.target kafka-zookeeper.service

[Service]
Type=simple
Environment=JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
ExecStart=/opt/kafka/bin/kafka-server-start.sh /opt/kafka/config/server.properties
ExecStop=/opt/kafka/bin/kafka-server-stop.sh

[Install]
WantedBy=multi-user.target
```

Enable and start the services:

```bash
sudo systemctl daemon-reload
sudo systemctl enable kafka-zookeeper.service kafka.service
sudo systemctl start kafka-zookeeper.service kafka.service
```

## Step 2: Configure Ant Media Server for Kafka

On each Ant Media Server node, set the Kafka broker address in `red5.properties`:

```bash
sudo vim /usr/local/antmedia/conf/red5.properties
```

Update:

```ini
server.kafka_brokers={KAFKA_SERVER_IP}:9092
```

Example:

```ini
server.kafka_brokers=192.168.1.230:9092
```

Restart Ant Media Server:

```bash
sudo service antmedia restart
```

Verify messages appear on the `ams-instance-stats` topic:

```bash
/opt/kafka/bin/kafka-console-consumer.sh \
  --bootstrap-server {KAFKA_SERVER_IP}:9092 \
  --topic ams-instance-stats \
  --from-beginning
```

You should see JSON lines similar to:

```json
{"instanceId":"a06e5437-40ee-49c1-8e38-273544964335","cpuUsage":{"processCPUTime":596700000,"systemCPULoad":0,"processCPULoad":1},"jvmMemoryUsage":{"maxMemory":260046848,"totalMemory":142606336,"freeMemory":21698648,"inUseMemory":120907688},"systemInfo":{"osName":"Linux","osArch":"amd64","javaVersion":"1.8","processorCount":1},"systemMemoryInfo":{}}
```

### Useful Kafka commands

List topics:

```bash
/opt/kafka/bin/kafka-topics.sh --list --bootstrap-server {KAFKA_SERVER_IP}:9092
```

Monitor a topic:

```bash
/opt/kafka/bin/kafka-console-consumer.sh \
  --bootstrap-server {KAFKA_SERVER_IP}:9092 \
  --topic ams-instance-stats \
  --from-beginning
```

## Step 3: Install Elasticsearch and Logstash

### Install Elasticsearch

1. Import the Elastic GPG key and repository:

   ```bash
   wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
   sudo apt-get install apt-transport-https -y
   echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-7.x.list
   ```

2. Install and start Elasticsearch:

   ```bash
   sudo apt-get update && sudo apt-get install elasticsearch -y
   sudo systemctl enable elasticsearch.service
   sudo systemctl start elasticsearch.service
   ```

### Install and configure Logstash

1. Install Logstash:

   ```bash
   sudo apt-get update && sudo apt-get install logstash -y
   sudo systemctl enable logstash.service
   ```

2. Create `/etc/logstash/conf.d/logstash.conf`:

   ```ini
   input {
     kafka {
       bootstrap_servers => "{KAFKA_SERVER_IP}:9092"
       client_id => "logstash"
       group_id => "logstash"
       consumer_threads => 3
       topics => ["ams-instance-stats","ams-webrtc-stats","kafka-webrtc-tester-stats"]
       codec => "json"
       tags => ["log", "kafka_source"]
       type => "log"
     }
   }

   output {
     elasticsearch {
       hosts => ["127.0.0.1:9200"]
       index => "logstash-%{[type]}-%{+YYYY.MM.dd}"
     }
     stdout { codec => rubydebug }
   }
   ```

   Replace `{KAFKA_SERVER_IP}` with your Kafka broker address. If Elasticsearch runs on a different host, update the `hosts` value accordingly.

3. Restart Logstash:

   ```bash
   sudo systemctl restart logstash
   ```

4. Confirm indices are being created:

   ```bash
   curl -XGET 'localhost:9200/_cat/indices?v&pretty'
   ```

## Step 4: Install Grafana

1. Install Grafana:

   ```bash
   sudo apt-get install -y software-properties-common wget apt-transport-https
   wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
   sudo add-apt-repository "deb https://packages.grafana.com/oss/deb stable main"
   sudo apt-get update && sudo apt-get install grafana -y
   ```

2. Enable and start Grafana:

   ```bash
   sudo systemctl enable grafana-server
   sudo systemctl start grafana-server
   ```

3. Open the Grafana UI at `http://{YOUR_SERVER_IP}:3000/login` and log in with the default credentials **`admin` / `admin`**. Change the password when prompted.

## Step 5: Connect Elasticsearch and import the dashboard

1. In Grafana, go to **Connections → Data sources → Add data source**.
2. Select **Elasticsearch**.
3. Configure:

   | Setting | Value |
   |---------|-------|
   | URL | `http://127.0.0.1:9200` |
   | Index name | `logstash-*` |
   | Time field name | `@timestamp` |
   | Version | 7.0+ |

4. Click **Save & test** to confirm Grafana can reach Elasticsearch.

5. Import the Ant Media dashboard:
   - Go to **Dashboards → New → Import**.
   - Upload [antmediaserver.json](https://raw.githubusercontent.com/ant-media/Scripts/master/monitor/antmediaserver.json) or paste its JSON contents.
   - Select the Elasticsearch data source you created.

You should see instance CPU load, viewer counts, and related panels:

![](@site/static/img/grafana7.png)

---

## Troubleshooting

| Symptom | What to check |
|---------|----------------|
| Kafka ports not listening | ZooKeeper started before Kafka; `server.properties` `listeners` matches the server IP; firewall allows **9092** and **2181**. |
| No messages on `ams-instance-stats` | `server.kafka_brokers` in `red5.properties` points to the correct host:port; Ant Media Server restarted after the change. |
| Elasticsearch won't start | Available RAM — increase heap in `/etc/elasticsearch/jvm.options` or use the install script `-m` flag (for example `-m 2g`). |
| Logstash running but no indices | Kafka reachable from Logstash host; topic names match; check `journalctl -u logstash -f` for consumer errors. |
| Grafana shows no data | Elasticsearch data source URL and index pattern `logstash-*` are correct; time range in Grafana includes recent data; indices exist (`curl localhost:9200/_cat/indices?v`). |
| Cannot access Grafana UI | `grafana-server` is running (`systemctl status grafana-server`); port **3000** is open in the firewall. |

For production deployments, run Kafka, Elasticsearch, Logstash, and Grafana as **systemd** services, tune Elasticsearch and Logstash heap sizes to match server RAM, and place Grafana behind **Nginx** with TLS if exposing it on the public internet.
