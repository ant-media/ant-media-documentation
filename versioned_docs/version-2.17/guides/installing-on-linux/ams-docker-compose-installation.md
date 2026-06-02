---
title: Install with Docker Compose
description: AMS Docker Compose Installation
keywords: [Docker, Docker Compose, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 7
---

Docker Compose offers a simpler way to manage Ant Media Server compared to running a single container with `docker run`. With Compose, you can:

- Define all configurations (ports, volumes, environment variables) in a single `docker-compose.yml` file.  
- Start, stop, or restart your setup with a single command.  
- Reuse the same configuration across different machines or environments.  

This makes your setup more organized, portable, and easier to maintain.


To install the Ant Media Server standalone server using Docker Compose, follow the below step-by-step process.

## 1. Download Docker File and Docker Compose File

```bash
wget https://raw.githubusercontent.com/ant-media/Scripts/master/docker/docker-compose.yml
wget https://raw.githubusercontent.com/ant-media/Scripts/master/docker/Dockerfile_Process -O Dockerfile
```

## 2. Build Docker Image

Download and save the Ant Media Server ZIP file in the same directory as the Dockerfile and Docker Compose file. Then run the docker compose build command from the command line.

The AMS image will be created with name `antmedia-antmedia`.

#### Enterprise Edition:

You can get the AMS Enterprise Edition Zip file from your [Ant Media account](https://antmedia.io) after purchasing the license.

For example, if the zip file name is `ant-media-server-enterprise-2.14.0-20250513_1544.zip`

```bash
docker-compose build --build-arg AntMediaServer=ant-media-server-enterprise-2.14.0-20250513_1544.zip
```

#### Community Edition:

You can get the AMS Community Edition Zip file from the Ant Media Server [GitHub release page](https://github.com/ant-media/Ant-Media-Server/releases).

For example, if the zip file name is `ant-media-server-community-2.14.0.zip`

```bash
docker-compose build --build-arg AntMediaServer=ant-media-server-community-2.14.0.zip
```
    
## 3. Run Docker Container

Now we have a Docker image with Ant Media Server. Run the Docker container with the below command:

```bash
docker-compose up -d
```

:::info
By default, it uses the host network ports to reach but for example, in MacOS, the⁣ `network=host` does not work so you can define the ports in the YML file.
:::

```yml
version: "3.9"
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

**Optional:** If you would like to mount an existing volume, simply uncomment the below lines in the original yml file.

:::info
Please make sure that the indentation/alignment of the YML file content is correct; otherwise, it will cause issues
:::

```bash
    network_mode: host
    volumes:
       - antmedia_vol:/usr/local/antmedia/
 volumes:
   antmedia_vol:
     external: true
     name:
       antmedia_volume
```

After making the changes, run the same docker compose up command to run the container.

## AMS Dashboard

After the Docker container starts, reach out to `http://localhost:5080` or `http://host-IP:5080` to access the Ant Media Server dashboard.

![](@site/static/img/docker-installation.webp)

Check out [here](https://antmedia.io/docs/guides/publish-live-stream/webrtc/) to publish a WebRTC stream for testing.

<br /><br />
---

<div align="center">
<h2> Compose‑Done ✅ </h2>
</div>

You’ve now set up Ant Media Server using **Docker Compose**. Compared to a single-container Docker setup, this method keeps your configuration organized, makes port/volume management easier, and lets you start or stop the entire stack with a single command. 🚀

