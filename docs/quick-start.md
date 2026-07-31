---
title: Quickstart
description: Deploy Ant Media Server within minutes
keywords: [Download Ant Media Server, Setup Ant Media Server, Deploy Ant Media Server, Tutorial to deploy Ant Media Server, Ant Media Documentation]
sidebar_position: 2
sidebar_label: Quick Start
---

# Quick Start

## 1. Download Installation Script

```bash
wget https://raw.githubusercontent.com/ant-media/Scripts/master/install_ant-media-server.sh -O install_ant-media-server.sh  && sudo chmod 755 install_ant-media-server.sh
```

## 2. Install Ant Media Server

### Install Enterprise Edition

```bash
sudo ./install_ant-media-server.sh -l 'your-license-key'
```
### Install Community Edition

```bash
sudo ./install_ant-media-server.sh
```

### Install Specific Version

```bash
sudo ./install_ant-media-server.sh -i <ANT_MEDIA_SERVER_ZIP_FILE>
```

- You can get the specific version ZIP file of Community Edition from [here](https://github.com/ant-media/Ant-Media-Server/releases).
- For the Enterprise Edition Zip file, you can download it from your antmedia.io account or ask the support team.


**For more installation options, check the help:** `./install_ant-media-server.sh -h`

### Checkout: Fast & Easy Installations on Cloud Marketplaces

Prefer a one-click cloud image? Use AWS or Azure Marketplace:

<div style={{display: 'flex', justifyContent: 'space-between', textAlign: 'center', fontWeight:'bold', height: 'auto'}}>
  <div  style={{width: '49%', height:'300px'}}>
      <iframe className="border border-rounded m-3" width="100%" height="250" src="https://www.youtube.com/embed/1yQT-D8gPUo?si=CoXX6jXFZQ0j9xI2" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
      Video tutorial of AWS marketplace installation
  </div>
  <div  style={{width: '49%', height:'300px'}}>
      <iframe className="border border-rounded m-3" width="100%" height="250" src="https://www.youtube.com/embed/uE8uzWhKSBE" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
      Video tutorial of Azure marketplace installation
  </div>
</div>

## 3. Configure SSL

- After [installaling the Ant Media Server](https://antmedia.io/docs/guides/installing-on-linux/installing-ams-on-linux/), log in to the web panel and navigate to `SETTINGS > SSL`.
![](@site/static/img/ssl-webpanel/ssl-settings.png)

:::info
Before installing SSL, make sure that your server has a **static/fixed IP address** so that the domain can be mapped to a fixed IP.

If the IP is dynamic/changed, then the server will not be accessible on a previously generated subdomain.
:::

- In the drop-down select box named Type, choose among the various options to enable SSL, like [using your own domain](https://antmedia.io/docs/guides/installing-on-linux/setting-up-ssl/#create-lets-encrypt-certificate-with-http-01-challenge), [free subdomain of antmedia.cloud](https://antmedia.io/docs/guides/installing-on-linux/setting-up-ssl/#get-a-free-subdomain-and-install-ssl-with-lets-encrypt), or [import your own certificate](https://antmedia.io/docs/guides/installing-on-linux/setting-up-ssl/#import-your-custom-certificate) and then click Activate to enable the SSL and restart your server.

![](@site/static/img/ssl-webpanel/ssl-options.png)

- This will start to enable SSL for your Ant Media Server.
![](@site/static/img/ssl-webpanel/enabling-ssl.png)

- The Ant Media Server instance will restart and the server can now be accessed securely with SSL enabled.
![](@site/static/img/ssl-webpanel/ssl-status.png)

To configure SSL from the command line instead, see [Enable SSL via the terminal](/guides/installing-on-linux/setting-up-ssl/#option-2-installing-ssl-using-the-terminal).

## 4. Log in to Web Panel

Navigate to ```https://ant-media-server:5443``` and create the first user account.

![management-panel](https://github.com/user-attachments/assets/8901d363-23b2-4f08-979c-6c7e6e15a7df)

## 5. Publish and Play WebRTC Live Streams

### Publish Live Stream

Publish a WebRTC live stream from the sample webrtc publish page, which is available at ```https://domain-name:5443/live ```

![publish](https://github.com/user-attachments/assets/510d9d26-275a-459f-939c-0acec27b8632)


### Play Live Stream

Play the live stream with WebRTC using the sample WebRTC player page, which is available at ```https://domain-name:5443/live/player.html```

![play](https://github.com/user-attachments/assets/dad6d64e-6462-408e-849b-4b25c590ca96)

## Sample tools and applications

## Sample Tools and Applications

- Access the [sample tools and applications](/get-started/sample-tools-and-applications/) via ```https://domain-name:5443/live/samples.html```.

- Experience the sample pages [here](https://test.antmedia.io:5443/live/samples.html) now.

## Next steps

| I want to… | Go to |
| --- | --- |
| Explore the dashboard | [Dashboard Features](/dashboard-features/) |
| Run Enterprise in production | [Enterprise Deployment Hub](/enterprise-guide/) |
| Install with more options | [Installing AMS on Linux](/guides/installing-on-linux/installing-ams-on-linux/) |
| Scale beyond one server | [Clustering and Scaling](/category/clustering-and-scaling/) |

## Getting Help

If you need help, visit [GitHub Discussions](https://github.com/orgs/ant-media/discussions), follow the [AMS Installation Guide](/guides/installing-on-linux/installing-ams-on-linux/), or use the [support escalation matrix](/enterprise-guide/#support-escalation-matrix) for production and Enterprise support channels.
