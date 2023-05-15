---
title: Quick-start
description: Deploy Ant Media Server to choice of your cloud within minutes.
keywords: [Download Ant Media Server, Setup Ant Media Server, Deploy Ant Media Server, Tutorial to deploy Ant Media Server, Ant Media Documentation]
sidebar_position: 1
---

# Quick start for Ant Media Server

This quick start guide shows you how to set up Ant Media Server (AMS) in just a few minutes and try ultra-low latency streaming using the enterprise edition on popular cloud marketplaces.

<VideoPlayer video="https://www.youtube.com/embed/EH6v-yUyzjU" youtube="true">
  <div><center><strong><i>Video tutorial of AWS marketplace installation</i></strong></center></div>
</VideoPlayer>

<VideoPlayer video="https://www.youtube.com/embed/uE8uzWhKSBE" youtube="true">
  <div><center><strong><i>Video tutorial of Azure marketplace installation</i></strong></center></div>
</VideoPlayer>

# Installation

The installation process for Ant Media Server Community and Enterprise Editions are the same so you can install The Community Edition by following the same instructions.

There are two ways to install Ant Media Server (AMS).

1. Manual installation to a remote server with a public IP address:
The installation process for manually installing Ant Media Server Community and Enterprise Editions are the same, please refer to the [Installation instructions](/guides/installing-on-linux/installing-ams-on-linux/)

2. Launch in one of the cloud marketplaces [AWS](https://aws.amazon.com/marketplace/search/results?x=0&y=0&searchTerms=Ant+Media+Server&page=1&ref_=nav_search_box), [Azure](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/antmedia.ant_media_server_enterprise?tab=Overview), [DigitalOcean](https://marketplace.digitalocean.com/apps/ant-media-server-enterprise-edition) (video tutorial above).


For detailed information about how to configure SSL for Ant Media Server, reference the [SSL Setup guide](/guides/installing-on-linux/setting-up-ssl/).

## Ultra-low latency publishing/playing

Ant Media Server Enterprise Edition provides 0.5 seconds end-to-end latency. So let's try ultra-low latency first.

### Publishing

- Visit the following page `https://your-domain-address.com:5443/WebRTCAppEE/`
- Let the browser access the camera and mic. Then click `Start Publishing`

  ![](@site/static/img/webrtc-publishing.png)
  
- After you press the button "Publishing", the status will change to publishing and you will start to see statistics showing the quality of the stream.

  ![](@site/static/img/webrtc-publishing-2.png)

### Playing

- Visit the following page `https://your-domain-address.com:5443/WebRTCAppEE/player.html`.
- Input into the text box the same stream id used in the previous step ( `stream1` by default)

  ![](@site/static/img/webrtc-playing.png)

- Press the `Start Play` button to start playing the WebRTC stream.

  ![](@site/static/img/webrtc-playing.png)

## Playing and Publishing Options

Both default play and publish pages have some options to customise the experience, incuding a data channel for sending and receiving text messages. 

<InfoBox>
  The data channel is covered here <a title="using the ant media server data channel" target="_blank" href="/guides/publish-live-stream/data-channel/">using the data channel</a>
</InfoBox>

### Publishing

Clicking on the "Options" button will reveal more than one way to publish a live stream. 

 ![](@site/static/img/webrtc-publish-options.png)

 In this example, there is more than one video source and more than one audio source. The default is to enabled your camera for a live stream chat, but other options include publishing your screen or publish your screen with your camera. 

### Playing

Click the "Options" button to see the different play back options. If adaptive bitrate (ABR) is enabled, you will be able to force the required quality. 

![](@site/static/img/webrtc-playing-options.png)

<InfoBox>
Don't forget that the <code>stream id</code> on the publish and play pages should be the same.
</InfoBox>

This quick start lets your try ultra-low latency streaming in Ant Media Server. If you have any problems, don't be hesitate to [discuss](https://github.com/orgs/ant-media/discussions).
