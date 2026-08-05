---
title: P2P
description: WebRTC peer-to-peer mode using the JavaScript SDK.
keywords: [JavaScript SDK, WebRTC P2P, Ant Media Server Documentation]
sidebar_position: 4
sidebar_label: P2P
---

In peer-to-peer (P2P) mode, media flows directly between browsers. Ant Media Server acts only as a signaling server to exchange connection metadata.

## Configure the WebSocket URL

Before you run any sample, set `websocket_url` to your Ant Media Server application:

| Protocol | Example | When to use |
|----------|---------|-------------|
| **WSS** | `wss://your-domain:5443/live/websocket` | Production — requires [SSL](/guides/installing-on-linux/setting-up-ssl/) (port **5443**) |
| **WS** | `ws://your-ip:5080/live/websocket` | Local HTTP without SSL (port **5080**) |

Replace `live` with your application name. All publish, play, and other samples use this connection.

## WebRTCAdaptor for P2P

One `WebRTCAdaptor` joins a room and establishes direct peer connections.

```js
var webRTCAdaptor = new WebRTCAdaptor({
  websocket_url: "wss://your-domain:5443/live/websocket",
  localVideoElement: document.getElementById("localVideo"),
  remoteVideoElement: document.getElementById("remoteVideo"),
  callback: (info, obj) => { /* handle events */ },
});
```

<table className="sdk-api-table">
  <thead>
    <tr><th>Parameter</th><th>Description</th></tr>
  </thead>
  <tbody>
    <tr><td><code>websocket_url</code></td><td>Server WebSocket endpoint (see table above)</td></tr>
    <tr><td><code>localVideoElement</code></td><td><code>&lt;video&gt;</code> element for your local camera preview</td></tr>
    <tr><td><code>remoteVideoElement</code></td><td><code>&lt;video&gt;</code> element for the remote peer's stream</td></tr>
    <tr><td><code>callback</code></td><td>Receives signaling events and connection state changes</td></tr>
  </tbody>
</table>

<table className="sdk-api-table">
  <thead>
    <tr><th>Method</th><th>Description</th></tr>
  </thead>
  <tbody>
    <tr><td><code>webRTCAdaptor.join(roomId)</code></td><td>Joins a P2P room and waits for peers</td></tr>
    <tr><td><code>webRTCAdaptor.stop(roomId)</code></td><td>Leaves the room and closes peer connections</td></tr>
  </tbody>
</table>

## Live sample

1. Open the [P2P sample on CodePen](https://codepen.io/USAMAWIZARD/embed/azoMqdq?default-tab=js&editable=true).
2. Comment out the local import and uncomment the URL import:

  ```js
  import { WebRTCAdaptor } from "https://esm.sh/@antmedia/webrtc_adaptor";
  //import { WebRTCAdaptor } from './node_modules/@antmedia/webrtc_adaptor/src/main/js/webrtc_adaptor.js';
  ```

3. Set `websocket_url` to your server, click **Join**, then open the same page in another tab and join with the same room ID.

## Create your own page

1. Create `peer.html` in your project directory.
2. Copy the following into `peer.html` and set `websocket_url` to your server:

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
  websocket_url: "wss://your-domain:5443/live/websocket",
  remoteVideoElement: document.getElementById("remoteVideo"),
  localVideoElement: document.getElementById("localVideo"),

  callback: (info, obj) => {
     console.log("callback info: " + info);
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

3. Start a local HTTP server in the same directory:

  ```bash
  python3 -m http.server
  ```

4. Open `http://localhost:8000/peer.html`, enter a room ID, and join from two browser tabs.
