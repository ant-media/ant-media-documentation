---
title: Sending Notification in Android 
description: Sending Notification in Android Tutorial
keywords: [Push Notification Management Tutorial, Push Notification Management, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

## Step 1: Configure APN Certificates

Before FCM can send notifications to your iOS app, you need to configure the APN certificates.

## Generate an APN key:

- Go to your Apple Developer Account.
- Select "Keys" and click the plus (+) button to create a new key.
- Enable Apple Push Notification service (APNs) and download the .p8 file once created.

## Upload the APN key to Firebase:

- Open the Firebase Console and navigate to your project.
- Go to Project Settings > Cloud Messaging tab.
- In the "iOS app configuration" section, upload the .p8 file you downloaded from Apple Developer.
- Provide the Key ID and the Team ID as shown on the Apple Developer account page.

![](@site/static/img/fcm.jpg)