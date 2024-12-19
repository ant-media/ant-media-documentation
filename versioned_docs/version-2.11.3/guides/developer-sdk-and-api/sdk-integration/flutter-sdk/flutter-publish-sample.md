---
title: Publishing WebRTC stream Sample in Flutter
description: Publishing WebRTC Live stream Using Flutter SDK 
keywords: [Flutter SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 4
---

In order to run the publish sample app, select the `Publish` application from the target list and click the Run button. Once the app is installed and running on your device, enter the server IP address. To enter the IP address, please follow the below steps.

* Tap on the Setting icon in the top right corner of the application.
* Enter the Server IP as          `ws://ant_media_server_address:Port/WebRTCAppEE/websocket`
* Click **Set Server Ip** button to save it.

![](@site/static/img/IMG_F1372DF3182B-1(2).jpeg)

 - Select Publish list item.

![](@site/static/img/image-1654687508699.png)  

 - Enter the streamId which you want to publish.

![](@site/static/img/image-1654687625473.png) 

Choose the publishing source. Please note, for the iOS, app screen recording option records the app's UI only, while the Android app records the whole complete device screen.

![](@site/static/img/image-1654687706637.png)

To verify whether the stream is published successfully or not,  open the web panel of your Ant Media Server (e.g http://server_ip:5080) and view the stream there.

You can also quickly play the stream via an embedded player. Check [this document](https://antmedia.io/docs/guides/playing-live-stream/embedded-web-player/) for more details.
