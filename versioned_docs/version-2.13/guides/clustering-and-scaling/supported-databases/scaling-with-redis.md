---
title: Scaling with Redis Database
description: Using Redis Database with AMS
keywords: [Using Redis with AMS, Redis Database, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 10
---

AMS already supports databases like MapDB for standalone server deployments and [MongoDB](https://antmedia.io/docs/guides/clustering-and-scaling/manual-configuration/cluster-installation/#installing-the-mongodb-database) (including [MongoDB Atlas](https://antmedia.io/docs/guides/clustering-and-scaling/supported-databases/scaling-with-mongodb-atlas/)) for both standalone and cluster environments; the recent addition of Redis integration with AMS EE presents new opportunities for optimizing streaming workflows. With its unique advantages, Redis offers distinct benefits over MongoDB and MapDB in certain use cases.

## Why Use Redis?

Redis, a high-performance in-memory database system, brings several advantages to the table when integrated with AMS:

- **Speed and Low Latency:**
Redis's in-memory data storage enables lightning-fast performance and minimal latency, ideal for real-time applications like live video streaming.
- **Advanced Caching Capabilities:**
Redis provides robust caching functionality, reducing the load on primary data sources and improving read operation speed, enhancing AMS performance.
- **Pub/Sub Messaging:**
Redis's Pub/Sub messaging system enables real-time communication and event-driven architectures, beneficial for live chat, analytics, and signaling in live video streaming.
- **Scalability and High Availability:**
Redis supports standalone and clustered deployments, ensuring scalability and high availability. Clustered deployments distribute data across nodes, providing fault tolerance for uninterrupted streaming services.

Therefore, by incorporating Redis with AMS, users can optimize their live video streaming workflows, leveraging its speed, caching capabilities, Pub/Sub messaging, and scalability features.

## How to deploy Redis?

There are various Redis deployment options:

1. **Self-Managed Deployment:**
You can manually install and configure Redis on local machine or dedicated cloud servers for complete control. Please Refer to the [Redis documentation](https://redis.io/docs/latest/) for guidance on self-managed Redis deployments on your preferred OS.

2. **Cloud-Based Deployment:**
We can Utilize managed Redis services provided by cloud platforms for simplified deployment and management. AWS offers [MemoryDB for Redis](https://aws.amazon.com/memorydb/) and [ElasticCache for Redis](https://aws.amazon.com/elasticache/redis/), Microsoft Azure has [Azure Cache for Redis](https://azure.microsoft.com/en-in/products/cache/), and GCP offers [Google Cloud Memorystore](https://cloud.google.com/memorystore).

3. **Containerized Deployment:**
Deploy Redis using containerization platforms like Docker. This pulls the Redis container image from a registry, configure it, and launches [Redis containers](https://redis.io/download/#redis-downloads).

## How to use Redis with Ant Media Server?

The Redis integration with AMS can be achieved using two different approaches: using the `./start.sh` script or the `./change_server_mode.sh script`.

The `./start.sh` script is suitable when you manually start and stop AMS, providing flexibility in managing your streaming server. It allows you to utilize Redis in both standalone and cluster modes.

**For standalone mode:**

```bash
sudo ./start.sh -m standalone -h redis://[username:password@]host:port
```

**For cluster mode:**

```bash
sudo ./start.sh -m cluster -h redis://[username:password@]host:port
```

On the other hand, the `./change_server_mode.sh` script is designed for AMS running as a service, simplifying the process of switching between standalone and cluster modes.

**For standalone mode:**

```bash
sudo ./change_server_mode.sh standalone redis://[username:password@]host:port
```

**For cluster mode:**

```bash
sudo ./change_server_mode.sh cluster redis://[username:password@]host:port
```

:::info
Note on TLS support:

If your Redis server is configured with TLS, simply use the rediss:// scheme instead of redis://:
:::

```bash
sudo ./change_server_mode.sh standalone rediss://[username:password@]host:port
```

When deploying Ant Media Server (AMS) with Kubernetes, you can use Redis by passing your specific database parameters in the [Kubernetes deployment](https://github.com/ant-media/Scripts/blob/master/kubernetes/ams-k8s-deployment-origin.yaml#L46) file. By modifying the deployment configuration, you can configure the host, port, and optional username/password credentials for Redis.

```bash
-h
- redis://[username:password@]host:port
```

Also, you can refer to this blogpost in we have discussed about using different [databases with Ant Media Server](https://antmedia.io/databases-supported-by-ant-media-server/).

In this document we discussed Redis integration with AMS, covering use cases, implementation strategies, and best practices. Understanding the benefits of Redis integration helps you make informed decisions for your live video streaming infrastructure, whether you're using MongoDB, MapDB, or Redis.
