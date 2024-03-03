---
title: Playing WebRTC stream sample in React Native
description: Playing WebRTC Live Stream Sample Using React Native SDK 
keywords: [React Native SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 6
---

*   Open **/samples/play/src/Play.tsx** file and update **defaultStreamName** variable for stream name and update **webSocketUrl** variable with server name.![](@site/static/img/image-1654599250441.png)

*   Go to **/samples/play** folder and follow the [Install dependencies and run sample projects](/guides/developer-sdk-and-api/sdk-integration/react-native-sdk#install-dependencies-and-run-sample-projects) steps to run the **Play** sample React native app.

*   Before playing, make sure that there is a stream that is already publishing to the server with the same stream id in your **defaultStreamName** variable(You can quickly publish to the Ant Media Server via ```https://your_domain:5443/WebRTCAppEE```).

![](@site/static/img/image-1654599731503.png)

*   Tap ```Start Playing``` button on the screen. After clicking Start Playing , the stream will start playing.

![](@site/static/img/image-1654600749349.png)