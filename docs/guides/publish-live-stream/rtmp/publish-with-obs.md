# How to publish with OBS

OBS (Open Broadcaster Software) is a free and open source video recording and live streaming software. With OBS, you can use either your PC's embedded camera or an externally connected camera as a video source. Audio sources can also be set up.

Let's go over how to use OBS for streaming step by step:

## Install the OBS

Download Open Broadcaster Software from [obsproject.com](https://obsproject.com/) and install it. 

## Provide sources

Launch OBS. By default, OBS begins capturing from your built-in camera if one is present. In the Sources section, you can add or remove video/audio sources.

## Configure OBS

We assume that your Ant Media Server accepts all streams (e.g there is no security option enabled.)

*   Click ```Settings``` in the OBS Window and then Select ```Stream``` on the left side menu.
*   Choose ```Custom Streaming Server``` in the ```Stream Type``` dropdown menu.
*   In the URL box, type your RTMP URL without stream id. It's like ```rtmp://IP-or-server-domain-name/LiveApp```
*   In the Stream key, you can write any stream id because we assume that all stream Ids are allowed.

![](@site/static/img/obs-rtmp-image/OBS-Stream.png)

**Note:** When you use tokens you need to generate a publish token and use it in this format inside the stream key : ```streamdid?token=tokenid```

![](@site/static/img/obs-rtmp-image/OBS-Stream-Token.png)

## Tune for ultra-low latency streaming

OBS is not optimised for ultra-low latency streaming by default. If you use OBS to push an RTMP stream and play it with WebRTC, please go to ```Settings > Output``` and make the rate control ```CBR (Constant Bitrate)``` and tune for ```zerolatency```. You can also adjust the bitrate to meet your quality and internet bandwidth requirements. Furthermore, the ```keyframe interval``` should be set to 1.  Please see the screenshot below for reference:

![](@site/static/img/obs-rtmp-image/OBS-Output.png)

Please keep in mind that if your network isn't stable enough to send the requested bitrate all of the time, you may experience freezes while watching the stream.

## Start streaming

Close ```Settings``` window and just click the “Start Streaming” button in the main window of OBS.

![](@site/static/img/obs-rtmp-image/OBS-Start-Stream.png)

Congrats! You're publishing a live stream with OBS.

## Troubleshooting

If you are experiencing stream quality issues, you should check the following indicators in OBS.

### Stream health

Stream health parameters are located at the bottom right. There are 3 stream health parameters: ```Dropped Frames```, ```CPU``` and ```Stream health color.``` 

*   **Dropped frames**: This value should be 0. If it increases, you may decrease your FPS or bitrate parameters in OBS settings.
*   **CPU**: CPU value is important for streaming quality. We recommend that it never exceeds 70%.
*   **Stream health color**: This color should be green. If it has a color between yellow and red you may have problems with your stream quality.

![](@site/static/img/obs-rtmp-image/OBS-Status.png)

### OBS encoding overloaded warning

If your PC cannot handle the stream with the parameters you set, this warning appears. In this case, you may want to decrease the resolution, bitrate, or change the encoder preset value to one with high speed and low quality.

![](@site/static/img/obs-rtmp-image/OBS-Warning.png)
