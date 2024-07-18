---
title: JavaScript SDK Usage
description: JavaScript SDK Usage 
keywords: [JavaScript SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 8
---

Before moving forward with using WebRTC JavaScript SDK, we highly recommend using the sample project to get started with your application. It's good to know the dependencies and how it works in general.

### Install @antmedia/webrtc_adaptor package from **[npm.js](https://www.npmjs.com/package/@antmedia/webrtc_adaptor)**

    ```npm install @antmedia/webrtc_adaptor```

    or 

    ```yarn add @antmedia/webrtc_adaptor```

**Imports and initialise the WebRTCAdaptor from JavaScript-SDK**

```
    import { WebRTCAdaptor } from '@antmedia/webrtc_adaptor';

    const webRTCAdaptor = new WebRTCAdaptor({
      websocket_url: "wss://your-domain.tld:5443/WebRTCAppEE/websocket",
      mediaConstraints: {
          video: true,
          audio: true,
      },
      peerconnection_config: {
          'iceServers': [{'urls': 'stun:stun1.l.google.com:19302'}]
      },
      sdp_constraints: {
          OfferToReceiveAudio : false,
          OfferToReceiveVideo : false,
      },
      localVideoId: "id-of-video-element", // <video id="id-of-video-element" autoplay muted></video>
      bandwidth: int|string, // default is 900 kbps, string can be 'unlimited'
      dataChannelEnabled: true|false, // enable or disable data channel
      callback: (info, obj) => {}, // check info callbacks bellow
      callbackError: function(error, message) {}, // check error callbacks bellow
    });
```
