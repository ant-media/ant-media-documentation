---
title: HTTP Forwarding
description: HTTP forwarding from the server to the bucket
keywords: [HTTP Forwarding, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 6
---

# HTTP Forwarding

HTTP Forwarding lets Ant Media Server redirect incoming HTTP requests to an external storage bucket, so a recording that's actually sitting in S3, GCS, or another provider can still be requested through your Ant Media Server URL.

By the end of this guide, you'll have HTTP Forwarding configured and tested against your storage bucket.

## Why You Need This

Once [Cloud Storage Integration](/category/s3-recording-and-integration) uploads your recordings to a bucket, they're no longer served from the Ant Media Server's local disk. If you or a viewer requests a recording using the usual Ant Media Server URL at that point, you'll get a **404 Not Found** — the file moved, but nothing told Ant Media Server where. HTTP Forwarding fixes this by transparently redirecting that request to the bucket instead, so viewers never need to know or care where the file actually lives.

Set this up any time you're uploading recordings or VOD files directly from Ant Media Server to a bucket, before you need it — not after the first 404 shows up in production.

## Step 1: Configure HTTP Forwarding in the AMS Management Panel

1. Log in to the Ant Media Server Management Panel.
2. Navigate to **Applications** and select your application (e.g., `live`).
3. Go to **Application Settings → Advanced Settings**.
4. Locate the HTTP Forwarding section and set the following properties:

   ```bash
   httpForwardingExtension: mp4,m3u8,png
   httpForwardingBaseURL: https://<BUCKET_URL>
   ```

:::info
- **httpForwardingExtension**: A comma-separated list of file extensions to forward.
- **httpForwardingBaseURL**: The base URL of your bucket, without a trailing slash.
:::

:::important
Do not include leading or trailing spaces in either field.
:::

## Step 2: Find the Correct Bucket URL

The value of `httpForwardingBaseURL` depends on which storage provider you're using. If you've already set up one of the [Cloud Storage Integration](/category/s3-recording-and-integration) guides, use the matching pattern below.

| Provider | URL Pattern | Example |
| --- | --- | --- |
| AWS S3 | `https://<BUCKET_NAME>.s3.<AWS_REGION>.amazonaws.com` | `https://myvideos.s3.us-east-1.amazonaws.com` |
| Google Cloud Storage | `https://storage.googleapis.com/<BUCKET_NAME>` | `https://storage.googleapis.com/myvideos` |
| DigitalOcean Spaces | `https://<BUCKET_NAME>.<REGION>.digitaloceanspaces.com` | `https://myvideos.nyc3.digitaloceanspaces.com` |
| Wasabi | `https://<BUCKET_NAME>.s3.<REGION>.wasabisys.com` | `https://myvideos.s3.us-east-1.wasabisys.com` |
| Cloudflare R2 | The bucket's Public Development URL, or a custom domain if you've configured one | `https://pub-xxxx.r2.dev` |
| OVH Object Storage | `https://<BUCKET_NAME>.<REGION>.cloud.ovh.net` | `https://myvideos.gra.cloud.ovh.net` |
| MinIO (self-hosted) | `http://<YOUR_MINIO_DOMAIN>:<PORT>/<BUCKET_NAME>` | `http://minio.example.com:9000/myvideos` |

:::info
Azure Blob Storage doesn't use HTTP Forwarding. It mounts directly onto the server's filesystem with `blobfuse`, so recordings are already local from Ant Media Server's point of view — see [Azure Blob Storage](/guides/recording-live-streams/s3-recording-and-integration/azure-blob-storage/) for that setup instead.
:::

## Step 3: Save and Test

1. Click **Save Settings**.
2. Restart any currently running streams for the change to take effect.
3. Request a file through Ant Media Server to confirm forwarding works:

   ```bash
   https://<DOMAIN_NAME>:5443/<APP_NAME>/streams/sample.mp4
   ```

   If forwarding is working, Ant Media Server serves it from your bucket instead of returning a 404 — for example, transparently redirecting to something like `https://myvideos.s3.us-east-1.amazonaws.com/streams/sample.mp4`.

## Troubleshooting

- **Still getting 404s?** Confirm the file actually exists in the bucket at the expected path, double-check `httpForwardingBaseURL` for typos or stray spaces, and make sure the bucket's permissions allow the access pattern you're using (public or signed).
- **Files not forwarding at all?** Confirm the file's extension is included in `httpForwardingExtension`, and that you restarted the application after saving settings.

You now have HTTP Forwarding configured, so requests for recordings stored in your bucket resolve through Ant Media Server without 404s.

## Need Help?

If forwarding still 404s after checking the steps above, reach out on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or contact [Technical Support](mailto:support@antmedia.io).
