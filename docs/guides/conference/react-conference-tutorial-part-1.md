---
title: React Conference Tutorial - Part 1
description: Build a video conference application with React and the Ant Media JavaScript SDK - project setup, joining a room, and processing broadcast objects.
keywords: [React conference, Ant Media JavaScript SDK, WebRTC conference tutorial, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---

# Develop a Video Conference Application in React (Part 1)

In this section, we will develop a simple video conference application on top of Ant Media Server using javascript SDK with React Framework.

With the help of this demo project, we will learn more deeply about the Ant Media Server conference structure.

Before you start reading this section, take a quick look at to [Javascript SDK Documentation](https://antmedia.io/docs/guides/developer-sdk-and-api/sdk-integration/javascript-sdk/).

For a more comprehensive conference sample in pure javascript, you can reference to this [Javascript Conference Sample](https://github.com/ant-media/StreamApp/blob/8544ecd2111952008f187f1e0d35fda4cccb030a/src/main/webapp/conference.html) that we tested in above section.

To see a production-ready open-source video conferencing application built on Ant Media Server using React, visit [Circle](https://meet.antmedia.io/Conference/).

Circle is fully open source on [Github](https://github.com/ant-media/conference-call-application).

Now, let's proceed for the React based Conference application.

### Step 1: Create a new React Project

Go to a directory and run below command to create a React project.

```bash
npx create-react-app antmedia-react-conference-sample
```

### Step 2: Install Ant Media Javascript SDK

Run below command to install Ant Media javascript SDK with npm.

```bash
npm i @antmedia/webrtc_adaptor
```

### Step 3: Disable Strict Mode

Before we jump into writing code, disable strict mode.

Go to `index.js` file and remove `<StrictMode>` tags around `<App/>`

### Step 4: Create a Conference Component

In your **src** directory create a new folder with name `components`. Inside this directory create a new file called `ConferenceComponent.js`.

This is where we will write our implementation code.

**Import WebRTCAdaptor with:**

```js
import { WebRTCAdaptor } from '@antmedia/webrtc_adaptor'
```

Add some JSX inside return and import few useful react hooks which we will use while doing the implementation.

Your component at this state should look like this:

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

Go to `App.js` in src directory, import `ConferenceComponent` and add it inside return.

Your App component should look like this:

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

Now we are done with project setup and ready to start writing code for conference.


### Step 5: Create a WebRTC Adaptor Object

Whether you are going to do webrtc publishing, playing or conferencing the first step in all SDKs is to create a webrtc adaptor object.

This will initialize users camera, microphone and establish a websocket connection to your Ant Media Server.

There are some useful variables we need to initialize such as ```mediaConstraints```, ```websocketUrl```, ```localVideoElement``` and ```localParticipantVideoElementId``` before we create webrtc adaptor object.

So lets initialize them with ```useRef``` hook.

We will also initialize a new state variable called  ```roomId```. This will be a state because it will change based on user input.

```js
const [localParticipantStreamId, setLocalParticipantStreamId] = useState('')
const [roomId, setRoomId] = useState('') // this is a state because it will change through user input.
const localVideoElement = useRef(null)
const mediaConstraints = useRef( {
    video: { width: { min: 176, max: 360 } }, // set width and height of video publish of participant.
    audio: true, // audio to true.
    }
)
const websocketUrl = useRef('wss://test.antmedia.io:5443/live/websocket')
const localParticipantVideoElementId = useRef('localParticipantVideo')
const webrtcAdaptor = useRef(null)
```

Now we will create webrtc adaptor object inside useEffect hook with empty array so that it runs on component mount once.

```js
useEffect(() => {

    webrtcAdaptor.current = new WebRTCAdaptor({
        websocket_url: websocketUrl.current,
        mediaConstraints: mediaConstraints.current,
        localVideoId: localParticipantVideoElementId.current,
        localVideoElement: localVideoElement.current
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
            } else {
                
            }
            console.log(obj.broadcast);
            } else if (info == "newTrackAvailable") {

        } else if (info == "publish_started") {
            console.log("publish started to room " + roomId);
            } else if (info == "publish_finished") {
            console.log("publish finished");
            } else if (info == "play_started") {
            console.log("play started")
            } else if (info == "play_finished") {
            //this event is fired when room is finished to play
            console.log("play_finished for stream:" + obj.streamId);
            } else if (info == "data_received") {

        }
        },
        });

},[])
```
Notice that inside callback we receive some events. We will use those events while implementing our conference logic.

Now lets add a video element to our JSX to render local users video on page.

```js
<video  muted={true} autoPlay={true} style={{width:"360", height:"202px"}} ref={localVideoElement.current} id={localParticipantVideoElementId.current}></video>
```

At this state your ConferenceComponent should look like this:

```js
import { useEffect, useState, useRef } from 'react';
import { WebRTCAdaptor } from '@antmedia/webrtc_adaptor'

export default function ConferenceComponent(){

    const [localParticipantStreamId, setLocalParticipantStreamId] = useState('')
    const [roomId, setRoomId] = useState('') // this is a state because it will change through user input.
    const localVideoElement = useRef(null)
    const mediaConstraints = useRef( {
        video: { width: { min: 176, max: 360 } }, // set width and height of video publish of participant.
        audio: true, // audio to true.
      }
    )
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
                console.log("Webrc adaptor initialized.");
              } else if (info === "broadcastObject") {
                if (obj.broadcast === undefined) {
                  return;
                }
                let broadcastObject = JSON.parse(obj.broadcast);
                if (obj.streamId === roomId) {
                } else {
                }
                console.log(obj.broadcast);
              } else if (info == "newTrackAvailable") {

            } else if (info == "publish_started") {
                console.log("publish started to room " + roomId);
              } else if (info == "publish_finished") {
                console.log("publish finished");
              } else if (info == "play_started") {
        

              } else if (info == "play_finished") {
                //this event is fired when room is finished to play
                console.log("play_finished for stream:" + obj.streamId);
             
              } else if (info == "data_received") {

            }
            },
          });

    },[])


    return(
        <div style={{width:"100%", height:"100%", display:"flex", flexDirection:"column"}}>
            <h1 style={{marginLeft:"auto", marginRight:"auto"}}>Ant Media React Conference Sample</h1>
            <video  muted={true} autoPlay={true} style={{width:"360", height:"202px"}} ref={localVideoElement.current} id={localParticipantVideoElementId.current}></video>
        </div>
    )
    
}
```

Now, run ```npm start``` command and start the development server. 

Go to ```localhost``` page, open console and observe that webrtc adaptor is initialized successfully and your camera video is rendered inside ```localParticipantVideoElement```

![](@site/static/img/conference/video-conference/video-conference-5.png)

This means that our client successfully connected to Ant Media Server through web socket and we are ready to do all kind of cool stuff such as publish, play and conference.


### Step 6: Join a Room

There are 2 main methods in all Ant Media WebRTC SDKs: ```publish()``` and ```play()```.

In Ant Media Server joining a conference room means that publishing to main track broadcast and playing the main track broadcast.

```js
const joinRoom = () => {
    var userStatusMetaData = getUserStatusMetaData()
    webrtcAdaptor.current.publish(localParticipantStreamId, null, null, null, localParticipantStreamId, roomId, JSON.stringify(userStatusMetaData));
    webrtcAdaptor.current.play(roomId)
}
```

For ```.publish()``` 1st, 6th and 7th arguments are required for conference.

First argument is participants ```streamId```, 6th argument is ```roomId```(main track id). 7th argument is ```metadata``` of the broadcast. 

For all other parameters and explanations take a look at [this on github](https://github.com/ant-media/StreamApp/blob/3cd4fb74033cbfd99638947e473507352788278c/src/main/js/webrtc_adaptor.js#L484).

Metadata field of broadcast object in conference context is used to store users microphone and camera state.

Go ahead and add ```getUserStatusMetaData``` function for that:

```js
const getUserStatusMetaData = ()=>{
    let metadata = {
        isMicMuted: false,
        isCameraOff: false,
    }
    return metadata;
}
```

After publish we need to call ```.play()``` with ```roomId```, so that we will receive all other participants video tracks and start playing them.

For javascript SDK, its okay to call ```.play()``` right after calling ```.publish()``` like above.

You can also start playing the room when you receive ```publish_started``` callback from webrtc adaptor. 

So go ahead and add ```webrtcAdaptor.current.play(roomId);``` inside ```publish_started``` also.

```js
else if (info == "publish_started") {
    console.log("publish started to room " + roomId);
    webrtcAdaptor.current.play(roomId);
}
``` 

For ```.play()```, only ```roomId``` is required. For all other parameters and explanations take a look at
[this on github](https://github.com/ant-media/StreamApp/blob/3cd4fb74033cbfd99638947e473507352788278c/src/main/js/webrtc_adaptor.js#L582).

To call ```joinRoom()``` function create a join room button and an input for roomId. We will also create a new input to set our local participants streamId.

return of ```ConferenceComponent``` should be like below:

```js
return(
    <div style={{width:"100%", height:"100%", display:"flex", flexDirection:"column"}}>
        <h1 style={{marginLeft:"auto", marginRight:"auto"}}>Ant Media React Conference Sample</h1>

        <div style={{display:"flex"}}>
            <video  muted={true} autoPlay={true} style={{width:"360", height:"202px"}} ref={localVideoElement.current} id={localParticipantVideoElementId.current}></video>

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


### Step 7: Retrieve Main Track Broadcast Object

After you call ```.play()``` with ```roomId```, if it is successful, you will receive ```play_started``` event from WebRTC adaptor.

Catch the ```play_started``` message on webrtc adaptor callback and call.

```js
webrtcAdaptor.current.getBroadcastObject(roomId);
```

with the ```roomId```. This will request main track(room) broadcast object from Ant Media Server.

```js
else if (info === "play_started") {     
webrtcAdaptor.current.getBroadcastObject(roomId);
}
```

After you request the main track object, Ant Media Server will respond with main track broadcast object. You will get the main track object through webrtc adaptor callback event ```broadcastObject```.

```js
else if (info === "broadcastObject") {
      if (obj.broadcast === undefined) {
        return;
      }

      let broadcastObject = JSON.parse(obj.broadcast);

      if (obj.streamId === roomId) {
        // this is main track(room) broadcast object.
        handleMainTrackBroadcastObject(broadcastObject);
      } else {
        // this is a sub track(participant) broadcast object
        handleSubtrackBroadcastObject(broadcastObject);
      }
}
```

### Step 8: Process Main Track Broadcast Object

When you receive a broadcast object, check if it is main track(room broadcast) or sub track(participant broadcast) by comparing its streamId with roomId. 

If it is equal to roomId, call ```handleMainTrackBroadcastObject(broadcastObject)``` function for further processing.

The ```handleMainTrackBroadcastObject``` will read participants of the room from ```subTrackStreamIds``` field and if their track does not exist in ```allParticipants``` object as a key it will request it from Ant Media Server.

Initialize a new empty object reference as ```allParticipants``` with ```useRef```.

```js
const allParticipants = useRef({})
```

Then create ```handleMainTrackBroadcastObject``` function.

```js
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
```

At this state your ```ConferenceComponent``` should be like this:

```js
import { useEffect, useState, useRef } from 'react';
import { WebRTCAdaptor } from '@antmedia/webrtc_adaptor'

export default function ConferenceComponent(){
    
    const [localParticipantStreamId, setLocalParticipantStreamId] = useState('')
    const [roomId, setRoomId] = useState('')
    const localVideoElement = useRef(null)
    const mediaConstraints = useRef( {
        video: { width: { min: 176, max: 360 } }, // set width and height of video publish of participant.
        audio: true, // audio to true.
      }
    )
    const websocketUrl = useRef('wss://test.antmedia.io:5443/live/websocket')
    const localParticipantVideoElementId = useRef('localParticipantVideo')
    const webrtcAdaptor = useRef(null)
    const allParticipants = useRef({})

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
                    //handleSubTrackBroadcastObject(broadcastObject)
                }
                console.log(obj.broadcast);
              } else if (info === "newTrackAvailable") {

            } else if (info === "publish_started") {
                console.log("publish started to room " + roomId);
                webrtcAdaptor.current.play(roomId)
              } else if (info === "publish_finished") {
                console.log("publish finished");
              } else if (info === "play_started") {
        
                webrtcAdaptor.current.getBroadcastObject(roomId);
              } else if (info === "play_finished") {
                //this event is fired when room is finished to play
                console.log("play_finished for stream:" + obj.streamId);
             
              } else if (info === "data_received") {

            }
            },
          });

    },[])

    const joinRoom = () => {
        var userStatusMetaData = getUserStatusMetaData()
        webrtcAdaptor.current.publish(localParticipantStreamId, null, null, null, localParticipantStreamId, roomId, JSON.stringify(userStatusMetaData));
        webrtcAdaptor.current.play(roomId)
    }

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

Now go to ```localhost``` page, type a random room id and a stream id for local participant. 

Click on join room button. Open development console and at this state your page should look like below:

![](@site/static/img/conference/video-conference/video-conference-6.png)

If you go to Ant Media Server web panel and check, you will see 2 broadcasts. One is for the room and other one is for you, the local participant.

### Step 9: Process Sub Track Broadcast Object

As you remember we requested sub track broadcast objects at step 7 inside ```handleMainTrackBroadcastObject``` function.

```js
participantIds.forEach(pid => {
    if (allParticipants[pid] === undefined) {
        webrtcAdaptor.current.getBroadcastObject(pid);
    }
});
```
Ant Media Server will respond with sub track objects.

Create a new function ```handleSubtrackBroadcastObject```

```js
function handleSubtrackBroadcastObject(broadcastObject) {
    if (broadcastObject.metaData !== undefined && broadcastObject.metaData !== null) {
        let userStatusMetadata = JSON.parse(broadcastObject.metaData);

        if (userStatusMetadata.isCameraOff !== undefined) {
            broadcastObject.isCameraOff = userStatusMetadata.isCameraOff;
        }

        if (userStatusMetadata.isMicMuted !== undefined) {
            broadcastObject.isMicMuted = userStatusMetadata.isMicMuted;
        }
    }

    allParticipants[broadcastObject.streamId] = broadcastObject;
}
```

This function will set broadcast object to ```allParticipants``` map with streamId as its key. Main reason of doing this is to retrieve camera and microphone status of the remote participant through broadcast objects ```metadata``` field.

Listen for subtracks inside webrtc adaptors event ```broadcastObject```

```js
else if (info === "broadcastObject") {
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
            }
```


## Continue with Part 2

The room joining and broadcast processing logic is done. Continue with [Part 2](/guides/conference/react-conference-tutorial-part-2/) to handle remote participants' audio/video tracks, render them on screen, and complete the application.
