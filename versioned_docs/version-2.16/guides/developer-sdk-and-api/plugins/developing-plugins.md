---
title: Develop a Plugin
description: Plugin API reference — interfaces, registration, and CustomBroadcast for Ant Media Server.
keywords: [Ant Media Server plug-in development, custom plugins, plugin API, IFrameListener, IPacketListener, Ant Media Server Documentation]
sidebar_position: 3
sidebar_label: Develop a Plugin
---

# Develop a Plugin

Reference for the Ant Media Server plugin API. Read [Plugin Architecture](/guides/developer-sdk-and-api/plugins/plugin-architecture/) first, then follow [Build Your First Plugin](/guides/developer-sdk-and-api/plugins/build-first-plugin/) for a hands-on walkthrough.

## Prerequisites

| Requirement | Notes |
|-------------|-------|
| JDK 17 | Required for building plugins |
| Maven | Build and package JAR files |
| Git | Clone sample projects |
| [Plugin Architecture](/guides/developer-sdk-and-api/plugins/plugin-architecture/) | Understand data flow patterns before coding |

## How plugins work

Plugins intercept media streams without modifying core server code. AMS calls your listeners as frames or packets flow through the pipeline.

### Lifecycle

1. **Registration** — plugin registers listeners with `AntMediaApplicationAdaptor`
2. **Stream initialization** — receives codec, resolution, and bitrate via `setVideoStreamInfo` / `setAudioStreamInfo`
3. **Data processing** — `onVideoFrame`, `onAudioFrame`, or `onPacket` callbacks
4. **Cleanup** — `writeTrailer()` when the stream ends

### Integration points

| Component | Purpose |
|-----------|---------|
| `ApplicationContextAware` | Plugin entry point; receives Spring context on startup |
| `AntMediaApplicationAdaptor` | Register and remove frame/packet listeners |
| `IStreamListener` | Stream start/stop and conference join/leave events |
| `IFrameListener` | Decoded video/audio frames (raw pixels/samples) |
| `IPacketListener` | Encoded packets (compressed data, lower overhead) |
| Custom REST endpoints | Expose plugin functionality via HTTP (`io.antmedia.rest` package) |

---

## Plugin entry point

Your main class must:

1. Be annotated with `@Component("plugins.my_plugin")` so Spring detects it
2. Implement `ApplicationContextAware` for initialization

```java
@Component(value = "plugin.myPlugin")
public class MyPlugin implements ApplicationContextAware {

    private AntMediaApplicationAdaptor appAdaptor;
    private ApplicationContext applicationContext;
    private Vertx vertx;

    private static final Logger logger = LoggerFactory.getLogger(MyPlugin.class);

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
        this.appAdaptor = (AntMediaApplicationAdaptor) applicationContext.getBean(AntMediaApplicationAdapter.BEAN_NAME);
        this.vertx = (Vertx) applicationContext.getBean("vertxCore");
        logger.info("MyPlugin initialized");
    }
}
```

Log a ready message in `setApplicationContext` so you can confirm the plugin loaded in server logs.

---

## IFrameListener

Access decoded frames for pixel-level processing, watermarks, overlays, or ML inference.

```java
public interface IFrameListener {

    AVFrame onVideoFrame(String streamId, AVFrame videoFrame);
    AVFrame onAudioFrame(String streamId, AVFrame audioFrame);
    void setVideoStreamInfo(String streamId, StreamParametersInfo videoStreamInfo);
    void setAudioStreamInfo(String streamId, StreamParametersInfo audioStreamInfo);
    void writeTrailer();
}
```

**Return value semantics:**

| Return | Pattern | Effect |
|--------|---------|--------|
| Same frame | [Asynchronous](/guides/developer-sdk-and-api/plugins/plugin-architecture/#asynchronous-processing) | Pass unmodified data forward |
| Modified frame | [Synchronous](/guides/developer-sdk-and-api/plugins/plugin-architecture/#synchronous-processing) | Pass manipulated data forward |
| `null` | [Last point](/guides/developer-sdk-and-api/plugins/plugin-architecture/#last-point-terminal) | Stop propagation; plugin is the final destination |

---

## IPacketListener

Access encoded packets without decode overhead — useful for statistics, recording, or bitrate monitoring.

```java
public interface IPacketListener {

    AVPacket onPacket(String streamId, AVPacket packet);
    void setVideoStreamInfo(String streamId, StreamParametersInfo videoStreamInfo);
    void setAudioStreamInfo(String streamId, StreamParametersInfo audioStreamInfo);
    void writeTrailer();
}
```

Use **IPacketListener** for monitoring; use **IFrameListener** when you need pixel-level access.

---

## IStreamListener

Track stream lifecycle and conference room activity.

```java
public interface IStreamListener {

    void streamStarted(Broadcast broadcast);
    void streamFinished(Broadcast broadcast);
    void joinedTheRoom(String roomId, String streamId);
    void leftTheRoom(String roomId, String streamId);
}
```

Use cases: logging, dynamic resource allocation, external system integration.

---

## Register listeners

Register via `AntMediaApplicationAdaptor`:

```java
appAdaptor.addFrameListener(streamId, listener);
appAdaptor.removeFrameListener(streamId, listener);

appAdaptor.addPacketListener(streamId, listener);
appAdaptor.removePacketListener(streamId, listener);
```

![](@site/static/img/developer-guides/frame-lister-registration.png)

**Best practices:**

- Register when a stream starts or on demand via REST
- Always unregister in `writeTrailer()` to prevent memory leaks
- Use try-finally blocks to ensure cleanup

---

## CustomBroadcast

For the [first-point pattern](/guides/developer-sdk-and-api/plugins/plugin-architecture/#first-point-custom-broadcast) — inject streams from external sources:

```java
IFrameListener broadcast = appAdaptor.createCustomBroadcast("mystream");
// setVideoStreamInfo / setAudioStreamInfo, then feed frames via onVideoFrame / onAudioFrame
appAdaptor.stopCustomBroadcast("mystream");
```

![](@site/static/img/developer-guides/custom-broadcast-2.png)

**Workflow:**

1. `createCustomBroadcast(streamId)`
2. Set stream properties with `setVideoStreamInfo()` and `setAudioStreamInfo()`
3. Feed frames with `onVideoFrame()` / `onAudioFrame()`
4. `stopCustomBroadcast(streamId)` when done

---

## Package structure

AMS auto-discovers plugins in these packages:

| Package | Contents |
|---------|----------|
| `io.antmedia.plugin` | Main plugin class and listeners |
| `io.antmedia.rest` | REST API endpoints |
