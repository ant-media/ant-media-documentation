---
title: WebRTC Conference
description: WebRTC Conference Using JavaScript SDK 
keywords: [JavaScript SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---

Let's see a very simple example of WebRTC Conference with the JS SDK.

In simple terms, a conference is a room where a user can join and publish his streams, and he will receive the streams of other users who join the same room. So to put it simply, we will use the publish and play function as we did in previous examples to implement a conference.

- Create a new file , name it `conference.html`

- Make sure HTTP server is running in same directory

  ```
  python3 -m http.server
  ```

<iframe height="550" style={{ width: '100%' }}  scrolling="no" title="Conference" src="https://codepen.io/USAMAWIZARD/embed/JoPzLgX?default-tab=js&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/USAMAWIZARD/pen/JoPzLgX">
  Conference</a> by USAMA (<a href="https://codepen.io/USAMAWIZARD">@USAMAWIZARD</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## WebRTCAdaptor

`WebRTCAdapter` Class is responsible for handling WebSocket Messages and WebRTC Connections with the server. The `WebRTCAdaptor` takes various parameters; all parameters are listed here.

```
var webRTCAdaptor = new WebRTCAdaptor(prams....)
```

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

#### localVideoId

```
localVideoId
```

This is the ID of the Video Element where the local video stream will be displayed.

#### Callback

```
callback
```

Messages & notifications sent from the server will be received in this callback. This includes notifications like `publish_started`, `play_started`, `publish_timeout` , `data channel messages`, etc.

`if (info == "newTrackAvailable")` 

We will get `newTrackAvailable` callback here where all the remote video streams will be received. We can play these remote streams by creating a video element and appending it to the DOM.

#### WebRTC Adaptor

- `WebRTCAdaptor` publish function initiates a WebRTC connection with Ant Media Server and starts to publish the stream.
When publishing for a conference room, your own stream ID and the room to which the stream needs to be published must be specified. 

  ```
  webRTCAdaptor.publish(our_publish_id, "", "", "", "",roomid, JSON.stringify(""), "");
  ```

- `WebRTCAdapter` play function initiate  WebRTC Connection with Ant Media Server and starts to play the stream. Specify the correct stream ID and make sure the stream is currently publishing, which you are trying to play. 

  When playing the streams from a room, the room ID should be specified.

  ```
  webRTCAdaptor.play(roomid, "", roomid, [], "", "", null, "");
  ```

- Stops publishing & playing WebRTC streams.

  ```
  webRTCAdaptor.stop(streamid)
  ```


### Running Code

Copy the above code from the HTML and JS sections in the `conference.html` file as below:

```
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

Open the conference.html page in the browser `http://localhost:8000/conference.html`  (make sure python server is up and running)

 - Accept microphone and camera usage permissions.

 - Click the join button.

Join the room in a new tab as a second user and verify if you can receive remote video and remote participants can see your video.

### Running Code in Live Example

- Navigate to the code section above on this page.

- Comment import from directory and uncomment import from URL. It should look something like this.

  ```
  import {WebRTCAdaptor} from "https://cdn.skypack.dev/@antmedia/webrtc_adaptor@SNAPSHOT";
  //import { WebRTCAdaptor } from './node_modules/@antmedia/webrtc_adaptor/src/main/js/webrtc_adaptor.js';
  ```

- Click on Result button It will show small webpage where you can see the output.

- Enter a room ID and join the room.

- Open this page in another tab and join with the same room ID.
