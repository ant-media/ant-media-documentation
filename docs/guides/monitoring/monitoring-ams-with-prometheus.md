---
title: Monitoring Ant Media Server with Prometheus
description: A step-by-step, beginner-friendly guide to monitoring a single Ant Media Server with Prometheus and viewing all of its metrics on a ready-made Grafana dashboard.
keywords: [Prometheus, Grafana, monitoring, metrics, dashboard, Ant Media Server]
---

# Monitoring Ant Media Server with Prometheus

Ant Media Server (AMS) keeps track of what it is doing: how many streams are live, how many people are watching, how busy the CPU is, how much memory it uses, and much more. This guide shows you how to turn those numbers into a live dashboard you can open in your web browser.

You don't need any monitoring experience. Every step includes the exact commands to copy and paste and tells you what you should see before you move on.

## What you'll have at the end

A Grafana dashboard that shows your Ant Media Server's health in real time. It refreshes every 15 seconds and keeps up to 15 days of history.

![The finished Ant Media Server dashboard in Grafana, showing live streams, viewers, CPU and memory](@site/static/img/monitoring/prometheus/grafana-ams-dashboard-overview.png)

At a glance you will see:

- **Streams and viewers:** live streams, WebRTC, HLS and DASH viewers.
- **Problems to watch for:** blocked encoders, encoders that could not start, publish timeouts, and error and warning log messages.
- **Server health:** CPU, memory, disk space, open files, and uptime.
- **Java engine internals:** memory, garbage collection, and threads. These are useful when you contact support.

## How it works

![One server running Ant Media Server, Prometheus and Grafana. Numbers flow from AMS to Prometheus to Grafana, and you open Grafana in a web browser.](@site/static/img/monitoring/prometheus/standalone-architecture.svg)

Three programs run on your AMS machine:

1. **Ant Media Server** publishes its numbers (called *metrics*) on port **9090**. This is built in and switched on by default.
2. **Prometheus** is a free tool that reads those numbers every 15 seconds and saves them, so you can see history and trends. It only listens inside the server, on port **9091**.
3. **Grafana** is a free tool that turns the saved numbers into graphs. You open it in your browser on port **3000**.

## Before you begin

Make sure you have:

- [ ] A server with **Ant Media Server installed and running**. This guide was tested on **Ubuntu 24.04**.
- [ ] A way to **connect to the server's terminal (SSH)**. On AWS, for example:
  ```bash title="Run on your own computer"
  ssh -i your-key.pem ubuntu@YOUR_SERVER_IP
  ```
- [ ] Permission to change your server's **firewall or cloud security group**. You will open one port, for your own IP address only.
- [ ] About **20 minutes**.

:::tip Copy and paste tips
- Wherever you see `YOUR_SERVER_IP`, replace it with your server's public IP address.
- Code blocks titled **Run on your server** go into the SSH terminal connected to your AMS server.
- Paste one code block at a time, then check the **You should see** part before moving on.
:::

---

## Step 1: Check that Ant Media Server is publishing metrics

Ant Media Server publishes metrics by default. Let's confirm it.

```bash title="Run on your server"
grep prometheus /usr/local/antmedia/conf/red5.properties
```

**You should see:**

```text
prometheus.enabled=true
prometheus.port=9090
```

Now ask AMS for its current numbers:

```bash title="Run on your server"
curl -s http://127.0.0.1:9090/metrics | grep "^antmedia_streams_live"
```

**You should see** a line like the one below. The number at the end is how many streams are live right now, so `0.0` is fine:

```text
antmedia_streams_live{antmedia_instance_id="…",antmedia_instance_ip="…",antmedia_private_ip="…"} 0.0
```

:::info If you see `prometheus.enabled=false` or nothing at all
Open the settings file with `sudo nano /usr/local/antmedia/conf/red5.properties` and make sure these two lines exist:
```properties
prometheus.enabled=true
prometheus.port=9090
```
Save the file (**Ctrl+O**, **Enter**, **Ctrl+X**), then restart AMS and run the check again:
```bash
sudo systemctl restart antmedia
```
:::

:::warning Keep port 9090 closed to the internet
The metrics page has no password. In this guide everything reads it from inside the server, so you **do not** need to open port 9090 in your firewall.
:::

