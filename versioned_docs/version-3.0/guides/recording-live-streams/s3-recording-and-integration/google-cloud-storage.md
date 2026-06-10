---
title: Google Cloud Storage
description: Record streams to Google Cloud Storage
keywords: [S3 Integration with Ant Media Server, S3 Integration, Record streams to Google Cloud Storage, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 5
---

# Record Streams To Google Cloud Storage

Google Cloud is another cloud provider that is preferred by many Ant Media Server users. You could integrate your Google Cloud cloud instance easily with S3 cloud storage. Let’s see how it can be done with a few steps!

1. Firstly, you need to create a Bucket. Just click the Create button and fill in the blanks. You should choose the access level to be `Fine-grained`

![](@site/static/img/image-1665067750280.png)

2. Go to the bucket and create a folder named `streams`

![](@site/static/img/image-1665067824644.png )

3. Go to the `Settings` on the left and select `Interoperability` tab. On the `User Account HMAC` section, choose the default project for interoperability access.
 
![](@site/static/img/image-1665067873135.png)

4. Create an access key for the user account  
![](@site/static/img/image-1665067947615.png )

5. **Configure Ant Media Server**
   - Log in to your Ant Media Server panel at `http://your_ams_server:5080`.
   - Navigate to **Applications** > **live** > **Settings**.
   - Enable **Record Live Streams as MP4** and **Enable S3 Recording**.
   - Enter the following **S3** credentials:
     - **Access Key**: `your_access_key`
     - **Secret Key**: `your_secret_key`
     - **Bucket Name**: `your_space_name`
   - **Save** the settings.

![](@site/static/img/image-1665068031722.png )

Congrats, your MP4 and preview files will be uploaded to your **Google Cloud Storage Bucket** automatically.


## Enable HTTP Forwarding for Playback

After uploading to Google Cloud Storage, your files will no longer be available in the Ant Media Server local storage. If you try to access them using an AMS URL, you may encounter a **404 Not Found** error.

To resolve this, enable **HTTP Forwarding** so Ant Media Server automatically redirects requests to your OVH Object Storage.

### Steps to Enable HTTP Forwarding

1. Log in to the Ant Media Server Management Panel
2. Navigate to your application (e.g., `live`) and go to **Application Settings → Advanced Settings**.  
3. Set the following properties:

   ```bash
   httpForwardingExtension: mp4,m3u8  
   httpForwardingBaseURL: https://storage.googleapis.com/{bucket-name}  
   ```

   Example:  

   ```bash
   httpForwardingExtension: mp4,m3u8  
   httpForwardingBaseURL: https://storage.googleapis.com/mybucket  
   ```

4. Save your settings


## Playback

Once forwarding is configured, your VOD files stored in Google Cloud Storage can be played directly using AMS URLs.  
The media will be served from Google Cloud, while viewers continue to use your Ant Media Server domain.

Now, when you access:

```bash
https://your-domain:5443/live/streams/recording.mp4  
```

Ant Media Server will forward the request to:

```bash
https://storage.googleapis.com/mybucket/streams/recording.mp4  
```

<br /><br />
---

<div align="center">
<h2> Your Streams, Your Cloud! ☁️🚀 </h2>
</div>

Congratulations! You've successfully configured Ant Media Server to record live streams directly to **Google Cloud Storage**. Your MP4 and preview files are now automatically **uploaded and ready for on-demand playback.**

Tada!! — your streams have officially taken rest in the cloud! 🎬✨

