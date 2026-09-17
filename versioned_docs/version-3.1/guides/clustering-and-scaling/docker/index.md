---
title: Docker
description: When Docker Swarm fits Ant Media Server clustering, when to prefer Kubernetes or cloud templates, and how container clustering works.
keywords: [Docker, Docker Swarm, NVIDIA GPU, Ant Media Server cluster, Ant Media Server Documentation]
sidebar_label: Overview
sidebar_position: 0
---

# Docker

Ant Media Server ships as a Docker image and can run in **standalone** or **cluster** mode inside containers. Docker fits teams that already containerize workloads or want a lightweight multi-node setup without full Kubernetes—but it is **not always the best long-term clustering path**.

For platform-level choices (AWS, Azure, GCP, Kubernetes, on-prem), see [Choose a Deployment Option](/guides/clustering-and-scaling/choose-deployment-option/). For origin/edge architecture and licensing, see [Clustering and Scaling](/guides/clustering-and-scaling/).

## Recommended path

1. **[Docker Swarm](/guides/clustering-and-scaling/docker/docker-swarm/)** — preferred when you want a simple multi-node Docker cluster without running Kubernetes.
2. **[NVIDIA Hardware Encoder](/guides/clustering-and-scaling/docker/using-nvidia-hardware-based-encoder-on-docker/)** — supporting guide when you need GPU encoding in Docker; not a separate clustering product.

| Option | Best for | Priority |
|--------|----------|----------|
| **Docker Swarm** | Small/medium Docker-centric clusters | Preferred within this section |
| **NVIDIA encoder on Docker** | GPU-accelerated encoding | Supporting |
| **Move to K8s / cloud templates** | Growth beyond Swarm comfort | Upgrade path for many teams |

## When to prefer something else

| Situation | Prefer instead |
|-----------|----------------|
| You already run Kubernetes | [Choose a Kubernetes Deployment Option](/guides/clustering-and-scaling/kubernetes/choose-kubernetes-deployment/) |
| You want managed AWS autoscaling with less container ops | [Choose an AWS Deployment Option](/guides/clustering-and-scaling/aws/choose-aws-deployment/) (CloudFormation or Auto Managed) |
| You need large-scale production HA and rich ecosystem tooling | Kubernetes or cloud templates usually scale ops better than Swarm alone |

## How Docker clustering works

1. **Shared database** — Every AMS container connects to the same MongoDB or Redis URI via `start.sh -m cluster -h <uri>`. See [Databases](/guides/clustering-and-scaling/supported-databases/).
2. **Load balancer** — Publishers and players hit a reverse proxy (Nginx in the Swarm guide) rather than individual containers. See [Load Balancing](/guides/clustering-and-scaling/load-balancing/).
3. **Orchestration** — Swarm schedules AMS services across worker nodes; for larger scale, prefer [Kubernetes](/guides/clustering-and-scaling/kubernetes/prepare-environment-to-deploy-ams-at-kubernetes/).

## Before you start

- **Enterprise Edition** for cluster mode
- Docker CE installed on every host
- A reachable MongoDB or Redis instance
- Cluster license on each node (or a deployment model that supports auto-scaling licenses)

## Guides in this section

| Guide | Description |
|-------|-------------|
| [Docker Swarm](/guides/clustering-and-scaling/docker/docker-swarm/) | Multi-node cluster with Swarm services and an Nginx front end |
| [NVIDIA Hardware Encoder](/guides/clustering-and-scaling/docker/using-nvidia-hardware-based-encoder-on-docker/) | GPU-accelerated transcoding inside Docker |

Start with Swarm if Docker is the right fit. When you outgrow it, move to Kubernetes or a cloud template from [Choose a Deployment Option](/guides/clustering-and-scaling/choose-deployment-option/).
