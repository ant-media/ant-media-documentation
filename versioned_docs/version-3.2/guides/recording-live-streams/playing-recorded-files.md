---
title: Play Recorded Files
description: Playback of Recorded live streams
keywords: [Live Stream Recording, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 5
---

# Play Recorded Files

You've just gone through the ways Ant Media Server can record a live stream — MP4, WebM, HLS, and periodic clips. This guide covers the other half: playing those recordings back, plus a few VOD-related APIs.

By the end of this guide, you'll know how to play back MP4, WebM, and general VOD recordings directly by URL or through the embedded player.

## Play VOD Files with MP4

First, make sure MP4 recording is enabled in your application settings on the Web panel.

For example, if a live stream with stream ID `stream1` is published to the `live` application, the MP4 file is generated automatically once the stream finishes publishing.

- In both the Community and Enterprise Editions, the default MP4 file can be accessed at:

  `https://<DOMAIN_NAME>:5443/<APP_NAME>/streams/<STREAM_ID>.mp4`

- In the Enterprise Edition, if adaptive bitrate is enabled, MP4 recordings are generated per bitrate. With 480p and 240p enabled, for example, you'd get two files:

  - `https://<DOMAIN_NAME>:5443/<APP_NAME>/streams/stream1_240p500kbps.mp4`
  - `https://<DOMAIN_NAME>:5443/<APP_NAME>/streams/stream1_480p1000kbps.mp4`

## Play VOD Files with WebM

First, confirm WebM recording is enabled in your application settings — this requires the VP8 codec, which is only available in the Enterprise Edition.

- In the Community Edition, VP8 isn't available, so WebM can't be recorded.
- In the Enterprise Edition, adaptive bitrate produces one WebM file per resolution, the same way MP4 does:

  - `https://<DOMAIN_NAME>:5443/<APP_NAME>/streams/stream1_240p500kbps.webm`
  - `https://<DOMAIN_NAME>:5443/<APP_NAME>/streams/stream1_480p1000kbps.webm`

## Play VOD Streams with the Embedded Player

Both Editions include the [embedded player](/guides/playing-live-stream/embedded-web-player/) (`play.html`), which plays live and VOD (recorded or uploaded) streams alike.

Once a stream finishes, play its recording with:

```
https://<DOMAIN_NAME>:5443/<APP_NAME>/play.html?name=<STREAM_ID>&playOrder=vod
```

For an uploaded VOD instead of a recording, use its VOD ID the same way:

```
https://<DOMAIN_NAME>:5443/<APP_NAME>/play.html?name=<VOD_ID>&playOrder=vod
```

You now know how to play back MP4, WebM, and uploaded VOD recordings, either directly by URL or through the embedded player.

## Need Help?

If a recording won't play or 404s, confirm the corresponding recording type was actually enabled when the stream was published, then reach out on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or contact [Technical Support](mailto:support@antmedia.io).
