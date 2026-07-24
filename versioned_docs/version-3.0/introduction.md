---
title: Introduction
slug: /
description: Ant Media Server is a self-hosted live streaming platform for ultra-low latency WebRTC, adaptive HLS/DASH, and large-scale delivery. Start here to understand the platform and choose your path.
keywords: [Ant Media Server, WebRTC streaming, live streaming server, ultra-low latency, HLS, clustering]
sidebar_position: 1
sidebar_label: Introduction to Ant Media Server
---

# Introduction to Ant Media Server

**Ant Media Server (AMS)** is a self-hosted live streaming platform for ultra-low latency WebRTC, adaptive HLS/DASH delivery, and large-scale audience reach. Run it on your own infrastructure—on-premises, in air-gapped environments, or on public cloud—so you control ingest, transcoding, security, and playback end to end.

AMS is built for **developers** integrating streaming into apps, **platform teams** deploying and scaling production workloads, and **organizations** that need full control over their video stack without vendor lock-in.

## How Ant Media Server works

Publishers push live video into AMS. The server ingests, optionally transcodes for adaptive bitrate, then delivers streams to players at the latency your use case needs.

![Ant Media Server architecture: publishers to Ant Media Server to players](/img/ams-architecture.svg)

### Key concepts

- **Applications** — Isolated streaming contexts, each with its own settings, sample pages, and configuration. See [Applications](/dashboard-features/) in the Dashboard Features guide.
- **Publish and play** — Ingest live streams from encoders, cameras, or SDKs, then deliver to browsers and devices. Start with [Publish Live Streams](/category/publish-live-streams/) and [Play Live Streams](/category/play-live-streams/).
- **Standalone vs cluster** — Run a single server for development and small deployments, or scale horizontally with clustering for thousands of concurrent publishers and viewers. See [Clustering and Scaling](/category/clustering-and-scaling/).

## Choose your path

