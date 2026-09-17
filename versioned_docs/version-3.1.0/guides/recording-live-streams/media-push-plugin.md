---
title: Media Push Plugin
description: This guide explains how to stream and record any specific web page using the media push plugin
keywords: [Media Push Plugin, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 8
---

# Media Push Plugin

The Media Push Plugin lets Ant Media Server stream any web page — a conference call, a browser-based overlay, a custom dashboard — by loading it server-side and capturing it in real time. Give it a URL, and it streams that page back into Ant Media Server, where you can record it, re-stream it, or play it back like any other stream.

By the end of this guide, you'll have the plugin installed and be broadcasting, recording, and optionally scripting a web page through it.

## How Media Push Works

Media Push runs a headless Chrome instance on the server side. When you send a REST request with the URL of the page you want captured, AMS opens a new Chrome tab at that URL. Once the page loads, the screen is captured using Media Stream APIs and re-streamed back into Ant Media Server — from there, you can record the stream or play it back over WebRTC, HLS, or DASH like any other stream.

## What It Can Do

- **Broadcast the URL** — capture the page's view and audio in real time, including animations and overlays.
- **Record the broadcast** — optional, and started manually via the REST API or the AMS dashboard.
- **Play the stream** — in real time over WebRTC, or at low latency over HLS, DASH, or CMAF.

## Install the Plugin

1. Connect to your Ant Media Server instance via terminal.
2. Download the installation script:

   ```bash
   wget -O install_media-push-plugin.sh https://raw.githubusercontent.com/ant-media/Plugins/master/MediaPushPlugin/src/main/script/install_media-push-plugin.sh && chmod 755 install_media-push-plugin.sh
   ```

3. Run it:

   ```bash
   sudo ./install_media-push-plugin.sh
   ```

4. Fix ownership on the newly installed files:

   ```bash
   sudo chown -R antmedia:antmedia /usr/local/antmedia
   ```

5. Restart the service:

   ```bash
   sudo service antmedia restart
   ```

## Using the Plugin

The plugin exposes a REST API to start, stop, and control broadcasts programmatically.

### Start a Broadcast

Provide the URL of the page to broadcast. You can optionally specify a stream ID as a query parameter.

```bash
curl -i -X POST -H "Accept: Application/json" -H "Content-Type: application/json" "https://<DOMAIN_NAME>:5443/<APP_NAME>/rest/v1/media-push/start?streamId=<STREAM_ID>" -d '{"url": "<URL_TO_RECORD>", "width": 1280, "height": 720}'
```

On success:

```
HTTP/1.1 200
Content-Type: Application/json
Content-Length: 80
Date: Mon, 05 Feb 2024 15:23:42 GMT {"success":true,"message":null,"dataId":"<STREAM_ID>","errorId":0}
```

The `dataId` field echoes the stream ID, which you'll need for the operations below.

### Stop a Broadcast

```bash
curl -i -X POST -H "Accept: Application/json" "https://<DOMAIN_NAME>:5443/<APP_NAME>/rest/v1/media-push/stop/<STREAM_ID>"
```

Use the same stream ID (`dataId`) you got back when starting the broadcast.

### Record the Broadcast

Add `recordType` to the start request to record alongside streaming:

```bash
curl -i -X POST -H "Accept: Application/json" -H "Content-Type: application/json" "https://<DOMAIN_NAME>:5443/<APP_NAME>/rest/v1/media-push/start" -d '{"url": "<URL_TO_RECORD>", "width": 1280, "height": 720, "recordType":"mp4"}'
```

:::info
See [this blog post](https://antmedia.io/conference-call-recording/) for a walkthrough of using Media Push to record conference rooms.
:::

## Quick Demo

<iframe width="560" height="315" src="https://www.youtube.com/embed/gyog1t9cQNs?si=uiXqrbpsn81pjzrW" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

### Add Chrome Switches

Pass extra Chrome command-line switches as a comma-separated list in `extraChromeSwitches`:

```bash
curl -i -X POST -H "Accept: Application/json" -H "Content-Type: application/json" "https://<DOMAIN_NAME>:5443/<APP_NAME>/rest/v1/media-push/start" -d '{"url": "<URL_TO_RECORD>", "width": 1280, "height": 720, "recordType":"mp4", "extraChromeSwitches":"--start-fullscreen,--disable-gpu"}'
```

This example configures Chrome with two switches:

- `--start-fullscreen` — starts Chrome in fullscreen mode.
- `--disable-gpu` — disables GPU hardware acceleration, which can help on certain server configurations.

The plugin's default switches are defined in `MediaPushPlugin.java` under `CHROME_DEFAULT_SWITCHES`. For the full range of available switches, see [Chromium Command Line Switches](https://peter.sh/experiments/chromium-command-line-switches/).

### Run JavaScript on the Page

Send a JavaScript command to a running Media Push stream by its stream ID:

```bash
curl -i -X POST -H "Accept: Application/json" -H "Content-Type: application/json" "https://<DOMAIN_NAME>:5443/<APP_NAME>/rest/v1/media-push/send-command?streamId=<STREAM_ID>" -d '{"jsCommand": "<JS_COMMAND>"}'
```

For example, this overwrites the page's content with a message:

```bash
curl -i -X POST -H "Accept: Application/json" -H "Content-Type: application/json" "http://localhost:5080/live/rest/v1/media-push/send-command?streamId=stream111" -d '{"jsCommand": "document.write(\"hello, this text is now displayed on the page\")"}'
```

## Composite Layout

Composite Layout is an HTML page with a canvas that Media Push can capture as its own live stream — useful for combining multiple video streams, text, and images into one custom visual without building a full rendering pipeline yourself.

The page joins a conference room (passed as a URL parameter) and waits for instructions. Nothing appears on the canvas by default; you add streams to it by calling the REST API with the room participant's ID.

### Set Up Composite Layout

1. Download `composite_layout.html`:

   ```bash
   wget https://github.com/ant-media/Plugins/raw/master/MediaPushPlugin/build/composite_layout.html
   ```

2. Copy it into your application folder:

   ```bash
   sudo cp composite_layout.html /usr/local/antmedia/webapps/<APP_NAME>/composite_layout.html
   ```

### Use Composite Layout

**Start it** — pass the composite layout page's URL as the `url` to broadcast. `<PUBLISHER_ID>` can be any identifier you choose, e.g. `test`.

```bash
curl -i -X POST -H "Accept: Application/json" -H "Content-Type: application/json" "https://<DOMAIN_NAME>:5443/<APP_NAME>/rest/v1/media-push/start" -d '{"url": "https://<DOMAIN_NAME>:5443/<APP_NAME>/composite_layout.html?roomId=<ROOM_NAME>&publisherId=<PUBLISHER_ID>", "width": 1280, "height": 720}'
```

**Stop it** — using the same publisher ID:

```bash
curl -i -X POST -H "Accept: Application/json" "https://<DOMAIN_NAME>:5443/<APP_NAME>/rest/v1/media-push/stop/<PUBLISHER_ID>"
```

**Update the layout on the fly** — add or rearrange participant streams on the canvas:

```bash
curl -i -X POST -H "Accept: Application/json" -H "Content-Type: application/json" "https://<DOMAIN_NAME>:5443/<APP_NAME>/rest/v2/broadcasts/<PUBLISHER_ID>/data" -d '{"streamId":"<PUBLISHER_ID>","layoutOptions": {"canvas": {"width": 640,"height": 640},"layout": [{"streamId": "<PARTICIPANT_ID>","region": {"xPos": 20,"yPos": 0,"zIndex": 1,"width": 200,"height": 200},"fillMode": "fill","placeholderImageUrl": "https://cdn-icons-png.flaticon.com/512/149/149071.png"}]}}'
```

## Building from Source

1. Clone the repository:

   ```bash
   git clone https://github.com/ant-media/Plugins.git
   ```

2. Go to the plugin's directory:

   ```bash
   cd Plugins/MediaPushPlugin
   ```

3. Edit `redeploy.sh` to point `AMS_DIR` at your installation path (default `/usr/local/antmedia/`).

4. Build and install:

   ```bash
   chmod +x redeploy.sh
   ./redeploy.sh
   ```

5. Restart Ant Media Server:

   ```bash
   sudo service antmedia restart
   ```

### Customizing the Plugin

To change how pages are captured — for example, logging in with credentials before the broadcast starts — modify the `customModification` method in `MediaPushPlugin`, then rebuild with the same `redeploy.sh` command above.

You now have the Media Push Plugin installed and can broadcast, record, and script any web page through Ant Media Server.

## Troubleshooting

| Symptom | Fix |
|---|---|
| Install script exits with `Unsupported Linux distribution: $ID` or `Cannot detect the Linux distribution.` | `install_media-push-plugin.sh` only recognizes a specific set of distros; check the script's output against your actual OS. |
| Install script exits with `There is a problem in getting the version of the media push plugin.` or `Latest media push plugin version could not be determined.` | The script couldn't resolve a release version from GitHub (it tries the release URL, then falls back to a snapshot URL) — usually a network issue reaching GitHub, not something wrong locally. |
| Install script exits with `There is a problem in downloading the media push plugin. Please send the log of this console to support@antmedia.io` | The plugin download failed after the version was resolved; re-run the script, and if it persists, send the console output to support as the message suggests. |
| `Incoming url: <URL> is not a valid url` | The Start request's `url` field isn't a well-formed URL; double-check it before retrying. |
| `Session with the same streamId: <ID> already exists. Please stop it first` | You called Start with a `streamId` that already has an active Media Push session; stop it first or omit the ID to let AMS generate one. |
| `Driver does not exist for stream id: <ID>` | Returned by Stop (or by sending a JS command) when the stream ID has no active session — it already ended or never started successfully. |
| A broadcast won't start, or the captured page appears blank | Check the Chrome switches and confirm the target URL loads correctly outside of Media Push first. |

## Need Help?

If the steps above don't resolve it, reach out on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or contact [Technical Support](mailto:support@antmedia.io).
