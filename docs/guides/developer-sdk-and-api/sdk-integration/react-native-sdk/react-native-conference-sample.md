---
title: WebRTC Conference in React Native
description: WebRTC Conference Using React Native SDK 
keywords: [React Native SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 8
---

*   Open **/samples/conference/src/conference.tsx** file and update **defaultRoomName** variable for stream name and update **webSocketUrl** variable with server name.

![](@site/static/img/image-1655196972089.png)

*   Go to **/samples/conference** folder and follow the [Install dependencies and run sample projects](https://portal.document360.io/guides/developer-sdk-and-api/sdk-integration/react-native-sdk#install-dependencies-and-run-sample-projects) steps to run the C**onference** sample React native app.

![](@site/static/img/image-1655197421323.png)

*   When there are other streams connected to the same room id via Android, iOS or Web, then a conference room will be established and you can talk to each other. You can quickly connect to the same stream id via
    
    https://your\_domain:5443/WebRTCAppEE/conference.html![](@site/static/img/image-1655197140679.png)  