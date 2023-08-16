---
title: Publish WebRTC stream in iOS
description: Publishing WebRTC Live stream Using iOS SDK 
keywords: [iOS SDK User Guide, iOS SDK Publish, Publish Stream from your iPhone, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 4
---

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