---
title: Publisher IP Filter
description: Restrict RTMP publishing to allowed IP addresses using CIDR ranges in Ant Media Server.
keywords: [Publisher IP Filter, RTMP IP allowlist, CIDR, Stream Security, Ant Media Server Documentation]
sidebar_position: 6
sidebar_label: Publisher IP Filter
---

# Publisher IP Filter

:::info
Publisher IP Filter currently applies to **RTMP** publishing only.
:::

Use Publisher IP Filter to allow only specific publisher addresses. Enter one or more IPs or CIDR ranges, separated by commas.

Set `allowedPublisherCIDR` in the application’s advanced settings from the web panel. See [AMS Application Configuration](/guides/configuration-and-testing/ams-application-configuration/#management-panel-application-settings).

Example:

```json
allowedPublisherCIDR=10.20.30.40/24,127.0.0.1
```

This allows `10.20.30.0`–`10.20.30.255` and `127.0.0.1`. You can allow a single host or a range. Learn more about [CIDR notation](https://whatismyipaddress.com/cidr/).

Combine IP allowlisting with token-based controls from [Stream Security](/category/stream-security/) when you need both network and credential checks on publish.
