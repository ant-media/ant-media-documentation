---
title: Building AMS Source Code 
description: Building an Ant Media Server from source code for contribution or further development.
keywords: [Building AMS from Source Code, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 12
---

# Building AMS from Source Code

#### Linux (Ubuntu)

A couple of common repos should be cloned and built with Maven.

*   Go to a directory where you will clone repos
*   Clone and build `ant-media-server-parent`
    
    ```bash
    $ git clone https://github.com/ant-media/ant-media-server-parent.git
    $ cd ant-media-server-parent/
    $ mvn clean install -Dgpg.skip=true
    $ cd ..
    ```

#### Building Community Edition

*   Build the Web Panel
    *   Install Node
        
        ```bash
        $ wget https://nodejs.org/dist/v20.11.1/node-v20.11.1-linux-x64.tar.xz
        $ tar -xJf node-v20.11.1-linux-x64.tar.xz
        $ echo 'export PATH=$PATH:'`pwd`'/node-v20.11.1-linux-x64/bin' >> ~/.bashrc
        $ npm install -g @angular/cli
        ```
        
    *   Build
        ```bash
        $ git clone https://github.com/ant-media/Ant-Media-Management-Console.git
        $ cd Ant-Media-Management-Console
        $ npm install
        $ ng build --prod
        $ cp -a ./dist/. ../Ant-Media-Server/src/main/server/webapps/root/
         ```
       
   *   Clone, build and package Ant-Media-Server
   
       ```bash
       $ git clone https://github.com/ant-media/Ant-Media-Server.git
       $ cd Ant-Media-Server
       $ mvn clean install -Dmaven.javadoc.skip=true -Dmaven.test.skip=true -Dgpg.skip=true
       $ ./repackage_community.sh
        ```
        
### Building Enterprise Edition

*   Clone and build Ant-Media-Server
    ```bash   
    $ git clone https://github.com/ant-media/Ant-Media-Server.git
    $ cd Ant-Media-Server
    $ mvn clean install -Dmaven.javadoc.skip=true -Dmaven.test.skip=true -Dgpg.skip=true
    ```
    
*   Build Ant-Media-Enterprise Source code of Ant-Media-Enterprise is provided to the Enterprise users

    ```bash
    $ cd /where/you/download/enterprise/repo
    $ ./redeploy.sh
    ```
*   Build the Filter Plugin
    ```bash
    $ git clone https://github.com/ant-media/Plugins.git
    $ cd Plugins/FilterPlugin
    $ mvn install -Dmaven.test.skip=true -Dgpg.skip=true
    ```
    
*   Build the Web Panel
    *   Install Node
        ```bash
        $ wget https://nodejs.org/dist/v20.11.1/node-v20.11.1-linux-x64.tar.xz
        $ tar -xJf node-v20.11.1-linux-x64.tar.xz
        $ echo 'export PATH=$PATH:'`pwd`'/node-v20.11.1-linux-x64/bin' >> ~/.bashrc
        $ npm install -g @angular/cli 
        ```
        
    *   Build
        ```bash
        $ git clone https://github.com/ant-media/Ant-Media-Management-Console.git
        $ cd Ant-Media-Management-Console
        $ npm install
        $ ng build --prod
        $ cp -a ./dist/. ../Ant-Media-Server/src/main/server/webapps/root/
        ```
    *   Package Enterprise Edition
        ```bash
        $ cd Ant-Media-Server
        $ ./repackage_enterprise.sh
        ```

## Congratulations!

If all steps are completed successfully, a new packaged Ant Media Server (ant-media-server-x.x.x.zip) will be available in the `Ant-Media-Server/target` directory. You can now deploy, test, or contribute to the server, explore the source code, and extend its functionality. Your development environment is ready, and you’re all set to dive into AMS customization and feature enhancements!
