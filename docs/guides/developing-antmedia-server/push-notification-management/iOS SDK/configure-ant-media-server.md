---
title: Sending Notification in Android 
description: Sending Notification in Android Tutorial
keywords: [Push Notification Management Tutorial, Push Notification Management, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 4
---

# Configure Ant Media Server:

After you register FCM or APN, you will have the private key. You need to save it into the Ant Media Server. Open the management panel, select an application, and go to the application-level settings. You will see it in the push notification section.

![](@site/static/img/push-notification-settings.jpg)

To protect the send push notification WebSocket message, you need to generate two subscriber authentication tokens with the sender’s Subscriber ID and the receiver’s Subscriber ID. You can call the [getSubscriberAuthenticationToken](https://antmedia.io/rest/#/default/getSubscriberAuthenticationToken) Rest API endpoint. We will call the sender’s token as authToken in the rest of the documentation. We will call the sender’s Subscriber ID as subscriberId and we will call the receiver’s Subscriber ID as sendNotificationToSubscriber.
