---
title: SRT Ingest Guide
description: SRT Ingest Guide
keywords: [SRT Ingest Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

# SRT Ingest Guide

SRT (Secure Reliable Transport) allows you to push streams to Ant Media Server and play them using various formats, including WebRTC, HLS, CMAF (DASH), and LL-HLS, and record them as MP4.

To enable this feature, we utilized Haivision's official [SRT library](https://github.com/Haivision/srt) and created an SRT preset for [JavaCPP-Presets](https://github.com/bytedeco/javacpp-presets). We intend to submit a pull request for the JavaCPP-Presets repository.

Below is a guide on how to publish an SRT stream to the Ant Media Server.

## Publish SRT Stream with FFmpeg

Assuming you have installed and launched Ant Media Server v2.4.3 or later, you can use FFmpeg to push the SRT stream. 

```bash
ffmpeg -re -i {INPUT} -vcodec libx264 -profile:v baseline -g 60 -acodec aac -f mpegts srt://ant.media.server.address:4200?streamid=live/stream1
```

Once the command is executed, the stream will be available in the `live` application with the `streamId` stream1.

:::info
 If you encounter a "**Protocol not found**" error, it means FFmpeg needs to be compiled with the [**--enable-libsrt**](https://srtlab.github.io/srt-cookbook/apps/ffmpeg/) to support the SRT protocol.

srt://ant.media.server.address:4200?streamid\=live/stream1: Protocol not found
:::

In that case, you can verify if FFmpeg has SRT protocol support or not by running the following command:

```bash
ffmpeg -protocols
```

## Publish SRT Stream With OBS

If you don’t have command-line experience and prefer a graphical interface, you can use OBS (Open Broadcaster Software) to push an SRT stream to Ant Media Server. If you are unfamiliar with OBS, you can look at this blog post [How to use OBS with Ant Media Server](https://antmedia.io/how-to-use-obs-with-ant-media-server/). 

Just enter the SRT URL into the stream window as shown in the image below.

![](@site/static/img/Screen-Shot-2022-04-20-at-14.48.30-1024x811.png)

If the publish type token is enabled, the SRT publishing URL will be in the following format:

```
srt://ant.media.server.address:4200?streamid=live/streamId,token=tokenId
```

In order to generate the tokens, check out the stream security [documentation](/category/stream-security/).

### Publish SRT Stream Without StreamId

:::info
Starting from version 2.8.0 and above, Ant Media Server supports SRT publishing without the explicit need for streamId.
:::

![](@site/static/img/publish-live-stream/srt/srt-obs.png)

In such cases, the system IP address is used as the streamId and it is published to the LiveApp application by default.

![](@site/static/img/publish-live-stream/srt/srt-stream.png)

## Publish SRT Multitrack Stream

Starting version 3.1.0, an SRT stream can be published with multiple audio tracks. Here is the sample FFMPEG command:

```bash
ffmpeg -re -i file.mp4 -map 0 -c copy -f mpegts "srt://ant.media.server.address:4200?streamid=live/test"
```

Suppose the file has a video with English, German (Deutsch) and French. On the player side, you can select the specific audio track to play.

In AMS, the multitrack playback works with both WebRTC & HLS.

![](@site/static/img/publish-live-stream/srt/multitrack-playback.png)

## Encrypt SRT Ingest with a Passphrase

:::info
SRT passphrase encryption is available starting with Ant Media Server 3.2.0.
:::

SRT can encrypt the stream between the publisher and Ant Media Server with a shared passphrase. The publisher and the server must use the same passphrase. If they don't match, the server rejects the connection and nothing is published.

The passphrase must be **10 to 80 characters** long. Use only letters and numbers, so you can put it in the SRT URL as it is. To generate a random passphrase, run:

```bash
openssl rand -hex 20
```

You can set a passphrase for one stream, or for every stream in an application.

### Set a Passphrase for One Stream

1. Create the stream with a passphrase. Run this command on your Ant Media Server. Replace `stream1` with your stream ID and `yourpassphrase` with your passphrase:

   ```bash
   curl -X POST -H "Content-Type: application/json" \
     -d '{"streamId":"stream1","srtPassphraseOverride":"yourpassphrase"}' \
     http://localhost:5080/live/rest/v2/broadcasts/create
   ```

   **You should see** a JSON response that includes `"streamId":"stream1"`. If the passphrase is shorter than 10 or longer than 80 characters, you see `SRT passphrase must be 10 to 80 characters` instead, and the stream is not created.

   The field for a single stream is named `srtPassphraseOverride`. The name `srtPassphrase` is only used for the application setting below. If you send `srtPassphrase` here, the server answers with `Unrecognized field "srtPassphrase"` and does not create the stream.

   To call the REST API from another machine, you must allow that machine first. See [Secure with IP Filter](/guides/developer-sdk-and-api/rest-api-guide/securing-rest-apis/).

2. Publish with the same passphrase. Add `&passphrase=` and your passphrase to the end of the SRT URL. Put the URL in double quotes, because the shell treats `&` as a special character:

   ```bash
   ffmpeg -re -i {INPUT} -vcodec libx264 -profile:v baseline -g 60 -acodec aac -f mpegts "srt://ant.media.server.address:4200?streamid=live/stream1&passphrase=yourpassphrase"
   ```

### Set a Passphrase for a Whole Application

1. Open the Ant Media Server web panel.
2. Select your application on the left, for example `live`.
3. Go to **Settings → Advanced**.
4. Find **`srtPassphrase`** and enter your passphrase:

   ```json
   "srtPassphrase": "yourpassphrase"
   ```

5. Save the settings.

The change applies right away, without a restart. Every SRT stream published to this application now needs this passphrase in its SRT URL.

### Which Passphrase Is Used

A passphrase set on a stream always takes priority over the application passphrase. A stream with its own passphrase does not accept the application passphrase.

| Stream passphrase | Application passphrase | The publisher must use |
| --- | --- | --- |
| Set | Set or empty | The stream passphrase |
| Empty | Set | The application passphrase |
| Empty | Empty | No passphrase. The stream is not encrypted. |

:::tip Only allow streams you created
Set the application passphrase to a long random value and don't share it with anyone. Then give each stream its own passphrase when you create it. A publisher can then only publish to streams you created, because nobody can use the application passphrase.
:::

### If the Publisher Is Rejected

When the passphrase is missing or wrong, the server rejects the SRT connection and FFmpeg stops. The FFmpeg output shows why:

| FFmpeg output contains | Cause |
| --- | --- |
| `ERROR:UNSECURE` | The stream needs a passphrase, but the SRT URL has none. Add `&passphrase=` to the URL. |
| `ERROR:BADSECRET` | The passphrase in the SRT URL is wrong. Check which passphrase applies in the table above. |

## Play SRT with Ant Media Server

Once the SRT stream has been published, it can be viewed using WebRTC, HLS, CMAF (Dash) or LL-HLS. Please see the document [here](https://docs.antmedia.io/category/play-live-streams/) for more information.

## Configure SRT Ingest Port

SRT is enabled by default in Ant Media Server and communicates via UDP port 4200. If you need to change the port number, follow these steps.

- Open the following file and edit it using your editor.

   ```bash
   sudo nano /usr/local/antmedia/conf/red5.properties
   ```

- And, add/replace the following property:

   ```bash
   server.srt_port={WRITE_YOUR_PORT_NUMBER}
   ```

- After this, restart the server, and it will use the newly configured port number for SRT ingest.

:::info
SRT support is available for both x86_64 and ARM architectures, starting with Ant Media Server version 2.6.0. For versions below 2.6.0 (till v2.5.3), SRT support is available for the x86_64 architecture only.
:::

## Need Help?

If FFmpeg or OBS can't reach the SRT port, reach out on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or contact [Technical Support](mailto:support@antmedia.io).
