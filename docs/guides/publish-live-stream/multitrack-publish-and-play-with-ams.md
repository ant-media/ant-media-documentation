---
title: Multitrack publish and play with AMS
description: Multitrack publish and play with AMS
keywords: [Multitrack Publish, Multitrack conference, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 6
---

# Multitrack publish and play with AMS

Ant Media Server (AMS) supports WebRTC multitrack streaming, enabling the transmission of multiple audio and video tracks through a single WebRTC connection. This feature is particularly useful for applications like video conferencing and live events, where multiple streams need to be managed efficiently.

### Prerequisites
- **AMS Version**: Ensure you're using **AMS version 2.4.3 or above**, as the Unified Plan SDP semantic is set by default in these versions.
- **Unified Plan**: The Unified Plan SDP semantic must be used for multitrack support.

With multitrack streams, you can play different groups of streams with a single broadcast ID. Then, you can start playing those groups of streams with one play request and most importantly, through a single WebRTC connection, which decreases resource usage as well.

### Terminologies related to multitrack

**Main track:** Stream Id of a group is referred to as the main track. 
**Sub track:** The streams in a group with different stream Ids are referred to as subtracks.

To combine the broadcasts into a single broadcast (main track), publish the streams as shown below.

* When calling the publish method of the webrtcAdaptor in the SDK, pass the group ID as ```mainTrack```. The URL for the WebRTC sample page will be as follows:

`https://AMS-domain:5443/live/?mainTrack=groupID`

* You must use the following URL for RTMP streams:

```rtmp:/AMS-domain:1935/live/streamId?mainTrack=groupID```

### Publishing multitrack streams

Let's publish a stream to the sample live application with **streamId=video** and group ID (mainTrack) as **main**.

`rtmp:/AMS-domain:1935/live/video?mainTrack=main`

Now, as needed, publish streams with different audio subtracks.

Assume you have two audio tracks with the stream IDs **audio1** and **audio2**.

![multitrack-streams.png](@site/static/img/multitrack-streams.png)

### Playing Multitrack streams

Ant Media Server supports two distinct methods for playing multitrack streams. Users can either manage individual tracks separately or aggregate multiple tracks under a single main stream ID for unified playback. Here’s a breakdown of both approaches:


#### - Multitrack streams can be played with multitrackplayer.html the sample page 
The multitrackplayer.html page is designed for scenarios where multiple streams are published as individual tracks, allowing precise control over each track.

```
https://AMS-domain:5443/live/multitrackplayer.html
```
![sample.png](@site/static/img/sample(1).png)

1.  Write the group ID in the text box
2.  Request the sub-tracks by clicking the ```Tracks``` button
3.  Select the tracks you want to play and click the ```Start Playing``` button
4.  If a new subtrack is added to the group, it will be played automatically

You can enable or disable the video/audio feed for a sub-track with the ```enableTrack(mainTrackId, trackId, enabled)``` methods in the webrtc-adaptor SDK.

![multitrack-player-1.png](@site/static/img/multitrack-player-1(1).png)

#### Unified Multitrack Playback with multitrack-play.html sample page
For a simpler experience, the multitrack-play.html page consolidates multiple subtracks under one main track ID, providing a unified stream for playback. This is ideal for users who prefer not to manage individual subtracks but want all streams merged automatically.
```
https://<your-server-domain>:<port>/live/multitrack-play.html?id=<main-stream-id>
```
![image](https://github.com/user-attachments/assets/9aa86c6a-7fde-4488-996d-f332367bec5a)


## Multitrack conference

**conference.html** is a sample conference page that is compatible with multitrack playback.

The ```mainTrack``` (group ID) will be the same as the room Id. For example, in the above-described case, the mainTrack is **main**, so it will be the room Id.

`https://AMS-domain:5443/live/conference.html`

You can also join the room in ```playOnly``` mode using the following URL:.

`https://AMS-domain:5443/live/conference.html?playOnly=true`

The play request for the room Id is only called once in a Multitrack conference.

By default, there is no limit on audio and video tracks, so each participant can play other participants videos, which increases CPU load on the server side. In order to optimize the performance, you can limit the audio and video tracks by adding the below settings to the **/usr/local/antmedia/webapps/App-Name/WEB-INF/red5-web.properties** file.

`settings.maxAudioTrackCount=-1`

`settings.maxVideoTrackCount=-1`

Please change the values as per your requirements and restart the server after making changes. In version 2.6.2 and above, all settings can be changed from the dashboard itself. Please check [here](https://github.com/orgs/ant-media/discussions/5161#discussioncomment-6401677).

### Media Pull

The Media Pull feature empowers users to add any external stream present on AMS to an ongoing conference room. With this capability, users can dynamically add or remove streams during a conference using the REST API.

For instance, you can add an IP camera pull stream to your conference and then remove it as desired. Media pull functionality is versatile and applicable to any type of live broadcast on AMS.

To test the media pull feature, first create a conference room and join it as a participant.

Go to the conference sample page and join the conference room.

`https://AMS-domain:5443/live/conference.html`

Type a room name and note it because we will use it while adding/removing external streams. Click the join room button.

![mediapull-join-room.png](@site/static/img/mediapull-join-room.png)

After joining a room, 2 broadcasts will be created on the server.
1. Room Broadcast (Main track)
2. Participant Broadcast (Sub track of room broadcast)

Observe that both broadcasts are created on a web panel.

![mediapull-broadcasts.png](@site/static/img/mediapull-broadcasts.png)

Now go to the WebRTC publish sample page to publish the individual stream.

`https://AMS-domain:5443/live`

![mediapull-external-stream.png](@site/static/img/mediapull-external-stream.png)

Observe that `external_stream` streamId is broadcasting on the Ant Media Server.

![mediapull-external-stream-broadcasting.png](@site/static/img/mediapull-external-stream-broadcasting.png)

Now that our external stream is live on the Ant Media Server, it's time to add it to our conference room through the REST API.

It's important to note that each participant in a conference room corresponds to a subtrack in the room broadcast object. Therefore, we will add our external stream to the subtrack list of our room broadcast object, so that the external stream becomes visible in the conference room.

To add our external stream to our conference room, we will use [add SubTrack Rest API](https://antmedia.io/rest/#/default/addSubTrack).

Send a POST request with the streamId of the conference room broadcast `(room1)` and streamId of the external broadcast `(external_stream)` you would like to add to the conference room.

![mediapull-add-external-stream-postman.png](@site/static/img/mediapull-add-external-stream-postman.png)

**Here is the Curl Sample:**

```bash
curl -X 'POST' 'http(s)://AMS-domain:port/live/rest/v2/broadcasts/RoomName/subtrack?id=external-streamId' -H 'accept: application/json'
```

As soon as you receive success, you should observe that an external stream is added to the conference room.

![mediapull-external-stream-added.png](@site/static/img/mediapull-external-stream-added.png)

To remove the external stream from the conference room, we will use [remove SubTrack Rest API](https://antmedia.io/rest/#/default/removeSubTrack).

![mediapull-remove-external-stream-postman.png](@site/static/img/mediapull-remove-external-stream-postman.png)

**Here is the Curl Sample:**

```bash
curl -X 'DELETE' 'http(s)://AMS-domain:port/live/rest/v2/broadcasts/RoomName/subtrack?id=external-streamId' -H 'accept: application/json'
```

As soon as you receive success, you should observe that the external stream is removed from the conference room.

<br /><br />
---

<div align="center">
<h2> You're a Multitrack Maestro! 🎶 </h2>
</div>

Congratulations! You've successfully configured Ant Media Server to handle **multitrack streaming**. Whether it's a **live event** with multiple audio and video feeds or a **dynamic conference room**, your setup is now optimized for seamless, unified playback.

Your audience is in for an **immersive experience,** with synchronized streams delivered efficiently through a single WebRTC connection. Well done — your multitrack streams are live and ready to impress!

