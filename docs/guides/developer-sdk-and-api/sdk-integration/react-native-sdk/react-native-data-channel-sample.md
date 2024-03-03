---
title: WebRTC stream in React Native
description: Publishing WebRTC Live stream Using iOS SDK 
keywords: [React Native SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 9
---

*   Open **/samples/DataChannel/src/[](https://github.com/ant-media/WebRTC-React-Native-SDK/blob/develop/samples/DataChannel/src/Chat.tsx "Chat.tsx")**[](https://github.com/ant-media/WebRTC-React-Native-SDK/blob/develop/samples/DataChannel/src/Chat.tsx "Chat.tsx")[**Chat**.](https://github.com/ant-media/WebRTC-React-Native-SDK/blob/develop/samples/DataChannel/src/Chat.tsx "Chat.tsx")[](https://github.com/ant-media/WebRTC-React-Native-SDK/blob/develop/samples/DataChannel/src/Chat.tsx "Chat.tsx")**[](https://github.com/ant-media/WebRTC-React-Native-SDK/blob/develop/samples/DataChannel/src/Chat.tsx "Chat.tsx").tsx** file and update **defaultStreamName** variable for stream name and update **webSocketUrl** variable with server name.![](@site/static/img/image-1654599250441.png)

*   Go to **/samples/DataChannel** folder and follow the [Install dependencies and run sample projects](/guides/developer-sdk-and-api/sdk-integration/react-native-sdk#install-dependencies-and-run-sample-projects) steps to run the **Play** sample React native app.
*   Tap **Publish** button to start publishing in data channel.

![](@site/static/img/image-1656673042845.png)

*   After that you can start sending messages using send button and also can see the received button, You can also quickly play the stream via https://your\_domain:5443/WebRTCAppEE/player.html and send and receive the data channel messages.

![](@site/static/img/image-1656673300268.png)