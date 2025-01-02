---
title: Generating Thumbnails from streams
description: Enable generating periodic preview images (snapshots) on the fly with adaptive bitrate streaming.
keywords: [Generating Thumbnails from streams, Generated Preview Images, Ant Media Server Documentation, Ant Media Server Tutorials]
categories: [How to enable, Configuration parameters]

---

# Periodic Preview

Ant Media Server can generate periodic previews (snapshots) of the incoming streams on the fly. This guide will help you learn configuration parameters for generating and using previews.

In order to activate preview generation, you just need to add at least one adaptive bitrate. You can do that in the dashboard using ```Application > Your App > Settings > Add New Bitrate```

![](@site/static/img/preview_1.png)

 Go to ```Application > Your App > Settings  > click on basic > switch to Advance``` and search for  `generatePreview` and set it to true.

After making the changes, save the settings.

Generated preview images will be available in this URL template:

```
http://<SERVER_NAME>:5080/<APP_NAME>/previews/<STREAM_ID>.png
```

**With v2.4.3** and later, the `_finished` suffix is added to the PNG file after streaming has finished. So that it will be in the following template

```
http://<SERVER_NAME>:5080/<APP_NAME>/previews/<STREAM_ID>_finished.png
```

The absolute path of the preview image is as follows:

```
<ANT_MEDIA_SERVER_DIR>/webapps/<APP_NAME>/previews/<STREAM_ID>.png
```

In addition to this, you can also upload preview images to Amazon S3. Please [check out the instructions for S3 Integration](/v1/docs/amazon-aws-s3-integration).

## Configuration parameters

Similarly, you can add/change other preview-related properties in the Advance settings of the application we changed above.

```previewFormat```: By default, the preview image is saved in png format. If you prefer a different image format, you can update the corresponding parameter in the advanced settings. The supported formats include jpg, png, and webp. To achieve the desired format, ensure you select the appropriate option based on your requirements, such as file size, quality, and compatibility with your application. Adjusting this setting allows for greater flexibility in how the preview images are generated and used.

```js
previewFormat="jpg"
```

```previewQuality```: Specifies the preview quality for JPG and WEBP formats. For JPG, the quality range is from 2 to 31, where 2 provides the best quality with the largest file size, and 31 delivers the lowest quality with the smallest file size. The recommended value for JPG is 5. For WEBP, the quality range is from 0 to 100, where 0 provides the lowest quality with the smallest file size, and 100 delivers the best quality with the largest file size. The recommended value for WEBP is 75. Note that the previewQuality isn't available for the PNG format.

```js
previewQuality=5
```


```previewHeight```: The preview image is saved as 480p by default. If you want to increase the resolution, change the following parameter in the advance settings.

```js
previewHeight=360
```

```createPreviewPeriod```: Preview image creation period in milliseconds. The default value is 5000 ms. As an example, if you change it as follows, it will create a preview every second.

```js
createPreviewPeriod=1000
```

```previewOverwrite```: The default value is false. If it is false, when a new stream is received with the same stream ID, the `_N (increasing number)` suffix is added to the preview file name. If it is true, a new preview file will overwrite the old one.

```js
previewOverwrite=false
```

```addDateTimeToMp4FileName```: The default value is false. If true, it adds a date-time value to file names. If false, it does not add date-time values to file names.

```js
addDateTimeToMp4FileName=false
```

As an alternative, you can also enable this feature on the web panel by enabling the tick box under ```Application >` Your App >` Settings >` Add Date-Time to Record File Names``` and saving the settings.

![](@site/static/img/preview_2.png)

```previewGenerate```: The default value is true. If false, preview images will not be generated.

```js
previewGenerate=true
```

You can also enable thumbnail-generating options from the web panel after version 2.4.3:
  
![](@site/static/img/enable-preview.png)
