---
title: Adding Dependencies 
description: Sending Notification in Android Tutorial
keywords: [Push Notification Management Tutorial, Push Notification Management, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---

## Step 3: Add WebRTC-Android-SDK Dependency

There are two methods for integrating the Android SDK into our Android app project. The first, and simpler, approach involves importing it via the Sonatype Maven repository. The advantage of this method lies in its ease of implementation. However, it's crucial to note that opting for this method means you won't have the flexibility to modify WebRTC Android SDK files to suit your application requirements.

Alternatively, the second method entails importing the Android SDK as a module. Opting for this approach grants you the ability to edit Android SDK class files as per your specific needs.

### Add WebRTC-Android-SDK From Maven Repo (Easy)

- At this point, we should add the dependency on the WebRTC Android SDK module to our newly created project. Since the module is hosted in the Sonatype Maven repository, we will add that repository to the dependency manager. The related setting is in the `settings.gradle` file.

  Add the following lines to the `dependencyResolutionManagement/repositories section`:

  ```java
    maven {
      url "https://oss.sonatype.org/content/repositories/snapshots/" }
  ```

![](@site/static/img/sdk-integration/android-sdk/settings.gradle.png)

- After adding the repository, we will add the following lines to the dependencies session in the app `build.gradle` file.

```java
    implementation "io.antmedia:webrtc-android-framework:{version}"
```

- Replace version with the latest android sdk version released on maven. You can see all released versions [here](https://mvnrepository.com/artifact/io.antmedia/webrtc-android-framework).

  For Example:

  ```java
  implementation "io.antmedia:webrtc-android-framework:2.11.0"
  ```

![](@site/static/img/sdk-integration/android-sdk/build.gradle.png)

That is all. We have added the dependency and we are ready to create our WebRTC streaming application.


### Add WebRTC-Android-SDK As a Module (Advanced)

- Clone WebRTC-Android-SDK repository to your local.

  ```
  git clone https://github.com/ant-media/WebRTC-Android-SDK.git
  ```

- Open your android project with Android Studio. From left top corner, click `File > New > Import Module` to import.

- Open WebRTC-Android-SDK and choose `webrtc-android-framework` from your file system.

![](@site/static/img/sdk-integration/android-sdk/android-sdk-as-module-1.png)

- After clicking Finish, you will face with 2 errors as below:

![](@site/static/img/sdk-integration/android-sdk/android-sdk-as-module-2.png)

- To fix those errors, remove `publish-remote.gradle` file from `webrtc-android-framework module`.

  After removing,  go to `build.gradle` file of `webrtc-android-framework` module and remove  below line.

  ```java
  apply from: 'publish-remote.gradle'
  ```

  Then, go to your app project's `build.gradle` file and add below line to the dependencies.

  ```java
  api project(":webrtc-android-framework")
  ```

- Finally, sync gradle and it should be all done.

You can now navigate to your application module and begin developing your streaming application. If needed, you can edit any of the Android SDK files within the `webrtc-android-framework`, and your changes will be applied.

### Add Firebase Cloud Messaging Dependency:

- Open your app-level build.gradle file.
- Add the Firebase Cloud Messaging dependency:

  ```java
  implementation 'com.google.firebase:firebase-messaging:23.0.0'
  ```