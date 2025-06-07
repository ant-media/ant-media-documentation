---
title: Google Cloud CDN
description: Ant Media Server Integration with Google Cloud CDN
keywords: [Google Cloud CDN, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

Streaming high-quality video content to a large audience demands robust infrastructure. In this guide, we’ll explore how to harness the power of Google Cloud CDN alongside Ant Media Server to deliver HLS streams seamlessly to millions of viewers worldwide.

## What is Google Cloud CDN?

**[Google Cloud CDN](https://cloud.google.com/cdn?hl=en)**  stands as a global network of edge servers strategically positioned across the globe. Leveraging Google’s distributed points of presence (PoPs), it optimizes content delivery by caching data at these edge locations. This proximity reduces latency, ensuring swift and reliable access to content for end-users.

## Prerequisites

Before diving into configuration, ensure the following services are enabled on your Google Cloud Account.

-   Google Cloud Marketplace
-   Compute Engine
-   Load Balancing
-   Cloud CDN

## Launch Ant Media Server Enterprise Edition

Ant Media Server Enterprise Edition is available on Google Cloud Marketplace.

- Access the **[Google Cloud Marketplace](https://console.cloud.google.com/marketplace)** service and locate the **Ant Media Server Enterprise Edition**.

![ams-gcp-marketplace](@site/static/img/cdn-integration/ams-gcp-marketplace.webp)

- Initiate the installation process by clicking the **Launch** button.

![ams-gcp-launch](@site/static/img/cdn-integration/ams-gcp-launch.webp)

-   Note the **External IP address** upon completion; be used later.

![ams-gcp-instance](@site/static/img/cdn-integration/ams-gcp-instance.webp)

## Configure Google Cloud CDN

Now that we have successfully launched the Ant Media Server on the Google Cloud Marketplace, let’s configure the Cloud CDN.

- Navigate to the **Cloud CDN** service and select **ADD ORIGIN**.

![gcp-cloud-cdn](@site/static/img/cdn-integration/gcp-cloud-cdn.webp)

- Choose the **Custom Origin** and input the **External IP address** of the Ant Media Server Enterprise instance with port **5080**. Specify the origin name and click Next.

![cloud-cdn-origin-configuration](@site/static/img/cdn-integration/cloud-cdn-origin-configuration.webp)

- Select **Create new load balancer for me**, enter the load balancer name, and continue with Next.

![cloud-cdn-load-balancer](@site/static/img/cdn-integration/cloud-cdn-load-balancer.webp)

- Configure **TTL settings**, leave the other settings to default, and click **Done** to finalize the installation.

![cloud-cdn-cache-configuration](@site/static/img/cdn-integration/cloud-cdn-cache-configuration.webp)

## Publish Live Stream with Ant Media Server

Now that we have everything set, let’s broadcast a live stream in Ant Media Server following the [**Publish Live Stream**](https://antmedia.io/docs/category/publish-live-stream/) instructions and note the **Stream Id**.

- For this demo, we are going to  [publish a RTMP](https://antmedia.io/docs/category/rtmps/)  stream using the  [OBS](https://antmedia.io/docs/guides/publish-live-stream/rtmp/publish-with-obs/)  tool.

- Create the HLS playback URL using your cloud CDN load balancer IP address in the following format:

```html
http://your_cloudcdn_load_balancer_ip_address/live/play.html?id=your_stream_Id&playOrder=hls
```

Launch the URL in your browser to verify the stream playback, now distributed seamlessly via the CDN.

![cloud-cdn-playback](@site/static/img/cdn-integration/cloud-cdn-playback.webp)
