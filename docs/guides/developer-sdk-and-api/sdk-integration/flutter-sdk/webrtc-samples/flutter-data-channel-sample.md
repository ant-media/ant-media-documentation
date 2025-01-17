---
title: Data Channel Sample for Flutter
description: Data Channel Sample for Flutter SDK 
keywords: [Flutter SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 4
---

### Step 1. Set the Server Address.
Once the app is installed and running on your device, enter the server IP address. To enter the IP address, please follow the below steps.

- Tap on the Setting icon in the top right corner of the application.
  
  ![1000131640](https://github.com/user-attachments/assets/0ee23ed3-62eb-4bd8-a2cd-55ffb5615e82)

- Enter the Server details as ```wss://ant_media_server_address:Port/live/websocket```

  ![1000131641](https://github.com/user-attachments/assets/1edd11f1-0813-4d2d-9dd1-afc7ed778178)
 
- Click **Set Server Ip** button to save it.

### Step 2. Using data channel

- Select DataChannel from the list & enter the streamId.

  ![1000131648](https://github.com/user-attachments/assets/91b7e4ae-07ad-481e-b89f-4659e38fdf2e)

- Once the stream is published, the user can start sending messages using the send button and also see the received messages from other users.

- You can quickly play the stream via the sample page and send and receive the data channel messages.
  ```https://your-domain:5443/live/player.html```
