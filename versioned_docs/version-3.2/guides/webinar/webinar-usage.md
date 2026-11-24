---
title: Webinar in Action
description: Learn Circle Webinar roles and run a host, speaker, and listener session on Ant Media Server.
keywords: [Circle Webinar usage, webinar host speaker listener, raise hand, Ant Media Server Documentation]
sidebar_position: 3
sidebar_label: Usage
---

# Webinar in Action

This guide walks through Circle Webinar roles and a typical session flow. Replace `YOUR_DOMAIN` and the app name (`webinar`) with your own values. Examples use room `room1`.

## Roles

| Role | Responsibility |
| --- | --- |
| **Host** (moderator) | Runs the session: visibility, mute/camera controls, approve speaker requests, demote temporary speakers |
| **Speaker** (presenter) | Shares video, audio, or screen; usually a small set chosen by the host |
| **Listener** (attendee) | Watches and listens; may use chat/Q&A; cannot broadcast unless the host promotes them |

Listeners often receive **WebRTC** for interactivity or **HLS/DASH** when you need broader scale.

## Join a room

### Host

```text
https://YOUR_DOMAIN:5443/webinar/room1?role=host&streamName=host&skipSpeedTest=true
```

The host can see every speaker in the room.

![](@site/static/img/conference/webinar/host.webp)

### Speaker

```text
https://YOUR_DOMAIN:5443/webinar/room1?role=speaker&streamName=speaker&skipSpeedTest=true
```

By default the speaker can also see the host. Visibility between roles is controlled by scope settings (below).

![](@site/static/img/conference/webinar/speaker.webp)

### Listener

```text
https://YOUR_DOMAIN:5443/webinar/room1?role=listener&streamName=listener&skipSpeedTest=true&playOnly=true
```

In `playOnly` mode, listeners typically do not see speakers until the host makes someone visible. They can still use the chat.

![](@site/static/img/conference/webinar/listener.webp)

## Make a speaker visible to listeners

The host can allow a speaker to be watched by every listener. Use the control highlighted below:

![](@site/static/img/conference/webinar/active-speaker.webp)

Listeners then see that speaker in the room.

## Promote a listener to speaker

1. The listener raises their hand:

![](@site/static/img/conference/webinar/request-for-publisher.webp)

2. The host approves or denies the request:

![](@site/static/img/conference/webinar/publisher-request.webp)

That is the core webinar loop: stage presenters, open the floor when needed, and keep the audience in sync.

## Role visibility (scope)

Who can see whom is defined in application **Advanced Settings** under:

```json
"participantVisibilityMatrix"
```

:::info
Core roles for a basic webinar are `host`, `speaker`, `listener`, and `active_speaker` (a speaker the host has made visible to listeners). Other roles exist for advanced setups.
:::

**Host** can see everyone:

```json
"host": [
  "host",
  "active_host",
  "speaker",
  "active_speaker",
  "listener",
  "temp_listener",
  "active_temp_listener"
]
```

**Speaker** can see a broad set (adjust as needed):

```json
"speaker": [
  "host",
  "active_host",
  "speaker",
  "active_speaker",
  "temp_listener",
  "active_temp_listener"
]
```

**Listener** sees only activated stage roles:

```json
"listener": [
  "active_host",
  "active_speaker",
  "active_temp_listener"
]
```

## Try it live

Test the same URL pattern on the public demo: [meet.antmedia.io/webinar](https://meet.antmedia.io/webinar/).

You now have roles, join links, and visibility under control. Open a room, bring a speaker on stage, and invite your audience—your webinar is ready to go live.
