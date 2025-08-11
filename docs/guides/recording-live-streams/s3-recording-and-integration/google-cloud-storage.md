---
title: Google Cloud Storage
description: Record streams to Google Cloud Storage
keywords: [S3 Integration with Ant Media Server, S3 Integration, Record streams to Google Cloud Storage, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 5
---

# Record Streams To Google Cloud Storage

Google Cloud is another cloud provider that is preferred by many Ant Media Server users. You could integrate your Google Cloud cloud instance easily with S3 cloud storage. Let’s see how it can be done with a few steps!

1. Firstly, you need to create a Bucket. Just click the Create button and fill in the blanks. You should choose the access level to be `Fine-grained`

![](@site/static/img/image-1665067750280.png)

2. Go to the bucket and create a folder named `streams`

![](@site/static/img/image-1665067824644.png )

3. Go to the `Settings` on the left and select `Interoperability` tab. On the `User Account HMAC` section, choose the default project for interoperability access.
 
![](@site/static/img/image-1665067873135.png)

4. Create an access key for the user account  
![](@site/static/img/image-1665067947615.png )

5. Log in to the Ant media server, enable the `Record Live Streams as MP4` and `Enable S3 Recording` options, enter your S3 credentials, and save the changes. Pay attention that enter `auto` for `Region Name` and `https://storage.googleapis.com` for `Endpoint`

![](@site/static/img/image-1665068031722.png )

Congratz, your MP4 files and preview files will be uploaded to your Google Cloud Storage Bucket automatically.
