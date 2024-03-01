---
title: Multitrack publish and play with AMS
description: Multitrack publish and play with AMS
keywords: [Multitrack Publish, Multitrack conference, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 6
---

# Multitrack publish and play with AMS

WebRTC multitrack lets us stream multiple audio/video tracks through a single WebRTC connection. In order to use Multitrack feature, the SDP semantic should be set as **Unified Plan** which is also set by default in AMS v2.4.3 and above.

With multitrack streams, you can play different groups of streams with a single broadcast ID. Then, you can start playing those groups of streams with one play request and, most importantly through a single WebRTC connection and this decreases resource usage as well.

### Terminologies related to multitrack

**Main track:** Stream Id of a group is referred as main track.  
**Sub track:** The streams in a group with different stream Ids are referred as subtracks.

To combine the broadcasts into a single broadcast (main track), publish the streams as shown below.

* When calling the publish method of the webrtcAdaptor in the SDK, pass the group ID as ```mainTrack```. The URL for the WebRTC sample page will be as follows:

`https://AMS-domain:5443/AppName/?mainTrack=groupID`

* You must use the following URL for RTMP streams:

```rtmp:/AMS-domain:1935/WebRTCAppEE/streamId?mainTrack=groupID```

### Publishing multitrack streams

Let's publish a stream to the sample WebRTCAppEE application with **streamId=video** and group ID (mainTrack) as **main**.

`rtmp:/AMS-domain:1935/WebRTCAppEE/video?mainTrack=main`

Now, as needed, publish streams with different audio subtracks.

Assume you have two audio tracks with the stream IDs **audio1** and **audio2**.

![multitrack-streams.png](@site/static/img/multitrack-streams.png)

### Playing multitrack streams

Multitrack streams can be played with the sample page, **multitrackplayer.html**

`https://AMS-domain:5443/WebRTCAppEE/multitrackplayer.html`

![sample.png](@site/static/img/sample(1).png)

1.  Write the group ID in the text box
2.  Request the sub-tracks by clicking the ```Tracks``` button
3.  Select the tracks you want to play and click the ```Start Playing``` button
4.  If a new subtrack is added to the group, it will be played automatically

You can enable or disable video/audio feed for a sub-track with ```enableTrack(mainTrackId, trackId, enabled)``` methods in the webrtc-adaptor SDK.

![multitrack-player-1.png](@site/static/img/multitrack-player-1(1).png)

## Multitrack conference

**multitrack-conference.html** is a new sample conference page that is compatible with multitrack playback.

The ```mainTrack``` (group ID) will be the same as the room Id. For example, in the above-described case, the mainTrack is **main**, so it will be the room Id.

`https://AMS-domain:5443/WebRTCAppEE/multitrack-conference.html`

You can also join the room in ```playOnly``` mode using the following URL.

`https://AMS-domain:5443/WebRTCAppEE/multitrack-conference.html?playOnly=true`

The play request for the room Id is only called once in a Multitrack conference.

By default, there is no limit on audio and video tracks, so each participant can play other participants videos, which increases CPU load on the server side. In order to optimize the performance, you can limit the audio and video tracks by adding below settings to the **/usr/local/antmedia/webapps/App-Name/WEB-INF/red5-web.properties** file.

`settings.maxAudioTrackCount=-1`

`settings.maxVideoTrackCount=-1`

Please change the values as per your requirements and restart the server after making changes. In version 2.6.2 and above, all settings can be changed from dashboard itself. Please check [here](https://github.com/orgs/ant-media/discussions/5161#discussioncomment-6401677).

### Media Pull
The Media Pull feature empowers users to add any external stream present on AMS into an ongoing conference room. With this capability, users can dynamically add or remove streams during a conference using the REST API.
For instance, you can add an IP Camera pull stream to your conference and then remove it as desired. Media pull functionality is versatile and applicable to any type of live broadcast on AMS.

To test media pull feature first create a conference room and join it as a participant.

Go to
`https://AMS-domain:5443/WebRTCAppEE/conference.html`

Type a room name and note it because we will use it while adding/removing external streams. Click join room button. 
![mediapull-join-room.png](@site/static/img/mediapull-join-room.png)

After joining a room 2 broadcasts will be created on server.
1. Room Broadcast(main track)
2. Participant Broadcast(subtrack of room broadcast)

Observe that both broadcasts are created on web panel.

![mediapull-broadcasts.png](@site/static/img/mediapull-broadcasts.png)

Now go to 
`https://AMS-domain:5443/WebRTCAppEE`

and publish an external stream to ant media server.
![mediapull-external-stream.png](@site/static/img/mediapull-external-stream.png)
Observe external_stream is broadcasting on ant media server.

![mediapull-external-stream-broadcasting.png](@site/static/img/mediapull-external-stream-broadcasting.png)

Now that our external stream is live on the Ant Media Server, it's time to add it into our conference room through the REST API.

It's important to note that each participant in a conference room corresponds to a subtrack in the room broadcast object. Therefore, we will add our external stream to the subtrack list of our room broadcast object, so that the external stream becomes visible in the conference room.

To add our external stream to our conference room, we will use 

[add SubTrack Rest API](https://antmedia.io/rest/#/BroadcastRestService/addSubTrack)

Send a POST request with the stream ID of conference room broadcast(room1) and stream ID of the external broadcast(external_stream) you would like to add to the conference room.


![mediapull-add-external-stream-postman.png](@site/static/img/mediapull-add-external-stream-postman.png)

Example curl:

    curl -X 'POST' 'https://AMS-domain:5443/WebRTCAppEE/rest/v2/broadcasts/room1/subtrack?id=external_stream' -H 'accept: application/json'

As soon as you receive success, you should observe that external stream is added to the conference room.

![mediapull-external-stream-added.png](@site/static/img/mediapull-external-stream-added.png)

To remove the external stream from the conference room, send a DELETE request to the same route.

[remove SubTrack Rest API](https://antmedia.io/rest/#/BroadcastRestService/removeSubTrack)

![mediapull-remove-external-stream-postman.png](@site/static/img/mediapull-remove-external-stream-postman.png)

Example curl:

    curl -X 'DELETE' 'https://AMS-domain:5443/WebRTCAppEE/rest/v2/broadcasts/room1/subtrack?id=external_stream' -H 'accept: application/json'

As soon as you receive success, you should observe that external stream is removed from the conference room.