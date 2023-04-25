---
title: IP Cameras
sidebar_position: 5
---

# Streaming IP cameras and External sources (HLS, RTMP, RTSP)

Ant Media Server Users can pull IP camera streams easily on the management panel. In other words, you don’t need to write any commands or use a terminal to be able to restream sources.

In order for IP camera restreaming, the camera should support the ONVIF standard. ONVIF makes it easy to manage IP cameras. All CRUD and PTZ operations are based on well-defined SOAP messages.

![](@site/static/img/onvif_conformance.gif)

Let’s have a look at how to pull a stream from an IP camera.

## Adding an IP camera

*   Go to the management panel, Select **LiveApp** from applications, then click on **New Live Stream** and select **IP Camera**.  
    ![](@site/static/img/re-stream-add-ip-camera-1.png)
*   Fill in the **camera name**, **camera** **username**, and **camera password**. You should add the ONVIF URL of the IP camera. Generally, it is in the following format: ```IP-ADDRESS-OF-IPCAMERA:8080```. If you don't know the ONVIF URL, you can use “**Auto Discover**” feature. If the IP camera and the server are in the same subnet, Ant Media server can discover them automatically.
    ![](@site/static/img/publish-live-stream/IP-Camera-and-External-Sources/IP-Camera-Add.png)

## Watching IP cameras

If IP cameras are accessible and properly configured, Ant Media Server adds their streams as a live stream and begins to pull streams from them. The management panel displays its current status. To watch the stream, click the **Play button**.

![](@site/static/img/publish-live-stream/IP-Camera-and-External-Sources/IP-Camera-Play.png)

If you don't have an ONVIF URL, you can still pull the IP camera using an RTSP URL. Please see the section on Restreaming external sources in the document below.

## Recording IP camera streams

The Ant Media Server can save IP camera streams in MP4 format. You can see these recorded files on **VOD** tab in the management panel.

![](@site/static/img/publish-live-stream/IP-Camera-and-External-Sources/IP-Camera-Recording.png)

For more information, see [Recording Live Streams](https://antmedia.io/docs/guides/recording-live-streams/).

## Restreaming external sources

Ant Media Server (AMS) can handle a variety of streaming flows. It can accept and create streaming media as well as pull live streams from external sources such as live TV streams, IP camera streams, and other types of live streams (RTSP, HLS, RTMP, FLV etc.).

In order to restream from an external source, follow those steps:

*   First, log in to the management panel. Click on 
**New Live Stream** > **Stream Source**. Define stream name, stream URL and stream Id.
*   AMS starts to pull streams.
*   As the stream starts to pull, you can watch it from AMS panel.

![](@site/static/img/publish-live-stream/IP-Camera-and-External-Sources/Stream-Source.png)

External sources do not start automatically after server restart in v2.5.3 and later. The solution is available [here](https://github.com/orgs/ant-media/discussions/5011).

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
