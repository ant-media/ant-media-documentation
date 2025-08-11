---
title: Install on WSL
description: Install Ant Media Server on WSL (Windows Subsystem for Linux)
keywords: [Install Ant Media Server on Windows, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 5
---

# Install AMS on WSL (Windows Subsystem for Linux)

Windows Subsystem for Linux (WSL) provides a lightweight virtualized environment to run Linux distributions directly on Windows. This guide shows you how to install Ant Media Server (AMS) on WSL, which can be useful for local development, testing, and demos.

:::info **Important:** This guide assumes you are using **WSL2** and Ubuntu as your Linux distribution. For production setups, we strongly recommend using a dedicated Linux server or virtual machine.

We also **do not cover** every installation step of AMS here — please follow our [Installing Ant Media Server on Linux](https://antmedia.io/docs/installation/) documentation for the complete process. This guide supplements that with WSL-specific steps.
:::

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

 ![](@site/static/img/wls-installation/screen1.webp)

 ![](@site/static/img/wls-installation/screen2.webp)

---

## 2. Update the Ubuntu Environment

After setting up Ubuntu, update the package lists and install system updates:

```bash
sudo apt update && sudo apt upgrade -y
```

 ![](@site/static/img/wls-installation/screen5.webp)

---

## 3. Install Ant Media Server

Follow our official [Linux installation guide](https://antmedia.io/docs/guides/installing-on-linux/installing-ams-on-linux/) to install Ant Media Server inside the WSL environment.

Once AMS is installed, check its status:

```bash
sudo service antmedia status
```

---

## 4. Access the Web Dashboard

If you're running AMS on WSL2, it will typically be available at:

```bash
http://localhost:5080
```

You can access this from any browser on your Windows machine.


 ![](@site/static/img/wls-installation/screen3.webp)

---

## 5. Publish a Test Stream

We can now test publishing a WebRTC stream from the browser with this URL:

```bash
http://localhost:5080/LiveApp/
```

And play it with the following:

```bash
http://localhost:5080/LiveApp/play.html?id=test
```

 ![](@site/static/img/wls-installation/screen4.webp)


To publish and play WebRTC in a production environment, you need to enable SSL. For more info, check out the SSL document [**here**](https://antmedia.io/docs/guides/installing-on-linux/setting-up-ssl/).

---

## Notes and Considerations

- AMS performance on WSL may be limited compared to a native Linux server.
- Hardware-accelerated encoding might not be available in WSL.
- WSL is best suited for **development and testing**, not production.

---

## Troubleshooting

- If you can't access AMS at `http://localhost:5080`, check if the WSL instance is running and that AMS is started.
- Make sure ports are not blocked by your firewall or antivirus.
