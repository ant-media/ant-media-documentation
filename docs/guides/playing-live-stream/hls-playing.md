---
title: HLS Playing
sidebar_position: 2
---

HLS Playing is available in both the Community and Enterprise Editions. Before playing a stream, make sure that stream is broadcasting on the server.

> Quick Link: [Learn How to Publish Live Streams](https://antmedia.io/docs/category/publish-live-stream/)

## 1. Navigate to the video player  

Under the application, you can use play.html. Please go to ```https://AMS-domain-name:5443/WebRTCAppEE/play.html```. If you have Ant Media Server installed on your computer, you may also go to ```http://localhost:5080/WebRTCAppEE/play.html```.

To play an HLS stream, provide ```streamId``` as the name and ```hls``` as the playOrder parameters in the URL shown below. 
    
```https://AMS-domain-name:5443/WebRTCAppEE/play.html?name=test&playOrder=hls```
    
![](@site/static/img/playing-live-streams/hls-playing/hls-player.png)
    

## 2. Playback starts automatically

The HLS stream will start to play automatically when it becomes live.
    
![](@site/static/img/playing-live-streams/hls-playing/hls-started.png)

Autoplay is enabled by default in a player but it may not be activated for some policies in Chrome and Firefox. So you may need to click the player button to get it started. Look at the following links:

[Chrome policy](https://developers.google.com/web/updates/2017/09/autoplay-policy-changes)

[Firefox policy](https://hacks.mozilla.org/2019/02/firefox-66-to-block-automatically-playing-audible-video-and-audio/)

Congrats. You're playing with HLS.

## More Details About HLS

Make sure HLS muxing is enabled in your application. You may confirm this by clicking the ```Create HLS Streaming``` checkbox in the app's settings on the web management panel.

![](@site/static/img/playing-live-streams/hls-playing/hls-enabled.png)

Assume HLS muxing is enabled and a stream is published to Ant Media Server.

* Default HLS (.m3u8) URL: 
```http://AMS-domain-or-IP:5080/LiveApp/streams/StreamId.m3u8```
*   If adaptive bit rates are enabled in the application (Enterprise Edition), the HLS (.m3u8) URL will be as follows: 
```http://AMS-domain-or-IP:5080/LiveApp/streams/StreamId_adaptive.m3u8```

**Note:** Beginning with version 2.4.1, the filename structure included the bitrate in the name. For example, 480p ABR is enabled on the server and you want to play it.
In prior versions, the HLS filename was ```streamId_480p.m3u8```, but now it is ```stream1_480p1000kbps.m3u8```, as we enabled the same resolution with multiple bitrates.

If you would like to use the old structure, check the [following post](https://github.com/orgs/ant-media/discussions/4984).

## Save HLS Records

HLS streaming is a more cost-effective and secure method than VOD streaming. You can record your HLS streams. You just need to change your application's HLS settings as below:

*   Open your apps ```red5-web.properties``` and change the below mentioned settings. The file is located under `/usr/local/antmedia/webapps/App-Name/WEB-INF` folder.
    
```js 
settings.hlsPlayListType=event
```
    
To store HLS files permanently after the stream is ended.

```js 
settings.deleteHLSFilesOnEnded=false
```
    
To prevent overwriting of old HLS files in case same stream Id is published again, use the below property.

```js 
settings.hlsflags=+append_list
```

Restart the server on the command line.
    
```shell
sudo service antmedia restart
```
    
Now, your HLS streams will record.
    

> Quick Link: [App Configurations](https://antmedia.io/docs/guides/configuration-and-testing/ams-application-configuration/)

> Quick Link: [FFmpeg Configurations](https://ffmpeg.org/ffmpeg-formats.html#toc-Options-6)
