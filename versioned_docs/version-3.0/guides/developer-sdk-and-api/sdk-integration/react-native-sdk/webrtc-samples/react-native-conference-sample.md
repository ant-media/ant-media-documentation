---
title: WebRTC Conference
description: WebRTC Conference Using React Native SDK 
keywords: [React Native SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 4
---


1. Open the **/example/src/Conference.tsx** file and update the **defaultRoomName** variable for streamId and the **webSocketUrl** variable with your server domain or IP address.

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
import App from './src/Conference';
//import App from './src/Chat';
import { name as appName } from './app.json';
AppRegistry.registerComponent(appName, () => App);
```

4. Run the below commands to run the **Conference** sample React native app.

```bash
npm install
npm run android
```

![](@site/static/img/image-1655197421323.png)

5. When multiple streams connect to the same **roomId** via Android, iOS, or the web, a conference room will be established. Users can now communicate with each other in real time.

You can also quickly join the conference room using the sample page:

`https://your-domain:5443/WebRTCAppEE/conference.html`

## Congratulations!

You have successfully set up the React Native app for multi-user WebRTC conferencing. Your devices can now join a shared room, publish their streams, and receive streams from other participants, creating a fully interactive live conference experience. Enjoy collaborating and testing with multiple users seamlessly!