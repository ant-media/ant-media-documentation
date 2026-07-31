---
title: IP Camera Streaming
description: IP Camera Streaming using ONVIF and RTSP
keywords: [Streaming IP cameras, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

# IP Camera Streaming

Ant Media Server users can pull IP camera streams easily from the management panel. In other words, you don't need to write any commands or use a terminal to be able to re-stream external sources.

By the end of this guide, you'll be pulling a live feed from an IP camera into Ant Media Server, either through ONVIF or a direct RTSP URL.

For IP camera re-streaming, the camera should support the ONVIF standard. ONVIF makes it easy to manage IP cameras. All CRUD and PTZ operations are based on well-defined SOAP messages.

![](@site/static/img/onvif_conformance.gif)

There are two ways to pull the IP camera stream on AMS:

1. Using the ONVIF URL
2. Using the direct RTSP URL

Let’s have a look at how to pull a stream from an IP camera.

## Add IP Camera - ONVIF URL

- Go to the management panel, select **live** from applications, then click on **New Live Stream** and select **IP Camera**.  

    ![](@site/static/img/re-stream-add-ip-camera-1.png)

- Fill in the **Stream Name**, **Camera Username**, **Camera Password** and any custom **StreamId**. 

- You should add the ONVIF URL of the IP camera. Generally, it is in the following format: `<IP_ADDRESS>:<ONVIF_PORT>`. 

- If you don't know the ONVIF URL, you can use the **Auto Discover** feature. If the IP camera and the server are on the same network, the Ant Media server can discover them automatically.
    ![](@site/static/img/publish-live-stream/IP-Camera-and-External-Sources/IP-Camera-Add.png)

:::info
If you want to use a secured domain instead of an IP address, make sure to prepend with the `http(s)` e.g.

`https://dynamic.dns.net:443`
:::

## Add IP Camera - RTSP URL 

If the IP camera does not support the ONVIF, then a direct RTSP URL can also be used to pull the stream directly on the Ant Media Server.

:::info
If the IP Camera is added directly using the RTSP URL, then the CRUD and PTZ operations cannot be performed on it using the AMS APIs.
:::

To add an IP camera with an RTSP URL, follow these steps:

*   First, log in to the management panel. select **live** from applications, and click on 
**New Live Stream** > **Stream Source**. Define stream name, RTSP URL, and stream Id.
*   AMS starts to pull the camera stream automatically
*   As the stream starts to pull, you can watch it from the AMS panel.

![](@site/static/img/publish-live-stream/IP-Camera-and-External-Sources/Stream-Source.png)

You can learn more about Stream Source in the next section.

### RTSP Transport Type

In some cases, the RTSP camera does not start and shows the status as `preparing` on the dashboard. By default, the [**RTSP pull transport type**](https://antmedia.io/javadoc/io/antmedia/AppSettings.html#rtspPullTransportType) is set to pull the stream with both `TCP` and `UDP` but sometimes the camera only supports only TCP or UDP at a time, so you can change it with the application settings.

Under the application's Advanced settings, there is the below property:

```js
"rtspPullTransportType": "3",
```

- If it is 1, the stream can be pulled with both TCP.
- If it is 2, the stream can be pulled with UDP only.
- If it is 3, the stream can be pulled with both UDP and TCP.

:::info
If the camera is accessible via FFMPEG or VLC but still does not start pulling on the AMS, try changing this parameter.
:::

## IP Camera Playback

If IP cameras are accessible and properly configured, Ant Media Server adds their streams as a live stream and begins to pull streams from them. The management panel displays its current status. To watch the stream, click the **Play button**.

![](@site/static/img/publish-live-stream/IP-Camera-and-External-Sources/IP-Camera-Play.png)

The IP camera stream can be monitored with any output protocol, like `WebRTC`, `HLS`, `DASH`, and `LL-HLS`. Check out the [playback section](/category/play-live-streams/) for more details, or the [recording documentation](/category/recording-live-streams/) to record the IP camera streams.

## Rest API to add IP Camera Stream

This [Rest API](https://antmedia.io/rest/#/default/createBroadcast) can be used to create the live stream.

```bash
curl -X POST -H "Content-Type: application/json" "https://<DOMAIN_NAME>:5443/<APP_NAME>/rest/v2/broadcasts/create?autoStart=false" -d '{
"type":"ipCamera","name":"test","streamId":"test","ipAddr":  "<CAMERA_IP>:<ONVIF_PORT>","username": "<CAMERA_USERNAME>","password":"<CAMERA_PASSWORD>"}'
```

You've now connected an IP camera to Ant Media Server and it's live and accessible via WebRTC, HLS, DASH, or LL-HLS.

## Need Help?

If the camera doesn't come online or Auto Discover can't find it, reach out on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or contact [Technical Support](mailto:support@antmedia.io).

