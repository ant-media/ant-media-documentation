---
title: Sharing screen with WebRTC
description: Sharing screen with WebRTC
keywords: [Sharing screen with WebRTC, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---

# Sharing screen with WebRTC

Seamless switching between WebRTC screen sharing and camera streaming is available on both Community and Enterprise Editions. This allows you to switch between screen and camera within the same session.

> Note: No extra plugins or software are required on the browser side.

## Try WebRTC Screen Sharing Without Plugin

Ensure your browser supports `getDisplayMedia`. Check the list of supported browsers [here](https://caniuse.com/#search=getDisplayMedia).

Visit the WebRTC publishing page:

- Community Edition: `https://domainAddress:5443/WebRTCApp`
- Enterprise Edition: `https://domainAddress:5443/WebRTCAppEE`

> Quick Link: [Install SSL on Ant Media Server](/guides/installing-on-linux/setting-up-ssl/)

---

## Using WebRTC Screen Sharing

The WebRTC adaptor provides functions for seamless switching between screen sharing and camera:

- Source code for switching: [js/webrtc_adaptor.js](https://github.com/ant-media/StreamApp/blob/master/src/main/webapp/js/webrtc_adaptor.js)
- Full implementation example: [WebRTCApp/index.html](https://github.com/ant-media/StreamApp/blob/master/src/main/webapp/index.html)

### Browser Screen Share Support Callback

```javascript
var webRTCAdaptor = new WebRTCAdaptor({
    websocket_url: websocketURL,
    mediaConstraints: mediaConstraints,
    localVideoId: "localVideo",
    callback: function(info, obj) {
        if (info == "initialized") {
            console.log("initialized");
            start_publish_button.disabled = false;
            stop_publish_button.disabled = true;
        } else if (info == "publish_started") {
            console.log("publish started");
            start_publish_button.disabled = true;
            stop_publish_button.disabled = false;
            startAnimation();
        } else if (info == "publish_finished") {
            console.log("publish finished");
            start_publish_button.disabled = false;
            stop_publish_button.disabled = true;
        } else if (info == "browser_screen_share_supported") {
            screen_share_checkbox.disabled = false;
            console.log("browser screen share supported");
            browser_screen_share_doesnt_support.style.display = "none";
        } else if (info == "screen_share_stopped") {
            console.log("screen share stopped");
        } else if (info == "closed" && obj) {
            console.log("Connection closed: " + JSON.stringify(obj));
        } else if (info == "pong") {
            // Keep WebSocket alive
        } else if (info == "refreshConnection") {
            startPublishing();
        } else if (info == "ice_connection_state_changed") {
            console.log("iceConnectionState Changed: ", JSON.stringify(obj));
        } else if (info == "updated_stats") {
            console.log("Average outgoing bitrate " + obj.averageOutgoingBitrate + " kbits/sec"
                    + " Current outgoing bitrate: " + obj.currentOutgoingBitrate + " kbits/sec");
        }
    },
    callbackError: function(error, message) {
        console.log("error callback: " + JSON.stringify(error));
        var errorMessage = message || JSON.stringify(error);
        if (error.indexOf("NotFoundError") != -1) errorMessage = "Camera or Mic not found or denied.";
        else if (error.indexOf("NotReadableError") != -1 || error.indexOf("TrackStartError") != -1)
            errorMessage = "Camera or Mic is in use by another process.";
        else if (error.indexOf("OverconstrainedError") != -1 || error.indexOf("ConstraintNotSatisfiedError") != -1)
            errorMessage = "No device fits your video/audio constraints.";
        else if (error.indexOf("NotAllowedError") != -1 || error.indexOf("PermissionDeniedError") != -1)
            errorMessage = "Access to camera/mic denied.";
        else if (error.indexOf("TypeError") != -1) errorMessage = "Video/Audio required.";
        else if (error.indexOf("ScreenSharePermissionDenied") != -1) {
            errorMessage = "Screen share not allowed.";
            screen_share_checkbox.checked = false;
        } else if (error.indexOf("WebSocketNotConnected") != -1)
            errorMessage = "WebSocket connection disconnected.";
        alert(errorMessage);
    }
});

```

## Switching Between Sources

### 1. Switch to Desktop Screen Share

If your browser supports `getDisplayMedia`, you can switch from camera to screen sharing using:

```javascript
webRTCAdaptor.switchDesktopCapture(streamId);
```

## 2. Switch to Screen Share with Camera

To share both your screen and camera simultaneously, use:

```js
webRTCAdaptor.switchDesktopCaptureWithCamera(streamId);
```

## 3. Switch Back to Camera

To revert back to the camera feed from screen sharing, use:

```js
webRTCAdaptor.switchVideoCameraCapture(streamId, deviceId);
```
`deviceId` should be the ID of the camera you want to use.

## Sharing Desktop Audio (Chrome)

When sharing your screen in Chrome:

* Click the Share Audio option to send desktop audio.

* If you want to mix desktop and microphone audio:

1. Open `webrtc_adaptor.js` and locate the function:

```captureScreenSound(stream, micStream,streamId)```

2. Adjust the gain levels as needed:

```desktopSoundGainNode.gain.value = (Some value between 0 and 1);```

```micGainNode.gain.value = (Some value between 0 and 1);```

Full example of screen sharing with audio is available in the [index.html sample](https://github.com/ant-media/StreamApp/blob/master/src/main/webapp/index.html) in Github.

## Congratulations!

You now have full control over switching between camera and screen sharing in your WebRTC session. You can share your screen alone, combine it with your camera, switch back effortlessly, and even include desktop audio. Your WebRTC streaming experience is now seamless and professional—ready for presentations, tutorials, or live collaboration.
