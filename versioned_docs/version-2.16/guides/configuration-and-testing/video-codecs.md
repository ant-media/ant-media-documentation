---
title: Video Codecs Overview
description: Overview of H.264, VP8, and H.265 codecs in Ant Media Server and how to choose the right one.
keywords: [Enable H.264, VP8, and H.265, WebRTC codecs, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 6
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
| H.264 | Yes | Yes | Default choice; widest device and browser support. |
| VP8 | Yes | Limited | Open, royalty-free; good WebRTC fallback. |
| H.265 (HEVC) | No (not official in WebRTC) | Yes | Better compression for HLS/DASH; limited browser WebRTC support. |

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

## Codec configuration

**H.264** and **VP8** can be enabled from basic application settings. **H.265** must be enabled from **Advanced settings** in Ant Media Server v2.16.

1. Log in to the Ant Media Server dashboard.
2. Select your application.
3. Open the **Settings** tab (basic settings for H.264/VP8, **Advanced** for H.265).
4. Enable or disable the codecs you need, then save.

The sections below explain how to enable and configure each codec in different scenarios.

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


<div align="center">

### Wrap-Up

</div>

By configuring H.264, VP8, and H.265, you can optimize video streams for both compatibility and quality.

Now you can ingest, transcode, and deliver streams in the codec combination that fits your use case, ensuring smooth playback across devices, browsers, and protocols.
