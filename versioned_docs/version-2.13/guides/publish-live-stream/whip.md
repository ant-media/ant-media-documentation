---
title: WHIP
description: WebRTC-HTTP Ingestion Protocol (WHIP)
keywords: [WHIP, WebRTC]
sidebar_position: 8
---

# WHIP (WebRTC-HTTP Ingestion Protocol)

WHIP (WebRTC-HTTP Ingestion Protocol) is a standardized protocol designed to simplify the ingestion of WebRTC streams into media servers. Traditionally, ingesting streams into WebRTC servers required complex signaling procedures involving multiple steps and protocols. WHIP addresses these challenges by leveraging simple HTTP endpoints for media ingestion, reducing complexity, and improving interoperability.

In version 2.10.0, Ant Media Server introduced WHIP support, making it easier than ever to integrate with WebRTC workflows. This document explores what WHIP is, its benefits, and how to use it with Open Broadcaster Software (OBS) and with other libraries.

## Benefits of WHIP

1.  **Simplicity**: WHIP simplifies the signaling process by using HTTP, making it straightforward to implement and integrate.
2.  **Interoperability**: By adhering to a standard protocol, WHIP ensures compatibility across different WebRTC implementations and media servers.
3.  **Efficiency**: WHIP reduces the overhead associated with traditional WebRTC signaling methods, leading to faster and more efficient stream ingestion.
4.  **Ease of Integration**: With WHIP, developers can use familiar HTTP methods, streamlining the development process and reducing the learning curve.

## Streaming to AMS with WHIP using OBS Studio 

Open Broadcaster Software (OBS) is a popular open-source tool for live streaming and video recording. Integrating OBS with Ant Media Server via WHIP can enhance your streaming setup by providing a robust and efficient way to deliver WebRTC streams. Here’s a step-by-step guide to setting it up:

#### Prerequisites

- Ant Media Server EE v2.10 or later
- OBS Studio v30.0 or later

#### Configure OBS for WHIP

- In OBS, go to  `Settings`  and then  `Stream`.
- Select `WHIP` as the service.
- In the  `Server`  field, enter the WHIP endpoint URL provided by your Ant Media Server. Here is the WHIP endpoint format: 
`https://antmedia.example.com:5443/App_Name/whip/streamId`

 ![](@site/static/img/publish-live-stream/whip/whip-settings.png)

From Output tab of OBS, you can control your streaming parameters like bit rate, key frames, etc. You can use the same settings as shown below in screenshot or you can modify them as per your requirements.

![](@site/static/img/obs-rtmp-image/OBS-Output.png)

After your Output and streaming settings are done, you can start publishing your stream from OBS.

When the stream is published, you can play the stream with WebRTC, HLS or Dash. Check out the [stream playback](https://antmedia.io/docs/category/playing-live-streams/) document for more reference.


## Streaming to AMS with WHIP using Sample Web page

If you directly want to publish the WebRTC stream from your browser using WHIP protocol, then you can check the `whip.html` sample page of Ant Media Server for reference. 

This sample page uses the [Eyevinn WHIP client](https://www.npmjs.com/package/@eyevinn/whip-endpoint) to publish the stream to the server using the WHIP protocol. You can also directly integrate it into your web application.

Now, in order to publish the WHIP stream using the sample page, go to https://AMS-domain:5443/AppName/whip.html of your Ant Media Server and start publishing.

For example, you can test via this [sample page](https://test.antmedia.io:5443/WebRTCAppEE/whip.html).


## Watch the quick demo of WHIP using both methods

<iframe width="560" height="315" src="https://www.youtube.com/embed/hw0gs7Dxym4?si=UyJ2sATPyMF-iWWO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
