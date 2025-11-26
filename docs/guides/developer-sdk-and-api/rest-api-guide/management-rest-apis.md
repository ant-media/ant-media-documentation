---
title: Web Panel REST API 
description: This document helps you to access Management Panel REST API Services with JWT Tokens.
keywords: [JWT Tokens, REST API, Management Panel REST API Services, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 4
---

# Management Panel REST API Services

Some REST commands that are not application-specific, such as creating and deleting an app, creating a new user, etc., require authentication by logging into the management panel.

This can be limiting for users who want to automate REST API calls without manually accessing the web panel every time.

:::info

There are two authentication methods to access the web panel using the REST API: **JWT Token** or **Username and password**.

:::

In earlier versions of Ant Media Server, using the JWT API Filter required editing the `web.xml` file under the `conf` directory before making API requests. In recent versions, you can simultaneously use the JWT Filter and the Username/Password method.

## JWT Token Authentication

First, open the `conf/red5.properties` file and update the following lines:

```
server.jwtServerControlEnabled=false 
server.jwtServerSecretKey=
```

Change them to:

```
server.jwtServerControlEnabled=true
server.jwtServerSecretKey=your-secret-key-at-least-32-character
```

Restart the Ant Media Server:

```
sudo service antmedia restart
```

The REST API for the web panel is listed under [Management REST Service](https://antmedia.io/rest/#/ManagementRestService). Web Panel REST methods are available at: `https://SERVER\_FQDN:PORT/rest/`


### Generate JWT Token

Assume the secret key is (`cizvvh7f6ys0w3x0s1gzg6c2qzpk0gb9`). Generate the JWT Token at [JWT Debugger](https://jwt.io/#debugger-io). using the secret key and leaving the payload empty. 

The resulting token can be used to access the REST API: 

```eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.tA6sZwz_MvD9Nocf3Xv_DXhJaeTNgfsHPlg3RHEoZRk```

![](@site/static/img/JWT_debugger_sample_for_web_panel_ant_media_server.png)

### Make curl Request

Use the JWT Token in the `ProxyAuthorization` header:

```
curl -X GET -H "Content-Type: application/json" -H "ProxyAuthorization:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.tA6sZwz_MvD9Nocf3Xv_DXhJaeTNgfsHPlg3RHEoZRk" "https://example.com:5443/rest/v2/system-resources"
```

This will return system resource information such as CPU load and memory usage. For all REST methods, refer to the [Management REST Service Reference](https://antmedia.io/rest/#/ManagementRestService) 



## Username and Password Authentication

To authenticate using username and password, use the [AuthenticateUser](https://antmedia.io/rest/#/ManagementRestService/authenticateUser) API call.

### Convert Password to MD5 Hash

The password must be encrypted using MD5. You can use [MD5 encryption](https://www.md5online.org/md5-encrypt.html) to generate the MD5 hash of your password.

### Payload

The request body should include your email and MD5 password:

```
{ "email": "your-email", "password": "05a671c66aefea124cc08b76ea6d30bb" }
```

Here is the Curl Sample to Authenicate the user:

```bash
curl -X POST 'https://example.com:5443/rest/v2/users/authenticate' -H 'Content-Type: application/json' -d '{"email":"test@example.com", "password":"05a671c66aefea124cc08b76ea6d30bb"}' --cookie-jar cookies.txt
```

We save the JESSIONID into the cookie file and use the same to call the further APIs to not encounter any issue.

### Curl Sample for Management API

Once authenticated using username and password, you can access Dashboard REST Services. For example, to get the list of [Applications](https://antmedia.io/rest/#/ManagementRestService/getApplications):

```
curl -X GET -H "Content-Type: application/json" "https://example.com:5443/rest/v2/applications" --cookie cookies.txt
```

The response should be something like

```
{"applications":["live"]}
```

You can now use all [Web panel REST methods](https://antmedia.io/rest/#/ManagementRestService) with the appropriate headers.

[](https://antmedia.io/rest/#/ManagementRestService/getApplications)

## Congratulations!

With JWT tokens or username/password authentication in place, you can securely automate all Web Panel REST API calls. This allows you to manage applications, users, and system resources programmatically without manually logging into the web panel every time, giving you full control and flexibility over your Ant Media Server setup.
