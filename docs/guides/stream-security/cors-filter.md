---
title: CORS Filter
description: This guide explains stream security options in Ant Media Server and how you can enable, disable, or accept undefined Streams.
keywords: [Enable or Disable Undefined Streams, Accept Undefined Streams, One Time Token Control, Stream security, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 7
---

The CORS (Cross-Origin Resource Sharing) filter is enabled and accepts requests from everywhere by default.

If you want to customize the CORS filter at the application level, you can access the ```/usr/local/antmedia/webapps/{AppName}/WEB-INF/web.xml``` file.

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

In case, when trying to play the stream via any other domain or integrating the player into any domain then the CORS error can be faced. In that scenario, allow the specific domain and uncomment the commented part as below.

```xml
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

If you want to customize the CORS filter in root folder then you can do that by edit `web.xml` file under `/usr/local/antmedia/webapps/root/WEB-INF`

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
To learn more about CORS filter, check out [Tomcat CORS Filter](https://tomcat.apache.org/tomcat-8.0-doc/api/index.html?org/apache/catalina/filters/CorsFilter.html)
:::
