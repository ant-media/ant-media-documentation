---
title: Quickstart
description: REST API guide for Ant Media Server.
keywords: [REST API guide, REST API Documentation, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

# REST API Quickstart

Ant Media Server's REST API is thoughtfully designed, providing you with full control over your Ant Media Server's management. 

The REST API is organized into the following services:

* [***Broadcast Rest Service:***](https://antmedia.io/rest/#/ManagementRestService) Management of live streams and stream sources
* [***VOD Rest Service:***](https://antmedia.io/rest/#/VoD%20Rest%20Service) Management of video on-demand assets and recordings
* [***Management Rest Service:***](https://antmedia.io/rest/#/ManagementRestService) Non application specific commands such as user management and creating apps
* [***Cluster Service:***](https://antmedia.io/rest/#/default) Cluster management service

:::tip

The full [API reference guide is here](https://antmedia.io/rest). Refer to this [GitHub discussion](https://github.com/orgs/ant-media/discussions/5664) to find out **how to import the API REST methods into Postman**.

:::



To get started using the REST API you must have an instance of Ant Media Server running. Refer to our quickstart guide on [installing Ant Media Server](/quick-start) first if needed.

## API Services
The required base URL for API access varies depending on the specific service. For example, the broadcast service and VOD service APIs are associated with the rest path of a specific Ant Media Server application.

While executing web panel commands through the REST API, it is not necessary to include the application name in the request URL.

### Broadcast Service
```shell
http(s)ant-media-server:5080(5443)/{application}/rest/v2/broadcasts
```
### VoD Service
```shell
http(s)ant-media-server:5080(5443)/{application}/rest/v2/vods
```

### Management Service
```shell
http(s)ant-media-server:5080(5443)/rest/v2
```
### Cluster Service
```shell
http(s)ant-media-server:5080(5443)/rest/v2/cluster
```

## API Security

Ant Media Server offers two methods to secure your API requests. By default, the IP filter is enabled and bound to localhost at 127.0.0.1. 

In additional to IP filtering, you can enable JWT tokens and make secure API requests by passing the token in the request header. 

> ***Please Note:*** you cannot enable both at the same time. Ant Media Server will give preference to IP filtering which will result in failed API requests using JWT tokens. 

### IP Filtering

The REST interface only responds to the calls that are made from 127.0.0.1 by default. If you call from any other IP address, it does not return anything. However, you can add more trusted IP addresses so you can make API requests from other machines. 

Please refer to the [API security (IP)](/guides/developer-sdk-and-api/rest-api-guide/securing-rest-apis/) document for more details on how you can add more trusted IP addresses.

### JWT Tokens

If preferred, you can generate JWT tokens and pass these in the header of the API request. Either generate a permanent token or with an expiry date for an additional security layer. 

Please refer to the [API security (JWT)](/guides/developer-sdk-and-api/rest-api-guide/jwt-rest-api-filter/) document for more details on how to configure your JWT tokens.


## Management Service Authentication

To access the web panel using the API, you'll need to use the management REST service. Before you can make any API requests, its necessary to authenticate the access. 

There are two methods to access the management REST services, using a JWT Token or by name and password. 

Please refer to the [Web Panel REST API](/guides/developer-sdk-and-api/rest-api-guide/management-rest-apis/) document for more details on how to authenticate.


## REST API reference

All REST methods and services are listed in the REST API reference page at [https://antmedia.io/rest](https://antmedia.io/rest) built with Swagger.

![](@site/static/img/rest.png)

