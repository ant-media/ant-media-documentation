---
title: AMS Server Configurations
description: Configure Ant Media Server at the server level through red5.properties and the Management Panel.
keywords: [Ant Media server Configuration, Ant Media Server Documentation, Ant Media Server Tutorials, Ant Media Management Panel, Ant Media Settings, Ant Media Configuration]
sidebar_position: 2
---

# AMS Server Configurations

Configure Ant Media Server at the **server level** — ports, RTMP/RTMPS, JMX, clustering database, and global limits — through `red5.properties` or the Management Panel.

:::info
For per-application settings (publish, play, recording, security), see [AMS Application Configuration](/guides/configuration-and-testing/ams-application-configuration/).
:::

## What you'll accomplish

By the end of this guide, you will:

1. Know where server-level settings are stored (`red5.properties`).
2. Understand the main configuration groups (HTTP, RTMP, JMX, cluster DB, and more).
3. Find default values for common server properties.

## Main configuration file

Server settings are stored in:

```text
<AMS_DIR>/conf/red5.properties
```

On a default install, `<AMS_DIR>` is `/usr/local/antmedia`.

Edit this file directly, or change supported values from the Management Panel. Restart Ant Media Server after changing properties that require a restart.

Below are the available server configuration options grouped by area.

### General server settings

- `policy.host`: Socket policy host. Default: `0.0.0.0`
- `policy.port`: Socket policy port (must be open). Default: `843`
- `server.name`: Ant Media Server name (optional).
- `server.licence_key`: Ant Media Server license key (required for Enterprise Edition).
- `server.heartbeatEnabled`: Enables server heartbeat. Default: `true`
- `server.kafka_brokers`: Kafka broker address (default Kafka port is `9092`). Optional. See [Monitoring with Grafana](/guides/monitoring/monitoring-ams-with-grafana/).
- `server.cpu_limit`: CPU usage limit (percentage). Default: `75`
- `server.min_free_ram`: Minimum free RAM required (in MB). Default: `10`
- `logLevel`: Logging level (`TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR`). Default: `INFO`
- `useGlobalIp`: Whether to use the global IP for WebSocket clusters. Default: `false`

### HTTP settings

- `http.host`: HTTP host. Default: `0.0.0.0`
- `http.port`: HTTP port. Default: `5080`
- `https.port`: HTTPS port. Default: `5443`
- `http.URIEncoding`: URI encoding. Default: `UTF-8`
- `http.max_keep_alive_requests`: Maximum keep-alive requests. Default: `-1`
- `http.max_threads`: Maximum HTTP threads. Default: `20`
- `http.acceptor_thread_count`: Acceptor thread count. Default: `10`
- `http.processor_cache`: Processor cache size. Default: `20`

### RTMP settings

- `rtmp.host`: RTMP host. Default: `0.0.0.0`
- `rtmp.port`: RTMP port. Default: `1935`
- `rtmp.io_threads`: IO thread count. Default: `16`
- `rtmp.send_buffer_size`: Send buffer size. Default: `65536`
- `rtmp.receive_buffer_size`: Receive buffer size. Default: `65536`
- `rtmp.ping_interval`: Ping interval (ms). Default: `1000`
- `rtmp.max_inactivity`: Maximum inactivity (ms). Default: `60000`
- `rtmp.max_handshake_time`: Max handshake time (ms). Default: `5000`
- `rtmp.tcp_nodelay`: TCP no-delay option. Default: `true`
- `rtmp.tcp_keepalive`: TCP keep-alive option. Default: `false`
- `rtmp.default_server_bandwidth`: Default server bandwidth. Default: `10000000`
- `rtmp.default_client_bandwidth`: Default client bandwidth. Default: `10000000`
- `rtmp.client_bandwidth_limit_type`: Bandwidth limit type. Default: `2`
- `rtmp.bandwidth_detection`: Bandwidth detection. Default: `false`
- `rtmp.encoder_base_tolerance`: Encoder base tolerance (ms). Default: `5000`
- `rtmp.encoder_drop_live_future`: Drop live future frames. Default: `false`
- `rtmp.traffic_class`: Traffic class. Default: `-1`
- `rtmp.backlog`: Backlog size. Default: `32`
- `rtmp.thoughput_calc_interval`: Throughput calculation interval. Default: `15`
- `rtmp.default_acceptor`: Default acceptor. Default: `true`
- `rtmp.initial_pool_size`: Initial pool size. Default: `0`
- `rtmp.max_pool_size`: Max pool size. Default: `2`
- `rtmp.max_processor_pool_size`: Max processor pool size. Default: `16`
- `rtmp.executor_keepalive_time`: Executor keep-alive time. Default: `60000`
- `mina.logfilter.enable`: Mina log filter enable. Default: `false`
- `rtmp.scheduler.pool_size`: Scheduler pool size. Default: `16`
- `rtmp.deadlockguard.sheduler.pool_size`: Deadlock guard scheduler pool size. Default: `16`
- `rtmp.executor.core_pool_size`: Executor core pool size. Default: `4`
- `rtmp.executor.max_pool_size`: Executor max pool size. Default: `32`
- `rtmp.executor.queue_capacity`: Executor queue capacity. Default: `64`
- `rtmp.executor.queue_size_to_drop_audio_packets`: Executor queue size to drop audio packets. Default: `60`
- `rtmp.max_handling_time`: Max handling time. Default: `2000`
- `rtmp.channel.initial.capacity`: Channel initial capacity. Default: `3`
- `rtmp.channel.concurrency.level`: Channel concurrency level. Default: `1`
- `rtmp.stream.initial.capacity`: Stream initial capacity. Default: `1`
- `rtmp.stream.concurrency.level`: Stream concurrency level. Default: `1`
- `rtmp.pending.calls.initial.capacity`: Pending calls initial capacity. Default: `3`
- `rtmp.pending.calls.concurrency.level`: Pending calls concurrency level. Default: `1`
- `rtmp.reserved.streams.initial.capacity`: Reserved streams initial capacity. Default: `1`
- `rtmp.reserved.streams.concurrency.level`: Reserved streams concurrency level. Default: `1`
- `rtmp.max_packet_size`: Max packet size. Default: `3145728`

