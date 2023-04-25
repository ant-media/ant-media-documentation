---
title: Embedded Web Player
sidebar_position: 4
---

You can embed the ```play.html``` page on your website using an iFrame. The ```play.html``` page is in the application folder on the Ant Media Server. 

For example in the LiveApp application, it can be found at the following location:

```shell
/usr/local/antmedia/webapps/LiveApp/play.html
```

## Play.html URL Parameters

```play.html``` page accepts the below URL parameters

*   **```id```** : The stream id to play. It is ***mandatory***.
*   **```token```** : The token to play the stream. It's mandatory if token security is enabled on the server-side.
*   **```autoplay```** : To start playing automatically if streams are available. Optional. The default value is true.
*   **```mute```** : To start playing with mute if stream is available. Optional. Default value is true.
*   **```playOrder```** : The order which technologies is used in playing. Optional. Default value is ```webrtc,hls```. Possible values are ```hls,webrtc,webrtc,hls,vod,dash```
*   **```playType```** : The order which play type is used in playing. Optional. Default value is ```mp4,webm```. Possible values are ```webm,mp4,mp4,webm```.
*   **```targetLatency```** : To define target latency for the DASH player. Optional. Default value is ```3```.
*   **```is360```** : To play the stream in 360. Default value is false.

## iFrame Embed Code 

```html
<iframe width="560" height="315" src="https://your_domain_name:5443/LiveApp/play.html?id=125214322064017559554903" frameborder="0" allowfullscreen></iframe>
```

Below is an example of the ```play.html``` page having been embedded within a webpage using the iFrame. 

![](@site/static/img/embedded-player-example.png)

