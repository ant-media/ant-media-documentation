---
title: Data Channel
description: Send data channel messages from the Flutter sample app.
keywords: [Flutter SDK, Data Channel, Ant Media Server Documentation]
sidebar_position: 4
sidebar_label: Data Channel
---

Send and receive data channel messages from the Flutter sample app.

Enable the data channel in [application settings](/guides/publish-live-stream/webrtc/data-channel/#enable-data-channel) before testing.

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

![server settings](https://github.com/user-attachments/assets/1a5f7797-b20e-4203-b96a-a3f71e72a82e)

## Use data channel

1. Select **DataChannel** and enter a `streamId`.

![data channel menu](https://github.com/user-attachments/assets/91b7e4ae-07ad-481e-b89f-4659e38fdf2e)

2. After publishing, send messages with the send button and view incoming messages from other clients.

3. Test from the web player: `https://your-domain:5443/live/player.html`
