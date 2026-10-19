---
title: SDK Usage
description: Install and use the Ant Media React Native SDK.
keywords: [React Native SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
sidebar_label: SDK Usage
---

# SDK Usage

Use the sample apps first to learn the flow, then integrate `@antmedia/react-native-ant-media` into your project. See [React Native samples](/category/react-native-sdk-samples/).

## Install

```bash
npm i @antmedia/react-native-ant-media react-native-webrtc
```

Or with Yarn:

```bash
yarn add @antmedia/react-native-ant-media react-native-webrtc
```

## Configure the WebSocket URL

Set `url` when initializing `useAntMedia`:

| Protocol | Example | When to use |
|----------|---------|-------------|
| **WSS** | `wss://your-domain:5443/live/websocket` | Production — requires [SSL](/guides/installing-on-linux/setting-up-ssl/) (port **5443**) |
| **WS** | `ws://your-ip:5080/live/websocket` | Local HTTP without SSL (port **5080**) |

Replace `live` with your application name. All publish, play, and other samples use this connection.

## Initialize the adaptor

```js
import { useAntMedia, rtc_view } from "@antmedia/react-native-ant-media";

const adaptor = useAntMedia({
  url: "wss://your-domain:5443/live/websocket",
  mediaConstraints: {
    audio: true,
    video: {
      width: 640,
      height: 480,
      frameRate: 30,
      facingMode: "front",
    },
  },
  callback: (message, data) => {
    console.log("Callback message: ", message, "Data: ", data);
  },
  callbackError: (errorMessage, data) => {
    console.error("Error message: ", errorMessage, "Data: ", data);
  },
  peer_connection_config: {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  },
  debug: true,
  onlyDataChannel: false,
});
```

Reference: [example/src/App.tsx](https://github.com/ant-media/WebRTC-React-Native-SDK/blob/main/example/src/App.tsx).

## Methods

<table className="sdk-api-table">
  <thead>
    <tr><th>Method</th><th>Description</th></tr>
  </thead>
  <tbody>
    <tr><td><code>adaptor.publish(streamName)</code></td><td>Start publishing</td></tr>
    <tr><td><code>adaptor.play(streamName)</code></td><td>Start playing</td></tr>
    <tr><td><code>adaptor.stop(streamName)</code></td><td>Stop publish or play</td></tr>
    <tr><td><code>adaptor.join(streamName)</code></td><td>Join a P2P room</td></tr>
    <tr><td><code>adaptor.leave(streamName)</code></td><td>Leave a P2P room</td></tr>
    <tr><td><code>adaptor.joinRoom(room)</code></td><td>Join a conference room</td></tr>
    <tr><td><code>adaptor.leaveFromRoom(room)</code></td><td>Leave a conference room</td></tr>
    <tr><td><code>adaptor.sendData(streamId, message)</code></td><td>Send a data channel message</td></tr>
  </tbody>
</table>

## Render a stream

```js
rtc_view(stream, { width: 100, height: 100 });
```

## Switch camera

```js
let isFrontCam = true;

try {
  if (cameraCount < 2) { return; }
  const videoTrack = adaptor.localStream.current.getVideoTracks()[0];
  videoTrack._switchCamera();
  isFrontCam = !isFrontCam;
} catch (err) {
  // Handle error
}
```

## Mute / unmute microphone

```js
let isMuted = false;

try {
  const audioTrack = await adaptor.localStream.current.getAudioTracks()[0];
  audioTrack.enabled = !audioTrack.enabled;
  isMuted = !isMuted;
} catch (err) {
  // Handle error
}
```

## Remote audio volume

```js
const audioTrack = remoteMediaStream.getAudioTracks()[0];
audioTrack._setVolume(0.5);
```

For more details, see the [React Native SDK repository](https://github.com/ant-media/WebRTC-React-Native-SDK).
