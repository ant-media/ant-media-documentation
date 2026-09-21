---
title: Play
description: Play a WebRTC stream from the Flutter sample app.
keywords: [Flutter SDK, Play WebRTC, Ant Media Server Documentation]
sidebar_position: 2
sidebar_label: Play
---

Play a WebRTC stream from the Flutter sample app.

## Configure the WebSocket URL

Before you play, set the server endpoint in the sample app **Settings**:

| Protocol | Example | When to use |
|----------|---------|-------------|
| **WSS** | `wss://your-domain:5443/live/websocket` | Production — requires [SSL](/guides/installing-on-linux/setting-up-ssl/) (port **5443**) |
| **WS** | `ws://your-ip:5080/live/websocket` | Local HTTP without SSL (port **5080**) |

Replace `live` with your application name. All publish, play, and other samples use this connection.

1. Tap the **Settings** icon in the top-right corner.

![settings](https://github.com/user-attachments/assets/0ee23ed3-62eb-4bd8-a2cd-55ffb5615e82)

2. Enter the WebSocket URL and tap **Set Server Ip**.

![server settings](https://github.com/user-attachments/assets/8c9d1484-744e-4959-b503-d0c092807498)

## Play a stream

1. Ensure a publisher is live with the same `streamId` you plan to play.
2. Select **Play** and enter the `streamId`.

![play menu](https://github.com/user-attachments/assets/f2584f07-ce36-470e-8ed3-cc3d9cd03d18)

3. Playback starts.

![playing](https://github.com/user-attachments/assets/8c034b6f-1e3d-4fa6-b816-b7ce8194a8b8)
