---
title: S3 Upload Record Type
description: Uploading file type to S3 storage
keywords: [S3 Integration with Ant Media Server, S3 Integration, Record streams to cloud storage, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 8
---

# S3 Upload Record Type

In previous documents under S3 recording, we learned about recording streams to various cloud storages.

By default, Ant Media Server records and uploads all types of files, like **HLS**, **MP4**/**WebM** or **PNG** to the bucket. 

In one of the cases, the user wants to play the streams with HLS and record with MP4 but does not want to record the HLS files to the bucket. This condition can be controlled using below application property.

```js
"uploadExtensionsToS3": 7
```
  
You can change this property in the Application's Advanced settings on web panel. The default value is 7, which uploads all HLS, MP4/WebM and PNG files if enabled.

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
