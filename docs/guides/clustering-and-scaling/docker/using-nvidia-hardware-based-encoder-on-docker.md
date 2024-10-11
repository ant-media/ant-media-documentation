---
title: Enable NVIDIA Hardware-based Encoder 
description: You may use NVIDIA hardware-based encoder on Docker with Ant Media Server.
keywords: [Using NVIDIA Hardware-based Encoder on Docker, NVIDIA GPU on Docker, Hardware-based Encoder on Docker, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 8
---

# Using NVIDIA Hardware-based Encoder on Docker

You can use NVIDIA hardware-based encoder on Docker with Ant Media Server.

### Requirements

On host(20.04 and 22.04)

*   [Install CUDA Drivers](/guides/advanced-usage/using-nvidia-gpu/)
*   Install docker-ce according to the link - [https://docs.docker.com/install/](https://docs.docker.com/install/)
```
    # Add Docker's official GPG key:
    sudo apt-get update
    sudo apt-get install ca-certificates curl
    sudo install -m 0755 -d /etc/apt/keyrings
    sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
    sudo chmod a+r /etc/apt/keyrings/docker.asc
    
    # Add the repository to Apt sources:
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
      $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt-get update
    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y
```
**1**. Add Repos for nvidia-container-toolkit
```
    curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg \
      && curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | \
        sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
        sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list
```
**2.** Install nvidia-container-toolkit for Ubuntu 20.04 and 22.04
```
    sudo apt-get update
    sudo apt-get install -y nvidia-container-toolkit
    sudo nvidia-ctk runtime configure --runtime=docker
    sudo systemctl restart docker
```
**3.** Start a docker container with following command

*   Ubuntu 20.04 and Ubuntu 22.04
```
    docker run -d --name nvidia --runtime=nvidia --privileged --network host -e NVIDIA_VISIBLE_DEVICES=all -e NVIDIA_DRIVER_CAPABILITIES=compute,utility,video -it nvidia/cuda:11.8.0-runtime-ubuntu22.04
```
4\. In this docker container, you can install Ant-Media-Server Enterprise edition. It automatically uses hardware encoder. Alternatively, you can use [Ant Media Server Docker file](https://github.com/ant-media/Scripts/blob/master/docker/Dockerfile_Process) and just change the line **FROM ubuntu:22.04** to \`**FROM nvidia/cuda:11.8.0-runtime-ubuntu22.04**'. After that build the image and run the container with below command.

```
    docker run -d --name antmedia --runtime=nvidia --privileged --network host -e NVIDIA_VISIBLE_DEVICES=all -e NVIDIA_DRIVER_CAPABILITIES=compute,utility,video -it antmediaserver
```
