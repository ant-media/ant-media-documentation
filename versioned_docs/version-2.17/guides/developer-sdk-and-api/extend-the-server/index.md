---
title: Extend the Server Overview
description: Build Ant Media Server from source and create custom applications.
keywords: [Extend Ant Media Server, Build from Source, Custom Applications, Ant Media Server Documentation]
sidebar_position: 0
sidebar_label: Overview
---

# Extend the Server

Go beyond default AMS configuration when you need to customize the server itself or organize multiple streaming tenants.

## When to use this section

| Goal | Start here |
|------|------------|
| Build AMS from source for contribution or custom builds | [Build from Source](/guides/developer-sdk-and-api/extend-the-server/building-ams-from-source-code/) |
| Create a separate application for a tenant or use case | [Create Application](/guides/developer-sdk-and-api/extend-the-server/applications/create-new-application/) |
| Embed the Circle conference UI in your web app | [Circle Component](/guides/developer-sdk-and-api/extend-the-server/applications/circle-component-usage/) |
| Add server-side features without modifying core code | [Plugins](/guides/developer-sdk-and-api/plugins/) |

## Applications vs plugins

- **Applications** — isolated streaming contexts on one AMS instance. Each application has its own settings, streams, and WebSocket URL (`/{application}/websocket`).
- **Plugins** — JAR modules that hook into the media pipeline (transcoding, AI, DRM, recording). See the dedicated [Plugins](/guides/developer-sdk-and-api/plugins/) section.

## Related guides

- [REST API](/category/rest-api-guide/) — manage applications and streams programmatically
- [Webhooks](/guides/developer-sdk-and-api/webhooks/) — receive server events in your backend
- [SDK Integration](/guides/developer-sdk-and-api/sdk-integration/) — client-side WebRTC integration
