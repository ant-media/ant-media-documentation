---
title: CORS Filter
description: Customize Cross-Origin Resource Sharing for Ant Media Server applications and the root webapp.
keywords: [CORS Filter, Cross-Origin Resource Sharing, Stream Security, Ant Media Server Documentation]
sidebar_position: 7
sidebar_label: CORS Filter
---

# CORS Filter

By default, the CORS filter is enabled and allows requests from all origins (`*`). Customize it when you embed players or call APIs from specific domains.

## Application-level CORS

Edit `/usr/local/antmedia/webapps/{AppName}/WEB-INF/web.xml`:

```xml
	<filter>
		<filter-name>CorsFilter</filter-name>
		<filter-class>io.antmedia.filter.CorsHeaderFilter</filter-class>
		<init-param>
		    <param-name>cors.allowed.origins</param-name>
		    <param-value>*</param-value>
		 </init-param>
		 <init-param>
		 	<param-name>cors.allowed.methods</param-name>
		 	<param-value>GET,POST,HEAD,OPTIONS,PUT,DELETE</param-value>
		 </init-param>

		 <!-- cors.allowed.origins -> * and credentials are not supported at the same time.
		 If you set to cors.allowed.origins to specific domains and support credentials open the below lines
		 <init-param>
            <param-name>cors.support.credentials</param-name>
            <param-value>true</param-value>
         </init-param>
         -->
		 <init-param>
		 	<param-name>cors.allowed.headers</param-name>
            <param-value>Accept, Origin, X-Requested-With, Access-Control-Request-Headers, Content-Type, Access-Control-Request-Method, Authorization</param-value>
         </init-param>
         <async-supported>true</async-supported>
	</filter>
	<filter-mapping>
		<filter-name>CorsFilter</filter-name>
		<url-pattern>/*</url-pattern>
	</filter-mapping>
```

If playback or player embeds fail with a CORS error from another domain, set `cors.allowed.origins` to that origin and enable credentials:

```xml {6,15-18}
	<filter>
		<filter-name>CorsFilter</filter-name>
		<filter-class>io.antmedia.filter.CorsHeaderFilter</filter-class>
		<init-param>
		    <param-name>cors.allowed.origins</param-name>
		    <param-value>https://domain:port</param-value>
		 </init-param>
		 <init-param>
		 	<param-name>cors.allowed.methods</param-name>
		 	<param-value>GET,POST,HEAD,OPTIONS,PUT,DELETE</param-value>
		 </init-param>

		 <!-- cors.allowed.origins -> * and credentials are not supported at the same time.
		 If you set to cors.allowed.origins to specific domains and support credentials open the below lines -->
		 <init-param>
            <param-name>cors.support.credentials</param-name>
            <param-value>true</param-value>
         </init-param>
		 <init-param>
		 	<param-name>cors.allowed.headers</param-name>
            <param-value>Accept, Origin, X-Requested-With, Access-Control-Request-Headers, Content-Type, Access-Control-Request-Method, Authorization</param-value>
         </init-param>
         <async-supported>true</async-supported>
	</filter>
	<filter-mapping>
		<filter-name>CorsFilter</filter-name>
		<url-pattern>/*</url-pattern>
	</filter-mapping>
```

## Root webapp CORS

For the root app, edit `/usr/local/antmedia/webapps/root/WEB-INF/web.xml`:

```xml
	<filter>
		<filter-name>CorsFilter</filter-name>
		<filter-class>io.antmedia.filter.CorsHeaderFilter</filter-class>
		<init-param>
		  <param-name>cors.allowed.origins</param-name>
		  <param-value>*</param-value>
		</init-param>
		<init-param>
		  <param-name>cors.allowed.methods</param-name>
		  <param-value>GET,POST,HEAD,OPTIONS,PUT,DELETE</param-value>
		</init-param>
		 <init-param>
		 	<param-name>cors.allowed.headers</param-name>
            <param-value>Accept, Origin, X-Requested-With, Access-Control-Request-Headers, Content-Type, Access-Control-Request-Method, Authorization, ProxyAuthorization</param-value>
         </init-param>
	</filter>
	<filter-mapping>
		<filter-name>CorsFilter</filter-name>
		<url-pattern>/*</url-pattern>
	</filter-mapping>
```

:::info
See also the [Tomcat CORS Filter](https://tomcat.apache.org/tomcat-8.0-doc/api/index.html?org/apache/catalina/filters/CorsFilter.html) reference.
:::

Once origins match your real player and site domains, browsers can load streams cleanly while everything else stays blocked at the edge.
