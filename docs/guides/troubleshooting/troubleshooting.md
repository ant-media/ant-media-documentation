---
id: troubleshooting
title: Troubleshooting Guide
description: Centralized troubleshooting guide for Ant Media Server. Find your symptom, check the logs, and follow the step-by-step resolution.
keywords: [Ant Media Server Troubleshooting Guide, Ant Media Server Documentation, Ant Media Server Tutorials, WebRTC troubleshooting, cluster troubleshooting]
sidebar_position: 1
---

# Troubleshooting Overview

This section collects the most common Ant Media Server issues in one place. Each guide follows the same structure: **symptom → what to check in the logs → resolution steps → related documentation**.

## Find your issue

| Symptom | Guide |
| ------- | ----- |
| Stream does not publish or play with WebRTC, choppy or pixelated video, `no_stream_exist`, `notSetRemoteDescription` | [WebRTC Publish & Play Issues](/guides/troubleshooting/webrtc-publish-play-issues/) |
| WebRTC works locally but fails for remote users, SSL certificate errors, WebSocket connection failures | [SSL & TURN Issues](/guides/troubleshooting/ssl-and-turn-issues/) |
| Streams are not visible on all nodes, edge nodes cannot play, MongoDB connection problems | [Cluster Issues](/guides/troubleshooting/cluster-issues/) |
| High CPU or memory usage, "Resource Usage is High" error, server instability | [High CPU & Memory Usage](/guides/troubleshooting/high-cpu-and-memory/) |
| MP4/HLS recordings missing, 404 Not Found when playing recorded files, S3 upload problems | [Recording & S3 Issues](/guides/troubleshooting/recording-and-s3-issues/) |
| REST API returns 401/403, cannot authenticate to Management API, JWT problems | [REST API Authorization Issues](/guides/troubleshooting/rest-api-authorization-issues/) |

## Where to look first

Before diving into a specific guide, these are the primary sources of diagnostic information:

### Server logs

The main log files are located under `/usr/local/antmedia/log/`:

```shell
tail -f /usr/local/antmedia/log/ant-media-server.log
tail -f /usr/local/antmedia/log/antmedia-error.log
```

### Web Panel dashboard

Log in to the Web Panel at `http://YOUR_SERVER_IP:5080` and check System CPU Load, Memory, JVM Heap Memory, and the number of active live streams. Sustained CPU or memory usage above 75% is a strong indicator of a capacity problem. See the [Web Panel guide](/get-started/features/) for details.

### Built-in connection test tool

For WebRTC connectivity and bandwidth problems, use the built-in test page:

```
https://YOUR_DOMAIN:5443/live/webrtc-test-tool.html
```

### Browser developer console

For playback and publish issues in the browser, the developer console (F12) shows WebSocket errors, ICE connection failures, and JavaScript SDK callbacks such as `no_stream_exist` or `unauthorized_access`.

## Still stuck?

- Search the [FAQ](/faq/) for known questions and answers.
- Ask the community in [GitHub Discussions](https://github.com/orgs/ant-media/discussions).
- Enterprise Edition users can contact the support team at [support@antmedia.io](mailto:support@antmedia.io). Include your server version, deployment type (standalone/cluster), relevant log excerpts, and steps to reproduce for the fastest resolution.
