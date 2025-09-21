---
title: Data Channel Messages
description: Send & Receive Data Channel Messages Using JavaScript SDK 
keywords: [JavaScript SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 6
---

The Ant Media JavaScript SDK allows you to not only publish and play WebRTC streams but also send and receive Data Channel messages in real time.

This feature is useful for building chat systems, collaborative applications, or sending metadata alongside live video streams.

## WebRTC DataChannel Live Sample

1. Navigate to the [DataChannel sample](https://codepen.io/USAMAWIZARD/embed/YPzEXaj?default-tab=html&editable=true) at Codepen.

2. Click the Result button to view the demo webpage.

3. Use the UI to publish your stream and test message sending.


## Create DataChannel Sample for Deployment

1. Create a new file named datachannel.html.

2. Start a local HTTP server in the same directory:

```bash
python3 -m http.server
```

3. Copy the provided HTML/JavaScript code into `datachannel.html`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
</head>
<body>

<video id="localVideo" autoplay controls width=480px sheight=360px></video>
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
  websocket_url: "wss://ovh36.antmedia.io:5443/WebRTCAppEE/websocket",
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
    else if (info == "data_received") {
      var data = obj.data;
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
```
   
4. Open the page in your browser: `http://localhost:8000/datachannel.html` (make sure python server is up and running)

5. Accept microphone and camera permissions.

6. Click Start Publishing.

7. Send messages using the input field and Send Message button. Messages will appear in the chat area and be broadcast to all connected players.

8. Open the Ant Media Server web panel or the sample player page: `http://ANT_MEDIA_SERVER_IP:5080/WebRTCAppEE/player.html` 

* Enter the same stream ID.

* Start playing the stream.

* Open the Options menu to send and receive messages.

## WebRTCAdaptor

The `WebRTCAdaptor` class is responsible for managing **WebSocket signaling**, **WebRTC connections**, and **Data Channel communication** with Ant Media Server.

Each instance can publish one stream. You can create multiple adaptors for multiple simultaneous streams.

Example initialization:

```
var webRTCAdaptor = new WebRTCAdaptor(prams....)
```

The `WebRTCAdaptor` takes various parameters; all parameters are listed here. 

### WebRTCAdaptor Parameters

#### `WebSocket URL`

- The WebSocket URL connects to your Ant Media Server’s signaling service. 

  ```
  websocket_url
  ```

- Format:

```bash
protocol://IP_ADDRESS:PORT/APPLICATION_NAME/websocket
```
- Example:  `wss://test.antmedia.io:5443/live/websocket`

- Use ws:// for HTTP or wss:// for HTTPS.

- If running on HTTP, use port 5080 instead of 5443.

- Ensure you use the correct application name to match your Ant Media deployment.

#### `localVideoElement`

Points to the <video> element containing the local stream that will be published.

#### `Callback`

Handles notifications and messages from the server, including:

* `publish_started`

* `publish_finished`

* `play_started`

* `data_received`

Example handling data messages:

```js
callback: (info, obj) => {
  if (info == "data_received") {
    var data = obj.data;
    chat_area.append("\n" + obj.data);
  }
}
```

### WebRTCAdaptor Methods

* Publish a stream

```js
webRTCAdaptor.publish(streamid)
```

* Send Data Channel messages

```js
webRTCAdaptor.sendData(streamid, data)
```

* Stop publishing

```js
webRTCAdaptor.stop(streamid)
```

## Congratulations!

Using the Data Channel feature of the Ant Media JavaScript SDK, you can send and receive messages in real time alongside your live WebRTC streams.

This makes it possible to enrich live experiences with interactive features like chat, polls, reactions, or synchronized data feeds. Whether you’re building a live classroom, a gaming app, or a social streaming platform, Data Channels open the door to true interactivity with ultra-low latency. 