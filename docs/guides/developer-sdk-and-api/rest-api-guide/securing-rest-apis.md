---
title: API Security (IP)
description: This guide explains how to control REST API security on Ant Media Server. You could secure your REST services with the IP Filter feature.
keywords: [IP Filter for the REST API, Securing the REST API, IP Filter for the Web Panel, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

# Securing the REST API

This guide explains how to control REST API security on Ant Media Server. You can secure your REST services using the IP Filter feature.

## IP Filter for the REST API

If you want only certain IP addresses to access REST APIs, add IPs or IP ranges in the `Dashboard > {Application} > Settings > IP Filtering Settings` panel.

![](@site/static/img/rest-api/rest-api-ip-filter.png)

**If `127.0.0.1` is removed, requests from the server (localhost) will be blocked. Devices on the same network can still access the REST API, but external devices cannot unless explicitly added.**

To remove the REST Filter entirely in AMS, delete the following block from `/usr/local/antmedia/webapps/{Application-Name}/WEB-INF/web.xml`

```
<filter>
<filter-name>AuthenticationFilter</filter-name>
<filter-class>io.antmedia.console.rest.AuthenticationFilter</filter-class>
</filter>

<filter-mapping>
<filter-name>AuthenticationFilter</filter-name>`
<url-pattern>/rest/*</url-pattern>
</filter-mapping>
```

Deleting the `AuthenticationFilter` block allows everyone to access the REST API without restrictions.

**Here is a demo of how to configure the IP filter**

![](@site/static/img/rest-api/rest-api-ip-filtering-demo.gif)

## IP Filter for the Web Panel

To control which IPs can access the Web Panel:

1. Open `/usr/local/antmedia/conf/red5.properties` file.

2. By default, all IPs have access:

  ```server.allowed_dashboard_CIDR=0.0.0.0/0```

3. Update the configuration according to your CIDR notation. You can also use multiple comma-separated CIDRs:

  ```server.allowed_dashboard_CIDR=13.197.23.11/16,87.22.34.66/8```

4. Save the file and restart the Ant Media Server:

Now only the IPs that are in the CIDR block can access the Web panel.

```sudo service antmedia restart```

Now only IPs within the specified CIDR blocks can access the Web Panel.

For more details, check this demonstration:[IP Filter Gif](https://raw.githubusercontent.com/wiki/ant-media/Ant-Media-Server/images/ip-filter.gif)

Tada! With the IP Filter configured, your Ant Media Server is now more secure. Only trusted IPs can access the REST API and Web Panel, protecting your server from unauthorized access while still allowing legitimate management and control. Your setup is now safe, flexible, and ready for production use.
