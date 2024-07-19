---
title: WebRTC Conference
description: WebRTC Conference Using JavaScript SDK 
keywords: [JavaScript SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 7
---

In order to test the conference sample, let's open conference.html file. Go to the definition of **websocketURL** variable and set you Ant Media Server EE instance's WebSocket URL.

![](@site/static/img/sdk-integration/javascript-sdk/edit-websocket-url-conference-sample.png)

 - Open your favorite browser and go to your http server's address.

 - Accept microphone and camera usage permissions.

![](@site/static/img/sdk-integration/javascript-sdk/accept-mic-cam-permissions-conference.png)

 - Enter the room id that you want to join and click the **Join Room** button.

![](@site/static/img/sdk-integration/javascript-sdk/conference-sample.png)

When there are other participants which are connected to the same room via Android, iOS, or the web, then a conference room will be established and users can communicate with each other.

You can quickly join as a second participant to the same room with opening same url in the second tab.