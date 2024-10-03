---
title: Room Security
description: Video Conference room security, video conference room, details and tutorial with ant media server
keywords: [Conference Ant Media, Ant Media conference room security, ant media conference token, ant media conference room password, ant media conference room, ant media video conference room security, Ant Media video conference, ant media conferencing, Publish, Multitrack conference, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---
# Room Security

In Ant Media Server, each participant and the conference room itself are treated as individual broadcasts. This means that all [Stream Security](https://antmedia.io/docs/category/stream-security/) features apply to conferencing as well.

## Secure Rooms With Tokens
To secure a conference room, enable related token security for both publishing and playing through the web panel, then generate a publish token using the room's (main track) broadcast ID.


The generated publish token must be passed to both ```.publish()``` and ```.play()``` functions in conferencing. Otherwise, the participant won't be able to join the room.

Generated token can be a [JWT](https://antmedia.io/docs/guides/stream-security/jwt-stream-security-filter/) or [One Time Token](https://antmedia.io/docs/guides/stream-security/one-time-token-control/)

### Security with JSON Web Tokens
#### Step 1: Enable JWT Security
Go to Ant Media Server web panel and enable JWT for both publish and play. For more details on how to do that, check [Enable JWT Stream Security](https://antmedia.io/docs/guides/stream-security/jwt-stream-security-filter/)
#### Step 2: Generate JWT with Room ID
Generate a JWT with payload as below:
```
{
    "type":"publish",
    "streamId":"roomId",
    "exp": jwt_expire_timestamp
}
```

![](@site/static/img/conference/video-conference/room-security-1.png)


[Generate JWT With Room ID](https://antmedia.io/docs/guides/stream-security/jwt-stream-security-filter/#generate-jwt-token)



#### Step 3: Join The Room Using JWT
In Ant Media Server, joining a video conference room involves both publishing to the room broadcast and playing that broadcast. Therefore, it's essential to pass the generated publish token to both the ```.publish()``` and ```.play()``` functions in the Ant Media Server SDKs.

**In conferencing, eventhough token type is publish, it can be used for both publishing and playing.**

Example:
```
const joinRoom = () => {
    webrtcAdaptor.current.publish(localParticipantStreamId, publishToken, null, null, localParticipantStreamId, roomId, JSON.stringify(userStatusMetaData));
    webrtcAdaptor.current.play(roomId, publishToken)
}
```
[Javascript Conference Room Sample](https://github.com/ant-media/StreamApp/blob/master/src/main/webapp/conference.html#L500)

#### Step 4: Conference Room Security In Action
In this step we will use Conference Sample to do a simple room security test.


Go to 
```https://{ams-url}:5443/{appName}/conference.html?token={YOUR_JWT_HERE}```

Example:

```https://test.antmedia.io:5443/LiveApp/conference.html?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoicHVibGlzaCIsInN0cmVhbUlkIjoidGVzdHJvb20iLCJleHAiOjk1MTYyMzkwMjJ9.Ipl8ev_jkZUfE_nPceOdj977V09qgRKu8Fc_jDCqvlA```

Conference.html sample will get the token from query parameter and pass it to ```.publish()``` and ```.play()``` functions.

Type room ID and click join room. 
Remember, room ID here must be same with the ID you used while generating the JWT.

You should be able to succesfully join the room and publish, play should start.

![](@site/static/img/conference/video-conference/room-security-2.png)

Now, open another tab. This time do not pass token as query parameter. Optionally you can pass a wrong token.

Example:

```https://test.antmedia.io:5443/LiveApp/conference.html```

Type same room id and click on join. 

Since there is no token, you wont be able to join the room.

![](@site/static/img/conference/video-conference/room-security-3.png)

### Security with One Time Tokens
Securing a conference room with OTTs is identical to using JWTs. 

You must pass the publish type OTTs to both ```.publish()``` and ```.play()``` after enabling this feature for both publishing and playing through the web panel and generating the tokens.

To learn more about OTTs check [OTT Documentation](https://antmedia.io/docs/guides/stream-security/one-time-token-control/)






