---
title: Video Codecs 
description: Simplified understanding of H.264, VP8, H.265 and AV1 video codecs used with Ant Media Server.
keywords: [Enable H.264, VP8, H.265 & AV1 WebRTC codecs, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

# Video Codecs

In this guide, we’ll explain how to use `H.264`, `VP8`, `H.265(HEVC)` and `AV1` video codecs in Ant Media Server.

Currently, WebRTC relies on specific codecs for video streaming, and Ant Media Server supports H.264, VP8 & AV1 for it.

Protocols like HLS, LL-HLS, and CMAF (DASH) support the H.265 codec to provide maximum compatibility and quality options. WebRTC does not officially support H.265 yet.

## Codec Configuration

In earlier versions of Ant Media Server, only H.264 and VP8 could be enabled from the application settings, while H.265 required configuration through advanced settings and AV1 was not supported.

Starting from version 3.0.1, all supported video codecs (H.264, H.265, VP8, and AV1) can be enabled directly from the application settings via the web panel.

![Video Codecs](https://raw.githubusercontent.com/ant-media/ant-media-documentation/video-codec-11/static/img/configuration-and-testing/Video%20codecs.webp)


:::info
VP8 and H.264 are mandatory in WebRTC as per RFC 7742. However, not all browsers support these codecs at the same time.
:::

Each codec can be enabled or disabled based on your requirements. This guide will cover how to enable and configure these codecs in different scenarios.
