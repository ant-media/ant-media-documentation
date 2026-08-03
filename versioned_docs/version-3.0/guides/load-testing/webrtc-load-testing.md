---
title: WebRTC Load Testing
description: Load-test Ant Media Server WebRTC publish and play with the Enterprise WebRTC Load Test Tool on standalone or cluster deployments.
keywords: [Ant Media Load Testing, WebRTC test tool, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

# WebRTC Load Testing

Use the **Ant Media WebRTC Load Test Tool** to simulate many WebRTC publishers and players against your Ant Media Server (**SUT** — system under test). The tool speaks Ant Media’s signaling protocol and supports headless runs for repeatable load tests.

Download the tool from your [antmedia.io](https://antmedia.io/) account (**Enterprise Edition** → Downloads).

## What you'll accomplish

By the end of this guide, you will:

1. Prepare a **standalone** or **cluster** test layout (test server + Ant Media Server).
2. Install and run the **WebRTC Load Test Tool** on a separate test machine.
3. Launch **publisher** and **player** load against standalone or load-balanced cluster deployments.

## Prerequisites

Before you begin, confirm the following:

- An **Ant Media Server Enterprise** account with access to the WebRTC Load Test Tool download.
- A **test server** (Linux recommended) separate from the SUT, with **Java 17** installed.
- A deployed **SUT**: [standalone Ant Media Server](/guides/installing-on-linux/installing-ams-on-linux/) or an [Ant Media cluster](/category/clustering-and-scaling/).
- An **MP4** test file with **H.264** video and **Opus** audio for publisher mode.

## Step 1: Prepare the system under test

The test environment has two parts: the **test server** (runs the load tool) and the **SUT** (Ant Media Server or cluster).

### Standalone server

One Ant Media Server instance acts as the SUT. The test server publishes and plays streams directly against it.

```text
+-------------------+                  +----------------------+
|                   |   streaming    |                      |
|                   |   playing      |                      |
|    Test Server    | <------------> |   Ant Media Server   |
|                   |    REST        |   (standalone)       |
+-------------------+                  +----------------------+
```

Install Ant Media Server using the [Linux installation guide](/guides/installing-on-linux/installing-ams-on-linux/).

### Cluster

The SUT is an **origin + edge** cluster behind a load balancer. Publishers typically hit the origin; players hit edges.

```text
                         +--------------------+
                         |  Ant Media Server  |
              +--------->|      (Origin)      |
+-----------+ |         +--------------------+
|           | | streaming
|Test Server+-+
|           | | playing +---------------- Load Balancer ---------------+
+-----------+ |         +--+-------------+----------------+-----------+
              | rest      |                |                |
              +-----------+  Edge 1        Edge 2    ...    Edge N
```

Deploy the cluster using [Clustering and Scaling](/category/clustering-and-scaling/) guides.

## Step 2: Install the WebRTC Load Test Tool

On the test server:

```bash
sudo apt-get install -y openjdk-17-jre
unzip webrtc-load-test-tool-*.zip
cd webrtc-load-test/
```

## Step 3: Run load tests (standalone)

From the `webrtc-load-test/` directory:

```bash
# Publish output.mp4 as myStream (1 publisher)
./run.sh -f output.mp4 -m publisher -s 10.10.175.53 -p 5080 -n 1 -u false

# Play myStream with 100 viewers
./run.sh -m player -n 100 -s 10.10.175.53 -p 5080 -u false
```

Replace `10.10.175.53` with your Ant Media Server IP. Use `-q true` and port **5443** when testing over **WSS** with SSL.

## Step 4: Run load tests (cluster)

When the origin is behind **443** and edges behind **5443** on a load-balanced hostname:

```bash
# Publish to origin through load balancer (HTTPS/WSS)
./run.sh -f test.mp4 -m publisher -s server-domain-name -n 1 -p 443 -q true -u false

# Play from edges (100 viewers)
./run.sh -m player -i streamId -n 100 -s server-domain-name -p 5443 -q true -u false
```

Replace `server-domain-name` and `streamId` with your values.

## Tool reference

| Flag | Name | Default | Description |
|------|------|---------|-------------|
| `f` | File name | `test.mp4` | Source MP4 for publisher; output file for player |
| `s` | Server IP | `localhost` | Ant Media Server or load balancer host |
| `q` | Security | `false` | `true` = WSS, `false` = WS |
| `l` | Log level | `3` | `0` VERBOSE … `4` NONE |
| `i` | Stream ID | `myStream` | Broadcast stream ID |
| `m` | Mode | `player` | `publisher` or `player` |
| `u` | Show GUI | `true` | `true` or `false` (use `false` for headless load tests) |
| `p` | Port | `5080` | WebSocket port |
| `v` | Verbose | `false` | Extra logging |
| `n` | Count | `1` | Number of publisher or player connections |
| `k` | Kafka broker | — | Kafka broker address (optional) |
| `r` | Publish loop | `false` | Loop publish when `true` |
| `c` | Codec | `h264` | `h264` or `VP8` |
| `d` | Data channel | `false` | Enable data channel |
| `a` | App name | `WebRTCAppEE` | Ant Media application name |

:::info
The MP4 source file must contain **H.264** video and **Opus** audio.
:::

## Related guides

- [HLS Load Testing](/guides/load-testing/hls-load-testing/) — simulate HLS viewers with FFmpeg.
- [RTMP Load Testing](/guides/load-testing/rtmp-load-testing/) — RTMP publish load tests.
- [Installing AMS on Linux](/guides/installing-on-linux/installing-ams-on-linux/) — standalone SUT setup.
- [Clustering and Scaling](/category/clustering-and-scaling/) — origin/edge cluster SUT setup.
