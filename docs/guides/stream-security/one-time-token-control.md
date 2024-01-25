---
title: One Time Token Control
description: This guide explains stream security options in Ant Media Server, and how you can Enable Disable, or Accept Undefined Streams.
keywords: [Enable or Disable Undefined Streams, Accept Undefined Streams, One Time Token Control, Stream security, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

You can enable One Time Token for publishing and playing from the application's settings. You have the option to use both the publish and playback tokens simultaneously or just one at a time.

![onetime-token](https://github.com/ant-media/ant-media-documentation/assets/86982446/2f118822-f997-4326-a5cc-f367e548bcd8)

Sending a token parameter with every publish request and play request is required if one-time token control is enabled. There will be an unauthorized access error if there is no token.

### Create a Token for Publish & Play Scenario

The token can be generated with [one-time token](https://antmedia.io/rest/#/BroadcastRestService/getTokenV2) Rest API, gets ```streamId```, ```expireDate``` and ```type``` as query parameters. The service returns tokenId and other parameters as a response. 

It is important that the ```streamId``` and ```type``` parameters are properly defined because ```tokenId``` needs to match with both ```streamId``` and ```type```.

 - The sample token creation service URL in the Publish Scenario:

       http://IP-address-or-domain:5080/Application_Name/rest/v2/broadcasts/stream_Id/token?expireDate=Expire_Date&type=publish

 - The sample token creation service URL in Play Scenario:

       http://IP-address-or-domain:5080/Application_Name/rest/v2/broadcasts/stream_Id/token?expireDate=Expire_Date&type=play


Expire Date format is in Unix Timestamp. You can get the timestamp [here](https://www.epochconverter.com/).

### RTMP, SRT and WebRTC Publish URL usage

**RTMP:**
`rtmp://IP-address-or-domain/Application_Name/StreamId?token=tokenId`

**SRT:** 
`srt://IP-address-or-domain:4200?streamid=Application_Name/your-streamId,token=tokenId`

**WebRTC:**
`https://domain:5443/Application_Name?id=streamId&token=tokenId`

Above is the URL if you are using the [webrtc sample page](https://antmedia.io/docs/guides/publish-live-stream/webrtc/) for publishing.

If you are using the WebSocket URL to connect with the server, then token parameter should be inserted to WebSocket message. Also please have a look at the principles described in the [WebRTC publishing page](https://antmedia.io/docs/guides/publish-live-stream/webrtc/webrtc-websocket-messaging-reference/#publishing-webrtc-stream).

```shell
# Secure WebSocket: 
wss://{ant-media-server}:5443/WebRTCAppEE/websocket

# Non Secure WebSocket: 
ws://{ant-media-server}:5080/WebRTCAppEE/websocket
```

```json
{
  command : "publish",
  streamId : "stream1",
  streamName : "streamName",
  token : "token",
}
```


For example, here are the OBS settings for the One Time Token.

![](@site/static/img/ant-media-server-one-time-token.png)

### VoD, HLS, CMAF (DASH) and WebRTC URL usage

**VOD:**

If using the embedded (play.html) player URL:
```
http(s)://IP-address-or-domain:port/Application_Name/play.html?id=streams/stream_id.mp4&playOrder=vod&token=tokenId
```
If you directly want to use mp4 URL then it will be as follows:
```
http(s)://IP-address-or-domain:port/Application_Name/streams/stream_id.mp4?token=tokenId
```
**HLS:**

If using the embedded (play.html) player URL:
```
http(s)://IP-address-or-domain:port/Application_Name/play.html?id=stream_id&playOrder=hls&token=tokenId
```

If you directly want to use m3u8 URL then it will be as follows:

```
http(s)://IP-address-or-domain:port/Application_Name/streams/stream_id.m3u8?token=tokenId
```

**CMAF (DASH):**

If using the embedded (play.html) player URL:
```
http(s)://IP-address-or-domain:port/Application_Name/play.html?id=stream_id&playOrder=dash&token=tokenId
```

If you directly want to use mpd URL then it will be as follows:

```
http(s)://IP-address-or-domain:port/Application_Name/streams/streamId/streamId.mpd?token=tokenId
```

**WebRTC:**

If using the embedded (play.html) player URL:

`http(s)://IP-address-or-domain:port/Application_Name/play.html?id=streamId&token=tokenId`

If you are using the WebSocket URL to connect with the server, then token parameter should be inserted to WebSocket message. Also please have a look at the principles described in the [WebRTC playing page](https://antmedia.io/docs/guides/publish-live-stream/webrtc/webrtc-websocket-messaging-reference/#playing-webrtc-stream).

```shell
# Secure WebSocket: 
wss://{ant-media-server}:5443/WebRTCAppEE/websocket

# Non Secure WebSocket: 
ws://{ant-media-server}:5080/WebRTCAppEE/websocket
```

```json
{
  command : "play",
  streamId : "stream1",
  streamName : "streamName",
  token : "token",
}
```
