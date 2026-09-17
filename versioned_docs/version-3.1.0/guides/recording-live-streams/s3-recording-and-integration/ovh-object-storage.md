---
title: OVH Object Storage
description: Record streams to OVH Object Storage
keywords: [S3 Integration with Ant Media Server, S3 Integration, Record streams to OVH Object Storage, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 7
---

# Record Streams to OVH Object Storage

OVH Object Storage is an S3-compatible service, so Ant Media Server can record to it the same way it does with AWS S3.

By the end of this guide, you'll have an OVH Object Storage container, an access key pair for it, and Ant Media Server configured to upload recordings there automatically.

## Generate an Access Key

In the OVH control panel, generate a Secret Key and Access Key using your OpenStack username and password — see [OVH's S3 credentials documentation](https://help.ovhcloud.com/csm/en-gb-public-cloud-storage-s3-getting-started) for the exact steps.

:::important
Treat the Access Key and Secret Key like a password. Don't commit them to a repository, paste them into a screenshot, or share them outside of Ant Media Server's own credential fields.
:::

## Create a Container

Create an Object Storage container from the OVH dashboard.

![](@site/static/img/image-285329.png)

Once created, you'll land on the container's dashboard.

![](@site/static/img/image-285429.png)

## Configure Ant Media Server

1. Log in to your Ant Media Server panel at `https://<DOMAIN_NAME>:5443`.
2. Navigate to **Applications** and select your application (e.g., `live`).
3. Go to **Settings**, enable **Record Live Streams as MP4**, then enable **S3 Recording**.
4. Enter the Access Key, Secret Key, and container name as the bucket name.
5. Click **Save**.

Your MP4 and preview files now upload to the container automatically once a stream finishes.

## Enable HTTP Forwarding for Playback

Once files upload to OVH Object Storage, they're no longer served from Ant Media Server's local storage, so requesting them by the usual AMS URL returns a 404 until you configure forwarding. See [HTTP Forwarding](/guides/recording-live-streams/http-forwarding/) for the full setup — the bucket URL pattern for OVH is:

```
https://<BUCKET_NAME>.<REGION>.cloud.ovh.net
```

You now have Ant Media Server recording live streams directly to OVH Object Storage, with playback working through HTTP Forwarding.

## Troubleshooting

- **Uploads fail, or files never appear in the container** — check the AMS server logs for `AmazonS3StorageClient` entries. A successful upload logs `File upload has started with key: ...` at INFO; a failed one logs `S3 - Error: Upload failed with key ...` at ERROR along with the underlying error, which tells you whether AMS is even reaching OVH or failing on the OVH side.
- **The error points to a permissions problem** — double-check the access key's permissions on the container and that the Access Key and Secret Key entered in the AMS panel are current.

## Need Help?

If the steps above don't resolve it, reach out on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or contact [Technical Support](mailto:support@antmedia.io).
