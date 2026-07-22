---
title: Webhooks
description: Ant Media Server provides webhooks for letting your system/app know when certain events occur on the server.
keywords: [Ant Media Server Webhooks, Webhooks List for Ant Media Server, Custom Webhook for Streams, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---

# Using webhooks

Ant Media Server offers webhooks to notify your application when specific events occur on the server. By registering your URL with Ant Media Server, you can receive POST requests with certain JSON payloads when events such as the start, finish, or recording of a live stream take place.

First, we will cover the process of registering your backend URL as a webhook with Ant Media Server. Following that, we will provide references and details on how to use these webhooks effectively.
  
![](@site/static/img/68747470733a2f2f616e746d656469612e696f2f77702d636f6e74656e742f75706c6f6164732f323031382f31312f776562686f6f6b732d333030783237332e706e67.png)

### Register Your Webhook URL

You can add a default webhook URL to your streaming app on Ant Media Server. In addition, it lets you add custom-specific webhook urls in creating broadcasts.

#### Add default Webhook URL

To add the default Webhook URL, you just need to add/change the Webhook URL in your app settings as below:  
![](@site/static/img/ant-media-server-webhook-configuration.png)

Your Ant Media Server now has a default hook which is called when certain events happen (see below)

#### Add Custom Webhook for Streams

AMS allows you to specify a webhook URL per stream. Use the REST `createBroadcast` call, which accepts a Broadcast object containing a `listenerHookURL` field. [rest service.](https://github.com/ant-media/Ant-Media-Server/blob/master/src/main/java/io/antmedia/rest/BroadcastRestService.java)  `createBroadcast` method has Broadcast object parameter which has `listenerHookURL` field.

As a result,  you can set _listenerHookURL_ for creating a stream at Ant Media Server.

Here is a sample JSON for using _createBroadcast_ method with [Postman](https://www.getpostman.com/)

```js
    {
    	"variables": [],
    	"info": {
    		"name": "samples",
    		"_postman_id": "cbef37ab-d4ae-c349-4845-b4a91d1ab201",
    		"description": "",
    		"schema": "https://schema.getpostman.com/json/collection/v2.0.0/collection.json"
    	},
    	"item": [
    		{
    			"name": "http://localhost:5080/live/rest/broadcast/create",
    			"request": {
    				"url": "http://localhost:5080/live/rest/broadcast/create",
    				"method": "POST",
    				"header": [
    					{
    						"key": "Content-Type",
    						"value": "application/json",
    						"description": ""
    					}
    				],
    				"body": {
    					"mode": "raw",
    					"raw": "{\"name\":\"test_video\", \"listenerHookURL\":\"http://www.example.com/webhook\"}"
    				},
    				"description": "ListenerHookURL sample"
    			},
    			"response": []
    		}
    	]
    }
```

## Reliable Webhooks
Ant Media Server supports webhook reliability starting from version 2.8.3. When sending a POST request to the configured webhook URL, if the response is not HTTP OK (200) or if an exception, such as a socket connection timeout, occurs, AMS can automatically initiate multiple retry attempts.

Users have the flexibility to customize both the number of retry attempts and the delay between each attempt in milliseconds through the web panel's advanced application settings.

```js
"webhookRetryCount": 0,
"webhookRetryDelay": 1000
```

![](@site/static/img/reliable_webhook_app_settings.png)



## Webhooks List

Ant Media Server will send a POST request to your application server endpoint with a `Content-Type` of `application/json` in the body by default. If you prefer, you can change the webhook payload content type to `application/x-www-form-urlencoded` through the advanced application settings on the web panel by setting 

```json
"webhookContentType": "application/x-www-form-urlencoded"
```

### Available Webhooks: 
#### NOTE- Fields wrapped in {} are placeholders. These will be replaced with actual values by Ant Media Server at runtime.

1. **`liveStreamStarted`**
   - **Trigger**: Fired when a new live stream starts.
   - **Payload (JSON)**:
     ```json
     {
     "id": "{streamId}",
     "action": "liveStreamStarted",
     "streamName": "{streamName}",
     "category": "{category}",
     "metadata": "{metadata}",
     "timestamp": "{timestamp}"
     }
     ```

   - **Fields**:
     - `id`: The stream ID of the broadcast.
     - `action`: The action performed, in this case, "liveStreamStarted".
     - `streamName`: The name of the stream (can be null).
     - `category`: The category of the stream (can be null).
     - `metadata`: The metadata field of the broadcast object. If it's a JSON string metadata field will be a JSON object.
     - `timestamp`: The current server timestamp milliseconds as a string.

2. **`liveStreamEnded`**
   - **Trigger**: Fired when a live stream ends.
   - **Payload (JSON)**:
   ```json
	{
	"id": "{streamId}",
	"action": "liveStreamEnded",
	"streamName": "{streamName}",
	"category": "{category}",
	"metadata": "{metadata}",
	"timestamp": "{timestamp}"
	}
	```

- **Fields**:
     - `id`: The stream ID of the broadcast.
     - `action`: The action performed, in this case, "liveStreamEnded".
     - `streamName`: The name of the stream (can be null).
     - `category`: The category of the stream (can be null).
     - `metadata`: The metadata field of the broadcast object. If it's a JSON string metadata field will be a JSON object.
     - `timestamp`: The current server timestamp milliseconds as a string.


3. **`vodReady`**
   - **Trigger**: Fired when the recording of a live stream is completed.
   - **Payload (JSON)**:
    ```json
     {
       "id": "{stream_id}",
       "app": "{app_name}",
       "duration": "(duration)",
       "action": "vodReady",
       "vodName": "{vod_file_name}",
       "vodId": "{vod_id}",
       "metadata":"(metadata_of_broadcast)",
       "timestamp": "{1725578684839}"
     }
     ```


   - **Fields**:
     - `id`: The stream ID of the broadcast.
     - `action`: The action performed, in this case, "vodReady".
     - `vodName`: The name of the VOD file.
     - `vodId`: The ID of the VOD in the data store.
     - `metadata`: The metadata field of the broadcast object. If it's a JSON string metadata field will be a JSON object.
     - `timestamp`: The current server timestamp milliseconds as a string.


4. **`endpointFailed`**
   - **Trigger**: Fired when an RTMP endpoint broadcast fails.
   - **Payload (JSON)**:


     ```json
     {
       "id": "{stream_id}",
       "action": "endpointFailed",
       "streamName": "{stream_name}",
       "category": "{stream_category}",
       "metadata": "{rtmp_url}",
       "timestamp": "{1725578684839}"
     }
     ```


   - **Fields**:
     - `id`: The stream ID of the broadcast.
     - `action`: The action performed, in this case, "endpointFailed".
     - `streamName`: The name of the stream (can be null).
     - `category`: The category of the stream (can be null).
     - `metadata`: The RTMP URL of the endpoint.
     - `timestamp`: The current server timestamp milliseconds as a string.


5. **`publishTimeoutError`**
   - **Trigger**: Fired when there is a publish timeout error, indicating that the server is not receiving any frames.
   - **Payload (JSON)**:
    ```json
     {
       "id": "{stream_id}",
       "action": "publishTimeoutError",
       "streamName": "{stream_name}",
       "category": "{stream_category}",
       "metadata": "{subscriberId:'subscriber_id'}",
       "timestamp": "{1725578684839}"
     }
     ```

- **Fields**:
     - `id`: The stream ID of the broadcast.
     - `action`: The action performed, in this case, "publishTimeoutError".
     - `streamName`: The name of the stream (can be null).
     - `category`: The category of the stream (can be null).
     - `metadata`: JSON object which contains subscriber id.
     - `timestamp`: The current server timestamp milliseconds as a string.


6. **`encoderNotOpenedError`**
   - **Trigger**: Fired when the encoder cannot be opened.
   - **Payload (JSON)**:
    ```json
     {
	"id": "{stream_id}",
	"action": "encoderNotOpenedError",
	"streamName": "{stream_name}",
	"category": "{stream_category}",
	"metadata":"{metadata_of_broadcast}",
	"timestamp": "{1725578684839}"
     }
     ```

   - **Fields**:
     - `id`: The stream ID of the broadcast.
     - `action`: The action performed, in this case, "encoderNotOpenedError".
     - `streamName`: The name of the stream (can be null).
     - `metadata`: The metadata field of the broadcast object. If it's a JSON string metadata field will be a JSON object.
     - `timestamp`: The current server timestamp milliseconds as a string.


7. **`playStopped`**
	- **Trigger**: Fired when a webrtc player stops playing a stream.
	- **Payload (JSON)**:
    ```json
	{
	"id": "{stream_id}",
	"action": "playStopped",
	"streamName": "{stream_name}",
	"category": "{stream_category}",
	"subscriberId": "{subscriber_id}",
	"timestamp": "{1725578684839}"
	}
	```

- **Fields**:
	- `id`: The stream ID of the broadcast.
	- `action`: The action performed, in this case, "playStopped".
	- `streamName`: The name of the stream (can be null).
	- `category`: The category of the stream (can be null).
	- `subscriberId`: Subscriber id of the webrtc player. You can pass subscriber id to .publish() and .play() methods in all SDKs.
	- `timestamp`: The current server timestamp milliseconds as a string.


8. **`playStarted`**
	- **Trigger**: Fired when a webrtc player starts playing a stream.
	- **Payload (JSON)**:
    ```json
	{
	"id": "{stream_id}",
	"action": "playStarted",
	"streamName": "{stream_name}",
	"category": "{stream_category}",
	"subscriberId": "{subscriber_id}",
	"timestamp": "{1725578684839}"
	}
	```

- **Fields**:
	- `id`: The stream ID of the broadcast.
	- `action`: The action performed, in this case, "playStarted".
	- `streamName`: The name of the stream (can be null).
	- `category`: The category of the stream (can be null).
	- `subscriberId`: Subscriber id of the webrtc player. You can pass subscriber id to .publish() and .play() methods in all SDKs.
	- `timestamp`: The current server timestamp milliseconds as a string.


9. **`subtrackAddedInTheMainTrack`**
	- **Trigger**: Fired when a sub-track has been created within the main track. In video conferencing applications, this event signifies that a new stream has been started within the room. e.g., The participant joined to the room
	- **Payload (JSON)**:
    ```json
	{
	"id": "{stream_id}",
	"action": "subtrackAddedInTheMainTrack",
	"streamName": "{stream_name}",
	"category": "{stream_category}",
	"subscriberId": "{subscriber_id}",
	"mainTrackId":"{main_track_id}",
	"timestamp": "{1725578684839}"
	}
	```

- **Fields**:
	- `id`: The stream ID of the subtrack broadcast.
	- `action`: The action performed, in this case, "subtrackAddedInTheMainTrack".
	- `streamName`: The name of the stream (can be null).
	- `category`: The category of the stream (can be null).
	- `subscriberId`: Subscriber id of the webrtc player. You can pass subscriber id to .publish() and .play() methods in all SDKs.
	- `mainTrackId`: The stream ID of the main track broadcast. In a conference context, this will be the stream id of the room.
	- `timestamp`: The current server timestamp milliseconds as a string.


10. **`subtrackLeftTheMainTrack`**
	- **Trigger**: Fired when a sub-track has left the main track. In video conferencing applications, this event signifies that a new stream has left the room. e.g., The participant left the room
	- **Payload (JSON)**:
    ```json
	{
	"id": "{stream_id}",
	"action": "subtrackLeftTheMainTrack",
	"streamName": "{stream_name}",
	"category": "{stream_category}",
	"subscriberId": "{subscriber_id}",
	"mainTrackId":"{main_track_id}",
	"timestamp": "{1725578684839}"
	}
	```

- **Fields**:
	- `id`: The stream ID of the subtrack broadcast.
	- `action`: The action performed, in this case, "subtrackLeftTheMainTrack".
	- `streamName`: The name of the stream (can be null).
	- `category`: The category of the stream (can be null).
	- `subscriberId`: Subscriber id of the webrtc player. You can pass subscriber id to .publish() and .play() methods in all SDKs.
	- `mainTrackId`: The stream ID of the main track broadcast. In a conference context, this will be the stream id of the room.
	- `timestamp`: The current server timestamp milliseconds as a string.


11. **`firstActiveTrackAddedInMainTrack`**
	- **Trigger**: Fired when the first active sub-track has been created in the main track. In video conferencing applications, this event signifies that the first stream started in the room. e.g., the first participant joined the room.
	- **Payload (JSON)**:
    ```json
	{
	"id": "{stream_id}",
	"action": "firstActiveTrackAddedInMainTrack",
	"streamName": "{stream_name}",
	"category": "{stream_category}",
	"subscriberId": "{subscriber_id}",
	"mainTrackId":"{main_track_id}",
	"timestamp": "{1725578684839}"
	}
	```

- **Fields**:
	- `id`: The stream ID of the subtrack broadcast.
	- `action`: The action performed, in this case, "firstActiveTrackAddedInMainTrack".
	- `streamName`: The name of the stream (can be null).
	- `category`: The category of the stream (can be null).
	- `subscriberId`: Subscriber id of the webrtc player. You can pass subscriber id to .publish() and .play() methods in all SDKs.
	- `mainTrackId`: The stream ID of the main track broadcast. In a conference context, this will be the stream id of the room.
	- `timestamp`: The current server timestamp milliseconds as a string.


12. **`noActiveSubtracksLeftInMainTrack`**
	- **Trigger**: Fired when there are no active sub-tracks left in the main track. In video conferencing applications, this event signifies that no stream is left in the room. e.g., Everybody left the room.
	- **Payload (JSON)**:
    ```json
	{
	"id": "{stream_id}",
	"action": "noActiveSubtracksLeftInMainTrack",
	"streamName": "{stream_name}",
	"category": "{stream_category}",
	"subscriberId": "{subscriber_id}",
	"mainTrackId":"{main_track_id}",
	"timestamp": "{1725578684839}"
	}
	```

- **Fields**:
	- `id`: The stream ID of the subtrack broadcast.
	- `action`: The action performed, in this case, "noActiveSubtracksLeftInMainTrack".
	- `streamName`: The name of the stream (can be null).
	- `category`: The category of the stream (can be null).
	- `subscriberId`: Subscriber id of the webrtc player. You can pass subscriber id to .publish() and .play() methods in all SDKs.
	- `mainTrackId`: The stream ID of the main track broadcast. In a conference context, this will be the stream id of the room.
	- `timestamp`: The current server timestamp milliseconds as a string.


That's it! You can read the `action` field from the POST request body and take appropriate actions on your application server. Be sure to respond with a 200 status code to acknowledge receipt of the POST request.

> **Attention:** Please process the POST request within your application as quickly as possible as the hooks are called within the event loop thread which will not wait for your application to complete complex tasks.

To secure streams using Webhook, refer to the [Webhook Authorization](https://antmedia.io/docs/guides/stream-security/webhook-stream-authorization/) document.

<br /><br />
---

<div align="center">
<h2> 🔔 WebHooks at Your Command! 🎯 </h2>
</div>

You’ve enabled **Webhooks**, meaning **AMS now notifies your app on every key stream event** — start, stop, VOD ready, and more — exactly how *you* set it up (default or per stream).  

Your system is now event-driven, responsive, and totally under your control! 🚀

