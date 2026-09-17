---
title: Screen Sharing
description: Switch between camera and screen sharing with the JavaScript SDK.
keywords: [JavaScript SDK, Screen Sharing, WebRTC, Ant Media Server Documentation]
sidebar_position: 5
sidebar_label: Screen Sharing
---

Switch between camera and screen capture within the same WebRTC publish session. Available on Community and Enterprise Editions. No browser plugins are required when `getDisplayMedia` is supported — check [browser compatibility](https://caniuse.com/#search=getDisplayMedia).

## Configure the WebSocket URL

Before you run any sample, set `websocket_url` to your Ant Media Server application:

| Protocol | Example | When to use |
|----------|---------|-------------|
| **WSS** | `wss://your-domain:5443/live/websocket` | Production — requires [SSL](/guides/installing-on-linux/setting-up-ssl/) (port **5443**) |
| **WS** | `ws://your-ip:5080/live/websocket` | Local HTTP without SSL (port **5080**) |

Replace `live` with your application name. All publish, play, and other samples use this connection.

## WebRTCAdaptor for screen sharing

Initialize `WebRTCAdaptor`, publish as usual, then switch the video source between camera and desktop.

```js
var webRTCAdaptor = new WebRTCAdaptor({
  websocket_url: "wss://your-domain:5443/live/websocket",
  mediaConstraints: mediaConstraints,
  localVideoId: "localVideo",
  callback: function(info, obj) {
    if (info == "browser_screen_share_supported") {
      // enable screen-share UI
    }
  },
});
```

<table className="sdk-api-table">
  <thead>
    <tr><th>Parameter</th><th>Description</th></tr>
  </thead>
  <tbody>
    <tr><td><code>websocket_url</code></td><td>Server WebSocket endpoint (see table above)</td></tr>
    <tr><td><code>localVideoId</code></td><td>ID of the <code>&lt;video&gt;</code> element for the published preview</td></tr>
    <tr><td><code>mediaConstraints</code></td><td>Audio/video constraints for the initial camera capture</td></tr>
    <tr><td><code>callback</code></td><td>Handle <code>browser_screen_share_supported</code>, <code>screen_share_stopped</code>, and publish events</td></tr>
  </tbody>
</table>

<table className="sdk-api-table">
  <thead>
    <tr><th>Method</th><th>Description</th></tr>
  </thead>
  <tbody>
    <tr><td><code>webRTCAdaptor.switchDesktopCapture(streamId)</code></td><td>Switch from camera to desktop screen share</td></tr>
    <tr><td><code>webRTCAdaptor.switchDesktopCaptureWithCamera(streamId)</code></td><td>Share screen and camera simultaneously</td></tr>
    <tr><td><code>webRTCAdaptor.switchVideoCameraCapture(streamId, deviceId)</code></td><td>Switch back to a specific camera by <code>deviceId</code></td></tr>
    <tr><td><code>webRTCAdaptor.publish(streamId)</code></td><td>Start publishing after source selection</td></tr>
    <tr><td><code>webRTCAdaptor.stop(streamId)</code></td><td>Stop publishing</td></tr>
  </tbody>
</table>

## Try built-in screen sharing

Open the WebRTC publish page on your server:

- Community Edition: `https://your-domain:5443/WebRTCApp`
- Enterprise Edition: `https://your-domain:5443/WebRTCAppEE`

Reference implementation: [StreamApp index.html](https://github.com/ant-media/StreamApp/blob/master/src/main/webapp/index.html).

## SDK integration example

```javascript
var webRTCAdaptor = new WebRTCAdaptor({
    websocket_url: "wss://your-domain:5443/live/websocket",
    mediaConstraints: mediaConstraints,
    localVideoId: "localVideo",
    callback: function(info, obj) {
        if (info == "initialized") {
            start_publish_button.disabled = false;
        } else if (info == "publish_started") {
            start_publish_button.disabled = true;
            stop_publish_button.disabled = false;
        } else if (info == "publish_finished") {
            start_publish_button.disabled = false;
            stop_publish_button.disabled = true;
        } else if (info == "browser_screen_share_supported") {
            screen_share_checkbox.disabled = false;
        } else if (info == "screen_share_stopped") {
            console.log("screen share stopped");
        }
    },
    callbackError: function(error, message) {
        console.log("error callback: " + JSON.stringify(error));
    }
});
```

After publishing, call `switchDesktopCapture(streamId)`, `switchDesktopCaptureWithCamera(streamId)`, or `switchVideoCameraCapture(streamId, deviceId)` to change sources.

## Desktop audio (Chrome)

When sharing your screen in Chrome, enable **Share audio** in the browser picker. To mix desktop and microphone audio, adjust gain in `captureScreenSound()` inside [webrtc_adaptor.js](https://github.com/ant-media/StreamApp/blob/master/src/main/webapp/js/webrtc_adaptor.js). See the [index.html sample](https://github.com/ant-media/StreamApp/blob/master/src/main/webapp/index.html) for a full example.
