---
title: Choose a Kubernetes Deployment Option
description: Decide how to run Ant Media Server on Kubernetes—Helm, manual manifests, or managed services like EKS, AKS, and GKE.
keywords: [Kubernetes deployment options, Helm vs manual, EKS AKS GKE, Ant Media Server Documentation]
sidebar_position: 1
sidebar_label: Choose a Deployment Option
---

# Choose a Kubernetes Deployment Option

Use this page to pick a Kubernetes path. Managed cloud install guides are for teams **already committed** to that cloud’s Kubernetes service.

## Recommended path (opinionated)

1. **[Prepare Environment](/guides/clustering-and-scaling/kubernetes/prepare-environment-to-deploy-ams-at-kubernetes/)** — do this once (metrics server, prerequisites) before any deploy method.
2. **[Helm Deployment](/guides/clustering-and-scaling/kubernetes/deploy-ams-with-helm/)** — **preferred** for most teams; fastest repeatable install.
3. **[Manual Deployment](/guides/clustering-and-scaling/kubernetes/deploy-ams-on-kubernetes/)** — when you need full control over manifests or Helm is not allowed.
4. **Managed Kubernetes** (only if you already use that cloud K8s):
   - [AWS EKS](/guides/clustering-and-scaling/kubernetes/installing-ams-on-aws-eks/)
   - [Azure AKS](/guides/clustering-and-scaling/kubernetes/installing-ams-on-azure-aks/)
   - [Google GKE](/guides/clustering-and-scaling/kubernetes/installing-ams-on-google-gke/)
   - [DigitalOcean](/guides/clustering-and-scaling/kubernetes/install-ams-at-digital-ocean/)

## Option comparison

| Option | Best for | Priority |
| --- | --- | --- |
| **Helm** | Most Kubernetes users; upgrades and repeatability | **Preferred default** |
| **Manual Deployment** | Custom networking, policy-restricted clusters | Advanced / lower priority for most |
| **EKS / AKS / GKE / DigitalOcean** | You already run that managed Kubernetes | Use the guide that matches your cloud |
| **Prepare Environment** | Prerequisites shared by all methods | Do first, not an alternate product |

## Cluster on Kubernetes vs cloud VM templates?

- Prefer **Kubernetes** when your org already standardizes on K8s.
- Prefer **AWS CloudFormation / Azure ARM / GCP guides** when you want VM autoscaling clusters without operating Kubernetes.

See also: [Choose a Clustering and Scaling Option](/guides/clustering-and-scaling/choose-deployment-option/).

## Where to go next

- Most users: [Prepare Environment](/guides/clustering-and-scaling/kubernetes/prepare-environment-to-deploy-ams-at-kubernetes/) → [Helm Deployment](/guides/clustering-and-scaling/kubernetes/deploy-ams-with-helm/)
- Managed cloud K8s: open the EKS, AKS, GKE, or DigitalOcean guide for your provider
