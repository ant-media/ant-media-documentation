---
title: Monitor Ant Media Server Statistics with New Relic
description: Forward Ant Media Server analytics logs to New Relic, configure parsing rules, and import a prebuilt dashboard.
keywords: [Analytics, New Relic, Statistics, Ant Media Server Tutorials]
sidebar_position: 1
sidebar_label: New Relic
---

# Monitor Ant Media Server Statistics with New Relic

Starting with **Ant Media Server v2.10.0**, analytics events are written as JSON lines to:

```text
/var/log/antmedia/ant-media-server-analytics.log
```

Forward this log to **New Relic** to monitor publishing trends, viewer counts, data transfer, and stream performance in real time.

## What you'll accomplish

By the end of this guide, you will:

1. Install the **New Relic infrastructure agent** on your Ant Media Server host.
2. Configure the agent to ship **analytics logs only**.
3. Create **log parsing rules** for Ant Media Server event types.
4. Import the **prebuilt Ant Media Server dashboard** in New Relic.

## Metrics available in analytics logs

Ant Media Server analytics logs include events such as:

| Category | Examples |
|----------|----------|
| Publishing | Stream start/end, codecs, resolution, protocol |
| Playback | Play start/end, first-time play, watch time |
| Viewers | WebRTC, HLS, and DASH viewer counts |
| Performance | Key frame interval, bytes transferred per subscriber |
| Identity | Stream ID, application name, subscriber ID, tokens |

Use these events to analyze usage, detect playback issues, and track capacity over time.

## Prerequisites

Before you begin, confirm the following:

