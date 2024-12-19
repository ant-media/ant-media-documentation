---
title: Circle App Component Usage 
description: Embedding Circle Conference Application into webpage
keywords: [Conference Application, Circle App, component usage, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 5

---

# Circle App Component Usage

Circle is a self-hosted, open source video conferencing software solution built by Ant Media.  It can be deployed anywhere, both locally or in the cloud. 

It offers the highest quality with the lowest latency, and it can accommodate up to 200 participants. If you are concerned about Privacy or being behind a firewall, this is the best solution for you.

This documentation will explain how you can integrate the Circle application into any existing webpage.



1. Clone [conference-call-application](https://github.com/ant-media/conference-call-application) repository.
2. Install Node v20 LTS version and NPM v9
3. Open terminal and go to react folder 
4. Run ```npm install``` command
5. Run ```npm run build``` command
6. Go to build folder inside react folder
7. Copy static folder, into your web application's path
8. Open the HTML page that you wanted to add Circle App.
9. Add CSS and JS files that we copy from conference-call-application/react/build folder into HTML header. NOTE: File names will change after every build process.

```html
<script defer="defer" src="./static/js/main.9c1bebc8.js"></script>
<link href="./static/css/main.24ed3d1e.css" rel="stylesheet" />
```

10. Add following div element into the section that you wanted to add Circle App

```html
<div id="root" data-room-name="<room_name>" data-websocket-url="wss://<ip_address>:<port>/<application_name>/websocket" style="background-color: #001D1A; box-sizing: border-box; height: 480; width: 640; position: relative;"></div>
```

11. Replace `room_name`, `ip_address`, `port` and `application_name` variables and it's ready to use.
