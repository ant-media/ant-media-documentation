---
title: WebRTC Conference
description: WebRTC Conference Using React Native SDK 
keywords: [React Native SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 4
---


* Open the **/example/src/Conference.tsx** file and update the **defaultRoomName** variable for streamId and the **webSocketUrl** variable with your server domain or IP address.

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
//import App from './src/Peer';
import App from './src/Conference';
//import App from './src/Chat';
import { name as appName } from './app.json';
AppRegistry.registerComponent(appName, () => App);
```

and run the below commands to run the **Conference** sample React native app.

```bash
npm install
npm run android
```

![](@site/static/img/image-1655197421323.png)

* When there are other streams connected to the same roomId via Android, iOS, or the Web, then a conference room will be established and users can communicate with each other. 

You can quickly join the conference room via the conference sample page.

`https://your-domain:5443/WebRTCAppEE/conference.html`
