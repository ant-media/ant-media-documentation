---
title: Backup & Disaster Recovery
description: What to back up in an Ant Media Server deployment, how to automate it, and how to recover from instance or region failure.
keywords: [backup, disaster recovery, restore, MongoDB backup, runbook, Ant Media Server Documentation]
sidebar_position: 2
---

# Backup & Disaster Recovery

A recoverable Ant Media Server deployment needs three things backed up: **configuration**, **database**, and **media files**. The server binaries themselves are reinstallable and do not need backup.

## What to back up

| Asset | Location | Frequency |
| ----- | -------- | --------- |
| Server configuration | `/usr/local/antmedia/conf/` (includes `red5.properties`, SSL keystores) | On every change + weekly |
| Application settings | `/usr/local/antmedia/webapps/{App}/WEB-INF/red5-web.properties` | On every change + weekly |
| Standalone database | `/usr/local/antmedia/server.db` and application `.db` files (MapDB, standalone mode) | Daily |
| Cluster database | MongoDB (`serverdb`, `clusterdb`, application databases) | Daily + before upgrades |
| Recordings / VoD | `/usr/local/antmedia/webapps/{App}/streams/` or S3 bucket | Continuous via S3 |
| Custom plugins | `/usr/local/antmedia/plugins/` | On every change |

## Backup automation

### Configuration and standalone database

```shell
#!/bin/bash
BACKUP_DIR=/backup/antmedia/$(date +%F)
mkdir -p "$BACKUP_DIR"
cp -a /usr/local/antmedia/conf "$BACKUP_DIR/"
cp -a /usr/local/antmedia/webapps/*/WEB-INF/red5-web.properties "$BACKUP_DIR/" 2>/dev/null
cp -a /usr/local/antmedia/*.db "$BACKUP_DIR/" 2>/dev/null
# ship to remote storage
aws s3 sync "$BACKUP_DIR" "s3://your-backup-bucket/antmedia/$(date +%F)/"
```

Run it daily via cron and retain at least 14 days.

### MongoDB (cluster mode)

```shell
mongodump --uri="mongodb://user:pass@mongo-host:27017" --out=/backup/mongo/$(date +%F)
```

If you use a managed database (MongoDB Atlas, AWS DocumentDB, Cosmos DB), enable the provider's automated backups and point-in-time recovery instead.

### Media files

The most robust approach is not backing up local disks but writing recordings directly to object storage with [S3 recording](/guides/recording-live-streams/s3-recording-and-integration/aws-s3/), then relying on bucket versioning/replication.

## Recovery procedures

### Single node loss (standalone)

1. Provision a new instance (same OS family) and install the same AMS version with the [install script](/quick-start/).
2. Stop the service, restore `/usr/local/antmedia/conf`, application properties files, and `.db` files from backup.
3. Restore or re-issue the SSL certificate, start the service, verify publish/play.

Target recovery time with automated provisioning: under 30 minutes.

### Cluster node loss

No data restore is needed — cluster state lives in MongoDB. Provision a replacement node, install AMS, run `change_server_mode.sh cluster <mongodb-uri>`, and add it to the load balancer.

### Database loss (cluster)

1. Restore the latest `mongodump` into a healthy MongoDB instance (`mongorestore`).
2. Point all nodes at the restored database and restart them.
3. Live streams at the time of failure are lost; registered stream sources and settings recover from the dump.

Prevention is cheaper than recovery: run MongoDB as a **replica set** so a single database instance failure causes no outage at all.

### Region loss

See [multi-region deployment](/guides/reference-architectures/multi-region-deployment/). If you run single-region, your disaster recovery plan is: infrastructure-as-code templates + configuration backups + database backups stored in a **different region**, and a documented, rehearsed rebuild procedure.

## Test your recovery

A backup that has never been restored is a hypothesis. Quarterly, restore the latest backups into a staging environment and verify publish, play, panel login, and settings.
