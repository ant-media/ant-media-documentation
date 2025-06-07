---
title: Project Setup
description: Setting up project for JavaScript SDK Integration
keywords: [JavaScript SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

Now let's setup our project and start using Ant Media Server Java Script SDK.

### Create Project 

- Create a folder

  ```
  mkdir jssdk-examples
  ```

- Switch to the created folder

  ```
  cd jssdk-examples
  ```

### Install dependencies

Open Terminal and run **npm install** to install dependencies.

```
npm i @antmedia/webrtc_adaptor
```

### Start HTTP Server

Now, we will start an HTTP server to live preview HTML files. 

```
python -m http.server

OR

python3 -m http.server
```

### Testing

Before we proceed with streaming, let's confirm if everything is working fine.

Create a `test.html` file inside the folder and paste this content into the file.

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

Now, open the file with the HTTP server.

```
http://localhost:8000/test.html
```

Open console logs by pressing F12 and verify that there are no errors in console logs. Now that we have setup the project, we can start developing with JS SDK.
