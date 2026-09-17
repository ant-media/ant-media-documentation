---
title: Set Up Firebase
description: Create a Firebase project and add Cloud Messaging to your Android app.
keywords: [Firebase Cloud Messaging, FCM Setup, Android Push Notifications, Ant Media Server Documentation]
sidebar_position: 1
sidebar_label: Set Up Firebase
---

# Set Up Firebase

Firebase Cloud Messaging (FCM) delivers push notifications to Android devices and web clients. Set up a Firebase project before integrating with Ant Media Server.

## Create a Firebase project

1. Open the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project or select an existing one.
3. Add your Android app with the correct package name.
4. Download `google-services.json` and place it in your app's module directory.
5. Enable **Cloud Messaging** in the Firebase Console.

![](@site/static/img/fcm.jpg)

## Next steps

1. [Create Project](/guides/developer-sdk-and-api/push-notification-management/android/create-project/) — set up an Android Studio project
2. [Add Dependencies](/guides/developer-sdk-and-api/push-notification-management/android/add-dependencies/) — WebRTC SDK and FCM library
3. [Server Setup](/guides/developer-sdk-and-api/push-notification-management/server-setup/) — upload the FCM service account JSON to AMS
