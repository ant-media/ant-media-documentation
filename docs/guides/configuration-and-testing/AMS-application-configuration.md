---
title: AMS application configuration
sidebar_position: 0
---

Ant Media Server can be configured either by editing a configuration file or through the application settings tab in the management console. 

The configuration is set on the application level and is stored in a file located at ```<AMS_DIR>/webapps/<AppName>/WEB-INF/red5-web.properties```. 

The management panel allows some changes however, the file is much more extensive. See the [Application Settings Javadoc](https://antmedia.io/javadoc/io/antmedia/AppSettings.html) to find a complete list of all available settings.

## Management panel settings

Login to the Ant Media Server dashboard and click on the application you want to configure from the left hand menu. Then click on the settings tab.

Highlighted below is how to enable VP8 encoding in the management panel. 

![](@site/static/img/configuration-and-testing/application-settings-dashboard.png)

## Application properties file

To edit the configuration file directly, navigate to the file located at ```<AMS_DIR>/webapps/<AppName>/WEB-INF/red5-web.properties``` and open it using your preferred editor.

Highlighted below is how to enable VP8 encoding by editing the configuration file.

![](@site/static/img/configuration-and-testing/application-settings-properties.png)


## Adding additional settings

If a configuration setting has not been added to the ```red5-web.properites``` file, simply append the setting to the configuration file.

Follow the steps below to add an additional setting:

### 1. Find the setting

Open the [Javadoc](https://antmedia.io/javadoc/io/antmedia/AppSettings.html) page and find the setting that needs to be added to the configuration file. 

### 2. Confirm the setting type and value

The description of each setting confirms the type and default value. For example, the setting  ```aacEncodingEnabled``` is of type boolean with a default value of ```true```:

```java
@Value("${settings.aacEncodingEnabled:true}") 
private boolean aacEncodingEnabled 
```

To confirm the function of the setting, additional information is provided in the description .

    If aacEncodingEnabled is true, aac encoding will be active even if mp4 or hls muxing is not enabled, If aacEncodingEnabled is false,
    aac encoding is only activated if mp4 or hls muxing is enabled in the settings, This value should be true if you're sending stream to
    RTMP endpoints or enable/disable mp4 recording on the fly
        

### 3 Update the confguration file

To add an additional setting to the configuration file, open the applications ```red5-web.properties``` file located at ```<AMS_DIR>/webapps/<AppName>/WEB-INF/red5-web.properties```.

Following the example of ```aacEncodingEnabled``` setting, the below can be appended to the file:

```java  
settings.aacEncodingEnabled=false
```