---
title: Rolling Upgrade Runbook
description: Upgrade an Ant Media Server cluster node by node with minimal stream interruption, including pre-checks and rollback.
keywords: [rolling upgrade, zero downtime upgrade, cluster upgrade, runbook, Ant Media Server Documentation]
sidebar_position: 1
---

# Rolling Upgrade Runbook

This runbook upgrades a production Ant Media Server cluster with minimal disruption. For a standalone server, use the simpler [upgrade guide](/guides/installing-on-linux/upgrading-ant-media-server/) during a maintenance window.

:::warning
Active streams on a node are dropped when that node restarts. A rolling upgrade minimizes total disruption but does not make individual restarts invisible; clients must have reconnect logic (built into the Ant Media SDKs).
:::

## Pre-upgrade checklist

1. Read the [release notes](/release-notes/) of the target version for breaking changes and deprecations.
2. Test the upgrade in a staging environment with the same deployment topology.
3. Back up on every node:

```shell
sudo cp -a /usr/local/antmedia/conf /backup/antmedia-conf-$(date +%F)
sudo cp -a /usr/local/antmedia/webapps/*/WEB-INF/red5-web.properties /backup/
```

4. Back up MongoDB (see [Backup & Disaster Recovery](/guides/operations/backup-and-disaster-recovery/)).
5. Confirm cluster health: all nodes visible in the Web Panel, no resource alerts.
6. Keep the currently installed version's package available for rollback.

## Upgrade procedure (per node, edges first)

Upgrade edge nodes first, then origins. Repeat for one node at a time:

### 1. Drain the node

Remove the node from the load balancer rotation (mark the backend as down in Nginx/HAProxy, or fail its health check). Wait for viewer sessions on the node to drain — monitor active sessions in the Web Panel.

### 2. Upgrade the node

```shell
wget https://raw.githubusercontent.com/ant-media/Scripts/master/install_ant-media-server.sh -O install_ant-media-server.sh
chmod 755 install_ant-media-server.sh
sudo ./install_ant-media-server.sh -i ant-media-server-enterprise-<version>.zip -r true
```

The `-r true` flag restores your existing configuration and applications.

### 3. Verify the node

- Service is running: `sudo service antmedia status`
- Node re-registered with the cluster (Web Panel cluster view).
- Logs are clean: `tail -100 /usr/local/antmedia/log/ant-media-server.log`
- Test publish/play on the node directly.

### 4. Return the node to rotation

Re-enable the node on the load balancer, watch it take traffic, then proceed to the next node.

### 5. Origins last

For origin nodes, plan around active publishers: publishers connected to the draining origin will drop and reconnect through the load balancer to another origin. Do origins during the lowest-traffic period.

## Rollback

If a node misbehaves after upgrade:

1. Remove it from the load balancer.
2. Reinstall the previous version with the same script (`-i` with the previous version's zip).
3. Restore the configuration backup into `/usr/local/antmedia/conf` and the application properties files.
4. Restart and verify, then return to rotation.

Because nodes are upgraded one at a time, the cluster keeps serving during a rollback.

:::info
Avoid running mixed versions longer than the duration of the rolling upgrade itself. If the release notes flag database schema changes, upgrade all nodes in one session.
:::

## Platform-specific notes

- **Azure VMSS:** see the [Azure scale set upgrade guide](/guides/clustering-and-scaling/azure/upgrade-azure-cluster/) — note that reimaging wipes the OS disk.
- **AWS CloudFormation:** see [updating AMS with CloudFormation](/guides/clustering-and-scaling/aws/aws-cloudformation/updating-ams-with-cloudformation/).
- **Kubernetes:** update the image tag and let the Deployment roll pods one by one (`maxUnavailable: 1`); the same drain caveats apply per pod.
