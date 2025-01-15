---
title: P2P Communication Sample in Flutter
description: P2P Communication Sample Using Flutter SDK 
keywords: [Flutter SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 5
---

In order to run the peer sample app, select the `Peer` application from the target list and click the Run button. Once the app is installed and running on your device, enter the server IP address. To enter the IP address, please follow the below steps.

* Tap on the Setting icon in the top right corner of the application.
* Enter the Server IP as          `ws://ant_media_server_address:Port/WebRTCAppEE/websocket`
* Click **Set Server Ip** button to save it.

![](@site/static/img/IMG_61C65FD7D641-1.jpeg)

 - Select P2P from the list item.

![](https://lh5.googleusercontent.com/n47OOeKbuiLx-xrAObZYkT1B0lx-2-Dkcxwgqri9pr9zfKK4u1RfeADusJwxR11MOcyly-pwiIxF8dBWmqY1I_QNcokHiazCgphUQxyW015Vi6OYT6Qpf6ONjsV3hdP0FZ2RuN0rZYy7XS4b4w )

 - Enter the streamId that you want to join in  mode.

![](https://lh3.googleusercontent.com/v7SfoBnIbnS-mexwFN6NbHapQQGeEWFYkJGkAL24ww6vi9iJ4SbTdIwcmKUxeXpLjkY2xuwlwe5A5y_T6oWqci1pAZVIgnVQUPm59TYV_HCwro6LVFgZSrGorQI3UyxILwpIPXX1YYY1wnMAVg )

When there is another peer connected to the same streamId via Android, iOS, or the web, P2P communication will be established, and you can talk to each other.

You can quickly join as a peer to the same streamId via the peer-to-peer sample page.

`https://your_domain:5443/WebRTCAppEE/peer.html`
