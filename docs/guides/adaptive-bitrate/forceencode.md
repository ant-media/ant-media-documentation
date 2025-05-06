---
title: Force Encode
description: Force Encode in ABR streaming
keywords: [Adaptive Bitrate Streaming, ABR, multi-bitrate streaming, live stream quality switching, on demand transcoding]
sidebar_position: 4
---

## Force Encode

ForceEncode is a feature of Adaptive Bitrate Streaming that transcodes all resolutions on the server by default.

By default, if two ABRs are enabled, such as 1080p and 720p, and the user publishes the RTMP stream in 1080p, the HLS will include all three resolutions, including the original one, resulting in two 1080p, including the transcoded one.

This increases the server overhead by transcoding the 1080p resolution again, which consumes a significant amount of CPU resources.

Force encoding can now be disabled for enabled ABRs starting with Ant Media Server v3.0. This will help to save the server resources and provide better flexibility.

Let us go through this step by step:

### Step-1:

Enable three ABRs in application settings: 1080p, 720p and 480p.

### Step-2:

Go to the advanced application settings, and make the **forceEncode** false for the 1080p in the below property:

```js
 "encoderSettings": [
    {
      "height": 1080,
      "videoBitrate": 2500000,
      "audioBitrate": 256000,
      "forceEncode": false
    },
    {
      "height": 720,
      "videoBitrate": 2000000,
      "audioBitrate": 128000,
      "forceEncode": true
    },
    {
      "height": 480,
      "videoBitrate": 1000000,
      "audioBitrate": 96000,
      "forceEncode": true
    }
  ]
```

### Step-3:

Now publish the RTMP or SRT stream with 1080p to the server and play the stream with HLS.

Now, as per default behavior, it transcodes the 1080p again and both the original and the transcoded resolutions are included in the HLS.

```bash
#EXTM3U
#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=1074408,RESOLUTION=854x480,CODECS="avc1.42e00a,mp4a.40.2"
test_480p1000kbps.m3u8
#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=2108256,RESOLUTION=1280x720,CODECS="avc1.42e00a,mp4a.40.2"
test_720p2000kbps.m3u8
#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=2234496,RESOLUTION=1920x1080,CODECS="avc1.42e00a,mp4a.40.2"
test.m3u8
#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=2739616,RESOLUTION=1920x1080,CODECS="avc1.42e00a,mp4a.40.2"
test_1080p2500kbps.m3u8
```

Since we disabled the forceEncode for the 1080p, it will not transcode the stream to 1080p again, and only the original resolution will be added to the HLS other than 720p and 480p.

```bash
#EXTM3U
#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=1178152,RESOLUTION=854x480,CODECS="avc1.42e00a,mp4a.40.2"
test_480p1000kbps.m3u8
#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=2269472,RESOLUTION=1280x720,CODECS="avc1.42e00a,mp4a.40.2"
test_720p2000kbps.m3u8
#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=2419440,RESOLUTION=1920x1080,CODECS="avc1.42e00a,mp4a.40.2"
test.m3u8
```

:::info
- If the forceEncode is false for all enabled ABRs and the incoming resolution is higher than the enabled resolutions, then still lower resolutions will be transcoded to have multiple ABRs, including the original one.
- If the incoming resolution is low like 480p and forceEncode is false for all enabled ABRs, then the server will not transcode to higher resolutions. But if the forceEncode is true, then all resolutions will be forced to transcode.
:::

Using this feature allows you to save bandwidth and resources.
