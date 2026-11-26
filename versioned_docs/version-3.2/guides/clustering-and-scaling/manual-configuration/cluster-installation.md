---
title: Cluster Installation
description: Install Ant Media Server Enterprise on multiple nodes, configure a shared database, switch to cluster mode, and place a load balancer in front of the cluster.
keywords: [Ant Media Cluster Mode, self-managed cluster installation, origin edge setup, Ant Media Server Documentation]
sidebar_position: 1
sidebar_label: Cluster Installation
---

# Cluster Installation

This guide walks through a **self-managed** Ant Media Server cluster on your own servers: set up a shared database, install Enterprise Edition on each node, switch every node to cluster mode, and put a load balancer in front.

For what a cluster is, how origin and edge roles work, and licensing, see [Clustering and Scaling](/guides/clustering-and-scaling/).

:::tip Community Edition
**Community Edition does not support clustering.** You need an **Enterprise** license—preferably a [cluster license](/guides/clustering-and-scaling/#how-licensing-works-in-a-cluster) when running multiple nodes.
:::

## What you'll accomplish

By the end of this guide, you will:

1. Install and harden **MongoDB** (or another supported database) as the shared cluster backend.
2. Install Ant Media Server **Enterprise Edition** on every node that will join the cluster.
3. Switch each node to **cluster mode** with `change_server_mode.sh`.
4. Create the web panel account and confirm nodes in the dashboard.
5. Install a **load balancer** (Nginx or HAProxy) in front of the cluster.

## Prerequisites

Before you begin, confirm the following:

- Two or more Linux hosts (Ubuntu recommended) with `sudo` access and network connectivity between them.
- A host (or managed service) for the shared database—often a dedicated MongoDB server.
- Firewall rules that allow the required traffic between nodes and clients. Open the ports listed under [Server ports](/guides/installing-on-linux/installing-ams-on-linux/#server-ports), including **TCP 5000** for internal cluster communication (keep it closed to the public internet). For the database, open **TCP 27017** (MongoDB) or **TCP 6379** (Redis) from AMS nodes only.
- An Ant Media Server **Enterprise license key**. For multi-node clusters, use a [cluster license](/guides/clustering-and-scaling/#how-licensing-works-in-a-cluster) so the same key can run on every instance.
- Familiarity with the [cluster components](/guides/clustering-and-scaling/#cluster-components) (database, origin, edge, load balancer).

:::tip Prefer a managed path?
Most teams on AWS, Azure, GCP, or Kubernetes should start with [Choose a Deployment Option](/guides/clustering-and-scaling/choose-deployment-option/) instead of a fully self-managed install.
:::

## Step 1: Install the shared database

Cluster nodes need a shared database before you switch them to cluster mode. MongoDB is the default; Redis and managed MongoDB-compatible services are also supported.

Follow the full install and hardening guide:

**[Scaling with Self-Managed MongoDB](/guides/clustering-and-scaling/supported-databases/scaling-with-mongodb/)**

That guide covers the install script, process limits, binding on **TCP 27017**, and firewall guidance.

Alternatives:

| Backend | Guide |
|---------|-------|
| Redis | [Scaling with Redis](/guides/clustering-and-scaling/supported-databases/scaling-with-redis/) |
| MongoDB Atlas | [Scaling with MongoDB Atlas](/guides/clustering-and-scaling/supported-databases/scaling-with-mongodb-atlas/) |
| Other managed options | [Databases](/guides/clustering-and-scaling/supported-databases/) |

When the database is reachable from every AMS host, continue to the next step.

## Step 2: Install Ant Media Server on each node

Install Ant Media Server **Enterprise Edition** on every server that will be an origin or edge. Nodes start in **standalone** mode; you switch them to cluster mode after the database is ready.

### 2.1 Download the installation script

```bash
wget -O install_ant-media-server.sh https://raw.githubusercontent.com/ant-media/Scripts/master/install_ant-media-server.sh
sudo chmod 755 install_ant-media-server.sh
```

### 2.2 Run the Enterprise installation

```bash
sudo ./install_ant-media-server.sh -l 'your-license-key'
```

Replace `your-license-key` with your Enterprise (or cluster) license key. Repeat on each node.

For options and troubleshooting, see [Installing Ant Media Server on Linux](/guides/installing-on-linux/installing-ams-on-linux/).

## Step 3: Switch each node to cluster mode

With Ant Media Server installed on every node and the database reachable, enable cluster mode on each Ant Media Server host.

### 3.1 Without MongoDB credentials

```bash
cd /usr/local/antmedia
sudo ./change_server_mode.sh cluster mongodb://[mongodb-server-address]
```

Replace `[mongodb-server-address]` with the MongoDB host or IP.

:::info
Use a username and password for MongoDB in production. The connection string formats below include credentials.
:::

### 3.2 With MongoDB credentials

```bash
cd /usr/local/antmedia
sudo ./change_server_mode.sh cluster mongodb://[username]:[password]@[mongodb-server-address]
```

### 3.3 MongoDB Atlas or other `mongodb+srv` hosts

```bash
cd /usr/local/antmedia
sudo ./change_server_mode.sh cluster mongodb+srv://<username>:<password>@<cluster-url>/<database>?<params>
```

### 3.4 Redis

```bash
cd /usr/local/antmedia
sudo ./change_server_mode.sh cluster redis://[username:password@]host:port
```

See [Scaling with Redis](/guides/clustering-and-scaling/supported-databases/scaling-with-redis/) for Ubuntu install, Docker, and TLS (`rediss://`).

Run the appropriate command on **every** Ant Media Server node in the cluster.

### 3.5 Open the web panel and create an account

Open the web panel on any node:

```text
http://<ANT_MEDIA_SERVER_NODE_IP>:5080
```

The first time you open the dashboard, create your account (first name, last name, email, and password):

![](/img/clustering-and-scaling/aws-cloudformation/create-account.webp)

After you sign in, open the **Cluster** view to confirm that your nodes have registered with the database.

:::info
Keep **TCP port 5000** open between cluster nodes for internal communication, and closed to the public internet. See [How clustering works](/guides/clustering-and-scaling/#how-clustering-works) and [Server ports](/guides/installing-on-linux/installing-ams-on-linux/#server-ports).
:::

## Step 4: Install a load balancer

Publishers and players should connect through a load balancer, not directly to individual nodes.

| Option | Guide |
|--------|-------|
| **Nginx** (common for self-managed setups) | [Nginx Load Balancer](/guides/clustering-and-scaling/load-balancing/nginx-load-balancer/) |
| **HAProxy** | [HAProxy Load Balancer](/guides/clustering-and-scaling/load-balancing/haproxy-load-balancer/) |

After the load balancer is in place, publish a test stream to an origin and play it from an edge through the balancer to confirm the cluster path.

## Related guides

| Topic | Guide |
|-------|-------|
| Architecture, components, and licensing | [Clustering and Scaling](/guides/clustering-and-scaling/) |
| Choose AWS, Azure, GCP, Kubernetes, or Docker | [Choose a Deployment Option](/guides/clustering-and-scaling/choose-deployment-option/) |
| Multi-region origin/edge | [Multi-Level Cluster](/guides/clustering-and-scaling/manual-configuration/multi-level-cluster/) |
| Databases | [Databases](/guides/clustering-and-scaling/supported-databases/) |
