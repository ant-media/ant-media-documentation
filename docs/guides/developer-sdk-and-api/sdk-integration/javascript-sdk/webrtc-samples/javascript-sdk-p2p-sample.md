---
title: WebRTC Peer-To-Peer
description: WebRTC Peer To Peer Using JavaScript SDK 
keywords: [JavaScript SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 4
---

In Peer-to-Peer Mode, two or more peers can connect with each other without relaying the audio or video from the server; there will be a direct peer-to-peer connection from one peer to another. 

In this case, Ant Media Server will only act as a Signaling server, which will help peers establish a WebRTC connection by exchanging some messages.

Let's see a simple example for joining a peer-to-peer live stream call with Ant Media using the JavaScript SDK.

## WebRTC P2P Live Sample

- Navigate to the P2P sample page [here](https://codepen.io/USAMAWIZARD/embed/azoMqdq?default-tab=js&editable=true) at Code Pen.

- Comment import from directory and uncomment import from URL. It should look something like this.

  ```
  import  {WebRTCAdaptor} from  "https://esm.sh/@antmedia/webrtc_adaptor";
  //import { WebRTCAdaptor } from './node_modules/@antmedia/webrtc_adaptor/src/main/js/webrtc_adaptor.js';
  ```

- Click the join button.

- Open this page on a new tab and join from there. 


## Create P2P Sample For Deployment

- Create a new file , name it `peer.html`

- make sure HTTP server is running in same directory

  ```
  python3 -m http.server
  ```

- Copy the above code from the HTML and JS sections in the `peer.html` file as below:

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

Open the peer.html page in the browser `http://localhost:8000/peer.html`  (make sure python server is up and running)

- Accept microphone and camera usage permissions.

- Click the join button.

- Open the same page on a new tab and join from there. 

If the stream does not start publishing / playing, open the developer console on the HTML page and check for any errors.

## WebRTCAdaptor

`WebRTCAdaptor` Class is responsible for handling WebSocket Messages and WebRTC Connections with the server.
One `WebRTCAdapter` can be used to join a peer room.

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

    For example, `wss://test.antmedia.io:5443/live/websocket`

- If HTTP,  `protocol = ws` or if HTTPS `protocol = wss`

If Ant Media is running on HTTP, the websocket URL should connect to the port `5080` instead of `5443`.

Multiple applications can be created in Ant Media to which streams can be played / published; use the correct application name in `WebSocket URL` to played / published to that application.

#### remoteVideoElement

```
remoteVideoElement
```

This should point to the video element that will show this stream.

#### localVideoElement

```
localVideoElement
```

This should point to the video element that will have the video, which will be streamed to other peer.

#### Callback

```
callback
```

Messages & notifications sent from the server will be received in this callback. This includes notifications like `publish_started`, `play_started`, `publish_timeout` , `data channel messages`, etc.

#### WebRTC Adaptor

- `WebRTCAdaptor` join function joins a room of peers and keeps waiting for another peer to connect; once the other peer connects, it starts to establish direct P2P connections with the other peers.

```
webRTCAdaptor.join(streamid)
```

- Stops Playing / Publishing WebRTC Streams.

```
webRTCAdaptor.stop(streamid)
```
