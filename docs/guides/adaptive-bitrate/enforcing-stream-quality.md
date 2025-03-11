---
title: Enforcing Stream Quality
description: You want to deliver Full-HD or 4K stream, or vice-versa enforce yours users to consume content at enforced stream quality like 480p or 360p. You may simply achieve it with Ant Media Server.
keywords: [Enforcing Stream Quality, Ant Media Server Documentation, Ant Media Server Tutorials]
---
# Enforcing Stream Quality

Ant Media Server (AMS) has the ability to force stream quality. In this guide, you'll learn what it is, how it works, and how to benefit from stream quality feature.

## How does the adaptive bitrate work?

AMS measures the viewers' internet speed and sends the best quality according to the internet speed of the viewer.

Example:

*   Assume that there are two bitrates on the server.
    *   The first one is 360p and 800kbps.
    *   The second one is 480p and 1500kbps.
*   Assume that the viewer's internet speends are as follows:
    *   Above 1500kbps: In this case, a resolution of 480p is sent.
    *   Less than 800kbps: In this case, a resolution of 360p is sent.

The adaptive bitrate feature makes sure that the end user only gets what the server is sending out.

## Enforcing Stream Quality

The client side viewer can enforce a resolution it would like to get. Keep in mind that if you request a quality with a bitrate higher than the client's bitrate, you may see some packet drops or pixelations.

## Enforcing Quality in WebRTC

Once the stream starts playing and you recieve the ```play_started``` notification in ```WebRTCAdaptor```, call ```getStreamInfo``` with ```webRTCAdaptor.getStreamInfo({your_stream_Id})```

```js
else if (info == "play_started") 
{
    console.log("play started");
    webRTCAdaptor.getStreamInfo(streamId);
} 
else if (info == "play_finished") 
{
```

### Retrieve Stream Information

Calling ```getStreamInfo``` triggers a response from the server containing stream details like adaptive resolutions, audio bitrate and video bitrate.

```js
else if (info == "streamInformation") {

        var streamResolutions = new Array();

        obj["streamInfo"].forEach(function(entry) {
        //It's needs to both of VP8 and H264. So it can be duplicate
        if(!streamResolutions.includes(entry["streamHeight"])){
            streamResolutions.push(entry["streamHeight"]);	

        }// Got resolutions from server response and added to an array.

        });
        
}// After getting stream information, forceStreamQuality can be used with the information we got.
else if (info == "ice_connection_state_changed"){
```

After getting stream info, you can force a specific resolution using:

```js
webRTCAdaptor.forceStreamQuality("{your_stream_Id}",  {the_resolution_to_be_forced});
```

## Enforcing Stream Quality in AMS Embedded player

AMS also allows enforcing quality in the Embedded Player (play.html), simmilar to ```player.html```. Users can select a resolution, and the stream will be forced to that quality.

There is a working sample in player.html as shown below. When you choose a resolution, it'll force the quality. You can select the resolution, as you can see from the screenshot below.

![](@site/static/img/92497488-14bcdf00-f202-11ea-9790-b9afcbe0f456.png) In the example above, ```240p``` is selected, and the bitrate is ```500000```.

## Enforcing Quality in HLS streams

For HLS-based streams, you can enforce stream quality by requesting a specific HLS variant. This can be achieved by selecting the appropriate ```.m3u8``` file that corresponds to the desired quality.

For example, if your HLS playlist has multiple qualities:

*   playlist.m3u8
    * 240p.m3u8
    * 360p.m3u8
    * 480p.m3u8
    * 720p.m3u8

You can enforce quality by explicitly requesting the URL:

```js
https://your_server.com:port/appName/streams/[streamid]_[quality].m3u8
```
This ensures the player loads only specified quality instead of relying on adaptive selection.


