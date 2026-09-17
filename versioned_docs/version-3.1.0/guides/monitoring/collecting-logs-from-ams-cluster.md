---
title: Collecting Logs from AMS Cluster
description: Set up Graylog with MongoDB and Elasticsearch to collect Ant Media Server logs from every node in a cluster.
keywords: [Collecting logs from AMS cluster, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
sidebar_label: AMS Cluster Logs
---

# Collecting Logs from AMS Cluster

Use **Graylog** to collect and search Ant Media Server logs from every node in a cluster from one place. Graylog uses **MongoDB** for configuration metadata and **Elasticsearch** for log storage and search.

This guide covers a self-hosted Graylog stack on Ubuntu (minimum **4 GB RAM**) and forwarding logs from multiple Ant Media Server instances over **Syslog UDP**.

:::info
For Ant Media's managed centralized logging platform, see [Centralized Logging Setup](/guides/monitoring/centralized-logging/).
:::

## What you'll accomplish

By the end of this guide, you will:

1. Install **MongoDB**, **Elasticsearch**, and **Graylog** on a dedicated log server.
2. Access the Graylog web interface (optionally behind **Nginx** with SSL).
3. Forward Ant Media Server logs from each cluster node with **rsyslog**.
4. Search and filter cluster logs in Graylog in real time.

## Example test environment

| Role | Example address |
|------|-----------------|
| Graylog server | `192.168.1.250` |
| Ant Media Server 1 | `192.168.1.251` |
| Ant Media Server 2 | `192.168.1.252` |

Replace these with your own IPs or hostnames throughout the guide.

## How cluster log collection works

Each Ant Media Server node runs **rsyslog** with the `imfile` module to tail `ant-media-server.log` and forward lines to the Graylog server on **UDP port 5144**. Graylog ingests the Syslog stream, indexes it in Elasticsearch, and exposes search and dashboards in the web UI.

## Prerequisites

Before you begin, confirm the following:

- A dedicated Linux server for Graylog (Ubuntu recommended, **4 GB RAM** minimum).
- `sudo` access on the Graylog server and every Ant Media Server node.
- Network connectivity from AMS nodes to Graylog on **UDP 5144**.
- Java 11 for Elasticsearch.

Install Java on the Graylog server:

```bash
sudo apt-get update
sudo apt-get install apt-transport-https openjdk-11-jre openjdk-11-jre-headless uuid-runtime pwgen
```

---

## Step 1: Install MongoDB

MongoDB stores Graylog configuration and metadata.

```bash
sudo apt-get install gnupg
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt-get update && sudo apt-get install -y mongodb-org
```

Enable and start MongoDB:

```bash
sudo systemctl enable mongod.service
sudo systemctl restart mongod.service
sudo systemctl status mongod.service
```

---

## Step 2: Install Elasticsearch

Graylog requires **Elasticsearch 7.x OSS**.

```bash
wget -O - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add
echo "deb https://artifacts.elastic.co/packages/oss-7.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-7.x.list
sudo apt-get update && sudo apt-get install elasticsearch-oss
```

Edit `/etc/elasticsearch/elasticsearch.yml` and add:

```yaml
cluster.name: graylog
action.auto_create_index: false
```

Enable and start Elasticsearch:

```bash
sudo systemctl enable elasticsearch.service
sudo systemctl restart elasticsearch.service
sudo systemctl status elasticsearch.service
```

Verify Elasticsearch responds:

```bash
curl -X GET http://localhost:9200
curl -XGET 'http://localhost:9200/_cluster/health?pretty=true'
```

Cluster health should report **`"status" : "green"`**.

---

## Step 3: Install Graylog

```bash
wget https://packages.graylog2.org/repo/packages/graylog-4.3-repository_latest.deb
sudo dpkg -i graylog-4.3-repository_latest.deb
sudo apt-get update && sudo apt-get install graylog-server -y
```

Generate credentials for `/etc/graylog/server/server.conf`:

```bash
# SHA-256 hash of your admin password
echo -n "Enter Password: " && head -1 </dev/stdin | tr -d '\n' | sha256sum | cut -d" " -f1

# 96-character password secret
pwgen -N 1 -s 96
```

Add the outputs to `server.conf`:

```properties
password_secret = {YOUR_PASSWORD_SECRET}
root_password_sha2 = {YOUR_ROOT_PASSWORD_SHA2}
```

For direct HTTP access without a reverse proxy, set:

```properties
http_bind_address = {YOUR_SERVER_IP}:9000
```

For SSL termination with Nginx, keep `http_bind_address = 127.0.0.1:9000` and follow [Setting up SSL](/guides/installing-on-linux/setting-up-ssl/) or the optional Nginx section below.

Enable and start Graylog:

```bash
sudo systemctl enable graylog-server.service
sudo systemctl restart graylog-server.service
sudo systemctl status graylog-server.service
```

---

## Step 4: Optional — Nginx reverse proxy with SSL

Install Nginx and Certbot:

```bash
sudo apt install curl ca-certificates lsb-release -y
echo "deb http://nginx.org/packages/$(lsb_release -d | awk '{print $2}' | tr '[:upper:]' '[:lower:]') $(lsb_release -cs) nginx" | sudo tee /etc/apt/sources.list.d/nginx.list
curl -fsSL https://nginx.org/keys/nginx_signing.key | sudo apt-key add -
sudo apt-get update
sudo apt-get install nginx certbot python-certbot-nginx -y
```

Create a certificate:

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Add certificate renewal to crontab (`crontab -e`):

```bash
0 0 */80 * * root certbot -q renew --nginx
```

Back up the default Nginx config and create `/etc/nginx/conf.d/graylog.conf`:

```bash
sudo mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf_bck
sudo nano /etc/nginx/conf.d/graylog.conf
```

```nginx
server {
    listen 443 ssl;
    server_name yourdomain.com;
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    ssl_session_cache shared:le_nginx_SSL:1m;
    ssl_session_timeout 1440m;
    ssl_protocols TLSv1.2;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_set_header HOST $host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:9000;
    }
}
```

Restart Nginx:

```bash
sudo systemctl restart nginx
```

Access Graylog at `https://yourdomain.com`.

---

## Step 5: Access the Graylog web interface

Open the Graylog UI:

```text
http://{GRAYLOG_SERVER_IP}:9000
```

Or, if Nginx SSL is configured:

```text
https://yourdomain.com
```

Log in with username **`admin`** and the password you hashed in Step 3.

---

## Step 6: Forward logs from Ant Media Server nodes

On **each** Ant Media Server instance, create `/etc/rsyslog.d/25-antmedia.conf`:

```bash
sudo nano /etc/rsyslog.d/25-antmedia.conf
```

```text
$ModLoad imfile
$InputFileName /usr/local/antmedia/log/ant-media-server.log
$InputFileTag antmedia
$InputFileStateFile stat-antmedia
$InputRunFileMonitor
*.* @{GRAYLOG_SERVER_IP}:5144;RSYSLOG_SyslogProtocol23Format
```

Replace `{GRAYLOG_SERVER_IP}` with your Graylog server address (for example, `192.168.1.250`).

Restart rsyslog:

```bash
sudo systemctl restart rsyslog
```

:::tip Log file path
If your install uses `/var/log/antmedia/ant-media-server.log` instead, update `$InputFileName` to match your environment.
:::

---

## Step 7: Configure Graylog Syslog input

1. Open the Graylog dashboard and sign in.

   ![](@site/static/img/graylog-1.png)

2. Go to **System → Inputs**, select **Syslog UDP**, and click **Launch new input**.

   ![](@site/static/img/graylog-2.png)

3. Set the port to **5144** (and other options as shown below), then click **Save**.

   ![](@site/static/img/graylog-3.png)

4. Confirm the input is running.

   ![](@site/static/img/graylog-4.png)

When rsyslog forwarding is configured correctly, Ant Media Server logs appear in Graylog:

![](@site/static/img/graylog-5.png)

### Search query examples

```text
"stream1"
(stream1 OR stream2)
"stream1" AND NOT source:192.168.1.251
source:192.168.1.252
"stream*" AND NOT source:192.168.1.2
```

From here you can build dashboards, filter by stream or source server, and configure alerts for important events.

---

## Troubleshooting

| Symptom | What to check |
|---------|----------------|
| Graylog service fails to start | MongoDB and Elasticsearch are running; `password_secret` and `root_password_sha2` are set in `server.conf`. |
| Elasticsearch not green | `curl localhost:9200/_cluster/health`; JVM heap and disk space on the Graylog server. |
| No logs in Graylog | Syslog input is running on port **5144**; UDP traffic allowed from AMS nodes; rsyslog restarted on each node. |
| rsyslog not forwarding | Log file path in `25-antmedia.conf` matches your install; `{GRAYLOG_SERVER_IP}` is correct. |
| Cannot reach web UI | `http_bind_address` or Nginx proxy config; firewall allows port **9000** or **443**. |

For managed log forwarding by Ant Media, see [Centralized Logging Setup](/guides/monitoring/centralized-logging/).
