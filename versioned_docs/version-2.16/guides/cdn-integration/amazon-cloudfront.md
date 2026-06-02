---
title: Amazon CloudFront
description: Ant Media Server Integration with Amazon CloudFront CDN
keywords: [Amazon CloudFront, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

# Amazon CloudFront Integration with Ant Media Server

A content delivery network (CDN) is a geographically distributed network of proxy servers and data centers. The goal of a CDN is to provide high availability and performance by distributing content closer to end users.

This guide explains how to configure Amazon CloudFront to deliver [HLS](https://antmedia.io/docs/guides/playing-live-stream/hls-playing/) and [LL-HLS](https://antmedia.io/docs/guides/playing-live-stream/ll-hls/) streams from Ant Media Server.

## What is Amazon CloudFront?

[Amazon CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html) is a web service that speeds up the distribution of static and dynamic web content. CloudFront delivers content through a global network of edge locations, automatically routing requests to the nearest location to reduce latency.

## Prerequisites

Before configuring CloudFront, ensure you have:

- An [AWS account](https://aws.amazon.com/console/)
- A running instance of Ant Media Server, either launched from the [AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-464ritgzkzod6?sr=0-1&ref_=beagle&applicationId=AWSMPContessa) or [installed manually](https://antmedia.io/docs/guides/installing-on-linux/installing-ams-on-linux/)
- [HLS enabled](https://antmedia.io/docs/guides/playing-live-stream/hls-playing/#enable-hls) on your Ant Media Server instance
- The [LL-HLS plugin](https://antmedia.io/docs/guides/playing-live-stream/ll-hls/#how-to-enable-ll-hls-in-ant-media-server) installed if you want to play streams with LL-HLS

## Configure Amazon CloudFront

### Create a Distribution

1. Log in to your AWS account and open the Amazon CloudFront console.
2. Click **Create Distribution**.

   ![cloudFront-console](https://github.com/user-attachments/assets/d31380e5-fd0d-4776-96c4-f66be4e7212d)

4. Configure the origin:

   ![origin](https://github.com/user-attachments/assets/4483bda9-207e-4dd9-824e-7f696376ebf6)

   - **Origin domain**: Enter the domain name of your Ant Media Server instance.
   - **Protocol**: Choose HTTP (5080) or HTTPS (5443). If you select HTTPS, ensure [SSL is enabled](https://antmedia.io/docs/guides/installing-on-linux/setting-up-ssl/).
   - **Origin path**: Enter the name of your Ant Media Server [application](https://antmedia.io/docs/guides/developing-antmedia-server/create-new-application/) (e.g., `live`).
   
5. Configure the default cache behavior:
   - Set cache behavior settings and policies as needed.

     ![default-cache](https://github.com/user-attachments/assets/21018812-c11d-4920-a6e9-7682689b3068)

   - Attach a cache policy and origin request policy.

     ![cache-policy](https://github.com/user-attachments/assets/dbbc3bc8-2b63-457a-abf4-1cc32b42f66d)

6. Disable the Web Application Firewall (WAF) protection for this distribution if not required.

   ![disable-waf](https://github.com/user-attachments/assets/a89e8863-27af-4630-b3ab-fed24c876393)

7. Complete creation of the distribution and wait for it to deploy.

### Configuring Error Pages

1. In the CloudFront console, open your distribution and go to the **Error Pages** tab.

   ![error-pages](https://github.com/user-attachments/assets/533c17e0-4a72-4b1a-8f6b-43dd0d1ea402)

2. Create a custom error response for **404: Not Found**.
   - Set **Error Caching Minimum TTL** to **3 seconds**.

     ![custom-error-response](https://github.com/user-attachments/assets/0d2641b8-3e0c-4f16-b722-f5c0307367ac)


3. Once deployed, note your CloudFront domain name.

   ![cloudfront](https://github.com/user-attachments/assets/424dfb36-02ca-4e39-871a-979bb938ce0d)


## Publish a Live Stream with Ant Media Server

1. Follow the [Publish Live Stream guide](https://antmedia.io/docs/category/publish-live-stream/) to start a stream.
2. For this example, publish an RTMP stream using [OBS](https://antmedia.io/docs/guides/publish-live-stream/rtmp/publish-with-obs/).

## Play the Live Stream with HLS

Use the following format for HLS playback:

```html
http://your_cloud_front_domain_name/play.html?id=your_stream_id&playOrder=hls
```

Example:
```html
http://d3m1pdd4lln4vj.cloudfront.net/play.html?id=stream01&playOrder=hls
```

![cloudfront-play](https://github.com/user-attachments/assets/c48f610b-e974-4d48-8746-4aefed6944e2)


## Play the Live Stream with LL-HLS

Use the following format for LL-HLS playback:

```html
http://your_cloud_front_domain_name/play.html?id=your_stream_id&playOrder=ll-hls
```

Example:
```html
http://d3m1pdd4lln4vj.cloudfront.net/play.html?id=stream001&playOrder=ll-hls
```

![ll-hls-play](https://github.com/user-attachments/assets/d6b637ea-b2cd-4e21-bfc3-632da88aaf1e)

---

## Congratulations! 

By completing these steps, you have:

- Deployed Ant Media Server on AWS.
- Configured Amazon CloudFront to deliver HLS and LL-HLS streams.
- Published and tested playback of live streams through CloudFront.

You can now deliver live video globally with reduced latency and improved reliability using Amazon’s CDN infrastructure.

