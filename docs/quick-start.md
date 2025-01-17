---
title: Quickstart
description: Deploy Ant Media Server to choice of your cloud within minutes.
keywords: [Download Ant Media Server, Setup Ant Media Server, Deploy Ant Media Server, Tutorial to deploy Ant Media Server, Ant Media Documentation]
sidebar_position: 1
---

# Quick Start

### 1. Download the Installation Script

```shell
wget https://raw.githubusercontent.com/ant-media/Scripts/master/install_ant-media-server.sh -O install_ant-media-server.sh  && sudo chmod 755 install_ant-media-server.sh
```

### 2. Install Ant Media Server

#### Install the Enterprise Edition

```shell
sudo ./install_ant-media-server.sh -l 'your-license-key'
```

#### Install the Community Edition
```shell
sudo ./install_ant-media-server.sh
```

#### Install a Specific Version
```shell
sudo ./install_ant-media-server.sh -i <ANT_MEDIA_SERVER_ZIP_FILE>
```

**For more installation options check the help ```./install_ant-media-server.sh -h```.**

#### Checkout: Fast & Easy Installations on Cloud Marketplaces


<div style={{display: 'flex', justifyContent: 'space-between', textAlign: 'center', fontWeight:'bold', height: 'auto'}}>
  <div  style={{width: '49%', height:'300px'}}>
      <iframe className="border border-rounded m-3" width="100%" height="250" src="https://www.youtube.com/embed/1yQT-D8gPUo?si=CoXX6jXFZQ0j9xI2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      Video tutorial of AWS marketplace installation
  </div>
  <div  style={{width: '49%', height:'300px'}}>
      <iframe className="border border-rounded m-3" width="100%" height="250" src="https://www.youtube.com/embed/uE8uzWhKSBE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      Video tutorial of Azure marketplace installation
  </div>
</div>

### 3. Configure SSL

- After [installaling the Ant Media Server](https://antmedia.io/docs/guides/installing-on-linux/installing-ams-on-linux/), login to the web panel and navigate to `SETTINGS > SSL`.
![](@site/static/img/ssl-webpanel/ssl-settings.png)

- In the drop-down select box named Type, choose among the various options to enable SSL, like [using your own domain](https://antmedia.io/docs/guides/installing-on-linux/setting-up-ssl/#create-lets-encrypt-certificate-with-http-01-challenge), [free subdomain of antmedia.cloud](https://antmedia.io/docs/guides/installing-on-linux/setting-up-ssl/#get-a-free-subdomain-and-install-ssl-with-lets-encrypt), or [import your own certificate](https://antmedia.io/docs/guides/installing-on-linux/setting-up-ssl/#import-your-custom-certificate) and then click Activate to enable the SSL and restart your server.

![](@site/static/img/ssl-webpanel/ssl-options.png)

- This will start to enable SSL for your Ant Media Server.
![](@site/static/img/ssl-webpanel/enabling-ssl.png)

- The Ant Media Server instance will restart and the server can now be accessed securely with SSL enabled.
![](@site/static/img/ssl-webpanel/ssl-status.png)

- Check this to learn how to [enable SSL via the terminal](https://antmedia.io/docs/version-2.11.3/guides/installing-on-linux/setting-up-ssl/#option-2-installing-ssl-using-the-terminal).

### 4. Login to the Web Panel

Navigate to ```https://ant-media-server:5443``` and create the first user account.

![](@site/static/img/quick-start/create-first-account.png)

### 5. Publish and Play WebRTC Live Streams

#### Publish a Live Stream

You can quickly publish a WebRTC live stream from a sample page that's available at ```https://domain-name:5443/LiveApp```.

![](@site/static/img/quick-start/publish-stream.png)

#### Play a Live Stream

Then playback the WebRTC live stream from another sample page available at ```https://domain-name:5443/LiveApp/player.html```.


![](@site/static/img/quick-start/play-stream.png)


### Sample Tools and Applications

Access the [sample tools and applications](/get-started/sample-tools-and-applications/) via ```https://ant-media-server:5443/LiveApp/samples.html```. As an example,

 - Multitrack Conferencing
 - WebRTC Test Tool
 - DeepAR affects


Below is an example of DeepAR.

![](@site/static/img/quick-start/deepar-sample.png)



### Getting Help

If you need any help, feel free to head over to [Github discussions](https://github.com/orgs/ant-media/discussions) or follow our more detailed guide, [Installing Ant Media Server on Linux](/guides/installing-on-linux/installing-ams-on-linux/). 
