---
title: Quick-start
description: Deploy Ant Media Server to choice of your cloud within minutes.
keywords: [Download Ant Media Server, Setup Ant Media Server, Deploy Ant Media Server, Tutorial to deploy Ant Media Server, Ant Media Documentation]
sidebar_position: 1
---

# Quick Start

This quick start guide shows you how to set up Ant Media Server (AMS) in just a few minutes.


## Installation on Cloud Marketplaces

 If you don't want to manually install Ant Media Server, try the one-click installation on cloud marketplaces. 


<div style={{display: 'flex', justifyContent: 'space-between', textAlign: 'center', fontWeight:'bold', height: 'auto'}}>
  <div  style={{width: '49%', height:'300px'}}>
      <iframe className="border border-rounded m-3" width="100%" height="250" src="https://www.youtube.com/embed/EH6v-yUyzjU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      Video tutorial of AWS marketplace installation
  </div>
  <div  style={{width: '49%', height:'300px'}}>
      <iframe className="border border-rounded m-3" width="100%" height="250" src="https://www.youtube.com/embed/uE8uzWhKSBE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      Video tutorial of Azure marketplace installation
  </div>
</div>

## Manually Install Ant Media Server

### Download the installation script

Download the installation script to your server and run the installation. Ensure the correct [ports](http://localhost:3000/guides/installing-on-linux/installing-ams-on-linux/#server-ports) are open

```shell
sudo wget https://raw.githubusercontent.com/ant-media/Scripts/master/install_ant-media-server.sh && sudo chmod 755 install_ant-media-server.sh
sudo ./install_ant-media-server.sh -i <ANT_MEDIA_SERVER_ZIP_FILE>
```

### Configure SSL (optional)

You can either use your own domain name or use a free sub domain from antmedia.cloud. Just don't pass a domain name as argument and a free sub domain will be created. 

Run the commands in ```/usr/local/antmedia/```
#### Your Domain Name

```shell
sudo ./enable_ssl.sh -d domain.com
```

#### Free Sub Domains

```shell
sudo ./enable_ssl.sh
```

## Login to the Web Panel

By now you should have Ant Media Server up and running. Access the web panel by navigating to the URL below and create the first account. 
```js
https://domain-name:5443
```


### Publishing a Live Stream

Ant Media Server comes with two default applications, LiveApp and WebRTCAppEE that both contain sample pages for publishing live streams. 

You can access the default WebRTC publishing page from the below URL using LiveApp as the example.

Make sure to give the browser permissions to access the camera and microphone and click "Start Publishing".

```js
https://domain-name:5443/LiveApp
```

### Playing a Live Stream

To play back the live stream you have just published, simple navigate to the following page URL and enter the same stream id that was used to publish the live stream and click "Start Playing". 


```js
https://domain-name:5443/LiveApp/player.html
```

## Getting Help


This quick start lets your try WebRTC ultra-low latency live streaming in Ant Media Server. 

For full installation instructions visit [Installing AMS on Linux](http://localhost:3000/guides/installing-on-linux/installing-ams-on-linux/) and if you have any problems, don't be hesitate to [discuss](https://github.com/orgs/ant-media/discussions).
