---
title: MP4 & WebM Recording
description: Recording live streams in MP4 and WebM format
keywords: [Recording live streams, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

# MP4 & WebM Recording

Ant Media Server supports several types of live stream recording. Recording can be enabled or disabled from the AMS web panel or via the REST API, either by default for every incoming stream or per individual stream.

By the end of this guide, you'll have MP4 and/or WebM recording enabled and know how to control it per stream via the REST API.

## MP4 recording

To record live streams as MP4, we must first have the appropriate codecs compatible with the MP4 container. The most famous codec for this purpose is H.264, which is enabled as the default codec in Ant Media Server. If H.264 is disabled, any streams using other codecs won’t be recorded in MP4 until enabled.

You can set the H.264 codec in the application settings via the web panel.

![Screenshot from 2021-12-06 17-03-19](https://user-images.githubusercontent.com/32591015/144859658-8a1887e2-3e3a-4247-948f-6c35e611684a.png)

### Enable MP4 recording by default for every stream

You can enable MP4 recording from the web panel under application settings.

![Screenshot from 2021-12-06 16-20-31](https://user-images.githubusercontent.com/32591015/144853316-ca9ef1ce-9bfd-428d-b396-3e2f935f56d0.png)

Now, every stream that is published on a server will be recorded automatically in MP4 format.

### Enable MP4 recording for a specific stream

You can set each stream's recording individually via a REST API call. It allows users to start/stop recording a live stream when it is necessary and discard the rest to protect resources. 

Here is the [Record stream API](https://antmedia.io/rest/#/default/enableRecording).

Sample curl command to start MP4 recording for a particular stream;

```bash
curl -X 'PUT' 'https://<DOMAIN_NAME>:5443/<APP_NAME>/rest/v2/broadcasts/<STREAM_ID>/recording/true?recordType=mp4' -H 'accept: application/json'
```

Once you call the above API, the server will start recording the stream. To stop the recording, you need to make the status false.

```bash
curl -X 'PUT' 'https://<DOMAIN_NAME>:5443/<APP_NAME>/rest/v2/broadcasts/<STREAM_ID>/recording/false?recordType=mp4' -H 'accept: application/json'
```

:::info
For MP4 recording, you can also pass the `?fileName=` parameter in the API call, so that instead of following the default name format, the file is saved with a custom file name.

```bash
curl -X 'PUT' 'https://<DOMAIN_NAME>:5443/<APP_NAME>/rest/v2/broadcasts/<STREAM_ID>/recording/true?fileName=test123' -H 'accept: application/json'
```

So even if the stream ID is `test`, the file will be saved as `test123.mp4`.
:::

## WebM Recording

To record in WebM format, you’ll need to enable the VP8 codec in your Ant Media Server application. Since WebRTC supports VP8, WebM recording is naturally supported as well.

You can set the VP8 codec in the application settings via the web panel.

![Screenshot from 2021-12-06 17-00-45](https://user-images.githubusercontent.com/32591015/144859285-9dedac37-f0a7-4f0d-94d5-de97f393d194.png)

### Enable WebM recording by default for every stream

You can enable VP8 recording from the web panel under application settings.

![Screenshot from 2021-12-06 17-09-46](https://user-images.githubusercontent.com/32591015/144860705-981906aa-1f14-41fb-a39b-f67e2c4ecda9.png)

Now, every stream that is published on a server will be recorded automatically in VP8 format.

### Enable WebM recording for a specific stream

You can set each stream's recording individually via a REST API call. It allows users to start/stop recording a live stream when it is necessary and discard the rest to protect resources. 

Here is the [Record stream API](https://antmedia.io/rest/#/default/enableRecording).

Sample curl command to start WebM recording for a particular stream;

```bash
curl -X 'PUT' 'https://<DOMAIN_NAME>:5443/<APP_NAME>/rest/v2/broadcasts/<STREAM_ID>/recording/true?recordType=webm' -H 'accept: application/json'
```

Once you call the above API, the server will start recording the stream. To stop the recording, you need to make the status false.

```bash
curl -X 'PUT' 'https://<DOMAIN_NAME>:5443/<APP_NAME>/rest/v2/broadcasts/<STREAM_ID>/recording/false?recordType=webm' -H 'accept: application/json'
```

## Additional Recording Options

### Enable Date and Time to Recorded Files

You can also add the date time to recorded files by enabling the `Add Date-Time to Record File names` option in the application settings on the web panel.

![image](https://github.com/user-attachments/assets/8a42cebc-0c7d-4905-8a11-da14721ac420)

Once the recording is completed, the record file name will be `streamId9666-2024-04-02_13-18-35.844.mp4` with a date and time.

### Recording with different resolutions and bitrates

One of the main features of Ant Media Server is [Adaptive Bitrate Streaming](/guides/adaptive-bitrate/adaptive-bitrate-streaming/), which makes a difference when it comes to recording. If you enable any kind of recording with adaptive bitrate settings, the server will record the stream in each resolution, like:

`stream1_240p500kbps.mp4` or `stream1_240p500kbps.webm`

Enabling adaptive bitrate means the server is transcoding the video inside itself. This can extend the ability to record incoming streams.

### Recording a stream with different codecs

Containers do not support every codec. Assume you are publishing with RTMP with the H.264 codec but you want to record in WebM format. In order to record in WebM format, you need to enable the VP8 codec instead — Ant Media Server then transcodes video and audio to the required format via adaptive bitrate.

For example, if a 240p adaptive bitrate rendition is configured and RTMP publishing is ongoing, enabling WebM recording records that 240p rendition as `stream1_240p500kbps.webm`.

### Customize Recording Filename

Ant Media Server lets you customize the filenames of recorded MP4 and `.ts` files from the **Advanced Settings** in the web panel, combining components like resolution, bitrate, custom text, and timestamps for easier organization.

| Placeholder | Description |
| --- | --- |
| Base name | The stream's default name (e.g., `stream1`). |
| `%r` | Video resolution (e.g., `720p`). |
| `%b` | Video bitrate in kbps (e.g., `1500kbps`). |
| `fileNameFormat` | A format string combining the components above (resolution, bitrate, custom text). |
| `{customText}` | Any custom text you define, wrapped in curly braces. |
| Timestamp | Adds a timestamp to the filename when enabled (e.g., `2023-10-15_12-05-30.123`). |

| Stream Name | Resolution | Bitrate | `fileNameFormat` | Date-Time | Result |
| --- | --- | --- | --- | --- | --- |
| `myVideo` | 720 | 1500 | `%r%b` | Off | `myVideo_720p1500kbps` |
| `stream1` | 480 | 800 | `{HD}%r%b` | Off | `stream1_HD480p800kbps` |
| `stream2` | 720 | 1500 | `%b%r` | On | `stream2-2023-10-15_12-05-30.123_1500kbps720p.mp4` |

![image](https://github.com/user-attachments/assets/ce11a0ef-fdf0-4610-8ffc-b6c9afd63d0e)


## Store recordings in another directory

AMS stores the recordings in the streams directory by default. The streams directory is located under `/usr/local/antmedia/webapps/<APP_NAME>/streams`.

For example, if you are using the `live` application, the streams directory will be `/usr/local/antmedia/webapps/live/streams`.

If you would like to store the recordings (VoDs) in another directory/location, it is recommended to create a symbolic link.

For live streams, create a symbolic link:

```bash
sudo cp -p -r /usr/local/antmedia/webapps/live/streams/ /backup/
    
sudo rm -rf /usr/local/antmedia/webapps/live/streams/
    
sudo ln -s /mnt/vod_storage/folder/ /usr/local/antmedia/webapps/live/streams
```

After creating the symbolic link, you need to change the permissions of both the base directory and target directory using the below commands.

```bash
sudo chown -R antmedia:antmedia /usr/local/antmedia

sudo chown -R antmedia:antmedia /mnt/vod_storage/folder
```

## Import recordings from another directory

In order to link another directory containing MP4 files as a VoD directory on Web Panel, check [this API](https://antmedia.io/rest/#/default/importVoDs).

Sample curl command to import/link the VODs from another directory on the server.

```bash
curl -X 'POST' 'https://<DOMAIN_NAME>:5443/<APP_NAME>/rest/v2/vods/directory?directory=/home/recordings' -H 'accept: application/json'
```

To remove/unlink the imported directory, check [this API](https://antmedia.io/rest/#/default/unlinksVoD).

```bash
curl -X 'DELETE' 'https://<DOMAIN_NAME>:5443/<APP_NAME>/rest/v2/vods/directory?directory=/home/recordings' -H 'accept: application/json'
```

You now have MP4 and/or WebM recording enabled, with control over per-stream recording, adaptive bitrate variants, and custom filenames if you need them.

## Need Help?

If a stream isn't recording, confirm the required codec (H.264 for MP4, VP8 for WebM) is enabled for the application, then reach out on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or contact [Technical Support](mailto:support@antmedia.io).

