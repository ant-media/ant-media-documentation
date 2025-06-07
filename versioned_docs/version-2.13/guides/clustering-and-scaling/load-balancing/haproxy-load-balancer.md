---
title: HAProxy Load Balancer
description: Load Balancer with HAProxy SSL Termination
keywords: [Load Balancer with HAProxy SSL Termination, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

# Load Balancer with HAProxy SSL Termination

The load balancer is the main part of the cluster. If you make Ant Media Server instances run in cluster mode, then a load balancer will be required to balance the load.

In this documentation, we will learn how to install HAProxy Load Balancer with SSL termination.

![](@site/static/img/haproxyssltermination.png)

## HAProxy Installation

Run the below commands to install HAProxy.

```bash
sudo apt-get update
sudo apt-get install haproxy
```

## SSL Certificate Installation

### Install the Certbot

```bash
sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install certbot
```

### Get the Certificate

Please change `example.com` with your domain name:

```bash
sudo certbot certonly --standalone -d example.com -d www.example.com
```

### Combine the PEM files

Combine `fullchain.pem` and `privkey.pem` and save it to the `/etc/haproxy/certs` folder.

```bash
sudo mkdir -p /etc/haproxy/certs
DOMAIN='example.com' 
sudo -E bash -c "cat /etc/letsencrypt/live/$DOMAIN/fullchain.pem /etc/letsencrypt/live/$DOMAIN/privkey.pem > /etc/haproxy/certs/$DOMAIN.pem"
sudo chmod -R go-rwx /etc/haproxy/certs
```

A valid pem file is now available under `/etc/haproxy/certs`, ready for use by HAProxy.

## Configure HAProxy

In this step, HAProxy will be set up as a load balancer.

### Backup default configuration file

```bash
sudo mv /etc/haproxy/haproxy.cfg{,_backup}
```

### Create new configuration file

```bash
sudo nano /etc/haproxy/haproxy.cfg
```

### HAProxy configuration as Load Balancer

```bash
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

## Start HAProxy

When everything is complete, restart the HAProxy

```bash
sudo systemctl restart haproxy
```

## Access Ant Media Server

You can access the Ant Media Server dashboard at https://haproxy-domain:4444

## Access the HAProxy web panel
 
You can view status of the Ant Media Server backend through 
`http://haproxy-domain:6080/haproxy_stats` URL.

You need to use the username and password as defined in the configuration above.

 ![](@site/static/img/haproxy_monitoring.png)
