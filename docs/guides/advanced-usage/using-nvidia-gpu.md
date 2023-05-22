---
title: Using Nvidia GPUs 
description: To enhance encoding performance with GPU Encoder or GPU intence encoding, you may leverage Nvidia Graphics Cards. It is also helpful with Video Encode and Decode GPU Support Matrix.
keywords: [Using Nvidia GPUs, Nvidia GPUs for Encoding, Enhance Encoding Performance with GPU Encoder, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 7
---

# Using Nvidia GPUs

Ant Media Server can take advantage of a hardware-based encoder found in NVIDIA GPUs. If you have an NVIDIA GPU, you can see if it has a hardware-based encoder in the [Video Encode and Decode GPU Support Matrix](https://developer.nvidia.com/video-encode-decode-gpu-support-matrix).

**Why use NVIDIA GPU encoder**
------------------------------

The primary reason is performance. In certain scenarios, encoding performance can improve up to 5 times when compared to CPU optimized encoders such as ```x264``` or ```openh264```. In the absence of a GPU on the system, Ant Media Server by default use the ```openh264``` encoder from version 2.5.1 onwards. Prior to that, the x264 encoder was the default choice for AMS.

The utilization of a GPU is advised for demanding transcoding tasks. If you want to publish numerous streams featuring multiple ABRs, using a GPU-optimized server rather than a CPU-optimized one would be a good decision. For instance, a single 4-core CPU-optimized server would struggle to manage a single stream with four ABRs (1080, 720, 480, and 360), and this approach is not recommended. However, a single 4-core GPU-optimized server can effortlessly handle 5-6 streams that have the same ABRs enabled.

![](@site/static/img/gpu.png)

Install the CUDA toolkit
------------------------

Once you have confirmed the existence of a hardware-based encoder in your GPU, the only remaining step is to install the CUDA toolkit onto your system.

Installation on Ubuntu 18.04, 20.04 and 22.04
---------------------------------------------
Ant Media Server now automatically utilizes the GPU with CUDA version 11.8, which is why it is necessary to install it. To install, follow [the link](https://developer.nvidia.com/cuda-11-8-0-download-archive) provided and select the settings according to your operating system and architecture. You can then use the commands provided to complete the installation. Refer to the screenshot below for further guidance.

![](@site/static/img/adavanced-usage/using-nvidia-gpu/cuda-11.8.png)

#### Ubuntu 18.04
```
sudo wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64/cuda-ubuntu1804.pin
sudo mv cuda-ubuntu1804.pin /etc/apt/preferences.d/cuda-repository-pin-600
sudo wget https://developer.download.nvidia.com/compute/cuda/11.8.0/local_installers/cuda-repo-ubuntu1804-11-8-local_11.8.0-520.61.05-1_amd64.deb
sudo dpkg -i cuda-repo-ubuntu1804-11-8-local_11.8.0-520.61.05-1_amd64.deb
sudo cp /var/cuda-repo-ubuntu1804-11-8-local/cuda-*-keyring.gpg /usr/share/keyrings/
sudo apt-get update
sudo apt-get -y install cuda
```

#### Ubuntu 20.04
```
sudo wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2004/x86_64/cuda-ubuntu2004.pin
sudo mv cuda-ubuntu2004.pin /etc/apt/preferences.d/cuda-repository-pin-600
sudo wget https://developer.download.nvidia.com/compute/cuda/11.8.0/local_installers/cuda-repo-ubuntu2004-11-8-local_11.8.0-520.61.05-1_amd64.deb
sudo dpkg -i cuda-repo-ubuntu2004-11-8-local_11.8.0-520.61.05-1_amd64.deb
sudo cp /var/cuda-repo-ubuntu2004-11-8-local/cuda-*-keyring.gpg /usr/share/keyrings/
sudo apt-get update
sudo apt-get -y install cuda
```

#### Ubuntu 22.04
Ant Media Server officially supports Ubuntu 22.04 on versions 2.6 and higher.

```
sudo wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-ubuntu2204.pin
sudo mv cuda-ubuntu2204.pin /etc/apt/preferences.d/cuda-repository-pin-600
sudo wget https://developer.download.nvidia.com/compute/cuda/11.8.0/local_installers/cuda-repo-ubuntu2204-11-8-local_11.8.0-520.61.05-1_amd64.deb
sudo dpkg -i cuda-repo-ubuntu2204-11-8-local_11.8.0-520.61.05-1_amd64.deb
sudo cp /var/cuda-repo-ubuntu2204-11-8-local/cuda-*-keyring.gpg /usr/share/keyrings/
sudo apt-get update
sudo apt-get -y install cuda
```

### NVIDIA A10 Tensor Core GPU
If you are using a GPU instance of the NV4as_v4/NV6ads family from Azure Marketplace, which features the NVIDIA A10 Tensor Core GPU, you may need to install the NVIDIA GRID drivers to ensure proper GPU functionality.

```
sudo wget https://storage.googleapis.com/nvidia-drivers-us-public/GRID/vGPU15.2/NVIDIA-Linux-x86_64-525.105.17-grid.run
sudo chmod +x NVIDIA-Linux-x86_64-525.105.17-grid.run
sudo ./NVIDIA-Linux-x86_64-525.105.17-grid.run
sudo reboot
```

## Check the usage of GPU

After installation of CUDA toolkit, you can run the command below to see the status of your GPU.

    nvidia-smi

You can install Ant Media Server using the usual method, or if you have already installed it, you can restart the Ant Media Server.

    sudo service antmedia restart
 
You will see output as below if the GPU is in use.

![](@site/static/img/adavanced-usage/using-nvidia-gpu/gpu-use.png)

Using NVIDIA hardware based encoder
-----------------------------------
When using CUDA 11.8, Ant Media Server will verify and record the presence of a hardware-based GPU encoder during startup, and will use it automatically without requiring any additional action.

However, if you are using CUDA 12 or later, you must add the following property to the ```red5-web.properties``` file in the ```/usr/loca/antmedia/webapps/LiveApp/WEB-INF``` folder in order to use GPU with Ant Media Server.

When using CUDA 11.8, Ant Media Server will verify and record the presence of a hardware-based GPU encoder during startup, and will use it automatically without requiring any additional action.

However, if you are using CUDA 12 or later, you must add the following property to the ```red5-web.properties``` file in the ```/usr/loca/antmedia/webapps/LiveApp/WEB-INF``` folder in order to use GPU with Ant Media Server.

    settings.encoding.encoderName=h264_nvenc

Restart the server after making the changes.

If you need more information for installing on other systems, please check [NVIDIA](https://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html) docs and [CUDA downloads](https://developer.nvidia.com/cuda-downloads?target_os=Linux&target_arch=x86_64&target_distro=Ubuntu&target_version=1604&target_type=debnetwork) pages.
