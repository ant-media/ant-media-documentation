---
title: WebRTC Publish & Play Issues
description: Troubleshoot WebRTC publish and playback failures in Ant Media Server, including no_stream_exist, choppy or pixelated streams, and codec errors.
keywords: [WebRTC troubleshooting, no_stream_exist, choppy stream, pixelated stream, Ant Media Server Documentation]
sidebar_position: 2
---

# WebRTC Publish & Play Issues

This guide covers the most common WebRTC publishing and playback problems, in a symptom-first format.

## The stream does not publish at all

**Symptom:** Clicking publish on the sample page (or calling `publish()` in the JavaScript SDK) does nothing, or the connection drops immediately.

**Check:**

1. Open the browser developer console (F12) and look for WebSocket or ICE errors.
2. Confirm the WebSocket endpoint is reachable. For secure origins it must be `wss://YOUR_DOMAIN:5443/{app}/websocket`. Browsers block camera/microphone access and mixed content on non-HTTPS pages, so [SSL must be configured](/guides/installing-on-linux/setting-up-ssl/).
3. Verify the required UDP port range **50000–60000** is open on your firewall/security group. If only TCP 80/443 are open (restricted network), you need a [TURN server](/guides/troubleshooting/ssl-and-turn-issues/).
4. Run the built-in connectivity test: `https://YOUR_DOMAIN:5443/live/webrtc-test-tool.html`

**Resolution:** Fix SSL first, then ports, then TURN. In the vast majority of cases the failure is one of these three.

## Playback fails with `no_stream_exist`

**Symptom:** The player reports `no_stream_exist` even though the publisher appears connected.

**Check:**

1. Verify the stream is actually live: check the Web Panel application page under **Live Streams**, or call `GET /{app}/rest/v2/broadcasts/{streamId}`. The broadcast `status` field should be `broadcasting`.
2. If adaptive bitrate (ABR) is enabled, this error can occur when the incoming stream resolution is lower than every configured ABR resolution. Make sure at least one ABR resolution is equal to or lower than the published stream resolution. You can check your camera's resolution capability with [this WebRTC sample](https://webrtc.github.io/samples/src/content/getusermedia/resolution/).
3. In a cluster, see [Cluster Issues](/guides/troubleshooting/cluster-issues/) — the edge node may not be able to reach the origin node.

**Resolution:** Align your [adaptive bitrate settings](/guides/adaptive-bitrate/adaptive-bitrate-streaming/) with the actual publish resolution, or publish at a higher resolution.

## `notSetRemoteDescription` error

**Symptom:** The SDK raises `notSetRemoteDescription` during connection setup.

**Check:** Your device or browser may not support the H.264 codec. Verify codec support at [this test page](https://mozilla.github.io/webrtc-landing/pc_test_no_h264.html).

**Resolution:** Use a browser/device with H.264 support, or enable an alternative codec (VP8 is available in Enterprise Edition — see [video codecs](/guides/configuration-and-testing/video-codecs/)).

## Choppy streams

**Symptom:** Video stutters or freezes intermittently.

**Check:**

1. Test the viewer's and publisher's connection quality with the built-in test page: `https://YOUR_DOMAIN:5443/live/webrtc-test-tool.html`
2. If you ingest RTMP and play with WebRTC, check whether the RTMP stream contains **B-frames**. WebRTC does not accept B-frames, and streams containing them will be choppy.

**Resolution:** For the B-frame case, set the H.264 profile to **baseline** on the encoder side (for example in OBS: Output > Advanced > Profile). For network-related choppiness, lower the publish bitrate/resolution or enable [adaptive bitrate](/guides/adaptive-bitrate/adaptive-bitrate-streaming/).

## Pixelated video

**Symptom:** The stream plays but looks blocky, especially on fast motion.

**Check:** Pixelation almost always means the bitrate is too low for the resolution and scene complexity.

**Resolution:**

- Increase the bitrate on the publisher side (WebRTC publish page settings, OBS, or your RTMP encoder). Note that a higher bitrate requires more bandwidth; if bandwidth is limited, decrease the resolution instead.
- If ABR is enabled, review the bitrate assigned to each resolution in your ABR settings. The defaults are chosen to prevent pixelation; if you lowered them, restore sensible values.
- To prevent low-quality publishers from degrading the experience, consider [enforcing stream quality](/guides/adaptive-bitrate/enforcing-stream-quality/).

## Autoplay does not start in Chrome or Firefox

**Symptom:** Playback only starts after the user interacts with the page.

**Check:** This is browser autoplay policy, not a server issue:

- [Chrome autoplay policy](https://developers.google.com/web/updates/2017/09/autoplay-policy-changes)
- [Firefox autoplay guide](https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide#The_autoplay_feature_policy)

**Resolution:** Start playback muted (`muted` attribute) and let the user unmute, or require a user gesture to start playback.

## Publish or play fails with `unauthorized_access`

**Symptom:** The SDK callback reports `unauthorized_access`.

**Check:** One of the stream security mechanisms is enabled and the client did not provide a valid token/credential. Review which of these is active in your application settings: [one-time tokens](/guides/stream-security/one-time-token-control/), [JWT stream security](/guides/stream-security/jwt-stream-security-filter/), [hash-based tokens](/guides/stream-security/hash-based-token/), [TOTP](/guides/stream-security/time-based-one-time-password/), or [webhook authorization](/guides/stream-security/webhook-stream-authorization/).

**Resolution:** Provide the expected token in the publish/play request, or disable the security feature if it was enabled unintentionally. Note that expired TOTP codes also produce this error.

## Related documentation

- [WebRTC publishing guide](/guides/publish-live-stream/webrtc/)
- [WebRTC playback guide](/guides/playing-live-stream/webrtc-playback/)
- [WebRTC WebSocket messaging reference](/guides/publish-live-stream/webrtc/webrtc-websocket-messaging-reference/)
- [Measuring end-to-end latency](/guides/configuration-and-testing/measure-end-to-end-latency/)
