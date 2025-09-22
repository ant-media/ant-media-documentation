---
title: S3 Upload Record Type
description: Uploading file type to S3 storage
keywords: [S3 Integration with Ant Media Server, S3 Integration, Record streams to cloud storage, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 8
---

# S3 Upload Record Type

In previous documents under S3 recording, we learned about recording streams to various cloud storages.

By default, Ant Media Server records and uploads all file types (e.g., **HLS, MP4/WebM, PNG**) to the bucket.

For instance, if a user wants to stream using HLS and record in MP4 format without uploading HLS files to the bucket. This can be controlled using the following application property:.

```js
"uploadExtensionsToS3": 7
```
  
You can modify this property in the application's Advanced Settings in the web panel. By default, the value is 7, uploading all HLS, MP4/WebM, and PNG files when enabled.

This setting is a number where the digits represent whether an upload will be done or not. The least significant digit switches `MP4/WebM` files, the second switches `HLS` and the third switches `PNG`.

**Example:** `uploadExtensionsToS3=5` (101 in binary) means upload MP4/WebM and PNG but not HLS.

Possible values are as follows:

 - No upload: `js uploadExtensionsToS3=0`
 
 - Only MP4/WebM upload: `uploadExtensionsToS3=1`

 - HLS upload only: `uploadExtensionsToS3=2`

 - HLS and Mp4/WebM upload: `uploadExtensionsToS3=3`

 - PNG upload only: `uploadExtensionsToS3=4`

 - PNG and MP4/WebM upload: `uploadExtensionsToS3=5`

 - PNG and HLS upload: `uploadExtensionsToS3=6`

 - Upload everything: `uploadExtensionsToS3=7`


Other than MP4 and WebM, HLS recording can also be done. Check out the [HLS recording document](https://antmedia.io/docs/guides/playing-live-stream/hls-playing/#save-hls-records).


<br /><br />
---

<div align="center">
<h2> 🎯 Tailored S3 Uploads! 🗂️ </h2>
</div>

You've fine-tuned your Ant Media Server's recording settings by configuring the **`uploadExtensionsToS3` property**. Whether it's uploading only MP4/WebM files, excluding HLS, or any other combination, your recordings are now efficiently managed. This customization ensures that only the desired file types are uploaded to your S3 bucket, optimizing storage and streamlining your workflow.

Keep up the great work — your live streaming setup is **now more efficient than ever!** 🚀
