---
title: Digital Ocean Spaces
description: Record streams to Digital Ocean Spaces
keywords: [S3 Integration with Ant Media Server, S3 Integration, Record streams to Digital Ocean Spaces, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---

# Record Streams To Digital Ocean Spaces Object Storage

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
