---
title: coTURN Quick Installation 
description: Install coTURN, TURN Server to stream your data without any firewall restrictions.
keywords: [Setup TURN Server, TURN Server Installation, TURN Server Installation, coTURN Quick Installation, Ant Media Server Documentation, Ant Media Server Tutorials]
---

# coTURN quick installation

What is a TURN Server?
----------------------

A TURN server is a network entity in charge of relaying media in VoIP-related protocols. This includes SIP, H.323, WebRTC, and other protocols.

When you try reaching out directly from one browser to another with voice or video data (sometimes other arbitrary kinds of data), you end up going through different network devices. Some of these devices include Firewalls and NATs (Network Address Translators) which may decide due to internal policies not to pass your data.

When there are some network securities like a firewall, then the data packet does not transfer and we do not get proper streaming of another user.

So we use the TURN server for this solution.

Ant Media Server does not require a TURN server even if there is Symmetric NAT. However, it's required if UDP ports are blocked for any reason or Ant Media Server is used as a signaling server in P2P communication.

## Install the TURN server

### Automatic Installation

By running the `install_turn-server.sh` script, you can quickly install and configure the TURN server automatically.

- Get the `install_turn-server.sh` script

```js
wget https://raw.githubusercontent.com/ant-media/Scripts/master/install_turn-server.sh && chmod +x install_turn-server.sh
```
- Run the installation script

```js
sudo ./install_turn-server.sh
```

### Manual Installation

If you want to install the TURN server manually, please follow the below steps.

1. **Install coturn**
  
```js
apt-get update && apt-get install coturn
```

2. **Enable TURN server**

- Edit the below file.

```js
vim /etc/default/coturn
```

- Add the following line

```js
TURNSERVER_ENABLED=1
```

3. **Configure the TURN server**

- Edit file: ```/etc/turnserver.conf``` by adding the following 2 lines as mentioned below:

```js
user=username:password
realm=your_public_ip_address
```

4. Once you are done with making the changes as suggested above, **restart the TURN server** with the below command.

```js
systemctl restart coturn
```

**Note**: If you using an AWS EC2, GCP, or Azure instance, etc. where NAT is used, you must add the following lines in the ```turnserver.conf``` file.

  - EC2 private ip address : ```relay-ip=your_private_ip```
  - EC2 Public/Private ip address : ```external-ip=your_public_ip/your_private_ip```

Also, Open the following ports on the security group or firewall.

  - TCP 443 #TLS listening port
  - TCP 3478-3479 #coturn listening port
  - TCP 32355-65535 #relay ports range
  - UDP 3478-3479 #coturn listening port
  - UDP 32355-65535 #relay ports range

## How to test Turn Server

You can test the TURN server if it is configured and working properly with the below methods.

1. **Command Line**

```js
turnutils_uclient -v -t -T -u username -w password -p 3478 turn_server_ip
```

2. **Web Browser**

- Open the following link and fill required details. Thereafter, _Add Server_ here : [https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/](https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/)

![](@site/static/img/turn1.png)

- Once done. Click ``` Gather Candidates```. If the details you provided, are validated, you will get the output as in the below image.

![](https://raw.githubusercontent.com/wiki/ant-media/Ant-Media-Server/images/turn3.png)

## How to use the TURN server with Ant Media

To use your TURN server with Ant Media, check out this
[Guide](https://antmedia.io/docs/guides/configuration-and-testing/configuring-stun-turn-addresses/)

<br /><br />
---

<div align="center">
<h2> 🔄 TURN-Up the Connectivity — Firewalls, NATs, You're No Match! ⚡️ </h2>
</div>

With **coTURN** installed and configured, even the strictest **firewalls and NATs can't stop your streams**. Your communication gets relayed when needed, keeping everything smooth and seamless.

**Your network just got smarter** — reliable, resilient, and ready for any connection challenge! 🚀

