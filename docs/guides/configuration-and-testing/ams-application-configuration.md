---
title: AMS application configuration
description: Configure Ant Media Server through configuration file or management console.
keywords: [Ant Media Configuration File, Ant Media Server Documentation, Ant Media Server Tutorials, Ant Media Management Panel, Ant Media Settings, Ant Media Configuration]
sidebar_position: 1
---

# Configuring Ant Media Server Applications

Ant Media Server Application settings can be configured either by editing the configuration file or through the application settings tab in the management console as well as with REST API calls.

## Configuration File

- Each application's configuration is stored in a file located at ```<AMS_DIR>/webapps/<AppName>/WEB-INF/red5-web.properties.``` 

- While the management console allows you to change most settings, the configuration file contains a more comprehensive list of options. For a complete list of all available settings, refer to the [Application Settings Javadoc](https://antmedia.io/javadoc/io/antmedia/AppSettings.html).

## Managing Settings via the Console

To configure your application via the management console:

1. **Login to the Dashboard**: Access the Ant Media Server dashboard.
2. **Select the Application**: Choose the application you wish to configure from the left-hand menu.
3. **Navigate to Settings**: Click on the "Settings" tab.

You’ll find two categories of settings:
- **Basic Settings**: Contains the most commonly used application settings.
- **Advanced Settings**: Includes additional configuration options.

:::info
Starting from Ant Media Server version 2.6.2, all application settings—whether in Standalone or Cluster mode—can be managed directly through the management console.
:::

![](@site/static/img/configuration-and-testing/application-settings.png)

**Note**: After changing the application settings, you must restart the streams in order for the changes to be applied to them.
  

## Editing the Application Properties File
If you prefer or need to make changes directly to the configuration file:

1. **Locate the File**: Navigate to ```<AMS_DIR>/webapps/<AppName>/WEB-INF/red5-web.properties.```
2. **Open the File**: Use your preferred text editor to modify the file.

- For example, to enable VP8 encoding, you can edit the configuration directly in this file.

![](@site/static/img/configuration-and-testing/application-settings-properties.png)

- After editing the file, save the changes.
- Restart the Ant Media Server with ```sudo service antmedia restart```

## Changing Settings with REST API
Ant Media Server application settings can also be changed with the help of REST API calls. The process to change the settings via API calls is lenghty but it finds use in case you want to limit this access completely.

There are two API calls related to the Applications:

1. **getSettings**: This [getSettings](https://antmedia.io/rest/?urls.primaryName=2.11.0-management#/default/getSettings) API call lists/returns the specific application settings
2. **changeSettings**: This [changeSettings](https://antmedia.io/rest/?urls.primaryName=2.11.0-management#/default/changeSettings) API call changes the specific application settings

:::info
These API calls are management panel API call and needs to be called in a different way. Please check this [Management Panel REST API Services document](https://antmedia.io/docs/guides/developer-sdk-and-api/rest-api-guide/management-rest-apis/) to learn how to make the management Panel API calls.
:::

- Let's make the ``getSettings``` API call to get the application settings.
```js
curl -X GET "http://localhost:5080/rest/v2/applications/settings/LiveApp"
```
![image](https://github.com/user-attachments/assets/b194d9ad-28e8-43ca-8323-1192a2e1d948)

- Let's make the ```changeSettings``` API call to update the application settings.
```js
curl -X POST -H "Content-Type: application/json" "http://localhost:5080/rest/v2/applications/settings/LiveApp"
```

There are two ways to update the application settings:
1. Passing all the application settings in the REST API call body and make the changes only for the setting you would like to update.

![image](https://github.com/user-attachments/assets/4c410e68-c908-496f-a3ca-0400deeb3876)

2. Pass only the settings that need to be changed/updated.

![image](https://github.com/user-attachments/assets/b05eb409-f292-4ea3-bc59-d39b75a4f210)

## Adding Additional Settings

If a configuration setting is not present in the ```red5-web.properties``` file or under Advanced settings in the management console, you can manually add it.

**Steps to Add a New Setting**:
1. **Find the Setting**: Refer to the [Javadoc page](https://antmedia.io/javadoc/io/antmedia/AppSettings.html) to locate the setting you wish to add.
2. **Confirm the Setting Type and Value**: Each setting’s description includes its type and default value. For instance, the ```setting aacEncodingEnabled``` is a boolean with a default value of ```true```:

```js
@Value("${settings.aacEncodingEnabled:true}")
private boolean aacEncodingEnabled;
```

**Description**: If ```aacEncodingEnabled``` is ```true```, AAC encoding will be active regardless of MP4 or HLS muxing. If set to ```false```, AAC encoding is only enabled if MP4 or HLS muxing is active. This should be set to ```true``` if you plan to stream to RTMP endpoints or enable/disable MP4 recording on the fly.

3. **Update the Configuration File**:
To add a setting, either use the Advanced Settings in the management console or directly append the setting to the ```red5-web.properties``` file.

- For example, to disable AAC encoding, add the following line to the file:
```js
settings.aacEncodingEnabled=false
```
