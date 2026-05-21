---
title: AV1
description: Learn how to enable and use the AV1 codec in Ant Media Server. Understand its advantages, limitations, and when to use it for modern streaming workflows.
keywords: [AV1 codec, WebRTC AV1, Ant Media Server AV1, next generation codec, video compression, AMS codecs]
sidebar_position: 5
---

# AV1 Codec

AV1 is a next-generation, open-source video codec designed to deliver significantly better compression efficiency than H.264 and H.265. It enables high-quality video at lower bitrates, making it ideal for bandwidth-optimized streaming.

---

## Why Use AV1?

- **Excellent Compression Efficiency:** Delivers better compression than H.264, VP8, and H.265 at similar visual quality
- **Lower Bandwidth Consumption:** Ideal for high-quality streaming over limited bandwidth connections
- **High-Quality Video Streaming:** Well suited for HD, 4K, and next-generation video delivery
- **Royalty-Free Codec:** Developed as an open and royalty-free alternative to H.265
- **Future-Focused Codec:** Increasingly adopted by modern browsers, platforms, and streaming services

---

## Limitations

- **High Encoding Complexity:** Requires significantly more CPU/GPU resources for encoding  
- **Limited Hardware Acceleration:** Hardware encoding and decoding support is still evolving on some devices  
- **Higher Latency Risk:** Software-based AV1 encoding may introduce additional latency in real-time streaming  
- **Device Compatibility Variations:** Older devices and browsers may not fully support AV1 playback  
- **WebRTC Support Limitations:** AV1 support in WebRTC depends on browser, device, and hardware capabilities

---

## Enable AV1 Codec

AV1 is a royalty-free codec with better compression than H.264 and VP8 at equivalent quality. It is supported for WebRTC streaming and WebM recording and disabled by default.

The AV1 codec can be enabled from application settings via the web panel.

![](@site/static/img/configuration-and-testing/AV1.webp)

- **SFU mode** — AV1 is ingested and forwarded to players without transcoding.
- **Adaptive Bitrate mode** — The stream is transcoded into multiple AV1 bitrates, allowing playback across different network conditions and devices. The stream can be transcoded with any other codec as well like H264 etc.

---

## Streaming and Playback with AV1

---

### Publish AV1 Stream

In AMS, the AV1 codec can be used with [WebRTC](https://docs.antmedia.io/guides/publish-live-stream/webrtc/) and [WHIP](https://docs.antmedia.io/guides/publish-live-stream/whip/) publishing protocols.

---

### Play AV1 Stream

**WebRTC** — Modern browsers play AV1 natively. In SFU mode, the stream is forwarded as-is without transcoding.

**WebM recording** — AV1 streams are recorded to `.webm` automatically when recording is enabled. No extra configuration needed.

**HLS / DASH** — AV1 is not natively output to HLS or DASH. To serve HLS/DASH from an AV1 source, enable H.264 alongside AV1 and configure at least one adaptive bitrate profile. AMS will transcode the AV1 stream to H.264 for HLS/DASH delivery.

---

### Compatibility Check

:::info
AV1 WebRTC playback requires Chrome 90+, Firefox 93+, or Edge 90+. See the [AV1 browser support table](https://caniuse.com/av1) for details.
:::

Check browser compatibility here:  
👉 https://caniuse.com/?search=AV1

---

### Play AV1 Transcoded Streams with H.264

Since AV1 support is limited in browsers, enable H.264 alongside AV1 and use adaptive bitrate (ABR) streaming:

:::info
At least one adaptive bitrate (ABR) must be enabled. Without ABR, Ant Media Server will not transcode AV1 streams into H264, and playback will fail on browsers that do not support AV1.
:::

![AV1 + H264 with ABR](/img/configuration-and-testing/AV1andH264.webp)

