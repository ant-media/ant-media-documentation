---
title: Web Panel REST API 
description: This document helps you to access Management Panel REST API Services with JWT Tokens.
keywords: [JWT Tokens, REST API, Management Panel REST API Services, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 4
---

# Management Panel REST API Services

Some REST commands which are not application specific, such as creating and deleting an app, creating a new user, etc, require an authentication filter by logging in to the management panel. 

This creates a few limitations for people who don't want to use the web panel every time and want access to all of the REST commands.

:::info

There are two authentication methods you can use to access the web panel using the REST API. Using a **JWT Token** or **Username and password**.

:::

In earlier versions of Ant Media Server, using the JWT API Filter required editing the web.xml file under conf directory before making API requests to the web panel. 

In more recent versions, it's possible to simultaneously use the JWT Filter and Username and Password methods.

## JWT Token Authentication

First, open the ```conf/red5.properties``` file and find and replace the following lines:

```
server.jwtServerControlEnabled=false 
server.jwtServerSecretKey=
```

with these ones:

```
server.jwtServerControlEnabled=true
server.jwtServerSecretKey=your-secret-key-at-least-32-character
```

Now restart the Ant Media Server

```
sudo service antmedia restart
```

REST API for the web panel is listed [Management REST Service](https://antmedia.io/rest/#/ManagementRestService). Web Panel REST methods are binded below `https://SERVER/FQDN:5443/rest/`


### Generate JWT Token
Let's assume that we've entered this key (`cizvvh7f6ys0w3x0s1gzg6c2qzpk0gb9`) as `server.jwtServerSecretKey`

First, generate the JWT Token at [JWT Debugger](https://jwt.io/#debugger-io). We've entered the Secret key and removed the data field because we don't send payload as shown below. This way, JWT token that we can use is ```eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.tA6sZwz_MvD9Nocf3Xv_DXhJaeTNgfsHPlg3RHEoZRk```

![](@site/static/img/JWT_debugger_sample_for_web_panel_ant_media_server.png)

### Make curl Request
Let's use the JWT Token in `ProxyAuthorization` header as follows

```
curl -X GET -H "Content-Type: application/json" -H "ProxyAuthorization:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.tA6sZwz_MvD9Nocf3Xv_DXhJaeTNgfsHPlg3RHEoZRk" "https://example.com:5443/rest/v2/system-resources"
```
Then Ant Media Server responds with system resources information such as CPU Load, Memory, etc. For all REST Methods, please visit the [Management REST Service Reference](https://antmedia.io/rest/#/ManagementRestService) 



## Username and Password Authentication

Now, we need to authenticate the username and password.

In order to authenticate the user, we need to pass the login username and password to the [AuthenticateUser](https://antmedia.io/rest/#/ManagementRestService/authenticateUser) API call.

### Convert Password to MD5 Hash

Since the password is encrypted with [MD5 encryption](https://www.md5online.org/md5-encrypt.html), let's get the MD5 encrypted password[](https://www.md5online.org/md5-encrypt.html)[](https://www.md5online.org/md5-encrypt.html) by entering your original password.

Now that we have the MD5 encrypted password, let's make the AuthenticateUser REST API call. You can use postman to make these REST API calls.

### Payload

The payload in the body can be entered like:

```
{ "email": "your-username", "password": "05a671c66aefea124cc08b76ea6d30bb" }
```

### Make curl Request

Now that the User is authenticated, we can make the REST API calls for accessing Dashboard REST Services.

Let's get the list of [Applications](https://antmedia.io/rest/#/ManagementRestService/getApplications) from the Server:

```
curl -X GET -H "Content-Type: application/json" -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.tA6sZwz_MvD9Nocf3Xv_DXhJaeTNgfsHPlg3RHEoZRk" "https://SERVER_FQDN:5443/rest/v2/applications"
```

The response should be something like

```
{"applications":["LiveApp","WebRTCAppEE"]}
```

Then, you can use all [Web panel REST methods](https://antmedia.io/rest/#/ManagementRestService) using the header as shown in the sample above.

[](https://antmedia.io/rest/#/ManagementRestService/getApplications)
