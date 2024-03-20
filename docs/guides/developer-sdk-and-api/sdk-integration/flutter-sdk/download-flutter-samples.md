---
title: Download and install Flutter WebRTC sample projects
description: Download and install Flutter WebRTC sample projects 
keywords: [Flutter SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---


WebRTC Flutter samples are free to download. You can access them through this [link on Github](https://github.com/ant-media/WebRTC-Flutter-SDK/).

Open SDK in Android studio, and make sure you have installed the Flutter and Dart plugins. 

Make sure that the paths of Flutter and Dart SDK are correctly configured in Android Studio.

**File >` Settings >` Languages & Frameworks**

  

![](@site/static/img/image-1654690015352.png)

If these plugins have been installed and the locations of Flutter and Dart SDK are configured correctly, then the options to run the samples will appear automatically after source code indexing. Please refer to the below screenshot.

  

![](https://lh3.googleusercontent.com/XaiEOZCJbTupBrZ_cBmzZibQJMus7XpNi9bUInVftH2jPmTcuL5TYUTtJSr_RQmbCftmm_xCPSU1Rr1wvE642Oa8ltaj7I-X-luNEeY0nAFzRy-HFLwb1koi_25I7YPCv8ei8VFqJaBmNk0noA)

### Install dependencies and run sample project

In the project navigator, you will find two folders named samples and examples. In the example folder, there is an example project which uses the ant\_media\_flutter dependency with all options (Publish, Play, P2P and Conference) to test. 

In the samples folder, there are 4 separate projects to test publish, play, peer and conference individually.

All projects use [Ant Media Flutter](https://pub.dev/packages/ant_media_flutter ) dependency which is added in **pubspec.yaml** file. 

Text

    ant_media_flutter: ^1.3.1

Click on the **pub get** button to install the dependency in the project. Pub get button appears only when **pubspec.yaml** file is opened in the editor.

Run the sample WebRTC Flutter apps
----------------------------------

To run the sample apps on Android, you need to connect the Android device with your workstation. For that, make sure you have enabled the developer options and USB debugging on your device. On Android 4.1 and lower, the Developer options screen is available by default. To get the developer options screen on Android 4.2 and higher, follow the below steps:

*   Open the Settings app
*   Select System
*   Select About phone
*   Scroll to the build number and tap it 7 times
*   Return to the previous screen to find Developer options near the bottom
*   Scroll down and enable USB debugging

If USB debugging is enabled on your device, then your device name will automatically be available in the list of devices.

Just select the device and select the sample project from the target list and click on the run button. The Gradle task will start and wait for some time until the app builds. After the building is complete, a confirmation popup will come to your device for installation.

![](https://lh6.googleusercontent.com/p6us2BbRBh1Qq4PbqM6_GQ4HblTx3DOBI4Kgp9ssLrdEBNBGJbuegyqvr-PfbcLrI3xB1wbxYqVbsc4q78adKO_hQxLgrAchh0MVoHmlvH_d_ZYy15kjBhUuJkhWHI-PlYabSnXqts2D7Lau2Q )
