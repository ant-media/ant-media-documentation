---
title: TOTP
description: Enable TOTP, generate tokens, and use them on publish and play URLs in Ant Media Server.
keywords: [TOTP, Time-based One-time Password, subscriberId, Stream Security, Ant Media Server Documentation]
sidebar_position: 1
sidebar_label: TOTP
---

# TOTP

TOTP (Time-based One-time Password) issues short-lived codes tied to the current time. In AMS, a publisher or player is a **subscriber** with a `subscriberId` and `subscriberCode`. When TOTP is enabled, those values must be sent with publish or play; otherwise the request is rejected.

Enable TOTP for publish and/or play in the application settings.

![](@site/static/img/stream-security/totp-enable.png)

To create a token, a secret key is required, which you can generate by clicking the `Generate` option in the dashboard, as shown in the above screenshot.

:::info
By default, the secret key is 6 bytes long when you click Generate, but in order to pre-register the subscriber, the secret key should be 8 bytes long, as shown in the screenshot above.
:::

## Subscriber operations

After enabling TOTP on the server, register a subscriber if required.

You can generate the TOTP token without first registering the subscriber, but if `Accept Undefined Streams` is not allowed, only pre-registered subscribers with a pre-registered stream ID can publish and play.

Create a subscriber with the [Add Subscriber](https://antmedia.io/rest/#/default/addSubscriber) REST API. Assign a Base32 secret to each subscriber at creation time. The secret key should be a multiple of 8 characters, as noted above.

- Register a subscriber for publishing:

```bash
curl -X POST -H "Accept: Application/json" -H "Content-Type: application/json" 'http://Ip-address-or-domain:5080/live/rest/v2/broadcasts/streamId/subscribers' -d '{"subscriberId":"publisherA", "b32Secret":"SecretKey", "type":"publish"}'
```

- Register a subscriber for playing:

```bash
curl -X POST -H "Accept: Application/json" -H "Content-Type: application/json" 'http://Ip-address-or-domain:5080/live/rest/v2/broadcasts/streamId/subscribers' -d '{"subscriberId":"playerA", "b32Secret":"SecretKey", "type":"play"}'
```

### Other subscriber APIs

- Get the subscriber list with [listSubscriberV2](https://antmedia.io/rest/#/default/listSubscriberV2):

```bash
curl -X 'GET' 'http://IP-address-or-domain:5080/live/rest/v2/broadcasts/streamId/subscriber-stats/list/0/10' -H 'accept: application/json'
```

- Delete subscribers with [revokeSubscribers](https://antmedia.io/rest/#/default/revokeSubscribers):

```bash
curl -X 'DELETE' 'https://IP-address-or-domain:5443/Application_Name/rest/v2/broadcasts/streamId/subscribers' -H 'accept: application/json'
```

- Get subscriber statistics with [listSubscriberStatsV2](https://antmedia.io/rest/#/default/listSubscriberStatsV2):

```bash
curl -X 'GET' 'https://test.antmedia.io:5443/Sandbox/rest/v2/broadcasts/test/subscribers/list/0/10' -H 'accept: application/json'
```

## TOTP token creation

Create a TOTP with the [getTOTP](https://antmedia.io/rest/#/default/getTOTP) REST API.

By default, a generated TOTP remains valid for 60 seconds. The client must publish or play within that window.

Change the period with `timeTokenPeriod` in application settings:

```
"timeTokenPeriod": 60
```

Application settings can be changed from the AMS web panel. See [Management Panel Application settings](/guides/configuration-and-testing/ams-application-configuration/#management-panel-application-settings).

You can also generate a TOTP without pre-registering the subscriber, as noted under Subscriber operations.

### Publish scenario

```bash
curl -X 'GET' 'http://IP-address-or-domain:5080/live/rest/v2/broadcasts/streamId/subscribers/SubscriberId/totp?type=publish' -H 'accept: application/json'
```

![](@site/static/img/stream-security/subscriber_block_publish_totp_postman.png)

### Play scenario

```bash
curl -X 'GET' 'http://IP-address-or-domain:5080/live/rest/v2/broadcasts/streamId/subscribers/SubscriberId/totp?type=play' -H 'accept: application/json'
```

![](@site/static/img/stream-security/subscriber_block_play_totp_postman.png)

The response includes a 6-byte `subscriberCode`. Use it with `subscriberId` when publishing or playing.

### Use with the JavaScript SDK

```
webRTCAdaptor.publish(streamId, tokenId, subscriberId, subscriberCode);
webRTCAdaptor.play(streamId, tokenId, subscriberId, subscriberCode);
```

**Example:**

```
webRTCAdaptor.publish("teststream", null, "lastpeony", "451222");
webRTCAdaptor.play("teststream", null, "lastpeony", "451222");
```

The second parameter (`null` here) is a stream token such as JWT, not the `subscriberCode`.

To block a subscriber from publishing or playing after they connect, see [Subscriber Block](/guides/stream-security/totp/subscriber-block/).

## Use TOTP with streaming protocols

Pass `subscriberId` and `subscriberCode` on publish and play requests (query parameters or WebSocket fields).

### Publish

#### RTMP

```
rtmp://IP-address-or-domain/live/StreamId?subscriberId=your-subscriber&subscriberCode=totp-token
```

#### SRT

```
srt://IP-address-or-domain:4200?streamid=live/your-streamId,subscriberId=your-subscriber,subscriberCode=totp-token
```

#### WebRTC

If using the [WebRTC sample page](/guides/publish-live-stream/webrtc/):

```
https://domain:5443/live?id=streamId&subscriberId=your-subscriber&subscriberCode=totp-token
```

If connecting over WebSocket, include `subscriberId` and `subscriberCode` in the publish message. See the [WebRTC publishing reference](/guides/publish-live-stream/webrtc/webrtc-websocket-messaging-reference/#publishing-webrtc-stream).

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
  "subscriberCode": "subscriberCode",
  "subscriberId": "subscriberId"
}
```

### Play

#### VoD

If using the embedded (`play.html`) player:

```
https://IP-address-or-domain:5443/Application_Name/play.html?id=streams/stream_Id.mp4&playOrder=vod&subscriberId=your-subscriber&subscriberCode=totp-token
```

If using the MP4 URL directly:

```
https://IP-address-or-domain:5443/Application_Name/streams/stream_Id.mp4?subscriberId=your-subscriber&subscriberCode=totp-token
```

#### HLS

If using the embedded (`play.html`) player:

```
https://IP-address-or-domain:5443/Application_Name/play.html?id=stream_Id&playOrder=hls&subscriberId=your-subscriber&subscriberCode=totp-token
```

If using the `.m3u8` URL directly:

```
https://IP-address-or-domain:5443/Application_Name/streams/stream_Id.m3u8?subscriberId=your-subscriber&subscriberCode=totp-token
```

:::info
If **Adaptive Bitrate (ABR)** is enabled and the stream is published over **WebRTC**, the original `.m3u8` (for example `streamId.m3u8`) is not generated. Use an adaptive or resolution-specific playlist instead, and keep `subscriberId` / `subscriberCode` on the URL.
:::

#### CMAF (DASH)

If using the embedded (`play.html`) player:

```
https://IP-address-or-domain:5443/Application_Name/play.html?id=stream_Id&playOrder=dash&subscriberId=your-subscriber&subscriberCode=totp-token
```

If using the `.mpd` URL directly:

```
https://IP-address-or-domain:5443/Application_Name/streams/streamId/streamId.mpd?subscriberId=your-subscriber&subscriberCode=totp-token
```

#### WebRTC

If using the embedded (`play.html`) player:

```
https://IP-address-or-domain:5443/Application_Name/play.html?id=streamId&subscriberId=your-subscriber&subscriberCode=totp-token
```

If connecting over WebSocket, include `subscriberId` and `subscriberCode` in the play message. See the [WebRTC playing reference](/guides/publish-live-stream/webrtc/webrtc-websocket-messaging-reference/#playing-webrtc-stream).

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
  "subscriberCode": "subscriberCode",
  "subscriberId": "subscriberId"
}
```

TOTP keeps access short-lived and subscriber-aware—use it when you want temporary entry without long-lived reusable tokens.
