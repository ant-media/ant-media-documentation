---
title: Plugin Architecture
description: How Ant Media Server plugins integrate with the media pipeline.
keywords: [Ant Media Server Plugin Architecture, Ant Media Server Documentation]
sidebar_position: 2
sidebar_label: Architecture
---

# Plugin Architecture

Plugins intercept media data as it flows through AMS. You implement `IFrameListener` (decoded frames) or `IPacketListener` (encoded packets), process the data, and optionally return modified output.

![](@site/static/img/developer-guides/plugin-data-flow.png)

Once you understand these patterns, proceed to [Develop a Plugin](/guides/developer-sdk-and-api/plugins/developing-plugins/).

## Use cases

### Asynchronous processing

The plugin receives a frame, processes it on a separate thread, and returns the **same** frame unchanged. AMS continues the pipeline without waiting.

Example: statistics collection.

![](@site/static/img/developer-guides/async-plugin.png)

### Synchronous processing

The plugin modifies the frame on the caller thread and returns the **manipulated** frame.

Example: watermark overlay.

![](@site/static/img/developer-guides/sync-plugin.png)

### Last point (terminal)

The plugin consumes the frame and returns **null**. No further plugins or server processing receives that frame.

Example: custom protocol output or frame recording only.

![](@site/static/img/developer-guides/last-point-plugin.png)

### First point (custom broadcast)

The plugin ingests frames from an external source and feeds them into AMS via [CustomBroadcast](/guides/developer-sdk-and-api/plugins/developing-plugins/#custom-broadcast-api). AMS then publishes through WebRTC, HLS, or DASH.

Example: proprietary ingest protocol.

![](@site/static/img/developer-guides/custom-broadcast.png)

## Interfaces

| Interface | Data type | Typical use |
|-----------|-----------|-------------|
| `IFrameListener` | Decoded video frames (`AVFrame`) | Filters, watermarks, AI inference |
| `IPacketListener` | Encoded packets | Bitstream-level processing |
| `CustomBroadcast` | Inbound source | Custom ingest protocols |

## Next step

[Develop a Plugin](/guides/developer-sdk-and-api/plugins/developing-plugins/) — API reference, then [Build Your First Plugin](/guides/developer-sdk-and-api/plugins/build-first-plugin/) for a hands-on walkthrough.
