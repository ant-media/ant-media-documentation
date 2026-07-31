---
title: Stream Sources
description: Restream external stream sources with AMS
keywords: [Streaming IP cameras, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

# Restream External Stream Sources

Ant Media Server (AMS) can handle a variety of streaming flows. It can accept and create streaming media as well as pull live streams from external sources such as live TV streams, IP camera streams, and other types of live streams.

By the end of this guide, you'll be pulling an external stream URL into Ant Media Server as a Stream Source.

The stream sources that Ant Media Server can fetch are: **RTSP, RTMP, HLS, SRT, UDP, FLV, etc.**

To restream from an external source, follow these steps:

- First, log in to the management panel. Select **live** from applications, and click on 
**New Live Stream** > **Stream Source**. Define stream name, stream URL, and stream ID.
- AMS starts to pull streams.
- As the stream starts to pull, you can watch it from the AMS panel.

![](@site/static/img/publish-live-stream/IP-Camera-and-External-Sources/Stream-Source.png)

:::info
Make sure that the port that you are using to pull the stream source should be whitelisted on the firewall to avoid any issues.
:::

In AMS versions 2.5.3 and later, the stream auto-fetcher is disabled by default. To enable automatic fetching of streams after a server restart, modify the following setting in the Advanced Application Settings:

```js
"startStreamFetcherAutomatically": true,
```

Check out the [recording documentation](/category/recording-live-streams/) to record the source streams on the Ant Media Server.

### Add RTSP Source with Video or Audio Only

The `allowed_media_types` parameter can be added as the parameter with the RTSP URL to enable audio/video only.

- Audio Only

```
rtsp://username:password@IP-address:Port/Streaming/Channels/101?allowed_media_types=audio
```

- Video Only

```
rtsp://username:password@IP-address:Port/Streaming/Channels/101?allowed_media_types=video
```

### Restream UDP Source

For stream sources like RTSP, RTMP, etc., you can directly pull the stream as it is already available. However, to send a stream to AMS using UDP, you must first publish it to the server and then pull it.

To pull the UDP stream on a server as a stream source, follow these steps:

 - First, send the stream with UDP to the Ant Media Server IP address using an encoder or FFMPEG. In this example, we used the FFMPEG command.

   ```bash
   ffmpeg -f lavfi -re -i smptebars=duration=60:size=1280x720:rate=30 -f lavfi -re -i sine=frequency=1000:duration=60:sample_rate=44100 -pix_fmt yuv420p -c:v libx264 -b:v 1000k -g 30 -keyint_min 120 -profile:v baseline -preset veryfast -f mpegts "udp://<SERVER_IP>:5000?pkt_size=1316"
   ```

   You can change the port number as per your requirements. We published the stream on port 5000. Also, make sure that the used port is whitelisted on the firewall.

 - Once the stream starts pushing on the server's IP address, you can pull it  **(udp://127.0.0.1:5000)** as a stream source on Ant Media Server.

## Rest API to add Stream Source

This [Rest API](https://antmedia.io/rest/#/default/createBroadcast) can be used to create the live stream.

```bash
curl -X POST -H "Content-Type: application/json" "https://<DOMAIN_NAME>:5443/<APP_NAME>/rest/v2/broadcasts/create?autoStart=false" -d '{ "type":"streamSource","name":"test",
"streamId":"test","streamUrl":"<STREAM_SOURCE_URL>"}'
```

You've now configured Ant Media Server to restream content from an external source, and it's ready for playback via WebRTC, HLS, DASH, or LL-HLS.

## Need Help?

If AMS can't pull the source stream, reach out on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or contact [Technical Support](mailto:support@antmedia.io).

