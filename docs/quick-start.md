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

### Installing a Specific Version

Download the installation script and the Ant Media Server version you want to install to your server. Then run the installation. 

Ensure the correct [ports](http://localhost:3000/guides/installing-on-linux/installing-ams-on-linux/#server-ports) are open.

**Download the installation script**

```shell
sudo wget https://raw.githubusercontent.com/ant-media/Scripts/master/install_ant-media-server.sh && sudo chmod 755 install_ant-media-server.sh
```

**Download the Ant Media Server Version**
For enterprise users, login to your account at antmedia.io and download the zip file of version you want to install. Community edition users can download the required version from [Github](https://github.com/ant-media/Ant-Media-Server/tags). 

**Run the installation script**

```shell
sudo ./install_ant-media-server.sh -i <ANT_MEDIA_SERVER_ZIP_FILE>
```

### Auto-installation of the Latest Version

**Download the New Installation Script**

```shell
wget -O install_ant-media-server.sh https://raw.githubusercontent.com/ant-media/Scripts/master/install_ant-media-server.sh
```

**Give Execution Permissions**

```shell
chmod +x install_ant-media-server.sh
```

**Run the Installation Script**

For enterprise users, pass the license key as a parameter

```shell
./install_ant-media-server.sh -l 'your-license-key'
```

To install the latest community version, you can simply run the script without any parameters.

```shell
./install_ant-media-server.sh
```

### Configure SSL (optional)

You can either use your own domain name or use a free sub domain from antmedia.cloud. Just don't pass a domain name as argument and a free sub domain will be created. 

Run the commands in ```/usr/local/antmedia/```


#### Use a Free Sub Domain

```shell
sudo ./enable_ssl.sh
```

#### Use Your Own Domain Name

```shell
sudo ./enable_ssl.sh -d domain.com
```


## Login to the Web Panel

By now you should have Ant Media Server up and running. 

![](@site/static/img/quick-start/create-first-account.png)

Access the web panel by navigating to the URL below and create the first account. 

```js
https://domain-name:5443
```


### Publishing a Live Stream

Ant Media Server comes with two default applications, LiveApp and WebRTCAppEE that both contain sample pages for publishing live streams. 

![](@site/static/img/quick-start/publish-stream.png)

You can access the default WebRTC publishing page from the below URL using LiveApp as the example.

Make sure to give the browser permissions to access the camera and microphone and click "Start Publishing".

```js
https://domain-name:5443/LiveApp
```

### Playing a Live Stream

To play back the live stream you have just published, simple navigate to the following page URL and enter the same stream id that was used to publish the live stream and click "Start Playing". 

![](@site/static/img/quick-start/play-stream.png)


```js
https://domain-name:5443/LiveApp/player.html
```

## Sample Tools and Applications
There are many samples that come with the default applications in your Ant Media Server. Using the LiveApp as an example, they can be accessed by navigating to the following URL `http(s)://ant-media-server:port/LiveApp/samples.html`. 

Read more about the sample applications such as conferencing solution, applying virtual backgrounds and using DeepAR while live streaming [here](http://localhost:3000/get-started/sample-tools-and-applications/).

Below is an example of DeepAR.

![](@site/static/img/quick-start/deepar-sample.png)



## Getting Help


This quick start lets your try WebRTC ultra-low latency live streaming in Ant Media Server. 

For full installation instructions visit [Installing AMS on Linux](http://localhost:3000/guides/installing-on-linux/installing-ams-on-linux/) and if you have any problems, don't be hesitate to [discuss](https://github.com/orgs/ant-media/discussions).
