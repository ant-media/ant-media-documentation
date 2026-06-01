---
title: Docker Swarm 
description: Docker Swarm
keywords: [Docker Swarm, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

# Docker Swarm

Docker Swarm is a container orchestration tool. It is a cluster management tool that manages and scales virtual servers as a cluster and ensures the continuity of services without interruption. In this post, I will explain how to run Ant Media Server onto the docker swarm.

![](@site/static/img/image-1648753338859.png)

### Prerequisites:

First, let’s create a total of 3 instances, one Manager and 2 worker nodes.

```shell
192.168.1.230 Manager
192.168.1.231 Node1
192.168.1.232 Node2
```

Docker Swarm is easy to install. You can divide it into two parts as Manager Node and Worker Node.

1- Manager Nodes: This node manages the Docker Swarm..

2- Worker Nodes: These nodes run the services/tasks assigned to them..

Install the Docker CE on all of the nodes by following the steps below.

```shell
sudo apt install apt-transport-https ca-certificates curl software-properties-common -y
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
sudo apt update && sudo apt install docker-ce -y
sudo systemctl enable docker
``` 

### Docker Swarm Cluster Installation

In order to create a Docker Swarm cluster, you have to start the swarm mode first.

Run the command below to initialize Docker swarm node on the manager.

```shell
sudo docker swarm init --advertise-addr 192.168.1.230
```

Run the following command on node1 and node2.

```shell
sudo docker swarm join --token SWMTKN-1-2jxta71638d1pyioznb9jo4hi4u5ppd8t7lc90linwi9acu54s-aef4mqdy23ktrkcxsp57uyoma 192.168.1.230:2377
```

The all nodes you added will show up in the **docker node ls** command’s output.

![](@site/static/img/image-1648753377587.png)

### Nginx Load Balancer Installation

Create a directory called **/opt/nginx** on all nodes and save the following lines as **default.conf.**

```shell
mkdir /opt/nginx
vim /opt/nginx/default.conf
```
```conf
server {
    listen 80;
    location / {
      proxy_pass http://backend;
    }
}
upstream backend {
    ip_hash;
    server 192.168.1.231:5080; #node1 ip address
    server 192.168.1.232:5080; #node2 ip address
}
```  

Let’s complete the deployment on master.

```shell
docker service create --name nginx --mount type=bind,source=/opt/nginx/,target=/etc/nginx/conf.d --constraint node.hostname==master  --publish 80:80 nginx
```

### Ant Media Server Installation

On the master node, save the following lines as stack.yml. Don't forget to change the host addresses in the image and entrypoint according to your system.

```yaml
version: "3.9"
services:
  antmedia:
    image: your_image_url
    entrypoint: /usr/local/antmedia/start.sh -r true -m cluster -h your_mongo_db_address
    deploy:
      mode: global
      resources:
        limits:
          cpus: "0.5"
          memory: 1G
      restart_policy:
        condition: on-failure
    networks:
      - host

networks:
  host:
    name: host
    external: true
``` 

Then deploy the stack by running the command below.

```shell
docker stack deploy -c stack.yml ant-media-server
```   

You can monitor running services/containers using `docker service ls` or `docker ps`

Now, you can access your cluster via the master URL.

![](@site/static/img/image-1648753399871.png)

<div align="center">
  <h2> 🐳 AMS + Docker Swarm — Streaming at Scale, the Easy Way! 🚀 </h2>
</div>

And there it is — your Ant Media Server cluster is **alive and thriving inside Docker Swarm!** Services are humming, containers are collaborating, and scaling is just a heartbeat away.

You’ve built a streaming powerhouse from simple containers. **Now go ahead — launch those live events**, grow your audience, and let Swarm keep everything in perfect sync. 🎥🌊

