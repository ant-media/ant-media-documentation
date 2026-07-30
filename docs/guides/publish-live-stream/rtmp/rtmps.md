---
title: Publish RTMPS
description: Publish stream with RTMPS
keywords: [Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

# Publish RTMPS Stream

RTMPS is standard RTMP wrapped in TLS, so your publish traffic is encrypted in transit. By the end of this guide, RTMPS will be enabled on your server and you'll be publishing an encrypted stream into Ant Media Server.

## Enable RTMPS

:::info
Starting in v2.14, you can enable or disable RTMPS via server settings rather than editing XML files. This allows for easy and hassle-free configuration. It also restores even after a server upgrade, whereas previously it did not restore in XML files.
:::

Follow below steps to enable/disable the RTMPS:

- Go to the conf folder under antmedia folder

   ```bash
   cd /usr/local/antmedia/conf/
  ```

- Edit the red5.properties file.

**Note**- If you’re upgrading from older version where RTMPS settings were in XML, the red5.properties approach takes precedence in v2.14+

   ```bash
   sudo nano red5.properties
  ```

- Enable/Disable the RTMPS

   ```json
   rtmps.enabled=true
  ```

  **By default it is enabled now and works on TCP port 8443. Ensure port 8443 is open in your server’s firewall.**

- After changing the settings, restart the server

   ```bash
   sudo service antmedia restart
  ```

## Publish RTMPS Stream

To publish the RTMPS stream, follow the [OBS tutorial](/guides/publish-live-stream/rtmp/publish-with-obs/) for reference, and instead of using the simple RTMP endpoint, use the RTMPS endpoint below.

```json
rtmps://<DOMAIN_NAME>:8443/live/<STREAM_ID>
```

Once you're streaming, check the **live** application in your Ant Media Server web panel — the stream should show as **Broadcasting**.

![](@site/static/img/publish-live-stream/ams-broadcasting-status.png)

You're now publishing an encrypted RTMPS stream to Ant Media Server. From here, head to the [playback guide](/category/play-live-streams/) to view your stream with WebRTC, HLS, etc.

## Need Help?

If the RTMPS endpoint won't connect, double-check port 8443 is open in your firewall and that `rtmps.enabled=true` is actually set in `red5.properties` after your last restart. Otherwise, reach out on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or contact [Technical Support](mailto:support@antmedia.io).

