---
title: Embedded SDK
description: C++ Embedded SDK for RTSP IP cameras—WebRTC P2P and publish-to-server modes.
keywords: [Embedded SDK guide, Ant Media Server SDK, IP camera, RTSP, Ant Media Server Documentation]
sidebar_position: 8
sidebar_label: Embedded SDK
---

# Embedded SDK

The Embedded SDK is a C++ library that pulls RTSP from IP cameras and delivers WebRTC to browsers or Ant Media Server. Latency stays under about one second—useful when cameras only expose RTSP on a private network.

:::info Enterprise Edition required
The Embedded SDK runs on **Enterprise Edition** only. Publish-and-play mode also requires a commercial license and custom build artifacts from Ant Media.
:::

Reference project: [WebRTCEmbeddedSDKReference](https://github.com/ant-media/WebRTCEmbeddedSDKReference) (executables, `main.cpp`, `Makefile`, `sdkapi.h`).

Runs on ARM and x86. Deploy on the camera or on a Linux host on the same network as the RTSP source.

![](@site/static/img/sdk-diagram.png)

## Operating modes

| Mode | AMS role | Server features | License |
|------|----------|-----------------|---------|
| **Peer-to-peer** | Signaling only | No recording/transcoding on camera path | Free (reference executables) |
| **Publish and play** | Full ingest | Recording, ABR, HLS, restreaming, etc. | Commercial — contact [Ant Media](https://antmedia.io/contact/) |

### Peer-to-peer (IP camera ↔ browser)

AMS acts as a signaling server. The camera stream is not transcoded on the server—low CPU on AMS.

1. Clone [WebRTCEmbeddedSDKReference](https://github.com/ant-media/WebRTCEmbeddedSDKReference).
2. Use the prebuilt binary for your architecture under `executables/arm`, `executables/arm64`, or `executables/x86` — `webrtc_pull_rtsp`.
3. Run:

```bash
./webrtc_pull_rtsp ws://my.ant.media.server.io:5080/WebRTCAppEE/websocket rtsp://172.17.0.1:6554/test.flv mystream
```

4. Play in the browser with [cam_play.html](https://github.com/ant-media/StreamApp/blob/master/src/main/webapp/cam_play.html).

### Publish and play (stream on AMS)

The camera stream is published to AMS like any other WebRTC ingest. Play with [player.html](https://github.com/ant-media/StreamApp/blob/master/src/main/webapp/player.html) or [play.html](https://github.com/ant-media/StreamApp/blob/master/src/main/webapp/play.html). Server-side processing applies.

Default reference executables use P2P mode. **Publish-and-play** requires a licensed `main.cpp` from Ant Media and a [rebuild](https://github.com/ant-media/WebRTCEmbeddedSDKReference#building-reference-project) for your architecture.

After a successful build, run `webrtc_pull_rtsp` to publish the RTSP source to AMS.

## Multiple streams

Run one process per stream:

```bash
./webrtc_pull_rtsp "ws://127.0.0.1:5080/WebRTCAppEE/websocket" "rtsp://127.0.0.1:6554/test.flv" "stream1" &
./webrtc_pull_rtsp "ws://127.0.0.1:5080/WebRTCAppEE/websocket" "rtsp://127.0.0.1:6554/test.flv" "stream2" &
```

See also the [SDK overview](/guides/developer-sdk-and-api/sdk-integration/) for licensing and platform comparison.
