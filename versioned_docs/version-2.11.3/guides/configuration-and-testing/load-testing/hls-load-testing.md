---
title: HLS Load Testing 
description: A simple guide to making a hls load test on your Ant Media Server.
keywords: [Ant Media Load Testing, hls load test, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

This document outlines the steps to perform a HLS load test on your Ant Media Server using the provided script with the help of ffmpeg.

The script will simulate a specified number of HLS viewers accessing a live stream.

## Prerequisites

- A server or virtual machine running Ubuntu 20.04 or later.
- FFMPEG installed on the server.
- The HLS load test script provided.

### Step 1: Download the HLS Load Test Script

- Open a terminal window on your Ubuntu server or virtual machine.
- Navigate to the directory where you want to store the HLS load test script.
- Use the following command to download the `hls_players.sh` script and give it executable permission:

     ```bash
     sudo wget https://raw.githubusercontent.com/ant-media/Scripts/master/load-testing/hls_players.sh && sudo chmod +x hls_players.sh
     ```

### Step 2: Run the HLS Load Test

- Start publishing your live stream and let's say it has streamId `stream1`.
- Open a terminal window on your Ubuntu server or virtual machine and go to the directory where you have downloaded the `hls_players.sh` script.
- Use the following command to start the HLS load test:
     ```bash
     sudo ./hls_players.sh https://AMS-Domain:5443/LiveApp/streams/stream1.m3u8 100
     ```
     
  This command will create 100 HLS viewers for streamId stream1 in the LiveApp application of your Ant Media Server.

  Replace the URL with the actual URL of your live stream and `100` with the number of HLS viewers you want to simulate.

- Wait for the test to complete.
- Use the following command to stop the HLS load test:

     ```bash
     sudo pkill ffmpeg
     ```

Similary, you can increase the HLS viewers load count as needed.
