---
title: Publish Using Wirecast 
description: Publish RTMP stream using Wirecast
keywords: [Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---

# Publish RTMP stream using Wirecast

Wirecast is a live video streaming production tool by Telestream. It enables users to create live or on-demand web broadcasts. Wirecast supports various sources for capturing, including webcams, IP cameras, NDI devices, and capture cards. 

## Create a live stream in AMS

To publish with WireCast, let's create a live stream in Ant Media Server. This stream's `streamId` will be used to publish the stream from Wirecast.

Go to your application, create a live stream with the name `Wirecast` as in the screen:

<img width="1885" height="678" alt="Screenshot 2025-07-22 121322" src="https://github.com/user-attachments/assets/1738ae7f-75ae-4b9d-86d1-7b0a11b99dbf" />

A live stream will be added to the `live` application. Take note of the `streamId` as we will need it later. The server generates a random `streamId` by default, but a custom `streamId` can also be specified.

Once the stream has been created, we can copy the RTMP URL by selecting ```Copy Publish URL``` from the Actions menu, as shown in the image below.

<img width="1904" height="848" alt="Screenshot 2025-07-22 121438" src="https://github.com/user-attachments/assets/e7144ebe-9855-48fc-bb8b-39d6d6b7e276" />

## Create a live stream in Wirecast

Now, we will create a live stream in Wirecast and publish it to an output destination, which in our case is the Ant Media Server.

In Wirecast, click the + button as in the screenshot:

![](@site/static/img/image4.png)

Choose FaceTime as video capture source, which is the webcam of our computer, as in the screenshot:

![](@site/static/img/image7.png)

We are going to publish a stream to an RTMP URL in Ant Media Server. Click **Output Settings** in the upper menu and choose RTMP Server and click OK, as in the screenshot below.

![](@site/static/img/image8.png)

Put in the RTMP URL and `StreamId` that we copied earlier from the Ant Media Server live application's dashboard.

![](@site/static/img/image1.png)

## Tune for ultra-low latency streaming

Wirecast, by default, is not optimized for ultra-low latency streaming. If you push RTMP stream with Wirecast and play with WebRTC, please open ```Output``` > ```Output Settings```> Edit ```Encoding configuration``` and make **Baseline** for profile. Also, you can configure the bitrate according to your quality and internet bandwidth requirements.

![](@site/static/img/wirecast-encoding-settings.png) Click the right arrow to select the source of the video stream as in the screenshot:

![](@site/static/img/image11.png)

Start broadcasting the live stream by clicking the Start/Stop Broadcasting in the upper menu, as in the screenshot below.

![](@site/static/img/image2.png)

Now the live stream is published to Ant Media Server. You will see the status of the live stream in Ant Media Server has changed to Broadcasting status.

You can now click the Play button and watch the live stream.
