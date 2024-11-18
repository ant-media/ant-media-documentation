---
title: Publish WebRTC Stream
description: Publish WebRTC Stream Using React Native SDK
keywords: [React Native SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

To build the publishing sample project, follow the below steps.

* Open the **/example/src/App.tsx** file and update the **defaultStreamName** variable for streamId and the **webSocketUrl** variable with your server domain or IP address.

![](@site/static/img/image-1654599250441.png)

* Open the **/examples/android** folder and provide read, write, and execute permissions to the **gradlew** file.

```bash
chmod 750 gradlew
```

* Move to the **examples** folder, edit the below **index.js** file as below:

```bash
import { AppRegistry } from 'react-native';
import App from './src/App';
//import App from './src/Play';
//import App from './src/Peer';
//import App from './src/Conference';
//import App from './src/Chat';
import { name as appName } from './app.json';
AppRegistry.registerComponent(appName, () => App);
```

and run the below commands to run the **Publish** sample React native app.

```bash
npm install
npm run android
```

* Click the `Start Publishing` button on the screen to publish the stream on the server.

![](@site/static/img/image-1654599372613.png)

* You can now go to the web panel of Ant Media Server (e.g., http://serverIP:5080) and watch the stream there. 

You can also quickly play the stream via an embedded player. Check [this document](https://antmedia.io/docs/guides/playing-live-stream/embedded-web-player/) for more details.
