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

For example, when a user attempts to view an offline stream with a stream source or IP camera, the Ant Media Server automatically initiates stream pulling, enabling the broadcast to go live.

Conversely, when viewership declines and there are no remaining viewers, the Ant Media Server automatically halts stream pulling, returning the broadcast to an offline state. 

This feature proves invaluable for bandwidth optimization, especially when continuous stream recording isn't necessary. By activating stream pulling only when someone tries to watch the stream and ceasing it when there are no viewers, Ant Media Server significantly conserves bandwidth resources.

Auto-stopping the stream with no viewer is valid for all play types (WebRTC, HLS, DASH, and LL-HLS).

To use the Dynamic Stream Pulling feature:

 - Go to the Ant Media web panel and create a broadcast with the type Stream Source or IP Camera. 

   To enable the feature for the stream, check the ```Auto Start/Stop Streaming``` checkbox as shown below.

   ![](@site/static/img/dynamic-stream-pulling-1.png)

After creation, Ant Media Server will start pulling the stream automatically and broadcast status will turn to `Broadcasting`
Alternatively, you can also activate Auto Start/Stop Streaming for an existing broadcast by modifying its settings using the REST API.

To do that, send a  `PUT` request using
[Update Broadcast Rest API](https://antmedia.io/rest/#/default/updateBroadcast).

**Here is the curl sample:**

```bash
curl --location --request PUT 'http(s)://AMS_DOMAIN:5080(5443)/AppName/rest/v2/broadcasts/streamId' --header 'Content-Type: application/json' --data '{"autoStartStopEnabled":true}'
```

 - Open a new tab and start watching the live stream using the below URL.

   ```html
   https://AMS_DOMAIN:5443/AppName/play.html?id=streamId&playOrder=webrtc
   ```

   Now the server will start fetching streams.

 - Close the player tab. Since there are no viewers anymore, the Ant Media Server will stop pulling the stream within a few seconds, and the broadcast status will change to `Offline`.
