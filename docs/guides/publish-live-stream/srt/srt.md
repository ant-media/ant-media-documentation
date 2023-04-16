---
title: SRT Ingest Guide
sidebar_position: 1
---
# SRT Ingest Guide

You can use SRT to push streams to Ant Media Server and play them not only with WebRTC but also with all other formats (e.g., HLS, CMAF) and record them as MP4. SRT ingest also supports adaptive streaming. This feature is available beginning with 2.4.3.

We used Haivision's official [SRT library](https://github.com/Haivision/srt) for this feature. We've made an SRT preset for the [JavaCPP-Presets](https://github.com/bytedeco/javacpp-presets) and intend to submit a pull request to the JavaCPP-Presets.

You can read about how to publish SRT stream to the Ant Media Server below.

## Pushing SRT stream with FFmpeg

We assume that you’ve installed and run Ant Media Server v2.4.3 and later. 

Just run the following command with FFmpeg:

```js
ffmpeg -re -i {INPUT} -vcodec libx264 -profile:v baseline -g 60 -acodec aac -f mpegts srt://ant.media.server.address:4200?streamid=WebRTCAppEE/stream1
```

After you run the command, the stream is going to be available in “**WebRTCAppEE**” with a stream id “**stream1**”.

If you see a "**Protocol not found**" error,  FFmpeg needs to be [compiled with **\--enable-libsrt**](https://srtlab.github.io/srt-cookbook/apps/ffmpeg/) to support the SRT protocol.

**srt://ant.media.server.address:4200?streamid\=WebRTCAppEE/stream1: Protocol not found**

You can check as follows if FFmpeg is compiled with SRT protocol.

```js
ffmpeg -protocols
```

## Publishing SRT stream with OBS

If you don’t have command-line tools experience, you can use OBS to push an SRT stream to the Ant Media Server. If you are not familiar with OBS, you can take a look [at this blog post](https://antmedia.io/how-to-use-obs-with-ant-media-server/). Just enter the SRT URL to the stream window as shown in the image below.

![](@site/static/img/Screen-Shot-2022-04-20-at-14.48.30-1024x811.png)

If the publish type token is enabled, then SRT publishing URL will be as follows:
```
srt://ant.media.server.address:4200?streamid=Application-Name/streamId,token=tokenId
```
## Play SRT with Ant Media Server

Once the SRT stream has been published, it can be viewed using WebRTC, HLS, or CMAF (Dash). Please see the document [here](https://antmedia.io/docs/category/playing-live-streams/) for more information.

## Configure SRT Ingest port number

SRT is enabled by default in Ant Media Server, and it operates on the 4200 (UDP) port. If you need to make changes, simply open the following file:

```js
/usr/local/antmedia/conf/red5.properties
```

and add/replace the following property:

```js
server.srt_port={WRITE_YOUR_PORT_NUMBER}
```

After this, restart the server and it will use the newly configured port number for SRT ingest.

Lastly, SRT support is available in **x86\_64 architectures**. It’s not currently available in ARM architectures and will be added in one of the later releases.
