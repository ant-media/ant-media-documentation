---
title: Project Setup
description: Setting up project for JavaScript SDK Integration
keywords: [JavaScript SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---

Now lets setup our project and start using Ant Media Server Java Script SDK.

### Create Project 

Create a folder

```
mkdir jssdk-examples
```

Switch to the created folder

```
cd jssdk-examples
```

### Install dependencies

Open Terminal and run **npm install** to install dependencies

```
npm i @antmedia/webrtc_adaptor
```

### Start HTTP Server

Now, we will Start HTTP server to live Prview HTML files. 

```
python -m http.server
```

### Testing

Before we proceed with streaming lets confirm if everything is working fine.

create test.html file and paste this content into the file.

```
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


open the file with http server.

```
http://localhost:8000/test.html
```

open console logs by pressing F12 and verify that there are no errors in console logs.Now that we have setup the project we can start developing with JS SDK.
