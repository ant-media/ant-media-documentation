---
title: Stream Sources
description: Restream external stream sources with AMS
keywords: [Streaming IP cameras, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

# Restream External Stream Sources

Ant Media Server (AMS) can handle a variety of streaming flows. It can accept and create streaming media as well as pull live streams from external sources such as live TV streams, IP camera streams, and other types of live streams.

The stream sources that Ant Media Server can fetch are: **RTSP, RTMP, HLS, SRT, UDP, FLV, etc.**

In order to restream from an external source, follow these steps:

- First, log in to the management panel. Click on 
**New Live Stream** > **Stream Source**. Define stream name, stream URL, and stream ID.
- AMS starts to pull streams.
- As the stream starts to pull, you can watch it from the AMS panel.

![](@site/static/img/publish-live-stream/IP-Camera-and-External-Sources/Stream-Source.png)

::info
Make sure that the port that you are using to pull the stream source should be whitelisted on the firewall to avoid any issue.
:::

In AMS v2.5.3 and later, the stream auto-fetcher is disabled by default, so streams do not start themselves after a server restart. 

Change the following flag to true in the Advance application settings so that streams start fetching automatically.

```js
"startStreamFetcherAutomatically": true,
```

Check out the [recording documentation](https://antmedia.io/docs/category/recording-live-streams/) to record the source streams on the Ant Media Server.

### Restream UDP Source

For other stream sources like RTSP, RTMP, etc., you can directly pull it as the stream is already available. But if you want to send a stream to AMS with UDP, then first you have to publish it to the server and then you have to pull it.

You can pull the UDP stream on a server as a stream source by following the below steps.

 - First, send the stream with UDP to the Ant Media Server IP address using an encoder or FFMPEG. In this example, we used FFMPEG command.

   ```bash
   ffmpeg -f lavfi -re -i smptebars=duration=60:size=1280x720:rate=30 -f lavfi -re -i sine=frequency=1000:duration=60:sample_rate=44100 -pix_fmt yuv420p -c:v libx264 -b:v 1000k -g 30 -keyint_min 120 -profile:v baseline -preset veryfast -f mpegts "udp://server-IP:5000?pkt_size=1316"
   ```

   You can change the port number as per your requirements. We published the stream on port 5000. Also, make sure that the used port is whitelisted on the firewall.

 - Once the stream starts pushing on the server's IP address, you can pull it  **(udp://127.0.0.1:5000)** as a stream source on Ant Media Server.

## Rest API to add Stream Source

This [Rest API](https://antmedia.io/rest/#/default/createBroadcast) can be used to create the live stream.

```bash
curl -X POST -H "Content-Type: application/json" "https://IP-address-or-domain:Port/App-Name/rest/v2/broadcasts/create?autoStart=false" -d '{ "type":"streamSource","name":"test",
"streamId":"test","streamUrl":"YOUR_STREAM_SOURCE_URL"}'
```
