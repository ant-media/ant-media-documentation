---
title: Choose a Docker Deployment Option
description: Decide when Docker Swarm is enough for Ant Media Server and when to prefer Kubernetes or cloud scaling templates instead.
keywords: [Docker deployment options, Docker Swarm, Ant Media Server Docker, Ant Media Server Documentation]
sidebar_position: 1
sidebar_label: Choose a Deployment Option
---

# Choose a Docker Deployment Option

Docker is a good fit for containerized AMS, but it is **not always the best long-term clustering path**. Use this page to choose wisely.

## Recommended path (opinionated)

1. **[Docker Swarm](/guides/clustering-and-scaling/docker/docker-swarm/)** — preferred when you want a simple multi-node Docker cluster without running full Kubernetes.
2. **[NVIDIA Hardware Encoder](/guides/clustering-and-scaling/docker/using-nvidia-hardware-based-encoder-on-docker/)** — supporting guide when you need GPU encoding in Docker; not a separate clustering product.

## When to prefer something else

| Situation | Prefer instead |
| --- | --- |
| You already run Kubernetes | [Choose a Kubernetes Deployment Option](/guides/clustering-and-scaling/kubernetes/choose-kubernetes-deployment/) |
| You want managed AWS autoscaling with less container ops | [Choose an AWS Deployment Option](/guides/clustering-and-scaling/aws/choose-aws-deployment/) (CloudFormation or Auto Managed) |
| You need large-scale production HA and rich ecosystem tooling | Kubernetes or cloud templates usually scale ops better than Swarm alone |

## Option comparison

| Option | Best for | Priority |
| --- | --- | --- |
| **Docker Swarm** | Small/medium Docker-centric clusters | Preferred within this section |
| **NVIDIA encoder on Docker** | GPU-accelerated encoding | Supporting |
| **Move to K8s / cloud templates** | Growth beyond Swarm comfort | Recommended upgrade path for many teams |

## Where to go next

- Stay on Docker: [Docker Swarm](/guides/clustering-and-scaling/docker/docker-swarm/)
- Outgrowing Docker: [Choose a Kubernetes Deployment Option](/guides/clustering-and-scaling/kubernetes/choose-kubernetes-deployment/)
- Platform-level choice: [Choose a Clustering and Scaling Option](/guides/clustering-and-scaling/choose-deployment-option/)
