---
title: Video Codecs Overview
description: Overview of H.264, VP8, and H.265 video codecs in Ant Media Server and how to choose the right one.
sidebar_label: Overview
keywords: [Enable H.264, VP8 & H.265 WebRTC codecs, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

# Video Codecs Overview

Ant Media Server supports **H.264**, **VP8**, and **H.265 (HEVC)** for live streaming. The codec you enable affects browser compatibility, bandwidth use, latency, and which protocols you can use.

## What you'll accomplish

By the end of this overview, you will:

1. Understand which codecs Ant Media Server supports and where each fits (WebRTC vs HLS/DASH).
2. Know **which codec to start with** as a new user.
3. See how to enable codecs from the application settings in the web panel.

## Supported codecs

| Codec | WebRTC | HLS / LL-HLS / DASH | Notes |
|-------|--------|---------------------|-------|
| [H.264](/guides/configuration-and-testing/video-codec/h264/) | Yes | Yes | Default choice; widest device and browser support. |
| [VP8](/guides/configuration-and-testing/video-codec/vp8/) | Yes | Limited | Open, royalty-free; good WebRTC fallback. |
| [H.265 (HEVC)](/guides/configuration-and-testing/video-codec/h265/) | No (not official in WebRTC) | Yes | Better compression for HLS/DASH; limited browser WebRTC support. |

WebRTC publishing and playback rely on **H.264** and **VP8**. **H.265** is mainly for **HLS**, **LL-HLS**, and **CMAF (DASH)** delivery where you want lower bitrate at the same quality.

:::info
VP8 and H.264 are mandatory in WebRTC per [RFC 7742](https://datatracker.ietf.org/doc/html/rfc7742). Not every browser supports both at the same time, which is why many deployments enable more than one codec.
:::

## Which codec should I choose?

**Start with H.264.** It is the safest default for most Ant Media Server projects:

- Works across the major browsers, mobile devices, and embedded platforms.
- Supported for **WebRTC**, **RTMP**, **SRT**, and adaptive streaming workflows.
- Hardware acceleration is widely available, which helps keep latency and CPU use low.

Use this simple decision guide:

| Your goal | Recommended starting point | Why |
|-----------|------------------------------|-----|
| First WebRTC live stream | **H.264 only** | Easiest path; works on the largest share of clients. |
| Mixed browsers (Chrome, Firefox, Safari) | **H.264 + VP8** | Covers clients that prefer one WebRTC codec over the other. |
| HLS or DASH to save bandwidth | **H.264 + H.265** | H.265 improves compression for HTTP-based playback; keep H.264 for WebRTC. |
| Maximum compatibility, minimal setup | **H.264 only** | Avoid extra transcoding and compatibility surprises. |

Enable additional codecs only when you have a clear reason—extra codecs can mean more transcoding, CPU load, and testing across players.

For step-by-step enablement and protocol details, open the guide for each codec:

- [H.264](/guides/configuration-and-testing/video-codec/h264/)
- [VP8](/guides/configuration-and-testing/video-codec/vp8/)
- [H.265 (HEVC)](/guides/configuration-and-testing/video-codec/h265/)

## Codec configuration

In earlier Ant Media Server versions, only **H.264** and **VP8** could be enabled from basic application settings, while **H.265** required advanced settings.

In **Ant Media Server v2.17**, all supported video codecs (**H.264**, **H.265**, and **VP8**) can be enabled from **Application → Settings** in the web panel.

1. Log in to the Ant Media Server dashboard.
2. Select your application.
3. Open the **Settings** tab.
4. Enable or disable the codecs you need, then save.

Each codec can be turned on or off based on your use case. The linked guides above explain SFU mode, adaptive bitrate behavior, and protocol-specific notes for each codec.
