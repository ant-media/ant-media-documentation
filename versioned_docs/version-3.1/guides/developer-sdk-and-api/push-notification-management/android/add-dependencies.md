---
title: Add Dependencies
description: Add the WebRTC Android SDK and Firebase Cloud Messaging to your project.
keywords: [Android Dependencies, WebRTC Android SDK, FCM, Ant Media Server Documentation]
sidebar_position: 3
sidebar_label: Add Dependencies
---

# Add Dependencies

Add the Ant Media WebRTC Android SDK and Firebase Cloud Messaging library to your project.

## WebRTC Android SDK

Two integration options:

### Option 1: Maven repository (recommended)

Add the Maven repository in `settings.gradle` under `dependencyResolutionManagement.repositories`:

```java
maven {
  url "https://oss.sonatype.org/content/repositories/snapshots/"
}
```

Add the dependency in your app-level `build.gradle`:

```java
implementation "io.antmedia:webrtc-android-framework:{version}"
```

Replace `{version}` with the latest release from [Maven Repository](https://mvnrepository.com/artifact/io.antmedia/webrtc-android-framework).

Example:

```java
implementation "io.antmedia:webrtc-android-framework:2.11.0"
```

![](@site/static/img/sdk-integration/android-sdk/settings.gradle.png)

![](@site/static/img/sdk-integration/android-sdk/build.gradle.png)

### Option 2: Import as module (advanced)

For SDK source modifications:

```bash
git clone https://github.com/ant-media/WebRTC-Android-SDK.git
```

In Android Studio: **File → New → Import Module**, select the `webrtc-android-framework` directory. Remove `publish-remote.gradle` from the module, delete the `apply from: 'publish-remote.gradle'` line in the module's `build.gradle`, and add `api project(":webrtc-android-framework")` to your app's dependencies.

See the [Android SDK guide](/guides/developer-sdk-and-api/sdk-integration/android-sdk/) for full project setup.

## Firebase Cloud Messaging

Add the FCM dependency in your app-level `build.gradle`:

```java
implementation 'com.google.firebase:firebase-messaging:23.0.0'
```

Apply the Google Services plugin if not already present:

```java
apply plugin: 'com.google.services'
```

## Next step

[Configure Manifest](/guides/developer-sdk-and-api/push-notification-management/android/configure-manifest/) — declare the FCM messaging service.
