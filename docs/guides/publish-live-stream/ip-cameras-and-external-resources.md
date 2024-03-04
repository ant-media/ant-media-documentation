---
title: IP Cameras
description: Streaming IP cameras and External sources (HLS, RTMP, RTSP)
keywords: [Streaming IP cameras, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 5
---

# Streaming IP cameras and External sources (HLS, RTMP, RTSP, etc.)

Ant Media Server users can pull IP camera streams easily from the management panel. In other words, you don’t need to write any commands or use a terminal to be able to re-stream external sources.

In order for IP camera re-streaming, the camera should support the ONVIF standard. ONVIF makes it easy to manage IP cameras. All CRUD and PTZ operations are based on well-defined SOAP messages.

![](@site/static/img/onvif_conformance.gif)

Let’s have a look at how to pull a stream from an IP camera.

## Adding an IP camera

*   Go to the management panel, Select **LiveApp** from applications, then click on **New Live Stream** and select **IP Camera**.  
    ![](@site/static/img/re-stream-add-ip-camera-1.png)
*   Fill in the **camera name**, **camera** **username**, and **camera password**. You should add the ONVIF URL of the IP camera. Generally, it is in the following format: ```IP-ADDRESS-OF-IPCAMERA:8080```. If you don't know the ONVIF URL, you can use “**Auto Discover**” feature. If the IP camera and the server are in the same subnet, Ant Media server can discover them automatically.
    ![](@site/static/img/publish-live-stream/IP-Camera-and-External-Sources/IP-Camera-Add.png)

:::info

If you want to use a domain name instead of an IP address, make sure to prepend with the `http(s)` e.g.

`https://dynamic.dns.net:443`

:::

## Watching IP cameras

If IP cameras are accessible and properly configured, Ant Media Server adds their streams as a live stream and begins to pull streams from them. The management panel displays its current status. To watch the stream, click the **Play button**.

![](@site/static/img/publish-live-stream/IP-Camera-and-External-Sources/IP-Camera-Play.png)

If you don't have an ONVIF URL, you can still pull the IP camera using an RTSP URL. Please see the section on re-streaming external sources in the document below.

## Re-streaming external sources

Ant Media Server (AMS) can handle a variety of streaming flows. It can accept and create streaming media as well as pull live streams from external sources such as live TV streams, IP camera streams, and other types of live streams (RTSP, HLS, RTMP, FLV, etc.).

In order to re-stream from an external source, follow those steps:

*   First, log in to the management panel. Click on 
**New Live Stream** > **Stream Source**. Define stream name, stream URL and stream Id.
*   AMS starts to pull streams.
*   As the stream starts to pull, you can watch it from the AMS panel.

![](@site/static/img/publish-live-stream/IP-Camera-and-External-Sources/Stream-Source.png)

External sources do not start automatically after a server restart in v2.5.3 and later. The solution is available [here](https://github.com/orgs/ant-media/discussions/5011).

## Add Stream Source and IP Camera using Rest API

### Create Stream Source Broadcasts

```
curl -X POST -H "Content-Type: application/json" "https://IP-address-or-domain:Port/App-Name/rest/v2/broadcasts/create?autoStart=false" -d '{ "type":"streamSource","name":"test",
"streamId":"test","streamUrl":"YOUR_STREAM_SOURCE_URL"}'
```
### Create IP Camera Broadcasts

```
curl -X POST -H "Content-Type: application/json" "https://IP-address-or-domain:Port/App-Name/rest/v2/broadcasts/create?autoStart=false" -d '{
"type":"ipCamera","name":"test","streamId":"test","ipAddr":  "127.0.0.1:8080","username": "camera-username","password":"camera-password",}'
```
Check [here](https://antmedia.io/docs/category/rest-api-guide/) for more information on Rest API.

## Dynamic Stream Pulling

:::info
The Dynamic Stream Pulling feature is available in versions 2.8.3 and up.
:::

Dynamic Stream Pulling offers an efficient bandwidth optimization solution by automatically starting and stopping stream pulling based on user demand. 

For example, when a user attempts to view an offline stream with a stream source or IP camera, Ant Media Server automatically initiates stream pulling, enabling the broadcast to go live. Conversely, when viewership declines and there are no remaining viewers, Ant Media Server automatically halts stream pulling, returning the broadcast to an offline state. 

This feature proves invaluable for bandwidth optimization, especially when continuous stream recording isn't necessary. By activating stream pulling only when someone tries to watch the stream and ceasing it when there are no viewers, Ant Media Server significantly conserves bandwidth resources.

Auto-stopping the stream with no viewer is valid for all play types (WebRTC, HLS, and DASH).

To use the Dynamic Stream Pulling feature:

1- Go to the Ant Media web panel and create a broadcast with the type Stream Source or IP Camera. 

To enable the feature for the stream, check the ```Auto Start/Stop Streaming``` checkbox as shown below.

![](@site/static/img/dynamic-stream-pulling-1.png)

After creation, Ant Media Server will start pulling the stream automatically and broadcast status will turn to ```Broadcasting```
Alternatively, you can also activate Auto Start/Stop Streaming for an existing broadcast by modifying its settings using the REST API.

To do that, send a  ```PUT ``` request using
[Update Broadcast Rest API](https://antmedia.io/rest/#/BroadcastRestService/updateBroadcast).
**Here is the Curl Sample:**

```bash
curl --location --request PUT 'http(s)://AMS_DOMAIN:Port/AppName/rest/v2/broadcasts/streamId' --header 'Content-Type: application/json' --data '{"autoStartStopEnabled":true}'
```

2- Open a new tab and start watching the live stream using the below URL.

```
https://AMS_DOMAIN:Port/AppName/play.html?id=streamId&playOrder=webrtc
```

Now the server will start fetching stream.

3- Close the watcher tab. Since there are no viewers anymore, Ant Media Server will stop pulling the stream within a few seconds, and the broadcast status will change to ```Offline```.

## Recording IP camera streams

The Ant Media Server can save IP camera and other external stream sources streams in MP4 format. You can see these recorded files on **VOD** tab in the management panel.

![](@site/static/img/publish-live-stream/IP-Camera-and-External-Sources/IP-Camera-Recording.png)

For more information, see [Recording Live Streams](https://antmedia.io/docs/guides/recording-live-streams/).
