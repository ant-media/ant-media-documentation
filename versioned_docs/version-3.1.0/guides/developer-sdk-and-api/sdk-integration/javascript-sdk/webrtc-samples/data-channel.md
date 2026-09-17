---
title: Data Channel
description: Send and receive data channel messages using the JavaScript SDK.
keywords: [JavaScript SDK, WebRTC Data Channel, Ant Media Server Documentation]
sidebar_position: 6
sidebar_label: Data Channel
---

Send and receive real-time data channel messages alongside a WebRTC publish stream. Useful for chat, metadata, or control messages.

Enable the data channel in [application settings](/guides/publish-live-stream/webrtc/data-channel/#enable-data-channel) before testing.

## Configure the WebSocket URL

Before you run any sample, set `websocket_url` to your Ant Media Server application:

| Protocol | Example | When to use |
|----------|---------|-------------|
| **WSS** | `wss://your-domain:5443/live/websocket` | Production — requires [SSL](/guides/installing-on-linux/setting-up-ssl/) (port **5443**) |
| **WS** | `ws://your-ip:5080/live/websocket` | Local HTTP without SSL (port **5080**) |

Replace `live` with your application name. All publish, play, and other samples use this connection.

## WebRTCAdaptor for data channel

One `WebRTCAdaptor` instance publishes one stream and handles data channel messages for that stream.

```js
var webRTCAdaptor = new WebRTCAdaptor({
  websocket_url: "wss://your-domain:5443/live/websocket",
  localVideoElement: document.getElementById("localVideo"),
  callback: (info, obj) => {
    if (info == "data_received") {
      // handle obj.data
    }
  },
});
```

<table className="sdk-api-table">
  <thead>
    <tr><th>Parameter</th><th>Description</th></tr>
  </thead>
  <tbody>
    <tr><td><code>websocket_url</code></td><td>Server WebSocket endpoint (see table above)</td></tr>
    <tr><td><code>localVideoElement</code></td><td><code>&lt;video&gt;</code> element for the published stream preview</td></tr>
    <tr><td><code>callback</code></td><td>Handle <code>data_received</code> for incoming messages; also <code>publish_started</code> / <code>publish_finished</code></td></tr>
  </tbody>
</table>

<table className="sdk-api-table">
  <thead>
    <tr><th>Method</th><th>Description</th></tr>
  </thead>
  <tbody>
    <tr><td><code>webRTCAdaptor.publish(streamId)</code></td><td>Starts publishing with data channel support</td></tr>
    <tr><td><code>webRTCAdaptor.sendData(streamId, data)</code></td><td>Sends a data channel message to connected players</td></tr>
    <tr><td><code>webRTCAdaptor.stop(streamId)</code></td><td>Stops publishing and closes the data channel</td></tr>
  </tbody>
</table>

## Live sample

1. Open the [Data Channel sample on CodePen](https://codepen.io/USAMAWIZARD/embed/YPzEXaj?default-tab=html&editable=true).
2. Set `websocket_url` to your server, click **Result**, publish a stream, and send test messages.

## Create your own page

1. Create `datachannel.html` in your project directory.
2. Copy the following into `datachannel.html` and set `websocket_url` to your server:

```html
<!DOCTYPE html>
<html lang="en">
<head>
</head>
<body>

<video id="localVideo" autoplay controls width=480px height=360px></video>
<br/>
<button id="publish_start">Start Publishing</button>
<button id="publish_stop">Stop Publishing</button><br>
<p id="status_info">Offline</p>
<textarea id="chat_area" style="width: 400px; height: 200px;"></textarea><br>
<br>
<input type="text" id="message"></input>
<button id="send_message">Send Message</button><br>
<br/>

</body>

<script type="module">
import { WebRTCAdaptor } from './node_modules/@antmedia/webrtc_adaptor/src/main/js/webrtc_adaptor.js';

var chat_area = document.getElementById("chat_area");

var webRTCAdaptor = new WebRTCAdaptor({
  websocket_url: "wss://your-domain:5443/live/websocket",
  localVideoElement: document.getElementById("localVideo"),
  callback: (info, obj) => {
     console.log("callback info: " + info);
     if (info == "publish_started") {
        statusInfo.innerHTML = "Broadcasting - Stream Id: " + streamId;
     }
     else if (info == "publish_finished") {
        statusInfo.innerHTML = "Offline"
     }
     else if (info == "data_received") {
      chat_area.append("\n" + obj.data);
     }
  },

});
var streamId = "stream" + parseInt(Math.random()*999999);
var statusInfo = document.getElementById("status_info");
document.getElementById("publish_start").addEventListener("click",()=> {
  webRTCAdaptor.publish(streamId)
})
document.getElementById("send_message").addEventListener("click",()=> {
  var message = document.getElementById("message");
  webRTCAdaptor.sendData(streamId,message.value);
  chat_area.append("\n" + message.value);
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

4. Open `http://localhost:8000/datachannel.html`, publish, and send messages.

## Verify data channel

- Play the same `streamId` from the Ant Media Server web panel or a player page.
- Open the player **Options** menu to send and receive messages.
