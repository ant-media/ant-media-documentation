---
title: Project Setup for JavaScript SDK Integration
description: Setting up project for JavaScript SDK Integration
keywords: [JavaScript SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

Now that we have the pre-requisites installed, let's set up a project to use the Ant Media Server JavaScript SDK.

### Step 1: Create Project Folder

- Create a new folder for your project:

  ```
  mkdir jssdk-examples
  ```

- Switch into the newly created folder:

  ```
  cd jssdk-examples
  ```

### Step 2: Install Dependencies

Open your terminal and run **npm install** to install the necessary dependencies:

```
npm i @antmedia/webrtc_adaptor
```

This installs the WebRTC Adaptor package needed for streaming with Ant Media Server.

### Step 3: Start HTTP Server

To preview HTML files locally, we need an HTTP server. You can use Python’s built-in server:

For Python 3:
```bash
python3 -m http.server
```
For Python 2:
```bash
python -m http.server
```

By default, the server runs at http://localhost:8000.

### Step 4: Testing the Setup

Before starting with streaming, let’s make sure the setup works:

1. Create a file named `test.html` inside your project folder.

2. Paste the following content into `test.html`:

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

3. Open the file through the HTTP server in your browser:

```
http://localhost:8000/test.html
```

4. Press F12 to open console logs and verify that there are no errors.


## Congratulations!

Your JavaScript SDK project is now ready. The environment is set up, dependencies are installed, and your HTTP server is running. You can now confidently start developing live streaming applications using the Ant Media Server JavaScript SDK.