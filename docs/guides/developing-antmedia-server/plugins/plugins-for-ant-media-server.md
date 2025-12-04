---
title: Plugins for Ant Media Server 
description: Ant Media Community Contributions for Ant Media Plugins.
keywords: [Plugins for Ant Media Server, Ant Media Server Documentation, Ant Media Server Tutorials, Community Plugins for Ant Media Server, Add-ons for Ant Media Server]
sidebar_position: 11
---

## TODO:
- This document is to be reworked into multiple different documents

---

# Plugins for Ant Media Server

Community members and our team have contributed several plugins that can be used with Ant Media Server. These plugins allow you to extend AMS functionality and serve as inspiration for building your own custom solutions.

### Filter Plugin

Ant Media Server includes a built-in filtering plugin since v2.4.0.2. The Filter Plugin enables real-time audio and video manipulation on the server side. Its primary use is for the MCU, which combines video and audio into a single stream for conference rooms.

Read more in this [blog post](https://antmedia.io/mcu-conference/).

To modify the MCU layout or build the Filter Plugin, check [here](https://github.com/ant-media/Plugins/tree/master/FilterPlugin).

For additional examples of real-time audio and video manipulation, see this [blog post](https://antmedia.io/discover-the-filter-plugin/).

### TensorFlow Plugin

The TensorFlow plugin allows for detecting and recognizing objects in a stream. Build and deploy the TensorFlow plugin by following the instructions[here](https://github.com/ant-media/Plugins/tree/master/TensorflowPlugin).

### Zixi Plugin

The Zixi Broadcaster is the central component of the Zixi Video Network. It accepts streams from the Zixi Feeder and processes them, allowing transcoding, transmuxing, recording, and distribution to any device, anywhere, in multiple bitrates and protocols.

Learn more about deploying Zixi with Ant Media Server [here](https://github.com/ant-media/Plugins/tree/master/ZixiPlugin).


### Low-Latency HLS (LL-HLS) Plugin

LL-HLS, available from AMS v2.11+, reduces live stream latency to 2–5 seconds versus 8–12 seconds for traditional HLS. It uses smaller video parts, enabling playback before segments finish. This is a paid plugin offered by Ant Media Server.

For details, visit [here](https://antmedia.io/docs/guides/playing-live-stream/ll-hls/).

### HLS Merger Plugin

The HLSMerger plugin combines multiple HLS streams into a single unified output, ideal for multi-camera setups or dynamic scene switches. It synchronizes `.m3u8` playlists and segments to offer a seamless viewing experience. Supported from AMS v2.6.2 onward.

More details about the HLS Merger Plugin are available [here](https://antmedia.io/supercharge-hls-streaming-with-hlsmerger-plugin/).

### Media Push Plugin

The Media Push Plugin, introduced in AMS v2.8.1, records live streams or conferences. It joins a session as a "play-only participant," captures streams displayed on a web page, and saves the merged output as a VOD file. Ideal for recording single sessions or customized layouts with tools like Circle.

Setup instructions are available [here](https://antmedia.io/docs/guides/recording-live-streams/media-push-plugin/).

### Clip Creator Plugin

The Clip Creator Plugin is an open-source plugin that generates MP4 files from HLS segments. It helps capture parts of a live stream at intervals or on-demand and save them as MP4 clips.

Learn more and configure the plugin via the [Clip Creator blog](https://antmedia.io/capture-mp4-clips-with-ant-media-clip-creator-plugin/).

- To explore more recent plugins developed for Ant Media Server, visit the [Ant Media Marketplace](https://antmedia.io/marketplace/).

## Congratulations!

With these plugins, you can extend Ant Media Server in numerous ways—from low-latency streaming to AI-powered object recognition, recording, and multi-stream HLS merging. Whether you want to customize the user experience, implement new streaming protocols, or create automated workflows, the plugin ecosystem gives you the flexibility to innovate without touching the core server code. Your server is now ready for next-level functionality!