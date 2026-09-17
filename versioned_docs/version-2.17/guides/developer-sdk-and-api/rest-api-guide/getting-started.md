---
title: Getting Started
description: Set up Ant Media Server REST API access — base URLs, security, and your first request.
keywords: [REST API Quickstart, Ant Media Server REST API, Ant Media Server Documentation]
sidebar_position: 1
sidebar_label: Getting Started
---

# Getting Started

Use this guide to understand REST base URLs, choose a security method, and verify that API access works on your server.

You need a running Ant Media Server instance. If you do not have one yet, start with the [quick start](/quick-start/) guide.

## Base URLs

Replace `{application}` with your app name (for example `live`). Use port **5443** for HTTPS or **5080** for HTTP.

| Service | Base URL |
|---------|----------|
| **Broadcast** | `https://your-domain:5443/{application}/rest/v2/broadcasts` |
| **VoD** | `https://your-domain:5443/{application}/rest/v2/vods` |
| **Management** | `https://your-domain:5443/rest/v2` |
| **Cluster** | `https://your-domain:5443/rest/v2/cluster` |

Broadcast and VoD calls are **application-scoped**. Management and Cluster calls are **server-scoped** and do not include an application name in the path.

## API security

AMS supports two ways to protect application REST endpoints. Prefer one method in production — if IP filter is enabled, JWT requests from non-allowed IPs can still fail.

| Method | Best for | Guide |
|--------|----------|-------|
| **IP Filter** (default) | Same network, localhost, trusted CIDRs | [Secure with IP Filter](/guides/developer-sdk-and-api/rest-api-guide/securing-rest-apis/) |
| **JWT Filter** | Remote backends, multi-endpoint access | [Secure with JWT](/guides/developer-sdk-and-api/rest-api-guide/jwt-rest-api-filter/) |

By default, application REST responds only to `127.0.0.1`.

Management (web panel) APIs use a separate authentication flow — JWT via `ProxyAuthorization` or username/password session. See [Web Panel API](/guides/developer-sdk-and-api/rest-api-guide/management-rest-apis/).

## Make your first request

From the server itself (IP filter allows localhost by default), create a broadcast:

```bash
curl -X POST -H "Content-Type: application/json" \
  "http://localhost:5080/live/rest/v2/broadcasts/create"
```

A successful response includes a `streamId`, `status`, and `rtmpURL`. Browse more endpoints in the [API Catalog](/guides/developer-sdk-and-api/rest-api-guide/api-catalog/).

## Explore the full reference

Every method, parameter, and response schema is documented in Swagger:

[https://antmedia.io/rest/](https://antmedia.io/rest/)

![](@site/static/img/rest.png)

You can import the OpenAPI definition into Postman — see [this discussion](https://github.com/orgs/ant-media/discussions/5664).

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| No response from a remote machine | Caller IP not in the IP filter | Add the IP under **Application Settings → IP Filter**, or switch to JWT |
| Works on `localhost` but not remotely | Same as above | Confirm you are not relying only on `127.0.0.1` |
| JWT returns forbidden while IP filter is set | Both methods conflict | Disable IP restriction for remote callers or allow the client IP |
| Wrong application in URL | Typo in app name | List apps via the Web Panel API or the web panel |
| Using HTTP vs HTTPS incorrectly | Port/protocol mismatch | HTTP → `5080`, HTTPS → `5443` with SSL configured |

Once a create-broadcast call returns JSON from your server, you are ready to secure access properly and automate stream workflows with the API Catalog and Web Panel API guides.
