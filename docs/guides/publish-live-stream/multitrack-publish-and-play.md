---
title: Multitrack Publish and Play
description: Publish and play multiple audio/video tracks through a single WebRTC connection with Ant Media Server.
keywords: [Multitrack Publish, Multitrack conference, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 11
---

# Multitrack Publish and Play

Ant Media Server (AMS) supports WebRTC multitrack streaming, enabling the transmission of multiple audio and video tracks through a single WebRTC connection. This feature is particularly useful for applications like video conferencing and live events, where multiple streams need to be managed efficiently.

By the end of this guide, you'll be publishing a main track with multiple subtracks and playing them back either individually or merged, through a single WebRTC connection.

## Requirements

- Ant Media Server **2.4.3+**, where the Unified Plan SDP semantic — required for multitrack support — is enabled by default.

With multitrack streams, you can play different groups of streams with a single broadcast ID. Then, you can start playing those groups of streams with one play request and most importantly, through a single WebRTC connection, which decreases resource usage as well.

## Terminology

- **Main track:** the stream ID of a group is referred to as the main track.
- **Sub track:** the streams in a group with different stream IDs are referred to as subtracks.

To combine broadcasts into a single main track, publish the streams as shown below.

When calling the publish method of the WebRTC adaptor in the SDK, pass the group ID as `mainTrack`. The URL for the WebRTC sample page will be:

```
https://<DOMAIN_NAME>:5443/live/?mainTrack=<GROUP_ID>
```

For RTMP streams, use:

```
rtmp://<DOMAIN_NAME>:1935/live/<STREAM_ID>?mainTrack=<GROUP_ID>
```

## Publishing Multitrack Streams

Let's publish a stream to the sample `live` application with `streamId=video` and group ID (`mainTrack`) as `main`.

```
rtmp://<DOMAIN_NAME>:1935/live/video?mainTrack=main
```

Now, as needed, publish streams with different audio subtracks. Assume you have two audio tracks with the stream IDs `audio1` and `audio2`.

![multitrack-streams.png](@site/static/img/multitrack-streams.png)

## Playing Multitrack Streams

Ant Media Server supports two distinct methods for playing multitrack streams. Users can either manage individual tracks separately or aggregate multiple tracks under a single main stream ID for unified playback.

### Individual Tracks with multitrackplayer.html

The `multitrackplayer.html` sample page is designed for scenarios where multiple streams are published as individual tracks, allowing precise control over each track.

```
https://<DOMAIN_NAME>:5443/live/multitrackplayer.html
```

![sample.png](@site/static/img/sample(1).png)

1. Write the group ID in the text box.
2. Request the sub-tracks by clicking the `Tracks` button.
3. Select the tracks you want to play and click the `Start Playing` button.
4. If a new subtrack is added to the group, it will be played automatically.

You can enable or disable the video/audio feed for a sub-track with the `enableTrack(mainTrackId, trackId, enabled)` method in the webrtc-adaptor SDK.

![multitrack-player-1.png](@site/static/img/multitrack-player-1(1).png)

### Unified Playback with multitrack-play.html

For a simpler experience, the `multitrack-play.html` page consolidates multiple subtracks under one main track ID, providing a unified stream for playback. This is ideal for users who prefer not to manage individual subtracks but want all streams merged automatically.

```
https://<DOMAIN_NAME>:5443/<APP_NAME>/multitrack-play.html?id=<STREAM_ID>
```

![image](https://github.com/user-attachments/assets/9aa86c6a-7fde-4488-996d-f332367bec5a)

## Multitrack Conference

`conference.html` is a sample conference page that is compatible with multitrack playback. The `mainTrack` (group ID) is the same as the room ID — in the example above, the mainTrack is `main`, so that's also the room ID.

```
https://<DOMAIN_NAME>:5443/live/conference.html
```

You can also join the room in `playOnly` mode:

```
https://<DOMAIN_NAME>:5443/live/conference.html?playOnly=true
```

The play request for the room ID is only called once in a multitrack conference.

By default, there is no limit on audio and video tracks, so each participant can play every other participant's video, which increases CPU load on the server side. To limit audio and video tracks, add the following settings to the `/usr/local/antmedia/webapps/<APP_NAME>/WEB-INF/red5-web.properties` file:

```
settings.maxAudioTrackCount=-1
settings.maxVideoTrackCount=-1
```

Change the values as needed and restart the server afterward. In version 2.6.2 and above, these settings can be changed from the dashboard directly — see [this discussion](https://github.com/orgs/ant-media/discussions/5161#discussioncomment-6401677) for details.

### Media Pull

Media Pull lets you add any external stream already on AMS into an ongoing conference room, and remove it again, dynamically via the REST API. For instance, you can pull in an IP camera stream mid-conference and drop it when it's no longer needed — this works for any type of live broadcast on AMS, not just cameras.

To test Media Pull, first create a conference room and join it as a participant. Go to the conference sample page, type a room name — note it, since you'll need it to add/remove external streams — and click **Join Room**.

```
https://<DOMAIN_NAME>:5443/live/conference.html
```

![mediapull-join-room.png](@site/static/img/mediapull-join-room.png)

After joining a room, two broadcasts are created on the server:

1. **Room Broadcast** (main track)
2. **Participant Broadcast** (sub track of the room broadcast)

Observe that both broadcasts are created on the web panel.

![mediapull-broadcasts.png](@site/static/img/mediapull-broadcasts.png)

Now go to the WebRTC publish sample page and publish an individual stream:

```
https://<DOMAIN_NAME>:5443/live
```

![mediapull-external-stream.png](@site/static/img/mediapull-external-stream.png)

Observe that the `external_stream` stream ID is broadcasting on Ant Media Server.

![mediapull-external-stream-broadcasting.png](@site/static/img/mediapull-external-stream-broadcasting.png)

Now that the external stream is live on AMS, add it to the conference room through the REST API. Each participant in a conference room corresponds to a subtrack of the room broadcast object, so adding the external stream to the room broadcast's subtrack list is what makes it visible in the conference.

Use the [Add SubTrack REST API](https://antmedia.io/rest/#/default/addSubTrack) with the stream ID of the conference room broadcast (`room1`) and the stream ID of the external broadcast (`external_stream`) you want to add:

![mediapull-add-external-stream-postman.png](@site/static/img/mediapull-add-external-stream-postman.png)

```bash
curl -X 'POST' 'https://<DOMAIN_NAME>:5443/live/rest/v2/broadcasts/room1/subtrack?id=external_stream' -H 'accept: application/json'
```

Once you receive a success response, the external stream appears in the conference room.

![mediapull-external-stream-added.png](@site/static/img/mediapull-external-stream-added.png)

To remove the external stream from the conference room, use the [Remove SubTrack REST API](https://antmedia.io/rest/#/default/removeSubTrack):

![mediapull-remove-external-stream-postman.png](@site/static/img/mediapull-remove-external-stream-postman.png)

```bash
curl -X 'DELETE' 'https://<DOMAIN_NAME>:5443/live/rest/v2/broadcasts/room1/subtrack?id=external_stream' -H 'accept: application/json'
```

Once you receive a success response, the external stream is removed from the conference room.

You're now publishing and playing multitrack streams through a single WebRTC connection, including dynamically pulling external streams in and out of a conference room.

## Need Help?

If subtracks don't appear on the player or Media Pull calls fail, reach out on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or contact [Technical Support](mailto:support@antmedia.io).
