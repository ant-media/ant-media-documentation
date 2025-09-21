---
title: HLS Load Testing 
description: A simple guide to making a hls load test on your Ant Media Server.
keywords: [Ant Media Load Testing, hls load test, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

This document outlines the steps to perform an HLS load test on your Ant Media Server using the provided script with the help of FFmpeg.

The script simulates a specified number of HLS viewers accessing a live stream.

## Prerequisites

- A server or virtual machine running Ubuntu 20.04 or later

- FFmpeg installed on the server

- The HLS load test script provided

### Step 1: Download the HLS Load Test Script

1. Open a terminal window on your Ubuntu server or virtual machine.

2. Navigate to the directory where you want to store the HLS load test script.

3. Use the following command to download the `hls_players.sh` script and give it executable permission:

     ```bash
     sudo wget https://raw.githubusercontent.com/ant-media/Scripts/master/load-testing/hls_players.sh && sudo chmod +x hls_players.sh
     ```

### Step 2: Running the HLS Load Test

1. Start publishing your live stream. For example, let’s say it has the stream ID `stream1`.

2. Open a terminal window on your Ubuntu server or virtual machine and go to the directory where you downloaded the `hls_players.sh` script.

3. Run the following command to start the HLS load test:

     ```bash
     sudo ./hls_players.sh https://AMS-Domain:5443/LiveApp/streams/stream1.m3u8 100
     ```
     
  This command creates 100 HLS viewers for the stream ID stream1 in the LiveApp application of your Ant Media Server.

  Replace the URL with the actual URL of your live stream and 100 with the number of HLS viewers you want to simulate.

4. Wait for the test to complete.

5. To stop the HLS load test, use the following command:

     ```bash
     sudo pkill ffmpeg
     ```

Similarly, you can increase the number of simulated HLS viewers as needed.


<div align="center">

### HLS load testing for you

</div>

You’ve downloaded the script, launched FFmpeg processes, and simulated hundreds of HLS viewers pulling your `.m3u8` stream. The Ant Media Server dashboard reflects the increased viewer count, confirming that your load test is running as expected.

Tada — you now have a reliable way to validate HLS performance under real-world viewer loads in Ant Media Server.