---
title: Wasabi Storage
description: Record streams to Wasabi Storage
keywords: [S3 Integration with Ant Media Server, S3 Integration, Record streams to Wasabi Storage, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 4
---

# Record Streams TO Wasabi Storage

Wasabi is another cloud provider that is preferred by many Ant Media Server users. You could integrate your Wasabi storage. Let’s see how it can be done with a few steps!

Firstly, you need to create a new access key in your Wasabi account.

![image.png](@site/static/img/image-286129.png)

After generating Access keys and Secret keys, you need to create a bucket. Just click the Create Bucket button on the right side.

![image.png](@site/static/img/image-286229.png)

Then Log in to your Ant Media Server panel at `http://your_ams_server:5080`.
   - Navigate to **Applications** > **live** > **Settings**.
   - Enable **Record Live Streams as MP4** and **Enable S3 Recording**.
   - Enter the following S3 credentials:
     - **Access Key**: `your_access_key`
     - **Secret Key**: `your_secret_key`
     - **Bucket Name**: `your_space_name`
   - **Save** the settings.
![](@site/static/img/image-1648581984499.png )

Your MP4 and Preview files will be uploaded to your **Wasabi storage** automatically.

---

## Enable HTTP Forwarding for Playback

When your stream (mp4, m3u8 or preview) files are uploaded to Wasabi Storage, they are no longer available on Ant Media Server local storage. If you try to play them directly from AMS URLs, you may encounter a **404 Not Found** error.

To resolve this, enable **HTTP Forwarding** so Ant Media Server automatically redirects requests to your OVH Object Storage.

### Steps to Enable HTTP Forwarding

1. Log in to the Ant Media Server Management Panel
2. Navigate to your application (e.g., `live`) and go to **Application Settings → Advanced Settings**.  
3. Set the following properties:

   ```bash
   httpForwardingExtension: mp4,m3u8  
   httpForwardingBaseURL: https://{bucket-name}.s3.{region}.wasabisys.com  
   ```

   Example:  

   ```bash
   httpForwardingExtension: mp4,m3u8  
   httpForwardingBaseURL: https://mybucket.s3.us-east-1.wasabisys.com  
   ```

4. Save your settings

## Playback

Once forwarding is configured, you can share or embed your AMS URLs as usual. The media will actually be served from Wasabi, while users continue to use your Ant Media Server domain.

Now, when you access:

```bash
https://your-domain:5443/live/streams/recording.mp4  
```

Ant Media Server will forward the request to:

```bash
https://mybucket.s3.us-east-1.wasabisys.com/streams/recording.mp4  
```

<br /><br />
---

<div align="center">
<h2> Your Streams have reached the destination 🔥 </h2>
</div>

You’ve successfully set up Ant Media Server to record live streams **directly to Wasabi Storage**. Now, every MP4 you capture is **automatically uploaded, safely stored, and ready for on-demand playback.**  

**Fantastic job** — your streams are now living large in the Wasabi cloud! 🚀🎬

