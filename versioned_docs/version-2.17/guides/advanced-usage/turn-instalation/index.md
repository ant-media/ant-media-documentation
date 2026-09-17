---
title: TURN Server Installation
description: Why you need a TURN server for WebRTC, when STUN is enough, and how to install Coturn for Ant Media Server.
keywords: [TURN Server Installation, Coturn, WebRTC NAT traversal, Ant Media Server Documentation]
sidebar_label: Overview
sidebar_position: 0
---

# TURN Server Installation

WebRTC is built for a **direct** media path between the browser and Ant Media Server. In practice, corporate firewalls, symmetric NAT, and blocked UDP ports often say otherwise. **STUN** helps a client learn its public address; when ICE still cannot find a working route, **TURN** relays the media so the session can start anyway.

For many deployments, the default Google STUN server is enough—Ant Media Server does not require TURN even with symmetric NAT in standard publish/play workflows. You **do** need your own TURN server when UDP is blocked, clients sit on locked-down private networks, or Ant Media Server acts as a **signaling server in P2P WebRTC**. If streaming fails despite open ports, TURN is the usual fix.

![WebRTC with and without a TURN server](/img/advanced-usage/turn-with-without.svg)

Pick a guide below to install **Coturn**, wire it into Ant Media Server, or spread load across multiple TURN nodes as your audience grows:

- [Coturn Quick Installation](/guides/advanced-usage/turn-instalation/coturn-quick-installation/) — automated or manual Coturn setup.
- [TURN Load Balancing](/guides/advanced-usage/turn-instalation/turn-load-balancing/) — distribute relay traffic across several TURN servers.

To point Ant Media Server and client SDKs at your TURN endpoint after install, see [STUN/TURN Server Configuration](/guides/configuration-and-testing/configuring-stun-turn-addresses/).
