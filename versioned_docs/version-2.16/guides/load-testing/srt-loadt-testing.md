---
title: SRT Load Testing 
description: A simple guide to making a SRT load test on your Ant Media Server.
keywords: [Ant Media Load Testing, SRT load test, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 4
---

This document outlines the steps to perform an SRT publishing load test on Ant Media Server using the provided script with the help of FFmpeg.

The script simulates a specified number of SRT live streams published to the Ant Media Server.

## Prerequisites

- A server or virtual machine running Ubuntu 20.04 or later

- FFmpeg installed on the server

- The SRT load test script

### Step 1: Downloading the SRT Load Test Script

1. Open a terminal window on your Ubuntu server or virtual machine.

2. Navigate to the directory where you want to store the SRT load test script.

3. Run the following command to download the `srt_publisher.sh` script and give it executable permission:

   ```bash
   sudo wget https://raw.githubusercontent.com/ant-media/Scripts/master/load-testing/srt_publisher.sh && sudo chmod +x srt_publisher.sh
   ```

### Step 2: Running the SRT Load Test

1. Open a terminal window on your Ubuntu server or virtual machine and go to the directory where you downloaded the `srt_publisher.sh` script.

2. Run the following command to start the SRT load test:

   ```bash
   sudo ./srt_publisher.sh /path/to/file.mp4 srt://domain-or-IP:4200?streamid=AppName/streamId 10
   ```

   Here is the sample command:

   ```bash
   sudo ./srt_publisher.sh /home/ubuntu/test.mp4 srt://srt.antmedia.io:4200?streamid=LiveApp/test 10
   ```
     
   This command will publish 10 SRT streams with stream IDs `test_1`, `test_2` etc. in the LiveApp application of your Ant Media Server.

   Replace `file.mp4` with the actual mp4 file, the URL with the actual URL of your Ant Media Server and `10` with the number of SRT streams you want to simulate.

3. Wait for the test to complete.

4. To stop the SRT load test, run the following command:

   ```bash
   sudo pkill ffmpeg
   ```

Similarly, you can increase the number of SRT streams to simulate higher loads.


<div align="center">

### SRT load testing for you

</div>


You’ve downloaded the script, launched FFmpeg, and started publishing multiple SRT streams into your Ant Media Server. The terminal confirms each stream is active, and the dashboard reflects the increase in stream count.

Now you have a reliable way to validate SRT publishing performance and ensure your server can handle the expected stream load.
