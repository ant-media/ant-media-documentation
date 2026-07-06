---
title: LL-HLS Playback
description: Low Latency HLS (LL-HLS) Playback with Ant Media Server.
keywords: [LL-HLS playback, LL-HLS playback with Ant Media Server, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---

# Introduction

A low-latency HLS (LL-HLS) playback feature has been introduced in Ant Media Server version 2.11 and above. It reduces traditional HLS latency from 8–12 seconds to approximately 2–5 seconds, making it ideal for near-real-time streaming applications.

## What is LL-HLS?

**Low Latency HLS (LL-HLS)** is a streaming protocol designed to minimize latency in live streaming. Traditional HLS can have latency ranging from 8 to 12 seconds, while LL-HLS reduces this to around **2-5 seconds**.

LL-HLS achieves this by using smaller video segments (called **parts**) that allow the video player to start playback before an entire segment is completed.

### Prerequisites

- **Ant Media Server Enterprise Edition v2.17 or later:** LL-HLS plugin compatible from this version.
- **LL-HLS Plugin:** Purchase the plugin by emailing ```sales@antmedia.io``` or via the ```Ant Media website```
- **Supported Player:** Use a player that supports LL-HLS. We recommend testing with **[hls.js](https://hlsjs.video-dev.org/demo/)** or **[THEO Player](https://www.theoplayer.com/test-your-stream-hls-dash-hesp)** first. 

### Key Differences: HLS vs. LL-HLS

| Standard HLS | Low Latency HLS (LL-HLS) |
| ------------ | ------------------------ |
|Latency: 8-12 secs | Latency: 3-5 secs |
| Segment-based | Part-based (smaller chunks) |
| Larger file sizes | Smaller, more frequent parts |


## How to Enable LL-HLS in Ant Media Server

LL-HLS is a **paid plugin** offered by the Ant Media Server. So before using LL-HLS, you need to purchase and install the plugin on your Ant Media Server. For more information about plugin structure in Ant Media Server, take a look at the [Ant Media Server Plugins](https://antmedia.io/plugins-will-make-ant-media-server-more-powerful/).

### Step 1: Purchase and Install the LL-HLS Plugin

1. **Purchase the Plugin** 

   - Email contact@antmedia.io to purchase the LL-HLS plugin.
   - Alternatively, you can also [get it directly](https://antmedia.io/product/low-latency-hls-plugin/) from the website based on a monthly subscription basis.

2. **Install the Plugin**

   - Upload/copy the plugin file to your instance running the Ant Media Server.
   - Run the following commands to install:
   
     ```bash
     unzip low-latency-hls-plugin.zip
     cd low-latency-hls-plugin
     sudo ./install_low-latency-hls-plugin.sh
     sudo service antmedia restart
     ```
### Step 2: Publish a Stream

Ant Media Server provides LL-HLS endpoints for all ingested streams. You can check the [publish live streams](https://antmedia.io/docs/category/publish-live-stream/) section to learn how to publish streams using different protocols with Ant Media Server. For this example, let's [publish with WebRTC](https://antmedia.io/docs/guides/publish-live-stream/webrtc/).

#### Stream Configuration Requirements

For LL-HLS to function correctly, your stream configuration must meet the following criteria:

1. **Adaptive Bitrate (ABR):** ABR must be enabled.
2. **GOP Size:** The Group of Pictures (GOP) size must be set to 1 or 2 seconds maximum. 
   - Example: If the framerate is 30 fps, set the GOP size to 30 or 60.

**Hardware Encoding Settings:**

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

1. **Access the WebRTC Publish Page**

   - Open the following URL in your browser: https://yourserver.com:5443/live/?streamId=stream1

   - Replace the domain with your Ant Media server's domain.

   - You can use `stream1` or any custom stream ID.

2. **Start Publishing the Stream**

   - Click the **Start Publishing** button on the page.

   ![Screenshot 2024-09-23 130823](https://github.com/user-attachments/assets/ce967db5-640a-4ddb-b584-7a7b9eb03883)

### Step 3: Play the Stream with LL-HLS

1. **Open a Video Player**

   We recommend using **[hls.js](https://hlsjs.video-dev.org/demo/)** or **[THEO Player](https://www.theoplayer.com/test-your-stream-hls-dash-hesp)** for initial testing and latency verification.

   - [hls.js demo player](https://hlsjs.video-dev.org/demo/)
   - [THEO Player](https://www.theoplayer.com/test-your-stream-hls-dash-hesp)
   - From AMS v2.12 onwards, the LL-HLS playabck is supported via AMS Embedded Player as well. To learn more about embedded web player, check [here](https://antmedia.io/docs/guides/playing-live-stream/embedded-web-player/).

2. **Enter the LL-HLS URL**

   In the player, enter the following URL to play the stream:

   ```https://yourserver.com:5443/live/streams/ll-hls/stream1/stream1__master.m3u8```

   ![Screenshot 2024-09-23 131202](https://github.com/user-attachments/assets/63bca3f6-0c71-4ba8-a8f7-5b8d8f56c24f)


   - Ensure two underscores (__) exist between the stream ID and `master.m3u8`.

   - **URL pattern:** ```https://{YOUR_SERVER}:{5443}/{APP}/streams/ll-hls/{STREAM_ID}/{STREAM_ID}__master.m3u8```

   - If you are using the Ant Media Server player, then the URL pattern would be as follows:

     `https://{YOUR_SERVER DOMAIN}:5443/{AppName}/play.html?name={streamId}&playOrder=ll-hls`

     You can test the LL-HLS playback via this [testing URL](https://test.antmedia.io:5443/24x7test/play.html?name=live_test&playOrder=ll-hls).


## Customize LL-HLS

You can fine-tune LL-HLS settings in the [Advanced section of the application settings](https://antmedia.io/docs/guides/configuration-and-testing/ams-application-configuration/#management-panel-settings) of the Ant Media Server web panel. These settings allow you to adjust the behavior of LL-HLS to meet specific needs, like controlling segment durations or playlist updates.

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

You can easily enable Low-Latency HLS (LL-HLS) on Ant Media Server with this guide. For a more detailed explanation of the LL-HLS and its related properties, check the [Low-latency HLS blogpost](https://antmedia.io/low-latency-hls-or-ll-hls/).

<br /><br />
---

<div align="center">
<h2> ⏩ LL-HLS – Streaming in the Fast Lane! 🏎️💨 </h2>
</div>

Congratulations! You've successfully **set up LL-HLS with Ant Media Server**. Your viewers can now enjoy live streams with **significantly reduced latency**, enhancing their real-time viewing experience. 
With LL-HLS, you've embraced a **modern streaming protocol** that balances performance and compatibility. Your content is now delivered faster, keeping your audience engaged and satisfied.

