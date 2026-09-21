---
title: Configure Manifest
description: Declare the Firebase messaging service in AndroidManifest.xml.
keywords: [AndroidManifest, FCM Service, Push Notifications, Ant Media Server Documentation]
sidebar_position: 4
sidebar_label: Configure Manifest
---

# Configure Manifest

Declare your Firebase messaging service in `AndroidManifest.xml` so FCM can deliver notifications to your app.

Add the following inside the `<application>` tag:

```xml
<service
    android:name=".AntMediaFirebaseMessagingService"
    android:exported="false">
    <intent-filter>
        <action android:name="com.google.firebase.MESSAGING_EVENT" />
    </intent-filter>
</service>
```

:::note
- The service class must extend `FirebaseMessagingService`.
- Do not include the `.java` extension in `android:name`.
- Place the service declaration inside `<application>`, not outside it.
:::

## Next step

[Implement Handlers](/guides/developer-sdk-and-api/push-notification-management/android/implement-handlers/) — create the messaging service and call notification classes.
