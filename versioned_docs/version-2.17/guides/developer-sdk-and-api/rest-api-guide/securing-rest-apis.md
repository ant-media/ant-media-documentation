---
title: Secure with IP Filter
description: Restrict Ant Media Server REST API and web panel access to trusted IP addresses.
keywords: [IP Filter REST API, Securing REST API, Web Panel IP Filter, Ant Media Server Documentation]
sidebar_position: 2
sidebar_label: Secure with IP Filter
---

# Secure with IP Filter

IP filtering limits who can call the application REST API and who can open the web panel. It is the default security model for REST on Ant Media Server.

## Application REST API

Allow only specific IPs or CIDR ranges to call `/{application}/rest/v2/...` endpoints.

1. Open the Ant Media Server web panel.
2. Select your application.
3. Go to **Settings → IP Filter Settings**.
4. Add trusted IPs or ranges, then save.

![](@site/static/img/rest-api/rest-api-ip-filter.png)

:::warning
If you remove `127.0.0.1`, local scripts and tools running on the server cannot call the REST API. Keep localhost allowed unless you intentionally block it.
:::

Devices on an allowed network can reach the API; others cannot until you add their address.

![](@site/static/img/rest-api/rest-api-ip-filtering-demo.gif)

## Web panel access

Control which IPs can open the management dashboard by editing server properties:

1. Open `/usr/local/antmedia/conf/red5.properties`.
2. Find `server.allowed_dashboard_CIDR`.

Default (all IPs):

```properties
server.allowed_dashboard_CIDR=0.0.0.0/0
```

Restrict to specific CIDRs (comma-separated):

```properties
server.allowed_dashboard_CIDR=13.197.23.11/16,87.22.34.66/8
```

3. Save the file and restart:

```bash
sudo service antmedia restart
```

Only clients inside those CIDR blocks can access the web panel afterward.

## When to use IP filter vs JWT

| Scenario | Prefer |
|----------|--------|
| Scripts on the same host or VPC | IP filter |
| Fixed office / NAT egress IPs | IP filter |
| Backends in changing cloud IPs | [JWT filter](/guides/developer-sdk-and-api/rest-api-guide/jwt-rest-api-filter/) |
| Third-party systems calling AMS | JWT filter |

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| API silent from your laptop | Your public IP is not listed | Add your current egress IP (check what AMS sees) |
| Broke after removing `127.0.0.1` | Localhost blocked | Add `127.0.0.1` back to the application IP filter |
| Web panel unreachable | Dashboard CIDR too strict | Temporarily set `0.0.0.0/0`, restart, then tighten again |
| Works in browser but not curl | Different source IP (proxy/VPN) | Align filter with the IP that actually hits the server |
| Behind a load balancer | AMS sees the LB IP, not the client | Allow the load balancer / proxy IP, or terminate auth at the edge |

With trusted IPs configured, your REST surface is limited to known networks — a solid default before you automate broadcast and VoD operations from those hosts.
