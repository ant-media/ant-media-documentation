---
title: Android SDK
description: Integrate Ant Media Server WebRTC publish and play into native Android apps.
keywords: [Android SDK, WebRTC Android, Ant Media Server Documentation]
sidebar_position: 0
sidebar_label: Overview
---

# Android SDK

The Android SDK (`io.antmedia:webrtc-android-framework`) adds WebRTC publish and play to native Android apps. It is free and open source on [GitHub](https://github.com/ant-media/WebRTC-Android-SDK).

## Integration path

1. [Create an Android Studio project](/guides/developer-sdk-and-api/sdk-integration/android-sdk/android-project/)
2. [Add the SDK dependency](/guides/developer-sdk-and-api/sdk-integration/android-sdk/android-dependency/)
3. [Publish a stream](/guides/developer-sdk-and-api/sdk-integration/android-sdk/android-webrtc-publish/)
4. [Play a stream](/guides/developer-sdk-and-api/sdk-integration/android-sdk/android-webrtc-play/)
5. [Explore sample apps](/guides/developer-sdk-and-api/sdk-integration/android-sdk/android-samples/)

## Requirements

- Android Studio and a device or emulator with camera/microphone
- Ant Media Server (Community or Enterprise)
- WebSocket URL for your application:

| Protocol | Example | When to use |
|----------|---------|-------------|
| **WSS** | `wss://your-domain:5443/{application}/websocket` | Production — requires [SSL](/guides/installing-on-linux/setting-up-ssl/) (port **5443**) |
| **WS** | `ws://your-ip:5080/{application}/websocket` | Local development without SSL (port **5080**) |

Replace `{application}` with your app name (for example `live`).

The SDK uses `IWebRTCClient` for publish and play. See the sample app in the GitHub repo for conference, data channel, and advanced scenarios.
