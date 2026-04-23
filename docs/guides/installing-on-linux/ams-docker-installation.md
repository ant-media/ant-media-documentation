---
title: Install with Docker
description: AMS Docker Installation
keywords: [Docker, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 6
---

:::note TODO
- **SSL/TLS setup** — certificate mounting, Let's Encrypt, and reverse proxy configuration (Nginx/Traefik)
- **Environment variable reference** — full list of env vars and startup flags accepted by the image
:::

Docker is the fastest way to get Ant Media Server running without touching your host system.

## Quick Start

**Linux** — host networking gives the best performance:

```bash
docker run -d --restart=always --name antmedia \
  --network=host \
  antmedia/enterprise:latest
```

**macOS / explicit port mapping:**

```bash
docker run -d --restart=always --name antmedia \
  -p 5080:5080 \
  -p 4443:4443/tcp \
  -p 4443:4443/udp \
  -p 1935:1935 \
  antmedia/enterprise:latest
```

Once the container is up, open `http://localhost:5080` to access the dashboard.

![](@site/static/img/docker-installation.webp)

### Ports

| Port | Protocol | Purpose |
|------|----------|---------|
| 5080 | TCP | HTTP — Dashboard, REST API, HLS |
| 4443 | TCP + UDP | HTTPS / WebRTC |
| 1935 | TCP | RTMP ingest |
| 443  | TCP | HTTPS — alternate secure port |

:::warning
Port **4443** must be mapped for **both TCP and UDP**. WebRTC uses UDP for media and TCP for signaling — missing either breaks streaming.
:::

## Persistent Storage

By default, data is lost when the container is removed. To keep configuration, recordings, and apps:

```bash
docker volume create antmedia_data

docker run -d --restart=always --name antmedia \
  --network=host \
  --mount source=antmedia_data,target=/usr/local/antmedia/ \
  antmedia/enterprise:latest
```

To also expose logs on the host for log aggregation:

```bash
docker run -d --restart=always --name antmedia \
  --network=host \
  --mount source=antmedia_data,target=/usr/local/antmedia/ \
  -v /var/log/antmedia:/usr/local/antmedia/log \
  antmedia/enterprise:latest
```

## Health Check

Docker can restart the container automatically if AMS becomes unresponsive:

```bash
docker run -d --restart=always --name antmedia \
  --network=host \
  --health-cmd="curl -f http://localhost:5080 || exit 1" \
  --health-interval=30s \
  --health-timeout=10s \
  --health-retries=3 \
  --health-start-period=40s \
  antmedia/enterprise:latest
```

## Building a Custom Image

Use this path if you need a specific version or want to bundle custom plugins.

### 1. Download the Dockerfile

```bash
wget https://raw.githubusercontent.com/ant-media/Scripts/master/docker/Dockerfile_Process -O Dockerfile
```

### 2. Build

**Enterprise Edition** — download the zip from your [Ant Media account](https://antmedia.io) first:

```bash
docker build -t antmediaserver \
  --build-arg AntMediaServer=ant-media-server-enterprise-2.14.0-20250513_1544.zip .
```

**Community Edition** — download from the [GitHub releases page](https://github.com/ant-media/Ant-Media-Server/releases) first:

```bash
docker build -t antmediaserver \
  --build-arg AntMediaServer=ant-media-server-community-2.14.0.zip .
```

:::info
To build using a license key instead of a local zip, pass `--build-arg LicenseKey=<your-key>`. Add `--network=host` only if the build environment has outbound network restrictions.
:::

### 3. Run

```bash
# Linux
docker run -d --restart=always --name antmedia \
  --network=host \
  antmediaserver

# macOS / explicit ports
docker run -d --restart=always --name antmedia \
  -p 5080:5080 \
  -p 4443:4443/tcp \
  -p 4443:4443/udp \
  -p 1935:1935 \
  antmediaserver
```

Check out the [WebRTC publishing guide](https://antmedia.io/docs/guides/publish-live-stream/webrtc/) to test your first stream.
