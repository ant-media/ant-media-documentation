---
title: Release Notes
description: Ant Media Server release notes with highlights, breaking changes, upgrade notes, and security fixes for each version.
keywords: [changelog, release notes, breaking changes, upgrade, migration]
sidebar_position: 7
---

# Release Notes

This page summarizes what changed in each Ant Media Server release, with an emphasis on what you need to know **before upgrading**: breaking changes, deprecations, and security fixes.

The complete, per-component changelog for every release is on GitHub: [Ant-Media-Server releases](https://github.com/ant-media/Ant-Media-Server/releases). For upgrade instructions, see the [upgrade guide](/guides/installing-on-linux/upgrading-ant-media-server/).

:::tip Before you upgrade
Always back up `/usr/local/antmedia/conf`, your application settings, and (in cluster mode) the MongoDB database. Test the upgrade in a staging environment first. In clusters, upgrade node by node behind the load balancer.
:::

## Version 3.0

### 3.0.3 — May 2026

Maintenance release with stability and code quality improvements. See the [full changelog](https://github.com/ant-media/Ant-Media-Server/releases/tag/ams-v3.0.3).

### 3.0.2 — May 2026

Maintenance release focused on quality, security, and stability improvements. See the [full changelog](https://github.com/ant-media/Ant-Media-Server/releases/tag/ams-v3.0.2).

### 3.0.1 — April 2026

The first 3.0 line release. Highlights:

- **AV1 codec support** for next-generation compression efficiency ([#7164](https://github.com/ant-media/Ant-Media-Server/issues/7164)).
- **Strict-Transport-Security (HSTS) header** added for improved HTTPS security ([#7614](https://github.com/ant-media/Ant-Media-Server/issues/7614)).
- **Daily automatic SSL renewal checks** via systemd ([#7469](https://github.com/ant-media/Ant-Media-Server/issues/7469)).
- RTMP playback is now correctly blocked when the setting is disabled ([#7698](https://github.com/ant-media/Ant-Media-Server/issues/7698)).
- Improved database connection validation and refactored caching mechanism.
- Connection timeout added for non-RTSP streams in the stream fetcher ([#7418](https://github.com/ant-media/Ant-Media-Server/issues/7418)).

#### Breaking changes

- **Deprecated methods removed** ([#6874](https://github.com/ant-media/Ant-Media-Server/issues/6874)). If you build plugins, custom applications, or REST integrations against deprecated APIs from the 2.x line, review your code against the [3.0 Javadoc](https://antmedia.io/javadoc/) before upgrading.

#### Upgrade notes

- Coming from 2.x: upgrade to the latest 2.17.x first, verify your integrations compile against non-deprecated APIs, then move to 3.0.x.
- Custom plugins must be rebuilt against the 3.0 SDK.

## Version 2.17

### 2.17.1 — February 2026

- Timing is now properly converted from non-WebRTC protocols to WebRTC for smooth playback ([#7658](https://github.com/ant-media/Ant-Media-Server/issues/7658)).
- **Restreaming to SRT endpoints** is now supported (Enterprise Edition).
- **Local license server** support for air-gapped deployments (Enterprise Edition).
- Playlists now auto start/stop according to playback demand.
- Fixed successive "StreamId In Use" messages during reconnection in Circle.
- Security: fixes for CVE-2025-22228, CVE-2026-1002, and CVE-2021-23445.

### 2.17.0 — January 2026

- **Server-Side Ad Insertion (SSAI) with SCTE-35** via the [SCTE-35 plugin](https://github.com/ant-media/Plugins/tree/master/SCTE35Plugin).
- **WebRTC Web SDK v2** introduced — see the [v2 vs. v1 comparison](https://github.com/ant-media/StreamApp/blob/master/packages/webrtc-sdk/documents/V2-vs-V1.md) before migrating your JavaScript clients.
- **LL-HLS playback in cluster mode** (Enterprise Edition) ([#7533](https://github.com/ant-media/Ant-Media-Server/issues/7533)).
- Silent audio packets are injected only when there is ongoing video ([#7521](https://github.com/ant-media/Ant-Media-Server/issues/7521)).
- Fixed memory usage statistics in containerized environments ([#7020](https://github.com/ant-media/Ant-Media-Server/issues/7020)).

#### Upgrade notes

- The JavaScript Web SDK v1 keeps working, but new development should target SDK v2. Review the migration comparison linked above.

## Version 2.16

### 2.16.2 — December 2025

Security-focused maintenance release: fixes for CVE-2025-61795, CVE-2025-58056, CVE-2025-12383, CVE-2025-53864, CVE-2025-11226, and CVE-2025-55752. Upgrading is recommended for all 2.16.x deployments.

## Older releases

Release notes for earlier versions are available on the [GitHub releases page](https://github.com/ant-media/Ant-Media-Server/releases). Documentation for the previous versions can be selected from the version dropdown at the top of this site.

## Support policy

- The latest stable release receives new features and fixes.
- Previous minor releases receive security fixes on a best-effort basis; Enterprise Edition customers should contact [support@antmedia.io](mailto:support@antmedia.io) for guidance on supported upgrade paths.
