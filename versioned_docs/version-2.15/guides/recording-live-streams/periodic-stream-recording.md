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
- Generate MP4 clips instantly on demand via a REST API.
- Avoid manual HLS segment merging and configurations.

This feature is powered by a plugin that captures and converts HLS stream segments into MP4 files ready for distribution.

## Installation Steps

#### 1. Install FFmpeg

This is required for segment-to-MP4 conversion.

```js
sudo apt install ffmpeg
```

#### 2. Download the Plugin JAR File

Download the latest `clip-creator.jar` file from [**Sonatype**](https://oss.sonatype.org/#nexus-search;gav~io.antmedia.plugin~clip-creator~~~).

#### 3. Place the Plugin in the Plugins Directory

```js
sudo cp clip-creator.jar /usr/local/antmedia/plugins/
```

#### 4. Restart Ant Media Server

```js
sudo service antmedia restart
```

## Configuration Guide

To make the Periodic Stream Recording work properly, you’ll need to adjust the App configuration:

#### 1. Enable HLS Streaming

Go to your application settings & make sure that [HLS is enabled](https://antmedia.io/docs/guides/playing-live-stream/hls-playing/#enable-hls).

#### 2. Set Playlist Type to "event"

Go to the Advanced Settings and set:

```js
"hlsPlayListType": "event",
```

#### 3. Set the Clip Recording Interval

Under **Advanced App Settings**, add the following in `customSettings`:

```js
"customSettings": {
  "plugin.clip-creator": {
    "mp4CreationIntervalSeconds": 600
  }
}
```

Replace `600` with your desired interval in seconds. For example, `1800` = 30 minutes.

## Clip Storage Location

Generated MP4 clips are saved under:

```js
/usr/local/antmedia/webapps/{AppName}/streams
```

Each clip is also registered as a **VoD entry** in the database.

## How the Periodic Recording Works

At each configured interval, Ant Media Server:

1. Locates the most recent segment in the `.m3u8` playlist.
2. Goes back by the specified number of seconds.
3. Captures that range of segments.
4. Converts them into a single MP4 file.

Clip duration = `mp4CreationIntervalSeconds`

## REST API Endpoints

You can also control recording behavior via REST API.

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

Trigger an MP4 clip generation instantly for a specific stream.

- **POST** request:

  ```js
  https://{SERVER}:{5443}/{APP}/rest/clip-creator/mp4/{STREAM_ID}?returnFile=true
  ```

- **CURL** Example:

  ```js
  curl -X POST "https://{YOUR_SERVER}:{5443}/{APP}/rest/clip-creator/mp4/{STREAM_ID}?returnFile=true" -H "Content-Type: application/json"
  ```

  If a periodic MP4 has already been created, this captures the clip from the last MP4 creation time to now.

-   `returnFile`: This parameter is set to false by default.

    -   `returnFile=true`: The server will create the MP4 immediately and return the file content as a response.
        
    -   `returnFile=false`: The server will return a JSON response indicating whether the VoD creation was successful. If successful, the response will include a dataId field containing the created vodId.
        

If there is an MP4 created by the plugin since boot, it returns the MP4 clip from the last MP4 creation time to the time of calling this REST endpoint.

For example, if the last MP4 is generated at 14:00 and the method is called at 14:05, the duration of the clip should be 5 minutes.

If there is no MP4 created so far by the plugin, the maximum duration of the clip created by this endpoint will be around ⁣`mp4CreationIntervalSeconds`.

### 3. Stop Periodic Clip Creation

To stop automatic periodic MP4 creation:

- **DELETE** request:

  ```js
  https://{SERVER}:{5443}/{APP}/rest/clip-creator/periodic-recording
  ```

- **CURL** example:

  ```js
  curl -X DELETE "https://{YOUR_SERVER}:{5443}/{APP}/rest/clip-creator/periodic-recording" -H "Content-Type: application/json"
  ```

## Webhook Notification

Webhooks can be used to get notified about the newly generated clips. Check out [this document](https://antmedia.io/docs/guides/advanced-usage/webhooks/) for Webhook.

Each time a new MP4 clip is created, a `vodReady` webhook is triggered, letting you know the clip is ready to be used.

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



