---
title: Configuring STUN/TURN addresses 
description: Fix limitations of AWS Wavelength Zones both server side as well as client side. This guide will help you to setup custom TURN server for Android SDK and IOS SDK.
keywords: [STUN addresses, TURN configuration, add turn, TURN addresses, turn config, stun config, custom stun server, custom turn server, AWS Wavelength Zones, red5-web Properties, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 6
---

# Configuring STUN/TURN addresses

## Custom STUN servers
Typically, the default Google STUN server suffices for WebRTC connectivity, eliminating the need to alter default STUN configurations. 
However, in AWS Wavelength Zones, there are limitations concerning obtaining ICE candidates. To address this challenge, Ant Media offers freely accessible STUN servers specifically tailored for AWS Wavelength Zones. These servers can be accessed via the ```stun.wavelength.antmedia.cloud``` address, where multiple instances are actively running.

### Custom STUN server Configuration in Ant Media Server

1\. Go to your Ant Media Server web panel application settings advanced section.

2\. Change  the following property

    ```"stunServerURI"="stun:stun1.l.google.com:19302"```

    to

    ```"stunServerURI"="stun:stun.wavelength.antmedia.cloud"```

3\. Save the application settings and restart the Ant Media Server.

    ```sudo service antmedia restart```

### Configure the client side
If you set up STUN/TURN on the Ant Media Server side, client-side STUN configuration becomes unnecessary. However, if STUN/TURN isn't configured on the server, you must include your custom STUN/TURN server as an ICE server on the client side.

#### Javascript SDK
For custom STUN/TURN server to work you need to pass it to WebRTCAdaptor object as an element in iceServers list.
WebRTCAdaptor object of javascript SDK has a ```peerconnection_config``` field which accepts an object of iceServers array.

Example:

```
var pc_config = {
     		'iceServers' : [ {
     			'urls' : 'stun:stun1.l.google.com:19302'
     		} ]
     	};

var webRTCAdaptor = new WebRTCAdaptor({
		  websocket_url: websocketURL,
		  mediaConstraints: mediaConstraints,
		  peerconnection_config: pc_config,
          //goes on...


```
To use custom STUN server, replace the default google STUN with your STUN server.

Example:

```
    var pc_config = {
     		'iceServers' : [ {
     			'urls' : 'stun:stun.wavelength.antmedia.cloud'
     		} ]
     	};
```

And pass it to ```peerconnection_config``` field of WebRTCAdaptor, as spesified above.

If you are utilizing sample pages for publishing or playing, you can:

1\. Open the html files under ```/usr/local/antmedia/webapps/APP-NAME```

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
## Custom TURN servers

If WebRTC connectivity fails eventhough all your required ports are open, its highly possible that you must configure a TURN server in Ant Media Server. To learn more about TURN server check this [Guide](category/turn-server-installation/)

TURN is an extension of STUN. So configuring it is very similar. 

### Custom TURN server Configuration in Ant Media Server
You can configure TURN server directly through ant media server application settings. This way, you wont need to configure TURN server seperately in each client SDK.

To do this, go to your web panel application settings advanced section. 
Set below settings as follows:
```
    "stunServerURI"="turn:TYPE_YOUR_TURN_SERVER_URL"
    "turnServerUsername"="TYPE_YOUR_TURN_SERVER_USERNAME"
    "turnServerCredential"="TYPE_YOUR_TURN_SERVER_PASSWORD"
```
Save application settings. 

Now ant media server will automaticly utilize your TURN server.

If you still want to configure TURN server in client side, check below headlines.

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

If you are using Ant Media Server Embedded Web Player which is found in this [Github Repo](https://github.com/ant-media/Web-Player)
to play your streams you need to pass ```iceServers``` as String to the WebPlayer constructor.

Example:
```
new WebPlayer({
    streamId: "teststream",
    httpBaseURL: "http://localhost:5080/WebRTCAppEE/",
    iceServers: '[
        { "urls": "stun:stun1.l.google.com:19302" },
        {
            'urls': 'turn:TURN_IP:3478',
            'username': 'username',
            'credential': 'password'
        }
    ]',
    videoHTMLContent: '<video id="video-player" class="video-js vjs-default-skin vjs-big-play-centered" controls playsinline style="width:100%;height:100%"></video>',
    playOrder: playOrderLocal
}, videoRef.current, placeHolderRef.current);
```
If you are utilizing ant media server sample ```play.html``` page, please remember that it is also based on embedded web player.

You can find ```embedded-player.js``` in ```/usr/local/antmedia/webapps/APP-NAME/webapps/js/embedded-player.js```  location and directly edit the ice server list by modifying the embedded player source.

For more information about embedded web player, checkout this [Guide](https://antmedia.io/docs/guides/playing-live-stream/embedded-web-player/#ant-media-server-web-player)


### Configure a custom TURN server in the Android SDK.
You can set a TURN server by using ```setTurnServer()``` method of WebRTCClient Builder in android SDK.

Example:
```
webRTCClient = IWebRTCClient.builder()
                .setLocalVideoRenderer(fullScreenRenderer)
                .setServerUrl(serverUrl)
                .setTurnServer("turn:YOUR_SERVER", "username", "password")
                .setActivity(this)
                .setWebRTCListener(createWebRTCListener())
                .setDataChannelObserver(createDatachannelObserver())
                .build();
```

This will add your turn server to ice server lists. If default google STUN fails, it will automaticly utilize your TURN server.

If you are using WebRTC Android SDK as a module in your project, since it is open source, you can also directly add TURN server to ice server list.

Open ```WebRTCClient.java``` file and go to the ```init()``` function. There is a line that adds stunServerUri to ice servers.  
 
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

Open the ```Config.swift``` file, go to the ```createConfiguration()``` function. There is a line that adds stunServerUri to ice servers. 

```
let configuration = Config.createConfiguration(server: stunServer)
```
Replace this function with:  
  
```
    static func createConfiguration(server: RTCIceServer) ->` RTCConfiguration { 
    let config = RTCConfiguration.init()
    let iceServerNew = RTCIceServer.init(urlStrings: [your_server], username: "your_username", credential: "your_password")
    config.iceServers = [server, iceServerNew]
    return config
    }
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
