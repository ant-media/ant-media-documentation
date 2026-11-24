---
title: AWS S3
description: Record streams to AWS S3
keywords: [S3 Integration with Ant Media Server, S3 Integration, Record streams to AWS S3, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

# Record Streams to AWS S3

Ant Media Server can record live streams directly to Amazon S3, giving you durable, scalable storage outside the server's own lifecycle — recordings persist even if the instance is rebuilt, and you can feed them straight into downstream VOD delivery, archiving, or analytics workflows without managing local disk space.

By the end of this guide, you'll have an IAM user with S3 access, a bucket to record into, and Ant Media Server configured to upload recordings to it automatically.

## Prerequisite: AWS IAM Access for S3

To let Ant Media Server write to S3 programmatically, you need an Access Key ID and Secret Access Key tied to an IAM user with S3 permissions.

1. In the AWS Console, go to **IAM → Users → Create user**. Give it a name, and leave AWS Management Console access unchecked — this user only needs programmatic access.
2. Under **Set permissions**, choose **Attach policies directly** and attach **AmazonS3FullAccess** (or a more restrictive custom S3 policy if you'd rather scope it down).

   ![AWS S3 Full Access Policy](@site/static/img/recording-live-streams/s3-integration/aws_s3_fullaccess.webp)

3. Finish creating the user, then open it, go to the **Security credentials** tab, and under **Access keys** click **Create access key**. Choose **Application running outside AWS** as the use case, then copy the Access Key ID and Secret Access Key somewhere secure — the secret is only shown once.

:::important
Treat the Access Key ID and Secret Access Key like a password. Don't commit them to a repository, paste them into a screenshot, or share them outside of Ant Media Server's own credential fields.
:::

## Create an S3 Bucket

If you don't already have a bucket, create one from the Amazon S3 console. Note the AWS region it's in — you'll need it for the bucket URL later.

![Create S3 Bucket](@site/static/img/recording-live-streams/s3-integration/aws_s3_create_bucket.webp)

Unless you have a specific reason to allow public access, leave **Block all public access** enabled.

![Block Public Access](@site/static/img/recording-live-streams/s3-integration/aws_s3_block_public_access.webp)

## Configure Ant Media Server

1. Log in to your Ant Media Server panel at `https://<DOMAIN_NAME>:5443`.
2. Navigate to **Applications** and select your application (e.g., `live`).
3. Go to **Settings**, enable **Record Live Streams as MP4**, then enable **S3 Recording**.
4. Enter the Access Key, Secret Key, region, and bucket name from the steps above.
5. Click **Save**.

![S3 Recording fields in the AMS panel](@site/static/img/image-285229.png)

Your MP4 and preview files now upload to the bucket automatically once a stream finishes.

## Enable HTTP Forwarding for Playback

Once files upload to S3, they're no longer served from Ant Media Server's local storage, so requesting them by the usual AMS URL returns a 404 until you configure forwarding. See [HTTP Forwarding](/guides/recording-live-streams/http-forwarding/) for the full setup — the bucket URL pattern for AWS S3 is:

```
https://<BUCKET_NAME>.s3.<AWS_REGION>.amazonaws.com
```

## Enable CORS for the Embedded Web Player

To play streams stored in S3 through the [embedded web player](/guides/playing-live-stream/embedded-web-player/), configure CORS on the bucket so cross-origin requests from your Ant Media Server domain are allowed.

In the S3 console, go to your bucket's **Permissions** tab and scroll to **Cross-origin resource sharing (CORS)**. Add:

```json
[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["HEAD", "GET", "PUT", "POST", "DELETE"],
        "AllowedOrigins": ["https://<DOMAIN_NAME>:5443"],
        "ExposeHeaders": []
    }
]
```

`*` in `AllowedOrigins` accepts requests from any origin, which is fine for quick testing, but scope it to your actual domain(s) before going to production.

You now have Ant Media Server recording live streams directly to AWS S3, with playback working through HTTP Forwarding.

## Troubleshooting

- **Uploads fail, or files never appear in the bucket** — check the AMS server logs for `AmazonS3StorageClient` entries. A successful upload logs `File upload has started with key: ...` at INFO; a failed one logs `S3 - Error: Upload failed with key ...` at ERROR along with the underlying AWS error, which tells you whether AMS is even reaching S3 or failing on the AWS side.
- **The error points to a permissions problem** — double-check the IAM user has `AmazonS3FullAccess` (or an equivalent scoped policy) attached, and that the Access Key ID and Secret Access Key entered in the AMS panel match that user's current keys.

## Need Help?

If the steps above don't resolve it, reach out on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or contact [Technical Support](mailto:support@antmedia.io).
