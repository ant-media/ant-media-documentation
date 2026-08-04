---
title: Scaling with Mongodb Atlas
description: Use MongoDB Atlas as the shared database for an Ant Media Server cluster.
keywords: [MongoDB Atlas, Ant Media Server cluster, Ant Media Server Documentation]
sidebar_position: 3
sidebar_label: MongoDB Atlas
---

# Scaling with MongoDB Atlas

MongoDB Atlas is a fully managed MongoDB service on AWS, Azure, or GCP. Use it as the shared database when you want Atlas to handle backups, scaling, and multi-region replication.

See [Databases](/guides/clustering-and-scaling/supported-databases/) for connection patterns and how clustering uses a shared backend.

## What you'll accomplish

- Create a MongoDB Atlas cluster
- Allow network access and create a database user
- Connect every AMS node with the `mongodb+srv` URI

## Step 1: Create an Atlas cluster

In the Atlas console, open **Database** and click **Create a database**.

![Create database in Atlas](@site/static/img/atlas0.png)

Choose **Serverless**, **Dedicated**, or **Shared** and pick your cloud provider and region.

![](@site/static/img/atlas1.png)

Complete the required fields and click **Create cluster**. Provisioning takes a few minutes.

**![](@site/static/img/Atlas3.png)**

## Step 2: Configure network access

Under **Network Access**, click **Add IP Address** and allow the IPs (or CIDR ranges) of your AMS nodes and load balancer.

**![](@site/static/img/atlas4.png)**

## Step 3: Create a database user

Under **Database Access**, create a user with read/write permissions on the database AMS will use.

**![](@site/static/img/atlas6.png)**

Copy the **mongodb+srv** connection string from the cluster connection dialog.

## Step 4: Connect AMS

Run one of the following from `/usr/local/antmedia` on **every** cluster node.

### change_server_mode.sh (AMS as a service)

```bash
sudo ./change_server_mode.sh cluster mongodb+srv://<username>:<password>@<url>
```

### start.sh (manual or container start)

```bash
sudo ./start.sh -m cluster -h mongodb+srv://username:password@url
```

:::info
When the URI uses `mongodb://` or `mongodb+srv://`, you must include username and password in the connection string.
:::

For Kubernetes or Docker, prefer `start.sh` or pass `-h` in your container entrypoint. For systemd services, use `change_server_mode.sh`.

## Verify

Sign in to the web panel and open the **Cluster** view. Each node connected to the same Atlas URI should appear in the cluster list.

## Related guides

| Topic | Guide |
|-------|-------|
| Database overview | [Databases](/guides/clustering-and-scaling/supported-databases/) |
| Self-managed MongoDB | [Scaling with Self-Managed MongoDB](/guides/clustering-and-scaling/supported-databases/scaling-with-mongodb/) |
| AWS DocumentDB | [Scaling with AWS DocumentDB](/guides/clustering-and-scaling/supported-databases/scaling-with-aws-documentdb/) |
