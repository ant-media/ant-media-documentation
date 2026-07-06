---
title: vMix
description: How to Ingest SRT with VMix
keywords: [Ingest SRT with vMix, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

# How to Ingest SRT with vMix

```vMix``` is a software vision mixer available for the Windows operating system. The software is developed by StudioCoast PTY LTD. Like most vision mixing software, it allows users to switch inputs, mix audio, record outputs and live stream cameras, videos files, audio, and more in resolutions of up to 4K. It can stream up to three destinations at one time.

In this tutorial, we assume that you have installed vMix on your personal computer.

## Provide sources

Click the add input button and add an input for the broadcast. As an example, I will add a display input.

![](@site/static/img/95338115-41285180-08bb-11eb-8e61-d8a63e564cf5.png)

As you can see, my input has been added successfully, and its preview can be seen:

![](@site/static/img/95338335-7df44880-08bb-11eb-839c-5f9a443ec6bf.png)

## Configure vMix

![vmix-settings.JPG](@site/static/img/vmix-settings.JPG)

- Click the **Settings** button in the top right corner.  
- In the first output, enable **NDI**.  
- Click the **Settings** icon for the first output.  
- Enable **SRT** in the settings panel.  
- In the **Hostname** field, enter your Ant Media Server URL **without the port**, for example:```ant.media.server.address```  
- In the **Port** field, enter your Ant Media Server SRT port number, for example: ```4200```.  
- In the **Stream ID** field, enter your App name and stream ID, for example: ```live/stream1```.  


![](@site/static/img/vmix-output-settings.png)

## Tuning

You can use predefined settings but if you click on the gear button next to the quality options, you can select one the options.

*   Profile should be ```baseline``` and ```keyframe latency``` should be ```1```.
*   You can set your ```level``` and your ```preset``` according to your configuration but ```3.1``` and ```medium preset``` is good enough to have a good quality stream.
*   You can enable the ```hardware encoder``` for using your ```GPU``` in the ```encoding process.```

![](@site/static/img/95346851-eeec2e00-08c4-11eb-835c-a07e29c7cd08.png)

## Start streaming

After configuring according to your needs and setting the server address, you can start the streaming by clicking to stream button at the bottom of the dashboard.

As you can see from the following screenshot, it started to stream.

![](@site/static/img/95346239-476efb80-08c4-11eb-9eb9-a408cd47fd43.png)

Now you are publishing with vMix!

<br /><br />
---

<div align="center">
<h2> Smooth Mix, Stream Secure 🎬 </h2>
</div>

You’ve successfully set up **SRT streaming from vMix** — added your **input**, enabled SRT in **output settings,** specified your **hostname**, **port**, **stream ID**, and **tuned the encoder** (baseline profile, keyframe latency = 1, etc.). Your stream is now lean, resilient, and ready for broadcast. 📡

