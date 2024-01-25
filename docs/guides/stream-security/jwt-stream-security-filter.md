---
title: JWT Stream Security Filter
description: This guide explains stream security options in Ant Media Server, and how you can Enable Disable, or Accept Undefined Streams.
keywords: [Enable or Disable Undefined Streams, Accept Undefined Streams, One Time Token Control, Stream security, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---

You can enable JWT Stream Security Filter for publishing and playing from the application's settings via the AMS web panel. You have the option to use both the publish and playback tokens simultaneously or just one at a time.

![](@site/static/img/ant-media-server-jwt-stream-security-filter-dashboard.png)

Sending a token parameter with every publish request and play request is required if the JWT token is enabled. There will be an unauthorized access error if there is no token.

### Generate JWT Token

JWT Token can be generated in two ways. One way to generate is using the [JWT debugger](https://jwt.io/#debugger-io) and other way is to generate the token using the [JWT token Rest API](https://antmedia.io/rest/#/BroadcastRestService/getJwtTokenV2).

 - To generate the token in both ways, ```streamId```, ```expireDate```
   and ```type``` parameters are required. The service returns tokenId
and other parameters as a response.
   
   It is important that the ```streamId``` and ```type``` parameters are
   properly defined because ```tokenId``` needs to match with both
   ```streamId``` and ```type```.
   
 - To generate the JWT token, a `Secret key` is also necessary. Once you enable the JWT token for publish or play in application settings, you need to generate the secret key as shown in the above screenshot.

#### Generate JWT Token with Debugger

Let's assume that our secret key is ```zautXStXM9iW3aD3FuyPH0TdK4GHPmHq``` so now we need to create a JWT token. Luckily, there are plenty of [libraries available for JWT](https://jwt.io/#libraries-io) for your development. For our case, we will just use [Debugger at JWT](https://jwt.io/#debugger-io).

As shown, we use HS256 as algorithm and use our secret key, ```zautXStXM9iW3aD3FuyPH0TdK4GHPmHq``` to generate the token. You need to pass the `streamId`, `expireDate` and `type` parameters as payload. On the server side, it checks that the token is signed with the secret key. 

![](@site/static/img/generate-jwt-stream-token-with-expiration.png)  

After passing all the required details, our token will be generated.

As shown above, the expiration time of the token is March 8, 2021, 02:14:08 GMT+3. It means that you can use the generated token until the expiration time. The unit of expiration time is [unix timestamp](https://www.unixtimestamp.com/). When it expires, the JWT token becomes invalid.

#### Generate JWT Token with REST API

 - The sample JWT token creation API in the Publish Scenario:

```bash
curl -X 'GET' 'https://IP-address-or-domain:5443/Application_Name/rest/v2/broadcasts/streamId/jwt-token?expireDate=Expire_Date&type=publish' -H 'accept: application/json'
```

 - The sample JWT token creation service API in the Play Scenario:

```bash
curl -X 'GET' 'https://IP-address-or-domain:5443/Application_Name/rest/v2/broadcasts/streamId/jwt-token?expireDate=Expire_Date&type=play' -H 'accept: application/json'
```

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

### VoD, HLS, CMAF (DASH) and WebRTC Playback URL usage

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
