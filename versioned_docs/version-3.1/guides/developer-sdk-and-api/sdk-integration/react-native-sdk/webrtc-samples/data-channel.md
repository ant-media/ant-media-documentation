---
title: Data Channel
description: Send data channel messages from the React Native sample app.
keywords: [React Native SDK, Data Channel, Ant Media Server Documentation]
sidebar_position: 5
sidebar_label: Data Channel
---

Send and receive data channel messages from the React Native sample app.

Enable the data channel in [application settings](/guides/publish-live-stream/webrtc/data-channel/#enable-data-channel) before testing.

## Configure the WebSocket URL

In `example/src/Chat.tsx`, set these values before running:

<table className="sdk-full-table">
  <thead>
    <tr><th>Setting</th><th>Value</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><code>webSocketUrl</code></td>
      <td>
        <strong>WSS:</strong> <code>wss://your-domain:5443/live/websocket</code> — production, requires <a href="/guides/installing-on-linux/setting-up-ssl/">SSL</a> (port <strong>5443</strong>)<br/>
        <strong>WS:</strong> <code>ws://your-ip:5080/live/websocket</code> — local HTTP without SSL (port <strong>5080</strong>)
      </td>
    </tr>
    <tr>
      <td><code>defaultStreamName</code></td>
      <td>Stream ID for the data channel session</td>
    </tr>
  </tbody>
</table>

Replace `live` with your application name. All publish, play, and other samples use this connection.

![](@site/static/img/image-1654599250441.png)

## Run the sample

1. Grant execute permission to the Gradle wrapper:

```bash
chmod 750 examples/android/gradlew
```

2. In `examples/index.js`, import the Data Channel sample:

```js
import { AppRegistry } from 'react-native';
//import App from './src/App';
//import App from './src/Play';
//import App from './src/Peer';
//import App from './src/Conference';
import App from './src/Chat';
import { name as appName } from './app.json';
AppRegistry.registerComponent(appName, () => App);
```

3. Install and run:

```bash
npm install
npm run android
```

4. Tap **Publishing** to create the data channel stream.

![](@site/static/img/image-1656673042845.png)

5. Send messages with the send button; incoming messages appear in real time.

![](@site/static/img/image-1656673300268.png)

Test from the web player: `https://your-domain:5443/WebRTCAppEE/player.html`
