---
title: Data Channel Messages
description: Send & Receive Data Channel Messages Using JavaScript SDK 
keywords: [JavaScript SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 6
---

Let's write a simple example for sending and receiving data channel messages with a live stream to Ant Media using the JavaScript SDK.

## WebRTC DataChannel Live Sample

- Navigate to the DataChannel sample [here](https://codepen.io/USAMAWIZARD/embed/YPzEXaj?default-tab=html&editable=true) at Codepen.

- Click on the Result button; it will show a small webpage where you can see the output.


## Create DataChannel Sample For Deployment

- Create a new file , name it `datachannel.html`

- make sure HTTP server is running in same directory

  ```
  python3 -m http.server
  ```

- Copy the above code from the HTML and JS sections in the `datachannel.html` file as below:

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
   
 Open the datachannel.html page in the browser `http://localhost:8000/datachannel.html`  (make sure python server is up and running)

 - Accept microphone and camera usage permissions.

 - Click the publish button.

To verify whether the stream is published successfully or not, open the web panel of your Ant Media Server and view the stream there. If it does not work, open the developer console on the HTML page and check for any errors.

 - You are now publishing your video streams to the server, Data Channel messages can be send with the send messages button , it will be received to all the player client for this stream.

 - Navigate to http://ANT_MEDIA_SERVER_IP:5080/WebRTCAppEE/player.html 

 - play with the same stream id

 - once the stream is playing, then click on options.You will see options to send and receive messages here.

 - sending messages from publishing side should display the messages here.

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

    For example, `wss://test.antmedia.io:5443/live/websocket`

- If HTTP,  `protocol = ws` or if HTTPS `protocol = wss`

If Ant Media is running on HTTP, the websocket url should connect to the port `5080` instead of `5443`.

Multiple applications can be created in Ant Media to which streams can be published; use the correct application name `WebSocket URL` to publish to that application.

#### localVideoElement

```
localVideoElement
```

This should point to the video element, which contains the video that will be streamed to the server.

#### Callback

```
callback
```

Messages & notifications sent from the server will be received in this callback. This includes notifications like `publish_started`, `play_started`, `publish_timeout` , `data_received`, etc.

```html
  callback: (info, obj) => {
    if (info == "data_received") {
      var data = obj.data;
      chat_area.append("\n" + obj.data);
      }
  }
```

#### WebRTC Adaptor

- The `WebRTCAdaptor` publish function initiates a WebRTC connection with Ant Media Server and starts to publish the stream.

  ```
  webRTCAdaptor.publish(streamid)
  ```

- Sends Data Channel Messages

  ```
  webRTCAdaptor.sendData(streamid,data)
  ```

- Stops publishing WebRTC streams.

  ```
  webRTCAdaptor.stop(streamid)
  ```
