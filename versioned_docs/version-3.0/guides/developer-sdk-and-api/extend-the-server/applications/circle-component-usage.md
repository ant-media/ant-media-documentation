---
title: Circle Component
description: Embed the Circle conference UI into your web application.
keywords: [Circle App, Conference Component, Ant Media Server Documentation]
sidebar_position: 2
sidebar_label: Circle Component
---

# Circle Component

[Circle](https://github.com/ant-media/conference-call-application) is Ant Media's self-hosted video conferencing application. It supports up to 200 participants per room with ultra-low latency WebRTC. Embed the Circle React component in your existing web app so users join conferences without leaving your site.

## Requirements

- Ant Media Server **Enterprise Edition**
- Node.js v20 LTS
- npm v9+

## Build Circle

1. Clone the repository:

```bash
git clone https://github.com/ant-media/conference-call-application.git
cd conference-call-application/react
npm install --legacy-peer-deps
npm run build
```

2. Copy the `static` folder from `react/build/` into your web application's public path.

3. Include the built assets in your HTML `<head>` (filenames change with each build — check your `build` folder):

```html
<script defer="defer" src="./static/js/main.9c1bebc8.js"></script>
<link href="./static/css/main.24ed3d1e.css" rel="stylesheet" />
```

## Embed the component

Add the container element with your server and room configuration:

```html
<div id="root"
     data-room-name="my-room"
     data-websocket-url="wss://your-domain:5443/live/websocket"
     style="background-color: #001D1A; box-sizing: border-box; height: 480px; width: 640px; position: relative;">
</div>
```

| Attribute | Value |
|-----------|-------|
| `data-room-name` | Conference room ID |
| `data-websocket-url` | AMS WebSocket URL — use `wss://` when [SSL is enabled](/guides/installing-on-linux/setting-up-ssl/) (port **5443**) |

Replace `live` with your application name.

## Verify

Open your page, join the room, and open the same room in a second browser tab to confirm multi-user conferencing.
