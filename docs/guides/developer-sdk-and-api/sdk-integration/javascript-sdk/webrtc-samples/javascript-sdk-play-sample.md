---
title: Play WebRTC Stream
description: Play WebRTC Live Stream Using JavaScript SDK
keywords: [JavaScript SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

Let's start with a simple example for playing a live stream to Ant Media using the JavaScript SDK.

## WebRTC Playback Live Sample

- Navigate to the code section above on this page.

- Comment import from directory and uncomment import from URL. It should look something like this.

  ```
  import {WebRTCAdaptor} from "https://cdn.skypack.dev/@antmedia/webrtc_adaptor@SNAPSHOT";
  //import { WebRTCAdaptor } from './node_modules/@antmedia/webrtc_adaptor/src/main/js/webrtc_adaptor.js';
  ```

- Click on the Result button; it will show a small webpage where you can see the output.

- Click on the play button to start playing the stream.

<iframe height="550" style={{ width: '100%' }} scrolling="no" title="Quick WebRTC Play - Ant Media Server" src="https://codepen.io/USAMAWIZARD/embed/myboqYB?default-tab=js&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/USAMAWIZARD/pen/myboqYB">
  Quick WebRTC Play - Ant Media Server</a> by USAMA (<a href="https://codepen.io/USAMAWIZARD">@USAMAWIZARD</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## Create Play Sample For Deployment

- Create a new file , name it `play.html`

- Make sure HTTP server is running in same directory

  ```
  python3 -m http.server
  ```

- Copy the above code from the HTML and JS sections in the `play.html` file as below:

```html
<!DOCTYPE html>
<html lang="en">
<head>
</head>
<body>

<video id="remoteVideo" controls autoplay playsinline width="480" height="360"></video>
<br/>
<button id="play_start">Start Playing</button>
<button id="play_stop">Stop Playing</button>
<br/>

</body>

<script type="module">
import { WebRTCAdaptor } from './node_modules/@antmedia/webrtc_adaptor/src/main/js/webrtc_adaptor.js';
//PAY ATTENTION: WRITE YOUR STREAM ID BELOW TO PLAY

var streamId = "test"
var webRTCAdaptor = new WebRTCAdaptor({
  websocket_url: "wss://test.antmedia.io:5443/live/websocket",
	remoteVideoElement: document.getElementById("remoteVideo"),
 
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

document.getElementById("play_start").addEventListener("click",()=> {
  webRTCAdaptor.play(streamId)
})
document.getElementById("play_stop").addEventListener("click",()=> {
  webRTCAdaptor.stop(streamId)
})
</script>
</html>
```

open the play.html page in the browser `http://localhost:8000/play.html`  (make sure python server is up and running)

 - Accept microphone and camera usage permissions.

- Click the play button.

If stream does not play, open the developer console on the HTML page and check for any errors.


## WebRTCAdaptor

`WebRTCAdaptor` Class is responsible for handling WebSocket Messages and WebRTC Connections with the server.
One `WebRTCAdaptor` can be used to publish one stream; multiple `WebRTCAdaptor` can be created to publish multiple streams to the server.

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

  `wss://test.antmedia.io:5443/live/websocket`

- If HTTP,  `protocol = ws` or if HTTPS `protocol = wss`


If Ant Media is running on HTTP, the websocket url should connect to the port `5080` instead of `5443`.

Multiple applications can be created in Ant Media to which streams can be published; use the correct application name `WebSocket URL` to publish to that application.

#### localVideoElement

```
remoteVideoElement
```

This should point to the video element that will show this stream.

#### Callback

```
callback
```

Messages & notifications sent from the server will be received in this callback. This includes notifications like `play_started`, `play_timeout` , `data channel messages`, etc.

#### WebRTC Adaptor

-  `WebRTCAdaptor` play function initiate a WebRTC connection with Ant Media Server and starts to play the stream. Specify the correct stream ID and make sure the stream is currently publishing, which you are trying to play.

   ```
   webRTCAdaptor.play(streamid)
   ```

- Stops playing WebRTC streams.

  ```
  webRTCAdaptor.stop(streamid)
  ```
