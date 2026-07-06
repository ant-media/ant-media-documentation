---
title: Publish Enhanced RTMP
description: Publish stream with Enhanced RTMP
keywords: [Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 6
---

# Enhanced RTMP

Enhanced RTMP significantly advances video streaming by supporting modern video encoders like HEVC (H.265), VP9, and AV1, unlike traditional RTMP, which is limited to the older H.264 codec. These newer codecs offer far more efficient compression, allowing for higher-quality streams at lower bitrates. 

For example, using Enhanced RTMP with Ant Media Server enables streaming with HEVC, which delivers better video quality than H.264 at the same bitrate, greatly reducing bandwidth consumption without sacrificing clarity. This is ideal for bandwidth-constrained scenarios like mobile streaming or large-scale broadcasting, making Enhanced RTMP a more adaptable and future-proof solution for modern streaming needs. Please note that **AV1 & VP9** support will be introduced in future releases of Ant Media Server

## How to use Enhanced RTMP with Ant Media Server?

Starting with version 2.11.0, Ant Media Server includes Enhanced RTMP support by default, enabling you to stream using modern encoders like HEVC (H.265) without any additional server configuration. By simply broadcasting HEVC-encoded content through your **preferred encoder**, you can benefit from significantly improved video quality at lower bitrates, reducing bandwidth usage and costs. 

To use HEVC encoder with **OBS**, you can set your settings as below:

This screenshot is from the Windows system having the NVIDIA Graphic card so the `NVIDIA NVENC HEVC` encoder was used. You can use the HEVC encoder as per your system's encoder support.

![](@site/static/img/obs-rtmp-image/obs_hevc_enhanced_rtmp.png)

After encoder is set, you can publish as you do in RTMP.

## Limitations of HEVC (H265)

HEVC (H.265) offers better compression and video quality, but it has some limitations as well.

WebRTC doesn't yet support H.265, making it unsuitable for some live streaming or interactive video use cases. Additionally, not all browsers, including Chrome, fully support HEVC playback, leading to compatibility issues. If you use HEVC for RTMP publishing, you might encounter issues when trying to play it via WebRTC or HLS across different browsers.

To address this, [server-side transcoding](https://antmedia.io/docs/guides/adaptive-bitrate/adaptive-bitrate-streaming/) can convert H.265 streams to H.264, ensuring broader compatibility. 

If you are not using WebRTC or HLS playback on your browser, you do not need to worry about this. Make sure that your player and device support the H265 playback.

For HEVC support on different platforms, refer to [this page](https://caniuse.com/hevc). 

<br /><br />
---

<div align="center">
<h2> Enhanced Quality Unleashed 🏅 </h2>
</div>

You have now used **Enhanced RTMP**: streaming with a modern encoder like HEVC (H.265), saving bandwidth while keeping great visual quality. Although VP9 & AV1 are coming soon, your stream is future-ready and more efficient right now.  

Good work — your output is **sharper, leaner, and built for the next gen of streaming!** 🎯

