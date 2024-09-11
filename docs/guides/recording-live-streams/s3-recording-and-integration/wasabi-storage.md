---
title: Recording to Wasabi Storage
description: Record streams to Wasabi Storage
keywords: [S3 Integration with Ant Media Server, S3 Integration, Record streams to Wasabi Storage, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 4
---

# Record Streams TO Wasabi Storage

Wasabi is another cloud provider that is preferred by many Ant Media Server users. You could integrate your Wasabi storage. Let’s see how it can be done with a few steps!

Firstly, you need to create a new access key in your Wasabi account.

![image.png](@site/static/img/image-286129.png)

After generating Access keys and Secret keys, you need to create a bucket. Just click the Create Bucket button on the right side.

![image.png](@site/static/img/image-286229.png)

Then, log in to http://your_ams_server:5080, enable Record Live Streams as MP4 and Enable S3 Recording, enter the S3 credentials you have created, and save the settings.  
![](@site/static/img/image-1648581984499.png )

Your MP4 files and Preview files will be uploaded to your Wasabi storage automatically.
