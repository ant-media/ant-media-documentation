---
title: Data Channel Sample Using React Native SDK
description: Data Channel Sample Using React Native SDK 
keywords: [React Native SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 5
---


1. Open the **/example/src/Chat.tsx** file and update the **defaultStreamName** variable for streamId and the **webSocketUrl** variable with your server domain or IP address.

![](@site/static/img/image-1654599250441.png)

2. Open the **/examples/android** folder and provide read, write, and execute permissions to the **gradlew** file.

```shell
chmod 750 gradlew
```

3. Move to the **examples** folder, edit the below **index.js** file as below:

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

4. Run the below commands to run the **Data Channel** sample React native app.

```bash
npm install
npm run android
```

5. Click the `Publishing` button on the screen to create the data channel stream on the server.

![](@site/static/img/image-1656673042845.png)

6. Once the stream is published, you can start sending messages using the send button. Messages from other users will also appear in real time.

![](@site/static/img/image-1656673300268.png)

You can quickly play the stream via a sample page and test sending and receiving data channel messages:

https://your-domain:5443/WebRTCAppEE/player.html

## Congratulations!

You have successfully set up the React Native app for data channel communication. Your app can now publish streams, send messages, and receive messages from other participants in real time, enabling live chat functionality over WebRTC. Enjoy experimenting with real-time messaging alongside your live streams!
