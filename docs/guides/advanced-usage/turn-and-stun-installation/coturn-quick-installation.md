# coTURN quick installation

What is a TURN Server?
----------------------

A TURN server is a network entity in charge of relaying media in VoIP related protocols. This includes SIP, H.323, WebRTC and other protocols.

When you try reaching out directly from one browser to another with voice or video data (sometimes other arbitrary kind of data), you end up going through different network devices. Some of these devices include Firewalls and NATs (Network Address Translators) which may decide due to internal policies not to pass your data.

When there are some network securities like firewall, then data packet does not transfer and we do not get proper streaming of another user.

So we use TURN server for this solution.

Ant Media Server does not require TURN server even if there is Symmetric NAT. However it's required if UDP ports are blocked for any reason or Ant Media Server is used as signaling server in P2P communication.

### Install TURN server

```console
apt-get update && apt-get install coturn
```

### Enable TURN server

Edit the following file.

```console
vim /etc/default/coturn
```

add the following line

```TURNSERVER_ENABLED=1```

### Configure TURN server

Edit file: ```/etc/turnserver.conf``` by adding following 2 lines as mentioned below:

```
user=username:password
realm=your_public_ip_address
```

Once done with making the changes as suggested above, restart TURN server with command ```systemctl restart coturn```.

Note: If you use an AWS EC2 instance, you must add the following lines in the ```turnserver.conf``` file.

  - EC2 private ip address : ```relay-ip=your_private_ip```
  - EC2 Public/Private ip address : ```external-ip=your_public_ip/your_private_ip```

Also, Open the following ports on AWS security group

  - TCP 443 #TLS listening port
  - TCP 3478-3479 #coturn listening port
  - TCP 32355-65535 #relay ports range
  - UDP 3478-3479 #coturn listening port
  - UDP 32355-65535 #relay ports range

That 's it.

### How to test Turn Server

**Command Line**

```console
shell turnutils\_uclient -v -t -T -u username -w password -p 3478 turn\_server\_ip
```

**Web Browser**

Open the following link and fill required details. Thereafter, _Add Server_ here : [https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/](https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/)

![](@site/static/img/turn1.png)

Once done. Click ```Gather Candidates```.
If the details you provided, validated, you will get the output as in the below image.

![](https://raw.githubusercontent.com/wiki/ant-media/Ant-Media-Server/images/turn3.png)

### How to add Turn Server to Ant Media sample pages

To add TURN server on client side, edit `publish_webrtc.html` in the _/antmedia/webapps/App-Name/samples_ folder for WebRTC publish sample, and edit `play.html`, `player.html`, and other sample pages in the _/antmedia/webapps/App-Name_ directory.

```
var pc_config = {
		'iceServers' : [ {
			     'urls' : 'turn:turn_server_address:port_number',
                             'username': "username",
                             'credential': "password",
		} ]
	};
```
From Ant Media Server v2.5.0 & above, TURN server can be configured on server side as well. [Learn More](/guides/configuration-and-testing/configuring-stun-addresses/#configuring-for-ant-media-244-and-later-versions)
