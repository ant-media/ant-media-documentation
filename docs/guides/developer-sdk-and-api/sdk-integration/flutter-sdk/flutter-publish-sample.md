---
title: Publishing WebRTC stream Sample in Flutter
description: Publishing WebRTC Live stream Using Flutter SDK 
keywords: [Flutter SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 4
---

Select the Publish app from the target list and click the Run button. Once the app is running, enter the server IP address. For entering the IP address please follow the below steps.

*   Tap on the Setting icon in the top right corner of the application.
*   Enter the Server IP as ws://ant\_media\_server\_address:ip/WebRTCAppEE/websocket
*   Tap the 'Set Server Ip' button.

![](@site/static/img/IMG_F1372DF3182B-1(2).jpeg)

Select Publish list item.

![](@site/static/img/image-1654687508699.png)  

Enter the stream Id which you want to publish.

![](@site/static/img/image-1654687625473.png) Choose the publishing source. Please note, for the iOS app screen recording option, records the app's UI only, while the Android app records the whole complete device screen.

![](@site/static/img/image-1654687706637.png)

To verify whether the stream is published successfully or not,  please open the web panel of Ant Media Server (e.g http://server\_ip:5080) and check for the newly created stream. You can also quickly play the stream via web player [https://your\_domain:5443/WebRTCAppEE/player.html](https://your_domain:5443/WebRTCAppEE/player.html )
