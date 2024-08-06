---
title: "Analytics Logs: Usage and Processing with New Relic"   
description: "Analytics Logs: Usage and Processing with New Relic" 
keywords: [Analytics, Analytics with New Relic, Ant Media Server Tutorials]
---

# Analytics Logs: Usage and Processing with New Relic


Ant Media Analytics logs have been provided by default since version 2.10.0. These logs are located at /var/log/antmedia/ in JSON format, named ant-media-server-analytics.log. This structure allows you to transfer your logs to any log management server and process them in various ways. In this article, we'll examine how to process this data using New Relic. 

Analytics logs provide the following important data:

* Data transfer
* Key frame interval
* Protocol used
* Publishing and playing start/end times
* Subscriber ID
* Tokens
* Stream ID
* Application name

With this data, you can analyze your streaming performance in detail and optimize the user experience.


## Installation and Use of New Relic

After logging into your existing New Relic account on the server where Ant Media Server Enterprise is installed, follow these steps to configure and install the New Relic Client.

1. Select from the side bar, **All Entities > Add Data > Linux Logs > Create a new key**

![image.png](@site/static/img/analytics/antmedia-analytics-new-relic-1.png)

2. Copy the command and install the Agent on the instance with Ant Media Server installed.

![image.png](@site/static/img/analytics/antmedia-analytics-new-relic-2.png)

```
curl -Ls https://download.newrelic.com/install/newrelic-cli/scripts/install.sh | bash && sudo NEW_RELIC_API_KEY=NRAK-************YI91R NEW_RELIC_ACCOUNT_ID=44799 NEW_RELIC_REGION=EU /usr/local/bin/newrelic install -y
```
3. Configuration of Log Files

To process only Ant Media Server's Analytics logs in New Relic, delete the YAML files under /etc/newrelic-infra/logging.d and create a new file named antmedia.yaml with the following lines:
```
logs:
- name: antmedia
file: /var/log/antmedia/ant-media-server-analytics.log
attributes:
logtype: custom
```
Restart the New Relic infrastructure service to activate the configuration:

```
sudo systemctl restart newrelic-infra.service
```

Once you complete these steps, your logs will start being transferred to New Relic.

![image.png](@site/static/img/analytics/antmedia-analytics-new-relic-3.png)


4. We need to add log parse on New Relic to process logs for each event. You can perform a parsing process suitable for your log format using the log parse tools provided by New Relic. This step is critical for correctly interpreting and analyzing your logs.

Let's create the rules by clicking `Logs > Parsion Logs > Create parsin rule`. Unfortunately, there is no Import/Export feature in New Relic Parsing Rules, so you need to do the following steps manually. 

![image.png](@site/static/img/analytics/antmedia-analytics-new-relic-4.png)

```
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
Parsing rule: %{TIMESTAMP_ISO8601:timestamp} %{SPACE}\{"subscriberId":"%{USERNAME:subscriberId}","totalBytesTransferred":%{INT:totalBytesTransferred},"byteTransferred":%{INT:byteTransferred},"event":"%{WORD:event}","timeMs":%{NUMBER:timeMs},"app":"%{WORD:app}","streamId":"%{USERNAME:streamId}","logSource":"%{WORD:logSource}"\}
```

5. We have done the hardest part, now you just need to import the dashboard from [here](https://raw.githubusercontent.com/ant-media/Scripts/master/monitor/ams-new-relic-dashboard.json) under `Dashboard > Import dashboard`. 

![image.png](@site/static/img/analytics/antmedia-analytics-new-relic-3.png)


You can write your own queries using NRQL and create your own dashboard. 