---
title: Developing Plugins 
description: Comprehensive guide to developing custom plugins for Ant Media Server
keywords: [Ant Media Server plug-in development, custom plugins, plugin API, IFrameListener, IPacketListener, Ant Media Server Documentation, plugin tutorial]
sidebar_position: 3
---

:::info What you'll learn
This guide covers plugin development for Ant Media Server: implementing core interfaces, registering with AMS, and deploying your plugin.
:::

## Prerequisites

Before beginning plugin development, ensure you have:

**Development Environment:**
- JDK 17
- Maven
- Git

**Recommended Reading:**
- Review [Plugin Architecture](./plugin-architecture.md) to understand architectural patterns and use cases

---

## How Plugins Work

Plugins let you intercept and modify media streams without touching the server source code. You get direct access to decoded frames or encoded packets, which you can process, analyze, or manipulate based on your needs. 

For architectural patterns and data flow diagrams, see the [Plugin Architecture](./plugin-architecture.md) guide.

### Plugin Lifecycle

Every plugin follows a consistent lifecycle within the AMS ecosystem:

1. **Registration:** Plugin registers listeners with the AMS application adaptor
2. **Stream Initialization:** Receives stream properties (codec, resolution, bitrate)
3. **Data Processing:** Processes frames or packets as they flow through the system
4. **Cleanup:** Releases resources when streams end

### Integration Points

Plugins integrate with AMS through these interfaces:

- **ApplicationContextAware:** Plugin's main class shell implement this interface
- **AntMediaApplicationAdaptor:** Central registration and interaction point
- **IStreamListener:** Get notified when streams start/finish or participants join/leave conference rooms
- **IPacketListener:** Access to encoded packets (compressed data)
- **IFrameListener:** Access to decoded video/audio frames (raw pixel/sample data)
- **Custom REST Endpoints:** Expose plugin functionality via HTTP API

Your plugin also has access to all AMS project code.

---

## Plugin Entry Point

Every plugin requires a main entry point class that AMS discovers and initializes.

### The Main Class

Your plugin's main class must:
1.  Be annotated with `@Component("plugins.my_plugin")` (Spring Framework) so AMS detects it.
2.  Implement `ApplicationContextAware` to receive the application context.

### ApplicationContextAware Interface

This interface provides the `setApplicationContext` method, which serves as the plugin's initialization hook.

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
        
        // Get access to the Application Adaptor (core AMS interface)
        this.appAdaptor = (AntMediaApplicationAdaptor) applicationContext.getBean(AntMediaApplicationAdapter.BEAN_NAME);
        
        // Get access to Vertx (if needed for async tasks)
        this.vertx = (Vertx) applicationContext.getBean("vertxCore");
        
        logger.info("MyPlugin initialized");
    }
}
```

## Core Media Interfaces

AMS provides interfaces for accessing and manipulating media stream data.

### IFrameListener Interface

The `IFrameListener` interface gives you access to decoded frames (raw pixel data for video, raw audio samples). Use this when you need to:

- Analyze or modify pixel-level video content
- Perform image processing, computer vision, or ML inference
- Add watermarks, overlays, or visual effects
- Process raw audio samples

#### Interface Methods

```java
public interface IFrameListener {
    
    /**
     * Called when a video frame is available
     * @param streamId The unique identifier for the stream
     * @param videoFrame The decoded video frame (raw pixel data)
     * @return The frame to pass to next plugin/encoder, or null to stop propagation
     */
    AVFrame onVideoFrame(String streamId, AVFrame videoFrame);
    
    /**
     * Called when an audio frame is available
     * @param streamId The unique identifier for the stream
     * @param audioFrame The decoded audio frame (raw samples)
     * @return The frame to pass to next plugin/encoder, or null to stop propagation
     */
    AVFrame onAudioFrame(String streamId, AVFrame audioFrame);
    
    /**
     * Called once at stream start with video properties
     * @param streamId The unique identifier for the stream
     * @param videoStreamInfo Codec, resolution, framerate, etc.
     */
    void setVideoStreamInfo(String streamId, StreamParametersInfo videoStreamInfo);
    
