title: Circle - Free Video Conferencing Solution
description: Circle - Free Video Conferencing Solution on top of Ant Media Server
keywords: [Conference Ant Media, Ant Media video conference, ant media conferencing, Circle]
sidebar_position: 1
-------------------

# Circle - Free Video Conferencing Solution

Circle is a ready-to-use open-source, online video conferencing application that can be deployed on-prem, private or public cloud. If you are concerned about Privacy or being behind a firewall, this is the best solution for you.

## Key Features

* **Unlock the Number of Attendees:** Thanks to the Scalability of Ant Media Server. The Circle is built to scale the number of attendees.
* **Easy to Use:**  Just let your attendees join the video call with their favorite web browsers
* **Privacy:** Deploy it into your private/public cloud or on-prem. Make sure your live video conference yours and it cannot be watched by anyone in the cloud.
* **Distribute Live to Your Large Audience:** Distribute your video call to tens of thousands of viewers as a single video through CDN, Youtube, Vimeo, etc.
* **Record:** Record your video conference to watch it later or for archiving.

# Installation on Ant Media Server

Circle is a web application that runs on Ant Media Server. To install Circle on Ant Media Server you need to have war file of Circle application. You can either build it by your self or you can download the latest war file. You can download [stable version](https://github.com/ant-media/conference-call-application/releases) or [latest snapshot](https://oss.sonatype.org/#nexus-search;gav~io.antmedia.webrtc~ConferenceCall~~~~kw,versionexpand).

## Build Circle (Optional)

If you want to build it by your self you can follow these steps. You should have maven, Java 17 SDK and node installed on your system.

* **Step 1 - Checkout Repository:**
  `git clone https://github.com/ant-media/conference-call-application.git`
* **Step 2 - Run build script:**

  ```
  cd conference-call-application
  ./createwar.sh
  ```

After running the script _ConferenceCall.war_ file should be in the target folder.

## Application Installation

First Login to Ant Media Server Management Panel.

* **Step 1:** On the Dashboard page click New Application button.
* **Step 2:** Click Chose File button and browse the war file you downloaded.
* **Step 3:** Give a name to application.
* **Step 4:** Click Create button. That's all.

![Circla App Installation](@site/static/img/conference/circle/circle-app-installation.png)

# Usage

* Visit "https://<antmediaserver_url>/<application_name>"
* Click "Create Meeting"
  ![](@site/static/img/conference/circle/circle-room-creation.png)
* Enter your name for yourself and join the meeting
  ![](@site/static/img/conference/circle/circle-room-entrance.png)
* You are in the room now
  ![](@site/static/img/conference/circle/circle-room.png)

# Try Now

If you want to try Circle without any installation please [click](https://meet.antmedia.io/Conference).

# Advanced Topics (for Developers)

### Customization:

You can make any changes on Circle code base and customize it for your own applications without any restriction.
If you want to change only look and feel for example button availibilities, `.env.production` file provides some configurations to customize general UI.

### Embedding into Website

If you want to embed Circle into your website as a component please follow [this guide](https://antmedia.io/docs/guides/developing-antmedia-server/circle-component-usage/).
