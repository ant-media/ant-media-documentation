---
title: Hash-Based Token
description: Authorize publish and play with a hash derived from stream ID, role, and a shared secret.
keywords: [Hash-Based Token, tokenHashSecret, Stream Security, Ant Media Server Documentation]
sidebar_position: 5
sidebar_label: Hash-Based Token
---

# Hash-Based Token

Enable hash-based tokens for publish and/or play in the application’s advanced settings. Configure the secret and toggles in the web panel—see [Management Panel Application settings](/guides/configuration-and-testing/ams-application-configuration/#management-panel-application-settings).

```
  "tokenHashSecret": "",
  "hashControlPublishEnabled": false,
  "hashControlPlayEnabled": false,
```

By default, hash control is disabled. Set `hashControlPublishEnabled` and/or `hashControlPlayEnabled` to `true` to turn it on.

:::info
`tokenHashSecret` can be any string you choose (for example `mySecretKey` or a long random value). Use a strong, private secret in production—anyone who knows it can generate valid hashes.
:::

:::tip
A hash-based token can be used any number of times. There is no expire time for the token—rotate your `tokenHashSecret` if you need to invalidate existing hashes.
:::

:::warning
Do not leave `tokenHashSecret` empty when hash control is enabled. Without a secret, clients cannot generate a valid hash.
:::

## How hash validation works

When hash control is enabled for publish or play, Ant Media Server checks each request as follows:

1. Reads the `token` value from the client (query parameter or WebSocket field).
2. Builds the expected hash with:

   ```
   sha256(STREAM_ID + ROLE + SECRET)
   ```

   where `ROLE` is `publish` or `play`, and `SECRET` is your `tokenHashSecret`.
3. Compares the expected hash to the client’s token.
4. Allows the request if they match; otherwise it rejects the request.

![](@site/static/img/stream-security/hash-invalid.png)

## Generate a hash-based token

You can compute the hash with any SHA-256 tool, such as [JavaScript SHA-256](https://geraintluff.github.io/sha256/). Concatenate the three values with **no separators**, then hash:

```
STREAM_ID: Stream ID on Ant Media Server
ROLE:      "publish" or "play"
SECRET:    tokenHashSecret from application settings
```

Formula: `sha256(STREAM_ID + ROLE + SECRET)`

### Publish hash example

With `STREAM_ID: stream1`, `ROLE: publish`, `SECRET: testtest`:

```
sha256(stream1publishtesttest)
```

![](@site/static/img/stream-security/hash-publish.png)

### Play hash example

With `STREAM_ID: stream1`, `ROLE: play`, `SECRET: testtest`:

```
sha256(stream1playtesttest)
```

![](@site/static/img/stream-security/hash-play.png)

## Use Hash Token with streaming protocols

Pass the hash as the `token` query parameter (or WebSocket field) on publish and play requests.

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

Hash-based tokens keep publish and play tied to your shared secret—straightforward to generate on your backend and hard to forge without it.
