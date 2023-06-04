---
title: Cluster Installation
description: AMS can run in cluster mode to increase the number of viewers and publishers. You can publish a live stream to one node of AMS in the cluster and you can watch the stream in another node in the cluster.
keywords: [Ant Media Cluster Mode, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

# Cluster installation

Ant Media Server can run in cluster mode. This way, a number of AMS nodes can work together to increase the number of viewers and broadcasters. 

In other words, you can publish a live stream to one node of AMS in the cluster and you can watch the stream in another node in the cluster.

![](@site/static/img/origin_edge.png)

AMS cluster has 4 main components.

1. **Database (MongoDB):** Stream information is recorded to the database to let all nodes access the data. Stream information contains bitrates, settings, origin node of the stream, and other data.
2. **Origin group:** This group consists of AMS nodes that ingest streams and do the necessary actions such as transcoding, transmuxing, etc. Nodes in origin group distribute the streams to the nodes in the edge group. Viewers don't get connected to the nodes in the origin group to play streams. Nodes in the origin group are suggested to have GPU, if adaptive bitrates are enabled in the cluster.
3. **Edge group:** This group consists of AMS nodes that get streams from nodes in the origin group and send to the viewers. Nodes in this group should not ingest stream and these nodes don't not perform any actions like transcoding or transmuxing. They only get the stream from origin and send it to the viewers.
4. **Load balancer:** This component is the frontend for the viewers and publishers. It receives the request from the users and forwards the request to a node in the origin or edge group. It balances the incoming load into the nodes running in the backend.

## Basics of clustering

* Each instance registers itself to the MongoDB database.
* When an instance starts receiving a live stream, it registers itself as the origin of the stream.
* When the load balancer forwards a play request to any of the nodes in the edge group,
  * Node gets the stream origin from MongoDB.
  * Node fetches the stream from the origin node.
  * Node distributes the stream to viewers.

**Important note:** You need to open TCP port range (TCP:5000-65000) to the internal network. It should not be open to public.

To run AMS in a cluster please follow these steps.

## Installing the Mongodb database

You can install MongoDB to an instance or even you can make cluster installation for MongoDB. In this documentation, we explain how to install MongoDB to an Ubuntu Linux machine. As the commands are specific to Ubuntu, you can use corresponding Linux commands to deploy to a yum based Linux distribution as well.

Connect your instance and download the following script.

```shell
wget https://raw.githubusercontent.com/ant-media/Scripts/master/install_mongodb.sh && chmod +x install_mongodb.sh
```

Then run it and the latest version of MongoDB will be installed. If you run it without parameters, authentication will not be enabled.

```shell
./install_mongodb.sh
```
If you run it with the --auto-create parameter, then authentication will be enabled.

After MongoDB 4.4, if the amount of open files ulimit is below 64000, you may encounter a startup error. For this, add the following lines under `/etc/security/limits.conf`

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

We set 0.0.0.0 in the mongodb.conf. It means ```listen on every available network interface```. If you don't have a firewall, you will accept all connections from everywhere to your MongoDB server. We recommend adding security credentials to your MongoDB instance with the following commands.

If you want to enable authentication, you can still automate it using the `mongodb_install.sh ----auto-create` script. It will generate a random username and password

## Install the origin and edge groups

You can easily switch AMS from ```standalone``` mode to ```cluster``` mode or vice versa. Let's switch AMS from standalone mode to cluster mode.

In order to configure AMS run in cluster mode, you just need to run the below command.
<InfoBox>
If you have set up a username and password for MongoDB, then you need to pass the credentials in the command:
</InfoBox>

Note: If you set username and password authentication on MongoDB, you should run ```change_server_mode.sh``` as follows:

**Without credentials**

```shell
cd /usr/local/antmedia
sudo ./change_server_mode.sh cluster <MONGODB_SERVER_IP>
```
**With credentials**

```shell
cd /usr/local/antmedia
sudo ./change_server_mode.sh cluster <MONGODB_SERVER_IP> <MONGODB_USERNAME> <MONGODB_PASSWORD>`
```

For **MongoDB Atlas** connections, you can give the direct ```mongodb+srv``` URL as follows

```shell
sudo ./change_server_mode.sh cluster mongodb+srv://<username>:<password>@<url>/<name>?<params>
```

    http://<ANT_MEDIA_SERVER_NODE_IP>:5080/#/cluster

#### Basics of clustering

You can monitor all nodes in the cluster by visiting the web page below in any node.

`http://<ANT_MEDIA_SERVER_NODE_IP>:5080/#/cluster`

## Installing the load balancer

Install the load balancer using either one of the below two options. AMS uses Nginx by default, bu you can also use HAProxy as your load balancer. You can read how to install either of these options in the documents below.

* [Nginx Load Balancer](/guides/clustering-and-scaling/load-balancing/nginx-load-balancer/)
* [HAProxy Load Balancer](/guides/clustering-and-scaling/load-balancing/load-balancer-with-haproxy-ssl-termination/)
