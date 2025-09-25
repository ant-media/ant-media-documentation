---
title: WebRTC Load Testing 
description: A simple guide to making a webrtc load test on your Ant Media Server.
keywords: [Ant Media Load Testing, WebRTC test tool, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

# Load testing

In this tutorial, we explain how to perform WebRTC load testing on your Ant Media Server. The test environment has two parts: the test server and the SUT (system under test). There are two different setups depending on whether the SUT is a standalone server or a cluster.

## Preparation of SUT

### Standalone server setup

In this option, there is only one Ant Media Server instance as the SUT.

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
To set up the Ant Media Server, see the installation guide:(https://antmedia.io/docs/guides/installing-on-linux/installing-ams-on-linux/).

### Cluster setup

In this option, the SUT is a cluster with one origin server and N edge servers.

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
To deploy an Ant Media Server cluster, see the scaling guide: (https://antmedia.io/docs/guides/clustering-and-scaling/scaling-ant-media-server/).

## Ant Media WebRTC test tool

You can download the WebRTC Load Test Tool from your account at [antmedia.io](https://antmedia.io/). The test tool is available under the Download section for Enterprise Edition users.

The Ant Media WebRTC Test Tool is a Java project for testing Ant Media Server’s WebRTC capabilities. It has the following features:

* Compatible with the Ant Media Server signaling protocol
* Two modes: publisher and player (controlled with the -m flag)
* Two options: with UI or without UI (controlled with the -u flag)
* Ability to save received video in player mode
* Ability to create load with the -n flag

## Running Ant Media WebRTC Test Tool

### Installation

Run the following commands to install Java and unpack the tool:

```bash
sudo apt-get install openjdk-17-jre -y
unzip webrtc-load-test-tool-*.zip
cd webrtc-load-test/
```
### Runningthe Test Tool

The tool can be run from the terminal with the following options:

```bash
#publishes output.mp4 to the server with default name myStream
./run.sh -f output.mp4 -m publisher -s 10.10.175.53 -p 5080 -n 1 -u false

#plays 100 viewers for default stream, myStream
./run.sh -m player -n 100 -s 10.10.175.53 -p 5080 -u false
```

If you are load testing on a cluster via a load balancer, and your origin server is running behind port 443 and your edge servers behind port 5443, the commands are as follows:

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
The MP4 file should contain H.264-encoded video and Opus-encoded audio.
:::


<div align="center">

### WebRTC load testing for you

</div>

You’ve configured your test server, deployed the WebRTC Load Test Tool, and launched publishers and players against your Ant Media Server. The terminal confirms that streams are being published and connections are established, and the dashboard reflects the increase in activity.

Now you have a dependable way to verify WebRTC performance and confirm that your server can handle the expected load.