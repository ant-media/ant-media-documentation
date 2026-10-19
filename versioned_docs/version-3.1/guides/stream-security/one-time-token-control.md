---
title: One-Time Token
description: Require a one-time token on publish and play requests in Ant Media Server.
keywords: [One-Time Token, stream token, Stream Security, Ant Media Server Documentation]
sidebar_position: 2
sidebar_label: One-Time Token
---

# One-Time Token

Enable one-time tokens for publish and/or play in the application settings. You can require a token for publish only, play only, or both.

![onetime-token](https://github.com/ant-media/ant-media-documentation/assets/86982446/2f118822-f997-4326-a5cc-f367e548bcd8)

Sending a token parameter with every publish request and play request is required if one-time token control is enabled. There will be an unauthorized access error if there is no token.

:::tip
A one-time token can be used only once per session. After it is used, it becomes invalid and you must generate a new token for the next publish or play.
:::

## Generate One Time Token

The token can be generated with [one-time token](https://antmedia.io/rest/#/default/getTokenV2) Rest API, gets ```streamId```, ```expireDate``` and ```type``` as query parameters. The service returns the tokenId and other parameters as a response. 

It is important that the ```streamId``` and ```type``` parameters are properly defined because ```tokenId``` needs to match with both ```streamId``` and ```type```.

 - The sample token creation service URL in the Publish Scenario:

```bash
curl -X 'GET' 'https://IP-address-or-domain:5443/live/rest/v2/broadcasts/streamId/token?expireDate=Expire_Date&type=publish' -H 'accept: application/json'
```

 - The sample token creation service URL in Play Scenario:

```bash
curl -X 'GET' 'https://IP-address-or-domain:5443/live/rest/v2/broadcasts/streamId/token?expireDate=Expire_Date&type=play' -H 'accept: application/json'
```

The expiration date should be provided as a Unix timestamp in seconds. You can convert dates to Unix timestamps using [epochconverter.com](https://www.epochconverter.com/).

## Use the token with streaming protocols

Pass the `tokenId` from the generate step as the `token` query parameter (or WebSocket field) on publish and play requests.

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

If connecting over WebSocket, include `token` in the publish message. See the [WebRTC publishing reference](/guides/publish-live-stream/webrtc/webrtc-websocket-messaging-reference/#publish-webrtc-stream).

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
- If **Adaptive Bitrate (ABR)** is enabled and the stream is published over **WebRTC**, the original `.m3u8` (for example `streamId.m3u8`) is not generated. Use an adaptive or resolution-specific playlist instead:

```
https://<server>:5443/live/streams/<streamId>_adaptive.m3u8?token=<token>
```

```
https://<server>:5443/live/streams/<streamId>_480p1000kbps.m3u8?token=<token>
```

- HLS playback can fail if the **session ID changes** while loading, which consumes the one-time token. For more reliable HLS access control, prefer [JWT Stream Token](/guides/stream-security/jwt-stream-security-filter/).
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

If connecting over WebSocket, include `token` in the play message. See the [WebRTC playing reference](/guides/publish-live-stream/webrtc/webrtc-websocket-messaging-reference/#play-webrtc-stream).

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

With one-time tokens in place, each publish or play session needs a fresh credential—simple protection for controlled access.
