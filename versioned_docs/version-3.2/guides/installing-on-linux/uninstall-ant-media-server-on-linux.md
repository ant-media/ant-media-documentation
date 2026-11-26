---
title: Uninstall Ant Media Server
description: Uninstall Ant Media Server, whether you installed it as a native Linux service, with Docker, with Docker Compose, or on WSL.
keywords: [Uninstall Ant Media Server, Remove Ant Media Server, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 8
---

# Uninstall Ant Media Server

How you uninstall AMS depends on how you installed it.

By the end of this guide, AMS and everything its installer created will be fully removed from your system. Find the section below that matches your setup:

- [Native Linux Install](#native-linux-install)
- [Docker](#docker)
- [Docker Compose](#docker-compose)
- [WSL](#wsl)

## Native Linux Install

Follow these steps if you installed AMS directly on a Linux server or VM, following the [Install AMS on Linux](/guides/installing-on-linux/installing-ams-on-linux/) guide.

**Note**: this is destructive. Back up anything you want to keep — configuration, streams, recordings — before continuing.

### 1. Stop the Service

```shell
sudo service antmedia stop
```

### 2. Remove Application Files

```shell
sudo rm -rf /usr/local/antmedia
```

If you've upgraded AMS before, the installer will also have left timestamped backup folders alongside it (for example, `/usr/local/antmedia-backup-2026-07-28_10-42-54` — see the [upgrade guide](/guides/installing-on-linux/upgrading-ant-media-server/#restore-a-previous-installation)). Remove those too if you don't need them:

```shell
sudo rm -rf /usr/local/antmedia-backup-*
```

### 3. Delete the antmedia User

The installer creates a dedicated `antmedia` system user to run the service. Delete it:

```shell
sudo userdel antmedia
```

### 4. Remove Remaining System Files

The installer also creates a systemd service file, a log directory, a logrotate config, and a sudoers entry (the last one grants passwordless `sudo` specifically for renewing SSL certificates via `enable_ssl.sh`). Remove all of them:

```shell
sudo rm -f /etc/systemd/system/antmedia.service
sudo systemctl daemon-reload
sudo rm -rf /var/log/antmedia
sudo rm -f /etc/logrotate.d/antmedia
sudo rm -f /etc/sudoers.d/antmedia
```

## Docker

Follow these steps if you installed AMS with `docker run`, following the [Install AMS with Docker](/guides/installing-on-linux/ams-docker-installation/) guide.

```shell
docker stop antmedia
docker rm antmedia
```

This stops and removes the container. To also remove the image so it stops taking up disk space:

```shell
docker rmi antmedia/enterprise:latest
```

Use the image you actually ran — `antmedia/enterprise:latest` if you used the official Docker Hub image, or `antmediaserver` if you built your own with `docker build`.

If you created a persistent volume, remove it too:

```shell
docker volume rm antmedia_volume
```

**Note**: this deletes any data AMS wrote there — configuration, streams, recordings. Skip it if you want to reuse the volume with a fresh container later.

## Docker Compose

Follow these steps if you installed AMS with Docker Compose, following the [Install AMS with Docker Compose](/guides/installing-on-linux/ams-docker-compose-installation/) guide.

```shell
docker compose down
```

This stops and removes the container defined in your `docker-compose.yml`. To also remove the image it was built from:

```shell
docker compose down --rmi all
```

If you added a persistent volume, `docker compose down` won't remove it — it's marked `external`, so Compose doesn't manage its lifecycle. Remove it separately if you no longer need it:

```shell
docker volume rm antmedia_volume
```

**Note**: this deletes any data AMS wrote there — configuration, streams, recordings.

## WSL

AMS on WSL is installed the same way as a native Linux install, run [inside the WSL environment itself](/guides/installing-on-linux/installing-ams-on-wls/#3-install-ant-media-server). To remove it, run the [Native Linux Install](#native-linux-install) steps above from your WSL terminal.

If you only set up this WSL distro to try or test AMS and don't need it for anything else, it's simpler to remove the whole distro instead of cleaning up inside it. From PowerShell:

```
wsl --unregister <DISTRO_NAME>
```

This deletes the entire distro, not just AMS, so only use it if there's nothing else in that distro you need to keep.

AMS is now fully removed, along with the files and users its installer created. If you're setting it back up later, the [Which Installation Method Should I Use?](/guides/installing-on-linux/which-installation-method-should-i-use/) guide is the place to start again.

## Need Help?

If something doesn't fully remove, reach out on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or contact [Technical Support](mailto:support@antmedia.io).
