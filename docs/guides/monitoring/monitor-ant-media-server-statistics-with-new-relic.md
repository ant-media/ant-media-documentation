---
title: Monitor AMS statistics with New Relic
description: Monitor Ant Media Server statistics with New Relic
keywords: [Analytics, New Relic, Statistics, Ant Media Server Tutorials]
sidebar_position: 1
---

# Monitor Ant Media Server statistics with New Relic

Since v2.10.0 of AMS, analytics logs have been provided to monitor important statistics for users. These logs are located at `/var/log/antmedia/` in JSON format, named `ant-media-server-analytics.log`. This structure allows you to transfer your logs to any log management server and process them in various ways. 

In this article, we'll examine how to process this data using New Relic. 

For now, analytics logs provide the following important statistics:

* Total data transfer per user
* Publisher statistics (streamId, application name, codecs, height, width, resolution, etc)
* WebRTC, HLS and DASH viewer count
* Publishing and playing start/end times
* Subscriber IDs and statistics
* Tokens
* Stream duration
* Key Frame Interval per stream

With this information, you can thoroughly analyse your streaming performance and improve the user experience.

## Installation and Use of New Relic

New Relic is a software analytics and performance monitoring platform that helps monitor and optimize applications and infrastructure in real-time. It provides detailed insights into the performance, reliability, and scalability of web applications, microservices, and cloud infrastructure.

