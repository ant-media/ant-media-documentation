---
title: Plugins Overview
description: Extend Ant Media Server with plugins for transcoding, AI, DRM, recording, and custom media processing.
keywords: [Ant Media Server Plugins, Plugin System, Ant Media Server Documentation]
sidebar_position: 0
sidebar_label: Overview
---

# Plugins

Plugins extend Ant Media Server without modifying core source code. Drop a JAR into the `plugins` directory, restart the server, and AMS loads your module into the media pipeline.

## What plugins can do

| Capability | Example |
|------------|---------|
| **Process video/audio frames** | Add watermarks, filters, or statistics collection (Filter plugin) |
| **AI / computer vision** | Run custom Python models on live streams (Python AI plugin) |
| **DRM protection** | Encrypt HLS/DASH output (DRM plugin) |
| **Recording & clipping** | Media Push, Clip Creator plugins |
| **Protocol extensions** | Ingest from custom sources via CustomBroadcast |
| **Custom REST endpoints** | Add Spring controllers inside a plugin |

Built-in features such as Filter, DRM, and LL-HLS were implemented as plugins.

## Integration path

1. [Install a plugin](/guides/developer-sdk-and-api/plugins/getting-started/) — copy JAR, set permissions, restart
2. [Browse available plugins](/guides/developer-sdk-and-api/plugins/plugins-for-ant-media-server/) — Filter, DRM, LL-HLS, and more
3. [Understand architecture](/guides/developer-sdk-and-api/plugins/plugin-architecture/) — data flow and use cases
4. [Develop a plugin](/guides/developer-sdk-and-api/plugins/developing-plugins/) — API reference
5. [Build your first plugin](/guides/developer-sdk-and-api/plugins/build-first-plugin/) — hands-on tutorial

## Plugin directory

Default path: `/usr/local/antmedia/plugins`

Community and official plugins: [Ant Media Marketplace](https://antmedia.io/marketplace/) · [Plugins GitHub](https://github.com/ant-media/Plugins)

:::info
Back up server configuration and data before installing new plugins.
:::
