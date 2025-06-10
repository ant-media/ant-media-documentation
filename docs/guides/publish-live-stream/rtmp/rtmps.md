---
title: Publish RTMPS
description: Publish stream with RTMPS
keywords: [Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

## Enable RTMPS

:::info
In v2.14 and above, now RTMPS can be enabled/disabled via server settings instead of enabling/disabling it from the XML files.

This allows for easy and hassle-free configuration. It also restores even after a server upgrade, whereas previously it did not restore in XML files.
:::

Follow below steps to enable/disable the RTMPS:

- Go to the conf folder under antmedia folder

   ```bash
   cd /usr/local/antmedia/conf/
  ```

- Edit the red5.properties file

   ```bash
   sudo nano red5.properties
  ```

- Enable/Disable the RTMPS

   ```json
   rtmps.enabled=true
  ```

  **By default it is enabled now and works on TCP port 8443.**

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
