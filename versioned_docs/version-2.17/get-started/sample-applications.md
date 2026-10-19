---
title: Sample Applications
slug: /sample-applications
description: Explore Ant Media Server sample pages for WebRTC publish, play, conference, WHIP, and more.
keywords: [Ant Media Server WebRTC Samples, Sample Applications, Ant Media Server Demo, Ant Media Server Documentation]
sidebar_position: 3
sidebar_label: Sample Applications
---

# Sample Applications

Ant Media Server ships with browser sample pages you can use to publish, play, and try common streaming features. These examples are a quick way to validate your install and prototype use cases.

Examples below use the **live** application. You can swap in any other application name the same way. You can also [create your own application](/guides/developer-sdk-and-api/extend-the-server/applications/create-new-application/).

Browse all samples from:

```text
https://YOUR_DOMAIN:5443/live/samples.html
```

Or try them live at [test.antmedia.io](https://test.antmedia.io:5443/live/samples.html).

:::tip
Most interactive WebRTC samples need [SSL](/guides/installing-on-linux/setting-up-ssl/). On localhost, browsers usually allow camera and mic without HTTPS.
:::

## WebRTC publishing

Publish from the browser to AMS:

```text
https://YOUR_DOMAIN:5443/live/index.html
```

File: `/usr/local/antmedia/webapps/live/index.html`

![](@site/static/img/getting-started/sample-tools-apps/publishing.png)

### Publishing without SSL (development only)

Browsers block media devices on insecure origins (except localhost). For Chrome development, you can allow your server IP via:

`chrome://flags/#unsafely-treat-insecure-origin-as-secure`

Prefer installing SSL for any real deployment.

## WebRTC playback

:::info
WebRTC playback samples require **Enterprise Edition**.
:::

```text
https://YOUR_DOMAIN:5443/live/player.html
```

File: `/usr/local/antmedia/webapps/live/player.html`

![](@site/static/img/getting-started/sample-tools-apps/playing.png)

## WebRTC audio publishing

:::info
Enterprise Edition
:::

```text
https://YOUR_DOMAIN:5443/live/audio_publish.html
```

File: `/usr/local/antmedia/webapps/live/audio_publish.html`

![](@site/static/img/138696358-9d967d80-343b-4717-a587-1e934e63d5e3.png)

## WebRTC audio playback

:::info
Enterprise Edition
:::

```text
https://YOUR_DOMAIN:5443/live/audio_player.html
```

File: `/usr/local/antmedia/webapps/live/audio_player.html`

![](@site/static/img/138696730-9acb0de6-0c8d-42c4-9303-fd7f8a388aaf.png)

## Conference call

:::info
Enterprise Edition
:::

One or more publishers can stream to a group of viewers with roughly half-second latency.

```text
https://YOUR_DOMAIN:5443/live/conference.html
```

File: `/usr/local/antmedia/webapps/live/conference.html`

Details: [WebRTC Conference Call](/guides/publish-live-stream/webrtc/webrtc-conference-call/)

![](@site/static/img/image-1645105628540.png)

## Peer-to-peer live streaming

:::info
Enterprise Edition
:::

```text
https://YOUR_DOMAIN:5443/live/peer.html
```

File: `/usr/local/antmedia/webapps/live/peer.html`

Details: [WebRTC Peer-to-Peer Communication](/guides/publish-live-stream/webrtc/webrtc-peer-to-peer-communication/)

## WebRTC multitrack player

:::info
Enterprise Edition
:::

Play selected tracks from a multitrack stream. Enable or disable tracks on the fly.

```text
https://YOUR_DOMAIN:5443/live/multitrackplayer.html
```

File: `/usr/local/antmedia/webapps/live/multitrackplayer.html`

## WebRTC publish with whiteboard

:::info
Enterprise Edition
:::

Publish with a whiteboard synced to all players. Enable the **data channel** in application settings for publishers and players.

```text
https://YOUR_DOMAIN:5443/live/canvas-publish.html
```

File: `/usr/local/antmedia/webapps/live/canvas-publish.html`

![](@site/static/img/138704308-6dccbd55-1bff-40e3-9c67-44fc23fc2b50.png)

## WebRTC play with whiteboard

:::info
Enterprise Edition
:::

Play with a synchronized whiteboard. Enable the **data channel** in application settings for publishers and players.

```text
https://YOUR_DOMAIN:5443/live/canvas-player.html
```

File: `/usr/local/antmedia/webapps/live/canvas-player.html`

## WebRTC data channel

:::info
Enterprise Edition
:::

Send data over WebRTC without audio or video. Delivery follows the same publish/play subscription model.

```text
https://YOUR_DOMAIN:5443/live/datachannel.html
```

File: `/usr/local/antmedia/webapps/live/datachannel.html`

![](@site/static/img/138705765-b0a913c8-25c2-4ce7-89d5-68a664694532.png)

## WebRTC test tool

:::info
Enterprise Edition
:::

Measure end-to-end bitrate, RTT, packet loss, and related quality metrics.

```text
https://YOUR_DOMAIN:5443/live/webrtc-test-tool.html
```

File: `/usr/local/antmedia/webapps/live/webrtc-test-tool.html`

![](@site/static/img/138707266-883326ee-a3b6-4e58-a265-3e2844c97ef0.png)

## WebRTC publish with timestamp

:::info
Enterprise Edition
:::

Overlay the frame timestamp for end-to-end latency checks.

```text
https://YOUR_DOMAIN:5443/live/publish_with_timestamp.html
```

File: `/usr/local/antmedia/webapps/live/publish_with_timestamp.html`

## WebRTC player with timestamp

:::info
Enterprise Edition
:::

Play with timestamp overlay for latency measurement. Can send frames to Amazon Rekognition or Google Vision for analysis. See [Measure End-to-End Latency](/guides/configuration-and-testing/measure-end-to-end-latency/).

```text
https://YOUR_DOMAIN:5443/live/player_with_timestamp.html
```

File: `/usr/local/antmedia/webapps/live/player_with_timestamp.html`

![](@site/static/img/138709249-aa18beda-a575-42d0-981a-b62758b8df10.png)

## Merge WebRTC streams

:::info
Enterprise Edition
:::

`multitrack-play.html` joins a conference room on the server and merges participant tracks into one view—useful for recording or monitoring without the Circle Conference app.

Play a merged room view:

```text
https://YOUR_DOMAIN:5443/live/multitrack-play.html?id=room1
```

Join as a participant:

```text
https://YOUR_DOMAIN:5443/live/conference.html
```

File: `/usr/local/antmedia/webapps/live/multitrack-play.html`

## Publish with WHIP

:::info
Enterprise Edition
:::

Publish from the browser using WHIP (Eyevinn WHIP client in the sample).

```text
https://YOUR_DOMAIN:5443/live/whip.html
```

File: `/usr/local/antmedia/webapps/live/whip.html`

## Publish with virtual background

:::info
Enterprise Edition
:::

Apply a virtual background (including your own images) while publishing.

```text
https://YOUR_DOMAIN:5443/live/publish_webrtc_virtual_background.html
```

File: `/usr/local/antmedia/webapps/live/publish_webrtc_virtual_background.html`

## Publish with DeepAR effects

:::info
Enterprise Edition
:::

Publish with DeepAR filter effects.

```text
https://YOUR_DOMAIN:5443/live/publish_webrtc_deep_ar_effects.html
```

File: `/usr/local/antmedia/webapps/live/publish_webrtc_deep_ar_effects.html`

## Next steps

| I want to… | Go to |
| --- | --- |
| Publish from encoders and protocols | [Publish Live Streams](/category/publish-live-streams/) |
| Play WebRTC, HLS, and DASH | [Play Live Streams](/category/play-live-streams/) |
| Build with SDKs and the REST API | [Developer Guides](/category/developer-guides/) |
