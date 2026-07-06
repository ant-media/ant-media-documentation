---
title: VP8
description: Learn how to enable and use the VP8 codec in Ant Media Server. Understand its advantages, limitations, and when to choose it for WebRTC streaming.
keywords: [VP8 codec, WebRTC VP8, Ant Media Server VP8, video codec configuration, open source codec, AMS streaming]
sidebar_position: 3
---

# VP8 Codec

VP8 is an open-source video codec developed by Google and widely used in WebRTC applications. It is a reliable alternative to H.264, especially in environments where licensing or open standards are preferred.

---

## Why Use VP8?

- **Open Source & Royalty-Free:** No licensing costs, making it ideal for open platforms  
- **WebRTC Native Support:** Fully supported in WebRTC across major browsers  
- **Good Compatibility:** Works well on Chrome, Firefox, and Edge  
- **Stable for Real-Time Streaming:** Suitable for low-latency applications  

---

## Limitations

- **Limited Hardware Acceleration:** Not as widely hardware-accelerated as H.264, especially on mobile devices  
- **Recording Restrictions:** Does not support HLS or MP4 recording formats.
- **Lower Device Compatibility:** Some devices and browsers (e.g., Safari) may have limited or no support
- **Higher CPU Usage:** Encoding/decoding may consume more resources compared to H.264.

---

## Enable VP8 Codec

![vp8](https://github.com/user-attachments/assets/c8900114-0f74-4cba-9dd9-c5b0da5b757a)

The VP8 codec can be enabled from application settings via the web panel.

- **SFU Mode:** Only VP8 streams are ingested and forwarded without transcoding  
- **Adaptive Bitrate (ABR) Mode:** VP8 streams are transcoded into multiple bitrates for adaptive playback

---

## When to Use VP8

VP8 is a recommended choice when:  
  
- You prefer a **fully open-source and royalty-free codec**  
- Your application is primarily focused on **WebRTC-based streaming**  
- Your target audience mainly uses **modern browsers such as Chrome and Firefox**  
- You do not require **HLS or MP4 recording support**  
- You want a **lightweight codec with broad WebRTC compatibility**

---

## Streaming and Playback with VP8

Only the WebRTC protocol supports stream publishing with the VP8 codec in Ant Media Server.

Check out the [WebRTC publishing](https://docs.antmedia.io/category/webrtc/) & [WebRTC playback](https://docs.antmedia.io/guides/playing-live-stream/webrtc-playback/) to publish/play streams with VP8.

---

## Important Notes

:::info
HLS and MP4 recordings require the H.264 codec. Enabling only VP8 limits recording to WebM format and playback primarily to WebRTC.
:::
