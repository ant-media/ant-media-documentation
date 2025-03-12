---
title: WebRTC WebSocket Messaging Reference
description: WebRTC WebSocket Messaging Reference
keywords: [WebRTC WebSocket Messaging Reference, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 6
---

This documentation is for developers who need to implement signaling between Ant Media Server and clients for publishing & playing streams. Let's make it step by step

##  Publishing WebRTC Stream

1. To connect to the Ant Media Server, the client can use WebSocket with a URL in the format:    
```
wss://SERVER_NAME:5443/WebRTCAppEE/websocket
```
`wss` indicates that it's a secure WebSocket connection using SSL/TLS.
`/WebRTCAppEE/websocket` specifies the endpoint for the WebSocket connection in Ant Media Server. 

2. To publish a stream, clients first send the `publish` command to the server to start the stream.
```json
{
  command : "publish",
  streamId : "stream1",
  streamName : "streamName",
  token : "token",
  mainTrack : "mainTrack",
  metaData : "metaData",
  subscriberCode : "subscriberCode",
  subscriberId : "subscriberId",
  video : "true",
  audio : "true",
}
```

- ```token```: The ```token``` field is required if any stream security (token control) is enabled.
If the user has enabled [stream-security](https://antmedia.io/docs/guides/advanced-usage/stream-security/), they need to fill in the ```token``` field with the correct token.

- ```subscriberId``` and ```subscriberCode```: These are the values for the Time-based One-time Password (TOTP). If the user is using the TOTP mechanism, they need to pass the ```subscriberId``` and ```subscriberCode```.

- ```streamName```: Zombie streams are streams that aren't in the database. Therefore, users can give these "on the fly" streams a ```streamName```.

- ```mainTrack```: ```mainTrack``` is related to multitrack streaming and is required if the user wants to start the stream as a ```subtrack``` for this ```mainTrack```. For multitrack conferences, ```mainTrack``` is set as the room ID.

- ```metaData```: The ```metaData``` is free text information for the stream to server.

- ```enableVideo``` and ```enableAudio```: These parameters define whether to enable video and audio for the stream.
If ```enableVideo``` is true, then the video will be sent to the server. If ```enableAudio``` is true, then audio will be sent to the server.
If ```enableVideo``` is false and ```enbleAudio``` is true, then it means it's an audio-only stream.

- Only ```command``` and ```streamId``` are mandatory. Audio and video are enabled by default. When the server receives the ```publish``` commands, it checks whether the license is suspended and whether the server has enough resources, and retrieves the token if necessary.

3. If the Server accepts the stream, it replies with the `start` command
```json
{
  command : "start",
  streamId : "stream1",
  subscriberId : "",
}
```  

4.  The client initiates peer connections, creates offer SDP, and sends the SDP configuration to the server with `takeConfiguration` command
```json
{
  command : "takeConfiguration",
  streamId : "stream1",
  type : "offer",  
  sdp : "${SDP_PARAMETER}"
}
```    

5.  The server creates answers SDP and sends the SDP configuration to the client with `takeConfiguration` command
```json
{
  command : "takeConfiguration",
  streamId : "stream1",
  type : "answer",  
  sdp : "${SDP_PARAMETER}"
}
```

6.  Client and Server get ice candidates several times and send them to each other with `takeCandidate` command
```json 
{
  command : "takeCandidate",
  streamId : "stream1",
  label : "${CANDIDATE.SDP_MLINE_INDEX}",
  id : "${CANDIDATE.SDP_MID}",
  candidate : "${CANDIDATE.CANDIDATE}"
}
```  

7. After a stream has started, the server sends a `publish_started` command
```json
{
  command : "notification",
  definition : "publish_started",
  streamId : "stream1",
}
```

8. Clients send stop JSON command to stop publishing
```json
{
  command : "stop",
  streamId: "stream1",
}
```

9. The server responds with a publish_finished message to indicate that the stream has stopped
```json
{
  command : "notification",
  definition : "publish_finished",
  streamId : "stream1",
  subscriberId : "subscriberId",
}
```

## Playing WebRTC Stream

1. To connect to the Ant Media Server, the client can use WebSocket with a URL in the format:
```
wss://SERVER_NAME:5443/WebRTCAppEE/websocket
```

2. Client sends play ```command``` to the server with ```streamId``` parameter.
```json
{
  command : "play",
  streamId : "stream1",
  token : "token",
  subscriberCode : "subscriberCode",
  subscriberId : "subscriberId",
  trackList : [enabledtracksarray],
  viewerInfo : "viwerInfo",
}
```

- Only ```command``` and ```streamId``` is mandatory, rest are situational, such as ```subscriber id```, ```code```, ```token``` and ```enabled tracks```.
- If a stream has sub-tracks, ```trackList``` is enabled by default. If there are 2 tracks on the stream, the user can specify both and both tracks will be played. To get all tracks in a stream you can take a look in ```getTrackList``` command that is in the [miscellaneous](#miscellaneous-websocket-methods) part.
- ```viewerInfo``` is a kind of ```metaData``` used to collect informations.

3. If the Server accepts the stream, it replies with the offer command
```json 
{
  command : "takeConfiguration",
  streamId : "stream1",
  type : "offer",  
  sdp : "${SDP_PARAMETER}"
}
```    

4. The client creates an answer SDP and sends the SDP configuration to the server with `takeConfiguration` command
```json
{
  command : "takeConfiguration",
  streamId : "stream1",
  type : "answer",  
  sdp : "${SDP_PARAMETER}"
}
```    

5. Client and Server get ice candidates several times and send them to each other with `takeCandidate` command
```json 
{
  command : "takeCandidate",
  streamId : "stream1",
  label : "${CANDIDATE.SDP_MLINE_INDEX}",
  id : "${CANDIDATE.SDP_MID}",
  candidate : "${CANDIDATE.CANDIDATE}"
}
```

6. Server notifies with `play_started` once the stream starts to play
```json
{
  command : "notification",
  definition : "play_started",
  streamId : "stream1",
  subscriberId : "subscriberId",
}
```

7. Client sends toggle video to stop/start incoming video packets from a video track ( streamId = trackId for single track use ) Enabled is ```true``` as default. ```trackId``` and ```streamId``` is mandatory.
```json 
{
  command : "toggleVideo",
  streamId: "stream1",
  trackId: "track1",
  enabled: boolean
}
```  

8. Client sends toggle audio to stop/start incoming audio packets from an audio track ( streamId = trackId for single track use ) Enabled is ```true``` as default. ```trackId``` and ```streamId``` is mandatory.
```json 
{
  command : "toggleAudio",
  streamId: "stream1",
  trackId: "track1",
  enabled: boolean
}
```
- If there are multiple sub-tracks, the user can enable/disable any track using ```toggle``` so that the server does not send audio/video packets for that track.

9. Clients sends `stop` JSON command to stop playing
```json
{
  command : "stop",
  streamId: "stream1",
}
```

10. Server notifies with `play_finished` to notify that play has stopped
```json
{
  command : "notification",
  definition : "play_finished",
  streamId : "stream1",
  subscriberId : "subscriberId",
}
```

## Conference WebRTC Stream
Think of Conference room as this way , we will publish our video streams and we will play the videos of the remote participants, so essentially we will be using same publish and play functions , we normally use for publishing and plying streams.

1. Participants connect to the Ant Media Server through WebSocket.
```
wss://SERVER_NAME:5443/WebRTCAppEE/websocket
```

2. The client publishes his stream with the `publish` command as we discussed in the publishing section above and these will be the same. mainTrack is the room name that client is publishing his stream to.

```json
{
  command : "publish",
  streamId : "streamId",
  streamName : "streamName",
  mainTrack : "room1",
  metaData : "metaData",
  subscriberCode : "subscriberCode",
  subscriberId : "subscriberId",
  video : "true",
  audio : "true",
}
```

3. The client sends the `play` command to the server with `streamId` as the `roomId`

```json
{
  command : "play",
  room : "room1",
  streamId : "room1",
  token : "token",
  subscriberCode : "subscriberCode",
  subscriberId : "subscriberId",
  trackList : [enabledtracksarray],
  viewerInfo : "viwerInfo",
}
```
- We only play the `roomId` as this `mainTrack` has all the `subTracks` in the room and therefore it is not required to play each `streamId` separately.

- all the remote video tracks will be received in "newTrackAvailable" callback in WebRTCAdapter callback.Once the tracks are received they can then be played by application logic.

4. When a client wants to leave the room they send the `stop` command to the server for both publish and play.

stop publish our stream
```json
{
  command : "stop",
  streamId : "stream1",
}
```

stop playing from room.
```json
{
  command : "stop",
  streamId : "room1",
}
```

9. The server responds with a `play_finished` or `publish_finished` message.

```json
{
  command : "notification",
  definition : "publish_finished",
}
```

```json
{
  command : "notification",
  definition : "play_finished",
}
```

- The JavaScript SDK/SDKs handle the background processing of multitrack streaming for conferences on their own. If you are implementing your code using WebSocket references, you will likely need to listen for `onTrackEvents` within the `initPeerConnections` function.
When a new track, stream, or subTrack is dynamically added to the room during runtime, the `onTrack(event, streamId)` function is triggered. This function notifies the application that a new track is available, allowing the application to handle and play the newly added track as needed.

- When a new `streamId` is added to or removed from the room, the server and client initiate a renegotiation process. During this process, the server sends a new Session Description Protocol (SDP) to the client, suggesting a change in the configuration. This change prompts the addition or removal of a new track to or from the room in real time.

## Peer-to-Peer WebRTC Stream

1. Peers connect to the Ant Media Server through WebSocket.
```
wss://SERVER_NAME:5443/WebRTCAppEE/websocket
```
    
2. The client sends a join JSON command to the server with the `streamId` parameter. If only want to `play`, `mode` can be set to `play`, if the user wants to publish and play at the same time, `both` can be set. As default, `mode` is set to `both`. Only `command` and `streamId` are mandatory.

```json
{
  command : "join",
  streamId : "stream1",
  mode: "play or both"
}
```

3. Server notifies with `joined`.

```json
{
  command : "notification",
  definition : "joined"
  streamId : "stream1",
}
```

4. If there is only one peer in stream1, the server waits for the other peer to join the room.    

5. When the second peer joins the stream, the server sends the `start` JSON command to the first peer.

```json 
{
  command : "start",
  streamId : "stream1",
}
```

6. First peer creates an offer SDP and sends it to the server with the `takeConfiguration` command.

```json 
{
  command : "takeConfiguration",
  streamId : "stream1",
  type : "offer",  
  sdp : "${SDP_PARAMETER}"
}
```   
- Server relays the offer SDP to the second peer

7. The second peer creates the answer SDP and sends it to the server with the `takeConfiguration` command.

```json     
{
  command : "takeConfiguration",
  streamId : "stream1",
  type : "answer",  
  sdp : "${SDP_PARAMETER}"
}
```
- Server relays the answer SDP to the first peer

8. Each peer gets ice candidates several times and sends them to each other with the `takeCandidate` command through the server.

```json 
{
  command : "takeCandidate",
  streamId : "stream1",
  label : "${CANDIDATE.SDP_MLINE_INDEX}",
  id : "${CANDIDATE.SDP_MID}",
  candidate : "${CANDIDATE.CANDIDATE}"
}
```

9. Clients send leave JSON command to leave the room.

```json     
{
  command : "leave",
  streamId: "stream1"
}
```

10. Server notifies with `leaved`

```json
{
  command : "notification",
  definition : "leaved",
}
```

11. When the second peer stops the stream or the stream is ended, the server sends a `stop` JSON command to the first peer.

```json
{
  command : "stop",
  streamId : "stream1",
}
```

## WebSocket Error Callbacks

- ```noStreamNameSpecified```: it is sent when the stream id is not specified in the message.

```json
{
  command : "error",
  definition : "noStreamNameSpecified",
}
```  
 
- ```not_allowed_unregistered_streams```: The `not_allowed_unregistered_streams` error message is returned to the user when they try to send a stream with an unregistered `streamId`, and the server is configured not to accept undefined streams.
For conference, if it is not set then the room is created automatically and is removed once it finishes.
```json
{
  command : "error",
  definition : "not_allowed_unregistered_streams",
  streamId : "stream1",
}
```   

- ```no_room_specified```: This is sent back to the user when there is no room specified in joining the video conference.

```json
{
  command : "error",
  definition : "no_room_specified",
}
```

- ```unauthorized_access```: When stream security is enabled but the token is either incorrect or not validated, or the subscriberId and/or subscriberCode are incorrect.

```json
{
  command : "error",
  definition : "unauthorized_access",
  streamId: "stream1",
}
```   

- ```no_encoder_settings```: This is sent back to the user when there are no encoder settings available in publishing the stream.

```json
{
  command : "error",
  definition : "no_encoder_settings",
}
```   

- ```no_peer_associated_before```: This is peer to peer connection error definition. It is sent back to the user when there is no peer associated with the stream.

```json
{
  command : "error",
  definition : "no_peer_associated_before",
}
```
- ```notSetRemoteDescription```: This is sent if there is a mismatch between the encoder and the decoders between the Ant Media Server and the client.
```json
{
  command : "error",
  definition : "notSetRemoteDescriptio",
}
```

- ```notSetLocalDescription```: It is sent when the local description is not set successfully.
```json
{
  command : "error",
  definition : "notSetLocalDescription",
}
```   

- ```highResourceUsage```: It is sent when the server is overloaded. Server overload means over CPU usage or RAM usage. Over CPU usage means CPU load is more than the ```server.cpu_limit``` value in ```conf/red5.properties```. Its default value is %75. Over RAM usage means available memory in the system is less than ```server.min_free_ram``` value in conf/red5.properties. Its unit is MB and the default value is 10.

```json
{
  command : "error",
  definition : "highResourceUsage",
}
```   

- ```streamIdInUse```: This error message is returned by the server when a user tries to publish a stream with a `streamId` that is already in use by an active stream in either the preparing or publishing state.
This error can occur if a user attempts to re-publish a stream with the same `streamId` without first closing the previous WebRTC connection.
```json     
{
  command : "error",
  definition : "streamIdInUse",
  streamId : "stream1",
}
```   

- ```publishTimeoutError```: The server sends the `publishTimeoutError` message when WebRTC publishing fails to start within a specified time period.

This may occur due to network issues, such as the lack of an established ICE connection or the failure to send video and audio streams to the server. The timeout value can be customized using the `settings.webrtc.client.start.timeoutMs` property in the [App-Configuration](https://antmedia.io/docs/guides/advanced-usage/turn-and-stun-installation/coturn-quick-installation/), with a default value of 5000 milliseconds.

Using a [TURN-server](https://antmedia.io/docs/guides/advanced-usage/turn-instalation/coturn-quick-installation/) helps mitigate these network-related issues.

```json
{
  command : "error",
  definition : "publishTimeoutError",
  streamId : "stream1",
}
```
   
- ```invalidStreamName```: it is sent when the stream name contains special characters.

```json
{
  command : "error",
  definition : "invalidStreamName",
}
```    

- ```data_store_not_available```: It's sent when the data store is not available. It's not available if it's not initialized or closed.
```json     
{
  command : "error",
  definition : "data_store_not_available"
}
```

- ```license_suspended_please_renew_license```: It's sent when the license is suspended.
```json    
{
  command : "error",
  definition : "license_suspended_please_renew_license"
}
```

- ```already_playing```: This is sent back to the user when a new play message is received while it is playing or it is about to play.
```json     
{
  command : "error",
  definition : "already_playing",
  streamId: "stream1"
}
```  

- ```already_publishing```: This message is sent when a new publish message is received while the server is either publishing or about to publish. The message indicates that publishing is already in progress.
```json
{
  command : "error",
  definition : "already_publishing",
  streamId: "stream1",
}
```

- ```encoderNotOpened```: If the encoder fails to open, the server sends this error message to the client indicating that the encoder could not be opened.
```json
{
  command : "error",
  definition : "encoderNotOpened",
  streamId : "stream1", 
}
```

- ```encoderBlocked```: The server sends this error message if the encoder is blocked for some reason or not performing efficiently.
```json
{
  command : "error",
  definition : "encoderBlocked",
  streamId : "stream1",
}
```

- ```no_codec_enabled_in_the_server```: This is sent back to the user when there is no codec enabled in the server and someone try to make a publish
```json
{
  command : "error",
  definition : "no_codec_enabled_in_the_server",
  streamId: "stream1"
}
```

* ```stream_not_active_or_expired```: The message `stream_not_active_or_expired` is returned to the user when the `plannedStartDate` and `plannedEndDate` of a stream are either not in the specified interval or have expired.
```json
{
  command : "error",
  definition : "stream_not_active_or_expired",
  streamId : "stream1",
}
```

- ```viewerLimitReached```: This is sent when the viewer limit is reached. When a user is trying to watch a broadcast that already hit the limit, this error is sent to the client.
```json
{
  command : "error",
  definition : "viewerLimitReached",
}
```

- ```no_room_specified```: if roomId is not specified for a conference, the server returns with a `no_room_speficified` error message.
```json
{
  command : "error",
  definition : "no_room_specified",
}
```

## Miscellaneous WebSocket Methods

- ```ping``` & ```pong```
Some load balancers may start to close connections after a certain amount of time to prevent idle connections from consuming resources.

To prevent this from happening, the client sends `ping` messages to the server, and the server returns with a `pong` response. This keeps the connection active and prevents it from being closed by the load balancer.
```json    
{
command : "ping",
}
```    
    Pong Response from Server
```json    
{
command : "pong",
}
```

- ```getStreamInfo```: Get Stream Information from Server. You may use this method to learn more about stream status and bitrates. The client should send the following message.
```json     
{
 command: "getStreamInfo",
 streamId: "stream_id_that_you_want_to_get_info",
} 
```    
    Server returns in two ways. It may return stream information as follows
```json     
{
 command: "streamInformation",
 streamId: "stream_id_of_the_stream_information",
 streamInfo: [{
     streamWidth: "resolution_width",
     streamHeight: "resolution_height",
     videoBitrate: "video_bitrate",
     audioBitrate: "audio_bitrate",
     videoCodec: "codec_of_the_video", 
     },
   ...
   ]
}
```    
    If the stream is not active, it will return no_stream_exist
```json     
{
command : "error",
definition : "no_stream_exist",
streamId: "id_of_the_stream",
}
```

- ```getRoomInfo```: The function ```getRoomInfo``` is called when a new participant or track is added to the room to retrieve information about the current state of the room, including the active streams. The client should send the following message to get the response from the server.
```json     
{
 command: "getRoomInfo",
 room: "room_id_that_you_want_to_get_info",
 streamId: "server_returns_while_you_join_the_room",
} 
 ```   
    The server responds in the following format with the list of streams available in the room
 ```json    
{
  command: "roomInformation",
  room: "room_id_that_this_information_belongs_to",
  streams: [ stream_id_1, stream_id_2, ...]
}
```

- ```bitrateMeasurement```: Server periodically sends this information to the WebRTC viewers. It lets develop show a message to the user if it's internet bandwidth is not good enough. If the ```targetBitrate``` is bigger than the sum of ```videoBitrate``` and ```audioBitrate```, it means the internet bandwidth is good enough to play the video. If the ```targetBitrate``` is less than the sum of ```videoBitrate``` and ```audioBitrate```, it means some playback issues(pixelating, packet drop, etc.) may happen and disturb the user experience.
```json     
{
  command : "notification",
  definition : "bitrateMeasurement",
  streamId: "unique_stream_id_returned_by_the_server"
  targetBitrate: "measured_bandwidth_of_the_client",
  videoBitrate: "video_bitrate_of_the_current_playing_video",
  audioBitrate: "audio_bitrate_of_the_current_playing_audio",
}
```
    
- ```forceStreamQuality```: If there are adaptive-bitrates(multi-bitrate) for that stream, you can get bitrates with the ```getStreamInfo``` method and then you can make the Ant Media Server force to send you a specific resolution. If you want to switch back to auto stream quality, you can give ```0``` for ```streamHeight``` and send the message below.
```json    
{
command: "forceStreamQuality",
streamId: "write_the_stream_id",
streamHeight: "write_the_height_of_the_resolution_you_want_to_force",
}
```

- ```server_will_stop```: When the server is about to stop and it receives a command from a service or the command line to initiate the shutdown process, it notifies the user with ```server_will_stop```
```json    
{ 
command : "notification",
definition : "server_will_stop",
}
```

- ```leavedFromRoom```: It's sent after the stop command is received or if the client sends the `leaveFromRoom` command.
```json    
{        
command : "notification",
definition : "leavedFromRoom",
ATTR_ROOM_NAME: "roomName",
}
```

- ```getTrackList```: Sends a request to the server to get a tracklist in a specified stream. The token is not mandatory. If the stream has a token, the token needs to be used, otherwise not needed.
```json    
{ 
command : "getTrackList",
streamId: "stream1",
token: "token",
}
```

- ```trackList```: The server returns the tracklist of the specified stream after receiving the `getTrackList` command.
```json    
{ 
command : "trackList",
streamId: "stream1",
trackList: "tracks",
}
```

- ```enableTrack```: Player can enable or disable the tracks in the broadcast.
```json    
{
command : "enableTrack",
streamId: "stream1",
trackId: "id of track",
enabled: "boolean",
}
```

- ```streaming_Session_Restored```: when a WebRTC publish stream is interrupted due to network issues but is restored within the timeout duration, the server sends this message to indicate that the streaming session has been restored.
The viewer's connection remains active and is not dropped during the timeout duration. The timeout duration, `webRTCClientStartTimeout`is configurable and has a default value of 10 seconds.
```json
{
  command : "notification",
  description: "streaming_session_Restored",
}
```
