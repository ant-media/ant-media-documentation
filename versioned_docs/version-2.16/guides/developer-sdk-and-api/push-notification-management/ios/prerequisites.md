---
title: Prerequisites
description: Requirements for integrating push notifications in an iOS app with Ant Media Server.
keywords: [iOS Push Notifications, APNs Prerequisites, Ant Media Server Documentation]
sidebar_position: 1
sidebar_label: Prerequisites
---

# Prerequisites

Confirm the following before integrating push notifications in your iOS app.

## Apple Developer

- Active [Apple Developer account](https://developer.apple.com/) with access to Certificates, Identifiers & Profiles
- APNs key or certificate for your app's bundle identifier

## Development environment

- Xcode 12 or later with Swift 5.0 support
- A working iOS project in Xcode

## Firebase (optional)

If routing iOS notifications through FCM:

- Firebase project with your iOS app registered (matching bundle identifier)
- APNs key uploaded to Firebase — see [Set Up APNs](/guides/developer-sdk-and-api/push-notification-management/ios/setup-apn/)

## Testing device

- A physical iOS device — push notifications are **not supported** on the iOS Simulator

## Next step

[Set Up APNs](/guides/developer-sdk-and-api/push-notification-management/ios/setup-apn/) — generate an APNs key and link it with Firebase.
