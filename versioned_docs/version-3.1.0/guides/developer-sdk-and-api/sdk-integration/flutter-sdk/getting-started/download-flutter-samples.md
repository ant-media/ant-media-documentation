---
title: Download Samples
description: Clone and run the Ant Media Flutter WebRTC sample projects.
keywords: [Flutter SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
sidebar_label: Download Samples
---

# Download Samples

Clone the free Flutter samples from [WebRTC-Flutter-SDK](https://github.com/ant-media/WebRTC-Flutter-SDK/).

## Open in Android Studio

1. Open the cloned SDK in Android Studio with Flutter and Dart plugins installed.
2. Confirm Flutter and Dart SDK paths under **Settings → Languages & Frameworks**.

![Flutter SDK paths](https://github.com/user-attachments/assets/ca2a0bb9-8d19-424e-a73a-5b5ec6b9c4c2)

After indexing, run targets appear automatically:

![Run targets](https://github.com/user-attachments/assets/91e1a5d4-3877-4e83-b6f0-7228e0cbcf29)

## Install dependencies

Under `examples/`:

- `SampleProject` — all modes in one app (Publish, Play, P2P, Conference, DataChannel)
- Separate projects for each mode individually

All projects depend on [`ant_media_flutter`](https://pub.dev/packages/ant_media_flutter). Open `pubspec.yaml` and click **Pub get**.

![Pub get](https://github.com/user-attachments/assets/2a37ce38-4d95-4e91-a861-86d59bb31117)

## Run on Android

1. Enable developer options and USB debugging on your device.
2. Connect the device — it appears in the device list.
3. Select the sample project and click **Run**.

![Device connected](https://github.com/user-attachments/assets/e7fd0647-9441-4d83-8c84-d53c6f7690d2)

After install, the sample app launches:

![Sample app](https://github.com/user-attachments/assets/a8f14bfd-a6ca-419f-ba1c-98c9dc31c09c)

## Next step

Configure the WebSocket URL and try [Publish](/guides/developer-sdk-and-api/sdk-integration/flutter-sdk/webrtc-samples/publish/) or other [Flutter samples](/category/flutter-sdk-samples/).
