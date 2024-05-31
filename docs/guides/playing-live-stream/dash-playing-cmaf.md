---
title: Dash playing (CMAF) 
description: Common Media Application Format (CMAF) is essentially a new format to reduce HTTP delivery latency as it aims to reduce the cost, complexity, and latency of streaming.
keywords: [Dash playing, Common Media Application Format, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---

# Dash Playback with CMAF

## What Is CMAF (Common Media Application Format)?

- The Common Media Application Format (CMAF) is a standard designed to reduce HTTP delivery latency, typically to around 3-5 seconds. It aims to lower the cost, complexity, and latency of streaming. CMAF can be utilized with both DASH (Dynamic Adaptive Streaming over HTTP) and HLS (HTTP Live Streaming).

- Ant Media Server fully supports LL-DASH (Low Latency DASH) through CMAF and LL-HLS (Low Latency HLS) is an experimental feature for now.

![](@site/static/img/126611-CMAF-Fig1-ORG.jpg)

## Dash Play

Dash play is disabled by default so to play a stream with Dash protocol, it is important to enable it first.

### Enable Dash & CMAF Streaming

Dash playback can be enabled from the application settings.

- Navigate to your application (LiveApp/WebRTCAppEE or any other).

- Go to `Settings` and under `Dash & CMAF Streaming` check `Create DASH Streaming` to enable it.

![Screenshot 2024-06-01 000744](https://github.com/ant-media/ant-media-documentation/assets/86982446/32c0cb27-ca3f-4629-93e1-eae51ebfe04b)


#### Enable Dash programmatically

In Ant Media Server versions 2.4.3 and earlier, you need to enable DASH by editing the application's configuration file.

1. Open the following file with your favorite editor.

```
/usr/local/antmedia/webapps/WebRTCAppEE/WEB-INF/red5-web.properties
```

2. Enable DASH by adding the following property.

```
settings.dashMuxingEnabled=true
```

- To enable LL-Dash, set the following

```
settings.dash.llEnabled=true
```

- To enable LL-HLS (experimental feature), you can set

```
settings.dash.llHlsEnabled=true
```

3. Restart the Ant Media Server to apply the settings

```
sudo service antmedia restart
```

- For more information about application settings, please check [AMS application Configuration](https://antmedia.io/docs/guides/configuration-and-testing/ams-application-configuration/)

### Playing Dash with Embedded Player

You can use the embedded player `play.html` to play the streams with dash.

- Make sure that your stream is publishing.

> Quick Link: [Learn How to Publish Live Streams](https://antmedia.io/docs/category/publish-live-stream/)

- To play a stream with Dash, provide ```streamId``` as the id and ```dash``` as the playOrder parameter in the URL shown below.

```https://AMS-domain-name:5443/WebRTCAppEE/play.html?id=test&playOrder=dash```

- The dash playback will start automatically when the stream is live.

![image](https://github.com/ant-media/ant-media-documentation/assets/86982446/a6ec69fe-c71e-4bd8-82c5-2b1676458751)

### Playing MPEG-Dash stream directly via MPD

Assume Dash muxing is enabled and a stream is published to the Ant Media Server.

- The default MPEG-Dash (.mpd) URL will be as follows:

```
https://AMS-domain-name:5443/WebRTCAppEE/streams/streamId/streamId.mpd
```
**Note:** If you play the .mpd file directly, the stream latency will be native to MPEG-Dash which is about 15 seconds.

## More Details About Dash

There are a few more options for CMAF and their default values. You can assume that the following values are in use if they are not specified in the properties file:

- Duration of segments in mpd files.

```
settings.dashSegDuration=6
```

- Fragments are a property of fragmented MP4 files. Typically a fragment consists of moof + mdat.

```
settings.dashFragmentDuration=0.5
```

- Target latency

```
settings.dashTargetLatency=3.5
```    

- DASH window size. Number of files in the manifest

```
settings.dashWindowSize=5
```
    
- DASH extra window size. Number of segments kept outside of the manifest before removing from disk

```
settings.dashExtraWindowSize=5
```    

**Note:** If you're using Dash streaming with ABR enabled, make sure the following property is enabled in your application's advanced settings.

```
forceAspectRatioInTranscoding: true
```

- The value is false by default. Check [here](https://antmedia.io/javadoc/io/antmedia/AppSettings.html#forceAspectRatioInTranscoding) for more information on this property.
