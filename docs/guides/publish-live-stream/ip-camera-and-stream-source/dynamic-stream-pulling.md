---
title: Dynamic Stream Pulling
description: Dynamic Stream Pulling
keywords: [Streaming IP cameras, Stream Sources, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---

# Dynamic Stream Pulling

:::info
The Dynamic Stream Pulling feature is available in versions 2.8.3 and up.
:::

Dynamic Stream Pulling offers an efficient bandwidth optimization solution by automatically starting and stopping stream pulling based on user demand. 

By the end of this guide, you'll have Dynamic Stream Pulling enabled on a broadcast, so AMS only pulls the source while someone is actually watching.

## How It Works

- Auto-Start: When a user attempts to view an offline stream, Ant Media Server automatically initiates stream pulling, bringing the broadcast online.
- Auto-Stop: When there are no viewers, the server halts stream pulling, returning the broadcast to an offline state.

This feature is beneficial for bandwidth optimization, especially when continuous stream recording isn't necessary. It ensures that stream pulling occurs only when someone tries to watch the stream and ceases when there are no viewers. Auto-stopping the stream with no viewer is valid for all play types **(WebRTC, HLS, DASH, and LL-HLS)**.

## Enabling Dynamic Stream Pulling:

 - Go to the Ant Media web panel and create a broadcast with the type Stream Source or IP Camera. 

   To enable the feature for the stream, check the ```Auto Start/Stop Streaming``` checkbox as shown below.

   ![](@site/static/img/dynamic-stream-pulling-1.png)

  - After creation, Ant Media Server will start pulling the stream automatically and broadcast status will turn to `Broadcasting`.
  - Alternatively, you can also activate Auto Start/Stop Streaming for an existing broadcast by modifying its settings using the REST API.
    To do that, send a  `PUT` request using
    [Update Broadcast Rest API](https://antmedia.io/rest/#/default/updateBroadcast).

**Here is the curl sample:**

```bash
curl --location --request PUT 'https://<DOMAIN_NAME>:5443/<APP_NAME>/rest/v2/broadcasts/<STREAM_ID>' --header 'Content-Type: application/json' --data '{"autoStartStopEnabled":true}'
```

- Open a new tab and start watching the live stream using the below URL.

   ```html
   https://<DOMAIN_NAME>:5443/<APP_NAME>/play.html?id=<STREAM_ID>&playOrder=webrtc
   ```
   Now the server will start fetching streams.

 - Close the player tab. Since there are no viewers anymore, the Ant Media Server will stop pulling the stream within a few seconds, and the broadcast status will change to `Offline`.

You've now configured Dynamic Stream Pulling, so this broadcast only pulls from its source while someone is watching and stops automatically once viewers leave.

## Need Help?

If the stream doesn't stop pulling when idle, or won't auto-start on view, reach out on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or contact [Technical Support](mailto:support@antmedia.io).
