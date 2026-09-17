---
title: HLS Playback
description: This documentation guide will help you achieve HLS playing and save HLS records to your servers.
keywords: [HLS Playback, HLS Playback with Ant Media Server, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 4
---

# HLS Playback

HLS playback is available in both the Community and Enterprise Editions of Ant Media Server. Prior to initiating playback of a stream, ensure that the stream is actively broadcasting on the server — see [Publish Live Streams](/category/publish-live-streams/) if you haven't started one yet.

By the end of this guide, you'll be playing a live stream back with HLS, and know how to tune segment settings, subfolders, and time-interval playback.

## Enable HLS

Ensure that HLS muxing is enabled in your application settings. You can verify this by selecting the ```Create HLS Streaming```checkbox within the application's settings on the web management panel. 

HLS is enabled by default.

![](@site/static/img/playing-live-streams/hls-playing/hls-enabled.png)

### Enable HLS at the Broadcast Level

To enhance the HLS (HTTP Live Streaming) feature, you can now pass HLS parameters (`hlsTime`, `hlsListSize`, `hlsPlayListType`) while creating a live stream. This allows for more granular control over your HLS streams directly during the creation process.
-   `hlsTime`: Sets the target duration of each segment in seconds.
-   `hlsListSize`: Defines the number of segments in the playlist.
-   `hlsPlayListType`: Specifies the playlist type (`event` or `vod`).

Example:

Here’s an example of how to pass these parameters in a `POST` request to create a live stream with specific HLS settings:

```bash
curl -X POST -H "Accept: Application/json" -H "Content-Type: application/json" http://<DOMAIN_NAME>:5080/<APP_NAME>/rest/v2/broadcasts/create -d '{"streamId":"test1","name":"test1s","type":"liveStream","hlsParameters":{"hlsTime":"4","hlsListSize":"7","hlsPlayListType":"event"}}'
```

-   `hlsTime` is set to `4`, meaning each segment will be 4 seconds long.
-   `hlsListSize` is set to `7`, meaning the playlist will contain 7 segments.
-   `hlsPlayListType` is set to `event`, indicating that the playlist type is an event playlist.

## Play HLS Streams with Embedded Player

You can use the [embedded player](/guides/playing-live-stream/embedded-web-player/) to play HLS streams without writing any player code yourself. Pass `streamId` as `id` and `hls` as `playOrder` in the `play.html` URL:

```
https://<DOMAIN_NAME>:5443/<APP_NAME>/play.html?id=<STREAM_ID>&playOrder=hls
```

The HLS playback starts automatically once the stream is live.

![](@site/static/img/playing-live-streams/hls-playing/hls-started.png)

Autoplay is enabled by default, but Chrome and Firefox autoplay policies can block it, so a viewer may need to click the player once to start it. See the [Chrome](https://developers.google.com/web/updates/2017/09/autoplay-policy-changes) and [Firefox](https://hacks.mozilla.org/2019/02/firefox-66-to-block-automatically-playing-audible-video-and-audio/) policy pages for details.

## Playing HLS Streams Directly via M3U8

If you're building your own player instead of using the embedded one, point it straight at the `.m3u8` playlist. Assuming HLS muxing is enabled and the stream is publishing, the default URL is:

```
https://<DOMAIN_NAME>:5443/<APP_NAME>/streams/<STREAM_ID>.m3u8
```

If adaptive bitrate is enabled on the application (Enterprise Edition), use this instead:

```
https://<DOMAIN_NAME>:5443/<APP_NAME>/streams/<STREAM_ID>_adaptive.m3u8
```

:::info
Beginning with version 2.4.1, the filename includes the bitrate. For example, with 480p ABR enabled, the old filename `<STREAM_ID>_480p.m3u8` becomes `<STREAM_ID>_480p1000kbps.m3u8`, since the same resolution can now be encoded at multiple bitrates. If you need the old naming structure, see this [post](https://github.com/orgs/ant-media/discussions/4984).
:::

## HLS Play For a Given Time Interval

Using the HLS modifier, you can play back an HLS stream within a specific time window instead of from the live edge.

:::info
The HLS modifier feature is included by default on the server side, starting with version 2.9.0.
:::

Add `start` and `end` as query parameters on the `.m3u8` request, using Unix timestamps, to play back just that window:

```
https://<DOMAIN_NAME>:5443/<APP_NAME>/streams/<STREAM_ID>.m3u8?start=1668454888&end=1668454999
```

You can get timestamps matching your `.ts` files' dates via [Epoch Converter](https://www.epochconverter.com/).

### Configuration for HLS Manifest Modifier

Set the following in the application's Advanced Settings on the web panel:

- `"hlsflags":"+program_date_time"` — adds program date/time to the m3u8 file.
- `"hlsPlayListType":"event"` — keeps all `.ts` file references in the m3u8 file.
- `"deleteHLSFilesOnEnded":false` — keeps all `.ts` files on disk after the stream ends.

## Play HLS Streams with React Player

To play HLS streams with the [React Player](https://github.com/cookpete/react-player) component in React, configure it like this:

```jsx
<ReactPlayer
  url="https://<DOMAIN_NAME>:5443/<APP_NAME>/streams/<STREAM_ID>.m3u8"
  config={{
    file: {
      hlsOptions: {
        xhrSetup: function(xhr) {
          xhr.withCredentials = true // send cookies
        }
      }
    }
  }}
/>
```

Enabling `xhr.withCredentials` to send cookies is essential for accurate HLS viewer counts — without it, Ant Media Server may not be able to correctly determine the viewer count.

Special thanks to [@geneukum](https://github.com/geneukum) for this configuration contribution.

## Playing Streams from SubFolders

When creating or updating a stream via the REST API, you can specify a subfolder for the broadcast, and its HLS files are generated inside that folder instead of directly under the application's `streams` directory.

For example, creating a stream with streamId `teststream` and subfolder `mySubFolder` in the `live` application generates HLS files under `/usr/local/antmedia/webapps/live/streams/mySubFolder`:

```bash
curl -X 'POST' 'https://<DOMAIN_NAME>:5443/<APP_NAME>/rest/v2/broadcasts/create' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "streamId":"teststream",
    "subFolder": "mySubFolder"
}'
```

You can also nest the subfolder under the stream ID itself. Naming the subfolder `teststream/mySubFolder` instead generates files under `/usr/local/antmedia/webapps/live/streams/teststream/mySubFolder`:

```bash
curl -X 'POST' 'https://<DOMAIN_NAME>:5443/<APP_NAME>/rest/v2/broadcasts/create' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "streamId":"teststream",
    "subFolder": "teststream/mySubFolder"
}'
```

Whichever pattern you use, play the stream back with `subFolderName/streamId` as the `id` parameter instead of just the stream ID:

- `subFolder: "mySubFolder"` → `https://<DOMAIN_NAME>:5443/<APP_NAME>/play.html?id=mySubFolder/teststream&playOrder=hls`
- `subFolder: "teststream/mySubFolder"` → `https://<DOMAIN_NAME>:5443/<APP_NAME>/play.html?id=teststream/mySubFolder/teststream&playOrder=hls`

To see how the folders and files are actually generated on disk, check `/usr/local/antmedia/webapps/<APP_NAME>/streams`.

## Interactive HLS Streaming with ID3 Timed Metadata

Using `ID3` tags in HLS, you can insert timed metadata — overlaying text, images, comments, emojis, ads, markers, and similar — at specific moments in the stream. This feature was introduced in Ant Media Server version 2.7.0.

### Enabling ID3 Tags

Enable `ID3` tags for the application first: set `"id3TagEnabled": true` under the application's Advanced settings on the Ant Media Server Web Panel.

![](@site/static/img/playing-live-streams/hls-playing/enabling-id3.png)

### Adding ID3 Text

To insert an ID3 tag into a stream, call the [REST method](https://antmedia.io/rest/#/default/addID3Data) with your metadata and read that metadata back in your player.

```bash
curl -X 'POST' 'https://<DOMAIN_NAME>:5443/<APP_NAME>/rest/v2/broadcasts/<STREAM_ID>/id3' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '"string"'
```

Check out this [video tutorial](https://www.youtube.com/watch?v=Fq-a_tEXY4E&t=763s) for a walkthrough of ID3 tags in practice.

:::info
ID3 tags don't currently work with Ant Media Server's default player (`play.html`) — use this [Codepen sample](https://codepen.io/Burak-Kekec/pen/PoXYMyG) for testing instead.
:::

You're now playing a live stream back with HLS, with direct M3U8 access, time-interval playback, React integration, subfolders, and ID3 metadata all available if you need them.

## Need Help?

If the stream doesn't appear in the player or the m3u8 URL 404s, confirm HLS muxing is enabled and the stream is actually broadcasting, then reach out on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or contact [Technical Support](mailto:support@antmedia.io).
