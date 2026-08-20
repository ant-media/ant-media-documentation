---
title: Periodic Stream Recording
description: This Periodic stream recording document shows you how to set it up and walks you through its key features so you can start capturing high-quality clips with minimal effort.
keywords: [Periodic Stream Recording, MP4 clips, Clip tool, Clip Capture, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 4
---

# Periodic Stream Recording

Periodic Stream Recording lets you capture short MP4 clips from a live stream without interrupting the broadcast — useful for saving highlights, generating snippets, or sharing quick moments with your audience, without editing a full-length recording down after the fact.

By the end of this guide, you'll have the Clip Creator plugin installed and be generating MP4 clips both automatically on a schedule and on demand via the REST API.

Ant Media Server's Enterprise Edition includes a range of plugins that extend the platform's capabilities. Periodic Stream Recording is powered by one of them — the [Clip Creator Plugin](https://github.com/ant-media/Plugins/tree/master/ClipCreatorPlugin) — which captures and converts HLS stream segments into MP4 files ready for distribution, without pausing or interrupting playback.

## What Periodic Stream Recording Does

- Automatically record and save short MP4 clips from live streams.
- Define how often clips are saved (e.g., every 10 minutes).
- Generate MP4 clips between two UTC timestamps for a given stream instantly on demand via a REST API.
- Avoid manual HLS segment merging and configurations.

This feature is powered by a plugin that captures and converts HLS stream segments into MP4 files ready for distribution.

## Installation Steps

#### 1. Install FFmpeg

This is required for segment-to-MP4 conversion.

```bash
sudo apt install ffmpeg
```

#### 2. Download the Plugin JAR File

Download the latest `clip-creator.jar` file from [Drive](https://drive.google.com/drive/folders/15s-dgsOpj3ybhmr2390UlBN62ftRlNLR?usp=drive_link) or build from the [official repository](https://github.com/ant-media/Plugins/tree/master/ClipCreatorPlugin).

#### 3. Place the Plugin in the Plugins Directory

```bash
sudo cp clip-creator.jar /usr/local/antmedia/plugins/
```

#### 4. Restart Ant Media Server

```bash
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

:::info
If the HLS list size is very big, then the old TS files will take time to be deleted. The shorter the window, the faster it will be removed from the server. So make sure that good amount of disk space is there.
:::

Plugin settings (advanced app settings → `customSettings`):

```json
"customSettings": {
    "plugin.clip-creator": {
        "enabled": true,
        "maxClipDurationSeconds": 21600,
        "mp4CreationIntervalSeconds": 60
    }
}
```

`mp4CreationIntervalSeconds`: By default, it is not enabled. If you want to get recordings automatically for every stream without any API call, use this setting. If not, you can remove it and enable the periodic recording via API as explained below.

`maxClipDurationSeconds`: (default `21600` = 6 h) is the hard upper bound on a single clip request. You can change it as per the requirement.


## REST API Endpoints

You can also control recording behavior via the REST API.

### 1. Start Periodic Clip Creation

Use this to **manually start periodic recording** with a custom interval.

- **POST** request:

  ```
  https://<DOMAIN_NAME>:5443/<APP_NAME>/rest/clip-creator/periodic-recording/<PERIOD_SECONDS>
  ```

- **curl** example:

  ```bash
  curl -X POST "https://<DOMAIN_NAME>:5443/<APP_NAME>/rest/clip-creator/periodic-recording/<PERIOD_SECONDS>" -H "Content-Type: application/json"
  ```

### 2. Create MP4 Clip On-Demand

```
POST /<APP_NAME>/rest/clip-creator/mp4/<STREAM_ID>/range
     ?startTimestamp=<UTC_MILLIS>
     &endTimestamp=<UTC_MILLIS>
     &returnFile=<true|false>
```

| Parameter | Required | Notes |
|---|---|---|
| `startTimestamp` | yes | UTC milliseconds since epoch, inclusive |
| `endTimestamp` | yes | UTC milliseconds since epoch, inclusive. Must be > start and not in the future |
| `returnFile` | no, default `false` | `false` returns JSON with the new vodId. `true` returns the MP4 file content directly |

#### Create a Clip Without Downloading It

```bash
curl -X POST "http://<DOMAIN_NAME>:5080/<APP_NAME>/rest/clip-creator/mp4/<STREAM_ID>/range?startTimestamp=1777829567000&endTimestamp=1777829587000&returnFile=false"
```

Response:
```json
{"success":true,"message":"MP4 created successfully for stream <STREAM_ID>","dataId":"abc123def456..."}
```

The MP4 lands at:

```
/usr/local/antmedia/webapps/<APP_NAME>/streams/<VOD_ID>.mp4
```

It's also registered as a VoD in the AMS database, so the standard `vodReady` webhook fires and the file appears in the VoD listing.

#### Create and Download a Clip Directly

```bash
curl -X POST -o clip.mp4 "http://<DOMAIN_NAME>:5080/<APP_NAME>/rest/clip-creator/mp4/<STREAM_ID>/range?startTimestamp=1777829567000&endTimestamp=1777829587000&returnFile=true"
```

Response headers include `X-vodId` and `Content-Disposition`.

### 3. Stop Periodic Clip Creation

To stop automatic periodic MP4 creation:

- **DELETE** request:

  ```
  https://<DOMAIN_NAME>:5443/<APP_NAME>/rest/clip-creator/periodic-recording
  ```

- **curl** example:

  ```bash
  curl -X DELETE "https://<DOMAIN_NAME>:5443/<APP_NAME>/rest/clip-creator/periodic-recording" -H "Content-Type: application/json"
  ```

## Validation Responses

| HTTP | Reason |
|---|---|
| `400` | `endTimestamp <= startTimestamp` |
| `400` | `endTimestamp` is in the future |
| `400` | Requested duration > `maxClipDurationSeconds` |
| `417` | No broadcast exists for the given stream ID |
| `417` | No segments found in range — typically the range is outside the HLS retention window (`hlsListSize × hlsTime`), or the stream had no data then |
| `200` | Success — JSON or MP4 body depending on `returnFile` |

## Notes

- Clip boundaries are aligned to HLS segment boundaries; the resulting MP4 may be shorter or longer than the requested window by up to one segment duration (~2 s with default settings).
- Range clips don't affect the periodic recorder if you have it enabled — the two are independent.
- Concurrent range requests serialize per web app. For typical orchestration cadences, this isn't an issue.

You now have Periodic Stream Recording running, capturing short clips automatically and on demand via the REST API.

## Need Help?

If clips aren't generating or a range request returns a `417`, confirm the requested time window actually falls inside your `hlsListSize`/`hlsTime` retention window, then reach out on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or contact [Technical Support](mailto:support@antmedia.io).

