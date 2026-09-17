---
title: Project Setup
description: Set up a project for the Ant Media JavaScript SDK.
keywords: [JavaScript SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
sidebar_label: Project Setup
---

# Project Setup

Create a local project and install the JavaScript SDK.

## Create the project folder

```bash
mkdir jssdk-examples
cd jssdk-examples
```

## Install the SDK

```bash
npm i @antmedia/webrtc_adaptor
```

## Verify the setup

1. Create `test.html` in the project folder:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
  </head>
  <body>
    <script type="module">
        import { WebRTCAdaptor } from './node_modules/@antmedia/webrtc_adaptor/src/main/js/webrtc_adaptor.js';
    </script>
  </body>
</html>
```

2. Start a local HTTP server in the same directory:

```bash
python3 -m http.server
```

3. Open `http://localhost:8000/test.html` and check the browser console (F12) for import errors.

## Next step

Continue with the [Publish](/guides/developer-sdk-and-api/sdk-integration/javascript-sdk/webrtc-samples/publish/) sample or other [JavaScript SDK samples](/category/javascript-sdk-samples/).
