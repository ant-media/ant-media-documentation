---
title: Install on Linux
description: Installing Ant Media Server on Linux. You may install AMS on Ubuntu, CentOS, Rocky Linux, Alma Linux.
keywords: [Install Ant Media Server on Ubuntu, CentOS, Rocky Linux, Alma Linux, Install SSL on AMS, Cluster Installation, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

# Install AMS on Linux

Ant Media Server (AMS) can be installed on Linux, specifically Ubuntu (20.04, 22.04, and 24.04), CentOS 9, Rocky Linux 9, and Alma Linux 9. It is compatible with both the x86-64 and Arm64 architectures.

This document covers installing both the Community Edition and the Enterprise Edition directly on a Linux VM or server. If you're not sure this is the right method for you (vs. Docker, Docker Compose, WSL, or Cluster), see [Which Installation Method Should I Use?](/guides/installing-on-linux/which-installation-method-should-i-use/) first.

**Note:** This procedure works the same whether your server is on-premises or in the cloud.

## Before You Begin

Make sure you have:

- **A supported OS**: Ubuntu 20.04, 22.04, or 24.04, CentOS 9, Rocky Linux 9, or Alma Linux 9 (x86-64 or Arm64)
- **Enough hardware**: at least 4 vCPUs (compute-optimized) and 8 GB RAM for a single instance. SSD storage is recommended for smooth read/write performance
- **Root or sudo access** on the server
- **A license key**, only if you're installing the Enterprise Edition — skip this if you're using the Community Edition

## Download and Install Ant Media Server

There are two ways to get AMS onto your server. **Most people should use Automatic** — it's a single command. Use **Manual** instead only if your server can't reach GitHub directly (for example, an offline or air-gapped environment), or you need to install a specific version rather than the latest.

### Automatic Download and Install

You can perform these actions with a single command using the latest version installation script.

#### Download the installation script
```shell
wget -O install_ant-media-server.sh https://raw.githubusercontent.com/ant-media/Scripts/master/install_ant-media-server.sh && sudo chmod 755 install_ant-media-server.sh
```
#### Install the Enterprise Edition

Add your license key as a parameter, which you received via email, to the installation file using the -l parameter, and then execute it. If you have a valid license key, the installation process will begin.

```shell
sudo ./install_ant-media-server.sh -l '<YOUR_LICENSE_KEY>'
```

#### Install the Community Edition

You can simply run the script without any parameters to automatically download and install the latest version of the Community Edition.

```shell
sudo ./install_ant-media-server.sh
```

### Manually Download and Install

Download and save the latest AMS Community Edition or Enterprise Edition package.

*   Community Edition can be downloaded from the GitHub [Releases](https://github.com/ant-media/Ant-Media-Server/releases) page.
*   Enterprise Edition can be downloaded from your account after you get a license on [antmedia.io](https://antmedia.io/)

If you downloaded the zip file locally, copy it to your AMS instance with `scp` (or any file-transfer method you prefer — this works the same from Linux, Windows, or Mac):

```shell
scp -i <SSH_KEY> <AMS_ZIP_FILE> <USERNAME>@<SERVER_IP>:/home/<USERNAME>
```

Then open a terminal on the AMS instance and navigate to the directory you copied the file into:

```shell
cd <DIRECTORY_CONTAINING_THE_ZIP>
```

#### Download the installation script

Download the `install_ant-media-server.sh` shell script.

```shell
wget -O install_ant-media-server.sh https://raw.githubusercontent.com/ant-media/Scripts/master/install_ant-media-server.sh && sudo chmod 755 install_ant-media-server.sh
```
#### Update the installation script

If you have an existing installation script, we recommend updating it to the latest version first, using the `-u` option.

```shell
sudo ./install_ant-media-server.sh -u
```
#### Run the installation script

```shell
sudo ./install_ant-media-server.sh -i <ANT_MEDIA_SERVER_ZIP_FILE>
```
For more command line options, type `sudo ./install_ant-media-server.sh -h`

### Verify the Installation

Whichever method you used above, confirm AMS is actually running before moving on:

```shell
sudo service antmedia status
```

You can also start/stop the AMS service:

```shell
sudo service antmedia stop
sudo service antmedia start
```

And confirm AMS is answering requests by checking the web panel directly:

```shell
curl -I http://localhost:5080
```

Any HTTP response (not "connection refused" or a timeout) means AMS is up and listening.

## Server Ports

For AMS to run properly, you need to open the following network ports:

*   TCP: 80 (required for SSL certificate issuance, not for serving SSL traffic itself)
*   TCP: 5080 (HTTP)
*   TCP: 5443 (HTTPS)
*   UDP: 4200 (SRT)
*   TCP: 1935 (RTMP)
*   UDP: 50000-60000 (WebRTC). The default range is 50000-60000 in v2.4.3 and above; before 2.4.3, the default was 5000-65000. You can [change the port range](https://github.com/orgs/ant-media/discussions/4944) if needed.
*   TCP: 5000 (Only needed in cluster mode, for internal network communication. It should not be open to the public)

## Accessing the Web Panel

Once AMS is installed, open your browser and navigate to the web panel by typing `http://<SERVER_IP_ADDRESS>:5080`. If you're having trouble accessing the web panel, it's possible that a firewall is blocking access to port 5080.

The first time you access it, you'll be asked to create an admin account:

![](@site/static/img/ams-management-panel-create-account.png)

By default this is plain HTTP. SSL is required for camera/microphone access in the browser and for secure WebSocket (WSS) connections, and most browsers expect HTTPS by default — the quickest way to enable it is from the panel itself, under **Settings > SSL**, no terminal needed. For terminal-based setup or a specific certificate type (Let's Encrypt, your own certificate, or self-signed for local development), see the [SSL Setup guide](/guides/installing-on-linux/setting-up-ssl/).

Once SSL is enabled, the server can also be reached at:

```
https://<DOMAIN_NAME>:5443
```

## Optional: Use Standard Ports (80/443)

By default, AMS listens on 5080 (HTTP) and 5443 (HTTPS). If you'd rather not include a port number in your URLs, you can forward the standard ports 80 and 443 to them with `iptables`.

:::info
This is entirely optional — skip this section if `<SERVER_IP_ADDRESS>:5080` (or your domain on 5443) works fine for you. Once SSL is enabled, make sure port 80 is free and not forwarded anywhere else.
:::

### Forward 80 → 5080 and 443 → 5443

```shell
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 5080
sudo iptables -t nat -A PREROUTING -p tcp --dport 443 -j REDIRECT --to-port 5443
```

### List or Remove a Forwarding Rule

To list current rules:

```shell
sudo iptables -t nat --line-numbers -L
```

To remove one, use its line number from the output above:

```shell
iptables -t nat -D PREROUTING <LINE_NUMBER>
```

### Make It Persist After Reboot

```shell
sudo apt-get install iptables-persistent
```

Then, every time you change the rules and want them to stick, save them:

```shell
sudo sh -c "iptables-save > /etc/iptables/rules.v4"
```

You've installed **Ant Media Server on Linux**, started the **service**, opened the **ports** it needs, and can reach the **web panel**. From here, [enable SSL](/guides/installing-on-linux/setting-up-ssl/) if you haven't already, and [publish your first stream](/guides/publish-live-stream/webrtc/) to see it in action.

## Need Help?

If you run into trouble during installation, reach out on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or contact [Technical Support](mailto:support@antmedia.io).
