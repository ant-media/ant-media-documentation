---
title: WebRTC Conference in React Native
description: WebRTC Conference Using React Native SDK 
keywords: [React Native SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 7
---

* Open the **/samples/Conference/src/Conference.tsx** file and update the **defaultRoomName** variable for streamId and the **webSocketUrl** variable with your server domain or IP address.

![](@site/static/img/image-1655196972089.png)

* Open the **/samples/Conference/android** folder and provide read, write, and execute permissions to the **gradlew** file.

```shell
chmod 750 gradlew
```

* Go to the **/samples/Conference** folder and run the below commands to run the **Conference** sample React native app.

```shell
npm install
npm run android
```

![](@site/static/img/image-1655197421323.png)

* When there are other streams connected to the same roomId via Android, iOS, or the Web, then a conference room will be established and users can communicate with each other. 

You can quickly join the conference room via the conference sample page.

`https://your-domain:5443/WebRTCAppEE/conference.html`
