---
title: Recording & S3 Issues
description: Troubleshoot missing MP4/HLS recordings, 404 Not Found errors when playing recorded files, and S3 upload problems in Ant Media Server.
keywords: [recording troubleshooting, MP4 recording, S3 upload, 404 not found, VOD, Ant Media Server Documentation]
sidebar_position: 6
---

# Recording & S3 Issues

This guide covers problems with stream recording (MP4, WebM, HLS) and S3-compatible storage integration.

## Recording file was not created

**Symptom:** The stream was live, but no MP4/WebM file appears in the VoD list or on disk.

**Check:**

1. Confirm recording is actually enabled for the application (Settings > *Record Live Streams as MP4*), or that recording was started for the specific stream via the REST API or Web Panel. See [MP4 and WebM recording](/guides/recording-live-streams/mp4-and-webm-recording/).
2. In Community Edition, only **HLS and MP4** recording is available; WebM requires Enterprise Edition.
3. Check `ant-media-server.log` for muxer errors around the time the stream ended.
4. Check free disk space — recording fails silently on a full disk:

```shell
df -h /usr/local/antmedia
```

**Resolution:** Enable the relevant recording setting, free up disk space, or start the recording explicitly via the REST API (`PUT /{app}/rest/v2/broadcasts/{id}/recording/true`).

## 404 Not Found when playing a recorded file

**Symptom:** The recording exists (it is visible in the VoD list or in your S3 bucket) but playing it through the server URL returns **404 Not Found**.

**Check:** If S3 recording is enabled, files are **moved to the bucket and removed from local storage** after upload. The usual local URL (`https://AMS:5443/{app}/streams/file.mp4`) then no longer resolves.

**Resolution:** Enable **HTTP Forwarding** so the server transparently redirects those requests to the bucket. In Application Settings > Advanced Settings, set:

```properties
httpForwardingExtension=mp4,m3u8,png
httpForwardingBaseURL=https://your-bucket-url
```

Note that both values must have no leading/trailing spaces and the base URL must not have a trailing slash. Full details, including the correct bucket URL format per provider, are in the [HTTP forwarding guide](/guides/recording-live-streams/http-forwarding/).

## Files are not uploaded to S3

**Symptom:** S3 recording is enabled but files stay on local disk, or disappear without arriving in the bucket.

**Check:**

1. Look for S3 client errors in `ant-media-server.log` (wrong credentials, wrong region, missing permissions produce clear exceptions there).
2. Verify the access key, secret key, region, and bucket name in the application's S3 settings.
3. Verify the IAM policy allows `s3:PutObject` on the bucket.
4. For S3-compatible providers (MinIO, DigitalOcean Spaces, Wasabi, OVH, Cloudflare R2), the endpoint URL must be set explicitly — see the provider-specific guides under [S3 recording and integration](/guides/recording-live-streams/s3-recording-and-integration/aws-s3/).

**Resolution:** Fix the failing item reported in the log. After changing S3 settings, publish a short test stream and confirm the file lands in the bucket.

## HLS files disappear after the stream ends

**Symptom:** HLS playback works during the stream, but `.m3u8`/`.ts` files are gone afterwards.

**Check:** By default, HLS files are deleted when the stream ends. Persisting them requires enabling HLS recording.

**Resolution:** Follow the [HLS recording guide](/guides/recording-live-streams/hls-recording/) to keep HLS segments after the stream ends.

## Recording plays but has no video or audio

**Symptom:** The MP4 file plays but one track is missing.

**Check:** The published stream's codecs must be compatible with the MP4 container. Streams published with unsupported codec combinations produce partial recordings. Check the codec of the source stream in the Web Panel stream details.

**Resolution:** Publish with H.264 video and AAC audio for maximum container compatibility, or enable transcoding so the server produces compatible tracks. See [video codecs](/guides/configuration-and-testing/video-codecs/).

## Related documentation

- [MP4 and WebM recording](/guides/recording-live-streams/mp4-and-webm-recording/)
- [Playing recorded files](/guides/recording-live-streams/playing-recorded-files/)
- [Periodic stream recording](/guides/recording-live-streams/periodic-stream-recording/)
- [User-defined scripts](/guides/recording-live-streams/user-defined-scripts/) — run custom logic when a recording finishes
