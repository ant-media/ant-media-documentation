---
title: Enforce Stream Quality
description: Let viewers or your app request a specific ABR rendition over WebRTC, HLS, DASH, or LL-HLS in Ant Media Server.
keywords: [Enforce Stream Quality, forceStreamQuality, ABR, Ant Media Server Documentation]
sidebar_position: 2
sidebar_label: Enforce Stream Quality
---

# Enforce Stream Quality

By default, [Adaptive Bitrate Streaming](/guides/adaptive-bitrate/adaptive-bitrate-streaming/) picks the rendition that fits the viewer’s bandwidth. You can also **force** a specific resolution—for example when the user selects “720p” in your player UI.

:::tip
If you force a bitrate higher than the viewer’s connection can carry, expect packet loss or visible pixelation.
:::

## How automatic ABR chooses quality

The server measures available bandwidth and sends the highest rendition the connection supports.

Example with two renditions on the server:

| Rendition | Video bitrate | Viewer bandwidth | Rendition sent |
|-----------|---------------|------------------|----------------|
| 360p | 800 kbps | Below 800 kbps | 360p |
| 480p | 1000 kbps | Above 1000 kbps | 480p |

Viewers only receive qualities the publisher is actually producing. See [ABR Overview](/guides/adaptive-bitrate/adaptive-bitrate-streaming/) for setup.

## WebRTC — force quality in your app

After playback starts, call `getStreamInfo` when you receive the `play_started` event:

```js
else if (info == "play_started") {
    console.log("play started");
    webRTCAdaptor.getStreamInfo(streamId);
}
else if (info == "play_finished") {
```

### Read available heights

The `streamInformation` response lists adaptive renditions (VP8 and H264 may list the same height twice):

```js
else if (info == "streamInformation") {
    var streamResolutions = new Array();
    obj["streamInfo"].forEach(function(entry) {
        if (!streamResolutions.includes(entry["streamHeight"])) {
            streamResolutions.push(entry["streamHeight"]);
        }
    });
```

### Force a resolution

```js
webRTCAdaptor.forceStreamQuality("{your_stream_Id}", {the_resolution_to_be_forced});
```

Pass `0` for height to return to automatic ABR. See the [player.html reference](https://github.com/ant-media/StreamApp/blob/c802e0e60641244935f2a1948f48ecfea1d1b44a/src/main/webapp/player.html#L544).

The sample player exposes a quality dropdown—selecting a value calls `forceStreamQuality`:

![](@site/static/img/adaptive-streaming/stream-quality.webp)

In the screenshot above, **360p** is selected.

## Web player (`play.html`)

The embedded [Web Player](/guides/playing-live-stream/embedded-web-player/) supports the same quality selector. Set `playOrder` to WebRTC, HLS, DASH, or LL-HLS; users pick a rendition from the player UI.

![](@site/static/img/adaptive-streaming/stream-quality-web-player.webp)

## HLS — direct variant URL

To bypass adaptive selection, point the player at a specific variant playlist:

```
https://domain:5443/AppName/streams/[streamId]_[quality].m3u8
```

Example:

```
https://domain:5443/live/streams/stream1_480p1000kbps.m3u8
```

For a master playlist with entries such as `adaptive.m3u8` containing 240p, 360p, 480p, and 720p, use the URL pattern above for the profile you want. See [HLS playing](/guides/playing-live-stream/hls-playing/) for general playback setup.

## LL-HLS — direct variant URL

```
https://domain:port/AppName/streams/ll-hls/streamId/resolution/streamId__lowlatency.m3u8
```

Example:

```
https://domain:5443/live/streams/ll-hls/stream1/480/stream1__lowlatency.m3u8
```

See [LL-HLS](/guides/playing-live-stream/ll-hls/) for low-latency HLS setup.

With enforced quality, the player or URL you choose determines the rendition—automatic bandwidth switching is bypassed until you switch back (WebRTC: height `0`) or use a master playlist again.
