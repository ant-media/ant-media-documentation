---
title: Hash-Based Token
description: This guide explains stream security options in Ant Media Server, and how you can Enable Disable, or Accept Undefined Streams.
keywords: [Enable or Disable Undefined Streams, Accept Undefined Streams, One Time Token Control, Stream security, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 5
---

You can enable Hash-based token for publishing and playing from the application's advance settings via the AMS web panel. You have the option to use both the publish and playback tokens simultaneously or just one at a time.

Now, all application settings can be changed from the AMS web panel itself. Please check [here](https://antmedia.io/docs/guides/configuration-and-testing/ams-application-configuration/#management-panel-settings) for more information.

```
  "tokenHashSecret": "",
  "hashControlPublishEnabled": false,
  "hashControlPlayEnabled": false,
```

By default, it is disabled but by setting it to true, it can be enabled. 

:::warning
Do not forget to define a secret key for generating a hash value.
:::

### Evaluation of the Hash

If related settings are enabled, Ant Media Server first generates hash values based on the formula sha256(STREAM\_ID + ROLE + SECRET) using streamId, role parameters and secret string which is defined in the settings.

Then compare this generated hash value with the client's hash value during authentication.

Once the hash is successfully validated by Ant Media Server, the client is granted either to publish or play according to application setting and user request.

But if the hash is not valid then below error will be generated.

![](@site/static/img/stream-security/hash-invalid.png)  


## Generate Hash-based Token

 In order to generate the Hash token, go to [JavaScript SHA-256](https://geraintluff.github.io/sha256/).
  
You need to generate a hash value using the formula ```sha256(STREAM_ID+ROLE+SECRET)``` for your application and send to your clients. The values used for hash generation are:

```
STREAM_ID: The streamId of stream, generated in Ant Media Server.
ROLE: It is either "play or "publish"
SECRET: This is tokenHashSecret (defined in the application settings above)
```

### The sample Hash token creation in the Publish Scenario:

Let's say ```STREAM_ID: stream1```, ```ROLE: publish```, ```SECRET: testtest``` Your hash is the result of this calculation: ```sha256(stream1publishtesttest)```


![](@site/static/img/stream-security/hash-publish.png)  

### The sample Hash token creation in the Play Scenario:

Let's say ```STREAM_ID: stream1```, ```ROLE: play```, ```SECRET: testtest``` Your hash is the result of this calculation: ```sha256(stream1publishtesttest)```


![](@site/static/img/stream-security/hash-play.png)  


## Hash-based token Usage with streaming protocols

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
http(s)://ant-media-server:port/Application_Name/streams/streamId/streamId.mpd?token=tokenId
```

**WebRTC:**

If using the embedded (play.html) player URL:

`https://domain:5443/Application_Name/play.html?id=streamId&token=tokenId`

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
