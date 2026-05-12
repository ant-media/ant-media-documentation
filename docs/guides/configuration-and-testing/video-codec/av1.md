---
title: AV1
description: Learn how to enable and use the AV1 codec in Ant Media Server. Understand its advantages, limitations, and when to use it for modern streaming workflows.
keywords: [AV1 codec, WebRTC AV1, Ant Media Server AV1, next generation codec, video compression, AMS codecs]
sidebar_position: 5
---

# AV1

AV1 is a next-generation, open-source video codec designed to deliver significantly better compression efficiency than H264 and H265. It enables high-quality video at lower bitrates, making it ideal for bandwidth-optimized streaming.

## Enable and Configure AV1 Codec

AV1 is a royalty-free codec with better compression than H.264 and VP8 at equivalent quality. It is supported for WebRTC streaming and WebM recording, and disabled by default.

:::info
AV1 WebRTC playback requires Chrome 90+, Firefox 93+, or Edge 90+. See the [AV1 browser support table](https://caniuse.com/av1) for details.
:::

### 1. Enable AV1

In the advanced application settings, set:

```js
"av1Enabled": true,
```

To keep H.264 as a fallback for devices that don't support AV1:

```js
"av1Enabled": true,
"h264Enabled": true,
```

With both enabled and at least one adaptive bitrate profile active, AMS transcodes incoming streams to both codecs.

### 2. Publish an AV1 Stream

**WebRTC (browser)**

No additional configuration needed. When `av1Enabled` is true, AMS negotiates AV1 during the WebRTC handshake if the browser supports it.

**Enhanced RTMP (OBS)**

AV1 is carried over Enhanced RTMP using the `av01` FourCC. In OBS:

1. Go to Settings → Output → set Output Mode to **Advanced**.
2. Under the Streaming tab, set Encoder to an AV1 encoder (e.g. **AOM AV1**, or a hardware AV1 encoder if available).
3. Stream to AMS as usual — no server-side URL changes needed.

**ffmpeg**

```bash
ffmpeg -re -i input.mp4 \
  -c:v libaom-av1 -crf 35 -b:v 0 \
  -c:a aac \
  -f flv rtmp://YOUR_SERVER_IP/live/streamId
```

:::note
`-crf 35 -b:v 0` uses constant quality mode. Lower CRF = higher quality. libaom-av1 encoding is CPU-intensive and may run slower than realtime on modest hardware.
:::

### 3. Play an AV1 Stream

**WebRTC** — Modern browsers play AV1 natively. In SFU mode, the stream is forwarded as-is without transcoding.

**WebM recording** — AV1 streams are recorded to `.webm` automatically when recording is enabled. No extra configuration needed.

**HLS / DASH** — AV1 is not natively output to HLS or DASH. To serve HLS/DASH from an AV1 source, enable H.264 alongside AV1 and configure at least one adaptive bitrate profile. AMS will transcode the AV1 stream to H.264 for HLS/DASH delivery.

### 4. SFU vs Adaptive Bitrate

- **SFU mode** — AV1 is ingested and forwarded to players without transcoding.
- **Adaptive Bitrate mode** — AMS transcodes to multiple AV1 bitrates. With H.264 also enabled, both codec variants are produced.
