---
title: Play Recorded Files 
description: Playback of Recorded live streams
keywords: [Live Stream Recording, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---

In previous section, you have already gone through recording of live streams. In this particular section, we will learn about playing these recorded files and some VOD-related APIs.

## Play VOD files with MP4

First, confirm that your application has MP4 recording enabled. It can be enabled in the application settings on the Web panel.

Assume that there is a live stream with streamId `stream1` publishing to the `LiveApp` application of the Ant Media Server. After publishing is finished, the MP4 file will be created.

 * In the Community Edition or Enterprise Edition of AMS, the default MP4 URL will be available at this URL:
 
   * `https://domain-or-IP:5443/LiveApp/streams/Stream_Id.mp4`

 * In Enterprise Edition, if adaptive streaming is enabled in the application, then MP4 recording for different bitrates will be generated. Assuming you have 480p and 240p resolution enabled in adaptive streaming settings, you will have two MP4 files with the following format:

    *  `https://domain-or-IP:5443/LiveApp/streams/stream1_240p500kbps.mp4`

    *   ```https://domain-or-IP:5443/LiveApp/streams/stream1_480p1000kbps.mp4```

## Play VOD files with WEBM

First, confirm that your application has WEBM recording enabled. It can be enabled in the application settings on the Web panel. WEBM can be recorded if the VP8 codec is enabled in the application's settings.

Assume that there is a live stream with streamId `stream1` publishing to the `LiveApp` application of the Ant Media Server. After publishing is finished, the WEBM file will be created.

 * In the Community Edition, the VP8 codec is not available so WEBM cannot be recorded.

 * In Enterprise Edition, if adaptive streaming is enabled in the application, then WEBM recording for different bitrates will be generated. Assuming you have 480p and 240p resolution enabled in adaptive streaming settings, you will have two WEBM files with the following format:

    *  `https://domain-or-IP:5443/LiveApp/streams/stream1_240p500kbps.webm`

    *   ```https://domain-or-IP:5443/LiveApp/streams/stream1_480p1000kbps.webm```

## Play VoD streams with an embedded player

There is embedded player (play.html) in both the Community and Enterprise Editions of Ant Media Server. Both live and VoD (recorded or uploaded) streams can be played by this player. Check out the [embedded player](https://deploy-preview-254--ant-media.netlify.app/guides/playing-live-stream/embedded-web-player/) document.

When the live stream is over, the recorded MP4 file with an embedded player can be viewed at the URL below.

`https://domain-or-IP:5443/LiveApp/play.html?name=streamId&playOrder=vod`

If the VOD is uploaded, then below will be the URL.

`https://domain-or-IP:5443/LiveApp/play.html?name=vod-Id&playOrder=vod`
