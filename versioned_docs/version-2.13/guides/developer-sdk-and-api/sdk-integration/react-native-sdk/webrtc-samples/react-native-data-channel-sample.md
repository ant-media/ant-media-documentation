---
title: Data Channel Sample
description: Data Channel Sample Using React Native SDK 
keywords: [React Native SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 5
---


* Open the **/example/src/Chat.tsx** file and update the **defaultStreamName** variable for streamId and the **webSocketUrl** variable with your server domain or IP address.

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
//import App from './src/Conference';
import App from './src/Chat';
import { name as appName } from './app.json';
AppRegistry.registerComponent(appName, () => App);
```

and run the below commands to run the **Data Channel** sample React native app.

```bash
npm install
npm run android
```

* Click the `Publishing` button on the screen to create the data channel stream on the server.

![](@site/static/img/image-1656673042845.png)

* Once the stream is published, the user can start sending messages using the send button and also see the received messages from other users.

![](@site/static/img/image-1656673300268.png)

You can quickly play the stream via a sample page and send and receive the data channel messages.

https://your-domain:5443/WebRTCAppEE/player.html
