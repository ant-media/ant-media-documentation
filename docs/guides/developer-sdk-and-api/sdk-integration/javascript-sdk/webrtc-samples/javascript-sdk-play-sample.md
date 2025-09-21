---
title: Play WebRTC Stream
description: Play WebRTC Live Stream Using JavaScript SDK
keywords: [JavaScript SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

This guide demonstrates how to play a live stream from Ant Media Server using the JavaScript SDK.

## WebRTC Playback Live Sample

- Navigate to the Play sample [here](https://codepen.io/USAMAWIZARD/embed/myboqYB?default-tab=js&editable=true) at Codepen.

- Comment the import from local directory and uncomment the import from URL:

  ```
  import  {WebRTCAdaptor} from  "https://esm.sh/@antmedia/webrtc_adaptor";
  //import { WebRTCAdaptor } from './node_modules/@antmedia/webrtc_adaptor/src/main/js/webrtc_adaptor.js';
  ```

- Click on the Result button; it will show a small webpage where you can see the output.

- Click on the play button to start playing the stream.

## Create Play Sample For Deployment

1. Create a new file , name it `play.html`

2. Ensure your HTTP server is running in the same directory:

  ```
  python3 -m http.server
  ```

3. Copy the following content into `play.html`:

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

4. Open the page in the browser: `http://localhost:8000/play.html` (make sure python server is up and running)

5. Accept microphone and camera permissions if prompted.

6. Click **Start Playing** to play the stream.

If the stream does not play, check the browser developer console for errors.


## WebRTCAdaptor

The `WebRTCAdaptor` class manages WebSocket messages and WebRTC connections with the server.

* One `WebRTCAdaptor` can publish/play one stream. Multiple adaptors can be used for multiple streams.

* Create an instance:

```
var webRTCAdaptor = new WebRTCAdaptor(prams....)
```

The `WebRTCAdaptor` takes various parameters; all parameters are listed here. 

## Parameters

### WebSocket URL

- `WebSocket URL` is the server URL of your Ant Media Server. Example:

```bash
wss://test.antmedia.io:5443/live/websocket
```

- Format: 

```bash
protocol://IP_ADDRESS:PORT/APPLICATION_NAME/websocket
```

- Use `ws://` for HTTP, `wss://` for HTTPS.


- If Ant Media is running on HTTP, connect to port `5080`. Otherwise, use `5443`.

Multiple applications can be created in Ant Media to which streams can be published; use the correct application name `WebSocket URL` to publish to that application.

#### Remote Video Element

`remoteVideoElement` points to the **<video>** element that will display the remote stream.

#### Callback

`callback` receives messages and notifications from the server, including `play_started`, `play_finished`, `data channel messages`, etc.

#### Play and Stop

-  Start playing a stream:

   ```
   webRTCAdaptor.play(streamid)
   ```

- Stop playing a stream:

  ```
  webRTCAdaptor.stop(streamid)
  ```

## Congratulations!

You’ve successfully set up WebRTC playback using the Ant Media JavaScript SDK. From here, you can expand by handling multiple streams, adding custom UI controls, or combining playback with publishing to build interactive live applications.