    /**
     * Called once at stream start with audio properties
     * @param streamId The unique identifier for the stream
     * @param audioStreamInfo Codec, sample rate, channels, etc.
     */
    void setAudioStreamInfo(String streamId, StreamParametersInfo audioStreamInfo);
    
    /**
     * Called when stream ends - perform cleanup here
     */
    void writeTrailer();
}
```

#### Return Value Semantics

The return value from `onVideoFrame()` and `onAudioFrame()` determines data flow:

- **Return same frame:** Pass unmodified data to next stage ([Asynchronous pattern](./plugin-architecture.md#asynchronous-case))
- **Return modified frame:** Pass your manipulated data forward ([Synchronous pattern](./plugin-architecture.md#synchronous-case))
- **Return null:** Stop frame propagation, plugin is final destination ([Last Point pattern](./plugin-architecture.md#last-point-case))

See [Plugin Architecture - Use Cases](./plugin-architecture.md#use-cases) for more details.

### IPacketListener Interface

The `IPacketListener` interface gives you access to encoded packets (compressed video/audio data). Use this when you need to:

- Analyze stream metadata without decoding overhead
- Record or transmit packets directly
- Monitor bitrates, packet timing, or network statistics
- Work with compressed data formats

#### Interface Methods

```java
public interface IPacketListener {
    
    /**
     * Called when an encoded packet is available
     * @param streamId The unique identifier for the stream
     * @param packet The encoded packet (may be video or audio)
     * @return The packet to pass forward, modified packet, or null
     */
    AVPacket onPacket(String streamId, AVPacket packet);
    
    /**
     * Called once at stream start with video properties
     */
    void setVideoStreamInfo(String streamId, StreamParametersInfo videoStreamInfo);
    
    /**
     * Called once at stream start with audio properties
     */
    void setAudioStreamInfo(String streamId, StreamParametersInfo audioStreamInfo);
    
    /**
     * Called when stream ends - perform cleanup here
     */
    void writeTrailer();
}
```

#### Performance Considerations

- Use **IPacketListener** for statistics/monitoring (no decode overhead)
- Use **IFrameListener** for pixel-level manipulation (requires decode/encode cycles)

### IStreamListener Interface

The `IStreamListener` interface notifies your plugin about stream lifecycle events and conference room activity. Use this when you need to:

- Track when streams start and stop
- Monitor conference room participants
- Initialize or cleanup resources based on stream events
- Trigger actions when users join/leave conference rooms

#### Interface Methods

```java
public interface IStreamListener {
    
    /**
     * Called when a stream starts
     * @param broadcast The broadcast object containing stream details
     */
    void streamStarted(Broadcast broadcast);
    
    /**
     * Called when a stream finishes
     * @param broadcast The broadcast object containing stream details
     */
    void streamFinished(Broadcast broadcast);
    
    /**
     * Called when a participant joins a conference room
     * @param roomId The conference room ID
     * @param streamId The participant's stream ID
     */
    void joinedTheRoom(String roomId, String streamId);
    
    /**
     * Called when a participant leaves a conference room
     * @param roomId The conference room ID
     * @param streamId The participant's stream ID
     */
    void leftTheRoom(String roomId, String streamId);
}
```

**Use Cases:**
- Logging and analytics (track stream durations, participant counts)
- Dynamic resource allocation (spin up processing when streams start)
- Notifications (alert users when conference participants join/leave)
- Integration with external systems (update databases, trigger webhooks)

---

## Registration and Lifecycle Management

Once your plugin is initialized and you have access to `AntMediaApplicationAdaptor`, you must register your listeners to start receiving data.

### Listener Registration

Listeners are registered via the `AntMediaApplicationAdaptor` class.


### Registration Methods

Methods to register and unregister listeners:

```java
public class AntMediaApplicationAdaptor .... {
    
    // Frame listener registration
    public void addFrameListener(String streamId, IFrameListener listener);
    public void removeFrameListener(String streamId, IFrameListener listener);
    
