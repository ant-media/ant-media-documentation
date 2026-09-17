---
title: Server Setup
description: Configure Ant Media Server with FCM and APNs credentials for push notifications.
keywords: [Push Notification Server Setup, FCM, APNs, Ant Media Server Documentation]
sidebar_position: 1
sidebar_label: Server Setup
---

# Server Setup

Before clients can register tokens or receive notifications, configure push credentials in the Ant Media Server application settings.

## Prerequisites

| Platform | Requirement |
|----------|-------------|
| **Android / Web (FCM)** | Firebase project with Cloud Messaging enabled — [Firebase documentation](https://firebase.google.com/docs/cloud-messaging) |
| **iOS (APNs)** | Apple Developer account with APNs key — [Apple documentation](https://developer.apple.com/documentation/usernotifications) |

## Upload credentials to AMS

1. Open the Ant Media Server Management Panel.
2. Select the application where push notifications should be enabled.
3. Go to **Application Settings → Push Notification**.
4. Upload the appropriate credential file:

| Platform | Upload | Where to get it |
|----------|--------|-----------------|
| **FCM** | Service account JSON private key | Firebase Console → Project Settings → Service accounts → Generate new private key |
| **APNs** | `.p8` key file + Key ID, Team ID, Bundle ID | Apple Developer Portal → Keys → create APNs key |

![](@site/static/img/push-notification-settings.jpg)

For platform-specific steps to create these credentials, see [Android — Set up Firebase](/guides/developer-sdk-and-api/push-notification-management/android/setup-firebase/) and [iOS — Set up APNs](/guides/developer-sdk-and-api/push-notification-management/ios/setup-apn/).

## Secure push requests

Register and send operations require a **subscriber authentication token** — a JWT tied to a subscriber ID. Generate one token for the sender and one for each receiver.

Use the [getSubscriberAuthenticationToken](https://antmedia.io/rest/#/default/getSubscriberAuthenticationToken) REST endpoint:

```bash
curl -X GET \
  'https://your-domain:5443/WebRTCAppEE/rest/v2/push-notification/subscriber-auth-token?subscriberId=<subscriber-id>'
```

| Term | Meaning |
|------|---------|
| `subscriberId` | ID of the user initiating the request (sender) |
| `authToken` | JWT returned for the sender's subscriber ID |
| `sendNotificationToSubscriber` | Subscriber ID of the notification recipient |

You can also generate tokens using the `subscriptionAuthenticationKey` in application settings. See [REST API security (JWT)](/guides/developer-sdk-and-api/rest-api-guide/jwt-rest-api-filter/) for JWT configuration.

## Device registration tokens

Each client device must obtain a registration token from FCM or APNs before registering with AMS:

| Platform | How to obtain |
|----------|---------------|
| **FCM (Android/Web)** | [Manage FCM tokens](https://firebase.google.com/docs/cloud-messaging/manage-tokens) |
| **APNs (iOS)** | [Register with APNs](https://developer.apple.com/documentation/usernotifications/registering-your-app-with-apns) |

Throughout the rest of this section, this value is referred to as `pushNotificationToken`.

### Web FCM token example

To retrieve an FCM token in a browser, create a test page under `/usr/local/antmedia/webapps/` with the Firebase SDK. Request notification permission, then call `getToken()`:

<details>
<summary>Example fcm.html and firebase-messaging-sw.js</summary>

Create `fcm.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <title>FCM Token Test</title>
  <meta charset="UTF-8">
</head>
<body>
  <button id="requestPermissionButton">Request Permission</button>
  <script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
    import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js";

    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_PROJECT.firebaseapp.com",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_PROJECT.appspot.com",
      messagingSenderId: "YOUR_SENDER_ID",
      appId: "YOUR_APP_ID"
    };

    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);

    document.getElementById('requestPermissionButton').addEventListener('click', () => {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          getToken(messaging, { vapidKey: "YOUR_VAPID_KEY" })
            .then((token) => console.log("FCM token:", token))
            .catch((err) => console.error("Token error:", err));
        }
      });
    });
  </script>
</body>
</html>
```

Create `firebase-messaging-sw.js` in the same directory for background messages. Replace placeholder values with your Firebase project configuration.

Open `https://your-domain:5443/fcm.html`, grant permission, and check the browser console for the token.

![](@site/static/img/getting-fcm-token.jpg)

</details>

## Next steps

- [Send Notifications](/guides/developer-sdk-and-api/push-notification-management/send-notifications/) — register tokens and send messages
- [Android setup](/guides/developer-sdk-and-api/push-notification-management/android/setup-firebase/) — configure Firebase in your Android app
- [iOS setup](/guides/developer-sdk-and-api/push-notification-management/ios/prerequisites/) — configure APNs and Xcode
