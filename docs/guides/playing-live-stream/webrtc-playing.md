# WebRTC Playback

WebRTC playback is only available in Ant Media Server Enterprise Edition (EE).

Before playing a stream with WebRTC, make sure that stream is broadcasting on the server.

> Quick Link: [Learn How to Publish with WebRTC](https://antmedia.io/docs/guides/publish-live-stream/webrtc/)

1. Visit ```https://AMS_domain_name:5443/WebRTCAppEE/player.html```. If you're running Ant Media Server in your local computer, you can also visit ```http://localhost:5080/WebRTCAppEE/player.html```
2. Write the stream id in text box( ```stream1``` by default)

 ![](@site/static/img/playing-live-streams/webrtc-playing/webrtc-player.png)
3. Press ```Start Play``` button. After you press the button, WebRTC stream starts playing

   ![](@site/static/img/playing-live-streams/webrtc-playing/play-started.png)

   You can also use the URL format listed below to play the WebRTC stream using the Ant Media Server Embed player (play.html):

   `https://AMS_domain_name:5443/WebRTCAppEE/play.html?name=streamId`

   Congrats. You're playing with WebRTC. Please check the latency.
