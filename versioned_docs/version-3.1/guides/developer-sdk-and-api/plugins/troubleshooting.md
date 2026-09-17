---
title: Troubleshooting
description: Common Ant Media Server plugin issues and how to fix them.
keywords: [Ant Media Server Plugin Troubleshooting, Plugin Debug, Ant Media Server Documentation]
sidebar_position: 6
sidebar_label: Troubleshooting
---

# Troubleshooting

Common issues when installing, loading, or running Ant Media Server plugins.

## Plugin not loading

**Symptom:** No log message confirming the plugin loaded after restart.

**Check:**

1. JAR is in `/usr/local/antmedia/plugins/`
2. File ownership is `antmedia:antmedia`
3. Main class is in the `io.antmedia.plugin` package
4. `@Component` annotation is present on the main class
5. Server was restarted after copying the JAR

```bash
ls -la /usr/local/antmedia/plugins/
grep -i plugin /usr/local/antmedia/log/ant-media-server.log | tail -20
```

## ClassNotFoundException / NoClassDefFoundError

**Symptom:** Plugin JAR is present but server logs show missing class errors.

**Fix:**

- Add missing dependencies to `pom.xml`
- Use `maven-shade-plugin` to build an uber-JAR that bundles dependencies
- Check for version conflicts with the AMS classpath

## REST endpoint not found

**Symptom:** HTTP 404 when calling your plugin REST API.

**Check:**

- REST service is in the `io.antmedia.rest` package
- `@Component` and `@Path` annotations are set correctly
- Bean name in `getPlugin()` matches `@Component(value = "plugin.your-name")` on the main class
- URL includes the correct application name: `http://host:5080/{application}/rest/your-path/`

## Listener not receiving frames

**Symptom:** Plugin loads but `onVideoFrame` / `onPacket` never fires.

**Check:**

1. `addFrameListener(streamId, listener)` was called for the active stream
2. `streamId` matches exactly — no extra whitespace or case mismatch
3. A publisher is live with that stream ID (verify in the AMS web panel)
4. Add debug logging in both registration and callback methods

```java
logger.info("Registered frame listener for stream: {}", streamId);

@Override
public AVFrame onVideoFrame(String streamId, AVFrame videoFrame) {
    logger.debug("Frame received for stream: {}", streamId);
    return videoFrame;
}
```

## Stream stuttering or high CPU

**Symptom:** Playback degrades after enabling the plugin.

**Fix:**

- Profile with a JVM profiler to find hot paths
- Move heavy processing to a background thread ([asynchronous pattern](/guides/developer-sdk-and-api/plugins/plugin-architecture/#asynchronous-processing))
- Use `IPacketListener` instead of `IFrameListener` if pixel access is not required
- Reduce logging in callback methods
- Batch writes (e.g. update stats every N frames, not every frame)

## Plugin works locally but fails on production

**Check:**

- AMS version matches the plugin's target version
- Enterprise vs Community edition compatibility
- File permissions after deployment (`chown antmedia:antmedia`)
- Firewall rules if the plugin makes outbound network calls

## Memory leaks

**Symptom:** Server memory grows over time with the plugin enabled.

**Fix:**

- Unregister listeners in `writeTrailer()` when streams end
- Remove entries from internal maps when streams finish
- Close file handles and network connections in cleanup methods
- Avoid holding references to frames or packets after callbacks return

## Getting help

- Search [GitHub Discussions](https://github.com/ant-media/Ant-Media-Server/discussions)
- Review existing plugins: [github.com/ant-media/Plugins](https://github.com/ant-media/Plugins)
- [Ant Media Marketplace](https://antmedia.io/marketplace/) for commercial plugin support

## Related guides

- [Getting Started](/guides/developer-sdk-and-api/plugins/getting-started/) — install steps
- [Develop a Plugin](/guides/developer-sdk-and-api/plugins/developing-plugins/) — API reference
- [Build Your First Plugin](/guides/developer-sdk-and-api/plugins/build-first-plugin/) — tutorial walkthrough
