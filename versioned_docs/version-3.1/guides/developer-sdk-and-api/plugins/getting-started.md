---
title: Getting Started
description: Install and verify Ant Media Server plugins.
keywords: [Ant Media Server Plugin, Plugin Installation, Ant Media Server Documentation]
sidebar_position: 1
sidebar_label: Getting Started
---

# Getting Started

Install a plugin by copying its JAR file into the AMS plugins directory and restarting the server.

## What is a plugin?

A plugin is a JAR module that AMS loads at startup. Plugins hook into the media pipeline to process frames or packets, add REST endpoints, or ingest custom broadcast sources—without changing core server code.

Examples built as plugins: **Filter**, **DRM**, **Low Latency HLS Plugin**, and more.

## Install a plugin

### Prerequisites

- Filesystem access to the AMS install directory
- Plugin JAR or ZIP file

:::warning
Back up server configuration and data before installing new plugins.
:::

### Steps

1. Copy the plugin JAR to the plugins directory:

```bash
sudo cp plugin_name.jar /usr/local/antmedia/plugins/
```

Default path: `/usr/local/antmedia/plugins`

2. Set ownership:

```bash
sudo chown antmedia:antmedia /usr/local/antmedia/plugins/plugin_name.jar
```

3. Restart AMS:

```bash
sudo service antmedia restart
```

4. Verify in the log:

```bash
grep plugin /usr/local/antmedia/log/ant-media-server.log
```

Look for a line confirming your plugin loaded.

## Next steps

- [Plugin architecture](/guides/developer-sdk-and-api/plugins/plugin-architecture/) — how data flows through plugins
- [Develop a plugin](/guides/developer-sdk-and-api/plugins/developing-plugins/) — API reference
- [Build your first plugin](/guides/developer-sdk-and-api/plugins/build-first-plugin/) — hands-on tutorial
- [Available plugins](/guides/developer-sdk-and-api/plugins/plugins-for-ant-media-server/) — Filter, DRM, LL-HLS, and more
