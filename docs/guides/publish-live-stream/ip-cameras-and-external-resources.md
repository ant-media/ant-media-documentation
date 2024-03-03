---
title: IP Cameras
description: Streaming IP cameras and External sources (HLS, RTMP, RTSP)
keywords: [Streaming IP cameras, Ant Media Server Documentation, Ant Media Server Tutorials]
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

:::info

If you want to use a domain name instead of an IP address, make sure to prepend with the `http(s)` e.g.
`https://dynamic.dns.net:50080`

:::

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

## Dynamic Stream Pulling
Dynamic Stream Pulling offers an efficient bandwidth optimization solution by automatically starting and stopping stream pulling based on user demand. For example, when a user attempts to view an offline stream with type stream source or IP camera, Ant Media Server automatically initiates stream pulling, enabling the broadcast to go live. Conversely, when viewership declines and there are no remaining viewers, Ant Media Server automatically halts stream pulling, returning the broadcast to an offline state. Dynamic Stream Pulling is available in version 2.8.3 and later.

This feature proves invaluable for bandwidth optimization, especially when continuous stream recording isn't necessary. By activating stream pulling only when someone tries to watch the stream and ceasing it when there are no viewers, Ant Media Server significantly conserves bandwidth resources.

Auto stopping the stream on no viewer is valid for all play types. (WebRTC-HLS-DASH)

To use Dynamic Stream Pulling feature:

1- Go to Ant Media web panel and create a broadcast with type Stream Source or IP Camera. Check ```Auto Start/Stop Streaming``` checkbox.
![](@site/static/img/dynamic-stream-pulling-1.png)
After creation Ant Media Server will start pulling the stream automatically and broadcast status will turn to ```Broadcasting```
Alternatively, you can activate Auto Start/Stop Streaming for an existing broadcast by modifying its settings using the REST API.

To do that send a  ```PUT ``` request
[Update Broadcast Rest API](https://antmedia.io/rest/#/BroadcastRestService/updateBroadcast)

Example curl:
```
curl --location --request PUT 'https://AMS_DOMAIN:5443/WebRTCAppEE/rest/v2/broadcasts/teststream' \
--header 'Content-Type: application/json' \
--data '{
    "autoStartStopEnabled":true
}
'
```

2- Go to 
```
https://AMS_DOMAIN:5443/WebRTCAppEE/play.html?id=teststream
```
on a seperate tab and start watching the live stream.

3- Close the watcher tab. Since there are no viewers and the auto start/stop feature is enabled for the broadcast, Ant Media Server will stop pulling the stream within a few seconds, and the broadcast status will change to ```Offline```.

4- Once more, open a separate tab and attempt to watch the offline stream. 
```
https://AMS_DOMAIN:5443/WebRTCAppEE/play.html?id=teststream
```
Within a few seconds, Ant Media Server will detect the viewer's attempt and begin pulling the stream from the source, thereby changing its status to ```Broadcasting``` and your playback will begin.