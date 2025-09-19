---
title: WebRTC Conference in Flutter
description: WebRTC Conference Using Flutter SDK 
keywords: [Flutter SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---

This guide shows how to join a WebRTC conference room using the Flutter SDK sample app.

### Step 1: Set the Server Address

Once the sample app is installed and running on your device:

1. Tap the Settings icon in the top-right corner.  
  
  ![1000131640](https://github.com/user-attachments/assets/0ee23ed3-62eb-4bd8-a2cd-55ffb5615e82)

2. Enter the server details in the following format: ```wss://<ant_media_server_address>:<port>/application_name/websocket```

![](@site/static/img/flutter-sdk/Screenshot_2025-08-26_12-27-10.webp)

3. Tap  **Set Server Ip**  to save the configuration.


### Step 2: Join a Conference

1. Select Conference from the main menu.

2.  Enter:

- Stream ID → a unique identifier for your stream.

- Room ID → the conference room you want to join.

  ![1000131650](https://github.com/user-attachments/assets/0df6251d-17a4-4f82-8d65-60dcb5260a36)

3. When other participants connect with the same Room ID (via Android, iOS, or Web), a conference room will be established.

- All connected users will be able to communicate with each other in real time.
  
### Step 3: Join from the Web

- To test, you can quickly join the same Room ID from a web browser:

```https://<your_domain>:5443/<application_name>/<roomid>```

This allows you to connect multiple peers (Flutter + Web) in the same conference session.

You have successfully joined a WebRTC conference using the Flutter SDK sample app.
