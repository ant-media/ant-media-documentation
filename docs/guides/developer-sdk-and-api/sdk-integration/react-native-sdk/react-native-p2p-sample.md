---
title: P2P Communication Sample in React Native
description: P2P Communication Sample Using React Native SDK 
keywords: [React Native SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 7
---

* Open the **/samples/peer/src/Peer.tsx** file and update the **defaultStreamName** variable for streamId and the **webSocketUrl** variable with your server domain or IP address.

![](@site/static/img/image-1654599250441.png)

* Open the **/samples/peer/android** folder and provide read, write, and execute permissions to the **gradlew** file.

```shell
chmod 750 gradlew
```

* Go to the **/samples/peer** folder and run the below commands to run the **Publish** sample React native app.

```shell
npm install
npm run android
```

![](@site/static/img/image-1654601111460.png)

* When there is another peer connected to the same streamId via Android, iOS, or the web,  P2P communication will be established, and you can talk to each other. 

You can quickly join as a peer to the same streamId via the peer-to-peer sample page.

`https://your_domain:5443/WebRTCAppEE/peer.html`
