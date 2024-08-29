---
title: Download and install WebRTC sample projects
description: Download and install WebRTC sample projects 
keywords: [JavaScript SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---

WebRTC samples are free to download. You can download/clone them via [StreamApp Github repository](https://github.com/ant-media/StreamApp).

Open the project in Visual Studio Code, and make sure you have installed the `Node.js` and `NPM`. 


### Install dependencies

Open Terminal and run **npm install** to be able to install the dependencies.

![](@site/static/img/sdk-integration/javascript-sdk/install-dependencies.png)

### Run sample project

In the project navigator, you will find a folder named `webapps` inside the `src/main` path. Inside this folder, there are a couple of sample HTML files that use the Ant Media Server's JavaScript SDK to test. 

All projects use [@antmedia/webrtc_adaptor](https://www.npmjs.com/package/@antmedia/webrtc_adaptor) dependency.

To run the sample apps, you need to run the HTTP server inside `webapps` folder. 

![](@site/static/img/sdk-integration/javascript-sdk/run-http-server.png)

Before proceeding further, to make the samples work locally, move the `js` folder under `/src/main` folder to `webapps` folder.

After moving the `js` folder, in mentioned samples of this document, the `loglevel.min.js` file is importing but it is under the external folder inside the js folder so change the path of the file in the sample as below

```js
import  "../js/external/loglevel.min.js";
```

After that, your samples should work fine.
