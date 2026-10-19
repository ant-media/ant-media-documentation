---
title: Secure with JWT
description: Protect Ant Media Server application REST APIs with JWT Bearer tokens or JWKS.
keywords: [JWT REST API Filter, JWT Token, JWKS, Ant Media Server Documentation]
sidebar_position: 3
sidebar_label: Secure with JWT
---

# Secure with JWT

Use JWT when clients outside a fixed IP set need to call application REST APIs (`/{application}/rest/v2/...`). Tokens are sent in the `Authorization` header and verified with a shared secret (HMAC-SHA256) or JWKS.

Learn more about JWT at [jwt.io](https://jwt.io).

:::info
IP filter is enabled by default. Prefer a clear security model: for remote JWT access, allow the caller IP or disable conflicting IP restrictions so JWT can take effect as intended.
:::

## Enable the JWT REST filter

1. Open the web panel → your application → settings.
2. Enable **JWT REST API Filter**.
3. Set a **Secret key** used for HMAC-SHA256 signing.

![](@site/static/img/jwt-filter-enable.png)

## Generate a JWT Token

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

Use the **same secret** in the JWT Debugger that you configured in the application JWT REST API Filter settings.

## Call the API with the token

Pass the JWT as a Bearer token in the `Authorization` header:

```bash
curl -X POST \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {JWTToken}" \
  "https://{domain:5443}/{application}/rest/v2/broadcasts/create" \
  -d '{"name":"streamName"}'
```

Example:

```bash
curl -X POST \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3ODU1MDg4NDF9.eA9ZDF9ZyjeSo0s-zkI9mvxoyxl4DhSrU9yM4skknhk" \
  "https://test.antmedia.io:5443/live/rest/v2/broadcasts/create" \
  -d '{"name":"test"}'
```

![](@site/static/img/rest-api/jwt-api-call.png)

## Optional: JWKS

For tokens issued by an OAuth provider (for example Auth0 or [Hydra](https://www.ory.sh/hydra/docs/install)), configure JWKS in the application properties file:

`/usr/local/antmedia/webapps/{App-Name}/WEB-INF/red5-web.properties`

```properties
settings.jwtControlEnabled=true
settings.jwksURL=https://antmedia.us.auth0.com
```

AMS loads public keys from the provider’s JWKS document (for example `https://antmedia.us.auth0.com/.well-known/jwks.json`) to verify signatures.

Restart after changing properties:

```bash
sudo service antmedia restart
```

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| `401` / unauthorized | Wrong secret or algorithm | Regenerate the token with HS256 and the exact secret from settings |
| Token works in debugger but not AMS | Extra whitespace / wrong header name | Use `Authorization: Bearer <token>` with no line breaks |
| Expired token | `exp` in the past | Issue a new token with a future `exp` ([epoch converter](https://www.epochconverter.com/)) |
| Still blocked after enabling JWT | IP filter rejects the client | Allow the client IP or adjust IP filter settings |
| JWKS verification fails | Wrong `jwksURL` or unreachable IdP | Confirm the JWKS URL in a browser; check server can reach it |

Once tokens validate cleanly, your backends can create and manage streams from anywhere without opening the REST API to the public internet by IP alone.
