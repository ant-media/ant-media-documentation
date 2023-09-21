---
title: Quickstart
description: Deploy Ant Media Server to choice of your cloud within minutes.
keywords: [Download Ant Media Server, Setup Ant Media Server, Deploy Ant Media Server, Tutorial to deploy Ant Media Server, Ant Media Documentation]
sidebar_position: 1
---

# Quick Start

## Step 1: Download script

```shell
sudo wget https://raw.githubusercontent.com/ant-media/Scripts/master/install_ant-media-server.sh && sudo chmod 755 install_ant-media-server.sh
```

## Step 2: Install Ant Media Server

### Install Enterprise Edition

```shell
sudo ./install_ant-media-server.sh -l 'your-license-key'
```

### Install Community Edition
```shell
sudo ./install_ant-media-server.sh
```

### Install a specific version
```shell
sudo ./install_ant-media-server.sh -i <ANT_MEDIA_SERVER_ZIP_FILE>
```

**For more installation options check the help ```./install_ant-media-server.sh -h```.**

### Fast, easy installation on Cloud Marketplace


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

## Step 3: Configure SSL

### Free antmedia.cloud sub domain

```shell
cd /usr/local/antmedia/ && sudo ./enable_ssl.sh
```

### Custom domain name

```shell
cd /usr/local/antmedia/ && sudo ./enable_ssl.sh -d domain.com
```


## Step 4: Login to the Web Panel

Navigate to ```https://ant-media-server:5443``` and create the first user account.

![](@site/static/img/quick-start/create-first-account.png)

## Step 5: Publishing and Playing WebRTC Live Streams

### Publishing a Live Stream

You can quickly publish a WebRTC live stream from a sample page that's available at ```https://domain-name:5443/LiveApp```.

![](@site/static/img/quick-start/publish-stream.png)

### Playing a Live Stream

Then playback the WebRTC live stream from another sample page available at ```https://domain-name:5443/LiveApp/player.html```.


![](@site/static/img/quick-start/play-stream.png)


## Sample Tools and Applications

Access [sample tools and applications](/get-started/sample-tools-and-applications/) here ```https://ant-media-server:5443/LiveApp/samples.html```. 

 - Multitrack conferencing
 - WebRTC Test Tool
 - DeepAR affects


Below is an example of DeepAR.

![](@site/static/img/quick-start/deepar-sample.png)



## Getting Help

If you need any help, feel free to head over to [Github discussions](https://github.com/orgs/ant-media/discussions) or follow our more detailed guide, [Installing Ant Media Server on Linux](/guides/installing-on-linux/installing-ams-on-linux/). 
