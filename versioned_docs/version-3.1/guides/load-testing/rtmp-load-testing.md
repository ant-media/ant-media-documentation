---
title: RTMP Load Testing
description: Simulate multiple RTMP publishers on Ant Media Server using FFmpeg and the rtmp_publisher.sh load test script.
keywords: [Ant Media Load Testing, RTMP load test, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---

# RTMP Load Testing

Simulate many **RTMP publishers** pushing the same MP4 file into Ant Media Server. The `rtmp_publisher.sh` script uses **FFmpeg** to open multiple publish connections with distinct stream IDs (`test_1`, `test_2`, …).

For WebRTC load tests, see [WebRTC Load Testing](/guides/load-testing/webrtc-load-testing/).

## What you'll accomplish

By the end of this guide, you will:

1. Download and run the **RTMP load test script** on a test machine.
2. Publish multiple **RTMP streams** to an Ant Media Server application.
3. Scale publisher count to measure ingest capacity.

## Prerequisites

Before you begin, confirm the following:

- **Ubuntu 20.04 or later** on the test machine (or any Linux host with FFmpeg).
- **FFmpeg** installed (`sudo apt install -y ffmpeg`).
- An **MP4 file** on the test machine for looping publish.
- Ant Media Server reachable at your **RTMP** endpoint (port **1935** by default, or RTMPS as configured).

## Step 1: Download the RTMP load test script

```bash
sudo wget https://raw.githubusercontent.com/ant-media/Scripts/master/load-testing/rtmp_publisher.sh
sudo chmod +x rtmp_publisher.sh
```

## Step 2: Run the RTMP load test

```bash
sudo ./rtmp_publisher.sh /path/to/file.mp4 rtmp://domain-or-ip/AppName/streamId 10
```

Example:

```bash
sudo ./rtmp_publisher.sh /home/ubuntu/test.mp4 rtmp://rtmp.antmedia.io/LiveApp/test 10
```

This publishes **10** streams with IDs `test_1`, `test_2`, … `test_10` in the `LiveApp` application.

Replace the MP4 path, RTMP URL, application name, base stream ID, and publisher count as needed.

## Step 3: Stop the test

```bash
sudo pkill ffmpeg
```

Increase the final number argument to simulate higher publish load. Watch active broadcasts and resource usage in the Ant Media Server dashboard.

## Related guides

- [WebRTC Load Testing](/guides/load-testing/webrtc-load-testing/) — WebRTC publish/play load with the Enterprise test tool.
- [HLS Load Testing](/guides/load-testing/hls-load-testing/) — simulate HLS viewers.
- [SRT Load Testing](/guides/load-testing/srt-load-testing/) — simulate multiple SRT publishers.
- [Publish with RTMP](/guides/publish-live-stream/rtmp/publish-with-obs/) — RTMP ingest configuration.
