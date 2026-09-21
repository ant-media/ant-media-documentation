---
title: Scaling with Redis Database
description: Install Redis on Ubuntu or Docker and connect Ant Media Server for cluster or standalone deployments.
keywords: [Redis, Ant Media Server cluster, Ant Media Server Documentation]
sidebar_position: 2
sidebar_label: Redis
---

# Scaling with Redis

Redis is an in-memory data store that Ant Media Server Enterprise supports as a cluster backend alongside MongoDB and MapDB. It suits workloads that benefit from low latency, caching, and pub/sub messaging.

See [Databases](/guides/clustering-and-scaling/supported-databases/) for how shared backends fit into clustering.

## Why Redis?

| Benefit | What it means for AMS |
|---------|----------------------|
| **Speed** | In-memory storage keeps read/write latency low for real-time streaming |
| **Caching** | Offloads hot data from primary sources and speeds repeated lookups |
| **Pub/Sub** | Event-driven messaging for live chat, analytics, and signaling |
| **Availability** | Standalone or clustered Redis deployments with fault tolerance |

For a broader comparison of database options, see [Databases supported by Ant Media Server](https://antmedia.io/databases-supported-by-ant-media-server/).

## Ports to open

| Port | Protocol | Direction | Purpose |
|------|----------|-----------|---------|
| **6379** | TCP | AMS nodes → Redis host | Redis connections (default port) |

Keep **6379** closed to the public internet. Allow it only from AMS node IPs (or a private subnet / security group). If you use a custom port or TLS listener, open that port instead.

## Deploy Redis

Choose the deployment model that fits your environment:

1. **Self-managed on Ubuntu** — Quick install below
2. **Managed cloud** — [AWS MemoryDB](https://aws.amazon.com/memorydb/) or [ElastiCache for Redis](https://aws.amazon.com/elasticache/redis/), [Azure Cache for Redis](https://azure.microsoft.com/en-in/products/cache/), or [Google Cloud Memorystore](https://cloud.google.com/memorystore)
3. **Containers** — Official [Redis Docker image](https://hub.docker.com/_/redis)

### Option A: Quick install on Ubuntu

Install Redis from the Ubuntu package repositories:

```bash
sudo apt update
sudo apt install redis-server -y
```

Enable and start the service:

```bash
sudo systemctl enable redis-server
sudo systemctl start redis-server
```

By default Redis listens only on `127.0.0.1`. Open the config so AMS nodes on other hosts can connect:

```bash
sudo nano /etc/redis/redis.conf
```

Set (or uncomment) the bind address and confirm the port:

```
bind 0.0.0.0
port 6379
```

For production, set a password:

```
requirepass your-strong-password
```

Restart Redis:

```bash
sudo systemctl restart redis-server
sudo systemctl status redis-server
```

Confirm Redis responds locally:

```bash
redis-cli ping
```

If you set `requirepass`, authenticate first:

```bash
redis-cli
AUTH your-strong-password
PING
```

:::warning
Do not expose Redis to the public internet. Bind to a private interface when possible, enforce a password, and restrict **TCP 6379** with a firewall to AMS node IPs only.
:::

### Option B: Docker

Run the official image from [Docker Hub](https://hub.docker.com/_/redis):

```bash
docker run -d --name redis -p 6379:6379 redis
```

With a password:

```bash
docker run -d --name redis -p 6379:6379 redis redis-server --requirepass your-strong-password
```

Map the host port only on a private network, or put Redis behind a firewall that allows AMS nodes only.

### Option C: Managed cloud

Use your cloud provider’s managed Redis service and copy the endpoint URI (host, port, and credentials) for the AMS connection steps below.

## Connect AMS to Redis

Use `change_server_mode.sh` when AMS runs as a service, or `start.sh` when you start AMS manually or in containers. Run from `/usr/local/antmedia` on every node.

### Using start.sh

**Standalone:**

```bash
sudo ./start.sh -m standalone -h redis://[username:password@]host:port
```

**Cluster:**

```bash
sudo ./start.sh -m cluster -h redis://[username:password@]host:port
```

### Using change_server_mode.sh

**Standalone:**

```bash
sudo ./change_server_mode.sh standalone redis://[username:password@]host:port
```

**Cluster:**

```bash
sudo ./change_server_mode.sh cluster redis://[username:password@]host:port
```

Example with password on the default port:

```bash
sudo ./change_server_mode.sh cluster redis://:your-strong-password@192.168.1.50:6379
```

:::info TLS
If your Redis server uses TLS, replace `redis://` with `rediss://`:

```bash
sudo ./change_server_mode.sh standalone rediss://[username:password@]host:port
```
:::

### Kubernetes

Pass the Redis URI via the `-h` flag in your deployment manifest. See the [Kubernetes origin deployment example](https://github.com/ant-media/Scripts/blob/master/kubernetes/ams-k8s-deployment-origin.yaml#L46).

## Verify

1. From an AMS node, confirm **TCP 6379** reaches the Redis host.
2. Open the web panel **Cluster** view. All nodes using the same Redis URI should register successfully.

## Related guides

| Topic | Guide |
|-------|-------|
| Database overview | [Databases](/guides/clustering-and-scaling/supported-databases/) |
| Self-managed MongoDB | [Scaling with Self-Managed MongoDB](/guides/clustering-and-scaling/supported-databases/scaling-with-mongodb/) |
| MongoDB Atlas | [Scaling with MongoDB Atlas](/guides/clustering-and-scaling/supported-databases/scaling-with-mongodb-atlas/) |
| Self-managed cluster | [Cluster Installation](/guides/clustering-and-scaling/manual-configuration/cluster-installation/) |
