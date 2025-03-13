---
title: WebRTC Peer to Peer Communication
description: WebRTC Peer to Peer Communication
keywords: [WebRTC Peer to Peer Communication, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 5
---

# WebRTC peer to peer communication

In this documentation, we're going to explain how to implement WebRTC peer to peer communication with JavaScript SDK. There is already a working demo for this in peer.html file under your AMS installation URL:

    https://domain-name.com:5443/LiveApp/peer.html

File is located under ```/usr/local/antmedia/webapps/LiveApp/peer.html```

> WebRTC video Conference is available in the Enterprise Edition.

## Navigate to the Peer Sample page

In the Enterprise Edition, go to 
```https://your domain name:5443/WebRTCAppEE/peer.html```or
```https://your domain name:5443/WebRTCApp/peer.html``` in the Community Edition.

If you have Ant Media Server installed on your local machine, you can also go to ```http://localhost:5080/WebRTCAppEE/peer.html``` in the Enterprise Edition or ```http://localhost:5080/WebRTCApp/peer.html``` in the Community Edition.

![](@site/static/img/publish-live-stream/WebRTC/WebRTC-publishing/WebRTC-peer.png)

## Input the stream id

Input the Stream id and click join button.now open the same page in a new browser tab or any other machine and click join.Congratulations! You're now using WebRTC to connect in P2P Mode from your browser!


### Joining a peer to peer communication

When WebRTCAdaptor is initialized successfully, it creates a web socket connection. After a successful connection, the client gets the initialized notification from the server. After receiving ```initialized``` notification, you can call ```join``` method.

    webRTCAdaptor.join(streamId);

```join``` method gets one parameter:

*   ```streamId``` (mandatory): The id of the peer to peer connection that this client would join.

If ```join``` method returns successful, the server responds with ```joined``` notification. As a result ```callback``` method is called with joined notification.

### Leaving from a peer to peer communication**

When you want to leave from a peer to peer connection, just call the ```leave``` method.

    webRTCAdaptor.leave(streamId);

 ```leave``` method gets one parameter:

```streamId``` (mandatory): The id of the peer to peer connection that this client would leave from.

### Auxiliary methods

JavaScript SDK provides several auxiliary methods to provide enough flexibility in your application.

```turnOffLocalCamera```: Turn off the local camera in WebRTC peer to peer communication.

    webRTCAdaptor.turnOffLocalCamera(streamId);

```turnOnLocalCamera```: Turn on the local camera in WebRTC peer to peer communication.

    webRTCAdaptor.turnOnLocalCamera(streamId);

```muteLocalMic```: Mutes the local microphone in WebRTC peer to peer communication.

    webRTCAdaptor.muteLocalMic();

```unmuteLocalMic```: Unmute the local microphone in WebRTC peer to peer communication.

    webRTCAdaptor.unmuteLocalMic();

### TURN server

In some cases, peer to peer communication cannot be established and a relay server is required for video/audio transmission. For this requirement, TURN servers are needed to relay the video/audio.

![](@site/static/img/dataPathways.png)

[Coturn](https://github.com/coturn/coturn) can be used as a TURN server. You can enter TURN server credentials in [peer.html](https://github.com/ant-media/StreamApp/blob/master/src/main/webapp/peer.html) as follows.

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
