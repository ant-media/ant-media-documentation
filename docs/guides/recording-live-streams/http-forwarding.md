---
title: HTTP Forwarding
description: HTTP forwarding from the server to the bucket
keywords: [HTTP Forwarding, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 5
---

# HTTP Forwarding

HTTP forwarding is implemented to forward incoming HTTP requests to any other place. It's generally used for forwarding incoming requests to a storage system like S3.

:::info
If your files are uploading to the bucket and if you try to access via Ant Media Server URL later, then it will give you a 404 error, so you can use HTTP forwarding to redirect your request to the bucket directly.
:::

Kindly follow the below steps to enable HTTP port forwarding on Ant Media Server:

- Open the management panel of your AMS, go to the Application settings, switch to Advanced settings and set the below properties.

```js
"httpForwardingExtension": "mp4,png,m3u8",
"httpForwardingBaseURL": "https://{BUCKET_URL}",
```

:::info
Don't add any leading, or trailing white spaces.
:::

- If you are using an AWS S3 bucket, the URL will be like this:

    `https://{s3BucketName}.s3.{awsLocation}.amazonaws.com`.

  If you are using Digital Ocean Spaces, the URL will be like this:
  `https://{s3BucketName}.{BucketLocation}.digitaloceanspaces.com`

  Similarly for other S3 storages, you need to put the URL as per their end point pattern.

- After making the changes, save the settings. 

- If it's configured properly, your incoming MP4 or other requests, such as  
`https://domain:5443/AppName/streams/vod.mp4` will be forwarded to `https://s3-bucket-URL/streams/vod.mp4`.
