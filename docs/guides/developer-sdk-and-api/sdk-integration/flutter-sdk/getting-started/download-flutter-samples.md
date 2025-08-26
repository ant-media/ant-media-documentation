---
title: Download and Install Flutter WebRTC Sample Projects
description: Download and install Flutter WebRTC sample projects 
keywords: [Flutter SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

The Flutter WebRTC sample projects are free to use and demonstrate how to integrate Ant Media’s Flutter SDK. This guide shows you how to download, configure, and run the samples.


### Step 1: Download the Samples

Clone or download the sample projects from the official [Flutter SDK Github repository](https://github.com/ant-media/WebRTC-Flutter-SDK/)

### Step 2: Open the SDK in Android Studio

1. Launch Android Studio.

2. Open the cloned WebRTC-Flutter-SDK project.

3. Verify that the Flutter and Dart plugins are installed.

4. Check that the paths for the Flutter and Dart SDKs are correctly set in:

5. Settings > Languages & Frameworks


![Screenshot 2025-01-15 141914](https://github.com/user-attachments/assets/ca2a0bb9-8d19-424e-a73a-5b5ec6b9c4c2)

If everything is configured correctly, Android Studio will index the source code and display run options for the sample apps.

![Screenshot 2025-01-15 225112](https://github.com/user-attachments/assets/91e1a5d4-3877-4e83-b6f0-7228e0cbcf29)

### Step 3: Install Dependencies

1. In the project navigator, open the examples folder.

* SampleProject: demonstrates all features (Publish, Play, P2P, Conference, and DataChannel).

* Additional subfolders: contain individual projects for each feature.

2. Each project uses the [ant_media_flutter](https://pub.dev/packages/ant_media_flutter) dependency, which is already listed in pubspec.yaml.

3. Open pubspec.yaml in the editor, then click Pub get to install dependencies.

* The Pub get button appears only when pubspec.yaml is open.

![Screenshot 2025-01-15 225447](https://github.com/user-attachments/assets/2a37ce38-4d95-4e91-a861-86d59bb31117)

### Step 4: Run the Sample Apps on Android


1. Connect your Android device to your workstation via USB.

2. Enable Developer options and USB debugging on the device:

* Open Settings → System → About phone

* Tap Build number 7 times to unlock Developer options

* Go back to System → Developer options

* Enable USB debugging

3. Once enabled, your device name will appear in Android Studio’s device list.

4. Select your device, choose a sample project, and click Run ▶️.

* Gradle will build the project (this may take a few minutes).

Confirm the installation popup on your device.

![Screenshot 2025-01-15 233410](https://github.com/user-attachments/assets/e7fd0647-9441-4d83-8c84-d53c6f7690d2)

After the build is complete, the app will be installed and launched on your device.
- For this demonstration, we are going to run the example application.

![Screenshot 2025-01-15 234344](https://github.com/user-attachments/assets/a8f14bfd-a6ca-419f-ba1c-98c9dc31c09c)

### Next Steps

- Try the SampleProject to test all features in one app.

- Explore individual feature projects (Publish, Play, P2P, Conference, DataChannel).
