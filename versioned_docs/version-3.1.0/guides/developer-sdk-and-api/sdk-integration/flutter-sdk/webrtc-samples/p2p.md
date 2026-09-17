---
title: P2P
description: Peer-to-peer WebRTC from the Flutter sample app.
keywords: [Flutter SDK, WebRTC P2P, Ant Media Server Documentation]
sidebar_position: 5
sidebar_label: P2P
---

Connect peer-to-peer from the Flutter sample app. Ant Media Server handles signaling only; media flows directly between peers.

## Configure the WebSocket URL

Before you start, set the server endpoint in the sample app **Settings**:

| Protocol | Example | When to use |
|----------|---------|-------------|
| **WSS** | `wss://your-domain:5443/live/websocket` | Production — requires [SSL](/guides/installing-on-linux/setting-up-ssl/) (port **5443**) |
| **WS** | `ws://your-ip:5080/live/websocket` | Local HTTP without SSL (port **5080**) |

Replace `live` with your application name. All publish, play, and other samples use this connection.

1. Tap the **Settings** icon in the top-right corner.

![settings](https://github.com/user-attachments/assets/0ee23ed3-62eb-4bd8-a2cd-55ffb5615e82)

2. Enter the WebSocket URL and tap **Set Server Ip**.

![server settings](https://github.com/user-attachments/assets/acbc2006-746c-49a0-97b7-2803bb0129da)

## Start P2P

1. Select **P2P** and enter the `streamId` (room ID) to join.

![p2p menu](https://github.com/user-attachments/assets/eb6c1e68-9ffa-4d47-9d88-4aae28f112a2)

2. When another peer joins the same `streamId` from Android, iOS, or the web, P2P communication is established.

3. Join from the web P2P sample: `https://your-domain:5443/live/peer.html`
