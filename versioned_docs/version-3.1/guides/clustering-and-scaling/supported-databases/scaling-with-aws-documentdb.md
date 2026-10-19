---
title: Scaling with AWS DocumentDB
description: Use Amazon DocumentDB as the shared MongoDB-compatible database for Ant Media Server clustering.
keywords: [AWS DocumentDB, Ant Media Server cluster, Ant Media Server Documentation]
sidebar_position: 4
sidebar_label: AWS DocumentDB
---

# Scaling with AWS DocumentDB

Amazon DocumentDB is a managed, MongoDB-compatible database on AWS. Run AMS cluster nodes in the same VPC as your DocumentDB cluster for low-latency, private connectivity.

See [Databases](/guides/clustering-and-scaling/supported-databases/) for general connection guidance.

## Prerequisites

- AMS nodes (standalone or cluster) in the **same VPC** as DocumentDB
- **TLS disabled** on the DocumentDB cluster (required for current AMS DocumentDB integration)

## Step 1: Create a parameter group with TLS disabled

Open Amazon DocumentDB and go to **Parameter groups**.

![](@site/static/img/aws-documentdb/aws-documentdb-1.png)

Create a new cluster parameter group.

![](@site/static/img/aws-documentdb/aws-documentdb-2.png)

Select the `tls` parameter, click **Edit**, and set TLS to **disabled**.

![](@site/static/img/aws-documentdb/aws-documentdb-3.png)

## Step 2: Create the DocumentDB cluster

Go to **Clusters** and click **Create**. Choose instance class and instance count.

![](@site/static/img/aws-documentdb/aws-documentdb-4.png)

Set a master username and password, then open **Advanced settings**.

![](@site/static/img/aws-documentdb/aws-documentdb-5.png)

Select the parameter group you created (TLS disabled) and click **Create**.

![](@site/static/img/aws-documentdb/aws-documentdb-6.png)

## Step 3: Copy the connection string

When the cluster is available, open **Connectivity & security** and copy the connection string.

![](@site/static/img/aws-documentdb/aws-documentdb-7.png)

## Step 4: Connect AMS

From `/usr/local/antmedia` on each node:

```bash
sudo ./change_server_mode.sh cluster mongodb+srv://username:password@url
```

Example with a standard MongoDB URI:

```bash
sudo ./change_server_mode.sh cluster "mongodb://testadmin:password@docdb-2024-08-25-19-28-55.cluster-crg1b1lxnbdb.ap-south-1.docdb.amazonaws.com:27017/?replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false"
```

For containers or Kubernetes, pass the same URI via `start.sh -h` instead.

## Verify

Open the web panel **Cluster** view and confirm all nodes registered against DocumentDB.

## Related guides

| Topic | Guide |
|-------|-------|
| Database overview | [Databases](/guides/clustering-and-scaling/supported-databases/) |
| Self-managed MongoDB | [Scaling with Self-Managed MongoDB](/guides/clustering-and-scaling/supported-databases/scaling-with-mongodb/) |
| MongoDB Atlas | [Scaling with MongoDB Atlas](/guides/clustering-and-scaling/supported-databases/scaling-with-mongodb-atlas/) |
| AWS deployment | [Choose AWS Deployment](/guides/clustering-and-scaling/aws/choose-aws-deployment/) |
