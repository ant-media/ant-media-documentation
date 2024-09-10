---
title: Recording to AWS S3 
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
