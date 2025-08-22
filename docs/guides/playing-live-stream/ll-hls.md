---
title: LL-HLS Playback
description: Low Latency HLS (LL-HLS) Playback with Ant Media Server.
keywords: [LL-HLS playback, LL-HLS playback with Ant Media Server, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---

# Introduction

A low-latency HLS (LL-HLS) playback feature has been introduced in Ant Media Server version 2.11 and above. It allows you to stream with minimal latency (around 2–5 seconds), making it ideal for near-real-time streaming applications.

## What is LL-HLS?

**Low Latency HLS (LL-HLS)** is a streaming protocol designed to minimize latency in live streaming. Traditional HLS can have latency ranging from 8 to 12 seconds, while LL-HLS reduces this to around **2-5 seconds**.

LL-HLS achieves this by using smaller video segments (called **parts**) that allow the video player to start playback before an entire segment is completed.

### Key Differences: HLS vs. LL-HLS

| Standard HLS | Low Latency HLS (LL-HLS) |
| ------------ | ------------------------ |
|Latency: 8-12 secs | Latency: 2-5 secs |
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

1. **Access the WebRTC Publish Page**

   - Open the following URL in your browser: https://yourserver.com:5443/live/?streamId=stream1

   - Replace the domain with your Ant Media server's domain.

   - You can use `stream1` or any custom stream ID.

2. **Start Publishing the Stream**

   - Click the **Start Publishing** button on the page.

   ![Screenshot 2024-09-23 130823](https://github.com/user-attachments/assets/ce967db5-640a-4ddb-b584-7a7b9eb03883)

### Step 3: Play the Stream with LL-HLS

1. **Open a Video Player**

   - Use a player that supports LL-HLS, like THEO Player, AMS Player, or others.

     For this example, we are going to use [THEO Player](https://www.theoplayer.com/test-your-stream-hls-dash-hesp).

   - From AMS v2.12 onwards, the LL-HLS playabck is supported via AMS Embedded Player as well. To learn more about embedded web player, check [here](https://antmedia.io/docs/guides/playing-live-stream/embedded-web-player/).

2. **Enter the LL-HLS URL**

   In the player, enter the following URL to play the stream:

   ```https://yourserver.com:5443/live/streams/ll-hls/stream1/stream1__master.m3u8```

   ![Screenshot 2024-09-23 131202](https://github.com/user-attachments/assets/63bca3f6-0c71-4ba8-a8f7-5b8d8f56c24f)


   - Ensure two underscores (__) exist between the stream ID and `master.m3u8`.

   - **URL pattern:** ```https://{YOUR_SERVER}:{5443}/{APP}/streams/ll-hls/{STREAM_ID}/{STREAM_ID}__master.m3u8```

   - If you are using the Ant Media Server player, then the URL pattern would be as follows:

     `https://{YOUR_SERVER DOMAIN}:5443/AppName/play.html?name={streamId}&playOrder=ll-hls`

     You can test the LL-HLS playback via this [testing URL](https://test.antmedia.io:5443/24x7test/play.html?name=live_test&playOrder=ll-hls).


## Customize LL-HLS

You can fine-tune LL-HLS settings in the [Advanced section of the application settings](https://antmedia.io/docs/guides/configuration-and-testing/ams-application-configuration/#management-panel-settings) of the Ant Media Server web panel. These settings allow you to adjust the behavior of LL-HLS to meet specific needs, like controlling segment durations or playlist updates.

### Customization Parameters

1. **partTargetDurationMs**

The maximum duration of partial segments in milliseconds (recommended: **1002 ms**).

```js
"partTargetDurationMs": 1002
```

2. **targetDuration**

Target duration for media files (default: **10 seconds**). Lower values provide faster response times but increase server load.
```js
"targetDuration": 10
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

Timeout duration in seconds after which the segmenter pauses if no data is received (default: **0**, meaning no timeout).
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

### Apply Customization

To apply the above settings, add them under the **customSettings** section in the Ant Media Server application's Advanced settings:

```js
"customSettings": {
  "plugin.ll-hls": {
    "partTargetDurationMs": 1002,
    "targetDuration": 10,
    "slidingWindowEntries": 5,
    "deleteFiles": true,
    "program": false,
    "addDateTime": true,
    "receiveDataTimeout": 0,
    "exitOnReceiveDataTimeout": false,
    "fileCompleteCommand": "/path/to/script %P %F",
    "fileDeleteCommand": "/path/to/delete_script %P %F",
    "quiet": false
  }
}
```

You can easily enable Low-Latency HLS (LL-HLS) on Ant Media Server with this guide. For a more detailed explanation of the LL-HLS and its related properties, check the [Low-latency HLS blogpost](https://antmedia.io/low-latency-hls-or-ll-hls/).
