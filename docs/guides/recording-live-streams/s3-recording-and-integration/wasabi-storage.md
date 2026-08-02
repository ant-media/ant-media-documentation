---
title: Wasabi Storage
description: Record streams to Wasabi Storage
keywords: [S3 Integration with Ant Media Server, S3 Integration, Record streams to Wasabi Storage, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 5
---

# Record Streams to Wasabi Storage

Wasabi is an S3-compatible object storage service, so Ant Media Server can record to it the same way it does with AWS S3.

By the end of this guide, you'll have a Wasabi bucket, an access key for it, and Ant Media Server configured to upload recordings there automatically.

## Create an Access Key and Bucket

1. In your Wasabi console, go to **Access Keys** and create a new key. Wasabi shows the Access Key and Secret Key once — copy both immediately.
2. Go to **Buckets** and create a new bucket, noting the region you create it in.

:::important
Treat the Access Key and Secret Key like a password — especially a root account key, which has full access to your Wasabi account. Don't commit them to a repository, paste them into a screenshot, or share them outside of Ant Media Server's own credential fields. If you're setting this up for production, consider creating a scoped-down user key instead of using the root account key.
:::

## Configure Ant Media Server

1. Log in to your Ant Media Server panel at `https://<DOMAIN_NAME>:5443`.
2. Navigate to **Applications** and select your application (e.g., `live`).
3. Go to **Settings**, enable **Record Live Streams as MP4**, then enable **S3 Recording**.
4. Enter the Access Key, Secret Key, bucket name, and region.
5. Click **Save**.

Your MP4 and preview files now upload to the bucket automatically once a stream finishes.

## Enable HTTP Forwarding for Playback

Once files upload to Wasabi, they're no longer served from Ant Media Server's local storage, so requesting them by the usual AMS URL returns a 404 until you configure forwarding. See [HTTP Forwarding](/guides/recording-live-streams/http-forwarding/) for the full setup — the bucket URL pattern for Wasabi is:

```
https://<BUCKET_NAME>.s3.<REGION>.wasabisys.com
```

You now have Ant Media Server recording live streams directly to Wasabi, with playback working through HTTP Forwarding.

## Troubleshooting

- **Uploads fail, or files never appear in the bucket** — check the AMS server logs for `AmazonS3StorageClient` entries. A successful upload logs `File upload has started with key: ...` at INFO; a failed one logs `S3 - Error: Upload failed with key ...` at ERROR along with the underlying error, which tells you whether AMS is even reaching Wasabi or failing on Wasabi's side.
- **The error points to a permissions problem** — double-check the access key's permissions and that the Access Key and Secret Key entered in the AMS panel are current, especially if you're using a scoped-down user key rather than the root account key.

## Need Help?

If the steps above don't resolve it, reach out on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or contact [Technical Support](mailto:support@antmedia.io).
