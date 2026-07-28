---
title: Install with Docker Compose
description: AMS Docker Compose Installation
keywords: [Docker, Docker Compose, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 4
---

# Install AMS with Docker Compose

Docker Compose offers a simpler way to manage Ant Media Server (AMS) compared to running a single container with `docker run`. With Compose, you can:

- Define all configurations (ports, volumes, environment variables) in a single `docker-compose.yml` file.
- Start, stop, or restart your setup with a single command.
- Reuse the same configuration across different machines or environments.

This makes your setup more organized, portable, and easier to maintain.

:::info
This guide uses `docker compose` (Compose V2 — the current standard, bundled with Docker Desktop and recent Docker Engine installations). If you're on an older system with only the standalone `docker-compose` binary, use `docker-compose` instead of `docker compose` with the same arguments.
:::

To install AMS using Docker Compose, follow the steps below.

## 1. Download Docker File and Docker Compose File

```bash
wget https://raw.githubusercontent.com/ant-media/Scripts/master/docker/docker-compose.yml
wget https://raw.githubusercontent.com/ant-media/Scripts/master/docker/Dockerfile_Process -O Dockerfile
```

:::info
The downloaded `docker-compose.yml` includes a `version: "3.9"` line at the top. It's a leftover from Compose V1 — Compose V2 (used throughout this guide) ignores it and just prints a harmless warning that it's obsolete. You can safely delete that line, or ignore the warning.
:::

## 2. Build Docker Image

There are two ways to build the image — use whichever one fits how you're licensing AMS. Don't combine them.

### Option A: Build Using a License Key (Enterprise Only)

:::info
By default, this fetches the current latest version image. Only use this option for the Enterprise Edition — Community Edition builds need the zip file instead (Option B).
:::

```bash
docker compose build --build-arg LicenseKey=<YOUR_LICENSE_KEY>
```

### Option B: Build Using a Zip File

Download and save the Ant Media Server ZIP file in the same directory as the Dockerfile and Docker Compose file. Then run the docker compose build command from the command line.

#### Enterprise Edition:

You can get the AMS Enterprise Edition Zip file from the downloads section of your [antmedia.io account](https://antmedia.io/my-account/downloads/) after purchasing the license.

For example, if the zip file name is `ant-media-server-enterprise-2.14.0-20250513_1544.zip`

```bash
docker compose build --build-arg AntMediaServer=ant-media-server-enterprise-2.14.0-20250513_1544.zip
```

#### Community Edition:

You can get the AMS Community Edition Zip file from the Ant Media Server [GitHub release page](https://github.com/ant-media/Ant-Media-Server/releases).

For example, if the zip file name is `ant-media-server-community-2.14.0.zip`

```bash
docker compose build --build-arg AntMediaServer=ant-media-server-community-2.14.0.zip
```

## 3. Run Docker Container

Now we have a Docker image with AMS. Run the container with the below command:

```bash
docker compose up -d
```

:::info
By default, this uses the host's network ports. On macOS, however, `--network=host` (set as `network_mode: host` in the compose file) doesn't work, so you'll need to define the ports explicitly instead, as shown below.
:::

```yaml
services:
  antmedia:
    build: 
      context: ./
      dockerfile: ./Dockerfile
    container_name: antmedia
    restart: unless-stopped
    entrypoint: /usr/local/antmedia/start.sh
    ports:
      - "5080:5080"
      - "1935:1935"
```

## 4. Volume

**Optional:** to use a persistent volume — so your data survives even if the container is destroyed — add the following to your `docker-compose.yml`. This is independent of whichever networking option you used in step 3 above.

Under the `antmedia` service, at the same indentation level as `container_name` and `restart`, add:

```yaml
    volumes:
      - antmedia_vol:/usr/local/antmedia/
```

Then, as a new top-level section at the end of the file (same indentation level as `services`), add:

```yaml
volumes:
  antmedia_vol:
    external: true
    name: antmedia_volume
```

:::info
YAML is indentation-sensitive — keep the spacing above exactly as shown, or the file won't parse.
:::

After making the changes, run the same `docker compose up -d` command to apply them.

## Verify Ant Media Server Is Running

Before opening the dashboard, confirm the container started and AMS is responding:

```bash
docker compose logs --tail 50
```

You should see log lines indicating the server has started, with no repeated errors or restart loops. You can also confirm the web panel itself is answering requests:

```bash
curl -I http://localhost:5080
```

Any HTTP response (not "connection refused" or a timeout) means AMS is up and listening.

## AMS Dashboard

After the container starts, go to `http://localhost:5080` or `http://host-IP:5080` to access the AMS dashboard.

:::info Can't reach localhost:5080?
If you're using `network_mode: host`, this only resolves as expected on Linux — it's **not** supported on Docker Desktop for Mac or Windows. There, use the port-mapped `docker-compose.yml` from step 3 instead, and connect to `http://localhost:5080`. If Docker is running on a remote Linux host, use that host's IP instead of `localhost`.
:::

The first time you access it, you'll be asked to create an admin account:

![](@site/static/img/ams-management-panel-create-account.png)

Check out [WebRTC Publishing](/guides/publish-live-stream/webrtc/) to publish a stream for testing.

## Need Help?

If AMS isn't starting, or the container won't build, reach out on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or contact [Technical Support](mailto:support@antmedia.io).

<br /><br />
---

<div align="center">
<h2>Docker Compose Setup Complete</h2>
</div>

You've set up AMS using **Docker Compose**. Compared to a single-container Docker setup, this keeps your configuration organized, makes port/volume management easier, and lets you start or stop the entire stack with a single command. From here, [publish a stream](/guides/publish-live-stream/webrtc/) to see it in action.
