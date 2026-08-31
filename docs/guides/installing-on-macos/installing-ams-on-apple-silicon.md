---
title: Installing AMS on Apple Silicon
description: Installing Ant Media Server on Apple Silicon.
keywords: [Install Ant Media Server on MacOS, Install SSL on AMS, Cluster Installation, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

### Developer Guide: Setting Up Ant Media Server on Apple Silicon Mac

#### Step 1: Install Java
1. Visit the Oracle website and download the Java for x64 Compressed Archive.
2. Extract the Java package and move it to an appropriate location on your system.
3. Set the installed Java version as the default. You can do this by adding Java's bin directory to your system's `PATH` environment variable. Edit your shell's profile file (e.g., `~/.zshrc` or `~/.bash_profile`) and add the line: `export PATH=/path/to/java/bin:$PATH`.
4. Verify the installation by opening a new terminal window and typing `java -version`. You should see the version of Java you installed.

#### Step 2: Download and Extract Ant Media Server
1. Download the Ant Media Server zip file from the official Ant Media website.
2. Extract the zip file to your desired location.

#### Step 3: Configure Ant Media Server
1. Navigate to the extracted `ant-media-server` folder.
2. Open the `conf` folder and find the `red5.properties` file. Edit the file and modify the following values to ensure that the server utilizes full system resources:
    - `server.cpu_limit=100`
    - `server.memory_limit_percentage=100`
    - `server.min_free_ram=0`
3. Next, open the `red5-common.xml` file within the same `conf` folder.
4. Locate and delete the following bean related to SRT (Secure Reliable Transport), as it's currently not supported on macOS:
    ```xml
    <bean id="srtAdaptor" class="#{ T(io.antmedia.rest.RestServiceBase).isEnterprise() ? 'io.antmedia.enterprise.srt.SRTAdaptor' : 'io.antmedia.srt.SRTAdaptor' }"></bean>
    ```
5. In the `red5-common.xml` file, search for `io.vertx.core.VertxOptions` and update the `eventLoopPoolSize` and `workerPoolSize` values to `18`. This adjustment is necessary for optimizing the server performance.

#### Step 4: Test Run Ant Media Server
1. Navigate to the root directory of the `ant-media-server` folder in the terminal.
2. Run the `start.sh` script to start the Ant Media Server: `./start.sh`.
3. If everything is configured correctly, the server should start, and you can begin testing your streams.

### Note:
- The steps mentioned above are specific to setting up Ant Media Server on Apple Silicon Mac devices and may vary based on individual system configurations and software versions.
- Always ensure that you have the necessary permissions to execute scripts and make system changes.

By following this guide, you should be able to successfully set up and run Ant Media Server on an Apple Silicon Mac device. Happy streaming!
