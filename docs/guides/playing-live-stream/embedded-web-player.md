---
title: Embedded Web Player
sidebar_position: 4
---

You can embed the ```play.html``` page on your website using an iFrame. The ```play.html``` page is in the application folder on Ant Media Server. 

For example, it can be found in the LiveApp application at the following location:

```shell 
/usr/local/antmedia/webapps/LiveApp/play.html
```
The default player is as follows:

![](@site/static/img/playing-live-streams/embedded-web-player/embedded-player.png)

## Play.html URL Parameters

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

## iFrame Embed Code 

You can copy the Embed code for a specific stream directly from the AMS dashboard, as shown in the screenshot below:

![](@site/static/img/playing-live-streams/embedded-web-player/iframe-code.png)

Here is the sample Embed code:

```html
<iframe width="560" height="315" src="https://AMS-domain-name:5443/WebRTCAppEE/play.html?name=125214322064017559554903" frameborder="0" allowfullscreen></iframe>
```
Because some secured websites do not accept the Embed code with HTTP URL, please ensure that SSL is configured on your Ant Media Server. For further information, see the [SSL section](https://antmedia.io/docs/guides/installing-on-linux/setting-up-ssl/).

## FAQs related to embedded player

- Your Embedded player may occasionally display a network warning. More information can be found [here](https://github.com/orgs/ant-media/discussions/4923).
 - Change the language on the player while the stream is not active, see [this](https://github.com/orgs/ant-media/discussions/4880).
 - Display poster image instead of text when stream is not active, see [this](https://github.com/orgs/ant-media/discussions/4877).
