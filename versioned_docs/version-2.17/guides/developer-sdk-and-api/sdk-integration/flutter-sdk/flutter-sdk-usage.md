---
title: SDK Usage
description: Install and use the Ant Media Flutter SDK (ant_media_flutter).
keywords: [Flutter SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
sidebar_label: SDK Usage
---

# SDK Usage

Use the sample apps first to learn the flow, then integrate `ant_media_flutter` into your project. See [Flutter samples](/category/flutter-sdk-samples/).

## Install

Add the package to `pubspec.yaml`:

```yaml
ant_media_flutter: ^*.*.*   # use the latest version from pub.dev
```

## Permissions and foreground service

```dart
import 'package:ant_media_flutter/ant_media_flutter.dart';

AntMediaFlutter.requestPermissions();

if (Platform.isAndroid) {
  AntMediaFlutter.startForegroundService();
}
```

## Configure the WebSocket URL

Set the server endpoint before calling `AntMediaFlutter.connect`:

| Protocol | Example | When to use |
|----------|---------|-------------|
| **WSS** | `wss://your-domain:5443/live/websocket` | Production — requires [SSL](/guides/installing-on-linux/setting-up-ssl/) (port **5443**) |
| **WS** | `ws://your-ip:5080/live/websocket` | Local HTTP without SSL (port **5080**) |

Replace `live` with your application name.

```dart
String serverUrl = "wss://your-domain:5443/live/websocket";
String streamId = "testStream";
```

## Connect

`AntMediaFlutter.connect` is the main entry point for publish, play, peer, conference, and data channel.

```dart
AntMediaFlutter.connect(
  // host
  'wss://your-domain:5443/live/websocket',

  // streamID
  'stream1',

  // roomID
  '',

  // type
  AntMediaType.Publish,

  // userScreen
  true,

  // onStateChange
  (HelperState state) {
    switch (state) {
      case HelperState.CallStateNew:
        setState(() { _inCalling = true; });
        break;
      case HelperState.CallStateBye:
        setState(() {
          _localRenderer.srcObject = null;
          _remoteRenderer.srcObject = null;
          _inCalling = false;
          Navigator.pop(context);
        });
        break;
      case HelperState.ConnectionOpen:
      case HelperState.ConnectionClosed:
      case HelperState.ConnectionError:
        break;
    }
  },

  // onLocalStream
  ((stream) {
    setState(() { _remoteRenderer.srcObject = stream; });
  }),

  // onAddRemoteStream
  ((stream) {
    setState(() { _remoteRenderer.srcObject = stream; });
  }),

  // onDataChannel
  (datachannel) {
    print(datachannel.id);
    print(datachannel.state);
  },

  // onDataChannelMessage
  (channel, message, isReceived) {
    print("Message Received: ${message.received}");
  },

  // onUpdateConferencePerson
  (streams) {},

  // onRemoveRemoteStream
  ((stream) {
    setState(() { _remoteRenderer.srcObject = null; });
  }),

  // ice servers
  [
    {'url': 'stun:stun.l.google.com:19302'},
  ],

  // callbacks
  (command, mapData) {},
);
```

## Connect parameters

<table className="sdk-api-table">
  <thead>
    <tr><th>Parameter</th><th>Description</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Host</strong></td><td>WebSocket URL of your Ant Media Server (see table above)</td></tr>
    <tr><td><strong>Stream ID</strong></td><td>Identifies the stream for publish and play</td></tr>
    <tr><td><strong>Room ID</strong></td><td>Used in multitrack conference mode</td></tr>
    <tr><td><strong>Type</strong></td><td><code>AntMediaType.Publish</code>, <code>Play</code>, <code>Peer</code>, <code>Conference</code>, or <code>DataChannelOnly</code></td></tr>
    <tr><td><strong>User Screen</strong></td><td>Switch between screen and camera at initialization</td></tr>
    <tr><td><strong>On State Change</strong></td><td>WebSocket/helper state: <code>CallStateNew</code>, <code>CallStateBye</code>, <code>ConnectionOpen</code>, <code>ConnectionClosed</code>, <code>ConnectionError</code></td></tr>
    <tr><td><strong>On Local Stream</strong></td><td>Fired when the local stream starts sending</td></tr>
    <tr><td><strong>On Add Remote Stream</strong></td><td>Fired when a remote stream is received</td></tr>
    <tr><td><strong>On Data Channel</strong></td><td>Fired when data channel state changes</td></tr>
    <tr><td><strong>On Data Channel Message</strong></td><td>Fired when a data channel message arrives</td></tr>
    <tr><td><strong>On Update Conference Person</strong></td><td>Fired when conference participants change</td></tr>
    <tr><td><strong>On Remove Remote Stream</strong></td><td>Fired when a remote stream is removed</td></tr>
  </tbody>
</table>

## Usage modes

Set `type` when calling `connect`:

| Mode | Type |
|------|------|
| Publish | `AntMediaType.Publish` |
| Play | `AntMediaType.Play` |
| P2P | `AntMediaType.Peer` |
| Conference | `AntMediaType.Conference` |
| Data channel only | `AntMediaType.DataChannelOnly` |

For full UI flows, see the [Flutter samples](/category/flutter-sdk-samples/).
