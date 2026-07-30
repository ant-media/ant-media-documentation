---
title: Install on WSL
description: Install Ant Media Server on WSL (Windows Subsystem for Linux)
keywords: [Install Ant Media Server on Windows, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 5
---

# Install AMS on WSL (Windows Subsystem for Linux)

Windows Subsystem for Linux (WSL) provides a lightweight virtualized environment to run Linux distributions directly on Windows. This guide shows you how to install Ant Media Server (AMS) on WSL, which can be useful for local development, testing, and demos.

:::info **Important:** This guide requires **WSL2** and Ubuntu (>20.04) as your Linux distribution — step 1 below verifies this. WSL performance is more limited than a native Linux server, and hardware-accelerated encoding usually isn't available, so for production setups, use a dedicated Linux server or virtual machine instead.

We also **do not cover** every installation step of AMS here — please follow our [Install AMS on Linux](/guides/installing-on-linux/installing-ams-on-linux/) documentation for the complete process. This guide supplements that with WSL-specific steps.
:::

## Before You Begin

Make sure you have:

- **Windows 10 version 2004 or later (Build 19041+), or Windows 11**
- **Virtualization enabled** in your system's BIOS/UEFI — required for WSL2. Most machines have this on by default, but if `wsl --install` below fails, this is the first thing to check
- **Administrator access** on your Windows machine, to run the commands below

## 1. Install WSL and Ubuntu

:::info
Before proceeding with the WSL installation, run the below commands to enable the Windows feature for virtualization and WSL.

Run **PowerShell as Administrator** and execute:

```
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart

dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

After that, reboot the system.
:::

You can now install WSL and Ubuntu using a single command in PowerShell (run as Administrator):

```bash
wsl --install
```
  
Once the installation completes and the system reboots, you'll be greeted with a Linux shell asking you to create a username and password.

 ![](@site/static/img/wls-installation/screen2.webp)

Confirm you're running WSL2, not WSL1 — this guide's instructions assume it, and AMS's install script may not behave correctly on WSL1. From PowerShell:

```
wsl -l -v
```

Your Ubuntu distribution should show `2` in the `VERSION` column. `wsl --install` defaults to WSL2 on current Windows versions, so this should already be the case — but if it shows `1`, convert it with `wsl --set-version <DISTRO_NAME> 2` before continuing.

## 2. Update the Ubuntu Environment

After setting up Ubuntu, update the package lists and install system updates:

```bash
sudo apt update && sudo apt upgrade -y
```

## 3. Install Ant Media Server

:::info
AMS installs itself as a service managed by `systemctl`, which needs systemd running as PID 1 inside WSL. Recent Ubuntu images from `wsl --install` enable this by default, but older or reconfigured environments may not have it. Check with:

```bash
ps -p 1 -o comm=
```

If this doesn't print `systemd`, add the following to `/etc/wsl.conf` inside your WSL Ubuntu instance (create the file if it doesn't exist):

```
[boot]
systemd=true
```

Then, from PowerShell, run `wsl --shutdown` and reopen your WSL terminal before continuing.
:::

Follow our official [Install AMS on Linux](/guides/installing-on-linux/installing-ams-on-linux/) guide to install Ant Media Server inside the WSL environment.

Once AMS is installed, check its status:

```bash
sudo service antmedia status
```

## 4. Access the Web Dashboard

AMS is typically available at:

```
http://localhost:5080
```

You can access this from any browser on your Windows machine. You can also confirm from inside WSL that AMS is answering requests:

```bash
curl -I http://localhost:5080
```

Any HTTP response (not "connection refused" or a timeout) means AMS is up and listening.

The first time you access it, you'll be asked to create an admin account:

![](@site/static/img/ams-management-panel-create-account.png)

Check out [WebRTC Publishing](/guides/publish-live-stream/webrtc/) to publish a stream for testing. To do this in a production environment, you'll also need SSL — see the [SSL Setup guide](/guides/installing-on-linux/setting-up-ssl/).

## Troubleshooting

- If you can't access AMS at `http://localhost:5080`, check if the WSL instance is running and that AMS is started: `wsl -l -v` from PowerShell, then `sudo service antmedia status` inside WSL.
- Make sure ports are not blocked by your firewall or antivirus.
- If the install script fails partway through with an error mentioning `systemctl` or "Failed to connect to bus", see the systemd note in [step 3](#3-install-ant-media-server) above.
- Still stuck? Reach out on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or contact [Technical Support](mailto:support@antmedia.io).

You've installed Ant Media Server inside WSL2, started the service, and confirmed the web dashboard is reachable. You now have a working local environment for testing, development, or demos, all from Windows. When you're ready to move to production, follow the [native Linux install guide](/guides/installing-on-linux/installing-ams-on-linux/) on a dedicated server or VM instead.



