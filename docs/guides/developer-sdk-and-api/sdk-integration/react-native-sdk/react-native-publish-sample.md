---
title: Publishing WebRTC stream Sample in React Native
description: Publishing WebRTC Live stream Using React Native SDK 
keywords: [React Native SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 5
---

To build the publishing sample project, follow the below steps.

* Open the **/samples/publish/src/App.tsx** file and update the **defaultStreamName** variable for streamId and the **webSocketUrl** variable with your server domain or IP address.

![](@site/static/img/image-1654599250441.png)

* Open the **/samples/publish/android** folder and provide read, write, and execute permissions to the **gradlew** file.

```shell
chmod 750 gradlew
```

* Move to the **/samples/publish** folder and run the below commands to run the **Publish** sample React native app.

```shell
npm install
npm run android
```

![](@site/static/img/image-1654599372613.png)

* Click the `Start Publishing` button on the screen to publish the stream on the server.

* You can now go to the web panel of Ant Media Server (e.g., http://serverIP:5080) and watch the stream there. 

You can also quickly play the stream via an embedded player. Check [this document](https://antmedia.io/docs/guides/playing-live-stream/embedded-web-player/) for more details.