## Step 2: Install Prometheus

Prometheus is the program that collects and saves the numbers. Copy and paste this whole block. It downloads Prometheus 3.14.0, checks that the download isn't damaged, and installs it:

```bash title="Run on your server"
cd ~
sudo apt-get update
sudo apt-get install -y curl ca-certificates

curl -fLO https://github.com/prometheus/prometheus/releases/download/v3.14.0/prometheus-3.14.0.linux-amd64.tar.gz
printf '%s\n' 'f665c6da19eb7ba399c915d30c7d9793c9b417bf8a749b504bc470678631478d  prometheus-3.14.0.linux-amd64.tar.gz' | sha256sum -c -
tar -xzf prometheus-3.14.0.linux-amd64.tar.gz
sudo install -m 755 prometheus-3.14.0.linux-amd64/prometheus prometheus-3.14.0.linux-amd64/promtool /usr/local/bin/

# Create a dedicated "prometheus" user (skipped if it already exists)
id prometheus >/dev/null 2>&1 || sudo useradd --system --no-create-home --shell /usr/sbin/nologin prometheus
sudo install -d -o root -g prometheus -m 750 /etc/prometheus
sudo install -d -o prometheus -g prometheus -m 750 /var/lib/prometheus

prometheus --version
```

**You should see**, among the output:

```text
prometheus-3.14.0.linux-amd64.tar.gz: OK
prometheus, version 3.14.0 ...
```

