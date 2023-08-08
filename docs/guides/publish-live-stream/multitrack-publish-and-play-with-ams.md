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

### Add and Delete subtracks via Rest API

You can use the [add SubTrack Rest API](https://antmedia.io/rest/#/BroadcastRestService/addSubTrack) to add the various subtracks to the main track. Here's the CURL sample:

    curl -X 'POST' 'https://AMS-domain:5443/WebRTCAppEE/rest/v2/broadcasts/mainTrackId/subtrack?id=stream1' -H 'accept: application/json'

You can use the [delete SubTrack Rest API](https://antmedia.io/rest/#/BroadcastRestService/removeSubTrack) to delete the various subtracks from the main track. Here's the CURL sample:

    curl -X 'DELETE' 'https://AMS-domain:5443/WebRTCAppEE/rest/v2/broadcasts/mainTrackId/subtrack?id=stream1' -H 'accept: application/json'
