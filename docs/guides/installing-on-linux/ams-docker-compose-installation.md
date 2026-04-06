---
title: Install with Docker Compose
description: AMS Docker Compose Installation
keywords: [Docker, Docker Compose, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 7
---

Docker Compose keeps your entire AMS configuration in a single file and reduces day-to-day management to a handful of commands. It's the recommended approach for anything that needs to survive reboots or will grow into a multi-service stack.

:::tip
`compose.yaml` is the modern preferred filename. Docker Compose V2 resolves files in this order: `compose.yaml`, `compose.yml`, `docker-compose.yaml`, `docker-compose.yml`.
:::

## Quick Start — Official Image

Create `compose.yaml`:

```yaml
services:
  antmedia:
    image: antmedia/enterprise:latest
    container_name: ant-media-server
    restart: unless-stopped
    network_mode: host
```

Start:

```bash
docker compose up -d
```

Open `http://localhost:5080` to access the dashboard.

![](@site/static/img/docker-installation.webp)

## Production compose.yaml

Copy this as your starting point. It includes all required ports, persistent storage, and a health check.

```yaml
# compose.yaml — Ant Media Server standalone
#
# docker compose up -d        start
# docker compose logs -f      follow logs
# docker compose down         stop (data persists in volume)

services:
  antmedia:
    image: antmedia/enterprise:latest
    container_name: ant-media-server
    restart: unless-stopped

    # Option A: explicit ports (required on macOS, works everywhere)
    ports:
      - "5080:5080"         # HTTP — Dashboard, REST API, HLS
      - "4443:4443/tcp"     # HTTPS/WebRTC signaling
      - "4443:4443/udp"     # WebRTC media transport (both TCP+UDP required)
      - "1935:1935"         # RTMP ingest
      - "443:443"           # HTTPS (optional)
    # Option B: host networking (Linux only, best performance)
    # network_mode: host

    # License key — uncomment for Enterprise Edition:
    # command: ["-l", "your-license-key-here"]

    volumes:
      - antmedia_data:/usr/local/antmedia/          # persistent config, recordings, apps
      - /var/log/antmedia:/usr/local/antmedia/log   # logs on host

    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5080"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

volumes:
  antmedia_data:
```

:::warning
Port **4443** requires both `4443/tcp` and `4443/udp`. Missing the UDP entry breaks WebRTC media transport.
:::

## Building a Custom Image

Use this if you're not pulling from Docker Hub and need to build from a local zip.

### 1. Download files

```bash
wget https://raw.githubusercontent.com/ant-media/Scripts/master/docker/docker-compose.yml
wget https://raw.githubusercontent.com/ant-media/Scripts/master/docker/Dockerfile_Process -O Dockerfile
```

### 2. Build

**Enterprise Edition:**

```bash
docker compose build --build-arg AntMediaServer=ant-media-server-enterprise-2.14.0-20250513_1544.zip
```

**Community Edition:**

```bash
docker compose build --build-arg AntMediaServer=ant-media-server-community-2.14.0.zip
```

### 3. Run

```bash
docker compose up -d
```

## Upgrading

Pull the latest image and recreate the container. The data volume is preserved automatically.

```bash
docker compose pull
docker compose up -d
```

If you built a custom image, rebuild first, then run `docker compose up -d`.

---

For multi-node cluster deployments, see [Docker Swarm](../../clustering-and-scaling/docker/docker-swarm).
