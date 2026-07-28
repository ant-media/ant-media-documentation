---
title: Install with Docker
description: AMS Docker Installation
keywords: [Docker, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

# Install AMS with Docker

Docker provides an easy and portable way to run Ant Media Server (AMS) without installing it directly on your host system. Using the official Docker images, you can quickly spin up a containerized AMS instance, test it on different environments, and manage upgrades or custom builds with minimal effort.

To use the AMS Enterprise Edition [official Docker Hub image](https://hub.docker.com/r/antmedia/enterprise/tags), execute the following command, which pulls the latest version directly from Docker Hub and runs the container.

```bash
docker run --restart=always -d --name antmedia --network=host -it antmedia/enterprise:latest
```

OR, if `--network=host` isn't available on your platform (for example, macOS — see the note under "Run Docker Container" below):

```bash
docker run --restart=always -d --name antmedia -p 5080:5080 -it antmedia/enterprise:latest
```

Once the container is running, go to the AMS dashboard and start streaming as explained below.


**For those who prefer creating their own AMS Docker image, here’s the process to follow:**


## 1. Download Dockerfile

```bash
wget https://raw.githubusercontent.com/ant-media/Scripts/master/docker/Dockerfile_Process -O Dockerfile
```

## 2. Build Docker Image

There are two ways to build the image — use whichever one fits how you're licensing AMS. Don't combine them.

### Option A: Build Using a License Key (Enterprise Only)

:::info
By default, this fetches the current latest version image. Only use this option for the Enterprise Edition — Community Edition builds need the zip file instead (Option B).
:::

```bash
docker build --network=host -t antmediaserver --build-arg LicenseKey=<YOUR_LICENSE_KEY> .
``` 

### Option B: Build Using a Zip File

Download and save the Ant Media Server ZIP file in the same directory as the Dockerfile. Then run the docker build command from the command line.

#### Enterprise Edition:

The AMS Enterprise Edition Zip file can be downloaded from the downloads section of your [antmedia.io account](https://antmedia.io/my-account/downloads/) after license purchase. 

Example: **ant-media-server-enterprise-2.14.0-20250513_1544.zip.**

```bash
docker build --network=host -t antmediaserver --build-arg AntMediaServer=ant-media-server-enterprise-2.14.0-20250513_1544.zip .
``` 

#### Community Edition:

The AMS Community Edition Zip file can be downloaded from the Ant Media Server [GitHub release page](https://github.com/ant-media/Ant-Media-Server/releases).

Example: **ant-media-server-community-2.14.0.zip**

```bash
docker build --network=host -t antmediaserver --build-arg AntMediaServer=ant-media-server-community-2.14.0.zip .
``` 
    
## 3. Run Docker Container

Now we have a Docker image with Ant Media Server. Run the Docker container with the below command:

```bash
docker run --restart=always -d --name antmedia --network=host -it antmediaserver
```

:::info
By default, Docker uses the host network ports. However, on macOS, the `--network=host` option is not supported. In such cases, you’ll need to explicitly define the ports as shown below.  
:::

```bash
docker run --restart=always -d --name antmedia -p 5080:5080 -it antmediaserver
```
In this example, only port 5080 is mapped for HTTP access. However, protocols like RTMP require additional ports (e.g., 1935), so they must be specified as well.

```bash
docker run --restart=always -d --name antmedia -p 5080:5080 -p 1935:1935 -it antmediaserver
```
You can map more ports as needed, depending on your use case.

## 4. Volume

**Optional:** If you would like to use persistent volume, you can use it as follows. In this way, volume keeps even if your container is destroyed.

```bash
docker volume create antmedia_volume
docker run -d --name antmedia --mount source=antmedia_volume,target=/usr/local/antmedia/ --network=host -it antmediaserver
```

## Verify Ant Media Server Is Running

Before opening the dashboard, confirm the container started and AMS is responding:

```bash
docker logs antmedia --tail 50
```

You should see log lines indicating the server has started, with no repeated errors or restart loops. You can also confirm the web panel itself is answering requests:

```bash
curl -I http://localhost:5080
```

Any HTTP response (not "connection refused" or a timeout) means AMS is up and listening.

## AMS Dashboard

After the Docker container starts, go to `http://localhost:5080` or `http://host-IP:5080` to access the AMS dashboard.

:::info Can't reach localhost:5080?
If you ran the container with `--network=host`, `localhost` only resolves as expected on Linux — this is **not** the case on Docker Desktop for Mac or Windows, where `--network=host` is silently unsupported. There, use the `-p 5080:5080` (port-mapped) command instead, and connect to `http://localhost:5080`. If Docker is running on a remote Linux host, use that host's IP instead of `localhost`.
:::

![](@site/static/img/docker-installation.webp)

Check out [WebRTC Publishing](/guides/publish-live-stream/webrtc/) to publish a stream for testing.

## Need Help?

If AMS isn't starting, or the container won't build, reach out on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or contact [Technical Support](mailto:support@antmedia.io).

<br /><br />
---

<div align="center">
<h2>Docker Setup Complete</h2>
</div>

You've set up **Ant Media Server using Docker** — ran the official image (or built your own), mapped the ports you need (5080, and RTMP if applicable), and confirmed AMS is running. From here, [publish a stream](/guides/publish-live-stream/webrtc/) to see it in action.

