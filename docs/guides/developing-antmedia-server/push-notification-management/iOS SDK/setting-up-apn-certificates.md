---
title: Configure APN Certificates 
description: Sending Notification in iOS Tutorial
keywords: [Push Notification Management Tutorial, Push Notification Management, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

## Step 2: Configure APN Certificates

Before Firebase Cloud Messaging (FCM) can send notifications to your iOS app, you need to configure the Apple Push Notification (APN) certificates.

### Generate an APN key:

1. Log in to your Apple Developer Account.
2. Go to Keys and click the plus (+) button to create a new key.
3. Enable Apple Push Notification service (APNs).
4. Download the generated `.p8` file once the key is created. Keep it secure, as it will be needed for Firebase configuration.

### Upload the APN key to Firebase:

1. Open the Firebase Console and navigate to your project.
2. Go to Project Settings > Cloud Messaging tab.
3. In the iOS app configuration section, upload the `.p8` file downloaded from Apple Developer.
4. Enter the following values from your Apple Developer account:
    - Key ID
    - Team ID

![](@site/static/img/fcm.jpg)

## Congratulations!

You’ve successfully configured your APN certificates and linked them with Firebase. Your iOS app is now ready to receive push notifications through Firebase Cloud Messaging (FCM) and Apple Push Notification service (APNs). With this step complete, you’re one step closer to enabling real-time notifications in your application.