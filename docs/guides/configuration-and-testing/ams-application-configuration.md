---
title: AMS Application Configuration
description: Configure Ant Media Server through a configuration file or management console.
keywords: [Ant Media Configuration File, Ant Media Server Documentation, Ant Media Server Tutorials, Ant Media Management Panel, Ant Media Settings, Ant Media Configuration]
sidebar_position: 1
---

# AMS Application Configuration

Ant Media Server can be configured either by editing a configuration file or through the application settings tab in the Management Panel. 

The configuration is set on the application level and is stored in a file located at ```<AMS_DIR>/webapps/{AppName}/WEB-INF/red5-web.properties```. 

The Management Panel allows changing all the application settings; however, the file is much more extensive. See the [Application Settings Javadoc](https://antmedia.io/javadoc/io/antmedia/AppSettings.html) to find a complete list of all available settings.


## Management Panel Application settings

Log in to the Ant Media Server dashboard and click on the application you want to configure from the left-hand menu. Then click on the **Settings** tab.

There are two options here: ***Basic*** and ***Advanced***.

Basic settings include the most commonly used application settings, while the other application settings are under the *Advanced* option.

Starting from Ant Media Server version 2.6.2, all the application settings for both standalone mode and cluster mode of Ant Media Server can be changed from the Management Panel itself.

![](@site/static/img/configuration-and-testing/application-settings.png)


:::info
If you change the application settings via the Web Management Panel, there is no need to change from the backend via the properties file.
:::

## Adding additional settings

If any specific setting has not been added to the ```red5-web.properties``` file or under *Advanced* settings, simply append the setting to the configuration file or add it from the Management Panel.

Follow the steps below to find and add an additional setting:

### 1. Find the setting

Open the [Javadoc](https://antmedia.io/javadoc/io/antmedia/AppSettings.html) page and find the setting that needs to be added to the configuration file. 

### 2. Confirm the setting type and value

The description of each setting confirms the type and default value. 

For example, the setting  ```aacEncodingEnabled``` is of type boolean with a default value of ```true```:

```java
@Value("${settings.aacEncodingEnabled:true}") 
private boolean aacEncodingEnabled 
```  

### 3. Update the configuration file

To add an additional setting to the application, open the application settings and navigate to `Advanced Settings` on the Management Panel.

Following the example of the ```aacEncodingEnabled``` setting, the below can be appended to the file:

```json
aacEncodingEnabled=false
```

## Change App settings programatically

To change the app settings via API, you need to call the Management Rest APIs to change the application settings. You can use this method in either standalone mode or cluster mode of Ant Media Server.

1. First you need to authenticate to call management Rest APIs. You can choose any of the methods defined  **[here](https://antmedia.io/docs/guides/developer-sdk-and-api/rest-api-guide/management-rest-apis/)**.

   In this example, we authenticated using user name and password.

2.  Call the  [Get Settings Rest API](https://antmedia.io/rest/#/ManagementRestService/getSettings)  to get the settings of application. In this example, for LiveApp.

    Here is the curl sample:

     ```bash
     curl -X GET -H "Content-Type: application/json" "https://example.com:5443/rest/v2/applications" --cookie cookies.txt
    ```

    In response you will get all the application properties, that you need to copy and use it in next call.

3. After getting the application settings from the response of the previous Rest API call, use  [Change settings Rest API](https://antmedia.io/rest/#/ManagementRestService/changeSettings)  to change the settings.

   For example, to disable the HLS option you need to change the below property and rest other properties will be  **same**.

   `"hlsMuxingEnabled": false,`  

   Here is the curl sample:

   ```bash
   curl --location 'https://example.com:5443/rest/v2/applications/settings/LiveApp' \
   --header 'Content-Type: application/json' \
   --cookie cookies.txt \
   --data '{
    "hlsMuxingEnabled": true,
   }'
   ```

   After that, you can verify the changes through the Management Panel.

<div align="center">

### AMS configuration for you

</div>

You’ve logged into the Management Panel, explored both Basic and Advanced settings, and even learned how to tweak the `red5-web.properties` file directly for fine-grained control.

Tada, you now have full mastery over your Ant Media Server application settings, whether through the dashboard or configuration files, ensuring it runs exactly the way you need.