    // Packet listener registration
    public void addPacketListener(String streamId, IPacketListener listener);
    public void removePacketListener(String streamId, IPacketListener listener);
}
```

**Registration Flow:**

<div style={{textAlign: 'center'}}>

![](@site/static/img/developer-guides/frame-lister-registration.png)

</div>

**Best Practices:**
- Register listeners when stream starts or on-demand via REST API
- Always unregister in `writeTrailer()` to prevent memory leaks
- Use try-finally blocks to ensure cleanup
- Support dynamic registration/unregistration

### Custom Broadcast Integration

For the **[First Point](./plugin-architecture.md#first-point-case)** use case (plugin as stream source), use Custom Broadcast to inject streams into AMS from external sources.

#### Custom Broadcast API

```java
public class AntMediaApplicationAdaptor {
    
    /**
     * Creates a custom broadcast stream
     * @param streamId Unique identifier for the new stream
     * @return IFrameListener to receive your frames
     */
    public IFrameListener createCustomBroadcast(String streamId);
    
    /**
     * Stops a custom broadcast stream
     * @param streamId The stream to stop
     */
    public void stopCustomBroadcast(String streamId);
}
```

#### Custom Broadcast Workflow

<div style={{textAlign: 'center'}}>

![](@site/static/img/developer-guides/custom-broadcast-2.png)

</div>

**Implementation Steps:**

1. **Create the custom broadcast:** `IFrameListener broadcast = createCustomBroadcast("mystream")`
2. **Set stream properties:** Call `setVideoStreamInfo()` and `setAudioStreamInfo()` on the broadcast
2. **Start the broadcast:**? TODO: check this? Call `start()` on the broadcast
3. **Feed frames:** Call `onVideoFrame()` and `onAudioFrame()` with your data
4. **Cleanup:** Call `stopCustomBroadcast()` when done

**Use Cases:**
- Ingesting streams from proprietary protocols
- Generating synthetic video (test patterns, overlays)
- Bridging from external streaming platforms
- AI-generated content injection

---

## Building Your First Plugin

We'll build a statistics collector plugin that tracks frame counts and exposes them via REST API. Start with the sample plugin, verify it works, then customize it.

> **Sample Plugin Repository:** [https://github.com/ant-media/Plugins/tree/master/SamplePlugin](https://github.com/ant-media/Plugins/tree/master/SamplePlugin)

### Step 1: Get the Sample Plugin

Clone the sample plugin repository:

```bash
git clone https://github.com/ant-media/Plugins.git
cd Plugins/SamplePlugin
```

The sample plugin structure:

```
SamplePlugin/
├── pom.xml                          # Maven configuration
├── src/main/java/
│   └── io/antmedia/
│       ├── plugin/
│       │   └── SamplePlugin.java          # Main plugin class
│       ├── app/
│       │   ├── SampleFrameListener.java   # Frame processing
│       │   └── SamplePacketListener.java  # Packet processing
│       └── rest/
│           └── SampleRestService.java     # REST API endpoints
└── README.md
```

**Key Requirements:**
- Plugin main class must be in `io.antmedia.plugin` package
- REST services must be in `io.antmedia.rest` package

AMS automatically discovers plugins in these packages.

### Step 2: Build the Sample Plugin

Build the plugin using Maven:

```bash
mvn clean install -Dmaven.javadoc.skip=true -Dmaven.test.skip=true -Dgpg.skip=true
```

This generates a JAR file in the `target/` directory, typically named `SamplePlugin-1.0.0.jar`.

### Step 3: Deploy and Verify

Deploy your plugin following the [installation procedure](./getting-started.md#plugin-intallation-guide):

1. **Copy the JAR file** to the plugins directory:
   ```bash
   sudo cp target/SamplePlugin-1.0.0.jar /usr/local/antmedia/plugins/
   ```

2. **Set proper ownership:**
   ```bash
   sudo chown antmedia:antmedia /usr/local/antmedia/plugins/SamplePlugin-1.0.0.jar
   ```

3. **Restart AMS:**
   ```bash
   sudo service antmedia restart
   ```

4. **Verify the plugin loaded:**
   ```bash
   cat /usr/local/antmedia/log/ant-media-server.log | grep "SampleFrameListener"
   ```

You should see log entries indicating the plugin has been loaded. If not, see the [Troubleshooting](#troubleshooting) section.

### Step 4: Customize for Statistics Collection

Now that the sample plugin works, let's customize it to collect frame statistics.

First, copy the project to a new directory for your custom plugin:

```bash
# From the Plugins directory
cp -r SamplePlugin /path/to/your/StatsPlugin
cd /path/to/your/StatsPlugin
```

Update `pom.xml` with your plugin details:

```xml
<groupId>io.antmedia.plugin</groupId>
<artifactId>stats-plugin</artifactId>
<version>1.0.0</version>
<name>Statistics Collection Plugin</name>
```

### Step 5: Implement the Frame Listener

Create `StatsFrameListener.java` in `io.antmedia.plugin`:

```java
package io.antmedia.plugin;

