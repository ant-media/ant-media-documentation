# Centralized Logging Setup

## Overview

This document explains how to enable the centralized logging infrastructure for Ant Media deployments.

Logs from customer environments are securely collected and forwarded to a centralized, multi-tenant logging platform for monitoring and troubleshooting.

The setup can be completed either by the customer or by the Ant Media team.

## Supported Environments

Centralized logging can be enabled for:

- Standalone instances or Cluster structure (VM, bare metal, cloud VM)
- Kubernetes clusters

---

## 1. Instance-Based Installation

For standalone instances, the centralized logging agent is installed via a shell script.

### Prerequisites

- Root or sudo access
- Outbound network access to the Central Logging endpoint
- Centralized logging credentials provided by the Ant Media team

### Installation Steps

**Step 1:** Download or copy the installation script to the instance:

```bash
curl -O https://raw.githubusercontent.com/ant-media/Scripts/refs/heads/master/central-logging/install_central-logging.sh
chmod +x install_central-logging.sh
```

**Step 2:** Execute the script:

```bash
sudo ./install_central-logging.sh
```

**Step 3:** During execution, you will be prompted to enter:

- **Tenant Email**
- **Username**
- **Password**

These credentials will be used to configure secure log forwarding.

---

## 2. Kubernetes Environment

For Kubernetes clusters, Fluent Bit is deployed using Helm.

### Prerequisites

- Helm v3/v4 installed
- Cluster-admin or sufficient RBAC permissions
- Centralized logging credentials provided by the Ant Media team

### Installation Steps

Run the following Helm command:

```bash
wget https://raw.githubusercontent.com/ant-media/Scripts/refs/heads/master/central-logging/values_central-logging.yaml
helm repo add fluent https://fluent.github.io/helm-charts
helm repo update
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

---

## Verify the Installation

After installation:

- Confirm the logging agent service is running
- Contact the Ant Media team if logs are not visible in the centralized platform

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