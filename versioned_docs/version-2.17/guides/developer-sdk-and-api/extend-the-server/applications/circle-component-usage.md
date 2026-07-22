---
title: Circle App Component Usage 
description: Embedding Circle Conference Application into webpage
keywords: [Conference Application, Circle App, component usage, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---

# Circle App Component Usage

[Circle](https://github.com/ant-media/conference-call-application) is a self-hosted, open source video conferencing solution built by Ant Media that can be deployed anywhere—locally or in the cloud. It delivers high-quality video with ultra-low latency and supports up to 200 participants per room. If you're concerned about **privacy** or operating behind a **firewall**, this is the ideal solution.

This guide shows you how to integrate Circle's frontend component into your existing web application, allowing you to embed a complete video conferencing interface directly into your webpage so users can join conferences without leaving your app.

## Prerequisites

- **Ant Media Enterprise Edition** 
- **Node.js**: v20 LTS version
- **NPM**: v9 or higher

## Integration Steps

1. Clone the [conference-call-application](https://github.com/ant-media/conference-call-application) repository:
   
   ```bash
   git clone https://github.com/ant-media/conference-call-application.git
   ```

2. Navigate to the react directory and install dependencies:

   ```bash
   cd conference-call-application/react
   npm install --legacy-peer-deps
   ```

3. Build the application:
   ```bash
   npm run build
   ```

4. Copy static assets:
   - Go to the `build` folder inside the `react` directory
   - Copy the entire `static` folder to your web application's public path

5. Include CSS and JS files in your HTML header:
   ```html
   <script defer="defer" src="./static/js/main.9c1bebc8.js"></script>
   <link href="./static/css/main.24ed3d1e.css" rel="stylesheet" />
   ```
   **Note**: File names change with each build. Check the actual filenames in your build folder.

6. Add the Circle component container to your webpage:
   ```html
   <div id="root" 
        data-room-name="<room_name>" 
        data-websocket-url="wss://<ip_address>:<port>/<application_name>/websocket" 
        style="background-color: #001D1A; box-sizing: border-box; height: 480px; width: 640px; position: relative;">
   </div>
   ```

7. Configure the parameters:
   - Replace `<room_name>` with your desired room identifier
   - Replace `<ip_address>` with your Ant Media Server IP address  
   - Replace `<port>` with your server port (typically 5443 for HTTPS)
   - Replace `<application_name>` with your application name

### Congratulations!

The Circle conference component is now successfully embedded in your web application. Users can join video conferences directly from your webpage, and you can customize the component’s appearance and behavior as needed. Your application is now ready for seamless, low-latency video collaboration.