After creating and logging into your [New Relic](https://newrelic.com/) account, follow these steps to configure and install the New Relic Client on the server where your Ant Media Server is installed.


### New Relic Client Installation

Select from the side bar, **All Entities > Add Data > Linux Logs > Create a new key**

![image.png](@site/static/img/analytics/antmedia-analytics-new-relic-1.png)

- Copy the command and install the Agent on the instance where Ant Media Server installed.

![image.png](@site/static/img/analytics/antmedia-analytics-new-relic-2.png)

```bash
curl -Ls https://download.newrelic.com/install/newrelic-cli/scripts/install.sh | bash && sudo NEW_RELIC_API_KEY=NRAK-************YI91R NEW_RELIC_ACCOUNT_ID=44799 NEW_RELIC_REGION=EU /usr/local/bin/newrelic install -y
```


### Configuration of Log File

To process only Ant Media Server's Analytics logs in New Relic, delete all the YAML files under `/etc/newrelic-infra/logging.d ` folder and create a new file named `antmedia.yaml` with the following lines:

```bash
logs:
  - name: antmedia
    file: /var/log/antmedia/ant-media-server-analytics.log
    attributes:
      logtype: custom
```

Restart the New Relic infrastructure service to activate the configuration:

```bash
sudo systemctl restart newrelic-infra.service
```

Once you complete these steps, your logs will start being transferred to New Relic.

![image.png](@site/static/img/analytics/antmedia-analytics-new-relic-3.png)


### Log Parsing

We need to add log parse on New Relic to process logs for each event. You can perform a parsing process suitable for your log format using the log parsing tools provided by New Relic. This step is critical for correctly interpreting and analyzing your logs.

Let's create the rules by clicking `Logs > Parsion Logs > Create parsin rule`. Unfortunately, there is no Import/Export feature in New Relic Parsing Rules, so you need to create the parsing rule for each event manually, as below:

![image.png](@site/static/img/analytics/antmedia-analytics-new-relic-4.png)

:::info
- Please make sure that their is no blank space in the fields while creating the parsing rules.
- You can also create more parsing rules and dashboard charts according to the analytics log entries.
- The parsing rule format and the original log entry format in analytics logs should be matched for correct logging and data fetching.
:::

```html
Name: keyFrameStats
Field to parse: messages
Filter logs based on NRQL: filePath = '/var/log/antmedia/ant-media-server-analytics.log'
Parsing rule: \{"keyFramesInLastMinute":%{NUMBER:keyFramesInLastMinute},"keyFrameIntervalMs":%{NUMBER:keyFrameIntervalMs},"event":"%{DATA:event}","timeMs":%{NUMBER:timeMs},"app":"%{DATA:app}","streamId":"%{DATA:streamId}","logSource":"%{DATA:logSource}"\}

Name: publishEnded
Field to parse: messages
Filter logs based on NRQL: filePath = '/var/log/antmedia/ant-media-server-analytics.log'
Parsing rule: \{"durationMs":%{NUMBER:durationMs},"event":"%{DATA:event}","timeMs":%{NUMBER:timeMs},"app":"%{DATA:app}","streamId":"%{DATA:streamId}","logSource":"%{DATA:logSource}"\}

Name: viewerCount
Field to parse: messages
Filter logs based on NRQL: filePath = '/var/log/antmedia/ant-media-server-analytics.log'
Parsing rule: \{"dashViewerCount":%{NUMBER:dashViewerCount},"hlsViewerCount":%{NUMBER:hlsViewerCount},"webRTCViewerCount":%{NUMBER:webRTCViewerCount},"event":"%{DATA:event}","timeMs":%{NUMBER:timeMs},"app":"%{DATA:app}","streamId":"%{DATA:streamId}","logSource":"%{DATA:logSource}"\}

Name: publishStarted
Field to parse: messages
Filter logs based on NRQL: filePath = '/var/log/antmedia/ant-media-server-analytics.log'
Parsing rule: \{"height":%{NUMBER:height},"width":%{NUMBER:width},"videoCodec":"%{DATA:videoCodec}","audioCodec":"%{DATA:audioCodec}","protocol":"%{WORD:protocol}","event":"%{DATA:event}","timeMs":%{NUMBER:timeMs},"app":"%{DATA:app}","streamId":"%{DATA:streamId}","logSource":"%{DATA:logSource}"\}

Name: playStartedFirstTime
Field to parse: messages
Filter logs based on NRQL: filePath = '/var/log/antmedia/ant-media-server-analytics.log'
Parsing rule: \{"protocol":"%{WORD:protocol}","clientIP":"%{IP:clientIP}","subscriberId":"%{DATA:subscriberId}","event":"%{DATA:event}","timeMs":%{NUMBER:timeMs},"app":"%{DATA:app}","streamId":"%{DATA:streamId}","logSource":"%{DATA:logSource}"\}

Name: playStarted
Field to parse: messages
Filter logs based on NRQL: filePath = '/var/log/antmedia/ant-media-server-analytics.log'
Parsing rule: \{"protocol":"%{WORD:protocol}","clientIP":"%{IP:clientIP}","subscriberId":"%{DATA:subscriberId}","event":"%{DATA:event}","timeMs":%{NUMBER:timeMs},"app":"%{DATA:app}","streamId":"%{DATA:streamId}","logSource":"%{DATA:logSource}"\}

Name: playEnded
Field to parse: messages
Filter logs based on NRQL: filePath = '/var/log/antmedia/ant-media-server-analytics.log'
Parsing rule: \{"protocol":"%{WORD:protocol}","subscriberId":"%{DATA:subscriberId}","event":"%{DATA:event}","timeMs":%{NUMBER:timeMs},"app":"%{DATA:app}","streamId":"%{DATA:streamId}","logSource":"%{DATA:logSource}"\}

Name: watchTime
Field to parse: messages
Filter logs based on NRQL: filePath = '/var/log/antmedia/ant-media-server-analytics.log'
Parsing rule: \{"watchTimeMs":%{NUMBER:watchTimeMs},"startTimeMs":%{NUMBER:startTimeMs},"protocol":"%{WORD:protocol}","clientIP":"%{IP:clientIP}","subscriberId":"%{DATA:subscriberId}","event":"%{DATA:event}","timeMs":%{NUMBER:timeMs},"app":"%{DATA:app}","streamId":"%{DATA:streamId}","logSource":"%{DATA:logSource}"\}

Name: playerStats
Field to parse: messages
Filter logs based on NRQL: filePath = '/var/log/antmedia/ant-media-server-analytics.log'
Parsing rule: \{"subscriberId":"%{USERNAME:subscriberId}","totalBytesTransferred":%{INT:totalBytesTransferred},"byteTransferred":%{INT:byteTransferred},"event":"%{WORD:event}","timeMs":%{NUMBER:timeMs},"app":"%{WORD:app}","streamId":"%{USERNAME:streamId}","logSource":"%{WORD:logSource}"\}
```


### Dashboard creation 

We have done the hardest part, now you just need to import the dashboard from [here](https://raw.githubusercontent.com/ant-media/Scripts/master/monitor/ams-new-relic-dashboard.json) under `Dashboard > Import dashboard`. 

:::info
Please do not forget to change the account ID of your New Relic account in the json.

    "accountIds": [
      0000000    //replace your account ID in whole json
    ],
 :::

![image.png](@site/static/img/analytics/antmedia-analytics-new-relic-5.png)
![image.png](@site/static/img/analytics/antmedia-analytics-new-relic-6.png)
![image.png](@site/static/img/analytics/antmedia-analytics-new-relic-7.png)


If you wish, you can customize the dashboard according to your preferences by using [NRQL](https://docs.newrelic.com/docs/nrql/get-started/introduction-nrql-new-relics-query-language/) queries.

This is the first iteration of this analytics tool using New Relic. We will keep working on it to make it better.
