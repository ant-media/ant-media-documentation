---
title: Introduction
slug: /
description: Deploy Ant Media Server to your choice of cloud within minutes.
keywords: [Free Streaming Server Software, Ant Media Community v/s Enterprise Edition, Use Cases, Live Streaming Server Software]
sidebar_position: 1
---


# Getting Started with Ant Media Server

Ant Media Server (AMS) is a scalable, real-time video streaming platform designed for ultra-low latency live streaming and interactive broadcasting.

Built around WebRTC and adaptive streaming technologies, AMS enables organizations to deliver live video with sub-second latency while supporting large-scale audience delivery through HLS, LL-HLS, CMAF, and DASH streaming protocols.

Ant Media Server supports multiple ingest protocols, including WebRTC, RTMP, SRT, RTSP, WHIP, and NDI, along with modern codec support such as AV1, providing flexible streaming workflows for browsers, mobile devices, and broadcasting infrastructures.

AMS is available in two editions:
- **Community Edition** — Open-source streaming server suitable for standard streaming and development workloads.
- **Enterprise Edition** — Advanced streaming platform with ultra-low latency delivery, adaptive bitrate streaming, clustering, GPU acceleration, enterprise security, and professional support.

Ant Media Server can be deployed on-premises, in air-gapped environments, on Kubernetes and Docker infrastructures, or on major public cloud providers including AWS, Azure, GCP, Oracle Cloud, DigitalOcean and many more.

The platform supports both standalone and clustered deployments, enabling deployments ranging from a single streaming server to large-scale distributed streaming infrastructures capable of supporting thousands of concurrent publishers and viewers.

AMS also provides SDKs and APIs for JavaScript, iOS, Android, Flutter, React Native, and Unity, allowing developers to build interactive real-time streaming applications for use cases such as webinars, auctions, live shopping, telehealth, online education, gaming, surveillance, and live broadcasting.

## Explore Use Cases

### 🤖 Live Video Surveillance &  IP Camera Streaming

