---
title: Sample Tools and Applications
description: With Ant Media Server WebRTC Samples, you may play and experience through our pre-made examples and see Ant Media Server in action. These examples may help you achieve your use cases.
keywords: [Ant Media Server WebRTC Samples, Ant Media Server Demo, Ant Media Server Documentation, Ant Media Server Tutorials, Ant Media Demonstration]
sidebar_position: 1
---

Ant Media Server provides a range of sample applications to showcase its ability across different use cases. Explore and interact with these samples to see Ant Media Server in action.

:::info
In these sample examples, we use the `live` application, but you can use a different application as well for your testing. You can also create your custom application.
:::

## 1. WebRTC Publishing

Ant Media Server can ingest WebRTC video from web browsers. After installing the software and an SSL certificate, you can publish video using webRTC from this file: 

```
/usr/local/antmedia/webapps/live/index.html
``` 

at this URL 

```
https://domain-name.com:5443/live/index.html
``` 

For installation, please check out the [quick start installation guide](https://antmedia.io/docs/quick-start/).

![](@site/static/img/getting-started/sample-tools-apps/publishing.png)

### Publishing WebRTC video without an SSL installed

If you are running the server on localhost, there won't be a problem. However, for security reasons, web browsers do not allow reaching out to media devices without an SSL certificate. 

For development purposes, to bypass that in the Chrome web browser, you can add your server's IP address to the following Chrome property, and it will not ask for SSL.

`chrome://flags/#unsafely-treat-insecure-origin-as-secure`

## 2. WebRTC Playback

You can play the live streams published to the server with a WebRTC video player. WebRTC video playback is available in **Enterprise Edition**.

You can navigate to the following URL to playback your webRTC stream. 
```
https://domain-name.com:5443/live/player.html
```

The file is located at `/usr/local/antmedia/webapps/live/player.html`

![](@site/static/img/getting-started/sample-tools-apps/playing.png)

## 3. WebRTC Audio Publishing

WebRTC audio publishing is available in **Enterprise Edition** using the following sample page:

```
https://domain-name.com:5443/live/audio_publish.html
```

The file is located at `/usr/local/antmedia/webapps/live/audio_publish.html`

![](@site/static/img/138696358-9d967d80-343b-4717-a587-1e934e63d5e3.png )

## 4. WebRTC Audio Playback

WebRTC audio playback is available in **Enterprise Edition** using the following sample page:

```
https://domain-name.com:5443/live/audio_player.html
```

The file is located at `/usr/local/antmedia/webapps/live/audio_player.html`

![](@site/static/img/138696730-9acb0de6-0c8d-42c4-9303-fd7f8a388aaf.png )

## 5. Conference Call

A WebRTC conference sample is available in **Enterprise Edition**. 

This feature allows one or more publishers to send video streams to a group of audiences. Latency in the conference is around 0.5 seconds.

The file is located at `/usr/local/antmedia/webapps/live/conference.html`.

For technical and detailed information about conference calls, please follow [this](https://antmedia.io/docs/guides/publish-live-stream/webrtc/webrtc-conference-call/).

![](@site/static/img/image-1645105628540.png )

## 6. Peer-To-Peer Live Streaming

WebRTC peer-to-peer live streaming is also available in **Enterprise Edition**. 

```
https://domain-name.com:5443/live/peer.html
```

The file is located at `/usr/local/antmedia/webapps/live/peer.html`

If you would like to dive in further regarding the technology behind live streaming, you can also analyze the WebRTC video/audio publish example. For technical details, please follow [this](https://antmedia.io/docs/guides/publish-live-stream/webrtc/webrtc-peer-to-peer-communication/).

## 7. WebRTC Multitrack Player

WebRTC Multitrack Player is available in **Enterprise Edition**.

In this sample, you can play the multiple tracks coming in the main track. Suppose there are two subtracks available in the main track, and only one needs to be played at a time; then only one can be selected to play, and one will be disabled. The track can be enabled/disabled on the fly as well.

The file is located at `/usr/local/antmedia/webapps/live/multitrackplayer.html`

## 8. WebRTC Publish with WhiteBoard

WebRTC whiteboard publisher is available in **Enterprise Edition**.

You can broadcast live streams to Ant Media Server with a whiteboard, where the whiteboard is synchronized with all players. Please make sure that the data channel is enabled on the server side, as it's disabled by default.

The file is located at `/usr/local/antmedia/webapps/live/canvas-publish.html`

![](@site/static/img/138704308-6dccbd55-1bff-40e3-9c67-44fc23fc2b50.png )

## 9. WebRTC Play with WhiteBoard

WebRTC whiteboard player is available in **Enterprise Edition**.

You can play live streams with a synchronized whiteboard. Please make sure that the data channel is enabled on the server side, as it's disabled by default.

```
https://domain-name.com:5443/live/canvas-player.html
```

The file is located at `/usr/local/antmedia/webapps/live/canvas-player.html`

## 10. WebRTC DataChannel

WebRTC Data Channel is available in **Enterprise Edition**.

You can send only data through WebRTC via Ant Media Server without video or audio. It works the same way with WebRTC Publish and Play, which means all data is delivered to subscribers. 

The file is located at `/usr/local/antmedia/webapps/live/datachannel.html`

![](@site/static/img/138705765-b0a913c8-25c2-4ce7-89d5-68a664694532.png )

## 11. WebRTC Test Tool

The WebRTC live streaming test tool is available in **Enterprise Edition**.

With this tool, you can measure E2E (end-to-end) bitrate, RTT, packet loss, and other connection parameters that may affect the quality of the stream with the test tool automatically.

The file is located at `/usr/local/antmedia/webapps/live/webrtc-test-tool.html`

![](@site/static/img/138707266-883326ee-a3b6-4e58-a265-3e2844c97ef0.png )

## 12. WebRTC Publish with Timestamp

WebRTC live streaming with timestamp feature is available in **Enterprise Edition**.

You can broadcast a WebRTC camera stream by drawing the current timestamp of the frame. It's used for measuring the E2E (end-to-end) latency.

```
https://domain-name.com:5443/live/publish_with_timestamp.html
```

The file is located at 
`/usr/local/antmedia/webapps/live/publish_with_timestamp.html`

## 13. WebRTC Player with Timestamp

WebRTC Player with Timestamp is available in **Enterprise Edition**.

You can broadcast a WebRTC camera stream by drawing the current timestamp of the frame. It's used for measuring the E2E (End-to-End) latency. It has a built-in function to send the frames to either Amazon Recognition or Google Vision API to get the latency measurement. For technical details, please read [the e2e latency measurement documentation](https://portal.document360.io/v1/docs/measuring-end-to-end-latency).

The file is located at `/usr/local/antmedia/webapps/live/player_with_timestamp.html`

![](@site/static/img/138709249-aa18beda-a575-42d0-981a-b62758b8df10.png )

## 14. Merge WebRTC Streams

The multitrack player sample to merge the streams is available in the **Enterprise Edition**.

The new **multitrack-play.html** page provides a server-side display of all participants in a conference room (e.g., room1). By loading this page on the server, it will automatically join the specified room, aggregating all video and audio tracks from active participants into a single view. This consolidated view allows the conference session to be recorded on the server without relying on the Circle Conference application. The sample URL format is as below:

```
https://AMS-Domain:5443/live/multitrack-play.html?id=room1
```

Participants can be added to the room using the sample conference link provided below, which enables users to join room1 and participate with both audio and video. This setup is particularly useful for scenarios where a multi-participant conference needs to be saved or viewed by a server admin without engaging additional conferencing software.

```
https://AMS-Domain:5443/live/conference.html
```

The file is located at `/usr/local/antmedia/webapps/live/multitrack-play.html`

## 15. Publish WebRTC Stream with WHIP Protocol

The WHIP stream publishing sample is available in **Enterprise Edition**.

If you directly want to publish the WebRTC stream from your browser using the WHIP protocol, then you can check the `whip.html` sample page of Ant Media Server for reference. This sample page uses the Eyevinn WHIP client to publish the stream to the server using the WHIP protocol. You can also directly integrate it into your web application.

Now, to publish the WHIP stream using the sample page, go to the page below of your Ant Media Server and start publishing

```
https://AMS-domain:5443/live/whip.html
```

The file is located at ```/usr/local/antmedia/webapps/live/whip.html```

## 16. Publish with Virtual Background

WebRTC publish with virtual background feature is available in **Enterprise Edition**.

You can broadcast a WebRTC camera stream by applying the virtual background to your live stream. You can use your image files as the background image. The sample URL can be reached at:

```
https://domain-name.com:5443/live/publish_webrtc_virtual_background.html
```

The file is located at 
`/usr/local/antmedia/webapps/live/publish_webrtc_virtual_background.html`

## 17. Publish with DeepAR Effects

A WebRTC sample with DeepAR filter effects is available in **Enterprise Edition**.

You can broadcast a WebRTC camera stream by applying the filter using the DeepAR effect to your live stream. The sample URL can be reached at:

```
https://domain-name.com:5443/live/publish_webrtc_deep_ar_effects.html
```

The file is located at 
`/usr/local/antmedia/webapps/live/publish_webrtc_deep_ar_effects.html`
