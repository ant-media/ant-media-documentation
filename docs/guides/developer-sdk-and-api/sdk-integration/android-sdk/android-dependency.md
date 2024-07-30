---
title: Android Dependency
description: We will add the WebRTC Android SDK Dependency to the project
keywords: [Android SDK User Guide, Download the WebRTC Android SDK, Android SDK Dependency, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---
## Step 2: Add WebRTC-Android-SDK Dependency

There are two methods for integrating the Android SDK into our Android app project. The first, and simpler, approach involves importing it via the Sonatype Maven repository. The advantage of this method lies in its ease of implementation. However, it's crucial to note that opting for this method means you won't have the flexibility to modify WebRTC Android SDK files to suit your application requirements.

Alternatively, the second method entails importing the Android SDK as a module. Opting for this approach grants you the ability to edit Android SDK class files as per your specific needs.

### Add WebRTC-Android-SDK From Maven Repo(Easy)

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


### Add WebRTC-Android-SDK As a Module(Advanced)

Clone WebRTC-Android-SDK repo to your local.
```
git clone https://github.com/ant-media/WebRTC-Android-SDK.git
```
Open your android project with android studio. From left top corner click `File > New > Import Module`
Choose webrtc-android-sdk from your file system.
![](@site/static/img/sdk-integration/android-sdk/android-sdk-as-module-1.png)

Click `Ok > Finish`

After clicking Finish you will face with 2 errors
![](@site/static/img/sdk-integration/android-sdk/android-sdk-as-module-2.png)

To fix those errors remove `publish-remote.gradle` file from webrtc-android-sdk module.

After removing,  go to `build.gradle` file of webrtc-android-sdk module and remove 
```
apply from: 'publish-remote.gradle'
```
line.

Go to your app project build.gradle and add 

```    
api project(":webrtc-android-framework")
```
to the dependencies.

Finally, sync gradle and it should be all done.

You can now navigate to your application module and begin developing your streaming application. If needed, you can edit any of the Android SDK files within the webrtc-android-sdk module, and your changes will be applied.