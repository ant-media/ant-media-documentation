---
title: Publish WebRTC Stream
description: Publish WebRTC Live Stream Using JavaScript SDK 
keywords: [JavaScript SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

Let’s start with a simple example to **publish a live stream** to Ant Media Server using the JavaScript SDK.

## WebRTC Publish Live Sample

1. Navigate to the **Publish sample** on [Codepen](https://codepen.io/USAMAWIZARD/embed/KwPEZKE?default-tab=js&editable=true) at Codepen.

2. Comment out the local import and uncomment the URL import. It should look like this:

  ```
  import  {WebRTCAdaptor} from  "https://esm.sh/@antmedia/webrtc_adaptor";
  //import { WebRTCAdaptor } from './node_modules/@antmedia/webrtc_adaptor/src/main/js/webrtc_adaptor.js';
  ```
 
3. Click the **Result** button to see the live demo page.


## Create a Publish Sample for Deployment

1. Create a new file called `publish.html`

2. Make sure your HTTP server is running in the same directory:

  ```
  python3 -m http.server
  ```

3. Copy the following HTML and JS into `publish.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
</head>
<body>

<video id="localVideo" autoplay controls width=480px height=360px></video>
<br/>
<button id="publish_start">Start Publishing</button>
<button id="publish_stop">Stop Publishing</button>
<br/>
<p id="status_info">Offline</p>

</body>

<script type="module">
import { WebRTCAdaptor } from './node_modules/@antmedia/webrtc_adaptor/src/main/js/webrtc_adaptor.js';

var webRTCAdaptor = new WebRTCAdaptor({
  websocket_url: "wss://test.antmedia.io:5443/live/websocket",
	localVideoElement: document.getElementById("localVideo"),
 
  callback: (info, obj) => {
     console.log("callback info: " + info);
     if (info == "publish_started") {
        console.log("publish started");
        statusInfo.innerHTML = "Broadcasting - Stream Id: " + streamId; 
     }
     else if (info == "publish_finished") {
        console.log("publish finished")
        statusInfo.innerHTML = "Offline"

     }
  },
  
});
var streamId = "stream" + parseInt(Math.random()*999999);
var statusInfo = document.getElementById("status_info");
document.getElementById("publish_start").addEventListener("click",()=> {
  webRTCAdaptor.publish(streamId)
})

document.getElementById("publish_stop").addEventListener("click",()=> {
  webRTCAdaptor.stop(streamId)
})
</script>
</html>
```
   
Open `http://localhost:8000/publish.html` in your browser.

Allow microphone and camera access.

Click **Start Publishing** to begin streaming.

## Verify Stream

To confirm your stream is live:

* Open the **Ant Media Server web panel** and check the broadcast.

* If there are issues, check the **developer console** in your browser for errors.


## Understanding `WebRTCAdaptor`

`WebRTCAdaptor` handles WebSocket communication and WebRTC connections with the server.

* One `WebRTCAdaptor` instance can publish one stream.

* To publish multiple streams, create multiple WebRTCAdaptor instances.

```
var webRTCAdaptor = new WebRTCAdaptor(prams....)
```

### Key Parameters

| Parameter           | Description                                                                                          |
|--------------------|------------------------------------------------------------------------------------------------------|
| websocket_url       | WebSocket URL of your Ant Media Server (`ws://` for HTTP, `wss://` for HTTPS). Example: `wss://test.antmedia.io:5443/live/websocket` `ws://test.antmedia.io:5080/live/websocket` |
| localVideoElement   | The `<video>` element that displays your local stream.                                               |
| callback            | Function called on server events like `publish_started`, `publish_finished`, or data channel messages. |


### Key Methods

| Method                       | Description                                                   |
|-------------------------------|---------------------------------------------------------------|
| `webRTCAdaptor.publish(streamId)` | Initiates a WebRTC connection with Ant Media Server and starts publishing the stream. |
| `webRTCAdaptor.stop(streamId)`    | Stops publishing the WebRTC stream.                          |


## Congratulations!

You have successfully set up a **JavaScript SDK publisher**, streamed your first WebRTC live broadcast, and verified it on Ant Media Server.

You can now experiment with **different stream IDs**, multiple streams, or integrate the SDK into your web applications for **interactive live streaming**.