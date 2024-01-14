---
title: Configuring STUN addresses 
description: Fix limitations of AWS Wavelength Zones both server side as well as client side. This guide will help you to setup custom TURN server for Android SDK and IOS SDK.
keywords: [STUN addresses, AWS Wavelength Zones, red5-web Properties, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 6
---

# Configuring STUN addresses

There are some limitations in AWS Wavelength Zones regarding getting ICE candidates. In order to resolve this issue, Ant Media provides free-to-use STUN servers that are reachable in AWS Wavelength Zones. There are a couple of instances are running behind ```stun.wavelength.antmedia.cloud``` address.

If you use Ant Media 2.4.4 and above, please see section "Configuring for Ant Media 2.4.4 and later versions."

How to use custom STUN servers
------------------------------

### Configure the Ant Media Server

1\. Assume that you're using WebRTCAppEE, open the following file ```/usr/local/antmedia/webapps/WebRTCAppEE/WEB-INF/red5-web.properties```

2\. Add the following property

    settings.webrtc.stunServerURI=stun:stun.wavelength.antmedia.cloud

3\. Save the file and restart the Ant Media Server.

    sudo service antmedia restart

### Configure the client side

1\. Open the html files under ```/usr/local/antmedia/webapps/WebRTCAppEE```

2\. Find the lines below
```
    var pc_config = {
     		'iceServers' : [ {
     			'urls' : 'stun:stun1.l.google.com:19302'
     		} ]
     	};
```
Replace them with the following
```
    var pc_config = {
     		'iceServers' : [ {
     			'urls' : 'stun:stun.wavelength.antmedia.cloud'
     		} ]
     	};
```
Save the files. You don't need to restart the Ant Media Server.

### Configure a custom TURN server in the Android SDK.

Open the WebRTCClient.java file and go to the init function. There is a line that adds stunServerUri to ice servers.  
 
```
    iceServers.add(new PeerConnection.IceServer(stunServerUri));
```
Replace this line with:   
  
```
    iceServers.add(PeerConnection.IceServer.builder("turn:YOUR_SERVER")
          .setUsername("username")
          .setPassword("credential")
          .createIceServer());
```
### Configure a custom TURN server in the IOS SDK.

Open the Config.swift file, go to the createConfiguration function. There is a line that adds stunServerUri to ice servers. 

    let configuration = Config.createConfiguration(server: stunServer)

Replace this function with:  
  
```
    static func createConfiguration(server: RTCIceServer) ->` RTCConfiguration { 
    let config = RTCConfiguration.init()
    let iceServerNew = RTCIceServer.init(urlStrings: [your_server], username: "your_username", credential: "your_password")
    config.iceServers = [server, iceServerNew]
    return config
    }
```
### Configure a custom TURN server in the JavaScript SDK.
```
    var pc_config =
    {
        'iceServers': [
            {
                'urls': 'stun:stun1.l.google.com:19302'
            },
            {
                'urls': 'TURN_IP:3478',
                'username': 'username',
                'credential': 'passsword'
            }]
    }

    var webRTCAdaptor = new WebRTCAdaptor({
        peerconnection_config: pc_config,
        // other options
    })
```
### Configure a custom TURN server in the Embeded Player.

    sudo nano /usr/local/antmedia/{APP_NAME}/js/videojs-webrtc-plugin.js

Edit the peerconnection_config variable By adding your TURN Server Configuration
```
    this.peerconnection_config = {
        'iceServers': [{
            'urls': 'stun:stun1.l.google.com:19302'
        },
        {
            'urls': 'turn:TURN_IP:3478',
            'username': 'username',
            'credential': 'password'
        }],

        sdpSemantics: 'unified-plan'
    };
```
### Configure a custom TURN server in the Flutter SDK.
```
    List<Map<String, String>> iceServers = [
    {'url': 'stun:stun.l.google.com:19302'},
    {
    'urls': 'turn:TURN_IP:3478',
    'username': 'username',
    'credential': 'password'
    }
    ];

    AntMediaFlutter.connect(
        //other options, 
        widget.iceServers
    );
```

### Configuring for Ant Media 2.4.4 and later versions

Ant Media Server v2.4.4 and later versions support adding a TURN server for the serve side. In order to do that, follow the instructions below.

Edit your application's configuration file (**/usr/local/antmedia/webapps/{YOUR_APP_FOLDER}/WEB-INF/red5-web.properties**) with your favorite text editor, and add the following properties to this file:
```
    settings.webrtc.stunServerURI=turn:WRITE_YOUR_TURN_SERVER_URL
    settings.webrtc.turnServerUsername=WRITE_YOUR_TURN_SERVER_USERNAME
    settings.webrtc.turnServerCredential=WRITE_YOUR_TURN_SERVER_PASSWORD
    
```
Save the file and restart the Ant Media Server:
```
    sudo service antmedia restart
```    

You can set a custom STUN server to the following property ```**settings.webrtc.stunServerURI**```. Make sure not to forget to start with ```stun:``` prefix. If you don't have a username or password, you can leave the fields blank.
