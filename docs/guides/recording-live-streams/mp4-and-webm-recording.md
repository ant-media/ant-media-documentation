---
title: MP4 & WebM Recording 
description: Recording live streams in MP4 and WebM format
keywords: [Recording live streams, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

# MP4 & WebM Recording

Ant Media Server supports several types of live stream recording. Recording can be enabled or disabled from the AMS web panel or via the Rest API as well.

There are two options for recording: 

 - Enable recording by default for all of incoming streams 
 - Enable recording for a specific streamId.

In this document, we will go through `MP4` and `WebM` recording and REST API calls to enable them.

## MP4 recording

To record live streams as MP4, we must first have the appropriate codecs that are compatible with the MP4 container. The most famous codec for this purpose is H.264, which is enabled as the default codec in Ant Media Server. If H.264 is disabled, mp4 recording will not be available. 

You can set the H264 codec in the application settings via the web panel.

![Screenshot from 2021-12-06 17-03-19](https://user-images.githubusercontent.com/32591015/144859658-8a1887e2-3e3a-4247-948f-6c35e611684a.png)

You can also set below property to enable the H264 codec via SSH. Edit `/usr/local/antmedia/webapps/<your_app_name>/WEB-INF/red5-web.properties` file and change the below setting:

`settings.h264Enabled=true`

### Enable MP4 recording by default for every stream

You can enable MP4 recording from the web panel under application settings.

![Screenshot from 2021-12-06 16-20-31](https://user-images.githubusercontent.com/32591015/144853316-ca9ef1ce-9bfd-428d-b396-3e2f935f56d0.png)

Now, every stream that is published on a server will be recorded automatically in MP4 format.

### Enable MP4 recording for a specific stream

You can set each stream's recording individually via a REST API call. It allows users to start/stop recording a live stream when it is necessary and discard the rest to protect resources. 

Here is the [Record stream API](https://antmedia.io/rest/#/default/enableRecording).

Sample curl command to start MP4 recording for a particular stream;

```bash
curl -X 'PUT' 'http(s)://domain-or-IP:Port/AppName/rest/v2/broadcasts/streamId/recording/true?recordType=mp4' -H 'accept: application/json'
```

Once you call the above API, server will start recording the stream. To stop the recording, you need to make the status false.

```bash
curl -X 'PUT' 'http(s)://domain-or-IP:Port/AppName/rest/v2/broadcasts/streamId/recording/false?recordType=mp4' -H 'accept: application/json'
```

## WebM Recording

To record webm-formatted files, we need to enable the VP8 codec in the Ant Media Server application. WebRTC supports WebM recording because it also supports VP8.

You can set the VP8 codec in the application settings via the web panel.

![Screenshot from 2021-12-06 17-00-45](https://user-images.githubusercontent.com/32591015/144859285-9dedac37-f0a7-4f0d-94d5-de97f393d194.png)

You can also set the below property to enable the VP8 codec via SSH. Edit the `/usr/local/antmedia/webapps/<your_app_name>/WEB-INF/red5-web.properties` file and change the below setting:

`settings.vp8Enabled=true`

### Enable WebM recording by default for every stream

You can enable VP8 recording from the web panel under application settings.

![Screenshot from 2021-12-06 17-09-46](https://user-images.githubusercontent.com/32591015/144860705-981906aa-1f14-41fb-a39b-f67e2c4ecda9.png)

Now, every stream that is published on a server will be recorded automatically in VP8 format.

### Enable WebM recording for a specific stream

You can set each stream's recording individually via a REST API call. It allows users to start/stop recording a live stream when it is necessary and discard the rest to protect resources. 

Here is the [Record stream API](https://antmedia.io/rest/#/default/enableRecording).

Sample curl command to start WebM recording for a particular stream;

```bash
curl -X 'PUT' 'http(s)://domain-or-IP:Port/AppName/rest/v2/broadcasts/streamId/recording/true?recordType=webm' -H 'accept: application/json'
```

Once you call the above API, server will start recording the stream. To stop the recording, you need to make the status false.

```bash
curl -X 'PUT' 'http(s)://domain-or-IP:Port/AppName/rest/v2/broadcasts/streamId/recording/false?recordType=webm' -H 'accept: application/json'
```

## Additional entities of recording

### Enable Date and Time to Recorded Files

You can also add the date time to recorded files by enabling the `Add Date-Time to Record File names` option in the application settings on the web panel.

![image](https://github.com/user-attachments/assets/8a42cebc-0c7d-4905-8a11-da14721ac420)

Once the recording is completed, the record file name will be like `streamId9666-2024-04-02_13-18-35.844.mp4` with a date and time.

### Recording with different resolutions and bitrates

One of the main features of Ant Media Server is [Adaptive Bitrate Streaming](https://antmedia.io/docs/guides/adaptive-bitrate/adaptive-bitrate-streaming/), which makes a difference when it comes to recording. If you enable any kind of recording with adaptive bitrate settings, server will record the stream in each resolution, like:

`stream1_240p500kbps.mp4` or `stream1_240p500kbps.webm`

Enabling adaptive bitrate means the server is transcoding the video inside itself. This can extend the ability to record incoming streams.

### Recording a stream with different codecs

Containers do not support every codec. Assume you are publishing with RTMP with H264 codec but you want to record in WebM format. But in order to record in WebM format, you need to enable the VP8 codec. In this case, Ant Media Server can transcode video and audio codecs to the required format with adaptive bitrate. 

Let's say a 240p adaptive bitrate is added in application settings and RTMP publishing is ongoing. If you enable webM recording, 240p stream will be recorded, like ```stream1_240p500kbps.webm```

### Customize Recording Filename
Ant Media Server allows you to customize the filenames of recorded MP4 and TS files directly from the **Ant Media Web panel.** You can define how the filename appears by combining components like resolution, bitrate, custom text, and timestamps. This is helpful for better organization and identification of recorded files.

- **Customize Options:**
You can include the following placeholders in your file naming format:

`Base name`- The default name of the stream (e.g., "stream1").  
`%r`- Adds the video resolution (e.g., 720p) (eg: stream1_720p1500kbps)  
`%b`- Adds the video bitrate in kbps (e.g., 1500kbps) (eg: stream1_HD720p)  
`fileNameFormat`: A format string to combine the components (resolution, bitrate, custom text).  
`{customText}`- Adds any custom text you define within curly braces.  
`Timestamp`- Adds a timestamp to the filename when enabled (e.g., 2023-10-15_12-05-30.123).  

- Examples below for reference-
1. name = "myVideo", resolution = 720, bitrate = 1500, **fileNameFormat = "%r%b"**  
Result: "myVideo_720p1500kbps"
2. name = "stream1", resolution = 480, bitrate = 800, **fileNameFormat = "{HD}%r%b"**  
Result: "stream1_HD480p800kbps"
3. name = "stream2", resolution = 720, bitrate = 1500, **fileNameFormat=%b%r, Date-Time ON**  
Result: "stream2-2023-10-15_12-05-30.123_1500kbps720p.mp4"

![image](https://github.com/user-attachments/assets/ce11a0ef-fdf0-4610-8ffc-b6c9afd63d0e)


## Store recordings to another directory

AMS stores the recordings in the streams directory by default. The streams directory is located under `usr/local/antmedia/webapps/AppName/streams`.

For example, if you are using the LiveApp application, the streams directory will be `usr/local/antmedia/webapps/LiveApp/streams`.

If you would like to store the recordings (VoDs) in another directory/location, it is recommended to create a symbolic link.

For live streams, create a symbolic link:

```bash
sudo cp -p -r /usr/local/antmedia/webapps/appname/streams/ /backup/
    
sudo rm -rf /usr/local/antmedia/webapps/appname/streams/
    
sudo ln -s /mnt/vod_storage/folder/ /usr/local/antmedia/webapps/appname/streams
```

After creating the symbolic link, you need to change the permissions of both the base directory and target directory using below commands.

```bash
sudo chown -R antmedia:antmedia /usr/local/antmedia

sudo chown -R antmedia:antmedia /mnt/vod_storage/folder
```

## Import recordings from another directory

In order to link another directory containing MP4 files as VoD directory on Web Panel, checkout [this API](https://antmedia.io/rest/#/default/importVoDs).

Sample curl command to import/link the VODs from another directory on the server.

```bash
curl -X 'POST' 'https://IP:Port/AppName/rest/v2/vods/directory?directory=/home/recordings' -H 'accept: application/json' 
```

To remove/unlink the imported directory, check [this API](https://antmedia.io/rest/#/default/unlinksVoD).

```bash
curl -X 'DELETE' 'https://test.antmedia.io:5443/Sandbox/rest/v2/vods/directory?directory=/home/recordings' -H 'accept: application/json'
```
