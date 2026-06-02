---
title: WebRTC Conference in Flutter
description: WebRTC Conference Using Flutter SDK 
keywords: [Flutter SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---

### Step 1. Set the Server Address.
Once the app is installed and running on your device, enter the server IP address. To enter the IP address, please follow the below steps.

- Tap on the Setting icon in the top right corner of the application.
  
  ![1000131640](https://github.com/user-attachments/assets/0ee23ed3-62eb-4bd8-a2cd-55ffb5615e82)

- Enter the Server details as ```wss://ant_media_server_address:Port/live/websocket```

  ![Screenshot_20250204-210520](https://github.com/user-attachments/assets/b2c5bf00-e90e-401e-a379-9efc47154311)

- Click **Set Server Ip** button to save it.

### Step 2. Setting the Conference

- Select the Conference option from the list.

- Enter the streamId, and roomId of the conference room that you want to join.

  ![1000131650](https://github.com/user-attachments/assets/0df6251d-17a4-4f82-8d65-60dcb5260a36)
  

- When there are other streams connected to the same roomId via Android, iOS, or the Web, then a conference room will be established and users can communicate with each other. 

- You can quickly join the conference room via the conference sample page.
  ```https://your-domain:5443/live/conference.html```

## Congratulations!

You have successfully set up the WebRTC Conference sample using the Flutter SDK. Your app can now connect multiple participants to the same room, enabling real-time video and audio communication across Android, iOS, and web clients.