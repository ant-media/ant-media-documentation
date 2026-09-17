---
title: Conference Structure
description: Ant Media Conference Structure with Demo Application
keywords: [Conference Ant Media, Ant Media video conference, ant media conferencing, Publish, Multitrack conference, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

# Ant Media Server Conference Framework

Ant Media Server enables the development of robust WebRTC video conferencing applications across all supported SDK platforms, supporting unlimited conference participants.

By the end of this guide, you'll understand how Ant Media Server models a conference room and its participants, see it in action through the built-in sample app, and know how to build your own conferencing UI in React using the Javascript SDK.

## Main Track Broadcast (Conference Room)

When you publish a regular stream to Ant Media Server, regardless of the publishing method, the server creates a Broadcast object, which is also visible on the web panel. This object stores various details about the broadcast, such as its streamId, status, type, `subTrackStreamIds` and more. Take a look at Broadcast schema fields from broadcast [Rest API](https://antmedia.io/rest/#/default/createBroadcast).

:::info
In Ant Media Server, there is no distinct concept of a conference room. Instead, conference room and participants are represented by broadcast objects. Each conference room is treated as a broadcast, and every participant within a room is also represented by their own broadcast object.
:::

A broadcast object that holds the streamIds of other broadcast objects in its `subTrackStreamIds` field is known as the main track broadcast. In a video conferencing context, this object represents the **conference room**, and its streamId will serve as the **roomId**.

## Sub Track Broadcast (Conference Participant)

A broadcast object whose `mainTrackStreamId` field is set to another broadcast object's streamId is known as the sub track broadcast.

In video conferencing context, this object represents the **conference participant**, and its streamId will serve as participant id, which will also exist in the `subTrackStreamIds` field of the main track broadcast.

## Sample Video Conference Application

Now that we've covered the fundamental concepts of conferencing, let's take a look at video conferencing in action via the sample Conference application on AMS.

By default, there is a sample conference application page available in all applications of AMS. Here is the URL format:

```
https://{ams-url}:5443/{appName}/conference.html
```

Example:

```
https://test.antmedia.io:5443/live/conference.html
```

**Step 1:** Type a roomId and click on **Join Room**.

![](@site/static/img/conference/video-conference/video-conference-1.png)

After joining the room, two broadcasts will be created on the server:

1. Room Broadcast (Main track)
2. Participant Broadcast (Sub track of room broadcast)

Observe that both broadcasts are created on a web panel.

![](@site/static/img/conference/video-conference/video-conference-2.png)

**Step 2:** Now send a [GET request](https://antmedia.io/rest/#/default/getBroadcast) to Ant Media Server with the main track broadcast streamId to retrieve the broadcast object.

```
https://{ams-url}:5443/{app-name}/rest/v2/broadcasts/{room-streamId}
```

**Example:** `https://test.antmedia.io:5443/live/rest/v2/broadcasts/room1`

This will return the broadcast object. Observe that the `subTrackStreamIds` field contains our participant's streamIds.

![](@site/static/img/conference/video-conference/video-conference-3.png)

**Step 3:** Send a [GET request](https://antmedia.io/rest/#/default/getBroadcast) to Ant Media Server with the sub track broadcast streamId to retrieve the participant's broadcast object.

```
https://{ams-url}:5443/{app-name}/rest/v2/broadcasts/{participant-stream-id}
```

**Example:** `https://test.antmedia.io:5443/live/rest/v2/broadcasts/idiTofPCrEx4`

Observe that `mainTrackId` is set to our room's id.

![](@site/static/img/conference/video-conference/video-conference-4.png)

## Develop a Video Conference Application In React

In this section, we'll build a simple video conference application on top of Ant Media Server using the Javascript SDK with the React framework, so you can see the concepts above wired into a working UI.

Before you start, take a quick look at the [Javascript SDK Documentation](https://antmedia.io/docs/guides/developer-sdk-and-api/sdk-integration/javascript-sdk/). For a more comprehensive conference sample in plain Javascript, see this [Javascript Conference Sample](https://github.com/ant-media/StreamApp/blob/8544ecd2111952008f187f1e0d35fda4cccb030a/src/main/webapp/conference.html), which the built-in `conference.html` page above is based on.

To see a production-ready, open-source video conferencing application built on Ant Media Server using React, visit [Circle](https://meet.antmedia.io/Conference/) — it's fully open source on [GitHub](https://github.com/ant-media/conference-call-application).

Each step below shows only the code you need to add or change on top of the previous step — you're building up the same `ConferenceComponent` throughout. If you'd rather work from the finished file directly, the [complete source for this tutorial](https://github.com/lastpeony/antmedia-react-conference-sample) is available on GitHub.

### Step 1: Create a New React Project

```bash
npx create-react-app antmedia-react-conference-sample
```

### Step 2: Install the Ant Media Javascript SDK

```bash
npm i @antmedia/webrtc_adaptor
```

### Step 3: Disable Strict Mode

Go to `index.js` and remove the `<StrictMode>` tags around `<App/>`. The WebRTC adaptor doesn't handle React's double-invoked effects in strict mode well, so leaving it enabled causes the adaptor to initialize twice.

### Step 4: Create a Conference Component

In your `src` directory, create a new folder named `components`. Inside it, create a new file called `ConferenceComponent.js`:

```js
import { useEffect, useState, useRef } from 'react';
import { WebRTCAdaptor } from '@antmedia/webrtc_adaptor'

export default function ConferenceComponent(){

    return(
        <div style={{width:"100%", height:"100%", display:"flex", flexDirection:"column"}}>
            <h1 style={{marginLeft:"auto", marginRight:"auto"}}>Ant Media React Conference Sample</h1>
        </div>
    )
}
```

Go to `App.js`, import `ConferenceComponent`, and add it inside the return:

```js
import './App.css';
import ConferenceComponent from './components/ConferenceComponent';

function App() {
  return (
    <div className="App">
      <ConferenceComponent></ConferenceComponent>
    </div>
  );
}

export default App;
```

### Step 5: Create a WebRTC Adaptor Object

Whether you're publishing, playing, or conferencing, the first step in every AMS SDK is creating a WebRTC adaptor object — this initializes the user's camera and microphone and opens a WebSocket connection to Ant Media Server.

Add the following state, refs, and effect inside `ConferenceComponent`, above the `return`:

```js
const [localParticipantStreamId, setLocalParticipantStreamId] = useState('')
const [roomId, setRoomId] = useState('') // this is a state because it changes through user input
const localVideoElement = useRef(null)
const mediaConstraints = useRef({
    video: { width: { min: 176, max: 360 } }, // width and height of the local participant's video
    audio: true,
})
const websocketUrl = useRef('wss://test.antmedia.io:5443/live/websocket')
const localParticipantVideoElementId = useRef('localParticipantVideo')
const webrtcAdaptor = useRef(null)

useEffect(() => {
    webrtcAdaptor.current = new WebRTCAdaptor({
        websocket_url: websocketUrl.current,
        mediaConstraints: mediaConstraints.current,
        localVideoId: localParticipantVideoElementId.current,
        localVideoElement: localVideoElement.current,
        isPlayMode: false,
        onlyDataChannel: false,
        debug: true,
        callback: (info, obj) => {
            if (info === "initialized") {
                console.log("Webrtc adaptor initialized.");
            } else if (info === "newTrackAvailable") {
                // wired up in Step 10
            } else if (info === "publish_started") {
                console.log("publish started to room " + roomId);
            } else if (info === "publish_finished") {
                console.log("publish finished");
            } else if (info === "play_started") {
                console.log("play started");
            } else if (info === "play_finished") {
                console.log("play_finished for stream:" + obj.streamId);
            } else if (info === "data_received") {
                // wired up in Step 13
            }
        },
    });
}, [])
```

Now add a video element to the JSX to render the local user's video:

```jsx
<video muted={true} autoPlay={true} style={{width:"360", height:"202px"}} ref={localVideoElement.current} id={localParticipantVideoElementId.current}></video>
```

Run `npm start`, open `localhost`, and check the console — you should see the adaptor initialize and your camera video render:

![](@site/static/img/conference/video-conference/video-conference-5.png)

This confirms your client connected to Ant Media Server over WebSocket and is ready to publish, play, and conference.

### Step 6: Join a Room

There are two main methods in every AMS WebRTC SDK: `publish()` and `play()`. Joining a conference room means publishing to the main track broadcast and playing that same broadcast.

Add `getUserStatusMetaData` and `joinRoom` to `ConferenceComponent`:

```js
const getUserStatusMetaData = () => {
    let metadata = {
        isMicMuted: false,
        isCameraOff: false,
    }
    return metadata;
}

const joinRoom = () => {
    var userStatusMetaData = getUserStatusMetaData()
    webrtcAdaptor.current.publish(localParticipantStreamId, null, null, null, localParticipantStreamId, roomId, JSON.stringify(userStatusMetaData));
    webrtcAdaptor.current.play(roomId)
}
```

For `.publish()`, the 1st, 6th, and 7th arguments are required for conferencing: the 1st is the participant's `streamId`, the 6th is the `roomId` (main track id), and the 7th is the broadcast's `metadata` — used here to store the participant's microphone and camera state. See the [full parameter reference on GitHub](https://github.com/ant-media/StreamApp/blob/3cd4fb74033cbfd99638947e473507352788278c/src/main/js/webrtc_adaptor.js#L484) for the rest.

For `.play()`, only `roomId` is required — see the [reference here](https://github.com/ant-media/StreamApp/blob/3cd4fb74033cbfd99638947e473507352788278c/src/main/js/webrtc_adaptor.js#L582). It's safe to call `.play()` immediately after `.publish()`, but you can also wait for the `publish_started` callback:

```js
} else if (info === "publish_started") {
    console.log("publish started to room " + roomId);
    webrtcAdaptor.current.play(roomId);
}
```

Add inputs for the room id and the local participant's stream id, plus a Join Room button, to the JSX:

```jsx
<div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
    <div style={{display:"flex", flexDirection:"column"}}>
        <input type="text" placeholder="Enter Room ID" value={roomId} onChange={(e) => setRoomId(e.target.value)}></input>
        <input type="text" placeholder="Enter Your Stream ID" value={localParticipantStreamId} onChange={(e) => setLocalParticipantStreamId(e.target.value)}></input>
    </div>
    <button onClick={joinRoom}>Join Room</button>
</div>
```

### Step 7: Retrieve the Main Track Broadcast Object

Once `.play(roomId)` succeeds, the adaptor fires `play_started`. Handle it by requesting the room's broadcast object:

```js
} else if (info === "play_started") {
    webrtcAdaptor.current.getBroadcastObject(roomId);
}
```

Ant Media Server responds through the `broadcastObject` callback event:

```js
} else if (info === "broadcastObject") {
    if (obj.broadcast === undefined) {
        return;
    }
    let broadcastObject = JSON.parse(obj.broadcast);
    if (obj.streamId === roomId) {
        // this is the main track (room) broadcast object — handled in Step 8
    } else {
        // this is a sub track (participant) broadcast object — handled in Step 9
    }
}
```

### Step 8: Process the Main Track Broadcast Object

When a broadcast object's streamId equals `roomId`, it's the main track (room) object. Its `subTrackStreamIds` field lists every current participant — for any participant not already tracked, request their broadcast object too.

Add a ref to track known participants, and the handler function:

```js
const allParticipants = useRef({})

const handleMainTrackBroadcastObject = (broadcastObject) => {
    let participantIds = broadcastObject.subTrackStreamIds;

    // find and remove tracks that are no longer in the room
    let currentTracks = Object.keys(allParticipants.current);
    currentTracks.forEach(trackId => {
        if (!allParticipants.current[trackId].isFake && !participantIds.includes(trackId)) {
            console.log("stream removed:" + trackId);
            delete allParticipants.current[trackId];
        }
    });

    // request broadcast objects for any new participants
    participantIds.forEach(pid => {
        if (allParticipants.current[pid] === undefined) {
            webrtcAdaptor.current.getBroadcastObject(pid);
        }
    });
}
```

Wire it into the `broadcastObject` callback from Step 7:

```js
if (obj.streamId === roomId) {
    handleMainTrackBroadcastObject(broadcastObject)
} else {
    // handled in Step 9
}
```

Go to `localhost`, type a room id and your stream id, and click Join Room:

![](@site/static/img/conference/video-conference/video-conference-6.png)

Checking the web panel, you should see two broadcasts: one for the room, one for you as the local participant.

### Step 9: Process the Sub Track Broadcast Object

Step 8 requested broadcast objects for each participant id — Ant Media Server responds with sub track objects for each. Add the handler:

```js
const handleSubTrackBroadcastObject = (broadcastObject) => {
    if (broadcastObject.metaData !== undefined && broadcastObject.metaData !== null) {
        let userStatusMetadata = JSON.parse(broadcastObject.metaData);

        if (userStatusMetadata.isCameraOff !== undefined) {
            broadcastObject.isCameraOff = userStatusMetadata.isCameraOff;
        }
        if (userStatusMetadata.isMicMuted !== undefined) {
            broadcastObject.isMicMuted = userStatusMetadata.isMicMuted;
        }
    }

    allParticipants.current[broadcastObject.streamId] = broadcastObject;
}
```

This stores the broadcast object under `allParticipants`, keyed by streamId — mainly so you can read the remote participant's camera/microphone state back out of the broadcast's `metaData` field. Wire it into the `broadcastObject` callback's else branch:

```js
} else {
    handleSubTrackBroadcastObject(broadcastObject)
}
```

### Step 10: Handle Remote Participants' Video and Audio Tracks

When you join a room with existing participants, Ant Media Server emits a `newTrackAvailable` event for each of their tracks — and again whenever a new participant joins. Each event fires with either a video track object or an audio track object; both carry a `trackId` in the form `ARDAMSv<STREAM_ID>` (video) or `ARDAMSa<STREAM_ID>` (audio).

:::info
The `streamId` field on these track objects is always the `roomId`, even for a remote participant's track — it does **not** identify which participant the track belongs to. Step 13 covers how to actually match a track to its participant.
:::

Add a state array to hold the tracks to render, and the handler:

```js
const [remoteParticipantTracks, setRemoteParticipantTracks] = useState([])

const onNewTrack = (obj) => {
    console.log("new track available with id: " + obj.trackId + " and kind: " + obj.track.kind + " on the room:" + roomId);

    // trackId is ARDAMSv+STREAM_ID or ARDAMSa+STREAM_ID — strip the prefix to get the underlying id
    var incomingTrackId = obj.trackId.substring("ARDAMSx".length);

    if (incomingTrackId === roomId || incomingTrackId === localParticipantStreamId) {
        return;
    }

    var remoteParticipantTrack = {
        trackId: incomingTrackId,
        track: obj.track,
        kind: obj.track.kind,
    }

    const trackExists = remoteParticipantTracks.some(
        (participantTrack) => participantTrack.trackId === remoteParticipantTrack.trackId
    );

    if (!trackExists) {
        setRemoteParticipantTracks((prevTracks) => [...prevTracks, remoteParticipantTrack]);
    }

    obj.stream.onremovetrack = (event) => {
        var removedTrackId = event.track.id.substring("ARDAMSx".length);
        setRemoteParticipantTracks((prevTracks) =>
            prevTracks.filter((participantTrack) => participantTrack.trackId !== removedTrackId)
        );
    }
}
```

Wire it into the `newTrackAvailable` branch from Step 5:

```js
} else if (info === "newTrackAvailable") {
    onNewTrack(obj)
}
```

### Step 11: Render Remote Participants On Screen

Now that tracks are stored in state, render them. Create two small components — one for video, one for audio (hidden, used only to play sound).

`components/RemoteParticipantVideoComponent.js`:

```js
import { useEffect, useState, useRef } from 'react';

export default function RemoteParticipantVideoComponent({videoTrack, streamIdProp}){
    const videoRef = useRef(null);
    const [videoStream, setVideoStream] = useState(null);
    const [streamId, setStreamId] = useState("")

    useEffect(() => {
        if (videoTrack) {
            const newStream = new MediaStream();
            newStream.addTrack(videoTrack);
            videoRef.current.srcObject = newStream
            setVideoStream(newStream);
        }
    }, [videoTrack])

    useEffect(() => {
        setStreamId(streamIdProp)
    }, [streamIdProp])

    return(
        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <video ref={videoRef} id="remoteVideo" style={{width:"360", height:"202px"}} controls autoPlay playsInline></video>
            <span>{streamId}</span>
        </div>
    )
}
```

`components/RemoteParticipantAudioComponent.js`:

```js
import { useEffect, useState, useRef } from 'react';

export default function RemoteParticipantAudioComponent({audioTrack}){
    const videoRef = useRef(null);
    const [videoStream, setVideoStream] = useState(null);

    useEffect(() => {
        if (audioTrack) {
            const newStream = new MediaStream();
            newStream.addTrack(audioTrack);
            videoRef.current.srcObject = newStream
            setVideoStream(newStream);
        }
    }, [audioTrack])

    return(
        <div style={{display:"none"}}>
            <video ref={videoRef} id="remoteVideo" controls autoPlay playsInline></video>
        </div>
    )
}
```

The audio component's video element is hidden with `display:"none"` — it exists only to play the audio track.

Back in `ConferenceComponent`, import both components and add a render function:

```js
import RemoteParticipantAudioComponent from './RemoteParticipantAudioComponent';
import RemoteParticipantVideoComponent from './RemoteParticipantVideoComponent';

const renderRemoteParticipantTracks = () => {
    return remoteParticipantTracks.map((trackObj) => {
        if (trackObj.kind === 'video') {
            return (
                <RemoteParticipantVideoComponent
                    key={trackObj.trackId}
                    videoTrack={trackObj.track}
                    streamIdProp={trackObj.trackId}
                />
            );
        } else if (trackObj.kind === 'audio') {
            return (
                <RemoteParticipantAudioComponent
                    key={trackObj.trackId}
                    audioTrack={trackObj.track}
                />
            );
        } else {
            return null;
        }
    });
};
```

Add it next to the local video element in the JSX:

```jsx
<div style={{display:"flex"}}>
    <video muted={true} autoPlay={true} style={{width:"360", height:"202px"}} ref={localVideoElement.current} id={localParticipantVideoElementId.current}></video>
    {renderRemoteParticipantTracks()}
</div>
```

### Step 12: Time For Some Conferencing Action

You've completed the base structure needed for simple conferencing — each participant should now be able to see and hear each other.

Open `localhost` in three separate tabs, type the same room id and a distinct stream id in each, and click Join Room in all three:

![](@site/static/img/conference/video-conference/video-conference-7.png)

You should see each participant's video and hear their audio — though the label under each video still shows a track id rather than a stream id. Step 13 fixes that.

### Step 13: Match Participant Stream ID with Their Video Track

The `newTrackAvailable` object from Step 10 doesn't carry a participant's stream id — Ant Media Server sends that separately, over the data channel, as a `VIDEO_TRACK_ASSIGNMENT_LIST` message. This separation is a consequence of how multi-track WebRTC streaming works.

Listen for data channel messages via the `data_received` callback event, and add a handler:

```js
const handleNotificationEvent = (data) => {
    var notificationEvent = JSON.parse(data.data);

    if (notificationEvent != null && typeof notificationEvent === "object") {
        var eventStreamId = notificationEvent.streamId;
        var eventType = notificationEvent.eventType;

        switch (eventType) {
            case "CAM_TURNED_OFF":
            case "CAM_TURNED_ON":
            case "MIC_MUTED":
            case "MIC_UNMUTED":
            case "TRACK_LIST_UPDATED":
                webrtcAdaptor.current.getBroadcastObject(roomId);
                break;

            case "CHAT_MESSAGE":
                // handle chat message
                break;

            case "UPDATE_SOUND_LEVEL":
                // handle sound level update
                break;

            case "VIDEO_TRACK_ASSIGNMENT_LIST":
                videoTrackAssignmentList.current = notificationEvent.payload;
                break;

            default:
                console.log("Unhandled event type: ", eventType);
        }
    }
};
```

Wire it into the callback:

```js
} else if (info === "data_received") {
    handleNotificationEvent(obj)
}
```

There are several useful event types here, like `CAM_TURNED_ON`, `MIC_MUTED`, and `CHAT_MESSAGE` — but `VIDEO_TRACK_ASSIGNMENT_LIST` is the one that matters for matching. Its payload looks like this:

```js
{
  "streamId": "testroom",
  "payload": [
    { "videoLabel": "videoTrack0", "trackId": "lastpeony1" }
  ],
  "eventType": "VIDEO_TRACK_ASSIGNMENT_LIST"
}
```

`videoLabel` is the track id you already have; `trackId` here is actually the participant's stream id (naming is a little confusing — that's the API's field name, not a typo).

:::info
This is stored in a ref rather than applied immediately, because there's no guarantee the `VIDEO_TRACK_ASSIGNMENT_LIST` message arrives before the corresponding `newTrackAvailable` event — due to how multi-track WebRTC works, it can arrive after.
:::

Add the ref, plus a ref copy of `remoteParticipantTracks` (so matching doesn't operate directly on state) and an interval ref:

```js
const videoTrackAssignmentList = useRef([])
const remoteParticipantTracksRef = useRef(remoteParticipantTracks);
const streamIdVideoTrackMatcherInterval = useRef(null)

useEffect(() => {
    remoteParticipantTracksRef.current = remoteParticipantTracks;
}, [remoteParticipantTracks]);
```

Add the matching function, run periodically:

```js
const matchStreamIdsAndVideoTracks = () => {
    const updatedTracks = [];

    remoteParticipantTracksRef.current.forEach((track) => {
        let matchingAssignmentFound = false;

        for (const assignment of videoTrackAssignmentList.current) {
            if (assignment.videoLabel === track.trackId) {
                updatedTracks.push({
                    ...track,
                    trackId: assignment.trackId, // replace the track id with the matched stream id
                });
                matchingAssignmentFound = true;
            }
        }

        if (!matchingAssignmentFound) {
            updatedTracks.push(track);
        }
    });

    setRemoteParticipantTracks(updatedTracks);
};
```

Start the interval inside the same `useEffect` where the adaptor is created, so it only runs once on mount:

```js
streamIdVideoTrackMatcherInterval.current = setInterval(() => matchStreamIdsAndVideoTracks(), 50);
```

Test again with three tabs — this time, each participant's video should be labeled with their actual stream id instead of a track id:

![](@site/static/img/conference/video-conference/video-conference-8.png)

### Step 14: Leave Conference Room

Add a function to let participants leave the room:

```js
const leaveRoom = () => {
    allParticipants.current = {};
    webrtcAdaptor.current.stop(localParticipantStreamId);
    webrtcAdaptor.current.stop(roomId);
    setRemoteParticipantTracks([])
}
```

This resets `allParticipants`, calls `.stop()` twice — once with `localParticipantStreamId` to stop publishing, once with `roomId` to stop playing — and clears `remoteParticipantTracks` so remote videos disappear from screen.

Add a Leave Room button next to Join Room:

```jsx
<div style={{display:"flex"}}>
    <button onClick={joinRoom}>Join Room</button>
    <button onClick={leaveRoom}>Leave Room</button>
</div>
```

### Step 15: The Final Test

Open three separate tabs, join the same room with distinct stream ids, and confirm everything still works end to end — participants can see and hear each other, streamIds are labeled correctly, and Leave Room cleanly removes a participant:

![](@site/static/img/conference/video-conference/video-conference-9.png)

That's it — you've built a working video conferencing application in React across 15 steps. The [complete source for this tutorial](https://github.com/lastpeony/antmedia-react-conference-sample) is available on GitHub if you want to compare against the finished file.

### What's Next?

These 15 steps give you a strong foundation for building a production-ready video conferencing app on top of Ant Media Server. The underlying conferencing concepts — main track rooms, sub track participants, broadcast objects — are consistent across every AMS SDK, so they carry over even if you're building with a different one.

For further development and examples, take a look at [Circle](https://github.com/ant-media/conference-call-application).

You now understand how Ant Media Server treats the conference room as a main track broadcast, with participants represented as sub-track broadcasts, how to check `subTrackStreamIds` and `mainTrackId` via the REST API, and how the sample conference app ties it all together.

## Need Help?

If participants can't see or hear each other, confirm the room id matches across all clients and that each participant is publishing with a distinct stream id, then reach out on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or contact [Technical Support](mailto:support@antmedia.io).
