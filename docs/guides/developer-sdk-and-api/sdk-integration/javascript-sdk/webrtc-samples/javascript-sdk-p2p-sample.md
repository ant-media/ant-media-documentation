---
title: WebRTC Peer-To-Peer
description: WebRTC Peer To Peer Using JavaScript SDK 
keywords: [JavaScript SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 4
---

In Peer-to-Peer (P2P) mode, two or more peers can connect with each other directly, without relaying audio or video through the server. Instead, there will be a direct WebRTC connection from one peer to another.

In this setup, Ant Media Server only acts as a signaling server. Its role is to help peers exchange the necessary information (signaling messages) to establish the connection, after which all media flows directly between peers.

This greatly reduces latency and server load, making it ideal for real-time communication scenarios like video calls or group chats.

## WebRTC P2P Live Sample

1. Navigate to the P2P sample page [here](https://codepen.io/USAMAWIZARD/embed/azoMqdq?default-tab=js&editable=true) at Code Pen.

2. Comment out the import from the local directory and uncomment the import from the URL:

  ```js
  import  {WebRTCAdaptor} from  "https://esm.sh/@antmedia/webrtc_adaptor";
  //import { WebRTCAdaptor } from './node_modules/@antmedia/webrtc_adaptor/src/main/js/webrtc_adaptor.js';
  ```

3. Click the **Join** button.

4. Open the same page in a new browser tab and join again — now you should see the peer-to-peer connection in action.


## Create P2P Sample For Deployment

1. Create a new file called `peer.html`

2. Start a local HTTP server in the same directory:

  ```
  python3 -m http.server
  ```

3. Copy the example code into peer.html.

```html
<!DOCTYPE html>
<html lang="en">
<head>
</head>
<body>

<video id="localVideo" autoplay controls width=480px height=360px></video>
<video id="remoteVideo" controls autoplay playsinline width="480" height="360"></video>
<br/>
<input type=text placeholder="p2p room id" id="roomid">
<button id="joinroom">join</button>
<br/>

</body>

<script type="module">
import { WebRTCAdaptor } from './node_modules/@antmedia/webrtc_adaptor/src/main/js/webrtc_adaptor.js';

var webRTCAdaptor = new WebRTCAdaptor({
  websocket_url: "wss://test.antmedia.io:5443/live/websocket",
	remoteVideoElement: document.getElementById("remoteVideo"),
 	localVideoElement: document.getElementById("localVideo"),

  callback: (info, obj) => {
     console.log("callback info: " + info);
     if (info == "play_started") {
        console.log("publish started");
        statusInfo.innerHTML = "Playing - Stream Id:" + streamId; 
     }
     else if (info == "play_finished") {
        console.log("publish finished")
        statusInfo.innerHTML = "Offline"
     }
  },
  
});

document.getElementById("joinroom").addEventListener("click",()=> {
  var roomid = document.getElementById("roomid").value;
  var status = document.getElementById("joinroom");
  
  if(status.innerHTML =="join"){
    status.innerHTML  = "leave";
    webRTCAdaptor.join(roomid);
  }
  else{
    status.innerHTML  = "join";
    webRTCAdaptor.stop(roomid);
  }
})

</script>
</html>
```

4. Open the file in your browser: `http://localhost:8000/peer.html`.

5. Accept microphone and camera permissions.

6. Enter a room ID and click **Join**.

7. Open the same page in another tab and join with the same room ID.

If the stream does not start publishing/playing, check the browser developer console for errors.

## WebRTCAdaptor

The `WebRTCAdaptor` class is responsible for handling WebSocket messages and WebRTC connections with the server. In P2P mode, one `WebRTCAdaptor` can be used to join a peer room.

Example initialization:

```
var webRTCAdaptor = new WebRTCAdaptor(prams....)
```

The `WebRTCAdaptor` takes various parameters; all parameters are listed here. 

### WebRTCAdaptor Parameters


#### WebSocket URL

- `WebSocket URL` is the server URL of your Ant Media Server. Check out this page to install Ant Media Server, or for testing purposes, this URL can be used. 

  ```
  websocket_url
  ```

- Web socket URL format.

  ```
  protocol://IP_ADDRESS:PORT/APPLICATION_NAME/websocket
  ```

-  Example: `wss://test.antmedia.io:5443/live/websocket`

- Use `ws://` for HTTP or `wss://` for HTTPS.

- If Ant Media is running on HTTP, use port 5080 instead of 5443.

Multiple applications can be created in Ant Media to which streams can be played / published; use the correct application name in `WebSocket URL` to played / published to that application.

#### `remoteVideoElement`

The **<video>** element that displays the incoming remote stream.

#### `localVideoElement`

The **<video>** element that displays your local stream, which will be sent to the other peer.

#### `Callback`

```
callback
```

Messages & notifications sent from the server will be received in this callback. This includes notifications like `publish_started`, `play_started`, `publish_timeout` , `data channel messages`, etc.

#### WebRTC Adaptor Methods

- Join a room (waits for peers and establishes P2P connections):

```
webRTCAdaptor.join(streamid)
```

- Stop playing/publishing streams:

```
webRTCAdaptor.stop(streamid)
```

## Congratulations!

You’ve now learned how to establish a peer-to-peer WebRTC connection using the Ant Media JavaScript SDK.

In this mode, Ant Media Server works only as a signaling server, while all the actual audio and video traffic flows directly between peers — delivering ultra-low latency communication.

With this foundation, you can build advanced use cases like one-on-one video calls, group chat rooms, or collaborative real-time applications, all leveraging the power of WebRTC and Ant Media Server.