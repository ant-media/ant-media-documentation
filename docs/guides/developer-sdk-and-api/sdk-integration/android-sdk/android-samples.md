---
title: Android SDK Samples
description: Android SDK Samples 
keywords: [Android SDK User Guide, Android SDK Samples, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 5
---

The Andriod SDK has many ready-to-use samples under the `webrtc_android_sample_app` module  that can be used for different scenarios and use cases.

- The `webrtc_android_sample_app` module has three packages.

**1. Minimal**

This component has the simple publishcActivity which is the simplest Webrtc publish sample.

**2. Basic**

This component has several samples like publish activity, play activity, screen capture activity, conference activity, data channel only activity, peer activity, and settings.

**3. Advanced**

This component has samples for advanced cases like conference activity with speaker indicator, MP3 publish activity, MP4 publish activity, MP4 publish with surface activity, multi-track play activity, publish activity with you are speaking, and USB camera activity.

Let's explore how to get the Android SDK and experience the samples.

## Getting the Android SDK

The WebRTC Android SDK is free to download. You can download/clone it from [**Android SDK Github repository**](https://github.com/ant-media/WebRTC-Android-SDK).

- After you have downloaded/cloned the Android SDK, open it with the Android Studio.

- The samples are located under
  
```js
webrtc-android-sample-app > java > io.antmedia.webrtc_android_sample_app
```

To compile and build the SDK, we need to connect the Android studio to an Android mobile device. It can be a virtual device/emulator or a physical device. For this demonstration, I'm using a physical Android device.

## Run the WebRTC Android SDK
Now that we have the Android SDK, we will connect a mobile device to the Android studio and then run the SDK.

### Connecting the Android Device with Android Studio
- Connect your Android device to your system and switch to the **developer mode**.
- Go to developer options and **enable USB debugging**.
- In the Android Studio application, you will see your mobile device name which shows that it is connected.

![connected-device-01](https://github.com/user-attachments/assets/86a5433c-736a-4992-a942-f217d2fee6ab)


### Run the SDK
- Click on run to build the SDK.

![run-sdk-02](https://github.com/user-attachments/assets/042b2e65-81a3-443d-b613-0302dbc5c73a)


- Once the build is successful, the webrtc Android sample app will be launched on your Android device.

![launching-app-03](https://github.com/user-attachments/assets/d7d840dc-bca6-4223-bc1f-bfbc1daec2af)


- On your mobile device, you can see all the samples under the Ant Media WebRTC Sample App.

![samples-04-new](https://github.com/user-attachments/assets/e8135ebd-b0ed-4e07-bcdc-9a6c0d557fcc)


## WebRTC Android SDK Samples
The samples are divided into three categories, Minimal, Basic, and Advanced. We will discuss some of these samples here. Feel free to explore all the samples as you may require.

### Settings
Under settings, you need to pass your Ant Media Server websocket URL and the Room Name (in case of a conference).
- All the stream samples that you publish/play will be carried from this Ant Media Server only.

![settings-06](https://github.com/user-attachments/assets/7796a559-d152-4771-b612-2c0ba41215e1)

### Publish Activity 
This sample can be used to publish WebRTC streams and it also has a data channel function embedded in this sample.

![publish-sample-07](https://github.com/user-attachments/assets/eb8aa1de-fab2-4efa-b4b4-824ab33d23e4)

To verify whether the stream is published successfully or not, open the web panel of your Ant Media Server (e.g., http://server_ip:5080) and view the stream there.

- You can also quickly play the stream via the [embedded player](https://antmedia.io/docs/guides/playing-live-stream/embedded-web-player/).

### Play Activity
This sample is to play WebRTC stream and like the publish activity, it also has the data channel function embedded.

![play-sample-08](https://github.com/user-attachments/assets/7bc4b6df-2b2f-4c74-b7c9-046797cc580e)

### Conference Activity
The conference activity sample can be used for video conference calls. 

It can also be used to join in Play Only mode as well and has enable/disable audio and video.

![conference-sample-09](https://github.com/user-attachments/assets/4ce7fe1b-6564-4eb9-a36e-87c5440b9f23)

### Screen Share Activity
This sample activity demonstrates how to share screens with the WebRTC Android sample app.

![screen-share-010](https://github.com/user-attachments/assets/172c39ed-c0ef-459c-ba2c-c7cd22f9f0cb)

It has three variations, Screen, Front camera, and Rear camera.

![screen-variations-011](https://github.com/user-attachments/assets/87bc2b09-9998-449b-9283-b9cea1c2db79)


### Data Channel Only Activity
The data channel is another channel in WebRTC other than video and audio. In the data channel, you can send any kind of information to the other clients. Data channels can be utilized in various use cases including chat, control messages, or file sharing.

- To use the data channel, please make sure that it is [enabled on the application settings](https://antmedia.io/docs/guides/publish-live-stream/webrtc/data-channel/#enabling-the-data-channel).

![data-channel-012](https://github.com/user-attachments/assets/1e7f631e-7f4a-4b4a-afd2-676320297e84)


### Stats Activity
This sample page includes Webrtc publish and shows the various audio and video stats of the published stream when `Show Stats` is called.

![stats-013](https://github.com/user-attachments/assets/e7110d62-311f-4c92-887c-93e003020b4e)

### Conference with Speaking Indicator Activity
This is also a conference sample and it indicates when a speaker is speaking.

![speaker-014](https://github.com/user-attachments/assets/c4ac309e-810b-46db-b937-fad1af1b9e07)

### Publish with Are You Speaking Activity
This is also an example of a publishing activity that flashes `Are you Speaking` in case the speaker is speaking but the microphone is muted.

### Peer Activity
The includes a sample for peer-to-peer cases. In peer-to-peer, the Ant Media Server is only a signaling server to establish the connection. Video and Audio are not relayed through the Ant Media Server.

![peer-015](https://github.com/user-attachments/assets/98257707-181a-4643-9a02-e5b84dd1d416)

:::info
There are many more samples included with the Android SDK like USB Camera, mp3, mp4, mp4 with Surface, and Multi Track activity, etc. which you can check according to your use.

