  
---
title: Media Push Plugin
description: This guide explains how to stream and record any specific web page using the media push plugin
keywords: [Media Push Plugin, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---
  
Explore the simplicity of recording and live streaming advanced cases such conference call, Player Kill, etc. with [Ant Media Server’s](https://github.com/ant-media/Ant-Media-Server/) Media Push Plugin🚀. This user-friendly tool lets you stream any web page. You just provide a URL to the plugin, and the plugin loads the web page on the server side and streams it in real time. You can then record 🎥 or re-stream the video if needed.
  

# How Media Push Works  

Media Push opens up Headless Chrome on the server side. A user can send a REST request with the URL of the page that is desired to be recorded. When the request is received on the server side, a new Chrome tab is opened with the URL. As soon as the page gets loaded, the screen is recorded using Media Stream APIs and re-streamed back to Ant Media Server, from where you can record the stream or play back the stream using WebRTC HLS or Dash.  
  

## Features  
  

### 1. Broadcast the whole web page  
  

You can broadcast the whole web page with video and audio in real time. 
  

### 2. Record the broadcast if needed  
  

You can record the broadcast if needed. But you need to start the recording manually with the REST API or via the Ant Media Server Dashboard.  
  

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

 - New file need antmedia ownership so run below command

```
sudo chown -R antmedia:antmedia /usr/local/antmedia
```

 - Restart the service  

 ```
sudo service antmedia restart
```
  

## How to Use  
  

The Media Push Plugin has a REST APIs to control the plugin.   
  

 - Start the broadcast  
  

Call the REST method below to let Ant Media Server broadcast the web page. You should pass the url of the web page and you can pass streamId as the query parameter you want to use as a parameter.  

  ```  
   curl -i -X POST -H "Accept: Application/json" -H "Content-Type: application/json" "https://<ant-media-server-domain>/<your-webapp-name>/rest/v1/media-push/start?streamId=mediapush" -d '{"url": "http://example.com", "width": 1280, "height": 720}'  
   ```  
  

 - Stop the broadcast  
  

Call the REST method below to let Ant Media Server use the streamId you specified in the start method. In our example, we used `mediapush` as streamId.

  ```  
   curl -i -X POST -H "Accept: Application/json" "https://<ant-media-server-domain>/<your-webapp-name>/rest/v1/media-push/stop/{streamId}"  
   ``` 


:::info
Please check out [**this blog post**](https://antmedia.io/conference-call-recording/) to learn how to use Media Push to record the conference rooms.
:::

 - Send javascript command to a webpage with the given streamId.
  

Call the REST method below to let Ant Media Server use the streamId you specified in the start method. You should pass the javascript command in the body.  

  ```  
   curl -i -X POST -H "Accept: Application/json" -H "Content-Type: application/json" "https://<ant-media-server-domain>/<your-webapp-name>/rest/v1/media-push/send-command?streamId={streamId}"  -d '{"jsCommand": "{javascript_command_which_is_executed}"}'  
   ```  

In the below example, we are using ` document.write(\" hello how are you this is the text which is displayed on the browser  \") ` which will overwrite the content of the browser window with the message.  

  ```  
   curl -i -X POST -H "Accept: Application/json" -H "Content-Type: application/json" "http://localhost:5080/LiveApp/rest/v1/media-push/send-command?streamId=stream111"  -d '{"jsCommand": "document.write(\" hello how are you this is the text which is displayed on the browser  \")"}'  
   ```  
  

## Composite Layout  

The composite layout is an HTML page that has a canvas where you can place multiple video streams, text, and images together. Using simple commands, you can adjust what's displayed on this canvas in real-time. Media Push can record this HTML page, and then it becomes a live stream on Ant Media, offering lots of possibilities like adding text, images, and arranging videos however you like. It's a handy tool for creating dynamic and customized visuals without any complicated technical frameworks.  
  

## How Composite Layout works  

A composite layout is an HTML page that gets loaded on the server side with the Media Push Plugin. We can specify a `Conference room` name that you join as a URL parameter to the Composite Layout page, then it joins the room and waits for the instructions.  
  

The composite layout page contains a canvas on which streams can be added; by default, nothing is displayed on the canvas. To display a stream from the room onto the canvas, call the REST API by specifying the ID of the room participant.  
  

### How to add Composite Layout  
  

 - Download the composite_layout.html file  
  
  ```  
  wget https://github.com/ant-media/Plugins/raw/master/MediaPushPlugin/build/composite_layout.html  
  ```  
    
 - Copy the composite_layout.html file into the application folder  
  
  ```  
  cp composite_layout.html /usr/local/antmedia/webapps/<your-webapp-name>/  
  ```  
  
  
### How to use Composite Layout  
  

- Start the Composite Layout  
  
Media Push will load the composite layout page; the page will then join the specified room. The captured stream will be available on the server.  
  
**composite-layout-publisher-id:** It can be any random Id like `test`  
  

  ```  
   curl -i -X POST -H "Accept: Application/json" -H "Content-Type: application/json" "https://<ant-media-server-domain>/<your-webapp-name>/rest/v1/media-push/start"  -d '{"url": "https://<ant-media-server-domain>/<your-webapp-name>/composite_layout.html?roomId=<room-name>&publisherId=<composite-layout-publisher-id>", "width": 1280, "height": 720}'  
   ```  
  
The response will be as follows:  
  
```  
{"success":true,"message":"","dataId":"vuBnhjWijlol1708630086991","errorId":0}  
```  

The `dataId` will be required to stop the Composite Layout stream.  
  
- Update the Composite Layout UI  
  

For updating the layout and adding streams to the canvas, call the below REST API by specifying the stream id of the participant in the room.   

  ```  
   curl -i -X POST -H "Accept: Application/json" -H "Content-Type: application/json" "https://<ant-media-server-domain>/<your-webapp-name>/rest/v2/broadcasts/<composite-layout-publisher-id>/data"  -d '{"streamId":"<composite-layout-publisher-id>","layoutOptions": {"canvas": {"width": 640,"height": 640},"layout": [{"streamId": "<room-participant-id>","region": {"xPos": 20,"yPos": 0,"zIndex": 1,"width": 200,"height": 200},"fillMode": "fill","placeholderImageUrl": "https://cdn-icons-png.flaticon.com/512/149/149071.png"}]}}'  
   ```  
    

- Stop the Composite Layout  
  

Call the REST method below to let Ant Media Server use the streamId you specified in the stop method.  
  

  ```  
   curl -i -X POST -H "Accept: Application/json" "https://<ant-media-server-domain>/<your-webapp-name>/rest/v1/media-push/stop/{composite-layout-reponse-dataId}"  
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

You can modify the code and build the plugin yourself to make it work according to your own needs. For example, you can play the video or login to the web page with your own credentials before starting the broadcast.  
Go to the MediaPushPlugin and modify the customModification method as you wish. Then build the plugin with the following command:.  
  

  ```  
  chmode +x redeploy.sh  
  ./redeploy.sh  
  ```  
