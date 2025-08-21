---
title: AWS S3 
description: Record streams to AWS S3
keywords: [S3 Integration with Ant Media Server, S3 Integration, Record streams to AWS S3, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

# Record Streams To AWS S3

In order to programmatically access S3, you should have an access token and secret keys. You can create a programmatic user to have an access token and secret key from the AWS IAM (Identity and Access Management) console.

![image.png](@site/static/img/image-284429.png)

![image.png](@site/static/img/image-284529.png)

Just add a user by checking the Programmatic Access box and then in the next section, click Attach existing policies directly and add AmazonS3FullAccess access permission to this user. Copy the access token and secret key for this user.

![image.png](@site/static/img/image-284629.png)

![image.png](@site/static/img/image-284729.png)

Right now, you should have the access token, secret key, and bucket name in your hand.

![image.png](@site/static/img/image-284829.png)

You also need to know the region of your bucket. If you do not have any bucket, you can create it on S3 Console

![image.png](@site/static/img/image-284929.png)

![image.png](@site/static/img/image-285029.png)

![image.png](@site/static/img/image-285129.png)

Here you see the sample S3 credentials. You need to set to yours:

Then, log in to http://your_ams_server:5080, enable Record Live Streams as MP4 and Enable S3 Recording, enter the S3 credentials you have created, and save the settings.

![image.png](@site/static/img/image-285229.png)

Your MP4 files and Preview files will be uploaded to your S3 Storage automatically.


## Enable HTTP Forwarding for Playback

When your MP4 or preview files are uploaded to AWS S3, they will no longer be available on the Ant Media Server local storage. If you try to play them directly from AMS using the usual URL, you may receive a **404 Not Found** error.

To fix this, configure **HTTP Forwarding** so that Ant Media Server automatically forwards requests to the AWS S3 bucket for the playback.

### Steps to Enable HTTP Forwarding

1. Log in to the Ant Media Server Management Panel
2. Navigate to your application and go to  **Application Settings → Advanced Settings**.  
3. Set the following properties:

   ```bash
   httpForwardingExtension: mp4,m3u8  
   httpForwardingBaseURL: https://s3BucketName.s3.awsRegion.amazonaws.com  
   ```

   Example:

   ```bash
   httpForwardingExtension: mp4,m3u8  
   httpForwardingBaseURL: https://myvideos.s3.us-east-1.amazonaws.com  
   ```

4. Save your settings

Now, when you access:

```bash
https://your-domain:5443/AppName/streams/recording.mp4  
```

Ant Media Server will forward the request to:

```bash
https://myvideos.s3.us-east-1.amazonaws.com/streams/recording.mp4  
```

## Play streams from an AWS S3 bucket using the embedded web player

If you would like to play the streams stored in an AWS S3 bucket, you need to configure CORS parameters on AWS S3 bucket permissions.

CORS parameters of the AWS S3 bucket should be modified so that the requests that are coming from another origin to play the VODs can be processed.

Go to your  `AWS -> Services -> S3 -> Buckets -> "Your Bucket" -> Permissions`

At the bottom of the page, there is cross-origin resource sharing (CORS). The CORS configuration, written in JSON, defines a way for client web applications that are loaded in one domain to interact with resources in a different domain."

Click Edit and paste the code provided below:

You need to put your AMS domain address in the allowed origins field.

```json
    [
        {
            "AllowedHeaders": [
                "*"
            ],
            "AllowedMethods": [
                "HEAD",
                "GET",
                "PUT",
                "POST",
                "DELETE"
            ],
            "AllowedOrigins": [
                "https://your-AMS-domain:5443"
            ],
            "ExposeHeaders": []
        }
    ]
```

`*` on the origin field, as it accepts requests from all origins, can be used for quick testing. However, it can be changed to allow permissions for exact origins, such as `http://www.your-domain.com` since you only want to accept requests that are coming from your end.
