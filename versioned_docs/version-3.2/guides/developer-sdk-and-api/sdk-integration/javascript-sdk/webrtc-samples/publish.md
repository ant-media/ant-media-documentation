---
title: Publish
description: Publish a live WebRTC stream using the JavaScript SDK.
keywords: [JavaScript SDK, Publish WebRTC, Ant Media Server Documentation]
sidebar_position: 1
sidebar_label: Publish
---

Publish a live stream to Ant Media Server using the JavaScript SDK and `WebRTCAdaptor`.

## Configure the WebSocket URL

Before you run any sample, set `websocket_url` to your Ant Media Server application:

| Protocol | Example | When to use |
|----------|---------|-------------|
| **WSS** | `wss://your-domain:5443/live/websocket` | Production — requires [SSL](/guides/installing-on-linux/setting-up-ssl/) (port **5443**) |
| **WS** | `ws://your-ip:5080/live/websocket` | Local HTTP without SSL (port **5080**) |

Replace `live` with your application name. All publish, play, and other samples use this connection.

## WebRTCAdaptor for publish

One `WebRTCAdaptor` instance publishes one stream. Create multiple instances to publish multiple streams.

```js
var webRTCAdaptor = new WebRTCAdaptor({
  websocket_url: "wss://your-domain:5443/live/websocket",
  localVideoElement: document.getElementById("localVideo"),
  callback: (info, obj) => { /* handle events */ },
});
```

<table className="sdk-api-table">
  <thead>
    <tr><th>Parameter</th><th>Description</th></tr>
  </thead>
  <tbody>
    <tr><td><code>websocket_url</code></td><td>Server WebSocket endpoint (see table above)</td></tr>
    <tr><td><code>localVideoElement</code></td><td><code>&lt;video&gt;</code> element for the local camera preview</td></tr>
    <tr><td><code>callback</code></td><td>Called on events such as <code>publish_started</code> and <code>publish_finished</code></td></tr>
  </tbody>
</table>

<table className="sdk-api-table">
  <thead>
    <tr><th>Method</th><th>Description</th></tr>
  </thead>
  <tbody>
    <tr><td><code>webRTCAdaptor.publish(streamId)</code></td><td>Starts publishing</td></tr>
    <tr><td><code>webRTCAdaptor.stop(streamId)</code></td><td>Stops publishing</td></tr>
  </tbody>
</table>

## Live sample

1. Open the [Publish sample on CodePen](https://codepen.io/USAMAWIZARD/embed/KwPEZKE?default-tab=js&editable=true).
2. Comment out the local import and uncomment the URL import:

  ```js
  import { WebRTCAdaptor } from "https://esm.sh/@antmedia/webrtc_adaptor";
  //import { WebRTCAdaptor } from './node_modules/@antmedia/webrtc_adaptor/src/main/js/webrtc_adaptor.js';
  ```

3. Set `websocket_url` to your server, then click **Result** to open the demo page.

## Create your own page

1. Create `publish.html` in your project directory.
2. Copy the following into `publish.html` and set `websocket_url` to your server:

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
  websocket_url: "wss://your-domain:5443/live/websocket",
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

3. Start a local HTTP server in the same directory:

  ```bash
  python3 -m http.server
  ```

4. Open `http://localhost:8000/publish.html`, allow camera and microphone access, and click **Start Publishing**.

## Verify the stream

- Open the Ant Media Server web panel and confirm the broadcast appears.
- If publishing fails, check the browser developer console for errors.
