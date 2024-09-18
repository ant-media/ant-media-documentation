---
title: Enterprise and Community Edition
description: Analyze what you may achieve with Ant Media Server Enterprise Edition.
keywords: [Ant Media Server Enterprise Edition, Ant Media Community v/s Enterprise edition, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

# Ant Media Server Enterprise and Community Edition

Ant Media Server is a real-time streaming engine software that provides adaptive, ultra-low latency streaming by using WebRTC technology with ~0.5 seconds latency. Ant Media Server is highly scalable both horizontally and vertically. It can run on-premise or on-cloud.

Here are the fundamental features of Ant Media Server:

* Ultra Low Latency Adaptive One to Many WebRTC Live Streaming in Enterprise Edition.
* Adaptive Bitrate for Live Streams (WebRTC, MP4, HLS, DASH, and LL-HLS) in Enterprise Edition.
* SFU in One to Many WebRTC Streams in Enterprise Edition.
* MCU in One to Many or Many to Many WebRTC Streams in Enterprise Edition.
* Live Stream Publishing with RTMP, WebRTC, SRT, and WHIP.
* WebRTC to RTMP Adapter.
* IP Camera with RTSP and ONVIF support.
* Recording Live Streams (MP4, WebM, and HLS).
* Re-stream to Social Media Simultaneously.
* Stream Security in Enterprise Edition.
* Object Detection in Enterprise Edition.
* H.264, H.265 and VP8 codecs support
* WebRTC Data Channel Support.
* Linear Live Streaming with Playlist

:::info
This document includes information both for Community and Enterprise Editions. If something is not working according to this document, you may be using Community Edition and you try to use a feature of Enterprise. Check the Community vs. Enterprise below
:::

## Community Edition & Enterprise Edition

Ant Media Server has two versions. One of them is the Community Edition (Free) and the other one is Enterprise Edition. Community Edition is available to [download on Github.](https://github.com/ant-media/Ant-Media-Server) Enterprise Edition can be purchased on [antmedia.io](https://antmedia.io/)


|                                            | **Community Edition** | **Enterprise Edition**  |
| ------------------------------------------------- | ----------------- | ------------------- |
| Ultra Low Latency One-to-Many WebRTC Streaming | ![true](@site/static/img/cross.png)              |![true](@site/static/img/tick.png)                      |
| End-to-End Latency                                | 8-12 Seconds      | 0.5 Seconds (500ms) |
| SRT Ingest                                        | ![true](@site/static/img/cross.png)                  | ![true](@site/static/img/tick.png)                     |
| CMAF (DASH)                                              | ![true](@site/static/img/cross.png)                  | ![true](@site/static/img/tick.png)                     |
| Scaling                                           | ![true](@site/static/img/cross.png)                  | ![true](@site/static/img/tick.png)                     |
| Kubernetes Support                                | ![true](@site/static/img/cross.png)                  | ![true](@site/static/img/tick.png)                     |
| RTMP(Ingesting) to WebRTC (Playing)               |  ![true](@site/static/img/cross.png)                 | ![true](@site/static/img/tick.png)                     |
| Hardware Encoding (Nvidia GPU, QuickSync)          | ![true](@site/static/img/cross.png)                  | ![true](@site/static/img/tick.png)                     |
| WebRTC Data Channel                               |![true](@site/static/img/cross.png)                   | ![true](@site/static/img/tick.png)                     |
| Adaptive Bitrate Streaming                                |![true](@site/static/img/cross.png)                   | ![true](@site/static/img/tick.png)                     |
| Secure Streaming                                  |![true](@site/static/img/cross.png)                 |   ![true](@site/static/img/tick.png)                   |                 |
| iOS & Android WebRTC SDKs                          |![true](@site/static/img/cross.png)                   |  ![true](@site/static/img/tick.png)                    |
| VP8 and H.265 Support                             | ![true](@site/static/img/cross.png)                  |   ![true](@site/static/img/tick.png)                   |
| JavaScript SDK                                    |![true](@site/static/img/tick.png)                   |  ![true](@site/static/img/tick.png)                    |
| RTMP, RTSP, MP4 and HLS Support                   |![true](@site/static/img/tick.png)                    |  ![true](@site/static/img/tick.png)                    |
| WebRTC to RTMP Adapter                            |![true](@site/static/img/tick.png)                    |  ![true](@site/static/img/tick.png)                    |
| 360 Degree Live & VoD Streams                     | ![true](@site/static/img/tick.png)                   |  ![true](@site/static/img/tick.png)                    |
| Web Management Dashboard                          | ![true](@site/static/img/tick.png)                   |  ![true](@site/static/img/tick.png)                    |
| IP Camera Support                                 | ![true](@site/static/img/tick.png)                   |  ![true](@site/static/img/tick.png)                    |
| Re-stream Remote Streams                          | ![true](@site/static/img/tick.png)                   | ![true](@site/static/img/tick.png)
| WHIP                                              |![true](@site/static/img/tick.png)                    | ![true](@site/static/img/tick.png)                     |
| LL-HLS (Paid plugin)                                |![true](@site/static/img/tick.png)                    | ![true](@site/static/img/tick.png)                         |
| Open Source                                       | ![true](@site/static/img/tick.png)                   | ![true](@site/static/img/tick.png)                     |
| Linear Live Streaming (Playlist)                                     | ![true](@site/static/img/tick.png)                   | ![true](@site/static/img/tick.png) 
| Simulcast to Social Media via RTMP            | ![true](@site/static/img/tick.png)                   | ![true](@site/static/img/tick.png)                     |
| Support                                           | Community         | E-mail, On-site     |
| Price                                             | Free              | Paid                |

## Releases

You can check out the Ant Media Server releases and release logs from [here](https://github.com/ant-media/Ant-Media-Server/releases/).

## Licenses

Ant Media Server has basically two types of licenses.

1.  Ant Media Server Community Edition is free to use.
2.  Ant Media Server Enterprise Edition has a paid license per instance/server. Self-hosted paid license options are `monthly`, `annual`, and `perpetual`. You can get self-hosted licenses from [antmedia.io](https://antmedia.io/) or you can use hourly/monthly/yearly licenses from Marketplaces in [AWS Marketplace](https://aws.amazon.com/marketplace/search/results?x=0&y=0&searchTerms=Ant+Media+Server&page=1&ref_=nav_search_box), [Azure Marketplace](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/antmedia.ant_media_server_enterprise?tab=Overview), [Digital Ocean](https://marketplace.digitalocean.com/apps/ant-media-server-enterprise-edition), [Google Cloud Marketplace](https://console.cloud.google.com/marketplace/product/antmedia-public/ant-media-server-enterprise-edition?hl=pt&pli=1&project=antmedia-test) and [Linode](https://www.linode.com/marketplace/apps/ant-media/ant-media-community-edition/).

### Enterprise Cluster License

The Enterprise Cluster License has similar features to the Enterprise License. The only difference is that Enterprise Cluster License supports many Ant Media Servers run simultaneously with the same license key. In that case, you do not have to manage the multiple license keys for multiple servers.

If you're planning to have a large deployment for your enterprise cluster, please contact solutions teams at [contact@antmedia.io](mailto:contact@antmedia.io) in order to have some discounts.

### Free Enterprise License for Education and Tech Communities

Ant Media also provides **_free Enterprise Licenses_** for the students, academics, and communities. To take advantage of this opportunity, just send an email (from your institution or community e-mail address) to [contact@antmedia.io](mailto:contact@antmedia.io)

## Functional Architecture

![](@site/static/img/Simple_Architecture.png)

## Supported Environments

Ant Media Server can be installed on Linux distributions, specifically Ubuntu (18.04, 20.04, 22.04, and 24.04), CentOS (8 and 9), Rocky Linux (8 and 9), and Alma Linux (8 and 9). It is compatible with both the x86-64 and Arm64 architectures. 

In addition, you can also install Ant Media Server on Windows using the [WSL](https://antmedia.io/install-ant-media-server-on-windows-using-wsl/) or [Docker container](https://antmedia.io/docs/guides/clustering-and-scaling/docker/docker-and-docker-compose-installation/).

## Community

There is a user community available. You can ask or answer questions by joining the community at [GitHub Discussions](https://github.com/orgs/ant-media/discussions)

## Case Studies

You can find different case studies [here](https://antmedia.io/case-studies/) to see where and how Ant Media Server can help your business grow.

## Blog posts

There are hundreds of blog posts written by the Ant Media team to provide guidance for the use of the Ant Media Server and you can find them [here](https://antmedia.io/blog/)

## Contact

For more information, visit [antmedia.io](https://antmedia.io/)
and reach out to [contact@antmedia.io](mailto:contact@antmedia.io)
