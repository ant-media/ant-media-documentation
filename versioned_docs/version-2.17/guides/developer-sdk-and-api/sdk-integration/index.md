---
title: SDK Overview
description: Client SDKs for Ant Media Server—platforms, licensing, capabilities, and where to start.
keywords: [SDK Overview, Ant Media SDK, WebRTC SDK, Android, iOS, JavaScript, Flutter, React Native, Ant Media Server Documentation]
sidebar_position: 0
sidebar_label: Overview
---

# SDK Overview

Client SDKs connect your application to Ant Media Server over WebSocket. They handle WebRTC signaling, media capture, playback, and optional features such as peer-to-peer mode, conference rooms, and data channels.

Use an SDK when you need a custom app or embedded page instead of the built-in sample players (`publish.html`, `play.html`).

## What the SDKs offer

| Capability | Typical use |
|------------|-------------|
| **Publish** | Send camera, microphone, or screen capture to AMS |
| **Play** | Receive a live stream with WebRTC latency |
| **Peer-to-peer** | Direct browser/device connection with AMS as signaling only |
| **Conference** | Multi-party rooms (supported platforms vary) |
| **Data channel** | Send arbitrary messages alongside media |
| **Screen sharing** | JavaScript, iOS (broadcast extension), and some mobile samples |

Server-side features—recording, adaptive bitrate transcoding, restreaming, token security—apply to SDK streams the same way they apply to RTMP or built-in WebRTC publish pages.

## Licensing: free and paid

| SDK | Cost | Server edition |
|-----|------|----------------|
| [Android](/guides/developer-sdk-and-api/sdk-integration/android-sdk/) | Free ([GitHub](https://github.com/ant-media/WebRTC-Android-SDK)) | Both Community & Enterprise |
| [iOS](/guides/developer-sdk-and-api/sdk-integration/ios-sdk/) | Free ([GitHub](https://github.com/ant-media/WebRTC-iOS-SDK)) | Both Community & Enterprise |
| [JavaScript](/category/javascript-sdk/) | Free ([npm](https://www.npmjs.com/package/@antmedia/webrtc_adaptor)) | Both Community & Enterprise |
| [Flutter](/category/flutter-sdk/) | Free ([GitHub](https://github.com/ant-media/WebRTC-Flutter-SDK)) | Both Community & Enterprise |
| [React Native](/category/react-native-sdk/) | Free ([GitHub](https://github.com/ant-media/WebRTC-React-Native-SDK)) | Both Community & Enterprise |
| [Unity](/guides/developer-sdk-and-api/sdk-integration/unity-sdk/) | Free ([GitHub](https://github.com/ant-media/WebRTC-Unity-SDK)) | Both Community & Enterprise |
| [Embedded SDK](/guides/developer-sdk-and-api/sdk-integration/embedded-sdk-guide/) | Free (P2P) / Commercial (publish to server) | Enterprise Edition only |

Mobile and web SDKs are open source. The Embedded SDK’s **publish-and-play** mode requires a commercial license and custom build artifacts from Ant Media.

:::info Community vs Enterprise WebRTC
On **Community Edition**, WebRTC **publishing** is available. WebRTC **playback**, **conference**, and **data channel** require **Enterprise Edition**. Use Community for publish-only tests; use Enterprise when viewers play over WebRTC or when you need rooms and data channels.
:::

## Choose a platform

| Platform | Best for | Package / repo |
|----------|----------|----------------|
| **JavaScript** | Web apps, embedded players, quick prototypes | `@antmedia/webrtc_adaptor` · [Samples](/category/javascript-sdk-samples/) |
| **Android** | Native Android apps | `io.antmedia:webrtc-android-framework` |
| **iOS** | Native iOS apps, screen broadcast | Swift Package (`WebRTC-iOS-SDK`) |
| **Flutter** | Cross-platform mobile from one codebase | `ant_media_flutter` · [Samples](/category/flutter-sdk-samples/) |
| **React Native** | Cross-platform mobile with React | `@antmedia/react-native-ant-media` · [Samples](/category/react-native-sdk-samples/) |
| **Unity** | Games and interactive 3D apps | [WebRTC-Unity-SDK](https://github.com/ant-media/WebRTC-Unity-SDK) |
| **Embedded (C++)** | IP cameras, RTSP sources, ARM/x86 Linux | [WebRTCEmbeddedSDKReference](https://github.com/ant-media/WebRTCEmbeddedSDKReference) |

:::tip Start with samples
Each SDK ships a sample app or HTML page. Run the sample against your AMS instance first, then copy the integration pattern into your project.
:::

## WebSocket URL

Point every SDK client at your application WebSocket endpoint:

| Protocol | Example | When to use |
|----------|---------|-------------|
| **WSS** | `wss://your-domain:5443/live/websocket` | Production and browser publish/play — requires [SSL on the server](/guides/installing-on-linux/setting-up-ssl/) |
| **WS** | `ws://your-ip:5080/live/websocket` | Local development without SSL |

Replace `live` with your application name. Format: `{protocol}://{host}:{port}/{application}/websocket`.

## Common integration flow

1. **Run Ant Media Server** — create or use an application (for example `live`) and note the WebSocket URL from the table above.
2. **Install the SDK** — Maven, npm, pub.dev, Swift Package, or clone the sample repo.
3. **Initialize the client** — pass the WebSocket URL, `streamId`, and event callbacks.
4. **Publish or play** — call `publish()` / `play()` (or the platform equivalent).
5. **Optional** — pass [stream tokens](/category/stream-security/) when security filters are enabled.

WebSocket message formats are documented in [WebRTC WebSocket messaging reference](/guides/publish-live-stream/webrtc/webrtc-websocket-messaging-reference/).

## REST API and webhooks

SDKs cover **client-side** WebRTC. For server control—create broadcasts, list streams, manage recordings—use the [REST API](/guides/developer-sdk-and-api/rest-api-guide/) and [Webhooks](/guides/developer-sdk-and-api/webhooks/).
