---
title: P2P Communication Sample in Flutter
description: P2P Communication Sample Using Flutter SDK 
keywords: [Flutter SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 5
---

This guide shows how to establish peer-to-peer (P2P) communication using the Flutter SDK sample app.

### Step 1: Set the Server Address

Once the sample app is installed and running on your device:

1. Tap the Settings icon in the top-right corner.
  
  ![1000131640](https://github.com/user-attachments/assets/0ee23ed3-62eb-4bd8-a2cd-55ffb5615e82)

2. Enter the server details in the following format: ```wss://<ant_media_server_address>:<port>/application_name/websocket```

![](@site/static/img/flutter-sdk/Screenshot_2025-08-26_12-27-10.webp)
 
3. Tap  **Set Server Ip**  to save the configuration.

### Step 2: Start a P2P Session

1. Select P2P from the main menu.

2. Enter the Stream ID you want to use for the P2P session.

![1000131648](https://github.com/user-attachments/assets/eb6c1e68-9ffa-4d47-9d88-4aae28f112a2)

3. When another peer (via Android, iOS, or Web) connects to the same Stream ID, a P2P communication session will be established.

- You will then be able to talk to each other in real time.


### Step 3: Join from Another Peer

To test the connection, you can quickly join the same Stream ID using a web browser:
  
  ```https://your_domain:5443/live/peer.html```

Open this page in a browser and enter the same Stream ID. The P2P connection will be established between your Flutter app and the web peer.

You have successfully set up and tested P2P communication using the Flutter SDK sample app.