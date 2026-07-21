---
title: Enterprise Deployment Hub
description: A single starting point for running Ant Media Server Enterprise Edition in production - deployment checklist, security hardening, scaling, upgrades, and support.
keywords: [Ant Media Server Enterprise Edition, production deployment, production checklist, security hardening, enterprise support, Ant Media Server Documentation]
sidebar_position: 2
---

# Enterprise Deployment Hub

This page is the starting point for teams running **Ant Media Server Enterprise Edition in production**. It links the documentation you need for each stage of the lifecycle: planning, deployment, hardening, operating, and getting help.

## Production deployment checklist

Work through this list before going live:

### Infrastructure

- [ ] Instance meets the minimum sizing: **4 vCPUs (compute-optimized), 8 GB RAM, SSD storage** for a single server. Validate real capacity with [load testing](/guides/configuration-and-testing/load-testing/webrtc-load-testing/).
- [ ] Operating system is supported (Ubuntu 20.04/22.04/24.04, CentOS/Rocky/Alma 8-9, RHEL 9) — see [deployment options](/#deployment-options).
- [ ] Required ports are open: 5080 (HTTP panel), 5443 (HTTPS), 1935 (RTMP), UDP 50000–60000 (WebRTC media), and TCP 5000 between cluster nodes only.
- [ ] For expected growth, deployment model is chosen deliberately: [standalone](/guides/installing-on-linux/installing-ams-on-linux/), [cluster](/guides/clustering-and-scaling/manual-configuration/cluster-installation/), [Kubernetes](/guides/clustering-and-scaling/kubernetes/deploy-ams-on-kubernetes/), or [Docker](/guides/installing-on-linux/ams-docker-installation/).

### Security

- [ ] [SSL is configured](/guides/installing-on-linux/setting-up-ssl/) with a valid certificate for your domain.
- [ ] Default Web Panel credentials are changed and [user roles](/get-started/user-management/) are assigned.
- [ ] REST API is secured with [IP filtering or JWT](/guides/developer-sdk-and-api/rest-api-guide/securing-rest-apis/).
- [ ] Stream security is enabled where needed: [JWT stream tokens](/guides/stream-security/jwt-stream-security-filter/), [one-time tokens](/guides/stream-security/one-time-token-control/), or [webhook authorization](/guides/stream-security/webhook-stream-authorization/).
- [ ] [Undefined/unexpected streams are rejected](/guides/stream-security/accepting-undefined-streams/).
- [ ] [CORS filter](/guides/stream-security/cors-filter/) is configured for your domains.
- [ ] Cluster port 5000 and MongoDB port 27017 are **not** reachable from the public internet.

### Streaming configuration

- [ ] [Adaptive bitrate](/guides/adaptive-bitrate/adaptive-bitrate-streaming/) resolutions/bitrates match your content and audience networks.
- [ ] If transcoding at scale, [GPU acceleration](/guides/advanced-usage/using-nvidia-gpu/) is configured on origin nodes.
- [ ] For viewers on restricted networks, a [TURN server](/guides/advanced-usage/overcoming-restricted-networks-webrtc-ams/) is deployed.
- [ ] [Recording](/guides/recording-live-streams/mp4-and-webm-recording/) and [S3 storage](/guides/recording-live-streams/s3-recording-and-integration/aws-s3/) are configured if recordings are required.

### Operations

- [ ] Monitoring with alerting is set up: [Grafana](/guides/monitoring/monitoring-ams-with-grafana/), [Prometheus/Loki](/guides/monitoring/loki-prometheus-setup/), or [New Relic](/guides/monitoring/monitor-ant-media-server-statistics-with-new-relic/). Alert on sustained CPU/memory above 70%.
- [ ] [Webhooks](/guides/advanced-usage/webhooks/) are wired into your systems for stream lifecycle events.
- [ ] An upgrade procedure is agreed (see below) and tested in a staging environment.
- [ ] MongoDB (in cluster mode) has backups and, ideally, a replica set.

## Architecture at a glance

For anything beyond a single server, Ant Media Server scales with an **origin-edge cluster**: publishers stream to origin nodes (which transcode), edge nodes fetch from origins and serve viewers, MongoDB stores shared state, and a load balancer (Nginx/HAProxy) is the single entry point.

Start with [cluster installation](/guides/clustering-and-scaling/manual-configuration/cluster-installation/), then pick your platform guide: [AWS](/guides/clustering-and-scaling/aws/clustering-with-aws/), [Azure](/guides/clustering-and-scaling/azure/setup-ams-clustering-at-azure/), [GCP](/guides/clustering-and-scaling/gcp/gcp-cluster-deployment/), or [Kubernetes/Helm](/guides/clustering-and-scaling/kubernetes/deploy-ams-with-helm/).

## Upgrades and rollback

- Follow the [upgrade guide](/guides/installing-on-linux/upgrading-ant-media-server/). Always back up `/usr/local/antmedia/conf`, application settings, and the database first.
- Review the [release notes](/release-notes/) for breaking changes **before** upgrading.
- In clusters, upgrade node by node behind the load balancer to avoid downtime; on Azure VMSS see the [Azure cluster upgrade guide](/guides/clustering-and-scaling/azure/upgrade-azure-cluster/).
- Keep the previous version's installation package available so you can reinstall and restore configuration if a rollback is needed.

## When something goes wrong

The [Troubleshooting section](/guides/troubleshooting/) is organized by symptom:

- [WebRTC publish & play issues](/guides/troubleshooting/webrtc-publish-play-issues/)
- [SSL & TURN issues](/guides/troubleshooting/ssl-and-turn-issues/)
- [Cluster issues](/guides/troubleshooting/cluster-issues/)
- [High CPU & memory](/guides/troubleshooting/high-cpu-and-memory/)
- [Recording & S3 issues](/guides/troubleshooting/recording-and-s3-issues/)
- [REST API authorization issues](/guides/troubleshooting/rest-api-authorization-issues/)

## Getting support

| Channel | Audience | Use for |
| ------- | -------- | ------- |
| [support@antmedia.io](mailto:support@antmedia.io) | Enterprise Edition customers | Incidents, technical issues, upgrade assistance |
| Slack (invitation via your account manager) | Enterprise Edition customers | Ongoing communication with the support team |
| [GitHub Discussions](https://github.com/orgs/ant-media/discussions) | Everyone | Questions, best practices, community help |
| [GitHub Issues](https://github.com/ant-media/Ant-Media-Server/issues) | Everyone | Bug reports and feature requests |

When opening a support request, include: server version, deployment type (standalone/cluster/Kubernetes), relevant excerpts from `/usr/local/antmedia/log/ant-media-server.log`, and steps to reproduce. This shortens resolution time significantly.

Enterprise Edition users can also enable [centralized logging](/guides/monitoring/centralized-logging/) so the support team can troubleshoot proactively.
