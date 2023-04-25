---
title: WebRTC Playback
sidebar_position: 1
---

WebRTC playback is only available in Ant Media Server Enterprise Edition (EE).

**Note:** For WebRTC playing, please ensure that UDP ports  `50000-60000`  are open on your server's firewall.

If client is behind a corporate firewall or have network restrictions, you can utilize TURN server to redirect WebRTC traffic. More details can be found [here](https://antmedia.io/docs/guides/advanced-usage/turn-and-stun-installation/coturn-quick-installation/).

Before playing a stream with WebRTC, make sure that stream is broadcasting on the server.

> Quick Link: [Learn How to Publish with WebRTC](https://antmedia.io/docs/guides/publish-live-stream/webrtc/)

1. Visit ```https://AMS_domain_name:5443/WebRTCAppEE/player.html```. If you're running Ant Media Server in your local computer, you can also visit ```http://localhost:5080/WebRTCAppEE/player.html```
2. Write the stream id in text box( ```stream1``` by default)

 ![](@site/static/img/playing-live-streams/webrtc-playing/webrtc-player.png)

3. Press ```Start Playing``` button. After you press the button, WebRTC stream starts playing

   ![](@site/static/img/playing-live-streams/webrtc-playing/play-started.png)

   You can also use the URL format listed below to play the WebRTC stream using the Ant Media Server Embedded web player (play.html):

   `https://AMS_domain_name:5443/WebRTCAppEE/play.html?name=streamId`

Check [Embedded Web Player](https://antmedia.io/docs/guides/playing-live-stream/embedded-web-player/) document for more information.

Congrats. You're playing with WebRTC. Please check the latency.
