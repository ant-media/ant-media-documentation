---
title: Adaptive Bitrate Streaming
description: Achieve Adaptive Bitrate Streaming with Ant Media Server to enable smooth streaming at Low Bandwith or on Unstable Network. Offer option to your users to switch based on their device, network or bandwidth.
keywords: [Adaptive Bitrate Streaming, ABS Streaming, Switch stream among 1080p to 720p, Switch stream among 720p to 480p, Ant Media Server Documentation, Ant Media Server Tutorials]
---
# Adaptive Bitrate Streaming

Adaptive Bitrate Streaming, also known as dynamic adaptive streaming or multi-bitrate streaming, allows you to deliver optimal video quality based on the network bandwidth between the viewer and the media server. This ensures smooth video playback regardless of the viewer's internet connection speed or device.

## Why use adaptive bitrate

As more people access the internet and consume video content, internet connection speeds can vary, causing issues with video playback. Slow internet connections may prevent high-quality video streaming, leading to buffering and interruptions for viewers.

![](@site/static/img/buffering.jpg)

To enhance user experience, service providers create lower-resolution versions of videos to allow seamless playback, even under poor network conditions. Adaptive streaming eliminates buffering and enables smooth playback by adjusting the video quality to match the viewer's available bandwidth.

![](@site/static/img/AP658325161480_131.jpg)

## Adaptive bitrate on the fly

While reducing video resolutions for recorded streams is straightforward, achieving the same outcome for live streams is more challenging. Fortunately, Ant Media Server supports adaptive bitrate streaming in its Enterprise Edition, enabling live streams to be played using WebRTC and HLS (HTTP Live Streaming).

![](@site/static/img/HLSsegmentedvideodelivery.png)

## How WebRTC & HLS adaptive streaming works

Ant Media Server supports adaptive streaming in both WebRTC and HLS formats. However, there is a slight difference in how adaptive streaming is implemented between the two:
- In WebRTC, Ant Media Server measures the viewer's bandwidth and selects the best quality based on that measurement.
- In HLS, the player determines its bandwidth and requests the best quality from the server.

## How to enable adaptive bitrate

### From the dashboard

- Go to Applications > Settings > Adaptive Bitrate in the Ant Media Server dashboard
- Enable adaptive streaming and add new streams.
![](@site/static/img/adaptive-streaming/adaptive.png)

Note:
Adaptive streaming dynamically adjusts the streaming rate and video quality based on the device's bandwidth and CPU capacity. As a result, it may increase CPU load. Therefore, it is recommended to Enable GPU for Ant Media Server in such use cases where transcoding is required.

> Quick Link: [Learn How to Enable GPU for Ant Media Server](/guides/advanced-usage/using-nvidia-gpu/)

![](@site/static/img/iosmediacaptureresolutions.png)

### Using configuration file

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

The format of the file is as follows: resolution height, video bitrate per second, and audio bitrate per second. In the example above, we are adding two adaptive bitrates:

1.  360p, 800Kbps video bitrate, 64Kbps audio bitrate
2.  240p, 500Kbps video bitrate, 32Kbps audio bitrate

- Save the changes and close the file.
- Restart Ant Media Server by running the command:
```shell
sudo service antmedia restart
```

### Stats Based Adaptive Bitrate switching
Starting from Ant Media Server version 2.6.0, we have introduced [Stats Based Adaptive Bitrate switching](https://github.com/orgs/ant-media/discussions/5267). By default, the settings `settings.statsBasedABREnabled` property is set to `true`, enabling this feature.

Additionally, there is another property `settings.useOriginalWebRTCEnabled` that affects the streaming behavior when adaptive bitrate settings are in place. Here's how it works:
- If `settings.useOriginalWebRTCEnabled` is set to true, the original WebRTC stream is used for streaming. When an adaptive bitrate setting is present, this allows for multiple bitrates to be available for playback. For example, if the adaptive bitrate includes 480p and the incoming stream is 720p, enabling this setting will provide two bitrates for playing 720p and 480p.
- On the other hand, if `settings.useOriginalWebRTCEnabled` is set to false, only one bitrate will be available for playback, which corresponds to the 480p resolution.
