---
title: NDI® Ingest Guide
description: Discover an NDI® source, add it to Ant Media Server, and watch the live feed over WebRTC.
keywords: [NDI, NDI Ingest, WebRTC, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

# NDI® Ingest

Ant Media Server (AMS) Enterprise can ingest live video and audio from an NDI® camera, switcher, or software sender. This guide takes you from discovery on your local network to WebRTC playback in the browser.

## Requirements

- **Ant Media Server Enterprise Edition 3.1.0 or later** and access to its web panel. The Ubuntu discovery steps require `sudo` access.
- An active NDI sender on the same local network as the AMS server.
- A network that allows mDNS multicast on UDP port `5353` for discovery and allows the [NDI media traffic](https://docs.ndi.video/all/getting-started/white-paper/ndi-related-network-ports) between the sender and AMS. For a server on another network, see [Cloud and Remote Networking](#cloud-and-remote-networking).

## Step 1. Enable NDI discovery

Run these commands on the Ubuntu server to install Avahi and start its mDNS service.

```bash
sudo apt update
sudo apt install -y avahi-daemon avahi-utils
sudo systemctl enable --now avahi-daemon
```

## Step 2. Start an NDI source

For a phone camera, join the same local network as AMS over Wi-Fi, open your NDI camera app, and start broadcasting. You can also enable NDI output on a camera, switcher, or production application.

To test without a camera, open **Test Patterns** from the [NDI Tools](https://ndi.video/tools/) launcher on a computer connected to the same network. Keep the sender running through discovery and playback.

![NDI Tools launcher with the Test Patterns tile in the left column](/img/ndi/ndi-tools.png)

## Step 3. Open the NDI stream form

1. Sign in to the AMS web panel and open your application under **Applications**. This example uses `LiveApp`.
2. Open the **Live Streams** tab. Select **New Live Stream**, then **NDI Stream**.

![The New Live Stream menu in LiveApp with NDI Stream highlighted](/img/ndi/create-new-ndi-stream.webp)

## Step 4. Select a discovered source and add it

1. In the **New NDI Stream** form, open **NDI Source Name** and select your sender, such as `LOCALHOST (NDI Camera)`. If the sender has just started, click **Reload** and check the list again.
2. Enter a unique stream ID, such as `camera1`, or leave the field blank to let AMS generate an ID.
3. Click **Add**. In **Live Streams**, wait for the new stream to show **Broadcasting**.

![The NDI Source Name dropdown showing a discovered camera and the Add button below](/img/ndi/discovered-ndi-sources.webp)

## Step 5. Play the stream over WebRTC

1. Open the action menu for the **Broadcasting** stream and choose **Play With WebRTC**.

   ![The stream camera1 showing Broadcasting with Play With WebRTC highlighted in its action menu](/img/ndi/ndi-camera-broadcasting.webp)

2. In the player, click **Play** if playback does not start automatically. Confirm that you see the live camera feed or test pattern. Check the audio if your source sends it.

   ![A live NDI camera feed playing in the Ant Media Server web player over WebRTC](/img/ndi/ndi-webrtc-playback.webp)

You can also open the web player directly. Replace the example hostname, application name, and stream ID with yours.

```text
https://ams.example.com:5443/LiveApp/play.html?id=camera1&playOrder=webrtc
```

See [WebRTC Playback](../../playing-live-stream/webrtc-playback.md) for browser-to-server connectivity and other playback options.

## Cloud and Remote Networking

The default mDNS discovery works within a local network. For senders on a different network from AMS, plan how the server will find the source and receive its media.

- **NDI Discovery Server**. Configure the sender and receiver to use the same discovery server and ensure the receiver can reach the sender for media. See the [NDI Discovery Server documentation](https://docs.ndi.video/all/getting-started/white-paper/discovery-and-registration/discovery-server).
- **NDI Bridge**. Connect remote NDI environments and make the remote feed available on the receiving network. See the [NDI Bridge overview](https://docs.ndi.video/all/getting-started/glossary/ndi-terminology#bridge).
- **VPN**. Use it for media connectivity between networks. Verify that your VPN carries mDNS multicast or configure a separate discovery method.

## Troubleshooting

- **The source is missing from NDI Source Name.** Confirm that the sender is running and click **Reload**. On the AMS host, run `systemctl is-active avahi-daemon` to check Avahi and `avahi-browse _ndi._tcp --terminate` to check which sources are visible over mDNS. If your source is missing there too, check that the devices share a local network and that multicast traffic can reach AMS.
- **The source is listed but the stream does not reach Broadcasting.** Verify that the sender is still active and that AMS can reach its NDI media ports.
- **The stream is Broadcasting but the player stays blank.** Check WebRTC connectivity between the browser and AMS, including the firewall requirements in the [WebRTC Playback guide](../../playing-live-stream/webrtc-playback.md).

For further help, reach out on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or email [Technical Support](mailto:support@antmedia.io).

NDI® is a registered trademark of Vizrt NDI AB.
