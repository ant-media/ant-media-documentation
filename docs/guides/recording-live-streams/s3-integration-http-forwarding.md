---
title: S3 Integration and HTTP Forwarding 
description: Record streams to S3-compatible systems (AWS S3, OVH, Digital Ocean Space, etc.) and configure HTTP forwarding. S3 Integration and HTTP Forwarding
keywords: [S3 Integration with Ant Media Server, S3 Integration, Record streams to AWS S3, Digital Ocean Space Ant Media Integration, HTTP Forwarding, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---

# S3 Integration and HTTP Forwarding

In this document, we are going to see how we can record streams to S3-compatible systems (AWS, OVH, Digital Ocean, etc.) and configure HTTP forwarding.

Using S3 services is more cost-effective than storing files on your own server. It’s also easy to manage. Furthermore, S3 services have a lot of API capabilities. For example, you can add CORS policies, rules, and triggers to your system.

By following this documentation, you can store MP4, WebM, and HLS files and preview them to your cloud storage automatically.

### Record streams to AWS S3

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

### Record streams to OVH Object Storage

OVH is a cost-effective cloud provider and it is preferred by many people. If you installed Ant Media Server on an OVH cloud instance, you may want to upload your stream recordings to S3 storage. You could do that with a few steps. Let start!

Firstly, you need to generate a Secret Key and Access Key with your OpenStack username and password. You can learn more about it in OVH's documents.

After generating Secret Key and Access, you just need to create an Object Storage as an image.

![image.png](@site/static/img/image-285329.png)

You will see the Dashboard below after clicking Create the Container.

![image.png](@site/static/img/image-285429.png)

Here you see the sample S3 credentials. You need to set to yours:

Then, log in the http://your_ams_server:5080, enable the Record Live Streams as MP4 and Enable S3 Recording, enter the S3 credentials you have created, and save the settings.

![image.png](@site/static/img/image-285529.png)

Your MP4 files and Preview files will be uploaded to your OVH Object Storage automatically.

### Record streams to Digital Ocean Spaces

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

### Record streams to Wasabi Storage

Wasabi is another cloud provider that is preferred by many Ant Media Server users. You could integrate your Wasabi storage. Let’s see how it can be done with a few steps!

Firstly, you need to create a new access key in your Wasabi account.

![image.png](@site/static/img/image-286129.png)

After generating Access keys and Secret keys, you need to create a bucket. Just click the Create Bucket button on the right side.

![image.png](@site/static/img/image-286229.png)

Then, log in to http://your_ams_server:5080, enable Record Live Streams as MP4 and Enable S3 Recording, enter the S3 credentials you have created, and save the settings.  
![](@site/static/img/image-1648581984499.png )

Your MP4 files and Preview files will be uploaded to your Wasabi storage automatically.

### Record streams to Google Cloud Storage

Google Cloud is another cloud provider that is preferred by many Ant Media Server users. You could integrate your Google Cloud cloud instance easily with S3 cloud storage. Let’s see how it can be done with a few steps!

Firstly, you need to create a Bucket. Just click the Create button and fill in the blanks. You should choose the access level to be fine-grained.

![](@site/static/img/image-1665067750280.png)

After creating the Bucket, go to the bucket and create a folder named streams.

![](@site/static/img/image-1665067824644.png )

After creating the streams folder, go to the settings and interoperability tab. On the User Account HMAC section, choose the default project for interoperability access.
 
![](@site/static/img/image-1665067873135.png)

After choosing the default project, create an access key for the user account.  
![](@site/static/img/image-1665067947615.png )

Log in to the Ant media server, enable the Record Live Streams as MP4 and Enable S3 Recording options, enter your S3 credentials, and save the changes. Enter "auto" for Region Name and "https://storage.googleapis.com" for Endpoint.

![](@site/static/img/image-1665068031722.png )

Your MP4 files and Preview files will be uploaded to your Google Cloud Storage Bucket automatically.

### HTTP Forwarding

HTTP forwarding is implemented to forward incoming HTTP requests to any other place. It's generally used for forwarding incoming requests to a storage system like S3.

Let us tell you how HTTP Forwarding works step by step

- Open the management panel of your AMS, go to the Application settings, switch to Advanced settings and set the below properties.

      "httpForwardingExtension": "mp4,png,m3u8",
      "httpForwardingBaseURL": "https://{YOUR_DOMAIN}",

:::info
Don't add any leading, or trailing white spaces.
:::

- If you are using an AWS S3 bucket, the URL will be like this:

    `https://{s3BucketName}.s3.{awsLocation}.amazonaws.com`.

  If you are using Digital Ocean Spaces, the URL will be like this:
  `https://{BucketName}.{BucketLocation}.digitaloceanspaces.com`

- After making the changes, save the settings. 

- If it's configured properly, your incoming MP4 requests, such as  
`https://domain:5443/AppName/streams/vod.mp4` will be forwarded to `https://s3-bucket-URL/streams/vod.mp4`.
    
### HLS HTTP Endpoint

HLS HTTP Endpoint is implemented to push the HLS content (m3u8 and ts files) to any HTTP endpoint, such as CDN or your own HTTP endpoint. You can enable it with the following steps:

1. Open the management panel of your AMS. Go to the Application settings, and switch to Advanced settings.

2. Add the following property to the file:

```
hlsHttpEndpoint=https://example.com/hls-stream/
```

Kindly make sure to update the HTTP URL with your own. 

3. Save the file to apply the settings.

After that, just push a stream to Ant Media Server with stream123, and AMS will push the files to the following endpoints with the PUT method

```
https://example.com/hls-stream/stream123.m3u8
https://example.com/hls-stream/stream123_360p800kbps0001.ts
https://example.com/hls-stream/stream123_360p800kbps0002.ts
https://example.com/hls-stream/stream123_360p800kbps0003.ts
https://example.com/hls-stream/stream123.m3u8
. . .
```

### Uploading HLS files to the S3 bucket in real-time

When you use S3 integration, your record will be uploaded as soon as the livestream is finished.

If you want to upload your HLS content (m3u8 and ts files) in real-time to the S3-compatible systems (AWS, OVH, Digital Ocean, etc.), you can use the `HLS Upload` servlet.

To be able to use the HLS Upload servlet first, you should enter S3 credentials into the management console. Then, you can use HLS HTTP Endpoint instructions with the following property:
- Open the management panel of your AMS, Go to the Application settings, and switch to Advanced settings.
- Locate the setting hlsHttpEndpoint and set it to:

```
hlsHttpEndpoint=http://localhost:5080/LiveApp/hls-upload
```

Here, LiveApp is the application name and you can replace it with your preferred application.

- It can also be set as:

```
hlsHttpEndpoint=https://{SERVER_DOMAIN}:5443/{APPLICATION_NAME}/hls-upload
```

### How to play AWS S3 VOD files with Embedded Web Player?

If you would like to embed the VODs stored in AWS S3 bucket, you need to configure CORS parameters on AWS S3 Bucket Permissions

CORS parameters of the AWS S3 bucket should be modified so that the requests that are coming from another origin to play the VODs can be processed.

Go to your ``` AWS -> Services -> S3 -> Buckets -> "Your Bucket" -> Permissions``` 

At the bottom of the page, there is Cross-origin resource sharing (CORS). The CORS configuration, written in JSON, defines a way for client web applications that are loaded in one domain to interact with resources in a different domain."  

Click Edit and paste the code provided below:

You need to put your AMS domain address to the allowed origins field.

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

`*` on the origin field, as it accepts requests from all origins, can be used for quick testing. However, it can be changed to allow permissions for exact origins, such as ```"http://www.your-domain.com"``` since you only want to accept requests that are coming from your end.
