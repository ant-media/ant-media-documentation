---
title: Force Encode
description: Control whether Ant Media Server re-transcodes a rendition when the publish resolution already matches an ABR profile.
keywords: [Force Encode, forceEncode, ABR, transcoding, Ant Media Server Documentation]
sidebar_position: 4
sidebar_label: Force Encode
---

# Force Encode

`forceEncode` controls whether the server **always transcodes** each ABR profile, even when the incoming stream already matches that resolution.

:::info
Force Encode behavior described on this page applies to **HLS** playback today. Use HLS to verify playlist changes after adjusting `forceEncode`.
:::

By default, with profiles such as 1080p and 720p enabled, a 1080p RTMP publish can produce **two** 1080p entries in the HLS master playlist—the original mux (`streamId.m3u8`) and a transcoded 1080p variant (`streamId_1080p2500kbps.m3u8`)—which uses extra CPU.

From **Ant Media Server 2.14.0**, set `forceEncode: false` on a profile to skip re-encoding when the source already matches that height.

:::info
- If `forceEncode` is `false` for **all** profiles but the source is **higher** than any enabled height, lower renditions are still transcoded; the original is included.
- If the source is **lower** (for example 480p) and all `forceEncode` values are `false`, the server does not upscale. Set `forceEncode: true` on higher profiles when you need every ladder step regardless of source resolution.
:::

## Configure forceEncode

### 1. Enable ABR profiles

In application settings, enable the ladder you need—for example 1080p, 720p, and 480p.

### 2. Set forceEncode per profile

In **Application Settings → Advanced**, adjust `encoderSettings`. Example: do not force 1080p; still transcode 720p and 480p:

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

### 3. Publish and compare HLS playlists

Publish RTMP or SRT at 1080p and play via HLS.

#### With default forceEncode (1080p transcoded again)

When `forceEncode` is `true` for 1080p, the server transcodes 1080p again even though the publisher already sends 1080p. That is why the playlist lists **two** 1080p variants—the original ingest and the transcoded profile.

This adds CPU load and can cause HLS issues: the original and transcoded 1080p streams may use different keyframe intervals, bitrates, or other encoding settings, so players may struggle when switching between them.

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

#### With `forceEncode: false` for 1080p

With `forceEncode: false` at 1080p, the server does **not** create a second transcoded 1080p when the source is already 1080p. The original publish is used for that rung (`streamId.m3u8`), and only 720p and 480p are transcoded—saving CPU and avoiding a duplicate 1080p entry.

```bash
#EXTM3U
#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=1178152,RESOLUTION=854x480,CODECS="avc1.42e00a,mp4a.40.2"
test_480p1000kbps.m3u8
#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=2269472,RESOLUTION=1280x720,CODECS="avc1.42e00a,mp4a.40.2"
test_720p2000kbps.m3u8
#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=2419440,RESOLUTION=1920x1080,CODECS="avc1.42e00a,mp4a.40.2"
test.m3u8
```

:::warning Original vs transcoded encoding
The original mux (`streamId.m3u8`) is still included in the playlist when `addOriginalMuxerIntoHLSPlaylist` is `true` (default). It often uses different keyframe interval or other encoding parameters than transcoded renditions. That mismatch can cause playback or quality-switching issues in HLS.

If you see such problems, set `addOriginalMuxerIntoHLSPlaylist` to `false` and add the resolutions you need as ABR profiles so every playlist entry is transcoded with consistent settings. See [Include the original stream in HLS playlists](/guides/adaptive-bitrate/adaptive-bitrate-streaming/#include-the-original-stream-in-hls-playlists).
:::

Use `forceEncode` to cut redundant HLS transcodes when publish resolution already matches a profile—especially on high rungs of the ladder.
