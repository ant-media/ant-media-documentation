---
title: Recording live streams 
description: Recording live streams enables you to record every stream in the application.
keywords: [Recording live streams, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

Ant Media Server supports several types of live stream recording. Recording can be enabled or disabled from the AMS web panel or via the Rest API as well.

There are two options for recording: 

 - Enable recording by default for all of incoming streams 
 - Enable recording for a specific streamId.

In this document, we will go through `MP4` and `WebM` recording and REST API calls to enable them.

## Enabling recording

### MP4 recording

To be able to record live streams as MP4, we first need to have the right codecs which are supported by MP4 container. The most famous codec for this purpose is H.264, which is enabled as the default codec in Ant Media Server. If H.264 is disabled, mp4 recording will not be available. 

You can set the H264 codec in the application settings via web panel.

![Screenshot from 2021-12-06 17-03-19](https://user-images.githubusercontent.com/32591015/144859658-8a1887e2-3e3a-4247-948f-6c35e611684a.png)

You can also set below property to enable the H264 codec via SSH. Edit `/usr/local/antmedia/webapps/<your_app_name>/WEB-INF/red5-web.properties` file and change the below setting:

`settings.h264Enabled=true`

#### Enabling MP4 recording by default for every stream

You can enable MP4 recording from the web panel under application settings.

![Screenshot from 2021-12-06 16-20-31](https://user-images.githubusercontent.com/32591015/144853316-ca9ef1ce-9bfd-428d-b396-3e2f935f56d0.png)

Now, every stream that is published on a server will be recorded automatically in MP4 format.

#### Enabling MP4 recording for a specific stream

You can set each stream's recording individually via a REST API call. It allows users to start/stop recording a live stream when it is necessary and discard the rest to protect resources. 

Here is the [Record stream API](https://antmedia.io/rest/#/BroadcastRestService/enableRecording).

Sample curl command to start MP4 recording for a particular stream;

```bash
curl -X 'PUT' 'http(s)://domain-or-IP:Port/AppName/rest/v2/broadcasts/streamId/recording/true?recordType=mp4' -H 'accept: application/json'
```

Once you call the above API, server will start recording the stream. To stop the recording, you need to make the status false.

```bash
curl -X 'PUT' 'http(s)://domain-or-IP:Port/AppName/rest/v2/broadcasts/streamId/recording/false?recordType=mp4' -H 'accept: application/json'
```

### WebM Recording

To record webm-formatted files, we need to enable the VP8 codec in the Ant Media Server application. WebRTC supports WebM recording because it also supports VP8.

You can set the VP8 codec in the application settings via the web panel.

![Screenshot from 2021-12-06 17-00-45](https://user-images.githubusercontent.com/32591015/144859285-9dedac37-f0a7-4f0d-94d5-de97f393d194.png)

You can also set the below property to enable the VP8 codec via SSH. Edit the `/usr/local/antmedia/webapps/<your_app_name>/WEB-INF/red5-web.properties` file and change the below setting:

`settings.vp8Enabled=true`

#### Enabling WebM recording by default for every stream

You can enable VP8 recording from the web panel under application settings.

![Screenshot from 2021-12-06 17-09-46](https://user-images.githubusercontent.com/32591015/144860705-981906aa-1f14-41fb-a39b-f67e2c4ecda9.png)

Now, every stream that is published on a server will be recorded automatically in VP8 format.

#### Enabling WebM recording for a specific stream

You can set each stream's recording individually via a REST API call. It allows users to start/stop recording a live stream when it is necessary and discard the rest to protect resources. 

Here is the [Record stream API](https://antmedia.io/rest/#/BroadcastRestService/enableRecording).

Sample curl command to start WebM recording for a particular stream;

```bash
curl -X 'PUT' 'http(s)://domain-or-IP:Port/AppName/rest/v2/broadcasts/streamId/recording/true?recordType=webm' -H 'accept: application/json'
```

Once you call the above API, server will start recording the stream. To stop the recording, you need to make the status false.

```bash
curl -X 'PUT' 'http(s)://domain-or-IP:Port/AppName/rest/v2/broadcasts/streamId/recording/false?recordType=webm' -H 'accept: application/json'
```

## Additional entities of recording

### Recording with different resolutions and bitrates

One of the main features of Ant Media Server is [Adaptive Bitrate Streaming](https://antmedia.io/docs/guides/adaptive-bitrate/adaptive-bitrate-streaming/), which makes a difference when it comes to recording. If you enable any kind of recording with adaptive bitrate settings, server will record the stream in each resolution, like:

`stream1_240p500kbps.mp4` or `stream1_240p500kbps.webm`

Enabling adaptive bitrate means the server is transcoding the video inside itself. This can extend the ability to record incoming streams.

### Recording a stream which has different codec

Containers do not support every codec. Assume you are publishing with RTMP with H264 codec but you want to record in WebM format. But in order to record in WebM format, you need to enable the VP8 codec. In this case, Ant Media Server can transcode video and audio codecs to the required format with adaptive bitrate. 

Let's say a 240p adaptive bitrate is added in application settings and RTMP publishing is ongoing. If you enable webM recording, 240p stream will be recorded, like ```stream1_240p500kbps.webm```

## Storing recordings to another directory

AMS stores the recordings in streams directory by default. The streams directory is located under `usr/local/antmedia/webapps/AppName/streams`.

For example, if you are using the LiveApp application, streams directory will be `usr/local/antmedia/webapps/LiveApp/streams`.

If you would like to store the recordings (VoDs) to another directory/location, it is recommended to create a symbolic link.

For live streams, create a symbolic link:

```bash
sudo cp -p -r /usr/local/antmedia/webapps/appname/streams/ /backup/
    
sudo rm -rf /usr/local/antmedia/webapps/appname/streams/
    
sudo ln -s /mnt/vod_storage/folder/
/usr/local/antmedia/webapps/appname/streams
```

After creating the symbolic link, you need to change the permissions of both the base directory and target directory using below commands.

```bash
sudo chown -R antmedia:antmedia /usr/local/antmedia

sudo chown -R antmedia:antmedia /mnt/vod_storage/folder
```

In order to link another directory containing MP4 files as VoD directory on Web Panel:

 - Login to Ant Media Server web panel 
 - Go to Applications (LiveApp/WebRTCAppEE) settings 
 - Set the VoD streaming folder (i.e., add directory where MP4 files are located).

## Uploading records to S3

Please check [S3 Intergration documentation](/v1/docs/integrating-with-s3) to record streams to the s3 bucket.

To record the **HLS**, **MP4**/**WebM** or **PNG** files to the bucket, you can use the following setting;

`"uploadExtensionsToS3": 7`
  
You can change this property from the Application's Advanced settings on web panel. The default value is 7 which records all HLS, MP4/WebM and PNG files.

This setting is a number where the digits represent whether an upload will be done or not. The least significant digit switches MP4/WebM files, the second switches HLS and the third for PNG.

Example: `uploadExtensionsToS3=5` ( 101 in binary ) means upload MP4 and PNG but not HLS.

Possible values are as follows:

 - Don't upload anything: `uploadExtensionsToS3=0`
 
 - Only (MP4/WebM) upload: `uploadExtensionsToS3=1`

 - HLS upload only: `uploadExtensionsToS3=2`

 - HLS and record upload: `uploadExtensionsToS3=3`

 - PNG upload only: `uploadExtensionsToS3=4`

 - PNG and record upload: `uploadExtensionsToS3=5`

 - PNG and HLS upload: `uploadExtensionsToS3=6`

 - Upload everything: `uploadExtensionsToS3=7`
