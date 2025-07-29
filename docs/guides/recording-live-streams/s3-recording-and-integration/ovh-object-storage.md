---
title: OVH Object Storage
description: Record streams to OVH Object Storage
keywords: [S3 Integration with Ant Media Server, S3 Integration, Record streams to OVH Object Storage, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

# Record Streams To OVH Object Storage

OVH is a cost-effective cloud provider that many people prefer. If you installed Ant Media Server on an OVH cloud instance, you may wish to upload your stream recordings to S3 storage. You could accomplish that in a few steps. Let us get started!

Firstly, you need to generate a Secret Key and Access Key with your OpenStack username and password. You can learn more about it in OVH's documents.

After generating the Secret Key and Access Key, you just need to create an Object Storage as an image.

![image.png](@site/static/img/image-285329.png)

You will see the Dashboard below after clicking Create the Container.

![image.png](@site/static/img/image-285429.png)

Here you see the sample S3 credentials. You need to set to yours:

Then, log in the http://your_ams_server:5080, enable Record Live Streams as MP4 and Enable S3 Recording, enter the S3 credentials you have created, and save the settings.

![image.png](@site/static/img/image-285529.png)

Your MP4 files and Preview files will be uploaded to your OVH Object Storage automatically.

---

## Enable HTTP Forwarding for OVH Object Storage Playback

When your MP4 or preview files are uploaded to OVH Object Storage, they are no longer available on the Ant Media Server local storage. If you try to play them directly from AMS using the usual URL, you may encounter a **404 Not Found** error.

To resolve this, enable **HTTP Forwarding** so Ant Media Server automatically redirects requests to your OVH Object Storage.

### Steps to Enable HTTP Forwarding

1. Log in to the **Ant Media Server Management Panel**.  
2. Navigate to your application (e.g., `LiveApp`) and go to  
   **Application Settings → Advanced Settings**.  
3. Set the following properties:

httpForwardingExtension: mp4,m3u8  
httpForwardingBaseURL: https://{s3BucketName}.{region}.cloud.ovh.net  

Example:  
httpForwardingExtension: mp4,m3u8  
httpForwardingBaseURL: https://mybucket.gra.cloud.ovh.net  

4. Save your settings and restart restart Ant Media Server.

Now, when you access:

https://your-domain:5443/AppName/streams/recording.mp4  

Ant Media Server will forward the request to:

https://mybucket.gra.cloud.ovh.net/streams/recording.mp4  

---

## Next Steps: Playback from OVH

Once forwarding is set up, you can embed or share the playback URLs directly from AMS, and behind the scenes, the requests will be served from your OVH Object Storage.