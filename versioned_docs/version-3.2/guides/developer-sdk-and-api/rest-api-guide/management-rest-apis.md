---
title: Web Panel API
description: Call Ant Media Server dashboard APIs to manage server settings, applications, users, and system resources.
keywords: [Web Panel REST API, Management REST API, Dashboard API, Ant Media Server Documentation]
sidebar_position: 4
sidebar_label: Web Panel API
---

# Web Panel API

The Web Panel API (Management REST Service) lets you automate what you normally do in the Ant Media Server dashboard — create or delete applications, change server and application settings (for example enable/disable MP4 recording), manage users, and read system resources.

These endpoints are **not** under an application path. They live at `/rest/v2` and require authentication.

Browse the full list in Swagger under **Management REST Service**. On [antmedia.io/rest](https://antmedia.io/rest/), open the definition dropdown and select a `*-management` version (for example `3.0.3-management`):

![](@site/static/img/rest-api/management-rest-api.png)

Reference: [Management REST Service](https://antmedia.io/rest/#/ManagementRestService)

Authenticate with a **server JWT** (`ProxyAuthorization` header) or with your **dashboard username and password** (session cookie). Both work in recent AMS versions.

## Authenticate with JWT

### Enable server JWT control

Edit `/usr/local/antmedia/conf/red5.properties`:

```properties
server.jwtServerControlEnabled=true
server.jwtServerSecretKey=exMtFMuF7NmMkbkzhWXjtsTXa1jYUiXP
```

Restart:

```bash
sudo service antmedia restart
```

Use a secret of at least 32 characters.

### Generate a JWT Token

Use any JWT library, or the [JWT Debugger](https://jwt.io/#debugger-io) encoder.

### Parameters

| Field | Value |
|-------|-------|
| **Algorithm** | `HS256` |
| **Secret** | `exMtFMuF7NmMkbkzhWXjtsTXa1jYUiXP` |
| **Payload** | Include an `exp` claim (Unix epoch seconds) so the token expires |

**Header:**

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

**Payload (with expiration):**

```json
{
  "exp": 1785508841
}
```

`exp` is a Unix timestamp in **seconds**. After that time, AMS rejects the token. Convert dates to epoch (and back) with an [Epoch timestamp converter](https://www.epochconverter.com/).

![](@site/static/img/rest-api/jwt-token.png)

### Example encoded token

The debugger produces a token like:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3ODU1MDg4NDF9.eA9ZDF9ZyjeSo0s-zkI9mvxoyxl4DhSrU9yM4skknhk
```

Use the **same secret** in the JWT Debugger that you set as `server.jwtServerSecretKey` in `red5.properties`.

### Call the API with the token

Use the `ProxyAuthorization` header (not `Authorization`):

```bash
curl -X GET \
  -H "Content-Type: application/json" \
  -H "ProxyAuthorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3ODU1MDg4NDF9.eA9ZDF9ZyjeSo0s-zkI9mvxoyxl4DhSrU9yM4skknhk" \
  "https://your-domain:5443/rest/v2/system-resources"
```

This returns CPU, memory, and related system resource data.

## Authenticate with username and password

Use the email and password you set for the Ant Media Server web panel (no hashing required). Authenticate once to get a session cookie, then reuse that cookie for Web Panel API calls.

### Parameters

| Field | Value |
|-------|-------|
| **Email** | Your web panel username (email) |
| **Password** | Your web panel password |
| **Cookie file** | Path used to store the session (for example `cookies.txt`) |

### Authenticate

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  "https://{domain:5443}/rest/v2/users/authenticate" \
  -d '{"email":"{email}", "password":"{password}"}' \
  --cookie-jar cookies.txt
```

Example:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  "https://test.antmedia.io:5443/rest/v2/users/authenticate" \
  -d '{"email":"admin@example.com", "password":"your-password"}' \
  --cookie-jar cookies.txt
```

### Call the API with the cookie

```bash
curl -X GET \
  -H "Content-Type: application/json" \
  "https://{domain:5443}/rest/v2/applications" \
  --cookie cookies.txt
```

Example:

```bash
curl -X GET \
  -H "Content-Type: application/json" \
  "https://test.antmedia.io:5443/rest/v2/applications" \
  --cookie cookies.txt
```

Example response:

```json
{"applications":["live"]}
```

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Management call returns unauthorized | Wrong header for JWT | Use `ProxyAuthorization`, not `Authorization` |
| JWT rejected | Secret mismatch or expired `exp` | Use the exact `server.jwtServerSecretKey`; generate a token with a future `exp` |
| Authenticate succeeds but next call fails | Cookie not sent | Pass `--cookie cookies.txt` (or equivalent) on every request |
| `server.jwtServerControlEnabled` ignored | Server not restarted | Restart the `antmedia` service after editing `red5.properties` |

With Web Panel authentication working, you can script dashboard operations — apps, settings, users, and monitoring — the same way you automate application broadcast APIs.
