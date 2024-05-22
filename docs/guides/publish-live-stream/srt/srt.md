---
title: SRT Ingest Guide
description: SRT Ingest Guide
keywords: [SRT Ingest Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

# SRT Ingest Guide

SRT (Secure Reliable Transport) allows you to push streams to Ant Media Server and play them using various formats, including WebRTC, HLS, CMAF, and record them as MP4. The SRT ingest feature, which also supports adaptive streaming, is available from version 2.4.3 onwards.

To enable this feature, we utilized Haivision's official [SRT library](https://github.com/Haivision/srt) and created an SRT preset for [JavaCPP-Presets](https://github.com/bytedeco/javacpp-presets). We intend to submit a pull request for the JavaCPP-Presets repository.

Below is a guide on how to publish an SRT stream to the Ant Media Server.

## Pushing SRT stream with FFmpeg

Assuming you have installed and launched Ant Media Server v2.4.3 or later, you can use FFmpeg to push the SRT stream. Simply run the following command:

```js
ffmpeg -re -i {INPUT} -vcodec libx264 -profile:v baseline -g 60 -acodec aac -f mpegts srt://ant.media.server.address:4200?streamid=WebRTCAppEE/stream1
```

Once the command is executed, the stream will be available in the "WebRTCAppEE" application with the `streamId` "stream1".

> If you encounter a "**Protocol not found**" error, it means FFmpeg needs to be compiled with the [**--enable-libsrt**](https://srtlab.github.io/srt-cookbook/apps/ffmpeg/) to support the SRT protocol.

> **srt://ant.media.server.address:4200?streamid\=WebRTCAppEE/stream1: Protocol not found**

In that case, you can verify if FFmpeg has SRT protocol support or not, just by running the following command:
```js
ffmpeg -protocols
```

## Publishing SRT stream with OBS

If you don’t have command-line experience and prefer a graphical interface, you can use OBS (Open Broadcaster Software) to push an SRT stream to Ant Media Server. If you are unfamiliar with OBS, you can look at this blog post [How to use OBS with Ant Media Server](https://antmedia.io/how-to-use-obs-with-ant-media-server/). Just enter the SRT URL to the stream window as shown in the image below.

![](@site/static/img/Screen-Shot-2022-04-20-at-14.48.30-1024x811.png)

If the publish type token is enabled, the SRT publishing URL will be in the following format:
```
srt://ant.media.server.address:4200?streamid=Application-Name/streamId,token=tokenId
```

### Publishing SRT stream with OBS Without streamId

:::info
Starting from version 2.8.0 and above, Ant Media Server supports SRT publishing without the explicit need for streamId.
:::

![](@site/static/img/publish-live-stream/srt/srt-obs.png)

- In such cases, the system IP address is used as the streamId and it is published to the LiveApp application by default.

![](@site/static/img/publish-live-stream/srt/srt-stream.png)


## Play SRT with Ant Media Server

Once the SRT stream has been published, it can be viewed using WebRTC, HLS, or CMAF (Dash). Please see the document [here](https://antmedia.io/docs/category/playing-live-streams/) for more information.

## Configure SRT Ingest port number

SRT is enabled by default in Ant Media Server, and it operates on UDP port 4200. If you need to make changes to the port number, follow these steps:

- Open the following file:
```js
/usr/local/antmedia/conf/red5.properties
```

- And, add/replace the following property:

```js
server.srt_port={WRITE_YOUR_PORT_NUMBER}
```

- After this, restart the server and it will use the newly configured port number for SRT ingest.

> Note: SRT support is available for both x86_64 and ARM architectures starting from Ant Media Server version 2.6.0. For versions below 2.6.0 (till v2.5.3), SRT support is available for x86_64 architecture only.
