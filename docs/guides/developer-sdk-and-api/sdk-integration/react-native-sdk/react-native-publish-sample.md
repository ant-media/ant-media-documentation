---
title: Publishing WebRTC stream Sample in React Native
description: Publishing WebRTC Live stream Using React Native SDK 
keywords: [React Native SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 5
---

*   Open **/samples/publish/src/App.tsx** file and update **defaultStreamName** variable for stream name and update **webSocketUrl** variable with server name.

![](@site/static/img/image-1654599250441.png)

*   Move to **/samples/publish** folder and follow the [Install dependencies and run sample projects](/guides/developer-sdk-and-api/sdk-integration/react-native-sdk#install-dependencies-and-run-sample-projects) steps to run the **Publish** sample React native app.

![](@site/static/img/image-1654599372613.png)

*   Tap ```Start Publishing``` button on the screen. After the clicking ```Start Publishing```, the stream will be published on Ant Media Server.
*   You can now go to the web panel of Ant Media Server (e.g http://server\_ip:5080) and watch the stream there. You can also quickly play the stream via ```https://your_domain:5443/WebRTCAppEE/player.html```
