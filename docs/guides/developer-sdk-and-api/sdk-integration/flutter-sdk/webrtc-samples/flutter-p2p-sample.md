---
title: P2P Communication Sample in Flutter
description: P2P Communication Sample Using Flutter SDK 
keywords: [Flutter SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 5
---

### Step 1. Set the Server Address.
Once the app is installed and running on your device, enter the server IP address. To enter the IP address, please follow the below steps.

- Tap on the Setting icon in the top right corner of the application.
  
  ![1000131640](https://github.com/user-attachments/assets/0ee23ed3-62eb-4bd8-a2cd-55ffb5615e82)

- Enter the Server details as ```wss://ant_media_server_address:Port/live/websocket```

  ![1000131641](https://github.com/user-attachments/assets/1edd11f1-0813-4d2d-9dd1-afc7ed778178)
 
- Click **Set Server Ip** button to save it.

### Step 2. Start a P2P stream.

- Select P2P from the list item & enter the streamId that you want to join in P2P mode.

  ![1000131648](https://github.com/user-attachments/assets/eb6c1e68-9ffa-4d47-9d88-4aae28f112a2)

- When another peer is connected to the same streamId via Android, iOS, or the web, P2P communication will be established, and you can talk to each other.

- You can quickly join as a peer to the same streamId via the peer-to-peer sample page.

  ```https://your_domain:5443/live/peer.html```