public class StatsFrameListener implements IFrameListener {
    private long videoFrameCount = 0;
    private long audioFrameCount = 0;
    private String streamId;
    
    public StatsFrameListener(String streamId) {
        this.streamId = streamId;
    }
    
    @Override
    public AVFrame onVideoFrame(String streamId, AVFrame videoFrame) {
        videoFrameCount++;
        // Return same frame (Asynchronous pattern - no modification)
        return videoFrame;
    }
    
    @Override
    public AVFrame onAudioFrame(String streamId, AVFrame audioFrame) {
        audioFrameCount++;
        return audioFrame;
    }
    
    @Override
    public void setVideoStreamInfo(String streamId, StreamParametersInfo info) {
    }
    
    @Override
    public void setAudioStreamInfo(String streamId, StreamParametersInfo info) {
    }
    
    @Override
    public void writeTrailer() {
        videoFrameCount = 0;
        audioFrameCount = 0;
    }
    
    public long getVideoFrameCount() { return videoFrameCount; }
    public long getAudioFrameCount() { return audioFrameCount; }
}
```

### Step 6: Implement the Main Plugin Class

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
        if (listeners.containsKey(streamId)) {
            return false;
        }
        
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
        if (listener != null) {
            return new StreamStats(
                listener.getVideoFrameCount(),
                listener.getAudioFrameCount()
            );
        }
        return null;
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

**Key Points:**
- `@Component(value = "plugin.stats-plugin")` registers the plugin as a Spring bean with a specific name
- Implements `ApplicationContextAware` to get access to Spring's ApplicationContext
- `setApplicationContext()` retrieves the AntMediaApplicationAdapter from Spring context

### Step 7: Create REST API Endpoints

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
        return Response.ok()
            .entity("{\"success\":" + success + "}")
            .build();
    }
    
    @GET
    @Path("/stats/{streamId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getStats(@PathParam("streamId") String streamId) {
        StatsPlugin.StreamStats stats = getPlugin().getStats(streamId);
        if (stats != null) {
            return Response.ok(stats).build();
        }
        return Response.status(404)
            .entity("{\"error\":\"Stream not found\"}")
            .build();
    }
    
    private StatsPlugin getPlugin() {
        ApplicationContext appCtx = (ApplicationContext) servletContext
            .getAttribute(WebApplicationContext.ROOT_WEB_APPLICATION_CONTEXT_ATTRIBUTE);
        return (StatsPlugin) appCtx.getBean("plugin.stats-plugin");
    }
    
    public void setServletContext(ServletContext servletContext) {
        this.servletContext = servletContext;
    }
}
```

**Key Points:**
- `@Component` registers the service with Spring
- `@Context ServletContext` injects the servlet context
- `getPlugin()` retrieves the plugin bean from Spring's ApplicationContext
- Bean name format: `"plugin.{your-plugin-name}"`

### Step 8: Rebuild and Redeploy

Now rebuild your customized statistics plugin:

```bash
mvn clean install -Dmaven.javadoc.skip=true -Dmaven.test.skip=true -Dgpg.skip=true
```

Deploy the updated plugin:

```bash
# Copy the new JAR
sudo cp target/stats-plugin-1.0.0.jar /usr/local/antmedia/plugins/

# Set ownership
sudo chown antmedia:antmedia /usr/local/antmedia/plugins/stats-plugin-1.0.0.jar

# Restart AMS
sudo service antmedia restart

# Verify the stats plugin loaded
cat /usr/local/antmedia/log/ant-media-server.log | grep "stats-plugin"
```

---

## Testing Your Statistics Plugin

### Integration Testing

