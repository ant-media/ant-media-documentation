---
title: Data Channel Sample for Flutter
description: Data Channel Sample for Flutter SDK 
keywords: [Flutter SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 8
---

In order to run the data channel sample app, select the `DataChannel` application from the target list and click the Run button. Once the app is installed and running on your device, enter the server IP address. To enter the IP address, please follow the below steps.

* Tap on the Setting icon in the top right corner of the application.
* Enter the Server IP as          `wss://ant_media_server_address:5443/WebRTCAppEE/websocket`
* Click **Set Server Ip** button to save it.

![](@site/static/img/IMG_A2C7D0611FF7-1.jpeg)

 - Select DataChannel from list item.

 ![](@site/static/img/IMG_634E4AB6B820-1.jpeg)

 - Enter the stream Id which you want to publish for the data channel.

![](@site/static/img/IMG_E70F9A26E9DD-1.jpeg)

 - After entering the streamId following type of chat screen will
   appear.
   
![](@site/static/img/IMG_2600ABC725B1-1.jpeg)


Once the stream is published, the user can start sending messages using the send button and also see the received messages from other users.

You can quickly play the stream via a sample page and send and receive the data channel messages.

https://your-domain:5443/WebRTCAppEE/player.html
