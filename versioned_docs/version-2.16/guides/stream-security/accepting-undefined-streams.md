---
title: Accept Undefined Streams
description: Control whether Ant Media Server accepts publish requests for stream IDs that are not pre-registered.
keywords: [Accept Undefined Streams, stream registration, Stream Security, Ant Media Server Documentation]
sidebar_position: 1
sidebar_label: Accept Undefined Streams
---

# Accept Undefined Streams

This application setting controls whether Ant Media Server accepts live streams that are not already registered.

![undefined-streams](https://github.com/ant-media/ant-media-documentation/assets/86982446/f456c3e9-dbae-42af-8a6f-34ee0aa177e8)

- **Enabled** — any incoming stream ID is accepted.
- **Disabled** — only stream IDs that exist in the database can publish.

Configure it in application settings. For related options, see [AMS Application Configuration](/guides/configuration-and-testing/ams-application-configuration/).

When the setting is disabled, register the stream first by creating a broadcast with the stream ID and name you will use:

![](@site/static/img/stream-security/create-broadcast.png)

After that, only those registered stream IDs can publish; everything else is rejected.

With undefined streams locked down, you decide exactly which IDs are allowed on air—pair this with [one-time tokens](/guides/stream-security/one-time-token-control/), [JWT](/guides/stream-security/jwt-stream-security-filter/), or [TOTP](/guides/stream-security/totp/) when you need stronger access control.
