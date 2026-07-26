---
title: Subscriber Block
description: Block a TOTP subscriber from publishing, playing, or both in Ant Media Server.
keywords: [Subscriber Block, TOTP, blockSubscriber, Stream Security, Ant Media Server Documentation]
sidebar_position: 2
sidebar_label: Subscriber Block
---

# Subscriber Block

With [TOTP](/guides/stream-security/totp/) enabled, each publisher or player is identified by a `subscriberId`. Subscriber Block lets you stop a specific subscriber from publishing, playing, or both at any moment—even if they are already connected. The block applies to all publish and play types (WebRTC, RTMP, HLS, and so on). Available in Ant Media Server 2.7.0 and later.

## Block publish

After the subscriber is publishing with `subscriberId` and `subscriberCode`, block them from publishing for 120 seconds with [blockSubscriber](https://antmedia.io/rest/#/default/blockSubscriber):

```bash
curl -X 'PUT' 'http://IP-address-or-domain:5080/live/rest/v2/broadcasts/streamId/subscribers/subscriberId/block/120/publish' -H 'accept: application/json'
```

![](@site/static/img/stream-security/subscriber_block_block_publish_postman.png)

On success, publishing stops immediately and the subscriber stays blocked for 120 seconds.

To remove the block, set the duration to `0`:

```bash
curl -X 'PUT' 'http://IP-address-or-domain:5080/live/rest/v2/broadcasts/streamId/subscribers/subscriberId/block/0/publish' -H 'accept: application/json'
```

If you unblock a subscriber after their TOTP has expired, they may get `unauthorized_access` until you generate a new TOTP.

## Block play

Map your app user IDs to `subscriberId`, generate a play TOTP, and start playback as shown in [TOTP play URLs](/guides/stream-security/totp/#play).

To block play for 120 seconds:

```bash
curl -X 'PUT' 'http://IP-address-or-domain:5080/live/rest/v2/broadcasts/streamId/subscribers/subscriberId/block/120/play' -H 'accept: application/json'
```

![](@site/static/img/stream-security/subscriber_block_block_play_postman.png)

On success, playback stops immediately and the subscriber stays blocked for 120 seconds.

To remove the block:

```bash
curl -X 'PUT' 'http://IP-address-or-domain:5080/live/rest/v2/broadcasts/streamId/subscribers/subscriberId/block/0/play' -H 'accept: application/json'
```

Playback can resume immediately after a successful unblock. If the user refreshes and the TOTP has expired, they need a new code. If the TOTP is still valid, they can reauthenticate and play again.

## Block publish and play together

When the same `subscriberId` is used for both roles, block both at once with type `publish_play`:

```bash
curl -X 'PUT' 'http://IP-address-or-domain:5080/live/rest/v2/broadcasts/streamId/subscribers/subscriberId/block/120/publish_play' -H 'accept: application/json'
```
