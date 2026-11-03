---
title: RTSP Output
description: Play any stream published to Ant Media Server over RTSP with the RTSP Output Plugin — VLC, ffplay, GStreamer, and VMS software.
keywords: [RTSP output, RTSP playback, RTSP Output Plugin, MediaMTX, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 8
---

# RTSP Output

The [RTSP Output Plugin](https://github.com/ant-media/Plugins/tree/master/RtspOutPlugin) makes any stream published to Ant Media Server playable over RTSP. Players that already speak RTSP — VLC, ffplay, GStreamer `rtspsrc`, and most VMS software — can open the stream without a browser player.

RTSP has no adaptive bitrate. Each rendition is its own URL, named the same way recordings are:

```
rtsp://<SERVER>:8554/<APP_NAME>/<STREAM_ID>
rtsp://<SERVER>:8554/<APP_NAME>/<STREAM_ID>_480p
```

The first URL is the source, exactly as it was ingested. The second is one path per transcoded rendition.

By the end of this guide, you'll have the plugin installed and be playing a live stream over RTSP.

:::info
Linux x86_64 only. The plugin ships a `linux_amd64` binary.
:::

## Requirements

- Ant Media Server already running, with a stream publishing — see [Publish Live Streams](/category/publish-live-streams/) if you haven't started one yet.
- The RTSP Output Plugin release zip.
- These ports free on the server, and open to the players that need them:

| Port | Protocol | Used for |
| --- | --- | --- |
| `8554` | TCP | RTSP signalling, and the media when the client uses TCP interleaved |
| `8000` | UDP | RTP, the media for clients that use UDP |
| `8001` | UDP | RTCP for those UDP clients |

TCP playback needs only `8554`. UDP playback needs all three. A client that cannot reach `8000` and `8001` connects and then plays nothing. If any of the three ports is already in use, the plugin does not start.

## Install the Plugin

Unzip the release and run the installer as root:

```bash
unzip RtspOutPlugin-release.zip
sudo ./RTSP-Out-Plugin/install-rtsp-out-plugin.sh
```

The installer stops the server, places `RtspOutPlugin.jar`, the `antmedia-mediamtx` binary, and its licence in `/usr/local/antmedia/plugins`, then starts the server again. Nothing is written outside that directory. Ant Media Server only loads `.jar` and `.zip` files from `plugins`, so the extensionless binary next to the jar is ignored by everything except the plugin.

If the server is not installed in `/usr/local/antmedia`, or the service is not named `antmedia`:

```bash
sudo AMS_DIR=/opt/antmedia SERVICE_NAME=antmedia ./RTSP-Out-Plugin/install-rtsp-out-plugin.sh
```

To uninstall, remove those three files from `/usr/local/antmedia/plugins` and restart the server.

## Play the Stream

```bash
ffplay -rtsp_transport tcp rtsp://<SERVER>:8554/<APP_NAME>/<STREAM_ID>
ffplay -rtsp_transport udp rtsp://<SERVER>:8554/<APP_NAME>/<STREAM_ID>
```

FFmpeg-based players buffer everything they read while they wait for the first keyframe, then play from the front of that buffer, so the wait becomes permanent lag. For low-latency playback, add these flags:

```bash
ffplay -fflags nobuffer -flags low_delay -analyzeduration 300000 -probesize 200000 -framedrop -rtsp_transport tcp rtsp://<SERVER>:8554/<APP_NAME>/<STREAM_ID>
```

On a live server, that is the difference between roughly 2 seconds and roughly 0.2 seconds of lag.

## How It Works

The plugin registers an `RtspMuxer` on the stream's `MuxAdaptor`. It uses the FFmpeg already bundled with Ant Media Server to publish into a local [MediaMTX](https://github.com/bluenviron/mediamtx) process over RTSP `ANNOUNCE`. MediaMTX is what the players connect to.

```
ingest -> MuxAdaptor -> RtspMuxer -> MediaMTX :8554 -> RTSP clients
```

One MediaMTX process runs per server. The plugin supervises it and turns everything except RTSP off. Its config is written to a private temp directory, never the server's `conf`. Every application shares that process, and paths are `<APP_NAME>/<STREAM_ID>`, so two applications can use the same stream ID. Undeploying an application closes only its own endpoints. The process stops when the server does.

Each rendition costs one FFmpeg RTSP context and one path, whether anyone is watching or not, so keep the transcoding ladder to the renditions you actually need. Readers are cheap: about 0.3% of a core and 200 KB each, measured with 20 of them.

The plugin looks for `antmedia-mediamtx` next to the plugin jar first (where the installer puts it), then in `/usr/local/bin`, then on `PATH`. It is the stock MediaMTX binary under that name, so you can recognise it in `ps`. The plugin ships MediaMTX v1.20.1, MIT licensed.

## Settings

Set these under `plugin.rtsp-out` in the application's custom settings:

| Key | Default | Meaning |
| --- | --- | --- |
| `enabled` | `true` | Master switch for this application |
| `enabledByDefault` | `true` | Default for streams that have no REST override |
| `authEnabled` | `true` | Run the application's play security on every RTSP reader |

`enabled` applies to the next published stream. No restart is required, and streams that are already running keep their endpoints. `authEnabled` needs a server restart, because it changes the config the process starts with.

## REST API

Base path: `/<APP_NAME>/rest/rtsp-out`.

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/status` | Plugin and RTSP process state |
| `POST` | `/disable/{streamId}` | Turn RTSP output off for one stream |
| `POST` | `/enable/{streamId}` | Turn RTSP output on for one stream |

`enable` and `disable` write a per-stream override that beats `enabledByDefault` in both directions and survives a stream restart. Both return the usual `{"success":..., "message":...}` JSON.

`GET /status` looks like this:

```json
{
  "app": "LiveApp",
  "enabled": true,
  "enabledByDefault": true,
  "rtspPort": 8554,
  "streamOverrides": { "test_2": false },
  "activeStreams": { "test_1": ["test_1", "test_1_360p"] },
  "mediamtxBinary": "/usr/local/antmedia/plugins/antmedia-mediamtx",
  "mediamtxRunning": true,
  "mediamtxListening": true,
  "mediamtxGeneration": 1,
  "mediamtxGaveUp": false
}
```

`activeStreams` maps a stream ID to the paths it has. Fewer paths than you expect means one is still being retried, or was given up on. `mediamtxGeneration` counts process starts, so it goes up on every crash and restart. `mediamtxGaveUp` means the supervisor stopped restarting it.

## Security

RTSP readers go through the same play checks HLS uses: play token, hash, JWT, TOTP subscriber, and blocked subscribers. A token that plays over HLS plays over RTSP. There is no second set of keys.

Put the credentials on the URL query, under the same names. Quote the URL — `&` and `?` are shell characters:

```bash
ffplay -rtsp_transport tcp 'rtsp://<SERVER>:8554/<APP_NAME>/<STREAM_ID>?token=<TOKEN>'
ffplay -rtsp_transport tcp 'rtsp://<SERVER>:8554/<APP_NAME>/<STREAM_ID>?subscriberId=<ID>&subscriberCode=<TOTP>'
```

Players that cannot pass a query string can send the token as the RTSP password and the subscriber ID as the user. FFmpeg-based clients truncate `user:pass` at 127 characters, so a play token or a hash fits and a JWT does not:

```bash
ffplay -rtsp_transport tcp 'rtsp://<SUBSCRIBER_ID>:<TOKEN>@<SERVER>:8554/<APP_NAME>/<STREAM_ID>'
```

Where RTSP differs from HLS:

- A one-time play token is single use, plus a 60 second window for the same client address. RTSP authorizes a reader twice, on `DESCRIBE` and on `SETUP`, and only the credential ties the two together.
- `hlsViewerLimit` is not enforced, and there is no IP filtering.
- One token covers a stream and all of its renditions.
- `authEnabled: false` opens playback to anyone who can reach port `8554`. Publishing stays restricted to the server itself either way.

## Codecs

The plugin carries whatever Ant Media Server ingests, as long as RTP can carry it:

| | |
| --- | --- |
| Video | H.264, H.265, VP8, MPEG-4 Part 2, MPEG-2, MPEG-1, MJPEG |
| Audio | AAC, Opus, MP3, Vorbis, G.711 µ-law, G.711 A-law, G.722, G.726 |

VP9 and AV1 are not supported. FFmpeg will not packetize either into RTP outside experimental mode. AC-3 is not supported either — MediaMTX rejects it. A stream in one of those codecs gets no RTSP endpoint and keeps working for every other playback method.

## Recovering from Errors

Each application rechecks its published streams every 2 seconds and rebuilds what is missing, so an endpoint that could not be opened is not lost. Streams wait while MediaMTX is down and are republished when it restarts. A publish connection that breaks under a running stream is rebuilt.

An endpoint that keeps failing while MediaMTX is up gets 10 tries. After that, that one path is given up on and logged — usually a rendition the transcoder never produced, or a codec it rejects. The rest of the stream is unaffected, and a restart clears the count.

If the process itself dies immediately 5 times in a row, usually because of a port conflict, the supervisor stops. `GET /status` then reports `mediamtxGaveUp: true`.

## Troubleshooting

Start with `GET /<APP_NAME>/rest/rtsp-out/status`. It answers most of these.

| Symptom | Usual cause |
| --- | --- |
| Nothing plays, and `mediamtxGaveUp` is true | One of ports `8554`, `8000`, or `8001` is taken. Free it and restart the server. |
| One stream has no endpoint | It is disabled. Check `enabled`, `enabledByDefault`, and `streamOverrides`. |
| A rendition is missing | The transcoder never produced that rung. The log says `Giving up on RTSP endpoint ...`. |
| Connects, then plays nothing | UDP `8000` and `8001` are blocked. Add `-rtsp_transport tcp` to confirm. |
| Audio plays, video does not | The log warns `bound audio only`. That is a bug — open an issue on the plugin repository. |
| Every reader is refused | Play security is on. See [Security](#security). |
| Plays everywhere except this stream | Its codec is not in the [codec list](#codecs). |
| About 2 seconds of lag | Client-side buffering. See [Play the Stream](#play-the-stream). |

## Limits

- **No cluster support.** Every node runs its own instance, and only the origin holds the stream, so an RTSP URL has to point at the origin.
- **No viewer limits or stats.** The auth callback sees a reader connect but never leave, so a count kept from it would only grow.

## Need Help?

If playback connects and then stays black, confirm ports `8554`, `8000`, and `8001` with `GET /<APP_NAME>/rest/rtsp-out/status`, then try TCP (`-rtsp_transport tcp`). For anything still stuck, reach out on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or contact [Technical Support](mailto:support@antmedia.io).
