---
title: Sending Notification in Android 
description: Sending Notification in Android Tutorial
keywords: [Push Notification Management Tutorial, Push Notification Management, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---

# Step 2: Configure Your iOS Project in Xcode

Next, set up your iOS app to handle FCM and APN push notifications.

1) Install Firebase SDK:
- In your iOS project's Podfile, add the Firebase dependencies:

```ruby
pod 'Firebase/Messaging'
```

- Run pod install to integrate Firebase Messaging into your app.

2) Enable Push Notifications:

- In Xcode, select your project in the Project Navigator.
- Under your app’s target, click on Signing & Capabilities.
- Add Push Notifications and Background Modes. Under Background Modes, check the "Remote notifications" option.

3) Configure AppDelegate for Firebase: You need to initialize Firebase and handle APN registration within the AppDelegate.

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

4) Handle FCM Notifications: Create a delegate method to handle incoming messages from Firebase.

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