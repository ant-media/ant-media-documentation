---
title: CORS Filter
description: This guide explains stream security options in Ant Media Server, and how you can Enable Disable, or Accept Undefined Streams.
keywords: [Enable or Disable Undefined Streams, Accept Undefined Streams, One Time Token Control, Stream security, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 7
---

CORS(Cross-Origin Resource Sharing) Filter is enabled and accepts requests from everywhere by default.

If you want to customize by yourself CORS Filters in Application, you can access in ```SERVER_FOLDER``` / ```webapps``` / ```{Application}``` / ```WEB-INF``` / web.xml

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

If you want to customize by yourself CORS Filters in Root, you can access in ```SERVER_FOLDER``` / ```webapps``` / ```root``` / ```WEB-INF``` / web.xml

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
</filter>
<filter-mapping>
  <filter-name>CorsFilter</filter-name>
  <url-pattern>/*</url-pattern>
</filter-mapping>
```

:::info
Quick Learn: [Tomcat CORS Filter](https://tomcat.apache.org/tomcat-8.0-doc/api/index.html?org/apache/catalina/filters/CorsFilter.html)
:::
