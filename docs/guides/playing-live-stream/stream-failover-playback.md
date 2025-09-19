---
title: Stream Failover Playback
description: Stream Failover Playback with Web Player
keywords: [Backup Playback, WebRTC playback with Ant Media Server, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 6
---

# Stream Failover Playback

Ant Media Server introduces the concept of primary and backup streams to enhance the reliability and continuity of live streaming.

The **Primary-Backup Stream** concept involves using two streams—one as the **primary (main) stream** and another as the **backup (failover) stream** to ensure reliability and continuity in live streaming.

:::info
Starting with version 2.13, the Ant Media Server supports the concept of primary and backup stream playback.
:::

- **Primary Stream (Main Stream)**
    
    - The main video/audio stream is sent to the server.
    - Viewers watch this stream under normal conditions.

- **Backup Stream (Failover Stream)**
    
    -  A secondary stream is sent simultaneously to the server, but it remains idle unless the primary stream fails.
    -  The backup stream could be encoded at the same quality or slightly lower to reduce bandwidth usage.

- **Automatic Failover**
    
    - If the primary stream disconnects (e.g., due to network failure or encoder crash), the AMS web player **automatically switches** to the backup stream.


## How Failover Scenario Works?

### Step-1: Publish the Primary Stream

Publish the main stream using WebRTC, RTMP, or any other protocol.

For example, publish one RTMP stream with streamId `main` using the FFMPEG.

```bash
ffmpeg -re -i test.mp4 -c copy -f flv rtmp://IP-address/live/primary
```

### Step-2: Publish the Backup Stream

Publish the main stream using WebRTC, RTMP, or any other protocol.

For example, publish another RTMP stream with streamId `backup` using the FFMPEG.

```bash
ffmpeg -re -i test.mp4 -c copy -f flv rtmp://IP-address/live/backup
```

### Step-3: Test Failover Scenario

- AMS Web Player supports the automatic failover, in which the player switches to the backup stream when the primary stream goes down.

- Suppose you are playing the stream with WebRTC playback with the below URL.

  ```
  https://domain:5443/live/play/html?name=primary&playOrder=webrtc
  ```

  In this case, it only plays the primary stream and will not switch to the backup stream if primary fails.

- Now in order to add a backup stream as a failover stream, add the **&backupStreamId** parameter to the playback URL and pass your backup stream ID.

  In this case, the streamId is `backup`.

  ```
  https://domain:5443/live/play.html?name=primary&backupStreamId=backup&playOrder=webrtc
  ```

Now you can stop publishing the primary stream and check that the player will switch to the backup stream within a few seconds.

:::info
The great part is that it works in reverse mode as well. If the backup goes down after some time and primary is up, then the player will switch back to the primary stream.
:::

To learn more about Web Player, check [this document](https://antmedia.io/docs/guides/playing-live-stream/embedded-web-player/).


<br /><br />
---

<div align="center">
<h2> Interruptions free Streaming 🎥 </h2>
</div>

**Congratulations!** You've successfully configured **stream failover playback** with Ant Media Server. Your viewers can now enjoy **uninterrupted live streaming experiences**, even in the event of stream failures. By implementing primary and backup streams, you've enhanced the reliability of your live broadcasts, ensuring a seamless viewing experience for your audience.
Well done — your failover-enabled streaming solution is **live and ready to impress!**

