---
title: Video codecs 
description: Simplified understanding of H.264, VP8, and H.265 codecs used with Ant Media Server. This guide also explains how to enable H.264, VP8, and H.265.
keywords: [Enable H.264, VP8, and H.265, WebRTC codecs, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 6
---

# Video Codecs

In this guide, we’ll explain how to use H.264, VP8, and H.265 (HEVC) video codecs in Ant Media Server.

Currently, WebRTC relies on specific codecs for video streaming, and Ant Media Server supports H.264 and VP8 for it.

Protocols like HLS, LL-HLS, and CMAF (DASH) support H.265 codec to provide maximum compatibility and quality options. WebRTC does not officially support H.265 yet.

### Codec Configuration Changes

In earlier versions of Ant Media Server, only H264 and VP8 could be enabled from the Application Settings, while H265 required configuration through Advanced Settings. AV1 was not supported.

Starting from version 3.0.1, all supported video codecs (H264, H265, VP8, and AV1) can be enabled directly from the Application Settings.

![Video Codecs](https://raw.githubusercontent.com/ant-media/ant-media-documentation/video-codec-11/static/img/configuration-and-testing/Video%20codecs.webp)


:::info
VP8 and H.264 are mandatory in WebRTC as per RFC 7742. However, not all browsers support these codecs at the same time.
:::

- Each codec can be enabled or disabled based on your requirements. This guide will cover how to enable and configure these codecs in different scenarios.

## Enable and Configure H.264 & VP8 Codecs

In this section, learn about the H264 and VP8 video codecs.

### Enable H.264 and VP8 Codec Together

Both H.264 & VP8 can be enabled in the basic application settings.

![h264andvp8](https://github.com/user-attachments/assets/37123332-5f07-4350-ac11-09b64a433cb2)

- **SFU Mode (No adaptive bitrate):** Ant Media Server ingests a WebRTC stream in either H.264 or VP8; if both are available, H.264 is prioritized. The original stream is forwarded to players without transcoding.

- **Adaptive Bitrate Mode (if you have at least one adaptive bitrate):** If at least one adaptive bitrate is enabled, the stream is transcoded into multiple bitrates for both H.264 and VP8. This ensures compatibility across devices that support either codec. See [Adaptive streaming](https://antmedia.io/docs/guides/adaptive-bitrate/adaptive-bitrate-streaming/) for details.
