---
title: WebRTC Peer-To-Peer
description: WebRTC Peer To Peer Using JavaScript SDK 
keywords: [JavaScript SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 4
---

In Peer To Peer Mode two or More Peers can connect with each other without relaying the Audio/Video from the Server , there will be a direct peer to peer connection from one peer to another , In this case Ant Media will only act as a Signaling Server which will help peers to establish WebRTC connection by exchanging some messages.

Lets see a simple example for joining a peer to peer  Live Stream Call with Ant Media using JavaScript SDK.

- Create a new file , name it `peer.html`

- make sure HTTP server is running in same directory

```
python -m http.server
```

<iframe height="550" style={{ width: '100%' }} scrolling="no" title="Untitled" src="https://codepen.io/USAMAWIZARD/embed/azoMqdq?default-tab=js&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/USAMAWIZARD/pen/azoMqdq">
  Untitled</a> by USAMA (<a href="https://codepen.io/USAMAWIZARD">@USAMAWIZARD</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## WebRTCAdapter

```
var webRTCAdaptor = new WebRTCAdaptor(prams....)
```

`WebRTCAdapter` Class is responsible for handling Handling WebSocket Messages and WebRTC Connections with the server.
One `WebRTCAdapter` can be used to join peer room.

`WebRTCAdapter` takes various parameters , all parameters are listed here. 

### WebRTCAdapter Parameters

```
websocket_url
```

`WebSocket URL` is the Server URL of Your Ant Media Server, Check out this page to install Ant Media Server Or for testing purpose this URL can be Used. 

`wss://test.antmedia.io:5443/WebRTCAppEE/websocket`

Web Socket URL format.
```
protocol://IP_ADDRESS:PORT/APPLICATION_NAME/websocket
```

`protocol = ws if http` or
`protocol = wss if https`

If Ant Media is running on HTTP, websocket url should connect to port `5080` insted of `5443`.

Multiple applications can be created in Ant Media to which streams can be played / published , use correct application name in `WebSocket URL` to played / published to That application.

```
remoteVideoElement
```

This should point to the video element which will show this stream.


```
localVideoElement
```

This should point to the video element which will have the video which will be streamed to other peer.

```
callback
```

Messages & notifications sent from server will be received in this callback , This includes notifications like play_started play_started play_timeout joined room , data channel messages etc..

```
webRTCAdaptor.join(streamid)
```

 `WebRTCAdapter` join function joins a room of peer and keeps waiting for another peer to connect , once other peer connects it starts to establish direct p2p connection with the other peers.

```
webRTCAdaptor.stop(streamid)
```
Stops Playing / Publishing WebRTC Streams.


### Running Code

Copy the above code from HTML and JS section in  peer.html file.

open the peer.html page in the browser `http://localhost:8000/peer.html`  (make sure python server is up and running)

 - Accept microphone and camera usage permissions.

 - Click join button.

 - open same  page on new tab and join from there. 

If Stream does not start publishing / playing , open Developer console on the html page and check for any errors.

### Running Code in Live Example

- Navigate to code section above on this page.

- Comment import from directory and uncomment import from URL , It should look something like this.

```
import {WebRTCAdaptor} from "https://cdn.skypack.dev/@antmedia/webrtc_adaptor@SNAPSHOT";
//import { WebRTCAdaptor } from './node_modules/@antmedia/webrtc_adaptor/src/main/js/webrtc_adaptor.js';
```

 - Click join button.

 - open this page on new tab and join from there. 
