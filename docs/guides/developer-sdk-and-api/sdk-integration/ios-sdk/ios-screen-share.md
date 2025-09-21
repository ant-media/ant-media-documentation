---
title: iOS Screen Share using Broadcast Extension
description: Implementing Screen Share in iOS using Broadcast extension 
keywords: [iOS SDK User Guide, iOS Screen Share, Broadcast Extension, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 6
---

## Screen Sharing in iOS

Screen sharing functionality allows users to broadcast their device screens in real-time, enabling use cases like remote collaboration, live presentations, and interactive streaming. Using Ant Media Server’s iOS SDK and WebRTC, you can build an iOS application capable of seamless screen sharing with minimal effort.

To begin, ensure you have already created a project and added the WebRTC-iOS-SDK dependency, as documented in the publishing and playing guides.

### Step 1: Create an iOS App Project

Follow the guide: [Creating an iOS app project in Xcode](/guides/developer-sdk-and-api/sdk-integration/ios-sdk/xcode-project/)

### Step 2: Add WebRTC-iOS-SDK Dependency

Follow the guide: [Adding the WebRTC-iOS-SDK dependency](/guides/developer-sdk-and-api/sdk-integration/ios-sdk/ios-dependency/)

### Step 3: Implementing Screen Sharing

- Add a new Target.
![](@site/static/img/ios-screen-share/ios-be08.png)

- Choose Broadcast Upload Extension and click Next.
![](@site/static/img/ios-screen-share/ios-be09.png)

- Name the product and click Next.
![](@site/static/img/ios-screen-share/ios-be10.png)

- Activate your extension.
![](@site/static/img/ios-screen-share/ios-be11.png)

- Click on the plus button under `Framework & Libraries` to add the WebRTC-IOS-SDK dependency recently imported.
![](@site/static/img/ios-screen-share/ios-be12.png)

- Select the dependency: WebRTC-IOS-SDK.
![](@site/static/img/ios-screen-share/ios-be13.png)

- Update the version of the XCode Project as needed
![](@site/static/img/ios-screen-share/ios-be14.png)

- Open the `SampleHandler.swift` file under the BroadcastScreen Extension and add the code from the link below https://gist.github.com/mekya/163a90523f7e7796cf97a0b966f2d61b

Make sure to set your server URL and a `streamId`
![](@site/static/img/ios-screen-share/ios-be15.png)

- *Optional*: You may choose to enable the split window view by clicking on `Add editor to the right.`
The `Add editor to the right` option is the last button on the 2nd row, as shown in the screenshot below, which allows you to work in a split screen view
![](@site/static/img/ios-screen-share/ios-be16.png)

- Navigate to the `Main.storyboard` on the left menu. Open the Library by selecting View > Show Library from the menu, and then enter UIView in the search box, as shown in the image below.

Drag the View from the Library and drop it onto the `Main.storyboard`. Afterwards, adjust the size of the UIView to match the image below.

*Optional*: Customize the color and theme as needed.
![](@site/static/img/ios-screen-share/ios-be17.png)

- If you have a split your screen, you should now have the `ViewController.swift` file loaded on one screen and the `main.storyboard` loaded on the other screen.

- Right-click on the UIView element in the `Main.storyboard`, then drag it over to the `ViewController.swift` file and release the right-click.

This will trigger a popup as shown, allowing you to name your Outlet.
![](@site/static/img/ios-screen-share/ios-be18.png)

- You should already have the `ViewController` file open in your Xcode project, so now follow these steps to add the `RPSystemBroadcastPickerView` to the view.

Copy and paste the following code in the ViewController:
```
import UIKit
import WebRTCiOSSDK
import ReplayKit

class ViewController: UIViewController {

    @IBOutlet weak var videoView: UIView!
    var client: AntMediaClient = AntMediaClient.init()

    override func viewDidLoad() {
 	super.viewDidLoad()

	let broadcastPicker = RPSystemBroadcastPickerView(frame: CGRect(x: 0, y: 0, width: 50, height: 50))
	broadcastPicker.preferredExtension = "<YOUR_BUNDLE_IDENTIFIER>";
	videoView.addSubview(broadcastPicker)
     }
}
```
![](@site/static/img/ios-screen-share/ios-be19.png)
Once you’ve added the provided code, the `RPSystemBroadcastPickerView` will be successfully integrated into your ViewController’s view.

- Let’s add Privacy descriptions to `Info.plist`. Right-click `Info.plist` and add *Microphone Usage descriptions* as below on `info.plist`
![](@site/static/img/ios-screen-share/ios-be20.png)

### Step 4: Testing and Optimization
- Choose Broadcast Screen in the Targets.
![](@site/static/img/ios-screen-share/ios-be21.png)

- Run the *BroadcastScreen*. Choose the original application and click on Run
![](@site/static/img/ios-screen-share/ios-be22.png)

- You are ready to start streaming your screen.
![](@site/static/img/ios-screen-share/ios-be23.png)

- You should see a live stream on your Ant Media Server.
![](@site/static/img/ios-screen-share/ios-be24.png)

- You can now stream your device screen with audio.
![](@site/static/img/ios-screen-share/ios-be25.png)

Congratulations!

You have successfully implemented iOS screen sharing using the Ant Media iOS SDK and WebRTC via Broadcast Extension. Your app can now stream the device screen in real-time, opening possibilities for collaboration, live presentations, and interactive sessions.

