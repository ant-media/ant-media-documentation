---
title: AMS Conference Structure
description: Understand how Ant Media Server represents conference rooms and participants with main track and sub track broadcasts.
keywords: [Conference Ant Media, Ant Media video conference, ant media conferencing, Publish, Multitrack conference, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

# Ant Media Server Conference Framework

Ant Media Server enables the development of robust WebRTC video conferencing applications across all supported SDK platforms, supporting unlimited conference participants.

Before beginning the development of a conference application on top of Ant Media Server, there are a few key concepts you need to understand.

## Main Track Broadcast (Conference Room)

When you publish a regular stream to Ant Media Server, regardless of the publishing method, the server creates a Broadcast object, which is also visible on the web panel. This object stores various details about the broadcast, such as its streamId, status, type, `subTrackStreamIds` and more. Take a look at Broadcast schema fields from broadcast [Rest API](https://antmedia.io/rest/#/default/createBroadcast).

:::info
In Ant Media Server, there is no distinct concept of a conference room. Instead, conference room and participants are  represented by broadcast objects. Each conference room is treated as a broadcast, and every participant within a room is also represented by their own broadcast object.
:::

A broadcast object that holds the streamIds of other broadcast objects in its `subTrackStreamIds` field is known as the main track broadcast. In a video conferencing context, this object represents the **conference room**, and its streamId will serve as the **roomId**.

## Sub Track Broadcast (Conference Participant)

A broadcast object whose `mainTrackStreamId` field is set to another broadcast objects streamId is known as the sub track broadcast. 

In video conferencing context, this object represents the **conference participant**, and its streamId will serve as participant id, which will also exist in `subTrackStreamIds` field of main track broadcast.


## Next Steps

- See these concepts in action with the built-in sample page: [Conference Sample Application](/guides/conference/conference-sample-application/)
- Build your own conference app step by step: [React Conference Tutorial - Part 1](/guides/conference/react-conference-tutorial-part-1/)
- For a production-ready open-source conference application, check out [Circle](/guides/conference/circle-video-conference-solution/)
