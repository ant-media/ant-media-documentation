---
title: AMS application configuration
description: Configure Ant Media Server through configuration file or management console.
keywords: [Ant Media Configuration File, Ant Media Server Documentation, Ant Media Server Tutorials, Ant Media Management Panel, Ant Media Settings, Ant Media Configuration]
sidebar_position: 1
---

# AMS application configuration

Ant Media Server can be configured either by editing a configuration file or through the application settings tab in the Management Panel. 

The configuration is set on the application level and is stored in a file located at ```<AMS_DIR>/webapps/{AppName}/WEB-INF/red5-web.properties```. 

The Management Panel allows changing all the application settings; however, the file is much more extensive. See the [Application Settings Javadoc](https://antmedia.io/javadoc/io/antmedia/AppSettings.html) to find a complete list of all available settings.


## Management Panel settings

Log in to the Ant Media Server dashboard and click on the application you want to configure from the left-hand menu. Then click on the **Settings** tab.

There are two options here: *Basic* and *Advanced*.

Basic settings include the most commonly used application settings, while the other application settings are under the *Advanced* option.

Starting from Ant Media Server version 2.6.2, all the application settings for both Standalone mode and Cluster mode of Ant Media Server can be changed from the Management Panel itself.

![](@site/static/img/configuration-and-testing/application-settings.png)


:::info

If you change the application settings via Web Management Panel so there is no need to change from the backend via properties file.

:::

## Application properties file

The application settings can also be modified by editing the configuration file directly. Navigate to the file located at ```<AMS_DIR>/webapps/{AppName}/WEB-INF/red5-web.properties``` and open it using your preferred editor.

Highlighted below is how to enable VP8 encoding by editing the configuration file:

![](@site/static/img/configuration-and-testing/application-settings-properties.png)


## Adding additional settings

If a configuration setting has not been added to the ```red5-web.properties``` file or under *Advanced* settings, simply append the setting to the configuration file or add it from the Management Panel.

Follow the steps below to find and add an additional setting:

### 1. Find the setting

Open the [Javadoc](https://antmedia.io/javadoc/io/antmedia/AppSettings.html) page and find the setting that needs to be added to the configuration file. 

### 2. Confirm the setting type and value

The description of each setting confirms the type and default value. For example, the setting  ```aacEncodingEnabled``` is of type boolean with a default value of ```true```:

```java
@Value("${settings.aacEncodingEnabled:true}") 
private boolean aacEncodingEnabled 
```

To confirm the function of the setting, additional information is provided in the description:

    If aacEncodingEnabled is true, AAC encoding will be active even if MP4 or HLS muxing is not enabled. If aacEncodingEnabled is false, AAC encoding is only activated if MP4 or HLS muxing is enabled in the settings. This value should be true if you're sending a stream to RTMP endpoints or enabling/disabling MP4 recording on the fly.
        

### 3. Update the configuration file

To add an additional setting to the configuration file, open the application settings, navigate to Advanced Settings on the Management Panel, or go to red5-web.properties file located at ```<AMS_DIR>/webapps/{AppName}/WEB-INF/red5-web.properties```.

Following the example of the ```aacEncodingEnabled``` setting, the below can be appended to the file:

```java  
settings.aacEncodingEnabled=false
```
<div align="center">

### AMS configuration for you

</div>

You’ve logged into the Management Panel, explored both Basic and Advanced settings, and even learned how to tweak the `red5-web.properties` file directly for fine-grained control.

Tada, you now have full mastery over your Ant Media Server application settings, whether through the dashboard or configuration files, ensuring it runs exactly the way you need.
