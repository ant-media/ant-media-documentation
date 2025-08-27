---
title: Sending Notifications to Web and Mobile Clients 
description: Sending Notification in Android Tutorial
keywords: [Push Notification Management Tutorial, Push Notification Management, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 7
---

# Sending Notifications to Web and Mobile Clients:

## Send Test Notification from Firebase Console

Once the Android app is set up, you can send a test push notification from the Firebase console to ensure everything is working properly.

- Go to Firebase Console and navigate to the Cloud Messaging tab.
- Click on "Send your first message."
- Input the title and body of the notification.
- Select your Android app and click "Send."

You should receive the notification on your device if everything is correctly configured.

## Send Notification from Ant Media Server

We are ready to send push notifications. You can send your push notifications through the Ant Media Server in a secure way. All you need to do is call the sendPushNotification function. You can use the HTML page below to be able to send push notification:

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
