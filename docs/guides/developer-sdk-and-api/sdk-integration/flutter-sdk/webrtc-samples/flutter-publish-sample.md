---
title: Publishing WebRTC stream Sample in Flutter
description: Publishing WebRTC Live stream Using Flutter SDK 
keywords: [Flutter SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

### Step 1. Set the Server Address.
Once the app is installed and running on your device, enter the server IP address. To enter the IP address, please follow the below steps.

- Tap on the Setting icon in the top right corner of the application.
  
  ![1000131640](https://github.com/user-attachments/assets/0ee23ed3-62eb-4bd8-a2cd-55ffb5615e82)

- Enter the Server details as ```wss://ant_media_server_address:Port/live/websocket```

  ![Screenshot_20250204-210520](https://github.com/user-attachments/assets/9eb4d8aa-a96c-469f-9caf-87176e1f8136)


- Click **Set Server Ip** button to save it.

 ### Step 2. Publish WebRTC stream.

- Select the Publish option from the list & enter the streamId.

   ![1000131642](https://github.com/user-attachments/assets/ab6657b2-fcac-41f5-ba48-6ea726207699)

- Choose the publishing source. Please note, that for the iOS, the app screen recording option records the app's UI only, while the Android app records the complete device screen.

  ![1000131643](https://github.com/user-attachments/assets/0b5a37b3-c108-42ca-a102-7f495b03b3dc)

- The WebRTC publish will be started. You can switch between the front & back cameras as well.

  ![1000131647](https://github.com/user-attachments/assets/0b1a8b32-5937-4d66-ab49-7e8c1632f2e2)


- To verify whether the stream was published successfully, open the web panel of your Ant Media Server (e.g., http://server_ip:5080) and view the stream there.

You can also quickly play the stream via an embedded player. For more details, check [this document](https://antmedia.io/docs/guides/playing-live-stream/embedded-web-player/).
