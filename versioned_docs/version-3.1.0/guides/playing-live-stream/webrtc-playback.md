---
title: WebRTC Playback
description: Achieve sub-second latency with WebRTC playback with Ant Media Server.
keywords: [WebRTC playback, WebRTC playback with Ant Media Server, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

# WebRTC Playback

Ant Media Server (AMS) offers ultra-low latency WebRTC playback, enabling real-time streaming experiences.

By the end of this guide, you'll be playing a live stream back with WebRTC at sub-second latency.

## Requirements

- Ant Media Server **Enterprise Edition** — WebRTC playback isn't available on Community Edition.
- UDP ports `50000-60000` open on your server's firewall for WebRTC traffic.
- An active stream already broadcasting on the server — see [WebRTC Publishing](/guides/publish-live-stream/webrtc/) if you haven't started one yet.
- A [TURN server](/guides/advanced-usage/turn-installation/coturn-quick-installation/) if viewers are behind restrictive corporate firewalls (optional).

1. Visit `https://<DOMAIN_NAME>:5443/live/player.html`.
2. If you're running Ant Media Server on your local computer, you can also visit `http://localhost:5080/live/player.html`.
3. Write the stream ID in the text box — `stream1` by default.

 ![](@site/static/img/playing-live-streams/webrtc-playing/webrtc-player.png)

4. Press the `Start Playing` button. The WebRTC stream starts playing immediately.

   ![image](https://github.com/user-attachments/assets/7fece4b7-754d-4978-9a64-a6177f80b2d6)

You can also play the stream through the Ant Media Server embedded web player, `play.html`:

```
https://<DOMAIN_NAME>:5443/live/play.html?id=<STREAM_ID>
```

![play-bunny](https://github.com/user-attachments/assets/7b479b66-7c2c-45cf-8f63-311e47c58db1)

See [Embedded Web Player](/guides/playing-live-stream/embedded-web-player/) for more on embedding this into your own site.

You're now playing a live stream back with WebRTC at sub-second latency.

## Need Help?

If the player shows nothing after clicking Start Playing, confirm the stream is actually broadcasting and that UDP ports 50000-60000 are reachable, then reach out on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or contact [Technical Support](mailto:support@antmedia.io).

