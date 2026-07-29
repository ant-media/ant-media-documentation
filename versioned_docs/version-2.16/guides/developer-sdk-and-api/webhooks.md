---
title: Webhooks
description: Configure Ant Media Server webhooks to notify your application when stream events occur.
keywords: [Ant Media Server Webhooks, Webhooks List for Ant Media Server, Custom Webhook for Streams, Ant Media Server Documentation]
sidebar_position: 3
sidebar_label: Webhooks
---

# Webhooks

Webhooks let Ant Media Server notify your backend when something happens on the server—without polling the REST API. AMS sends an HTTP POST to a URL you configure, with a JSON body that includes an `action` field describing the event.

## What you can build with webhooks

| Use case | Example |
|----------|---------|
| **Stream lifecycle automation** | Start a recording workflow when `liveStreamStarted` fires; update your database when `liveStreamEnded` fires |
| **Viewer analytics** | Track `playStarted` / `playStopped` to measure audience and session duration |
| **Recording pipelines** | Trigger post-processing when `vodReady` delivers a finished VOD file |
| **Conference room management** | React to `subtrackAddedInTheMainTrack` or `noActiveSubtracksLeftInMainTrack` to update room UI or billing |
| **Failure alerting** | Notify ops when `publishTimeoutError`, `encoderNotOpenedError`, or `endpointFailed` occurs |
| **Stream authorization** | Accept or reject publish/play requests — see [Webhook stream authorization](/guides/stream-security/webhook-stream-authorization/) |
| **Per-stream integrations** | Set a different webhook URL per broadcast via `listenerHookURL` for tenant-specific workflows |

Webhooks complement the [REST API](/category/rest-api-guide/) and [client SDKs](/guides/developer-sdk-and-api/sdk-integration/): SDKs handle real-time media on the client; REST controls the server on demand; webhooks push server-side events to your app as they happen.

## How it works

1. Register a webhook URL on your AMS application (or per stream).
2. When an event occurs, AMS POSTs a payload to that URL.
3. Your endpoint reads the `action` field and responds with **HTTP 200**.
4. Optionally configure retries for failed deliveries (AMS 2.8.3+).

![](@site/static/img/68747470733a2f2f616e746d656469612e696f2f77702d636f6e74656e742f75706c6f6164732f323031382f31312f776562686f6f6b732d333030783237332e706e67.png)

## Register a webhook URL

### Default webhook (application-wide)

In the Ant Media Server web panel, open your application **Settings** and set **Webhook URL**:

![](@site/static/img/ant-media-server-webhook-configuration.png)

AMS calls this URL for the events listed below unless a stream overrides it.

### Per-stream webhook

