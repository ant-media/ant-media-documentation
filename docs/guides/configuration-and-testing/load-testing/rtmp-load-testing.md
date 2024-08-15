---
title: RTMP Load Testing 
description: A simple guide to making a RTMP load test on your Ant Media Server.
keywords: [Ant Media Load Testing, RTMP load test, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---

This document outlines the steps to perform a RTMP publishing load test on Ant Media Server using the provided script with the help of ffmpeg.

The script will simulate a specified number of RTMP live streams published to the Ant Media Server.

## Prerequisites

- Server or virtual machine running Ubuntu 20.04 or later.
- FFMPEG installed on the server.
- RTMP load test script

### Step 1: Download the RTMP Load Test Script

- Open a terminal window on your Ubuntu server or virtual machine .
- Navigate to the directory where you want to store the RTMP load test script.
- Use the following command to download the `rtmp_publisher.sh` script and give it executable permission:

     ```bash
     sudo wget https://raw.githubusercontent.com/ant-media/Scripts/master/load-testing/rtmp_publisher.sh && sudo chmod +x rtmp_publisher.sh
     ```

### Step 2: Run the RTMP Load Test

- Open a terminal window on your Ubuntu server or virtual machine and go to the directory where you have downloaded the `rtmp_publisher.sh` script.
- Use the following command to start the RTMP load test:
     ```bash
     sudo ./rtmp_publisher.sh file-name.mp4 rtmp://domain-or-Ip/AppName/streamId 10
     ```

  Here is the sample command:

  ```bash
  sudo ./rtmp_publisher.sh test.mp4 rtmp://rtmp.antmedia.io/LiveApp/test 10
  ```
     
  This command will publish 10 RTMP streams with stream IDs `test_1`, `test_2` etc. in the LiveApp application of your Ant Media Server.

  Replace the `file.mp4` with the actual mp4 file, the URL with the actual URL of your Ant Media Server and `10` with the number of RTMP streams you want to simulate.

- Wait for the test to be completed.
- Use the following command to stop the HLS load test:

     ```bash
     sudo pkill ffmpeg
     ```

Similary, you can increase the RTMP streams load count as needed.
