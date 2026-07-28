---
title: Which Installation Method Should I Use?
description: A quick decision guide to the AMS installation method that fits your situation — native Linux, Docker, Docker Compose, WSL, or Cluster.
keywords: [Install Ant Media Server, Docker vs native install, WSL, Cluster installation, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

# Which Installation Method Should I Use?

Ant Media Server (AMS) can be installed several different ways, and it's not always obvious which one fits your situation. Use this to find your path before diving into a specific guide:

```mermaid
flowchart TD
    A{What do you need?} -->|Evaluate or try AMS quickly| B["Docker"]
    A -->|Local development on Windows| C["WSL"]
    A -->|Repeatable, version-controlled setup| D["Docker Compose"]
    A -->|Production on a single server| E["Native Linux Install"]
    A -->|Production, scaling beyond one server| F["Cluster"]
```

- **[Native Install on Linux](/guides/installing-on-linux/installing-ams-on-linux/)** — the standard choice for a production server. Installs AMS directly as a systemd service. If you're not sure which to pick for production, start here.
- **[Docker](/guides/installing-on-linux/ams-docker-installation/)** — the fastest way to try AMS, or to run it alongside other containerized services.
- **[Docker Compose](/guides/installing-on-linux/ams-docker-compose-installation/)** — the same as Docker, but with your ports, volumes, and environment variables captured in one file so the setup is repeatable and easy to version-control.
- **[WSL (Windows Subsystem for Linux)](/guides/installing-on-linux/installing-ams-on-wls/)** — for local development and testing on a Windows machine. Not recommended for production.
- **[Cluster](/guides/clustering-and-scaling/manual-configuration/cluster-installation/)** — for scaling beyond what a single instance can handle. Worth setting up once you outgrow one server; see [Clustering & Scaling](/category/clustering-and-scaling/) to choose between the available clustering approaches.

If you're evaluating AMS or just getting started, Docker is usually the quickest path. For a production deployment, [Native Install on Linux](/guides/installing-on-linux/installing-ams-on-linux/) is the most common and best-supported route.

## Once AMS Is Installed

- [Enable SSL](/guides/installing-on-linux/setting-up-ssl/) — required for camera/microphone access in the browser and for secure WebSocket connections.
- [Publish your first stream](/guides/publish-live-stream/webrtc/) to see it in action.
- [Upgrade Version](/guides/installing-on-linux/upgrading-ant-media-server/) or [Uninstall Ant Media Server](/guides/installing-on-linux/uninstall-ant-media-server-on-linux/) when you need to.
