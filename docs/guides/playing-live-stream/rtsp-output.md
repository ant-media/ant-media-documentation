---
title: RTSP Output
description: Install the RTSP Output Plugin and play streams from Ant Media Server in VLC, ffplay, GStreamer, or VMS software over RTSP.
keywords: [RTSP output, RTSP playback, RTSP Output Plugin, VLC, ffplay, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 8
---

# RTSP Output

The [RTSP Output Plugin](https://github.com/ant-media/Plugins/tree/master/RtspOutPlugin) lets you play any stream published to Ant Media Server over RTSP. Use it when your player is VLC, ffplay, GStreamer, or VMS (video management system) software instead of a web browser.

After the plugin is installed, every live stream gets an RTSP URL in this format:

```
rtsp://<SERVER>:8554/<APP_NAME>/<STREAM_ID>
```

- `<SERVER>` is the IP address or domain name of your Ant Media Server.
- `<APP_NAME>` is the application the stream is published to, for example `live`.
- `<STREAM_ID>` is the stream ID shown in the web panel for that stream.

For example, a stream with the ID `stream1` published to `live` on a server at `203.0.113.10` plays at:

```
rtsp://203.0.113.10:8554/live/stream1
```

This guide walks you through building the plugin, installing it, opening the required ports, and playing your first stream.

## Requirements

Before you start, make sure you have the following:

- Ant Media Server installed and running on a **Linux x86_64** server. To check the server architecture, run `uname -m`. The output must be `x86_64`.
- SSH access to the server with `sudo` rights.
- A single Ant Media Server instance. The plugin does not support clusters.
- A stream published to the server. If you have not published one yet, follow one of the [Publish Live Streams](/category/publish-live-streams/) guides first.

The plugin uses three ports. They must be free on the server and reachable from the computers that will play the stream:

| Port | Protocol | Used for |
| --- | --- | --- |
| `8554` | TCP | RTSP connections. Also carries the video and audio when the player uses TCP. |
| `8000` | UDP | Video and audio (RTP) when the player uses UDP. |
| `8001` | UDP | Control data (RTCP) when the player uses UDP. |

If you only play over TCP, you only need port `8554`.

## Step 1: Build the Plugin Zip

:::info
We will provide a direct download link for the plugin zip soon. Until then, build the zip from source by following the steps below.
:::

You can build the zip on the Ant Media Server machine itself or on any other Linux x86_64 machine. The steps below build it on the Ant Media Server machine, so you do not need to copy files between machines.

1. Connect to your server over SSH:

   ```bash
   ssh <USER>@<SERVER>
   ```

2. Install the tools needed to build the plugin. The build requires Java 21, Maven, Git, and Unzip:

   ```bash
   sudo apt update
   sudo apt install -y openjdk-21-jdk maven git unzip
   ```

3. Confirm that Java 21 and Maven are installed:

   ```bash
   java -version
   mvn -version
   ```

   Both commands should report Java version `21`. If `mvn -version` shows a different Java version, set `JAVA_HOME` to Java 21 before building:

   ```bash
   export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
   ```

4. Download the plugin source code:

   ```bash
   git clone https://github.com/ant-media/Plugins.git
   ```

5. Go to the plugin folder:

   ```bash
   cd Plugins/RtspOutPlugin
   ```

6. Build the zip:

   ```bash
   ./release.sh
   ```

   The script downloads the dependencies, runs the tests, and builds the zip. The first build takes several minutes.

7. When the build finishes, the script prints the contents of the zip. Confirm the zip was created:

   ```bash
   ls -lh target/RtspOutPlugin-release.zip
   ```

If you built the zip on a different machine, copy it to your Ant Media Server:

```bash
scp target/RtspOutPlugin-release.zip <USER>@<SERVER>:~/
```

## Step 2: Install the Plugin

1. On the Ant Media Server machine, go to the folder that contains the zip. If you built it on the server in Step 1, it is in `~/Plugins/RtspOutPlugin/target`:

   ```bash
   cd ~/Plugins/RtspOutPlugin/target
   ```

   If you copied the zip with `scp`, it is in your home folder:

   ```bash
   cd ~
   ```

2. Unzip the file:

   ```bash
   unzip RtspOutPlugin-release.zip
   ```

   This creates a folder named `RTSP-Out-Plugin` that contains the plugin jar, the RTSP server binary, its licence, and the install script.

3. Run the install script:

   ```bash
   sudo ./RTSP-Out-Plugin/install-rtsp-out-plugin.sh
   ```

   The script stops Ant Media Server, copies these three files into `/usr/local/antmedia/plugins`, and starts Ant Media Server again:

   - `RtspOutPlugin.jar`
   - `antmedia-mediamtx`
   - `antmedia-mediamtx-LICENSE`

   When it finishes, you see:

   ```
   RTSP out plugin installed to /usr/local/antmedia/plugins
   Started service: antmedia
   ```

:::note
If Ant Media Server is installed somewhere other than `/usr/local/antmedia`, or the service has a name other than `antmedia`, pass the correct values to the script:

```bash
sudo AMS_DIR=/opt/antmedia SERVICE_NAME=antmedia ./RTSP-Out-Plugin/install-rtsp-out-plugin.sh
```
:::

## Step 3: Open the Ports

1. Check that no other program is already using ports `8554`, `8000`, or `8001`:

   ```bash
   sudo ss -tulpn | grep -E ':8554|:8000|:8001'
   ```

   After the plugin starts, you should only see `antmedia-mediamtx` on these ports. If another program is listed, stop that program or move it to a different port, then restart Ant Media Server:

   ```bash
   sudo systemctl restart antmedia
   ```

2. Allow the ports through the server firewall.

   If your server uses `ufw`:

   ```bash
   sudo ufw allow 8554/tcp
   sudo ufw allow 8000:8001/udp
   ```

   If your server uses `firewalld`:

   ```bash
   sudo firewall-cmd --permanent --add-port=8554/tcp
   sudo firewall-cmd --permanent --add-port=8000-8001/udp
   sudo firewall-cmd --reload
   ```

3. If your server runs on a cloud provider such as AWS, Azure, or Google Cloud, also add inbound rules for TCP `8554` and UDP `8000-8001` to the server's security group or network firewall in the cloud console.

## Step 4: Confirm the Plugin Is Running

1. Check the plugin status. Replace `live` with your application name:

   ```bash
   curl http://localhost:5080/live/rest/rtsp-out/status
   ```

2. In the response, check these two values:

   ```json
   "mediamtxRunning": true,
   "mediamtxListening": true
   ```

   If both are `true`, the plugin is ready. If the command returns an error or either value is `false`, see [Troubleshooting](#troubleshooting).

3. If a stream is already publishing, it is listed under `activeStreams`:

   ```json
   "activeStreams": { "stream1": ["stream1"] }
   ```

## Step 5: Play the Stream

Make sure a stream is publishing to the server, then play it with one of the players below.

### VLC

1. Open VLC.
2. Go to **Media → Open Network Stream**.
3. Enter the RTSP URL, for example `rtsp://203.0.113.10:8554/live/stream1`.
4. Click **Play**.

If VLC connects but shows no video, UDP ports `8000` and `8001` are probably blocked between VLC and the server. Switch VLC to TCP:

1. Go to **Tools → Preferences**.
2. At the bottom left, under **Show settings**, select **All**.
3. Go to **Input / Codecs → Demuxers → RTP/RTSP**.
4. Select **Use RTP over RTSP (TCP)**.
5. Click **Save** and play the stream again.

### ffplay

`ffplay` is included with FFmpeg. To install it on Ubuntu:

```bash
sudo apt install -y ffmpeg
```

Play the stream over TCP. This only needs port `8554` and works through most firewalls:

```bash
ffplay -rtsp_transport tcp rtsp://<SERVER>:8554/<APP_NAME>/<STREAM_ID>
```

To play over UDP instead, which needs ports `8554`, `8000`, and `8001`:

```bash
ffplay -rtsp_transport udp rtsp://<SERVER>:8554/<APP_NAME>/<STREAM_ID>
```

By default, ffplay and other FFmpeg based players buffer video while they wait for the first keyframe, which adds about 2 seconds of delay. To reduce the delay to about 0.2 seconds, add these options:

```bash
ffplay -fflags nobuffer -flags low_delay -analyzeduration 300000 -probesize 200000 -framedrop -rtsp_transport tcp rtsp://<SERVER>:8554/<APP_NAME>/<STREAM_ID>
```

### Other Players

GStreamer (`rtspsrc`) and VMS software accept the same RTSP URL. Enter it wherever the software asks for an RTSP or camera URL.

## Play Different Qualities

RTSP does not switch quality automatically the way HLS and WebRTC do. Instead, each quality has its own URL.

If [Adaptive Bitrate](/guides/adaptive-bitrate/adaptive-bitrate-streaming/) is enabled for your application, add the resolution to the end of the stream ID to play that quality. For example, if your application creates a 480p version of the stream:

```
rtsp://<SERVER>:8554/<APP_NAME>/<STREAM_ID>_480p
```

The URL without a suffix always plays the original stream as it was published.

Each quality uses server resources even when nobody is watching it, so only add the qualities you need to your Adaptive Bitrate settings.

## Configure the Plugin

The plugin is enabled for every application and every stream by default. You can change this in the application settings.

1. Open the Ant Media Server web panel.
2. Select your application on the left, for example `live`.
3. Go to **Settings → Advanced**.
4. Find **`customSettings`** and add the `plugin.rtsp-out` block:

   ```json
   "customSettings": {
     "plugin.rtsp-out": {
       "enabled": true,
       "enabledByDefault": true,
       "authEnabled": true
     }
   }
   ```

5. Save the settings.

| Setting | Default | What it does |
| --- | --- | --- |
| `enabled` | `true` | Turns RTSP output on or off for the whole application. |
| `enabledByDefault` | `true` | Controls whether new streams get an RTSP URL. You can override this per stream with the REST API below. |
| `authEnabled` | `true` | Applies the application's playback security (tokens, JWT, TOTP) to RTSP players. See [Secure RTSP Playback](#secure-rtsp-playback). |

Changes to `enabled` and `enabledByDefault` apply to the next stream that starts publishing. Streams that are already running are not affected.

Changes to `authEnabled` only apply after you restart Ant Media Server:

```bash
sudo systemctl restart antmedia
```

## Turn RTSP On or Off for One Stream

Use the REST API to turn RTSP output on or off for a single stream. Run these commands on the server. Replace `live` with your application name and `stream1` with your stream ID.

Turn RTSP output off for a stream:

```bash
curl -X POST http://localhost:5080/live/rest/rtsp-out/disable/stream1
```

Turn RTSP output on for a stream:

```bash
curl -X POST http://localhost:5080/live/rest/rtsp-out/enable/stream1
```

Both commands return:

```json
{"success": true, "message": "..."}
```

This setting stays in place when the stream stops and starts again, and it takes priority over `enabledByDefault`.

To send these commands from another machine, you must allow that machine to use the REST API first. See [Secure with IP Filter](/guides/developer-sdk-and-api/rest-api-guide/securing-rest-apis/).

## Secure RTSP Playback

When `authEnabled` is `true` (the default), RTSP players must pass the same security checks as HLS players. If you use [One Time Tokens](/guides/stream-security/one-time-token-control/), [Hash Based Tokens](/guides/stream-security/hash-based-token/), [JWT](/guides/stream-security/jwt-stream-security-filter/), or [TOTP](/guides/stream-security/totp/), use the same token you would use for HLS.

Add the token to the end of the RTSP URL. Put the URL in single quotes so the shell does not misread the `?` and `&` characters:

```bash
ffplay -rtsp_transport tcp 'rtsp://<SERVER>:8554/<APP_NAME>/<STREAM_ID>?token=<TOKEN>'
```

For TOTP, pass the subscriber ID and code:

```bash
ffplay -rtsp_transport tcp 'rtsp://<SERVER>:8554/<APP_NAME>/<STREAM_ID>?subscriberId=<SUBSCRIBER_ID>&subscriberCode=<TOTP_CODE>'
```

Some players, including many VMS products, do not accept extra parameters after the URL. For these players, enter the subscriber ID as the username and the token as the password, or include them in the URL:

```bash
ffplay -rtsp_transport tcp 'rtsp://<SUBSCRIBER_ID>:<TOKEN>@<SERVER>:8554/<APP_NAME>/<STREAM_ID>'
```

FFmpeg based players cut the username and password at 127 characters. One Time Tokens and Hash Based Tokens fit, but JWTs are usually too long, so use the `?token=` format for JWTs.

RTSP security differs from HLS in these ways:

- A One Time Token can be reused by the same IP address for 60 seconds after its first use. RTSP players connect in two stages, and both stages must be allowed.
- The HLS viewer limit (`hlsViewerLimit`) does not apply to RTSP.
- IP filtering does not apply to RTSP.
- One token allows playback of the stream and all of its qualities.

:::warning
If you set `authEnabled` to `false`, anyone who can reach port `8554` can play every stream on the server.
:::

## Supported Codecs

| Type | Supported codecs |
| --- | --- |
| Video | H.264, H.265, VP8, MPEG-4 Part 2, MPEG-2, MPEG-1, MJPEG |
| Audio | AAC, Opus, MP3, Vorbis, G.711 µ-law, G.711 A-law, G.722, G.726 |

VP9, AV1, and AC-3 are not supported. Streams in these codecs do not get an RTSP URL, but still play normally over WebRTC, HLS, and the other playback methods.

## Troubleshooting

Start by checking the plugin status:

```bash
curl http://localhost:5080/live/rest/rtsp-out/status
```

Then search the server log for RTSP messages:

```bash
grep -i rtsp /usr/local/antmedia/log/ant-media-server.log | tail -n 50
```

| Problem | Cause and fix |
| --- | --- |
| The status command returns `404` or an error | The plugin is not loaded. Check that `RtspOutPlugin.jar` and `antmedia-mediamtx` are in `/usr/local/antmedia/plugins`, then restart Ant Media Server. |
| `mediamtxGaveUp` is `true` and nothing plays | Port `8554`, `8000`, or `8001` is used by another program. Free the port as shown in [Step 3](#step-3-open-the-ports), then restart Ant Media Server. |
| One stream has no RTSP URL | RTSP output is turned off for that stream or application. Check `enabled` and `enabledByDefault` in the settings, and check `streamOverrides` in the status response. |
| A quality such as `_480p` does not play | That quality is not configured in Adaptive Bitrate. The log shows `Giving up on RTSP endpoint`. |
| The player connects but shows nothing | UDP ports `8000` and `8001` are blocked. Play over TCP instead, as shown in [Step 5](#step-5-play-the-stream). |
| Audio plays but video does not | The log shows `bound audio only`. This is a plugin bug. Please [open an issue](https://github.com/ant-media/Plugins/issues) with the log. |
| Every player is refused | Playback security is enabled. Add a token to the URL as shown in [Secure RTSP Playback](#secure-rtsp-playback). |
| Every stream plays except one | That stream uses a codec RTSP cannot carry. See [Supported Codecs](#supported-codecs). |
| Playback is about 2 seconds behind | The player is buffering. Use the low delay ffplay options in [Step 5](#step-5-play-the-stream). |

If an RTSP URL cannot be opened, the plugin retries it every 2 seconds, up to 10 times. If the RTSP server process fails to start 5 times in a row, the plugin stops trying and the status shows `"mediamtxGaveUp": true`. Restarting Ant Media Server resets both counters.

## Limitations

- **No cluster support.** In a cluster, the RTSP URL must point to the origin server that receives the stream. Edge servers cannot serve RTSP.
- **No viewer count.** RTSP viewers are not counted in the web panel or the viewer statistics.

## Uninstall the Plugin

1. Remove the plugin files:

   ```bash
   sudo rm /usr/local/antmedia/plugins/RtspOutPlugin.jar /usr/local/antmedia/plugins/antmedia-mediamtx /usr/local/antmedia/plugins/antmedia-mediamtx-LICENSE
   ```

2. Restart Ant Media Server:

   ```bash
   sudo systemctl restart antmedia
   ```

## Need Help?

Ask on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or contact [Technical Support](mailto:support@antmedia.io).
