---
title: Plugin Structure 
description: Ant Media plug-in architecture allows developers to customize and extend AMS to extend video feed while keeping the core server source codes untouched.
keywords: [Ant Media Server plug-in structure, Ant Media plug-in architecture, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 10
---

# Introduction to plug-in structure

Ant Media plug-in architecture allows developers to customize the video feed while keeping the server source code untouched. The plug-in structure addresses various use cases; for example, the MCU functionality is implemented as a plug-in by the Ant Media development team to demonstrate the versatility of the plug-in architecture.

At its core, a plug-in integrates into the regular flow of AMS. Here’s an example of a plug-in data flow:

![](@site/static/img/developer-guides/plugin-data-flow.png)

You can either access decoded video frames through the IFrameListener interface or encoded video packets via the IPacketListener interface, then perform any customizations you need.

### Custom Broadcasts

You can implement other streaming protocols for publishing to your Ant Media Server using custom broadcast plug-ins. The already implemented protocols include WebRTC, RTMP, SRT, and stream source pulling. [More information.](/v1/docs/custom-broadcasting)

### IFrameListener interface

Encoded packets and stream properties are sent to the plug-in by this interface. Implement this interface and register your concrete object to capture stream properties and packets from AMS.

#### Methods of IPacketListener:

*   **AVPacket onPacket(String streamId, AVPacket packet)**
    
          Packets are sent to the plugin with this method. A packet may be video or audio packet.
        
    
*   **void writeTrailer()**
    
             called while stream closing
        
    
*   **void setVideoStreamInfo(String streamId, StreamParametersInfo videoStreamInfo)**
    
          video stream properties are sent to the plugin with this method.
        
    
*   **void setAudioStreamInfo(String streamId, StreamParametersInfo audioStreamInfo)**
    
           audio stream properties are sent to the plugin with this method.
        
    

### IPacketListener Interface

Encoded packets and stream properties are sent to the plug-in by this interface. Implement this interface and register your concrete object to capture stream properties and packets from AMS.

#### Methods of IPacketListener:

*   **AVPacket onPacket(String streamId, AVPacket packet)**
    
          packets are sent to the plugin with this method. A packet may be video or audio packet.
        
    
*   **void writeTrailer()**
    
          called while stream closing
        
    
*   **void setVideoStreamInfo(String streamId, StreamParametersInfo videoStreamInfo)**
    
          video stream properties are sent to the plugin with this method.
        
    
*   **void setAudioStreamInfo(String streamId, StreamParametersInfo audioStreamInfo)**
    
          audio stream properties are sent to the plugin with this method.

### Congratulations!

You now have a clear understanding of the Ant Media plug-in structure and its two main interfaces, IFrameListener and IPacketListener. By implementing these interfaces, you can customize video processing, add new protocols, or extend streaming functionality—all without modifying the core AMS code. Your plug-in development environment is now ready to handle custom video streaming workflows.