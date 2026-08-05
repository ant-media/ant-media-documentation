---
title: AV1
description: Enable and use the AV1 codec in Ant Media Server for royalty-free WebRTC streaming and WebM recording.
keywords: [AV1 codec, WebRTC AV1, Ant Media Server AV1, next generation codec, video compression, AMS codecs]
sidebar_position: 5
---

# AV1 Codec

**AV1** is a royalty-free, open-source codec that typically delivers better compression than H.264, VP8, and H.265 at similar visual quality. It suits bandwidth-optimized **WebRTC** workflows and **WebM** recording.

For a comparison with other codecs, see [Video Codecs Overview](/guides/configuration-and-testing/video-codec/).

## What you'll accomplish

By the end of this guide, you will:

1. Understand when AV1 is the right codec for your use case.
2. Enable AV1 from application settings in the web panel.
3. Publish and play AV1 over **WebRTC** and **WHIP**.
4. Configure **AV1 + H.264 with ABR** for HLS/DASH and broader browser coverage.

## Limitations

| Limitation | Details |
|------------|---------|
| Encoding cost | Higher CPU/GPU use than H.264; software encoding can add latency. |
| Hardware support | Hardware AV1 encode/decode is still limited on some devices. |
| Browser coverage | Requires recent browsers for WebRTC AV1 (see compatibility below). |
| HLS / DASH | AV1 is not natively output to HLS or DASH; use H.264 transcoding via ABR. |

:::info
AV1 WebRTC playback requires **Chrome 90+**, **Firefox 93+**, or **Edge 90+**. See [caniuse.com — AV1](https://caniuse.com/av1) for details.
:::

## When to use AV1

Choose AV1 when you need:

- **Lower bandwidth** for HD or 4K **WebRTC** streaming on supported browsers.
- A **royalty-free** alternative to H.265 with strong compression efficiency.
- **WebM recording** with AV1 video.
- A **future-focused** codec alongside H.264 for mixed client environments.

Keep **H.264 enabled** alongside AV1 when you must support older browsers or deliver **HLS/DASH**—use adaptive bitrate (ABR) to transcode AV1 to H.264 for those clients.

## Protocol support

| Area | Support |
|------|---------|
| WebRTC publish | Yes |
| WebRTC playback | Yes (modern browsers) |
| WHIP | Yes |
| WebM recording | Yes |
| HLS / LL-HLS / DASH | Via H.264 transcoding (ABR) |
| RTMP / SRT | No |

## Step 1: Enable AV1

AV1 is **disabled by default**. Starting with **Ant Media Server v3.0.1**, enable it from **Application → Settings** in the web panel.

1. Log in to the Ant Media Server dashboard.
2. Select your application.
3. Open the **Settings** tab.
4. Enable **AV1** and save.

![](@site/static/img/configuration-and-testing/AV1.webp)

When AV1 is enabled:

- **SFU mode:** AV1 streams are ingested and forwarded to players without transcoding.
- **ABR mode:** The stream is transcoded into multiple AV1 bitrates (and can be transcoded to other codecs such as H.264 when ABR profiles are configured).

## Step 2: Publish AV1 streams

In Ant Media Server, AV1 is supported for:

- [WebRTC publishing](/guides/publish-live-stream/webrtc/)
- [WHIP](/guides/publish-live-stream/whip/)

## Step 3: Play AV1 streams

| Delivery | Behavior |
|----------|----------|
| **WebRTC** | Modern browsers play AV1 natively. In SFU mode, the stream is forwarded without transcoding. |
| **WebM recording** | AV1 streams record to `.webm` when recording is enabled—no extra codec configuration required. |
| **HLS / DASH** | Not native from AV1 alone. Enable H.264 alongside AV1 and configure ABR so AMS transcodes to H.264 for HTTP-based playback. |

Verify browser support: [caniuse.com — AV1](https://caniuse.com/?search=AV1)

## Step 4: Enable AV1 with H.264 and ABR (recommended for broad playback)

Because AV1 support varies by browser and HLS/DASH require H.264 in most setups, enable **H.264** alongside AV1 and turn on **adaptive bitrate (ABR)**.

:::info
At least one adaptive bitrate must be enabled. Without ABR, Ant Media Server will not transcode AV1 streams to H.264, and playback will fail on clients that do not support AV1.
:::

Enable at least one adaptive bitrate in your application. See [Adaptive Bitrate Streaming](/guides/adaptive-bitrate/adaptive-bitrate-streaming/) for details.

![](@site/static/img/configuration-and-testing/AV1andH264.webp)

For general WebRTC fallback patterns, see [H.264 Codec](/guides/configuration-and-testing/video-codec/h264/).
