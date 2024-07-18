---
title: Publishing WebRTC stream Sample
description: Publishing WebRTC Live stream Using JavaScript SDK 
keywords: [JavaScript SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 4
---

In order to test the publish sample, let's open publish_webrtc.html file inside the samples folder. Go to the definition of **websocketURL** variable and set you Ant Media Server EE instance's WebSocket URL.

![](@site/static/img/sdk-integration/javascript-sdk/edit-websocket-url-publish-sample.png)

 - Open your favorite browser and go to your http server's address.

 - Accept microphone and camera usage permissions.

![](@site/static/img/sdk-integration/javascript-sdk/accept-mic-cam-permissions-publish.png)

 - Click publish button.

![](@site/static/img/sdk-integration/javascript-sdk/publish-sample.png)

To verify whether the stream is published successfully or not,  open the web panel of your Ant Media Server (e.g http://server_ip:5080) and view the stream there.

You can also quickly play the stream via an embedded player. Check [this document](https://antmedia.io/docs/guides/playing-live-stream/embedded-web-player/) for more details.
