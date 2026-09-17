---
title: iOS SDK
description: Publish, play, and screen-share WebRTC streams from native iOS apps with Ant Media Server.
keywords: [iOS SDK User Guide, Publish Stream from your iPhone, Using the WebRTC iOS SDK, Ant Media Server Documentation]
sidebar_position: 0
sidebar_label: Overview
---

# iOS SDK

The iOS SDK adds WebRTC publish and play to native iOS apps, including screen sharing via a broadcast extension. It is free and open source on [GitHub](https://github.com/ant-media/WebRTC-iOS-SDK).

## Integration path

1. [Create an Xcode project](/guides/developer-sdk-and-api/sdk-integration/ios-sdk/xcode-project/)
2. [Add the WebRTC-iOS-SDK dependency](/guides/developer-sdk-and-api/sdk-integration/ios-sdk/ios-dependency/)
3. [Publish a stream](/guides/developer-sdk-and-api/sdk-integration/ios-sdk/ios-webrtc-publish/)
4. [Play a stream](/guides/developer-sdk-and-api/sdk-integration/ios-sdk/ios-webrtc-play/)
5. [Screen sharing (broadcast extension)](/guides/developer-sdk-and-api/sdk-integration/ios-sdk/ios-screen-share/)

## Requirements

- Xcode and an iOS device or simulator
- Ant Media Server (Community or Enterprise)
- WebSocket URL for your application:

| Protocol | Example | When to use |
|----------|---------|-------------|
| **WSS** | `wss://your-domain:5443/{application}/websocket` | Production — requires [SSL](/guides/installing-on-linux/setting-up-ssl/) (port **5443**) |
| **WS** | `ws://your-ip:5080/{application}/websocket` | Local development without SSL (port **5080**) |

Replace `{application}` with your app name (for example `live`).

The SDK exposes `AntMediaClient` for publish and play. Conference and multi-party samples are available in the GitHub repository.
