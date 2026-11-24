---
title: REST API Overview
description: Control Ant Media Server programmatically with the REST API — create streams, manage VODs, and automate operations.
keywords: [Ant Media Server REST API, REST API Overview, Ant Media Server Documentation]
sidebar_position: 0
sidebar_label: Overview
---

# REST API

The Ant Media Server REST API lets you manage streams, recordings, applications, and cluster resources over HTTP — the same capabilities as the web panel, available for scripts, backends, and integrations.

Full method reference: [antmedia.io/rest](https://antmedia.io/rest/)

## What is a REST API?

A REST API is an HTTP interface that exposes server operations as URLs. You send requests (`GET`, `POST`, `PUT`, `DELETE`) with JSON bodies where needed, and the server returns JSON responses. No SDK is required — any language that can make HTTP calls can use it.

| Concept | In Ant Media Server |
|---------|---------------------|
| **Resource** | Broadcast, VoD, application, cluster node |
| **Base URL** | `https://your-domain:5443/{application}/rest/v2/...` or `/rest/v2/...` for management |
| **Auth** | IP filter and/or JWT — see security guides below |
| **Contract** | Documented in [Swagger](https://antmedia.io/rest/) |

## Why use the REST API?

| Use case | Example |
|----------|---------|
| **Automate stream lifecycle** | Create a broadcast before a scheduled event; delete it when finished |
| **Integrate with your backend** | Provision stream IDs when a user starts a session in your app |
| **Pull external sources** | Add RTSP/HLS stream sources and start/stop them on demand |
| **Manage recordings (VoD)** | List, upload, and delete recorded files |
| **Secure playback/publish** | Generate one-time or JWT tokens for streams |
| **Operate at scale** | Create apps, manage users, and change server/application settings via the Web Panel API |
| **CI / ops tooling** | Health checks, cluster status, and scripted deployments |

Client [SDKs](/guides/developer-sdk-and-api/sdk-integration/) handle real-time WebRTC on the device. [Webhooks](/guides/developer-sdk-and-api/webhooks/) push events to your backend. The REST API is how you **command** the server when you need to.

## API services

| Service | Base path | Scope |
|---------|-----------|-------|
| **Broadcast** | `/{application}/rest/v2/broadcasts` | Live streams, stream sources, tokens, recording |
| **VoD** | `/{application}/rest/v2/vods` | Recordings and uploaded video files |
| **Management** | `/rest/v2` | Apps, users, system resources (web panel APIs) |
| **Cluster** | `/rest/v2/cluster` | Cluster node management |

`{application}` is typically `live`, `WebRTCAppEE`, or a [custom application](/guides/developer-sdk-and-api/extend-the-server/applications/create-new-application/) you create.

## How to use this section

| Guide | Description |
|-------|-------------|
| [Getting Started](/guides/developer-sdk-and-api/rest-api-guide/getting-started/) | Base URLs, security options, first request |
| [Secure with IP Filter](/guides/developer-sdk-and-api/rest-api-guide/securing-rest-apis/) | Allow trusted IPs for application REST calls |
| [Secure with JWT](/guides/developer-sdk-and-api/rest-api-guide/jwt-rest-api-filter/) | Bearer tokens for remote API access |
| [Web Panel API](/guides/developer-sdk-and-api/rest-api-guide/management-rest-apis/) | Dashboard APIs for server settings, apps, and users |
| [API Catalog](/guides/developer-sdk-and-api/rest-api-guide/api-catalog/) | Curl templates for Broadcasts, VoDs, Filters, Push Notification, and Management APIs |

Import the OpenAPI definition into Postman using [this GitHub discussion](https://github.com/orgs/ant-media/discussions/5664).

## Troubleshooting

| Symptom | Likely cause | What to check |
|---------|--------------|---------------|
| Empty response / connection hang | IP filter blocks the caller | Add your IP in application settings, or call from `127.0.0.1` |
| `401` / `403` | JWT missing, invalid, or IP filter preferred over JWT | Confirm only one security method is active; verify `Authorization` header |
| `404` on broadcast/VoD | Wrong `streamId` or application name | Confirm app name in the URL and that the resource exists |
| `405` / unexpected method | Wrong HTTP verb or path | Match the method in [Swagger](https://antmedia.io/rest/) |
| SSL / certificate errors | Calling `https://` without a valid cert | Use HTTP on port `5080` for local tests, or [set up SSL](/guides/installing-on-linux/setting-up-ssl/) |

With a clear picture of what the API covers and how it fits beside SDKs and webhooks, you can move on to [Getting Started](/guides/developer-sdk-and-api/rest-api-guide/getting-started/) and make your first authenticated request.
