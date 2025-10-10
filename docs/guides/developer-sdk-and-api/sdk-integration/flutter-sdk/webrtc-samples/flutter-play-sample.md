---
title: Playing WebRTC Stream in Flutter
description: Playing WebRTC Live Stream Sample Using Flutter SDK 
keywords: [Flutter SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

This guide shows how to play a WebRTC stream using the Flutter SDK sample app.

### Step 1: Set the Server Address

1. Once the sample app is installed and running on your device:

- Tap the Settings icon in the top-right corner.
  
  ![1000131640](https://github.com/user-attachments/assets/0ee23ed3-62eb-4bd8-a2cd-55ffb5615e82)

2. Enter the server details in the following format: ```wss://<ant_media_server_address>:<port>/application_name/websocket```

![](@site/static/img/flutter-sdk/Screenshot_2025-08-26_12-27-10.webp)
 
3. Tap **Set Server IP** to save the configuration.

### Step 2: Play a WebRTC Stream

1. Ensure that a stream is already publishing to the server with the same Stream ID you want to play.

2. Select Play from the main menu.

3. Enter the Stream ID of the stream you want to view.

  ![1000131648](https://github.com/user-attachments/assets/f2584f07-ce36-470e-8ed3-cc3d9cd03d18)

4. The WebRTC stream will begin playing in the app.

  ![1000131649](https://github.com/user-attachments/assets/8c034b6f-1e3d-4fa6-b816-b7ce8194a8b8)

You have successfully played a WebRTC stream using the Flutter SDK sample app.

