---
title: Circle - Video Conferencing Solution
description: Circle: Video Conferencing Solution on top of Ant Media Server
keywords: [Conference Ant Media, Ant Media video conference, ant media conferencing, Circle]
sidebar_position: 1
---

# Circle: Free Video Conferencing Solution

Circle is a ready-to-use open-source, online video conferencing application built on top of Ant Media Server that can be deployed on-premises or on a private/public cloud. If you are concerned about privacy or being behind a firewall, this is the best solution for you.

## Key Features

* **Unlock the Number of Attendees:** Thanks to the Scalability of Ant Media Server. The Circle is built to scale the number of attendees.
* **Easy to Use:** Just let your attendees join the video call with their favorite web browsers.
* **Privacy:** Deploy it into your private/public cloud or on-premises. Make sure your live video conference is yours and it cannot be watched by anyone in the cloud.
* **Distribute Live to Your Large Audience:** Distribute your video call to tens of thousands of viewers as a single video through CDN, Youtube, Vimeo, etc.
* **Record:** Record your video conference to watch it later or for archiving.

## Installation of Circle on AMS

Circle is a web application that runs on Ant Media Server. To install Circle on Ant Media Server, you need to have a war file of the Circle application. You can either build it by yourself or you can download the latest war file. You can download [the stable version](https://github.com/ant-media/conference-call-application/releases) or [latest snapshot](https://oss.sonatype.org/#nexus-search;gav~io.antmedia.webrtc~ConferenceCall~~~~kw,versionexpand).

### Build Circle (Optional)

If you want to build it by yourself, you can follow these steps. 

You should have `Maven`, `Java 17 SDK`, and `Node` installed on your system.

* **Step 1: Clone Repository:**

  ```bash
  git clone https://github.com/ant-media/conference-call-application.git
  ```
  
* **Step 2: Build Application File:**

  ```bash
  cd conference-call-application
  ./createwar.sh
  ```

After running the script, the `ConferenceCall.war` file should be in the `target` folder.

### Application Installation

First, log in to the Ant Media Server Management Panel.

* **Step 1:** On the Dashboard page, click the New Application button.
* **Step 2:** Click the Chose File button and browse the war file you downloaded.
* **Step 3:** Give a name to the application.
* **Step 4:** Click the Create button. That's all.

![Circla App Installation](@site/static/img/conference/circle/circle-app-installation.png)

### Usage

* Visit `https://antmediaserver-domain/Application_Name`

* Click **Create Meeting**
  ![](@site/static/img/conference/circle/circle-room-creation.png)
  
* Enter your name for yourself and join the meeting
  ![](@site/static/img/conference/circle/circle-room-entrance.png)
  
* You are in the room now
  ![](@site/static/img/conference/circle/circle-room.png)

### Try Now

If you want to try the Circle conference application without any installation, visit [here](https://meet.antmedia.io/Conference).

## Advanced Topics (for Developers)

### Customization:

You can make any changes to the Circle code base and customize it for your own applications without any restriction.

If you want to change only look and feel, for example, button availabilities, the ⁣`.env.production` file provides some configurations to customize general UI.

### Embedding into Website

If you want to embed Circle into your website as a component, please follow [this guide](https://antmedia.io/docs/guides/developing-antmedia-server/circle-component-usage/).

----------

In the next document, we will learn in more detail about the Ant Media Server Conferece solution structure.
