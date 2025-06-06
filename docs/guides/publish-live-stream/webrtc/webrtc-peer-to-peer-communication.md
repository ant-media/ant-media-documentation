---
title: WebRTC Peer to Peer Communication
description: WebRTC Peer to Peer Communication
keywords: [WebRTC Peer to Peer Communication, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 5
---

In this documentation, we're going to explain how to implement WebRTC peer-to-peer communication with JavaScript SDK. 

## Navigate to P2P Sample Page

There is already a working demo for this in the `peer.html` file.

Go to ⁣`https://your domain name:5443/live/peer.html` for a sample page.

If you have Ant Media Server installed on your local machine, you can also go to ```http://localhost:5080/live/peer.html```

![](@site/static/img/publish-live-stream/WebRTC/WebRTC-publishing/WebRTC-peer.png)

- Input the streamId and click the join button.
- Now open the same page in a new browser tab or any other machine and click Join. Congratulations! You're now using WebRTC to connect in P2P mode from your browser!


### Join P2P Communication

When WebRTCAdaptor is successfully initialized, it establishes a web socket connection. Following a successful connection, the client receives an initialized notification from the server. After receiving ```initialized``` notification, call the```join``` method.

```js
webRTCAdaptor.join(streamId);
```

If the ```join``` method returns successful, the server responds with a ```joined``` notification. As a result, the ```callback``` method is called with joined notification.

### Leave P2P Communication

When you want to leave a peer-to-peer connection, just call the ```leave``` method.

```js
webRTCAdaptor.leave(streamId);
```

### Auxiliary Methods

The JavaScript SDK provides several auxiliary methods to provide enough flexibility in your application.

- **```turnOffLocalCamera```:** Turn off the local camera in WebRTC peer to peer communication.

   ```js
  webRTCAdaptor.turnOffLocalCamera(streamId);
   ```

- **```turnOnLocalCamera```:** Turn on the local camera in WebRTC peer-to-peer communication.

   ```js
  webRTCAdaptor.turnOnLocalCamera(streamId);
   ```
   
- **```muteLocalMic```:** Mutes the local microphone in WebRTC peer-to-peer communication.

   ```js
  webRTCAdaptor.muteLocalMic();
   ```

- **```unmuteLocalMic```:** Unmute the local microphone in WebRTC peer-to-peer communication.

   ```js
  webRTCAdaptor.unmuteLocalMic();
   ```
   
## TURN Server

In some cases, peer-to-peer communication cannot be established and a relay server is required for video/audio transmission. For this requirement, TURN servers are needed to relay the video/audio.

![](@site/static/img/dataPathways.png)

Check out this [**TURN server document**](https://antmedia.io/docs/guides/advanced-usage/turn-instalation/coturn-quick-installation/) for the configuration.

You can configure TURN server credentials in [peer.html](https://github.com/ant-media/StreamApp/blob/master/src/main/webapp/peer.html) as follows.

```js
var pc_config =
{
  'iceServers' : 
      [ {
        'urls' : 'turnServerURL',
        'username' : 'turnServerUsername',
        'credential' : 'turnServerCredential'
      } ]
};
```
