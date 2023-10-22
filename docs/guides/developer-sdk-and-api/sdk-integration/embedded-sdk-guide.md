---
title: Embedded SDK guide 
description: How to use the embedded SDK guide.
keywords: [Embedded SDK guide, Ant Media Server SDK, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 7
---

# Embedded SDK for WebRTC Streaming

The Embedded SDK is a C++ library designed to capture IP camera streams from RTSP URLs and restream them directly to web browsers using WebRTC. This approach eliminates the need for clients to install third-party tools on their devices, as they can simply use web browsers. Moreover, video latency is kept under one second. This solution is perfect for the IP cameras located in private network who do not have access to public network and only supports RTSP.

The [WebRTC Embedded SDK Reference project](https://github.com/ant-media/WebRTCEmbeddedSDKReference) has ready to use [executable](https://github.com/ant-media/WebRTCEmbeddedSDKReference/tree/master/executables), [main.cpp](https://github.com/ant-media/WebRTCEmbeddedSDKReference/blob/master/main.cpp) that is the source code which uses embedded SDK, a [makefile](https://github.com/ant-media/WebRTCEmbeddedSDKReference/blob/master/Makefile), API in [sdkapi.h](https://github.com/ant-media/WebRTCEmbeddedSDKReference/blob/master/sdkapi.h) that is the interface between the library and your source code.i.e., between the application and the embedded SDK and shows how to use the embedded SDK.

Ant Media Server's WebRTC Embedded SDk provides a solution for the beolow two cases.

1.  WebRTC Peer to Peer mode.
2.  WebRTC publish and Play mode.

- When using the WebRTC Embedded SDK in peer to peer mode, the AMS mainly works are a signalling server and therefore server side processes like recording and transcoding, etc. are not applicable for the peer to peer mode and the camera stream can be played via [cam_play.html](https://github.com/ant-media/StreamApp/blob/master/src/main/webapp/cam_play.html) sample page. This page is especially designed to play the WebRTC Embedded SDK streams.

In this mode the server does not transcode the RTSP stream. It just fetches the stream and forwards it to the WebRTC stack. Hence, it does not need a lot of CPU resources.

- When the camera stream is published to the server, it can be played with the sample WebRTC player page, [player.html](https://github.com/ant-media/StreamApp/blob/master/src/main/webapp/player.html) or with the embedded player, [play.html](https://github.com/ant-media/StreamApp/blob/master/src/main/webapp/play.html) as well and all the server side process can be applied to the camera's WebRTC stream.

WebRTC Embedded SDK can run on both ARM and x86 processors. IP cameras generally have a built-in RTSP URL. You can embed Native WebRTC SDK into your IP camera and the SDK fetches the RTSP stream and then forward the RTSP stream to the other peer via WebRTC.

- You can create executables by building the embedded SDK reference project on your end or you can use the provided executable files.

![](@site/static/img/sdk-diagram.png)

### 1\. WebRTC IP camera and browser (Peer to Peer)

In this mode the Ant Media Server works as a signaling server in order to have peer to peer connection between a web browser and your IP camera.

- Clone the [WebRTC Embedded SDK](https://github.com/ant-media/WebRTCEmbeddedSDKReference)
- Go to the executables directory
- Depending upon the platform you are using be it [arm](https://github.com/ant-media/WebRTCEmbeddedSDKReference/tree/master/executables/arm), [arm64](https://github.com/ant-media/WebRTCEmbeddedSDKReference/tree/master/executables/arm64), or [x86](https://github.com/ant-media/WebRTCEmbeddedSDKReference/tree/master/executables/x86), you can go to the related directory and there you will see `webrtc_pull_rtsp`
- This `webrtc_pull_rtsp` will be used to run the embedded SDK. For example
```
./webrtc_pull_rtsp ws://my.ant.media.server.io:5080/WebRTCAppEE/websocket rtsp://172.17.0.1:6554/test.flv mystream
```
- Once the IP camera stream is published, you can go to the sample page [cam_play.html](https://github.com/ant-media/StreamApp/blob/master/src/main/webapp/cam_play.html) and play the IP camera P2P stream.


### 2\. WebRTC Publish and Play mode for the IP Camera
In this mode, the IP camera stream is published to the Ant Media Server with WebRTC and the same can be played with the WebRTC players like the [player.html](https://github.com/ant-media/StreamApp/blob/master/src/main/webapp/player.html) or with the embedded player, [play.html](https://github.com/ant-media/StreamApp/blob/master/src/main/webapp/play.html)

By default the ready executables publishes the IP camera stream with P2P mode and therefore in order to change this to WebRTC publish and play, the executables need to be build.

When `setMode` is set to [0](https://github.com/ant-media/WebRTCEmbeddedSDKReference/blob/master/sdkapi.h#L23), the SDK works in P2P mode and when set to [1](https://github.com/ant-media/WebRTCEmbeddedSDKReference/blob/master/sdkapi.h#L24), it publishes the stream to the server.

In order to publish the IP camera stream to the server, it is needed to rebuild the SDK and crate the executables.
- Edit the main.cpp file and set ```setMode(1)```
![](@site/static/img/setmode.png)

- Then to build the project, you can run the [build commands](https://github.com/ant-media/WebRTCEmbeddedSDKReference#building-reference-project) as per your environment

- Once the build is successful, you will see `main.io` and `webrtc_pull_rtsp` files under `WebRTCEmbeddedSDKReference`
- Now you can run the `webrtc_pull_rtsp` and it will publish the IP camera RTSP stream to the Ant Media Server which can be played from the server.