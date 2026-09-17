---
title: Thumbnails
description: Generate live stream preview images with ABR in Ant Media Server—format, quality, interval, and URL access.
keywords: [Thumbnails, generatePreview, stream preview, ABR, Ant Media Server Documentation]
sidebar_position: 3
sidebar_label: Thumbnails
---

# Thumbnails

Ant Media Server can capture preview images from live streams while ABR is active. Thumbnails are useful in channel lists, dashboards, and VOD-style browsing without loading full video.

## Prerequisites

Add at least one adaptive bitrate profile (**Application → Your app → Settings → Adaptive Streaming → Add New Bitrate**).

![](@site/static/img/preview_1.png)

## Enable thumbnail generation

**Web panel:** enable **Generate Preview** under application settings.

![](@site/static/img/enable-preview.png)

**Advanced settings:** set `generatePreview` to `true`:

```js
"generatePreview": true,
```

Save after changing settings.

## Configuration parameters

Adjust these in **Application Settings → Advanced**:

| Property | Description |
|----------|-------------|
| `previewFormat` | Image format: `png` (default), `jpg`, or `webp` |
| `previewQuality` | For JPG: `2`–`31` (lower = better quality; recommended `5`). For WEBP: `0`–`100` (recommended `75`). Not used for PNG. |
| `previewHeight` | Thumbnail height in pixels (default `480`) |
| `createPreviewPeriod` | Interval between captures in ms (default `5000`; use `1000` for one per second) |
| `previewOverwrite` | `false` (default): new stream with same ID gets `_N` suffix; `true`: overwrite existing file |
| `addDateTimeToMp4FileName` | Add date-time to recorded file names when `true` |

Examples:

```js
"previewFormat": "png",
"previewQuality": 5,
"previewHeight": 480,
"createPreviewPeriod": 1000,
"previewOverwrite": false,
"addDateTimeToMp4FileName": false,
```

You can also enable **Add Date-Time to Record File Names** from the web panel:

![](@site/static/img/preview_2.png)

## Access preview URLs

While the stream is live:

```
http://<SERVER_NAME>:5080/live/previews/<STREAM_ID>.png
http://<SERVER_NAME>:5080/live/previews/<STREAM_ID>.jpg
http://<SERVER_NAME>:5080/live/previews/<STREAM_ID>.webp
```

From **v2.4.3**, after the stream ends, the final image uses a `_finished` suffix:

```
http://<SERVER_NAME>:5080/live/previews/<STREAM_ID>_finished.png
```

On disk, files are stored under:

```bash
/usr/local/antmedia/webapps/live/previews/
```

Previews can also be uploaded to object storage with [S3 recording and integration](/category/s3-recording-and-integration/).

Thumbnails update on the interval you configure—use them anywhere you need a lightweight still from an active or recently finished stream.
