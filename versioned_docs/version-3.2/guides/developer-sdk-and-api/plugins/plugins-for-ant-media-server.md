---
title: Available Plugins
description: Official and community plugins for Ant Media Server.
keywords: [Plugins for Ant Media Server, Ant Media Server Documentation]
sidebar_position: 5
sidebar_label: Available Plugins
---

# Available Plugins

Official and community plugins extend AMS with transcoding, AI, DRM, recording, and protocol features. Install any plugin using the [Getting Started](/guides/developer-sdk-and-api/plugins/getting-started/) guide.

Browse more at the [Ant Media Marketplace](https://antmedia.io/marketplace/).

## Plugin catalog

| Plugin | Purpose | Details |
|--------|---------|---------|
| **Filter** | Real-time audio/video processing | Built-in since v2.4.0.2 · [Filter plugin guide](https://antmedia.io/discover-the-filter-plugin/) |
| **Python AI** | Run custom Python AI models on live streams | [Python AI plugin guide](https://antmedia.io/integrate-your-ai-into-live-streams-with-python-plugin/) |
| **DRM** | Widevine, FairPlay, PlayReady via CPIX | [DRM guide](/guides/drm-integration/drm-plugin/) |
| **LL-HLS** | Low-latency HLS (2–5 s vs 8–12 s) | AMS v2.11+ · [LL-HLS guide](/guides/playing-live-stream/ll-hls/) |
| **Media Push** | Record live streams/conferences as VOD | AMS v2.8.1+ · [Media Push guide](/guides/recording-live-streams/media-push-plugin/) |
| **Clip Creator** | Generate MP4 clips from HLS segments | [Blog](https://antmedia.io/capture-mp4-clips-with-ant-media-clip-creator-plugin/) |
| **HLS Merger** | Combine multiple HLS streams into one output | AMS v2.6.2+ · [Blog](https://antmedia.io/supercharge-hls-streaming-with-hlsmerger-plugin/) |
| **Zixi** | Zixi protocol ingest and distribution | [GitHub](https://github.com/ant-media/Plugins/tree/master/ZixiPlugin) |

## Filter Plugin

The Filter plugin enables server-side audio and video manipulation on live streams — overlays, scaling, text, logo insertion, and FFmpeg-based filters.

Setup and examples: [Real-Time Audio/Video Manipulation with Filter Plugin](https://antmedia.io/discover-the-filter-plugin/)

## Python AI Plugin

Run your own Python AI models on live video without building a separate ingestion pipeline. Includes examples for face detection, YOLO object detection, and pose detection. Processed output is available as HLS with detection data via REST API.

Setup and examples: [Python AI Plugin guide](https://antmedia.io/integrate-your-ai-into-live-streams-with-python-plugin/)

## DRM Plugin

Add DRM to HLS and DASH output using the CPIX API. Supports Widevine, FairPlay, and PlayReady.

Full setup: [DRM Plugin guide](/guides/drm-integration/drm-plugin/)

## LL-HLS Plugin

Reduces HLS latency to 2–5 seconds using smaller video parts. Commercial plugin (AMS v2.11+).

Setup: [LL-HLS guide](/guides/playing-live-stream/ll-hls/)

## Media Push Plugin

Joins a session as a play-only participant, captures the displayed layout, and saves it as VOD. Works with Circle and custom web layouts.

Setup: [Media Push guide](/guides/recording-live-streams/media-push-plugin/)

## Clip Creator Plugin

Generate MP4 files from HLS segments on a schedule or on demand.

Setup: [Clip Creator blog](https://antmedia.io/capture-mp4-clips-with-ant-media-clip-creator-plugin/)

## HLS Merger Plugin

Merge multiple HLS streams into one synchronized output — useful for multi-camera setups.

Details: [HLS Merger blog](https://antmedia.io/supercharge-hls-streaming-with-hlsmerger-plugin/)

## Zixi Plugin

Integrate Zixi Broadcaster for transcoding, transmuxing, recording, and multi-protocol distribution.

Details: [ZixiPlugin repo](https://github.com/ant-media/Plugins/tree/master/ZixiPlugin)

## Develop your own

Use these plugins as reference implementations. See [Develop a Plugin](/guides/developer-sdk-and-api/plugins/developing-plugins/) to build custom functionality.
