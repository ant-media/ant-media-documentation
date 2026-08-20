---
title: Choose a GCP Deployment Option
description: Decide which Ant Media Server Google Cloud path fits you—standard GCP cluster deployment or Jinja template automation.
keywords: [GCP deployment options, Ant Media Server GCP cluster, Jinja template, Ant Media Server Documentation]
sidebar_position: 1
sidebar_label: Choose a Deployment Option
---

# Choose a GCP Deployment Option

Use this page to pick a Google Cloud path before opening a how-to.

## Recommended path (opinionated)

1. **[Cluster on GCP](/guides/clustering-and-scaling/gcp/gcp-cluster-deployment/)** — preferred default for deploying an AMS cluster on Google Cloud.
2. **[Cluster with Jinja Template](/guides/clustering-and-scaling/gcp/ams-cluster-with-jinja-template/)** — choose when you want template-driven automation similar to cloud IaC workflows.

## Option comparison

| Option | Best for | Priority |
| --- | --- | --- |
| **Cluster on GCP** | Most GCP customers; clear step-by-step deploy | **Preferred default** |
| **Jinja Template** | Teams that want scripted/repeatable GCP provisioning | Alternate automation path |

## Can I start with one and move to another?

Yes. Start with the standard GCP cluster guide to validate streaming, then adopt the **Jinja template** if you need repeatable environments. Architecture (origin/edge/database/LB) stays the same.

## Where to go next

- Most users: [Cluster on GCP](/guides/clustering-and-scaling/gcp/gcp-cluster-deployment/)
- Automation: [Cluster with Jinja Template](/guides/clustering-and-scaling/gcp/ams-cluster-with-jinja-template/)
- Platform-level choice: [Choose a Clustering and Scaling Option](/guides/clustering-and-scaling/choose-deployment-option/)
