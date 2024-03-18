---
title: Embedded Web Player
description: Embedded Web Player to your webpage using an iFrame.
keywords: [Embedded Web Player, Embedded Player using iFrame, Ant Media Server Documentation, Ant Media Server Tutorials, play streams, play on seperate website,]
sidebar_position: 4
---

# Embedded Web Player

There are several methods available for embedding Ant Media Servers custom video player onto your website to watch streams hosted on the Ant Media Server.
## 1- IFrame
Using an IFrame is a quick, but least customizeable way to integrate Ant Media Server streams to your website.

This will just embed the ```play.html``` page to your website using an iFrame element. The ```play.html``` page is in the application folder on Ant Media Server. 

For example, ```play.html``` can be found in the LiveApp application at the following location:

```shell 
/usr/local/antmedia/webapps/LiveApp/play.html
```
The default player is as follows:

![](@site/static/img/playing-live-streams/embedded-web-player/embedded-player.png)

```play.html``` page uses our custom web player underhood, which makes possible to play with all playing protocols(WebRTC, HLS, Dash)

### Play.html URL Parameters

The URL parameters listed below are accepted by the ```play.html``` page.

* **```id```** or **```name```**: The stream id for which to play. It is ***mandatory***.
* **```token```**: The token used to access the stream. If token security is enabled on the server, it is required.
* **```autoplay```**: If streams are accessible, playback will begin immediately. Optional. True is the default value.
* **```mute```**: If a stream is accessible, begin playing with mute. Optional. True is the default value.
* **```playOrder```** : The order is to define the playback technology or protocol. Optional. ```webrtc,hls``` is the default value. ```hls,webrtc,dash,vod``` are possible values.
* **```playType```**: PlayType is required to play the recording. ```mp4``` is the default value. ```webm,mp4``` are possible values.
* **```targetLatency```**: To specify the DASH player's target latency. Optional. The default value is ''3''.
* **```is360```**: To play the 360 degree input stream. Default value is false.

The default WebRTC URL is as follows for play.html (when no token enabled).
```
https://AMS-domain-name:5443/LiveApp/play.html?name=streamId
```

When token is enabled:
```
https://AMS-domain-name:5443/LiveApp/play.html?name=streamId&token=generated-token
```
For HLS, Dash or VOD playback, you can use ```playOrder``` parameter as defined above.

### iFrame Embed Code 

You can copy the Embed code for a specific stream directly from the AMS dashboard, as shown in the screenshot below:

![](@site/static/img/playing-live-streams/embedded-web-player/iframe-code.png)

Here is the sample Embed code:

```html
<iframe width="560" height="315" src="https://AMS-domain-name:5443/WebRTCAppEE/play.html?name=125214322064017559554903" frameborder="0" allowfullscreen></iframe>
```

As evident in the 

```src="https://AMS-domain-name:5443/WebRTCAppEE/play.html?name=125214322064017559554903"``` 

segment of the iframe code, we're passing a name parameter. You can include additional parameters in a similar manner as specified above.

For example ```playOrder=webrtc```:

```src="https://AMS-domain-name:5443/WebRTCAppEE/play.html?name=125214322064017559554903&playOrder=webrtc"```

With this adjustment, your IFrame player will attempt to stream solely via WebRTC. If a WebRTC stream isn't available, it will refrain from playing the stream altogether. If you do not spesify playOrder in this case player will switch to HLS playback.


