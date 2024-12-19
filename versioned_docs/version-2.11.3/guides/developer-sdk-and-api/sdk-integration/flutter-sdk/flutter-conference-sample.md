---
title: WebRTC Conference in Flutter
description: WebRTC Conference Using Flutter SDK 
keywords: [Flutter SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 7
---

In order to run the Conference sample app, select the `Conference` application from the target list and click the Run button. Once the app is installed and running on your device, enter the server IP address. To enter the IP address, please follow the below steps.

* Tap on the Setting icon in the top right corner of the application.
* Enter the Server IP as          `ws://ant_media_server_address:Port/WebRTCAppEE/websocket`
* Click **Set Server Ip** button to save it.

![](@site/static/img/IMG_7404B1521BFA-1.jpeg)

 - Select Conference from list item.

![](https://lh3.googleusercontent.com/UV-_SAwEqBhU6IvWj3yWLd9rqAyNbVVlVktP-609CbjxtSjg4-ssoAK8Qvom8HLTOoRovoMIbl_Ae-HH7mdb30B_3tideWT-d6fx2nl7IB5LsX3oSbTFhOPIYLAIck0aLOvyqoLWObNrDilOkA )

 - Enter the streamId, and roomId of the conference room that you want to join.

![stream and room id.jpeg ](https://lh6.googleusercontent.com/AGwDbjsjQmCX9BNcKNGVHSliJ6V0IFxTyhihca7xK0M7uyllrLuT0Frglzfp1l6v1OZIZeMsHSi7Fh4FNKiT-eyCST5nI3YLJuQzQi4a-X_b1W96LNJRPCR3q_VihaAOePu3dGFwePLKeyW5-A )

When there are other streams connected to the same roomId via Android, iOS, or the Web, then a conference room will be established and users can communicate with each other. 

You can quickly join the conference room via the conference sample page.

`https://your-domain:5443/WebRTCAppEE/conference.html`
