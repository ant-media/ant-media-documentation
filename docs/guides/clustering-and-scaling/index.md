---
title: Clustering and Scaling
description: Understand Ant Media Server clustering — what a cluster is, how origin and edge nodes work, licensing in a cluster, and the components that make scalable streaming possible.
keywords: [Ant Media Server clustering, origin edge architecture, scale live streaming, cluster license, Ant Media Server Documentation]
sidebar_label: Overview
sidebar_position: 0
---

# Clustering and Scaling

When one Ant Media Server cannot carry all of your publishers and viewers, a **cluster** spreads them across multiple nodes—so ingest and playback can grow independently without putting everything on a single box.

:::tip Community Edition
**Ant Media Server Community Edition does not support clustering.** Cluster mode, origin/edge roles, and shared-database deployments require **Enterprise Edition**. See [How licensing works in a cluster](#how-licensing-works-in-a-cluster).
:::

Use this page to learn how clustering works. When you are ready to deploy, continue with [Choose a Deployment Option](/guides/clustering-and-scaling/choose-deployment-option/).

## What is a cluster?

A cluster lets you **distribute publishers and viewers across more than one Ant Media Server**—publish on one node, play on another—so concurrent streams and audience size are not limited to a single instance.

In cluster mode, nodes register with a shared database and cooperate as one logical streaming platform. You split them into an **origin** group (ingest) and an **edge** group (playback). A load balancer in front of the cluster sends **publish** traffic to origins and **play** traffic to edges. The database keeps stream metadata consistent so every edge can find the origin that holds a given stream.

![Ant Media Server origin-edge cluster: publishers and viewers through a load balancer to origin and edge groups sharing MongoDB](@site/static/img/ams-cluster-architecture.svg)

## Cluster components

| Component | Role |
|-----------|------|
| **Database** (MongoDB or Redis) | Stores stream metadata—bitrates, settings, which node is the origin for each stream, and related state—so every node sees the same picture |
| **Origin group** | Nodes dedicated to **ingest**. They receive publish traffic, can transcode and transmux, and feed edges. Viewers do not connect here for playback. Prefer GPU capacity when adaptive bitrate is enabled |
| **Edge group** | Nodes dedicated to **playback**. They fetch streams from origins and deliver them to viewers. Edges do not ingest or transcode; they distribute efficiently |
| **Load balancer** | Entry point for publishers and players. Routes **publish** requests to the origin group and **play** requests to the edge group. The product you use depends on the environment—see below |

### Load balancer by environment

You always need something in front of the cluster that separates publish and play traffic. What you deploy depends on where you run:

| Environment | Typical load balancer |
|-------------|----------------------|
| **Self-managed / on-prem** | [Nginx](/guides/clustering-and-scaling/load-balancing/nginx-load-balancer/) or [HAProxy](/guides/clustering-and-scaling/load-balancing/haproxy-load-balancer/), with origin and edge upstreams |
| **AWS** | Application or Network Load Balancer with **origin** and **edge** target groups (and listeners/rules that send publish vs play to the right group) |
| **Azure** | Azure Application Gateway or Load Balancer with backend pools for origin and edge |
| **GCP** | Google Cloud Load Balancing with backend services for origin and edge |
| **Kubernetes** | Ingress or a cloud LB in front of separate **origin** and **edge** Services |

The idea is the same everywhere: publishers land on origins, players land on edges.

## How clustering works

Origin and edge are **roles you assign by how traffic is routed**—not roles nodes pick at random. In a self-managed cluster you list origin and edge IPs in Nginx or HAProxy. In the cloud you attach instances (or pods) to origin and edge target groups / backend pools. In Kubernetes you expose distinct Services for each group.

Once that routing is in place, a live session looks like this:

1. **Nodes join the cluster** — Each Ant Media Server starts in cluster mode, connects to the shared database, and registers itself so the cluster can see it.
2. **Publish goes to an origin** — The load balancer receives a publish request and forwards it to a node in the **origin** group (by upstream, target group, or Service). That origin ingests the stream and stores stream metadata in the database, including that **this node is the origin for this `streamId`**.
3. **Play goes to an edge** — The load balancer receives a play request and forwards it to a node in the **edge** group.
4. **Edge pulls from the stream’s origin** — The edge reads the stream’s origin from the database, fetches the media from that origin over the internal network, and serves the viewer.

:::info
Open **TCP port 5000** between cluster nodes for internal origin–edge communication. Keep it closed to the public internet. Full port list: [Server ports](/guides/installing-on-linux/installing-ams-on-linux/#server-ports).
:::

## How licensing works in a cluster

Clustering is an **Enterprise Edition** capability. Community Edition cannot run in cluster mode.

| License type | What it covers |
|--------------|----------------|
| **Standard Enterprise license** | One Ant Media Server instance at a time |
| **Enterprise cluster license** | The same Enterprise features, with a key that can run on **many instances at once** |

You *can* put a **different** license key on each node. That works for a fixed, small cluster. It does **not** work well for **auto scaling**—new nodes need a key without manual steps, so a **cluster license** (same key on every node, or baked into the image) is the right approach.

**Self-hosted licenses:** buy a plan on [antmedia.io/pricing](https://antmedia.io/pricing/) (hourly, monthly, annual, or perpetual), then install the key on each node—or use one cluster key across the fleet.

**Cloud Marketplace:** AWS, Azure, and GCP Marketplace images bill the Ant Media license through the cloud provider (often hourly with the instance). You launch the Marketplace AMI/image, and licensing is handled by that billing model—no separate self-hosted key install for that path. Follow the [AWS](/guides/clustering-and-scaling/aws/choose-aws-deployment/), [Azure](/guides/clustering-and-scaling/azure/choose-azure-deployment/), or [GCP](/guides/clustering-and-scaling/gcp/choose-gcp-deployment/) guide for your platform.

For edition comparison and education licenses, see [License information](/#license-information). Plans and pricing: [antmedia.io/pricing](https://antmedia.io/pricing/).

## Next

| Goal | Start here |
|------|------------|
| Pick AWS, Azure, GCP, Kubernetes, Docker, or on-prem | [Choose a Deployment Option](/guides/clustering-and-scaling/choose-deployment-option/) |
| Install origin, edge, database, and load balancer yourself | [Cluster Installation](/guides/clustering-and-scaling/manual-configuration/cluster-installation/) |
| Front the cluster with Nginx or HAProxy | [Load Balancing](/guides/clustering-and-scaling/load-balancing/nginx-load-balancer/) |
| Choose MongoDB, Redis, or a managed database | [Databases](/guides/clustering-and-scaling/supported-databases/) |
