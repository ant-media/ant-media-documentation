---
title: REST API examples 
description: REST API examples
keywords: [REST API examples, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 5
---

# REST API examples

Ant Media Server provides REST APIs to create, manage, and monitor live streams programmatically. In this guide, you'll learn how to perform the most common operations, including creating a broadcast, retrieving stream information, updating stream settings, and deleting broadcasts.

This document provides examples of common REST API calls. For a complete list of all REST methods, visit the [https://antmedia.io/rest/](https://antmedia.io/rest/).

All REST API endpoints follow a consistent URL structure. Throughout this guide, the examples use the following format:

```
https://{domain}:{port}/{appName}/rest/v2/
```
**where**:

* `{domain}` : your server's IP address or fully qualified domain name (FQDN).
* `{port}`: 5080 for HTTP, 5443 for HTTPS.
* `{appName}`: Your application name (for example, live), in this guide; we use `live`.

:::info

This guide assumes that your IP is included in the IP Filter as [mentioned here](https://antmedia.io/docs/guides/developer-sdk-and-api/rest-api-guide/securing-rest-apis/#ip-filter-for-the-web-panel).

:::

## Create Broadcast

Creating a broadcast registers a new live stream in Ant Media Server. The server generates a unique `streamId`, which is used when publishing and playing the stream.

```bash
curl -X POST -H "Content-Type: application/json" "https://{domain}:{port}/{appName}/rest/v2/broadcasts/create"
```

For example, on localhost: 

```bash
curl -X POST -H "Content-Type: application/json" "http://localhost:5080/live/rest/v2/broadcasts/create"
``` 

Response:

```js
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

You can see the full [Broadcast object in the REST Reference](https://antmedia.io/rest/#/default/createBroadcast).

### Create a Broadcast with Custom StreamId

By default, Ant Media Server automatically generates a unique `streamId` for every new broadcast. If your application requires predictable or meaningful stream identifiers, you can specify your own streamId when creating the broadcast. This is useful when integrating with external systems, maintaining consistent stream names, or allowing publishers to use predefined stream IDs.

Specify your own `streamId` in the payload:

```bash
curl -X POST -H "Content-Type: application/json" https://{domain}:{port}/{appName}/rest/v2/broadcasts/create" -d '{"streamId":"{YOUR_STREAM_ID}"}'
```

Example:

```bash
curl -X POST -H "Content-Type: application/json" "http://localhost:5080/live/rest/v2/broadcasts/create" -d '{"streamId":"1234567", "name":"Test Stream"}'
```

Response:

```js
{"streamId":"1234567","status":"created","type":"liveStream","name":"Test Stream","description":null,"publish":true,"date":1605776884508,"plannedStartDate":0,"plannedEndDate":0,"duration":0,"endPointList":null,"publicStream":true,"is360":false,"listenerHookURL":null,"category":null,"ipAddr":null,"username":null,"password":null,"quality":null,"speed":0.0,"streamUrl":null,"originAdress":"127.0.0.1","mp4Enabled":0,"webMEnabled":0,"expireDurationMS":0,"rtmpURL":"rtmp://127.0.0.1/live/1234567","zombi":false,"pendingPacketSize":0,"hlsViewerCount":0,"webRTCViewerCount":0,"rtmpViewerCount":0,"startTime":0,"receivedBytes":0,"bitrate":0,"userAgent":"N/A","latitude":null,"longitude":null,"altitude":null,"mainTrackStreamId":null,"subTrackStreamIds":null,"absoluteStartTimeMs":0,"webRTCViewerLimit":-1,"hlsViewerLimit":-1}
```

### Create Stream Source Broadcasts

Unlike a regular broadcast where publishers push media to Ant Media Server, a Stream Source instructs the server to pull media from another source such as RTSP, HLS, or another network stream.

```bash
curl -X POST -H "Content-Type: application/json" "https://{domain}:{port}/{appName}/rest/v2/broadcasts/create?autoStart=false" -d '{ "type":"streamSource", "streamUrl":"YOUR_STREAM_SOURCE_URL"}'
```

Set `autoStart=true` to begin pulling immediately.

### Start a Stream Source

In case you want to start the Stream Source using API, check out the [Start API](https://antmedia.io/rest/#/default/startStreamSourceV2) call.

```bash
curl -X POST -H "Content-Type: application/json" "https://{domain}:{port}/{appName}/rest/v2/broadcasts/{streamId}/start"
```

## Read Broadcast

Retrieve information about an existing broadcast using its `streamId`.

```bash
curl -X GET "https://{domain}:{port}/{appName}/rest/v2/broadcasts/{streamid}"
```

Returns the broadcast object, or `404` if the `streamId` does not exist.

### Read Broadcast Statistics

Get viewer statistics for a broadcast:

```bash
curl -X GET "https://{domain}:{port}/{appName}/rest/v2/broadcasts/{streamid}/broadcast-statistics"
```

## Update Broadcast

Update one or more broadcast properties, such as the stream name or description.

```bash
curl -X PUT -H "Content-Type: application/json" "https://{domain}:{port}/{appName}/rest/v2/broadcasts/{streamid}" -d '{"name":"{streamname}"}'
```

Response will indicate if the operation was successful.

## Delete Broadcast

Delete a broadcast when it is no longer needed. This removes the broadcast configuration from Ant Media Server.

Delete a broadcast:

```bash
curl -X DELETE https://{domain}:{port}/{appName}/rest/v2/broadcasts/{streamId}
```

This removes the broadcast from the server.


:::info

On Windows Command Prompt, the body of requests should be escaped like this: ```-d "{""name"":""{streamname}""}"```

:::


## Congratulations!

You’ve successfully learned how to create, read, update, and delete broadcasts using the Ant Media Server REST API. By using these examples as a starting point, you can automate stream management, integrate with custom applications, and fully control your live streaming environment. Keep experimenting with the API, and soon you’ll be orchestrating multiple streams like a pro!
