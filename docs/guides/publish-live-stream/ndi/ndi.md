---
title: NDI® Ingest Guide
description: Setting up NDI ingestion in Ant Media Server
keywords: [NDI]
sidebar_position: 1
---

# NDI® Ingest

[NDI® (Network Device Interface) is a proprietary media delivery protocol](https://docs.ndi.video/all/getting-started/what-is-ndi) over IP developed by [Vizrt NDI AB](https://www.newtek.com/). NDI® is a registered trademark of Vizrt NDI AB.

Ant Media Server supports ingesting NDI® signal and muxing that into any of the supported output formats.

## Prerequisites

Ant Media Server comes packed with NDI SDK, so the separate installation of the SDK is not necessary.

On Linux the NDI® SDK requires `avahi-daemon` to be running. You can install it using your package manager:

    $ sudo apt install -y avahi-daemon avahi-utils

For more information, visit: https://docs.ndi.video/all/developing-with-ndi/sdk/platform-considerations#linux

## Configuration

NDI® source discovery is started automatically after server startup. NDI sources are announced on the network
using mDNS. To use a dedicated NDI discovery server, [configure the NDI SDK](https://docs.ndi.video/all/developing-with-ndi/sdk/configuration-files), using the [platform dependent](https://docs.ndi.video/all/developing-with-ndi/sdk/platform-considerations#linux) configuration files, e.g. `$HOME/.ndi/ndi-config.v1.json`

The NDI® sources are picked up by exactly one Ant Media application, based on the `ndiSources` parameter in the
applications respective `[applicationName]/WEB-INF/red5-web.properties` files.

The value of the `ndiSources` property must be a JSON map that determines which NDI® sources are picked up
by that application and what should be the name of the broadast.

```
ndiSources={"ndiSourceName|regex:ndiSourceRegexPattern": "outputBroadcastName|outputBroadcastPattern", ...}
```

The keys of the map can be an exact NDI® source name, as published by the NDI® compatible software or device.
By using the `regex:` prefix it is possible to define patterns to pick up, such as: `regex:studio-camera-(\d+)`.
In `regex` case the parentheses can be used to capture a part of the NDI source name (like the camera number in
the previous example) and use that in the output broadcast name using the `$1` group reference notation.

Example configuration:

```
# Renaming a fixed incoming stream name to a fixed output name
ndiSources={"DESKTOP-IRNKKC9 (OBS Scene 12)": "football-1"}

# Map all numbered camera sources to numbered but simplified output names
ndiSources={"regex:studio-camera-(\d+)": "cam-$1"}
```

## Testing

The easiest way to generate an NDI® test stream is using the Test Patterns application from NDI® Tools that
you can install as part of the NDI® SDK.

![NDI Test pattern](/img/ndi/ndi-tools.png)