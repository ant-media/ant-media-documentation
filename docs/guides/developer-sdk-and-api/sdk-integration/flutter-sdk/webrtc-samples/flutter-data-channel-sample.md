---
title: Data Channel Sample for Flutter
description: Data Channel Sample for Flutter SDK 
keywords: [Flutter SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 4
---

This guide shows how to use WebRTC Data Channels with the Flutter SDK sample app to send and receive messages alongside media streams.

### Step 1: Set the Server Address

Once the sample app is installed and running on your device:

1. Tap the Settings icon in the top-right corner.
  
  ![1000131640](https://github.com/user-attachments/assets/0ee23ed3-62eb-4bd8-a2cd-55ffb5615e82)

2. Enter the server details in the following format: ```wss://<ant_media_server_address>:<port>/application_name/websocket```

![](@site/static/img/flutter-sdk/Screenshot_2025-08-26_12-27-10.webp)

3. Tap  **Set Server Ip**  to save the configuration.


### Step 2: Use the Data Channel

1. Select DataChannel from the main menu.

2. Enter the Stream ID to connect.

  ![1000131648](https://github.com/user-attachments/assets/91b7e4ae-07ad-481e-b89f-4659e38fdf2e)

3. Once connected:

- Tap the Send button to send messages.

- Incoming messages from other users will appear in the app.

### Step 3: Test with the Web Player

You can test the Data Channel by joining the same Stream ID from a web browser:

  ```https://your-domain:5443/live/player.html```

From the player page, you can send and receive messages through the Data Channel alongside the video stream.

You have successfully used the Data Channel feature in the Flutter SDK sample app.