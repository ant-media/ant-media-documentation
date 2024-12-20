---
title: Room Security
description: Video Conference Room Security with AMS
keywords: [Conference Ant Media, Ant Media conference room security, ant media conference token, ant media conference room password, ant media conference room, ant media video conference room security, Ant Media video conference, ant media conferencing, Publish, Multitrack conference, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---

# Room Security

In Ant Media Server, each participant and the conference room itself are treated as individual broadcasts. This means that all [Stream Security](https://antmedia.io/docs/category/stream-security/) features apply to conferencing as well.

## Secure Rooms With Tokens

To secure a conference room, enable related token security for both publishing and playing through the web panel, then generate a publish token using the room's (main track) broadcast ID.

The generated publish token must be passed to both ```.publish()``` and ```.play()``` functions in conferencing. Otherwise, the participant won't be able to join the room.

A generated token can be a [JWT](https://antmedia.io/docs/guides/stream-security/jwt-stream-security-filter/) or [One Time Token](https://antmedia.io/docs/guides/stream-security/one-time-token-control/). We use the JWT token for this document.

### Security with JSON Web Tokens

#### Step 1: Enable JWT Security

Go to the Ant Media Server web panel and enable JWT for both publish and play. For more details on how to do that, check [JWT Stream Security](https://antmedia.io/docs/guides/stream-security/jwt-stream-security-filter/) document.

#### Step 2: Generate JWT with Room ID

Generate a JWT with payload as below:

```js
{
    "type":"publish",
    "streamId":"roomId",
    "exp": jwt_expire_timestamp
}
```

![](@site/static/img/conference/video-conference/room-security-1.png)


You can either generate the JWT token with the JWT Debugger UI or via the Rest API as defined in the document.

#### Step 3: Join The Room Using JWT

In Ant Media Server, joining a video conference room involves both publishing to the room broadcast and playing that broadcast. Therefore, it's essential to pass the generated publish token to both the⁣ ```.publish()``` and ```.play()``` functions in the Ant Media Server SDKs.

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

```https://test.antmedia.io:5443/LiveApp/conference.html?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoicHVibGlzaCIsInN0cmVhbUlkIjoidGVzdHJvb20iLCJleHAiOjk1MTYyMzkwMjJ9.Ipl8ev_jkZUfE_nPceOdj977V09qgRKu8Fc_jDCqvlA```

Conference.html sample will get the token from query parameter and pass it to ```.publish()``` and ```.play()``` functions.

Type room ID and click join room. 

Remember, the room ID here must be the same as the ID you used while generating the JWT.

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
