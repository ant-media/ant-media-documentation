---
title: HLS Load Testing
description: Simulate HLS viewers on Ant Media Server using FFmpeg and the hls_players.sh load test script.
keywords: [Ant Media Load Testing, hls load test, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

# HLS Load Testing

Simulate many **HLS viewers** pulling the same `.m3u8` playlist from Ant Media Server. The `hls_players.sh` script spawns multiple **FFmpeg** processes—each acting as a viewer—so you can stress-test playback capacity without real browsers.

For WebRTC load tests, see [WebRTC Load Testing](/guides/load-testing/webrtc-load-testing/).

## What you'll accomplish

By the end of this guide, you will:

1. Download and run the **HLS load test script** on a test machine.
2. Point simulated viewers at a **live HLS stream** on Ant Media Server.
3. Scale viewer count to measure playback load on your server.

## Prerequisites

Before you begin, confirm the following:

- **Ubuntu 20.04 or later** on the test machine (or any Linux host with FFmpeg).
- **FFmpeg** installed (`sudo apt install -y ffmpeg`).
- A **live stream** already publishing to Ant Media Server with **HLS** enabled (know the `.m3u8` URL and stream ID).

## Step 1: Download the HLS load test script

```bash
sudo wget https://raw.githubusercontent.com/ant-media/Scripts/master/load-testing/hls_players.sh
sudo chmod +x hls_players.sh
```

## Step 2: Start a live stream

Publish a stream to Ant Media Server (for example stream ID `stream1` in application `LiveApp`). Note the HLS playback URL from the dashboard or your deployment.

## Step 3: Run the HLS load test

```bash
sudo ./hls_players.sh https://AMS-Domain:5443/LiveApp/streams/stream1.m3u8 100
```

Replace:

- The URL with your **HTTPS HLS playlist** URL (`5443` when SSL is enabled).
- `100` with the number of simulated viewers.

The script starts one FFmpeg process per viewer, all pulling the same manifest.

## Step 4: Stop the test

```bash
sudo pkill ffmpeg
```

Increase the viewer count in Step 3 to test higher loads. Monitor CPU, memory, and bandwidth on Ant Media Server during the run.

## Related guides

- [WebRTC Load Testing](/guides/load-testing/webrtc-load-testing/) — WebRTC publish/play load with the Enterprise test tool.
- [RTMP Load Testing](/guides/load-testing/rtmp-load-testing/) — simulate multiple RTMP publishers.
- [SRT Load Testing](/guides/load-testing/srt-load-testing/) — simulate multiple SRT publishers.
- [HLS Playing](/guides/playing-live-stream/hls-playing/) — HLS playback setup and URLs.