1. Start publishing a stream to your AMS instance
2. Register the stream with your plugin via REST API
3. Let it run for a few seconds
4. Query statistics and verify counts are incrementing
5. Stop the stream and verify cleanup

### REST API Calls

Test the registration endpoint:

```bash
curl -X POST -H "Accept: application/json" \
  http://localhost:5080/WebRTCAppEE/rest/stats-plugin/register/stream1
```

Retrieve statistics:

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

---

## Best Practices and Optimization

### General notes
- Always put log after your plugin is booted up and ready, in ```setApplicationContext``` method. (EX: logger.log("Stats pluin ready!"))
- 

### Thread Safety

- Listener methods are called from AMS processing threads - make sure your code is thread-safe
- Don't block in `onVideoFrame()`/`onPacket()` - it blocks stream processing
- Keep in mind that callbacks from multiple plugins can be called sequentially on same thread 
- Offload heavy processing to separate threads
- Use `ConcurrentHashMap` for shared state

### Performance Optimization

- Keep processing time in callbacks under 1ms
- Reuse objects instead of creating new ones per frame
- Profile with JVM tools to find bottlenecks
- Use packet listeners for statistics (lower overhead)
- Batch operations when possible (EX: write stats every N frames, not every frame)

### Error Handling

- Never throw uncaught exceptions from listener methods (crashes stream processing)
- Wrap processing logic in try-catch blocks
- Avoid excessive logging in hot paths
- Handle errors gracefully (skip frame on error, don't stop stream)

### Logging

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

private static final Logger logger = LoggerFactory.getLogger(StatsPlugin.class);

@Override
public AVFrame onVideoFrame(String streamId, AVFrame videoFrame) {
    try {
        // Processing logic
    } catch (Exception e) {
        logger.error("Error processing frame for stream {}", streamId, e);
    }
    return videoFrame;
}
```

### Resource Management

- Always unregister listeners in `writeTrailer()` or plugin shutdown
- Close file handles and network connections in cleanup methods
- Implement plugin lifecycle methods for initialization/shutdown

---

## Troubleshooting

### Plugin Not Loading

**Symptom:** No log messages indicating plugin loaded

**Solutions:**
- Verify JAR file is in `/usr/local/antmedia/plugins/`
- Check package structure: main class in `io.antmedia.plugins`
- Ensure file permissions: owned by `antmedia:antmedia`
- Review server logs: `/usr/local/antmedia/log/ant-media-server.log`

### ClassNotFoundException or NoClassDefFoundError

**Symptom:** Plugin loads but crashes with missing class errors

**Solutions:**
- Add missing dependencies to `pom.xml`
- Use `maven-shade-plugin` to create uber-jar with dependencies
- Check for conflicts with AMS classpath

### Listener Not Receiving Frames

**Symptom:** Plugin loads but callback methods never called

**Solutions:**
- Verify registration occurred (`addFrameListener` was called)
- Confirm stream ID matches exactly (check for whitespace/case issues)
- Ensure stream is actually publishing (check AMS dashboard)
- Add debug logging to registration and callback methods

### Performance Issues

**Symptom:** Stream stuttering or high CPU usage

**Solutions:**
- Profile plugin with JVM profiler
- Move heavy processing to background threads (Asynchronous pattern)
- Reduce logging verbosity
- Consider packet listener instead of frame listener if appropriate

---

## Next Steps

### Community Plugin Examples

Check out existing plugins for ideas and patterns:

- **[Filter Plugin](./plugins-for-ant-media-server.md):** Real-time audio/video manipulation, MCU conferencing
- **[TensorFlow Plugin](./plugins-for-ant-media-server.md):** AI/ML integration patterns
- **[Python Plugin](https://github.com/ant-media/Plugins/tree/master/PythonPlugin):** Pass processing to Python scripts
- **[Clip Creator Plugin](https://github.com/ant-media/Plugins/tree/master/ClipCreatorPlugin):** Generate MP4 clips from HLS segments

Browse all examples at [github.com/ant-media/Plugins](https://github.com/ant-media/Plugins).

### Get Involved

- Share your plugins on [GitHub Discussions](https://github.com/ant-media/Ant-Media-Server/discussions)
- Submit contributions to the [official plugins repository](https://github.com/ant-media/Plugins)