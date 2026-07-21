---
title: Conference Sample Application
description: Explore Ant Media Server conferencing in action using the built-in sample conference application and the REST API.
keywords: [Conference sample, conference.html, Ant Media video conference, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

# Conference Sample Application

Before starting, make sure you are familiar with the [conference structure concepts](/guides/conference/ams-conference-structure/): the conference room is a **main track broadcast** and each participant is a **sub track broadcast**.

Now that we've covered the fundamental concepts of conferencing, let's take a look at video conferencing in action via sample Conference application on AMS.

By default, there is a sample conference application page available in all applications of AMS. Here is the URL format:

```https://{ams-url}:5443/{appName}/conference.html```

Example:

```https://test.antmedia.io:5443/live/conference.html```

**Step 1:** Type a roomId and click on ```Join Room```.

![](@site/static/img/conference/video-conference/video-conference-1.png)

After joining the room, two broadcasts will be created on the server.

1- Room Broadcast (Main track)

2- Participant Broadcast (Sub track of room broadcast)

Observe that both broadcasts are created on a web panel.

![](@site/static/img/conference/video-conference/video-conference-2.png)

**Step 2:** Now send a [GET request](https://antmedia.io/rest/#/default/getBroadcast) to Ant Media Server with main track broadcast streamId to retrieve broadcast object.

```https://{ams-url}:5443/{app-name}/rest/v2/broadcasts/{room-streamId}```

**Example:** ```https://test.antmedia.io:5443/live/rest/v2/broadcasts/room1```

This will return the broadcast object.

Observe that ```subTrackStreamIds``` field contains our participants streamIds.

![](@site/static/img/conference/video-conference/video-conference-3.png)

Next, we will do the same for participant broadcast.

**Step 3:** Send a [GET request](https://antmedia.io/rest/#/default/getBroadcast) to Ant Media Server with sub track broadcast streamId to retrieve broadcast object.

```https://{ams-url}:5443/{app-name}/rest/v2/broadcasts/{participant-stream-id}```

**Example:**
```https://test.antmedia.io:5443/live/rest/v2/broadcasts/idiTofPCrEx4```

Observe that mainTrackId is set to our rooms id.

![](@site/static/img/conference/video-conference/video-conference-4.png)
