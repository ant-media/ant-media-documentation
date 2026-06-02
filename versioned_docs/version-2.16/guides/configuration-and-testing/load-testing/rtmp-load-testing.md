---
title: RTMP Load Testing 
description: A simple guide to making a RTMP load test on your Ant Media Server.
keywords: [Ant Media Load Testing, RTMP load test, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---

This document outlines the steps to perform an RTMP publishing load test on Ant Media Server using the provided script with the help of FFmpeg.

The script simulates a specified number of RTMP live streams published to the Ant Media Server.

## Prerequisites

- A server or virtual machine running Ubuntu 20.04 or later

- FFmpeg installed on the server

- The RTMP load test script

### Step 1: Downloading the RTMP Load Test Script

1. Open a terminal window on your Ubuntu server or virtual machine.

2. Navigate to the directory where you want to store the RTMP load test script.

3. Run the following command to download the rtmp_publisher.sh script and give it executable permission:

   ```bash
   sudo wget https://raw.githubusercontent.com/ant-media/Scripts/master/load-testing/rtmp_publisher.sh && sudo chmod +x rtmp_publisher.sh
   ```

### Step 2: Running the RTMP Load Test

1. Open a terminal window on your Ubuntu server or virtual machine and go to the directory where you downloaded the `rtmp_publisher.sh` script.

2. Run the following command to start the RTMP load test:

   ```bash
   sudo ./rtmp_publisher.sh /path/to/file.mp4 rtmp://domain-or-Ip/AppName/streamId 10
   ```

   Example command:

   ```bash
   sudo ./rtmp_publisher.sh /home/ubuntu/test.mp4 rtmp://rtmp.antmedia.io/LiveApp/test 10
   ```
     
   This command publishes 10 RTMP streams with stream IDs `test_1`, `test_2`, and so on in the LiveApp application of your Ant Media Server.

   Replace `file.mp4`with the actual MP4 file, update the URL with your Ant Media Server address, and change `10` to the number of RTMP streams you want to simulate.

3. Wait for the test to complete.

4. To stop the RTMP load test, run the following command:

   ```bash
   sudo pkill ffmpeg
   ```

Similarly, you can increase the number of RTMP streams to simulate higher loads.


<div align="center">

### RTMP load testing for you

</div>

You’ve downloaded the script, started publishing with FFmpeg, and simulated multiple RTMP streams flowing into your Ant Media Server. The dashboard shows the active streams increasing in line with the number you set, confirming that the load test is working.

Now you have a dependable way to validate RTMP publishing performance and ensure your server can handle the desired stream load.
