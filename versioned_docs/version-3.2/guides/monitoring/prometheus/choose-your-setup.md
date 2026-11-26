---
title: Choose Your Prometheus Setup
description: Pick the Prometheus and Grafana monitoring guide that fits your Ant Media Server, a standalone server, a manual cluster, or an autoscaling cluster.
keywords: [Prometheus, Grafana, monitoring, metrics, dashboard, cluster, autoscaling, Ant Media Server]
sidebar_position: 1
sidebar_label: Choose Your Setup
---

# Choose Your Prometheus Setup

Ant Media Server (AMS) measures what it is doing all the time: live streams, viewers, CPU, memory and more. These guides turn those numbers into a **live dashboard in your browser**, using two free tools:

- **Prometheus** collects the numbers every 15 seconds and keeps 15 days of history.
- **Grafana** draws them as graphs, using a ready-made Ant Media dashboard.

![The finished Ant Media Server dashboard in Grafana](@site/static/img/monitoring/prometheus/grafana-ams-dashboard-overview.png)

When you finish, you can see at a glance how many people are watching, whether a server is running out of CPU or disk, and which node in your cluster is struggling.

:::note
These guides read metrics directly from AMS and need no extra services. If you already send AMS statistics to Kafka and Elasticsearch, see [Monitoring with Grafana](/guides/monitoring/monitoring-ams-with-grafana/) instead.
:::

## Pick your guide

![A standalone server runs everything on one AMS server. A manual cluster uses a monitoring server that watches a fixed list of nodes. An autoscaling cluster uses a monitoring server that finds nodes automatically through MongoDB.](@site/static/img/monitoring/prometheus/three-setups.svg)

| Your Ant Media Server | Follow this guide | Time |
| --- | --- | --- |
| One server | [Standalone Server](./standalone-server.mdx) | 15 min |
| A cluster with a fixed set of nodes | [Manual Cluster](./manual-cluster.mdx) | 20 min |
| A cluster that adds and removes nodes automatically | [Autoscaling Cluster](./autoscaling-cluster.mdx) | 30 min |

Each guide is complete on its own. Follow only the one that matches your setup.

## Requirements

- Servers running **Ubuntu 24.04** on **x86_64**. To check, run `uname -m` on each server. The output must be `x86_64`.
- SSH access to each server with `sudo` rights.
- Permission to change your firewall or cloud security groups.

## What is on the dashboard {#whats-on-the-dashboard}

The dashboard shows every metric AMS publishes. Use **Instance** to pick a server, and the time picker at the top right to look back up to 15 days. The **Overview** row always shows the current values. The other rows show graphs over the selected time range.

| Section | What it tells you | Watch out for |
| --- | --- | --- |
| **Overview** | Up/down, streams, viewers, CPU, uptime | **Scrape target up** = `0`: Prometheus can't reach that server |
| **Streaming** | Streams, viewers per protocol, encoder problems, publish timeouts | Blocked encoders or publish timeouts above `0` |
| **System / host** | CPU, load, memory, disk, open files | CPU near 100% or disk almost full |
| **JVM memory** | Memory used inside the Java engine that runs AMS | Heap **used** close to **max** |
| **JVM garbage collection** | How often and how long Java pauses to free memory | Long or frequent GC pauses |
| **JVM threads, classes, JIT** | Threads, loaded classes and code compilation | Thread count that keeps growing |
| **Logging** | Error and warning messages per second | A sudden rise in **error** |

To see the raw numbers, run `curl -s http://127.0.0.1:9090/metrics` on any AMS server.
