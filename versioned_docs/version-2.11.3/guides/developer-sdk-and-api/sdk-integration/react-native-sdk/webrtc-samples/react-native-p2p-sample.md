---
title: P2P Communication Sample
description: P2P Communication Sample Using React Native SDK 
keywords: [React Native SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---

* Open the **/example/src/Peer.tsx** file and update the **defaultStreamName** variable for streamId and the **webSocketUrl** variable with your server domain or IP address.

![](@site/static/img/image-1654599250441.png)

* Open the **/examples/android** folder and provide read, write, and execute permissions to the **gradlew** file.

```shell
chmod 750 gradlew
```

* Move to the **examples** folder, edit the below **index.js** file as below:

```bash
import { AppRegistry } from 'react-native';
//import App from './src/App';
//import App from './src/Play';
import App from './src/Peer';
//import App from './src/Conference';
//import App from './src/Chat';
import { name as appName } from './app.json';
AppRegistry.registerComponent(appName, () => App);
```

and run the below commands to run the **P2P** sample React native app.

```bash
npm install
npm run android
```

![](@site/static/img/image-1654601111460.png)

* When there is another peer connected to the same streamId via Android, iOS, or the web, P2P communication will be established, and you can talk to each other. 

You can quickly join as a peer to the same streamId via the peer-to-peer sample page.

`https://your_domain:5443/WebRTCAppEE/peer.html`
