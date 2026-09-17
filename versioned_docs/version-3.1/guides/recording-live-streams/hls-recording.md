---
title: HLS Recording
description: Recording live streams in HLS format
keywords: [Recording live streams, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---

# HLS Recording

Alongside MP4 and WebM, Ant Media Server can also retain a live stream's HLS segments as its recording format — useful if you'd rather keep the same `.m3u8`/`.ts` files viewers were served live, instead of muxing a separate MP4.

By the end of this guide, you'll have HLS recording enabled and configured for how long files are retained, and know your options for pushing those files to a remote endpoint or S3-compatible bucket in real time.

To enable HLS recording for your live streams and store all the HLS `m3u8` and `.ts` files, log in to your AMS Web Panel.

Navigate to `Applications` -> `live` -> `Settings` -> `Advanced`, and configure the setting below:

![](@site/static/img/live-setting.png)

By default, only a certain number of TS files corresponding to segments are retained in the streams directory at any given time. However, by configuring the HLS playlist type to `event`, the server continuously generates TS files, allowing for permanent storage if desired.

```js
 "hlsPlayListType":"event",
```
    
To store HLS files permanently after the stream is ended:

```js
"deleteHLSFilesOnEnded":false
```
To avoid overwriting old HLS files when reusing the same stream ID, set the `append_list` attribute in the `hlsflags` property.

For example, if you streamed with ID `teststream` and the last generated file was `teststream000001013.ts`, restarting the same stream without `append_list` would reset numbering from `0` and overwrite existing `.ts` files.

When you set it to `append_list`, the first generated `.ts` file is named `teststream000001014.ts`, so your existing `.ts` files stay intact and aren't overwritten.

```js
"hlsflags":"+append_list",
```

If you don't want the TS files to be appended to the previous recording, you may also enable date and timestamp for HLS files by adding the following property which adds date/time to TS file names, so you can distinguish recordings even when using the same stream ID again:

```js
 "addDateTimeToHlsFileName":true,
```

![](@site/static/img/hls_datetime.png)

After making the changes, scroll down and save the settings. Your streams will now be recorded as HLS.

You also have two options for getting those HLS files off the server in real time, instead of waiting for standard [Cloud Storage Integration](/category/s3-recording-and-integration) to upload the whole recording once the stream ends: pushing to any HTTP endpoint, or uploading directly to an S3-compatible bucket as segments are generated.

## Pushing HLS Files to a Remote Endpoint in Real Time

The HLS HTTP Endpoint feature pushes HLS `.m3u8`/`.ts` files to any HTTP endpoint — a CDN, an S3 bucket, or your own server — as they're generated, rather than waiting for the stream to finish.

1. Open the AMS Management Panel, go to the application's settings, and switch to Advanced Settings.
2. Set the following property to your own HTTP endpoint:

   ```js
   hlsHttpEndpoint=https://example.com/hls-stream/
   ```

3. Save to apply the settings.

Once a stream with ID `stream123` publishes, AMS pushes files to that endpoint with the PUT method:

```
https://example.com/hls-stream/stream123.m3u8
https://example.com/hls-stream/stream123_360p800kbps0001.ts
https://example.com/hls-stream/stream123_360p800kbps0002.ts
https://example.com/hls-stream/stream123_360p800kbps0003.ts
```

### Uploading HLS Files to S3 in Real Time

If you'd rather push segments straight to an S3-compatible bucket (AWS, OVH, DigitalOcean, etc.) as they're generated — instead of waiting for the standard upload-on-finish behavior — use the `HLS Upload` servlet. First enter your S3 credentials into the management console as described in [Cloud Storage Integration](/category/s3-recording-and-integration), then point `hlsHttpEndpoint` at AMS's own upload servlet instead of an external URL:

```js
hlsHttpEndpoint=http://<DOMAIN_NAME>:5080/<APP_NAME>/hls-upload
```

For testing on the same machine, `<DOMAIN_NAME>` can be `127.0.0.1`.

You now have HLS recording enabled, with retention and real-time delivery options available if you need them.

## Need Help?

If HLS files aren't being retained or pushed as expected, confirm HLS muxing is enabled and double-check the `hlsHttpEndpoint` URL for typos, then reach out on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or contact [Technical Support](mailto:support@antmedia.io).

