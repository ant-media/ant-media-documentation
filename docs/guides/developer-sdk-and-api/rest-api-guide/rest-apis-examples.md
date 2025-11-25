---
title: REST API examples 
description: REST API examples
keywords: [REST API examples, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 5
---

# REST API examples

Here are some practical examples of how to consume the REST API on Ant Media Server. Replace placeholders with your actual configuration:

* `{domain}` : your server's accessible IP address or fully qualified domain name
* `{port}`: 5080 for HTTP, 5443 for HTTPS  
* `{applications}`: the name of your application in this guide, we use `live`

**Note:**

This guide assumes that your IP is included in the IP Filter as [mentioned here](https://antmedia.io/docs/guides/developer-sdk-and-api/rest-api-guide/securing-rest-apis/#ip-filter-for-the-web-panel).

Create Broadcast
------

Create a new live stream on the Ant Media Server:

```curl -X POST -H "Content-Type: application/json" "https://{domain:port}/live/rest/v2/broadcasts/create"```

For example, on localhost: 

```curl -X POST -H "Content-Type: application/json" "http://localhost:5080/live/rest/v2/broadcasts/create"``` 

Response:

```
{
  "streamId":"247807894779015096249123",
  "status":"created",
  "type":"liveStream",
  "name":null,
  "publish":true,
  "originAddress":"127.0.0.1",
  "rtmpURL":"rtmp://127.0.0.1/live/247807894779015096249123",
  "hlsViewerCount":0,
  "webRTCViewerCount":0,
  "rtmpViewerCount":0
}
```
You can see the full [Broadcast object in the REST Reference](https://antmedia.io/rest/)

### Create Broadcast with Pre-defined ```streamId```

Specify your own `streamId`:

```curl -X POST -H "Content-Type: application/json" "https://{domain:port}/live/rest/v2/broadcasts/create" -d '{"streamId":"{YOUR_STREAM_ID}"}'```

Example:

```curl -X POST -H "Content-Type: application/json" "http://localhost:5080/live/rest/v2/broadcasts/create" -d '{"streamId":"1234567", "name":"Test Stream"}'```. 

Response:

```
{"streamId":"1234567","status":"created","type":"liveStream","name":"Test Stream","description":null,"publish":true,"date":1605776884508,"plannedStartDate":0,"plannedEndDate":0,"duration":0,"endPointList":null,"publicStream":true,"is360":false,"listenerHookURL":null,"category":null,"ipAddr":null,"username":null,"password":null,"quality":null,"speed":0.0,"streamUrl":null,"originAdress":"127.0.0.1","mp4Enabled":0,"webMEnabled":0,"expireDurationMS":0,"rtmpURL":"rtmp://127.0.0.1/live/1234567","zombi":false,"pendingPacketSize":0,"hlsViewerCount":0,"webRTCViewerCount":0,"rtmpViewerCount":0,"startTime":0,"receivedBytes":0,"bitrate":0,"userAgent":"N/A","latitude":null,"longitude":null,"altitude":null,"mainTrackStreamId":null,"subTrackStreamIds":null,"absoluteStartTimeMs":0,"webRTCViewerLimit":-1,"hlsViewerLimit":-1}
```

### Create Stream Source Broadcasts

Stream sources allow Ant Media Server to pull external streams (RTSP, IP Camera, etc.):

```curl -X POST -H "Content-Type: application/json" "https://{domain:port}/live/rest/v2/broadcasts/create?autoStart=false" -d '{ "type":"streamSource", "streamUrl":"YOUR_STREAM_SOURCE_URL"}'```

Set `autoStart=true` to begin pulling immediately.

### Starting Stream Source

```curl -X POST -H "Content-Type: application/json" "https://{domain:port}/live/rest/v2/broadcasts/{streamId}/start"```

Read Broadcast
----

Query a broadcast by its streamId:

```curl -X GET "https://{domain:port}/live/rest/v2/broadcasts/{streamid}"```

Returns the broadcast object, or `404` if the streamId does not exist.

### Read Broadcast Statistics

Get viewer statistics for a broadcast:

```curl -X GET "https://{domain:port}/live/rest/v2/broadcasts/{streamid}/broadcast-statistics"```

Update Broadcast
------

Change the name of a broadcast:

```curl -X PUT -H "Content-Type: application/json" "https://{domain:port}/live/rest/v2/broadcasts/{streamid}" -d '{"name":"{streamname}"}'```

Response will indicate if the operation was successful.

Delete Broadcast
------

Delete a broadcast:

```curl -X DELETE https://{domain:port}/live/rest/v2/broadcasts/{streamId}```

This removes the broadcast from the server.

### REST API Reference

This document provides examples of common REST API calls. For a complete list of all REST methods, visit the [https://antmedia.io/rest/](https://antmedia.io/rest/)

Note:

On Windows Command Prompt, the body of requests should be escaped like this: 

```-d "{""name"":""{streamname}""}"```


## Congratulations!

You’ve successfully learned how to create, read, update, and delete broadcasts using the Ant Media Server REST API. By using these examples as a starting point, you can automate stream management, integrate with custom applications, and fully control your live streaming environment. Keep experimenting with the API, and soon you’ll be orchestrating multiple streams like a pro!
