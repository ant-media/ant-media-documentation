---
title: React Conference Tutorial - Part 2
description: Complete the React video conference application - handle remote participant tracks, render videos, match stream IDs, and leave the room.
keywords: [React conference, video track, Ant Media JavaScript SDK, WebRTC conference tutorial, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 4
---

# Develop a Video Conference Application in React (Part 2)

This is the second part of the React conference tutorial. If you have not completed [Part 1](/guides/conference/react-conference-tutorial-part-1/), start there: it covers project setup, joining a room, and processing main/sub track broadcast objects.

### Step 10: Handle Remote Participants Video and Audio Tracks

When you join a room with participants, Ant Media Server will emit a ```newTrackAvailable``` event for each participant in the room. This event will also be triggered when a new participant joins the room. We will capture this event in the WebRTC adaptor and add the users video and audio tracks to a state array to be rendered on screen.

Edit ```newTrackAvailable``` as below:

```js
else if (info == "newTrackAvailable") {
onNewTrack(obj)
}
```

This function will be called with 2 types of objects:

1- Video track object

2- Audio track object

**Example video track object:**

```js
{
  "stream": {
    "active": true,
    "id": "ARDAMS",
    "onactive": null,
    "onaddtrack": null,
    "oninactive": null,
    "onremovetrack": "event => {…}"
  },
  "track": {
    "MediaStreamTrack": {
      "contentHint": "",
      "enabled": true,
      "id": "ARDAMSvvideoTrack0",
      "kind": "video",
      "label": "ARDAMSvvideoTrack0",
      "muted": false,
      "oncapturehandlechange": null,
      "onended": null,
      "onmute": null,
      "onunmute": null,
      "readyState": "live",
      "stats": null
    }
  },
  "streamId": "myroom",
  "trackId": "ARDAMSvvideoTrack0"
}
```

**Example audio track object:**

```
{
  "stream": {
    "active": true,
    "id": "ARDAMS",
    "onactive": null,
    "onaddtrack": null,
    "oninactive": null,
    "onremovetrack": "event => {…}"
  },
  "track": {
    "contentHint": "",
    "enabled": true,
    "id": "ARDAMSaaudioTrack0",
    "kind": "audio",
    "label": "ARDAMSaaudioTrack0",
    "muted": false,
    "oncapturehandlechange": null,
    "onended": null,
    "onmute": null,
    "onunmute": null,
    "readyState": "live",
    "stats": null
  },
  "streamId": "myroom",
  "trackId": "ARDAMSaaudioTrack0"
}
```

:::info
Those track objects ```streamId``` field  will be always equal to our ```roomId```, even though they are video or audio tracks of remote participants. So do not confuse it. We will explain how to assign participant streamIds to video tracks in next steps.
:::

At this state we need to store those tracks in a state variable to render them on screen. Before we render them first go ahead and create a new state variable to store remote participant tracks.

```js
const [remoteParticipantTracks, setRemoteParticipantTracks] = useState([]) 
```

Then create ```onNewTrack``` function to do the following:

1- Check if this participant track already exists.

2- If it does not exist add it to ```remoteParticipantTracks``` to be rendered on screen.

3- Listen for track end event. If its ended remove it from ```remoteParticipantTracks```, thus from screen.

```js
const onNewTrack = (obj) => {

    //In multitrack conferencing the stream is same, tracks are being and remove from the stream
    console.log("new track available with id: "
            + obj.trackId + " and kind: " + obj.track.kind + " on the room:" + roomId);

    console.log(obj)

    var remoteParticipantTrack = {
        trackId: incomingTrackId,
        track: obj.track,
        kind : obj.track.kind             
    }
    
        // Check if the track already exists
    const trackExists = remoteParticipantTracks.some(
    (participantTrack) => participantTrack.trackId === remoteParticipantTrack.trackId
        );

    if (!trackExists) {
    // Add the new track to the state
    setRemoteParticipantTracks((prevTracks) => [...prevTracks, remoteParticipantTrack]);
    }

    obj.stream.onremovetrack = (event) => {
        console.log("track is removed with id: " + event.track.id)
        console.log(event);
        var removedTrackId = event.track.id.substring("ARDAMSx".length);
        setRemoteParticipantTracks((prevTracks) => 
            prevTracks.filter((participantTrack) => participantTrack.trackId !== removedTrackId)
            );
    }

} 
```

### Step 11: Render Remote Participants On Screen

Now we store both audio and video tracks in a state variable. 
But still we didn't render them on screen.

To render those tracks on screen we will create 2 new components. 

1-```RemoteParticipantVideoComponent```

2-```RemoteParticipantAudioComponent```

Create a new file inside ```components``` directory with name ```RemoteParticipantVideoComponent.js```.

This will act like a participant card. It will have a ```video``` element to play video track and a ```span``` element to display participants stream id.

```js
import { useEffect, useState, useRef } from 'react';

export default function RemoteParticipantVideoComponent({videoTrack, streamIdProp}){
    const videoRef = useRef(null);
    const [videoStream, setVideoStream] = useState(null);
    const [streamId, setStreamId] = useState("")

    useEffect(() => {

        if(videoTrack){

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

As you see it has 2 ```useEffect``` hooks.

First ```useEffect``` will be triggered when video track is assigned and updated.  

In that ```useEffect``` we create a new ```MediaStream``` and add video track to it.  Then we assign media stream to video element using videoRef so that it can play it.

Second ```useEffect``` hook will be used to update ```streamId``` of the participant. We will come to that in next steps.

Similar to ```RemoteParticipantVideoComponent``` we need to create another component to render audio track on screen so that we can play remote participants audio. This will also contain a video element but since its audio we will hide it with CSS.

Create a new file inside ```components``` directory with name ```RemoteParticipantAudioComponent.js```.

``` js
import { useEffect, useState, useRef } from 'react';

export default function RemoteParticipantAudioComponent({audioTrack}){
    const videoRef = useRef(null);
    const [videoStream, setVideoStream] = useState(null);

    useEffect(() => {
        if(audioTrack){
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

Just like ```RemoteParticipantVideoComponent```, ```RemoteParticipantAudioComponent``` contains a ```useEffect``` hook to assign audio track to video element with creating a ```MediaStream```. 

Notice that in return of this component we hide video element with ```display:"none"``` because it will be used to play audio.

Now go back to ```ConferenceComponent```, add

```js
import RemoteParticipantAudioComponent from './RemoteParticipantAudioComponent';
import RemoteParticipantVideoComponent from './RemoteParticipantVideoComponent';
```

lines to import remote participant components. To render those on screen we will add a new function called ```renderRemoteParticipantTracks()```.

```js
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

As you remember at step 8, we implemented adding tracks to ```remoteParticipantTracks``` state array. 

```renderRemoteParticipantTracks``` iterates through those tracks, checks track type and based on that it renders the remote participant component. 

Since it is iterating a state variable it will be updated every time 
```setRemoteParticipantTracks((prevTracks) => [...prevTracks, remoteParticipantTrack])``` is called from 
```onNewTrack()``` function.

Go ahead and add ```renderRemoteParticipantTracks()``` function to return() of the component.

Your return should look like this:

```js
return(
    <div style={{width:"100%", height:"100%", display:"flex", flexDirection:"column"}}>
        <h1 style={{marginLeft:"auto", marginRight:"auto"}}>Ant Media React Conference Sample</h1>

        <div style={{display:"flex"}}>
        <video  muted={true} autoPlay={true} style={{width:"360", height:"202px"}} ref={localVideoElement.current} id={localParticipantVideoElementId.current}></video>
        {renderRemoteParticipantTracks()}


        </div>

        <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
            <div style={{display:"flex", flexDirection:"column"}}>
            <input 
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}    
        ></input>
            <input 
            type="text"
            placeholder="Enter Your Stream ID"
            value={localParticipantStreamId}
            onChange={(e) => setLocalParticipantStreamId(e.target.value)}    
        ></input>

            </div>
        

        <button onClick={joinRoom}>Join Room</button>

        </div>    

    </div>
)
```

Full ```ConferenceComponent```:

```js
import { useEffect, useState, useRef } from 'react';
import { WebRTCAdaptor } from '@antmedia/webrtc_adaptor'

import RemoteParticipantAudioComponent from './RemoteParticipantAudioComponent';
import RemoteParticipantVideoComponent from './RemoteParticipantVideoComponent';


export default function ConferenceComponent(){
    
    const [localParticipantStreamId, setLocalParticipantStreamId] = useState('')
    const [roomId, setRoomId] = useState('')
    const localVideoElement = useRef(null)
    const mediaConstraints = useRef( {
        video: { width: { min: 176, max: 360 } }, 
        audio: true, 
      }
    )
    const websocketUrl = useRef('wss://test.antmedia.io:5443/live/websocket')
    const localParticipantVideoElementId = useRef('localParticipantVideo')
    const webrtcAdaptor = useRef(null)
    const allParticipants = useRef({})
    const [remoteParticipantTracks, setRemoteParticipantTracks] = useState([]) 

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
                console.log("Webrc adaptor initialized.");
              } else if (info === "broadcastObject") {
                if (obj.broadcast === undefined) {
                  return;
                }
            let broadcastObject = JSON.parse(obj.broadcast);
            if (obj.streamId === roomId) {
                handleMainTrackBroadcastObject(broadcastObject)
            } else {
                handleSubTrackBroadcastObject(broadcastObject)
            }
            console.log(obj.broadcast);
            } else if (info === "newTrackAvailable") {
                console.log("new track available!")
                onNewTrack(obj)
            } else if (info === "publish_started") {
                console.log("publish started to room " + roomId);
            } else if (info === "publish_finished") {
            console.log("publish finished");
            } else if (info === "play_started") {
            console.log("PLAY STARTED")
            webrtcAdaptor.current.getBroadcastObject(roomId);
            } else if (info === "play_finished") {
            //this event is fired when room is finished to play
            console.log("play_finished for stream:" + obj.streamId);
            
            } else if (info === "data_received") {
                handleNotificationEvent(obj)
            }
            },
          });

    },[])

    const getUserStatusMetaData = ()=>{
        let metadata = {
            isMicMuted: false,
            isCameraOff: false,
        }
        return metadata;
    }

  
    const handleNotificationEvent = (data) => {
		var notificationEvent = JSON.parse(data.data);
        console.log(notificationEvent)
		if (notificationEvent != null && typeof (notificationEvent) == "object") {
			var eventStreamId = notificationEvent.streamId;
			var eventType = notificationEvent.eventType;

			if (eventType != "UPDATE_SOUND_LEVEL") {
				console.log("Received data : ", data.data);
			}

			if (eventType === "CAM_TURNED_OFF") {
				console.log("Camera turned off for : ", eventStreamId);
				webrtcAdaptor.current.getBroadcastObject(roomId);
			} else if (eventType === "CAM_TURNED_ON") {
				console.log("Camera turned on for : ", eventStreamId);
				webrtcAdaptor.current.webrtcAdaptor.getBroadcastObject(roomId);
			} else if (eventType === "MIC_MUTED") {
				console.log("Microphone muted for : ", eventStreamId);
				webrtcAdaptor.current.webrtcAdaptor.getBroadcastObject(roomId);
			} else if (eventType === "MIC_UNMUTED") {
				console.log("Microphone unmuted for : ", eventStreamId);
				webrtcAdaptor.current.webrtcAdaptor.getBroadcastObject(roomId);
			} else if (eventType === "CHAT_MESSAGE") {

            } else if (eventType === "TRACK_LIST_UPDATED") {

				webrtcAdaptor.current.getBroadcastObject(roomId);
			} else if (eventType === "UPDATE_SOUND_LEVEL") {

            } else if(eventType === "VIDEO_TRACK_ASSIGNMENT_LIST"){
                var videoTrackAssignmentList = notificationEvent.payload
               
                const updatedTracks = remoteParticipantTracks.map((track) => {
                const matchingAssignment = videoTrackAssignmentList.find(
                    (assignment) => assignment.videoLabel === track.trackId
                );

                // If a match is found, set the streamId to trackId from the payload
                if (matchingAssignment) {
                    console.log("MATCHING ASSIGNMENT FOUND!")
                    track.streamId = matchingAssignment.trackId;
                }

                return track;
                });
                //setRemoteParticipantTracks(updatedTracks)
            }
		} else {
			console.log("Received data : ", data.data);
		}
	}


    const onNewTrack = (obj) => {

		//In multitrack conferencing the stream is same, tracks are being and remove from the stream
		console.log("new track available with id: "
				+ obj.trackId + " and kind: " + obj.track.kind + " on the room:" + roomId);

        console.log(obj)

		//trackId is ARDAMSv+STREAM_ID or  ARDAMSa+STREAM_ID
		var incomingTrackId = obj.trackId.substring("ARDAMSx".length);

		if (incomingTrackId === roomId || incomingTrackId === localParticipantStreamId) {
			return;
		}

        var remoteParticipantTrack = {
            trackId: incomingTrackId,
            track: obj.track,
            kind : obj.track.kind             
        }
        
         // Check if the track already exists
        const trackExists = remoteParticipantTracks.some(
        (participantTrack) => participantTrack.trackId === remoteParticipantTrack.trackId
         );
  
        if (!trackExists) {
        // Add the new track to the state
        setRemoteParticipantTracks((prevTracks) => [...prevTracks, remoteParticipantTrack]);
        }

		obj.stream.onremovetrack = (event) => {
			console.log("track is removed with id: " + event.track.id)
			console.log(event);
			var removedTrackId = event.track.id.substring("ARDAMSx".length);
            setRemoteParticipantTracks((prevTracks) => 
                prevTracks.filter((participantTrack) => participantTrack.trackId !== removedTrackId)
              );
		}

	} 

    
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

    const joinRoom = () => {
        var userStatusMetaData = getUserStatusMetaData()
        webrtcAdaptor.current.publish(localParticipantStreamId, null, null, null, localParticipantStreamId, roomId, JSON.stringify(userStatusMetaData));
        webrtcAdaptor.current.play(roomId)
    }

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
    const handleMainTrackBroadcastObject = (broadcastObject) => {
        let participantIds = broadcastObject.subTrackStreamIds;
    
        //find and remove not available tracks
        let currentTracks = Object.keys(allParticipants.current);
        currentTracks.forEach(trackId => {
            if (!allParticipants.current[trackId].isFake && !participantIds.includes(trackId)) {
                console.log("stream removed:" + trackId);
    
                delete allParticipants.current[trackId];
            }
        });
    
        //request broadcast object for new tracks
        participantIds.forEach(pid => {
            if (allParticipants[pid] === undefined) {
                webrtcAdaptor.current.getBroadcastObject(pid);
            }
        });
    }

    return(
        <div style={{width:"100%", height:"100%", display:"flex", flexDirection:"column"}}>
            <h1 style={{marginLeft:"auto", marginRight:"auto"}}>Ant Media React Conference Sample</h1>

            <div style={{display:"flex"}}>
            <video  muted={true} autoPlay={true} style={{width:"360", height:"202px"}} ref={localVideoElement.current} id={localParticipantVideoElementId.current}></video>
            {renderRemoteParticipantTracks()}


            </div>

            <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                <div style={{display:"flex", flexDirection:"column"}}>
                <input 
               type="text"
               placeholder="Enter Room ID"
               value={roomId}
               onChange={(e) => setRoomId(e.target.value)}    
            ></input>
              <input 
               type="text"
               placeholder="Enter Your Stream ID"
               value={localParticipantStreamId}
               onChange={(e) => setLocalParticipantStreamId(e.target.value)}    
            ></input>

                </div>
          

            <button onClick={joinRoom}>Join Room</button>

            </div>    

        </div>
    )

}
```

### Step 12: Time For Some Conferencing Action

We completed base structure required for simple conferencing. So if you managed to follow until this step, kudos to you!

At this state we should be able to receive remote participants and play them. Each participant should be able to see and hear each other.

Open ```localhost``` page in 3 separate tabs on your browser for testing. Type the same room id in each tab and a distinct stream id.

Click on join room button in each tab and each participant should be able to see and hear each other!

![](@site/static/img/conference/video-conference/video-conference-7.png)

Wait, but where is participants stream id? We only display track id of the participants below their video.

At step 13 we will learn how to match streamId of participants with their video element.

### Step 13: Match Participant Stream ID with Their Video Track

At step 10, we received video and audio tracks of participants with ```onNewVideoTrack``` message coming from Ant Media Server. But this incoming object did not contain stream id of the related video track.

:::info
Ant Media Server sends stream id of participant in a separate message called ```VIDEO_TRACK_ASSIGNMENT_LIST``` via data channel. This message contains which video track belongs to which stream id. This separation is caused by the nature of multi track webrtc streaming.
:::

Whenever a data channel message received, webrtc adaptor notifies us with ```data_received``` message.

Listen for this event in webrtc adaptor callbacks:

```js
else if (info === "data_received") {
    handleNotificationEvent(obj)
}
```

Add ```handleNotificationEvent()``` function to handle the message:

```js
const handleNotificationEvent = (data) => {
    var notificationEvent = JSON.parse(data.data);
    console.log(notificationEvent);

    if (notificationEvent != null && typeof notificationEvent === "object") {
        var eventStreamId = notificationEvent.streamId;
        var eventType = notificationEvent.eventType;

        if (eventType !== "UPDATE_SOUND_LEVEL") {
            console.log("Received data: ", data.data);
        }

        switch (eventType) {
            case "CAM_TURNED_OFF":
                console.log("Camera turned off for: ", eventStreamId);
                webrtcAdaptor.current.getBroadcastObject(roomId);
                break;

            case "CAM_TURNED_ON":
                console.log("Camera turned on for: ", eventStreamId);
                webrtcAdaptor.current.getBroadcastObject(roomId);
                break;

            case "MIC_MUTED":
                console.log("Microphone muted for: ", eventStreamId);
                webrtcAdaptor.current.getBroadcastObject(roomId);
                break;

            case "MIC_UNMUTED":
                console.log("Microphone unmuted for: ", eventStreamId);
                webrtcAdaptor.current.getBroadcastObject(roomId);
                break;

            case "CHAT_MESSAGE":
                // Handle chat message
                break;

            case "TRACK_LIST_UPDATED":
                webrtcAdaptor.current.getBroadcastObject(roomId);
                break;

            case "UPDATE_SOUND_LEVEL":
                // Handle sound level update
                break;

            case "VIDEO_TRACK_ASSIGNMENT_LIST":
                console.log("VIDEO TRACK ASSIGNMENT LIST CAME!");
                videoTrackAssignmentList.current = notificationEvent.payload;
                break;

            default:
                console.log("Unhandled event type: ", eventType);
        }
    } else {
        console.log("Received data: ", data.data);
    }
};
```

There are many useful messages such as  ```CAM_TURNED_ON ```, ```MIC_MUTED``` and ```CHAT_MESSAGE```.  

At this stage ```VIDEO_TRACK_ASSIGNMENT_LIST``` message is crucial for us because it will allow us to match video track and stream id.

Example notification event object received for ```VIDEO_TRACK_ASSIGNMENT_LIST``` will look like below:

``` js
{
  "streamId": "testroom",
  "payload": [
    {
      "videoLabel": "videoTrack0",
      "trackId": "lastpeony1"
    }
  ],
  "eventType": "VIDEO_TRACK_ASSIGNMENT_LIST"
}
``` 

As you see its payload contains ```videoLabel```  field and ```trackId```  field.

```videoLabel``` is our track id and ```trackId``` is actually our participants stream id.

We will store this object inside a reference array called ```videoTrackAssignmentList``` to process it ****periodicly****.

Add ```const videoTrackAssignmentList = useRef([])``` to beginning of your ```ConferenceComponent```.

:::info
The reason we are storing this data instead of assigning it immediately upon receiving the ```VIDEO_TRACK_ASSIGNMENT_LIST``` message is that there is no guarantee it will arrive after the ```onNewVideoTrack``` event. Due to the nature of multi-track WebRTC, the ```VIDEO_TRACK_ASSIGNMENT_LIST``` message can be received after the ```onNewVideoTrack``` event.
:::

Now lets go ahead and do the matching.

Create a new ref using ```useRef``` to store our periodic intervals id.

```js
const streamIdVideoTrackMatcherInterval = useRef(null)
```

Create the interval in same ```useEffect``` where we initialized the webrtc adaptor so that it will be called only once on component mount.

```js
streamIdVideoTrackMatcherInterval.current = setInterval(() => matchStreamIdsAndVideoTracks(), 50);
```

Alternatively, you can create this interval inside ```play_started``` event.

We will add another reference variable, a copy of ```remoteParticipantTracks``` state variable to avoid direct processing on it.

Go to the beginning of your component and create it as:

```js
const remoteParticipantTracksRef = useRef(remoteParticipantTracks);
```

Now we will add another ```useEffect``` hook to update this ref when ```remoteParticipantTracks``` state is updated.

```js
useEffect(() => {
    remoteParticipantTracksRef.current = remoteParticipantTracks;

    }, [remoteParticipantTracks]);
