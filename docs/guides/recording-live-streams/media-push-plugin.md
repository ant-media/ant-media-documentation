---
title: Media Push Plugin
description: This guide explains how to stream and record any specific web page using the media push plugin
keywords: [Media Push Plugin, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 6
---

# Media Push Plugin
  
Explore the simplicity of recording and live streaming advanced cases such conference call, Player Kill, etc. with [Ant Media Server’s](https://github.com/ant-media/Ant-Media-Server/) Media Push Plugin🚀. This user-friendly tool lets you stream any web page. You just provide a URL to the plugin, and the plugin loads the web page on the server side and streams it in real time. You can then record 🎥 or re-stream the video if needed.
  

## How Media Push Works  

Media Push opens up Headless Chrome on the server side. A user can send a REST request with the URL of the page that is desired to be recorded. When the request is received on the server side, a new Chrome tab is opened with the URL. As soon as the page gets loaded, the screen is recorded using Media Stream APIs and re-streamed back to Ant Media Server, from where you can record the stream or play back the stream using WebRTC HLS or Dash.  
  

## Features  
  

### 1. Broadcast the URL
  
Broadcast the URL, including all animations and overlays, by capturing the view and audio in real time.
  

### 2. Record All Activities in the URL
  
You can record the broadcast if needed. But you need to start the recording manually with the REST API or via the Ant Media Server Dashboard.

### 3. Play the Stream

Play the stream in real-time (WebRTC) or with low latency (HLS, DASH, CMAF).

## How to Install

 - Connect your Ant Media Server Instance via terminal  
    
 - Get the installation script   

   ```bash
   wget -O install_media-push-plugin.sh https://raw.githubusercontent.com/ant-media/Plugins/master/MediaPushPlugin/src/main/script/install_media-push-plugin.sh && chmod 755 install_media-push-plugin.sh
   ```  
    
 - Run the installation script  

   ```bash  
   sudo ./install_media-push-plugin.sh  
   ```  

 - New file need antmedia ownership so run below command

   ```bash
   sudo chown -R antmedia:antmedia /usr/local/antmedia
   ```

 - Restart the service  

   ```bash
   sudo service antmedia restart
   ```
  

## How to Use  
  
The Media Push Plugin includes a REST API that allows you to control the plugin remotely. This API can be used to manage settings, initiate broadcasts, and interact with other features provided by the plugin programmatically.  

### Start the broadcast  
  
To have the Ant Media Server broadcast a web page, use the REST method described below. You must provide the URL of the web page you wish to broadcast. Optionally, you can specify a streamId by including it as a query parameter.

```bash  
curl -i -X POST -H "Accept: Application/json" -H "Content-Type: application/json" "https://ant-media-server-domain:5443/AppName/rest/v1/media-push/start?streamId=mediapush" -d '{"url": "URL_TO_RECORD", "width": 1280, "height": 720}'  
```  
  
Expected Response Upon successful execution, the server should respond as follows. Note that the `dataId` field represents the generated streamId that we mentioned as a query parameter.

```bash
HTTP/1.1 200 
Content-Type: Application/json
Content-Length: 80
Date: Mon, 05 Feb 2024 15:23:42 GMT {"success":true,"message":null,"dataId":"mediapush","errorId":0}
```

This output confirms that the broadcast has started, and provides the streamId (dataId), which can be used for further operations related to this stream.

### Stop the broadcast  
  
To stop a broadcast on the Ant Media Server using a specified streamId, use the REST method as outlined below. Ensure you have the streamId `(dataId)` from a previous broadcast session to correctly identify the stream you wish to stop.

```bash  
curl -i -X POST -H "Accept: Application/json" "https://ant-media-server-domain:5443/AppName/rest/v1/media-push/stop/{streamId}"
``` 

This command will instruct the Ant Media Server to stop broadcasting the stream associated with the provided streamId. Make sure the STREAM_ID matches the one you obtained when initiating the broadcast.

### Record the Broadcast

To record the broadcast in addition to streaming, you can include the recordType option in your REST API call. This option specifies the format in which the broadcast should be recorded. Here's how you can modify the previous start broadcast command to include recording:

```bash
curl -i -X POST -H "Accept: Application/json" -H "Content-Type: application/json" "https://ant-media-server-domain:5443/APP_NAME/rest/v1/media-push/start" -d  '{"url": "URL_TO_RECORD", "width": 1280, "height": 720, "recordType":"mp4"}'
```

This command will initiate the broadcast of the specified URL and simultaneously record it in MP4 format. Ensure to replace `URL_TO_RECORD` with the actual URL you want to broadcast and record.

:::info
Please check out [**this blog post**](https://antmedia.io/conference-call-recording/) to learn how to use Media Push to record the conference rooms.
:::

### Add Chrome Switches

To incorporate extra Chrome switches into your REST API request for broadcasting a web page with the Ant Media Server, specify them in the  `extraChromeSwitches`  field of your JSON payload. These should be listed in a comma-separated format. Here’s a refined version of your command that includes extra Chrome switches:

```bash
curl -i -X POST -H "Accept: Application/json" -H "Content-Type: application/json" "https://ant-media-server-domain:5443/APP_NAME/rest/v1/media-push/start" -d  '{"url": "URL_TO_RECORD", "width": 1280, "height": 720, "recordType":"mp4", "extraChromeSwitches":"--start-fullscreen,--disable-gpu"}'
```

This command configures the Chrome instance that captures the web page with the following switches:

-   `--start-fullscreen`: Starts Chrome in fullscreen mode.
-   `--disable-gpu`: Disables GPU hardware acceleration. These switches can help optimize the browser environment for specific server configurations or broadcasting needs.

For the default Chrome switches used by the Media Push Plugin, you can refer to the `MediaPushPlugin.java` file and look for the  `CHROME_DEFAULT_SWITCHES`  field. This will provide you with the preset configurations applied to the Chrome instance by the plugin.

Additionally, a comprehensive list of all available Chrome command-line switches can be found on the following website:  [Chromium Command Line Switches](https://peter.sh/experiments/chromium-command-line-switches/). This resource is valuable for understanding the full range of options you can utilize to customize the behavior of Chrome through the Media Push Plugin.

### Run Javascript in the URL

To send a JavaScript command to a specific stream on the Ant Media Server using the stream ID provided in the start method, use the following REST API call. Replace placeholders with your actual server domain, web application name, stream ID, and the JavaScript command you wish to execute.

```bash
curl -i -X POST -H "Accept: Application/json" -H "Content-Type: application/json" "https://ant-media-server-domain:5443/AppName/rest/v1/media-push/send-command?streamId={streamId}"  -d '{"jsCommand": "{javascript_command_which_is_executed}"}'  
```  

In the below example, we are using ` document.write(\" hello how are you this is the text which is displayed on the browser  \") ` which will overwrite the content of the browser window with the message.  

```bash
curl -i -X POST -H "Accept: Application/json" -H "Content-Type: application/json" "http://localhost:5080/LiveApp/rest/v1/media-push/send-command?streamId=stream111"  -d '{"jsCommand": "document.write(\" hello how are you this is the text which is displayed on the browser  \")"}'  
```
  

## Composite Layout  

The composite layout is an HTML page that has a canvas where you can place multiple video streams, text, and images together. Using simple commands, you can adjust what's displayed on this canvas in real-time. Media Push can record this HTML page, and then it becomes a live stream on Ant Media, offering lots of possibilities like adding text, images, and arranging videos however you like. It's a handy tool for creating dynamic and customized visuals without any complicated technical frameworks.  
  

## How Composite Layout works  

A composite layout is an HTML page that gets loaded on the server side with the Media Push Plugin. We can specify a `Conference room` name that you join as a URL parameter to the Composite Layout page, then it joins the room and waits for the instructions.  
  
The composite layout page contains a canvas on which streams can be added; by default, nothing is displayed on the canvas. To display a stream from the room onto the canvas, call the REST API by specifying the ID of the room participant.


### How to add Composite Layout  
  

 - Download the composite_layout.html file  
  
   ```bash  
   wget https://github.com/ant-media/Plugins/raw/master/MediaPushPlugin/build/composite_layout.html
   ```
    
 - Copy the composite_layout.html file into the application folder  

   ```bash
   sudo cp media_push.html /usr/local/antmedia/webapps/<your-webapp-name>/composite_layout.html
   ```
  
 
### How to use Composite Layout

- Start the Composite Layout

  Call the REST Method below to let Ant Media Server with the stream id you specified in the start method. You should pass the url, width and height in the body.

  **composite-layout-publisher-id:**  It can be any random Id like  `test`

  ```bash
  curl -i -X POST -H "Accept: Application/json" -H "Content-Type: application/json" "https://ant-media-server-domain:5443/AppName/rest/v1/media-push/start"  -d '{"url": "https://ant-media-server-domain:5443/AppName/composite_layout.html?roomId=<room-name>&publisherId=<composite-layout-publisher-id>", "width": 1280, "height": 720}'
  ```

- Stop the Composite Layout

  Call the REST method below to let Ant Media Server with the streamId you specified in the stop method.

   ```bash
   curl -i -X POST -H "Accept: Application/json" "https://ant-media-server-domain:5443/AppName/rest/v1/media-push/stop/{composite-layout-publisher-id}"
   ```

- Update the Composite Layout UI

  Call the REST Method below to update the layout on the fly.

  For updating the layout and adding streams to the canvas, call the below REST API by specifying the stream id of the participants in the room.

   ```bash
   curl -i -X POST -H "Accept: Application/json" -H "Content-Type: application/json" "https://ant-media-server-domain:5443/<your-webapp-name>/rest/v2/broadcasts/<composite-layout-publisher-id>/data" -d '{"streamId":"streamId1","layoutOptions": {"canvas": {"width": 640,"height": 640},"layout": [{"streamId": "<room-participant-id>","region": {"xPos": 20,"yPos": 0,"zIndex": 1,"width": 200,"height": 200},"fillMode": "fill","placeholderImageUrl": "https://cdn-icons-png.flaticon.com/512/149/149071.png"}]}}'
   ```
  
  
## How to Build from Source Code  
  
- Clone the repository  
  
  ```bash
  git clone https://github.com/ant-media/Plugins.git  
  ```
  
- Go to the Media Push Plugin directory  
  
  ```bash
  cd Plugins/MediaPushPlugin  
  ```  
  
- Modify the redeploy.sh file with your Ant Media Server installation path  
  
  ```bash 
  Change AMS_DIR=/usr/local/antmedia/  
  ```  
  
- Build & install the plugin  
  
  ```bash
  chmod +x redeploy.sh  
  ./redeploy.sh  
  ```  
  
- Restart Ant Media Server  
  
  ```bash 
  sudo service antmedia restart  
  ```  
  

### How to Customize  

You can modify the code and build the plugin yourself to make it work according to your own needs. For example, you can play the video or login to the web page with your own credentials before starting the broadcast.

Go to the MediaPushPlugin and modify the customModification method as you wish. Then build the plugin with the following command:.  
  

  ```bash  
  chmod +x redeploy.sh  
  ./redeploy.sh  
  ```  
