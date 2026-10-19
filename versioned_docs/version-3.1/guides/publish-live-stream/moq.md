---
title: MoQ (Media over QUIC)
description: MoQ (Media over QUIC) Streaming
keywords: [MoQ, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---

# MoQ (Media over QUIC)

Media over QUIC (MoQ) is an emerging live streaming protocol built on QUIC and WebTransport. It delivers sub-second latency like WebRTC while scaling through a CDN relay like HLS—no plugins or native apps required.

By the end of this guide, you'll have the AMS MoQ plugin installed, be publishing a stream into it, and be playing that stream back at sub-second latency.

:::info
MoQ is still an evolving IETF standard — the AMS MoQ plugin is based on **moq-lite**, a deployable subset of the spec, and full IETF `moq-transport` support (via [moqtail.dev](https://moqtail.dev)) is on the roadmap as it matures. Treat this as early access and keep an eye on updates; see the [MoQ blog post](https://antmedia.io/moq-support-now-available-in-ant-media-server/) for more on the underlying implementation.
:::

## Requirements

- Ant Media Server **3.0.0** or later
- Linux x86\_64
- `sudo` access
- Chromium-based browser (Chrome, Edge, Brave) for playback. Safari **26.4+** (macOS/iOS 26.4 minimum) is also supported; Firefox has WebTransport support but is currently unstable for MoQ playback.

## Supported Codecs

| Type | Codecs |
|---|---|
| Video | H.264 (AVC), H.265 (HEVC) |
| Audio | AAC, Opus |

Codecs outside this list (e.g., VP8, AV1) are not yet supported.

## Installation

**1. Download and unzip the plugin**

[Download MoQPlugin-release.zip](https://drive.google.com/file/d/1X9ymWsDjfdNdcXH2h0y2Ak2IWpmnkijk/view?usp=sharing) and upload it to your Ant Media Server, then run:

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
sudo mkdir -p /usr/local/antmedia/webapps/live/moq
sudo cp -r moq-ams-player-build/* /usr/local/antmedia/webapps/live/moq
```

**4. Restart AMS**

```bash
sudo service antmedia restart
```

After the restart, the player and publisher pages are available at:

```
https://<DOMAIN_NAME>:5443/live/moq/play.html
https://<DOMAIN_NAME>:5443/live/moq/publish.html
```

:::info
**Before you open the pages:**
- **HTTPS is required** on real servers. Browsers only allow WebTransport over HTTPS. Localhost is the only exception.
- **Open port 4443** (UDP/TCP). The embedded MoQ relay listens on this port. Make sure it is open to inbound traffic.
:::

## Publish Stream via MoQ

### Option 1 — Browser Publisher (Built-in)

1. Open `https://<DOMAIN_NAME>:5443/live/moq/publish.html` in a Chromium-based browser.
2. Enter a stream ID.
3. Select **Camera** or **Screen** as the source.
4. Click **Start Publishing**.

The stream is now live on the MoQ relay and fully available inside AMS—recording, REST API, and adaptive bitrate all work as normal.

![](@site/static/img/publish-live-stream/moq-publish.webp)

### Option 2 — Any MoQ-Compatible Client

Publish directly to the relay URL using any moq-lite-compatible tool:

```
moq://<DOMAIN_NAME>:4443/moq/<STREAM_ID>/publish
```

AMS picks up the stream as a regular broadcast automatically.

## Play Stream via MoQ

1. Open `https://<DOMAIN_NAME>:5443/live/moq/play.html` in a Chromium-based browser.
2. Enter your stream ID and connect.
3. Select a quality track:
   - **source** — original quality as published into AMS
   - **720p / 480p** — if adaptive bitrate renditions are enabled and transcoded by AMS
   - **publish** — stream sent directly from the browser publisher, bypassing AMS entirely (lowest overhead, but no ABR, recording, or AMS pipeline features)

![](@site/static/img/publish-live-stream/moq-player.webp)

4. The stream is now playing live with MoQ.

![](@site/static/img/publish-live-stream/moq-play.webp)

Stream URLs follow this format:

```
moq://<DOMAIN_NAME>:4443/<STREAM_ID>/source
moq://<DOMAIN_NAME>:4443/<STREAM_ID>/720p
```

## Configuration (Optional)

The plugin works out of the box. To override defaults, go to **Settings → Advanced** in the AMS web panel and add the following under `customSettings`:

```json
{
  "customSettings": {
    "plugin.moq": {
      "useEmbeddedRelay": true,
      "ingestEnabled": true,
      "externalRelayUrl": "https://relay.example.com:9000/moq",
      "ingestPollIntervalMs": 2000
    }
  }
}
```

| Setting | Default | Description |
|---|---|---|
| `useEmbeddedRelay` | `true` | Use the bundled moq-relay on port 4443. Set to `false` to use an external relay. |
| `ingestEnabled` | `true` | Enable MoQ ingest via announce polling. Set to `false` if AMS is publish-only. |
| `externalRelayUrl` | `localhost:4443` | URL of the external relay. Only used when `useEmbeddedRelay` is `false`. |
| `ingestPollIntervalMs` | `2000` | How often (ms) to poll the relay's `/announced` endpoint for new streams. |

You now have the MoQ plugin installed and are publishing and playing streams at sub-second latency through AMS's embedded relay. From here, see [Which Protocol Should I Use to Publish?](/guides/publish-live-stream/which-protocol-should-i-use/) to compare MoQ against AMS's other publishing protocols.

## Need Help?

If the plugin fails to install, the pages return a WebTransport error, or a published stream doesn't show up on the relay, reach out on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or contact [Technical Support](mailto:support@antmedia.io).
