# WebRTC Publish Page Creation Tutorial

In this tutorial we will create a WebRTC publish page from scratch together. Before we start, let us remind that Ant Media Server (AMS) comes with default streaming web applications which have some sample pages. You can access the samples from ```https://YOUR_DOMAIN:5443/APP_NAME/samples.html``` You can also access the WebRTC publish page with several features from ```https://YOUR_DOMAIN:5443/APP_NAME/index.html``` We will create a simple version of this publish page in this tutorial. Our page will have a video player and two buttons. Lets start to create it step by step.

Step 0. Be Prepared
-------------------

*   Install AMS if you haven't done. You may check [installation document](/guides/installing-on-linux/installing-ams-on-linux/).
*   You should have a web server to test your publish page we will create in this tutorial. Since we will access device camera and mic in our page, we should serve the page in a secure site with https or you can use a local webserver. If you don't know how you have a webserver, please check [this](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server) to run one in minutes.
*   Create a workspace which can be served by your webserver.
*   Create an empty publish.html file in your workspace. This file will be our publsh page in minutes.

Step 1. Download Ant Media Server JS SDK
----------------------------------------

JS SDK consists of several js files and dependencies. Please download these js files into your workspace.

*   [webrtc\_adaptor.js](https://raw.githubusercontent.com/ant-media/StreamApp/master/src/main/webapp/js/webrtc_adaptor.js)
*   [media\_manager.js](https://raw.githubusercontent.com/ant-media/StreamApp/master/src/main/webapp/js/media_manager.js)
*   [websocket\_adaptor.js](https://raw.githubusercontent.com/ant-media/StreamApp/master/src/main/webapp/js/websocket_adaptor.js)
*   [soundmeter.js](https://raw.githubusercontent.com/ant-media/StreamApp/master/src/main/webapp/js/soundmeter.js)
*   [peer\_stats.js](https://raw.githubusercontent.com/ant-media/StreamApp/master/src/main/webapp/js/peer_stats.js)

Step 2. Write the UI content of the publish page
------------------------------------------------

We want to keep this page as simple as possible. So it will contain only a video player and 2 buttons. The video player will play the camera stream that we will publish. Note that to give an ```id``` attribute to the ```video``` element is important because we will use it later. The buttons are for start/stop the WebRTC publish.

    `<html>`
    `<body>`
      `<video width="320" height="240" id="myLocalVideo" autoplay muted controls playsinline>``</video>`
      `<br>`
      `<button type="button" id="start">`Start`</button>`
      `<button type="button" id="stop">`Stop`</button>`
    `</body>`
    
    `<script type="module" lang="javascript">`
      //Script content will be here 
    `</script>`
    `</html>`
    

Step 3. Write the script content of the publish page
----------------------------------------------------

We should write our script content in between ```script``` element.

First we need to import ```WebRTCAdaptor``` class from the JS SDK.  
```import {WebRTCAdaptor} from "./webrtc_adaptor.js"```

### Create WebRTCAdaptor Instance

Now we have to create an ```WebRTCAdaptor``` instance which is provided by JS SDK. This instance will be the only interaction point between our page and the JS SDK.

    let websocketURL =  "ws://ovh36.antmedia.io:5080/LiveApp/websocket";
    
    let mediaConstraints = {
      video : true,
      audio : true
    };
            
    let pc_config = {
      'iceServers' : [ {
        'urls' : 'stun:stun1.l.google.com:19302'
      } ]
    };
    
    let sdpConstraints = {
      OfferToReceiveAudio : false,
      OfferToReceiveVideo : false
    };
    
    var webRTCAdaptor = new WebRTCAdaptor({
      websocket_url : websocketURL,
      mediaConstraints : mediaConstraints,
      peerconnection_config : pc_config,
      sdp_constraints : sdpConstraints,
      localVideoId : "myLocalVideo",
      callback : (info, obj) =>` {
        if (info == "publish_started") {
          alert("publish started");
        } else if (info == "publish_finished") {
          alert("publish finished");
        }
        else {
          console.log( info + " notification received");
        }
      },
      callbackError : function(error, message) {
        alert("error callback: " +  JSON.stringify(error));
      }
    });
    

#### WebRTCAdaptor Constructor Parameters:

*   _**websocket\_url**_ should be like ```ws://{YOUR_AMS_URL}:5080/{APP_NAME}/websocket``` and points websocket endpoint on your AMS and the used application name.
*   _**mediaConstraints**_ simply defines video and audio availability and their settings. You may check [this](https://developer.mozilla.org/en-US/docs/Web/API/Media_Streams_API/Constraints) for more information.
*   _**peerconnection\_config**_ defines the peer connection parameters. We will pass only STUN server as parameter in this page. You may check [this](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/setConfiguration) for more information.
*   _**sdpConstraints**_ defines sdp options. Since we publish only from this page no we will disable video and audio receive here. You may check [this](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createOffer) for more information.
*   _**localVideoId**_ is the ```id``` parameter of the ```video``` element.
*   _**callback**_ is the callback function called by the JS SDK in case of some specific events. Here we will create alert in case of getting **_publish\_started_** and **_publish\_finished_**. You may check [this](/guides/developer-sdk-and-api/sdk-integration/javascript-sdk/#webrtc-javascript-info-callbacks) for more information about callbacks.
*   _**callbackError**_ is the callback function called by the JS SDK in case of some specific errors. Here we create allert in case of any error. You may check [this](/guides/developer-sdk-and-api/sdk-integration/javascript-sdk/#webrtc-javascript-error-callbacks) for more information about error callbacks.

### Create Start/Stop functions

Now we will use the WebRTCAdaptor instance we created to start and stop WebRTC stream publishing. Lets create start/stop functions.

    let streamId = "MyStream";
    
    function startPublishing() {
      webRTCAdaptor.publish(streamId, "", "", "", "", "");
    }
    
    function stopPublishing() {
      webRTCAdaptor.stop(streamId);
    }
    

As you see we simply call WebRTCAdaptor ```publish``` method only. That's enough to start a WebRTC stream. We should pass a ```streamId``` parameter which defines the id of the stream on the server. ```publish``` methods also gets some parameters related to security or other features but we don't use them here. So we pass empty for all parameters other than ```streamId```.

Similarly we simply call WebRTCAdaptor ```stop``` method to stop streaming. It has just ```streamId``` parameter.

### Bind Start/Stop functions to UI elements

Lets bind our start/stop functions to the buttons now.

    document.getElementById("start").addEventListener("click", startPublishing);
    document.getElementById("stop").addEventListener("click", stopPublishing);
    

That's all for WebRTC publishing. If you need to learn more about WebRTCAdaptor please check [this](/guides/developer-sdk-and-api/sdk-integration/javascript-sdk/).

### Final Check

The resultant page should be like this:

    `<html>`
    `<body>`
        `<video width="320" height="240" id="myLocalVideo" autoplay muted controls playsinline>``</video>`
        `<br>`
        `<button type="button" id="start">`Start`</button>`
        `<button type="button" id="stop">`Stop`</button>`
    `</body>`
    
    `<script type="module" lang="javascript">`
      import {WebRTCAdaptor} from "./webrtc_adaptor.js"
        
      let websocketURL =  "ws://ovh36.antmedia.io:5080/LiveApp/websocket";
    
      let mediaConstraints = {
        video : true,
        audio : true
      };
            
      let pc_config = {
        'iceServers' : [ {
          'urls' : 'stun:stun1.l.google.com:19302'
         } ]
      };
    
      let sdpConstraints = {
        OfferToReceiveAudio : false,
        OfferToReceiveVideo : false
      };
      
      var  webRTCAdaptor = new WebRTCAdaptor({
        websocket_url : websocketURL,
        mediaConstraints : mediaConstraints,
        peerconnection_config : pc_config,
        sdp_constraints : sdpConstraints,
        localVideoId : "myLocalVideo",
        callback : (info, obj) =>` {
          if (info == "publish_started") {
            alert("publish started");
          } else if (info == "publish_finished") {
            alert("publish finished");
          }
          else {
            console.log( info + " notification received");
          }
        },
        callbackError : function(error, message) {
          alert("error callback: " +  JSON.stringify(error));
        }
      });
      
      let streamId = "MyStream";
    
      document.getElementById("start").addEventListener("click", startPublishing);
      document.getElementById("stop").addEventListener("click", stopPublishing);
    
      function startPublishing() {
        webRTCAdaptor.publish(streamId, "", "", "", "", "");
      }
    
      function stopPublishing() {
        webRTCAdaptor.stop(streamId);
      }
    `</script>`
    `</html>`
    

Step 4. Test the publish page
-----------------------------

Now we are ready to test it.

*   Open the page we created from the browser. Let us remind that you should serve this page via a webserver.
*   You should get a message from the bromser to allow camera and mic access.
*   When you allow you should see your camera stream in the video element. Please allow.
*   We are ready to start WebRTC stream. Click _Start_ button.
*   You should get an alert that shows stream is started.
*   You can login your AMS dashboard and check if your stream is there. Also you can play it from dashboard.
*   Now click to _Stop_ button. You should get an alert that shows stream is finished. Also your stream should be disappeared from the dashboard.

In this tutorial we have created a WebRTC publish page with basic elements. You can check [this](https://github.com/ant-media/StreamApp/blob/master/src/main/webapp/index.html) for an advanced sample WebRTC publish page.