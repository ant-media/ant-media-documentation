---
title: Release Notes
description: Highlights, breaking changes, and upgrade notes for Ant Media Server. Full changelogs live on GitHub.
keywords: [Ant Media Server release notes, changelog, breaking changes, upgrade]
sidebar_position: 100
---

# Release Notes

What you need before upgrading: breaking changes, security fixes, and notable features. Full per-component changelogs are on [GitHub Releases](https://github.com/ant-media/Ant-Media-Server/releases). Upgrade steps: [upgrade guide](/guides/installing-on-linux/upgrading-ant-media-server/).

:::tip Before you upgrade
Back up `/usr/local/antmedia/conf`, application settings, and (in cluster mode) MongoDB. Test in staging first. In a cluster, upgrade nodes one at a time behind the load balancer.
:::

## Version 3.0

### 3.0.3 — May 2026

Current stable. Maintenance release for stability and code quality.

→ [Full changelog](https://github.com/ant-media/Ant-Media-Server/releases/tag/ams-v3.0.3)

### 3.0.2 — May 2026

Maintenance release focused on quality, security, and stability.

→ [Full changelog](https://github.com/ant-media/Ant-Media-Server/releases/tag/ams-v3.0.2)

### 3.0.1 — April 2026

First release of the 3.0 line.

**Highlights**

- **AV1 codec support** ([#7164](https://github.com/ant-media/Ant-Media-Server/issues/7164))
- **HSTS** (`Strict-Transport-Security`) for HTTPS ([#7614](https://github.com/ant-media/Ant-Media-Server/issues/7614))
- **Daily automatic SSL renewal** via systemd ([#7469](https://github.com/ant-media/Ant-Media-Server/issues/7469))
- RTMP playback correctly blocked when disabled ([#7698](https://github.com/ant-media/Ant-Media-Server/issues/7698))
- Improved database connection validation and caching
- Connection timeout for non-RTSP streams in the stream fetcher ([#7418](https://github.com/ant-media/Ant-Media-Server/issues/7418))

**Breaking changes**

- Deprecated 2.x APIs removed ([#6874](https://github.com/ant-media/Ant-Media-Server/issues/6874)). Review plugins, custom apps, and REST clients against the [3.0 Javadoc](https://antmedia.io/javadoc/) before upgrading.

**Upgrade notes**

- From 2.x: move to the latest **2.17.x** first, then to **3.0.3**.
- Rebuild custom plugins against the 3.0 SDK.

→ [Full changelog](https://github.com/ant-media/Ant-Media-Server/releases/tag/ams-v3.0.1)

## Version 2.17

### 2.17.1 — February 2026

- Non-WebRTC → WebRTC timing conversion for smoother playback ([#7658](https://github.com/ant-media/Ant-Media-Server/issues/7658))
- **SRT restreaming** (Enterprise Edition)
- **Local license server** for air-gapped deployments (Enterprise Edition)
- Playlists auto start/stop based on demand
- Fix for successive “StreamId In Use” messages in Circle
- Security: CVE-2025-22228, CVE-2026-1002, CVE-2021-23445

→ [Full changelog](https://github.com/ant-media/Ant-Media-Server/releases/tag/ams-v2.17.1)

### 2.17.0 — January 2026

- **SSAI with SCTE-35** via the [SCTE-35 plugin](https://github.com/ant-media/Plugins/tree/master/SCTE35Plugin)
- **WebRTC Web SDK v2** — see [v2 vs v1](https://github.com/ant-media/StreamApp/blob/master/packages/webrtc-sdk/documents/V2-vs-V1.md) before migrating clients
- **LL-HLS in cluster mode** (Enterprise Edition) ([#7533](https://github.com/ant-media/Ant-Media-Server/issues/7533))
- Silent audio packets only when video is present ([#7521](https://github.com/ant-media/Ant-Media-Server/issues/7521))
- Fixed memory stats in containers ([#7020](https://github.com/ant-media/Ant-Media-Server/issues/7020))

**Upgrade notes**

- Web SDK v1 still works; new work should target SDK v2.

→ [Full changelog](https://github.com/ant-media/Ant-Media-Server/releases/tag/ams-v2.17.0)

## Version 2.16

### 2.16.2 — December 2025

Security maintenance release: CVE-2025-61795, CVE-2025-58056, CVE-2025-12383, CVE-2025-53864, CVE-2025-11226, CVE-2025-55752. Recommended for all 2.16.x deployments.

→ [Full changelog](https://github.com/ant-media/Ant-Media-Server/releases/tag/ams-v2.16.2)

## Older releases

Earlier versions: [GitHub Releases](https://github.com/ant-media/Ant-Media-Server/releases). Use the version dropdown on this site for older documentation sets.

## Support policy

- Latest stable (**3.0.x**) gets features and fixes.
- Older minors get security fixes on a best-effort basis.
- Enterprise upgrade guidance: [support@antmedia.io](mailto:support@antmedia.io)
