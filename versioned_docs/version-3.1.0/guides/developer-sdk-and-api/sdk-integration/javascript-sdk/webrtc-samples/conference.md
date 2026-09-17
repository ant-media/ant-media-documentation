---
title: Conference
description: Multi-party WebRTC conference using the JavaScript SDK.
keywords: [JavaScript SDK, WebRTC Conference, Ant Media Server Documentation]
sidebar_position: 3
sidebar_label: Conference
---

A WebRTC conference is a room where multiple participants publish their own streams and receive others in the same room. Each participant uses one `WebRTCAdaptor` instance.

## Configure the WebSocket URL

Before you run any sample, set `websocket_url` to your Ant Media Server application:

| Protocol | Example | When to use |
|----------|---------|-------------|
| **WSS** | `wss://your-domain:5443/live/websocket` | Production — requires [SSL](/guides/installing-on-linux/setting-up-ssl/) (port **5443**) |
| **WS** | `ws://your-ip:5080/live/websocket` | Local HTTP without SSL (port **5080**) |

Replace `live` with your application name. All publish, play, and other samples use this connection.

## WebRTCAdaptor for conference

Each participant uses one `WebRTCAdaptor` to publish their stream and play remote tracks in the room.

```js
var webRTCAdaptor = new WebRTCAdaptor({
  websocket_url: "wss://your-domain:5443/live/websocket",
  localVideoId: "localVideo",
  callback: (info, obj) => {
    if (info == "newTrackAvailable") {
      // attach remote participant tracks
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
    <tr><td><code>localVideoId</code></td><td>ID of the <code>&lt;video&gt;</code> element for the local camera preview</td></tr>
    <tr><td><code>callback</code></td><td>Handle <code>newTrackAvailable</code> to attach remote participant tracks</td></tr>
  </tbody>
</table>

<table className="sdk-api-table">
  <thead>
    <tr><th>Method</th><th>Description</th></tr>
  </thead>
  <tbody>
    <tr><td><code>webRTCAdaptor.publish(...)</code></td><td>Publishes the local stream into the room</td></tr>
    <tr><td><code>webRTCAdaptor.play(...)</code></td><td>Plays other participants in the room</td></tr>
    <tr><td><code>webRTCAdaptor.stop(streamId)</code></td><td>Leaves the room and stops publish/play</td></tr>
  </tbody>
</table>

Publish signature used by the sample:

```js
webRTCAdaptor.publish(publishStreamId, "", "", "", "", roomId, JSON.stringify(""), "");
webRTCAdaptor.play(roomId, "", roomId, [], "", "", null, "");
```

## Live sample

1. Open the [Conference sample on CodePen](https://codepen.io/USAMAWIZARD/embed/JoPzLgX?default-tab=js&editable=true).
2. Comment out the local import and uncomment the URL import:

  ```js
  import { WebRTCAdaptor } from "https://esm.sh/@antmedia/webrtc_adaptor";
  //import { WebRTCAdaptor } from './node_modules/@antmedia/webrtc_adaptor/src/main/js/webrtc_adaptor.js';
  ```

3. Set `websocket_url` to your server, click **Result**, enter a room ID, and join.
4. Open the same page in another tab with the same room ID to test multi-user conferencing.

## Create your own page

1. Create `conference.html` in your project directory.
2. Copy the following into `conference.html` and set `websocket_url` to your server:

```html
<!DOCTYPE html>
<html lang="en">
<head>
</head>
<body>

<video id="localVideo" autoplay muted controls playsinline></video>
<br/>
<input type=text placeholder="conference room id" id="roomid">
<button id="joinroom">join</button>
<br/>
<div id="players"></div>

</body>

<script type="module">
import { WebRTCAdaptor } from './node_modules/@antmedia/webrtc_adaptor/src/main/js/webrtc_adaptor.js';
var publishStreamId = "stream" + parseInt(Math.random()*999999);
var webRTCAdaptor = new WebRTCAdaptor({
  websocket_url: "wss://your-domain:5443/live/websocket",
  localVideoId: "localVideo",

  callback: (info, obj) => {
     console.log("callback info: " + info);
     if (info == "newTrackAvailable") {
        playVideo(obj);
     }
  },

});
var roomNameBox = document.getElementById("roomid");
var remotevideos = document.getElementById("players");

document.getElementById("joinroom").addEventListener("click",()=> {
  var roomid = document.getElementById("roomid").value;
  var status = document.getElementById("joinroom");

  if(status.innerHTML =="join"){
    status.innerHTML  = "leave";
    webRTCAdaptor.publish(publishStreamId, "", "", "", "",roomNameBox.value, JSON.stringify(""), "");
    webRTCAdaptor.play(roomNameBox.value, "", roomNameBox.value, [], "", "", null, "");
  }
  else{
    status.innerHTML  = "join";
    webRTCAdaptor.stop(roomid);
  }
})
function createRemoteVideo(trackLabel, kind) {
  var player = document.createElement("div");
  player.className = "col-sm-3";
  player.id = "player" + trackLabel;
  if (kind == "audio") {
    player.style.display = "none";
  }
  player.innerHTML = '<video id="remoteVideo' + trackLabel + '" controls autoplay playsinline></video>'
    +'<div id="overlay' + trackLabel + '" style="font-size: 10px;position: absolute; top: 5px; left: 50%; transform: translateX(-50%); color: white; background-color: rgba(0, 0, 0, 0.5); padding: 5px;">' + trackLabel + '</div>';
  document.getElementById("players").appendChild(player);
}

function playVideo(obj) {
  var roomId = roomNameBox.value;
  var incomingTrackId = obj.trackId.substring("ARDAMSx".length);
  if (incomingTrackId == roomId || incomingTrackId == publishStreamId) {
    return;
  }
  var video = document.getElementById("remoteVideo" + incomingTrackId);
  if (video == null) {
    createRemoteVideo(incomingTrackId, obj.track.kind);
    video = document.getElementById("remoteVideo" + incomingTrackId);
    video.srcObject = new MediaStream();
  }
  video.srcObject.addTrack(obj.track)
  remotevideos.appendChild(video);
}
</script>
</html>
```

3. Start a local HTTP server in the same directory:

  ```bash
  python3 -m http.server
  ```

4. Open `http://localhost:8000/conference.html`, enter a room ID, and join from two browser tabs.
