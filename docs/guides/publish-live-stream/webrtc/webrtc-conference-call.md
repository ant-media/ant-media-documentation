---
title: WebRTC conference call
description: WebRTC conference call
keywords: [Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 4
---

Ant Media Server offers robust support for conference calls, in this tutorial we will see how to use the Basic Conference sample page. If you are looking for a ready-to-use Conference solution please checkout our in house [Circle Conference tool](https://antmedia.io/marketplace/circle-video-conferencing-tool).

## Navigate to the publish page

Go to ```https://your domain name:5443/WebRTCAppEE/conference.html```

WebRTC conference feature is only available in Enterprise Edition.

If you have Ant Media Server installed on your local machine, you can also go to ```http://localhost:5080/WebRTCAppEE/conference.html```

Click on ```Join Room``` button then, open the same web page on multiple tab or multiple systems and join from there.Now you will start to receive the streams of remote participants. 

![](@site/static/img/publish-live-stream/WebRTC/WebRTC-publishing/Conference-page.png)


## Joining a room

When WebRTCAdaptor is initialized successfully, it creates a websocket connection. After a successful connection, the client gets the ```initialized``` notification from the server. After receiving ```initialized``` notification, we can start publishing and playing to the conference room.

Think of Conference room as this way , we will publish our video streams and we will play the videos of the remote participants, so essentially we will be using same publish and play functions , we normally use for publishing and plying streams.


Just call publish method as follows.

```js
	publish(streamId, token, subscriberId, subscriberCode, streamName, mainTrack, metaData, role) 
 ```

*   ```streamId``` (mandatory): id of the stream.

*   ```mainTrack``` (mandatory): id of the room that the stream will be published to.


## Playing a stream in a room**

In order to play remote streams from the room, call the play method. In a conference call, the correct place to call method is when ```joinedTheRoom``` and ```roomInformation``` notifications are received.Play Method should be called with correct roomId that needs to be played.

```js
	play(streamId, token, roomId);
```

*   ```streamId``` (mandatory): id of the room that need to play.

*   ```roomId``` (mandatory): id of the room that need to play.


## Turning the camera on/off**

To turn off the camera, call the ```turnOffLocalCamera``` method.

```js
webRTCAdaptor.turnOffLocalCamera(streamId);
```

```turnOffLocalCamera``` gets one parameter.

*   ```streamId``` (mandatory): Stream id of the stream.

If your camera is turned off, call ```turnOnLocalCamera``` to turn it on.

```js
webRTCAdaptor.turnOnLocalCamera(streamId);
```


```turnOnLocalCamera``` gets one parameter.

*   ```streamId``` (mandatory): Stream id of the stream.


## Muting and unmuting the microphone

Call ```muteLocalMic``` to mute the microphone.

```js
webRTCAdaptor.muteLocalMic();
```

To unmute, call ```unmuteLocalMic```.

```js
webRTCAdaptor.unmuteLocalMic();
```

These methods don't take any parameters.

## Server notifications

Here are the conference related notifications that callback is invoked for. Please check the [conference.html](https://github.com/ant-media/StreamApp/blob/master/src/main/webapp/conference.html) for proper usage.

*   ```newStreamAvailable```: Called when a previously joined stream is ready to play.
*   ```publish_started```: called when our stream is published to the room.
*   ```play_started```: called when we start playing the remote streams.
