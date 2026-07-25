---
title: Dashboard Features
slug: /dashboard-features
description: Tour the Ant Media Server web panel—dashboard health, applications, live streams, VoD, and key settings.
keywords: [Ant Media Server Dashboard, Web Panel, Live Streams, VoD, Application Settings, Ant Media Server Documentation]
sidebar_position: 1
sidebar_label: Dashboard Features
---

# Dashboard Features

After [installing Ant Media Server](/quick-start/), manage it from the **web panel**. This page walks through the main screens: dashboard health, applications, live streams, VoD, and common settings.

Open the panel at:

```text
http://YOUR_SERVER_URL_OR_IP:5080
```

With SSL enabled:

```text
https://YOUR_DOMAIN:5443
```

## Dashboard

The home screen shows instance health at a glance.

![](@site/static/img/dashboard-features/dashboardIMG.webp)

Metrics include system CPU, active live streams, disk, memory, and JVM heap.

:::tip
Keep CPU and memory under about **75%**. Sustained higher usage often leads to unstable streams or crashes. See [Troubleshooting](/guides/troubleshooting/) if usage stays high.
:::

## Applications

AMS ships with default applications such as **LiveApp**, **live**, and **WebRTCApp** (Community) or **WebRTCAppEE** (Enterprise). Applications are [open source](https://github.com/ant-media/StreamApp/). Each one is independent—with its own sample pages, streams, and settings. The application name is only an identity; behavior is controlled by settings.

They appear under **APPLICATIONS** in the left menu. Opening an application shows three tabs: **Live Streams**, **VoD**, and **Settings**.

### Live Streams

Lists active and known streams for that application.

![](@site/static/img/dashboard-features/dashboardLive.webp)

Each row shows name, stream ID, status, viewer counts by protocol (WebRTC, HLS, DASH), and the action menu.

### Stream Actions

Open the **⋯** (actions) menu on a live stream for per-stream controls.

![](@site/static/img/dashboard-features/stream-actions.png)

**Recording** — Enable MP4 or WebM for that stream. Recording must also be allowed in application **Stream Recording** settings, with a matching codec (H.264 for MP4, VP8 for WebM).

![](@site/static/img/dashboard-features/dashboardRecording.webp)

**Edit Restreaming Endpoints** — Add restreaming targets such as RTMP YouTube, Facebook etc or SRT endpoints. There is no fixed limit on endpoints. See [Restreaming](/category/restreaming/).

**Copy publish URL** — RTMP ingest URL for encoders. Some encoders need the stream ID split into a stream key field:

```text
rtmp://SERVER_URL/[application]/[stream_id]
```

Example:

```text
rtmp://localhost/LiveApp/c5cLv2CUG9FJ1684419013643
```

**Copy embed code** — iframe that loads the default player (`play.html`) for that stream. Use it on a website or any host that accepts an iframe. See [Embedded Web Player](/guides/playing-live-stream/embedded-web-player/).

```html
<iframe width="560" height="315" src="http://localhost:5080/live/play.html?id=jcmhp84xMBIJHmxk876462646524" frameBorder="0" allowFullScreen></iframe>
```

**Play with WebRTC / HLS** — Opens playback in a new tab with that protocol preferred (`playOrder=webrtc` or `playOrder=hls`).

### VoD

The **VoD** tab lists recorded streams and uploaded files.

![](@site/static/img/dashboard-features/dashboardVOD.webp)

Upload a file with **Upload VoD**:

![](@site/static/img/dashboard-features/dashboardUpload.webp)

### Application settings

The **Settings** tab configures how the application publishes, plays, records, and secures streams. For a full reference of every option, see [AMS Application Configuration](/guides/configuration-and-testing/ams-application-configuration/).

![](@site/static/img/dashboard-features/application-settings.png)

#### Video codecs

Supported codecs include H.264, H.265, VP8, and AV1. See [Video Codecs](/category/video-codecs/) for details.

If you enable more than one codec (for example H.264 and VP8), use adaptive bitrate so each codec is encoded correctly.

#### Adaptive bitrate

Configure ABR ladders for viewers on different networks. See [Adaptive Bitrate](/category/adaptive-bitrate/).

![](@site/static/img/dashboard-features/dashboardAdaptive.webp)

#### HLS

Tune HLS **segment list size** (number of TS segments kept) and **segment duration**.

![](@site/static/img/dashboard-features/dashboardHLS.webp)

#### Advanced settings

Enable options such as object detection and preview generation (often requires adaptive bitrate), set a custom VoD folder, and configure a webhook URL for stream events. See [Webhooks](/guides/developer-sdk-and-api/webhooks/).

![](@site/static/img/dashboard-features/dashboardAdvanced.webp)

#### WebRTC data channel

Enable the data channel for messaging (for example chat) and choose how messages are delivered to players.

![](@site/static/img/dashboard-features/dashboardData.webp)

#### Stream recording

Enable MP4 and/or WebM recording at the application level. MP4 needs H.264; WebM needs VP8.

![](@site/static/img/dashboard-features/dashboardRecordingtwo.webp)

#### Stream security

Without security options, anyone with the publish or play URL can access streams. Common controls:

- [One-time tokens](/guides/stream-security/one-time-token-control/)
- [TOTP tokens](/guides/stream-security/time-based-one-time-password/)
- [Accept undefined streams](/guides/stream-security/accepting-undefined-streams/)
- [JWT stream filter](/guides/stream-security/jwt-stream-security-filter/)
- [Hash-based tokens](/guides/stream-security/hash-based-token/)

See [Stream Security](/category/stream-security/) for the full set.

![](@site/static/img/dashboard-features/dashboardSecurity.png)

#### REST API security

If you call the REST API from other hosts, configure IP allowlisting and/or JWT. Keep `127.0.0.1` in the IP filter—the web panel itself uses localhost access. Removing it breaks the panel.

Details: [Securing REST APIs](/guides/developer-sdk-and-api/rest-api-guide/securing-rest-apis/) · [REST API](/category/rest-api-guide/)

![](@site/static/img/dashboard-features/dashboardRestAPI.png)

## Next steps

| I want to… | Go to |
| --- | --- |
| Publish WebRTC, RTMP, SRT, and more | [Publish Live Streams](/category/publish-live-streams/) |
| Play with WebRTC, HLS, and DASH | [Play Live Streams](/category/play-live-streams/) |
| Deliver adaptive quality | [Adaptive Bitrate](/category/adaptive-bitrate/) |
