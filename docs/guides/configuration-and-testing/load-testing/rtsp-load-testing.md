---
title: RTSP Load Testing 
description: A simple guide to making a RTSP load test on your Ant Media Server.
keywords: [Ant Media Load Testing, RTSP load test, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 5
---

# RTSP Load Testing

This document explains how to generate RTSP streams and use them for RTSP load testing in Ant Media Server.

In this guide, you will:
- Generate an RTSP stream using a sample MP4 file.
- Use the RTSP URL as a Stream Source in Ant Media Server.
- Create multiple RTSP Stream Sources through REST API and Simulate RTSP ingest load on Ant Media Server.
- Measure how many RTSP streams your server can handle.

Unlike RTMP/SRT publishing tests, RTSP load testing requires generating an RTSP source stream first and then using that RTSP URL as a Stream Source in the Ant Media Server.

## Prerequisites

- Ubuntu 20.04 or later
- A server for generating RTSP streams
- A server running Ant Media Server
You can use separate servers for the RTSP generator and Ant Media Server, or run both on the same server for smaller tests.
- Internet access between both servers
- Install the required GStreamer packages using the below commands:
  ```bash
  sudo apt update
  sudo apt install -y gstreamer1.0* libgstrtspserver-1.0-0
  ```

## Step 1: Download the RTSP Test Files

Download the RTSP load testing files from the Ant Media Scripts repository.

```bash
sudo wget https://raw.githubusercontent.com/ant-media/Scripts/master/load-testing/rtsp_loadtest/start_rtsp_server.sh
sudo wget https://raw.githubusercontent.com/ant-media/Scripts/master/load-testing/rtsp_loadtest/test-launch
sudo wget https://raw.githubusercontent.com/ant-media/Scripts/master/load-testing/rtsp_loadtest/test.mp4
```

## Step 2: Make the Files Executable

```bash
sudo chmod +x start_rtsp_server.sh
sudo chmod +x test-launch
```

## Step 3: Start the RTSP Server

Run the following command:

```bash
sudo ./start_rtsp_server.sh test.mp4
```

By default, the script uses:
* Resolution: 1920x1080
* Frame rate: 25 FPS
* Video bitrate: 2000 kbps
* H264 codec

You can also edit the script and make the required changes in parameters according to the requirements.

The RTSP stream becomes available at:

```bash
rtsp://SERVER_IP:8554/test
```

Replace `SERVER_IP` with the public IP address of the RTSP server.

Example:
```bash
rtsp://203.0.113.10:8554/test
```

## Step 4: Create RTSP Stream Sources in Ant Media Server for Load Testing

Use the REST API to create RTSP Stream Sources in Ant Media Server. For RTSP load testing, you can create multiple RTSP stream sources automatically:

Example-  

```bash
for i in {1..10}
do
curl -X POST -H "Content-Type: application/json" \
"https://AMS_SERVER:5443/live/rest/v2/broadcasts/create?autoStart=true" \
-d "{
  \"type\":\"streamSource\",
  \"name\":\"rtsp-load-$i\",
  \"streamId\":\"rtsp-load-$i\",
  \"streamUrl\":\"rtsp://203.0.113.10:8554/test\"
}"
done
```

This command creates 10 RTSP stream sources with stream IDs such as

```text
rtsp-load-1
rtsp-load-2
rtsp-load-3
...
...
rtsp-load-10
```

You can increase the stream count by modifying the following:

For example:

```bash
{1..50}
```

You can **monitor CPU usage, RAM usage, active broadcasts, and network throughput** from the Ant Media Server dashboard during the test.

## Stopping the RTSP Server

To stop the RTSP server process:

```bash
sudo pkill test-launch
```

You have now created **multiple RTSP Stream Sources and simulated RTSP ingest load on Ant Media Server.**



<div align="center">

## RTSP Load Testing for You
</div>

You have now generated an RTSP source and used it to create multiple RTSP Stream Sources in Ant Media Server.

By increasing the number of RTSP Stream Sources, you can measure ingest capacity, CPU usage, RAM usage, network throughput, transcoding performance, and overall server stability under load.