:::info Using an ARM server (for example AWS Graviton)?
Check with `uname -m`. If it prints `aarch64`, download the `linux-arm64` package from the [Prometheus downloads page](https://prometheus.io/download/) instead, and use the checksum published there.
:::

## Step 3: Tell Prometheus what to watch

This block creates Prometheus's settings file. It tells Prometheus to read the AMS metrics on this same server every 15 seconds:

```bash title="Run on your server"
sudo tee /etc/prometheus/prometheus.yml > /dev/null <<'EOF'
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
EOF

sudo chown root:prometheus /etc/prometheus/prometheus.yml
sudo chmod 640 /etc/prometheus/prometheus.yml
sudo -u prometheus promtool check config /etc/prometheus/prometheus.yml
```

**You should see:**

```text
SUCCESS: /etc/prometheus/prometheus.yml is valid prometheus config file syntax
```

## Step 4: Start Prometheus

This block makes Prometheus run as a background service. It starts automatically whenever the server reboots and keeps 15 days of history (up to 15 GB):

```bash title="Run on your server"
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

sudo systemctl daemon-reload
sudo systemctl enable --now prometheus
systemctl is-active prometheus
```

**You should see:**

```text
active
```

Wait about **20 seconds** so Prometheus can collect its first readings, then check that it can reach AMS:

```bash title="Run on your server"
curl -s --get --data-urlencode 'query=up{job="antmedia"}' http://127.0.0.1:9091/api/v1/query | grep -o '"value":\[[^]]*\]'
```

**You should see** a result that ends in `"1"]`. The `1` means "AMS is up and being collected":

```text
"value":[1790587952.528,"1"]
```

:::info Why port 9091?
AMS already uses port 9090 for its metrics, so Prometheus runs on 9091 to avoid a clash. Prometheus only listens inside the server (`127.0.0.1`), so it is never exposed to the internet.
:::

## Step 5: Install Grafana

Grafana draws the dashboards. This block adds Grafana's official software source and installs it:

```bash title="Run on your server"
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

**You should see:**

```text
active
```

## Step 6: Open Grafana in your browser

Grafana runs on port **3000**. To reach it from your computer, allow port 3000 **from your own IP address only**.

**On AWS:** open the **EC2 console → Instances**, select your server, then open the **Security** tab and click the security group. Choose **Edit inbound rules → Add rule** and set:

| Field | Value |
| --- | --- |
| Type | Custom TCP |
| Port range | `3000` |
| Source | **My IP** |

Click **Save rules**.

![AWS security group inbound rule allowing TCP port 3000 from My IP](@site/static/img/monitoring/prometheus/aws-security-group-port-3000.png)

On other clouds, add the same rule in your provider's firewall. If your server uses UFW, also run `sudo ufw allow from YOUR_OWN_IP to any port 3000 proto tcp`.

:::tip Prefer not to open any port?
You can reach Grafana through an SSH tunnel instead. Run this on your own computer and keep the window open:
```bash title="Run on your own computer"
ssh -i your-key.pem -L 3000:127.0.0.1:3000 ubuntu@YOUR_SERVER_IP
```
Then use `http://localhost:3000` instead of `http://YOUR_SERVER_IP:3000` in the next steps.
:::

Now open **`http://YOUR_SERVER_IP:3000`** in your browser. You'll see the Grafana sign-in page:

![Grafana sign-in page](@site/static/img/monitoring/prometheus/grafana-login.png)

1. Sign in with username **`admin`** and password **`admin`**.
2. Grafana immediately asks you to choose a new password. Pick a strong one and click **Submit**.

![Grafana asks you to set a new password after the first sign-in](@site/static/img/monitoring/prometheus/grafana-change-password.png)

## Step 7: Connect Grafana to Prometheus

Grafana needs to know where to find the numbers Prometheus collected.

1. In the left menu, open **Connections → Data sources**, click **Add new data source**, and choose **Prometheus**.

   ![Choosing Prometheus from the list of data sources](@site/static/img/monitoring/prometheus/grafana-add-data-source.png)

2. In **Prometheus server URL**, type:

   ```text
   http://127.0.0.1:9091
   ```

   ![The Prometheus server URL set to http://127.0.0.1:9091](@site/static/img/monitoring/prometheus/grafana-data-source-url.png)

3. Leave everything else as it is. Scroll to the bottom and click **Save & test**.

**You should see** a green message saying Grafana **successfully queried the Prometheus API**:

![Green success message after Save & test](@site/static/img/monitoring/prometheus/grafana-data-source-success.png)

## Step 8: Import the Ant Media Server dashboard

We've prepared a dashboard that shows **every metric** AMS publishes, organized into sections.

1. Download the dashboard file to your computer: **[ams-prometheus-grafana-dashboard.json](pathname:///files/ams-prometheus-grafana-dashboard.json)**. If it opens in the browser instead of downloading, right-click the link and choose **Save link as…**
2. In Grafana, open **Dashboards**, click **New → Import**, and upload the file you downloaded.

   ![Grafana Import dashboard page](@site/static/img/monitoring/prometheus/grafana-import-dashboard.png)

3. Under **Prometheus**, select the data source you created in Step 7, then click **Import**.

   ![Selecting the Prometheus data source and clicking Import](@site/static/img/monitoring/prometheus/grafana-import-select-data-source.png)

The **Ant Media Server - All Prometheus Metrics** dashboard opens and fills in within a few seconds. 🎉

## Step 9: See it come alive

On an idle server, the stream and viewer counters show **0**, which is correct. Send a short test stream and watch them change.

This block installs FFmpeg (a free video tool) and sends a 2-minute test pattern with a beep tone to your server's `LiveApp` application:

```bash title="Run on your server"
sudo apt-get install -y ffmpeg
timeout 120 ffmpeg -re -f lavfi -i testsrc=size=640x360:rate=25 -f lavfi -i sine=frequency=440 \
  -c:v libx264 -preset veryfast -tune zerolatency -g 50 -c:a aac \
  -f flv rtmp://127.0.0.1/LiveApp/test-stream
```

While it runs, look at the dashboard. Within about 15–30 seconds, **Live streams** changes from **0** to **1**:

![Live streams going from 0 to 1 while the test stream is running](@site/static/img/monitoring/prometheus/grafana-ams-dashboard-streaming.png)

Open the stream in the AMS web panel (**LiveApp → Live Streams → test-stream**) and play it. The **viewer** counters go up as well. After two minutes the test stream stops by itself, and the counters return to 0.

**Congratulations!** Your Ant Media Server is now monitored. Prometheus keeps collecting in the background, even after reboots, and you can come back to this dashboard any time to check how your server is doing.

---

## Understanding your dashboard

The dashboard is divided into sections. Use the **Instance** drop-down at the top to choose a server, and the time picker in the top-right to look back in time (for example, **Last 24 hours**).

![Server health and Java memory sections of the dashboard](@site/static/img/monitoring/prometheus/grafana-ams-dashboard-system.png)

| Section | What it tells you | What to look for |
| --- | --- | --- |
| **Overview** | One-glance numbers: is the server up, streams, viewers, CPU, uptime | **Scrape target up** should be `1`. `0` means Prometheus can't reach AMS. |
| **Streaming** | Live streams, viewers per protocol, encoder problems, publish timeouts, database speed, internal work queues | Blocked or unopened encoders and publish timeouts should stay at `0`. |
| **System / host** | CPU, load, memory, disk space, open files | CPU steadily near 100%, or free disk close to 0, means the server needs attention. |
| **JVM memory** | Memory used by the Java engine that runs AMS | Heap **used** steadily approaching **max** can lead to slowdowns. |
| **JVM garbage collection** | How often and how long Java pauses to free memory | Long or very frequent pauses can cause stream stutter. |
| **JVM threads, classes, JIT** | Internal Java activity | Mostly useful for support and troubleshooting. |
| **Logging** | Log messages per second, by level | A sudden rise in **error** or **warn** lines is worth checking in the AMS logs. |

### Ant Media Server metrics reference

These metrics are specific to Ant Media Server. All of them report the current value on that server.

| Metric | Meaning |
| --- | --- |
| `antmedia_streams_live` | Number of live streams on this server |
| `antmedia_streams_webrtc_live` | Number of live WebRTC streams |
| `antmedia_viewers_webrtc` | Number of WebRTC viewers |
| `antmedia_viewers_hls` | Number of HLS viewers |
| `antmedia_viewers_dash` | Number of DASH viewers |
| `antmedia_encoders_blocked` | Number of blocked encoders |
| `antmedia_encoders_not_opened` | Number of encoders that could not be opened |
| `antmedia_publish_timeout_errors` | Number of publish timeout errors |
| `antmedia_db_query_average_duration_milliseconds` | Average database query time, in milliseconds |
| `antmedia_vertx_worker_queue_size` | Tasks waiting in the internal worker queues (`pool` = `server` or `webrtc`) |
| `antmedia_gpu_count` | Number of GPUs available to AMS |

AMS also publishes standard Java and system metrics (`jvm_*`, `process_*`, `system_*`, `disk_*`, `logback_events_total`). Every metric carries the labels `antmedia_instance_id`, `antmedia_instance_ip` and `antmedia_private_ip`, which identify the server it came from.

To see everything AMS publishes, run `curl -s http://127.0.0.1:9090/metrics` on the server.

## Troubleshooting

| Problem | What to check |
| --- | --- |
| Step 1 shows nothing, or `curl` prints an error | Is AMS running? Run `sudo systemctl status antmedia`. Check the `prometheus.*` lines in `red5.properties` (see Step 1) and restart AMS. |
| `sha256sum` says **FAILED** in Step 2 | The download was damaged. Delete the file with `rm prometheus-3.14.0.linux-amd64.tar.gz` and run the block again. |
| `promtool` reports an error in Step 3 | The settings file was not pasted completely. Run the Step 3 block again. |
| Prometheus is not `active` | Run `sudo journalctl -u prometheus -n 30 --no-pager` to see the reason. |
| The Step 4 check shows `"0"]` or nothing | Prometheus can't read AMS. Repeat Step 1, then wait 20 seconds and check again. |
| `http://YOUR_SERVER_IP:3000` doesn't load | Check the port 3000 rule from Step 6 and that it uses your **current** IP address. Run `systemctl is-active grafana-server` on the server. |
| **Save & test** fails in Step 7 | The URL must be exactly `http://127.0.0.1:9091`, and Prometheus must be `active` (Step 4). |
| Dashboard panels say **No data** | Check the time range in the top-right (try **Last 15 minutes**) and that **Instance** is set to **All**. Make sure you picked the Prometheus data source during import. |
| Stream and viewer panels show 0 | That's normal when nothing is streaming. Use Step 9 to send a test stream. |

## Useful commands

```bash title="Run on your server"
# Check the services
systemctl status prometheus grafana-server antmedia

# Apply changes after editing /etc/prometheus/prometheus.yml
sudo -u prometheus promtool check config /etc/prometheus/prometheus.yml && sudo systemctl reload prometheus

# See which targets Prometheus is collecting from
curl -s http://127.0.0.1:9091/api/v1/targets
```
