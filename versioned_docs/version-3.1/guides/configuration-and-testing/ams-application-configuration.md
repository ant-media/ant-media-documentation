---
title: AMS Application Configuration
description: Configure Ant Media Server applications through the Management Panel, properties file, or Management REST APIs.
keywords: [Ant Media Configuration File, Ant Media Server Documentation, Ant Media Server Tutorials, Ant Media Management Panel, Ant Media Settings, Ant Media Configuration]
sidebar_position: 1
---

# AMS Application Configuration

Configure each Ant Media Server application through the **Management Panel**, the application properties file, or the **Management REST APIs**. Settings are per application and apply in both standalone and cluster mode.

Application settings are stored in:

```text
/usr/local/antmedia/webapps/{AppName}/WEB-INF/red5-web.properties
```

The Management Panel covers the settings you use most often. For the full list of available options, see the [Application Settings Javadoc](https://antmedia.io/javadoc/io/antmedia/AppSettings.html).

## What you'll accomplish

By the end of this guide, you will:

1. Change application settings from the Management Panel (**Basic** and **Advanced**).
2. Add a setting that is not yet present in the properties file or Advanced settings.
3. Update application settings programmatically with the Management REST APIs.

## Management Panel Application settings

Log in to the Ant Media Server dashboard, select the application you want to configure from the left-hand menu, then open the **Settings** tab.

You can choose **Basic** or **Advanced**:

- **Basic** — the most commonly used application settings.
- **Advanced** — the full set of application properties (same content as `red5-web.properties`).

Starting with Ant Media Server **v2.6.2**, you can change all application settings from the Management Panel in both standalone and cluster mode.

![](@site/static/img/configuration-and-testing/application-settings.png)

:::info
If you change application settings in the web Management Panel, you do not need to edit the properties file on the server as well.
:::

## Add an additional setting

If a setting is missing from `red5-web.properties` and from **Advanced** settings, add it in the Management Panel or append it to the properties file.

### 1. Find the setting

Open the [AppSettings Javadoc](https://antmedia.io/javadoc/io/antmedia/AppSettings.html) and locate the setting you want to add.

### 2. Confirm the type and default value

Each setting description includes the type and default value.

For example, `aacEncodingEnabled` is a boolean with a default of `true`:

```java
@Value("${settings.aacEncodingEnabled:true}")
private boolean aacEncodingEnabled
```

### 3. Update Advanced settings or the properties file

In the Management Panel, open the application **Settings** tab and go to **Advanced**. Append the property using the field name and value. For example:

```properties
aacEncodingEnabled=false
```

Save the settings so they apply to that application.

## Change application settings programmatically

You can update application settings with the Management REST APIs in standalone or cluster mode.

### 1. Authenticate

Authenticate before calling Management REST APIs. Use any method described in the [Management REST APIs](https://antmedia.io/docs/guides/developer-sdk-and-api/rest-api-guide/management-rest-apis/) guide.

If you authenticate with a username and password, store the session cookie and send it with later API calls.

### 2. Get the current settings

Call the [Get Settings REST API](https://antmedia.io/rest/#/ManagementRestService/getSettings) for the target application (for example, `live`):

```bash
curl -X GET \
  -H "Content-Type: application/json" \
  "https://example.com:5443/rest/v2/applications/settings/live" \
  --cookie cookies.txt
```

The response includes the full application settings object. Use that payload in the next step and change only the properties you need.

### 3. Change the settings

Call the [Change Settings REST API](https://antmedia.io/rest/#/ManagementRestService/changeSettings) with the settings from the previous response. Update the fields you want to change and keep the rest the same.

For example, to disable HLS, set `hlsMuxingEnabled` to `false`:

```bash
curl --location 'https://example.com:5443/rest/v2/applications/settings/live' \
  --header 'Content-Type: application/json' \
  --cookie cookies.txt \
  --data '{
    "hlsMuxingEnabled": false
  }'
```

Confirm the update in the Management Panel under the application **Settings** tab.