- Ant Media Server **v2.10.0** or later.
- Shell access to the server running Ant Media Server (`sudo` for agent install).
- A [New Relic account](https://newrelic.com/).
- Analytics log file present at `/var/log/antmedia/ant-media-server-analytics.log`.

:::info
Generate a New Relic **API key** and note your **account ID** before installing the agent. You need both during setup.
:::

## Step 1: Install the New Relic agent

1. Sign in to New Relic and go to **All entities → Add data → Linux logs → Create a new key**.

   ![](@site/static/img/analytics/antmedia-analytics-new-relic-1.png)

2. Copy the install command shown in the New Relic UI and run it on the Ant Media Server host.

   ![](@site/static/img/analytics/antmedia-analytics-new-relic-2.png)

   Example format:

   ```bash
   curl -Ls https://download.newrelic.com/install/newrelic-cli/scripts/install.sh | bash && \
   sudo NEW_RELIC_API_KEY={YOUR_API_KEY} NEW_RELIC_ACCOUNT_ID={YOUR_ACCOUNT_ID} NEW_RELIC_REGION={EU_OR_US} \
   /usr/local/bin/newrelic install -y
   ```

   Replace `{YOUR_API_KEY}`, `{YOUR_ACCOUNT_ID}`, and `{EU_OR_US}` with your values from the New Relic console.

## Step 2: Configure analytics log forwarding

To forward **only** Ant Media Server analytics logs:

1. Remove existing YAML files under `/etc/newrelic-infra/logging.d/`.
2. Create `/etc/newrelic-infra/logging.d/antmedia.yaml` with:

   ```yaml
   logs:
     - name: antmedia
       file: /var/log/antmedia/ant-media-server-analytics.log
       attributes:
         logtype: custom
   ```

3. Restart the New Relic infrastructure service:

   ```bash
   sudo systemctl restart newrelic-infra.service
   ```

Logs should start appearing in New Relic within a few minutes.

![](@site/static/img/analytics/antmedia-analytics-new-relic-3.png)

## Step 3: Create log parsing rules

Parsing rules tell New Relic how to extract fields from each analytics event. Create them under **Logs → Parsing → Create parsing rule**.

![](@site/static/img/analytics/antmedia-analytics-new-relic-4.png)

:::info
- Do not add blank spaces in parsing rule fields.
- Match each rule name and pattern to the corresponding event in the analytics log.
- New Relic does not support import/export for parsing rules — create each rule manually.
:::

For every rule below, use:

- **Field to parse:** `message`
- **Filter logs based on NRQL:** `filePath = '/var/log/antmedia/ant-media-server-analytics.log'`

```text
Name: keyFrameStats
Parsing rule: \{"keyFramesInLastMinute":%{NUMBER:keyFramesInLastMinute},"keyFrameIntervalMs":%{NUMBER:keyFrameIntervalMs},"event":"%{DATA:event}","timeMs":%{NUMBER:timeMs},"app":"%{DATA:app}","streamId":"%{DATA:streamId}","logSource":"%{DATA:logSource}"\}

Name: publishEnded
Parsing rule: \{"durationMs":%{NUMBER:durationMs},"event":"%{DATA:event}","timeMs":%{NUMBER:timeMs},"app":"%{DATA:app}","streamId":"%{DATA:streamId}","logSource":"%{DATA:logSource}"\}

Name: viewerCount
Parsing rule: \{"dashViewerCount":%{NUMBER:dashViewerCount},"hlsViewerCount":%{NUMBER:hlsViewerCount},"webRTCViewerCount":%{NUMBER:webRTCViewerCount},"event":"%{DATA:event}","timeMs":%{NUMBER:timeMs},"app":"%{DATA:app}","streamId":"%{DATA:streamId}","logSource":"%{DATA:logSource}"\}

Name: publishStarted
Parsing rule: \{"height":%{NUMBER:height},"width":%{NUMBER:width},"videoCodec":"%{DATA:videoCodec}","audioCodec":"%{DATA:audioCodec}","protocol":"%{WORD:protocol}","event":"%{DATA:event}","timeMs":%{NUMBER:timeMs},"app":"%{DATA:app}","streamId":"%{DATA:streamId}","logSource":"%{DATA:logSource}"\}

Name: playStartedFirstTime
Parsing rule: \{"protocol":"%{WORD:protocol}","clientIP":"%{IP:clientIP}","subscriberId":"%{DATA:subscriberId}","event":"%{DATA:event}","timeMs":%{NUMBER:timeMs},"app":"%{DATA:app}","streamId":"%{DATA:streamId}","logSource":"%{DATA:logSource}"\}

Name: playStarted
Parsing rule: \{"protocol":"%{WORD:protocol}","clientIP":"%{IP:clientIP}","subscriberId":"%{DATA:subscriberId}","event":"%{DATA:event}","timeMs":%{NUMBER:timeMs},"app":"%{DATA:app}","streamId":"%{DATA:streamId}","logSource":"%{DATA:logSource}"\}

Name: playEnded
Parsing rule: \{"protocol":"%{WORD:protocol}","subscriberId":"%{DATA:subscriberId}","event":"%{DATA:event}","timeMs":%{NUMBER:timeMs},"app":"%{DATA:app}","streamId":"%{DATA:streamId}","logSource":"%{DATA:logSource}"\}

Name: watchTime
Parsing rule: \{"watchTimeMs":%{NUMBER:watchTimeMs},"startTimeMs":%{NUMBER:startTimeMs},"protocol":"%{WORD:protocol}","clientIP":"%{IP:clientIP}","subscriberId":"%{DATA:subscriberId}","event":"%{DATA:event}","timeMs":%{NUMBER:timeMs},"app":"%{DATA:app}","streamId":"%{DATA:streamId}","logSource":"%{DATA:logSource}"\}

Name: playerStats
Parsing rule: \{"subscriberId":"%{USERNAME:subscriberId}","totalBytesTransferred":%{INT:totalBytesTransferred},"byteTransferred":%{INT:byteTransferred},"event":"%{WORD:event}","timeMs":%{NUMBER:timeMs},"app":"%{WORD:app}","streamId":"%{USERNAME:streamId}","logSource":"%{WORD:logSource}"\}
```

You can add more parsing rules and charts as your analytics events evolve.

## Step 4: Import the Ant Media Server dashboard

1. Download the dashboard JSON from the Ant Media Scripts repository:

   [ams-new-relic-dashboard.json](https://raw.githubusercontent.com/ant-media/Scripts/master/monitor/ams-new-relic-dashboard.json)

2. In New Relic, go to **Dashboards → Import dashboard** and upload the file.
3. Replace the placeholder account ID in the JSON with your New Relic account ID:

   ```json
   "accountIds": [
     {YOUR_ACCOUNT_ID}
   ]
   ```

After import, you can monitor publishing and viewing trends, data transfer, and key frame performance from one place.

![](@site/static/img/analytics/antmedia-analytics-new-relic-5.png)

![](@site/static/img/analytics/antmedia-analytics-new-relic-6.png)

![](@site/static/img/analytics/antmedia-analytics-new-relic-7.png)

Customize widgets with [NRQL](https://docs.newrelic.com/docs/nrql/get-started/introduction-nrql-new-relics-query-language/) queries to match your workflow.

---

## Troubleshooting

| Symptom | What to check |
|---------|----------------|
| No logs in New Relic | Agent is running (`systemctl status newrelic-infra`), API key and account ID are correct, analytics log file exists and is being written. |
| Logs appear but fields are empty | Parsing rule name and pattern match the log event format; no extra spaces in rule fields. |
| Dashboard shows no data | Account ID in imported JSON matches your account; parsing rules are created for the events used by dashboard widgets. |
| Wrong events ingested | Only `antmedia.yaml` is present in `/etc/newrelic-infra/logging.d/`. |

For cluster-wide log collection, see [Collecting logs from an AMS cluster](/guides/monitoring/collecting-logs-from-ams-cluster/).
