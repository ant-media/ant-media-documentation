---
title: Enable NVIDIA Hardware-based Encoder
description: Run Ant Media Server in Docker with NVIDIA GPU hardware encoding.
keywords: [NVIDIA GPU, Docker, hardware encoder, Ant Media Server Documentation]
sidebar_position: 3
sidebar_label: NVIDIA Hardware Encoder
---

# NVIDIA Hardware Encoder on Docker

Run Ant Media Server in Docker with **NVIDIA GPU** hardware encoding for lower CPU use and higher transcoding throughput. This guide covers the NVIDIA Container Toolkit and two ways to run AMS with GPU support.

See [Using NVIDIA GPU](/guides/advanced-usage/using-nvidia-gpu/) for driver installation on the host.

## What you'll accomplish

- Install Docker CE and the NVIDIA Container Toolkit
- Run a GPU-enabled container with AMS
- Confirm the GPU is visible inside the container

## Prerequisites

- Ubuntu 20.04 or 22.04 instance with an NVIDIA GPU
- [CUDA drivers installed](/guides/advanced-usage/using-nvidia-gpu/) on the host
- Ant Media Server Enterprise Edition (zip or Docker image)

## Step 1: Install Docker CE

```bash
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y
```

## Step 2: Install NVIDIA Container Toolkit

Add the NVIDIA Container Toolkit repository:

```bash
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg && curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list
```

Install and configure the runtime:

```bash
sudo apt-get update
sudo apt-get install -y nvidia-container-toolkit
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker
```

## Step 3: Run AMS with GPU access

### Option A: Base CUDA container, then install AMS

Start a GPU-enabled container:

```bash
docker run -d --name nvidia --runtime=nvidia --privileged --network host -e NVIDIA_VISIBLE_DEVICES=all -e NVIDIA_DRIVER_CAPABILITIES=compute,utility,video -it nvidia/cuda:11.8.0-runtime-ubuntu22.04
```

Install Ant Media Server Enterprise inside the container. AMS detects the GPU and uses hardware encoding automatically.

### Option B: Build a custom AMS image

1. Download the [Ant Media Server Dockerfile](https://github.com/ant-media/Scripts/blob/master/docker/Dockerfile_Process).
2. Change `FROM ubuntu:22.04` to `FROM nvidia/cuda:12.6.0-runtime-ubuntu22.04`.
3. Place the Enterprise Edition zip alongside the Dockerfile and build:

```bash
docker build --network=host -t antmediaserver --build-arg AntMediaServer=ant-media-server-enterprise.zip .
```

4. Run the image:

```bash
docker run -d --name nvidia --runtime=nvidia --privileged --network host -e NVIDIA_VISIBLE_DEVICES=all -e NVIDIA_DRIVER_CAPABILITIES=compute,utility,video -it antmediaserver
```

## Verify

Inside the container (or on the host if using `--network host`), run:

```bash
nvidia-smi
```

You should see GPU utilization when AMS transcodes streams. Publish a test stream and confirm encoding uses the hardware encoder in the AMS logs or dashboard.

## Related guides

| Topic | Guide |
|-------|-------|
| Docker overview | [Docker](/guides/clustering-and-scaling/docker/) |
| GPU on bare metal | [Using NVIDIA GPU](/guides/advanced-usage/using-nvidia-gpu/) |
| Docker Swarm cluster | [Docker Swarm](/guides/clustering-and-scaling/docker/docker-swarm/) |
