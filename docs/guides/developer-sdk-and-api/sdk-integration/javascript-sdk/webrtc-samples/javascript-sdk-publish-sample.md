---
title: Publish WebRTC Stream
description: Publish WebRTC Live stream Using JavaScript SDK 
keywords: [JavaScript SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

Lets start with a simple example for publishing a Live Stream to Ant Media using JavaScript SDK.

- Create a new file , name it `publish.html`

- make sure HTTP server is running in same directory

```
python -m http.server
```

<iframe height="550" style={{ width: '100%' }} scrolling="no" title="Quick WebRTC Publish  - Ant Media Server" src="https://codepen.io/USAMAWIZARD/embed/KwPEZKE?default-tab=js&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/USAMAWIZARD/pen/KwPEZKE">
  Quick WebRTC Publish  - Ant Media Server</a> by USAMA (<a href="https://codepen.io/USAMAWIZARD">@USAMAWIZARD</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## WebRTCAdapter

```
var webRTCAdaptor = new WebRTCAdaptor(prams....)
```

`WebRTCAdapter` Class is responsible for handling Handling WebSocket Messages and WebRTC Connections with the server.
One `WebRTCAdapter` can be used to publish one stream , multiple `WebRTCAdapter` can be created to publish multiple streams to the server.

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
localVideoElement
```

This should point to the video element which will have the video which will be streamed to the Sever.

```
callback
```

Messages & notifications sent from server will be received in this callback , This includes notifications like publish_started play_started publish_timeout , data channel messages etc..

```
webRTCAdaptor.publish(streamid)
```

 `WebRTCAdapter` publish function initiate  WebRTC Connection with Ant Media Server and starts to publish the stream.

```
webRTCAdaptor.stop(streamid)
```
Stops Publishing WebRTC Streams.


### Running Code

Copy the above code from HTML and JS section in  publish.html file.

open the publish.html page in the browser `http://localhost:8000/publish.html`  (make sure python server is up and running)

 - Accept microphone and camera usage permissions.

 - Click publish button.

To verify whether the stream is published successfully or not,  open the web panel of your Ant Media Server and view the stream there. If it does not works open Developer console on the html page and check for any errors.

### Running Code in Live Example

- Navigate to code section above on this page.

- Comment import from directory and uncomment import from URL , It should look something like this.

```
import {WebRTCAdaptor} from "https://cdn.skypack.dev/@antmedia/webrtc_adaptor@SNAPSHOT";
//import { WebRTCAdaptor } from './node_modules/@antmedia/webrtc_adaptor/src/main/js/webrtc_adaptor.js';
```

- Click on Result button It will show small webpage where you can see the output.


You can also quickly play the stream via an embedded player. Check [this document](https://antmedia.io/docs/guides/playing-live-stream/embedded-web-player/) for more details.
