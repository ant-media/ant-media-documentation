---
title: Choose an AWS Deployment Option
description: Decide when to cluster Ant Media Server on AWS and which deployment method fits your team, ops model, and scale needs.
keywords: [AWS deployment options, choose Ant Media cluster, CloudFormation vs Auto Managed vs ECS, Ant Media Server Documentation]
sidebar_position: 1
sidebar_label: Choose a Deployment Option
---

# Choose an AWS Deployment Option

Ant Media Server on AWS can run as a **single instance** or as a **cluster**. This page helps you decide **whether you need a cluster**, and **which AWS path** to use. The guides under this section are technical how-tos; start here so you do not treat every option as equal.

## Cluster or not?

| Situation | Recommendation |
| --- | --- |
| Development, demos, low concurrent publishers/viewers | Start with a **single AMS instance** ([Installing on Linux](/guides/installing-on-linux/installing-ams-on-linux/) or Marketplace AMI). |
| One server cannot keep up (CPU, bandwidth, concurrent streams) | Move to a **cluster** with origin/edge roles and a load balancer. |
| Need high availability (survive instance failure) | Use a **cluster** with autoscaling (preferred) or at least multiple nodes. |
| Unsure about future load | Start single; **you can move to a cluster later** without changing your app protocols (WebRTC/RTMP/HLS stay the same). |

Estimate capacity with the [cost calculator](https://antmedia.io/cost-calculator/). Clustering does not change how clients publish/play; it changes how many servers share that work.

## Recommended path (opinionated)

For most production AWS customers we recommend this order:

1. **[CloudFormation (Marketplace)](/guides/clustering-and-scaling/aws/aws-cloudformation/scale-with-aws-cloudformation/)** — default choice for a production autoscaling cluster with the least custom work.
2. **[Auto Managed](/guides/clustering-and-scaling/aws/aws-auto-managed/auto-managed-service-on-aws/)** — choose when you want Ant Media to operate scaling for you and prefer usage-based billing with minimal AWS ops.
3. **[AWS ECS](/guides/clustering-and-scaling/aws/aws-ecs/running-ams-container-at-ecs/)** — choose when your org already standardizes on containers/ECS/Fargate.
4. **[Wavelength](/guides/clustering-and-scaling/aws/aws-wavelength/deploying-ams-at-aws-wavelength/)** — niche: ultra-low latency at the mobile edge (5G / Wavelength Zones). Skip unless you have that requirement.
5. **[Load Balancer](/guides/clustering-and-scaling/aws/aws-lb/configuring-rtmp-lb-in-aws/)** — not a cluster method; supporting guides once you already have a cluster.
6. **[Clustering with AWS (manual)](/guides/clustering-and-scaling/aws/clustering-with-aws/)** — full step-by-step EC2 build. Use for learning, deep customization, or non-standard VPCs—not the fastest path to production.


## Option comparison

| Option | Best for | Trade-offs | Priority |
| --- | --- | --- | --- |
| **CloudFormation** | Production clusters on EC2 with Marketplace or [self-hosted license](/guides/clustering-and-scaling/aws/aws-cloudformation/scale-with-self-hosted-license/) | You still own AWS account resources (VPC, costs, updates) | **Preferred default** |
| **Auto Managed** | Teams that want streaming without running the cluster day-to-day | Different ops/billing model than self-managed CF/ECS | **Preferred when you want managed ops** |
| **AWS ECS** | Container platforms, Fargate, existing ECS CI/CD | Requires container/ECS familiarity | Prefer if containers are already standard |
| **Wavelength** | Telco / edge ultra-low latency in Wavelength Zones | Limited regions/use cases | Niche / lower priority for most users |
| **Load Balancer guides** | RTMP LB and IP filtering behind AWS LB | Complements a cluster; does not replace one | Supporting docs |
| **Manual Clustering with AWS** | Custom networks, learning the architecture end-to-end | More steps, easier to misconfigure | Lower priority; keep for advanced cases |

## Can I start with one and move to another?

| From → To | Feasible? | Notes |
| --- | --- | --- |
| Single instance → CloudFormation cluster | Yes | Common path. Stand up CF cluster, then point publishers/players at the new LB hostname. |
| CloudFormation (Marketplace) → CloudFormation (self-hosted license) | Yes | Same CF approach; swap AMI/licensing via the [self-hosted guide](/guides/clustering-and-scaling/aws/aws-cloudformation/scale-with-self-hosted-license/). |
| Manual cluster → CloudFormation | Yes | Preferred when you outgrow hand-built nodes. |
| CloudFormation / Manual → ECS | Possible | Plan as a migration project (images, networking, LB). Not a one-click switch. |
| Any self-managed cluster → Auto Managed | Possible | Product/ops model changes; treat as a platform move, not an in-place upgrade. |
| Anything → Wavelength | Only if you need Wavelength | Add Wavelength nodes/regions for edge latency; not a general replacement for CF/ECS. |

## Decision checklist

Gather these before choosing:

- **Peak concurrent publishers and viewers** (and whether peaks are short or sustained)
- **Latency target** (sub-second WebRTC vs HLS/LL-HLS)
- **Who operates infrastructure?** (your DevOps team vs prefer managed)
- **License model** (AWS Marketplace vs licenses from Ant Media)
- **Platform constraints** (must use ECS/Kubernetes, VPC/peering rules, Wavelength)
- **Multi-region / global** needs ([Global Cluster](/guides/clustering-and-scaling/aws/aws-cloudformation/ant-media-global-cluster-on-aws/) on top of CF)

## Where to go next

- **Most users:** [Scale with CloudFormation](/guides/clustering-and-scaling/aws/aws-cloudformation/scale-with-aws-cloudformation/)
- **Minimal ops:** [Auto Managed Service](/guides/clustering-and-scaling/aws/aws-auto-managed/auto-managed-service-on-aws/)
- **Containers:** [Deploy on ECS](/guides/clustering-and-scaling/aws/aws-ecs/running-ams-container-at-ecs/)
- **Understand cluster roles first:** [Cluster Installation](/guides/clustering-and-scaling/manual-configuration/cluster-installation/) (origin, edge, database, load balancer)
