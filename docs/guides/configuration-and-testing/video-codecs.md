---
title: Video codecs 
description: Simplified understanding of H.264, VP8, and H.265 codecs used with Ant Media Server. This guide also explains how to enable H.264, VP8, and H.265.
keywords: [Enable H.264, VP8, and H.265, WebRTC codecs, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 6
---

# Video Codecs

In this guide, we’ll explain how to use H.264, VP8, and H.265 (HEVC) video codecs in Ant Media Server. 

Currently WebRTC relies on specific codecs for video streaming, and Ant Media Server supports H.264 and VP8 for it.

Protocols like HLS, LL-HLS, and CMAF (Dash) support H.265 codec to provide maximum compatibility and quality options. The WebRTC does not officially support H265 codec for now.

- While H.264 & VP8 codecs can be enabled directly from the basic application settings, the H.265 codec needs to be enabled from the Advanced settings.

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

- **SFU Mode (No adaptive bitrate):** Ant Media Server can ingest a WebRTC stream in either H.264 or VP8; if both are available, H.264 is prioritized. In this mode, no transcoding occurs, so the original stream is forwarded to players.

- **Adaptive Bitrate Mode (if you have at least one adaptive bitrate):** Ant Media Server ingests the stream. It transcodes it into multiple bitrates for both H.264 and VP8 codecs if [Adaptive streaming](https://antmedia.io/docs/guides/adaptive-bitrate/adaptive-bitrate-streaming/) is enabled. This ensures compatibility across devices that support either codec.

### Enable Only H.264 Codec

![h264](https://github.com/user-attachments/assets/cfe26a24-6b8e-4a5f-94d9-68bfc260fc47)

- **SFU Mode:**: Only H.264 streams are ingested and forwarded without transcoding.
- **Adaptive Bitrate Mode:** The stream is ingested and transcoded into various H.264 bitrates for adaptive streaming. Devices that support H.264 can then play the stream.

You can check if your device supports H264 [at this link](https://mozilla.github.io/webrtc-landing/pc_test_no_h264.html).

### Enable Only VP8 Codec

![vp8](https://github.com/user-attachments/assets/c8900114-0f74-4cba-9dd9-c5b0da5b757a)

- **SFU Mode:** Only VP8 streams are ingested and forwarded to players.
- **Adaptive Bitrate Mode:** VP8 is ingested and transcoded to different bitrates. Note that HLS streaming and MP4 recording will not work if only VP8 is enabled.

:::info
HLS and MP4 recording require H.264 codec. Enabling only VP8 will limit recording (WebM) and playback (WebRTC) options.
:::

## Enable and Configure H.265 (HEVC) Codec

HEVC, also known as H.265, provides better video quality at the same bitrate, making it ideal for bandwidth-sensitive environments.

#### **Enable H.265 in Configuration**

   H.265 codec support is disabled by default. To enable it, follow these steps:

- Go to the advanced application settings & set

   ```js
   "h265Enabled": true,
  ```
  
- If you set H.264 & VP8 true as well, then AMS will accept the incoming streams with all the video codecs.
- If H.264 & VP8 are set to false, then AMS will only accept the incoming streams with H.265 codec.
  
```js
"h264Enabled": false,
"vp8Enabled": false,
"h265Enabled": true,
```

![h265](https://github.com/user-attachments/assets/a41545a1-9ec9-43ff-b41b-8e0aa88f159b)

- Scroll down & save the settings after making changes.

#### **Send an RTMP Stream to Ant Media Server**

- Use a tool like OBS to send an RTMP stream to the Ant Media Server with H.265 video codec. Check out [Enhanced RTMP document](https://antmedia.io/docs/guides/publish-live-stream/rtmp/enhanced-rtmp/) for more details.

#### **Play H.265 Stream**

- Most Android devices natively support H.265 playback, so you can play the HLS, LL-HLS, and Dash directly in supported video players. You can use player like VLC or integrate third-party players in your applications to play the H265 encoded stream.

#### **Play H.265 Stream on browsers**

The majority of the browsers do not support H.265 playback yet. You can check the [H.265 supported browsers](https://caniuse.com/?search=H.265).

- Like H.264 & VP8, H.265 can also be used in both SFU & Adaptive bitrate mode.

#### **Play H.265 transcoded streams with H.264**

- Since H.265 support is limited for browsers and WebRTC, a workaround solution is to enable H.264 & make use of Adaptive streaming to transcode the H.265 ingested stream with H.264.

- To do this, along with H.265, enable H.264:

```js
"h264Enabled": true,
"h265Enabled": true,
```

- Enable at least one adaptive bit rate

![h265andh264](https://github.com/user-attachments/assets/366e921c-8ab1-4235-a9d9-5062b8c109a3)

- This will transcode the incoming H.265 coded stream to H.264 codec then browsers and AMS SDKs will be able to play the stream. 
