---
title: SRT Load Testing
description: Simulate multiple SRT publishers on Ant Media Server using FFmpeg and the srt_publisher.sh load test script.
keywords: [Ant Media Load Testing, SRT load test, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 4
---

# SRT Load Testing

Simulate many **SRT publishers** pushing the same MP4 file into Ant Media Server. The `srt_publisher.sh` script uses **FFmpeg** to open multiple SRT connections with distinct stream IDs (`test_1`, `test_2`, …).

For WebRTC load tests, see [WebRTC Load Testing](/guides/load-testing/webrtc-load-testing/).

## What you'll accomplish

By the end of this guide, you will:

1. Download and run the **SRT load test script** on a test machine.
2. Publish multiple **SRT streams** using the `streamid=AppName/streamId` format.
3. Scale publisher count to measure SRT ingest capacity.

## Prerequisites

Before you begin, confirm the following:

- **Ubuntu 20.04 or later** on the test machine (or any Linux host with FFmpeg and SRT support).
- **FFmpeg** with SRT enabled installed on the test machine.
- An **MP4 file** on the test machine for looping publish.
- Ant Media Server **SRT ingest** enabled (default port **4200** unless changed).

## Step 1: Download the SRT load test script

```bash
sudo wget https://raw.githubusercontent.com/ant-media/Scripts/master/load-testing/srt_publisher.sh
sudo chmod +x srt_publisher.sh
```

## Step 2: Run the SRT load test

```bash
sudo ./srt_publisher.sh /path/to/file.mp4 srt://domain-or-ip:4200?streamid=AppName/streamId 10
```

Example:

```bash
sudo ./srt_publisher.sh /home/ubuntu/test.mp4 srt://srt.antmedia.io:4200?streamid=LiveApp/test 10
```

This publishes **10** SRT streams with IDs `test_1`, `test_2`, … `test_10` in the `LiveApp` application.

Replace the MP4 path, SRT URL, `streamid`, and publisher count as needed.

## Step 3: Stop the test

```bash
sudo pkill ffmpeg
```

Increase the publisher count to test higher loads. Monitor active broadcasts and server resources in the dashboard.

## Related guides

- [WebRTC Load Testing](/guides/load-testing/webrtc-load-testing/) — WebRTC publish/play load with the Enterprise test tool.
- [HLS Load Testing](/guides/load-testing/hls-load-testing/) — simulate HLS viewers.
- [RTMP Load Testing](/guides/load-testing/rtmp-load-testing/) — simulate multiple RTMP publishers.
- [Publish with SRT](/guides/publish-live-stream/srt/srt/) — SRT ingest configuration.
