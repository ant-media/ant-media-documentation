---
title: Amazon CloudFront
description: Configure Amazon CloudFront to deliver HLS and LL-HLS streams from Ant Media Server at scale.
keywords: [Amazon CloudFront, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
sidebar_label: Amazon CloudFront
---

# Amazon CloudFront Integration with Ant Media Server

Deliver live **[HLS](/guides/playing-live-stream/hls-playing/)** and **[LL-HLS](/guides/playing-live-stream/ll-hls/)** streams through **Amazon CloudFront**. CloudFront caches playlists and segments at AWS edge locations so viewers get lower latency and your origin handles less traffic.

## What you'll accomplish

By the end of this guide, you will:

1. Create a **CloudFront distribution** with Ant Media Server as the origin.
2. Configure **error page caching** for live HLS playback.
3. Publish a live stream to Ant Media Server.
4. Play the stream through CloudFront using **HLS** or **LL-HLS**.

## How CloudFront works with Ant Media Server

Ant Media Server generates HLS segments on your origin instance. CloudFront pulls content from that origin and caches it at edge locations worldwide. Viewers request the CloudFront domain name; edge servers respond from cache when possible.

Set the **origin path** to your Ant Media Server application name (for example, `live`). Playback URLs then use the CloudFront domain directly without repeating the application path.

## Prerequisites

Before you begin, confirm the following:

- An [AWS account](https://aws.amazon.com/console/).
- Ant Media Server running on AWS — from [AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-464ritgzkzod6) or [installed manually](/guides/installing-on-linux/installing-ams-on-linux/).
- [HLS enabled](/guides/playing-live-stream/hls-playing/) on your Ant Media Server application.
- The [LL-HLS plugin](/guides/playing-live-stream/ll-hls/) installed if you plan to test LL-HLS playback.
- [SSL configured](/guides/installing-on-linux/setting-up-ssl/) on the origin if you use HTTPS (`5443`) as the origin protocol.

## Step 1: Create a CloudFront distribution

1. Sign in to the AWS console and open **CloudFront**.
2. Click **Create distribution**.

   ![](@site/static/img/cdn-integration/cloudfront-console.png)

3. Configure the **origin**:
   - **Origin domain:** your Ant Media Server hostname or IP
   - **Protocol:** HTTP on port `5080` or HTTPS on port `5443`
   - **Origin path:** your application name (for example, `live`)

   ![](@site/static/img/cdn-integration/cloudfront-origin.png)

   See [Create a new application](/guides/developer-sdk-and-api/extend-the-server/applications/create-new-application/) if you need a dedicated app for CDN playback.

4. Configure the **default cache behavior** and attach cache and origin request policies as needed.

   ![](@site/static/img/cdn-integration/cloudfront-default-cache.png)

   ![](@site/static/img/cdn-integration/cloudfront-cache-policy.png)

5. Disable **WAF** for this distribution if you do not need web application firewall protection.

   ![](@site/static/img/cdn-integration/cloudfront-disable-waf.png)

6. Create the distribution and wait until the status is **Deployed**.

## Step 2: Configure error pages

Live HLS players request new playlist files frequently. Configure a short TTL for 404 responses so CloudFront does not cache missing segments for too long.

1. Open your distribution and go to the **Error pages** tab.

   ![](@site/static/img/cdn-integration/cloudfront-error-pages.png)

2. Create a custom error response for **404: Not Found**.
3. Set **Error Caching Minimum TTL** to **3** seconds.

   ![](@site/static/img/cdn-integration/cloudfront-custom-error-response.png)

4. Note your **CloudFront domain name** when deployment completes.

   ![](@site/static/img/cdn-integration/cloudfront-distribution.png)

:::tip Live HLS caching
Use short TTL values for `.m3u8` playlist files. Segment files (`.ts`) can use longer cache durations depending on your cache policy.
:::

## Step 3: Publish a live stream

1. Publish a stream to Ant Media Server. For this example, use [OBS](/guides/publish-live-stream/rtmp/publish-with-obs/) to send an RTMP publish.
2. Confirm the stream is live in the Ant Media Server web panel before testing playback.

## Step 4: Play through CloudFront with HLS

Build the playback URL using your **CloudFront domain** and **stream ID**:

```text
http://{CLOUDFRONT_DOMAIN}/play.html?id={STREAM_ID}&playOrder=hls
```

Example:

```text
http://d3m1pdd4lln4vj.cloudfront.net/play.html?id=stream01&playOrder=hls
```

Open the URL in a browser. If CloudFront and HLS are configured correctly, the stream plays through the CDN.

![](@site/static/img/cdn-integration/cloudfront-hls-playback.webp)

## Step 5: Play through CloudFront with LL-HLS (optional)

If the LL-HLS plugin is installed and enabled, use `playOrder=ll-hls`:

```text
http://{CLOUDFRONT_DOMAIN}/play.html?id={STREAM_ID}&playOrder=ll-hls
```

Example:

```text
http://d3m1pdd4lln4vj.cloudfront.net/play.html?id=stream001&playOrder=ll-hls
```

![](@site/static/img/cdn-integration/cloudfront-ll-hls-playback.webp)

The screenshots above show HLS and LL-HLS playback through CloudFront after a successful publish.

---

## Troubleshooting

| Symptom | What to check |
|---------|----------------|
| Playback URL does not load | Distribution status is **Deployed**, origin domain and port are correct, security groups allow traffic to Ant Media Server. |
| Stream not found | Stream is publishing, origin path matches your application name, stream ID in the URL is correct. |
| Stale or frozen playlist | 404 error caching TTL is set to 3 seconds; cache policy TTL for `.m3u8` files is not too high. |
| LL-HLS playback fails | [LL-HLS plugin](/guides/playing-live-stream/ll-hls/) is installed and enabled on the origin. |
| HTTPS origin errors | [SSL is configured](/guides/installing-on-linux/setting-up-ssl/) on Ant Media Server and origin protocol is HTTPS (`5443`). |

For HLS and LL-HLS setup details, see [HLS playing](/guides/playing-live-stream/hls-playing/) and [LL-HLS](/guides/playing-live-stream/ll-hls/).
