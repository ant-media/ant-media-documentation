---
title: WebRTC Conference
description: WebRTC Conference Using JavaScript SDK 
keywords: [JavaScript SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 7
---

In order to test the conference sample, let's open the `conference.html` file. Go to the definition of **websocketURL** variable and set your Ant Media Server WebSocket URL.

![](@site/static/img/sdk-integration/javascript-sdk/edit-websocket-url-conference-sample.png)

 - Open your browser and go to your http server's address.

 - Accept microphone and camera usage permissions.

![](@site/static/img/sdk-integration/javascript-sdk/accept-mic-cam-permissions-conference.png)

 - Enter the room id that you want to join and click the **Join Room** button.

![](@site/static/img/sdk-integration/javascript-sdk/conference-sample.png)

When there are other participants who are connected to the same room via Android, iOS, or the web, then a conference room will be established and users can communicate with each other.

You can quickly join as a second participant in the same room by opening the same URL in the second tab.
