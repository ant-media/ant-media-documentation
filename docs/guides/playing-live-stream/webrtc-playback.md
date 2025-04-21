---
title: WebRTC Playback
description: Achieve Sub-second latency with WebRTC Playback with Ant Media Server.
keywords: [WebRTC playback, WebRTC playback with Ant Media Server, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

WebRTC playback is only available in Ant Media Server Enterprise Edition (EE).

**Note:** For WebRTC playing, please ensure that UDP ports  `50000-60000`  are open on your server's firewall.

If a client is behind a corporate firewall or has network restrictions, you can utilize the TURN server to redirect WebRTC traffic. More details can be found [here](https://antmedia.io/docs/guides/advanced-usage/turn-instalation/coturn-quick-installation/).

Before you play a stream with WebRTC, please ensure the stream is broadcasting on the server.

> Quick Link: [Learn How to Publish with WebRTC](https://antmedia.io/docs/guides/publish-live-stream/webrtc/)

1. Visit ```https://AMS_domain_name:5443/live/player.html```.
2. If you're running Ant Media Server on your local computer, you can also visit ```http://localhost:5080/live/player.html```
3. Write the stream id in text box, ```stream1``` by default.

 ![](@site/static/img/playing-live-streams/webrtc-playing/webrtc-player.png)

4. Press ```Start Playing``` button. After you press the button, the WebRTC stream starts playing

   ![image](https://github.com/user-attachments/assets/7fece4b7-754d-4978-9a64-a6177f80b2d6)

   You can also use the URL format listed below to play the WebRTC stream using the Ant Media Server Embedded web player, play.html:

   `https://AMS_domain_name:5443/WebRTCAppEE/play.html?id=streamId`

   ![play-bunny](https://github.com/user-attachments/assets/7b479b66-7c2c-45cf-8f63-311e47c58db1)


Check [Embedded Web Player](https://antmedia.io/docs/guides/playing-live-stream/embedded-web-player/) document for more information.

Congrats. You're playing your stream with WebRTC having ultra-low latency.
