---
title: RTSP Load Testing
description: Generate RTSP sources with GStreamer and load-test Ant Media Server ingest by creating multiple RTSP stream sources via REST API.
keywords: [Ant Media Load Testing, RTSP load test, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 5
---

# RTSP Load Testing

RTSP load testing differs from RTMP or SRT publish tests: you first run an **RTSP source server**, then register that URL as multiple **Stream Sources** in Ant Media Server through the **REST API**. Each source pulls the same RTSP feed, simulating many concurrent IP-camera-style ingests.

For WebRTC load tests, see [WebRTC Load Testing](/guides/load-testing/webrtc-load-testing/).

## What you'll accomplish

By the end of this guide, you will:

1. Stand up a **GStreamer RTSP server** serving a sample MP4.
2. Register **multiple RTSP stream sources** in Ant Media Server via REST API.
3. Observe ingest load (CPU, RAM, broadcasts, throughput) on your SUT.

## Prerequisites

Before you begin, confirm the following:

- **Ubuntu 20.04 or later** on the RTSP generator host and Ant Media Server (same host is fine for small tests).
- Network access between the RTSP server and Ant Media Server (**TCP 8554** by default).
- **GStreamer** packages on the RTSP generator host:

```bash
sudo apt update
sudo apt install -y gstreamer1.0* libgstrtspserver-1.0-0
```

- Ant Media Server running with REST API access (HTTPS **5443** or HTTP **5080**).

## Step 1: Download RTSP test files

On the RTSP generator host:

```bash
sudo wget https://raw.githubusercontent.com/ant-media/Scripts/master/load-testing/rtsp_loadtest/start_rtsp_server.sh
sudo wget https://raw.githubusercontent.com/ant-media/Scripts/master/load-testing/rtsp_loadtest/test-launch
sudo wget https://raw.githubusercontent.com/ant-media/Scripts/master/load-testing/rtsp_loadtest/test.mp4
sudo chmod +x start_rtsp_server.sh test-launch
```

## Step 2: Start the RTSP server

```bash
sudo ./start_rtsp_server.sh test.mp4
```

Default encoding: **1920×1080**, **25 FPS**, **2000 kbps**, **H.264**. Edit the script to change resolution, bitrate, or codec if needed.

The stream is available at:

```text
rtsp://SERVER_IP:8554/test
```

Replace `SERVER_IP` with the RTSP host's reachable IP (for example `rtsp://203.0.113.10:8554/test`).

## Step 3: Create RTSP stream sources via REST API

Use a loop to create multiple stream sources that pull the same RTSP URL. Example — **10** sources:

```bash
for i in {1..10}
do
  curl -X POST -H "Content-Type: application/json" \
    "https://AMS_SERVER:5443/live/rest/v2/broadcasts/create?autoStart=true" \
    -d "{
      \"type\":\"streamSource\",
      \"name\":\"rtsp-load-$i\",
      \"streamId\":\"rtsp-load-$i\",
      \"streamUrl\":\"rtsp://203.0.113.10:8554/test\"
    }"
done
```

Replace `AMS_SERVER`, application path (`live`), RTSP URL, and the range `{1..10}` for higher counts (for example `{1..50}`).

Created stream IDs: `rtsp-load-1`, `rtsp-load-2`, … through `rtsp-load-N`.

Monitor **CPU**, **RAM**, **active broadcasts**, and **network throughput** in the Ant Media Server dashboard during the test.

## Step 4: Stop the RTSP server

```bash
sudo pkill test-launch
```

Remove or stop stream sources in the dashboard or via REST API when the test completes.

## Related guides

- [WebRTC Load Testing](/guides/load-testing/webrtc-load-testing/) — WebRTC publish/play load with the Enterprise test tool.
- [RTMP Load Testing](/guides/load-testing/rtmp-load-testing/) — FFmpeg-based RTMP publish load.
- [IP Camera and Stream Source](/guides/publish-live-stream/ip-camera-and-stream-source/) — RTSP stream source concepts.
- [REST API — Broadcasts](/guides/developer-sdk-and-api/rest-api-guide/) — manage stream sources programmatically.
