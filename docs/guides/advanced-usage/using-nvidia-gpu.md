---
title: Using Nvidia GPUs 
description: To enhance encoding performance with GPU Encoder or GPU intence encoding, you may leverage Nvidia Graphics Cards. It is also helpful with Video Encode and Decode GPU Support Matrix.
keywords: [Using Nvidia GPUs, Nvidia GPUs for Encoding, Enhance Encoding Performance with GPU Encoder, Ant Media Server Documentation, Ant Media Server Tutorials]
---

# Using Nvidia GPUs

Ant Media Server can take advantage of a hardware-based encoder found in NVIDIA GPUs. If you have an NVIDIA GPU, you can see if it has a hardware-based encoder in the [Video Encode and Decode GPU Support Matrix](https://developer.nvidia.com/video-encode-decode-gpu-support-matrix).

**Why use NVIDIA GPU encoder**
------------------------------

The short answer is performance. In some cases, encoding performance increases 5x compared to ```x264``` or ```openh264``` CPU optimized encoders. If there is no GPU in the system, Ant Media Server utilizes the ```openh264``` encoder by default starting with version 2.5.1. Previously, AMS used the ```x264``` encoder as the default.

![](@site/static/img/gpu.png)

Install the CUDA toolkit
------------------------

After you are sure that your GPU contains a hardware based encoder, the only thing left is installing CUDA toolkit to your system.

Installation on Ubuntu 18.04, 20.04 and 22.04
---------------------------------------------
With CUDA version 11.8, AMS automatically uses the GPU, therefore we'll install it. To install, browse to [this link](https://developer.nvidia.com/cuda-11-8-0-download-archive) and choose settings based on your architecture and operating system, then use those commands to install it. Check the screenshot below.

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

## Check the usage of GPU

After installation of CUDA toolkit, you can run the command below to see the status of your GPU.

    nvidia-smi

You can install Ant Media Server using the usual method, or if you have already installed it, you can restart the Ant Media Server.

    sudo service antmedia restart
 
You will see output as below if the GPU is in use.

![](@site/static/img/adavanced-usage/using-nvidia-gpu/gpu-use.png)

Using NVIDIA hardware based encoder
-----------------------------------

If you use CUDA 11.8, Ant Media Server will check and log if there is a hardware-based GPU encoder in the system at launch, and it will use it automatically. Nothing needs to be done.

However, if you are using CUDA 12 or later, you must add the following property to the ```red5-web.properties``` file in the ```/usr/loca/antmedia/webapps/LiveApp/WEB-INF``` folder in order to use GPU with Ant Media Server.

    settings.encoding.encoderName=h264_nvenc

Restart the server after making the changes.

If you need more information for installing on other systems, please check [NVIDIA](https://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html) docs and [CUDA downloads](https://developer.nvidia.com/cuda-downloads?target_os=Linux&target_arch=x86_64&target_distro=Ubuntu&target_version=1604&target_type=debnetwork) pages.
