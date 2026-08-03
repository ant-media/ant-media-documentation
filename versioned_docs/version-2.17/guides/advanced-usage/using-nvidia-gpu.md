---
title: Using NVIDIA GPU
description: Enable NVIDIA NVENC/NVDEC hardware encoding in Ant Media Server with CUDA 12.6 for faster transcoding and adaptive bitrate streaming.
keywords: [Using Nvidia GPUs, Nvidia GPUs for Encoding, Enhance Encoding Performance with GPU Encoder, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 7
---

# Using NVIDIA GPU

Ant Media Server can offload video encoding and decoding to **NVIDIA GPUs** through dedicated hardware blocks called **NVENC** (encode) and **NVDEC** (decode). Instead of burning CPU cycles on software encoders, the GPU handles transcoding—especially useful when you run **adaptive bitrate (ABR)** profiles or high-resolution streams at scale.

With **CUDA 12.6** installed, Ant Media Server detects a supported GPU at startup and uses it automatically—no extra application settings are required.

Not every NVIDIA card includes a hardware encoder. Check your model in the [Video Encode and Decode GPU Support Matrix](https://developer.nvidia.com/video-encode-decode-gpu-support-matrix) before you install drivers.

## What you'll accomplish

By the end of this guide, you will:

1. Understand when GPU encoding is worth the setup.
2. Install **CUDA 12.6** on Ubuntu (20.04, 22.04, or 24.04).
3. Verify the GPU with `nvidia-smi` and confirm Ant Media Server is using it during transcoding.

## Why use the NVIDIA GPU encoder?

Think of CPU encoding as a general-purpose worker and NVENC as a specialist built for one job: turning video frames into compressed streams, fast.

| Scenario | CPU-only server | GPU-enabled server |
|----------|-----------------|-------------------|
| Single stream, four ABR renditions (1080p → 360p) | A 4-core CPU box often struggles with one stream | A 4-core GPU box can handle **5–6** similar streams |
| Multiple ABRs or 1080p+ transcoding | Software encoders (`openh264`, `x264`) lag under load | GPU encoding can be up to **5× faster** in demanding workloads |

Without a GPU, Ant Media Server uses **openh264** for software H.264 encoding (default since v2.5.1; **x264** before that). That works for light workloads, but once you stack ABR profiles or publish many streams, the CPU becomes the bottleneck long before your network does.

A GPU-optimized instance pays off when you:

- Transcode streams into **multiple bitrates** for ABR playback.
- Run **several concurrent publishers** on one origin node.
- Need headroom for **1080p or higher** without dropping frames.

![](@site/static/img/gpu.png)

:::info
For GPU encoding in Docker, see [Using NVIDIA Hardware-based Encoder on Docker](/guides/clustering-and-scaling/docker/using-nvidia-hardware-based-encoder-on-docker/).
:::

## Prerequisites

Before you begin, confirm the following:

- An NVIDIA GPU with **NVENC** support (see the [support matrix](https://developer.nvidia.com/video-encode-decode-gpu-support-matrix)).
- **Ubuntu 20.04, 22.04, or 24.04** on x86_64 (Ant Media Server officially supports Ubuntu 22.04 on v2.6 and later).
- Root or `sudo` access to install CUDA packages and reboot the host.

## Step 1: Install CUDA 12.6

Ant Media Server uses **CUDA 12.6**. Install the runtime packages below instead of the full `cuda` metapackage to save disk space and installation time.

You can also use NVIDIA’s interactive installer at the [CUDA 12.6 download archive](https://developer.nvidia.com/cuda-12-6-0-download-archive)—select your OS and architecture, then compare the commands it generates with the blocks for your Ubuntu version.

![](@site/static/img/adavanced-usage/using-nvidia-gpu/cuda-11.8.png)

### Ubuntu version differences

| Ubuntu version | CUDA packages to install | Notes |
|----------------|--------------------------|-------|
| **20.04** | `cuda-runtime-12-6` | Minimal runtime install |
| **22.04** | `cuda-runtime-12-6` | Recommended for Ant Media Server v2.6+ |
| **24.04** | `cuda-toolkit-12-6` + `cuda-drivers` | Requires the toolkit and driver packages (not `cuda-runtime-12-6` alone) |

### Ubuntu 20.04

```bash
sudo wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2004/x86_64/cuda-keyring_1.1-1_all.deb
sudo dpkg -i cuda-keyring_1.1-1_all.deb
sudo apt-get update
sudo apt-get install -y cuda-runtime-12-6
sudo reboot
```

### Ubuntu 22.04

```bash
sudo wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-keyring_1.1-1_all.deb
sudo dpkg -i cuda-keyring_1.1-1_all.deb
sudo apt-get update
sudo apt-get install -y cuda-runtime-12-6
sudo reboot
```

### Ubuntu 24.04

```bash
sudo wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2404/x86_64/cuda-keyring_1.1-1_all.deb
sudo dpkg -i cuda-keyring_1.1-1_all.deb
sudo apt-get update
sudo apt-get install -y cuda-toolkit-12-6 cuda-drivers
sudo reboot
```

## Step 2: Install GRID drivers for Azure A10 (optional)

If you run an Azure **NV4as_v4** or **NV6ads** instance with an **NVIDIA A10** GPU, install the **NVIDIA GRID** driver so the GPU is exposed correctly to the guest OS.

```bash
sudo wget https://storage.googleapis.com/nvidia-drivers-us-public/GRID/vGPU15.2/NVIDIA-Linux-x86_64-525.105.17-grid.run
sudo chmod +x NVIDIA-Linux-x86_64-525.105.17-grid.run
sudo ./NVIDIA-Linux-x86_64-525.105.17-grid.run
sudo reboot
```

## Step 3: Verify the GPU

After reboot, confirm the driver and GPU are available:

```bash
nvidia-smi
```

You should see your GPU model, driver version, and memory usage. If the command is not found, recheck the CUDA installation for your Ubuntu version.

Install Ant Media Server using the [Linux installation guide](/guides/installing-on-linux/installing-ams-on-linux/), or restart an existing installation:

```bash
sudo service antmedia restart
```

## Step 4: Confirm Ant Media Server is using the GPU

When **CUDA 12.6** is present, Ant Media Server checks for a hardware encoder at startup and selects it automatically—no dashboard toggle is required.

Start or republish a stream that triggers transcoding (for example, **ABR** with multiple renditions). Then run `nvidia-smi` again while the stream is active. You should see GPU utilization similar to the example below.

![](@site/static/img/adavanced-usage/using-nvidia-gpu/gpu-use.png)

## CUDA compatibility packages

If another CUDA version is already installed and Ant Media Server does not detect the GPU, add the **12.6** compatibility packages:

```bash
sudo apt-get install -y cuda-cudart-12-6 cuda-compat-12-6
sudo reboot
```

## Other operating systems

For non-Ubuntu Linux or other architectures, follow NVIDIA’s official guides:

- [CUDA Installation Guide for Linux](https://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html)
- [CUDA Downloads](https://developer.nvidia.com/cuda-downloads)

## Related guides

- [Adaptive Bitrate Streaming](/guides/adaptive-bitrate/adaptive-bitrate-streaming/) — when GPU acceleration matters most.
- [H.264 Codec](/guides/configuration-and-testing/video-codec/h264/) — uses **h264_nvenc** on supported NVIDIA GPUs.
- [Using NVIDIA Hardware-based Encoder on Docker](/guides/clustering-and-scaling/docker/using-nvidia-hardware-based-encoder-on-docker/) — GPU encoding in container deployments.

## Troubleshooting

| Symptom | What to check |
|---------|----------------|
| `nvidia-smi: command not found` | CUDA packages installed for your **Ubuntu version**; host rebooted after install. On **24.04**, confirm both `cuda-toolkit-12-6` and `cuda-drivers` are installed—not `cuda-runtime-12-6` alone. |
| `nvidia-smi` works but GPU stays at 0% during streaming | Transcoding must be active—enable **ABR** or another profile that re-encodes. **SFU** mode forwards streams without GPU transcoding. Restart AMS after CUDA install: `sudo service antmedia restart`. |
| Ant Media Server still uses CPU encoding | **CUDA 12.6** is required; install [compatibility packages](#cuda-compatibility-packages) if another CUDA version is present. Check AMS logs for GPU encoder detection at startup. |
| GPU not listed in `nvidia-smi` on Azure | **NVIDIA A10** instances (`NV4as_v4`, `NV6ads`) may need [GRID drivers](#step-2-install-grid-drivers-for-azure-a10-optional). |
| Encoder errors or missing NVENC | GPU model supports hardware encode in the [NVIDIA support matrix](https://developer.nvidia.com/video-encode-decode-gpu-support-matrix). Consumer and datacenter cards differ—confirm **NVENC** is listed for your SKU. |
| `apt-get install` fails for CUDA packages | Correct **keyring `.deb`** for your Ubuntu release (`ubuntu2004`, `ubuntu2204`, or `ubuntu2404`); run `sudo apt-get update` after adding the repo. |
| Docker container cannot access GPU | Host CUDA is not enough—follow [Using NVIDIA Hardware-based Encoder on Docker](/guides/clustering-and-scaling/docker/using-nvidia-hardware-based-encoder-on-docker/) to install **nvidia-container-toolkit** and pass the GPU into the container. |
