---
title: Getting started 
description: Basic guide to what plugins are, how to use them, and where to learn more.
keywords: [Ant Media Server plug-in, Ant Media plug-in getting started, Ant Media Server Documentation, Ant Media Server Tutorials, Getting started, Plugin, Ant Media Server plugin]
sidebar_position: 1
---

:::info What you'll learn
This document covers plugin basics: what plugins are, how to install them, and where to go next for development.
:::

### What are plugins?

The Ant Media plugin system allows developers to customize and extend server functionality, while keeping the server source codes untouched. This includes capabilities like modifying video stream data or adding new logic, such as custom REST controllers and workflow management.

The plugin architecture is versatile enough to address various developer needs. For example, the [MCU](./plugins-for-ant-media-server.md#filter-plugin) (Merge/Mix Streams) and [DRM](./plugins-for-ant-media-server.md#drm-plugin) features was developed by the Ant Media team as a plugin, showcasing the wide range of possible use cases.


---
### Plugin Intallation guide:


#### Prerequisites:
* You must have filesystem access to your Ant Media Server. 
* You need the plugin file, which is typically a `.jar` or `.zip` file.

> **Important:** Always back up your server configuration and data before installing new plugins!

#### Installation Steps

1.  **Place the Plugin File**
    Move the plugin file (e.g., `plugin_name.jar`) into the Ant Media Server's `plugins` directory.
    * The default path is `/usr/local/antmedia/plugins`. This path may vary for custom installations.

2.  **Set File Ownership**
    Ensure the plugin file is owned by the `antmedia` user and group to avoid permission issues.
    ```bash
    sudo chown antmedia:antmedia /usr/local/antmedia/plugins/plugin_name.jar
    ```

3.  **Restart the Server**
    For the server to load the new plugin, you must restart the Ant Media Server service.
    ```bash
    sudo service antmedia restart
    ```

4.  **Verify the Installation**
    Check the server logs to confirm that the plugin loaded successfully. You should see a confirmation message.
    ```bash
    cat /usr/local/antmedia/log/ant-media-server.log | grep plugin
    ```
    Look for a line indicating that your specific plugin has been loaded.


---
### Next Steps

Now that you understand the basics of using plugins, you're ready to dive deeper:

* **Plugin Architecture:** To understand how the plugin system works under the hood, read our [Plugin Architecture page](./plugin-architecture.md).

* **Developing Your First Plugin:** Ready to build your own custom functionality? Follow our [Plugin Development Tutorial](./developing-plugins.md).

* **Community Support:** Have questions or want to share what you've built? Join the discussion on our [GitHub Community](https://github.com/ant-media/Ant-Media-Server/discussions).