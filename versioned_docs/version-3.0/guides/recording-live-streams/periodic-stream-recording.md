---
title: Periodic Stream Recording
description: This Periodic stream recording document shows you how to set it up and walks you through its key features so you can start capturing high-quality clips with minimal effort.
keywords: [Periodic Stream Recording, MP4 clips, Clip tool, Clip Capture, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 7
---

# Periodic Stream Recording in Ant Media

Ant Media Server now supports **Periodic Stream Recording**, a powerful feature that lets you **capture short MP4 clips** from your live streams —without interrupting the broadcast. It’s perfect for saving highlights, generating snippets, or sharing quick moments with your audience.

### How Does the Periodic Stream Recording Function Work?

Ant Media Server’s **Enterprise Edition** includes a range of flexible **plugins** that allow you to extend the platform’s capabilities with ease. One such plugin, the [**Clip Creator Plugin**](https://github.com/ant-media/Plugins/tree/master/ClipCreatorPlugin), enables Periodic Stream Recording, allowing you to easily extract and save short MP4 clips from ongoing live broadcasts without pausing or interrupting playback.

## What is Periodic Stream Recording?

Periodic Stream Recording allows you to:

- Automatically record and save short MP4 clips from live streams.
- Define how often clips are saved (e.g., every 10 minutes).
- Generate MP4 clips between two UTC timestamps for a given stream instantly on demand via a REST API.
- Avoid manual HLS segment merging and configurations.

This feature is powered by a plugin that captures and converts HLS stream segments into MP4 files ready for distribution.

## Installation Steps

#### 1. Install FFmpeg

This is required for segment-to-MP4 conversion.

```js
sudo apt install ffmpeg
```

#### 2. Download the Plugin JAR File

Download the latest `clip-creator.jar` file from [**Sonatype**](https://oss.sonatype.org/#nexus-search;gav~io.antmedia.plugin~clip-creator~~~) or build from the [official repository](https://github.com/ant-media/Plugins/tree/master/ClipCreatorPlugin).

#### 3. Place the Plugin in the Plugins Directory

```js
sudo cp clip-creator.jar /usr/local/antmedia/plugins/
```

#### 4. Restart Ant Media Server

```js
sudo service antmedia restart
```

## Configuration Guide

To make the Periodic Stream Recording work properly, you’ll need to adjust the Application configuration from the [Application's advanced settings](https://docs.antmedia.io/guides/configuration-and-testing/ams-application-configuration/#management-panel-application-settings):

| Setting | Value | Purpose |
|---|---|---|
| `hlsMuxingEnabled` | `true` | Enable HLS |
| `hlsPlayListType` | empty (live mode) | **Not** `event` - `event` disables segment cleanup |
| `hlsListSize` | `43200` | Retention window in segments. At `hlsTime=2`, this is 24 hours. Tune to your desired window |
| `hlsTime` | `2` | Segment duration in seconds |
| `hlsflags` | `delete_segments+program_date_time` | AMS default — both flags required |

- ffmpeg automatically deletes old `.ts` files and prunes the m3u8 to the configured window. No manual cleanup needed.


Plugin settings (advanced app settings → `customSettings`):
```json
"customSettings": {
    "plugin.clip-creator": {
        "enabled": true,
        "maxClipDurationSeconds": 21600
    }
}
```
`maxClipDurationSeconds` (default `21600` = 6 h) is the hard upper bound on a single clip request.


## REST API Endpoints

You can also control recording behavior via the REST API.

### 1. Start Periodic Clip Creation

Use this to **manually start periodic recording** with a custom interval.

- **POST** request:

  ```js
  https://{SERVER}:{5443}/{APP}/rest/clip-creator/periodic-recording/{periodSeconds}
  ```

- **CURL** Example:

  ```js
  curl -X POST "https://{YOUR_SERVER}:{5443}/{APP}/rest/clip-creator/periodic-recording/{periodSeconds}" -H "Content-Type: application/json"
  ```

### 2. Create MP4 Clip On-Demand

```
POST /{appName}/rest/clip-creator/mp4/{streamId}/range
     ?startTimestamp={utcMillis}
     &endTimestamp={utcMillis}
     &returnFile={true|false}
```

| Parameter | Required | Notes |
|---|---|---|
| `startTimestamp` | yes | UTC milliseconds since epoch, inclusive |
| `endTimestamp` | yes | UTC milliseconds since epoch, inclusive. Must be > start and not in the future |
| `returnFile` | no, default `false` | `false` returns JSON with the new vodId. `true` returns the MP4 file content directly |

#### Get JSON with the vodId, then read the file from disk
```bash
curl -X POST "http://your-server:5080/live/rest/clip-creator/mp4/myStreamId/range?startTimestamp=1777829567000&endTimestamp=1777829587000&returnFile=false"
```

Response:
```json
{"success":true,"message":"MP4 created successfully for stream myStreamId","dataId":"abc123def456..."}
```

The MP4 lands at:
```
/usr/local/antmedia/webapps/{appName}/streams/{dataId}.mp4
```

It is also registered as a VoD in the AMS database, so the standard `vodReady` webhook fires and the file appears in the VoD listing.

#### Download the MP4 directly
```bash
curl -X POST -o clip.mp4 \
  "http://your-server:5080/live/rest/clip-creator/mp4/myStreamId/range?startTimestamp=1777829567000&endTimestamp=1777829587000&returnFile=true"
```

Response headers include `X-vodId` and `Content-Disposition`.

### 3. Stop Periodic Clip Creation

To stop automatic periodic MP4 creation:

- **DELETE** request:

  ```js
  https://{SERVER}:{5443}/live/rest/clip-creator/periodic-recording
  ```

- **CURL** example:

  ```js
  curl -X DELETE "https://{YOUR_SERVER}:{5443}/live/rest/clip-creator/periodic-recording" -H "Content-Type: application/json"
  ```
  
## 4. Validation responses

| HTTP | Reason |
|---|---|
| `400` | `endTimestamp <= startTimestamp` |
| `400` | `endTimestamp` is in the future |
| `400` | Requested duration > `maxClipDurationSeconds` |
| `417` | No broadcast exists for the given streamId |
| `417` | No segments found in range — typically the range is outside the HLS retention window (`hlsListSize × hlsTime`), or the stream had no data then |
| `200` | Success — JSON or MP4 body depending on `returnFile` |

## 5. Notes

- Clip boundaries are aligned to HLS segment boundaries; the resulting MP4 may be shorter or longer than the requested window by up to one segment duration (~2 s with default settings).
- Range clips do not affect the periodic recorder (if you have it enabled). The two are independent.
- Concurrent range requests serialize per webapp. For typical orchestration cadences, this is not an issue.

<br /><br />
---

<div align="center">
<h2> 🎬 Periodic Clips: Highlights Captured! ⏱️ </h2>
</div>

You've successfully configured **Periodic Stream Recording in Ant Media Server**. Now, your live streams are 
- Automatically capturing short MP4 clips at regular intervals
- Allowing you to save highlights
- Generate snippets
- Share quick moments with your audience

With seamless integration into your workflow, this feature enhances your content creation process without interrupting the broadcast.
