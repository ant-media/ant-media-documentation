---
title: Docker Swarm
description: Docker Swarm
keywords: [Docker Swarm, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

# Docker Swarm

Docker Swarm clusters multiple Docker hosts into a single pool, distributing AMS across nodes and replacing failed containers automatically.

![](@site/static/img/image-1648753338859.png)

## Prerequisites

Three instances — one manager, two workers:

```
192.168.1.230  manager
192.168.1.231  node1
192.168.1.232  node2
```

Install Docker CE on all three:

```bash
sudo apt-get update
sudo apt-get install -y ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
  -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] \
  https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update && sudo apt-get install -y docker-ce
sudo systemctl enable docker
```

## Initialize the Cluster

On the **manager**:

```bash
sudo docker swarm init --advertise-addr 192.168.1.230
```

On **node1** and **node2** — use the token printed by the init command:

```bash
sudo docker swarm join --token <SWMTKN-...> 192.168.1.230:2377
```

Verify all nodes are visible:

```bash
docker node ls
```

![](@site/static/img/image-1648753377587.png)

## Nginx Load Balancer

Create `/opt/nginx/default.conf` on all nodes:

```conf
server {
    listen 80;
    location / {
        proxy_pass http://backend;
    }
}
upstream backend {
    ip_hash;
    server 192.168.1.231:5080;  # node1
    server 192.168.1.232:5080;  # node2
}
```

Deploy the Nginx service from the manager:

```bash
docker service create \
  --name nginx \
  --mount type=bind,source=/opt/nginx/,target=/etc/nginx/conf.d \
  --constraint node.hostname==master \
  --publish 80:80 \
  nginx
```

## Deploy Ant Media Server

Save the following as `stack.yml`. Replace `<YOUR_IMAGE_URL>` with your AMS image and `<MONGO_HOST>` with your MongoDB address.

```yaml
services:
  antmedia:
    image: <YOUR_IMAGE_URL>
    entrypoint: /usr/local/antmedia/start.sh
    command: ["-r", "true", "-m", "cluster", "-h", "<MONGO_HOST>"]
    deploy:
      mode: global
      resources:
        limits:
          cpus: "4"
          memory: 8G
      restart_policy:
        condition: on-failure
    ports:
      - target: 5080
        published: 5080
        mode: host
      - target: 4443
        published: 4443
        protocol: tcp
        mode: host
      - target: 4443
        published: 4443
        protocol: udp
        mode: host
      - target: 1935
        published: 1935
        mode: host
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5080"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

:::info
The resource limits above (`cpus: "4"`, `memory: 8G`) are a starting point for nodes handling live transcoding. Scale down for edge or relay-only nodes.

In Docker Swarm, `network_mode: host` is not valid at the service level. Use `mode: host` on individual port entries as shown above — this bypasses the Swarm mesh network and binds directly to the host interface, which is required for WebRTC UDP to work correctly.
:::

Deploy the stack:

```bash
docker stack deploy -c stack.yml ant-media-server
```

Monitor running services:

```bash
docker service ls
docker ps
```

![](@site/static/img/image-1648753399859.png)
