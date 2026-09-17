---
title: Create Application
description: Create and manage Ant Media Server applications via the web panel, shell script, or REST API.
keywords: [Creating New Application, Ant Media Server Documentation]
sidebar_position: 1
sidebar_label: Create Application
---

# Create Application

An AMS **application** is an isolated streaming context with its own settings, streams, and WebSocket URL (`/{application}/websocket`). Use separate applications when you manage multiple tenants or product lines on one server.

AMS ships with default applications. You can create or delete applications as needed.

## Web panel

1. Log in to the web panel and open the **Dashboard**.
2. Click **New Application**.

![New application button](https://github.com/user-attachments/assets/4acae42f-e4a7-4e17-b585-17c8248e947e)

3. Enter the application name and click **Create**.

![Create application dialog](https://github.com/user-attachments/assets/546a3581-0dbb-494f-8600-0248fc0eaa8b)

:::info Cluster mode
In cluster mode, a new application is created on all nodes automatically. Deleting an application removes it from all nodes.
:::

## Shell script

From the AMS install directory (default `/usr/local/antmedia`):

```bash
cd /usr/local/antmedia
sudo ./create_app.sh -n livestream -p /usr/local/antmedia
```

| Flag | Description |
|------|-------------|
| `-n` | Application name (required) |
| `-p` | AMS install path (default `/usr/local/antmedia`) |
| `-w` | Deploy as WAR file (default `false`) |
| `-c` | Cluster mode (default `false`) |
| `-m`, `-u`, `-s` | MongoDB host, user, password (required in cluster mode) |

Script source: [create_app.sh](https://github.com/ant-media/Ant-Media-Server/blob/master/src/main/server/create_app.sh)

Restart AMS after creating an application:

```bash
sudo service antmedia restart
```

## REST API

Create or delete applications via the [Management REST API](/guides/developer-sdk-and-api/rest-api-guide/management-rest-apis/).

**Create:**

```bash
curl -X POST -H "Content-Type: application/json" \
  "https://your-domain:5443/rest/v2/applications/App_Name"
```

**Delete:**

```bash
curl -X DELETE "https://your-domain:5443/rest/v2/applications/App_Name"
```

## WebSocket URL

After creating an application named `livestream`:

- WSS: `wss://your-domain:5443/livestream/websocket`
- WS: `ws://your-ip:5080/livestream/websocket`

Use this URL in your [SDK clients](/guides/developer-sdk-and-api/sdk-integration/).
