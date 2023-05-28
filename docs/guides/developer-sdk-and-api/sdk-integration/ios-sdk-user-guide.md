---
title: iOS SDK User Guide
description: Ant Media's WebRTC iOS SDK lets you build your own iOS application that can publish and play WebRTC broadcasts.
keywords: [iOS SDK User Guide, Publish Stream from your iPhone, Using the WebRTC iOS SDK, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 8
---

# iOS SDK
Ant Media's WebRTC iOS SDK lets you build your own iOS application that can publish and play WebRTC broadcasts.
In this document we aim to keep it beginner-friendly and walk through the process of:
- Creating an iOS app project in Xcode
- Adding the WebRTC-iOS-SDK dependency
- Publishing WebRTC live streams
- Playing WebRTC Live streams

Additionally, in the consequent updates, we will explore screen sharing on iOS and simplifying video conferencing for developers. So, let's get started with publishing and playing live streams using this step-by-step guide!

## Step 1: Create an iOS App Project in Xcode
- Open Xcode and select "Create a New Xcode Project."
![](@site/static/img/ios-SDK/xcode.png)

- Choose "App" from the options and click "Next."
![](@site/static/img/ios-SDK/choose-app.png)

- Provide a name for your application and click "Next."
![](@site/static/img/ios-SDK/naming-app.png)

- Congratulations! You have successfully created your WebRTC iOS application project.
![](@site/static/img/ios-SDK/success.png)

## Step 2: Add WebRTC-iOS-SDK Dependency
- Right click on your application and select "Add Package" from the context menu.
![](@site/static/img/ios-SDK/add-package.png)

- In the Package URL box, enter the GitHub repository: https://github.com/ant-media/WebRTC-iOS-SDK
![](@site/static/img/ios-SDK/add-repo.png)

- Click "Add Package."
- On the next screen, click "Add Package" again.
![](@site/static/img/ios-SDK/ios-package.png)

- Congratulations! You have successfully added the WebRTC-iOS-SDK dependency.
![](@site/static/img/ios-SDK/repo-added.png)

## Step 3: Publish a WebRTC Live Stream in iOS
- Open "Main.storyboard" and go to View > Show Library. Search for "UIView" in the library search box.
![](@site/static/img/ios-SDK/UI-view.png)

- Drag the "View" onto the Main.storyboard and adjust its size as needed.
![](@site/static/img/ios-SDK/view-size.png)

- Connect the UIView to the ViewController using the following steps:
    1. Open two editors: one for Main.storyboard and another for ViewController.swift.
    2. Right-click on the UIView in Main.storyboard, drag it to the next editor, and release the right-click. Name your Outlet.
![](@site/static/img/ios-SDK/view-controller.png)

- Then it should look like below.
![](@site/static/img/ios-SDK/view-final.png)

- Add Privacy descriptions to Info.plist:
    1. Right-click on Info.plist and select "Add Row."
    2. Add descriptions for Camera Usage and Microphone Usage.
![](@site/static/img/ios-SDK/privacy.png)

- Finally, Info.plist looks like below
![](@site/static/img/ios-SDK/info-list.png)

- Edit the `ViewController.swift` file. Here we just initialize the `AntMediaClient` and set the WebSocket URL as Ant Media’s Test URL(or just use your own Ant Media Server URL) and call the publish with `streamId` parameter.
`streamId` is unique and it’s recommend to use your random stream id if you use Ant Media’s Test URL.
```
import UIKit
import WebRTCiOSSDK

class ViewController: UIViewController {

    @IBOutlet weak var videoView: UIView!
    var client:AntMediaClient =  AntMediaClient.init();
    
    override func viewDidLoad() {
        super.viewDidLoad()
        client.setLocalView(container: videoView);
        client.setWebSocketServerUrl(url: "wss://test.antmedia.io:5443/WebRTCAppEE/websocket");
        client.publish(streamId: "stream123456")
    }
}
```
![](@site/static/img/ios-SDK/ui-kit.png)

- Run your application on your device and grant Camera and Microphone Usage permissions.
![](@site/static/img/ios-SDK/mobile-premissions.png)

- Congratulations! You are now publishing your live stream.
![](@site/static/img/ios-SDK/publish.png)

- To play the stream, visit Ant Media's Test WebRTC Player, enter the `streamId` "stream123456" in the box, and click "Start Playing."
![](@site/static/img/ios-SDK/play.png)

## Step 4: Play WebRTC Live Stream in iOS
- Playing a WebRTC live stream in your iOS application is easier once you've created the project and published the stream.
- Edit the `ViewController.swift` file with the below code snippet
```
import UIKit
import WebRTCiOSSDK

class ViewController: UIViewController {

    @IBOutlet weak var videoView: UIView!
    var client:AntMediaClient =  AntMediaClient.init();
    
    override func viewDidLoad() {
        super.viewDidLoad()
        client.setRemoteView(remoteContainer: videoView)
        client.setWebSocketServerUrl(url: "wss://test.antmedia.io:5443/WebRTCAppEE/websocket");
        client.play(streamId: "stream123456")
    }
}
```
![](@site/static/img/ios-SDK/view-play.png)

- Visit the [WebRTC Publish page](https://antmedia.io/webrtc-samples/webrtc-publish-webrtc-play/), enter "stream123456" in the box, and click "Start Publishing" to make the stream available.

- Run your WebRTC iOS application to play the stream.
![](@site/static/img/ios-SDK/play-ios.png)

- Congratulations! You have successfully played a WebRTC live stream in iOS.

By following this guide, you have learned how to publish and play WebRTC live streams in your iOS application. If you're eager to explore more features and samples, visit the [WebRTC-iOS-SDK repository](https://github.com/ant-media/WebRTC-iOS-SDK) and try the sample WebRTC iOS Application.

In the next consequent updates to this document, we’re going to show you how to share screens in iOS and how to make a conferencing application in iOS.