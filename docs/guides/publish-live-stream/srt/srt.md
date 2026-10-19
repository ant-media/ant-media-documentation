---
title: SRT Ingest Guide
description: SRT Ingest Guide
keywords: [SRT Ingest Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

# SRT Ingest Guide

SRT (Secure Reliable Transport) allows you to push streams to Ant Media Server and play them using various formats, including WebRTC, HLS, CMAF (DASH), and LL-HLS, and record them as MP4.

To enable this feature, we utilized Haivision's official [SRT library](https://github.com/Haivision/srt) and created an SRT preset for [JavaCPP-Presets](https://github.com/bytedeco/javacpp-presets). We intend to submit a pull request for the JavaCPP-Presets repository.

Below is a guide on how to publish an SRT stream to the Ant Media Server.

## Pushing SRT Stream with FFmpeg

Assuming you have installed and launched Ant Media Server v2.4.3 or later, you can use FFmpeg to push the SRT stream. 

```bash
ffmpeg -re -i {INPUT} -vcodec libx264 -profile:v baseline -g 60 -acodec aac -f mpegts srt://ant.media.server.address:4200?streamid=live/stream1
```

Once the command is executed, the stream will be available in the `live` application with the `streamId` stream1.

:::info
 If you encounter a "**Protocol not found**" error, it means FFmpeg needs to be compiled with the [**--enable-libsrt**](https://srtlab.github.io/srt-cookbook/apps/ffmpeg/) to support the SRT protocol.

srt://ant.media.server.address:4200?streamid\=live/stream1: Protocol not found
:::

In that case, you can verify if FFmpeg has SRT protocol support or not by running the following command:

```bash
ffmpeg -protocols
```

## Publishing SRT Stream With OBS

If you don’t have command-line experience and prefer a graphical interface, you can use OBS (Open Broadcaster Software) to push an SRT stream to Ant Media Server. If you are unfamiliar with OBS, you can look at this blog post [How to use OBS with Ant Media Server](https://antmedia.io/how-to-use-obs-with-ant-media-server/). 

Just enter the SRT URL into the stream window as shown in the image below.

![](@site/static/img/Screen-Shot-2022-04-20-at-14.48.30-1024x811.png)

If the publish type token is enabled, the SRT publishing URL will be in the following format:

```
srt://ant.media.server.address:4200?streamid=live/streamId,token=tokenId
```

In order to generate the tokens, check out the stream security [documentation](/category/stream-security/).

### Publishing SRT Stream Without StreamId

:::info
Starting from version 2.8.0 and above, Ant Media Server supports SRT publishing without the explicit need for streamId.
:::

![](@site/static/img/publish-live-stream/srt/srt-obs.png)

In such cases, the system IP address is used as the streamId and it is published to the LiveApp application by default.

![](@site/static/img/publish-live-stream/srt/srt-stream.png)

## Publish SRT Multitrack Stream

Starting version 3.1.0, an SRT stream can be published with multiple audio tracks. Here is the sample FFMPEG command:

```bash
ffmpeg -re -i file.mp4 -map 0 -c copy -f mpegts "srt://ant.media.server.address:4200?streamid=live/test"
```

Suppose the file has a video with English, German (Deutsch) and French. On the player side, you can select the specific audio track to play.

In AMS, the multitrack playback works with both WebRTC & HLS.

![](@site/static/img/publish-live-stream/srt/multitrack-playback.png)


## Play SRT with Ant Media Server

Once the SRT stream has been published, it can be viewed using WebRTC, HLS, CMAF (Dash) or LL-HLS. Please see the document [here](https://docs.antmedia.io/category/play-live-streams/) for more information.

## Configure SRT Ingest Port

SRT is enabled by default in Ant Media Server and communicates via UDP port 4200. If you need to change the port number, follow these steps.

- Open the following file and edit it using your editor.

   ```bash
   sudo nano /usr/local/antmedia/conf/red5.properties
   ```

- And, add/replace the following property:

   ```bash
   server.srt_port={WRITE_YOUR_PORT_NUMBER}
   ```

- After this, restart the server, and it will use the newly configured port number for SRT ingest.

:::info
SRT support is available for both x86_64 and ARM architectures, starting with Ant Media Server version 2.6.0. For versions below 2.6.0 (till v2.5.3), SRT support is available for the x86_64 architecture only.
:::
