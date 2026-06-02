---
title: Configure Your iOS Project in Xcode 
description: Sending Notification in iOS Tutorial
keywords: [Push Notification Management Tutorial, Push Notification Management, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---

## Step 3: Configure Your iOS Project in Xcode

Now let’s set up your iOS project to handle Firebase Cloud Messaging (FCM) and Apple Push Notifications (APN).

### 1) Install Firebase SDK:

- Open your project’s Podfile and add the Firebase dependency:

```ruby
pod 'Firebase/Messaging'
```

- Run the following command to install the pods:

```bash
pod install
```
This integrates Firebase Messaging into your iOS project.


### 2) Enable Push Notifications:

1. In Xcode, select your project from the Project Navigator.
2. Under your app’s target, go to Signing & Capabilities.
3. Add the following capabilities:
    * Push Notifications
    * Background Modes - Enable Remote notifications

### 3) Configure AppDelegate for Firebase

You need to initialize Firebase and handle APN registration in your `AppDelegate.swift`.

```swift
import UIKit
import Firebase
import FirebaseMessaging

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        FirebaseApp.configure()

        // Register for remote notifications
        if #available(iOS 10.0, *) {
            UNUserNotificationCenter.current().delegate = self
            let authOptions: UNAuthorizationOptions = [.alert, .badge, .sound]
            UNUserNotificationCenter.current().requestAuthorization(options: authOptions, completionHandler: { _, _ in })
        } else {
            let settings: UIUserNotificationSettings =
                UIUserNotificationSettings(types: [.alert, .badge, .sound], categories: nil)
            application.registerUserNotificationSettings(settings)
        }

        application.registerForRemoteNotifications()
        Messaging.messaging().delegate = self

        return true
    }

    func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        Messaging.messaging().apnsToken = deviceToken
    }
}
```

### 4) Handle FCM Notifications

Extend your `AppDelegate` with Firebase Messaging and UserNotificationCenter delegates to handle incoming notifications and token refreshes.

```swift
extension AppDelegate: UNUserNotificationCenterDelegate, MessagingDelegate {

    // Receive displayed notifications for iOS 10 devices.
    func userNotificationCenter(_ center: UNUserNotificationCenter,
                                willPresent notification: UNNotification,
                                withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
        completionHandler([.alert, .badge, .sound])
    }

    // Handle FCM token refresh.
    func messaging(_ messaging: Messaging, didReceiveRegistrationToken fcmToken: String?) {
        print("FCM Token: \(fcmToken ?? "")")
        // TODO: If necessary, send the token to your server.
    }
}
```


## Congratulations!

You’ve successfully configured your iOS project in Xcode for Firebase Cloud Messaging and APNs. Your app is now ready to receive push notifications, and the integration is fully set up to handle tokens, registration, and message delivery.