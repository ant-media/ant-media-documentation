---
title: Android Dependency
description: We will add the WebRTC Android SDK Dependency to the project
keywords: [Android SDK User Guide, Download the WebRTC Android SDK, Android SDK Dependency, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

In this step, we will add the WebRTC Android SDK dependency to your Android project. There are two ways to integrate the Android SDK: via the Maven repository or as a local module.

* **Maven Repository (Easy Method)**: Quick and easy, but you cannot modify SDK files.

* **Local Module (Advanced Method)**: Allows editing of SDK files, useful if you need custom modifications.

### Add WebRTC-Android-SDK From Maven Repo (Easy)

1. Add the Sonatype Maven repository to your project. Open your `settings.gradle` file and add the following lines inside the `dependencyResolutionManagement/repositories` section:

  ```java
    maven {
      url "https://oss.sonatype.org/content/repositories/snapshots/" }
  ```

![](@site/static/img/sdk-integration/android-sdk/settings.gradle.png)

2. Add the dependency in your app module’s `build.gradle` file under `dependencies`:

```java
    implementation "io.antmedia:webrtc-android-framework:{version}"
```

3. Replace `{version}` with the latest Android SDK version released on Maven. You can find all versions [here](https://mvnrepository.com/artifact/io.antmedia/webrtc-android-framework).

  For Example:

  ```java
  implementation "io.antmedia:webrtc-android-framework:2.11.0"
  ```

![](@site/static/img/sdk-integration/android-sdk/build.gradle.png)

You are now ready to create your WebRTC streaming application using the pre-built SDK.


### Add WebRTC-Android-SDK As a Module (Advanced)

1. Clone the SDK repository locally:

  ```
  git clone https://github.com/ant-media/WebRTC-Android-SDK.git
  ```

2. Open your Android project in Android Studio. Navigate to `File > New > Import Module` and select `webrtc-android-framework` from the cloned repository.

![](@site/static/img/sdk-integration/android-sdk/android-sdk-as-module-1.png)

3. After importing, you may see two errors:

![](@site/static/img/sdk-integration/android-sdk/android-sdk-as-module-2.png)

4. Fix the errors:

 * Delete `publish-remote.gradle` from the `webrtc-android-framework` module.

 * Open the `build.gradle` file of `webrtc-android-framework` and remove this line:

  ```java
  apply from: 'publish-remote.gradle'
  ```

5. Add the module dependency to your app’s `build.gradle` file:

  ```java
  api project(":webrtc-android-framework")
  ```

6. Sync Gradle. Your project is now ready to use the WebRTC Android SDK module. You can make edits to SDK files if needed, and the changes will apply to your project.

You can now navigate to your application module and begin developing your streaming application. If needed, you can edit any of the Android SDK files within the `webrtc-android-framework`, and your changes will be applied.

## Congratulations

You have successfully added the WebRTC Android SDK to your project.

If you used Maven, you are ready to call SDK methods and start streaming right away.

If you used the module import method, you also have full control over the SDK source code, allowing customizations.

You can now move forward to implementing streaming features in your Android app and enjoy live WebRTC broadcasting with Ant Media Server.
