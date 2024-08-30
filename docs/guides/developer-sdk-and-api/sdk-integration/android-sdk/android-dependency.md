---
title: Android Dependency
description: We will add the WebRTC Android SDK Dependency to the project
keywords: [Android SDK User Guide, Download the WebRTC Android SDK, Android SDK Dependency, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---
## Step 2: Add WebRTC-Android-SDK Dependency

At this point, we should add the dependency on the WebRTC Android SDK module to our newly created project. Since the module is hosted in the Sonatype Maven repository, we will add that repository to the dependency manager. The related setting is in the `settings.gradle` file. Add the following lines to the dependencyResolutionManagement/repositories section:.
```
    maven {
      url "https://oss.sonatype.org/content/repositories/snapshots/" }
```
![](@site/static/img/sdk-integration/android-sdk/settings.gradle.png)

After adding the repository, we will add the following lines to the dependencies session in the app `build.gradle` file.
```
    implementation "io.antmedia:webrtc-android-framework:2.8.0-SNAPSHOT"
```
![](@site/static/img/sdk-integration/android-sdk/build.gradle.png)

That is all. We have added the dependency and we are ready to create our WebRTC streaming application.
