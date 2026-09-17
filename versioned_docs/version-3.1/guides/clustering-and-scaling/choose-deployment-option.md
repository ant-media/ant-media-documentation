---
title: Choose a Clustering and Scaling Option
description: Decide whether you need an Ant Media Server cluster and which deployment path fits your cloud, Kubernetes, or on-premises environment.
keywords: [choose clustering option, scale Ant Media Server, when to cluster, Ant Media Server Documentation]
sidebar_position: 1
sidebar_label: Choose a Deployment Option
---

# Choose a Clustering and Scaling Option

Ant Media Server supports many deployment styles. They are **not** equally recommended for every team. Use this page to decide **whether to cluster**, then pick a **path that matches your platform**—before diving into a specific how-to.

For architecture, components, and how origin/edge clustering works, see [Clustering and Scaling](/guides/clustering-and-scaling/).

## When to cluster (vs a single server)

| You should stay on a **single server** when… | You should **cluster** when… |
| --- | --- |
| Concurrent publishers or viewers fit comfortably on one AMS | Concurrent publishers or viewers are too large for a single AMS |
| You are prototyping or load is small | You need high availability across nodes |
| Ops simplicity matters more than HA | You need independent scale for ingest (origin) and playback (edge) |
| Cost must stay minimal | You are planning growth beyond one machine |

Clustering keeps the same publish/play protocols. Clients talk to a **load balancer**; origin nodes ingest, edge nodes play.

You can **start single and move to a cluster later** when metrics (CPU, bandwidth, stream count) show you need it. Use the [cost calculator](https://antmedia.io/cost-calculator/) to estimate.

## Recommendations

| If you are on… | Prefer this first | Alternatives |
| --- | --- | --- |
| **AWS** | [CloudFormation](/guides/clustering-and-scaling/aws/aws-cloudformation/scale-with-aws-cloudformation/) or [Auto Managed](/guides/clustering-and-scaling/aws/aws-auto-managed/auto-managed-service-on-aws/) if you want managed ops | ECS if you already run containers; manual AWS only for custom setups — see [Choose an AWS Deployment Option](/guides/clustering-and-scaling/aws/choose-aws-deployment/) |
| **Azure** | [Cluster on Azure](/guides/clustering-and-scaling/azure/setup-ams-clustering-at-azure/) or [ARM Template](/guides/clustering-and-scaling/azure/scale-with-azure-arm-template/) | See [Choose an Azure Deployment Option](/guides/clustering-and-scaling/azure/choose-azure-deployment/) |
| **GCP** | [Cluster on GCP](/guides/clustering-and-scaling/gcp/gcp-cluster-deployment/) | Jinja automation and other paths — see [Choose a GCP Deployment Option](/guides/clustering-and-scaling/gcp/choose-gcp-deployment/) |
| **Already on Kubernetes** | [Helm](/guides/clustering-and-scaling/kubernetes/deploy-ams-with-helm/) or managed K8s (EKS/AKS/GKE) | Manual manifests — see [Choose a Kubernetes Deployment Option](/guides/clustering-and-scaling/kubernetes/choose-kubernetes-deployment/) |
| **Docker-centric** | [Docker Swarm](/guides/clustering-and-scaling/docker/docker-swarm/) | Prefer K8s/cloud templates as you grow — see [Docker](/guides/clustering-and-scaling/docker/) |
| **On-prem / custom bare metal** | [Self-Managed Cluster](/guides/clustering-and-scaling/manual-configuration/cluster-installation/) + [Load Balancing](/guides/clustering-and-scaling/load-balancing/nginx-load-balancer/) | Same building blocks as cloud, without marketplace templates |

**Lower priority / supporting docs** (still valid, but not the first place for most customers):

- Niche edge cases (for example AWS Wavelength)
- Hand-built cloud clusters when a template or managed option exists
- Database and load-balancer pages — these are **components** of a cluster, not competing “products”

## How sections in this chapter relate

| Section | Role |
| --- | --- |
| **[Overview](/guides/clustering-and-scaling/)** | What a cluster is, components, licensing, and how origin/edge works |
| **Self-Managed Cluster** | DIY install of nodes, database, cluster mode, and load balancer |
| **Load Balancing** | Nginx/HAProxy entry points for any cluster |
| **Databases** | MongoDB/Redis/DocumentDB/CosmosDB backends for cluster state |
| **Docker / Kubernetes** | Container orchestration paths |
| **AWS / Azure / GCP** | Cloud-specific preferred installers and managed options |
