---
title: Publish RTMPS
description: Publish stream with RTMPS
keywords: [Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

## Enable RTMPS

:::info
Starting in v2.14, you can enable or disable RTMPS via server settings rather than editing XML files. This allows for easy and hassle-free configuration. It also restores even after a server upgrade, whereas previously it did not restore in XML files.
:::

Follow below steps to enable/disable the RTMPS:

- Go to the conf folder under antmedia folder

   ```bash
   cd /usr/local/antmedia/conf/
  ```

- Edit the red5.properties file. “

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

To publish the RTMPS stream, follow this [OBS tutorial](https://antmedia.io/docs/guides/publish-live-stream/rtmp/publish-with-obs/) for reference and instead of using the simple RTMP endpoint, use the below RTMPS endpoint.

```json
rtmps://domain-name:8443/live/streamId
```

Check out the [playback guide](https://antmedia.io/docs/category/playing-live-streams/) to play your RTMPS stream with WebRTC, HLS etc.

<br /><br />
---

<div align="center">
<h2> Secure Real-Time Stream Up ✅ </h2>
</div>

You’ve now enabled **RTMPS** in your **server settings**, verified that it listens on **TCP port 8443**, and published a stream using an RTMPS endpoint.  

Your stream is now **encrypted in transit** — more **secure**, **trusted**, and **compliant**. Nice move protecting your content! 🔐

