---
title: Webhook Authorization 
description: Webhook Authorization
keywords: [Webhook authentication, Webhook authorization, Stream Security, Ant Media Server Documentation, Ant Media Server Tutorials, authentication, stream authentication, play authentication, play security, publish security, publish authentication]
sidebar_position: 8
---

# Webhook Authorization

If the built-in [Security options for Publishing and Playing Streams](https://antmedia.io/docs/category/stream-security/) available in Ant Media Server don’t meet your needs and you want full control, you can use webhooks to authorize publishing or playback. 

## Webhook Publish Authorization

If you enable this feature, whenever a client attempts to publish a stream, the server sends an HTTP request to your configured webhook address. This request has information regarding the stream like stream name, app name, streamId, etc.

Based on this request, you can parse and process that information on your end and send a response. If the response code is 200, the server will authorize the stream and allow it to begin publishing. If the response code is different from 200, the server will refuse to publish the stream.

To enable publish webhook auth, go to the Web Panel → Application Settings → Advanced Settings, and set the webhookAuthenticateURL property.

```js
  "webhookAuthenticateURL": "",
```

Change the settings and save them.

You can use this [webhook site](https://webhook.site/) to test this feature and get your webhook URL. However, when you send a request to that site correctly, the response code will always be 200 by default. Let's test this with an example by publishing a stream.

Sample webhook URL from webhook site:

```js
"webhookAuthenticateURL": "https://webhook.site/e8c87b00-30aa-4a98-b4f0-6ff1eeddb6e5",
```

After this, when a stream starts publishing, it will trigger the webhook URL and send the request like below.

![Webhook-request1](@site/static/img/Webhook-request1.png)

If the response is 200, then it allows the stream to be published with logs as follows:
```js
INFO  i.a.s.AcceptOnlyStreamsWithWebhook - Response from webhook is: 200 for stream:stream1
INFO  i.a.e.w.WebSocketEnterpriseHandler - Is publishing allowed through Webhook Authentication: true
```

Now you can change the response code on the webhook site by clicking the **Edit** option. As an example, change it to 300.  
Please try to publish the stream again but this time as the response will be 300, hence it will not authorize to publish the stream on the server with the logs below.

```js
INFO  i.a.s.AcceptOnlyStreamsWithWebhook - Response from webhook is: 300 for stream:stream1
WARN  i.a.s.AcceptOnlyStreamsWithWebhook - The connection object is null for stream1
INFO  i.a.e.w.WebSocketEnterpriseHandler - Is publishing allowed through Webhook Authentication: false
```    

Webhook publish authentication works with all publish types (SRT, RTMP, and WebRTC).

## Webhook Play Authorization

Starting with Ant Media Server version 2.9.1, you can enable webhook play authorization for **WebRTC play** requests. 

When a client attempts to play a stream using WebRTC, Ant Media Server will send a POST request to your specified webhook endpoint. If your application server responds with a 200 status code, the viewer will be authorized to view the stream. If any other response code is returned, the viewer will not be authorized, and playback will not start.

To start using this feature, go to your Ant Media Server web panel application's advanced settings and set your webhook API endpoint to the below property.

```js
 "webhookPlayAuthUrl":
```

Example:

```js
"webhookPlayAuthUrl":"https://webhook.site/6e669480-4daf-4f31-b891-6a873c076b92"
```

When ```webhookPlayAuthUrl``` is set, the feature will be enabled.

The POST request sent by Ant Media Server will contain the following payload:

```json
{
  "streamId": "teststream",
  "mode": "play",
  "appName": "live",
  "origin":"[domain_of_request_origin]",
  "token": "token_if_passed",
  "subscriberCode": "subscriber_code_if_passed",
  "subscriberId":"subscriberId_if_passed",
  "metaData":{"key":"value"}
}
```

The ```origin``` field is particularly useful for authentication purposes. On your application server, you can check the origin field, and if the request is not coming from your website, you can reject it by returning a non-200 response code.

You will see the response as below if the webhook is wrong or the request is rejected.

```
2024-05-30 21:25:41,870 [https-jsse-nio2-0.0.0.0-5443-exec-8] INFO  i.a.e.w.WebSocketEnterpriseHandler - Response from play auth webhook is: 300 for stream: streamId_7j8HdStBX
```

It is also possible to add the client's IP address to the POST request payload.  To do this, we need to add a JVM argument to Ant Media Server service.

 - Open the Ant Media Server service file with your favorite editor.

      ```bash
   sudo vim /etc/systemd/system/antmedia.service
   ```

 - Add the below line to the ExecStart.

   ```bash
   --add-opens java.base/sun.nio.ch=ALL-UNNAMED
    ```

    It should be followed as the order of the parameter is important.
    
    ```bash
    ExecStart=/usr/bin/env ${JAVA_HOME}/bin/java --add-opens java.base/sun.nio.ch=ALL-UNNAMED -Dlogback.ContextSelector=org.red5.logging.LoggingContextSelector -cp ${ANTMEDIA_HOME}/ant-media-server-service.jar:${ANTMEDIA_HOME}/conf -Djava.security.debug=failure -Djava.awt.headless=true -Djava.security.egd=file:/dev/./urandom -Dcatalina.home=${ANTMEDIA_HOME} -Dcatalina.useNaming=true -Dorg.terracotta.quartz.skipUpdateCheck=true -XX:+UseG1GC -XX:MaxGCPauseMillis=200 -XX:ParallelGCThreads=10 -XX:ConcGCThreads=5 -XX:+HeapDumpOnOutOfMemoryError -Djava.library.path=/usr/local/antmedia/lib/native -Xverify:none -XX:+TieredCompilation -XX:+UseBiasedLocking -XX:InitialCodeCacheSize=8m -XX:ReservedCodeCacheSize=32m -Djava.net.preferIPv4Stack=true $JVM_MEMORY_OPTIONS -Djdk.lang.Process.launchMechanism=vfork -Djava.system.class.loader=org.red5.server.classloading.ServerClassLoader -Xshare:off org.red5.server.Bootstrap 9999
    ```
    

 - Reload the service.

   ```bash
   sudo systemctl daemon-reload
   ```

 - Restart the antmedia service.

   ```bash
   sudo systemctl restart antmedia
   ```
   

If you are running Ant Media Server directly from its folder with the ```./start.sh``` script, open it with your favorite editor and add the below line to ```TOMCAT_OPTS```.

```bash
--add-opens java.base/sun.nio.ch=ALL-UNNAMED
```

It should be as follows:

```bash
TOMCAT_OPTS="-Dcatalina.home=$RED5_HOME -Dcatalina.useNaming=true -Djava.net.preferIPv4Stack=true --add-opens java.base/sun.nio.ch=ALL-UNNAMED"
```

After saving the file, restart the ant media server.

With this flag, Tomcat will allow us to fetch the user's IP address through their websocket session. The new webhook play auth payload will look like this:

```json
{
  "streamId": "teststream",
  "mode": "play",
  "appName": "live",
  "origin":"[domain_of_request_origin]",
  "token": "token_if_passed",
  "subscriberCode": "subscriber_code_if_passed",
  "subscriberId":"subscriberId_if_passed",
  "metaData":{"key":"value"},
  "ipAddress":"127.0.0.1"
}
```

<br /><br />
---

<div align="center">
<h2>  🎯 Your Streams Tend the Webhook's Way! 🔗 </h2>
</div>

With **Webhook stream authorization enabled**, your server now asks your own endpoint for **permission** before any stream is published or played. Respond with 200 → go live; anything else → access blocked.

Your streaming setup is now completely under your control. **You decide who gets in.** 🔒🚀


