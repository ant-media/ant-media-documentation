---
title: Accept Undefined Streams
description: This guide explains stream security options in Ant Media Server, and how you can Enable Disable, or Accept Undefined Streams.
keywords: [Enable or Disable Undefined Streams, Accept Undefined Streams, One Time Token Control, Stream security, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

This application setting is checking if the live stream is registered on Ant Media Server.

![undefined-streams](https://github.com/ant-media/ant-media-documentation/assets/86982446/f456c3e9-dbae-42af-8a6f-34ee0aa177e8)

For example, if Ant Media Server accepts undefined streams, it will accept any incoming streams. If `Accept Undefined Streams` option is disabled in application settings, then only streams with their stream id in the database are being accepted by Ant Media Server.

You can find more details about AMS application properties [here](https://antmedia.io/docs/guides/configuration-and-testing/ams-application-configuration/)

If this setting is disabled, then first register stream on the server by creating a live stream in the application with stream Id and stream name.

![](@site/static/img/stream-security/create-broadcast.png)

Now only the live stream with created streamId will be published on the server and rest other unregistered streams will be rejected.
