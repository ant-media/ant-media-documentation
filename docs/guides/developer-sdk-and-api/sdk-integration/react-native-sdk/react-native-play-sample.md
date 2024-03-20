---
title: Playing WebRTC stream sample in React Native
description: Playing WebRTC Live Stream Sample Using React Native SDK 
keywords: [React Native SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 6
---

* Open the **/samples/play/src/Play.tsx** file and update the **defaultStreamName** variable for streamId and the **webSocketUrl** variable with the server domain or IP address.

![](@site/static/img/image-1654599250441.png)

* Open the **/samples/play/android** folder and provide read, write, and execute permissions to the **gradlew** file.

```shell
chmod 750 gradlew
```

* Go to the **/samples/play** folder and run the below commands to run the **Play** sample React native app.

```shell
npm install
npm run android
```

* Before playing, make sure that there is a stream that is already published to the server with the same streamId in your **defaultStreamName** variable. You can quickly publish a WebRTC stream to the Ant Media Server via a sample page.

`https://your_domain:5443/WebRTCAppEE`

![](@site/static/img/image-1654599731503.png)

* Click the `Start Playing` button on the screen to play the stream that you are publishing on the server.

![](@site/static/img/image-1654600749349.png)
