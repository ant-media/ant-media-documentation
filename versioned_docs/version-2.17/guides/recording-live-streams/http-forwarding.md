---
title: HTTP Forwarding
description: HTTP forwarding from the server to the bucket
keywords: [HTTP Forwarding, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 6
---

# HTTP Forwarding

HTTP Forwarding allows Ant Media Server (AMS) to forward incoming HTTP requests to an external storage system.  
This is typically used when recordings or VOD files are automatically uploaded to a bucket (e.g., **Amazon S3**, **DigitalOcean Spaces**, or another S3-compatible storage).

Without forwarding, accessing a file uploaded to the bucket from Ant Media Server may result in a **404 Not Found error**. HTTP Forwarding ensures seamless redirection of those requests.

---

## When to Use HTTP Forwarding

- You are uploading recordings or assets directly from Ant Media Server to a storage bucket.
- You want users to access files using the same Ant Media Server URL, without needing to manually provide the bucket link.
- You need a smooth fallback mechanism to avoid 404 errors after uploads.

---

## Step 1: Configure HTTP Forwarding in the AMS Management Panel

1. Log in to the **Ant Media Server Management Panel**.  
2. Navigate to **Applications** and select your application (e.g., `live`).  
3. Go to **Application Settings → Advanced Settings**.  
4. Locate the HTTP Forwarding section and set the following properties depending on your settings:

   ```bash
   httpForwardingExtension: mp4,m3u8,png 
   httpForwardingBaseURL: https://BUCKET_URL
   ```

:::info
- **httpForwardingExtension**: A comma-separated list of file extensions to forward.  

- **httpForwardingBaseURL**: The base URL of your bucket (without trailing slash).  
:::

:::important
Do **not** include leading or trailing spaces in these fields.
:::

---

## Step 2: Find the Correct Bucket URL

The format of your `httpForwardingBaseURL` depends on the storage provider:

- **AWS S3**  
  
Pattern:
  
```bash 
  https://s3BucketName.s3.awsRegion.amazonaws.com
```  

Example:  
  
```bash
https://myvideos.s3.us-east-1.amazonaws.com
```

- **DigitalOcean Spaces**  
  
Pattern:

```bash
https://s3BucketName.region.digitaloceanspaces.com
```  
  
Example:

```bash
https://myvideos.nyc3.digitaloceanspaces.com
```

- **Google Cloud Storage (GCS)**

Pattern:

```bash
https://storage.googleapis.com/s3BucketName
```

Example:

```bash
https://storage.googleapis.com/myvideos
```

---

## Step 3: Save and Apply Changes

After entering the details:

1. Click **Save Settings**.  
2. Restart the current streams for the changes to take effect.

---

## Step 4: Test HTTP Forwarding

Once configured, try accessing a file via Ant Media Server. For example:

```bash
https://your-domain:5443/live/streams/sample.mp4
```

If forwarding is working, AMS will automatically serve the file from your bucket:

```bash
https://s3BucketName.s3.awsRegion.amazonaws.com/streams/sample.mp4  
```

---

## Troubleshooting

- **Getting 404 errors?**
  - Verify the file is actually in the bucket at the expected path.  
  - Double-check there are no typos or spaces in your `httpForwardingBaseURL`.  
  - Ensure your bucket has the correct permissions for public or signed access.  

- **Files not forwarding?**
  - Make sure the file extension is included in `httpForwardingExtension`.  
  - Check if your AMS application was restarted after saving settings.

---

With HTTP Forwarding enabled, Ant Media Server seamlessly redirects requests to your storage bucket, ensuring uninterrupted playback and access for your users.

<br /><br />
---

<div align="center">
<h2> 🔄 Seamless Playback at your service 🌐 </h2>
</div>

You've successfully configured **HTTP Forwarding in Ant Media Server.** Now, when users request files like MP4 or M3U8, AMS will seamlessly **redirect them to your storage bucket**, ensuring uninterrupted playback. Whether you're using AWS S3, DigitalOcean Spaces, or another S3-compatible service, your setup is optimized for smooth delivery.

Keep it up 🫡 — your live streaming setup is now more **seamless than ever!** 🚀

