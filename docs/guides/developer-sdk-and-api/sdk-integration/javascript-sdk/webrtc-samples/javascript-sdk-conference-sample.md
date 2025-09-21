---
title: WebRTC Conference
description: WebRTC Conference Using JavaScript SDK 
keywords: [JavaScript SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---

A WebRTC Conference is essentially a room where multiple participants can join, publish their streams, and simultaneously receive the streams of other users in the same room.

In simple terms, the publish and play functions are combined to enable multi-user conferencing. Each participant publishes their own video and audio stream while playing the streams of others.

This guide demonstrates how to set up a conference using the Ant Media JavaScript SDK.

## WebRTC Conference Live Sample

1. Navigate to the [Conference Sample](https://codepen.io/USAMAWIZARD/embed/JoPzLgX?default-tab=js&editable=true) at Codepen.

2. Comment out the local import and uncomment the URL import. It should look like this:

  ```js
  import  {WebRTCAdaptor} from  "https://esm.sh/@antmedia/webrtc_adaptor";
  //import { WebRTCAdaptor } from './node_modules/@antmedia/webrtc_adaptor/src/main/js/webrtc_adaptor.js';
  ```

3. Click the Result button to open the demo webpage.

4. Enter a room ID and join the room.

5. Open the same page in another browser tab, join with the same room ID, and observe the video conferencing in action.

## Create Conference Sample for Deployment

1. Create a new file named `conference.htm`l.

2. Start a local HTTP server in the same directory:

  ```
  python3 -m http.server
  ```

3. Copy the provided HTML and JavaScript code into `conference.html`.

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
  websocket_url: "wss://test.antmedia.io:5443/live/websocket",
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

		//In multitrack conferencing the stream is same, tracks are being and remove from the stream
		var roomId = roomNameBox.value;
		console.log("new track available with id: "
				+ obj.trackId + " and kind: " + obj.track.kind + " on the room:" + roomId);

		//trackId is ARDAMSv+STREAM_ID or  ARDAMSa+STREAM_ID
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
		obj.track.onended = event => {
			console.log("track is ended with id: " + event.target.id)

		}
		obj.stream.onremovetrack = event => {
			console.log("track is removed with id: " + event.track.id)
			console.log(event);
			var removedTrackId = event.track.id.substring("ARDAMSx".length);
		}
	}
</script>
</html>
```

4. Open the page in your browser at: `http://localhost:8000/conference.html` (make sure python server is up and running)

5. Accept microphone and camera permissions.

6. Enter a room ID and click Join.

7. Open the same page in another tab as a second user to verify bidirectional streaming.

## WebRTCAdaptor

The `WebRTCAdaptor` class manages WebSocket signaling and WebRTC connections with Ant Media Server.

Each participant uses one `WebRTCAdaptor` instance to publish their own stream and play others’ streams in the same room.

Example initialization:

```js
var webRTCAdaptor = new WebRTCAdaptor(prams....)
```

### WebRTCAdaptor Parameters

#### WebSocket URL

- `WebSocket URL` This is the signaling server URL of your Ant Media Server.

  ```
  websocket_url
  ```

- Web socket URL format.

```bash
protocol://IP_ADDRESS:PORT/APPLICATION_NAME/websocket
```

Example: `wss://test.antmedia.io:5443/live/websocket`

- Use `ws://` for HTTP or `wss://` for HTTPS.

- For HTTP servers, use port `5080` instead of `5443`.

- Ensure you use the correct application name in the URL to match your Ant Media configuration.

#### `localVideoId`

Specifies the ID of the **<video>** element where the local video stream will be displayed.

#### `Callback`

The callback receives messages and notifications from the server, such as:

- `publish_started`

- `play_started`

- `publish_timeout`

- `data channel messages`

- `newTrackAvailable`: triggered when new remote streams are available in the room.

Developers can use this callback to dynamically create video elements for each participant.

#### WebRTCAdaptor Methods

Publish a stream to a room:

```js
webRTCAdaptor.publish(our_publish_id, "", "", "", "", roomid, JSON.stringify(""), "");
```

Play all streams from a room:

```js
webRTCAdaptor.play(roomid, "", roomid, [], "", "", null, "");
```

Stop publishing/playing a stream:

```js
webRTCAdaptor.stop(streamid)
```

## Congratulations!

With just a few lines of code, you can build a real-time video conferencing application using the Ant Media JavaScript SDK.

By combining the publish and play functions inside a conference room, participants can broadcast their own streams while instantly receiving others’ streams.

This flexible setup allows you to scale from simple two-person calls to multi-participant video conferences, all with ultra-low latency powered by WebRTC.