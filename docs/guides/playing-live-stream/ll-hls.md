---
title: LL-HLS Playback
description: Low Latency HLS (LL-HLS) playback with Ant Media Server.
keywords: [LL-HLS playback, LL-HLS playback with Ant Media Server, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---

# LL-HLS Playback

A low-latency HLS (LL-HLS) playback feature has been introduced in Ant Media Server version 2.11 and above. It reduces traditional HLS latency from 8–12 seconds to approximately 2–5 seconds, making it ideal for near-real-time streaming applications.

By the end of this guide, you'll have the LL-HLS plugin installed and be playing a stream back at 2-5 second latency.

## What is LL-HLS?

**Low Latency HLS (LL-HLS)** is a streaming protocol designed to minimize latency in live streaming. Traditional HLS can have latency ranging from 8 to 12 seconds, while LL-HLS reduces this to around **2-5 seconds**.

LL-HLS achieves this by using smaller video segments (called **parts**) that allow the video player to start playback before an entire segment is completed.

## Requirements

- **Ant Media Server Enterprise Edition v2.12 or later:** LL-HLS plugin compatible from this version.
- **LL-HLS Plugin:** Purchase the plugin by emailing `contact@antmedia.io` or via the [Ant Media website](https://antmedia.io/product/low-latency-hls-plugin/).
- **Supported Player:** Use a player that supports LL-HLS. We recommend testing with **[hls.js](https://hlsjs.video-dev.org/demo/)** or **[Dolby Player](https://optiview.dolby.com/resources/demos/test-stream/)** first.

### Key Differences: HLS vs. LL-HLS

| Standard HLS | Low Latency HLS (LL-HLS) |
| ------------ | ------------------------ |
|Latency: 8-12 secs | Latency: 2-5 secs |
| Segment-based | Part-based (smaller chunks) |
| Larger file sizes | Smaller, more frequent parts |


## How to Enable LL-HLS in Ant Media Server

LL-HLS is a **paid plugin** offered by Ant Media Server. Before you can play with LL-HLS, you need to purchase and install the plugin on your Ant Media Server.

For more information about plugin structure in Ant Media Server, take a look at [Ant Media Server Plugins](https://antmedia.io/plugins-will-make-ant-media-server-more-powerful/).

### Install the LL-HLS Plugin

1. Upload/copy the plugin file to your instance running Ant Media Server.
2. Run the following commands to install it:

   ```bash
   sudo unzip low-latency-hls-plugin.zip
   cd low-latency-hls-plugin
   sudo ./install_low-latency-hls-plugin.sh
   sudo service antmedia restart
   ```

### Stream Configuration Requirements

Ant Media Server generates LL-HLS output for every stream it ingests, but the encoder feeding it has to meet a few requirements for LL-HLS to actually deliver low latency. If you haven't published a stream yet, see [Publish Live Streams](/category/publish-live-streams/) for the protocol-specific guides.

1. **Adaptive Bitrate (ABR):** ABR must be enabled.
2. **GOP Size:** The Group of Pictures (GOP) size must be set to 1 or 2 seconds maximum.
   - Example: If the framerate is 30 fps, set the GOP size to 30 or 60.
3. **ABR Resolution and Bitrate:** Every ABR rendition must be lower resolution and bitrate than the source stream, never upscaled. This is good practice for adaptive bitrate in general, but it matters even more for LL-HLS.

**Hardware Encoding Settings**

If you are using hardware encoding (e.g., `h264_nvenc`), you must configure the following parameters to ensure stability:

```json
"encoderParameters": {
    "h264_nvenc": {
      "rc": "cbr",
      "gop_size": "60", // or 30 for 1 second
      "no-scenecut": "1" // Ensure no additional keyframes are added between scene changes
    }
}
```

## Play the Stream with LL-HLS

With the plugin installed and your stream configured correctly, you have two ways to play it back: Ant Media Server's own embedded player, or any external LL-HLS-compatible player.

### Play with the Ant Media Server Embedded Player

From v2.12 onwards, the [embedded web player](/guides/playing-live-stream/embedded-web-player/) plays LL-HLS natively, so you don't need a separate player just to test it. Open the following URL pattern in your browser:

```
https://<DOMAIN_NAME>:5443/<APP_NAME>/play.html?name=<STREAM_ID>&playOrder=ll-hls
```

### Play with an External Player

For hls.js, Dolby Player, or any other LL-HLS-compatible player, use the direct `.m3u8` URL instead:

```
https://<DOMAIN_NAME>:5443/<APP_NAME>/streams/ll-hls/<STREAM_ID>/<STREAM_ID>__master.m3u8
```

Make sure two underscores (`__`) sit between the stream ID and `master.m3u8` — that's part of the generated filename, not a typo.

![Screenshot 2024-09-23 131202](https://github.com/user-attachments/assets/63bca3f6-0c71-4ba8-a8f7-5b8d8f56c24f)

We recommend testing with one of these first:

- [hls.js demo player](https://hlsjs.video-dev.org/demo/)
- [Dolby Player](https://optiview.dolby.com/resources/demos/test-stream/)


## Customize LL-HLS

You can fine-tune LL-HLS settings in the [Advanced section of the application settings](/guides/configuration-and-testing/ams-application-configuration/#management-panel-application-settings) of the Ant Media Server web panel. These settings allow you to adjust the behavior of LL-HLS to meet specific needs, like controlling segment durations or playlist updates.

### Customization Parameters

1. **partTargetDurationMs**

The maximum duration of partial segments in milliseconds.
- **Recommended:** **1000 ms** (round value).
- **Troubleshooting:** If you experience playback issues, try setting this to a non-round value slightly above 1 second (e.g., **1002 ms**).

```js
"partTargetDurationMs": 1000
```

2. **targetDuration**

Target duration for media files
```js
"targetDuration": 8
```

3. **slidingWindowEntries**

Number of media segments retained in the playlist (default: **5**). Increasing this value can improve stability but may consume more resources.
```js
"slidingWindowEntries": 5
```

4. **deleteFiles**

Determines whether old media files are deleted after being removed from the playlist (default: **true**). It is set to **false** if you want to keep old segments.
```js
"deleteFiles": true
```

5. **program**

Indicates if a VOD-style program is being captured, which means all segments are retained in the playlist (default: **false**).
```js
"program": false
```

6. **addDateTime**

Controls whether the date and time are added to media file names (default: **true**)
```js
"addDateTime": true
```

7. **receiveDataTimeout**

Timeout duration in seconds after which the segmenter pauses if no data is received (default: **10**). 0 means never.
```js
"receiveDataTimeout": 0
```

8. **exitOnReceiveDataTimeout**

If set to **true**, the segmenter will exit when the receiveDataTimeout is reached. Otherwise, it will just pause (default: **false**).
```js
"exitOnReceiveDataTimeout": false
```

9. **fileCompleteCommand**

Command executed when a media or index file is completed. You can use `%P` for the full path and `%F` for the file name.
```js
"fileCompleteCommand": "/path/to/script %P %F"
```

10. **fileDeleteCommand**

Command executed when a media or index file is deleted after being removed from the playlist.
```js
"fileDeleteCommand": "/path/to/delete_script %P %F"
```

11. **quiet**

If set to **true**, only error messages will be displayed in the logs (default: **false**).
```js
"quiet": false
```

12. **abrDirectMuxing**

Only effective if using ABR. If direct muxing to LL-HLS is enabled, the original stream will also be directly re-muxed to LL-HLS alongside ABR (default: **true**).
This rarely should be set to FALSE, mostly for debugging purposes.
```js
"abrDirectMuxing": true
```

13. **noFloatingPointDuration**

If set, the segmenter will try to split segments into round numbers (default: **true**).
Recommended **true**, since players might have problems handling decimal numbers
```js
"noFloatingPointDuration": true
```

14. **partsHoldback**

Suggests to the player how many parts it should stay behind the live edge to ensure smooth playback (default: **3**).
```js
"partsHoldback": 3
```

15. **deleteFilesOnStreamEnd**

If set, LL-HLS related stream files will be deleted when the stream completes (default: **false**).
```js
"deleteFilesOnStreamEnd": false
```

### Apply Customization

To apply the above settings, add them under the **customSettings** section in the Ant Media Server application's Advanced settings:

```js
"customSettings": {
  "plugin.ll-hls": {
    "partTargetDurationMs": 1000,
    "targetDuration": 4,
    "slidingWindowEntries": 5,
    "deleteFiles": true,
    "program": false,
    "addDateTime": true,
    "receiveDataTimeout": 10,
    "exitOnReceiveDataTimeout": false,
    "fileCompleteCommand": "/path/to/script %P %F",
    "fileDeleteCommand": "/path/to/delete_script %P %F",
    "quiet": false,
    "abrDirectMuxing": true,
    "noFloatingPointDuration": true,
    "partsHoldback": 3,
    "deleteFilesOnStreamEnd": false
  }
}
```

For a more detailed explanation of LL-HLS and its related properties, check the [Low-latency HLS blogpost](https://antmedia.io/low-latency-hls-or-ll-hls/).

You now have the LL-HLS plugin installed and are playing a stream back at 2-5 second latency.

## Need Help?

If the plugin fails to install or the player can't load the `__master.m3u8` URL, reach out on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or contact [Technical Support](mailto:support@antmedia.io).
