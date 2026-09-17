---
title: Google Cloud CDN
description: Deploy Ant Media Server on Google Cloud and deliver HLS streams through Cloud CDN with a load balancer origin.
keywords: [Google Cloud CDN, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
sidebar_label: Google Cloud CDN
---

# Google Cloud CDN Integration with Ant Media Server

Deliver live **HLS** streams to a global audience by placing **Google Cloud CDN** in front of Ant Media Server. Viewers request segments from nearby edge caches instead of your origin server, which reduces latency and improves playback at scale.

## What you'll accomplish

By the end of this guide, you will:

1. Deploy **Ant Media Server Enterprise Edition** from Google Cloud Marketplace.
2. Configure **Cloud CDN** with a load balancer pointing to your Ant Media Server origin.
3. Publish a live stream to Ant Media Server.
4. Play the stream through the Cloud CDN load balancer URL.

## How Cloud CDN works with Ant Media Server

Ant Media Server generates HLS segments on the origin instance. Cloud CDN caches those segments at edge locations worldwide. When a viewer plays a stream, requests are served from the nearest cache whenever possible.

The load balancer is the public entry point. Cloud CDN caches HLS playlists and segments from your Ant Media Server origin on port **5080** (HTTP) or **5443** (HTTPS).

## Prerequisites

Before you begin, confirm the following:

- A [Google Cloud account](https://console.cloud.google.com/) with billing enabled.
- These APIs/services enabled: **Compute Engine**, **Load Balancing**, and **Cloud CDN**.
- Access to [Google Cloud Marketplace](https://console.cloud.google.com/marketplace).
- [HLS enabled](/guides/playing-live-stream/hls-playing/) on your Ant Media Server application.

:::info
This guide uses **Ant Media Server Enterprise Edition** from Google Cloud Marketplace. You need Enterprise for production CDN deployments at scale.
:::

## Step 1: Launch Ant Media Server on Google Cloud

1. Open [Google Cloud Marketplace](https://console.cloud.google.com/marketplace) and search for **Ant Media Server Enterprise Edition**.

   ![](@site/static/img/cdn-integration/ams-gcp-marketplace.webp)

2. Click **Launch** and complete the deployment wizard.

   ![](@site/static/img/cdn-integration/ams-gcp-launch.webp)

3. After deployment finishes, open the VM instance and note its **External IP address**. You will use this as the Cloud CDN origin.

   ![](@site/static/img/cdn-integration/ams-gcp-instance.webp)

## Step 2: Configure Cloud CDN

1. In the Google Cloud console, open **Network Services → Cloud CDN** and click **Add origin**.

   ![](@site/static/img/cdn-integration/gcp-cloud-cdn.webp)

2. Select **Custom origin** and enter:
   - **Origin address:** the Ant Media Server **External IP**
   - **Port:** `5080` for HTTP (or `5443` if SSL is configured on the origin)
   - **Origin name:** a descriptive label (for example, `ams-origin`)

   ![](@site/static/img/cdn-integration/cloud-cdn-origin-configuration.webp)

3. Choose **Create new load balancer**, enter a name, and continue.

   ![](@site/static/img/cdn-integration/cloud-cdn-load-balancer.webp)

4. Configure **TTL settings** for your caching policy. Defaults work for most HLS live streaming setups. Complete the wizard.

   ![](@site/static/img/cdn-integration/cloud-cdn-cache-configuration.webp)

5. Note the **load balancer IP address** when provisioning completes. This is the public URL viewers will use.

:::tip Live HLS caching
Use short TTL values for live `.m3u8` playlists and longer TTLs for `.ts` segments if your Cloud CDN policy allows split rules. This keeps playlists fresh while still benefiting from segment caching.
:::

## Step 3: Publish a live stream

1. Publish a stream to Ant Media Server. For this example, use [OBS](/guides/publish-live-stream/rtmp/publish-with-obs/) to send an RTMP publish.
2. Confirm the stream is live in the Ant Media Server web panel before testing playback.
3. Use your application name in playback URLs — for example, `live`.

See the [Publish Live Stream](/guides/publish-live-stream/webrtc/) guides for other ingest options.

## Step 4: Play through Cloud CDN

Build the HLS playback URL using your **load balancer IP**, **application name**, and **stream ID**:

```text
http://{LOAD_BALANCER_IP}/{YOUR_APP}/play.html?id={STREAM_ID}&playOrder=hls
```

Example:

```text
http://203.0.113.10/live/play.html?id=stream01&playOrder=hls
```

Open the URL in a browser. If Cloud CDN and HLS are configured correctly, the stream plays through the CDN edge network.

![](@site/static/img/cdn-integration/cloud-cdn-playback.webp)

The screenshot above shows HLS playback through the Cloud CDN load balancer after a successful publish.

---

## Troubleshooting

| Symptom | What to check |
|---------|----------------|
| Playback URL does not load | Load balancer IP is correct, origin port is open (`5080` or `5443`), firewall rules allow traffic to Ant Media Server. |
| Stream not found | Stream is publishing, application name in URL matches your app (for example, `live`), stream ID is correct. |
| Buffering or stale playlist | TTL may be too high for live `.m3u8` files; reduce playlist cache duration in Cloud CDN settings. |
| Origin errors in CDN logs | Ant Media Server is running, HLS is enabled, and the origin IP/port in Cloud CDN matches the VM. |

For HLS setup details, see [HLS playing](/guides/playing-live-stream/hls-playing/).
