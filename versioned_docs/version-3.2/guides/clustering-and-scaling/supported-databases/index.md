---
title: Databases
description: Shared database backends for Ant Media Server clustering—MongoDB, managed cloud databases, and Redis.
keywords: [MongoDB, Redis, DocumentDB, CosmosDB, Ant Media Server cluster, Ant Media Server Documentation]
sidebar_label: Overview
sidebar_position: 0
---

# Databases

Cluster nodes share a **central database** so stream metadata, viewer state, and cluster registration stay in sync. Every origin and edge node connects to the same backend—whether you self-host MongoDB, use a managed service, or run Redis.

For the full cluster picture, see [Clustering and Scaling](/guides/clustering-and-scaling/). To install self-managed MongoDB, see [Scaling with Self-Managed MongoDB](/guides/clustering-and-scaling/supported-databases/scaling-with-mongodb/).

## Supported backends

| Backend | Guide | Typical use |
|---------|-------|-------------|
| **Self-managed MongoDB** | [Self-Managed MongoDB](/guides/clustering-and-scaling/supported-databases/scaling-with-mongodb/) | On-prem or VM you manage (default for self-managed clusters) |
| **Redis** | [Scaling with Redis](/guides/clustering-and-scaling/supported-databases/scaling-with-redis/) | Low-latency in-memory store; caching and pub/sub |
| **MongoDB Atlas** | [MongoDB Atlas](/guides/clustering-and-scaling/supported-databases/scaling-with-mongodb-atlas/) | Multi-cloud managed MongoDB |
| **AWS DocumentDB** | [AWS DocumentDB](/guides/clustering-and-scaling/supported-databases/scaling-with-aws-documentdb/) | MongoDB-compatible on AWS VPC |
| **Azure Cosmos DB** | [Azure Cosmos DB](/guides/clustering-and-scaling/supported-databases/scaling-with-azure-cosmosdb/) | MongoDB vCore on Azure |

:::info
Standalone deployments can use MapDB (built in) or MongoDB. Cluster mode requires a shared external database—MongoDB-family or Redis.
:::

## Ports to open

| Backend | Port | Notes |
|---------|------|-------|
| **MongoDB** | **TCP 27017** | Allow from AMS nodes only; not public |
| **Redis** | **TCP 6379** | Allow from AMS nodes only; not public |

Managed cloud databases use the provider’s endpoint and security rules—open the port or allowlist your AMS IPs as their console requires.

## Connecting AMS to the database

Use one of two scripts depending on how you run AMS:

| How AMS runs | Script | Example |
|--------------|--------|---------|
| As a **system service** | `change_server_mode.sh` | `sudo ./change_server_mode.sh cluster mongodb+srv://user:pass@host` |
| **Manual / container** start | `start.sh` | `sudo ./start.sh -m cluster -h mongodb+srv://user:pass@host` |

Run the command from `/usr/local/antmedia` on **every** cluster node.

For Redis, use a `redis://` or `rediss://` (TLS) URI instead of MongoDB connection strings—see [Scaling with Redis](/guides/clustering-and-scaling/supported-databases/scaling-with-redis/).

For Kubernetes deployments, pass the `-h` database parameter in your deployment manifest. See the [Kubernetes origin deployment example](https://github.com/ant-media/Scripts/blob/master/kubernetes/ams-k8s-deployment-origin.yaml#L46).

## Choose a guide

Pick the backend that matches your cloud or ops model, provision the database, then connect every AMS node with the same connection string.

After all nodes register, open the web panel **Cluster** view to confirm they appear in the cluster.
