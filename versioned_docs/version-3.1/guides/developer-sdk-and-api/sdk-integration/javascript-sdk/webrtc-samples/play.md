---
title: Play
description: Play a live WebRTC stream using the JavaScript SDK.
keywords: [JavaScript SDK, Play WebRTC, Ant Media Server Documentation]
sidebar_position: 2
sidebar_label: Play
---

Play a live stream from Ant Media Server using the JavaScript SDK and `WebRTCAdaptor`.

## Configure the WebSocket URL

Before you run any sample, set `websocket_url` to your Ant Media Server application:

| Protocol | Example | When to use |
|----------|---------|-------------|
| **WSS** | `wss://your-domain:5443/live/websocket` | Production — requires [SSL](/guides/installing-on-linux/setting-up-ssl/) (port **5443**) |
| **WS** | `ws://your-ip:5080/live/websocket` | Local HTTP without SSL (port **5080**) |

Replace `live` with your application name. All publish, play, and other samples use this connection.

## WebRTCAdaptor for play

One `WebRTCAdaptor` instance plays one stream. Create multiple instances for multiple streams.

```js
var webRTCAdaptor = new WebRTCAdaptor({
  websocket_url: "wss://your-domain:5443/live/websocket",
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
    <tr><td><code>remoteVideoElement</code></td><td><code>&lt;video&gt;</code> element that displays the remote stream</td></tr>
    <tr><td><code>callback</code></td><td>Called on events such as <code>play_started</code> and <code>play_finished</code></td></tr>
  </tbody>
</table>

<table className="sdk-api-table">
  <thead>
    <tr><th>Method</th><th>Description</th></tr>
  </thead>
  <tbody>
    <tr><td><code>webRTCAdaptor.play(streamId)</code></td><td>Starts playback</td></tr>
    <tr><td><code>webRTCAdaptor.stop(streamId)</code></td><td>Stops playback</td></tr>
  </tbody>
</table>

## Live sample

1. Open the [Play sample on CodePen](https://codepen.io/USAMAWIZARD/embed/myboqYB?default-tab=js&editable=true).
2. Comment out the local import and uncomment the URL import:

  ```js
  import { WebRTCAdaptor } from "https://esm.sh/@antmedia/webrtc_adaptor";
  //import { WebRTCAdaptor } from './node_modules/@antmedia/webrtc_adaptor/src/main/js/webrtc_adaptor.js';
  ```

3. Set `websocket_url` and `streamId` to match your server, then click **Result** and **Start Playing**.

## Create your own page

1. Create `play.html` in your project directory.
2. Copy the following into `play.html`. Set `websocket_url` to your server and `streamId` to an active broadcast:

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

var streamId = "test"
var webRTCAdaptor = new WebRTCAdaptor({
  websocket_url: "wss://your-domain:5443/live/websocket",
  remoteVideoElement: document.getElementById("remoteVideo"),

  callback: (info, obj) => {
     console.log("callback info: " + info);
     if (info == "play_started") {
        console.log("play started");
     }
     else if (info == "play_finished") {
        console.log("play finished")
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

3. Start a local HTTP server in the same directory:

  ```bash
  python3 -m http.server
  ```

4. Open `http://localhost:8000/play.html` and click **Start Playing**.

## Verify playback

- Confirm a publisher is live with the same `streamId`.
- If playback fails, check the browser developer console for errors.