Because some secured websites do not accept the Embed code with HTTP URL, please ensure that SSL is configured on your Ant Media Server. For further information, see the [SSL section](https://antmedia.io/docs/guides/installing-on-linux/setting-up-ssl/).

## 2-Ant Media Server Web Player
The [Web Player](https://github.com/ant-media/Web-Player) is a custom video player developed by Ant Media, designed to facilitate playback of live streams hosted on the server. It accommodates **all play protocols(Webrtc, Hls, Dash)** and offers extensive customization options. It is fully open-source and accessible on [Github](https://github.com/ant-media/Web-Player)

The Web Player utilizes the Ant Media Server Javascript SDK for WebRTC playback functionality. If your specific requirement involves exclusively WebRTC playback and you seek the most customizable solution, consider exploring the [JavaScript SDK](https://antmedia.io/docs/guides/developer-sdk-and-api/sdk-integration/javascript-sdk/)

Quick instructions for integrating the web player can be found in the GitHub [README](https://github.com/ant-media/Web-Player/blob/main/README.md)
. In this section, we'll explore the process of integrating the web player into our React project.

**Step 1: Installation**

Go to your react project directory and install web player with npm
```html
npm i @antmedia/web_player
```
**Step 2: Import Web Player to your Component**

Import web player in your react component as below:
```html
import { WebPlayer } from "@antmedia/web_player";
```
**Step 3: Add video player container and placeholder to html**

Include a video player container and a placeholder within your component's render function. The placeholder will be visible until the stream begins playing. The Ant Media web player will automatically insert a video element into the videoContainer, inheriting its size. Therefore, you can set the player's size by adjusting the dimensions of the videoContainer element.

```html
    <div>
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <span>Ant Media Embedded Player</span>
        <div style={{ display: 'flex', height: '360px', width: "640px" }} id="videoContainer" ref={videoRef}></div>
        <div
          id="placeHolder"
          ref={placeHolderRef}
          className="placeholder"
          style={{
            height: '360px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          The streaming will begin shortly...
        </div>
      </div>
    </div>
```
Key components within our HTML include videoContainer and placeHolder. These will be provided when configuring our web player.

**Step 3: Initialize web player inside useEffect**

Create a useEffect hook to initialize web player and start playback on component mount:
```html
useEffect(() => {    
    embeddedPlayerRef.current = new WebPlayer({
      streamId: "teststream",
      httpBaseURL: "http://localhost:5080/WebRTCAppEE/", 
      videoHTMLContent: '<video id="video-player" class="video-js vjs-default-skin vjs-big-play-centered" controls playsinline style="width:100%;height:100%"></video>',
      playOrder : playOrderLocal
    }, videoRef.current, placeHolderRef.current);
    
    embeddedPlayerRef.current.initialize().then(() => {
      embeddedPlayerRef.current.play();
    }).catch((error) => {
      console.error("Error while initializing embedded player: " + error);
    });
  }, []);
  ```

```streamId```: Id for the stream your player will display.

```httpBaseURL```: The web player retrieves the application name (e.g., WebRTCAppEE in our example) and the URL of your server where the stream is located through this parameter. In a production environment, it should resemble: 
https://your_ams_url:5443/appName/

```videoHTMLContent```: Content that the web player will inject into our videoContainer.

```playOrder```: Array specifying the order of playback.

```videoRef.current```: Reference to the videoContainer element.

```placeHolder.current```: Reference to the placeholder element.

**Full react component:**
```html
import { useEffect, useRef } from 'react';
import { WebPlayer } from "@antmedia/web_player";

function App() {
  const videoRef = useRef(null);
  const placeHolderRef = useRef(null);
  const embeddedPlayerRef = useRef(null);
  const playOrderLocal = ["webrtc", "hls", "dash"];
  
  useEffect(() => {    
    embeddedPlayerRef.current = new WebPlayer({
      streamId: "teststream",
      httpBaseURL: "http://localhost:5080/WebRTCAppEE/", 
      videoHTMLContent: '<video id="video-player" class="video-js vjs-default-skin vjs-big-play-centered" controls playsinline style="width:100%;height:100%"></video>',
      playOrder : playOrderLocal
    }, videoRef.current, placeHolderRef.current);
    
    embeddedPlayerRef.current.initialize().then(() => {
      embeddedPlayerRef.current.play();
    }).catch((error) => {
      console.error("Error while initializing embedded player: " + error);
    });
  }, []);
  
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <span>Ant Media Embedded Player</span>
        <div style={{ display: 'flex', height: '360px', width: "640px" }} ref={videoRef} id="video_container"></div>
        <div
          ref={placeHolderRef}
          className="placeholder"
          style={{
            height: '360px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          The streaming will begin shortly...
        </div>
      </div>
    </div>
  );
}

export default App;
```

## FAQs related to embedded player

- Your Embedded player may occasionally display a network warning. More information can be found [here](https://github.com/orgs/ant-media/discussions/4923).
 - Change the language on the player while the stream is not active, see [this](https://github.com/orgs/ant-media/discussions/4880).
 - Display poster image instead of text when stream is not active, see [this](https://github.com/orgs/ant-media/discussions/4877).
