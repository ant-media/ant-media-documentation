---
title: Overcoming Restricted Networks for WebRTC with Ant Media Server
description: Solutions for WebRTC in Restricted Networks with Ant Media Server
keywords: [Overcoming Restricted Networks for WebRTC with Ant Media Server, Solutions for WebRTC in Restricted Networks with Ant Media Server, Ant Media Server Tutorials]
sidebar_position: 13
---

Imagine being in a restricted network environment where only HTTP/HTTPS ports are open to the outside world, and you want to publish and play WebRTC streams using Ant Media Server. Network restrictions can prevent WebRTC from functioning properly in such a scenario. In this document, we will show you how to overcome these limitations using a TURN server and Ant Media Server.

![](@site/static/img/ams-restricted-networks-turn.png)

## TURN Server Installation

1. First, update your package list and install the Coturn server:

```
sudo apt update
sudo apt install coturn -y
```

2. To run Coturn on ports below 1024, make the following changes:

```
sed -i -e 's/^User=.*/User=root/' -e 's/^Group=.*/Group=root/' /etc/systemd/system/multi-user.target.wants/coturn.service

systemctl daemon-reload
```
```
sudo setcap 'cap_net_bind_service=+ep' /usr/bin/turnserver
```

3. Obtain a certificate for your domain. (TLS/TCP does not work in Let's Encrypt Coturn due to socket buffer operation error) 

4. Update the TURN server configuration file (/etc/turnserver.conf) with these parameters:

```
lt-cred-mech
user=your-username:your-password
realm=your-server-host-name
listening-port=80
tls-listening-port=443
alt-listening-port=3478
alt-tls-listening-port=5349
proto=tcp
syslog
cert=/etc/ssl/{YOUR-DOMAIN-CERT}.pem
pkey=/etc/ssl/{YOUR-DOMAIN-KEY}.pem
```

5. Apply the changes by restarting Coturn:

```
systemctl restart coturn
```

6. Verify that everything is running correctly:

```
lsof -i:80 -i:443
```

Once the TURN server is running, you can test its functionality to ensure proper configuration using this [address](https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/). 

## Ant Media Server Installation

1. [Install](https://antmedia.io/docs/guides/installing-on-linux/installing-ams-on-linux/) the Ant Media Server or launch it from any [cloud marketplace](https://antmedia.io/docs/quick-start/#checkout-fast--easy-installations-on-cloud-marketplaces).

2. Once [SSL setup](https://antmedia.io/docs/guides/installing-on-linux/setting-up-ssl/) is complete, log in to your Ant Media Server at `https://your-ams:5443`, select the application you want to use, and navigate to Settings > Advanced. Update the following fields according to your TURN server configuration and save the settings:

```
stunServerURI=turn:your-turn-server-address:443?transport=tcp
turnServerUsername=your-turn-server-username
turnServerCredential=your-turn-server-password
```

3. Update the TURN credentials in your client-side code. For the default sample files (samples/publish_webrtc.html and samples/player.html), modify the ICE configuration:

```
	var pc_config =
        {
        'iceServers': [
            {
                'urls': 'stun:stun1.l.google.com:19302'
            },
            {
                'urls': 'turn:your-turn-server-address:443?transport=tcp',
                'username': 'your-turn-server-username',
                'credential': 'your-turn-server-password'
            }]
    }
```

Setting up a TURN server and configuring it with Ant Media Server allows you to seamlessly use WebRTC in restricted networks where only HTTP/HTTPS ports are open. This solution ensures uninterrupted communication with the outside world, enabling reliable video streaming through Ant Media Server.

<br /><br />
---

<div align="center">
<h2> 🔐 WebRTC, No Walls — TURNed On and Talking! 🌐 </h2>
</div>

With **TURN configured and AMS adjusted**, your WebRTC streams now flow even when all **you’ve got are HTTP/HTTPS channels**. TURN over TLS/TCP is punching through the restrictions.

Streams are **no longer blocked—they’re resilient, connected, and unstoppable.** 🎯


