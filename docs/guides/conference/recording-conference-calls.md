---
title: Conference Call Recording
description: Recording Conference Calls With Ant Media Server Using Media Push
keywords: [Conference call recording, Ant Media video conference, Media push plugin, Circle]
sidebar_position: 3
---

# Conference Call Recording

Unlike regular broadcast streams, conference calls have multiple participants, each with a unique streamId. Therefore, the regular recording mechanism cannot be used in conference calls. Instead of recording each participant's stream individually, we need a solution to merge all the streams and record the entire room.

- In this document, we will learn how to easily record Ant Media Server conference calls using the sample page [multitrack-play.html](https://github.com/ant-media/StreamApp/blob/master/src/main/webapp/multitrack-play.html) and the [Media Push plugin](https://antmedia.io/docs/guides/recording-live-streams/media-push-plugin/).

## Recording the Conference Call

Recording the conference call is essentially a four-step process:
- Joining the conference room.
- Merging all the participants in the conference room with [multitrack-play.html](https://github.com/ant-media/StreamApp/blob/master/src/main/webapp/multitrack-play.html) or [merge_streams.html](https://github.com/ant-media/StreamApp/blob/master/src/main/webapp/merge_streams.html).
- Capturing the merged streams with the [Media push plugin](https://github.com/ant-media/Plugins/tree/master/MediaPushPlugin) & sending it back to the Ant Media Server.
- Recording the merged room stream.

Now, let's discuss all these steps individually and see how they are done.

### Joining a Conference Room

There are various ways to join a conference call from different devices and platforms, such as the Web i.e., from the sample conference page [conference.html](https://github.com/ant-media/StreamApp/blob/master/src/main/webapp/conference.html) or using the mobile SDKs like [Android](https://github.com/ant-media/WebRTC-Android-SDK) or [iOS](https://github.com/ant-media/WebRTC-iOS-SDK), etc.


