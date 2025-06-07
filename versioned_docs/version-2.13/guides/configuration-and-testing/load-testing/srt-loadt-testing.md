---
title: SRT Load Testing 
description: A simple guide to making a SRT load test on your Ant Media Server.
keywords: [Ant Media Load Testing, SRT load test, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 4
---

This document outlines the steps to perform a SRT publishing load test on Ant Media Server using the provided script with the help of FFMPEG.

The script will simulate a specified number of SRT live streams published to the Ant Media Server.

## Prerequisites

- Server or virtual machine running Ubuntu 20.04 or later.
- FFMPEG installed on the server.
- SRT load test script

### Step 1: Download the SRT Load Test Script

- Open a terminal window on your Ubuntu server or virtual machine .
- Navigate to the directory where you want to store the SRT load test script.
- Use the following command to download the `srt_publisher.sh` script and give it executable permission:

     ```bash
     sudo wget https://raw.githubusercontent.com/ant-media/Scripts/master/load-testing/srt_publisher.sh && sudo chmod +x srt_publisher.sh
     ```

### Step 2: Run the SRT Load Test

- Open a terminal window on your Ubuntu server or virtual machine and go to the directory where you have downloaded the `srt_publisher.sh` script.
- Use the following command to start the SRT load test:
     ```bash
     sudo ./srt_publisher.sh /path/to/file.mp4 srt://domain-or-IP:4200?streamid=AppName/streamId 10
     ```

  Here is the sample command:

  ```bash
  sudo ./srt_publisher.sh /home/ubuntu/test.mp4 srt://srt.antmedia.io:4200?streamid=LiveApp/test 10
  ```
     
  This command will publish 10 SRT streams with stream IDs `test_1`, `test_2` etc. in the LiveApp application of your Ant Media Server.

  Replace `file.mp4` with the actual mp4 file, the URL with the actual URL of your Ant Media Server and `10` with the number of SRT streams you want to simulate.

- Wait for the test to be completed.
- Use the following command to stop the HLS load test:

     ```bash
     sudo pkill ffmpeg
     ```

Similarly, you can increase the SRT streams load count as needed.
