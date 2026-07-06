---
title: React Native SDK Usage
description: React Native SDK Usage 
keywords: [React Native SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---

Before moving forward with using WebRTC React Native SDK, we highly recommend using the sample project to get started with your application. It's good to know the dependencies and how it works in general.

### Install react-native-ant-media Package

**```npm```**

```shell
npm i @antmedia/react-native-ant-media react-native-webrtc
```

**```yarn```**

```shell
yarn add @antmedia/react-native-ant-media react-native-webrtc
```

### Initialize useAntMedia Adaptor


```js
import { useAntMedia, rtc_view } from "@antmedia/react-native-ant-media";

const adaptor = useAntMedia({
  url: 'wss://<your_server_domain_>/<application_name>/websocket', // your web socket server URL
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
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
  },
  debug: true,
  onlyDataChannel: false, // for using only data channel not audio and video
});
```
    
The example above is taken from [ WebRTC-React-Native-SDK](https://github.com/ant-media/WebRTC-React-Native-SDK/blob/main/example/src/App.tsx)

### Publish Stream

The method below is used to publish a stream:

```js    
adaptor.publish(streamName);
```

The method below is used to stop the stream:

```js 
adaptor.stop(streamName);
```

Detailed code can be viewed at [WebRTC-React-Native-SDK Publish](https://github.com/ant-media/WebRTC-React-Native-SDK/blob/main/example/src/App.tsx)

### Play Stream

The method below is used to play a stream:

```js
adaptor.play(streamName);
```
    
Detailed code can be viewed at [WebRTC-React-Native-SDK Play](https://github.com/ant-media/WebRTC-React-Native-SDK/blob/main/example/src/Play.tsx)

### Use Peer-To-Peer

The method method is used to join a room:

```js
adaptor.join(streamName);
```

The method below is used to leave a room:

```js
adaptor.leave(streamName);
```

Detailed code can be viewed at [WebRTC-React-Native-SDK p2p](https://github.com/ant-media/WebRTC-React-Native-SDK/blob/main/example/src/Peer.tsx)

### Use Conference

The method below is used to join a room:

```js
adaptor.joinRoom(room);
```

The method below is used to leave a room:

```js
adaptor.leaveFromRoom(room);
```
    
Detailed code can be viewed at [WebRTC-React-Native-SDK Conference](https://github.com/ant-media/WebRTC-React-Native-SDK/blob/main/example/src/Conference.tsx)

### Use The Data Channel

The method below is used to send messages:

```js
adaptor.sendData(streamId, message);
```
    
Detailed code can be viewed in [WebRTC-React-Native-SDK Data Channel](https://github.com/ant-media/WebRTC-React-Native-SDK/blob/main/example/src/Chat.tsx)

### Render Stream

To display a local or remote video stream, use the `rtc_view` component.

```js
rtc_view(stream, /*custom style*/{ width: 100, height: 100 });
```

### Switch Camera

You need to get video track to switch camera.

```js
let isFrontCam = true;

try {
	// Taken from above, we don't want to flip if we don't have another camera.
	if ( cameraCount < 2 ) { return; };

	const videoTrack = adaptor.localStream.current.getVideoTracks()[0];
	videoTrack._switchCamera();

	isFrontCam = !isFrontCam;
} catch( err ) {
	// Handle Error
};
```

### Toggle The Microphone

You can mute/unmute microphone by toggling the track enabled value. It can be applied to local microphone and remote audio tracks.

```js
let isMuted = false;

try {
	const audioTrack = await adaptor.localStream.current.getAudioTracks()[0];
	audioTrack.enabled = !audioTrack.enabled;

	isMuted = !isMuted;
} catch( err ) {
	// Handle Error
};
```

### Change Remote Audio Tracks Volume Level

```js
const audioTrack = remoteMediaStream.getAudioTracks()[0];
audioTrack._setVolume(0.5);
```

For more information about the React Native SDK, check [the repository](https://github.com/ant-media/WebRTC-React-Native-SDK)
