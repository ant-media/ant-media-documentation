---
title: High CPU & Memory Usage
description: Diagnose and resolve high CPU and memory usage in Ant Media Server, including the "Resource Usage is High" error, thread dumps, and heap analysis.
keywords: [high CPU usage, high memory usage, resource usage is high, thread dump, heap dump, Ant Media Server Documentation]
sidebar_position: 5
---

# High CPU & Memory Usage

Sustained CPU or memory usage above **75%** leads to degraded streams and, eventually, instance crashes. This guide explains how to diagnose the cause and what to do about it.

## "Resource Usage is High" error

**Symptom:** Publish attempts are rejected and the server reports "Resource Usage is High".

**Check:** Ant Media Server rejects new streams when CPU or memory usage exceeds the configured limits (75% by default). Check the current load on the Web Panel dashboard.

**Resolution:** The correct fix is to reduce load or add capacity (see below). If you understand the risk, the limits can be adjusted in `/usr/local/antmedia/conf/red5.properties`:

```properties
server.cpu_limit=75
server.memory_limit_percentage=75
```

Then restart the server:

```shell
sudo service antmedia restart
```

:::warning
Setting CPU or memory limits above 75% may lead to system instability and is not recommended. Treat this error as a capacity signal, not a configuration problem.
:::

## Diagnosing high CPU usage

**Step 1 — Identify what consumes CPU.** Get a thread dump using the built-in REST methods (all are GET requests, callable from the browser address bar):

```
GET http://AMS_URL:5080/rest/threads-info
GET http://AMS_URL:5080/rest/thread-dump-json
GET http://AMS_URL:5080/rest/thread-dump-raw
```

**Step 2 — Analyze:**

- Check for **dead-locked threads** in the `threads-info` output.
- Check the **blocked time** of threads in the `thread-dump-json` output.
- For deeper analysis, load the raw dump into [VisualVM](https://visualvm.github.io/).

**Common causes and fixes:**

| Cause | Fix |
| ----- | --- |
| Adaptive bitrate transcoding on CPU | Enable [hardware encoding with an Nvidia GPU](/guides/advanced-usage/using-nvidia-gpu/), reduce the number of ABR resolutions, or move transcoding to dedicated origin nodes |
| Too many concurrent streams/viewers for the instance size | Scale vertically (more vCPUs) or horizontally with a [cluster](/guides/clustering-and-scaling/manual-configuration/cluster-installation/) |
| High-resolution ingest (4K) with transcoding | Reduce ingest resolution or add GPU capacity |

As a baseline, a single-server production deployment should have at least **4 vCPUs on a compute-optimized instance with 8 GB RAM**.

## Diagnosing high memory usage

**Step 1 — Capture a heap dump** with the built-in REST method:

```
GET http://AMS_URL:5080/rest/heap-dump
```

**Step 2 — Analyze** the generated `heapdump.hprof` file with [VisualVM](https://visualvm.github.io/) or the [Eclipse Memory Analyzer Tool](https://eclipse.dev/mat/), which can detect leak suspects automatically.

**Check the JVM heap separately from system memory:** the Web Panel dashboard shows both. If JVM heap is fine but system memory is exhausted, another process on the machine is the culprit.

**Resolution:** If you find a genuine leak, report it with the heap dump analysis via [GitHub issues](https://github.com/ant-media/Ant-Media-Server/issues) or, for Enterprise Edition users, [support@antmedia.io](mailto:support@antmedia.io). Otherwise scale the instance or the cluster.

## Proactive monitoring

Do not wait for the "Resource Usage is High" error. Set up monitoring with alerting at 60–70% sustained usage:

- [Monitoring AMS with Grafana](/guides/monitoring/monitoring-ams-with-grafana/)
- [Loki & Prometheus setup](/guides/monitoring/loki-prometheus-setup/)
- [New Relic integration](/guides/monitoring/monitor-ant-media-server-statistics-with-new-relic/)

## Related documentation

- [Load testing guides](/guides/configuration-and-testing/load-testing/webrtc-load-testing/) — establish your instance's real capacity before production
- [Server configuration](/guides/configuration-and-testing/ams-server-configuration/)
