---
title: Scaling with Self-Managed MongoDB
description: Install and configure MongoDB on Ubuntu as the shared database for an Ant Media Server cluster.
keywords: [MongoDB, self-managed MongoDB, Ant Media Server cluster, Ant Media Server Documentation]
sidebar_position: 1
sidebar_label: Self-Managed MongoDB
---

# Scaling with Self-Managed MongoDB

MongoDB is the default shared database for Ant Media Server clustering. This guide installs MongoDB on a dedicated Ubuntu (or Debian-based) host, hardens process limits, and binds it so cluster nodes can connect.

See [Databases](/guides/clustering-and-scaling/supported-databases/) for other backends (Redis, Atlas, DocumentDB, Cosmos DB). For the full cluster walkthrough, see [Cluster Installation](/guides/clustering-and-scaling/manual-configuration/cluster-installation/).

## What you'll accomplish

- Install MongoDB with the Ant Media Server install script
- Raise process and file limits
- Bind MongoDB on the network and open the required port
- Connect AMS nodes with a MongoDB URI

## Prerequisites

- A dedicated Linux host (Ubuntu recommended) with `sudo` access
- Network connectivity from every AMS origin and edge node to this host
- Firewall access so AMS nodes can reach **TCP port 27017** (keep it closed to the public internet)

## Ports to open

| Port | Protocol | Direction | Purpose |
|------|----------|-----------|---------|
| **27017** | TCP | AMS nodes → MongoDB host | Database connections |

:::warning
Do not expose port 27017 to the public internet. Allow it only from AMS node IPs (or a private subnet / security group).
:::

## Step 1: Download the MongoDB script

```bash
wget https://raw.githubusercontent.com/ant-media/Scripts/master/install_mongodb.sh
sudo chmod +x install_mongodb.sh
```

## Step 2: Install MongoDB

Latest version without authentication:

```bash
sudo ./install_mongodb.sh
```

With a randomly generated username and password (recommended for production):

```bash
sudo ./install_mongodb.sh --auto-create
```

Save the credentials printed by the script; you need them when switching Ant Media Server to cluster mode.

## Step 3: Raise process and file limits

For MongoDB 4.4+, set open-files and process limits so the database does not fail under load. Add the following to `/etc/security/limits.conf`:

```bash
root soft       nproc          65535
root hard       nproc          65535
root soft       nofile         65535
root hard       nofile         65535
mongodb soft    nproc          65535
mongodb hard    nproc          65535
mongodb soft    nofile         65535
mongodb hard    nofile         65535
```

## Step 4: Bind MongoDB to the network

Open the MongoDB configuration file:

```bash
sudo nano /etc/mongod.conf
```

Set the network interfaces so cluster nodes can reach the database:

```yaml
# network interfaces
net:
  port: 27017
  bindIp: 0.0.0.0
```

Restrict access with a firewall and authentication. Restart MongoDB after saving the file:

```bash
sudo systemctl restart mongod
```

Confirm the service is running:

```bash
sudo systemctl status mongod
```

## Connect AMS to MongoDB

Run from `/usr/local/antmedia` on **every** cluster node.

**Without credentials:**

```bash
sudo ./change_server_mode.sh cluster mongodb://[mongodb-server-address]
```

**With credentials:**

```bash
sudo ./change_server_mode.sh cluster mongodb://[username]:[password]@[mongodb-server-address]
```

For containers or Kubernetes, pass the same URI via `start.sh`:

```bash
sudo ./start.sh -m cluster -h mongodb://[username]:[password]@[mongodb-server-address]
```

:::info
Use username and password in production. Prefer `--auto-create` during install so credentials are generated for you.
:::

## Verify

From an AMS node, confirm port **27017** is reachable, then open the web panel **Cluster** view after switching to cluster mode. All nodes using the same MongoDB URI should appear in the list.

## Related guides

| Topic | Guide |
|-------|-------|
| Database overview | [Databases](/guides/clustering-and-scaling/supported-databases/) |
| Full self-managed cluster | [Cluster Installation](/guides/clustering-and-scaling/manual-configuration/cluster-installation/) |
| MongoDB Atlas | [Scaling with MongoDB Atlas](/guides/clustering-and-scaling/supported-databases/scaling-with-mongodb-atlas/) |
| Redis alternative | [Scaling with Redis](/guides/clustering-and-scaling/supported-databases/scaling-with-redis/) |
