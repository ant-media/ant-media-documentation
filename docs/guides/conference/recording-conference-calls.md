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

The [Media Push plugin](https://github.com/ant-media/Plugins/tree/master/MediaPushPlugin) is an open-source plugin that is built on top of Ant Media Server that can load any web URL and stream it in real-time.

- Media Push opens up a [Headless Chrome](https://developer.chrome.com/docs/chromium/headless#:~:text=Back%20in%202017%2C%20Chrome%2059,projects%20like%20Puppeteer%20or%20ChromeDriver) on the server side. A user can send a REST request with the URL of the page that is desired to be recorded. When the request is received on the server side, a new Chrome tab is opened with the URL. As soon as the page gets loaded, the screen is recorded using Media Stream APIs and re-streamed back to Ant Media Server.

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

- All participant's streamIds (subtracks) can be seen on the web panel along with the room.

  ![conference-participants](https://github.com/user-attachments/assets/9fe69d30-cb16-4ef0-ab11-e178977ba5e5)

### Merging the Conference Streams

The [multitrack-play.html](https://github.com/ant-media/StreamApp/blob/master/src/main/webapp/multitrack-play.html) sample page, merges all the participants of the conference room dynamically & the same can be accessed at:

```
https://Server-URL:5443/live/multitrack-play.html?id=roomid
```

Here:

- `Server-URL` is your Ant Media Server URL/Domain.
- `live` is the application name.
- `roomid` is the room name or maintrack. In this example, we have used room1

:::info
You do not need to explicitly open this sample page in the browser to merge the participant's streams; it will continue running in the background to merge the streams dynamically.

::: 


### Initializing the Media Push Plugin

The Media Push plugin can be called with a REST API to capture the sample page `multitrack-play.html` & stream it back to the Ant Media Server.

```js
curl -i -X POST -H "Accept: Application/json" -H "Content-Type: application/json" "https://server-url:5443/live/rest/v1/media-push/start"  -d '{"url": "https://server-url:5443/live/multitrack-play.html?id=room1", "width": 1280, "height": 720}'
```

![media-push-call](https://github.com/user-attachments/assets/423e232d-1c07-409d-98fb-5a590d42a21f)

- In the above example, the Media Push Plugin captures the sample page & streams it back to the Ant Media Server.

  ![media-push-stream](https://github.com/user-attachments/assets/66f73678-0f56-4d41-870b-6c2732aed840)

- The merged stream will have all the participant's streams of the room & it is updated dynamically.

  ![Screenshot 2025-02-07 144942](https://github.com/user-attachments/assets/d2d0777d-0523-40c8-9088-88a74c638afa)

### Recording the Merged Stream

Now that we have the merged stream, we can make the API call to start recording the stream with MP4.

```js
curl -X PUT -H "Content-Type: application/json" "https://server-url:5443/live/rest/v2/broadcasts/JQzivjSFdVTJ1738919890828/recording/true"
```

Alternatively, the recording can also be started from the web panel.

![merged-stream](https://github.com/user-attachments/assets/b4fd1a91-50df-42a1-bd35-0e44e8526dd4)

- In addition to MP4, the stream can also be [recorded with HLS](https://antmedia.io/docs/guides/recording-live-streams/hls-recording/).

- To stop the MP4 recording, again you can make the REST call.

  ```js
  curl -X PUT -H "Content-Type: application/json" "https://server-url:5443/live/rest/v2/broadcasts/JQzivjSFdVTJ1738919890828/recording/false"
  ```

- To record the broadcast in addition to streaming, you can include the recordType option in your REST API call. This option specifies the format in which the broadcast should be recorded. Here's how you can modify the previous start broadcast command to include recording:

  ```js
  curl -i -X POST -H "Accept: Application/json" -H "Content-Type: application/json" "${ANT_MEDIA_SERVER_BASE_URL}/${APP_NAME}/rest/v1/media-push/start" -d  '{"url": "'"${URL_TO_RECORD}"'", "width": 1280, "height": 720, "recordType":"mp4"}'
  ```

- This command will initiate the broadcast of the specified URL and simultaneously record it in MP4 format. Ensure to replace `${URL_TO_RECORD}` with the actual URL you want to broadcast and record. In this case, the sample page URL merges the conference room streams.


### Stop the Media Push Plugin broadcast

Once the conference ends, to stop the media push created broadcast on the Ant Media Server, you can call the REST method as outlined below.

```js
curl -i -X POST -H "Accept: Application/json" -H "Content-Type: application/json" "https://server-url:5443/live/rest/v1/media-push/stop/JQzivjSFdVTJ1738919890828"
```

- Make sure the streamId matches the one you obtained when initiating the broadcast.

![media-push-stop](https://github.com/user-attachments/assets/5c921103-0fd1-4706-b933-f8490184f11a)

- To learn more about the Media Push Plugin usage, check [How to Use](https://github.com/ant-media/Plugins/tree/master/MediaPushPlugin#how-to-use)

## Recording Conference calls on Circle 

With the [Circle](https://github.com/ant-media/conference-call-application) conference call application, the recording feature is seamlessly integrated.

- If the Media Push plugin is installed on the server, the `Start Recording` button appears under More Options when you click the gear icon after joining the conference call.

  ![start-recording](https://github.com/user-attachments/assets/9be13e63-bfdc-4b27-b411-3fa08cae9c70)

- Clicking on the start recording will start to record the composite room stream with the Media Push plugin.

  ![recording](https://github.com/user-attachments/assets/62601667-44f8-4d32-8742-ff1b50899732)

- Similarly, you can stop the recording when done.
- After the recording is stopped, the recorded file will be visible under the VoD section of the application.

  ![image](https://github.com/user-attachments/assets/59b1555f-f2a7-43a5-a955-5e0b704537e7)

This is how you can record the conference call on the Ant Media Server with the help of the Media Push Plugin.

## Conference Call Recording in Action

<iframe width="560" height="315" src="https://www.youtube.com/embed/8KNLfMTr6Jo?si=uZp5NwvSxqQV3Q91" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


<br /><br />
---

<div align="center">
<h2> Recording, Rolled Out! 🎙️ </h2>
</div>

You’ve installed the Media Push plugin, merged all participants via `multitrack-play.html` (or `merge_streams.html`), and recorded the conference room stream using MP4 (or HLS if needed). Your merged stream is now available in VoD for review or archive.
Kudos 👏 — you can now keep **every conversation, every presentation, every meeting on record, effortlessly!** 📁

