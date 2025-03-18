---
title: Stream quality filtering  
description: Quality filter feature is implemented in order to filter the streams sent to the server. This document will help you to understand, how quality filtering can be setup.
keywords: [Stream quality filtering, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 6
---

# Stream quality filtering 

Quality filter feature is implemented in order to filter the streams sent to the server. If the stream does not meet the qualifications, it won't be published. This is usually used when users want to set some sort of quality standard or eliminate streams that may impact the server.

Let's see how quality filtering can be setup:

*   Open the file ```{AMS-DIR} / webapps / {APPLICATION} / WEB-INF / red5-web.properties```
*   Adding all of the commands below is not mandatory. Just add which criteria you want to filter.
    *   ```settings.maxFpsAccept={value}```
    *   ```settings.maxResolutionAccept={value}```
    *   ```settings.maxBitrateAccept={value}```
*   You can add multiple criteria.

Assume that you set ```settings.maxFpsAccept=15```, streams that have higher than 15 fps will be disregarded and won't be published.