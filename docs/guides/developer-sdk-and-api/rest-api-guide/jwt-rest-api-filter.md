---
title: API Security (JWT) 
description: This document contains guide for JWT REST API filter, JWT tokens and JWT token with expiration time.
keywords: [JWT REST API filter, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

# JWT REST API Filter Guide

This guide explains how to secure Ant Media Server REST APIs using JWT (JSON Web Token) authentication.

JWT authentication is useful when your REST API requests come from external servers, frontend applications, or distributed systems where IP-based filtering is not practical.

## Step 1: Enable the JWT REST API Filter
By default, the JWT REST API Filter is turned off, while the REST API IP Filter is active in Ant Media Server. You can use the JWT Filter when accessing the REST API from multiple endpoints.

1. Open the Ant Media Server Web Panel.
2. Navigate to the application settings.
3. Enable the JWT REST API Filter option.
4. Enter a secret key that will be used to sign and validate JWT tokens using the HMAC-SHA256 (HS256) algorithm. For more information about JWT, visit [jwt.io](https://jwt.io).

![](@site/static/img/jwt-filter-enable.png)

## Step 2: Generate a JWT Token

After enabling the JWT filter, generate a JWT token using your preferred JWT library or tool.

You can find JWT libraries for different programming languages here:

https://jwt.io/libraries/

For testing purposes, you can also use the JWT Debugger:

https://jwt.io/#debugger-io

Use the following configuration:
- Algorithm: HS256
- Secret Key: Your configured secret key

Example token:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiIsImlhdCI6MTUxNjIzOTAyMn0.OESIxgNsnD_JwByKTXcrw9Ov4GaOUZw66QxMfmudhKQ
```

![](@site/static/img/generate_jwt_token.png)


## Step 3: Generate a JWT Token with Expiration Time (Optional)

You can also create JWT tokens with an expiration time using the exp claim.

The expiration value must be provided as a Unix timestamp. Once the token expires, Ant Media Server will reject the request.

Example payload:
```bash
{
  "sub": "token",
  "iat": 1719380000,
  "exp": 1719383600
}
```
![](@site/static/img/rest-api/generate-jwt-expire-time.png)


## Step 4: Use JWT Token for Accessing REST Filter API

To use the JWT token, simply add it to the `Authorization` header as shown below:

```bash
curl -X POST -H "accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer {JWTToken}" "https://{domain:5443}/{application}/rest/v2/broadcasts/create" -d '{"name":"streamName"}'
```

Replace `{JWTToken}` with your actual JWT token when making requests.

## Step 5: Enable JWKS Support (Optional)

If you want to use the JSON Web Key Set (JWKS) feature, you need to have an OAuth server like auth0.com. You can also build your own OAuth server system with [Hydra](https://www.ory.sh/hydra/docs/install). For JWKS configurations, add parameters to the `/usr/local/antmedia/webapps/{App-Name}/WEB-INF/red5-web.properties` file:

```
settings.jwtControlEnabled=true
settings.jwksURL=YOUR_JWKS_URL
```

**For example:**

```
settings.jwtControlEnabled=true
settings.jwksURL=https://antmedia.us.auth0.com
```

Ant Media Server using JWKS needs the public keys used by the signing party to validate signatures. A JWKS's structure looks like this: [https://antmedia.us.auth0.com/.well-known/jwks.json](https://antmedia.us.auth0.com/.well-known/jwks.json).

Once you're finished adding properties, restart the Ant Media Server instance.

```bash
sudo service antmedia restart
```
After these configurations are applied, you can start taking advantage of the JWKS feature in your structure, just like with JWT Filter.

## Congratulations!

You now have a fully secured REST API using JWT or JWKS, allowing flexible and safe access to your Ant Media Server from multiple endpoints. Your tokens are in place, and your API calls are protected — you’re ready to manage broadcasts, VODs, and server configurations with confidence!
