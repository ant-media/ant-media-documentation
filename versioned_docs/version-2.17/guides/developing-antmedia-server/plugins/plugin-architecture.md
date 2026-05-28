---
title: Plugin Architecture 
description: Explore the inner workings of the plugin structure.
keywords: [Ant Media Server plug-in structure, Ant Media plug-in system, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

# Introduction to Plugin Architecture

:::info What you'll learn
This guide explains the architectural patterns and data flow of Ant Media Server's plugin system. You'll learn about the different plugin use cases and how data flows between plugins and the server.
:::

The Ant Media plug-in system allows developers to customize the video feed while keeping the server source codes untouched. The plug-in structure has various scenarios to address different developer needs. For example, MCU usage is developed as a plug-in by the Ant Media dev team, demonstrating the wide-range use cases for the plug-in architecture.

In the most basic explanation, a plug-in is added into the regular flow of AMS in ways that we will examine. Once you understand the structure and use cases, you can proceed to [building your own plugin](./developing-plugins.md).

Here is what a plugin data flow looks like:

![](@site/static/img/developer-guides/plugin-data-flow.png)

You can either get the decoded video frames( IFrameListener interface )or encoded video packets ( IPacketListener interface ) from Ant Media Server, then you can do whatever customization you require to do with them.


## Use cases

### Asynchronous case

Your plugin only gets the video frame and works on that video frame but doesn't feed the manipulated frame to the server again.  In this case, the work should be in a different thread and onVideoFrame should return the same AVFrame that passed to the method.

For example: you may have such a plugin that only collects the frame for statistics

<div style={{textAlign: 'center'}}>

![](@site/static/img/developer-guides/async-plugin.png)

</div>

### Synchronous case

Your plugin gets the video frame and works on that video frame and also feeds the manipulated frame to the server again. In this case, you should make the work in the caller thread and return the manipulated AVFrame.

For example: you may have such a plugin that adds watermark addition

<div style={{textAlign: 'center'}}>

![](@site/static/img/developer-guides/sync-plugin.png)

</div>

### Last point case

Your plugin gets the video frame and works on that video frame and there is no need to publish this AVFrame or feed this frame to other plugins. In this case, your plugin is the last point for the AVFrame in the execution. For this case, you should return a **null** value.

For example, you may have such a plugin that streams the AVFrame with a new protocol that isn't available in AMS or you may only record the frames.

<div style={{textAlign: 'center'}}>

![](@site/static/img/developer-guides/last-point-plugin.png)

</div>

### First point case <small><em>(custom broadcast)</em></small>

Ant Media Server already implements many protocols like WebRTC, RTMP, SRT and stream source pulling. But you may want to implement other streaming protocols for publishing to your server. In this case, you can create a [CustomBroadcast](./developing-plugins.md#custom-broadcast-api) and feed it from your plugin.

For example, you may have a plugin that receives frames from an external source and feeds them to the [CustomBroadcast](./developing-plugins.md#custom-broadcast-api). Then [CustomBroadcast](./developing-plugins.md#custom-broadcast-api) can publish this stream with WebRTC, HLS, or DASH.

<div style={{textAlign: 'center'}}>

![](@site/static/img/developer-guides/custom-broadcast.png)

</div>

---

For detailed implementation steps and code examples, see the [Developing Plugins](./developing-plugins.md) guide.




