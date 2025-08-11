---
title: DRM Plugin for Ant Media Server
description: Installation and Configuration of DRM Plugin with Ant Media Server
keywords: [DRM, DRM Plugin, DRM Plugin for Ant Media Server, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

The Digital Rights Management (DRM) Plugin for Ant Media Server enables secure streaming by integrating with the CPIX (Content Protection Information Exchange) API. It ensures that only authorized users can access your content through encryption and multi-DRM support (**Widevine, FairPlay, and PlayReady**).

## Key Features

- Seamless **integration** with **CPIX API** for content key management.
- Support for **Dash** and **HLS** output.
- **Multi-DRM support**: Widevine, FairPlay, PlayReady.

## Installation

### Pre-requisites
Ensure the Ant Media Server is already running on your machine or instance.

### Step 1: Purchase and Install the DRM Plugin

1. **Purchase the Plugin**
- [Get the DRM Plugin](https://antmedia.io/product/drm-plugin/) on a monthly subscription basis.
- Or write an email to contact@antmedia.io

2. **Install the DRM Plugin**
- Download and copy the plugin JAR file to your Ant Media's plugin directory.

  ```bash
  sudo cp DRM-Plugin-bundle.jar /usr/local/antmedia/plugins
  ```

- Restart the Ant Media Server to apply changes.

  ```bash
  sudo service antmedia restart
  ```

### Step 2: Install Shaka Packager

1. **Download the Shaka Packager binary.**

   ```bash
   wget https://github.com/shaka-project/shaka-packager/releases/download/v3.4.1/packager-linux-x64 -O shakapackager
   ```

2. **Move to the bin and make it executable.**

   ```bash
   sudo cp shakapackager /usr/local/bin/
   sudo chmod +x /usr/local/bin/shakapackager
   ```

## Configuration

The DRM plugin settings are added under the `customSettings` in the application settings under Ant Media Server.

### Step 1: Navigate to Custom Settings

- Open the Ant Media Server web panel.
- Click your application on the left sidebar (e.g., `live`).
- Click the **Settings** tab and select **Advanced** from the dropdown on the top-right.
- Find the `customSettings` property.

### Step 2: Add DRM Settings

- Here's a minimal required configuration:

  ```json
  "customSettings": {
    "plugin.drm-plugin": {
      "enabledDRMSystems": [
        "Widevine"
      ],
      "keyManagementServerURL": "{KMS_URL}"
    }
  },
  ```

  
- You can pass multiple DRM systems as well.
  

   ```json
    "enabledDRMSystems": [
     "Widevine","PlayReady"
    ],
   ```

### Available Configuration Fields
- **`keyManagementServerURL`** *(Required)*:
URL to obtain encryption keys from your DRM provider using the CPIX API.

- **`enabledDRMSystems`** *(Required)*:
JSON array of DRM systems: ["`Widevine`", "`FairPlay`", "`PlayReady`"].

- **`encryptionScheme`**:
"`cbcs`" *(default)* or "`cenc`". `cbcs` supports all systems; `cenc` doesn’t support FairPlay.

- **`hlsPlayListType`**:
"`LIVE`" *(default)*, "`VOD`", or "`EVENT`".

- **`segmentDurationSecs`**:
Segment duration in seconds. The default is `2`.

- **`timeShiftBufferDepthSecs`**:
Buffer duration for live streams. The default is `60` seconds.

- **`segmentsOutsideLiveWindow`**:
Keeps extra segments outside the buffer window. The default is `5`.

## DoveRunner Multi-DRM Integration (Widevine Example)

This section walks you through securing a live stream with Widevine using DoveRunner.

### Step 1: Get a KMS Token from DoveRunner

- Log in to your [DoveRunner Web Panel](https://doverunner.com/).
- Navigate to Multi-DRM > DRM Settings.
- Copy your KMS Token.

  Your final `keyManagementServerURL`will be:

  ```bash
  https://kms.pallycon.com/v2/cpix/pallycon/getKey/{REPLACE_WITH_YOUR_KMS_TOKEN}
   ```

- Update your `customSettings` in the Ant Media Server web panel:

  ```json
  "plugin.drm-plugin": {
  "enabledDRMSystems": [
    "Widevine"
   ],
  "keyManagementServerURL": "https://kms.pallycon.com/v2/cpix/pallycon/getKey/{REPLACE_WITH_YOUR_KMS_TOKEN}"
  }
  ```

- Save the settings.

### Step 2: Add Video.js Player for Playback

- Clone DoveRunner's sample HTML5 player:

  ```bash
  git clone https://github.com/doverunner/html5-player-drm-samples
  ```

- Copy the files to your `live` app’s web directory:

  ```bash
  cd html5-player-drm-samples
  sudo cp videojs-doverunner-sample.html /usr/local/antmedia/webapps/live/
  sudo cp js/videojs-sample.js /usr/local/antmedia/webapps/live/js/
  sudo cp js/doverunner-sample-helper.js /usr/local/antmedia/webapps/live/js/
  sudo cp css/* /usr/local/antmedia/webapps/live/css/
   ```

### Step 3: Publish a WebRTC Stream

- Publish a WebRTC stream from Chrome using your Ant Media Server Sample publish page.
- Check the [WebRTC Publish Section](https://antmedia.io/docs/guides/publish-live-stream/webrtc/)

:::info
Pay attention that we use `stream007` as the `streamid`. It will be used to get a license from DoveRunner. You can use any `streamId`.
:::

- Verify stream directory creation:

   ```bash
   sudo ls /usr/local/antmedia/webapps/live/streams/drm/stream007/
   ```

- If you see `master.mpd` and `master.m3u8`, Voila, your stream is DRM-protected!

- The HTTP endpoint templates will be like

  ```bash
  DASH: https://{YOUR_ANTMEDIA_SERVER}:5443/live/streams/stream123/master.mpd  
  HLS:  https://{YOUR_ANTMEDIA_SERVER}:5443/live/streams/stream123/master.m3u8
  ```

### Step 4: Generate Widevine Token

1. Visit [DoveRunner Token Generator](https://devconsole.doverunner.com/drm-tools/license-token/#token-generator)
2. Fill in the following:

- **SITE ID, SITE Key, ACCESS Key** → Get from [DRM Settings on DoveRunner](https://contentsecurity.doverunner.com/drm/setting).
- **DRM Type** → `Widevine` because we used `Widevine` in this sample.
- **CID** → Your streamId. `stream007` in this sample.
- **USER ID** → any unique identifier.
- Click **Refresh Timestamp**, and leave the other fields with default values.

3. Click the `Generate Token` button and copy the token in `Result`.
4. Open the below file:

   ```bash
   sudo nano /usr/local/antmedia/webapps/live/js/doverunner-sample-helper.js
   ```
   
   - **Replace**:

       ```js
     dashUri = "https://{YOUR_ANTMEDIA_SERVER}:5443/live/streams/drm/stream007/master.mpd";
     widevineToken = '{PASTE_YOUR_GENERATED_TOKEN_HERE}';
     ```

   - Save the changes & exit the editor.

### Step 5: Play the Stream in Chrome

Open the below URL with `Chrome` because Widevine is supported by Chrome:

```css
https://{YOUR_ANTMEDIA_SERVER}:5443/live/videojs-doverunner-sample.html
```

- Click Play

- If it works — congratulations! 🎉 You are successfully playing a DRM-protected video using Widevine with your Ant Media Server.
