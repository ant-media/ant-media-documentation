---
title: WebRTC Load Testing 
description: A simple guide to making a webrtc load test on your Ant Media Server.
keywords: [Ant Media Load Testing, WebRTC test tool, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---


In this tutorial, we'll explain how to do WebRTC load testing on your Ant Media Server. The test environment has two parts: the test server and the SUT (system under test). We have two different setups for two different SUTs.

## Preparation of SUT

### One instance setup

In this option, we have only one Ant Media Server instance as SUT.

```
    +-------------------+                  +----------------------+
    |                   |   streaming      |                      |
    |                   |   playing        |                      |
    |                   | <--------------> |                      |
    |    Test Server    |                  |   Ant Media Server   |
    |                   |                  |                      |
    |                   | <--------------> |                      |
    |                   |    rest          |                      |
    +-------------------+                  +----------------------+
```
To setup the Ant Media Server, please check [here](https://github.com/ant-media/Ant-Media-Server/wiki/Installation).

### Cluster setup

Here we have a cluster structure as SUT which contains one origin and N edge servers.
```
                                           +--------------------+
                                           |                    |
                                           |                    |
                                           |  Ant Media Server  |
                                +--------->+                    |
                                |          |     (Origin)       |
    +-----------+               |          |                    |
    |           |    streaming  |          |                    |
    |           +---------------+          +--------------------+
    |           |
    |Test Server| playing +------------------------------------------------+
    |           +<--------+                                                |
    |           |         |             Load Balancer                      |
    |           +---------+                                                |
    +-----------+   rest  +--+------------+---------------------+----------+
                             |            |                     |
                             |            |                     |
                             |            |                     |
                             |            |                     |
                             |            |                     |
               +-------------+--+  +------+---------+     +-----+----------+
               |                |  |                |     |                |
               |                |  |                |     |                |
               |Ant Media Server|  |Ant Media Server| ... |Ant Media Server|
               |                |  |                |     |                |
               |   (Edge-1)     |  |   (Edge-2)     |     |   (Edge-N)     |
               |                |  |                |     |                |
               |                |  |                |     |                |
               +----------------+  +----------------+     +----------------+
    
```
To deploy an Ant Media Server cluster, please see [here](https://github.com/ant-media/Ant-Media-Server/wiki/Scaling-and-Load-Balancing).

## Ant Media WebRTC test tool

You can download the WebRTC load test tool from your account at [antmedia.io](https://antmedia.io/). The test tool is listed for Enterprise Edition under the Download section of your account.

Ant Media WebRTC Test Tool is a Java project for testing Ant Media Server WebRTC capabilities and has the following features:.

* This tool is compatible with the Ant Media Server signaling protocol.
* It has two modes: publisher and player (-m flag determines the mode)
* It has two options: with UI or without UI (-u flag determines the UI on/off)
* You can also save received (in player mode) video.
* You can create a load with the `-n` flag.

## Running Ant Media WebRTC Test Tool

### Installation

```bash
apt-get install openjdk-11-jre -y
unzip webrtctest-release-*.zip
cd webrtctest/
```

This tool can be run from the terminal with the following options:.

```bash
#publishes output.mp4 to the server with default name myStream
./run.sh -f output.mp4 -m publisher -s 10.10.175.53 -p 5080 -n 1 -u false

#plays 100 viewers for default stream, myStream
./run.sh -m player -n 100 -s 10.10.175.53 -p 5080 -u false
```

If you are doing load testing on a cluster via a load balancer, and if your origin server is running behind port 443 and your Edge server behind port 5443, then the command should be as follows:.

```bash
./run.sh -f test.mp4 -m publisher -s server-domain-name -n 1 -p 443 -q true -u false

./run.sh -m player -i streamId -n 100 -s server-domain-name -p 5443 -q true -u false
```

### Parameters

```
Flag 	 Name      	    Default   	 Description                 
---- 	 ----      	    -------   	 -----------   
f    	 File Name 	    test.mp4    Source file* for publisher output file for player
s    	 Server IP 	    localhost 	 server ip                   
q    	 Security  	    false     	 true(wss) or false(ws)      
l        Log Level      3            0:VERBOSE,1:INFO,2:WARNING,3:ERROR,4:NONE
i    	 Stream Id 	    myStream  	 id for stream               
m    	 Mode      	    player    	 publisher or player         
u    	 Show GUI  	    true      	 true or false               
p    	 Port      	    5080      	 websocket port number 
v    	 Verbose   	    false     	 true or false 
n    	 Count     	    1         	 Number of player/publisher connctions 
k        Kafka Broker.  null         Kafka broker address with port
r    	 Publish Loop.  false        true or false
c    	 Codec          h264         h264 or VP8 
d    	 Data Channel.  false        true or false 
a        App Name       WebRTCAppEE  application name
```

:::imp
The file in mp4 format should have h264 encoded video and Opus encoded audio.
:::
