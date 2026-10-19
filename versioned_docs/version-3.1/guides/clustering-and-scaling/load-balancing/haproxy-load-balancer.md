---
title: HAProxy Load Balancer
description: Configure HAProxy with SSL termination for an Ant Media Server cluster.
keywords: [HAProxy Load Balancer, SSL termination, Ant Media Server cluster, Ant Media Server Documentation]
sidebar_position: 2
sidebar_label: HAProxy
---

# HAProxy Load Balancer

HAProxy terminates SSL and distributes traffic across origin and edge nodes. It also exposes a stats page so you can monitor backend health.

See [Load Balancing](/guides/clustering-and-scaling/load-balancing/) for port layout and how this fits into the cluster.

![](@site/static/img/haproxyssltermination.png)

## What you'll accomplish

- Install HAProxy on an Ubuntu/Debian host
- Create a combined PEM certificate for HAProxy
- Configure origin, edge, dashboard, and RTMP frontends
- Restart HAProxy and confirm dashboard and stats access

## Prerequisites

- One server for the load balancer
- Origin and edge nodes in [cluster mode](/guides/clustering-and-scaling/manual-configuration/cluster-installation/)
- IP addresses of all origin and edge nodes
- A domain name pointing to the HAProxy host

## Step 1: Install HAProxy

```bash
sudo apt-get update
sudo apt-get install haproxy
```

## Step 2: Install SSL certificate

### Install Certbot

```bash
sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install certbot
```

### Obtain a certificate

Replace `example.com` with your domain:

```bash
sudo certbot certonly --standalone -d example.com -d www.example.com
```

### Combine PEM files for HAProxy

HAProxy expects a single PEM file that contains the certificate chain and private key:

```bash
sudo mkdir -p /etc/haproxy/certs
DOMAIN='example.com'
sudo -E bash -c "cat /etc/letsencrypt/live/$DOMAIN/fullchain.pem /etc/letsencrypt/live/$DOMAIN/privkey.pem > /etc/haproxy/certs/$DOMAIN.pem"
sudo chmod -R go-rwx /etc/haproxy/certs
```

The combined file is available at `/etc/haproxy/certs/example.com.pem`.

## Step 3: Configure HAProxy

Back up the default configuration:

```bash
sudo mv /etc/haproxy/haproxy.cfg{,_backup}
```

Create a new configuration:

```bash
sudo nano /etc/haproxy/haproxy.cfg
```

Replace `{AMS_ORIGIN1_IP}`, `{AMS_ORIGIN2_IP}`, `{AMS_EDGE1_IP}`, and `$DOMAIN` with your values. Update the stats username and password.

```
global
    log 127.0.0.1 local0 notice
    maxconn 2000
    user haproxy
    group haproxy

defaults
    log global
    mode http
    option forwardfor
    option http-server-close
    option httplog
    option dontlognull
    timeout connect 5000
    timeout client  5000
    timeout server  5000
    timeout tunnel  2h  # This is for websocket connections, 2 hours inactivity timeout
    timeout client-fin 5000
    errorfile 400 /etc/haproxy/errors/400.http
    errorfile 403 /etc/haproxy/errors/403.http
    errorfile 408 /etc/haproxy/errors/408.http
    errorfile 500 /etc/haproxy/errors/500.http
    errorfile 502 /etc/haproxy/errors/502.http
    errorfile 503 /etc/haproxy/errors/503.http
    errorfile 504 /etc/haproxy/errors/504.http

# Put the username and password for authentication

listen stats
    bind :6080
    mode http
    stats enable
    stats hide-version
    stats realm Haproxy\ Statistics
    stats uri /haproxy_stats
    stats auth username:password

frontend rtmp_lb
    bind *:1935
    mode tcp
    default_backend backend_rtmp

backend backend_rtmp
    mode tcp
    server ams1 {AMS_ORIGIN1_IP}:1935 check
    server ams2 {AMS_ORIGIN2_IP}:1935 check

frontend http_lb_origin
    bind *:80
    mode http
    http-request add-header X-Forwarded-Proto http
    default_backend origin_backend_http

frontend http_lb_edge
    bind *:5080
    mode http
    http-request add-header X-Forwarded-Proto http
    default_backend edge_backend_http

frontend frontend_origin_https
    bind *:443 ssl crt /etc/haproxy/certs/$DOMAIN.pem
    http-request add-header X-Forwarded-Proto https
    default_backend origin_backend_http

frontend frontend_edge_https
    bind *:5443 ssl crt /etc/haproxy/certs/$DOMAIN.pem
    http-request add-header X-Forwarded-Proto https
    default_backend edge_backend_http

backend origin_backend_http
    balance leastconn
    redirect scheme https if !{ ssl_fc }
    cookie JSESSIONID prefix nocache
    server origin1 {AMS_ORIGIN1_IP}:5080 check cookie origin1

backend edge_backend_http
    balance leastconn
    redirect scheme https if !{ ssl_fc }
    cookie JSESSIONID prefix nocache
    server edge1 {AMS_EDGE1_IP}:5080 check cookie edge1

frontend frontend_dashboard
    bind *:4444 ssl crt /etc/haproxy/certs/$DOMAIN.pem
    http-request add-header X-Forwarded-Proto https
    default_backend dashboard_backend_http

backend dashboard_backend_http
    balance leastconn
    redirect scheme https if !{ ssl_fc }
    cookie JSESSIONID prefix nocache
    server dashboard1 {AMS_ORIGIN1_IP}:5080 check cookie dashboard1
    server dashboard2 {AMS_EDGE1_IP}:5080 check cookie dashboard2
```

## Step 4: Start HAProxy

```bash
sudo systemctl restart haproxy
```

## Verify

| Check | URL |
|-------|-----|
| Web panel | `https://<your-domain>:4444` |
| HAProxy stats | `http://<your-domain>:6080/haproxy_stats` (use the credentials from the config) |

![](@site/static/img/haproxy_monitoring.png)

Publish a test stream through port `443` and play it through port `5443`. Healthy backends appear in the stats page.

## Related guides

| Topic | Guide |
|-------|-------|
| Load balancing overview | [Load Balancing](/guides/clustering-and-scaling/load-balancing/) |
| Nginx alternative | [Nginx Load Balancer](/guides/clustering-and-scaling/load-balancing/nginx-load-balancer/) |
| Cluster install | [Self-Managed Cluster](/guides/clustering-and-scaling/manual-configuration/cluster-installation/) |
