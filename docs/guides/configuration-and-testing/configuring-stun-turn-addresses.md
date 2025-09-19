---
title: Configuring STUN/TURN addresses 
description: Fix limitations of AWS Wavelength Zones both server side as well as client side. This guide will help you to setup custom TURN server for Android SDK and IOS SDK.
keywords: [STUN addresses, TURN configuration, add turn, TURN addresses, turn config, stun config, custom stun server, custom turn server, AWS Wavelength Zones, red5-web Properties, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 6
---

# Configuring STUN/TURN addresses

## Custom STUN servers for AWS Wavelength Zones
In most cases, the default Google STUN server is sufficient for WebRTC connectivity, so you don’t need to change the default settings.

However, in AWS Wavelength Zones, there are limitations when obtaining ICE candidates. To address this, Ant Media provides freely accessible STUN servers specifically designed for Wavelength Zones.

You can use them via: ```stun.wavelength.antmedia.cloud``` where multiple instances are actively running.

### Custom STUN Server Configuration in Ant Media Server

1. Open the Ant Media Server Web Panel and navigate to `Application` →`Advanced Settings`.

2. Change the following property

```js
"stunServerURI"="stun:stun1.l.google.com:19302"
```

to

```js
"stunServerURI"="stun:stun.wavelength.antmedia.cloud"
```

3. Save the application settings to apply the changes.

### Configure Custom STUN Server on the Client Side

If you configure STUN/TURN on the server, you don’t need to configure it again on the client.
If not, you must add your custom STUN/TURN server as an ICE server on the client side.

#### Javascript SDK

For custom STUN/TURN server to work you need to pass it to WebRTCAdaptor object as an element in iceServers list.

WebRTCAdaptor has a ```peerconnection_config``` field that accepts ```iceServers``` array.

- Example:

```js
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

- Example:

```js
    var pc_config = {
     		'iceServers' : [ {
     			'urls' : 'stun:stun.wavelength.antmedia.cloud'
     		} ]
     	};
```

And pass it to ```peerconnection_config``` field of WebRTCAdaptor, as specified above.

- If you are utilizing sample pages for publishing or playing, you can:

1. Open the html files under ```/usr/local/antmedia/webapps/live```

2. Find the lines below
   
```js
    var pc_config = {
     		'iceServers' : [ {
     			'urls' : 'stun:stun1.l.google.com:19302'
     		} ]
     	};
```

Replace them with the following

```js
    var pc_config = {
     		'iceServers' : [ {
     			'urls' : 'stun:stun.wavelength.antmedia.cloud'
     		} ]
     	};
```

- Save the files. You don't need to restart the Ant Media Server.

  
## Custom TURN servers

If WebRTC connectivity fails even with all ports open, you may need to configure a TURN server. To learn more about TURN server check this [Guide](https://antmedia.io/docs/guides/advanced-usage/turn-instalation/coturn-quick-installation/)

TURN is an extension of STUN, so configuration is very similar.

### Custom TURN server Configuration in Ant Media Server
You can configure TURN server directly through ant media server application settings. This way, you won't need to configure TURN server seperately in each client SDK.

- Goo to your Ant Media Server Dashboard  → `Application` → `Settings` → `Advanced Settings`.

- Set below settings as follows:
  
```js
"stunServerURI"="turn:TYPE_YOUR_TURN_SERVER_URL",
"turnServerUsername"="TYPE_YOUR_TURN_SERVER_USERNAME",
"turnServerCredential"="TYPE_YOUR_TURN_SERVER_PASSWORD",
```

- Save the settings. Ant Media Server will automatically use your TURN server.


### Configure custom TURN server in the JavaScript SDK.

```js
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

### Configure custom TURN server in the Embeded Player.

- If you are using Ant Media Server Embedded Web Player which is found in this [Github Repo](https://github.com/ant-media/Web-Player)
to play your streams you need to pass ```iceServers``` as String to the WebPlayer constructor.

Example:

```js
new WebPlayer({
    streamId: "teststream",
    httpBaseURL: "http://localhost:5080/live/",
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

- If you are utilizing the Ant Media Server sample ```play.html``` page, please remember that it is also based on embedded web player.

- You can find ```embedded-player.js``` in ```/usr/local/antmedia/webapps/live/webapps/js/embedded-player.js```  location and directly edit the ice server list by modifying the embedded player source.

- For more information about embedded web player, checkout this [Guide](https://antmedia.io/docs/guides/playing-live-stream/embedded-web-player/#ant-media-server-web-player)


### Configure a custom TURN server in the Android SDK.
- You can set a TURN server by using ```setTurnServer()``` method of WebRTCClient Builder in android SDK.

Example:

```js
webRTCClient = IWebRTCClient.builder()
                .setLocalVideoRenderer(fullScreenRenderer)
                .setServerUrl(serverUrl)
                .setTurnServer("turn:YOUR_SERVER", "username", "password")
                .setActivity(this)
                .setWebRTCListener(createWebRTCListener())
                .setDataChannelObserver(createDatachannelObserver())
                .build();
```

- This will add your turn server to ice server lists. If default google STUN fails, it will automaticly utilize your TURN server.

- If you are using WebRTC Android SDK as a module in your project, since it is open source, you can also directly add TURN server to ice server list.

- Open ```WebRTCClient.java``` file and go to the ```init()``` function. There is a line that adds stunServerUri to ice servers.  
 
```js
    iceServers.add(new PeerConnection.IceServer(stunServerUri));
```

Replace this line with:   
  
```js
    iceServers.add(PeerConnection.IceServer.builder("turn:YOUR_SERVER")
          .setUsername("username")
          .setPassword("credential")
          .createIceServer());
```

### Configure a custom TURN server in the IOS SDK.

- Open the ```Config.swift``` file, go to the ```createConfiguration()``` function. There is a line that adds stunServerUri to ice servers. 

```js
let configuration = Config.createConfiguration(server: stunServer)
```

Replace this function with:  
  
```js
    static func createConfiguration(server: RTCIceServer) ->` RTCConfiguration { 
    let config = RTCConfiguration.init()
    let iceServerNew = RTCIceServer.init(urlStrings: [your_server], username: "your_username", credential: "your_password")
    config.iceServers = [server, iceServerNew]
    return config
    }
```

### Configure a custom TURN server in the Flutter SDK.

```js
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

### Conclusion

Configuring STUN/TURN servers ensures reliable WebRTC connectivity, especially in restricted environments such as AWS Wavelength Zones.

* For most cases, Google’s default STUN server is enough.

* In Wavelength Zones, use Ant Media’s STUN servers.

* When NAT traversal or firewall restrictions block WebRTC, configure a TURN server for guaranteed connectivity.

With these steps, you can set up STUN/TURN servers on both server-side and client-side SDKs (JavaScript, Embedded Player, Android, iOS, and Flutter) for seamless streaming performance.