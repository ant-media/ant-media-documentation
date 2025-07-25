---
title: Publish Using Teradek 
description: Publish RTMP stream using Teradek
keywords: [Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 5
---

# Publish RTMP stream using Teradek

- Teradek Vidiu Pro is fully compatible with Ant Media Server. Before starting, you need to create a live stream in the Ant Media Server web panel.

- You can create a stream in the `LiveApp` application. When you create a live stream, your RTMP URL will be in the following format:

```rtmp://YOUR_SERVER_IP_OR_URL/LiveApp/YOUR_STREAM_ID```

Let’s have a look at how to use Teradek Vidiu Pro for streaming. Firstly, start by powering the Teradek Vidiu Pro.

## Connect to Teradek Vidiu Pro WiFi Network.

It creates a WiFi network with the name ```VidiU−XXXXX```. Connect that network with your computer and go to the ```172.16.1.1``` on your browser.

![](@site/static/img/vidiu_pro_console.png)

Click the “Settings” button on the top right and then click the “Network” item on the screen.

![](@site/static/img/configure_vidiu_network_button.png)

## Configure Wireless Network Connection of Teradek Vidiu Pro

*   Click the WiFi item. Choose “Client” mode and click the “Browse” button to look up the WiFi networks around.  
    ![](@site/static/img/set_vidiu_pro_wifi_connectivity.png)Choose the WiFi you would like Teradek Vidiu Pro to connect to. Enter the password of the WiFi network and click the “**Apply**” button on the top right. Then Restart Teradek Vidiu Pro. Connect to the same wireless network on your computer and check the IP address of the Teradek Vidiu Pro from the device’s LED screen. Press the Menu button on the device. The menu button is a joystick button as well. Now go to the Network Settings >` WiFi >` Info to see the IP address of the device

Sometimes you may need to power off / on the Teradek Vidiu Pro.

## Configure broadcasting settings

*   Click the broadcast item on the Settings screen.  
    ![](@site/static/img/configure_broadcasting_settings_vidiu_pro.png)
*   Choose Manual from Mode, then Enter Ant Media Server address to RTMP Server URL and write the name of the `streamId` to the Stream box  
    ![](@site/static/img/write_ant_media_server_url_to_vidiu_pro.png)

Click the ```Apply``` button on the top right again.

![](@site/static/img/apply_settings_vidiu_pro.png)  

Your device configuration is OK now.

## Start broadcasting

*   Connect the HDMI cable between the HDMI source (camera, television, or computer) and Teradek Vidiu Pro HDMI.
*   Wait until to see the ```Ready``` text appears on the right top of Teradek Vidiu Pro’s LED screen. Then press ```Start/Stop``` button on the device, a message appears on the device asking for confirmation about starting the broadcast. Press ```Yes``` and then broadcasting starts.

Congrats! You're publishing with Teradek Vidiu Pro to Ant Media Server.

- **Note**: You can use any application. Be it `live` or `LiveApp`.
