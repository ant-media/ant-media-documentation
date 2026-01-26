---
title: MinIO Storage
description: Record streams to MinIO Storage Bucket
keywords: [S3 Integration with Ant Media Server, S3 Integration, Record streams to MinIO Storage, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 6
---

# Record Streams To MinIO Storage Bucket

MinIO is an open-source, high-performance object storage system that adheres to the Amazon S3 API standards. It enables organizations to deploy scalable, cost-effective storage solutions on-premises or in the cloud. Unlike proprietary options like AWS S3 and Google Cloud Storage, MinIO offers greater control over infrastructure and customization, making it ideal for edge computing, hybrid cloud setups, and data-intensive applications. It supports seamless integration with existing S3-compatible tools and applications.

For this document, we installed MinIO on our Ubuntu Linux server. For installation, check [here](https://min.io/docs/minio/linux/operations/installation.html). We used [single node and single drive](https://min.io/docs/minio/linux/operations/install-deploy-manage/deploy-minio-single-node-single-drive.html) option.

Once the installation is done and you are able to access the MinIO console on your browser with http://IP-or-domain:9001, follow below steps for integration with Ant Media Server.

- First, go to Configuration and set the region. As MinIO uses the AWS S3 API's, you can define the same region names, like `ap-south-1` for Asia Pacific, etc., as per your region. After setting the region, it will ask you to restart the server.
            ![](@site/static/img/recording-live-streams/s3-integration/minio-bucket-integration/minio-region.png)

- Once the region is set, go to Access Keys and generate one access key to use on the Ant Media Server to access the bucket.

![](@site/static/img/recording-live-streams/s3-integration/minio-bucket-integration/minio-access-key.png)

- Now, go to the buckets and create one S3 bucket. After the bucket is created, make sure that it is public.

![](@site/static/img/recording-live-streams/s3-integration/minio-bucket-integration/minio-bucket.png)
 
- Now, in order to record the stream to the MinIO bucket, enable the S3 recording option in application settings and add the required details according to your bucket information.

![](@site/static/img/recording-live-streams/s3-integration/minio-bucket-integration/ams-settings.png)

- Once the stream is published and stopped, the recording will be uploaded to the bucket under the streams folder.

![](@site/static/img/recording-live-streams/s3-integration/minio-bucket-integration/minio-bucket-objects.png)


## Enable HTTP Forwarding for Playback

After uploading to MinIO, your files will no longer be stored in the Ant Media Server local storage. If you try to access them via the AMS URL, you may encounter a **404 Not Found** error.

To resolve this, enable **HTTP Forwarding** so Ant Media Server automatically redirects requests to your OVH Object Storage.

### Steps to Enable HTTP Forwarding

1. Log in to the Ant Media Server Management Panel
2. Navigate to your application (e.g., `live`) and go to **Application Settings → Advanced Settings**.  
3. Set the following properties:

   ```bash
   httpForwardingExtension: mp4,m3u8  
   httpForwardingBaseURL: http://{your-minio-domain}:{port}/{bucket-name}  
   ```

   Example:  

   ```bash
   httpForwardingExtension: mp4,m3u8  
   httpForwardingBaseURL: http://minio.example.com:9000/mybucket  
   ```

4. Save the settings

## Playback

With forwarding enabled, your recorded files stored in MinIO can be played using AMS URLs.  Your viewers continue to access media via Ant Media Server, while the actual content is served from MinIO.

Now, when you access:

```bash
https://your-domain:5443/live/streams/recording.mp4  
```

<br /><br />
---

<div align="center">
<h2> Your Streams are Now Min-ified! 🧱☁️ </h2>
</div>

**Congratulations!** You've successfully configured Ant Media Server to record live streams directly to your **MinIO bucket.** Your MP4 and preview files are now securely uploaded and ready for on-demand playback.

Meraki! — your streams are now **safely stored in your MinIO fortress!** 🏰🎬


Ant Media Server will forward the request to:

```bash
http://minio.example.com:9000/mybucket/streams/recording.mp4  
```
