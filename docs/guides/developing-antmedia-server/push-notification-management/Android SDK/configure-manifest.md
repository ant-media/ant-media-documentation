---
title: Sending Notification in Android 
description: Sending Notification in Android Tutorial
keywords: [Push Notification Management Tutorial, Push Notification Management, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 4
---

# Configure AndroidManifest.xml:

- Open your AndroidManifest.xml file.
- Add the necessary permissions and service declarations:

```xml
<service
    android:name=".AntMediaFirebaseMessagingService.java"
    android:exported="false">
    <intent-filter>
        <action android:name="com.google.firebase.MESSAGING_EVENT" />
    </intent-filter>
</service>
```