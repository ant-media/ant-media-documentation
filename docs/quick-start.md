---
title: Quick Start
description: Install Ant Media Server in minutes, enable SSL, and publish your first WebRTC stream.
keywords: [Download Ant Media Server, Setup Ant Media Server, Deploy Ant Media Server, Tutorial to deploy Ant Media Server, Ant Media Documentation]
sidebar_position: 2
sidebar_label: Quick Start
---

# Quick Start

This guide takes you from a fresh server to a working WebRTC stream. You'll install a single Ant Media Server (AMS), enable SSL, log in to the web panel, and then publish and play a test stream.

## Choose your installation path

Before you run any commands, decide where AMS will run:

| I want to… | Start here |
| --- | --- |
| Install on my own hardware or company infrastructure | Prepare a supported Linux server, then go to [step 1](#1-download-the-installation-script) |
| Install on a cloud VM that I create and manage | Prepare a supported Linux VM in your cloud account, then go to [step 1](#1-download-the-installation-script) |
| Launch a ready-made Cloud Marketplace image | Go to [Cloud marketplace installations](#cloud-marketplace-installations). AMS is already installed, so you can skip steps 1 and 2 |

Installing AMS yourself on a cloud VM still counts as **self-hosted**. A **Cloud Marketplace** image saves you the installation step, but the server still runs in your cloud account and you are still the one operating it.

The commands in this guide are for a **single Linux server**. Run them on the server that will host AMS, even if you're connecting to it from a Mac or Windows computer. If you want to run AMS locally on macOS or Windows, or you'd rather use Docker, see [Which Installation Method Should I Use?](/guides/installing-on-linux/which-installation-method-should-i-use/)

If you need more than one server for capacity or high availability, start with [Choose a Deployment Option](/guides/clustering-and-scaling/choose-deployment-option/) instead.

:::tip
Before you proceed, review the [Enterprise Deployment Hub](/enterprise-guide/) for a production checklist, cluster architecture, and upgrade guidance.
:::

## 1. Download the installation script

```bash
wget https://raw.githubusercontent.com/ant-media/Scripts/master/install_ant-media-server.sh -O install_ant-media-server.sh && sudo chmod 755 install_ant-media-server.sh
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

To install a specific version, download its ZIP file first:

- **Community Edition:** download the ZIP from the [Ant Media Server releases page](https://github.com/ant-media/Ant-Media-Server/releases).
- **Enterprise Edition:** download the ZIP from your antmedia.io account, or ask the support team for it.

For an **Enterprise Edition ZIP**, pass both the ZIP file and your license key:

```bash
sudo ./install_ant-media-server.sh -i <ANT_MEDIA_SERVER_ZIP_FILE> -l 'your-license-key'
```

The `-i` option points the installer at the ZIP you downloaded, and `-l` sets your Enterprise license key during installation. The Enterprise ZIP doesn't activate a license on its own, so don't leave out `-l`. If you've already installed without it, follow the [license configuration instructions](/guides/installing-on-linux/installing-ams-on-linux/#run-the-installation-script).

For a **Community Edition ZIP**, you don't need a license key:

```bash
sudo ./install_ant-media-server.sh -i <ANT_MEDIA_SERVER_ZIP_FILE>
```

To see all installation options, run `sudo ./install_ant-media-server.sh -h`. For a complete walkthrough of the Linux installation, see [Installing AMS on Linux](/guides/installing-on-linux/installing-ams-on-linux/).

## 3. Configure SSL

WebRTC needs SSL, because browsers only allow camera and microphone access and secure WebSocket connections over HTTPS. Once AMS is installed, open the web panel and go to `SETTINGS > SSL`.

![](@site/static/img/ssl-webpanel/ssl-settings.png)

:::info
Before you enable SSL, make sure your server has a **static IP address** so that your domain always points to the right place.

If the IP address changes, the server may no longer be reachable on a subdomain you generated earlier.
:::

In the **Type** drop-down, choose how you want to set up SSL. You can use [your own domain](/guides/installing-on-linux/setting-up-ssl/#create-lets-encrypt-certificate-with-http-01-challenge), a [free antmedia.cloud subdomain](/guides/installing-on-linux/setting-up-ssl/#get-a-free-subdomain-and-install-ssl-with-lets-encrypt), or [import your own certificate](/guides/installing-on-linux/setting-up-ssl/#import-your-custom-certificate). Then click **Activate**.

![](@site/static/img/ssl-webpanel/ssl-options.png)

AMS starts setting up SSL:

![](@site/static/img/ssl-webpanel/enabling-ssl.png)

When it's done, the server restarts and you can reach it securely over HTTPS:

![](@site/static/img/ssl-webpanel/ssl-status.png)

If you'd rather configure SSL from the command line, see [Enable SSL via the terminal](/guides/installing-on-linux/setting-up-ssl/#option-2-installing-ssl-using-the-terminal).

## 4. Log in to the web panel

Go to `https://your-domain:5443` and create the first user account.

![management-panel](https://github.com/user-attachments/assets/8901d363-23b2-4f08-979c-6c7e6e15a7df)

## 5. Publish and play WebRTC live streams

### Publish a live stream

Open the sample WebRTC publish page at `https://your-domain:5443/live` and start a stream.

![publish](https://github.com/user-attachments/assets/510d9d26-275a-459f-939c-0acec27b8632)

### Play a live stream

To watch the stream, open the sample WebRTC player page at `https://your-domain:5443/live/player.html`.

![play](https://github.com/user-attachments/assets/dad6d64e-6462-408e-849b-4b25c590ca96)

## Cloud marketplace installations

If you'd rather not install AMS yourself, you can launch it as a ready-made image from your cloud provider's Marketplace. For AWS and Azure, follow the video tutorials below. For GCP, open [Google Cloud Marketplace](https://console.cloud.google.com/marketplace), search for **Ant Media Server Enterprise Edition**, and follow the launch instructions on the listing.

These images come with AMS already installed, so **skip steps 1 and 2**. Once your instance is running and the required ports are open, go back to [step 3: Configure SSL](#3-configure-ssl) and continue from there.

If you're planning a cluster rather than a single instance, read [Choose a Deployment Option](/guides/clustering-and-scaling/choose-deployment-option/) before you launch anything.

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

## Sample tools and applications

- Your server comes with [sample applications](/sample-applications/) at `https://your-domain:5443/live/samples.html`.
- Want to try them before installing anything? Open the [hosted sample pages](https://test.antmedia.io:5443/live/samples.html).

## Next steps

| I want to… | Go to |
| --- | --- |
| Explore the dashboard | [Dashboard Features](/dashboard-features/) |
| Run Enterprise in production | [Enterprise Deployment Hub](/enterprise-guide/) |
| Install with more options | [Installing AMS on Linux](/guides/installing-on-linux/installing-ams-on-linux/) |
| Scale beyond one server | [Clustering and Scaling](/guides/clustering-and-scaling/) |

## Getting Help

If you get stuck, ask on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or check the [AMS Installation Guide](/guides/installing-on-linux/installing-ams-on-linux/). For production and Enterprise support, see the [support escalation matrix](/enterprise-guide/#support-escalation-matrix).
