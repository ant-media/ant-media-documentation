---
title: Digital Ocean Spaces
description: Record streams to Digital Ocean Spaces
keywords: [S3 Integration with Ant Media Server, S3 Integration, Record streams to Digital Ocean Spaces, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 4
---

# Record Streams to DigitalOcean Spaces

DigitalOcean Spaces is an S3-compatible object storage service, so Ant Media Server can record to it the same way it does with AWS S3.

By the end of this guide, you'll have a Space, an API key pair for it, and Ant Media Server configured to upload recordings there automatically.

## Create a Space

In the DigitalOcean control panel, click **Spaces**, then **Create a Space**, and fill in the region and name.

![](@site/static/img/image-285629.png)

## Generate an API Key

Go to **API** in the left sidebar, and under **Spaces access keys**, click **Generate New Key**. Give it a name and create it — DigitalOcean shows the Access Key and Secret Key once, so copy both immediately.

![](@site/static/img/image-285829.png)

:::important
Treat the Access Key and Secret Key like a password. Don't commit them to a repository, paste them into a screenshot, or share them outside of Ant Media Server's own credential fields.
:::

## Configure Ant Media Server

1. Log in to your Ant Media Server panel at `https://<DOMAIN_NAME>:5443`.
2. Navigate to **Applications** and select your application (e.g., `live`).
3. Go to **Settings**, enable **Record Live Streams as MP4**, then enable **S3 Recording**.
4. Enter the Access Key, Secret Key, and your Space's name as the bucket name.
5. Click **Save**.

Your MP4 and preview files now upload to the Space automatically once a stream finishes.

## Enable HTTP Forwarding for Playback

Once files upload to your Space, they're no longer served from Ant Media Server's local storage, so requesting them by the usual AMS URL returns a 404 until you configure forwarding. See [HTTP Forwarding](/guides/recording-live-streams/http-forwarding/) for the full setup — the bucket URL pattern for DigitalOcean Spaces is:

```
https://<SPACE_NAME>.<REGION>.digitaloceanspaces.com
```

You now have Ant Media Server recording live streams directly to DigitalOcean Spaces, with playback working through HTTP Forwarding.

## Need Help?

If uploads aren't appearing in your Space, double-check the API key's permissions and the credentials entered in the AMS panel, then reach out on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or contact [Technical Support](mailto:support@antmedia.io).
