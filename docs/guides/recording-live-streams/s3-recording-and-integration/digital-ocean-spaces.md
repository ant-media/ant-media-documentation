---
title: Digital Ocean Spaces
description: Record streams to Digital Ocean Spaces
keywords: [S3 Integration with Ant Media Server, S3 Integration, Record streams to Digital Ocean Spaces, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---

# Record Streams To Digital Ocean Spaces Object Storage

DigitalOcean is another cloud provider that is preferred by many Ant Media Server users. You could integrate your DigitalOcean cloud instance easily with S3 cloud storage. Let’s see how it can be done with a few steps!

Firstly, you need to create Spaces. Just click the Space button and fill in the blanks.

![image.png](@site/static/img/image-285629.png)

After creating Spaces you need to create API keys for Access and Secret keys. Just click the API button on the left side and then click Generate New Key.

![image.png](@site/static/img/image-285729.png)

Just type the Name parameter and click the Create button.

![image.png](@site/static/img/image-285829.png)

After generating Access keys and Secret keys, there is only one step left.

![image.png](@site/static/img/image-285929.png)

Then, log in the http://your_ams_server:5080, enable the Record Live Streams as MP4 and Enable S3 Recording, enter the S3 credentials you have created, and save the settings.

![image.png](@site/static/img/image-286029.png)

Your MP4 files and Preview files will be uploaded to your Digital Ocean Spaces automatically.


## Enable HTTP Forwarding for Playback

When your stream (mp4, m3u8 or preview) files are uploaded to DigitalOcean Spaces, they are removed from Ant Media Server local storage. If you try to access them using the AMS URL, you may encounter a **404 Not Found** error.

To resolve this, enable **HTTP Forwarding** so Ant Media Server automatically redirects requests to your OVH Object Storage.

### Steps to Enable HTTP Forwarding

1. Log in to the Ant Media Server Management Panel
2. Navigate to your application (e.g., `live`) and go to **Application Settings → Advanced Settings**.  
3. Set the following properties:

   ```bash
   httpForwardingExtension: mp4,m3u8  
   httpForwardingBaseURL: https://{s3BucketName}.{region}.digitaloceanspaces.com  
   ```

   Example:  

   ```bash
   httpForwardingExtension: mp4,m3u8  
   httpForwardingBaseURL: https://mybucket.nyc3.digitaloceanspaces.com  
   ```

4. Save your settings

## Playback

With forwarding enabled, your VOD files stored in DigitalOcean Spaces can be played directly from AMS URLs, while the files are actually served from your DigitalOcean Space.

Now when you access:

```bash
https://your-domain:5443/live/streams/recording.mp4  
```

Ant Media Server will forward the request to:

```bash
https://mybucket.nyc3.digitaloceanspaces.com/streams/recording.mp4  
```

