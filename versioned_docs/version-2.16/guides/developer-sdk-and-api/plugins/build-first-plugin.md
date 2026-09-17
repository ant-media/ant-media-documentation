---
title: Build Your First Plugin
description: Step-by-step tutorial — clone the sample plugin, deploy it, and build a statistics collector.
keywords: [Ant Media Server Plugin Tutorial, Sample Plugin, Ant Media Server Documentation]
sidebar_position: 4
sidebar_label: Build Your First Plugin
---

# Build Your First Plugin

Build a statistics collector plugin that counts video and audio frames and exposes counts via REST API. Start with the official sample, verify it works, then customize it.

Sample repository: [SamplePlugin on GitHub](https://github.com/ant-media/Plugins/tree/master/SamplePlugin)

Read [Develop a Plugin](/guides/developer-sdk-and-api/plugins/developing-plugins/) for the API reference.

## Step 1: Clone the sample

```bash
git clone https://github.com/ant-media/Plugins.git
cd Plugins/SamplePlugin
```

Project layout:

```
SamplePlugin/
├── pom.xml
├── src/main/java/io/antmedia/
│   ├── plugin/
│   │   └── SamplePlugin.java          # Main plugin class
│   ├── app/
│   │   ├── SampleFrameListener.java   # Frame processing
│   │   └── SamplePacketListener.java  # Packet processing
│   └── rest/
│       └── SampleRestService.java     # REST endpoints
└── README.md
```

Main class goes in `io.antmedia.plugin`; REST services in `io.antmedia.rest`.

## Step 2: Build the JAR

```bash
mvn clean install -Dmaven.javadoc.skip=true -Dmaven.test.skip=true -Dgpg.skip=true
```

Output: `target/SamplePlugin-1.0.0.jar`

## Step 3: Deploy and verify

Follow the [Getting Started](/guides/developer-sdk-and-api/plugins/getting-started/) install steps:

```bash
sudo cp target/SamplePlugin-1.0.0.jar /usr/local/antmedia/plugins/
sudo chown antmedia:antmedia /usr/local/antmedia/plugins/SamplePlugin-1.0.0.jar
sudo service antmedia restart
grep SampleFrameListener /usr/local/antmedia/log/ant-media-server.log
```

If the plugin does not appear in logs, see [Troubleshooting](/guides/developer-sdk-and-api/plugins/troubleshooting/).

## Step 4: Create your custom plugin

Copy the sample to a new directory:

```bash
cp -r SamplePlugin /path/to/StatsPlugin
cd /path/to/StatsPlugin
```

Update `pom.xml`:

```xml
<groupId>io.antmedia.plugin</groupId>
<artifactId>stats-plugin</artifactId>
<version>1.0.0</version>
<name>Statistics Collection Plugin</name>
```

## Step 5: Add a frame listener

Create `StatsFrameListener.java` in `io.antmedia.plugin`:

```java
package io.antmedia.plugin;

public class StatsFrameListener implements IFrameListener {
    private long videoFrameCount = 0;
    private long audioFrameCount = 0;

    public StatsFrameListener(String streamId) { }

    @Override
    public AVFrame onVideoFrame(String streamId, AVFrame videoFrame) {
        videoFrameCount++;
        return videoFrame;  // pass through unchanged
    }

    @Override
    public AVFrame onAudioFrame(String streamId, AVFrame audioFrame) {
        audioFrameCount++;
        return audioFrame;
    }

    @Override
    public void setVideoStreamInfo(String streamId, StreamParametersInfo info) { }

    @Override
    public void setAudioStreamInfo(String streamId, StreamParametersInfo info) { }

    @Override
    public void writeTrailer() {
        videoFrameCount = 0;
        audioFrameCount = 0;
    }

    public long getVideoFrameCount() { return videoFrameCount; }
    public long getAudioFrameCount() { return audioFrameCount; }
}
```

## Step 6: Add the main plugin class

Create `StatsPlugin.java` in `io.antmedia.plugin`:

```java
package io.antmedia.plugin;

@Component(value = "plugin.stats-plugin")
public class StatsPlugin implements ApplicationContextAware {

    private AntMediaApplicationAdapter appAdaptor;
    private ConcurrentHashMap<String, StatsFrameListener> listeners = new ConcurrentHashMap<>();

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        appAdaptor = (AntMediaApplicationAdapter) applicationContext.getBean(AntMediaApplicationAdapter.BEAN_NAME);
    }

    public boolean register(String streamId) {
        if (listeners.containsKey(streamId)) return false;
        StatsFrameListener listener = new StatsFrameListener(streamId);
        appAdaptor.addFrameListener(streamId, listener);
        listeners.put(streamId, listener);
        return true;
    }

    public boolean unregister(String streamId) {
        StatsFrameListener listener = listeners.remove(streamId);
        if (listener != null) {
            appAdaptor.removeFrameListener(streamId, listener);
            return true;
        }
        return false;
    }

    public StreamStats getStats(String streamId) {
        StatsFrameListener listener = listeners.get(streamId);
        return listener != null
            ? new StreamStats(listener.getVideoFrameCount(), listener.getAudioFrameCount())
            : null;
    }

    public static class StreamStats {
        public long videoFrames;
        public long audioFrames;
        public StreamStats(long video, long audio) {
            this.videoFrames = video;
            this.audioFrames = audio;
        }
    }
}
```

## Step 7: Add REST endpoints

Create `RestService.java` in `io.antmedia.rest`:

```java
package io.antmedia.rest;

@Component
@Path("/stats-plugin")
public class RestService {

    @Context
    protected ServletContext servletContext;

    @POST
    @Path("/register/{streamId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response register(@PathParam("streamId") String streamId) {
        boolean success = getPlugin().register(streamId);
        return Response.ok().entity("{\"success\":" + success + "}").build();
    }

    @GET
    @Path("/stats/{streamId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getStats(@PathParam("streamId") String streamId) {
        StatsPlugin.StreamStats stats = getPlugin().getStats(streamId);
        if (stats != null) return Response.ok(stats).build();
        return Response.status(404).entity("{\"error\":\"Stream not found\"}").build();
    }

    private StatsPlugin getPlugin() {
        ApplicationContext appCtx = (ApplicationContext) servletContext
            .getAttribute(WebApplicationContext.ROOT_WEB_APPLICATION_CONTEXT_ATTRIBUTE);
        return (StatsPlugin) appCtx.getBean("plugin.stats-plugin");
    }
}
```

## Step 8: Rebuild and redeploy

```bash
mvn clean install -Dmaven.javadoc.skip=true -Dmaven.test.skip=true -Dgpg.skip=true
sudo cp target/stats-plugin-1.0.0.jar /usr/local/antmedia/plugins/
sudo chown antmedia:antmedia /usr/local/antmedia/plugins/stats-plugin-1.0.0.jar
sudo service antmedia restart
grep stats-plugin /usr/local/antmedia/log/ant-media-server.log
```

## Step 9: Test

1. Publish a stream to AMS
2. Register it with the plugin
3. Query stats and confirm counts increment
4. Stop the stream and verify cleanup

**Register a stream:**

```bash
curl -X POST -H "Accept: application/json" \
  http://localhost:5080/WebRTCAppEE/rest/stats-plugin/register/stream1
```

**Get statistics:**

```bash
curl -X GET -H "Accept: application/json" \
  http://localhost:5080/WebRTCAppEE/rest/stats-plugin/stats/stream1
```

Expected response:

```json
{
  "videoFrames": 1524,
  "audioFrames": 2156
}
```

## Best practices

| Topic | Guideline |
|-------|-----------|
| **Thread safety** | Listener callbacks run on AMS threads — use `ConcurrentHashMap` for shared state |
| **Performance** | Keep callback processing under 1 ms; offload heavy work to background threads |
| **Error handling** | Never throw uncaught exceptions from listeners — wrap in try-catch |
| **Logging** | Log plugin ready in `setApplicationContext`; avoid verbose logging in hot paths |
| **Cleanup** | Always unregister listeners in `writeTrailer()` or plugin shutdown |
| **Listener choice** | Use `IPacketListener` for stats/monitoring; `IFrameListener` for pixel manipulation |

```java
private static final Logger logger = LoggerFactory.getLogger(StatsPlugin.class);

@Override
public AVFrame onVideoFrame(String streamId, AVFrame videoFrame) {
    try {
        // processing
    } catch (Exception e) {
        logger.error("Error processing frame for stream {}", streamId, e);
    }
    return videoFrame;
}
```
