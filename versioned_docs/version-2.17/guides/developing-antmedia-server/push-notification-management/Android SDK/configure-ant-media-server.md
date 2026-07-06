---
title: Configure Ant Media Server 
description: Sending Notification in Android Tutorial
keywords: [Push Notification Management Tutorial, Push Notification Management, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 6
---

# Step 6: Configure Ant Media Server

To enable push notifications using Firebase Cloud Messaging (FCM), you need to connect your Firebase project with Ant Media Server.

## Obtain the FCM Private Key JSON

1. Go to the Firebase Console: Visit Firebase Console and log in with your Google account.
2. Create or Select a Project: Choose your existing project or create a new one for your app.
3. Navigate to Project Settings: In the project dashboard, click on the gear icon next to “Project Overview” and select “Project settings.”
4. Generate a Private Key:
  - Under the “Service accounts” tab, select “Generate new private key.”
  - Confirm the creation and a JSON file containing your private key will be downloaded to your device.

## Upload the JSON to Ant Media Server

1. Open the Management Panel: Log in to the Ant Media Server management console.
2. Select an Application: Choose the application where you want to enable push notifications.
3. Access Application-Level Settings: Go to the “Push Notification” section under application settings.
4. Upload the JSON: Upload the JSON private key file in this section to enable push notifications via FCM.
   
![](@site/static/img/push-notification-settings.jpg)

To protect the send push notification WebSocket message, you need to generate two subscriber authentication tokens with the sender’s Subscriber ID and the receiver’s Subscriber ID. You can call the [getSubscriberAuthenticationToken](https://antmedia.io/rest/#/default/getSubscriberAuthenticationToken) Rest API endpoint.

```bash
curl -X 'GET' 'https://your-antmedia-server-address:5443/WebRTCAppEE/rest/v2/push-notification/subscriber-auth-token?subscriberId=<your-subscriber-id>'
```

We will call the sender’s token as authToken in the rest of the documentation. We will call the sender’s Subscriber ID as subscriberId and we will call the receiver’s Subscriber ID as sendNotificationToSubscriber.

## Congratulations!

Your Ant Media Server is now configured with Firebase Cloud Messaging for push notifications. By securing notifications with subscriber authentication tokens, you’ve set up a reliable and secure notification system. From here, your application is ready to deliver real-time call alerts and interactive notifications directly to your Android users.
