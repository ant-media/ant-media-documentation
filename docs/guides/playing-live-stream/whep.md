---
title: WHEP
description: Play WebRTC streams from Ant Media Server with the WebRTC-HTTP Egress Protocol (WHEP).
keywords: [WHEP, WHEP playback with Ant Media Server, WebRTC, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---

# WHEP (WebRTC-HTTP Egress Protocol)

WHEP (WebRTC-HTTP Egress Protocol) is the playback counterpart of [WHIP](/guides/publish-live-stream/webrtc/whip/). Instead of Ant Media Server's WebSocket signaling, a WHEP player sets up the WebRTC session with plain HTTP requests: it sends an SDP offer with `POST`, gets the SDP answer back in the response, and ends the session with `DELETE`. Any player or library that supports WHEP can play streams from Ant Media Server without the Ant Media WebRTC SDK.

Ant Media Server supports WHEP playback starting with version 4.0.

By the end of this guide, you'll be playing a live stream over WHEP, either from the sample page or from your own JavaScript.

## Requirements

- Ant Media Server **Enterprise Edition** v4.0 or later. Community Edition rejects WHEP requests with `403`.
- UDP ports `50000-60000` open on your server's firewall for WebRTC traffic.
- An active stream already broadcasting on the server. See [WebRTC Publishing](/guides/publish-live-stream/webrtc/) or [WHIP](/guides/publish-live-stream/webrtc/whip/) if you haven't started one yet.
- A [TURN server](/guides/advanced-usage/turn-installation/coturn-quick-installation/) if viewers are behind restrictive corporate firewalls (optional).

## Benefits of WHEP

1.  **Standard Signaling**: WHEP replaces custom WebSocket signaling with a standard HTTP exchange, so playback works the same way across WHEP-compatible servers.
2.  **Interoperability**: Third-party WHEP players and libraries can play Ant Media Server streams without any Ant Media specific code.
3.  **Ease of Integration**: Anything that can make an HTTP request can start and stop a session. There is no WebSocket connection to keep open.
4.  **Pairs with WHIP**: Publish with WHIP and play with WHEP to keep the whole workflow on standard HTTP signaling.

## WHEP Endpoint

| Action | Request |
| ------ | ------- |
| Start playing | `POST https://<DOMAIN_NAME>:5443/<APP_NAME>/whep/<STREAM_ID>` with the SDP offer as the body and `Content-Type: application/sdp` |
| Stop playing | `DELETE https://<DOMAIN_NAME>:5443/<APP_NAME>/whep/<STREAM_ID>/<ETAG>` |

When playback starts, the `POST` returns `202 Accepted` with the SDP answer in the body and the session ID in the `ETag` header. Keep the `ETag` value, since the `DELETE` request uses it to identify the session to stop.

If the stream can't be played (for example, it doesn't exist or the token is invalid), the `POST` returns `403` with the reason in the body. A `DELETE` for an unknown session returns `404`.

The `POST` request also accepts these optional parameters:

- `Authorization` header: the play token, if the stream is protected with a [one-time token, JWT, or TOTP](/category/stream-security/). Pass the token itself as the header value.
- `subscriberId` query parameter: the subscriber ID, for [TOTP](/guides/stream-security/totp/) protected streams.
- `viewerInfo` query parameter: free-form text about the viewer, stored with the viewer's session.

## Play with the Sample Page

Ant Media Server ships a WHEP sample page, `whep.html`, that plays a stream using the steps described in the next section.

1. Visit `https://<DOMAIN_NAME>:5443/live/whep.html`.
2. If you're running Ant Media Server on your local computer, you can also visit `http://localhost:5080/live/whep.html`.
3. Write the stream ID in the text box, `stream1` by default.
4. Press the `Start Playing` button. The stream starts playing in the page.
5. Press the `Stop Playing` button to end the WHEP session.

## Play with Your Own JavaScript

To play a stream over WHEP in your own web page, create a receive-only `RTCPeerConnection`, send its offer to the WHEP endpoint, and apply the answer:

```html
<video id="video" autoplay playsinline controls></video>

<script>
  const whepUrl = "https://<DOMAIN_NAME>:5443/<APP_NAME>/whep/<STREAM_ID>";
  const video = document.getElementById("video");
  let pc;
  let eTag;

  async function startPlaying() {
    pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun1.l.google.com:19302" }] });
    pc.ontrack = (event) => { video.srcObject = event.streams[0]; };

    // Receive only: the player doesn't send any media
    pc.addTransceiver("audio", { direction: "recvonly" });
    pc.addTransceiver("video", { direction: "recvonly" });

    await pc.setLocalDescription(await pc.createOffer());

    // Wait for ICE gathering so the offer carries all candidates
    await new Promise((resolve) => {
      if (pc.iceGatheringState === "complete") return resolve();
      pc.addEventListener("icegatheringstatechange", () => {
        if (pc.iceGatheringState === "complete") resolve();
      });
    });

    const response = await fetch(whepUrl, {
      method: "POST",
      headers: { "Content-Type": "application/sdp" },
      body: pc.localDescription.sdp,
    });
    if (!response.ok) {
      throw new Error(`WHEP request failed: ${response.status}`);
    }

    eTag = response.headers.get("ETag");
    await pc.setRemoteDescription({ type: "answer", sdp: await response.text() });
  }

  async function stopPlaying() {
    await fetch(`${whepUrl}/${eTag}`, { method: "DELETE" });
    pc.close();
    video.srcObject = null;
  }
</script>
```

Replace `<DOMAIN_NAME>`, `<APP_NAME>`, and `<STREAM_ID>` with your own values, then call `startPlaying()` and `stopPlaying()` from your page's controls. If the stream is token protected, add the token to the `POST` request's headers as `Authorization`.

You're now playing a live stream from Ant Media Server over WHEP. To publish with the same standard HTTP signaling, see [WHIP](/guides/publish-live-stream/webrtc/whip/).

## Need Help?

If the `POST` returns `403`, check that the stream is actually broadcasting and that your token is valid. If it succeeds but no video appears, confirm UDP ports 50000-60000 are reachable, then reach out on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or contact [Technical Support](mailto:support@antmedia.io).
