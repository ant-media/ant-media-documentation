---
title: Conference Room Security
description: Video Conference Room Security with AMS
keywords: [Conference Ant Media, Ant Media conference room security, ant media conference token, ant media conference room password, ant media conference room, ant media video conference room security, Ant Media video conference, ant media conferencing, Publish, Multitrack conference, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---

# Room Security

In Ant Media Server, each participant and the conference room itself are treated as individual broadcasts. This means that all [Stream Security](/category/stream-security/) features apply to both on the conferencing as well.

By the end of this guide, you'll have token security enabled on a conference room and know how to generate and pass a token so only authorized participants can join.

## Secure Rooms With Tokens

To secure a conference room, enable token security settings for both publishing and playing through the web panel, then generate a publish token using the room's (main track) broadcast ID.

The generated publish token must be passed to both ```.publish()``` and ```.play()``` functions in conferencing. Otherwise, the participant won't be able to join the room.

A generated token can be a [JWT](/guides/stream-security/jwt-stream-security-filter/) or [One-Time Token](/guides/stream-security/one-time-token-control/). We use the JWT token for this document.

### Security with JSON Web Tokens

#### Step 1: Enable JWT Security

Go to the Ant Media Server web panel and enable JWT for both publish and play. For more details on how to do that, check the [JWT Stream Token](/guides/stream-security/jwt-stream-security-filter/) document.

#### Step 2: Generate JWT with Room ID

Generate a JWT with payload as below:

```js
{
    "type":"publish",
    "streamId":"roomId",
    "exp": jwt_expire_timestamp
}
```

You can either generate the JWT token with a JWT debugger tool (using your server's configured token secret) or via the REST API as defined in the [JWT Stream Token](/guides/stream-security/jwt-stream-security-filter/) document.

:::important
Whatever secret you sign the token with, treat it like a password — don't paste it into a screenshot, commit it to a repository, or share it outside of your own tooling. Anyone with the secret can forge a valid token for any stream on your server.
:::

#### Step 3: Join The Room Using JWT

In Ant Media Server, joining a video conference room involves both publishing to the room broadcast and playing that broadcast. Therefore, it's essential to pass the generated publish token to both the ```.publish()``` and ```.play()``` functions in the Ant Media Server SDKs.

:::info
In conferencing, even though the token type is publish, it can be used for both publishing and playing.
:::

**Example:**

```js
const joinRoom = () => {
    webrtcAdaptor.current.publish(localParticipantStreamId, publishToken, null, null, localParticipantStreamId, roomId, JSON.stringify(userStatusMetaData));
    webrtcAdaptor.current.play(roomId, publishToken)
}
```

Check [Javascript Conference Room Sample](https://github.com/ant-media/StreamApp/blob/master/src/main/webapp/conference.html#L500) for reference.

#### Step 4: Conference Room Security In Action

In this step, we will use a conference sample to do a simple conference room security test. Here is the URL format:

```https://{ams-url}:5443/{appName}/conference.html?token={YOUR_JWT_TOKEN_HERE}```

**Example:**

```https://test.antmedia.io:5443/live/conference.html?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoicHVibGlzaCIsInN0cmVhbUlkIjoidGVzdHJvb20iLCJleHAiOjk1MTYyMzkwMjJ9.Ipl8ev_jkZUfE_nPceOdj977V09qgRKu8Fc_jDCqvlA```

Conference.html sample will get the token from query parameter and pass it to ```.publish()``` and ```.play()``` functions.

Type room ID and click join room.

You should be able to successfully join the room and publish; play should start.

![](@site/static/img/conference/video-conference/room-security-2.png)

Now, open another tab. This time do not pass token as a query parameter. Optionally, you can pass a wrong token.

**Example:**

```https://test.antmedia.io:5443/live/conference.html```

Type the same room ID and click on join. Since there is no token, you won't be able to join the room.

![](@site/static/img/conference/video-conference/room-security-3.png)

### Secure Circle Conference Room

In case, you are using the Circle Conference application, the token generation steps are the same. You just need to use the below URL format to use the token with the Circle conference room.

```https://ams-domain:5443/Conference/roomId?token={YOUR_JWT_TOKEN_HERE}```

**Example:**

```https://test.antmedia.io:5443/Conference/test?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHJlYW1JZCI6InRlc3QiLCJ0eXBlIjoicHVibGlzaCIsImV4cCI6OTk5OTk5OTk5OX0.AE9DiAxsA4N1tGbg08NC4ISnXlnPaybF84psMOoDDus```

You now have token security enabled on your conference room, with participants required to present a valid JWT to join.

## Troubleshooting

| Symptom | Fix |
|---|---|
| JWT enabled for only one of publish or play | AMS tracks publish-side and play-side JWT enforcement as separate settings — enabling only one direction leaves the other reachable without a token at all, rather than failing safely (this is why Step 1 says to enable both). |
| Room ID typed into the join form doesn't match the token's `streamId` claim | The JWT was generated for a specific room ID, and you must join with that exact same room ID; even a small typo causes the join to fail. |
| `Invalid JWT Token` (HTTP 403) when accessing a recorded room's HLS, DASH, or VoD file directly | This is AMS's own play-side token check rejecting the request; confirm the token hasn't expired and its `streamId` claim matches the file's stream ID. |

## Need Help?

If the steps above don't resolve it, reach out on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or contact [Technical Support](mailto:support@antmedia.io).

