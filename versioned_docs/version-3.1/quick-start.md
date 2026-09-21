---
title: Quick Start
description: Install Ant Media Server in minutes, enable SSL, and publish your first WebRTC stream.
keywords: [Download Ant Media Server, Setup Ant Media Server, Deploy Ant Media Server, Tutorial to deploy Ant Media Server, Ant Media Documentation]
sidebar_position: 2
sidebar_label: Quick Start
---

# Quick Start

Get Ant Media Server running on Linux in a few steps: install the server, enable SSL, open the web panel, then publish and play a WebRTC stream.

:::tip
Before you proceed, review the [Enterprise Deployment Hub](/enterprise-guide/) for a production checklist, cluster architecture, and upgrade guidance.
:::

## 1. Download the installation script

```bash
wget https://raw.githubusercontent.com/ant-media/Scripts/master/install_ant-media-server.sh -O install_ant-media-server.sh  && sudo chmod 755 install_ant-media-server.sh
```

## 2. Install Ant Media Server

### Install the Enterprise Edition

```bash
sudo ./install_ant-media-server.sh -l 'your-license-key'
```

### Install the Community Edition

```bash
sudo ./install_ant-media-server.sh
```

### Install a specific version

```bash
sudo ./install_ant-media-server.sh -i <ANT_MEDIA_SERVER_ZIP_FILE>
```

- You can get the specific version ZIP file of Community Edition from [here](https://github.com/ant-media/Ant-Media-Server/releases).
- For the Enterprise Edition ZIP file, download it from your antmedia.io account or ask the support team.

For more installation options, run: `./install_ant-media-server.sh -h`

### Cloud marketplace installations

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

For a full Linux install walkthrough, see [Installing AMS on Linux](/guides/installing-on-linux/installing-ams-on-linux/).

## 3. Configure SSL

SSL is required for WebRTC (camera/microphone access and secure WebSockets). After [installing Ant Media Server](/guides/installing-on-linux/installing-ams-on-linux/), open the web panel and go to `SETTINGS > SSL`.

![](@site/static/img/ssl-webpanel/ssl-settings.png)

:::info
Before installing SSL, make sure that your server has a **static/fixed IP address** so that the domain can be mapped to a fixed IP.

If the IP is dynamic or changes, the server may not be accessible on a previously generated subdomain.
:::

In the **Type** drop-down, choose how to enable SSL—[your own domain](/guides/installing-on-linux/setting-up-ssl/#create-lets-encrypt-certificate-with-http-01-challenge), a [free antmedia.cloud subdomain](/guides/installing-on-linux/setting-up-ssl/#get-a-free-subdomain-and-install-ssl-with-lets-encrypt), or [import your own certificate](/guides/installing-on-linux/setting-up-ssl/#import-your-custom-certificate)—then click **Activate**. The server restarts with SSL enabled.

![](@site/static/img/ssl-webpanel/ssl-options.png)

This starts enabling SSL for your Ant Media Server:

![](@site/static/img/ssl-webpanel/enabling-ssl.png)

The Ant Media Server instance restarts and can be accessed securely with SSL enabled:

![](@site/static/img/ssl-webpanel/ssl-status.png)

To configure SSL from the command line instead, see [Enable SSL via the terminal](/guides/installing-on-linux/setting-up-ssl/#option-2-installing-ssl-using-the-terminal).

## 4. Log in to the web panel

Navigate to ```https://ant-media-server:5443``` and create the first user account.

![management-panel](https://github.com/user-attachments/assets/8901d363-23b2-4f08-979c-6c7e6e15a7df)

## 5. Publish and play WebRTC live streams

### Publish a live stream

Publish a WebRTC live stream from the sample webrtc publish page, which is available at ```https://domain-name:5443/live ```

![publish](https://github.com/user-attachments/assets/510d9d26-275a-459f-939c-0acec27b8632)

### Play a live stream

Play the live stream with WebRTC using the sample WebRTC player page, which is available at ```https://domain-name:5443/live/player.html```

![play](https://github.com/user-attachments/assets/dad6d64e-6462-408e-849b-4b25c590ca96)

## Sample tools and applications

- Access the [sample applications](/sample-applications/) via ```https://domain-name:5443/live/samples.html```.

- Experience the sample pages [here](https://test.antmedia.io:5443/live/samples.html) now.

## Next steps

| I want to… | Go to |
| --- | --- |
| Explore the dashboard | [Dashboard Features](/dashboard-features/) |
| Run Enterprise in production | [Enterprise Deployment Hub](/enterprise-guide/) |
| Install with more options | [Installing AMS on Linux](/guides/installing-on-linux/installing-ams-on-linux/) |
| Scale beyond one server | [Clustering and Scaling](/guides/clustering-and-scaling/) |

## Getting Help

If you need help, visit [GitHub Discussions](https://github.com/orgs/ant-media/discussions), follow the [AMS Installation Guide](/guides/installing-on-linux/installing-ams-on-linux/), or use the [support escalation matrix](/enterprise-guide/#support-escalation-matrix) for production and Enterprise support channels.
