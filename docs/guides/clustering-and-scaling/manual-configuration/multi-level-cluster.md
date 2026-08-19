---
title: Multi-Level Cluster
description: Scale Ant Media Server across regions with per-region origins, node groups, and a global load balancer.
keywords: [Multi Level Cluster, multi-region streaming, nodeGroup, Ant Media Server Documentation]
sidebar_position: 2
sidebar_label: Multi-Level Cluster
---

# Multi-Level Cluster

A **multi-level cluster** spans more than one region. Each region can have its own origin for a stream so edges pull media from a nearby node instead of always crossing the WAN to a single global origin.

Use this guide after you understand [basic clustering](/guides/clustering-and-scaling/) and have a working [self-managed cluster](/guides/clustering-and-scaling/manual-configuration/cluster-installation/).

## What you'll accomplish

By the end of this guide, you will:

1. Understand same-region vs cross-region play paths.
2. Set `nodeGroup` on each server so nodes form regions.
3. Know what your global load balancer must do for publish and play.

## How it works

### Publisher and players in the same region

1. A **publisher** starts a stream and is assigned to `Origin1` in `Region1`.
2. `Player1` (near `Region1`) requests playback and is assigned to `Edge11` in `Region1`.
3. `Edge11` pulls the stream from `Origin1` and serves `Player1`.

![Multi-level cluster same region](@site/static/img/multilevelcluster.png)

### Publisher and players in different regions

1. `Player2` (near `Region2`) requests playback and is assigned to `Edge21` in `Region2`.
2. `Edge21` finds no local origin for the stream, so it becomes a **secondary origin** for that stream in `Region2`, pulls from `Origin1` in `Region1`, and serves `Player2`.
3. `Player3` (also near `Region2`) is assigned to `Edge22`.
4. `Edge22` pulls from `Edge21` (the regional secondary origin) and serves `Player3`.

In short: each stream uses **one origin per region**, even across geographies.

## Configure node groups

Set the region (node group) on each server in `conf/red5.properties`:

```properties
nodeGroup=GROUP_NAME
```

All instances in the same physical region should share the same `nodeGroup` value.

Configure your load balancer (for example Route 53 or another global LB) to send **publish** and **play** requests to the best region for each client.