```

Finally, lets create ```matchStreamIdsAndVideoTracks()``` function to do the actual matching periodicly.

```js
const matchStreamIdsAndVideoTracks = () => {
    // Create a new array to store the updated tracks
    const updatedTracks = [];
    
    // Loop through each track
    remoteParticipantTracksRef.current.forEach((track) => {
        let matchingAssignmentFound = false;
        console.log(track)
        // Loop through each assignment to find a match manually
        for (const assignment of videoTrackAssignmentList.current) {
        if (assignment.videoLabel === track.trackId) {
            // Push a modified version of the track with the updated streamId
            updatedTracks.push({
            ...track, // Spread the existing track properties
            trackId: assignment.trackId // Update the streamId
            });
            matchingAssignmentFound = true;
        }
        }
    
        // If no matching assignment is found, keep the track unchanged
        if (!matchingAssignmentFound) {
        updatedTracks.push(track);
        }
    });
    
    setRemoteParticipantTracks(updatedTracks);
    };
```

We iterate ```remoteParticipantTracksRef``` and ```videoTrackAssignmentList```, match the trackId and update the trackId with the streamId.

Finally we set the remoteParticipantTracks state with ```setRemoteParticipantTracks(updatedTracks)``` to render it on screen.

Now its time for some testing action again! Open ```localhost``` in 3 separate tabs. Join the same room with distinct stream id from all tabs.

You should observe streamIds are matched correctly with video tracks and rendered below video of each participant.


![](@site/static/img/conference/video-conference/video-conference-8.png)

Your full component at the end of this step should look like below:

```js
import { useEffect, useState, useRef } from 'react';
import { WebRTCAdaptor } from '@antmedia/webrtc_adaptor'

