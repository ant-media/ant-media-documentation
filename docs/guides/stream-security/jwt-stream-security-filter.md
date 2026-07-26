---
title: JWT Stream Token
description: Protect publish and play with JWT tokens that support configurable expiration in Ant Media Server.
keywords: [JWT Stream Token, JWT filter, Stream Security, Ant Media Server Documentation]
sidebar_position: 3
sidebar_label: JWT Stream Token
---

# JWT Stream Token

Enable JWT stream security for publish and/or play from the application settings in the web panel. You can require a JWT for publish only, play only, or both.

![](@site/static/img/ant-media-server-jwt-stream-security-filter-dashboard.png)

Sending a token parameter with every publish request and play request is required if the JWT token is enabled. There will be an unauthorized access error if there is no token.

:::tip
A JWT can be used any number of times before its expire time. After it expires, generate a new token.
:::

## Generate JWT Token

JWT Token can be generated in two ways. One way to generate is using the [JWT debugger](https://jwt.io/#debugger-io) and other way is to generate the token using the [JWT token Rest API](https://antmedia.io/rest/#/default/getJwtTokenV2).

 - To generate the token in both ways, ```streamId```, ```expireDate```
   and ```type``` parameters are required. The service returns tokenId
and other parameters as a response.
   
   It is important that the ```streamId``` and ```type``` parameters are
   properly defined because ```tokenId``` needs to match with both
   ```streamId``` and ```type```.
   
 - To generate the JWT token, a `Secret key` is also necessary. Once you enable the JWT token for publish or play in application settings, you need to generate the secret key as shown in the above screenshot.

### Generate JWT Token with Debugger

Let's assume that our secret key is ```zautXStXM9iW3aD3FuyPH0TdK4GHPmHq``` so now we need to create a JWT token. Luckily, there are plenty of [libraries available for JWT](https://jwt.io/#libraries-io) for your development. For our case, we will just use [Debugger at JWT](https://jwt.io/#debugger-io).

As shown, we use HS256 as algorithm and use our secret key, ```zautXStXM9iW3aD3FuyPH0TdK4GHPmHq``` to generate the token. You need to pass the `streamId`, `expireDate` and `type` parameters as payload. On the server side, it checks that the token is signed with the secret key. 

![](@site/static/img/generate-jwt-stream-token-with-expiration.png)  

After passing all the required details, our token will be generated.

As shown above, the expiration time of the token is March 8, 2021, 02:14:08 GMT+3. It means that you can use the generated token until the expiration time. The unit of expiration time is [unix timestamp](https://www.unixtimestamp.com/). When it expires, the JWT token becomes invalid.

### Generate JWT Token with REST API

 - The sample JWT token creation API in the Publish Scenario:

```bash
curl -X 'GET' 'https://IP-address-or-domain:5443/live/rest/v2/broadcasts/streamId/jwt-token?expireDate=Expire_Date&type=publish' -H 'accept: application/json'
```

 - The sample JWT token creation service API in the Play Scenario:

```bash
curl -X 'GET' 'https://IP-address-or-domain:5443/live/rest/v2/broadcasts/streamId/jwt-token?expireDate=Expire_Date&type=play' -H 'accept: application/json'
```

Expire Date format is in Unix Timestamp. You can get the timestamp [here](https://www.epochconverter.com/).

## Use the token with streaming protocols

Pass the JWT as the `token` query parameter (or WebSocket field) on publish and play requests.

### Publish

#### RTMP

```
rtmp://IP-address-or-domain/live/StreamId?token=tokenId
```

#### SRT

```
srt://IP-address-or-domain:4200?streamid=live/your-streamId,token=tokenId
```

#### WebRTC

If using the [WebRTC sample page](/guides/publish-live-stream/webrtc/):

```
https://domain:5443/live?id=streamId&token=tokenId
```

If connecting over WebSocket, include `token` in the publish message. See the [WebRTC publishing reference](/guides/publish-live-stream/webrtc/webrtc-websocket-messaging-reference/#publishing-webrtc-stream).

```shell
# Secure WebSocket
wss://{ant-media-server}:5443/live/websocket

# Non-secure WebSocket
ws://{ant-media-server}:5080/live/websocket
```

```json
{
  "command": "publish",
  "streamId": "stream1",
  "streamName": "streamName",
  "token": "token"
}
```

### Play

#### VoD

If using the embedded (`play.html`) player:

```
https://IP-address-or-domain:5443/Application_Name/play.html?id=streams/stream_id.mp4&playOrder=vod&token=tokenId
```

If using the MP4 URL directly:

```
https://IP-address-or-domain:5443/Application_Name/streams/stream_id.mp4?token=tokenId
```

#### HLS

If using the embedded (`play.html`) player:

```
https://IP-address-or-domain:5443/Application_Name/play.html?id=stream_id&playOrder=hls&token=tokenId
```

If using the `.m3u8` URL directly:

```
https://IP-address-or-domain:5443/Application_Name/streams/stream_id.m3u8?token=tokenId
```

:::info
If **Adaptive Bitrate (ABR)** is enabled and the stream is published over **WebRTC**, the original `.m3u8` (for example `streamId.m3u8`) is not generated. Use an adaptive or resolution-specific playlist instead:

```
https://<server>:5443/live/streams/<streamId>_adaptive.m3u8?token=<token>
```

```
https://<server>:5443/live/streams/<streamId>_480p1000kbps.m3u8?token=<token>
```
:::

#### CMAF (DASH)

If using the embedded (`play.html`) player:

```
https://IP-address-or-domain:5443/Application_Name/play.html?id=stream_id&playOrder=dash&token=tokenId
```

If using the `.mpd` URL directly:

```
https://IP-address-or-domain:5443/Application_Name/streams/streamId/streamId.mpd?token=tokenId
```

#### WebRTC

If using the embedded (`play.html`) player:

```
https://IP-address-or-domain:5443/Application_Name/play.html?id=streamId&token=tokenId
```

If connecting over WebSocket, include `token` in the play message. See the [WebRTC playing reference](/guides/publish-live-stream/webrtc/webrtc-websocket-messaging-reference/#playing-webrtc-stream).

```shell
# Secure WebSocket
wss://{ant-media-server}:5443/live/websocket

# Non-secure WebSocket
ws://{ant-media-server}:5080/live/websocket
```

```json
{
  "command": "play",
  "streamId": "stream1",
  "streamName": "streamName",
  "token": "token"
}
```

JWT lets you set how long access lasts and reuse a token within that window—ideal when one-time tokens are too strict for your workflow.
