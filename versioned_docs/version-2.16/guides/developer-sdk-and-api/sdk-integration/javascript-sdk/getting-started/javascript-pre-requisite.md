---
title: Pre-Requisite for AMS Web Application development
description: Pre-requisite for AMS Web Application Development 
keywords: [JavaScript SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

## Software requirements

Before starting web application development with Ant Media Server (AMS), ensure you have the following software installed on your system:

*   Ant Media Server Enterprise Edition - Required for WebRTC and live streaming services.
*   Node.js – For running JavaScript applications and managing dependencies.
*   NPM – Comes with Node.js and is required to install packages.
*   IDE – An editor or integrated development environment for coding.
*   HTTP Server – Needed to serve web applications for development and testing.

### Node.js & NPM Installation

You can follow the official documentation to install Node.js and NPM:

 [Node.js Installation Guide](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)

Once installed, verify the installation by running the following commands in your terminal:

```bash
node -v
npm -v
```
You should see the installed versions printed on the screen.

### IDE

You can use any IDE of your choice. For this guide, we will use Visual Studio Code.

To install Visual Studio Code, follow the steps here:

[**Visual Studio Code Setup Guide**](https://code.visualstudio.com/docs/setup/setup-overview)

Once installed, open Visual Studio Code and configure it for JavaScript development to streamline your workflow.

### HTTP Server

An HTTP server is required to serve your web application locally during development. For simplicity, we will use Python’s built-in HTTP server.

* Install Python: Follow the official download page to install Python:

[**Python Downloads**](https://www.python.org/downloads/).

* Start HTTP Server: Once Python is installed, navigate to your project folder in the terminal and run:

For Python 3:
```bash
python3 -m http.server 8080
```
For Python 2:

```bash
python -m http.server 8080
```
Your project will now be served at `http://localhost:8080`.

## Congratulations!

You now have all the pre-requisites installed and ready for **AMS Web Application development**. You are fully prepared to start building, testing, and deploying live streaming web applications with Ant Media Server.