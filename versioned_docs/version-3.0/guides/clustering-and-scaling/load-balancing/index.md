---
title: Load Balancing
description: Front an Ant Media Server cluster with Nginx or HAProxy—route publish traffic to origins and play traffic to edges.
keywords: [Load Balancer, Nginx, HAProxy, Ant Media Server cluster, Ant Media Server Documentation]
sidebar_label: Overview
sidebar_position: 0
---

# Load Balancing

Every Ant Media Server cluster needs a **load balancer** in front of origin and edge nodes. Clients never talk to individual AMS instances directly—they hit the balancer, which sends **publish** requests to the origin group and **play** requests to the edge group.

For architecture and how origin/edge routing works, see [Clustering and Scaling](/guides/clustering-and-scaling/).

## What the load balancer does

| Traffic | Typical listener | Upstream |
|---------|------------------|----------|
| **Publish** (WebRTC, HTTP API) | `443` (HTTPS) | Origin nodes (`5080`) |
| **Play** (WebRTC, HLS, DASH) | `5443` (HTTPS) | Edge nodes (`5080`) |
| **Web panel** | `4444` (HTTPS) | Origin and/or edge (`5080`) |
| **RTMP ingest** | `1935` (TCP) | Origin nodes (`1935`) |

SSL termination usually happens on the load balancer so publishers and players use standard HTTPS ports.

## Nginx or HAProxy?

| Option | Best when… |
|--------|------------|
| **[Nginx](/guides/clustering-and-scaling/load-balancing/nginx-load-balancer/)** | You want an install script, Let's Encrypt automation, and a config many AMS teams already use |
| **[HAProxy](/guides/clustering-and-scaling/load-balancing/haproxy-load-balancer/)** | You prefer HAProxy's stats UI, TCP/HTTP tuning, or already run HAProxy elsewhere |

Both support origin/edge upstreams, SSL termination, and RTMP passthrough. Cloud deployments often use the provider's own load balancer instead—see [Choose a Deployment Option](/guides/clustering-and-scaling/choose-deployment-option/).

## Before you start

- Origin and edge nodes are installed and running in [cluster mode](/guides/clustering-and-scaling/manual-configuration/cluster-installation/).
- You know the **IP addresses** (or hostnames) of every origin and edge node.
- A **domain name** points to the load balancer host if you plan to use HTTPS with Let's Encrypt.
- Required [server ports](/guides/installing-on-linux/installing-ams-on-linux/#server-ports) are open between the balancer and AMS nodes.

## Guides

| Guide | Description |
|-------|-------------|
| [Nginx](/guides/clustering-and-scaling/load-balancing/nginx-load-balancer/) | Automated script or manual Nginx install with origin/edge upstreams |
| [HAProxy](/guides/clustering-and-scaling/load-balancing/haproxy-load-balancer/) | HAProxy with SSL termination and backend stats |

After the load balancer is configured, publish a test stream through the origin hostname and play it through the edge hostname to confirm the full cluster path.
