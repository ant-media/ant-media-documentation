---
title: MinIO Storage
description: Record streams to MinIO Storage Bucket
keywords: [S3 Integration with Ant Media Server, S3 Integration, Record streams to MinIO Storage, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 8
---

# Record Streams to MinIO Storage

MinIO is an open-source, S3-compatible object storage system you run yourself, so Ant Media Server can record to it the same way it does with AWS S3 — useful for on-premises, edge, or hybrid-cloud deployments where you don't want recordings leaving your own infrastructure.

By the end of this guide, you'll have a self-hosted MinIO instance with a bucket and access key, and Ant Media Server configured to upload recordings there automatically.

## Install MinIO

Install MinIO on your own server — see [MinIO's installation guide](https://min.io/docs/minio/linux/operations/installation.html). A [single-node, single-drive deployment](https://min.io/docs/minio/linux/operations/install-deploy-manage/deploy-minio-single-node-single-drive.html) is enough to get started. Once installed, you can reach the MinIO console at `http://<MINIO_DOMAIN>:9001`.

## Set the Region

In the MinIO console, go to **Configuration** and set a region. Since MinIO implements the S3 API, you can use standard AWS region names here (e.g., `ap-south-1`) — this needs to match what you enter in the AMS panel later. MinIO will ask you to restart the server after this change.

![](@site/static/img/recording-live-streams/s3-integration/minio-bucket-integration/minio-region.png)

## Generate an Access Key

Go to **Access Keys** and generate a new key for Ant Media Server to use.

:::important
Treat the Access Key and Secret Key like a password. Don't commit them to a repository, paste them into a screenshot, or share them outside of Ant Media Server's own credential fields.
:::

## Create a Bucket

Go to **Buckets** and create one. Make sure it's set to public, since Ant Media Server needs to write to it directly.

![](@site/static/img/recording-live-streams/s3-integration/minio-bucket-integration/minio-bucket.png)

## Configure Ant Media Server

1. Log in to your Ant Media Server panel at `https://<DOMAIN_NAME>:5443`.
2. Navigate to **Applications** and select your application (e.g., `live`).
3. Go to **Settings**, enable **Record Live Streams as MP4**, then enable **S3 Recording**.
4. Enter the Access Key, Secret Key, region, and bucket name from the steps above.
5. Click **Save**.

Once a stream finishes, its recording uploads to the bucket under the `streams` folder.

![](@site/static/img/recording-live-streams/s3-integration/minio-bucket-integration/minio-bucket-objects.png)

## Enable HTTP Forwarding for Playback

Once files upload to MinIO, they're no longer served from Ant Media Server's local storage, so requesting them by the usual AMS URL returns a 404 until you configure forwarding. See [HTTP Forwarding](/guides/recording-live-streams/http-forwarding/) for the full setup — the bucket URL pattern for MinIO is:

```
http://<MINIO_DOMAIN>:<PORT>/<BUCKET_NAME>
```

You now have Ant Media Server recording live streams directly to your own MinIO instance, with playback working through HTTP Forwarding.

## Need Help?

If uploads aren't appearing in your bucket, double-check the access key's permissions, the region match between MinIO and the AMS panel, and that the bucket is public, then reach out on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or contact [Technical Support](mailto:support@antmedia.io).
