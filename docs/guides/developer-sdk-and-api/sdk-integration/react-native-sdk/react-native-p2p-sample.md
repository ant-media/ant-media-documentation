---
title: P2P Communication Sample in React Native
description: P2P Communication Sample Using React Native SDK 
keywords: [React Native SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 7
---

*   Open **/samples/peer/src/Peer.tsx** file and update **defaultStreamName** variable for stream name and update **webSocketUrl** variable with server name.![](@site/static/img/image-1654599250441.png)
*   Go to **/samples/peer** folder and follow the [Install dependencies and run sample projects](https://portal.document360.io/guides/developer-sdk-and-api/sdk-integration/react-native-sdk#install-dependencies-and-run-sample-projects) steps to run the **Peer** sample React native app.

![](@site/static/img/image-1654601111460.png)

*   When there is another peer connected to the same stream ID via Android, iOS or web, the P2P communication will be established and you can talk to each other. You can quickly connect to the same stream id via ```https://your_domain:5443/WebRTCAppEE/peer.html```
