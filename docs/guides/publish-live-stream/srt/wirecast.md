---
title: Wirecast
description: SRT Ingest using Wirecast
keywords: [SRT Ingest using Wirecast, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---

# SRT Ingest using Wirecast

Wirecast is a live video streaming production tool by Telestream. It allows users to create live or on-demand broadcasts for the web. Wirecast supports various sources for capturing, such as webcams, IP cameras, NDIs, and capture cards.

- Some encoders, like **Wirecast do not have support for streamId**.
- There are also many IP cameras that support SRT output but do not support streamId.

- Starting from **version 2.8.0, Ant Media Server supports SRT without streamId**.
- In this scenario, the enocder/camera IP address will behave like streamId and it will be published to the **LiveApp** application by default.

## Create a Stream With Wirecast

To create a stream with Wirecast, it is first necessary to add a source.

- Move your cursor to the **Clear Layer** and Click on the **+ icon** to add a source.

  ![](@site/static/img/publish-live-stream/srt/add-scene.png)

- You can choose the source type based on your use case. For this demonstration, I'm adding a VoD as **Media File**.

  **Media File >> Browse Disk >> Add**

  ![](@site/static/img/publish-live-stream/srt/add-media.png)

- Navigate to **Output >> Output Settings** from the Menu bar.

  ![](@site/static/img/publish-live-stream/srt/output-settings.png)

- Under **Destination**, choose **SRT** and proceed.

  ![](@site/static/img/publish-live-stream/srt/destination-srt.png)

- Enter your Ant Media Server URL under **Address** in the format ```srt://server-url/``` and **Port** 4200

  ![](@site/static/img/publish-live-stream/srt/server-url.png)

### Customizing the Stream Parameters

If you want to change any parameters like stream resolution, bitrate, profile type, etc., you can do so by changing the **Encoding Settings**. 

- Click on the Gear icon next to Encoding and go to **View Details**.
  ![](@site/static/img/publish-live-stream/srt/encoding-settings.png)

- You can set the video and audio encoding parameters as you may need.

  ![](@site/static/img/publish-live-stream/srt/settings.png)


:::info
It's important to set the Profile type Baseline for WebRTC play.
:::


## Starting the SRT Stream

Now that, everything is set, let's proceed to push the SRT stream.

- Click on the **right arrow icon** to select the source of the video and it will be reflected in the Live Broadcast Area.

  ![](@site/static/img/publish-live-stream/srt/select-source.png)

- Go to the **Output >> Start/Stop Broadcasting >> Start SRT** to start pushing the SRT stream to your Ant Media Server.

  ![](@site/static/img/publish-live-stream/srt/start-stop.png)

- Navigate to LiveApp application of your Ant Media Server Management Panel and you can see the SRT stream.

- Your system IP Address is used as the streamId.

  ![](@site/static/img/publish-live-stream/srt/srt-stream.png)

- Congratulations, your SRT stream is live.

## Playing The Stream

- Ant Media Server supports various play protocols like WebRTC, CMAF (Dash), and HLS.

- To learn how to play a stream, check the [Playing Live Streams](https://antmedia.io/docs/category/playing-live-streams/) guide.
