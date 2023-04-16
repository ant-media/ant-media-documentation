# How to publish with XSplit

XSplit is a free and open source software for live streaming and video recording. It is easy to use and provides a great canvas with a screen share option for different purposes (PC gaming, talk shows or presentations). Embedded or external cameras and audio sources can be used with XSplit.

## Install XSplit

Download XSplit from [xsplit.com](https://www.xsplit.com/) and install it. 

## Provide sources

When you open  XSplit, it will ask for the canvas option for different purposes. They are easy to manipulate with drag and drop. It has some useful features for streaming, for further information you can google about [XSplit tutorial](https://www.google.com/search?q=XSplit+tutorial).

## Configure XSplit

We're assuming that your Ant Media Server accepts all streams (There is no any security option enabled.)

*   Click ```Broadcast``` in the XSplit window and then click ```Set up a new output```
*   Choose ```Custom RTMP``` in the dropdown menu as shown below.
    ![](@site/static/img/publish-live-stream/XSplit/XSplit-Custom-RTMP.png)

*   You can write any name and description you want.
*   In the RTMP URL box, type your RTMP URL without stream id. It's like ```rtmp://your-server-IP-or-domain/LiveApp``` 
*   In the stream key, you can write any ```stream Id``` because we assume that no security option is enabled.

![](@site/static/img/publish-live-stream/XSplit/XSplit-settings.png)

When you're using any token type for stream security,  you need to generate a publish token and use it in this format inside the stream key: ```streamdId?token=tokenid```

## Start streaming

Close the ```Settings``` window and simply click the ```Stream``` button in the main XSplit window. It will begin streaming.

You can view the stream in your browser by entering the following URL:

```http://IP-address:5080/AppName/play.html?name=streamId```

Check [here](https://antmedia.io/docs/category/playing-live-streams/) for more information on playback.
