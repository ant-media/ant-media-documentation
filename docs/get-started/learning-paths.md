---
title: Learning Paths
description: Role-based reading paths through the Ant Media Server documentation for DevOps engineers, backend developers, mobile developers, and solution architects.
keywords: [learning path, getting started, DevOps, backend developer, mobile developer, solution architect, Ant Media Server Documentation]
sidebar_position: 5
---

# Learning Paths

The documentation covers a lot of ground. These reading paths order the most relevant pages for your role so you can get productive without reading everything.

## SRE / DevOps engineer

You deploy, scale, and operate the server.

1. [Quick start](/quick-start/) — install and run the first server.
2. [SSL setup](/guides/installing-on-linux/setting-up-ssl/) — required for WebRTC in browsers.
3. [Web Panel walkthrough](/get-started/features/) — know your dashboard.
4. [Application settings](/guides/configuration-and-testing/ams-application-configuration/) and the [settings reference](/guides/configuration-and-testing/app-settings-reference/).
5. [Reference architectures](/guides/reference-architectures/single-node-production/) — choose your topology.
6. [Cluster installation](/guides/clustering-and-scaling/manual-configuration/cluster-installation/) or [Kubernetes deployment](/guides/clustering-and-scaling/kubernetes/deploy-ams-on-kubernetes/).
7. [Load testing](/guides/configuration-and-testing/load-testing/webrtc-load-testing/) — establish real capacity.
8. [Monitoring & alerting thresholds](/guides/operations/monitoring-and-alerting-thresholds/).
9. [Rolling upgrade](/guides/operations/rolling-upgrade/) and [backup & disaster recovery](/guides/operations/backup-and-disaster-recovery/).
10. Bookmark the [Troubleshooting section](/guides/troubleshooting/).

## Backend developer

You integrate Ant Media Server into your platform via APIs.

1. [Quick start](/quick-start/) — get a server to develop against.
2. [REST API quickstart](/guides/developer-sdk-and-api/rest-api-guide/) — services, base URLs, authentication model.
3. [Securing REST APIs](/guides/developer-sdk-and-api/rest-api-guide/securing-rest-apis/) and [JWT filter](/guides/developer-sdk-and-api/rest-api-guide/jwt-rest-api-filter/).
4. [REST API Reference](/rest-api/) — interactive Swagger UI for Application and Management APIs.
5. [REST API examples](/guides/developer-sdk-and-api/rest-api-guide/rest-apis-examples/) — common operations end to end.
6. [Webhooks](/guides/advanced-usage/webhooks/) — react to stream lifecycle events.
7. [Stream security](/guides/stream-security/jwt-stream-security-filter/) — tokenize publish/play for your users.
8. [Recording](/guides/recording-live-streams/mp4-and-webm-recording/) and [S3 integration](/guides/recording-live-streams/s3-recording-and-integration/aws-s3/).
9. When responses surprise you: [REST API authorization troubleshooting](/guides/troubleshooting/rest-api-authorization-issues/).

## Web / mobile developer

You build the client applications that publish and play streams.

1. [Sample tools and applications](/get-started/sample-tools-and-applications/) — see what's possible first.
2. JavaScript: [SDK introduction](/guides/developer-sdk-and-api/sdk-integration/javascript-sdk/javascript-sdk-usage/), then the [publish](/guides/developer-sdk-and-api/sdk-integration/javascript-sdk/webrtc-samples/javascript-sdk-publish-sample/) and [play](/guides/developer-sdk-and-api/sdk-integration/javascript-sdk/webrtc-samples/javascript-sdk-play-sample/) samples.
3. Mobile: [Android SDK](/guides/developer-sdk-and-api/sdk-integration/android-sdk/android-dependency/), [iOS SDK](/guides/developer-sdk-and-api/sdk-integration/ios-sdk/), [Flutter](/guides/developer-sdk-and-api/sdk-integration/flutter-sdk/flutter-sdk-usage/), or [React Native](/guides/developer-sdk-and-api/sdk-integration/react-native-sdk/react-native-sdk-usage/).
4. [Embedded web player](/guides/playing-live-stream/embedded-web-player/) — the fastest path to playback.
5. Building conferencing? [Conference structure](/guides/conference/ams-conference-structure/), then the [React conference tutorial](/guides/conference/react-conference-tutorial-part-1/).
6. [Data channel](/guides/publish-live-stream/webrtc/data-channel/) — send data alongside media.
7. When streams misbehave: [WebRTC troubleshooting](/guides/troubleshooting/webrtc-publish-play-issues/).

## Solution architect

You evaluate and design the overall streaming solution.

1. [Introduction](/) — editions, features, and use cases.
2. [Enterprise Deployment Hub](/get-started/enterprise-guide/) — production requirements at a glance.
3. [Reference architectures](/guides/reference-architectures/single-node-production/) — single node, [origin-edge cluster](/guides/reference-architectures/origin-edge-cluster/), [Kubernetes](/guides/reference-architectures/kubernetes-autoscaling/), [multi-region](/guides/reference-architectures/multi-region-deployment/).
4. Protocol trade-offs: [WebRTC](/guides/publish-live-stream/webrtc/), [HLS](/guides/playing-live-stream/hls-playing/), [LL-HLS](/guides/playing-live-stream/ll-hls/), [SRT](/guides/publish-live-stream/srt/).
5. [Adaptive bitrate](/guides/adaptive-bitrate/adaptive-bitrate-streaming/) and [video codecs](/guides/configuration-and-testing/video-codecs/).
6. [Security and privacy](/get-started/security-and-privacy/) and the [stream security options](/guides/stream-security/jwt-stream-security-filter/).
7. [Measuring end-to-end latency](/guides/configuration-and-testing/measure-end-to-end-latency/) — validate the latency claims for your setup.
8. [Release notes](/release-notes/) — versioning cadence and upgrade implications.
