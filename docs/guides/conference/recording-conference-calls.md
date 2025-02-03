---
title: Conference Call Recording
description: Recording Conference Calls With Ant Media Server Using Media Push
keywords: [Conference call recording, Ant Media video conference, Media push plugin, Circle]
sidebar_position: 3
---

# Conference Call Recording

Unlike regular broadcast streams, conference calls have multiple participants, each with a unique stream. Therefore, the regular recording mechanism cannot be used in conference calls. Instead of recording each participant's stream individually, we need a solution to merge all the streams and record the entire room.

- In this document, we will learn how to easily record Ant Media Server conference calls using the sample page [multitrack-play.html](https://github.com/ant-media/StreamApp/blob/master/src/main/webapp/multitrack-play.html) and the [Media Push plugin](https://antmedia.io/docs/guides/recording-live-streams/media-push-plugin/).

## Joining a Conference Room

There are various ways to join a conference room, be it from the sample conference page [conference.html](https://github.com/ant-media/StreamApp/blob/master/src/main/webapp/conference.html) or using the mobile SDKs
