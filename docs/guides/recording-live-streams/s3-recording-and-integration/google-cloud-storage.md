---
title: Google Cloud Storage
description: Record streams to Google Cloud Storage
keywords: [S3 Integration with Ant Media Server, S3 Integration, Record streams to Google Cloud Storage, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

# Record Streams to Google Cloud Storage

Google Cloud Storage (GCS) exposes an S3-compatible interoperability API, so Ant Media Server can record straight to a GCS bucket the same way it does with AWS S3.

By the end of this guide, you'll have a GCS bucket, an HMAC access key for it, and Ant Media Server configured to upload recordings there automatically.

## Create a Bucket

In the GCS console, create a new bucket. Choose **Fine-grained** access control.

![](@site/static/img/image-1665067750280.png)

Inside the bucket, create a folder named `streams`.

![](@site/static/img/image-1665067824644.png)

## Generate an HMAC Access Key

GCS's S3-compatible API authenticates with HMAC keys rather than native Google credentials.

1. Go to **Settings → Interoperability**, and under **User Account HMAC**, confirm the default project for interoperability access.
2. Create an access key for your user account. GCS generates both an Access Key and a Secret — copy them somewhere secure, since the secret is only shown once.

:::important
Treat the HMAC Access Key and Secret like a password. Don't commit them to a repository, paste them into a screenshot, or share them outside of Ant Media Server's own credential fields.
:::

## Configure Ant Media Server

1. Log in to your Ant Media Server panel at `https://<DOMAIN_NAME>:5443`.
2. Navigate to **Applications** and select your application (e.g., `live`).
3. Go to **Settings**, enable **Record Live Streams as MP4**, then enable **S3 Recording**.
4. Enter the HMAC Access Key and Secret, and your bucket name.
5. Set **Endpoint** to `https://storage.googleapis.com`.
6. Click **Save**.

Your MP4 and preview files now upload to the bucket automatically once a stream finishes.

## Enable HTTP Forwarding for Playback

Once files upload to GCS, they're no longer served from Ant Media Server's local storage, so requesting them by the usual AMS URL returns a 404 until you configure forwarding. See [HTTP Forwarding](/guides/recording-live-streams/http-forwarding/) for the full setup — the bucket URL pattern for GCS is:

```
https://storage.googleapis.com/<BUCKET_NAME>
```

You now have Ant Media Server recording live streams directly to Google Cloud Storage, with playback working through HTTP Forwarding.

## Need Help?

If uploads aren't appearing in your bucket, double-check the HMAC key's permissions and the credentials entered in the AMS panel, then reach out on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or contact [Technical Support](mailto:support@antmedia.io).
