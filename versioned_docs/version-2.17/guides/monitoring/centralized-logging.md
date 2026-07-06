---
title: Centralized Logging Setup
description: Monitoring AMS with Central Logging System
keywords: [Monitoring AMS with Central Logging, Ant Media Server Documentation, Ant Media Server Tutorials]
---

# Centralized Logging Setup

## Overview

This document explains how to enable the centralized logging infrastructure for Ant Media deployments.

Logs from customer environments are securely collected and forwarded to a centralized, multi-tenant logging platform for monitoring and troubleshooting.

The setup can be completed either by the customer or by the Ant Media team.

## Supported Environments

Centralized logging for media servers works across both major deployment types:

**Standalone Instances**

VMs, bare metal servers, or cloud VMs running Ant Media Server. Setup is done via a single shell script that downloads and configures the logging agent automatically.

**Kubernetes Clusters**

K8s clusters running Ant Media Server pods. Setup uses Fluent Bit deployed via Helm — the standard Kubernetes-native approach for log collection and forwarding.

---

## 1. Instance-Based Installation

For standalone instances, the centralized logging agent is installed via a shell script.

### Prerequisites

- Root or sudo access
- Outbound network access to the Central Logging endpoint
- Centralized logging credentials provided by the Ant Media team

:::info
Your **centralized logging credentials** (Tenant Email, Username, Password) are provided by the Ant Media team. Contact [Ant Media support](https://antmedia.io/contact-us/) to request them before starting.
:::

### Install the Logging Agent — Standalone Instance

The centralized logging agent for standalone instances is installed via a shell script. The script downloads, configures, and starts the logging agent automatically — no manual configuration required.

**Step 1:** Download or copy the installation script to the instance:

```bash
curl -O https://raw.githubusercontent.com/ant-media/Scripts/refs/heads/master/central-logging/install_central-logging.sh
chmod +x install_central-logging.sh
```

**Step 2:** Execute the script:

```bash
sudo ./install_central-logging.sh
```

**Step 3:** During execution, you will be prompted to enter the following:

- **Tenant Email**
- **Username**
- **Password**

These credentials will be used to configure secure log forwarding.

### Verify the Installation & Confirm Logs Are Flowing

- **Confirm Fluent Bit Service is Running:**

 The installation script installs Fluent Bit as a systemd service.

```bash
$ systemctl status fluent-bit
● fluent-bit.service - Fluent Bit
     Loaded: loaded (/usr/lib/systemd/system/fluent-bit.service; enabled; preset: enabled)
     Active: active (running) since Sun 2026-05-03 13:05:47 UTC; 38min ago
       Docs: https://docs.fluentbit.io/manual/
   Main PID: 4295 (fluent-bit)
      Tasks: 3 (limit: 9126)
     Memory: 4.3M (peak: 4.9M)
        CPU: 314ms
     CGroup: /system.slice/fluent-bit.service
             └─4295 /opt/fluent-bit/bin/fluent-bit -c //etc/fluent-bit/fluent-bit.conf

May 03 13:05:47 ip-172-31-9-186 fluent-bit[4295]: [2026/05/03 13:05:47.257] [ info] [cmetrics] version=2.1.2
May 03 13:05:47 ip-172-31-9-186 fluent-bit[4295]: [2026/05/03 13:05:47.257] [ info] [ctraces ] version=0.7.1
May 03 13:05:47 ip-172-31-9-186 fluent-bit[4295]: [2026/05/03 13:05:47.257] [ info] [input:tail:tail.0] initializing
May 03 13:05:47 ip-172-31-9-186 fluent-bit[4295]: [2026/05/03 13:05:47.257] [ info] [input:tail:tail.0] storage_strategy='memory' (memory only)
May 03 13:05:47 ip-172-31-9-186 fluent-bit[4295]: [2026/05/03 13:05:47.272] [ info] [input:tail:tail.0] multiline core started
May 03 13:05:47 ip-172-31-9-186 fluent-bit[4295]: [2026/05/03 13:05:47.275] [ info] [input:tail:tail.0] db: delete unmonitored stale inodes from the databa>
May 03 13:05:47 ip-172-31-9-186 fluent-bit[4295]: [2026/05/03 13:05:47.275] [ info] [output:****:****.0] configured, hostname=log.antmedia.io:80
May 03 13:05:47 ip-172-31-9-186 fluent-bit[4295]: [2026/05/03 13:05:47.275] [ info] [sp] stream processor started
May 03 13:05:47 ip-172-31-9-186 fluent-bit[4295]: [2026/05/03 13:05:47.275] [ info] [engine] Shutdown Grace Period=5, Shutdown Input Grace Period=2
May 03 13:05:47 ip-172-31-9-186 fluent-bit[4295]: [2026/05/03 13:05:47.277] [ info] [input:tail:tail.0] inotify_fs_add(): inode=296751 watch_fd=1 name=/var>
```

- **Watch Live Log Forwarding**

```bash
$ sudo journalctl -u fluent-bit -f
May 03 13:05:47 ip-172-31-9-186 fluent-bit[4295]: [2026/05/03 13:05:47.257] [ info] [cmetrics] version=2.1.2
May 03 13:05:47 ip-172-31-9-186 fluent-bit[4295]: [2026/05/03 13:05:47.257] [ info] [ctraces ] version=0.7.1
May 03 13:05:47 ip-172-31-9-186 fluent-bit[4295]: [2026/05/03 13:05:47.257] [ info] [input:tail:tail.0] initializing
May 03 13:05:47 ip-172-31-9-186 fluent-bit[4295]: [2026/05/03 13:05:47.257] [ info] [input:tail:tail.0] storage_strategy='memory' (memory only)
May 03 13:05:47 ip-172-31-9-186 fluent-bit[4295]: [2026/05/03 13:05:47.272] [ info] [input:tail:tail.0] multiline core started
May 03 13:05:47 ip-172-31-9-186 fluent-bit[4295]: [2026/05/03 13:05:47.275] [ info] [input:tail:tail.0] db: delete unmonitored stale inodes from the database: count=0
May 03 13:05:47 ip-172-31-9-186 fluent-bit[4295]: [2026/05/03 13:05:47.275] [ info] [output:****:****.0] configured, hostname=log.antmedia.io:80
May 03 13:05:47 ip-172-31-9-186 fluent-bit[4295]: [2026/05/03 13:05:47.275] [ info] [sp] stream processor started
May 03 13:05:47 ip-172-31-9-186 fluent-bit[4295]: [2026/05/03 13:05:47.275] [ info] [engine] Shutdown Grace Period=5, Shutdown Input Grace Period=2
May 03 13:05:47 ip-172-31-9-186 fluent-bit[4295]: [2026/05/03 13:05:47.277] [ info] [input:tail:tail.0] inotify_fs_add(): inode=296751 watch_fd=1 name=/var/log/antmedia/ant-media-server.log
```

- **Confirm Fluent Bit Database Files Exist**

Fluent Bit creates `flb.db*` files to track which log positions it has already forwarded. Their presence confirms it has started reading your Ant Media logs:

```bash
$ ls /usr/local/antmedia/log/ 
0.0.0.0_access.log  ant-media-server-analytics.log  ant-media-server.log  antmedia-error.log  flb.db  flb.db-shm  flb.db-wal
```

🔒 Credentials are stored in `/etc/fluent-bit/fluent-bit.conf` with restricted permissions and are never echoed back to the terminal.

---

## 2. Kubernetes Environment

For Kubernetes clusters, Fluent Bit is deployed using Helm.

### Prerequisites

- Helm v3/v4 installed
- Cluster-admin or sufficient RBAC permissions
- Centralized logging credentials provided by the Ant Media team

:::info
Your **centralized logging credentials** (Tenant Email, Username, Password) are provided by the Ant Media team. Contact [Ant Media support](https://antmedia.io/contact-us/) to request them before starting.
:::

### Install Fluent Bit via Helm — Kubernetes Cluster

For Kubernetes environments, **Fluent Bit** is deployed as a DaemonSet using Helm — the standard Kubernetes-native approach. Fluent Bit runs on every node in your cluster and collects logs from all Ant Media Server pods automatically.

- First, download the pre-configured Fluent Bit values file from Ant Media’s GitHub and add the Fluent Helm chart repository:

```bash
wget https://raw.githubusercontent.com/ant-media/Scripts/refs/heads/master/central-logging/values_central-logging.yaml
helm repo add fluent https://fluent.github.io/helm-charts
helm repo update
```

- Run the Helm install command, replacing the three placeholder values with your actual credentials that AMS provides.

```bash
helm upgrade --install fluent-bit fluent/fluent-bit \
  -f values_central-logging.yaml \
  --set TENANT_EMAIL="your@email.address" \
  --set USERNAME="username" \
  --set PASSWORD="password"
```

**Parameters:**

| Parameter | Description |
|-----------|-------------|
| `TENANT_EMAIL` | Your organization's email address |
| `USERNAME` | Centralized logging username |
| `PASSWORD` | Centralized logging password |


:::info
⎈ The `helm upgrade --install` command is idempotent — if Fluent Bit is already deployed, it updates the configuration. If it’s new, it installs it. You can safely re-run this command to rotate credentials or update the values file.
:::

### Verify the Installation & Confirm Logs Are Flowing

- **Confirm Fluent Bit Pods are Running**

Fluent Bit is deployed as a **DaemonSet** — one pod per node. All pods should show `Running`:

```bash
$ kubectl get pods -l app.kubernetes.io/name=fluent-bit
NAME                 READY   STATUS     RESTARTS   AGE
fluent-bit-2xkp9    1/1     Running    0          2m14s
fluent-bit-8nqw4    1/1     Running    0          2m14s
fluent-bit-d7mrt    1/1     Running    0          2m14s
```

- **Watch Live Log Forwarding from a Pod**

Stream Fluent Bit’s output from the DaemonSet — you should see the same two confirmation lines as the instance installation:

```bash
$ kubectl logs daemonset/fluent-bit -f
fluent-bit: [info] [output:loki:loki.0] configured, hostname=log.antmedia.io:80
fluent-bit: [info] [input:tail:tail.0] inotify_fs_add(): name=/var/log/antmedia/ant-media-server.log
```

- **Confirm the Helm Release is Deployed**

```bash
$ helm list
NAME          NAMESPACE   REVISION   STATUS     CHART
fluent-bit    default     1          deployed   fluent-bit-0.x.x
```

:::info
⚠️ For Kubernetes, outbound port 80 access to `log.antmedia.io` must be permitted at both the **security group level** and any **Kubernetes NetworkPolicy** applied to the `fluent-bit` namespace. Both layers need to allow the traffic.
:::


## Final Check — Confirm with the Ant Media Team (Both Environments)

Regardless of your environment, contact the Ant Media team and ask them to confirm that logs from your tenant are visible on their central logging platform. If all three checks above pass, but logs are still not showing on their end, the most common cause is an outbound rule blocking port 80 traffic to `log.antmedia.io`.

⚠️ Fluent Bit forwards logs to `log.antmedia.io` on **port 80** — confirmed from the live service output. Ensure outbound HTTP on port 80 to this hostname is permitted in your firewall, security group, or Kubernetes NetworkPolicy.

## Privacy and Data Scope

The centralized logging system is designed to help the Ant Media team troubleshoot issues faster and provide proactive support when needed.

Only operational and text-based logs are collected from the environment. These logs may include:

- Stream IDs
- WebSocket connection events
- Application warnings and errors
- Service startup and shutdown events
- Resource and infrastructure-related logs

Sensitive customer data is not collected through this logging pipeline. For example, media content, stream payloads, user passwords, video/audio data, and other confidential business data are not included in the centralized logging system.

The collected logs are used only for monitoring, troubleshooting, and support purposes by the Ant Media team.