| I want to… | Go to |
| --- | --- |
| Install AMS in minutes | [Quick Start](./quick-start) |
| Explore the web panel | [Dashboard Features](/dashboard-features/) |
| Run Enterprise in production | [Enterprise Deployment Hub](/enterprise-guide/) |
| Build a mobile or web app | [Developer Guides](/category/developer-guides/) |
| Deploy at scale | [Clustering and Scaling](/category/clustering-and-scaling/) |
| Secure streams | [Stream Security](/category/stream-security/) |
| Compare editions | [Community and Enterprise Edition comparison](#community-and-enterprise-edition-comparison) |

:::tip
New to streaming? Start with [Quick Start](./quick-start), then explore [Dashboard Features](/dashboard-features/) to publish and play your first stream.
:::

## Core capabilities

- **Latency modes** — WebRTC (~500 ms with Enterprise Edition), LL-HLS/LL-DASH, and standard HLS/DASH for large audiences
- **Ingest** — WebRTC, RTMP, SRT, RTSP, WHIP, and NDI (beta)
- **Codecs** — H.264, H.265, VP8, and AV1. See [Video Codecs](./guides/configuration-and-testing/video-codec/) for details.
- **Deployment** — Linux, Docker, and Kubernetes; available on AWS, Azure, GCP, and other cloud marketplaces
- **SDKs** — JavaScript, iOS, Android, Flutter, React Native, and Unity

AMS is available in two editions:

- **Community Edition** — Open-source streaming server for standard streaming and development workloads.
- **Enterprise Edition** — Advanced platform with ultra-low latency delivery, adaptive bitrate streaming, clustering, GPU acceleration, enterprise security, and professional support.

## Solutions and use cases

- **IP camera streaming** — Stream and monitor ONVIF IP cameras with ultra-low latency. [Docs](./guides/publish-live-stream/ip-camera-and-stream-source/stream-sources) · [Solutions](https://antmedia.io/solutions/ip-camera-streaming/)
- **Webinars and video conferencing** — Scalable real-time audio and video with sub-second latency. [Conference](/category/conference/) · [Solutions](https://antmedia.io/solutions/webinar-e-learning-virtual-classroom/)
- **Mobile streaming applications** — Build apps with AMS APIs and SDKs for Android, iOS, Flutter, and React Native. [SDK Integration](/category/sdk-integration/)
- **Media and entertainment** — Real-time game shows and interactive live experiences. [Solutions](https://antmedia.io/solutions/media-entertainment/)
- **E-sports and gaming** — Ultra-low latency streams for competitive gaming and betting. [Solutions](https://antmedia.io/solutions/video-game-streaming/)
- **Live auctions and bidding** — Sub-second latency to keep bids synchronized in real time. [Solutions](https://antmedia.io/solutions/auction-bidding/)
- **Telehealth** — Secure real-time video for consultations and remote care. [Solutions](https://antmedia.io/solutions/telehealth/)
- **Live shopping** — Interactive shopping experiences with ultra-low latency. [Solutions](https://antmedia.io/solutions/live-shopping/)
- **Online education** — Virtual classrooms and remote training with real-time engagement. [Webinar guide](./guides/webinar/webinar-usage) · [Solutions](https://antmedia.io/solutions/webinar-e-learning-virtual-classroom/)
- **AI-powered video streaming** — Integrate custom AI models into live streams with the Python AI Plugin. [Learn more](https://antmedia.io/integrate-your-ai-into-live-streams-with-python-plugin/)

## Community and Enterprise Edition comparison

Choose **Community Edition** for open-source development, RTMP/HLS workflows, and getting started at no cost. Choose **Enterprise Edition** when you need WebRTC playback, clustering, GPU encoding, adaptive bitrate transcoding, advanced stream security, or commercial support.

:::info
Install either edition with the commands in [Quick Start](./quick-start). Community Edition is free from [GitHub Releases](https://github.com/ant-media/Ant-Media-Server/releases/). Enterprise Edition requires a license from [antmedia.io](https://antmedia.io).
:::

|               **Feature**               |         **Community Edition**         |        **Enterprise Edition**        |
| :----------------------------------------: | :-------------------------------------: | :------------------------------------: |
|       One-to-Many WebRTC Streaming       | ![false](@site/static/img/cross.png ) | ![false](@site/static/img/tick.png ) |
|            End-to-End Latency            |             8-12 Seconds             |         0.5 Seconds (500ms)         |
|             WebRTC Support                | WebRTC Ingest Only (No playback) | Full WebRTC Support |
|               Scaling             | ![false](@site/static/img/cross.png ) | ![false](@site/static/img/tick.png ) |
|            Kubernetes Support            | ![false](@site/static/img/cross.png ) | ![false](@site/static/img/tick.png ) |
|   RTMP Ingest   | ![false](@site/static/img/tick.png ) | ![false](@site/static/img/tick.png ) |
| Hardware Encoding(Nvidia GPU) | ![false](@site/static/img/cross.png ) | ![false](@site/static/img/tick.png ) |
|             Adaptive Bitrate (Transcoding)            | ![false](@site/static/img/cross.png ) | ![false](@site/static/img/tick.png ) |
|             Stream Security            | ![false](@site/static/img/cross.png ) | ![false](@site/static/img/tick.png ) |
|            SRT Ingest            | ![false](@site/static/img/cross.png ) | ![false](@site/static/img/tick.png ) |
|            NDI Ingest (Beta)            | ![false](@site/static/img/cross.png ) | ![false](@site/static/img/tick.png ) |
|         iOS & Android WebRTC SDK         | Publish only | ![false](@site/static/img/tick.png ) |
|          VP8, H.265 & AV1 Codec Support        | ![false](@site/static/img/cross.png ) | ![false](@site/static/img/tick.png ) |
|                 WHIP                     | ![false](@site/static/img/cross.png ) | ![false](@site/static/img/tick.png ) |
|              JavaScript SDK              | ![false](@site/static/img/tick.png ) | ![false](@site/static/img/tick.png ) |
|                   LL-DASH(CMAF)                 | ![false](@site/static/img/cross.png) | ![true](@site/static/img/tick.png ) |
|     Stream Source Pull/Ingest      | RTMP, UDP, MP4, HLS, RTSP | RTMP, UDP, MP4, HLS, RTSP, SRT |
|           LL-HLS (Paid plugin)           | ![false](@site/static/img/cross.png ) | ![false](@site/static/img/tick.png ) |
|           SCTE-35 Plugin                 | ![false](@site/static/img/cross.png ) | ![false](@site/static/img/tick.png ) |
|      360 Degree Live & VoD Streams       | ![false](@site/static/img/tick.png ) | ![false](@site/static/img/tick.png ) |
|         Web Management Dashboard         | ![false](@site/static/img/tick.png ) | ![false](@site/static/img/tick.png ) |
|            IP Camera Streaming             | ![false](@site/static/img/tick.png ) | ![false](@site/static/img/tick.png ) |
|         SRT Re-streaming          | ![false](@site/static/img/cross.png ) | ![false](@site/static/img/tick.png ) |
|               Open Source                | ![false](@site/static/img/tick.png ) | ![false](@site/static/img/cross.png ) |
|      Linear Live Streaming (Playlist)    | ![false](@site/static/img/tick.png ) | ![false](@site/static/img/tick.png ) |
|  Simulcast to all Social Media via RTMP  | ![false](@site/static/img/tick.png ) | ![false](@site/static/img/tick.png ) |
|  Recording (MP4,WebM,HLS)                | HLS and MP4 Only | ![false](@site/static/img/tick.png ) |
|                 Support                  |               Community               |           E-mail, Slack           |
|                  Price                   |                 Free                 |                 Paid                 |

## License information

- **Community Edition** is free under the Apache license.
- **Enterprise Edition** requires a paid license per instance. Options include Pay-As-You-Go, Monthly, Annual, and Perpetual licenses—see [antmedia.io](https://antmedia.io) for pricing.

### Enterprise Edition cluster license

The cluster license includes the same features as the standard Enterprise Edition license, but supports many instances running simultaneously with the same license key. The standard Enterprise license supports one instance at a time.

For large cluster deployments and discount options, see [Contact](#contact) below.

### Free Enterprise Edition license for education and tech communities

Ant Media provides **free Enterprise Edition licenses** for educational institutions, academic projects, student organizations, etc. Send an email from your institution or community address — see [Contact](#contact) below.

## Community and support

Connect with Ant Media users and developers on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or ask questions in the [Q&A section](https://github.com/orgs/ant-media/discussions/categories/q-a).

For product news and streaming insights, visit the [Ant Media Blog](https://antmedia.io/blog/) or [antmedia.io](https://antmedia.io/).

### Contact

| Need | Reach out |
| --- | --- |
| Sales, licenses, partnerships, education licenses | [contact@antmedia.io](mailto:contact@antmedia.io) |
| Technical support | [support@antmedia.io](mailto:support@antmedia.io) |
