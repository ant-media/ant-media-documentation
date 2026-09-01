---

## title: MoQ (Media over QUIC)
description: MoQ (Media over QUIC) Streaming
keywords: [MoQ, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 9

# MoQ (Media over QUIC)

Media over QUIC (MoQ) is an emerging live streaming protocol built on QUIC and WebTransport. It delivers sub-second latency like WebRTC while scaling through a CDN relay like HLS, no plugins or native apps required.

:::info
MoQ is still an evolving IETF standard. The AMS MoQ plugin is based on **moq-lite**, a deployable subset of the spec. Treat this as early access and keep an eye on updates.

As of **September 1, 2026** the plugin supports **moq-transport draft-16**.
:::

---

## Requirements

- Ant Media Server **3.0.0** or later
- Linux x8664
- `sudo` access
- Chromium-based browser (Chrome, Edge, Brave) for playback. Safari is not supported and Firefox is unstable

---

## Installation

**1. Download and unzip the plugin**

[Download MoQPlugin-release.zip](https://drive.google.com/drive/folders/1Gjk1aHuCwXbOkEWIHsj_3ETcB7WTSUvv?usp=sharing) and upload it to your Ant Media Server, and then.

```bash
sudo unzip MoQPlugin-release.zip
cd MoQ-Plugin
```

**2. Install the plugin and relay binaries**

```bash
sudo chmod +x install-moq-plugin.sh
sudo ./install-moq-plugin.sh
```

**3. Copy the MoQ player pages to your AMS application**

```bash
sudo rm -rf /usr/local/antmedia/webapps/live/moq/*
sudo cp -r moq-ams-player-build /usr/local/antmedia/webapps/live/moq
```

Replace the whole directory instead of copying over it. Asset filenames are hashed, so old ones stick around and the browser can pick up a stale mix.

**4. Restart AMS**

```bash
sudo service antmedia restart
```

After the restart, the player and publisher pages are available at:

```
https://your-server:5443/live/moq/play.html
https://your-server:5443/live/moq/publish.html
```

:::info
**Before you open the pages:**

- **HTTPS is required** on real servers. Browsers only allow WebTransport over HTTPS. Localhost is the only exception.
- **Open port 4443** (UDP/TCP). The embedded MoQ relay listens on this port. Make sure it is open to inbound traffic.

:::

---

## Publish Stream via MoQ

### Option 1: Browser Publisher (Built-in)

1. Open `https://your-server:5443/live/moq/publish.html` in a Chromium-based browser.
2. Enter a stream ID.
3. Select **Camera** or **Screen** as the source.
4. Click **Start Publishing**.

The stream is now live on the MoQ relay and fully available inside AMS. Recording, REST API, and adaptive bitrate all work as normal.



### Option 2: Any MoQ-Compatible Client

Any moq-lite compatible tool can publish straight to the relay. Point it at the relay URL and use a broadcast name ending in `/publish`:

```
relay URL:      https://your-server:4443/moq
broadcast name: live/<streamId>/publish
```

AMS polls the relay for names ending in `/publish` and picks the stream up as a regular broadcast.

---

## Play Stream via MoQ

1. Open `https://your-server:5443/live/moq/play.html` in a Chromium-based browser.
2. Enter your stream ID and connect.
3. Select a quality track:
  - **source**: original quality as published into AMS
  - **720p / 480p**: if adaptive bitrate renditions are enabled and transcoded by AMS
  - **publish**: stream sent directly from the browser publisher, bypassing AMS entirely (lowest overhead, but no ABR, recording, or AMS pipeline features)



1. The stream is now playing live with MoQ.



Broadcast names always include the application name:

```
live/<streamId>/source
live/<streamId>/720p
live/<streamId>/publish
```

---

## Stream through a MoQ CDN

The embedded relay runs on your server, so it scales the way your server does. If you need to reach more viewers than that, you can push your streams to a MoQ CDN at the same time.

This is additive. Turn it on and every stream is published twice, once to your own relay and once to the CDN. Publishing, local playback and ingest keep working exactly as before. If the CDN stalls, only the CDN copy drops frames.

The cost is one extra `moq` process per stream, per quality. Nothing gets re-encoded.

### Turn it on

Add `moqCdnUrl` under **Settings → Advanced**:

```json
{
  "customSettings": {
    "plugin.moq": {
      "moqCdnUrl": "https://draft-16.cloudflare.mediaoverquic.com/<PUBLISH_TOKEN>"
    }
  }
}
```

The token goes in the URL path, so the token is the URL. Cloudflare gives you two of them, one for publishing and one for subscribing. The publish token belongs here. Hand the subscribe token to your viewers.

Restart the application and check the log:

```
MoQ plugin initialized for app: live, relay: https://localhost:4443/moq, cdn: https://draft-16...
```

:::warning
Use a `draft-16` host. A `draft-14` host accepts the publish and acks it, but no subscriber can ever find the stream. The logs look completely healthy and nothing plays.
:::

### Watch a CDN stream in the browser

Point the player at the CDN with a subscribe token, and give it the broadcast name:

```
http://your-server:5080/live/moq/play.html?url=https://draft-16.cloudflare.mediaoverquic.com/<SUBSCRIBE_TOKEN>&name=live/stream1/source
```

`name` is the broadcast, not the stream id. AMS publishes the original as `<app>/<streamId>/source` and each ABR rendition as `<app>/<streamId>/<height>p`, so `live/stream1/720p` works too when transcoding is on.

### Watch a CDN stream from the terminal

Useful when you want to know if a problem is the CDN or the browser. The plugin installer puts the `moq` binary on your PATH:

```bash
moq --client-connect "https://draft-16.cloudflare.mediaoverquic.com/<SUBSCRIBE_TOKEN>" \
    --broadcast live/stream1/source export fmp4 | ffplay -fflags nobuffer -flags low_delay -i -
```

If that plays and the browser page does not, the problem is on the browser side.

### What does not work

- **Ingest from a CDN.** Cloudflare has no `/announced` endpoint, so the plugin has nothing to poll and cannot discover streams there. Ingest always goes through your own relay.
- **The quality buttons.** The player turns broadcast discovery off for `mediaoverquic.com` hosts, so the quality list stays empty. Switch quality by editing `name` in the URL instead.

---

## Configuration (Optional)

The plugin works out of the box. To override defaults, go to **Settings → Advanced** in the AMS web panel and add the following under `customSettings`:

```json
{
  "customSettings": {
    "plugin.moq": {
      "useEmbeddedRelay": true,
      "externalRelayUrl": "https://relay.example.com:9000/moq",
      "moqCdnUrl": "",
      "ingestPollIntervalMs": 2000
    }
  }
}
```


| Setting                | Default                      | Description                                                                                                                           |
| ---------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `useEmbeddedRelay`     | `true`                       | Use the bundled moq-relay on port 4443. Set to `false` to use an external relay.                                                      |
| `externalRelayUrl`     | `https://localhost:4443/moq` | URL of the external relay. Only used when `useEmbeddedRelay` is `false`.                                                              |
| `moqCdnUrl`            | `""`                         | Publish every stream to this CDN as well as to the relay. Empty means off. See [Stream through a MoQ CDN](#stream-through-a-moq-cdn). |
| `ingestPollIntervalMs` | `2000`                       | How often (ms) to poll the relay's `/announced` endpoint for new streams.                                                             |


Settings you leave out fall back to their defaults. If the JSON is broken the plugin logs a warning and uses all defaults, so check the log after you edit it.

---

## Supported Codecs


| Type  | Codecs                    |
| ----- | ------------------------- |
| Video | H.264 (AVC), H.265 (HEVC) |
| Audio | AAC, Opus                 |


Codecs outside this list (e.g., VP8, AV1) are not yet supported.

---

## What's Next

MoQ playback and publishing will be built directly into the main AMS web player in a future release. Full IETF `moq-transport` (moqtail.dev) support is on the roadmap.

Check the [MoQ blog post](https://antmedia.io/moq-support-now-available-in-ant-media-server/) to read more about MoQ implementation and more detailed insights.

For questions, visit the [Ant Media community forum](https://github.com/ant-media/Ant-Media-Server/discussions)