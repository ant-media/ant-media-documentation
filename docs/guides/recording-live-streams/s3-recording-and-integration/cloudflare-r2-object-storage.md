---
title: Cloudflare R2 Object Storage
description: Record streams to Cloudflare R2 Object Storage
keywords: [S3 Integration with Ant Media Server, S3 Integration, Record streams to Cloudflare R2 Storage, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 8
---

# Record Streams To Cloudflare R2 Object Storage

Cloudflare is another cloud provider that is preferred by many Ant Media Server users. You could integrate your AMS instance easily with Cludflare R2 object storage. Let’s see how it can be done with a few steps!

- Firstly, you need to create an R2 storage bucket. Just go to the R2 object storage in the Cloudflare panel and click on `Create Bucket`.

![image.png](@site/static/img/recording-live-streams/s3-integration/cloudflare-r2-storage/cloudflare-R2-bucket.png)

You just need to put your bucket name and other settings as shown below:

![image.png](@site/static/img/recording-live-streams/s3-integration/cloudflare-r2-storage/r2-bucket-create.png)

- After creating the bucket, you need to create API token for Access and Secret keys. Just click the Manage API Token button.

![image.png](@site/static/img/recording-live-streams/s3-integration/cloudflare-r2-storage/manage-api-token.png)

- Under Manage API token, you need to create the Account API token.

![image.png](@site/static/img/recording-live-streams/s3-integration/cloudflare-r2-storage/create-api-token.png)

- After that, create the Account API token with the below settings:

![image.png](@site/static/img/recording-live-streams/s3-integration/cloudflare-r2-storage/api-token-settings.png)

- After generating the token, copy the Access key, Secret key and the Endpoint.

![image.png](@site/static/img/recording-live-streams/s3-integration/cloudflare-r2-storage/api-token-access.png)

- Then, log in to your AMS web panel and go to any application that you use, enable the Record Live Streams as MP4 and enable S3 Recording, enter the S3 credentials you have created, and save the settings.

![image.png](@site/static/img/recording-live-streams/s3-integration/cloudflare-r2-storage/ams-bucket-settings.png)

Your recording files will be uploaded to your Cloudflare R2 Object Storage automatically.


## Enable HTTP Forwarding for Playback

When your stream (mp4, m3u8 or preview) files are uploaded to R2 Object Storage, they are removed from Ant Media Server local storage. If you try to access them using the AMS URL, you may encounter a **404 Not Found** error.

To resolve this, enable **HTTP Forwarding** so Ant Media Server automatically redirects requests to your OVH Object Storage.

### Steps to Enable HTTP Forwarding

- Before enabling the HTTP forwarding, the bucket is not public so you need to generate the public development URL from bucket settings to make the bucket objects public.

![image.png](@site/static/img/recording-live-streams/s3-integration/cloudflare-r2-storage/public-development-url.png)

- After enabling the public development URL, copy it, as it will be needed in AMS settings. Following this:

  1. Log in to the Ant Media Server Management Panel
  2. Navigate to your application (e.g., `LiveApp`) and go to **Application Settings → Advanced Settings**.  
  3. Set the following properties:

     ```bash
     httpForwardingExtension: mp4,m3u8  
     httpForwardingBaseURL: https://pub-xxxx.r2.dev 
     ```

     Example:  

     ```bash
     "httpForwardingExtension": "m3u8,mp4",
     "httpForwardingBaseURL": "https://pub-f6fd12cbd8f04a04a16547587df49ce4.r2.dev",
     ```

4. Save your settings

## Playback

With forwarding enabled, your VOD files stored in Cloudflare R2 Object Storage can be played directly from AMS URLs, while the files are actually served from your R2 storage.

Now when you access the

```bash
https://your-domain:5443/AppName/streams/streamId.mp4  
```

Ant Media Server will forward the request to:

```bash
https://pub-xxxx.r2.dev/streams/streamId.mp4
```