Stream, monitor, and manage ONVIF IP cameras with ultra-low latency on web and mobile applications. [Read more](https://antmedia.io/solutions/ip-camera-streaming/)

### 🙇 Webinars & Video Conferencing

Power scalable video conferencing and webinars with real-time audio/video communication and sub-second latency. [Read more](https://antmedia.io/solutions/webinar-e-learning-virtual-classroom/)

### 📱 Mobile Streaming Applications

Build high-performance mobile streaming apps using Ant Media Server APIs and SDKs for Android, iOS, Flutter, React Native, and more. [Read more](https://antmedia.io/docs/category/sdk-integration/)

### 📺 Media & Entertainment

Create engaging, real-time game show experiences with scalable, ultra-low-latency streaming. [Read more](https://antmedia.io/solutions/media-entertainment/)

### 🎯 E-Sports & Gaming

Deliver live e-sports and betting streams with ultra-low latency, ensuring viewers never miss critical moments. [Read more](https://antmedia.io/solutions/video-game-streaming/)

### 🏷️ Live Auctions & Bidding

Enable fair and responsive auctions with sub-second latency streaming that keeps bids synchronized in real time. [Read more](https://antmedia.io/solutions/auction-bidding/)

### 🩺 Telehealth & Remote Consultation

Build secure telehealth platforms with real-time video communication for consultations, patient monitoring, and remote care. [Read more](https://antmedia.io/solutions/telehealth/)

### 🛍️ Live Shopping

Increase engagement and conversions with interactive live shopping experiences powered by ultra-low-latency streaming. [Read more](https://antmedia.io/solutions/live-shopping/)

### 👨🏽‍💻 Online Education & Virtual Classrooms

Deliver interactive virtual classrooms, live tutoring, and remote training with ultra-low-latency WebRTC streaming for real-time teacher-student engagement.

### 🤖 AI-Powered Video Streaming

Integrate custom AI models directly into live streams using the Python AI Plugin for real-time analytics, computer vision, and intelligent video processing. [Learn more](https://antmedia.io/integrate-your-ai-into-live-streams-with-python-plugin/)


### Community and Enterprise Edition Comparison

|               **Feature**               |         **Community Edition**         |        **Enterprise Edition**        |
| :----------------------------------------: | :-------------------------------------: | :------------------------------------: |
|       One-to-Many WebRTC Streaming       | ![false](@site/static/img/cross.png ) | ![false](@site/static/img/tick.png ) |
|            End-to-End Latency            |             8-12 Seconds             |         0.5 Seconds (500ms)         |
|             WebRTC Support                | WebRTC Ingest Only (No playback) | Full WebRTC Support |
|               Auto Scaling               | ![false](@site/static/img/cross.png ) | ![false](@site/static/img/tick.png ) |
|            Kubernetes Support            | ![false](@site/static/img/cross.png ) | ![false](@site/static/img/tick.png ) |
|   RTMP Ingest   | ![false](@site/static/img/tick.png ) | ![false](@site/static/img/tick.png ) |
| Hardware Encoding(Nvidia GPU) | ![false](@site/static/img/cross.png ) | ![false](@site/static/img/tick.png ) |
|           WebRTC Data Channel            | ![false](@site/static/img/cross.png ) | ![false](@site/static/img/tick.png ) |
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
|           LL-HLS (Paid plugin)           | ![false](@site/static/img/tick.png ) | ![false](@site/static/img/tick.png ) |
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

## Download Ant Media Server

Choose the edition that best fits your needs:

-   **Community Edition** – Free and open source. Download the latest release directly from the [Release Page](https://github.com/ant-media/Ant-Media-Server/releases/).
    
-   **Enterprise Edition** – Access advanced features, scalability, and professional support. Enterprise packages can be downloaded from your [Ant Media Account](https://antmedia.io/my-account/) after purchasing a license.

## License Information

Ant Media Server has two types of licenses.

 - Ant Media Server Community Edition is free to use with the Apache
   license.
- Ant Media Server Enterprise Edition requires a paid license per instance/server. Paid license options include Pay-As-You-Go, Monthly, Annual, and Perpetual licenses, which can be purchased directly from [antmedia.io](https://antmedia.io).

### Enterprise Edition Cluster License

The Enterprise Edition cluster license has similar features to the standard Enterprise Edition license. The only difference is that the Enterprise Cluster license supports many instances running simultaneously with the same license key. The standard Enterprise Edition license only supports one instance at a time.

If you're planning to have a large deployment for your Enterprise Cluster, please contact Sales at [contact@antmedia.io](mailto:contact@antmedia.io) to discuss discount options.

### Free Enterprise Edition license for educational and Tech Communities

Ant Media provides **free Enterprise Edition licenses** for students, academics, and communities. To take advantage of this opportunity, just send an email from your institution or community e-mail address to [contact@antmedia.io](mailto:contact@antmedia.io)

## Deployment Options

Ant Media Server supports a wide range of Linux distributions, including Ubuntu 20.04, 22.04, and 24.04, CentOS 8 and 9, Rocky Linux 8 and 9, Red Hat Enterprise Linux 9, and AlmaLinux 8 and 9. It is fully compatible with both x86-64 and Arm64 architectures.

For a single-server deployment, we recommend a minimum of 4 vCPUs on a compute-optimized instance with at least 8 GB of RAM. SSD storage is strongly recommended to ensure optimal read/write performance and reliable media processing.

Ant Media Server can be deployed in multiple environments, including `Virtual Machines`, `Docker Containers`, and `Kubernetes Clusters`, allowing you to choose the installation method that best fits your infrastructure and scalability requirements.

## Join the Ant Media Community

Connect with Ant Media users and developers from around the world. Ask questions, share knowledge, discover best practices, and get help from the community through [GitHub Discussions](https://github.com/orgs/ant-media/discussions).

Looking for technical assistance or have a specific question? Visit the [Q&A Discussions section](https://github.com/orgs/ant-media/discussions/categories/q-a) to engage with community members and the Ant Media team.

## Get in Touch

Explore the latest updates, product news, and streaming insights on the [Ant Media Blog](https://antmedia.io/blog/) or visit [Ant Media's website](https://antmedia.io/) to learn more about our solutions.

For sales, partnerships, or general inquiries, contact us at **[contact@antmedia.io](mailto:contact@antmedia.io)**. If you need technical assistance, our support team is available at **[support@antmedia.io](mailto:support@antmedia.io)**.
