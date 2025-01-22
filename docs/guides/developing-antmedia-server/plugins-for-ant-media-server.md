---
title: Plugins for Ant Media Server 
description: Ant Media Community Contributions for Ant Media Plugins.
keywords: [Plugins for Ant Media Server, Ant Media Server Documentation, Ant Media Server Tutorials, Community Plugins for Ant Media Server, Add-ons for Ant Media Server]
sidebar_position: 11
---

# Plugins for Ant Media Server

Community as well as our team contributed Ant Media with some plugins as listed below that can be used with the Ant Media Server. You may extend Ant Media Server as we tried with plugins, you may refer and inspire from the referenced repositories.

### Filter Plugin

Ant Media Server has been released with a built-in filtering plugin since v2.4.0.2. The Filter Plugin lets you perform real-time audio and video manipulation on the server side. The MCU, which allows you to combine video and audio into a single stream for a conference room, is the main application of the filter plugin. You may read more in this [](https://antmedia.io/mcu-conference/)[blog post](https://antmedia.io/mcu-conference/)[](https://antmedia.io/mcu-conference/).

To change the MCU layout or build the filter plugin, please check [here](https://github.com/ant-media/Plugins/tree/master/FilterPlugin).

For more examples of real-time audio and video manipulation, check out this [blog post](https://antmedia.io/discover-the-filter-plugin/).

### TensorFlow Plugin

The Tensorflow plugin project is for detecting and recognizing objects in a stream. To build and deploy the TensorFlow plugin, check **[](https://github.com/ant-media/Plugins/tree/master/TensorflowPlugin)**[](https://github.com/ant-media/Plugins/tree/master/TensorflowPlugin)[here](https://github.com/ant-media/Plugins/tree/master/TensorflowPlugin)[](https://github.com/ant-media/Plugins/tree/master/TensorflowPlugin)**[](https://github.com/ant-media/Plugins/tree/master/TensorflowPlugin)**.

### Zixi Plugin

The Zixi Broadcaster is the central component of the Zixi Video Network. It accepts video streams from the Zixi Feeder and processes them, allowing transcoding, transmuxing, recording, and distribution to any device, anywhere, in multiple bit rates and protocols.  

For more details about the deployment and use of Zixi Broadcaster with the Ant Media Plugin, check [here](https://github.com/ant-media/Plugins/tree/master/ZixiPlugin).


### Low-Latency HLS (LL-HLS) Plugin

LL-HLS, available from AMS v2.11+, reduces live stream latency to 2–5 seconds compared to the 8–12 seconds of traditional HLS. It uses smaller video parts, enabling playback before segments finish. LL-HLS achieves this by using smaller video segments (called parts) that allow the video player to start playback before an entire segment is completed and it is a **paid plugin** offered by the Ant Media Server.

For more details about LL-HLS plugin, visit [here](https://antmedia.io/docs/guides/playing-live-stream/ll-hls/)

### HLS Merger Plugin

The HLSMerger plugin in Ant Media Server combines multiple HLS streams into a single, unified output, ideal for scenarios like multi-camera setups or dynamic scene switches. It synchronizes .m3u8 playlists and segments, offering a seamless viewing experience. Supported from version 2.6.2 onward, it enhances streaming workflows efficiently. 

For More details about the HLS Merger Plugin, visit [here](https://antmedia.io/supercharge-hls-streaming-with-hlsmerger-plugin/)

### Media Push Plugin

The Media Push Plugin, introduced in Ant Media Server v2.8.1, enables recording of live streams or conferences. It operates by joining a session as a "play-only participant," capturing the streams displayed on a configured webpage, and saving the merged output as a VOD file. This is ideal for creating single recordings of conference sessions or customized layouts using tools like Circle or custom webpages.

For setup instructions and more details about the plugin, visit [here](https://antmedia.io/docs/guides/recording-live-streams/media-push-plugin/)

Know More about recent plugins developed, kindly visit [Ant Media Marketplace](https://antmedia.io/marketplace/).
