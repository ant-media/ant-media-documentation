---
title: Configure Ant Media Server 
description: Sending Notification in iOS Tutorial
keywords: [Push Notification Management Tutorial, Push Notification Management, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 4
---

# Configure Ant Media Server:

To obtain the APN private key for iOS push notifications, follow these steps:

1. Log in to the Apple Developer Portal: Visit Apple Developer and sign in with your Apple ID.
2. Go to Certificates, Identifiers & Profiles: Navigate to “Certificates, Identifiers & Profiles” from the dashboard.
3. Select Keys: In the left sidebar, select “Keys,” then click on the plus icon (+) to create a new key.
4. Create a New Key for Push Notifications:
  - Enter a name for the key, then enable “Apple Push Notifications service (APNs).”
  - Click “Continue” and then “Register” to create the key.

1. Go to the Firebase Console: Visit Firebase Console and log in with your Google account.
2. Create or Select a Project: Choose your existing project or create a new one for your app.
3. Navigate to Project Settings: In the project dashboard, click on the gear icon next to “Project Overview” and select “Project settings.”
4. Generate a Private Key:
  - Under the “Service accounts” tab, select “Generate new private key.”
  - Confirm the creation and a JSON file containing your private key will be downloaded to your device.
  - Enter a name for the key, then enable “Apple Push Notifications service (APNs).”
  - Click “Continue” and then “Register” to create the key.
  - Download the Private Key: Once the key is created, download the .p8 file containing the APNs private key and keep note of the Key ID shown. You will also need your Team ID, which is found in the “Membership” section of the Apple Developer portal.

After obtaining the .p8 private key file for APNs, save it to your Ant Media Server:

1. Open the Management Panel: Log in to the Ant Media Server management console.
2. Select an Application: Choose the application where you want to enable push notifications.
3. Access Application-Level Settings: Go to the “Push Notification” section under application settings.
4. Upload the .p8 File: In the APNs section, upload the .p8 file and provide the Key ID, Team ID, and Bundle ID of your iOS app to enable push notifications via APNs.

![](@site/static/img/push-notification-settings.jpg)

To protect the send push notification WebSocket message, you need to generate two subscriber authentication tokens with the sender’s Subscriber ID and the receiver’s Subscriber ID. You can call the [getSubscriberAuthenticationToken](https://antmedia.io/rest/#/default/getSubscriberAuthenticationToken) Rest API endpoint. 

```bash
curl -X 'GET' 'https://your-antmedia-server-address:5443/WebRTCAppEE/rest/v2/push-notification/subscriber-auth-token?subscriberId=<your-subscriber-id>'
```

We will call the sender’s token as authToken in the rest of the documentation. We will call the sender’s Subscriber ID as subscriberId and we will call the receiver’s Subscriber ID as sendNotificationToSubscriber.
