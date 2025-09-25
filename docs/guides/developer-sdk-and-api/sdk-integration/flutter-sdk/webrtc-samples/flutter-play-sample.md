---
title: Playing WebRTC stream sample in Flutter
description: Playing WebRTC Live Stream Sample Using Flutter SDK 
keywords: [Flutter SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

### Step 1. Set the Server Address.
Once the app is installed and running on your device, enter the server IP address. To enter the IP address, please follow the below steps.

- Tap on the Setting icon in the top right corner of the application.
  
  ![1000131640](https://github.com/user-attachments/assets/0ee23ed3-62eb-4bd8-a2cd-55ffb5615e82)

- Enter the Server details as ```wss://ant_media_server_address:Port/live/websocket```

  ![Screenshot_20250204-210520](https://github.com/user-attachments/assets/8c9d1484-744e-4959-b503-d0c092807498)
 
- Click **Set Server Ip** button to save it.

### Step 2. Play the WebRTC Stream.

- Before playing, make sure that there is a stream that is already publishing to the server with the same streamId that you want to play.

- Select the Play option from the list & enter the streamId.

  ![1000131648](https://github.com/user-attachments/assets/f2584f07-ce36-470e-8ed3-cc3d9cd03d18)

- The WebRTC stream will start to play.

  ![1000131649](https://github.com/user-attachments/assets/8c034b6f-1e3d-4fa6-b816-b7ce8194a8b8)

## Congratulations!

You have successfully played a WebRTC stream using the Flutter SDK. Your app is now receiving live streams from the Ant Media Server, allowing you to view real-time video on your device. Enjoy exploring and interacting with live WebRTC content!