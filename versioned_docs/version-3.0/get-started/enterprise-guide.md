---
title: Enterprise Deployment Hub
slug: /enterprise-guide
description: A single starting point for running Ant Media Server Enterprise Edition in production - deployment checklist, architecture, security hardening, upgrades, troubleshooting, and support.
keywords: [Ant Media Server Enterprise Edition, production deployment, production checklist, security hardening, enterprise support, Ant Media Server Documentation]
sidebar_position: 1
sidebar_label: Enterprise Deployment Hub
---

# Enterprise Deployment Hub

This page is the starting point for teams running **Ant Media Server Enterprise Edition in production**. Use it as a single entry point for planning, deployment, hardening, operating, and getting help.

## Production deployment checklist

Work through this list before going live.

### Infrastructure

- [ ] Instance meets the minimum sizing: **4 vCPUs (compute-optimized), 8 GB RAM, SSD storage** for a single server. Validate real capacity with [Load Testing](/category/load-testing/).
- [ ] Operating system is supported (Ubuntu 20.04/22.04/24.04, CentOS/Rocky/Alma 8-9, RHEL 9) — see [Introduction](/) and [Choose your path](/#choose-your-path).
- [ ] Required ports are open: 5080 (HTTP panel), 5443 (HTTPS), 1935 (RTMP), UDP 50000–60000 (WebRTC media), and TCP 5000 between cluster nodes only.
- [ ] For expected growth, deployment model is chosen deliberately: [Installation](/category/installation/) (standalone / Docker), [Clustering and Scaling](/category/clustering-and-scaling/), or [Kubernetes](/category/kubernetes/).

### Security hardening

- [ ] SSL is configured with a valid certificate for your domain — start in [Installation](/category/installation/).
- [ ] Default Web Panel credentials are changed and [user roles](/user-management/) are assigned.
- [ ] REST API is secured (IP filtering or JWT) — see [REST API](/category/rest-api-guide/).
- [ ] Stream security is enabled where needed (JWT tokens, one-time tokens, webhook authorization, undefined-stream policy, CORS) — see [Stream Security](/category/stream-security/).
- [ ] Cluster port 5000 and MongoDB port 27017 are **not** reachable from the public internet.

### Streaming configuration

- [ ] Adaptive bitrate resolutions/bitrates match your content and audience networks — see [Adaptive Bitrate](/category/adaptive-bitrate/).
- [ ] If transcoding at scale, GPU acceleration is configured on origin nodes — see [Using NVIDIA GPU](/guides/advanced-usage/using-nvidia-gpu/).
- [ ] For viewers on restricted networks, a TURN server is deployed — see [TURN Server Installation](/category/turn-server-installation/) and [STUN/TURN Server Configuration](/guides/configuration-and-testing/configuring-stun-turn-addresses/).
- [ ] Recording and object storage are configured if recordings are required — see [Recording Live Streams](/category/recording-live-streams/) and [Cloud Storage Integration](/category/s3-recording-and-integration/).

### Operations

- [ ] Monitoring with alerting is set up (Grafana, Prometheus/Loki, or New Relic). Alert on sustained CPU/memory above 70% — see [Monitoring](/category/monitoring/).
- [ ] Webhooks are wired into your systems for stream lifecycle events — see [Developer Guides](/category/developer-guides/).
- [ ] An upgrade procedure is agreed (see below) and tested in a staging environment.
- [ ] MongoDB (in cluster mode) has backups and, ideally, a replica set — see [Databases](/category/databases/) under Clustering and Scaling.

## Cluster architecture overview

For anything beyond a single server, Ant Media Server scales with an **origin-edge cluster**:

| Component | Role |
| --------- | ---- |
| Origin nodes | Ingest publishers, transcoding/transmuxing |
| Edge nodes | Fetch from origins and serve viewers |
| MongoDB | Shared stream metadata and node registry |
| Load balancer (Nginx/HAProxy) | Single entry point; routes publish vs play traffic |

![Ant Media Server origin-edge cluster: publishers and viewers through a load balancer to origin and edge groups sharing MongoDB](@site/static/img/ams-cluster-architecture.svg)

Start with [Clustering and Scaling](/category/clustering-and-scaling/), then pick a platform path: [AWS](/category/aws/), [Azure](/category/azure/), [GCP](/category/gcp/), or [Kubernetes](/category/kubernetes/). For traffic entry points, see [Load Balancing](/category/load-balancing/).

## Upgrade and rollback

- Follow the upgrade guidance under [Upgrading Ant Media Server](/guides/installing-on-linux/upgrading-ant-media-server/). Always back up `/usr/local/antmedia/conf`, application settings, and the database first.
- Review the [GitHub releases](https://github.com/ant-media/Ant-Media-Server/releases) for breaking changes **before** upgrading.
- In clusters, upgrade node by node behind the load balancer to avoid full downtime — see [Updating AMS with CloudFormation](/guides/clustering-and-scaling/aws/aws-cloudformation/updating-ams-with-cloudformation/) for AWS and [Upgrade Azure Cluster](/guides/clustering-and-scaling/azure/upgrade-azure-cluster/) for Azure.
- Keep the previous version's installation package available so you can reinstall and restore configuration if a rollback is needed.
- Test the upgrade path in staging with the same topology as production.

## Troubleshooting index

Start with the [Troubleshooting](/guides/troubleshooting/) guide. Common production issues:

| Symptom | Where to look |
| ------- | ------------- |
| Pixelated or choppy video | [Troubleshooting](/guides/troubleshooting/) — bitrate, ABR, B-frames, network test tool |
| High CPU / memory / "Resource Usage is High" | [Troubleshooting](/guides/troubleshooting/) — thread/heap dumps, `server.cpu_limit` |
| WebRTC publish/play failures | SSL, UDP 50000–60000, [TURN Server Installation](/category/turn-server-installation/), [STUN/TURN Server Configuration](/guides/configuration-and-testing/configuring-stun-turn-addresses/), [Publish Live Streams](/category/publish-live-streams/), [Play Live Streams](/category/play-live-streams/) |
| Cluster: stream on origin but not on edge | [Clustering and Scaling](/category/clustering-and-scaling/) — TCP 5000, shared MongoDB |
| REST API 401/403 | [REST API](/category/rest-api-guide/), [FAQ](/faq/) |
| Recording / S3 404 | [Recording Live Streams](/category/recording-live-streams/), [Cloud Storage Integration](/category/s3-recording-and-integration/) |

Also search the [FAQ](/faq/) and [GitHub Discussions Q&A](https://github.com/orgs/ant-media/discussions/categories/q-a).

## Support escalation matrix

| Situation | Channel | Expected use |
| --------- | ------- | ------------ |
| Production outage, license/cluster failure, urgent upgrade help | [support@antmedia.io](mailto:support@antmedia.io) | Enterprise Edition — open a ticket with logs and repro steps |
| Ongoing Enterprise delivery / account questions | Slack (invite via your account manager) | Enterprise Edition — day-to-day coordination with support |
| How-to questions, best practices, non-urgent design help | [GitHub Discussions](https://github.com/orgs/ant-media/discussions) | Community + Ant Media team |
| Confirmed product bug or feature request | [GitHub Issues](https://github.com/ant-media/Ant-Media-Server/issues) | Everyone |
| Security vulnerability | Contact support privately first; do not file a public issue with exploit details | Enterprise and responsible disclosure |

### What to include in a support ticket

1. Ant Media Server version and edition (Enterprise / Community)
2. Deployment type: standalone, cluster, Kubernetes, or cloud marketplace
3. Relevant excerpts from `/usr/local/antmedia/log/ant-media-server.log` and `antmedia-error.log`
4. Steps to reproduce and impact (publishers/viewers affected)
5. Recent changes (upgrade, config, network, certificate)

Enterprise Edition users can also enable centralized logging under [Monitoring](/category/monitoring/) so the support team can troubleshoot faster.

:::tip
Self-service first: checklist → architecture guide → troubleshooting/FAQ. Escalate to email/Slack support when you are blocked in production or need account-level help.
:::
