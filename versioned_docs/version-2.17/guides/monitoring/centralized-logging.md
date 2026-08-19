---
title: Centralized Logging Setup
description: Forward Ant Media Server logs to Ant Media's centralized logging platform from standalone instances or Kubernetes clusters.
keywords: [Monitoring AMS with Central Logging, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
sidebar_label: Centralized Logging
---

# Centralized Logging Setup

Forward Ant Media Server logs to Ant Media's **centralized, multi-tenant logging platform** for monitoring and troubleshooting. Logs are collected securely from your environment and reviewed by the Ant Media support team when needed.

You can complete setup yourself or with help from the Ant Media team.

## What you'll accomplish

By the end of this guide, you will:

1. Install **Fluent Bit** on a standalone instance or Kubernetes cluster.
2. Configure secure log forwarding to `log.antmedia.io`.
3. Verify that logs are being collected and shipped.
4. Confirm log visibility with the Ant Media team.

## Supported environments

| Environment | Installation method |
|-------------|---------------------|
| **Standalone instances** | Shell script installs Fluent Bit as a systemd service (VM, bare metal, cloud VM) |
| **Kubernetes clusters** | Fluent Bit DaemonSet deployed with Helm |

## How centralized logging works

Fluent Bit tails Ant Media Server log files (for example, `ant-media-server.log`) and forwards operational events to the central logging endpoint at **`log.antmedia.io:80`**. Credentials provided by Ant Media identify your tenant so logs are routed to the correct organization.

Only **operational and text-based logs** are collected — not media content, passwords, or stream payloads. See [Privacy and data scope](#privacy-and-data-scope) below.

## Prerequisites

Before you begin, confirm the following:

- **Centralized logging credentials** from Ant Media: tenant email, username, and password. [Contact Ant Media support](https://antmedia.io/contact-us/) to request them.
- Outbound network access to **`log.antmedia.io` on port 80**.
- For standalone installs: `sudo` access on the Ant Media Server host.
- For Kubernetes: Helm v3+ and permissions to deploy a DaemonSet in the cluster.

:::info
Setup can be performed by your team or by Ant Media. Credentials are never echoed to the terminal and are stored with restricted permissions in Fluent Bit configuration files.
:::

---

## Standalone instance setup

### Step 1: Install the logging agent

1. Download the installation script:

   ```bash
   curl -O https://raw.githubusercontent.com/ant-media/Scripts/refs/heads/master/central-logging/install_central-logging.sh
   chmod +x install_central-logging.sh
   ```

2. Run the script:

   ```bash
   sudo ./install_central-logging.sh
   ```

3. Enter your credentials when prompted:
   - **Tenant email**
   - **Username**
   - **Password**

The script downloads, configures, and starts Fluent Bit automatically.

### Step 2: Verify log forwarding

1. Confirm Fluent Bit is running:

   ```bash
   systemctl status fluent-bit
   ```

   Status should be **`active (running)`**. In the output, look for the configured output hostname `log.antmedia.io:80`.

2. Watch live forwarding:

   ```bash
   sudo journalctl -u fluent-bit -f
   ```

   You should see tail input activity for `/var/log/antmedia/ant-media-server.log`.

3. Confirm Fluent Bit database files exist (tracks read log positions):

   ```bash
   ls /usr/local/antmedia/log/
   ```

   Expect files such as `flb.db`, `flb.db-shm`, and `flb.db-wal` alongside Ant Media log files.

Credentials are stored in `/etc/fluent-bit/fluent-bit.conf` with restricted permissions.

---

## Kubernetes cluster setup

### Step 1: Deploy Fluent Bit with Helm

Fluent Bit runs as a **DaemonSet** — one pod per node — and collects logs from Ant Media Server pods automatically.

1. Download the values file and add the Fluent Helm repository:

   ```bash
   wget https://raw.githubusercontent.com/ant-media/Scripts/refs/heads/master/central-logging/values_central-logging.yaml
   helm repo add fluent https://fluent.github.io/helm-charts
   helm repo update
   ```

2. Install or upgrade Fluent Bit with your credentials:

   ```bash
   helm upgrade --install fluent-bit fluent/fluent-bit \
     -f values_central-logging.yaml \
     --set TENANT_EMAIL="your@email.address" \
     --set USERNAME="username" \
     --set PASSWORD="password"
   ```

| Parameter | Description |
|-----------|-------------|
| `TENANT_EMAIL` | Your organization's email address |
| `USERNAME` | Centralized logging username |
| `PASSWORD` | Centralized logging password |

:::tip Idempotent Helm install
`helm upgrade --install` updates an existing release or installs a new one. Re-run the command to rotate credentials or apply an updated values file.
:::

### Step 2: Verify log forwarding

1. Confirm Fluent Bit pods are running:

   ```bash
   kubectl get pods -l app.kubernetes.io/name=fluent-bit
   ```

   Every pod should show **`Running`**.

2. Stream logs from the DaemonSet:

   ```bash
   kubectl logs daemonset/fluent-bit -f
   ```

   Look for output configured to `log.antmedia.io:80` and tail activity on `ant-media-server.log`.

3. Confirm the Helm release:

   ```bash
   helm list
   ```

   The `fluent-bit` release should show status **`deployed`**.

:::warning Network access on Kubernetes
Allow outbound **port 80** to `log.antmedia.io` at the **security group** level and in any **NetworkPolicy** applied to the Fluent Bit namespace.
:::

---

## Confirm with Ant Media

After verification on your side, contact the Ant Media team to confirm logs from your tenant are visible on the central platform.

If local checks pass but logs do not appear centrally, the most common cause is a firewall, security group, or NetworkPolicy blocking outbound HTTP to `log.antmedia.io:80`.

---

## Privacy and data scope

Centralized logging helps Ant Media troubleshoot issues and provide proactive support. Collected logs may include:

- Stream IDs
- WebSocket connection events
- Application warnings and errors
- Service startup and shutdown events
- Resource and infrastructure-related messages

The following are **not** collected:

- Media content or stream payloads
- User passwords
- Video or audio data
- Other confidential business data

Logs are used only for monitoring, troubleshooting, and support by the Ant Media team.

---

## Troubleshooting

| Symptom | What to check |
|---------|----------------|
| Fluent Bit not running | Re-run the install script or `helm upgrade --install`; check `systemctl status fluent-bit` or pod status. |
| No tail activity in logs | Ant Media Server is writing to `/var/log/antmedia/`; log paths in Fluent Bit config match your install layout. |
| Logs not visible centrally | Outbound port 80 to `log.antmedia.io` is allowed; credentials are correct; Ant Media team confirms tenant mapping. |
| Helm upgrade fails | Helm v3+ installed, values file downloaded, RBAC allows DaemonSet creation. |
| Kubernetes pods crash-loop | Check `kubectl logs` for auth or network errors; verify NetworkPolicy and security group rules. |

For cluster log collection alternatives, see [Collecting logs from an AMS cluster](/guides/monitoring/collecting-logs-from-ams-cluster/).
