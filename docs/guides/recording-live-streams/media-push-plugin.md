---
title: Media Push Plugin
description: This guide explains how to stream and record any specific web page using the media push plugin
keywords: [Media Push Plugin, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

Media Push is a plugin that is built on top of Ant Media and can load any web URL and stream it in real time.

# How Media Push Works
Media Push opens up a Headless Chrome on the server side. A user can send a REST request with the URL of the page that is desired to be recorded. When the request is received on the server side, a new Chrome tab is opened with the URL. As soon as the page gets loaded, the screen is recorded using Media Stream APIs and re-streamed back to Ant Media Server, from where you can record the stream or play back the stream using WebRTC HLS or Dash.

## Features

### 1. Broadcast the whole web page

You can broadcast the whole web page with video and audio in real time.

### 2. Record the broadcast if needed

You can record the broadcast if needed. But you need to start the recording manually with the REST API or on the Ant Media Server Dashboard.

## How to Install 

 - Connect your Ant Media Server Instance via terminal
 
 - Get the installation script 
  ```
  wget -O install_media-push-plugin.sh https://raw.githubusercontent.com/ant-media/Plugins/master/MediaPushPlugin/src/main/script/install_media-push-plugin.sh && chmod 755 install_media-push-plugin.sh
  ```
 
 - Run the installation script
  ```
  sudo ./install_media-push-plugin.sh
  ```
  
 - Restart the service

  ```
  sudo service antmedia restart
  ```

## How to Use

Media Push Plugin has a REST API to control the plugin. 

* Start the broadcast

Call the REST Method below to let Ant Media Server broadcast the web page. You should pass the url of the web page and you can pass streamId as the query parameter you want to use as a parameter.
   ```
   curl -i -X POST -H "Accept: Application/json" -H "Content-Type: application/json" "https://<ant-media-server-domain>/<your-webapp-name>/rest/v1/media-push/start" -d '{"url": "http://example.com", "width": 1280, "height": 720}'
   ```

* Stop the broadcast

Call the REST Method below to let Ant Media Server with the stream id you specified in the start method.
   ```
   curl -i -X POST -H "Accept: Application/json" "https://<ant-media-server-domain>/<your-webapp-name>/rest/v1/media-push/stop/{streamId}"
   ```

<video controls>  
<source src="https://github.com/ant-media/ant-media-documentation/assets/47350008/ddb033c6-22a0-4a1b-9cbb-945b71eb1867" type="video/mp4"> 
Your browser does not support the video tag. 
</video>

* Send javascript command to a webpage with given stream id

Call the REST Method below to let Ant Media Server with the stream id you specified in the start method. You should pass the javascript command in the body.
   ```
   curl -i -X POST -H "Accept: Application/json" -H "Content-Type: application/json" "https://<ant-media-server-domain>/<your-webapp-name>/rest/v1/media-push/send-command?streamId={streamId}"  -d '{"jsCommand": "{javascript_command_which_is_executed}"}'
   ```
In the below example we are  ` document.write(\" hello how are you this is the text which is displayed on the browser  \") ` which will overwrite the content of the browser window with the message.
   ```
   curl -i -X POST -H "Accept: Application/json" -H "Content-Type: application/json" "http://localhost:5080/LiveApp/rest/v1/media-push/send-command?streamId=stream111"  -d '{"jsCommand": "document.write(\" hello how are you this is the text which is displayed on the browser  \")"}'
   ```

## How to Build from Source Code


- Clone the repository

  ```
  git clone https://github.com/ant-media/Plugins.git
  ```

- Go to the Media Push Plugin directory

  ```
  cd Plugins/MediaPushPlugin
  ```

- Modify the redeploy.sh file with your Ant Media Server installation path

  ```
  Change AMS_DIR=/usr/local/antmedia/
  ```

- Build & install the plugin

  ```
  chmode +x redeploy.sh
  ./redeploy.sh
  ```

- Restart Ant Media Server

  ```
  sudo service antmedia restart
  ```

### How to Customize
You can modify the code and build the plugin by yourself to make it work with your own needs. For example, you can play the video or login to the web page with your own credentials before starting the broadcast.
Go to the MediaPushPlugin and modify the customModification method as you wish. Then build the plugin with the following command.

  ```
  chmode +x redeploy.sh
  ./redeploy.sh
  ```
