---
title: Managing the playlist programmatically
description: Managing the playlist programmatically
keywords: [Managing the Playlist Programmatically, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---

In the previous sections, we learned how to create and manage playlists via the management panel/dashboard. The playlist can also be managed programmatically with the help of the Ant Media Server REST APIs.

## Make Ant Media Server Respond to REST API calls

By default, only localhost can make REST calls to the Ant Media Server and for any other IPs to be able to make the API call, we need to enable that IP in the application settings under `REST API Security`.

For this demonstration to test the playlist programmatically, I will open the REST API for everyone.

:::important 
I have opened Ant Media Server to respond to all REST methods for testing purposes. It's not something recommended for production environments. So, you should only open the REST calls to specific IPs by [securing the REST APIs](https://antmedia.io/docs/guides/developer-sdk-and-api/rest-api-guide/securing-rest-apis/).
:::

- Find `REST API Security` section under settings and add `0.0.0.0/0` to the text area within the `Enable IP Filter for RESTful API`.

- Save the settings.

![image.png](@site/static/img/publish-live-stream/playlist/rest-api.png)

## Manage PlayList Programmatically

:::info
This section requires basic knowledge of terminal usage and Linux. You can also use some API clients, like Postman, etc., to call Rest APIs.
:::

- To create the playlist, we will use the same VoD URLs that we uploaded in the last section under `Get the VoD URL`

```
http://13.201.79.224:5080/live/streams/111716684850426702820750.mp4
http://13.201.79.224:5080/live/streams/618712696735204930650663.mp4
http://13.201.79.224:5080/live/streams/716674157649310868227159.mp4
```

### Passing the Variables

- Open a shell terminal in your Linux or Mac.

- Define your own values for variables below according to your server domain/IP or playlist streamId. `ITEM1`, `ITEM2` and `ITEM3` are VoD URL that we copied. You can copy and paste one line at a time.

```
export MY_ANT_MEDIA_SERVER=localhost
export MY_PLAYLIST_ID=myPlaylistId
export ITEM1=http://13.201.79.224:5080/live/streams/111716684850426702820750.mp4
export ITEM2=http://13.201.79.224:5080/live/streams/618712696735204930650663.mp4
export ITEM3=http://13.201.79.224:5080/live/streams/716674157649310868227159.mp4
```

### Creating the Playlist

Create a Playlist with the items above. Just Copy and Paste the below command.

```bash
curl -X 'POST' \
"http://${MY_ANT_MEDIA_SERVER}:5080/live/rest/v2/broadcasts/create" \
  -H 'Content-Type: application/json' \
  -d '{ 
          "streamId": "'"${MY_PLAYLIST_ID}"'", 
          "type": "playlist",
          "playListItemList": [
            {
              "streamUrl": "'"${ITEM1}"'",
              "type": "VoD"
            },
            {
              "streamUrl": "'"${ITEM2}"'",
              "type": "VoD"
            },
            {
              "streamUrl": "'"${ITEM3}"'",
              "type": "VoD"
            }
          ]
        }'
```

- Ant Media Server responds with a generated broadcast JSON object. If you don't give `streamId` in the request above, then Ant Media Server will generate a random `streamId`.

![image.png](@site/static/img/publish-live-stream/playlist/playlist-creation.png)

- Check that the playlist is also visible on the web panel, as shown below.

![image.png](@site/static/img/publish-live-stream/playlist/playlist-panel.png)

### Starting the Playlist

```bash
curl -X 'POST' "http://${MY_ANT_MEDIA_SERVER}:5080/live/rest/v2/broadcasts/${MY_PLAYLIST_ID}/start" 
```

![image.png](@site/static/img/publish-live-stream/playlist/playlist-start.png)

- Go back to web panel and check that the playlist state is changed to "Broadcasting"

![image.png](@site/static/img/publish-live-stream/playlist/running-playlist.png)

### Watching the Playlist

- Open a new tab in your browser and visit `http://{MY_ANT_MEDIA_SERVER}:5080/live/play.html?id={MY_PLAYLIST_ID}&playOrder=hls`

- Pay attention to the fact that we use HLS for playback because it provides better experience in playlists and there is no need to have ultra-low latency when playing with WebRTC as it is VoD streaming.

![image.png](@site/static/img/publish-live-stream/playlist/playing-playlist.png)

### Skip the item in the Playlist

To skip item in playback, you can make the below REST call.

```bash
curl -X 'POST' "http://${MY_ANT_MEDIA_SERVER}:5080/live/rest/v2/broadcasts/playlists/${MY_PLAYLIST_ID}/next" 
```

If you give index query parameter when skipping an item in the PlayList, it will skip to that item directly in the playlist.

You can add index query parameters by just appending a question mark to the URL as follows:

```bash
curl -X 'POST' "http://${MY_ANT_MEDIA_SERVER}:5080/live/rest/v2/broadcasts/playlists/${MY_PLAYLIST_ID}/next" ?index=0
```

- Check that the player has skipped the item. It may take about 10-15 seconds to see that the effect because HLS playback has this latency.

### Stop the Playlist

```bash
curl -X 'POST' "http://${MY_ANT_MEDIA_SERVER}:5080/live/rest/v2/broadcasts/${MY_PLAYLIST_ID}/stop"
```

Stay tuned for more new features to enhance the Playlist experience with Ant Media Server.
