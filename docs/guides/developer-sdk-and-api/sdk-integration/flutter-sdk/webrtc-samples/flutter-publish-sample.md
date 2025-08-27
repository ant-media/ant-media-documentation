---
title: Publishing WebRTC Stream in Flutter
description: Publishing WebRTC Live stream Using Flutter SDK 
keywords: [Flutter SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

This guide shows how to publish a WebRTC stream using the Flutter SDK sample app.

### Step 1. Set the Server Address.
Once the sample app is installed and running on your device:

- Tap the Settings icon in the top-right corner.
  
  ![1000131640](https://github.com/user-attachments/assets/0ee23ed3-62eb-4bd8-a2cd-55ffb5615e82)

- Enter the Server details as ```wss://<ant_media_server_address>:<port>/<applicaiton_name>/websocket```

 ![](@site/static/img/flutter-sdk/Screenshot_2025-08-26_12-27-10.webp)

- Click **Set Server Ip** button to save it.

 ### Step 2: Publish a WebRTC Stream

- Select Publish from the main menu.

- Enter a Stream ID for your broadcast.

   ![1000131642](https://github.com/user-attachments/assets/ab6657b2-fcac-41f5-ba48-6ea726207699)

- Choose the publishing source:

* On iOS, the app records the app’s UI only (screen recording).

* On Android, the app records the entire device screen.

  ![1000131643](https://github.com/user-attachments/assets/0b5a37b3-c108-42ca-a102-7f495b03b3dc)


- The WebRTC stream will start publishing.

* You can switch between front and rear cameras while streaming.

  ![1000131647](https://github.com/user-attachments/assets/0b1a8b32-5937-4d66-ab49-7e8c1632f2e2)


### Step 3: Verify the Published Stream

- Open the Ant Media Server web panel in a browser:(e.g., http://server_ip:5080) and view the stream there.

You can also quickly play the stream via an embedded player. For more details, check [this document](https://antmedia.io/docs/guides/playing-live-stream/embedded-web-player/).
