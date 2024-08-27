---
title: Scaling with AWS DocumentDB
description: Using AWS DocumentDB with AMS
keywords: [Using DocumentDB with AMS, AWS DocumentDB, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 11
---

AWS DocumentDB is a managed database service designed for scalability, high availability, and compatibility with MongoDB workloads. It simplifies the deployment and management of databases while providing the flexibility to build robust and performant global applications on AWS.

In this document, we'll explain how to use AWS DocumentDB with Ant Media Server.

### Prerequisites

- Your AMS (standalone or cluster) server should operate on the same VPC as your DocumentDB.
- TLS must be disabled in DocumentDB.

## Creating AWS DocumentDB

Follow below steps to create Document DB cluster and connect AMS to the database.

### Create Parameter Groups

First, open the Amazon DocumentDB service and go to the `Parameter groups` sections, as shown below.

![](@site/static/img/aws-documentdb/aws-documentdb-1.png)

Now, create Parameter Groups to disable TLS.

![](@site/static/img/aws-documentdb/aws-documentdb-2.png)

Select `tls` from the cluster parameters, click Edit and disable TLS.

![](@site/static/img/aws-documentdb/aws-documentdb-3.png)


### Create Document DB cluster

Now go to the Clusters tab and click the Create button to create a new cluster. Select the instance class and number of instances as required.

![](@site/static/img/aws-documentdb/aws-documentdb-4.png)

Their is no need to change any parameter. Define your username and password for authentication and then go to advanced settings.

![](@site/static/img/aws-documentdb/aws-documentdb-5.png)

In advance settings, choose the Cluster Parameter Group you created in previous step, and click Create to create your cluster.

![](@site/static/img/aws-documentdb/aws-documentdb-6.png)

Once the DocumentDB setup is complete, select your cluster, go to the Connectivity & Security tab, and obtain the connection string. 

You can now use this information in Ant Media Server.

![](@site/static/img/aws-documentdb/aws-documentdb-7.png)


### Connect AMS to Document DB cluster

To connect AMS with Document DB, you need to use the `mongodb+srv` connection string copied from the cluster in above steps.

Now go to `/usr/local/antmedia` directory and run below command:

```bash
sudo ./change_server_mode.sh cluster mongodb+srv://username:password@url
```

Here is the sample command to connect with Document DB.

```bash
sudo ./change_server_mode.sh cluster "mongodb://testadmin:password@docdb-2024-08-25-19-28-55.cluster-crg1b1lxnbdb.ap-south-1.docdb.amazonaws.com:27017/?replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false"
```
