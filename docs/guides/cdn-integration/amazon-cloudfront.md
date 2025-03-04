---
title: Amazon CloudFront
description: Ant Media Server Integration with Amazon CloudFront CDN
keywords: [Amazon CloudFront, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

A content delivery or distribution network (CDN) is a geographically distributed network of [proxy servers](https://en.wikipedia.org/wiki/Proxy_server) and their [data centers](https://en.wikipedia.org/wiki/Data_center). The goal of a CDN is to provide high availability and performance by distributing the service spatially relative to end-users.

In this document, we will learn how to configure Amazon CloudFront to play [HLS](https://antmedia.io/docs/guides/playing-live-stream/hls-playing/) & [LL-HLS](https://antmedia.io/docs/guides/playing-live-stream/ll-hls/) streams from the Ant Media Server.

## What is Amazon CloudFront?

[Amazon CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html) is a web service that speeds up the distribution of your static and dynamic web content, such as .html, .css, .js, and image files, to your users. CloudFront delivers your content through a worldwide network of data centers called edge locations. When a user requests content that you're serving with CloudFront, the request is routed to the edge location that provides the lowest latency (time delay) to deliver content with the best possible performance.

![amazon-cloudfront](https://github.com/user-attachments/assets/8e3dd633-7120-4aa0-ae01-a741bba0d2ed)


## Prerequisites

Before diving into configuration, make sure that you have met the prerequisites.

- An [Amazon Web Server account](https://aws.amazon.com/console/).
- A running instance of Ant Media Server, either launched from the [AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-464ritgzkzod6?sr=0-1&ref_=beagle&applicationId=AWSMPContessa) or [installed manually](https://antmedia.io/docs/guides/installing-on-linux/installing-ams-on-linux/).
- [HLS is enabled](https://antmedia.io/docs/guides/playing-live-stream/hls-playing/#enable-hls) for your Ant Media Server instance.
- The [LL-HLS plugin](https://antmedia.io/docs/guides/playing-live-stream/ll-hls/#how-to-enable-ll-hls-in-ant-media-server) is installed if you want to play the streams with LL-HLS.

## Configure Amazon CloudFront

Now that we have fulfilled the prerequisites, let's configure CloudFront to deliver the Ant Media Server streams.

### Create Distribution

- Log in to your AWS account & go to the Amazon CloudFront.
- Click Create Distribution.
  ![cloudFront-console](https://github.com/user-attachments/assets/d31380e5-fd0d-4776-96c4-f66be4e7212d)

#### Origin Configuration

![origin](https://github.com/user-attachments/assets/4483bda9-207e-4dd9-824e-7f696376ebf6)

- **Origin domain**: Here, you need to enter the domain name of your Ant Media Server instance.
- **Protocol**: You can choose HTTP (5080) or HTTPS (5443). If you choose HTTPS, then [SSL should be enabled](https://antmedia.io/docs/guides/installing-on-linux/setting-up-ssl/).
- **Origin path**: The name of your Ant Media Server [application](https://antmedia.io/docs/guides/developing-antmedia-server/create-new-application/). In this example, I'm using live.

#### Default Cache Behavior Configuration

- Fill the Default Cache Behavior Settings as shown below.
  ![default-cache](https://github.com/user-attachments/assets/21018812-c11d-4920-a6e9-7682689b3068)

##### Cache key and origin requests

- Choose Cache policy and origin request policy.
- Click on Create Cache Policy & configure it as shown below.
  ![cache-policy-01](https://github.com/user-attachments/assets/89ed69cd-4d7c-4f7b-a0e0-f5e02b4efb26)

  ![cache-policy-02](https://github.com/user-attachments/assets/b11f53a9-85e9-4de6-b93c-40be361fb355)

- After the policy is created, attach it to the `Cache policy`

#### Disable Web Application Firewall (WAF) settings

- Disable the Web Application Firewall (WAF) protection for the distribution.
  ![disable-waf](https://github.com/user-attachments/assets/a89e8863-27af-4630-b3ab-fed24c876393)

Now, the distribution will be created and listed in the CloudFront console.

### Configuring Error Pages

- Click the distribution listed in the CloudFront console, then click the Error Pages tab. In this tab, click Create Custom Error Response.
  ![error-pages](https://github.com/user-attachments/assets/533c17e0-4a72-4b1a-8f6b-43dd0d1ea402)

- Select 404: Not Found as the HTTP Error Code, set the Error Caching Minimum TTL to 3 seconds, and click the Create button.
  ![custom-error-response](https://github.com/user-attachments/assets/0d2641b8-3e0c-4f16-b722-f5c0307367ac)

- Wait until the distribution is deployed. Once it is deployed, you can note your CloudFront Domain Name.

  ![cloudfront](https://github.com/user-attachments/assets/424dfb36-02ca-4e39-871a-979bb938ce0d)

## Publish Live Stream with Ant Media Server

Now that we have everything set, let’s publish a live stream in Ant Media Server following the [Publish Live Stream instructions](https://antmedia.io/docs/category/publish-live-stream/) and note the **Stream Id**.

- For this demo, we are going to [publish a RTMP stream](https://antmedia.io/docs/guides/publish-live-stream/rtmp/publish-with-obs/).

## Play the Live Stream with HLS

Create the HLS playback URL using your Amazon CloudFront in the below format:

  ```js
  http://your_cloud_front_domain_name/play.html?id=your_stream_id&playOrder=hls
  ```

  - Example: If the `streamId` is `stream01`, the CloudFront playback URL will be like:
    ```js
    http://d3m1pdd4lln4vj.cloudfront.net/play.html?id=stream01&playOrder=hls
    ```

    ![cloudfront-play](https://github.com/user-attachments/assets/c48f610b-e974-4d48-8746-4aefed6944e2)

## Play the Live Stream with LL-HLS

Create the LL-HLS playback URL using your Amazon CloudFront in the below format:

  ```js
  http://your_cloud_front_domain_name/play.html?id=your_stream_id&playOrder=ll-hls
  ```

  - Example: If the `streamId` is `stream001`, the CloudFront playback URL will be like:
    ```js
    http://d3m1pdd4lln4vj.cloudfront.net/play.html?id=stream001&playOrder=ll-hls
    ```

    ![ll-hls-play](https://github.com/user-attachments/assets/d6b637ea-b2cd-4e21-bfc3-632da88aaf1e)



  
