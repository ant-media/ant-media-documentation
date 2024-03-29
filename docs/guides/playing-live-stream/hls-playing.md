---
title: HLS Playing
description: This documentation guide will help you to achieve HLS Playing and Save HLS Records to your servers.
keywords: [HLS Playing, HLS Playing with Ant Media Server, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

# HLS Playing

HLS playback is available in both the Community and Enterprise Editions. Prior to initiating playback of a stream, ensure that the stream is actively broadcasting on the server.

> Quick Link: [Learn How to Publish Live Streams](/docs/category/publish-live-stream/)

## Enable HLS
Ensure that HLS muxing is enabled in your application settings. You can verify this by selecting the ```Create HLS Streaming```checkbox within the application's settings on the web management panel. HLS is enabled by default.


![](@site/static/img/playing-live-streams/hls-playing/hls-enabled.png)

## Play HLS Streams with Embedded Player

You can use the embedded player in `play.html` to play the streams with HLS.

Please go to ```https://AMS-domain-name:5443/WebRTCAppEE/play.html```.

If you have Ant Media Server installed on your local, you may also go to ```http://localhost:5080/WebRTCAppEE/play.html```.

To play a HLS stream, provide ```streamId``` as the id and ```hls``` as the playOrder parameters in the URL shown below.
    
```https://AMS-domain-name:5443/WebRTCAppEE/play.html?id=test&playOrder=hls```

The HLS playback will start automatically when the stream is live.
    
![](@site/static/img/playing-live-streams/hls-playing/hls-started.png)

Autoplay is enabled by default in a player but it may not be activated for some policies in Chrome and Firefox. So you may need to click the player button to get it started. Look at the following links:

[Chrome policy](https://developers.google.com/web/updates/2017/09/autoplay-policy-changes)

[Firefox policy](https://hacks.mozilla.org/2019/02/firefox-66-to-block-automatically-playing-audible-video-and-audio/)

Congrats. You're playing with HLS.

## Playing streams from SubFolders
When creating or updating a stream on Ant Media Server via the Rest API, you have the option to specify a subfolder for the broadcast. This allows HLS files to be generated within that designated folder.

This functionality ensures that when HLS files are being generated on the server side, they will be placed in the specified subfolder path within the ```webapps/{appName}/streams``` directory. For instance, if you create a stream with the stream ID ```teststream``` and a subFolder named ```mySubFolder``` in WebRTCAppEE, your HLS files (.m3u8 and .ts) will be generated under:

```{ant-media-server-directory}/webapps/WebRTCAppEE/streams/mySubFolder```
directory.

Example curl to create a broadcast with subFolder:
```
curl --location --request POST 'https://domain:5443/WebRTCAppEE/rest/v2/broadcasts/create' \
--header 'Content-Type: application/json' \
--data-raw '{ 
    "streamId":"teststream",
    "subFolder": "mySubFolder"
}'
```

Alternatively, if you name subFolder as ```teststream/mySubFolder``` your HLS files will be generated under:

```{ant-media-server-directory}/webapps/WebRTCAppEE/streams/teststream/mySubFolder```
directory.

Example curl:
```
curl --location --request POST 'https://domain:5443/WebRTCAppEE/rest/v2/broadcasts/create' \
--header 'Content-Type: application/json' \
--data-raw '{ 
    "streamId":"teststream",
    "subFolder": "teststream/mySubFolder"
}'
```
Remember, if you try to HLS play a stream which has a subFolder defined, you need to pass ```subFolderName/streamId``` as id to the embedded player.

So if you created a stream with  ```"streamId":"teststream"``` and ```"subFolder":"mySubFolder"``` you should play it with:

```https://domain:5443/WebRTCAppEE/play.html?id=mySubFolder/teststream&playOrder=hls```

If you created a stream with ```"streamId":"teststream"``` and ```"subFolder":"teststream/mySubFolder"``` you should play it with:

```https://domain:5443/WebRTCAppEE/play.html?id=teststream/mySubFolder/teststream&playOrder=hls```

To observe how folders and files are generated go to ```{ant-media-server-dir}/webapps/{appName}/streams``` 
directory.

## Interactive Streaming with ID3 Tags in HLS
Using `ID3` tags in HLS you can insert any kind of timed metadata, such as overlaying some text or images in specific moments to show comments, emojis, ads, markers, etc. where `ID3` is a data stream.

The feature to use `ID3` tags was introduced in Ant Media Server version 2.7.0

### Enabling ID3 Tags
In order to use the `ID3`, it is first needed to enable the `ID3` tags for the application.

It can be enabled from the `Advanced` settings by making `"id3TagEnabled": true` located under the application settings on the Ant Media Server Web Panel.

![](@site/static/img/playing-live-streams/hls-playing/enabling-id3.png)

### Adding ID3 Text
To insert an ID3 tag into any stream, just call the [REST method](https://antmedia.io/rest/#/BroadcastRestService/addID3Data) with your metadata and use that metadata in your player.
Below is a sample cURL command
```
curl -i -X POST -H "Accept: Application/json" -H "Content-Type: application/json" "https://{AMS-URL}:5443/{APP_NAME}/rest/v2/broadcasts/{STREAM_ID}/id3" -d '{TEXT}' 
```
Checkout this [video tutorial](https://www.youtube.com/watch?v=Fq-a_tEXY4E&t=763s) where we discussed and demonstrated about ID3 tags.

**Note:** Currently ID3 Tags does not work with Ant Media Server default player (play.html) so you can use this [Codepen sample](https://codepen.io/Burak-Kekec/pen/PoXYMyG) for the testing.


## Save HLS Records

HLS streaming is a more cost-effective and secure method of streaming than video-on-demand assets. Furthermore, you can also record your live streams with HLS:

* To enable HLS recording for your live streams and store all the HLS files (.ts and .m3u8), just log in to your AMS Web Panel, Navigate to the Application Setting -> Advanced, and configure the setting below:

![Screenshot 2023-09-25 153916](https://github.com/ant-media/ant-media-documentation/assets/86982446/10ca309d-c40f-4e74-b006-3dbc23e0dea8)

By default, only a certain number of TS files corresponding to segments are retained in the streams directory at any given time. However, by configuring the HLS playlist type to ```event```, the server continuously generates TS files, allowing for permanent storage if desired.

```js 
settings.hlsPlayListType=event
```
    
To store HLS files permanently after the stream is ended:

```js 
settings.deleteHLSFilesOnEnded=false
```
    
To prevent overwriting of old HLS files in case the same streamId is used again, use the below property ```append_list```

Imagine you've completed streaming with an ID "teststream," and your last generated TS file is ```teststream000001013.ts.``` Without adding ```append_list``` to the HLS flags, restarting the "teststream" will initiate TS file generation from 0, overwriting existing .ts files. However, by setting it to ```append_list``` the first generated .ts file will be named ```teststream000001014.ts``` ensuring that your .ts files remain intact without being overridden.

```js 
settings.hlsflags=+append_list
```

If you don't want the ts files to be appended to the previous recording, you may also enable date and timestamp for HLS files by adding the following property.

```js
settings.addDateTimeToHlsFileName=true
```
![](@site/static/img/hls_datetime.png)


After making the changes, you can scroll down and save the settings.
    
Now, your streams will be recorded as HLS.

Additionally, it's also possible to push HLS files directly to a remote endpoint without generating them on the local server in real-time, or alternatively, upload them to an S3 bucket once the stream has finished.

For those check this guide:
> Quick Link: [Uploading HLS Files](https://antmedia.io/docs/guides/recording-live-streams/s3-integration-http-forwarding/#uploading-hls-files-to-the-s3-bucket-in-real-time)

## HLS Play For a Given Time Interval

Playing an HLS stream within specified time intervals is achievable.

You can include the ```startTime``` and ```endTime``` parameters in query string of m3u8 request to play the stream during that specific time frame.

For example:

```https://{domain}:5443/WebRTCAppEE/streams/teststream.m3u8?start=1668454888&end=1668454999```

For this to work, first we need to install HLS Manifest Modifier plugin. 
Plugin is open source and can be found at
https://github.com/burak-58/HLSManifestModifier/tree/main

### How to install HLS Manifest Modifier Plugin

1- Download the required jars from
https://github.com/burak-58/HLSManifestModifier/tree/main/out

2- Copy the ```HLSManifestModifier.jar``` and ```m3u8-parser-0.24.jar``` into ```/usr/local/antmedia/plugins``` directory.

3-Register the filter to Tomcat by adding the following lines into ```/usr/local/antmedia/webapps/{APP_NAME}/WEB-INF/web.xml```
```
<filter>
  <filter-name>HlsManifestModifierFilter</filter-name>
  <filter-class>io.antmedia.filter.HlsManifestModifierFilter</filter-class>
  <async-supported>true</async-supported>
</filter>
<filter-mapping>
  <filter-name>HlsManifestModifierFilter</filter-name>
  <url-pattern>/streams/*</url-pattern>
</filter-mapping>
```
4- Restart the server with ```sudo service antmedia restart```

### Configuration for HLS Manifest Modifier Plugin
Set below settings from application settings -> advanced settings through web panel

```hlsflags=+program_date_time``` to add program date time in m3u8 file.

```hlsListSize=0``` to keep all ts files references in m3u8 file.

```deleteHLSFilesOnEnded=false``` to keep all ts files in the disk after stream finishes.

### Usage of HLS Manifest Modifier Plugin
Request m3u8 by adding start and end datetime in unix timestamp like

```https://{domain}:5443/WebRTCAppEE/streams/test.m3u8?start=1668454888&end=1668454999```

## More Details About HLS
Assume HLS muxing is enabled and a stream is published to Ant Media Server.

Default HLS (.m3u8) URL: 
```http://AMS-domain-or-IP:5080/WebRTCAppEE/streams/StreamId.m3u8```

If adaptive bit rates are enabled in the application (Enterprise Edition), the HLS (.m3u8) URL will be as follows:

```http://AMS-domain-or-IP:5080/WebRTCAppEE/streams/StreamId_adaptive.m3u8```

Note: Beginning with version 2.4.1, the filename structure included the bitrate in the name. For example, 480p ABR is enabled on the server and you want to play it.

In prior versions, the HLS filename was streamId_480p.m3u8, but now it is stream1_480p1000kbps.m3u8, as we enabled the same resolution with multiple bitrates.

If you would like to use the old structure, check the following
[post](https://github.com/orgs/ant-media/discussions/4984).

> Quick Link: [App Configurations](https://antmedia.io/docs/guides/configuration-and-testing/ams-application-configuration/)

> Quick Link: [FFmpeg Configurations](https://ffmpeg.org/ffmpeg-formats.html#toc-Options-6)
