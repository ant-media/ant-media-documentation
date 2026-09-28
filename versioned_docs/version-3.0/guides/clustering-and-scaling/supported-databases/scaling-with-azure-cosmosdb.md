---
title: Scaling with Azure CosmosDB
description: Use Azure Cosmos DB for MongoDB (vCore) as the shared database for Ant Media Server clustering.
keywords: [Azure Cosmos DB, Ant Media Server cluster, Ant Media Server Documentation]
sidebar_position: 5
sidebar_label: Azure CosmosDB
---

# Scaling with Azure Cosmos DB

Azure Cosmos DB for MongoDB (vCore cluster) is a fully managed MongoDB-compatible service on Azure. Use it when your AMS cluster runs on Azure and you want managed scaling and high availability.

See [Databases](/guides/clustering-and-scaling/supported-databases/) for general connection guidance.

## Prerequisites

- AMS nodes can reach Cosmos DB over the network (firewall and VNet rules configured)
- An Azure subscription
- **Azure Cosmos DB for MongoDB** with the **vCore cluster** resource type (not the older API-only options)

## Step 1: Create a vCore cluster

1. In the [Azure Portal](https://portal.azure.com/), select **Create a resource**.
2. Search for **Azure Cosmos DB** and select **Create**.
3. On **Which API best suits your workload?**, choose **Azure Cosmos DB for MongoDB**, then **Create**.

![](@site/static/img/clustering-and-scaling/scale-with-azure-cosmosdb/1-create-azure-cosmos-db1.webp)

4. On **Which type of resource?**, select **Create** under **vCore cluster**.
5. Under **Cluster tier**, click **Configure**.

![](@site/static/img/clustering-and-scaling/scale-with-azure-cosmosdb/2-configure-option.webp)

6. On the **Scale** page, adjust capacity if needed (defaults work for testing).

![](@site/static/img/clustering-and-scaling/scale-with-azure-cosmosdb/3-scale.webp)

7. Enable **High availability** for production, or acknowledge the HA warning for dev/test. Click **Save**.
8. Enter cluster details (name, region, administrator credentials).

![](@site/static/img/clustering-and-scaling/scale-with-azure-cosmosdb/4-details.webp)

![](@site/static/img/clustering-and-scaling/scale-with-azure-cosmosdb/4a-details.webp)

9. Continue through **Global distribution** and **Networking**.
10. On the **Networking** tab, allow access from Azure services and add a firewall rule for your AMS hosts.

![](@site/static/img/clustering-and-scaling/scale-with-azure-cosmosdb/5-network.webp)

11. Select **Review + create**, then **Create**. When deployment completes, open the cluster resource.

![](@site/static/img/clustering-and-scaling/scale-with-azure-cosmosdb/6-complete.webp)

Copy the MongoDB connection string from the cluster overview.

## Step 2: Connect AMS

From `/usr/local/antmedia` on each node:

```bash
sudo ./change_server_mode.sh cluster mongodb+srv://username:password@url
```

Example:

```bash
sudo ./change_server_mode.sh cluster "mongodb://username:password@cosmosdb-account-name.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retryWrites=false"
```

For containers, pass the same URI through `start.sh -m cluster -h`.

## Verify

Open the web panel **Cluster** view and confirm every node appears after connecting with the same URI.

## Related guides

| Topic | Guide |
|-------|-------|
| Database overview | [Databases](/guides/clustering-and-scaling/supported-databases/) |
| Self-managed MongoDB | [Scaling with Self-Managed MongoDB](/guides/clustering-and-scaling/supported-databases/scaling-with-mongodb/) |
| Azure cluster setup | [Setup AMS Clustering at Azure](/guides/clustering-and-scaling/azure/setup-ams-clustering-at-azure/) |
| MongoDB Atlas | [Scaling with MongoDB Atlas](/guides/clustering-and-scaling/supported-databases/scaling-with-mongodb-atlas/) |
