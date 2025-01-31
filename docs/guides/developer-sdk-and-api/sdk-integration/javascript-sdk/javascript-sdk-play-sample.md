---
title: Playing WebRTC
description: playing WebRTC Live stream Using JavaScript SDK 
keywords: [JavaScript SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 5
---

Lets start with a simple example for playing a Live Stream to Ant Media using JavaScript SDK.

- Create a new file , name it `play.html`

- make sure HTTP server is running in same directory

```
python -m http.server
```

<iframe height="550" style={{ width: '100%' }} scrolling="no" title="Quick WebRTC Play - Ant Media Server" src="https://codepen.io/USAMAWIZARD/embed/myboqYB?default-tab=js&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/USAMAWIZARD/pen/myboqYB">
  Quick WebRTC Play - Ant Media Server</a> by USAMA (<a href="https://codepen.io/USAMAWIZARD">@USAMAWIZARD</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## WebRTCAdapter

```
var webRTCAdaptor = new WebRTCAdaptor(prams....)
```

`WebRTCAdapter` Class is responsible for handling Handling WebSocket Messages and WebRTC Connections with the server.
One `WebRTCAdapter` can be used to play multiple stream.

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

Multiple applications can be created in Ant Media to which streams can be played , use correct application name in `WebSocket URL` to play to That application.

```
remoteVideoElement
```

This should point to the video element which will show this stream.

```
callback
```

Messages & notifications sent from server will be received in this callback , This includes notifications like play_started play_started play_timeout , data channel messages etc..

```
webRTCAdaptor.play(streamid)
```

 `WebRTCAdapter` play function initiate  WebRTC Connection with Ant Media Server and starts to play the stream. Specify correct stream id and make sure stream is currently publishing which you are trying to play. 

```
webRTCAdaptor.stop(streamid)
```
Stops playing WebRTC Streams.


### Running Code

Copy the above code from HTML and JS section in  play.html file.

open the play.html page in the browser `http://localhost:8000/play.html`  (make sure python server is up and running)

 - Accept microphone and camera usage permissions.

 - Click play button.

If Stream does not Play , open Developer console on the html page and check for any errors.

### Running Code in Live Example

- Navigate to code section above on this page.

- Comment import from directory and uncomment import from URL , It should look something like this.

import {WebRTCAdaptor} from "https://cdn.skypack.dev/@antmedia/webrtc_adaptor@SNAPSHOT";
//import { WebRTCAdaptor } from './node_modules/@antmedia/webrtc_adaptor/src/main/js/webrtc_adaptor.js';

- Click on Result button It will show small webpage where you can see the output.

- Click on play button to start playing the stream.

Run live example by clicking in Result in The Code Section above.


