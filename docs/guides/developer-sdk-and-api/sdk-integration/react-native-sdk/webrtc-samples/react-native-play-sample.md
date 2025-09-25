---
title: Play WebRTC Stream Using React Native SDK
description: Play WebRTC Stream Using React Native SDK
keywords: [React Native SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---


1. Open the **/example/src/Play.tsx** file and update the **defaultStreamName** variable for streamId and the **webSocketUrl** variable with your server domain or IP address.

![](@site/static/img/image-1654599250441.png)

2. Open the **/examples/android** folder and provide read, write, and execute permissions to the **gradlew** file.

```shell
chmod 750 gradlew
```

3. Move to the **examples** folder, edit the below **index.js** file as below:

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

4. Run the below commands to run the **Play** sample React native app.

```bash
npm install
npm run android
```

5. Before playing, make sure that a stream is already published to the server with the same stream ID as in your **defaultStreamName** variable. You can quickly publish a WebRTC stream via the sample page:

`https://your_domain:5443/WebRTCAppEE`

6. Click the **Start Playing** button on the screen to play the stream published on the server.

![](@site/static/img/image-1654599731503.png)


## Congratulations!

You’ve successfully set up the React Native app to play a WebRTC stream from your Ant Media Server! Your app can now receive live streams in real time, enabling you to watch broadcasts directly from your mobile device. Enjoy exploring the streaming features and testing different stream sources.