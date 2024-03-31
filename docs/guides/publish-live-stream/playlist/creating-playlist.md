---
title: Creating playlist
description: Creating playlist
keywords: [Creating a playlist, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

It is very simple to create a playlist from the Ant Media Server dashboard by following a set of steps. So let's get started 🙂

## VoD files

In order to create a playlist, we need to have a set of VoD files which will be used as the playlist items. Therefore, as the first step, we will upload some VoD files to the Ant Media Server.

### Login to your Ant Media Server Dashboard

- Login to your Ant Media Server Web Panel/dashboard. The url is like this `https://YOUR_ANT_MEDIA_SERVER:5443/`

![image.png](@site/static/img/publish-live-stream/playlist/webpanel.png)

### Accessing the Application

- Navigate to your preferred application from the left side. For this demonstration, we are using the LiveApp application.
- Once you are in the LiveApp application, go to the VoD section.

![image.png](@site/static/img/publish-live-stream/playlist/vod-section.png)

### Uploading the VoD files

Now we can upload the VoD files that we want to stream with the playlist.
- Click on `Upload VoD` tab and then click on `Choose File` to select the files you want to upload. For this demonstration, I will upload three VoD files.

![image.png](@site/static/img/publish-live-stream/playlist/vod-upload.png)

- **Note**: Furthermore, uploading mp4 files to your Ant Media Server is optional. Ant Media Server can retrieve mp4 files from any location. You simply need to ensure that the file URL is accessible to AMS.

## Creating the Playlist

Now that we have the VoD files ready, we will create the playlist with these VoD files as the playlist items.

### Get the VoD URL
- The sample path of a VoD file is like `https://ams-server:5443/LiveApp/streams/vod_id
- In order to get the VOD URL, click on the hamburger icon which is located at the right side of the screen and then click `Copy VoD URL`

![image.png](@site/static/img/publish-live-stream/playlist/vod-url.png)

- Now we have the VoDs accessible through the below links
```
http://13.201.79.224:5080/LiveApp/streams/111716684850426702820750.mp4
http://13.201.79.224:5080/LiveApp/streams/618712696735204930650663.mp4
http://13.201.79.224:5080/LiveApp/streams/716674157649310868227159.mp4
```

### Let's create the Playlist

- Go to `Live Streams` section, and click on `New Live Streams` and then select `Playlist` from the drop-down menu.

![image.png](@site/static/img/publish-live-stream/playlist/playlist.png)

- Name your playlist, click on `Add Playlist Item`, add all the playlist items and then click `Create`.
- The `stream Id` field is not mandatory.

![image.png](@site/static/img/publish-live-stream/playlist/playlist-items.png)

- The playlist is created and it is offline by default.

- Click on the `Start Broadcast` to start streaming of the playlist.

![image.png](@site/static/img/publish-live-stream/playlist/start-playlist.png)

- Congratulations! The playlist is successfully created and running.

![image.png](@site/static/img/publish-live-stream/playlist/playlist-running.png)

## Optamizing Playlist for Better Playback Experience

Now that we have learned how to create a playlist, let's make some configurations to optamize the playlist for a better playback experiecne.

- Go to the `Settings` section of the application and scroll down.

![image.png](@site/static/img/publish-live-stream/playlist/settings.png)

- Uncheck the `Delete HLS files after the stream is finished`as these setting will preserve the HLS files after stream has ended.

![image.png](@site/static/img/publish-live-stream/playlist/hls-settings.png)

- Scroll to the bottom and Click `Save` button to save the changes.

- Scroll to the top and choose the settings mode from `Basic` to `Advanced`

![image.png](@site/static/img/publish-live-stream/playlist/advanced-settings.png)

- Find `hlsflags` and change its value to `delete_segments+append_list+omit_endlist`

![image.png](@site/static/img/publish-live-stream/playlist/hls-flags.png)

- Save the changes and start/restart the playlist to apply the changes.
