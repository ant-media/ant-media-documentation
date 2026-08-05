---
title: Conference
description: Multi-party WebRTC conference from the Flutter sample app.
keywords: [Flutter SDK, WebRTC Conference, Ant Media Server Documentation]
sidebar_position: 3
sidebar_label: Conference
---

Join a multi-party WebRTC conference from the Flutter sample app.

## Configure the WebSocket URL

Before you join, set the server endpoint in the sample app **Settings**:

| Protocol | Example | When to use |
|----------|---------|-------------|
| **WSS** | `wss://your-domain:5443/live/websocket` | Production — requires [SSL](/guides/installing-on-linux/setting-up-ssl/) (port **5443**) |
| **WS** | `ws://your-ip:5080/live/websocket` | Local HTTP without SSL (port **5080**) |

Replace `live` with your application name. All publish, play, and other samples use this connection.

1. Tap the **Settings** icon in the top-right corner.

![settings](https://github.com/user-attachments/assets/0ee23ed3-62eb-4bd8-a2cd-55ffb5615e82)

2. Enter the WebSocket URL and tap **Set Server Ip**.

![server settings](https://github.com/user-attachments/assets/b2c5bf00-e90e-401e-a379-9efc47154311)

## Join a conference

1. Select **Conference** and enter a `streamId` and `roomId`.

![conference menu](https://github.com/user-attachments/assets/0df6251d-17a4-4f82-8d65-60dcb5260a36)

2. When other participants join the same `roomId` from Android, iOS, or the web, the conference room is established.

3. Join from the web conference sample: `https://your-domain:5443/live/conference.html`
