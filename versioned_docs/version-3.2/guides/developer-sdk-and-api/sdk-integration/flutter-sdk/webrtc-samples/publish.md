---
title: Publish
description: Publish a WebRTC stream from the Flutter sample app.
keywords: [Flutter SDK, Publish WebRTC, Ant Media Server Documentation]
sidebar_position: 1
sidebar_label: Publish
---

Publish a WebRTC stream from the Flutter sample app.

## Configure the WebSocket URL

Before you publish, set the server endpoint in the sample app **Settings**:

| Protocol | Example | When to use |
|----------|---------|-------------|
| **WSS** | `wss://your-domain:5443/live/websocket` | Production — requires [SSL](/guides/installing-on-linux/setting-up-ssl/) (port **5443**) |
| **WS** | `ws://your-ip:5080/live/websocket` | Local HTTP without SSL (port **5080**) |

Replace `live` with your application name. All publish, play, and other samples use this connection.

1. Tap the **Settings** icon in the top-right corner.

![settings](https://github.com/user-attachments/assets/0ee23ed3-62eb-4bd8-a2cd-55ffb5615e82)

2. Enter the WebSocket URL and tap **Set Server Ip**.

![server settings](https://github.com/user-attachments/assets/9eb4d8aa-a96c-469f-9caf-87176e1f8136)

## Publish a stream

1. Select **Publish** and enter a `streamId`.

![publish menu](https://github.com/user-attachments/assets/ab6657b2-fcac-41f5-ba48-6ea726207699)

2. Choose the publishing source. On iOS, in-app screen recording captures the app UI only; on Android it captures the full device screen.

![source selection](https://github.com/user-attachments/assets/0b5a37b3-c108-42ca-a102-7f495b03b3dc)

3. Publishing starts. Switch between front and rear cameras as needed.

![publishing](https://github.com/user-attachments/assets/0b1a8b32-5937-4d66-ab49-7e8c1632f2e2)

## Verify the stream

- Open the Ant Media Server web panel and confirm the broadcast.
- Or play it with the [embedded web player](/guides/playing-live-stream/embedded-web-player/).
