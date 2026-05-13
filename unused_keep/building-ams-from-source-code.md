---
title: Building AMS Source Code 
description: Building an Ant Media Server from source code for contribution or further development.
keywords: [Building AMS from Source Code, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

# Building AMS from Source Code

#### Linux (Ubuntu)

A couple of common repos should be cloned and built with Maven.

*   Go to a directory where you will clone repos
*   Clone and build `ant-media-server-parent`
    
    ```bash
    git clone https://github.com/ant-media/ant-media-server-parent.git
    cd ant-media-server-parent/
    mvn clean install -Dgpg.skip=true
    cd ..
    ```

#### Building Community Edition

*   Clone the repositories
    ```bash
    git clone https://github.com/ant-media/Ant-Media-Server.git
    git clone https://github.com/ant-media/Ant-Media-Management-Console.git
    ```
    
*   Build Web Panel
    ```bash
    cd Ant-Media-Management-Console
    npm install
    # Need this to use older SSL when building Web Panel
    export NODE_OPTIONS=--openssl-legacy-provider
    ng build --prod
    cp -a ./dist/. ../Ant-Media-Server/src/main/server/webapps/root/
    cd ..
    ```
    
*   Build and package Ant-Media-Server

    ```bash
    cd Ant-Media-Server
    mvn clean install -Dmaven.javadoc.skip=true -Dmaven.test.skip=true -Dgpg.skip=true
    # Optionally: this script does the build and redeploys community to installation
    #./repackage_community.sh
    ```
        
### Building Enterprise Edition

If you are building Enterprise, finish the the steps above first.  Then:

*  Build Ant-Media-Enterprise code 
    Note: Ant-Media-Enterprise is provided to Enterprise users.  Instructions assume it's in Ant-Media-Enterprise folder

    ```bash
    cd Ant-Media-Enterprise
    mvn clean install -Dmaven.javadoc.skip=true -Dmaven.test.skip=true -Dgpg.skip=true -Djarsigner.skip=true
    # You may also use this script which builds and redeploys and starts the server
    # ./redeploy.sh
    cd ..
    ```

*   Build the Filter Plugin
    ```bash
    git clone https://github.com/ant-media/Plugins.git
    cd Plugins/FilterPlugin
    mvn install -Dmaven.test.skip=true -Dgpg.skip=true
    cd ..
    ```
    
*   Package Enterprise Edition
    ```bash
    cd Ant-Media-Server
    ./repackage_enterprise.sh
    ```

## Congratulations!

If all steps are completed successfully, a new packaged Ant Media Server (ant-media-server-x.x.x.zip) will be available in the `Ant-Media-Server/target` directory. You can now deploy, test, or contribute to the server, explore the source code, and extend its functionality. Your development environment is ready, and you’re all set to dive into AMS customization and feature enhancements!
