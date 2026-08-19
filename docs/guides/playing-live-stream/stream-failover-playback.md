---
title: Stream Failover Playback
description: Stream Failover Playback with Web Player
keywords: [Backup Playback, WebRTC playback with Ant Media Server, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 7
---

# Stream Failover Playback

Ant Media Server introduces the concept of primary and backup streams to enhance the reliability and continuity of live streaming.

By the end of this guide, you'll have a backup stream configured so the player automatically switches over if the primary stream drops.

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
ffmpeg -re -i test.mp4 -c copy -f flv rtmp://<DOMAIN_NAME>/live/primary
```

### Step-2: Publish the Backup Stream

Publish the main stream using WebRTC, RTMP, or any other protocol.

For example, publish another RTMP stream with streamId `backup` using the FFMPEG.

```bash
ffmpeg -re -i test.mp4 -c copy -f flv rtmp://<DOMAIN_NAME>/live/backup
```

### Step-3: Test Failover Scenario

- AMS Web Player supports the automatic failover, in which the player switches to the backup stream when the primary stream goes down.

- Suppose you are playing the stream with WebRTC playback with the below URL.

  ```
  https://<DOMAIN_NAME>:5443/live/play.html?name=primary&playOrder=webrtc
  ```

  In this case, it only plays the primary stream and will not switch to the backup stream if primary fails.

- Now in order to add a backup stream as a failover stream, add the **&backupStreamId** parameter to the playback URL and pass your backup stream ID.

  In this case, the streamId is `backup`.

  ```
  https://<DOMAIN_NAME>:5443/live/play.html?name=primary&backupStreamId=backup&playOrder=webrtc
  ```

Now you can stop publishing the primary stream and check that the player will switch to the backup stream within a few seconds.

:::info
The great part is that it works in reverse mode as well. If the backup goes down after some time and primary is up, then the player will switch back to the primary stream.
:::

To learn more about Web Player, check [this document](/guides/playing-live-stream/embedded-web-player/).

You now have a backup stream configured, and the player will automatically switch over if the primary stream drops — and switch back once it recovers.

## Need Help?

If the player doesn't switch to the backup stream, confirm both streams are reaching the server and that `backupStreamId` matches the backup's actual stream ID, then reach out on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or contact [Technical Support](mailto:support@antmedia.io).

