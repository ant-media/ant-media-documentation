---
title: Publisher IP Filter
description: This guide explains stream security options in Ant Media Server, and how you can Enable Disable, or Accept Undefined Streams.
keywords: [Enable or Disable Undefined Streams, Accept Undefined Streams, One Time Token Control, Stream security, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 6
---

:::info
Publisher IP Filter feature currently works only for the RTMP publishing.
:::

Publisher IP filter feature allows you to specify the IP addresses allowed for publishing. You can define multiple allowed IPs in CIDR format as comma (,) separated.

You can make changes in Publisher IP Filter from the application's advance settings via the AMS web panel.

Now, all application settings can be changed from the AMS web panel itself. Please check [here](https://antmedia.io/docs/guides/configuration-and-testing/ams-application-configuration/#management-panel-settings) for more information.

Example: 

```json
allowedPublisherCIDR=10.20.30.40/24,127.0.0.1
``` 

It allows IPs 10.20.30.\[0-255\] and 127.0.0.1. You can define the range or you can allow single IP as well.

You can read more about CIDR notation [here](https://whatismyipaddress.com/cidr/).
