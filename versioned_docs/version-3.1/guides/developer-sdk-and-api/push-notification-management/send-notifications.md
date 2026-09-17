---
title: Send Notifications
description: Register push notification tokens and send messages via WebRTCAdaptor.
keywords: [Send Push Notification, registerPushNotificationToken, sendPushNotification, Ant Media Server Documentation]
sidebar_position: 2
sidebar_label: Send Notifications
---

# Send Notifications

Once [server credentials](/guides/developer-sdk-and-api/push-notification-management/server-setup/) are configured and clients have device tokens, register tokens with AMS and send notifications programmatically.

## Register a device token

Call `registerPushNotificationToken` from your client after obtaining the FCM or APNs token:

```js
webRTCAdaptor.registerPushNotificationToken(
  subscriberId,
  authToken,
  pushNotificationToken,
  pushNotificationService  // "fcm" or "apn"
);
```

| Parameter | Description |
|-----------|-------------|
| `subscriberId` | Unique ID for this user or device |
| `authToken` | Subscriber authentication JWT from the [REST API](/guides/developer-sdk-and-api/push-notification-management/server-setup/#secure-push-requests) |
| `pushNotificationToken` | FCM or APNs registration token from the device |
| `pushNotificationService` | `"fcm"` for Android/Web, `"apn"` for iOS |

## Send a notification

Call `sendPushNotification` to deliver a message to one or more subscribers:

```js
webRTCAdaptor.sendPushNotification(
  subscriberId,
  authToken,
  { "title": "Incoming call", "apn-topic": "com.example.app" },
  [sendNotificationToSubscriber]
);
```

| Parameter | Description |
|-----------|-------------|
| `subscriberId` | Sender's subscriber ID |
| `authToken` | Sender's authentication JWT |
| Payload object | Notification content — include `"apn-topic"` with your iOS bundle ID for APNs delivery |
| Recipient array | List of subscriber IDs to notify |

![](@site/static/img/push-notification-received.jpg)

## Full WebSocket example

This HTML page connects to AMS, registers a token on initialization, and sends a test notification:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Push Notification Test</title>
</head>
<body>
<script type="module">
import { WebRTCAdaptor } from "./js/webrtc_adaptor.js"

var subscriberId = "";
var sendNotificationToSubscriber = "";
var authToken = "";
var pushNotificationToken = "";
var pushNotificationService = "fcm"; // "fcm" or "apn"

function registerPushNotificationToken() {
  webRTCAdaptor.registerPushNotificationToken(
    subscriberId, authToken, pushNotificationToken, pushNotificationService
  );
}

function sendPushNotification(recipient) {
  webRTCAdaptor.sendPushNotification(
    subscriberId,
    authToken,
    { "title": "This is a test message", "apn-topic": "io.antmedia.ios.webrtc.sample" },
    [recipient]
  );
}

var webRTCAdaptor = new WebRTCAdaptor({
  websocket_url: "wss://your-domain:5443/live/websocket",
  isPlayMode: true,
  callback: function(info, obj) {
    if (info === "initialized") {
      registerPushNotificationToken();
      setTimeout(() => sendPushNotification(sendNotificationToSubscriber), 2000);
    }
  },
});
</script>
</body>
</html>
```

Replace placeholder values with your subscriber IDs, auth tokens, and device token. Use `wss://` in production — see [SSL setup](/guides/installing-on-linux/setting-up-ssl/).

## Test from Firebase Console

Before integrating with AMS, verify FCM/APNs delivery independently:

1. Open [Firebase Console](https://console.firebase.google.com/) → **Cloud Messaging**.
2. Click **Send your first message** (or **New campaign**).
3. Enter a title and body, select your app, and send.

If the notification appears on the device, your platform credentials are working. Proceed to register the token with AMS.

## Native SDK usage

On Android, register and send from the WebRTC client listener:

```java
@Override
public void onWebSocketConnected() {
    webRTCClient.registerPushNotificationToken(subscriberId, authToken, pushNotificationToken, "fcm");
    webRTCClient.sendPushNotification(subscriberId, authToken, pushNotificationContent, receiverSubscriberIdArray);
}
```

See [Android — Implement handlers](/guides/developer-sdk-and-api/push-notification-management/android/implement-handlers/) for a complete example with call notifications.

## Related

- [Server Setup](/guides/developer-sdk-and-api/push-notification-management/server-setup/) — credentials and auth tokens
- [JavaScript SDK](/guides/developer-sdk-and-api/sdk-integration/javascript-sdk/) — WebRTCAdaptor reference
- [Webhooks](/guides/developer-sdk-and-api/webhooks/) — server-side event notifications to your backend
