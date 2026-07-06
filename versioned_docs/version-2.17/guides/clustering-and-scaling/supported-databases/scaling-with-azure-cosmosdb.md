---
title: Scaling with Azure CosmosDB
description: Using Azure CosmosDB with AMS
keywords: [Using Azure CosmosDB with AMS, CosmosDB, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 12
---

Azure Cosmos DB is a fully managed, globally distributed database service designed for scalability and high availability with MongoDB workloads. It simplifies database deployment and management while providing automatic scaling, low latency, and multi-region availability.

In this document, we'll explain how to use Azure Cosmos DB with Ant Media Server.

### Prerequisites

- Your AMS (standalone or cluster) server should be able to connect to Cosmos DB.
- An Azure account with an active subscription and ensure the MongoDB vCore API is selected while creating the Cosmos DB instance.
- The AMS server must have outbound access to Cosmos DB’s connection string (check firewall and VNet settings).

## Creating Azure CosmosDB

Follow the below steps to create a Cosmos DB cluster and connect AMS to the database

### Create a Cluster

1. Sign in to the Azure Portal and navigate to Create a resource from the menu or Home page.
2. From the Azure Portal menu or Home page, select Create a resource.
3. On the New page, search for Azure Cosmos DB and select it.
4. On the **Which API best suits your workload?** page, choose **Azure Cosmos DB for MongoDB**, then click **Create**.

![](@site/static/img/clustering-and-scaling/scale-with-azure-cosmosdb/1-create-azure-cosmos-db1.webp)

5. On the **Which type of resource?** page, select the **Create** option within the **vCore cluster** section. 
6. On the **Create Azure Cosmos DB for MongoDB cluster** page, select the **Configure** option within the **Cluster tier** section.

![](@site/static/img/clustering-and-scaling/scale-with-azure-cosmosdb/2-configure-option.webp)

7. On the **Scale** page, leave the options set to their default values:

![](@site/static/img/clustering-and-scaling/scale-with-azure-cosmosdb/3-scale.webp)

8. Select the **High availability** option if this cluster will be used for production workloads. If not, in the high availability (HA) acknowledgment section, select **I understand**. Finally, select **Save** to persist your changes to the cluster tier.
9. Back on the cluster page, enter the following information:

![](@site/static/img/clustering-and-scaling/scale-with-azure-cosmosdb/4-details.webp)

![](@site/static/img/clustering-and-scaling/scale-with-azure-cosmosdb/4a-details.webp)

10. Select Next: Global distribution.
11. Select Next: Networking.
12. In the Firewall rules section on the Networking tab, select Allow public access from Azure services and resources within Azure to this cluster. Additionally, add a firewall rule to give your client device or applications access to the cluster.

![](@site/static/img/clustering-and-scaling/scale-with-azure-cosmosdb/5-network.webp)

13. Select Review + create.
14. Review the settings you provide, and then select Create. It takes a few minutes to create the cluster. Wait for the portal page to display Your deployment is complete before moving on.
15. Select Go to resource to go to the Azure Cosmos DB for MongoDB cluster page.

![](@site/static/img/clustering-and-scaling/scale-with-azure-cosmosdb/6-complete.webp)

### Connect AMS to CosmosDB cluster

To connect AMS with CosmosDB, you need to use the `mongodb+srv` connection string copied from the cluster in the above steps.

Now go to `/usr/local/antmedia` directory and run the below command:

```bash
sudo ./change_server_mode.sh cluster mongodb+srv://username:password@url
```

Here is the sample command to connect with CosmosDB.

```bash
sudo ./change_server_mode.sh cluster "mongodb://username:password@cosmosdb-account-name.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retryWrites=false"
```


<div align="center">
  <h2> 🎉 Cosmos DB + AMS — Global Streaming, Effortless Delivery!🚀 </h2>
</div>

Look at that! Your Ant Media Server is now **powered by Cosmos DB**, making your streams faster, more reliable, and ready to wow your audience.

With this setup, **scaling for big events or a growing viewer base is a breeze**. Sit back, launch your streams, and let Cosmos DB do the heavy lifting! 🎥✨
