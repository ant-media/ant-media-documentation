---
title: Play
sidebar_label: Play
description: Play a WebRTC live stream in an Android app with the Ant Media Android SDK.
keywords: [Android SDK User Guide, Android SDK Play, Ant Media Server Documentation]
sidebar_position: 4
---

# Play WebRTC Stream

To play instead of publish, attach the video view as a **remote** renderer and call `play()`.

In `WebRTCStreamingActivity`:

```java
package io.antmedia.mywebrtcstreamingapp;

import android.app.Activity;
import android.os.Bundle;
import io.antmedia.webrtcandroidframework.api.IWebRTCClient;

public class WebRTCStreamingActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.webrtc_streaming);

        IWebRTCClient webRTCClient = IWebRTCClient.builder()
                .setActivity(this)
                .addRemoteVideoRenderer(findViewById(R.id.full_screen_renderer))
                .setServerUrl("wss://test.antmedia.io:5443/live/websocket")
                .build();

        webRTCClient.play("stream1");
    }
}
```

## Test playback

1. Publish a stream with the same `streamId`—for example from the [WebRTC publish](/guides/publish-live-stream/webrtc/) guide or your Android publish app.
2. Run the Android play app. When publishing is active on the server, video appears on the device.

![](@site/static/img/sdk-integration/android-sdk/webrtc-android-play-application-test-1.png)

![](@site/static/img/sdk-integration/android-sdk/webrtc-android-play-application.png)

## Troubleshooting

- Confirm the WebSocket URL, `streamId`, and camera/microphone permissions on the publishing side.
- Ask on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) if playback stays blank.

Sample code: [WebRTC-Android-SDK sample app](https://github.com/ant-media/WebRTC-Android-SDK/tree/master/webrtc-android-sample-app).
