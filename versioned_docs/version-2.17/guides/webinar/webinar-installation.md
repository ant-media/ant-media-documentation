---
title: Webinar Installation
description: Install the Circle Webinar application on Ant Media Server from the web panel using the webinar WAR file.
keywords: [Circle Webinar installation, webinar WAR, Ant Media Server webinar app, Ant Media Server Documentation]
sidebar_position: 2
sidebar_label: Installation
---

# Webinar Installation

Circle Webinar runs as an application on Ant Media Server. Install it by uploading the webinar WAR file from the management panel.

:::tip
You need a current Circle Webinar WAR file before you start. Download the latest build from your Ant Media account or distribution channel, then follow the steps below.
:::

## Install the application

1. Sign in to the Ant Media Server web panel.
2. On the dashboard, click **New Application**.
3. Click **Choose File** and select the webinar WAR you downloaded.
4. Enter an application name (for example, `webinar`).
5. Click **Create**.

![](@site/static/img/conference/webinar/webinar-app.webp)

## Verify the install

Open the webinar app in your browser (replace the domain and app name if needed):

```text
https://YOUR_DOMAIN:5443/webinar
```

You should see the webinar room page load successfully:

![](@site/static/img/conference/webinar/webinar.png)

When that page appears, installation is complete. Next, walk through [Webinar in Action](/guides/webinar/webinar-usage/) to join as host, speaker, and listener—and run your first live session with confidence.
