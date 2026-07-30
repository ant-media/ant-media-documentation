---
title: vMix
description: How to Ingest SRT with VMix
keywords: [Ingest SRT with vMix, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

# How to Ingest SRT with vMix

```vMix``` is a software vision mixer available for the Windows operating system. The software is developed by StudioCoast PTY LTD. Like most vision mixing software, it allows users to switch inputs, mix audio, record outputs and live stream cameras, videos files, audio, and more in resolutions of up to 4K. It can stream up to three destinations at one time. By the end of this guide, you'll be pushing an SRT stream from vMix into Ant Media Server.

In this tutorial, we assume that you have installed vMix on your personal computer.

## Provide sources

Click the add input button and add an input for the broadcast. As an example, I will add a display input.

![](@site/static/img/vmix-add-input.png)

As you can see, my input has been added successfully, and its preview can be seen:

![](@site/static/img/vmix-input-preview.png)

## Configure vMix

![vmix-settings.JPG](@site/static/img/vmix-settings.JPG)

- Click the **Settings** button in the top right corner.
- In the first output, enable **NDI**.
- Click the **Settings** icon for the first output.
- Enable **SRT** in the settings panel.
- In the **Hostname** field, enter your Ant Media Server URL **without the port**, for example: ```<DOMAIN_NAME>```
- In the **Port** field, enter your Ant Media Server SRT port number, for example: ```4200```.
- In the **Stream ID** field, enter your App name and stream ID, for example: ```live/stream1```.

![](@site/static/img/vmix-output-settings.png)

## Tuning

You can use predefined settings but if you click on the gear button next to the quality options, you can select one the options.

*   Profile should be ```baseline``` and ```keyframe latency``` should be ```1```.
*   You can set your ```level``` and your ```preset``` according to your configuration but ```3.1``` and ```medium preset``` is good enough to have a good quality stream.
*   You can enable the ```hardware encoder``` for using your ```GPU``` in the ```encoding process.```

![](@site/static/img/vmix-streaming-quality.png)

## Start streaming

After configuring according to your needs and setting the server address, you can start the streaming by clicking to stream button at the bottom of the dashboard.

As you can see from the following screenshot, it started to stream.

![](@site/static/img/vmix-streaming-started.png)

Now you are publishing with vMix!

You're now publishing an SRT stream to Ant Media Server with vMix. From here, head to the [playback guide](/category/play-live-streams/) to view your stream.

## Need Help?

If vMix can't reach the SRT port, reach out on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or contact [Technical Support](mailto:support@antmedia.io).
