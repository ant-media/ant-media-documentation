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

Then, log in to http://your_ams_server:5080, enable Record Live Streams as MP4 and Enable S3 Recording, enter the S3 credentials you have created, and save the settings.  
![](@site/static/img/image-1648581984499.png )

Your MP4 files and Preview files will be uploaded to your Wasabi storage automatically.

---

## Enable HTTP Forwarding for Wasabi Storage Playback

When your MP4 or preview files are uploaded to Wasabi Storage, they are no longer available on Ant Media Server local storage. If you try to play them directly from AMS URLs, you may encounter a **404 Not Found** error.

To fix this, enable **HTTP Forwarding** so Ant Media Server redirects playback requests to your Wasabi bucket.

### Steps to Enable HTTP Forwarding

1. Log in to the **Ant Media Server Management Panel**.  
2. Navigate to your application (e.g., `LiveApp`) and go to  
   **Application Settings → Advanced Settings**.  
3. Set the following properties:

httpForwardingExtension: mp4,m3u8  
httpForwardingBaseURL: https://{bucket-name}.s3.{region}.wasabisys.com  

Example:  
httpForwardingExtension: mp4,m3u8  
httpForwardingBaseURL: https://mybucket.s3.us-east-1.wasabisys.com  

4. Save your settings and restart Ant Media Server.

Now, when you access:

https://your-domain:5443/AppName/streams/recording.mp4  

Ant Media Server will forward the request to:

https://mybucket.s3.us-east-1.wasabisys.com/streams/recording.mp4  

---

## Next Steps: Playback from Wasabi Storage

Once forwarding is configured, you can share or embed your AMS URLs as usual. The media will actually be served from Wasabi, while users continue to use your Ant Media Server domain.