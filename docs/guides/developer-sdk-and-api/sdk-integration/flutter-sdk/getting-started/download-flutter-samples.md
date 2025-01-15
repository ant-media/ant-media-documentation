---
title: Download and install Flutter WebRTC sample projects
description: Download and install Flutter WebRTC sample projects 
keywords: [Flutter SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

WebRTC Flutter samples are free to download. You can download/clone them via [Flutter SDK Github repository](https://github.com/ant-media/WebRTC-Flutter-SDK/).

Open SDK in Android Studio, and make sure you have installed the Flutter and Dart plugins. 

Make sure that the paths of Flutter and Dart SDK are correctly configured in the Android Studio Language and Frameworks settings, as shown below.

**Open Settings > Languages & Frameworks**

![Screenshot 2025-01-15 141914](https://github.com/user-attachments/assets/ca2a0bb9-8d19-424e-a73a-5b5ec6b9c4c2)

If these plugins have been installed and the locations of Flutter and Dart SDK are configured correctly, then the options to run the samples will appear automatically after source code indexing. Please refer to the below screenshot.

![image](https://github.com/user-attachments/assets/5ffa3d5f-49e7-4eeb-9d9a-054b205ac7a7

### Install dependencies and run the sample project

In the project navigator, you will find a folder named `examples`. In the example folder, there is a `SampleProject` that uses the ant_media_flutter dependency with all options (Publish, Play, P2P, Conference, and DataChannel) to test. 

In the same examples folder, there are separate projects to test Publish, Play, Peer, Conference, and DataChannel individually.

All projects use [Ant Media Flutter](https://pub.dev/packages/ant_media_flutter ) dependency, which is added to the **pubspec.yaml** file. 

Click on the **Pub get** button to install the dependency in the project. The pub get button appears only when **pubspec.yaml** file is opened in the editor.

![Screenshot 2025-01-15 225447](https://github.com/user-attachments/assets/2a37ce38-4d95-4e91-a861-86d59bb31117)

### Run the WebRTC Flutter sample apps

To run the sample apps on Android, you need to connect the Android device to your workstation. For that, make sure you have enabled the developer options and USB debugging on your device. On Android 4.1 and lower, the Developer options screen is available by default. To get the developer options screen on Android 4.2 and higher, follow the below steps:

*   Open the Settings app
*   Select System
*   Select About phone
*   Scroll to the build number and tap it 7 times
*   Return to the previous screen to find Developer options near the bottom
*   Scroll down and enable USB debugging

If USB debugging is enabled on your device, then your device name will automatically be available in the list of devices.

Just select the device, select the sample project from the target list, and click on the run button. The Gradle task will start and wait for some time until the app builds. After the building is complete, a confirmation popup will appear on your device for installation.

![Screenshot 2025-01-15 233410](https://github.com/user-attachments/assets/e7fd0647-9441-4d83-8c84-d53c6f7690d2)

