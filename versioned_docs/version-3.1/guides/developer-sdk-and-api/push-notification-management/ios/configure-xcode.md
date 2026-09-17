---
title: Configure Xcode
description: Enable push notifications and integrate Firebase Messaging in your iOS project.
keywords: [Xcode Push Notifications, Firebase Messaging iOS, Ant Media Server Documentation]
sidebar_position: 3
sidebar_label: Configure Xcode
---

# Configure Xcode

Enable push notification capabilities and integrate Firebase Messaging in your iOS project.

## Install Firebase SDK

Add Firebase Messaging to your `Podfile`:

```ruby
pod 'Firebase/Messaging'
```

Install:

```bash
pod install
```

## Enable capabilities

1. In Xcode, select your project in the Project Navigator.
2. Select your app target → **Signing & Capabilities**.
3. Add:
   - **Push Notifications**
   - **Background Modes** → enable **Remote notifications**

## Configure AppDelegate

Initialize Firebase and register for remote notifications in `AppDelegate.swift`:

```swift
import UIKit
import Firebase
import FirebaseMessaging

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication,
                     didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        FirebaseApp.configure()

        if #available(iOS 10.0, *) {
            UNUserNotificationCenter.current().delegate = self
            let authOptions: UNAuthorizationOptions = [.alert, .badge, .sound]
            UNUserNotificationCenter.current().requestAuthorization(options: authOptions, completionHandler: { _, _ in })
        } else {
            let settings = UIUserNotificationSettings(types: [.alert, .badge, .sound], categories: nil)
            application.registerUserNotificationSettings(settings)
        }

        application.registerForRemoteNotifications()
        Messaging.messaging().delegate = self
        return true
    }

    func application(_ application: UIApplication,
                     didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        Messaging.messaging().apnsToken = deviceToken
    }
}
```

## Handle notifications and token refresh

Extend `AppDelegate` with notification and messaging delegates:

```swift
extension AppDelegate: UNUserNotificationCenterDelegate, MessagingDelegate {

    func userNotificationCenter(_ center: UNUserNotificationCenter,
                                willPresent notification: UNNotification,
                                withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
        completionHandler([.alert, .badge, .sound])
    }

    func messaging(_ messaging: Messaging, didReceiveRegistrationToken fcmToken: String?) {
        print("FCM Token: \(fcmToken ?? "")")
        // Register this token with Ant Media Server
    }
}
```

Use the FCM token (or APNs device token) as `pushNotificationToken` when calling `registerPushNotificationToken`. See [Send Notifications](/guides/developer-sdk-and-api/push-notification-management/send-notifications/).

## Next steps

- [Server Setup](/guides/developer-sdk-and-api/push-notification-management/server-setup/) — upload APNs credentials to AMS
- [Send Notifications](/guides/developer-sdk-and-api/push-notification-management/send-notifications/) — register tokens and send messages
- [iOS SDK](/guides/developer-sdk-and-api/sdk-integration/ios-sdk/) — full WebRTC integration guide
