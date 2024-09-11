---
title: Recording to OVH Object Storage
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
