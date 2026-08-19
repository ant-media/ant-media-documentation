---
title: Choose an Azure Deployment Option
description: Decide which Ant Media Server Azure path fits your team—cluster setup, ARM templates, or supporting load balancer guides.
keywords: [Azure deployment options, Ant Media Server Azure cluster, ARM template, Ant Media Server Documentation]
sidebar_position: 1
sidebar_label: Choose a Deployment Option
---

# Choose an Azure Deployment Option

Use this page to pick an Azure path before opening a how-to. Options here are **not equally preferred** for every team.

## Recommended path (opinionated)

1. **[Cluster on Azure](/guides/clustering-and-scaling/azure/setup-ams-clustering-at-azure/)** — start here to understand and deploy an AMS cluster on Azure.
2. **[Scale with ARM Template](/guides/clustering-and-scaling/azure/scale-with-azure-arm-template/)** — preferred when you want repeatable, infrastructure-as-code deployment and autoscaling.
3. **[Configure RTMP LB](/guides/clustering-and-scaling/azure/configuring-rtmp-lb-in-azure/)** — supporting guide once you already have a cluster and need RTMP load balancing.

## Option comparison

| Option | Best for | Priority |
| --- | --- | --- |
| **Cluster on Azure** | First cluster on Azure; learning the layout | Preferred starting point |
| **ARM Template** | Production automation and scale-out | Preferred for IaC / production scale |
| **RTMP LB** | RTMP ingest behind Azure load balancing | Supporting |

## Can I start with one and move to another?

Yes. Many teams start with a guided cluster setup, then standardize on the **ARM template** for the next environment. Load balancer docs apply to an existing cluster—they are not alternate “products.”

## Where to go next

- New on Azure: [Cluster on Azure](/guides/clustering-and-scaling/azure/setup-ams-clustering-at-azure/)
- Automating production: [Scale with ARM Template](/guides/clustering-and-scaling/azure/scale-with-azure-arm-template/)
- Platform-level choice (AWS vs Azure vs K8s): [Choose a Clustering and Scaling Option](/guides/clustering-and-scaling/choose-deployment-option/)
