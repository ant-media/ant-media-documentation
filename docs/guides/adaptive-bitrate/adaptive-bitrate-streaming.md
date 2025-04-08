---
title: Adaptive Bitrate Streaming (ABR)
description: Learn how to set up Adaptive Bitrate Streaming (ABR) in Ant Media Server using the REST API. Provide a smooth playback experience for all users, regardless of their network conditions.
keywords: [Adaptive Bitrate Streaming, ABR, multi-bitrate streaming, live stream quality switching, Ant Media Server API, Ant Media Server ABR setup, WebRTC ABR, HLS ABR]
sidebar_position: 1
---

# Adaptive Bitrate Streaming (ABR)

Adaptive Bitrate Streaming (ABR) enables Ant Media Server to automatically adjust video quality based on each viewer's network speed and device performance. By dynamically switching resolutions and bitrates, ABR ensures a seamless streaming experience with minimal buffering — whether your audience is on high-speed fiber or a weak mobile connection.

---

## Why Adaptive Bitrate Streaming Matters

Internet users have varying connection speeds, from fast broadband to congested mobile networks. Without ABR, viewers with limited bandwidth may suffer from long buffering times, playback interruptions, or the inability to watch your streams at all.

![](@site/static/img/buffering.jpg)

With ABR:
- Viewers always get the best possible quality for their network.
- Automatic switching happens behind the scenes, improving engagement and reducing viewer drop-off.
- Smooth playback is ensured even during network fluctuations.

![](@site/static/img/AP658325161480_131.jpg)

---

## How ABR Works in Ant Media Server

Ant Media Server supports ABR for both **WebRTC** and **HLS** streaming:

| Protocol | ABR Behavior |
|----------|--------------|
| **WebRTC** | Ant Media Server dynamically monitors viewer bandwidth and selects the optimal stream. |
| **HLS** | The player evaluates available bandwidth and requests the most suitable bitrate from the server. |

![](@site/static/img/HLSsegmentedvideodelivery.png)

---

## How to Enable Adaptive Bitrate Streaming

### Recommended: From the dashboard

You can enable ABR from your Ant Media application settings:
- Go to Applications > Settings > Adaptive Bitrate in the Ant Media Server dashboard
- Enable adaptive streaming and add the needed resolutions.

![](@site/static/img/adaptive-streaming/dashboardABR.png)

- Save the settings.
- Add new steams or restart the running streams.

###  Using configuration file

To enable adaptive bitrate streaming in Ant Media Server from the [application configuration file](https://antmedia.io/docs/guides/configuration-and-testing/ams-application-configuration/), follow these steps:

- Go to the application configuration file
```js
usr/local/antmedia/webapps/<AppName>/WEB-INF/red5-web.properties
```
- Edit the file using your favorite text editor
```js
sudo nano red5-web.properties
```
- Now, add this line to the file: 
```js
settings.encoderSettingsString=[
  {
    "videoBitrate":800000,
    "forceEncode":true,
    "audioBitrate":64000,
    "height":360},
    {
      "videoBitrate":500000,
      "forceEncode":true,
      "audioBitrate":32000,
      "height":240
    }
]
```

In the example above, we have added two adaptive bitrates:

1.  360p, 800Kbps video bitrate, 64Kbps audio bitrate
2.  240p, 500Kbps video bitrate, 32Kbps audio bitrate

- Save the changes and close the file.
  
- Restart Ant Media Server by running the command:
  ```js
  sudo service antmedia restart
  ```

## Broadcast-Level ABR Configuration

Since **Ant Media Server 2.8.3**, you can configure ABR settings at the **broadcast level**. This means each stream can have its own customized ABR profiles, offering more granular control.

### API Endpoint

> [Update Broadcast API Reference](https://antmedia.io/rest/#/BroadcastRestService/updateBroadcast)

### Example Request

The following example sets ABR profiles for a stream with ID `stream1`:

```bash
curl --location --request PUT 'http://<SERVER_ADDRESS>:5080/WebRTCAppEE/rest/v2/broadcasts/stream1' \
--header 'Content-Type: application/json' \
--data '{
  "encoderSettingsList": [
    {"videoBitrate": 500000, "forceEncode": true, "audioBitrate": 32000, "height": 240},
    {"videoBitrate": 2000000, "forceEncode": true, "audioBitrate": 128000, "height": 720},
    {"videoBitrate": 2500000, "forceEncode": true, "audioBitrate": 256000, "height": 1080}
  ]
}'
```

### Notes:
- The `encoderSettingsList` array defines each ABR profile.
- Each profile consists of:
  - `height`: The vertical resolution (e.g., 240 = 240p).
  - `videoBitrate`: The target video bitrate in bits per second.
  - `audioBitrate`: The target audio bitrate in bits per second.
  - `forceEncode`: Ensures transcoding happens even if the incoming stream matches the target resolution.

---

## Stats-Based Adaptive Bitrate Switching

Starting with **Ant Media Server v2.6.0**, you can enable **Stats-Based ABR Switching** to automatically adjust stream quality based on real-time bandwidth statistics gathered during the session.

By default:
- `settings.statsBasedABREnabled = true`

This means that **WebRTC viewers** will automatically receive the best possible resolution according to their available bandwidth, without the need for manual stream switching.

### How does it work?

- The server continuously monitors the viewer's network stats.
- Based on this data, it automatically switches between available ABR profiles (e.g., from 720p to 480p) to ensure smooth playback.

---

## Original WebRTC Stream Behavior with ABR

There is an additional setting that influences how the original WebRTC stream is handled when ABR profiles are configured:

- `settings.useOriginalWebRTCEnabled`

### Behavior:
- **`true`:**
  - Both the original incoming WebRTC stream and all transcoded ABR profiles are available for playback.
  - Example: Incoming stream at 720p with ABR profiles for 480p and 240p → viewers can select between **720p**, **480p**, and **240p**.
  
- **`false`:**
  - Only the ABR transcoded streams are available (original resolution is excluded from playback).
  - Example: Same as above → viewers will only see **480p** and **240p**.

### Why does this matter?

- Enabling the original stream alongside ABR profiles provides maximum flexibility to the player.
- Disabling it can reduce bandwidth usage if you only want viewers to consume the optimized ABR renditions.

---

## Best Practices

- When using **ABR**, it’s recommended to:
  - Offer at least **2-3 ABR profiles** to provide fallback options for unstable networks.
  - Consider enabling **GPU acceleration** if you plan to transcode into multiple profiles (to reduce CPU load).
  - Regularly monitor your viewer bandwidth stats via Ant Media’s monitoring tools to fine-tune ABR settings.

> Need GPU help? [Learn How to Enable GPU for Ant Media Server](/guides/advanced-usage/using-nvidia-gpu/)

---
