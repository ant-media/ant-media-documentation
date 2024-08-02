---
title: Creating a playlist
description: Creating a playlist
keywords: [Creating a playlist, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

It is very simple to create a playlist from the Ant Media Server dashboard by following a set of steps. So let's get started 🙂

## VoD files

In order to create a playlist, we need to have a set of VoD files that will be used as playlist items. Therefore, as the first step, we will upload some VoD files to the Ant Media Server.

### Login to your Ant Media Server Dashboard

Login to your Ant Media Server Web Panel/dashboard. The url is like this: `https://YOUR_ANT_MEDIA_SERVER:5443/`

![image.png](@site/static/img/publish-live-stream/playlist/webpanel.png)

### Accessing the Application

- Navigate to your preferred application from the left side. For this demonstration, we are using the LiveApp application.
- Once you are in the LiveApp application, go to the VoD section.

![image.png](@site/static/img/publish-live-stream/playlist/vod-section.png)

### Uploading the VoD files

#### Using Web Panel

Now we can upload the VoD files that we want to stream with the playlist.

- Click on the `Upload VoD` tab and then click on `Choose File` to select the files you want to upload. For this demonstration, I will upload three VoD files.

![image.png](@site/static/img/publish-live-stream/playlist/vod-upload.png)

:::info
Furthermore, uploading MP4 files to your Ant Media Server is optional. Ant Media Server can retrieve MP4 files from any location. You simply need to ensure that the file URL is accessible to AMS.
:::

#### Using REST API

You can upload MP4 files to Ant Media Server using the REST API with the following API call:

```bash
curl -X POST -F "file=@<YOUR-FILE-PATH>;type=video/*" https://AMS_URL:5443/APP-NAME/rest/v2/vods/create?name=YOUR-FILE-NAME.mp4
```

Here is the curl sample:

```bash
curl -X POST -F "file=@test.mp4;type=video/*" http://localhost:5080/WebRTCAppEE/rest/v2/vods/create?name=test.mp4
```

The uploaded file will be located in `antmedia/webapps/APP-NAME/streams` directory. The MP4 file name will be changed to a random VOD ID, which you can find in the VOD section of the web panel application page.

You can use the [Get VOD list](https://antmedia.io/rest/#/default/getVodList) rest API call to get the VOD file list from the database.

 You can access the uploaded VOD file through the below URL format:

```
http(s)://domain_or_IP:Port/AppName/streams/VOD-ID.mp4
```

Example:

```
http://localhost:5080/WebRTCAppEE/streams/722484094956241856650105.mp4
```

## Creating the Playlist

Now that we have the VoD files ready, we will create the playlist with these VoD files as the playlist items.

- Go to the `Live Streams` section, click on `New Live Stream`, and then select `Playlist` from the drop-down menu.

![image.png](@site/static/img/publish-live-stream/playlist/playlist.png)

- Name your playlist, and click on `Add Playlist Item`. Under the dropdown menu, there are two options.

1. Add URL Directly
2. Add From VODs

![add-playlist-item-01](https://github.com/user-attachments/assets/7b292014-d319-4a5e-8d3d-b5f388a07bc3)

- Let's discuss both options and you can use any of these options based on your convenience. 

### Add URL Directly
If you have the VoD URL handy or if you are adding external VoDs, then you can use this option.

#### Get the VoD URL

- The sample path of a VoD file uploaded to the Ant Media Server VoD section is like `http(s)://ams-server-url:Port/LiveApp/streams/vod_id.mp4`

- To get the VOD URL, click on the hamburger icon, which is located on the right side of the screen, and then click `Copy VoD URL`

![copy-vod](https://github.com/user-attachments/assets/2693c0db-006c-4a04-ba72-f6835e950565)

- Now we have the VoDs accessible through the below links.

```
http://localhost:5080/LiveApp/streams/044283659243035008593467.mp4
http://localhost:5080/LiveApp/streams/127700726123231884567831.mp4
```

- Add all the playlist items and then click `Create`.

- The `stream Id` field is not mandatory but you can put your streamId.

![Screenshot](https://github.com/user-attachments/assets/44d98efc-805f-4378-83f1-e690e107bea2)

- The playlist is created and it is offline by default.

- Click on the `Start Broadcast` to start streaming of the playlist.

![start-playlist](https://github.com/user-attachments/assets/1b9efce8-2a6f-4587-b9b8-b99bb86c685b)

- Congratulations! The playlist is successfully created and running.

![playlist-streaming](https://github.com/user-attachments/assets/44ef7735-163e-4105-a179-ac1b2b22bfeb)

###  Add From VODs
This option is more useful if all the VoD files you want to stream are on your Ant Media Server itself under the VoD section.

![add-from-vod](https://github.com/user-attachments/assets/a430d1b8-36a3-4a14-9c1c-4e69265ff076)

- You can search for the uploaded VoD items with their name or VOD Id and click on the `Add` option.

![seraching-vods](https://github.com/user-attachments/assets/8f6d720f-8019-45e9-b59a-23e36a59f27a)

- After you have added all the VoD files, click Create. 

![vods-added](https://github.com/user-attachments/assets/a29bf31b-d548-4317-b81c-90ac8bf3d3fa)

- The playlist is created and it is offline by default.

![created-playlist](https://github.com/user-attachments/assets/44228147-2564-44b8-a38a-10682d943477)

- Playlist length shows the overall duration of the playlist with the added items.

- You can edit the playlist and the items as needed.

![edit-playlist](https://github.com/user-attachments/assets/c2a68cb0-982f-4b2e-bc0a-10f3eae7ca2a)

- Click on the `Start Broadcast` to start streaming of the playlist.

![start-playlist](https://github.com/user-attachments/assets/1b9efce8-2a6f-4587-b9b8-b99bb86c685b)

- Congratulations! The playlist is successfully created and running.

![playlist-streaming](https://github.com/user-attachments/assets/44ef7735-163e-4105-a179-ac1b2b22bfeb)

## Optimizing Playlist for Better Playback Experience

Now that we have learned how to create a playlist, let's make some configurations to optimize the playlist for a better playback experience.

- Go to the `Settings` section of the application and scroll down.

![image.png](@site/static/img/publish-live-stream/playlist/settings.png)

- Uncheck the `Delete HLS files after the stream is finished` as this setting will preserve the HLS files after the stream has ended.

![image.png](@site/static/img/publish-live-stream/playlist/hls-settings.png)

- Scroll to the bottom and Click the `Save` button to save the changes.

- Scroll to the top and choose the settings mode from `Basic` to `Advanced`

![image.png](@site/static/img/publish-live-stream/playlist/advanced-settings.png)

- Find `hls flags` and change its value to `delete_segments+append_list+omit_endlist`

![image.png](@site/static/img/publish-live-stream/playlist/hls-flags.png)

- Save the changes and start/restart the playlist to apply the changes.
