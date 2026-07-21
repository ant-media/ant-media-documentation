---
title: Application Settings Reference
description: Searchable reference for the most important Ant Media Server application settings, with types, defaults, and production recommendations.
keywords: [Ant Media application settings, red5-web.properties, AppSettings reference, Ant Media Server configuration, Ant Media Server Documentation]
sidebar_position: 2
---

# Application Settings Reference

This page is a quick reference for the most commonly used application settings. Settings are stored per application in `/usr/local/antmedia/webapps/{AppName}/WEB-INF/red5-web.properties` and can be changed from the Web Panel or the [Management REST API](/guides/configuration-and-testing/ams-application-configuration/).

In the properties file, every key is prefixed with `settings.` (for example `settings.mp4MuxingEnabled=true`).

:::info
This is a curated list. The exhaustive, always-up-to-date list of every setting lives in the [AppSettings Javadoc](https://antmedia.io/javadoc/io/antmedia/AppSettings.html).
:::

## Security

| Setting | Type | Default | Description |
| ------- | ---- | ------- | ----------- |
| `ipFilterEnabled` | boolean | `true` | Enables the REST API IP filter. Only IPs in `remoteAllowedCIDR` may call the application REST API. |
| `remoteAllowedCIDR` | string | `127.0.0.1` | Comma-separated CIDR list allowed to call the REST API when the IP filter is enabled. |
| `allowedPublisherCIDR` | string | empty | If set, only publishers from these CIDR ranges may publish. |
| `jwtControlEnabled` | boolean | `false` | Enables the JWT filter for the application REST API. Do not enable together with the IP filter. |
| `jwtSecretKey` | string | empty | Secret key used to validate REST API JWT tokens (HS256). |
| `publishTokenControlEnabled` | boolean | `false` | Requires a one-time token to publish. See [one-time tokens](/guides/stream-security/one-time-token-control/). |
| `playTokenControlEnabled` | boolean | `false` | Requires a one-time token to play. |
| `publishJwtControlEnabled` | boolean | `false` | Requires a JWT stream token to publish. See [JWT stream security](/guides/stream-security/jwt-stream-security-filter/). |
| `playJwtControlEnabled` | boolean | `false` | Requires a JWT stream token to play. |
| `jwtStreamSecretKey` | string | empty | Secret key for JWT stream tokens. |
| `jwksURL` | string | empty | JWKS endpoint for validating JWT tokens instead of a static secret. |
| `hashControlPublishEnabled` | boolean | `false` | Enables hash-based token control for publishing. See [hash-based tokens](/guides/stream-security/hash-based-token/). |
| `hashControlPlayEnabled` | boolean | `false` | Enables hash-based token control for playback. |
| `tokenHashSecret` | string | empty | Secret used to generate hash-based tokens. |
| `enableTimeTokenForPublish` | boolean | `false` | Requires a time-based one-time password (TOTP) to publish. See [TOTP](/guides/stream-security/time-based-one-time-password/). |
| `enableTimeTokenForPlay` | boolean | `false` | Requires a TOTP to play. |
| `acceptOnlyStreamsInDataStore` | boolean | `false` | Rejects streams whose id is not already registered in the datastore. Recommended `true` in production to [block undefined streams](/guides/stream-security/accepting-undefined-streams/). |
| `webhookAuthenticateURL` | string | empty | If set, publish requests are authorized by this webhook. See [webhook authorization](/guides/stream-security/webhook-stream-authorization/). |
| `webhookPlayAuthUrl` | string | empty | If set, play requests are authorized by this webhook. |
| `contentSecurityPolicyHeaderValue` | string | empty | Value of the `Content-Security-Policy` header served with HTTP responses. |

## Codecs and transcoding

| Setting | Type | Default | Description |
| ------- | ---- | ------- | ----------- |
| `h264Enabled` | boolean | `true` | Enables H.264 in WebRTC sessions. |
| `vp8Enabled` | boolean | `false` | Enables VP8 (Enterprise Edition). |
| `h265Enabled` | boolean | `false` | Enables H.265/HEVC (Enterprise Edition). |
| `av1Enabled` | boolean | `false` | Enables AV1 (Enterprise Edition, v3.0+). |
| `aacEncodingEnabled` | boolean | `true` | Enables AAC audio encoding for muxing outputs. |
| `encoderSettingsString` | string | empty | Adaptive bitrate ladder as height/bitrate pairs. Configure via the Web Panel ABR settings. See [adaptive bitrate](/guides/adaptive-bitrate/adaptive-bitrate-streaming/). |
| `gopSize` | int | `0` | Keyframe interval (GOP size) for transcoded streams; `0` keeps the source GOP. |
| `forceDecoding` | boolean | `false` | Forces decoding of incoming streams even without ABR. Increases CPU usage; leave `false` unless required. |
| `forceAspectRatioInTranscoding` | boolean | `false` | Preserves the source aspect ratio in transcoded renditions by cropping. |
| `hwDecoderEnabled` | boolean | `true` | Uses the hardware decoder when a GPU is available. See [Nvidia GPU usage](/guides/advanced-usage/using-nvidia-gpu/). |
| `hwScalingEnabled` | boolean | `false` | Uses the GPU for scaling operations. |

## Ingest limits and quality enforcement

| Setting | Type | Default | Description |
| ------- | ---- | ------- | ----------- |
| `maxFpsAccept` | int | `0` (unlimited) | Rejects publishers exceeding this FPS. See [enforcing stream quality](/guides/adaptive-bitrate/enforcing-stream-quality/). |
| `maxResolutionAccept` | int | `0` (unlimited) | Rejects publishers exceeding this resolution (height). |
| `maxBitrateAccept` | int | `0` (unlimited) | Rejects publishers exceeding this bitrate. |
| `ingestingStreamLimit` | int | `-1` (unlimited) | Maximum number of concurrently ingested streams. |
| `webRTCViewerLimit` | int | `-1` (unlimited) | Maximum number of concurrent WebRTC viewers. |
| `dropWebRTCIngestIfNoPacketReceived` | boolean | `false` | Drops a WebRTC ingest when no packets arrive, freeing resources faster. |

## HLS and DASH

| Setting | Type | Default | Description |
| ------- | ---- | ------- | ----------- |
| `hlsMuxingEnabled` | boolean | `true` | Produces HLS output for every stream. |
| `hlsTime` | int | `2` | HLS segment duration in seconds. Lower values reduce latency but increase player polling. |
| `hlsListSize` | int | `15` | Number of segments kept in the HLS playlist. |
| `hlsPlayListType` | string | empty | Set to `event` or `vod` to change playlist behavior. |
| `deleteHLSFilesOnEnded` | boolean | `true` | Deletes HLS files when the stream ends. Set to `false` to persist; see [HLS recording](/guides/recording-live-streams/hls-recording/). |
| `dashMuxingEnabled` | boolean | `false` | Produces DASH (CMAF) output (Enterprise Edition). |
| `hlsHttpEndpoint` | string | empty | Sends HLS segments to an HTTP endpoint instead of local disk. |
| `id3TagEnabled` | boolean | `false` | Enables ID3 timed metadata in HLS streams. |

## Recording and storage

| Setting | Type | Default | Description |
| ------- | ---- | ------- | ----------- |
| `mp4MuxingEnabled` | boolean | `false` | Records every stream as MP4. See [MP4/WebM recording](/guides/recording-live-streams/mp4-and-webm-recording/). |
| `webMMuxingEnabled` | boolean | `false` | Records every stream as WebM (Enterprise Edition). |
| `addDateTimeToMp4FileName` | boolean | `false` | Appends the date/time to recording file names to avoid overwrites. |
| `generatePreview` | boolean | `false` | Generates PNG preview images for streams. |
| `s3RecordingEnabled` | boolean | `false` | Uploads recordings to S3-compatible storage. See [S3 integration](/guides/recording-live-streams/s3-recording-and-integration/aws-s3/). |
| `s3AccessKey` / `s3SecretKey` | string | empty | Credentials for the S3 bucket. |
| `s3BucketName` / `s3RegionName` / `s3Endpoint` | string | empty | Bucket location. `s3Endpoint` is required for S3-compatible providers (MinIO, Spaces, R2, Wasabi). |
| `s3Permission` | string | `public-read` | ACL applied to uploaded objects. Use `private` with signed URLs for confidential content. |
| `httpForwardingExtension` | string | empty | File extensions to forward to external storage (for example `mp4,m3u8,png`). See [HTTP forwarding](/guides/recording-live-streams/http-forwarding/). |
| `httpForwardingBaseURL` | string | empty | Base URL of the bucket for HTTP forwarding, without trailing slash. |
| `vodUploadFinishScript` | string | empty | Script executed when a VoD upload finishes. See [user-defined scripts](/guides/recording-live-streams/user-defined-scripts/). |

## WebRTC and network

| Setting | Type | Default | Description |
| ------- | ---- | ------- | ----------- |
| `stunServerURI` | string | Google STUN | STUN/TURN server URI, e.g. `turn:turn.example.com:443?transport=tcp`. See [STUN/TURN configuration](/guides/advanced-usage/turn-installation/configuring-stun-turn-addresses/). |
| `turnServerUsername` / `turnServerCredential` | string | empty | TURN server credentials. |
| `webRTCClientStartTimeoutMs` | int | `10000` | Time allowed for a WebRTC client to connect before it is dropped. |
| `iceGatheringTimeoutMs` | int | `2000` | ICE candidate gathering timeout. |
| `disableIPv6Candidates` | boolean | `true` | Excludes IPv6 ICE candidates. |
| `webRTCKeyframeTime` | int | `2000` | Keyframe interval (ms) requested from WebRTC publishers. |
| `rtmpIngestBufferTimeMs` | int | `0` | Buffer applied to RTMP ingest before WebRTC delivery; increase for unstable RTMP sources. |
| `srtReceiveLatencyInMs` | int | `150` | SRT receive latency; increase on lossy networks. |
| `rtmpPlaybackEnabled` | boolean | `false` | Allows pulling streams over RTMP. Keep disabled unless needed. |
| `playWebRTCStreamOnceForEachSession` | boolean | `true` | Prevents the same session from opening duplicate WebRTC players. |
| `originEdgeConnectionIdleTimeout` | int | `2` | Seconds an idle origin-edge connection is kept open in cluster mode. |

## Adaptive bitrate (viewer-side ABR)

| Setting | Type | Default | Description |
| ------- | ---- | ------- | ----------- |
| `statsBasedABRAlgorithmEnabled` | boolean | `true` | Switches viewer quality based on packet loss, RTT, and jitter statistics. |
| `abrDownScalePacketLostRatio` | float | `1` | Packet loss ratio that triggers a downscale. |
| `abrUpScalePacketLostRatio` | float | `0.1` | Packet loss ratio below which upscale is allowed. |
| `abrUpScaleRTTMs` | int | `150` | Maximum RTT (ms) for upscale. |
| `abrUpScaleJitterMs` | int | `30` | Maximum jitter (ms) for upscale. |

## Webhooks and integrations

| Setting | Type | Default | Description |
| ------- | ---- | ------- | ----------- |
| `listenerHookURL` | string | empty | Webhook called on stream lifecycle events (start, end, recording ready). See [webhooks](/guides/advanced-usage/webhooks/). |
| `webhookRetryCount` | int | `0` | Number of retries for failed webhook deliveries. Set to 2-3 in production. |
| `webhookRetryAttemptDelay` | int | `1000` | Delay (ms) between webhook retries. |
| `webhookStreamStatusUpdatePeriodMs` | int | `-1` (disabled) | Period for periodic stream status webhook updates. |
| `dataChannelEnabled` | boolean | `true` | Enables WebRTC data channels. See [data channel](/guides/publish-live-stream/webrtc/data-channel/). |
| `dataChannelWebHookURL` | string | empty | Webhook that receives data channel messages. |

## Stream sources and IP cameras

| Setting | Type | Default | Description |
| ------- | ---- | ------- | ----------- |
| `startStreamFetcherAutomatically` | boolean | `false` | Starts registered stream sources automatically on server startup. |
| `restartStreamFetcherPeriod` | int | `0` (disabled) | Restarts stream fetchers periodically (seconds); useful for unreliable sources. |
| `rtspPullTransportType` | int | `3` (TCP) | Transport for RTSP pulls. |
| `rtspTimeoutDurationMs` | int | `5000` | RTSP connection timeout. |
| `maxAnalyzeDurationMS` | int | `1500` | Time spent probing a source before deciding its format. Increase for slow sources. |

## How to change a setting

1. **Web Panel:** application > Settings > Advanced Settings, then save. No restart is needed for most settings.
2. **Properties file:** edit `webapps/{AppName}/WEB-INF/red5-web.properties`, prefix the key with `settings.`, and restart the server.
3. **REST API:** see [changing app settings programmatically](/guides/configuration-and-testing/ams-application-configuration/#change-app-settings-programmatically).

Settings not listed here can be found in the [AppSettings Javadoc](https://antmedia.io/javadoc/io/antmedia/AppSettings.html), which documents every field with its type and default value.
