---
title: VP8
description: Enable and use the VP8 codec in Ant Media Server for open, royalty-free WebRTC streaming.
keywords: [VP8 codec, WebRTC VP8, Ant Media Server VP8, video codec configuration, open source codec, AMS streaming]
sidebar_position: 3
---

# VP8 Codec

**VP8** is an open-source video codec developed by Google and widely used in WebRTC applications. It is a reliable alternative to H.264, especially when you prefer royalty-free codecs or need a WebRTC fallback for clients that do not use H.264.

For a comparison with other codecs, see [Video Codecs Overview](/guides/configuration-and-testing/video-codec/).

## What you'll accomplish

By the end of this guide, you will:

1. Understand when VP8 is the right codec for your use case.
2. Enable VP8 from application settings in the web panel.
3. Know how VP8 behaves in SFU and adaptive bitrate (ABR) modes.
4. Combine VP8 with H.264 when you need broader WebRTC browser coverage.

## Limitations

| Limitation | Details |
|------------|---------|
| Hardware acceleration | Less widely hardware-accelerated than H.264, especially on mobile devices. |
| Recording formats | Does not support **HLS** or **MP4** recording; WebM recording is available. |
| Device compatibility | Some browsers (for example Safari) may have limited or no VP8 support. |
| CPU usage | Encoding and decoding can use more CPU than H.264 on some hardware. |

:::info
**HLS** and **MP4** recordings require the H.264 codec. Enabling only VP8 limits recording to **WebM** format and playback primarily to **WebRTC**.
:::

## When to use VP8

Choose VP8 when you need:

- A **fully open-source and royalty-free** codec with no licensing costs.
- A **WebRTC-focused** streaming application with low-latency delivery.
- Coverage for audiences mainly on **Chrome, Firefox, and Edge**.
- A **WebRTC fallback** alongside H.264 for mixed browser environments.

Avoid VP8-only setups if you require **HLS**, **MP4 recording**, or broad **Safari** support—use H.264 or enable **H.264 + VP8** together.

## Protocol support

| Area | Support |
|------|---------|
| WebRTC publish | Yes |
| WebRTC playback | Yes |
| RTMP / SRT / WHIP | No (WebRTC ingest only) |
| HLS / LL-HLS / DASH | No |
| MP4 recording | No |
| WebM recording | Yes |

## Step 1: Enable VP8

1. Log in to the Ant Media Server dashboard.
2. Select your application.
3. Open the **Settings** tab.
4. Enable **VP8** and save.

![vp8](https://github.com/user-attachments/assets/c8900114-0f74-4cba-9dd9-c5b0da5b757a)

When only VP8 is enabled:

- **SFU mode:** Ant Media Server ingests VP8 streams and forwards them without transcoding.
- **ABR mode:** VP8 streams are transcoded into multiple bitrates for adaptive playback.

## Step 2: Enable VP8 and H.264 together (optional)

Enable **VP8** and **H.264** together when some clients require VP8 and others require H.264 in WebRTC. See also [H.264 Codec — Step 2](/guides/configuration-and-testing/video-codec/h264/#step-2-enable-h264-and-vp8-together-optional).

![h264andvp8](https://github.com/user-attachments/assets/37123332-5f07-4350-ac11-09b64a433cb2)

- **SFU mode:** Ant Media Server ingests WebRTC in H.264 or VP8; if both are available, **H.264 is prioritized**. The original stream is forwarded without transcoding.
- **ABR mode:** With at least one adaptive bitrate enabled, the stream is transcoded into multiple bitrates for both codecs. See [Adaptive Bitrate Streaming](/guides/adaptive-bitrate/adaptive-bitrate-streaming/) for details.

## Streaming and playback

In Ant Media Server, **WebRTC** is the primary protocol for publishing and playing streams with VP8.

To publish and play with WebRTC:

- [WebRTC publishing](/guides/publish-live-stream/webrtc/)
- [WebRTC playback](/guides/playing-live-stream/webrtc-playback/)

## Compatibility check

Verify VP8 support in target browsers:

- Browser support: [caniuse.com — VP8](https://caniuse.com/?search=VP8)
