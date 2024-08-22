---
title: Cluster Installation
description: AMS can run in cluster mode to increase the number of viewers and publishers. You can publish a live stream to one node of AMS in the cluster and you can watch the stream in another node in the cluster.
keywords: [Ant Media Cluster Mode, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

# Cluster installation

Ant Media Server (AMS) can be deployed in a cluster configuration to enhance scalability and reliability. This setup allows multiple AMS nodes to work together, thereby increasing the number of viewers and publishers that can be supported. In simpler terms, you can publish a live stream to one AMS node within the cluster, and that stream can be viewed from another node within the same cluster.

![](@site/static/img/origin_edge.png)

## Components of an AMS Cluster
To better understand how an AMS cluster operates, it's essential to know the roles of its key components:

1. **Database (MongoDB):**
The database is central to the AMS cluster, storing all stream-related information. This data includes bitrates, settings, the origin node of the stream, and additional metadata necessary for stream management. The database ensures that all nodes in the cluster have consistent access to this information, facilitating seamless streaming across different nodes.

2. **Origin Group:**
The origin group consists of AMS nodes responsible for ingesting live streams. These nodes perform various tasks such as transcoding (converting streams to different formats or bitrates) and transmuxing (changing the container format of the stream). Once processed, the streams are distributed to nodes within the edge group. Importantly, viewers do not connect directly to origin group nodes for playback. It is recommended that nodes in this group be equipped with a GPU, especially if adaptive bitrate streaming is enabled.

3. **Edge Group:**
The edge group contains AMS nodes that receive streams from the origin group nodes and deliver them to viewers. Unlike origin nodes, edge nodes do not ingest streams or perform tasks such as transcoding or transmuxing. Their sole purpose is to fetch the stream from an origin node and forward it to the viewers, ensuring efficient distribution of content.

4. **Load Balancer (Nginx or HAProxy):**
The load balancer acts as the entry point for both viewers and publishers. It receives user requests and intelligently directs them to an appropriate node in either the origin or edge group, based on the current load and availability of resources. The load balancer is crucial for distributing traffic evenly across the cluster, thereby optimizing performance and avoiding overloading any single node.

## Basics of Clustering
The following steps outline the basic operations of an AMS cluster:

- Instance Registration: Each AMS node registers itself with the MongoDB database upon startup.
- Stream Origin Assignment: When a node begins receiving a live stream, it registers itself as the origin node for that stream in the database.
- Load Balancer Operations: When the load balancer receives a playback request, it forwards the request to an edge group node:
  1. The edge node retrieves the stream's origin information from MongoDB.
  2. The edge node then fetches the stream from the origin node.
  3. Finally, the edge node distributes the stream to the requesting viewers.

**Important Note:** Ensure that TCP port range 5000-65000 is open on the internal network. These ports should not be exposed to the public internet to maintain security.


## 1. Installing Ant Media Server (AMS)
Before configuring AMS for cluster mode, you first need to install AMS on each server (node) that will be part of the cluster. Follow these steps:

1. **Download the AMS Installation Script:**
Download and prepare the AMS installation script by running the following command:

```shell
wget -O install_ant-media-server.sh https://raw.githubusercontent.com/ant-media/Scripts/master/install_ant-media-server.sh && sudo chmod 755 install_ant-media-server.sh
```

2. **Run the Installation Script:**
Execute the script to install AMS:

- Community Edition
```shell
sudo ./install_ant-media-server.sh
```

- Enterprise Edition
```shell
sudo ./install_ant-media-server.sh -l 'your-license-key'
```

This will install AMS in standalone mode by default. Repeat this process on each server you intend to include in the cluster.

For more details go to [this link](https://antmedia.io/docs/guides/installing-on-linux/installing-ams-on-linux/)


## 2. Installing MongoDB
MongoDB acts as the central database for your AMS cluster, storing stream-related data that ensures consistency across all nodes.

1. **Download and Run the MongoDB Installation Script:**
Download the MongoDB installation script with the following command:

```shell
wget https://raw.githubusercontent.com/ant-media/Scripts/master/install_mongodb.sh && chmod +x install_mongodb.sh
```

2. **Install MongoDB:**
Run the script to install the latest version of MongoDB:

```shell
./install_mongodb.sh
```
-**Optional:** To enable authentication (highly recommended for security), use the --auto-create parameter. This generates a random username and password for your MongoDB server:
```shell
./install_mongodb.sh --auto-create
```

3. **Configure MongoDB Limits:**
If you are using MongoDB 4.4 or later, ensure that the open files limit (ulimit) is set appropriately to avoid startup errors. Add the following lines to /etc/security/limits.conf:

```shell
root soft       nproc          65535  
root hard       nproc          65535   
root soft       nofile         65535   
root hard       nofile         65535
mongodb soft    nproc          65535
mongodb hard    nproc          65535
mongodb soft    nofile         65535
mongodb hard    nofile         65535
```

4. **Bind MongoDB to All Network Interfaces:**
Modify the mongodb.conf file to set the bind address to 0.0.0.0. This allows MongoDB to listen on all available network interfaces. Ensure you secure your MongoDB instance, especially if you don’t have a firewall, to avoid unauthorized access.


## 3. Switching AMS to Cluster Mode
Once AMS is installed on all servers and MongoDB is set up, you can configure AMS to run in cluster mode.

1. ### Switch to Cluster Mode:
To configure each AMS node to operate in cluster mode, run the following command:

**Without MongoDB Credentials:**
```shell
cd /usr/local/antmedia
sudo ./change_server_mode.sh cluster <MONGODB_SERVER_IP>
```

**With MongoDB Credentials:**
If you set up MongoDB with authentication, include the credentials in the command:
```shell
cd /usr/local/antmedia
sudo ./change_server_mode.sh cluster <MONGODB_SERVER_IP> <MONGODB_USERNAME> <MONGODB_PASSWORD>
```

**Using MongoDB Atlas:**
For MongoDB Atlas or other cloud-based MongoDB instances, provide the full connection string:
```shell
sudo ./change_server_mode.sh cluster mongodb+srv://<username>:<password>@<url>/<name>?<params>
```

Repeat this process on every node in the cluster.

2. ### Monitor Cluster Nodes:
Once all nodes are configured in cluster mode, you can monitor them through the AMS dashboard by visiting the following URL on any node:

```shell
http://<ANT_MEDIA_SERVER_NODE_IP>:5080/#/cluster
```

## Installing the load balancer
Install the load balancer using either one of the below two options. AMS uses Nginx by default, bu you can also use HAProxy as your load balancer. You can read how to install either of these options in the documents below.

- [Nginx Load Balancer](https://antmedia.io/docs/guides/clustering-and-scaling/load-balancing/nginx-load-balancer/)
- [HAProxy Load Balancer](https://antmedia.io/docs/guides/clustering-and-scaling/load-balancing/load-balancer-with-haproxy-ssl-termination/)
