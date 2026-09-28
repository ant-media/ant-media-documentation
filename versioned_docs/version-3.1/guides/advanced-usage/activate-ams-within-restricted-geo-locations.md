---
title: Active License in Restricted Regions
description: Activate Ant Media Server Enterprise licenses from regions where Google license verification is blocked, using Ant Media's proxy or a self-hosted Squid server.
keywords: [Activate AMS within self-hosted proxy server, restricted geo locations, proxy server, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 12
---

# Active License in Restricted Regions

Ant Media Server verifies **Enterprise licenses** through **Google Cloud** endpoints. In some regions— notably **China and Hong Kong**— those services are unreachable, so license activation fails from the dashboard.

Use one of two proxy paths: Ant Media's **free Enterprise proxy**, or a **self-hosted Squid** server in an unrestricted region that forwards verification traffic for you.

![License verification through a proxy server](@site/static/img/ams-proxy.png)

## What you'll accomplish

By the end of this guide, you will:

1. Choose between Ant Media's **Enterprise proxy** and a **self-hosted Squid** proxy.
2. Configure `proxy.address` in Ant Media Server so license checks route through the proxy.
3. Confirm license verification works from a restricted network.

## When you need a proxy

You need proxy-based license verification when:

- Ant Media Server runs in a region where **Google services are blocked or restricted**.
- Entering a license key in the dashboard fails with connectivity or verification errors.
- Direct access to `us-central1-ant-media-server-license.cloudfunctions.net` is not available from your server.

## Prerequisites

Before you begin, confirm the following:

- An **Ant Media Server Enterprise** installation with a valid license key.
- Root or `sudo` access to edit `/usr/local/antmedia/conf/red5.properties` and restart Ant Media Server.
- For the **self-hosted** option: an **Ubuntu 20.04 or 22.04** server in an **unrestricted region** to run Squid.

## Option A: Ant Media Enterprise proxy (recommended)

Ant Media provides a hosted proxy **free for Enterprise customers**.

1. Email [support@antmedia.io](mailto:support@antmedia.io) to request proxy credentials (username and password).
2. Add the proxy setting on your Ant Media Server host:

```bash
echo "proxy.address=username:password@license-verification.antmedia.io:80" | sudo tee -a /usr/local/antmedia/conf/red5.properties
sudo systemctl restart antmedia
```

Replace `username` and `password` with the values from Ant Media support.

3. Open the Ant Media Server dashboard, go to license settings, and enter your license key.

## Option B: Self-hosted Squid proxy

Run Squid on a server outside the restricted region, then point Ant Media Server at it.

### Step 1: Install Squid

On Ubuntu 20.04 or 22.04 in an unrestricted region:

```bash
sudo apt update
sudo apt install -y squid apache2-utils
```

### Step 2: Back up and edit Squid configuration

```bash
sudo mv /etc/squid/squid.conf /etc/squid/squid.conf_bck
sudo vim /etc/squid/squid.conf
```

Add the following configuration:

```text
acl whitelist dstdomain us-central1-ant-media-server-license.cloudfunctions.net
acl SSL_ports port 443
http_access deny !Safe_ports
http_access deny CONNECT !SSL_ports
http_access allow localhost manager
http_access deny manager
include /etc/squid/conf.d/*.conf
auth_param basic program /usr/lib/squid/basic_ncsa_auth /etc/squid/passwords
auth_param basic realm proxy
acl authenticated proxy_auth REQUIRED
http_access allow localhost
http_access allow authenticated whitelist
http_access deny all
http_port 3199
coredump_dir /var/spool/squid
refresh_pattern ^ftp:		1440	20%	10080
refresh_pattern ^gopher:	1440	0%	1440
refresh_pattern -i (/cgi-bin/|\?) 0	0%	0
refresh_pattern \/(Packages|Sources)(|\.bz2|\.gz|\.xz)$ 0 0% 0 refresh-ims
refresh_pattern \/Release(|\.gpg)$ 0 0% 0 refresh-ims
refresh_pattern \/InRelease$ 0 0% 0 refresh-ims
refresh_pattern \/(Translation-.*)(|\.bz2|\.gz|\.xz)$ 0 0% 0 refresh-ims
refresh_pattern .		0	20%	4320
```

Squid listens on port **3199** and allows authenticated access only to the license verification domain.

### Step 3: Create proxy credentials

```bash
sudo htpasswd -c /etc/squid/passwords username
sudo systemctl restart squid
```

Replace `username` with your chosen proxy user and set a strong password when prompted.

### Step 4: Test the proxy

From a host that can reach the proxy server, run:

```bash
curl -x "http://username:password@your_proxy_server:3199" -X POST \
  -H "Content-Type: application/json" \
  https://us-central1-ant-media-server-license.cloudfunctions.net/license_valid \
  -d '{"key":"your_license_key"}' -w "\n"
```

A response containing `"valid"` confirms the proxy can reach the license endpoint.

### Step 5: Configure Ant Media Server

On the Ant Media Server host in the restricted region, add your **self-hosted** proxy (not the Enterprise hostname):

```bash
echo "proxy.address=username:password@your_proxy_server:3199" | sudo tee -a /usr/local/antmedia/conf/red5.properties
sudo systemctl restart antmedia
```

Replace `username`, `password`, and `your_proxy_server` with your Squid credentials and server address.

Enter your license key in the dashboard settings.

## Related guides

- [Enterprise Deployment Hub](/enterprise-guide/) — production checklist including licensing.
- [WebRTC in Restricted Networks](/guides/advanced-usage/overcoming-restricted-networks-webrtc-ams/) — streaming connectivity in locked-down networks (separate from license verification).

## Troubleshooting

| Symptom | What to check |
|---------|----------------|
| License verification still fails after adding proxy | `proxy.address` syntax is `user:pass@host:port`; Ant Media Server restarted; proxy host reachable from the AMS server on the configured port. |
| Squid `curl` test returns error or timeout | Squid running (`sudo systemctl status squid`); port **3199** open; credentials match `/etc/squid/passwords`; whitelist domain unchanged. |
| Dashboard accepts key on unrestricted network but not in restricted region | Proxy option configured and active; use Enterprise proxy or confirm self-hosted Squid runs outside the restricted region. |
