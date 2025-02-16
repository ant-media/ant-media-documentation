---
title: WebRTC Conference
description: WebRTC Conference Using JavaScript SDK 
keywords: [JavaScript SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---

Lets see a very simple WebRTC Conference example with JS SDK.
In simple terms Conference is a Room where a user can join and publish his streams and he will receive the streams of other users who join the same room.so to put it simply we will use publish and play function as we did in previous examples to implement a conference.

- Create a new file , name it `conference.html`

- make sure HTTP server is running in same directory

```
python -m http.server
```

<iframe height="550" style={{ width: '100%' }}  scrolling="no" title="Conference" src="https://codepen.io/USAMAWIZARD/embed/JoPzLgX?default-tab=js&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/USAMAWIZARD/pen/JoPzLgX">
  Conference</a> by USAMA (<a href="https://codepen.io/USAMAWIZARD">@USAMAWIZARD</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## WebRTCAdapter

```
var webRTCAdaptor = new WebRTCAdaptor(prams....)
```

`WebRTCAdapter` Class is responsible for handling Handling WebSocket Messages and WebRTC Connections with the server.
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

Multiple applications can be created in Ant Media to which streams can be published , use correct application name in `WebSocket URL` to publish to That application.

```
localVideoId
```

This is the ID of the Video Element where the local video stream will be displayed

```
callback
```

Messages & notifications sent from server will be received in this callback , This includes notifications like publish_started play_started publish_timeout , data channel messages etc..

 `if (info == "newTrackAvailable")` 

We will get newTrackAvailable callback here where all the remote video streams will be received , we can play these remote streams by creating a video element and append it to the DOM.

```
webRTCAdaptor.publish(our_publish_id, "", "", "", "",roomid, JSON.stringify(""), "");
```

 `WebRTCAdapter` publish function initiate  WebRTC Connection with Ant Media Server and starts to publish the stream.
When publishing for a conference room , own own streamid and the room to which the stream needs to be published must be specified. 

```
webRTCAdaptor.play(roomid, "", roomid, [], "", "", null, "");
```

 `WebRTCAdapter` play function initiate  WebRTC Connection with Ant Media Server and starts to play the stream. Specify correct stream id and make sure stream is currently publishing which you are trying to play. 

When Playing the streams from room the room id should be specified.

```
webRTCAdaptor.stop(streamid)
```
Stops Publishing & Playing WebRTC Streams.


### Running Code

Copy the above code from HTML and JS section in  conference.html file.

open the conference.html page in the browser `http://localhost:8000/conference.html`  (make sure python server is up and running)

 - Accept microphone and camera usage permissions.

 - Click join button.

Join the room in a new tab as a second user and verify if you can receive remote video and remote participants can see your video.

### Running Code in Live Example

- Navigate to code section above on this page.

- Comment import from directory and uncomment import from URL , It should look something like this.

```
import {WebRTCAdaptor} from "https://cdn.skypack.dev/@antmedia/webrtc_adaptor@SNAPSHOT";
//import { WebRTCAdaptor } from './node_modules/@antmedia/webrtc_adaptor/src/main/js/webrtc_adaptor.js';
```

- Click on Result button It will show small webpage where you can see the output.

- enter a room id and join the room.

- open this page in another tab and join with the same room id.
