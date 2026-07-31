---
title: Build from Source
description: Build Ant Media Server from source for contribution or custom development.
keywords: [Building AMS from Source Code, Ant Media Server Documentation]
sidebar_position: 1
sidebar_label: Build from Source
---

# Build from Source

Build Ant Media Server from source to contribute, test patches, or create a custom distribution.

## Prerequisites

- Ubuntu Linux (recommended)
- Java JDK and Maven
- Node.js and Angular CLI (for the management console)
- Git

## Linux (Ubuntu)

Clone and build the shared parent Maven project first:

```bash
git clone https://github.com/ant-media/ant-media-server-parent.git
cd ant-media-server-parent/
mvn clean install -Dgpg.skip=true
cd ..
```

## Building Community Edition

### Clone the repositories

```bash
git clone https://github.com/ant-media/Ant-Media-Server.git
git clone https://github.com/ant-media/Ant-Media-Management-Console.git
```

### Build the web panel

```bash
cd Ant-Media-Management-Console
npm install
# Need this to use older SSL when building the web panel
export NODE_OPTIONS=--openssl-legacy-provider
ng build --prod
cp -a ./dist/. ../Ant-Media-Server/src/main/server/webapps/root/
cd ..
```

### Build and package Ant Media Server

```bash
cd Ant-Media-Server
mvn clean install -Dmaven.javadoc.skip=true -Dmaven.test.skip=true -Dgpg.skip=true
# Optionally: this script builds and redeploys community to an existing installation
# ./repackage_community.sh
```

When packaging succeeds, `ant-media-server-x.x.x.zip` is available in `Ant-Media-Server/target/`.

## Building Enterprise Edition

If you are building Enterprise Edition, [contact Ant Media](https://antmedia.io/contact-us/) for the latest instructions.

## Next steps

- Create an [application](/guides/developer-sdk-and-api/extend-the-server/applications/create-new-application/) on your built server
- Develop a [plugin](/guides/developer-sdk-and-api/plugins/developing-plugins/) to extend functionality
