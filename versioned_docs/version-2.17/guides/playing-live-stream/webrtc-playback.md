---
title: WebRTC Playback
description: Achieve Sub-second latency with WebRTC Playback with Ant Media Server.
keywords: [WebRTC playback, WebRTC playback with Ant Media Server, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

Ant Media Server (AMS) offers ultra-low latency WebRTC playback, enabling real-time streaming experiences.

### Prerequisites
- **Ant Media Server Enterprise Edition (EE):** WebRTC playback is supported only in the Enterprise Edition.
- **Open UDP Ports:** Ensure that UDP ports 50000–60000 are open on your server's firewall to facilitate WebRTC traffic.
- **Active Stream:** Verify that the stream is actively broadcasting on the server before attempting playback. Quick Link: [Learn How to Publish with WebRTC](https://antmedia.io/docs/guides/publish-live-stream/webrtc/)
- **TURN Server (Optional):** If viewers are behind corporate firewalls or experience restricted network conditions, consider routing WebRTC traffic through a TURN server [here](https://antmedia.io/docs/guides/advanced-usage/turn-instalation/coturn-quick-installation/). 

1. Visit ```https://AMS_domain_name:5443/live/player.html```.
2. If you're running Ant Media Server on your local computer, you can also visit ```http://localhost:5080/live/player.html```
3. Write the stream id in text box, ```stream1``` by default.

 ![](@site/static/img/playing-live-streams/webrtc-playing/webrtc-player.png)
 
4. Press ```Start Playing``` button. After you press the button, the WebRTC stream starts playing

   ![image](https://github.com/user-attachments/assets/7fece4b7-754d-4978-9a64-a6177f80b2d6)

   You can also use the URL format listed below to play the WebRTC stream using the Ant Media Server Embedded web player, play.html:

   `https://AMS_domain_name:5443/live/play.html?id=streamId`

   ![play-bunny](https://github.com/user-attachments/assets/7b479b66-7c2c-45cf-8f63-311e47c58db1)


Check [Embedded Web Player](https://antmedia.io/docs/guides/playing-live-stream/embedded-web-player/) document for more information.

Congrats. You're playing your stream with WebRTC having ultra-low latency.

<br /><br />
---

<div align="center">
<h2> WebRTC Playback- Slice of cake! 🍰 </h2>
</div>

Congratulations! You've successfully set up **WebRTC playback with Ant Media Server**. Your viewers can now enjoy **real-time streaming with minimal latency**, enhancing their viewing experience.
With WebRTC, you've embraced a modern, efficient streaming protocol that ensures high-quality delivery and responsiveness. Your content is now more accessible and engaging than ever before.

