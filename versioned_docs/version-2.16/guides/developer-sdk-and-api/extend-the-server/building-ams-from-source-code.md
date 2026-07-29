---
title: Build from Source
description: Build Ant Media Server from source for contribution or custom development.
keywords: [Building AMS from Source Code, Ant Media Server Documentation]
sidebar_position: 1
sidebar_label: Build from Source
---

# Build from Source

Build Ant Media Server locally when you need to contribute to the project, patch the server, or create a custom distribution.

## Prerequisites

- Ubuntu Linux (recommended)
- Java JDK and Maven
- Node.js v20 LTS (for the management console)
- Git

## Step 1: Build parent POM

```bash
git clone https://github.com/ant-media/ant-media-server-parent.git
cd ant-media-server-parent/
mvn clean install -Dgpg.skip=true
cd ..
```

## Step 2: Build Community Edition

### Web panel

Install Node.js and Angular CLI:

```bash
wget https://nodejs.org/dist/v20.11.1/node-v20.11.1-linux-x64.tar.xz
tar -xJf node-v20.11.1-linux-x64.tar.xz
echo 'export PATH=$PATH:'`pwd`'/node-v20.11.1-linux-x64/bin' >> ~/.bashrc
npm install -g @angular/cli
```

Build the management console:

```bash
git clone https://github.com/ant-media/Ant-Media-Management-Console.git
cd Ant-Media-Management-Console
npm install
ng build --prod
cp -a ./dist/. ../Ant-Media-Server/src/main/server/webapps/root/
```

### Server package

```bash
git clone https://github.com/ant-media/Ant-Media-Server.git
cd Ant-Media-Server
mvn clean install -Dmaven.javadoc.skip=true -Dmaven.test.skip=true -Dgpg.skip=true
./repackage_community.sh
```

The packaged ZIP appears in `Ant-Media-Server/target/`.

## Step 3: Build Enterprise Edition

Enterprise source is provided to licensed customers.

```bash
git clone https://github.com/ant-media/Ant-Media-Server.git
cd Ant-Media-Server
mvn clean install -Dmaven.javadoc.skip=true -Dmaven.test.skip=true -Dgpg.skip=true
```

Build and deploy enterprise artifacts:

```bash
cd /where/you/download/enterprise/repo
./redeploy.sh
```

Build the Filter plugin (optional):

```bash
git clone https://github.com/ant-media/Plugins.git
cd Plugins/FilterPlugin
mvn install -Dmaven.test.skip=true -Dgpg.skip=true
```

Rebuild the web panel (same steps as Community), then package:

```bash
cd Ant-Media-Server
./repackage_enterprise.sh
```

## Next steps

- Create an [application](/guides/developer-sdk-and-api/extend-the-server/applications/create-new-application/) on your built server
- Develop a [plugin](/guides/developer-sdk-and-api/plugins/developing-plugins/) to extend functionality