import RemoteParticipantAudioComponent from './RemoteParticipantAudioComponent';
import RemoteParticipantVideoComponent from './RemoteParticipantVideoComponent';


export default function ConferenceComponent(){
    
    const [localParticipantStreamId, setLocalParticipantStreamId] = useState('')
    const [roomId, setRoomId] = useState('')
    const localVideoElement = useRef(null)
    const mediaConstraints = useRef( {
        video: { width: { min: 176, max: 360 } }, 
        audio: true, 
      }
    )
    const websocketUrl = useRef('wss://test.antmedia.io:5443/live/websocket')
    const localParticipantVideoElementId = useRef('localParticipantVideo')
    const webrtcAdaptor = useRef(null)
    const allParticipants = useRef({})
    const [remoteParticipantTracks, setRemoteParticipantTracks] = useState([]) 
    const videoTrackAssignmentList = useRef([])
    const remoteParticipantTracksRef = useRef(remoteParticipantTracks);
    const streamIdVideoTrackMatcherInterval = useRef(null)

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
                console.log("Webrc adaptor initialized.");
              } else if (info === "broadcastObject") {
                if (obj.broadcast === undefined) {
                  return;
                }
            let broadcastObject = JSON.parse(obj.broadcast);
            if (obj.streamId === roomId) {
                handleMainTrackBroadcastObject(broadcastObject)
            } else {
                handleSubTrackBroadcastObject(broadcastObject)
            }
            console.log(obj.broadcast);
            } else if (info === "newTrackAvailable") {
                console.log("new track available!")
                onNewTrack(obj)
            } else if (info === "publish_started") {
                console.log("publish started to room " + roomId);
            } else if (info === "publish_finished") {
            console.log("publish finished");
            } else if (info === "play_started") {
            console.log("PLAY STARTED")
            webrtcAdaptor.current.getBroadcastObject(roomId);
            } else if (info === "play_finished") {
            //this event is fired when room is finished to play
            console.log("play_finished for stream:" + obj.streamId);
            
            } else if (info === "data_received") {
                handleNotificationEvent(obj)
            }
            },
          });

        streamIdVideoTrackMatcherInterval.current = setInterval(() => matchStreamIdsAndVideoTracks(), 50);

    },[])


    useEffect(() => {
        remoteParticipantTracksRef.current = remoteParticipantTracks;

      }, [remoteParticipantTracks]);


    const matchStreamIdsAndVideoTracks = () => {
        // Create a new array to store the updated tracks
        const updatedTracks = [];
      
        // Loop through each track
        remoteParticipantTracksRef.current.forEach((track) => {
          let matchingAssignmentFound = false;
            console.log(track)
          // Loop through each assignment to find a match manually
          for (const assignment of videoTrackAssignmentList.current) {
            if (assignment.videoLabel === track.trackId) {
              // Push a modified version of the track with the updated streamId
              updatedTracks.push({
                ...track, // Spread the existing track properties
                trackId: assignment.trackId // Update the streamId
              });
              matchingAssignmentFound = true;
            }
          }
      
          // If no matching assignment is found, keep the track unchanged
          if (!matchingAssignmentFound) {
            updatedTracks.push(track);
          }
        });
      
        setRemoteParticipantTracks(updatedTracks);
      };

    const getUserStatusMetaData = ()=>{
        let metadata = {
            isMicMuted: false,
            isCameraOff: false,
        }
        return metadata;
    }

  
    const handleNotificationEvent = (data) => {
		var notificationEvent = JSON.parse(data.data);
        console.log(notificationEvent)
		if (notificationEvent != null && typeof (notificationEvent) == "object") {
			var eventStreamId = notificationEvent.streamId;
			var eventType = notificationEvent.eventType;

			if (eventType != "UPDATE_SOUND_LEVEL") {
				console.log("Received data : ", data.data);
			}

			if (eventType === "CAM_TURNED_OFF") {
				console.log("Camera turned off for : ", eventStreamId);
				webrtcAdaptor.current.getBroadcastObject(roomId);
			} else if (eventType === "CAM_TURNED_ON") {
				console.log("Camera turned on for : ", eventStreamId);
				webrtcAdaptor.current.webrtcAdaptor.getBroadcastObject(roomId);
			} else if (eventType === "MIC_MUTED") {
				console.log("Microphone muted for : ", eventStreamId);
				webrtcAdaptor.current.webrtcAdaptor.getBroadcastObject(roomId);
			} else if (eventType === "MIC_UNMUTED") {
				console.log("Microphone unmuted for : ", eventStreamId);
				webrtcAdaptor.current.webrtcAdaptor.getBroadcastObject(roomId);
			} else if (eventType === "CHAT_MESSAGE") {

            } else if (eventType === "TRACK_LIST_UPDATED") {

				webrtcAdaptor.current.getBroadcastObject(roomId);
			} else if (eventType === "UPDATE_SOUND_LEVEL") {

            } else if(eventType === "VIDEO_TRACK_ASSIGNMENT_LIST"){
                console.log("VIDEO TRACK ASSIGNMENT LIST CAME!")

                videoTrackAssignmentList.current = notificationEvent.payload
          
            }
		} else {
			console.log("Received data : ", data.data);
		}
	}


    const onNewTrack = (obj) => {

		//In multitrack conferencing the stream is same, tracks are being and remove from the stream
		console.log("new track available with id: "
				+ obj.trackId + " and kind: " + obj.track.kind + " on the room:" + roomId);

        console.log(obj)

		//trackId is ARDAMSv+STREAM_ID or  ARDAMSa+STREAM_ID
		var incomingTrackId = obj.trackId.substring("ARDAMSx".length);

		if (incomingTrackId === roomId || incomingTrackId === localParticipantStreamId) {
			return;
		}

        var remoteParticipantTrack = {
            trackId: incomingTrackId,
            track: obj.track,
            kind : obj.track.kind             
        }
        
         // Check if the track already exists
        const trackExists = remoteParticipantTracks.some(
        (participantTrack) => participantTrack.trackId === remoteParticipantTrack.trackId
         );
  
        if (!trackExists) {
        // Add the new track to the state
        setRemoteParticipantTracks((prevTracks) => [...prevTracks, remoteParticipantTrack]);
        }
        console.log(remoteParticipantTracks)

		obj.stream.onremovetrack = (event) => {
			console.log("track is removed with id: " + event.track.id)
			console.log(event);
			var removedTrackId = event.track.id.substring("ARDAMSx".length);
            setRemoteParticipantTracks((prevTracks) => 
                prevTracks.filter((participantTrack) => participantTrack.trackId !== removedTrackId)
              );
		}

	} 

    
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

    const joinRoom = () => {
        var userStatusMetaData = getUserStatusMetaData()
        webrtcAdaptor.current.publish(localParticipantStreamId, null, null, null, localParticipantStreamId, roomId, JSON.stringify(userStatusMetaData));
        webrtcAdaptor.current.play(roomId)
    }

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
    const handleMainTrackBroadcastObject = (broadcastObject) => {
        let participantIds = broadcastObject.subTrackStreamIds;
    
        //find and remove not available tracks
        let currentTracks = Object.keys(allParticipants.current);
        currentTracks.forEach(trackId => {
            if (!allParticipants.current[trackId].isFake && !participantIds.includes(trackId)) {
                console.log("stream removed:" + trackId);
    
                delete allParticipants.current[trackId];
            }
        });
    
        //request broadcast object for new tracks
        participantIds.forEach(pid => {
            if (allParticipants[pid] === undefined) {
                webrtcAdaptor.current.getBroadcastObject(pid);
            }
        });
    }

    return(
        <div style={{width:"100%", height:"100%", display:"flex", flexDirection:"column"}}>
            <h1 style={{marginLeft:"auto", marginRight:"auto"}}>Ant Media React Conference Sample</h1>

            <div style={{display:"flex"}}>
            <video  muted={true} autoPlay={true} style={{width:"360", height:"202px"}} ref={localVideoElement.current} id={localParticipantVideoElementId.current}></video>
            {renderRemoteParticipantTracks()}


            </div>

            <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                <div style={{display:"flex", flexDirection:"column"}}>
                <input 
               type="text"
               placeholder="Enter Room ID"
               value={roomId}
               onChange={(e) => setRoomId(e.target.value)}    
            ></input>
              <input 
               type="text"
               placeholder="Enter Your Stream ID"
               value={localParticipantStreamId}
               onChange={(e) => setLocalParticipantStreamId(e.target.value)}    
            ></input>

                </div>
          

            <button onClick={joinRoom}>Join Room</button>

            </div>    

        </div>
    )

}
```

### Step 14: Leave Conference Room

In this step we will implement functionality to allow participants to leave from the conference room.

To do that add a new function called ```leaveRoom()```

```js
const leaveRoom = () => {
    allParticipants.current = {};
    webrtcAdaptor.current.stop(localParticipantStreamId);
    webrtcAdaptor.current.stop(roomId);
    setRemoteParticipantTracks([])
}
```
In this function we reset the ```allParticipants``` ref. Call ```webrtcAdaptor.current.stop()``` 2 times. 

1st one is with ```localParticipantStreamId``` to stop publishing.

2nd one is with ```roomId``` to stop playing.

Finally we reset ```remoteParticipantTracks``` state array to clear remote participant videos from screen.

To call this function add a new Leave Room button.

```js
return(
    <div style={{width:"100%", height:"100%", display:"flex", flexDirection:"column"}}>
        <h1 style={{marginLeft:"auto", marginRight:"auto"}}>Ant Media React Conference Sample</h1>

        <div style={{display:"flex"}}>
        <video  muted={true} autoPlay={true} style={{width:"360", height:"202px"}} ref={localVideoElement.current} id={localParticipantVideoElementId.current}></video>
        {renderRemoteParticipantTracks()}
        </div>
        
        <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
            <div style={{display:"flex", flexDirection:"column"}}>
            <input 
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}    
        ></input>
            <input 
            type="text"
            placeholder="Enter Your Stream ID"
            value={localParticipantStreamId}
            onChange={(e) => setLocalParticipantStreamId(e.target.value)}    
        ></input>

            </div>
        
        <div style={{display:"flex"}}>
        <button onClick={joinRoom}>Join Room</button>
        <button onClick={leaveRoom}>Leave Room</button>

        </div>

        </div>    

    </div>
)
```

### Step 15: The Final Test

You’ve completed all the essential steps to embark on your journey to launch a production-ready video conferencing app powered by Ant Media Server, bringing the world closer together and making it a better place than ever!

Its time for a final test.

Go ahead and open 3 separate tabs on your browser. Join a room with distinct stream ids.

![](@site/static/img/conference/video-conference/video-conference-9.png)

You can click on Leave Room button from participants to leave the room.

That's it! What a journey it's been. Thanks to Ant Media Server, you've built a simple yet powerful video conferencing application in React in just 14 steps.

You can find source code of this tutorial on [Github](https://github.com/lastpeony/antmedia-react-conference-sample)

### What's Next?

The 15 steps should give you a strong foundation to start building a production-ready video conferencing app on top of Ant Media Server. Keep in mind that the conferencing concepts are consistent across all SDKs. Therefore, if you're developing a conferencing application with other SDKs, the principles you've learned here will still apply.


For further development and examples dont forget to take a look at [Circle](https://github.com/ant-media/conference-call-application)

<br /><br />
---

<div align="center">
<h2> Mastering Conference 🥇 </h2>
</div>

You now understand how Ant Media Server treats the **conference room as a main track broadcast**, with **participants** represented as **sub-track broadcasts**. You know how to check the **subTrackStreamIds** and **mainTrackIDs** via the REST API, and how sample conference app ties it all together.  

Congrats — with this foundation, your conferencing app can now manage **participants and rooms clearly and reliably!** 🎯
