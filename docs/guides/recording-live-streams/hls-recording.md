---
title: HLS Recording 
description: Recording live streams in HLS format
keywords: [Recording live streams, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

# HLS Recording

HLS streaming is a more cost-effective and secure method of streaming than video-on-demand assets. Furthermore, you can also record your live streams with HLS.

To enable HLS recording for your live streams and store all the HLS `m3u8 and ts` files, just log in to your AMS Web Panel.

Navigate to `Applications` -> `live` -> `Setting` -> `Advanced`, and configure the setting below:

![](@site/static/img/live-setting.png)

By default, only a certain number of TS files corresponding to segments are retained in the streams directory at any given time. However, by configuring the HLS playlist type to `event`, the server continuously generates TS files, allowing for permanent storage if desired.

```js
 "hlsPlayListType":"event",
```
    
To store HLS files permanently after the stream is ended:

```js
"deleteHLSFilesOnEnded":false
```
    
To prevent overwriting of old HLS files in case the same streamId is used again, use the `append_list` attribute in `hlsflags` property.

Imagine you've completed streaming with an ID `teststream` and your last generated TS file is `teststream000001013.ts.` Without adding `append_list` to the HLS flags, restarting the `teststream` will initiate TS file generation from 0, overwriting existing `.ts` files. 

However, by setting it to `append_list` the first generated .ts file will be named `teststream000001014.ts` ensuring that your .ts files remain intact without being overridden.

```js
"hlsflags":"+append_list",
```

If you don't want the TS files to be appended to the previous recording, you may also enable date and timestamp for HLS files by adding the following property:.

```js
 "addDateTimeToHlsFileName":true,
```

![](@site/static/img/hls_datetime.png)

After making the changes, you can scroll down and save the settings. Now, your streams will be recorded as HLS.

Additionally, it's also possible to push HLS files directly to a remote endpoint without generating them on the local server in real-time, or alternatively, upload them via the standard procedure to an S3 bucket once the stream has finished.

## Record HLS files to Cloud Storage

Before uploading files to S3 or any other cloud storage in real time, let us first learn about the HTTP Endpoint.

### HLS HTTP Endpoint

HLS HTTP Endpoint is implemented to push the HLS `m3u8 and ts` files to any HTTP endpoint, such as CDN, S3 bucket, or your own HTTP endpoint. You can enable it with the following steps:

- Open the management panel of your AMS. Go to the Application settings and switch to Advanced settings.

- Find and edit the following property:

   ```js
   hlsHttpEndpoint=https://example.com/hls-stream/
   ```

   Kindly make sure to update the HTTP URL with your own. 

- Save to apply the settings.

After that, just push a stream to Ant Media Server with test streamId `stream123`, and AMS will push the files to the following endpoints with the PUT method.

```
https://example.com/hls-stream/stream123.m3u8
https://example.com/hls-stream/stream123_360p800kbps0001.ts
https://example.com/hls-stream/stream123_360p800kbps0002.ts
https://example.com/hls-stream/stream123_360p800kbps0003.ts
https://example.com/hls-stream/stream123.m3u8
. . .
```

### Record HLS files to the S3 bucket

When you use standard S3 integration, your record will be uploaded as soon as the livestream is finished.

But if you want to upload your HLS files in real-time to the S3-compatible systems (AWS, OVH, Digital Ocean, etc.), you can use the `HLS Upload` servlet.

To be able to use the HLS Upload servlet first, you should enter S3 credentials into the management console as defined in s3 recording category. Then, you can use HLS HTTP Endpoint instructions with the following property:

- Open the management panel of your AMS, Go to the Application settings, and switch to Advanced settings.

- Locate the setting `hlsHttpEndpoint` and set it to:

  ```js
  hlsHttpEndpoint=http://Domain-or-IP:5080/live/hls-upload
  ```

  Here, live is the application name and you can replace it with your preferred application.

- It can also be set as:

  ```js
  hlsHttpEndpoint=http://127.0.0.1:5080/live/hls-upload
  ```
