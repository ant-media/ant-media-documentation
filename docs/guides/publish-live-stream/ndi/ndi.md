---
title: NDI® Ingest Guide
description: Discover and ingest an NDI® video source into Ant Media Server over your local network.
keywords: [NDI, NDI Ingest, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

# NDI® Ingest

[NDI® (Network Device Interface) is a proprietary media delivery protocol](https://docs.ndi.video/all/getting-started/what-is-ndi) over IP developed by [Vizrt NDI AB](https://www.newtek.com/). NDI® is a registered trademark of Vizrt NDI AB. Ant Media Server supports ingesting NDI® signals and muxing them into any of its supported output formats.

By the end of this guide, you'll be discovering an NDI® test source on your network and ingesting it into Ant Media Server as a live stream.

## Requirements

- Ant Media Server **4.0.0+** running on Ubuntu 20.04+ with systemd and `sudo` access. The NDI SDK ships bundled with AMS, so no separate SDK install is needed.
- A sender machine on the **same local network** as the AMS server, with [NDI Tools](https://ndi.video/tools/) installed. This guide uses NDI Tools' **Test Patterns** app to generate a source to ingest.
- UDP port 5353 open between the two machines for mDNS discovery.

:::info
NDI discovery relies on local network multicast, so it doesn't work out of the box across cloud regions or over the public internet. If your AMS server and NDI source can't be on the same LAN, see [Cloud and Remote Networking](#cloud-and-remote-networking) below.
:::

## Step 1: Install avahi-daemon

Ant Media Server uses `avahi-daemon` for mDNS-based NDI source discovery, so it needs to be installed and running on the server before AMS can see anything on the network.

```bash
sudo apt install -y avahi-daemon avahi-utils
sudo systemctl enable --now avahi-daemon
```

Confirm it's running:

```bash
sudo systemctl status avahi-daemon
```

## Step 2: Start an NDI Test Source

On a Windows or macOS machine on the same network as your AMS server, install [NDI Tools](https://ndi.video/tools/) and launch **Test Patterns** from the NDI Tools Launcher. Leave it running — it immediately starts broadcasting a synthetic NDI source for AMS to discover.

![NDI Test pattern](/img/ndi/ndi-tools.png)

Note the source name it's broadcasting under — it will look something like `<SENDER_HOSTNAME> (Test Pattern)`. You'll need this in Step 4.

## Step 3: Verify NDI Discovery

Back on the AMS server, confirm the source is actually visible over mDNS before touching any AMS configuration:

```bash
avahi-browse _ndi._tcp --terminate
```

You should see an entry for the Test Pattern source, e.g.:

```
+ eth0 IPv4 DESKTOP-XXXX (Test Pattern) _ndi._tcp local
```

If nothing appears, confirm both machines are on the same network and that `avahi-daemon` is running before continuing.

## Step 4: Configure ndiSources in AMS

Each NDI source is picked up by exactly one AMS application, mapped through the `ndiSources` parameter in that application's `red5-web.properties` file. You can set this either by editing the file directly over SSH, or from the web panel — pick whichever you're more comfortable with.

**Option A: Edit the file directly**

```bash
sudo nano /usr/local/antmedia/webapps/<APP_NAME>/WEB-INF/red5-web.properties
```

Add a line mapping the NDI source name from Step 2 to the stream ID you want AMS to publish it as:

```
ndiSources={"<SENDER_HOSTNAME> (Test Pattern)": "<STREAM_ID>"}
```

**Option B: Use the Management Panel**

`ndiSources` isn't one of the properties shown by default under the application's **Settings → Advanced**, but AMS lets you append any setting there that isn't already listed — it's written into `red5-web.properties` the same as editing the file directly. Add a new property with key `ndiSources` and the same value shown above. See [AMS Application Configuration](/guides/configuration-and-testing/ams-application-configuration/#adding-additional-settings) for the general steps.

:::info
To match multiple sources by pattern instead of listing them individually, use a regex key — `ndiSources={"regex:studio-camera-(\d+)": "cam-$1"}` maps `studio-camera-1` to `cam-1`, `studio-camera-2` to `cam-2`, and so on.
:::

## Step 5: Restart Ant Media Server

```bash
sudo service antmedia restart
```

## Step 6: Verify the Stream

Open the AMS web panel and go to the application you configured. The stream should appear under **Live Streams** with the `<STREAM_ID>` you chose, showing as **Broadcasting**. It can take 5-10 seconds after restart for the stream to show up, so give it a moment before assuming something's wrong.

## Cloud and Remote Networking

NDI's mDNS discovery doesn't cross network boundaries, so if your AMS server is on a cloud host (AWS, GCP, etc.) and your NDI source is elsewhere, none of the steps above work until the two are put on what looks like the same network:

- **VPN, e.g. Tailscale** — install Tailscale on both the server and the sender machine, sign in to the same account on both, and use the Tailscale IP of the server in place of its local IP. Everything else in this guide works unchanged once that's in place.
- **NDI Discovery Server** — for production setups, point both AMS and the sender at a dedicated discovery server via the NDI config file at `$HOME/.ndi/ndi-config.v1.json`. See the [NDI SDK configuration docs](https://docs.ndi.video/all/developing-with-ndi/sdk/configuration-files) for the file format.
- **NDI Bridge** — included with NDI Tools, tunnels NDI streams over the internet between two locations that each run it. Workable for occasional remote use, but not a substitute for a VPN or discovery server in production.

## Troubleshooting

| Symptom | Fix |
|---|---|
| `avahi-browse` returns no NDI sources | Confirm `avahi-daemon` is running and that both machines are on the same network. |
| Stream doesn't appear in the AMS dashboard | Check that the `ndiSources` name exactly matches what `avahi-browse` shows — it's case-sensitive. |
| Stream appears but drops intermittently | Switch the sender from Wi-Fi to a wired Ethernet connection. |
| CUDA/GPU warning in the AMS logs | Harmless on machines without an NVIDIA GPU — AMS falls back to CPU encoding automatically. |

You're now discovering an NDI® source over mDNS and ingesting it into Ant Media Server as a live stream. From here, head to the [playback guide](/category/play-live-streams/) to view it.

## Need Help?

If `avahi-browse` can't find your NDI source or AMS won't pick up the stream, reach out on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or contact [Technical Support](mailto:support@antmedia.io).
