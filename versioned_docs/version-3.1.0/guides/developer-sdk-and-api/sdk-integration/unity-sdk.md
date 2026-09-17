---
title: Unity SDK
description: Publish, play, and peer WebRTC streams from Unity on Windows and Android.
keywords: [Unity WebRTC SDK, Ant Media Server Documentation]
sidebar_position: 7
sidebar_label: Unity SDK
---

# Unity SDK

The Unity SDK adds WebRTC publish, play, and peer modes to Unity apps. It ships with the **AMSStreamingSample** scene. Free and open source on [GitHub](https://github.com/ant-media/WebRTC-Unity-SDK).

:::info Codec
The sample currently supports **VP8**. Configure your AMS application for VP8 before testing.
:::

## Requirements

- Unity installed locally
- Ant Media Server (Community or Enterprise)
- WebSocket URL for your application:

| Protocol | Example | When to use |
|----------|---------|-------------|
| **WSS** | `wss://your-domain:5443/live/websocket` | Production — requires [SSL](/guides/installing-on-linux/setting-up-ssl/) (port **5443**) |
| **WS** | `ws://your-ip:5080/live/websocket` | Local development without SSL (port **5080**) |

Replace `live` with your application name.

## Set up the project

1. Clone the repository:

```bash
git clone https://github.com/ant-media/WebRTC-Unity-SDK.git
```

2. Open Unity Hub → **Open** → select the cloned folder.

3. In the Project window, open **AMSStreamingSample** under `Assets/AntMedia/Samples`.

4. Edit `AMSStreamingSamples.cs`:
   - Set `websocketUrl` to your AMS WebSocket URL (see table above).
   - Set the stream ID passed to the `WebRTCClient` constructor.

![](https://antmedia.io/wp-content/uploads/2023/02/AMSStreaming-Asset-1024x576.jpg)

## Build and run

### Windows

1. **File → Build Settings**
2. Select **Windows** as the platform
3. Click **Build** and choose an output folder
4. Run the executable and test publish or play against your server

![](https://antmedia.io/wp-content/uploads/2023/02/AMSUnitySDK-Windows-Build-1024x576.jpg)

![](@site/static/img/developer-guides/unity1.webp)

### Android

1. **File → Build Settings** → **Android** → **Switch Platform**
2. **Player Settings → Publishing Settings** — create and assign a keystore
3. **Other Settings** — Scripting Backend: **IL2CPP**, enable **ARM64**
4. Connect a device, enable **Development Build**, then **Build and Run**

![](https://antmedia.io/wp-content/uploads/2023/02/AMSUnitySDK-Android-Build-1024x576.jpg)

## Sample modes

Select a mode from the dropdown in the sample UI.

| Mode | Behavior |
|------|----------|
| **Publish** | Captures the camera and publishes to AMS. Play at `https://{host}:5443/{app}/play.html?id={streamId}` |
| **Play** | Plays an existing stream (publish elsewhere with the same stream ID first) |
| **Peer** | Publishes locally and plays a remote peer. Join a second peer from `{host}/peer.html` with the same stream ID |

![](@site/static/img/developer-guides/unity3.webp)

See the [SDK overview](/guides/developer-sdk-and-api/sdk-integration/) for licensing and platform comparison.
