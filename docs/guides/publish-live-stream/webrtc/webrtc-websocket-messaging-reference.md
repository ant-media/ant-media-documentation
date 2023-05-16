---
title: WebRTC WebSocket Messaging Reference
description: WebRTC WebSocket Messaging Reference
keywords: [WebRTC WebSocket Messaging Reference, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 6
---

This documentation is for developers who needs to implement signalling between Ant Media Server and clients for publishing & playing streams. Let's make it step by step

##  Publishing WebRTC Stream

To connect to Ant Media Server, clients use WebSocket with a URL in the format:
    
`ws://SERVER_NAME:5080/WebRTCAppEE/websocket`
    

To publish a stream, clients first calls the `publish` JSON function on the JavaScript SDK, which sends a `sendPublishCommand` to the server to start the stream.

The `sendPublishCommand` function can take the following parameters:
- `streamId`: This is a unique ID for the stream.

- `token`: The `token` field is required if any stream security (token control) is enabled.

If the user has enabled [stream-security](https://antmedia.io/docs/guides/advanced-usage/stream-security/), they need to fill in the `token` field with the correct token.

- `subscriberId` and `subscriberCode`: These are the values for the Time-based One-time Password (TOTP). If the user is using the TOTP mechanism, they need to pass the `subscriberId` and `subscriberCode`.

- `streamName`: Zombie streams are streams that aren't in the database. Therefore, users can give these "on the fly" streams a `streamName`.
- `mainTrack`: `mainTrack` is related to multitrack streaming and is required if the user wants to start the stream as a ``subtrack`` for this `mainTrack`. For multitrack conferences, `mainTrack` is set as the room ID.

- `metaData`: The `metaData` is free text information for the stream to server.

- `enableVideo` and `enableAudio`: These parameters define whether to enable video and audio for the stream.

If `enableVideo` is true, then video will be sent to the server. If `enableAudio` is true, then audio will be sent to the server.
If `enableVideo` is false and `enbleAudio` is true, then it means it's an audio-only stream.

When the server receives the `sendPublishCommand`, it checks whether the license is suspended, whether the server has enough resources, and retrieves the token if necessary.

Only ```sendPublishCommand``` and ```streamId``` are mandatory. Audio and video is enabled default.

1. If Server accepts the stream, it replies back with `start` command
```json
{
  command : "start",
  streamId : "stream1",
}
```  

2.  Client inits peer connections, creates offer sdp and send the sdp configuration to the server with `takeConfiguration` command
```json
{
  command : "takeConfiguration",
  streamId : "stream1",
  type : "offer",  
  sdp : "${SDP_PARAMETER}"
}
```    

3.  Server creates answer sdp and send the sdp configuration to the client with `takeConfiguration` command
```json
{
  command : "takeConfiguration",
  streamId : "stream1",
  type : "answer",  
  sdp : "${SDP_PARAMETER}"
}
```

4.  Client and Server get ice candidates several times and sends to each other with `takeCandidate` command
```json 
{
  command : "takeCandidate",
  streamId : "stream1",
  label : "${CANDIDATE.SDP_MLINE_INDEX}",
  id : "${CANDIDATE.SDP_MID}",
  candidate : "${CANDIDATE.CANDIDATE}"
}
```  

5. After a stream has started, the server sends a `publish_started` command
```json
{
  command : "notification",
  definition : "publish_started",
  streamId : "stream1",
}
 ```

6. Clients sends stop JSON command to stop publishing
```json
{
  command : "stop",
  streamId: "stream1",
}
```    

7. Server responds with publish_finished message to indicate that the stream has stopped.
```json
{
  command : "notification",
  definition : "publish_finished",
  streamId: "stream1",
}
```


## Playing WebRTC Stream

1.  Client connects to Ant Media Server through WebSocket.
    
        ws://SERVER_NAME:5080/WebRTCAppEE/websocket
    

2.  Client sends play JSON command to the server with stream name parameter. (Remove token parameter if token control is not enabled) Only ```command``` and ```streamId``` is mandatory, rest is situational, such as ```subscriber id```, ```code```, ```token``` and ```enabled tracks```. You can take a look at this [guide](https://antmedia.io/time-based-one-time-password-totp-makes-streams-secure/) to learn more about ```subscriberId``` and ```subscriberCode``` and how to use them. For general ```stream security``` information take a look at [here](/guides/developer-sdk-and-api/rest-api-guide/stream-security/). When there are multitracks on the webrtc stream user can speficy the tracks that needs to be played. If there are 2 tracks on the stream, user can specify the both and both track will be played. To get all tracks in a stream you can take a look in ```getTrackList``` command that is in the [miscellaneous](#miscellaneous-websocket-methods) part.
    
```json
{
  command : "play",
  streamId : "stream1",
  token : "tokenId",
  trackList: [enabledtracksarray],
  subscriberId: "subscriberId",
  subscriberCode: "subscriberCode"
}
```   

3.  If Server accepts the stream, it replies back with offer command

```json 
{
  command : "takeConfiguration",
  streamId : "stream1",
  type : "offer",  
  sdp : "${SDP_PARAMETER}"
}
```    

5.  Client creates answer sdp and send the sdp configuration to the server with takeConfiguration command

```json
{
  command : "takeConfiguration",
  streamId : "stream1",
  type : "answer",  
  sdp : "${SDP_PARAMETER}"
}
```    

6.  Client and Server get ice candidates several times and sends to each other with takeCandidate command

```json 
{
  command : "takeCandidate",
  streamId : "stream1",
  label : "${CANDIDATE.SDP_MLINE_INDEX}",
  id : "${CANDIDATE.SDP_MID}",
  candidate : "${CANDIDATE.CANDIDATE}"
}
```        
    

7.  Clients sends stop JSON command to stop playing

```json
{
  command : "stop",
  streamId: "stream1",
}
```    

8.  Client sends toggle video to stop/start incoming video packets from a video track ( streamId = trackId for single track use ) Enabled is ```true``` as default. ```trackId``` and ```streamId``` is mandatory.

```json 
{
  command : "toggleVideo",
  streamId: "stream1",
  trackId: "track1",
  enabled: boolean
}
```    

9.  Client sends toggle audio to stop/start incoming audio packets from an audio track ( streamId = trackId for single track use ) Enabled is ```true``` as default. ```trackId``` and ```streamId``` is mandatory.

```json 
{
  command : "toggleAudio",
  streamId: "stream1",
  trackId: "track1",
  enabled: boolean
}
```    

## Peer to Peer WebRTC Stream

1.  Peers connects to Ant Media Server through WebSocket.
    
`ws://SERVER_NAME:5080/WebRTCAppEE/websocket`
    

2.  Client sends join JSON command to the server with stream name parameter. If only want to play, mode can be set to play, if user wants to publish and play at the same time, both can be set. Only ```command``` and ```streamId``` is mandatory. Mode and multiPeer is only for embedded SDK and should not be used unless you are using embedded SDK. As default, ```mode``` is set to ```both``` and multiPeer is ```false```.

```json
{
  command : "join",
  streamId : "stream1",
  multiPeer: boolean,
  mode: "play or both"
}
```    

If there is only one peer in the stream1, server waits for the other peer to join the room.
    

3.  When second peer joins the stream, server sends start JSON command to the first peer
    
```json 
{
  command : "start",
  streamId : "stream1",
}
```    

4.  First peer create offer sdp and send to the server with takeConfiguration command,
    
```json 
{
  command : "takeConfiguration",
  streamId : "stream1",
  type : "offer",  
  sdp : "${SDP_PARAMETER}"
}
 ```   
    Server relays the offer sdp to the second peer
    

5.  Second peer creates answer sdp and sends to the server with takeConfiguration command
```json     
{
  command : "takeConfiguration",
  streamId : "stream1",
  type : "answer",  
  sdp : "${SDP_PARAMETER}"
}
 ```   
    Server relays the answer sdp to the first peer
    

6.  Each peers get ice candidates several times and sends to each other with takeCandidate command through server
```json 
{
  command : "takeCandidate",
  streamId : "stream1",
  label : "${CANDIDATE.SDP_MLINE_INDEX}",
  id : "${CANDIDATE.SDP_MID}",
  candidate : "${CANDIDATE.CANDIDATE}"
}
 ```       
    

7.  Clients sends leave JSON command to leave the room
```json     
{
  command : "leave",
  streamId: "stream1"
}
```    

## Conference WebRTC Stream

Peers connects to Ant Media Server through WebSocket.
    
`ws://SERVER_NAME:5080/WebRTCAppEE/websocket`
    

Client sends join JSON command to the server with room name parameter. 

```streamId``` field is optional in case ```streamId``` should be specified in advance. If ```streamId``` is not sent, server returns with a random ```streamId``` in the second message.

 ```json    
{
  command : "joinRoom",
  room : "room_id_for_your_conference",
  streamId: "stream_id_you_want_to_use"
}
```    

Server notifies the client with available streams in the room

 ```json    
{
  command : "notification",
  definition : "joinedTheRoom",
  streamId: "unique_stream_id_returned_by_the_server"
  streams: [
      "stream1_in_the_room",
      "stream2_in_the_room",
      ...
  ]
}
 ```   
```streamId``` returned by the server is the stream id client uses to publish stream to the room. ```streams``` is the json array which client can play via WebRTC. Client can play each stream by play method above. This streams array can be empty if there is no stream in the room.
    

Web app should pull the server periodically for the room info as follows,

```json 
{
  command : "getRoomInfo",
  room : "room_id_for_your_conference",
  streamId: "unique_stream_id_returned_by_the_server"
}
 ```   

Server returns the active streams in the room as follows. Application should synchronize the players in their side.

 ```json    
{
  command:"roomInformation",
  room: "room_id_for_your_conference",
  streams: [
    "stream1_in_the_room",
    "stream2_in_the_room",
    ...
  ]
}
```    

Any user can leave the room by sending below message

```json 
{
  command : "leaveFromRoom",
  room: "roomName"
}
```    

## WebSocket Error Callbacks

- ```noStreamNameSpecified```: it is sent when stream id is not specified in the message.

```json
{
  command : "error",
  definition : "noStreamNameSpecified",
}
```  
 
- ```not_allowed_unregistered_streams```: The `not_allowed_unregistered_streams` error message is returned to the user when they try to send a stream with an unregistered `streamId`, and server is configured not to accept undefined streams.
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

- ```no_peer_associated_before```: This is peer to peer connection error definition.It is sent back to the user when there is no peer associated with the stream.

```json
{
  command : "error",
  definition : "no_peer_associated_before",
}
```  

- ```notSetLocalDescription```: It is sent when local description is not set successfully
```json
{
  command : "error",
  definition : "notSetLocalDescription",
}
```   

- ```highResourceUsage```: It is sent when server is overloaded. Server overload means over CPU usage or over RAM usage. Over CPU usage means CPU load is more than the ```server.cpu_limit``` value in ```conf/red5.properties```. Its default value is %85. Over RAM usage means available memory in the system is less than ```server.min_free_ram``` value in conf/red5.properties. Its unit is MB and default value is 10.

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

Using a [TURN-server](/docs/guides/advanced-usage/turn-and-stun-installation/coturn-quick-installation/) helps mitigate these network-related issues.

```json
{
  command : "error",
  definition : "publishTimeoutError",
  streamId : "stream1",
}
```
   
- ```invalidStreamName```: it is send when stream name contains special characters.

```json
{
  command : "error",
  definition : "invalidStreamName",
}
```    

- ```data_store_not_available```: It's sent when data store is not available. It's not available if it's not initialized or closed.
```json     
{
  command : "error",
  definition : "data_store_not_available"
}
```

- ```license_suspended_please_renew_license```: It's send when license is suspended
```json    
{
  command : "error",
  definition : "license_suspended_please_renew_license"
}
```

- ```already_playing```: This is sent back to the user when a new play message received while it is playing or it is about to play.
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

- ```viewerLimitReached```: This is send when viewer limit reached. when user is trying to watch a broadcast that already hit the limit, this error is send to client.
```json
{
  command : "error",
  definition : "viewerLimitReached",
}
```    

## Miscellaneous WebSocket Methods

```ping``` & ```pong```
Some load balancers may start to close connections after a certain amount of time to prevent idle connections from consuming resources.

To prevent this from happening, the client sends `ping` messages to the server, and server returns with a `pong` response. This keeps the connection active and prevents it from being closed by the load balancer.
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
```getStreamInfo```: Get Stream Information from Server. You may use this method to learn more about stream status and bitrates. Client should send the following message.
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
    If stream is not active, it will return no\_stream\_exist
```json     
{
command : "error",
definition : "no_stream_exist",
streamId: "id_of_the_stream",
}
```    
```getRoomInfo```: Get Room Information from server that returns the whole active streams in the room. Client should send the following message to get the response from the server.
```json     
{
 command: "getRoomInfo",
 room: "room_id_that_you_want_to_get_info",
 streamId: "server_returns_while_you_join_the_room",
} 
 ```   
    Server responds in following format
 ```json    
{
  command: "roomInformation",
  room: "room_id_that_this_information_belongs_to",
  streams: [ stream_id_1, stream_id_2, ...]
}
```

```bitrateMeasurement```: Server periodically sends this information to the WebRTC viewers. It lets develop show a message to the user if it's internet bandwidth is not good enough. If the ```targetBitrate``` is bigger than the sum of ```videoBitrate``` and ```audioBitrate```, it means internet bandwidth is good enough to play the video. If the ```targetBitrate``` is less than the sum of ```videoBitrate``` and ```audioBitrate```, it means some playback issues(pixelating, packet drop, etc.) may happen and it disturbs the user experience.
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
    
```forceStreamQuality```: If there are adaptive-bitrates(multi-bitrate) for that stream, you can get bitrates with ```getStreamInfo``` method and then you can make the Ant Media Server force to send you a specific resolution. If you want to switch back to auto stream quality, you can use give ```0``` for ```streamHeight``` and send the message below.
```json    
{
command: "forceStreamQuality",
streamId: "write_the_stream_id",
streamHeight: "write_the_height_of_the_resolution_you_want_to_force",
}
```

```server_will_stop```: It's sent when server is in shutdown process.
```json    
{ 
command : "notification",
definition : "server_will_stop",
}
```

```leavedFromRoom```: It's sent after stop command received or if client sents leaveFromRoom command.
```json    
{        
command : "notification",
definition : "leavedFromRoom",
ATTR_ROOM_NAME: "roomName",
}
```

```getTrackList```: Sends a request to server to get track list in specified stream. Token is not mandatory. If stream has token, token needs to be used, otherwise not needed.
```json    
{ 
command : "getTrackList",
streamId: "stream1",
token: "token",
}
```

```trackList```: Server returns track list of the specified stream after receiving getTrackList command.
```json    
{ 
command : "trackList",
streamId: "stream1",
trackList: "tracks",
}
```

```enableTrack```: Publisher can enable or disable the tracks in the broadcast.
```json    
{
command : "enableTrack",
streamId: "stream1",
trackId: "id of track",
enabled: "boolean",
}
```