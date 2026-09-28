---
title: How to Measure End-to-End Latency
description: Measure stream delay from publisher to player using timestamp overlays, OCR, and AWS Rekognition or Google Vision API.
keywords: [Measure latency, Measure end-to-end latency, TimeServer, OCR, AWS Rekognition, Google's Vision API, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 5
---

# How to Measure End-to-End Latency

Measure how long it takes for a stream to travel from the publisher to the player. This guide walks through overlaying timestamps on the video, extracting them with OCR, and calculating end-to-end (E2E) latency.

## What you'll accomplish

By the end of this guide, you will:

1. Sync publisher and player devices with an NTP time source (or manual offset).
2. Set up **AWS Rekognition** or **Google Vision API** for OCR on the player page.
3. Publish and play streams with timestamp overlays and read E2E latency from the player page.

## How it works

1. Draw the **publish time** onto the stream canvas while broadcasting.
2. Draw the **play time** onto the stream canvas while playing the stream.
3. Extract both timestamps using OCR (Optical Character Recognition).
4. Calculate E2E latency by subtracting the publish time from the play time.

Use these Web SDK sample pages (available in Ant Media Server **v2.3.0+**):

| Page | Purpose |
|------|---------|
| [publish_with_timestamp.html](https://github.com/ant-media/StreamApp/blob/master/src/main/webapp/publish_with_timestamp.html) | Draws the publish time on the canvas while broadcasting. |
| [player_with_timestamp.html](https://github.com/ant-media/StreamApp/blob/master/src/main/webapp/player_with_timestamp.html) | Draws the play time, calls the OCR API, and calculates latency. |

## Prerequisites

Before you begin, confirm the following:

- Ant Media Server **v2.3.0** or later.
- Access to `publish_with_timestamp.html` and `player_with_timestamp.html` (from the [StreamApp](https://github.com/ant-media/StreamApp) repository or your AMS webapps).
- An **AWS account** (for Rekognition) or **Google Cloud** project with Vision API enabled (for Google Vision).
- Publisher and player devices that can be time-synced (NTP or manual offset).

## Step 1: Sync devices with a time server

Publisher and player devices must use the same time reference so the latency calculation is accurate. For testing, use an NTP time provider.

If time servers cannot be used (common on mobile devices), synchronize devices manually using `player_with_timestamp.html`.

### Manual sync

Find the offset on the publisher and player devices. For example, [AtomicClock](https://play.google.com/store/apps/details?id=partl.atomicclock&hl=en_US&gl=US) can show the difference between local time and NTP.

![](@site/static/img/image-1645445267761.png)

In the example above, the local device is **290 ms ahead** of NTP (difference between `11:09:25.060` and `11:09:25.351`). If this device is the publisher, the publisher offset is **-291**. If the device were **behind** NTP by 290 ms, the offset would be **+290**.

After you determine the offset for each device, enter the publisher and player offsets on the player page:

![](@site/static/img/image-1645445342702.png)

If a device's clock is **ahead** of NTP, use a **negative** offset. If it is **behind**, use a **positive** offset.

## Step 2: Set up OCR

Choose **AWS Rekognition** or **Google Vision API** to read timestamps from the video frames.

### AWS Rekognition

1. Obtain your AWS Access Key ID and secret key. See [AWS access keys](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys).
2. Open `player_with_timestamp.html` and enter your credentials and region:

![](@site/static/img/image-1645445405563.png)

### Google Vision API

1. Install and enable the **gcloud** CLI. See [Google Cloud Vision setup](https://cloud.google.com/vision/docs/setup).
2. Print an access token:

```bash
gcloud auth application-default print-access-token
```

3. Paste the token into the **Vision Token** field on `player_with_timestamp.html`:

![](@site/static/img/image-1645445480526.png)

If `gcloud` is not on your PATH, install the SDK [manually](https://cloud.google.com/sdk/docs/install) and source it. On Ubuntu:

```bash
source ~/google-cloud-sdk/path.bash.inc
source ~/google-cloud-sdk/completion.bash.inc
gcloud auth application-default print-access-token
```

## Step 3: Measure latency

1. Publish a stream from `publish_with_timestamp.html`.
2. Play the same stream from `player_with_timestamp.html` with OCR credentials and device offsets configured.
3. Latency is calculated automatically every second and displayed on the player page.

![](@site/static/img/image-1645445619577.png)

## Accuracy of end-to-end measurement

Several factors affect measurement accuracy:

| Factor | Typical impact |
|--------|----------------|
| **Canvas rendering** | Drawing the time onto the canvas adds ~10 ms (usually negligible). |
| **Canvas FPS** | Adds ~30 ms to the calculation. |
| **Time offset** | Even with NTP sync, devices can differ by tens of milliseconds (~20 ms error). |

For the most reliable results, keep publisher and player clocks as closely aligned as possible and run multiple measurements under your target network conditions.
