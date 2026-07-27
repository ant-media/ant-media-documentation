---
title: Prometheus
description: Monitoring Ant Media Server with Prometheus
keywords: [Prometheus, Observability, Ant Media Server Documentation, Ant Media Server Tutorials]
---

# Prometheus Support

Prometheus is an open-source monitoring system that periodically collects time-series metrics from services. It is commonly used as part of an observability stack to track system health, investigate performance issues, create dashboards, and trigger alerts.

Ant Media Server exposes server, JVM, and operating-system metrics in Prometheus format at `http://<AMS_HOST>:9090/metrics` by default. Prometheus can scrape this endpoint and store the metrics for querying and visualization.

The metrics endpoint uses a dedicated HTTP port:

- Only `/metrics` is available on the Prometheus port.
- `/metrics` is not available on the main Ant Media Server HTTP port.

Using a separate port keeps observability traffic separate from streaming and application traffic. It lets you apply a dedicated firewall or security-group rule, prevents the metrics endpoint from being exposed through the public streaming load balancer, and makes monitoring access easier to control. We recommend allowing port `9090` only from the Prometheus server or monitoring network.

## Configuration

Prometheus metric exposure is enabled by default. You can change the following settings in `/usr/local/antmedia/conf/red5.properties`:

```properties
# Enable exposing server metrics at /metrics
prometheus.enabled=true
prometheus.port=9090
```

Set `prometheus.enabled=false` to disable the endpoint, or change `prometheus.port` if port `9090` is already in use. Restart Ant Media Server after editing `red5.properties`:

```bash
sudo systemctl restart antmedia
```

If Prometheus runs on another host, allow the configured port through the server firewall. For security, restrict access to the Prometheus server or trusted monitoring network instead of exposing the endpoint publicly.

## Verify the metrics endpoint

Request the endpoint from the Ant Media Server host:

```bash
curl http://localhost:9090/metrics
```

An enabled endpoint returns HTTP `200` and metrics in the Prometheus text exposition format. A disabled endpoint returns HTTP `404`.

## Configure Prometheus to scrape Ant Media Server

Add Ant Media Server as a target in `prometheus.yml`:

```yaml
scrape_configs:
  - job_name: ant-media-server
    metrics_path: /metrics
    static_configs:
      - targets:
          - <AMS_HOST>:9090
```

Replace `<AMS_HOST>` with the hostname or IP address that the Prometheus server uses to reach Ant Media Server, and then reload or restart Prometheus.

### Autoscaled clusters on AWS

Do not maintain a static target list for an autoscaled cluster because instance addresses change as nodes are launched and terminated. Instead, tag the EC2 instances created by the Auto Scaling group and use Prometheus EC2 service discovery to find the current nodes.

For example, apply the tag `AntMediaPrometheus=enabled` to the Auto Scaling group with tag propagation enabled. Then configure Prometheus as follows:

```yaml
scrape_configs:
  - job_name: ant-media-server
    ec2_sd_configs:
      - region: eu-central-1
        port: 9090
        filters:
          - name: tag:AntMediaPrometheus
            values:
              - enabled
          - name: instance-state-name
            values:
              - running
    relabel_configs:
      - source_labels:
          - __meta_ec2_instance_id
        target_label: instance_id
      - source_labels:
          - __meta_ec2_availability_zone
        target_label: availability_zone
      - source_labels:
          - __meta_ec2_tag_Name
        target_label: instance_name
```

Change the Region and tag to match your environment. EC2 service discovery uses each instance's private IP address by default and refreshes the target set automatically, so newly scaled-out nodes are added without editing `prometheus.yml`, and terminated nodes disappear from the active target set.

The AWS identity used by Prometheus requires the `ec2:DescribeInstances` permission. When Prometheus runs on EC2, attach this permission through an instance role instead of storing access keys in the configuration. Its security group must also be allowed to connect to TCP port `9090` on the Ant Media Server instances.

The Ant Media-specific metrics report values for one local server. Prometheus scrapes every discovered node independently; use the discovered labels to inspect individual instances and PromQL aggregations such as `sum(antmedia_streams_live)` to observe the cluster as a whole.

## Ant Media Server metrics

Metric names use underscores in the Prometheus output:

| Metric | Description |
| --- | --- |
| `antmedia_streams_live` | Number of local live streams |
| `antmedia_streams_webrtc_live` | Number of local WebRTC live streams |
| `antmedia_viewers_webrtc` | Number of local WebRTC viewers |
| `antmedia_viewers_hls` | Number of local HLS viewers |
| `antmedia_viewers_dash` | Number of local DASH viewers |
| `antmedia_encoders_blocked` | Number of blocked encoders |
| `antmedia_encoders_not_opened` | Number of encoders that could not be opened |
| `antmedia_publish_timeout_errors` | Number of publish timeout errors |
| `antmedia_db_query_average_duration_milliseconds` | Average datastore query duration in milliseconds |
| `antmedia_vertx_worker_queue_size{pool="server"}` | Vert.x server worker queue size |
| `antmedia_vertx_worker_queue_size{pool="webrtc"}` | Vert.x WebRTC worker queue size |

The endpoint also includes standard Micrometer metrics for the JVM, system, process, and logging subsystems. To see every metric available in your installation, inspect the `/metrics` response or use the Prometheus metric explorer.