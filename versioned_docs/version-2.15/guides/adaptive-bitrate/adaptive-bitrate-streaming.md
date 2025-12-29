---
title: Adaptive Bitrate Streaming (ABR)
description: Learn how to set up Adaptive Bitrate Streaming (ABR) in Ant Media Server using the REST API. Provide a smooth playback experience for all users, regardless of their network conditions.
keywords: [Adaptive Bitrate Streaming, ABR, multi-bitrate streaming, live stream quality switching, Ant Media Server API, Ant Media Server ABR setup, WebRTC ABR, HLS ABR]
sidebar_position: 1
---

# Adaptive Bitrate Streaming (ABR)

Adaptive Bitrate Streaming (ABR) enables Ant Media Server to automatically adjust video quality based on each viewer's network speed and device performance. By dynamically switching resolutions and bitrates, ABR ensures a seamless streaming experience with minimal buffering — whether your audience is on high-speed fiber or a weak mobile connection.

## Why Adaptive Bitrate Streaming Matters

Internet users have varying connection speeds, from fast broadband to congested mobile networks. Without ABR, viewers with limited bandwidth may suffer from long buffering times, playback interruptions, or the inability to watch your streams at all.

![](@site/static/img/buffering.jpg)

With ABR:

- Viewers get best possible quality based on available bandwidth.
- Automatic switching happens behind the scenes, improving engagement and reducing viewer drop-off.
- Smooth playback is ensured even during network fluctuations.

![](@site/static/img/AP658325161480_131.jpg)


## How ABR Works in Ant Media Server

Ant Media Server supports ABR for all playback protocols such as **WebRTC** and **HLS** streaming.

| Protocol | ABR Behavior |
|----------|--------------|
| **WebRTC** | Ant Media Server dynamically monitors viewer bandwidth and selects the optimal stream. |
| **HLS** | The player evaluates available bandwidth and requests the most suitable bitrate from the server. |

![](@site/static/img/HLSsegmentedvideodelivery.png)


## How to Enable Adaptive Bitrate Streaming

You can enable ABR from your Ant Media application settings:

- Go to Applications **>** Settings **>** Adaptive Bitrate in the Ant Media Server dashboard
- Enable adaptive streaming and add the desired resolutions and bitrates. 

![](@site/static/img/adaptive-streaming/dashboardABR.png)

- Save the settings.
- Add new streams or restart the running streams.


## Broadcast-Level ABR Configuration

As of **Ant Media Server 2.8.3**, you can configure ABR settings at the **broadcast level**. This means each stream can have its own customized ABR profiles, offering more granular control.

### Rest API Endpoint

Here is the [Create Broadcast API](https://antmedia.io/rest/#/default/createBroadcast) to add ABRs on the broadcast level.

**Curl Sample:**

The following example sets ABR profiles for a stream with ID `stream1`:

```bash
curl --location 'https://domainName:5443/live/rest/v2/broadcasts/create' \
--header 'Content-Type: application/json' \
--data '{ "name": "test",
  "streamId": "test",
  "encoderSettingsList": [
    {"videoBitrate": 500000, "forceEncode": true, "audioBitrate": 32000, "height": 240},
    {"videoBitrate": 2000000, "forceEncode": true, "audioBitrate": 128000, "height": 720},
    {"videoBitrate": 2500000, "forceEncode": true, "audioBitrate": 256000, "height": 1080}
  ]
}'
```

:::info
- The `encoderSettingsList` array defines each ABR profile.
- Each profile consists of:
  - `height`: The vertical resolution (e.g., 240 = 240p).
  - `videoBitrate`: The target video bitrate in bits per second.
  - `audioBitrate`: The target audio bitrate in bits per second.
  - `forceEncode`: Forces transcoding even when the source stream resolution matches the profile.
:::

## Stats-Based Adaptive Bitrate Switching

Starting with **Ant Media Server v2.6.0**, you can enable **Stats-Based ABR Switching** to automatically adjust stream quality based on real-time bandwidth statistics gathered during the session.

By default:
- `settings.statsBasedABREnabled = true`

This means that **WebRTC viewers** will automatically receive the best possible resolution according to their available bandwidth, without the need for manual stream switching.

#### How does it work?

- The server continuously monitors the viewer's network stats.
- Based on this data, it automatically switches between available ABR profiles (e.g., from 720p to 480p) to ensure smooth playback.


## Original WebRTC or HLS Stream Behavior with ABR

- These settings decide whether the original incoming stream should be included among the ABR renditions: `useOriginalWebRTCEnabled` for **WebRTC**, and `addOriginalMuxerIntoHLSPlaylist` for **HLS**.
- By default,
   - **WebRTC original is excluded (false)**,
   - **HLS original is included (true)**.
     

  ```js
  "useOriginalWebRTCEnabled": false,
  ```

  ```js
  "addOriginalMuxerIntoHLSPlaylist": true,
  ```

### Behavior:

- **`true`:**
   - Both the original incoming stream and all transcoded ABR profiles are available for playback.
   - Example: Incoming stream at 720p with ABR profiles for 480p and 240p → viewers can select between **720p**, **480p**, and **240p**.
  
- **`false`:**
   - Only the ABR transcoded streams are available (original resolution is excluded from playback).
   - Example: Same as above → viewers will only see **480p** and **240p**.

### Why does this matter?

- Enabling the original stream alongside ABR profiles provides maximum flexibility to the player.
- Disabling it can reduce bandwidth usage if you only want viewers to consume the optimized ABR renditions.

## Best Practices

When using **ABR**, it’s recommended to:

- Offer at least **2-3 ABR profiles** to provide fallback options for unstable networks.
- Consider enabling **GPU acceleration** if you plan to transcode into multiple profiles (to reduce CPU load).
- Regularly monitor your viewer bandwidth stats via Ant Media’s monitoring tools to fine-tune ABR settings.

In order to use GPU for heavy ABR streaming, [Learn How to Enable GPU for Ant Media Server](/guides/advanced-usage/using-nvidia-gpu/).

<br /><br />
---

<div align="center">
<h2> 📶 Smooth Streams, Smart Switching — Welcome to ABR Season! 🔄 </h2>
</div>

You’ve enabled **Adaptive Bitrate Streaming**, so your viewers now get the best resolution possible for their connection — no more buffering nightmares. Custom ABR profiles + stats-based switching = streams that adapt on the fly.

Your streaming game is now polished, resilient, and **ready for any network curveball!** 🚀

