---
title: Android SDK Samples
description: Android SDK Samples 
keywords: [Android SDK User Guide, Android SDK Samples, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 5
---

The Android SDK comes with many ready-to-use samples under the `webrtc_android_sample_app` module. These samples demonstrate different use cases and scenarios for WebRTC streaming.

- The `webrtc_android_sample_app` module has three packages:

**1. Minimal**

* Contains the simplest `PublishActivity`, a minimal WebRTC publish sample.

**2. Basic**

* Includes multiple samples: `publish activity`, `play activity`, `screen capture activity`, `conference activity`, `data channel only activity`, `peer activity`, and `settings`.

**3. Advanced**

- Provides samples for more complex use cases: conference activity with speaker indicator, MP3 publish activity, MP4 publish activity, MP4 publish with surface activity, multi-track play activity, publish activity with “Are You Speaking”, and USB camera activity.

## Getting the Android SDK

The WebRTC Android SDK is free to download. You can download or clone it from the [**Android SDK Github repository**](https://github.com/ant-media/WebRTC-Android-SDK).

After downloading/cloning:

1. Open the project in Android Studio.

2. Navigate to the samples:

```js
webrtc-android-sample-app > java > io.antmedia.webrtc_android_sample_app
```

3. Connect an Android device to your computer — either an emulator or a physical device. For this guide, a physical device is used.

## Run the WebRTC Android SDK

### Connecting the Android Device
1. Connect your Android device and enable **Developer Mode**.
2. Enable **USB Debugging** in the developer options.
3. In Android Studio, your connected device will appear in the device selector.

![connected-device-01](https://github.com/user-attachments/assets/86a5433c-736a-4992-a942-f217d2fee6ab)


### Build and Launch the SDK

1. Click Run to build the project.

![run-sdk-02](https://github.com/user-attachments/assets/042b2e65-81a3-443d-b613-0302dbc5c73a)


2. Once the build completes, the **WebRTC Android Sample App** will launch on your device.

![launching-app-03](https://github.com/user-attachments/assets/d7d840dc-bca6-4223-bc1f-bfbc1daec2af)


3. On your device, you will see all the available sample activities:

![samples-04-new](https://github.com/user-attachments/assets/e8135ebd-b0ed-4e07-bcdc-9a6c0d557fcc)


## WebRTC Android SDK Samples Overview

### Settings

* Enter your **Ant Media Server WebSocket URL** and **Room Name** (for conferences).

* All streams published or played by the samples will connect to this server.

![settings-06](https://github.com/user-attachments/assets/7796a559-d152-4771-b612-2c0ba41215e1)

### Publish Activity

* Publishes WebRTC streams and includes a **data channel**.

* Verify the stream via the **Ant Media Server web panel** or the [embedded player](https://antmedia.io/docs/guides/playing-live-stream/embedded-web-player/). 

![publish-sample-07](https://github.com/user-attachments/assets/eb8aa1de-fab2-4efa-b4b4-824ab33d23e4)


### Play Activity

* Plays WebRTC streams and also supports the **data channel**.

![play-sample-08](https://github.com/user-attachments/assets/7bc4b6df-2b2f-4c74-b7c9-046797cc580e)

### Conference Activity

Supports multi-user video conferences.

Includes **Play Only mode** and allows enabling/disabling audio and video.

![conference-sample-09](https://github.com/user-attachments/assets/4ce7fe1b-6564-4eb9-a36e-87c5440b9f23)

### Screen Share Activity

* Demonstrates screen sharing via WebRTC.

* Supports Screen, Front Camera, and Rear Camera sources.

![screen-share-010](https://github.com/user-attachments/assets/172c39ed-c0ef-459c-ba2c-c7cd22f9f0cb)


![screen-variations-011](https://github.com/user-attachments/assets/87bc2b09-9998-449b-9283-b9cea1c2db79)


### Data Channel Only Activity

* Sends arbitrary data between clients over WebRTC.

* Useful for **chat**, **control messages**, or **file sharing**.

* Ensure the data channel is enabled in the [application settings](https://antmedia.io/docs/guides/publish-live-stream/webrtc/data-channel/#enabling-the-data-channel).


![data-channel-012](https://github.com/user-attachments/assets/1e7f631e-7f4a-4b4a-afd2-676320297e84)


### Stats Activity

* Displays **audio and video stats** for published streams.

![stats-013](https://github.com/user-attachments/assets/e7110d62-311f-4c92-887c-93e003020b4e)

### Conference with Speaking Indicator Activity

* Indicates which participant is currently speaking.

![speaker-014](https://github.com/user-attachments/assets/c4ac309e-810b-46db-b937-fad1af1b9e07)

### Publish with “Are You Speaking”

* Shows a warning if the speaker is muted but talking.

### Peer Activity

* Demonstrates peer-to-peer connections.

* Ant Media Server is used only for signaling; audio/video is sent directly between peers.

![peer-015](https://github.com/user-attachments/assets/98257707-181a-4643-9a02-e5b84dd1d416)

:::info
Additional samples include USB Camera, MP3, MP4, MP4 with Surface, and Multi-Track activities.
:::

## Congratulations

You now have access to the full set of WebRTC Android SDK samples.

* You can explore minimal, basic, and advanced use cases.

* You can publish and play streams, run conferences, share screens, and experiment with data channels.

* With these examples, you can quickly build your own custom streaming Android applications.
