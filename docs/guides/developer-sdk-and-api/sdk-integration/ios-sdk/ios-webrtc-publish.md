---
title: Publish WebRTC stream in iOS
description: Publishing WebRTC Live stream Using iOS SDK 
keywords: [iOS SDK User Guide, iOS SDK Publish, Publish Stream from your iPhone, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 4
---

## Step 3: Publish a WebRTC Live Stream in iOS

To publish a WebRTC live stream from your iOS application, follow these steps:

### 1. Add a UIView in Main.storyboard

* Open **Main.storyboard** and go to **View > Show Library**.

* Search for **UIView** in the library search box.

![](@site/static/img/ios-SDK/UI-view.png)

* Drag the **UIView** onto the storyboard and adjust its size as needed.

![](@site/static/img/ios-SDK/view-size.png)

### 2. Connect **UIView** to ViewController

* Open two editors: one for **Main.storyboard** and another for **ViewController.swift**.

* Right-click on the UIView in the storyboard, drag it to the ViewController editor, and release the right-click. Name your outlet.

![](@site/static/img/ios-SDK/view-controller.png)

* After connecting, it should look like this:

![](@site/static/img/ios-SDK/view-final.png)

### 3. Add Privacy Descriptions in Info.plist

* Right-click **Info.plist** and select **Add Row**.

* Add descriptions for **Camera Usage** and **Microphone Usage**.

![](@site/static/img/ios-SDK/privacy.png)

* Your Info.plist should look like this:

![](@site/static/img/ios-SDK/info-list.png)

### 4. Edit ViewController.swift

* Initialize the `AntMediaClient`, set the WebSocket URL, and call `publish` with a `streamId`.

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

### 5. Run Your Application

* Launch your app on a real iOS device and grant Camera and Microphone permissions.

![](@site/static/img/ios-SDK/mobile-premissions.png)

### 6. Success!

* Congratulations! You are now publishing a live WebRTC stream from your iOS device.

![](@site/static/img/ios-SDK/publish.png)

### 7. Play the Stream

To verify the stream, visit **Ant Media’s Test WebRTC Player**, enter the `streamId` "**stream123456**", and click **Start Playing**.

![](@site/static/img/ios-SDK/play.png)

You now have a fully working iOS app capable of publishing WebRTC streams. You can continue exploring features like playing streams and screen sharing using our SDK.