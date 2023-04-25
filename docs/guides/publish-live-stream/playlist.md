---
title: Playlist
sidebar_position: 8
---

This guide describes how to use Playlist feature on Ant Media Server. You can use this feature in both Community Edition and Enterprise Edition of Ant Media Server.

![image.png](@site/static/img/image(2).png)

## What is Linear Live Streaming?

Linear Live Streaming is basically about scheduling your streams for a 7/24 live streaming and can be delivered with different methods. Live Streams and VoD streams can be used in your scheduled live streams which means Linear as well.

So, Linear Live Streams have some programs which have a start and end date streams in the program. Furthermore, Linear Live Streaming is a live event in which all viewers are watching the same live event at the same time. This means you don’t get any spoiler before viewing.

Live linear streaming is a “passive” video viewing experience, meaning viewers don’t “search and click” (except to change the program). The experience of linear streaming is that video content comes to you and while you can change the channel, you don’t have to select an entire collection of videos to watch like you do with a playlist.

## How to create a Playlist?

You can create a playlist in Ant Media Server Dashboard. Your playlist is ready in 3 steps. Here are the steps 🙂

Click `New Live Stream > Playlist` as shown above.

![image.png](@site/static/img/publish-live-stream/playlist/playlist.png)

If you have your mp4 files on your local system before creating the playlist, you can upload them to Ant Media Server from the VoD section, as shown below.

![image.png](@site/static/img/publish-live-stream/playlist/vod-upload.png)

The uploaded mp4 files are saved in the applications streams folder by default, and we must provide that path as a file URL when creating the playlist.

Simply enter the Playlist name, Stream Id, and Playlist URL into the appropriate fields and click the ```Create``` button. You can add more Playlist Items based on the number of files or URLs in your playlist.

![image.png](@site/static/img/publish-live-stream/playlist/create-playlist.png)

**Note:** Furthermore, uploading mp4 files to your Ant Media Server is optional. Ant Media Server can retrieve mp4 files from any location. You simply need to ensure that the file URL is accessible to AMS.

After you've created your playlist, you can start it by clicking the ```Start Broadcast``` button.

![image.png](@site/static/img/publish-live-stream/playlist/start-playlist.png)

Rest API can also be used to start and stop a playlist. Check out the APIs for [start broadcast](https://antmedia.io/rest/#/BroadcastRestService/startStreamSourceV2) and [stop broadcast](https://antmedia.io/rest/#/BroadcastRestService/stopStreamingV2).

## How can I use Playlist API?

Here is the sample create Playlist CURL command:

    curl -X POST -H "Content-Type: application/json" "https://AMS-domain:port/Application-Name/rest/v2/broadcasts/create" -d 
    '{  
    "name": "your-streamName",
    "streamId": "your-streamId",
    "type":"playlist",
    "playListItemList": [
        {
                 "streamUrl":  "http://sample-stream-URL.com/sample.mp4",
                 "type":  "VoD"
        }
    ]}'
    
You can use the [update Broadcast](https://antmedia.io/rest/#/BroadcastRestService/updateBroadcast) Rest API to update the playlist on the fly.

## How to play Linear Live Streaming?

You can play the playlist in HLS and WebRTC.

[Here is HLS player documentation](/guides/playing-live-stream/hls-playing/)

[Here is WebRTC play documentation](/guides/playing-live-stream/webrtc-playing/)

Check out the [following discussion](https://github.com/orgs/ant-media/discussions/4879) for some tweaks to improve playlist playback.
