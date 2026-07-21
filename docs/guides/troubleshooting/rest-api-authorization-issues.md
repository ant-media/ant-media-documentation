---
title: REST API Authorization Issues
description: Troubleshoot 401 and 403 errors when calling Ant Media Server REST APIs, including IP filter, JWT filter, and Management API authentication problems.
keywords: [REST API 403, REST API 401, JWT filter, IP filter, Management API authentication, Ant Media Server Documentation]
sidebar_position: 7
---

# REST API Authorization Issues

Ant Media Server protects its REST APIs with an **IP filter** (enabled by default, allowing only `127.0.0.1`) and an optional **JWT filter**. The Management (Web Panel) API additionally requires its own authentication. Most 401/403 responses come from one of these layers.

## API returns 403 Forbidden (or an empty response) from a remote machine

**Symptom:** The same request works with `curl` on the server itself but fails from your workstation or application server.

**Check:** By default the REST interface only responds to calls from `127.0.0.1`. Requests from any other IP are rejected.

**Resolution:** Add your caller's IP address to the allowed list in the application settings, or switch to JWT-based security. Both are described in [Securing REST APIs](/guides/developer-sdk-and-api/rest-api-guide/securing-rest-apis/).

:::info
If your server is behind a load balancer or reverse proxy, the IP the server sees may be the proxy's IP, not the real client IP. In AWS, see [enabling IP filtering behind a load balancer](/guides/clustering-and-scaling/aws/aws-lb/enabling-ip-filtering-behind-load-balancer-in-aws/).
:::

## JWT filter is enabled but requests still fail

**Symptom:** You enabled the JWT REST API filter and send a token, but requests are rejected.

**Check:**

1. **IP filter and JWT filter cannot be enabled at the same time.** The server gives preference to the IP filter, which causes JWT-authenticated requests to fail. Disable the IP filter (or set it to allow all) when using JWT.
2. The token must be generated with the **same secret key** configured in the application settings, using the `HS256` algorithm.
3. The token must be sent in the correct header. For application-level APIs this is the `Authorization` header as configured in the [JWT REST API filter guide](/guides/developer-sdk-and-api/rest-api-guide/jwt-rest-api-filter/).
4. If the token has an expiration (`exp` claim), verify it has not expired.

**Resolution:** Align the filter configuration and regenerate the token. You can debug token contents at [jwt.io](https://jwt.io).

## Management API (Web Panel REST) returns 401

**Symptom:** Calls to `https://AMS:5443/rest/v2/...` (creating applications, changing settings, listing users) are rejected even though broadcast APIs work.

**Check:** The Management REST Service has its own authentication, separate from the application-level filters. There are two methods:

1. **JWT server token:** requires `server.jwtServerControlEnabled=true` and a secret key (at least 32 characters) in `conf/red5.properties`, and the token must be sent in the **`ProxyAuthorization`** header — not `Authorization`.
2. **Username/password:** authenticate first against the authentication endpoint and reuse the returned cookie in subsequent calls.

**Resolution:** Follow the [Management REST API guide](/guides/developer-sdk-and-api/rest-api-guide/management-rest-apis/) step by step. A working curl example with the `ProxyAuthorization` header:

```shell
curl -X GET -H "Content-Type: application/json" \
  -H "ProxyAuthorization: YOUR_JWT_TOKEN" \
  "https://example.com:5443/rest/v2/system-resources"
```

## Publish or play rejected with `unauthorized_access`

**Symptom:** Not an API call but stream publish/play fails with an authorization error.

**Check:** This is stream security, not REST API security. See the `unauthorized_access` section in [WebRTC Publish & Play Issues](/guides/troubleshooting/webrtc-publish-play-issues/#publish-or-play-fails-with-unauthorized_access).

## Checklist for diagnosing any REST authorization failure

1. Which API are you calling — application-level (`/{app}/rest/v2/...`) or management-level (`/rest/v2/...`)? They authenticate differently.
2. Which filter is active — IP filter, JWT filter, or both configured (which is invalid)?
3. From which IP does the server actually see the request (direct vs. behind a proxy)?
4. Is the token valid — correct secret, correct algorithm, correct header name, not expired?

## Related documentation

- [REST API quickstart](/guides/developer-sdk-and-api/rest-api-guide/)
- [Securing REST APIs](/guides/developer-sdk-and-api/rest-api-guide/securing-rest-apis/)
- [JWT REST API filter](/guides/developer-sdk-and-api/rest-api-guide/jwt-rest-api-filter/)
- [Management REST APIs](/guides/developer-sdk-and-api/rest-api-guide/management-rest-apis/)
