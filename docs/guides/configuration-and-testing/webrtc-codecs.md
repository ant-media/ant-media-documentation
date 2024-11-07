---
title: WebRTC codecs 
description: Simplified understanding of H.264, VP8, and H.265 codecs used with Ant Media Server. This guide also explains how to enable or disable H.264, VP8, and H.265.
keywords: [Enable H.264, VP8, & H.265, Disable H.264, VP8, & H.265, WebRTC codecs, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 6
---

# WebRTC codecs

In this guide, we’ll explain how to use H.264, VP8, and H.265 (HEVC) codecs in Ant Media Server. WebRTC relies on specific codecs for video streaming, and Ant Media Server supports H.264, VP8, and H.265 to provide maximum compatibility and quality options.

- While H.264 & VP8 codecs can be enabled directly from the Basic application settings, H.265 codec needs to be enabled from the Advanced settings.

![codec-support](https://github.com/user-attachments/assets/951a04d9-eaf2-4377-8793-95cced896736)

::💁
VP8 and H.264 are mandatory in WebRTC as per RFC 7742. However, not all browsers support these codecs at the same time.

- Each codec can be enabled or disabled based on your requirements. This guide will cover how to enable and configure these codecs in different scenarios.

## Enabling and Configuring Codecs

### Enabling H.264 and VP8 Together

Both H.264 & VP8 can be enabled in the basic application settings.

![h264 vp8](https://github.com/user-attachments/assets/f87412d0-f65c-4ec7-ac8e-bed77eb135b0)


- **SFU Mode (No adaptive bitrate):** Ant Media Server can ingest a WebRTC stream in either H.264 or VP8; if both are available, H.264 is prioritized. In this mode, no transcoding occurs, so the original stream is forwarded to players.

- **Adaptive Bitrate Mode (if you have at least one adaptive bitrate):** Ant Media Server ingests the stream. It transcodes it into multiple bitrates for both H.264 and VP8 codecs if [Adaptive streaming](https://antmedia.io/docs/guides/adaptive-bitrate/adaptive-bitrate-streaming/) is enabled. This ensures compatibility across devices that support either codec.

### Enabling Only H.264

![h264](https://github.com/user-attachments/assets/cfe26a24-6b8e-4a5f-94d9-68bfc260fc47)

- **SFU Mode:**: Only H.264 streams are ingested and forwarded without transcoding.
- **Adaptive Bitrate Mode:** The stream is ingested and transcoded into various H.264 bitrates for adaptive streaming. Devices that support H.264 can then play the stream.

You can check if your device supports H264 [at this link](https://mozilla.github.io/webrtc-landing/pc_test_no_h264.html).

### Enabling Only VP8

![vp8](https://github.com/user-attachments/assets/c8900114-0f74-4cba-9dd9-c5b0da5b757a)

- **SFU Mode:** Only VP8 streams are ingested and forwarded to players.
- **Adaptive Bitrate Mode:** VP8 is ingested and transcoded to different bitrates. Note that HLS Streaming and MP4 Recording will not work if only VP8 is enabled.

::💁
Compatibility Note: HLS and MP4 recording require H.264. Enabling only VP8 will limit recording (WebM) and playback (WebRTC) options.
