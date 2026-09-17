---
title: Set Up APNs
description: Generate an APNs key and configure it in Firebase for iOS push delivery.
keywords: [APNs Setup, Apple Push Notification, iOS Push, Ant Media Server Documentation]
sidebar_position: 2
sidebar_label: Set Up APNs
---

# Set Up APNs

Apple Push Notification service (APNs) delivers notifications to iOS devices. Generate an APNs key before configuring Ant Media Server or Firebase.

## Generate an APNs key

1. Sign in to the [Apple Developer Portal](https://developer.apple.com/account/).
2. Go to **Certificates, Identifiers & Profiles → Keys**.
3. Click **(+)** to create a new key.
4. Enable **Apple Push Notifications service (APNs)**.
5. Register the key and download the `.p8` file. Note the **Key ID**.
6. Find your **Team ID** under **Membership** in the Apple Developer account.

Keep the `.p8` file secure — you cannot download it again.

## Upload to Firebase (optional)

If using Firebase Cloud Messaging as the delivery layer for iOS:

1. Open [Firebase Console](https://console.firebase.google.com/) → your project.
2. Go to **Project Settings → Cloud Messaging**.
3. Under the iOS app section, upload the `.p8` file.
4. Enter the **Key ID** and **Team ID**.

![](@site/static/img/fcm.jpg)

## Upload to Ant Media Server

Upload the same `.p8` key directly to AMS — see [Server Setup](/guides/developer-sdk-and-api/push-notification-management/server-setup/#upload-credentials-to-ams) for the management panel steps. Provide Key ID, Team ID, and Bundle ID.

## Next step

[Configure Xcode](/guides/developer-sdk-and-api/push-notification-management/ios/configure-xcode/) — enable push capabilities and integrate Firebase Messaging.
