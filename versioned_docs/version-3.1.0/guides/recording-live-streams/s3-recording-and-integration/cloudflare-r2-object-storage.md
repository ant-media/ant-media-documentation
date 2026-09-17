---
title: Cloudflare R2 Object Storage
description: Record streams to Cloudflare R2 Object Storage
keywords: [S3 Integration with Ant Media Server, S3 Integration, Record streams to Cloudflare R2 Storage, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 6
---

# Record Streams to Cloudflare R2 Object Storage

Cloudflare R2 is an S3-compatible object storage service, so Ant Media Server can record to it the same way it does with AWS S3 — with the difference that R2 buckets aren't publicly reachable until you explicitly turn on a public URL for them.

By the end of this guide, you'll have an R2 bucket, an API token for it, and Ant Media Server configured to upload recordings there automatically.

## Create a Bucket

In the Cloudflare dashboard, go to **R2 Object Storage** and click **Create Bucket**, then fill in the name and settings.

![](@site/static/img/recording-live-streams/s3-integration/cloudflare-r2-storage/r2-bucket-create.png)

## Create an API Token

Go to **Manage API Tokens** and create an **Account API token** scoped to R2. Once created, Cloudflare shows the Access Key, Secret Key, and S3 API endpoint — copy all three immediately, since the secret is only shown once.

![](@site/static/img/recording-live-streams/s3-integration/cloudflare-r2-storage/create-api-token.png)

:::important
Treat the Access Key and Secret Key like a password. Don't commit them to a repository, paste them into a screenshot, or share them outside of Ant Media Server's own credential fields.
:::

## Configure Ant Media Server

1. Log in to your Ant Media Server panel at `https://<DOMAIN_NAME>:5443`.
2. Navigate to **Applications** and select your application (e.g., `live`).
3. Go to **Settings**, enable **Record Live Streams as MP4**, then enable **S3 Recording**.
4. Enter the Access Key, Secret Key, endpoint, and bucket name from the steps above.
5. Click **Save**.

Your MP4 and preview files now upload to the bucket automatically once a stream finishes.

## Enable HTTP Forwarding for Playback

Once files upload to R2, they're no longer served from Ant Media Server's local storage, so requesting them by the usual AMS URL returns a 404 until you configure forwarding. R2 buckets are private by default, so first go to the bucket's **Settings** and enable a **Public Development URL** (or attach a custom domain) — this is the URL you'll forward to.

See [HTTP Forwarding](/guides/recording-live-streams/http-forwarding/) for the full setup — for R2, `httpForwardingBaseURL` is that Public Development URL or custom domain, for example:

```
https://pub-xxxx.r2.dev
```

You now have Ant Media Server recording live streams directly to Cloudflare R2, with playback working through HTTP Forwarding.

## Troubleshooting

- **Uploads fail, or files never appear in the bucket** — check the AMS server logs for `AmazonS3StorageClient` entries. A successful upload logs `File upload has started with key: ...` at INFO; a failed one logs `S3 - Error: Upload failed with key ...` at ERROR along with the underlying error, which tells you whether AMS is even reaching R2 or failing on Cloudflare's side.
- **The error points to a permissions problem** — double-check the API token is still scoped to R2 and hasn't expired, and that the Access Key, Secret Key, and endpoint entered in the AMS panel match what Cloudflare issued.

## Need Help?

If the steps above don't resolve it, reach out on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or contact [Technical Support](mailto:support@antmedia.io).
