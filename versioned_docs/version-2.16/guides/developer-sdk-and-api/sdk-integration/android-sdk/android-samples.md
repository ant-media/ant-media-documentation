---
title: Samples
sidebar_label: Samples
description: Run and explore the Ant Media WebRTC Android sample app—publish, play, conference, and more.
keywords: [Android SDK User Guide, Android SDK Samples, Ant Media Server Documentation]
sidebar_position: 5
---

# Android SDK Samples

The [WebRTC Android SDK](https://github.com/ant-media/WebRTC-Android-SDK) includes a sample app module (`webrtc-android-sample-app`) with ready-made activities for common streaming scenarios.

## Sample packages

| Package | Contents |
|---------|----------|
| **Minimal** | Simplest `PublishActivity` for a basic WebRTC publish |
| **Basic** | Publish, play, screen capture, conference, data channel only, peer, and settings |
| **Advanced** | Conference with speaker indicator, MP3/MP4 publish, multi-track play, “Are You Speaking”, USB camera, and similar |

## Get the sample app

1. Clone or download the [Android SDK repository](https://github.com/ant-media/WebRTC-Android-SDK).
2. Open the project in Android Studio.
3. Open the samples under `webrtc-android-sample-app > java > io.antmedia.webrtc_android_sample_app`.
4. Connect an Android emulator or a physical device (USB debugging enabled).

## Build and launch

1. Select your device in Android Studio’s device selector.

![connected-device-01](https://github.com/user-attachments/assets/86a5433c-736a-4992-a942-f217d2fee6ab)

2. Click **Run** to build and install the sample app.

![run-sdk-02](https://github.com/user-attachments/assets/042b2e65-81a3-443d-b613-0302dbc5c73a)

3. When the app opens, you see the list of sample activities.

![launching-app-03](https://github.com/user-attachments/assets/d7d840dc-bca6-4223-bc1f-bfbc1daec2af)

![samples-04-new](https://github.com/user-attachments/assets/e8135ebd-b0ed-4e07-bcdc-9a6c0d557fcc)

## Configure Settings

Open **Settings** in the sample app and enter:

**WebSocket URL** — your Ant Media Server application endpoint:

| Protocol | Example | When to use |
|----------|---------|-------------|
| **WSS** | `wss://your-domain:5443/live/websocket` | Production — requires [SSL](/guides/installing-on-linux/setting-up-ssl/) (port **5443**) |
| **WS** | `ws://your-ip:5080/live/websocket` | Local HTTP without SSL (port **5080**) |

Replace `live` with your application name.

**Room name** — required for conference samples.

All publish, play, and other sample activities use this connection.

![settings-06](https://github.com/user-attachments/assets/7796a559-d152-4771-b612-2c0ba41215e1)

## Sample activities

### Publish

Publishes a WebRTC stream (with data channel support). Verify the stream in the Ant Media Server web panel or with the [embedded web player](/guides/playing-live-stream/embedded-web-player/).

![publish-sample-07](https://github.com/user-attachments/assets/eb8aa1de-fab2-4efa-b4b4-824ab33d23e4)

### Play

Plays a WebRTC stream and supports the data channel.

![play-sample-08](https://github.com/user-attachments/assets/7bc4b6df-2b2f-4c74-b7c9-046797cc580e)

### Conference

Multi-user video conference. Includes play-only mode and toggles for audio and video.

![conference-sample-09](https://github.com/user-attachments/assets/4ce7fe1b-6564-4eb9-a36e-87c5440b9f23)

### Screen share

Shares the device screen over WebRTC. Switch between screen, front camera, and rear camera.

![screen-share-010](https://github.com/user-attachments/assets/172c39ed-c0ef-459c-ba2c-c7cd22f9f0cb)

![screen-variations-011](https://github.com/user-attachments/assets/87bc2b09-9998-449b-9283-b9cea1c2db79)

### Data channel only

Sends arbitrary data between clients. Enable the data channel in [application settings](/guides/publish-live-stream/webrtc/data-channel/#enable-data-channel).

![data-channel-012](https://github.com/user-attachments/assets/1e7f631e-7f4a-4b4a-afd2-676320297e84)

### Stats

Shows audio and video stats for published streams.

![stats-013](https://github.com/user-attachments/assets/e7110d62-311f-4c92-887c-93e003020b4e)

### Conference with speaking indicator

Highlights which participant is speaking.

![speaker-014](https://github.com/user-attachments/assets/c4ac309e-810b-46db-b937-fad1af1b9e07)

### Publish with “Are You Speaking”

Warns when the mic is muted but the user is speaking.

### Peer

Peer-to-peer mode: AMS handles signaling only; media goes directly between peers.

![peer-015](https://github.com/user-attachments/assets/98257707-181a-4643-9a02-e5b84dd1d416)

:::info
The Advanced package also includes USB camera, MP3/MP4 publish, MP4 with surface, and multi-track play activities.
:::

## Demo video

<iframe width="560" height="315" src="https://www.youtube.com/embed/aqMPGiF6YIw?si=0OWHopmyx1glwIYE" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
