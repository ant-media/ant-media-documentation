---
title: Sending Notifications to Web and Mobile Clients 
description: Sending Notification in Android Tutorial
keywords: [Push Notification Management Tutorial, Push Notification Management, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 7
---

# Step 7: Sending Notifications to Web and Mobile Clients

Push notifications can be sent to both mobile devices and web clients once your project and Ant Media Server are properly configured.

## Send a Test Notification from Firebase Console

To quickly verify that Firebase Cloud Messaging (FCM) is integrated correctly with your app:

- Go to Firebase Console and navigate to the Cloud Messaging tab.
- Click on "Send your first message."
- Input the title and body of the notification.
- Select your Android app and click "Send."

If everything is set up correctly, you should see the notification on your mobile device.

## Send Notification from Ant Media Server

Once your app is ready, Ant Media Server allows you to send secure push notifications programmatically. This ensures notifications are tied to your streaming logic (calls, events, messages).

Here’s an example using a simple HTML page that integrates with Ant Media’s WebRTC adaptor:

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<script type="module">
	
import { WebRTCAdaptor } from "./js/webrtc_adaptor.js"

//Define the subscriberId and it can be any subscriber Id
var subscriberId = "";
var sendNotificationToSubscriber = "";

//Get auth token for Ant Media Server to authenticate the user.
//it's JWT token generated with Subscription Authentication Key(subscriptionAuthenticationKey) in Application settings with subscriberId claim  and it's value.
//PushNotificationRestService can also be used to generate the authToken
var authToken = "";

//this is the token get from FCM or APN
var pushNotificationToken = "";

var pushNotificationService = "apn"; //fcm or apn

//Register push notification token to Ant Media Server. It makes the user receive push notification. 
function registerPushNotificationToken() {
  webRTCAdaptor.registerPushNotificationToken(subscriberId, authToken, pushNotificationToken, pushNotificationService);
}

//Send push notification to the subscriber
function sendPushNotification(sendNotificationToSubscriber) {
  console.log("send push notification --");
  webRTCAdaptor.sendPushNotification(subscriberId, authToken, {"title":"This is a test message", "apn-topic":"io.antmedia.ios.webrtc.sample"}, [sendNotificationToSubscriber]);
}

var webRTCAdaptor = new WebRTCAdaptor({
    websocket_url: "ws://localhost:5080/live/websocket",
    isPlayMode: true,
    callback : function(info, obj) {
        console.log("info:", info, "obj:", obj);
        if (info === "initialized") {
            registerPushNotificationToken();

            setTimeout(function() 
			{
                sendPushNotification(sendNotificationToSubscriber);
            }, 2000);
        } else if (info === "play_started") {
        } else if (info === "play_finished") {
        }
    },
}); 
</script>
</body>
</html>
```

## Congratulations!

You’ve successfully set up push notifications for web and mobile clients. With Firebase handling delivery and Ant Media Server managing authentication, you can now send real-time call invitations, alerts, or streaming notifications directly to your users across platforms. This ensures that your apps are not just interactive, but also responsive and engaging.