---
title: Overcoming Restricted Networks for WebRTC with Ant Media Server
description: Solutions for WebRTC in Restricted Networks with Ant Media Server
keywords: [Overcoming Restricted Networks for WebRTC with Ant Media Server, Solutions for WebRTC in Restricted Networks with Ant Media Server, Ant Media Server Tutorials]
sidebar_position: 13
---

Let’s imagine you are in a restricted network where only HTTP/HTTPS ports are open to the outside world, and you want to publish and play using WebRTC via Ant Media Server. However, due to the limitations of your network, you cannot achieve this. In this guide, I will explain how to overcome this limitation step by step.

![](@site/static/img/ams-restricted-networks-turn.png)

# TURN Server Installation

1. First, update your package list and install the Coturn server:

```
sudo apt update
sudo apt install coturn certbot -y
```

2. To run Coturn on ports below 1024, make the following changes:

```
sed -i -e 's/^User=.*/User=root/' -e 's/^Group=.*/Group=root/' /etc/systemd/system/multi-user.target.wants/coturn.service

systemctl daemon-reload
```

3. Create a SSL certificate by using Let's Encrypt (Or you can use your own SSL certificates)

```
sudo certbot certonly --standalone -d {YOUR-DOMAIN}
```

4. Update the TURN server configuration file (/etc/turnserver.conf) with these parameters:

```
lt-cred-mech
user=your-username:your-password
realm=your-server-host-name
listening-port=80
listening-tls-port=443
alt-listening-port=3478
alt-tls-listening-port=5349
proto=tcp
syslog
cert=/etc/letsencrypt/live/{YOUR-DOMAIN}/fullchain.pem
pkey=/etc/letsencrypt/live/{YOUR-DOMAIN}/privkey.pem
```

5. Apply the changes by restarting Coturn:

```
systemctl restart coturn
```

6. Verify that everything is running correctly:

```
lsof -i:80 -i:443
```

Once the TURN server is running, you can test its functionality to ensure proper configuration using this address. 

# Ant Media Server Installation

1. After purchasing your monthly license with a 5% discount here, follow the installation steps provided in the documentation.

2. Once SSL setup is complete, log in to your Ant Media Server at https://your-ams:5443, select the application you want to use, and navigate to Settings > Advanced. Update the following fields according to your TURN server configuration and save the settings:

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

By following these steps, you can successfully use WebRTC even in a restricted network where only HTTP/HTTPS ports are open, and stream video through Ant Media Server. With the configuration of the Coturn TURN server and its integration with Ant Media Server, you can overcome all network limitations required to communicate with the outside world.