### RTMPS settings

- `rtmps.host`: Host value. Default: `0.0.0.0`
- `rtmps.port`: Port value. Default: `8443`
- `rtmps.ping_interval`: Ping interval. Default: `5000`
- `rtmps.max_inactivity`: Max inactivity value. Default: `60000`
- `rtmps.max_keep_alive_requests`: Max keep-alive requests. Default: `-1`
- `rtmps.max_threads`: Max threads. Default: `20`
- `rtmps.acceptor_thread_count`: Acceptor thread count. Default: `2`
- `rtmps.processor_cache`: Processor cache. Default: `20`

### RTMPS key and truststore

- `rtmps.keystorepass`: Keystore password. Default: `password`
- `rtmps.keystorefile`: Keystore file location. Default: `conf/keystore.jks`
- `rtmps.truststorepass`: Truststore password. Default: `password`
- `rtmps.truststorefile`: Truststore file location. Default: `conf/truststore.jks`

### RTMPT settings

- `rtmpt.host`: RTMPT host. Default: `0.0.0.0`
- `rtmpt.port`: RTMPT port. Default: `8088`
- `rtmpt.ping_interval`: Ping interval. Default: `5000`
- `rtmpt.max_inactivity`: Max inactivity. Default: `60000`
- `rtmpt.max_handshake_time`: Max handshake time. Default: `5000`
- `rtmpt.max_keep_alive_requests`: Max keep-alive requests. Default: `-1`
- `rtmpt.max_threads`: Max threads. Default: `20`
- `rtmpt.acceptor_thread_count`: Acceptor thread count. Default: `2`
- `rtmpt.processor_cache`: Processor cache. Default: `20`
- `rtmpt.encoder_base_tolerance`: Encoder base tolerance. Default: `5000`
- `rtmpt.encoder_drop_live_future`: Encoder drop live future. Default: `true`
- `rtmpt.target_response_size`: Target response size. Default: `32768` (streaming), `8192` (small messages)
- `rtmpt.max_in_msg_process`: Max incoming messages to process at once. Default: `166`
- `rtmpt.max_queue_offer_time`: Max queue offer time (ms). Default: `125`
- `rtmpt.max_queue_offer_attempts`: Max queue offer attempts. Default: `4`

### Debug proxy (requires activation in red5-core.xml)

- `proxy.source_host`: Proxy source host. Default: `127.0.0.1`
- `proxy.source_port`: Proxy source port. Default: `1936`
- `proxy.destination_host`: Proxy destination host. Default: `127.0.0.1`
- `proxy.destination_port`: Proxy destination port. Default: `1935`

### JMX settings

- `jmx.rmi.host`: JMX RMI host. Default: `localhost`
- `jmx.rmi.port`: JMX RMI port. Default: `9999`
- `jmx.rmi.sport`: JMX RMI secondary port. Default: `9998`
- `jmx.rmi.port.remoteobjects`: JMX RMI remote objects port. Optional.
- `jmx.keystorepass`: JMX keystore password. Default: `password`
- `jmx.mina.monitor.enable`: Enable Mina monitor. Default: `false`
- `jmx.mina.poll.interval`: Mina poll interval. Default: `1000`
- `jmx.registry.create`: Always create registry in-process. Default: `true`
- `jmx.reuse.existing.server`: Reuse existing MBean server. Default: `true`
- `jmx.register.factory`: Register MBean server with factory. Default: `true`
- `jmx.daemon`: Run JMX connector threads as daemon. Default: `true`
- `jmx.threaded`: Start JMX connector server in a separate thread. Default: `true`

### Other server settings

- `so.max.events.per.update`: Max events per update. Default: `64`
- `so.scheduler.pool_size`: Scheduler pool size. Default: `4`
- `keyframe.cache.entry.max`: Max keyframe cache entries. Default: `500`
- `war.deploy.server.check.interval`: WAR deploy check interval (ms). Default: `600000`
- `fileconsumer.delayed.write`: Enable delayed file writes. Default: `true`
- `fileconsumer.queue.size`: File consumer queue size. Default: `120`
- `subscriberstream.buffer.check.interval`: Buffer check interval (ms). Default: `5000`
- `subscriberstream.underrun.trigger`: Underrun trigger threshold. Default: `100`
- `broadcaststream.auto.record`: Enable auto recording of broadcasts. Default: `false`

### Auto recording (MP4 and HLS)

- `broadcastream.auto.record.mp4`: Auto record to MP4. Default: `true`
- `broadcastream.auto.record.hls`: Auto record to HLS. Default: `true`

### Cluster DB specifications

- `clusterdb.host`: Cluster DB host. Default: `localhost`
- `clusterdb.user`: Cluster DB user. Optional.
- `clusterdb.password`: Cluster DB password. Optional.
