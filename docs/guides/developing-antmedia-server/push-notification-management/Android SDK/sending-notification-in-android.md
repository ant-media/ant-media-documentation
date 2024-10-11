---
title: Sending Notification in Android 
description: Sending Notification in Android Tutorial
keywords: [Push Notification Management Tutorial, Push Notification Management, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 61
---

# Push Notification Management

Push notifications enable you to send announcements or video/audio call notifications to all users or specific groups. This page details how to send and configure these notifications.

## Prerequirements

- If you want to use Firebase Cloud Messaging (FCM), you need to create a Firebase account and you need to install the Firebase SDK into your client applications. You can follow [the official documentation](https://firebase.google.com/docs/cloud-messaging).
- If you want to use Apple Push Notifications (APN), you need to create an Apple Developer  account and you need to follow [the official documentation](https://developer.apple.com/documentation/usernotifications).

## Registering Services

After you register FCM or APN, you will have the private key. You need to save it into the Ant Media Server. Open the management panel, select an application, and go to the application-level settings. You will see it in the push notification section.

![](@site/static/img/push-notification-settings.jpg)

## Authorization

To protect the send push notification WebSocket message, you need to generate two subscriber authentication tokens with the sender's Subscriber ID and the receiver's Subscriber ID. You can call the [getSubscriberAuthenticationToken](https://antmedia.io/rest/#/default/getSubscriberAuthenticationToken) Rest API endpoint. We will call the sender's token as <b>authToken</b> in the rest of the documentation. We will call the sender's Subscriber ID as <b>subscriberId</b> and we will call the receiver's Subscriber ID as <b>sendNotificationToSubscriber</b>.

## FCM/APN Device/Registration Token

You need to get a device/registration token for each client and store them in a secure place. We strongly recommend implementing a token timestamp in your code and your servers and updating this timestamp at regular intervals. You can check the [Firebase Cloud Message documentation](https://firebase.google.com/docs/cloud-messaging/manage-tokens#retrieve-and-store-registration-tokens) and [Apple Push Notification](https://developer.apple.com/documentation/usernotifications/registering-your-app-with-apns#Register-your-app-and-retrieve-your-apps-device-token) documentation to see how you can get a device/registration token for each client. We will call this token as <b>pushNotificationToken</b> in the rest of the documentation.

<details>
  <summary>Getting FCM Registration Token Sample</summary>

  - Connect your server and go to the <b>/usr/local/antmedia/webapps</b> path.
  
  - Create fcm.html file and paste the code below

  ```html
  <!DOCTYPE html>
<html>

<head>
	<title>WebRTC Samples > Publish</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta charset="UTF-8">
	<link rel="stylesheet" href="css/external/bootstrap4/bootstrap.min.css">
	<link rel="stylesheet" href="css/samples.css" />
</head>

<body>
	<div class="container">
		<div class="header clearfix">
			<div class="row">
				<h3 class="col text-muted" id="title"><a href="samples.html">WebRTC Samples</a> > WebRTC Publish </h3>
			</div>
		</div>

        <button id="requestPermissionButton">Request Permission</button>

			
	</div>
    <script type="module">
        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
        import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js";

        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries
      
        // Your web app's Firebase configuration
        const firebaseConfig = {
          apiKey: "AIzaSyBlWNhAbl1tIDCcWmDyk3yQ0rq0q-h_jrE",
          authDomain: "push-notification-d0a87.firebaseapp.com",
          projectId: "push-notification-d0a87",
          storageBucket: "push-notification-d0a87.appspot.com",
          messagingSenderId: "790648424032",
          appId: "1:790648424032:web:e80e41b82af7ca24652505"
        };
      
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);

        const messaging = getMessaging(app);

     
        
        function requestPermission() {
            console.log('Requesting permission...');
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    console.log('Notification permission granted.');
                    // TODO(developer): Retrieve a registration token for use with FCM.
                    // In many cases once an app has been granted notification permission,
                    // it should update its UI reflecting this.
                    getToken(messaging, {vapidKey: "BG-LtPlSHYb6RIoKnqPL2ZDbbCIeqQZrNMJSA7lRZ5f7Za5_Lv16OT-VziO5oH-QNCvo6jmKzODLtKqEBqO-LYE"})
                    .then((currentToken) => {
                                if (currentToken) {
                                    // Send the token to your server and update the UI if necessary
                                    // ...
                                    console.log("current token for client: "+currentToken);

                                    onMessage(messaging, (payload) => {
                                        console.log('Message received. ', payload);
                                    // ...
                                    });

                                } else {
                                    // Show permission request UI
                                    console.log('No registration token available. Request permission to generate one.');
                                    // ...
                                }
                                }).catch((err) => {
                                console.log('An error occurred while retrieving token. ', err);
                                // ...
                                });


                    

               
                } else {
                    console.log('Unable to get permission to notify. Permission: ' +permission);
                }
            });
        }

        document.getElementById('requestPermissionButton').addEventListener('click', requestPermission);
        

        requestPermission();
       

      </script>

</body>
</html>

  ```

  
  - Create firebase-messaging-sw.js file and paste the code below

    
  ```js
  importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');



// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.

const firebaseConfig = {
    apiKey: "AIzaSyBlWNhAbl1tIDCcWmDyk3yQ0rq0q-h_jrE",
    authDomain: "push-notification-d0a87.firebaseapp.com",
    projectId: "push-notification-d0a87",
    storageBucket: "push-notification-d0a87.appspot.com",
    messagingSenderId: "790648424032",
    appId: "1:790648424032:web:2dfe62f14401f80b652505"
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();

  messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/firebase-logo.png'
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });
  ```

  - Go to https://<b>domain_name</b>:<b>port</b>/fcm.html url using any browser.
    
  - Open browser's developer console and you will see your FCM Registration Token

  ![](@site/static/img/getting-fcm-token.jpg)
</details>

## Register Push Notification Token

We need to register our push notification token into the Ant Media Server. You need to call the <b>registerPushNotificationToken</b> function. You have 2 options for the <b>pushNotificationService</b> which are "apn" or "fcm".

```js
webRTCAdaptor.registerPushNotificationToken(subscriberId, authToken, pushNotificationToken, pushNotificationService);
```

## Send a push notification

We are ready to send push notifications. You can send your push notifications through the Ant Media Server in a secure way. All you need to do is call the <b>sendPushNotification</b> function.

```js
webRTCAdaptor.sendPushNotification(subscriberId, authToken, {"title":"This is a test message", "apn-topic":"io.antmedia.ios.webrtc.sample"}, [sendNotificationToSubscriber]);
```

![](@site/static/img/push-notification-received.jpg)
