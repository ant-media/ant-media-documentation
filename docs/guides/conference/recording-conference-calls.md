---
title: Conference Call Recording
description: Recording Conference Calls With Ant Media Server Using Media Push
keywords: [Conference call recording, Ant Media video conference, Media push plugin, Circle]
sidebar_position: 3
---

# Conference Call Recording

Unlike regular broadcast streams, conference calls have multiple participants, each with a unique streamId. Therefore, the regular recording mechanism cannot be used in conference calls. Instead of recording each participant's stream individually, we need a solution to merge all the streams and record the entire room.

- In this document, we will learn how to easily record Ant Media Server conference calls using the sample page [multitrack-play.html](https://github.com/ant-media/StreamApp/blob/master/src/main/webapp/multitrack-play.html) and the [Media Push plugin](https://antmedia.io/docs/guides/recording-live-streams/media-push-plugin/).

## Media Push Plugin

The [Media Push plugin](https://github.com/ant-media/Plugins/tree/master/MediaPushPlugin) is an open source plugin that is built on top of Ant Media Server that can load any web URL and stream it in real time.

- Media Push opens up a [Headless chrome](https://developer.chrome.com/docs/chromium/headless#:~:text=Back%20in%202017%2C%20Chrome%2059,projects%20like%20Puppeteer%20or%20ChromeDriver) on the server side. A user can send a REST request with the URL of the page that is desired to be recorded. When the request is received on the server side, a new Chrome tab is opened with the URL. As soon as the page gets loaded, the screen is recorded using Media Stream APIs and re-streamed back to Ant Media Server.

### Installing Media Push Plugin

- Connect your Ant Media Server instance via terminal.
- Download the installation script:

  ```js
  wget -O install_media-push-plugin.sh https://raw.githubusercontent.com/ant-media/Plugins/master/MediaPushPlugin/src/main/script/install_media-push-plugin.sh && chmod 755 install_media-push-plugin.sh
  ```
- Run the installation script:

  ```js
  sudo ./install_media-push-plugin.sh
  ```
- Restart the service:

  ```js
  sudo service antmedia restart
  ```

## Recording the Conference Call

Recording the conference call is essentially a four-step process:
- Joining the conference room.
- Merging all the participants in the conference room with [multitrack-play.html](https://github.com/ant-media/StreamApp/blob/master/src/main/webapp/multitrack-play.html) or [merge_streams.html](https://github.com/ant-media/StreamApp/blob/master/src/main/webapp/merge_streams.html).
- Capturing the merged streams with the [Media push plugin](https://github.com/ant-media/Plugins/tree/master/MediaPushPlugin) & sending it back to the Ant Media Server.
- Recording the merged room stream.

Now, let's discuss all these steps individually and see how they are done.

### Joining a Conference Room

There are various ways to join a conference call from different devices and platforms, such as the Web i.e., from the sample conference page [conference.html](https://github.com/ant-media/StreamApp/blob/master/src/main/webapp/conference.html) or using the mobile SDKs like [Android](https://github.com/ant-media/WebRTC-Android-SDK) or [iOS](https://github.com/ant-media/WebRTC-iOS-SDK), etc.

- Let's join the conference room with `roomid' as `room1`, also known as the `maintrack`.

  ![join-coference](https://github.com/user-attachments/assets/a764c2e9-1396-4147-b304-b3700fe01b11)

- All participants streamIds (subtracks) can be seen on the web panel along with the room.

  ![conference-participants](https://github.com/user-attachments/assets/9fe69d30-cb16-4ef0-ab11-e178977ba5e5)

### Merging the Conference Streams

The [multitrack-play.html](https://github.com/ant-media/StreamApp/blob/master/src/main/webapp/multitrack-play.html) sample page, merges all the participants of the conference room dynamically & the same can be access at:

```
https://Server-URL:5443/live/multitrack-play.html?id=roomid
```

Here:

- `Server-URL` is your Ant Media Server URL/Domain.
- `live` is the application name.
- `roomid` is the room name or maintrack. In this example, we have used room1

::




