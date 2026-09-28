---
title: Publish
description: Publish a WebRTC stream from the React Native sample app.
keywords: [React Native SDK, Publish WebRTC, Ant Media Server Documentation]
sidebar_position: 1
sidebar_label: Publish
---

Publish a WebRTC stream from the React Native sample app.

## Configure the WebSocket URL

In `example/src/App.tsx`, set these values before running:

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
      <td>Stream ID to publish</td>
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

2. In `examples/index.js`, import the Publish sample:

```js
import { AppRegistry } from 'react-native';
import App from './src/App';
//import App from './src/Play';
//import App from './src/Peer';
//import App from './src/Conference';
//import App from './src/Chat';
import { name as appName } from './app.json';
AppRegistry.registerComponent(appName, () => App);
```

3. Install and run:

```bash
npm install
npm run android
```

4. Tap **Start Publishing** on the device.

![](@site/static/img/image-1654599372613.png)

## Verify the stream

- Open the Ant Media Server web panel and confirm the broadcast.
- Or play it with the [embedded web player](/guides/playing-live-stream/embedded-web-player/).
