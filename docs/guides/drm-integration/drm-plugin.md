---
title: DRM Plugin for Ant Media Server
description: Installation and Configuration of DRM Plugin with Ant Media Server
keywords: [DRM, DRM Plugin, DRM Plugin for Ant Media Server, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

# DRM Plugin for Ant Media Server

The Digital Rights Management (DRM) Plugin for Ant Media Server enables secure streaming by integrating with the CPIX (Content Protection Information Exchange) API. It ensures that only authorized users can access your content through encryption and multi-DRM support (**Widevine, FairPlay, and PlayReady**).

## Key Features

- Seamless integration with CPIX API for content key management.
- Support for Dash and HLS output.
- Multi-DRM support: Widevine, FairPlay, PlayReady.

## Installation

### Pre-requisites
Ensure the Ant Media Server is already running on your machine or instance.

### Step 1: Purchase and Install the DRM Plugin

1. **Purchase the Plugin**  
   - [Get the DRM Plugin](https://antmedia.io/product/drm-plugin/) on a monthly subscription basis.  
   - Alternatively, send an email to contact@antmedia.io.

2. **Install the DRM Plugin**  
   - Download and copy the plugin JAR file to your Ant Media `plugins` directory.

   ```bash
   sudo cp DRM-Plugin-bundle.jar /usr/local/antmedia/plugins
   ```

   - Restart the Ant Media Server to apply changes:

   ```bash
   sudo service antmedia restart
   ```

### Step 2: Install Shaka Packager

1. Download the Shaka Packager binary:

   ```bash
   wget https://github.com/shaka-project/shaka-packager/releases/download/v3.4.1/packager-linux-x64 -O shakapackager
   ```

2. Move it to the bin and make it executable:

   ```bash
   sudo cp shakapackager /usr/local/bin/
   sudo chmod +x /usr/local/bin/shakapackager
   ```

## Configuration

DRM plugin settings are added under the `customSettings` in the application settings in Ant Media Server.

### Step 1: Navigate to Custom Settings

1. Open the Ant Media Server web panel.
2. Click your application on the left sidebar (e.g., `live`).
3. Go to the **Settings** tab and select **Advanced**.
4. Locate the `customSettings` property.

### Step 2: Add DRM Settings

Minimal required configuration:

```json
"customSettings": {
  "plugin.drm-plugin": {
    "enabledDRMSystems": [
      "Widevine"
    ],
    "keyManagementServerURL": "{KMS_URL}"
  }
}
```

Multiple DRM systems can also be passed:

```json
"enabledDRMSystems": [
  "Widevine","PlayReady"
]
```

### Available Configuration Fields

- **`keyManagementServerURL`** (Required): URL to obtain encryption keys from your DRM provider using the CPIX API.
- **`enabledDRMSystems`** (Required): JSON array of DRM systems: ["Widevine", "FairPlay", "PlayReady"].
- **`encryptionScheme`**: "cbcs" (default) or "cenc". `cbcs` supports all systems; `cenc` doesn’t support FairPlay.
- **`hlsPlayListType`**: "LIVE" (default), "VOD", or "EVENT".
- **`segmentDurationSecs`**: Segment duration in seconds. Default is 2.
- **`timeShiftBufferDepthSecs`**: Buffer duration for live streams. Default is 60.
- **`segmentsOutsideLiveWindow`**: Extra segments outside the buffer window. Default is 5.

## DoveRunner Multi-DRM Integration (Widevine Example)

### Step 1: Get a KMS Token from DoveRunner

1. Log in to your [DoveRunner Web Panel](https://doverunner.com/).
2. Navigate to Multi-DRM > DRM Settings.
3. Copy your KMS Token.
4. Construct the `keyManagementServerURL`:

   ```bash
   https://kms.pallycon.com/v2/cpix/pallycon/getKey/{REPLACE_WITH_YOUR_KMS_TOKEN}
   ```

5. Update your `customSettings` in the Ant Media Server web panel:

   ```json
   "plugin.drm-plugin": {
     "enabledDRMSystems": [
       "Widevine"
     ],
     "keyManagementServerURL": "https://kms.pallycon.com/v2/cpix/pallycon/getKey/{REPLACE_WITH_YOUR_KMS_TOKEN}"
   }
   ```

6. Save the settings.

### Step 2: Add Video.js Player for Playback

Clone DoveRunner's sample HTML5 player:

```bash
git clone https://github.com/doverunner/html5-player-drm-samples
```

Copy the files to your `live` app’s web directory:

```bash
cd html5-player-drm-samples
sudo cp videojs-doverunner-sample.html /usr/local/antmedia/webapps/live/
sudo cp js/videojs-sample.js /usr/local/antmedia/webapps/live/js/
sudo cp js/doverunner-sample-helper.js /usr/local/antmedia/webapps/live/js/
sudo cp css/* /usr/local/antmedia/webapps/live/css/
```

### Step 3: Publish a WebRTC Stream

1. Publish a WebRTC stream from Chrome using your Ant Media Server sample publish page. See the [WebRTC Publish guide](https://antmedia.io/docs/guides/publish-live-stream/webrtc/).
2. Use `stream007` as the `streamId` in this example. Verify that the stream directory has been created:

   ```bash
   sudo ls /usr/local/antmedia/webapps/live/streams/drm/stream007/
   ```

   You should see `master.mpd` and `master.m3u8`, confirming the stream is DRM-protected.

3. Example playback URLs:

   ```bash
   DASH: https://{YOUR_ANTMEDIA_SERVER}:5443/live/streams/drm/stream123/master.mpd
   HLS:  https://{YOUR_ANTMEDIA_SERVER}:5443/live/streams/drm/stream123/master.m3u8
   ```

### Step 4: Generate Widevine Token

1. Visit [DoveRunner Token Generator](https://devconsole.doverunner.com/drm-tools/license-token/#token-generator).
2. Fill in the following:
   - **SITE ID, SITE Key, ACCESS Key**: From DRM Settings on DoveRunner.
   - **DRM Type**: `Widevine`.
   - **CID**: Your streamId (e.g., `stream007`).
   - **USER ID**: Any unique identifier (e.g., `1234`).
   - Click **Refresh Timestamp** and keep default values for the rest.
3. Click **Generate Token** and copy the result.
4. Edit the following file:

   ```bash
   sudo nano /usr/local/antmedia/webapps/live/js/doverunner-sample-helper.js
   ```

   Replace:

   ```js
   dashUri = "https://{YOUR_ANTMEDIA_SERVER}:5443/live/streams/drm/stream007/master.mpd";
   widevineToken = '{PASTE_YOUR_GENERATED_TOKEN_HERE}';
   ```

5. Save and exit.

### Step 5: Play Stream in Chrome

Open the following URL in Chrome (Widevine is supported):

```html
https://{YOUR_ANTMEDIA_SERVER}:5443/live/videojs-doverunner-sample.html
```

Click Play. If successful, the stream will play as DRM-protected video using Widevine with Ant Media Server.

To confirm DRM protection, attempt to take a screenshot. If the captured screen is blank, DRM is active.

---

## Congratulations!

By completing these steps, you have:

- Installed and configured the DRM Plugin for Ant Media Server.
- Integrated the plugin with DoveRunner for Widevine DRM.
- Published a DRM-protected live stream.
- Successfully tested playback through a DRM-enabled player.

Your streams are now protected, ensuring that only authorized users can access the content.

