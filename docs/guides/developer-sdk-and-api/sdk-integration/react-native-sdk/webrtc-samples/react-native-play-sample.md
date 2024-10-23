---
title: Play WebRTC Stream
description: Play WebRTC Stream Sample
keywords: [React Native SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---


* Open the **/example/src/Play.tsx** file and update the **defaultStreamName** variable for streamId and the **webSocketUrl** variable with your server domain or IP address.

![](@site/static/img/image-1654599250441.png)

* Open the **/examples/android** folder and provide read, write, and execute permissions to the **gradlew** file.

```shell
chmod 750 gradlew
```

* Move to the **examples** folder, edit the below **index.js** file as below:

```bash
import { AppRegistry } from 'react-native';
//import App from './src/App';
import App from './src/Play';
//import App from './src/Peer';
//import App from './src/Conference';
//import App from './src/Chat';
import { name as appName } from './app.json';
AppRegistry.registerComponent(appName, () => App);
```

and run the below commands to run the **Play** sample React native app.

```bash
npm install
npm run android
```

* Before playing, make sure that there is a stream that is already published to the server with the same streamId in your **defaultStreamName** variable. You can quickly publish a WebRTC stream to the Ant Media Server via a sample page.

`https://your_domain:5443/WebRTCAppEE`

* Click the `Start Playing` button on the screen to play the stream that you are publishing on the server.

![](@site/static/img/image-1654599731503.png)
