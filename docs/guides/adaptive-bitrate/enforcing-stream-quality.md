---
title: Enforce Stream Quality
description: Enforce the Stream Quality
keywords: [Enforcing Stream Quality, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

# Enforce Stream Quality

Ant Media Server (AMS) has the ability to force stream quality. In this guide, you'll learn what it is, how it works, and how to benefit from the stream quality feature.

The client-side viewer can enforce a resolution it would like to get. Keep in mind that if you request a quality with a bitrate higher than the client's bandwidth, you may see some packet drops or pixelations.

## How does the adaptive bitrate work?

Ant Media Server measures the viewers' internet speed and sends the best quality according to the internet speed of the viewer.

Example:

* Assume that there are two bitrates on the server.
    * The first one is 360p and 800kbps.
    * The second one is 480p and 1000kbps.
 
* Assume that the viewer's internet speed is as follows:
    * Above 1000kbps: In this case, a resolution of 480p is sent.
    * Less than 800kbps: In this case, a resolution of 360p is sent.

The adaptive bitrate feature makes sure that the end user only gets what the server is sending out.

You can learn more about the adaptive bitrate in the previous document.

## Enforce Quality in WebRTC

Once the stream starts playing, the viewer receives the `play_started` notification. 

In `WebRTCAdaptor`, call `getStreamInfo` with `webRTCAdaptor.getStreamInfo(streamId)`.

```js
else if (info == "play_started") 
{
    console.log("play started");
    webRTCAdaptor.getStreamInfo(streamId);
} 
else if (info == "play_finished") 
{
```

### Retrieve Stream Information

Calling `getStreamInfo` triggers a response from the server containing stream details like adaptive resolutions, audio bitrate, and video bitrate.

```js
else if (info == "streamInformation") {

				var streamResolutions = new Array();

				obj["streamInfo"].forEach(function(entry) {
					//It's needs to both of VP8 and H264. So it can be dublicate
					if(!streamResolutions.includes(entry["streamHeight"])){
						streamResolutions.push(entry["streamHeight"]);
					}
				});
```

After getting stream info, you can force a specific resolution using:

```js
webRTCAdaptor.forceStreamQuality("{your_stream_Id}",  {the_resolution_to_be_forced});
```

For more details, check out [this code snippet](https://github.com/ant-media/StreamApp/blob/c802e0e60641244935f2a1948f48ecfea1d1b44a/src/main/webapp/player.html#L544).

### Enforce Quality on Client Side

There is a working sample `player.html` below. When you choose a resolution, it'll force the quality. You can select the resolution, as you can see from the screenshot below. 

![](@site/static/img/adaptive-streaming/stream-quality.webp)

In the example above, **360p** resolution is selected.

## Enforce Stream Quality in AMS Web player (play.html)

AMS also allows enforcing quality in the Web Player (play.html), similar to `player.html`. Users can select a resolution, and the stream will be forced to that quality.

To learn more about AMS Web Player, check **[here](https://antmedia.io/docs/guides/playing-live-stream/embedded-web-player/)**.

Just change the playOrder to play stream with WebRTC, HLS, DASH, or LL-HLS. The stream quality can be selected in the same way.

![](@site/static/img/adaptive-streaming/stream-quality-web-player.webp)

### Enforcing Quality for M3U8 HLS URL

Since some users play the HLS directly via M3U8, you can enforce stream quality by requesting a specific HLS variant. This can be achieved by selecting the appropriate `.m3u8` file that corresponds to the desired quality.

For example, if your HLS playlist has multiple bit rates:

* adaptive.m3u8
    * 240p
    * 360p
    * 480p
    * 720p

Here is the HLS URL format for specific bitrate and resolution:

```
https://domain:port/AppName/streams/[streamid]_[quality].m3u8
```
For example:

```
https://domain:5443/live/streams/stream1_480p1000kbps.m3u8
```

This ensures the player loads only specified quality instead of relying on adaptive selection.

To learn more about HLS playback, check out **[here](https://antmedia.io/docs/guides/playing-live-stream/hls-playing/)**.


### Enforcing Quality for M3U8 Low Latency HLS URL

Check out **[here](https://antmedia.io/docs/guides/playing-live-stream/ll-hls/)** to learn more about the low-latency HLS.

Here is the LL-HLS URL format for specific bitrate and resolution:

```
https://domain:port/live/streams/ll-hls/streamId/480/streamId__lowlatency.m3u8
```

For example:

```
https://domain:5443/live/streams/ll-hls/stream1/480/stream1__lowlatency.m3u8
```