Set `listenerHookURL` on the broadcast when you create it via the REST API. See [`createBroadcast`](https://github.com/ant-media/Ant-Media-Server/blob/master/src/main/java/io/antmedia/rest/BroadcastRestService.java).

Example request body:

```json
{
  "name": "test_video",
  "listenerHookURL": "https://www.example.com/webhook"
}
```

```bash
curl -X POST "http://localhost:5080/live/rest/v2/broadcasts/create" \
  -H "Content-Type: application/json" \
  -d '{"name":"test_video","listenerHookURL":"https://www.example.com/webhook"}'
```

## Reliable delivery

Starting with version **2.8.3**, AMS retries webhook delivery when the response is not HTTP 200 or when a connection error occurs.

Configure retries in **Advanced** application settings:

```json
"webhookRetryCount": 3,
"webhookRetryDelay": 1000
```

| Setting | Description |
|---------|-------------|
| `webhookRetryCount` | Number of retry attempts after the first failure (`0` disables retries) |
| `webhookRetryDelay` | Delay between retries in milliseconds |

![](@site/static/img/reliable_webhook_app_settings.png)

## Request format

By default AMS sends `Content-Type: application/json`. To use form encoding, set:

```json
"webhookContentType": "application/x-www-form-urlencoded"
```

Respond with **HTTP 200** as quickly as possible. Webhooks run on the server event loop—do heavy work asynchronously after acknowledging the request.

Fields wrapped in `{ }` in the examples below are placeholders replaced at runtime.

## Event reference

### `liveStreamStarted`

Fired when a new live stream starts publishing.

```json
{
  "id": "{streamId}",
  "action": "liveStreamStarted",
  "streamName": "{streamName}",
  "category": "{category}",
  "metadata": "{metadata}",
  "timestamp": "{timestamp}"
}
```

| Field | Description |
|-------|-------------|
| `id` | Stream ID |
| `action` | `liveStreamStarted` |
| `streamName` | Stream name (may be null) |
| `category` | Stream category (may be null) |
| `metadata` | Broadcast metadata (JSON object if the stored value is JSON) |
| `timestamp` | Server time in milliseconds (string) |

### `liveStreamEnded`

Fired when a live stream ends.

```json
{
  "id": "{streamId}",
  "action": "liveStreamEnded",
  "streamName": "{streamName}",
  "category": "{category}",
  "metadata": "{metadata}",
  "timestamp": "{timestamp}"
}
```

| Field | Description |
|-------|-------------|
| `id` | Stream ID |
| `action` | `liveStreamEnded` |
| `streamName` | Stream name (may be null) |
| `category` | Stream category (may be null) |
| `metadata` | Broadcast metadata |
| `timestamp` | Server time in milliseconds (string) |

### `vodReady`

Fired when recording of a live stream is complete.

```json
{
  "id": "{stream_id}",
  "app": "{app_name}",
  "duration": "{duration}",
  "action": "vodReady",
  "vodName": "{vod_file_name}",
  "vodId": "{vod_id}",
  "metadata": "{metadata_of_broadcast}",
  "timestamp": "{timestamp}"
}
```

| Field | Description |
|-------|-------------|
| `id` | Stream ID |
| `app` | Application name |
| `duration` | Recording duration |
| `action` | `vodReady` |
| `vodName` | VOD file name |
| `vodId` | VOD ID in the data store |
| `metadata` | Broadcast metadata |
| `timestamp` | Server time in milliseconds (string) |

### `endpointFailed`

Fired when an RTMP endpoint (restream) fails.

```json
{
  "id": "{stream_id}",
  "action": "endpointFailed",
  "streamName": "{stream_name}",
  "category": "{stream_category}",
  "metadata": "{rtmp_url}",
  "timestamp": "{timestamp}"
}
```

| Field | Description |
|-------|-------------|
| `id` | Stream ID |
| `action` | `endpointFailed` |
| `streamName` | Stream name (may be null) |
| `category` | Stream category (may be null) |
| `metadata` | RTMP URL of the failed endpoint |
| `timestamp` | Server time in milliseconds (string) |

### `publishTimeoutError`

Fired when the server stops receiving frames from the publisher (publish timeout).

```json
{
  "id": "{stream_id}",
  "action": "publishTimeoutError",
  "streamName": "{stream_name}",
  "category": "{stream_category}",
  "metadata": "{subscriberId:'subscriber_id'}",
  "timestamp": "{timestamp}"
}
```

| Field | Description |
|-------|-------------|
| `id` | Stream ID |
| `action` | `publishTimeoutError` |
| `streamName` | Stream name (may be null) |
| `category` | Stream category (may be null) |
| `metadata` | JSON object that may include `subscriberId` |
| `timestamp` | Server time in milliseconds (string) |

### `encoderNotOpenedError`

Fired when the encoder cannot be opened.

```json
{
  "id": "{stream_id}",
  "action": "encoderNotOpenedError",
  "streamName": "{stream_name}",
  "category": "{stream_category}",
  "metadata": "{metadata_of_broadcast}",
  "timestamp": "{timestamp}"
}
```

| Field | Description |
|-------|-------------|
| `id` | Stream ID |
| `action` | `encoderNotOpenedError` |
| `streamName` | Stream name (may be null) |
| `category` | Stream category (may be null) |
| `metadata` | Broadcast metadata |
| `timestamp` | Server time in milliseconds (string) |

### `playStarted`

Fired when a WebRTC player starts playing a stream.

```json
{
  "id": "{stream_id}",
  "action": "playStarted",
  "streamName": "{stream_name}",
  "category": "{stream_category}",
  "subscriberId": "{subscriber_id}",
  "timestamp": "{timestamp}"
}
```

| Field | Description |
|-------|-------------|
| `id` | Stream ID |
| `action` | `playStarted` |
| `streamName` | Stream name (may be null) |
| `category` | Stream category (may be null) |
| `subscriberId` | Subscriber ID passed to `publish()` / `play()` in the SDKs |
| `timestamp` | Server time in milliseconds (string) |

### `playStopped`

Fired when a WebRTC player stops playing a stream.

```json
{
  "id": "{stream_id}",
  "action": "playStopped",
  "streamName": "{stream_name}",
  "category": "{stream_category}",
  "subscriberId": "{subscriber_id}",
  "timestamp": "{timestamp}"
}
```

| Field | Description |
|-------|-------------|
| `id` | Stream ID |
| `action` | `playStopped` |
| `streamName` | Stream name (may be null) |
| `category` | Stream category (may be null) |
| `subscriberId` | Subscriber ID passed to `publish()` / `play()` in the SDKs |
| `timestamp` | Server time in milliseconds (string) |

### `subtrackAddedInTheMainTrack`

Fired when a sub-track is added to a main track (for example a participant joins a conference room).

```json
{
  "id": "{stream_id}",
  "action": "subtrackAddedInTheMainTrack",
  "streamName": "{stream_name}",
  "category": "{stream_category}",
  "subscriberId": "{subscriber_id}",
  "mainTrackId": "{main_track_id}",
  "timestamp": "{timestamp}"
}
```

| Field | Description |
|-------|-------------|
| `id` | Sub-track stream ID |
| `action` | `subtrackAddedInTheMainTrack` |
| `streamName` | Stream name (may be null) |
| `category` | Stream category (may be null) |
| `subscriberId` | Subscriber ID |
| `mainTrackId` | Main track / room stream ID |
| `timestamp` | Server time in milliseconds (string) |

### `subtrackLeftTheMainTrack`

Fired when a sub-track leaves the main track (participant left the room).

```json
{
  "id": "{stream_id}",
  "action": "subtrackLeftTheMainTrack",
  "streamName": "{stream_name}",
  "category": "{stream_category}",
  "subscriberId": "{subscriber_id}",
  "mainTrackId": "{main_track_id}",
  "timestamp": "{timestamp}"
}
```

| Field | Description |
|-------|-------------|
| `id` | Sub-track stream ID |
| `action` | `subtrackLeftTheMainTrack` |
| `streamName` | Stream name (may be null) |
| `category` | Stream category (may be null) |
| `subscriberId` | Subscriber ID |
| `mainTrackId` | Main track / room stream ID |
| `timestamp` | Server time in milliseconds (string) |

### `firstActiveTrackAddedInMainTrack`

Fired when the first active sub-track is created in a main track (first participant joins the room).

```json
{
  "id": "{stream_id}",
  "action": "firstActiveTrackAddedInMainTrack",
  "streamName": "{stream_name}",
  "category": "{stream_category}",
  "subscriberId": "{subscriber_id}",
  "mainTrackId": "{main_track_id}",
  "timestamp": "{timestamp}"
}
```

| Field | Description |
|-------|-------------|
| `id` | Sub-track stream ID |
| `action` | `firstActiveTrackAddedInMainTrack` |
| `streamName` | Stream name (may be null) |
| `category` | Stream category (may be null) |
| `subscriberId` | Subscriber ID |
| `mainTrackId` | Main track / room stream ID |
| `timestamp` | Server time in milliseconds (string) |

### `noActiveSubtracksLeftInMainTrack`

Fired when no active sub-tracks remain in the main track (everyone left the room).

```json
{
  "id": "{stream_id}",
  "action": "noActiveSubtracksLeftInMainTrack",
  "streamName": "{stream_name}",
  "category": "{stream_category}",
  "subscriberId": "{subscriber_id}",
  "mainTrackId": "{main_track_id}",
  "timestamp": "{timestamp}"
}
```

| Field | Description |
|-------|-------------|
| `id` | Sub-track stream ID |
| `action` | `noActiveSubtracksLeftInMainTrack` |
| `streamName` | Stream name (may be null) |
| `category` | Stream category (may be null) |
| `subscriberId` | Subscriber ID |
| `mainTrackId` | Main track / room stream ID |
| `timestamp` | Server time in milliseconds (string) |

## Secure stream authorization

To use webhooks for stream authorization (accept or reject publish/play), see [Webhook stream authorization](/guides/stream-security/webhook-stream-authorization/).
