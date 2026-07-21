---
title: Monitoring & Alerting Thresholds
description: What to monitor on an Ant Media Server deployment and which alert thresholds to use, consolidated across Grafana, Prometheus, and New Relic setups.
keywords: [monitoring, alerting, thresholds, Grafana, Prometheus, metrics, runbook, Ant Media Server Documentation]
sidebar_position: 3
---

# Monitoring & Alerting Thresholds

This page consolidates **what** to monitor and **when** to alert, independent of the tool. For tool setup, see [Grafana](/guides/monitoring/monitoring-ams-with-grafana/), [Loki & Prometheus](/guides/monitoring/loki-prometheus-setup/), or [New Relic](/guides/monitoring/monitor-ant-media-server-statistics-with-new-relic/).

## Core metrics and thresholds

Ant Media Server rejects new streams when CPU or memory exceeds 75% (the built-in `server.cpu_limit`). Your alerts must fire **before** that limit is reached.

| Metric | Warning | Critical | Rationale |
| ------ | ------- | -------- | --------- |
| System CPU (5 min sustained) | 60% | 70% | Server rejects streams at 75%; leave reaction time |
| System memory | 60% | 70% | Same built-in limit applies to memory |
| JVM heap usage | 70% | 85% | Sustained high heap with full GCs precedes instability |
| Disk usage (`/usr/local/antmedia`) | 70% | 85% | Recording failures and log loss on full disk |
| Disk usage growth rate | - | > 5%/hour unexpected | Catches runaway recordings/logs before the disk fills |
| Certificate expiry | 21 days | 7 days | Expired certificates break all WebRTC clients |

## Streaming health metrics

Available via the REST API (`/rest/v2/system-resources`, broadcast statistics) and the Web Panel:

| Metric | Alert condition | What it usually means |
| ------ | --------------- | --------------------- |
| Active stream count | Drop of > 20% in 1 minute | Node failure or mass disconnect (network, certificate) |
| WebRTC viewer count vs. baseline | Sudden drop to near zero | Edge failure or SSL/TURN breakage |
| Stream bitrate | Below expected for > 1 min | Publisher network problems; pair with [quality enforcement](/guides/adaptive-bitrate/enforcing-stream-quality/) |
| Packet loss (WebRTC stats) | > 5% sustained | Network congestion; ABR should be absorbing this |

## Cluster-specific checks

| Check | Alert condition |
| ----- | --------------- |
| Node count registered in MongoDB | Fewer nodes than expected |
| MongoDB replica set health | Any member down, or replication lag > 10 s |
| Origin-edge fetch failures in logs | Any occurrence (see [cluster troubleshooting](/guides/troubleshooting/cluster-issues/)) |
| Load balancer backend health | Any backend marked down |

## Log-based alerts

Ship `/usr/local/antmedia/log/ant-media-server.log` and `antmedia-error.log` to your log platform ([cluster log collection](/guides/monitoring/collecting-logs-from-ams-cluster/), [centralized logging](/guides/monitoring/centralized-logging/)) and alert on:

- `OutOfMemoryError` — immediate critical.
- Repeated MongoDB connection errors — cluster coordination at risk.
- `PKIX path building failed` — SSL trust problem (see [SSL troubleshooting](/guides/troubleshooting/ssl-and-turn-issues/)).
- Spikes in `unauthorized_access` — misconfigured clients or an actual probe.

## Synthetic checks

Metrics tell you the server is up; synthetic checks tell you streaming actually works:

1. **HTTP check:** `https://your-domain:5443/{app}/rest/v2/broadcasts/count` every minute.
2. **End-to-end streaming check:** publish a short test stream and verify playback every 5-15 minutes (a headless script using the JavaScript SDK, or RTMP push with ffmpeg plus HLS fetch).
3. Alert on synthetic failure from two consecutive runs to avoid flapping.

## When an alert fires

Route responders to the symptom-based guides in the [Troubleshooting section](/guides/troubleshooting/) — notably [high CPU & memory](/guides/troubleshooting/high-cpu-and-memory/) and [cluster issues](/guides/troubleshooting/cluster-issues/).
