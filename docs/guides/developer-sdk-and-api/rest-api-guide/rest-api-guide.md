---
title: Quickstart
description: REST API guide for Ant Media Server.
keywords: [REST API guide, REST API Documentation, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

# REST API Quickstart

Ant Media Server's REST API is thoughtfully designed, providing you with full control over your Ant Media Server's management. The REST API is organized into the following services:

* [***Broadcast Rest Service:***] Management of live streams and stream sources. [API Reference](https://antmedia.io/rest/#/ManagementRestService)
* [***VOD Rest Service:***] Management of video-on-demand assets and recordings. [API Reference](https://antmedia.io/rest/#/VoD%20Rest%20Service)
* [***Management Rest Service:***] Non-application-specific commands such as user management and creating apps. [API Reference](https://antmedia.io/rest/#/ManagementRestService)
* [***Cluster Service:***] Cluster management service. [API Reference](https://antmedia.io/rest/#/default) 

:::tip

The full [API reference guide is here](https://antmedia.io/rest). Refer to this [GitHub discussion](https://github.com/orgs/ant-media/discussions/5664)to find out **how to import the API REST methods into Postman**.

:::



To get started using the REST API, you must have an instance of Ant Media Server running. Refer to our quickstart guide on [installing Ant Media Server](/quick-start) first if needed.

## API Services

The required base URL for API access varies depending on the specific service. For example, the broadcast service and VOD service APIs are associated with the rest path of a specific Ant Media Server application. While executing web panel commands through the REST API, it is not necessary to include the application name in the request URL.

### Broadcast Service
```shell
http(s)ant-media-server:port/{application}/rest/v2/broadcasts
```
### VoD Service
```shell
http(s)ant-media-server:port/{application}/rest/v2/vods
```

### Management Service
```shell
http(s)ant-media-server:port/rest/v2
```
### Cluster Service
```shell
http(s)ant-media-server:port/rest/v2/cluster
```

## API Security

Ant Media Server offers two methods to secure your API requests. By default, the IP filter is enabled and bound to localhost at 127.0.0.1. In addition to IP filtering, you can enable JWT tokens and make secure API requests by passing the token in the request header.

> ***Please Note:*** You cannot enable both at the same time. Ant Media Server will give preference to IP filtering, which will result in failed API requests using JWT tokens.

### IP Filtering

The REST interface only responds to calls from 127.0.0.1 by default. If you call from any other IP address, it does not return anything. However, you can add more trusted IP addresses to make API requests from other machines. Please refer to the [API security (IP)](/guides/developer-sdk-and-api/rest-api-guide/securing-rest-apis/) document for details.

### JWT Tokens

If preferred, you can generate JWT tokens and pass them in the header of API requests. You can generate a permanent token or one with an expiry date for an additional security layer. Please refer to the [API security (JWT)](/guides/developer-sdk-and-api/rest-api-guide/jwt-rest-api-filter/) ocument for details on configuration.

## Management Service Authentication

To access the web panel using the API, you'll need to use the management REST service. Before making any API requests, it is necessary to authenticate access. There are two methods to access management REST services: using a JWT token or by username and password. Please refer to the [Web Panel REST API](/guides/developer-sdk-and-api/rest-api-guide/management-rest-apis/) document for details.

## REST API reference

All REST methods and services are listed on the REST API reference page at [https://antmedia.io/rest](https://antmedia.io/rest) built with Swagger.

![](@site/static/img/rest.png)

Once you’ve set up your REST API access, authenticated, and made your first requests, you can start managing your Ant Media Server programmatically. You can create broadcasts, manage VoD content, control applications, and monitor clusters—all directly through the API.

Tada! You now have full control over your server through the REST API, enabling automated workflows and seamless management of your streaming infrastructure.