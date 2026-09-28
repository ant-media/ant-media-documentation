---
title: AMS Cloudflare Integration
description: Put Ant Media Server behind Cloudflare with Full (strict) SSL, an origin certificate, and Nginx as a reverse proxy.
keywords: [Ant Media Server Cloudflare, Cloudflare SSL, Nginx reverse proxy, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 7
---

# AMS Cloudflare Integration

Broadcast and play **WebRTC**, **HLS**, and **DASH** through Ant Media Server with **Cloudflare** in front. Cloudflare terminates SSL for clients; Nginx on your origin proxies traffic to Ant Media Server.

![](@site/static/img/cloudflare/antmedia-cloudflare.png)

## What you'll accomplish

By the end of this guide, you will:

1. Set Cloudflare SSL/TLS mode to **Full (strict)** and create an **origin certificate**.
2. Install the origin certificate on your server and configure **Nginx** as a reverse proxy to Ant Media Server.
3. Confirm the Ant Media Server web panel is reachable through your Cloudflare domain over HTTPS.

## How it works

```text
Client → Cloudflare (SSL) → Nginx (origin SSL) → Ant Media Server (:5080)
```

Cloudflare encrypts traffic to your origin using the origin certificate. Nginx listens on **443**, presents that certificate, and proxies requests (including WebSocket upgrades for WebRTC) to Ant Media Server on **5080**.

## Prerequisites

Before you begin, confirm the following:

- A domain managed in **Cloudflare**.
- Ant Media Server installed on a host with a public IP (or reachable from Cloudflare).
- Permission to create an origin certificate in Cloudflare and to install **Nginx** on the origin.
- An **A** (or CNAME) DNS record for your hostname pointing at the origin, with the **Proxied** (orange cloud) status enabled.

## Step 1: Configure Cloudflare SSL and origin certificate

1. Log in to Cloudflare and open your domain.
2. Go to **SSL/TLS → Overview** and set the encryption mode to **Full (strict)**.

   ![](@site/static/img/cloudflare/antmedia-cloudflare-1.png)

3. Open **SSL/TLS → Origin Server** and click **Create Certificate**.

   ![](@site/static/img/cloudflare/antmedia-cloudflare-2.png)

4. Configure the hostnames for your Ant Media Server domain, then click **Create**.

   ![](@site/static/img/cloudflare/antmedia-cloudflare-3.png)

5. Copy the **Origin Certificate** and **Private Key**. Save them on the Nginx host (for example as `origin.pem` and `privkey.pem`).

   ![](@site/static/img/cloudflare/antmedia-cloudflare-4.png)

6. In **DNS**, confirm the record for your hostname is **Proxied** (orange cloud enabled).

## Step 2: Install and configure Nginx

1. Install Nginx by following [Nginx installation](/guides/clustering-and-scaling/load-balancing/nginx-load-balancer/#nginx-installation).

2. Create the SSL directory and copy the origin certificate and private key:

   ```bash
   sudo mkdir -p /etc/nginx/ssl
   sudo cp -p origin.pem privkey.pem /etc/nginx/ssl/
   ```

3. Create a virtual host configuration file:

   ```bash
   sudo vim /etc/nginx/conf.d/antmedia.conf
   ```

4. Add the following configuration. Replace `antmedia.space` with your hostname and adjust certificate filenames if needed:

   ```nginx
   server {
       listen 443 ssl;
       ssl_certificate /etc/nginx/ssl/origin.pem;
       ssl_certificate_key /etc/nginx/ssl/privkey.pem;
       server_name antmedia.space;

       location / {
           proxy_pass http://127.0.0.1:5080;
           proxy_http_version 1.1;
           proxy_connect_timeout 7d;
           proxy_send_timeout 7d;
           proxy_read_timeout 7d;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header Host $host;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection "Upgrade";
       }
   }
   ```

   The `Upgrade` and `Connection` headers are required so WebSocket (WebRTC signaling) works through the proxy.

5. Test the configuration and restart Nginx:

   ```bash
   sudo nginx -t
   sudo systemctl restart nginx
   ```

## Step 3: Access the Ant Media Server panel

Open `https://{YOUR_DOMAIN}` in a browser (for example `https://antmedia.space`). You should reach the Ant Media Server web panel through Cloudflare.

![](@site/static/img/cloudflare/antmedia-cloudflare-5.png)

You can now publish and play WebRTC, HLS, and DASH using that hostname.

---

## Troubleshooting

| Symptom | What to check |
|---------|----------------|
| Cloudflare SSL error / infinite redirect | Encryption mode is **Full (strict)** (not Flexible); origin serves HTTPS on **443** with the Cloudflare origin certificate. |
| 525 SSL handshake failed | Origin certificate and private key paths in Nginx match the files you copied; certificate covers the hostname. |
| 502 Bad Gateway | Ant Media Server is running on `127.0.0.1:5080`; Nginx can reach it (`curl http://127.0.0.1:5080`). |
| WebRTC fails but HTTP works | Nginx includes `Upgrade` and `Connection` headers; timeouts are long enough for long-lived WebSocket sessions. |
| Domain does not resolve through Cloudflare | DNS **A**/**CNAME** record is **Proxied**; wait for DNS propagation if the record was just created. |
| `nginx -t` fails | Certificate file paths and `server_name` are correct; no syntax errors in `antmedia.conf`. |
