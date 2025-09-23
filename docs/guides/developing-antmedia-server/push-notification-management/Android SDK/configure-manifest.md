---
title: Configure Manifest 
description: Sending Notification in Android Tutorial
keywords: [Push Notification Management Tutorial, Push Notification Management, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 4
---

# Step 4: Configure AndroidManifest.xml

To enable Firebase Cloud Messaging (FCM) in your Android application, you need to declare the messaging service in your AndroidManifest.xml file.

## Add the Service Declaration

Open your AndroidManifest.xml file and add the following inside the <application> tag:

```xml
<service
    android:name=".AntMediaFirebaseMessagingService.java"
    android:exported="false">
    <intent-filter>
        <action android:name="com.google.firebase.MESSAGING_EVENT" />
    </intent-filter>
</service>
```

## Notes

Make sure your custom service class (**AntMediaFirebaseMessagingService**) extends FirebaseMessagingService.

The `.java` extension should not be included in the `android:name` attribute.

Place this service inside the `<application>` tag, not outside of it.


## Congratulations!

You’ve successfully configured your AndroidManifest.xml to support Firebase Cloud Messaging. Your app is now ready to receive push notifications and process them using your custom `AntMediaFirebaseMessagingService`.