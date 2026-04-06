---
title: Video codecs 
description: How to enable and configure H.264, VP8, H.265, and AV1 video codecs in Ant Media Server for WebRTC, HLS, and DASH streaming.
keywords: [Enable H.264, VP8, H.265, AV1, WebRTC codecs, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 6
---

# Video Codecs

In this guide, we'll explain how to use H.264, VP8, H.265 (HEVC), and AV1 video codecs in Ant Media Server.

Currently, WebRTC relies on specific codecs for video streaming, and Ant Media Server supports H.264 and VP8 for it.

Protocols like HLS, LL-HLS, and CMAF (DASH) support H.265 codec to provide maximum compatibility and quality options. WebRTC does not officially support H.265 yet.

- While H.264 & VP8 codecs can be enabled directly from the basic application settings, H.265 codec must be enabled from Advanced settings.

![codec-support](https://github.com/user-attachments/assets/951a04d9-eaf2-4377-8793-95cced896736)

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

### Enable Only H.264 Codec

![h264](https://github.com/user-attachments/assets/cfe26a24-6b8e-4a5f-94d9-68bfc260fc47)

- **SFU Mode:**: Only H.264 streams are ingested and forwarded without transcoding.
- **Adaptive Bitrate Mode:** The stream is transcoded into multiple H.264 bitrates. Devices that support H.264 can play the stream.

You can check if your device supports H.264 [at this link](https://mozilla.github.io/webrtc-landing/pc_test_no_h264.html).

### Enable Only VP8 Codec

![vp8](https://github.com/user-attachments/assets/c8900114-0f74-4cba-9dd9-c5b0da5b757a)

- **SFU Mode:** Only VP8 streams are ingested and forwarded.
- **Adaptive Bitrate Mode:** VP8 is transcoded into multiple bitrates.

:::info
HLS and MP4 recording require H.264 codec. Enabling only VP8 will limit recording (WebM) and playback (WebRTC) options.
:::

## Enable and Configure H.265 (HEVC) Codec

HEVC (H.265) provides better video quality at the same bitrate, making it ideal for bandwidth-sensitive environments.

 1. **Enable H.265 in Configuration**

H.265 is disabled by default. Enable it via Advanced settings:

- Go to the advanced application settings & set

   ```js
   "h265Enabled": true,
  ```
  
- If H.264 & VP8 are also true, AMS will accept streams with all three codecs.
- If H.264 & VP8 are false, AMS will only accept streams with H.265:
  
```js
"h264Enabled": false,
"vp8Enabled": false,
"h265Enabled": true,
```

![h265](https://github.com/user-attachments/assets/a41545a1-9ec9-43ff-b41b-8e0aa88f159b)

- Scroll down and save after making changes.

2. **Send an RTMP Stream to Ant Media Server**

- Use a tool like OBS to send an RTMP stream with H.265 video codec. See the [Enhanced RTMP document](https://antmedia.io/docs/guides/publish-live-stream/rtmp/enhanced-rtmp/) for details.

3. **Play H.265 Stream**

- Most Android devices natively support H.265 playback via HLS, LL-HLS, and DASH.
- You can also use VLC or third-party players for H.265 playback.

4. **Play H.265 Stream on browsers**

Most browsers do not yet support H.265 playback. Check [H.265 supported browsers](https://caniuse.com/?search=H.265).

5. **Play H.265 transcoded streams with H.264**

- Since H.265 support is limited in browsers/WebRTC, enable H.264 alongside H.265 and use Adaptive streaming:

```js
"h264Enabled": true,
"h265Enabled": true,
```

- Enable at least one adaptive bitrate. AMS will transcode incoming H.265 streams to H.264, ensuring browser and SDK compatibility.

![h265andh264](https://github.com/user-attachments/assets/366e921c-8ab1-4235-a9d9-5062b8c109a3)


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

<div align="center">

### Wrap-Up

</div>

By configuring H.264, VP8, H.265, and AV1, you can optimize video streams for both compatibility and quality.

Now you can ingest, transcode, and deliver streams in the codec combination that fits your use case, ensuring smooth playback across devices, browsers, and protocols.
