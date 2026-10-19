---
title: Prerequisites
description: Software requirements for building web apps with the Ant Media JavaScript SDK.
keywords: [JavaScript SDK User Guide, Ant Media Server Documentation]
sidebar_position: 1
sidebar_label: Prerequisites
---

# Prerequisites

Install the following before building a web app with the JavaScript SDK.

## Software requirements

| Requirement | Purpose |
|-------------|---------|
| **Ant Media Server** | Community or Enterprise — WebRTC signaling and streaming |
| **Node.js & npm** | Install `@antmedia/webrtc_adaptor` and run build tools |
| **IDE** | Any editor; this guide uses Visual Studio Code |
| **Local HTTP server** | Serve HTML/JS during development (Python, `npx serve`, etc.) |

### Node.js and npm

Follow the [Node.js installation guide](https://nodejs.org/en/download), then verify:

```bash
node -v
npm -v
```

### IDE

Install [Visual Studio Code](https://code.visualstudio.com/) or use any editor you prefer.

### Local HTTP server

Browsers restrict camera/microphone access on `file://` URLs. Serve pages over HTTP locally, for example:

```bash
python3 -m http.server
```

Then open `http://localhost:8000`.

## Next step

Continue to [Project Setup](/guides/developer-sdk-and-api/sdk-integration/javascript-sdk/getting-started/project-setup/).
