---
title: Docker Swarm
description: Deploy an Ant Media Server cluster on Docker Swarm with Nginx load balancing.
keywords: [Docker Swarm, Ant Media Server cluster, Ant Media Server Documentation]
sidebar_position: 2
sidebar_label: Docker Swarm
---

# Docker Swarm

Docker Swarm orchestrates AMS containers across multiple hosts—a manager node controls scheduling and worker nodes run the services. This guide walks through a minimal three-node Swarm with Nginx in front.

See [Docker](/guides/clustering-and-scaling/docker/) for how container clustering relates to the wider AMS architecture, and [Databases](/guides/clustering-and-scaling/supported-databases/) for the shared backend URI.

![](@site/static/img/image-1648753338859.png)

## What you'll accomplish

- Install Docker CE on one manager and two worker nodes
- Initialize a Swarm and join workers
- Deploy Nginx as the entry-point service
- Deploy AMS in cluster mode with a shared database URI

## Prerequisites

Plan three hosts—for example:

```text
192.168.1.230  Manager
192.168.1.231  Worker (Node1)
192.168.1.232  Worker (Node2)
```

- Ubuntu with Docker CE support
- A MongoDB or Redis URI reachable from all nodes
- Ant Media Server Enterprise Docker image (or build your own)

## Step 1: Install Docker CE on all nodes

Run on the manager and both workers:

```shell
sudo apt install apt-transport-https ca-certificates curl software-properties-common -y
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
sudo apt update && sudo apt install docker-ce -y
sudo systemctl enable docker
```

## Step 2: Initialize the Swarm

On the **manager**:

```shell
sudo docker swarm init --advertise-addr 192.168.1.230
```

The command prints a `docker swarm join` token. Run that command on **Node1** and **Node2**.

Example join command (use the token from your manager output):

```shell
sudo docker swarm join --token SWMTKN-1-2jxta71638d1pyioznb9jo4hi4u5ppd8t7lc90linwi9acu54s-aef4mqdy23ktrkcxsp57uyoma 192.168.1.230:2377
```

Confirm all nodes appear:

```shell
docker node ls
```

![](@site/static/img/image-1648753377587.png)

## Step 3: Deploy Nginx load balancer

Create `/opt/nginx/default.conf` on the manager (adjust worker IPs):

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

Deploy Nginx as a Swarm service pinned to the manager:

```shell
docker service create --name nginx --mount type=bind,source=/opt/nginx/,target=/etc/nginx/conf.d --constraint node.hostname==master --publish 80:80 nginx
```

For production, add TLS and separate origin/edge upstreams—see [Nginx Load Balancer](/guides/clustering-and-scaling/load-balancing/nginx-load-balancer/).

## Step 4: Deploy Ant Media Server

On the manager, create `stack.yml`. Replace the image URL, MongoDB/Redis address, and resource limits:

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

Deploy the stack:

```shell
docker stack deploy -c stack.yml ant-media-server
```

Monitor services:

```shell
docker service ls
docker ps
```

## Verify

Open the manager URL in a browser and confirm the AMS web panel loads.

![](@site/static/img/image-1648753399871.png)

Publish a test stream and play it back through the Nginx front end. Check the **Cluster** view in the web panel to confirm containers registered with the shared database.

## Related guides

| Topic | Guide |
|-------|-------|
| Docker overview | [Docker](/guides/clustering-and-scaling/docker/) |
| Database connection | [Databases](/guides/clustering-and-scaling/supported-databases/) |
| Full Nginx LB setup | [Nginx Load Balancer](/guides/clustering-and-scaling/load-balancing/nginx-load-balancer/) |
| Kubernetes alternative | [Kubernetes](/guides/clustering-and-scaling/kubernetes/prepare-environment-to-deploy-ams-at-kubernetes/) |
