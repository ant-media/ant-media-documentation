---
title: P2P Communication Sample
description: P2P Communication Sample Using JavaScript SDK 
keywords: [JavaScript SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 6
---

In order to test the peer-to-peer sample, let's open the `peer.html` file. Go to the definition of **websocketURL** variable and set your Ant Media Server EE WebSocket URL as shown below.

![](@site/static/img/sdk-integration/javascript-sdk/edit-websocket-url-peer-sample.png)

 - Open your browser and go to your HTTP server's address.

 - Accept microphone and camera usage permissions.

![](@site/static/img/sdk-integration/javascript-sdk/accept-mic-cam-permissions-peer.png)

 - Enter the `streamId` that you want to join and click the **Join** button.

![](@site/static/img/sdk-integration/javascript-sdk/peer-sample.png)

When there is another peer connected to the same streamId via Android, iOS, or the web, P2P communication will be established, and you can talk to each other.

You can quickly join as another peer to the same streamId by opening the same URL in the second tab.
