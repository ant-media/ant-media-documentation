---
title: How to publish RTMPS
description: How to publish RTMPS
keywords: [Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

# How to publish RTMPS

Please follow the below steps to publish the RTMPS stream to Ant Media Server:

1.  Enable SSL on the server. Please check out [here](https://antmedia.io/docs/guides/installing-on-linux/setting-up-ssl/) for SSL installation.
    
2.  Open TCP port 8443 for RTMPS on the firewall where AMS is hosted.
    
3.  Edit  `red5-core.xml`  file located under the `/usr/local/antmedia/conf` directory and uncomment the RTMPS beans as mentioned in the below links.
    
  [https://github.com/ant-media/Ant-Media-Server/blob/master/src/main/server/conf/red5-core.xml#L139](https://github.com/ant-media/Ant-Media-Server/blob/master/src/main/server/conf/red5-core.xml#L139)  
    [https://github.com/ant-media/Ant-Media-Server/blob/master/src/main/server/conf/red5-core.xml#L178](https://github.com/ant-media/Ant-Media-Server/blob/master/src/main/server/conf/red5-core.xml#L178)
    
4.  Save the file and restart the server with  `sudo service antmedia restart`
    
5.  Now you can publish the stream to the server with  
    
     `rtmps://Domain-Name:8443/LiveApp/streamId`
