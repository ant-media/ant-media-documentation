---
title: Time based One Time Password
description: This guide explains stream security options in Ant Media Server, and how you can Enable Disable, or Accept Undefined Streams.
keywords: [Enable or Disable Undefined Streams, Accept Undefined Streams, One Time Token Control, Stream security, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 4
---

The Time-based One-time Password algorithm (TOTP) is an extension of the HMAC-based One-time Password algorithm (HOTP) that generates a one-time password (OTP) by instead taking uniqueness from the current time.

We define a publisher, or player, as a subscriber. If a TOTP token is enabled, a subscriber should be created for the stream to be able to publish or play. Each subscriber has a SubscriberId and a SubcriberCode. When a subscriber requests to publish or play a stream, he should provide his SubscriberId  and SubscriberCode. Otherwise, the server won't accept the publish or play request.

You can enable TOTP for publishing and playing from the application's settings via the AMS web panel. You have the option to use both the publish and playback tokens simultaneously or just one at a time.

![](@site/static/img/stream-security/totp-enable.png)

To create a token, a secret key is required, which you can generate by clicking the `Generate` option in the dashboard, as shown in the above screenshot.

> [!NOTE] 
> By default, the secret key is 6 bytes long when you click Generate, but in order to pre-register the subscriber, the secret key should be 8 bytes long, as shown in the screenshot above.


### Subscriber Operations

After enabling TOTP on the server, the following operations should be performed to register a subscriber if required.

You can generate the TOTP token without first registering the subscriber, but if `Accept Undefined Streams` option in stream security is not allowed, only pre-registered subscribers with pre-registered streamId can publish and play streams.

The user can create a new subscriber (publisher or player) by using [Add Subscriber](https://antmedia.io/rest/#/BroadcastRestService/addSubscriber) Rest API method. You should assign a base 32Ssecret to each subscriber at the time of creation. A secret key should be a multiple of 8 characters, as stated in the above note.
 
 - The sample API call to register a subscriber for publishing:

```bash
curl -X POST -H "Accept: Application/json" -H "Content-Type: application/json" 'http://Ip-address-or-domain:5080/Application_Name/rest/v2/broadcasts/streamId/subscribers' -d '{"subscriberId":"publisherA", "b32Secret":"SecretKey", "type":"publish"}'
```

 - The sample API call to register a subscriber for playing:

```bash
curl -X POST -H "Accept: Application/json" -H "Content-Type: application/json" 'http://Ip-address-or-domain:5080/Application_Name/rest/v2/broadcasts/streamId/subscribers' -d '{"subscriberId":"playerA", "b32Secret":"SecretKey", "type":"play"}'
```

### Other Subscriber APIs

 - Get the subscriber list using the [following
   API](https://antmedia.io/rest/#/BroadcastRestService/listSubscriberV2):

```bash
curl -X 'GET' 'http://IP-address-or-domain:5080/Application_Name/rest/v2/broadcasts/streamId/subscriber-stats/list/0/10' -H 'accept: application/json'
```

 - Delete the subscribers using the [following
   API](https://antmedia.io/rest/#/BroadcastRestService/revokeSubscribers):

```bash
curl -X 'DELETE' 'https://IP-address-or-domain:5080/Application_Name/rest/v2/broadcasts/streamId/subscribers' -H 'accept: application/json'
```

 - Get the subscriber statistics using the [following
   API](https://antmedia.io/rest/#/BroadcastRestService/listSubscriberStatsV2):

```bash
curl -X 'GET' 'https://test.antmedia.io:5443/Sandbox/rest/v2/broadcasts/test/subscribers/list/0/10' -H 'accept: application/json'
```

### TOTP Token Creation

TOTP token can be created using [this Rest API](https://antmedia.io/rest/#/BroadcastRestService/getTOTP).

By default, the TOTP generated for playback remains valid for 60 seconds after its generation. Consequently, users intending to utilize this token must send a play request to AMS within this 60-second timeframe.

If required, you can change the default TOTP time by changing the below property in the application settings.

      "timeTokenPeriod": 60

Now, all application settings can be changed from the AMS web panel itself. Please check [here](https://antmedia.io/docs/guides/configuration-and-testing/ams-application-configuration/#management-panel-settings) for more information.

As mentioned in Subscribers Operations, you can also generate the TOTP token directly without pre-registering the subscriber.

 - The sample TOTP token creation API in the Publish Scenario:

```bash
curl -X 'GET' 'http://IP-adddress-or-domain:5080/Application_Name/rest/v2/broadcasts/streamId/subscribers/SubscriberId/totp?type=publish'-H 'accept: application/json'
```

![](@site/static/img/stream-security/subscriber_block_publish_totp_postman.png)


 - The sample TOTP token creation API in the Player Scenario:

```bash
curl -X 'GET' 'http://IP-adddress-or-domain:5080/Application_Name/rest/v2/broadcasts/streamId/subscribers/SubscriberId/totp?type=play'-H 'accept: application/json'
```

![](@site/static/img/stream-security/subscriber_block_play_totp_postman.png)


## Subscriber Block

The subscriber block feature allows blocking a specific user from engaging in publishing, playback, or both at any given moment. This implies that even if the user is actively publishing or playing the stream, their ability to publish or play will cease until the block is removed or expires. Block is valid for all publish and play types. The subscriber block feature can be used in version 2.7.0 and later.

Before proceeding further, you need to enable the below property in the application settings as well.

    timeTokenSubscriberOnly=true

Please save the settings after making any changes.

### Block Publish

After obtaining the TOTP token using the above process, you will get one 6 bytes `subscriberCode` in response that will be used to publish the stream with `subscriberId`.

For instance, when using the JavaScript SDK, the publish command should be called as shown below:

```
webRTCAdaptor.publish(streamId, tokenId, subscriberId, subscriberCode);
```

**Example:**
```
webRTCAdaptor.publish("teststream", null, "lastpeony", "451222");

##(The 2nd parameter, which is null here, represents the token(for example a JWT), not subscriberCode)
```

After utilizing the TOTP token for publishing, you can block the subscriber from publishing using a block request. To prevent the user from publishing for 120 seconds, send a [subscriber block API request](https://antmedia.io/rest/#/BroadcastRestService/blockSubscriber) as below.

```bash
curl -X 'PUT' 'http://IP-address-or-domain:5080/Application_Name/rest/v2/broadcasts/streamId/subscribers/subscriberId/block/120/publish' -H 'accept: application/json'
```

![](@site/static/img/stream-security/subscriber_block_block_publish_postman.png)

Upon a successful return of this request, the subscriber's publishing will immediately stop, and they will be blocked for 120 seconds.

To remove the block, set the block duration to 0 seconds.

```bash
curl -X 'PUT' 'http://IP-address-or-domain:5080/Application_Name/rest/v2/broadcasts/streamId/subscribers/subscriberId/block/0/publish' -H 'accept: application/json'
```

Remember, if you previously blocked subscribers from publishing and then unblocked them, they might encounter an **unauthorized_access** error if their TOTP has expired. In such cases, generating a new TOTP becomes necessary for them to publish again.


### Block Play

As an illustration, suppose you are associating your users with `userIds` in your application. When users initiate playback on your application, you can transmit their `userId` as the `subscriberId` and issue a TOTP generation request to AMS (Ant Media Server). Once you receive the token, pass it to the Ant Media Server SDK to commence the user's playback.

After obtaining the TOTP token, you will get one 6 bytes `subscriberCode` in response that will be used to play the stream with `subscriberId`.

For instance, when using the JavaScript SDK, the play command should be called as shown below:

```
webRTCAdaptor.play(streamId, tokenId, subscriberId, subscriberCode);
```

**Example:**
```
webRTCAdaptor.play("teststream", null, "lastpeony", "451222");

##(The 2nd parameter, which is null here, represents the token(for example a JWT), not subscriberCode)
```

After utilizing the TOTP token for playing, you can block the subscriber from playing using a block request. To prevent the user from playing for 120 seconds, send a [subscriber block API request](https://antmedia.io/rest/#/BroadcastRestService/blockSubscriber) as below.

```bash
curl -X 'PUT' 'http://IP-address-or-domain:5080/Application_Name/rest/v2/broadcasts/streamId/subscribers/subscriberId/block/120/play' -H 'accept: application/json'
```
![](@site/static/img/stream-security/subscriber_block_block_play_postman.png)

Upon a successful return of this request, the subscriber's playback will immediately stop, and they will be blocked for 120 seconds.

To remove the block, set the block duration to 0 seconds.

```bash
curl -X 'PUT' 'http://IP-address-or-domain:5080/Application_Name/rest/v2/broadcasts/streamId/subscribers/subscriberId/block/0/play' -H 'accept: application/json'
```

Please be aware that playback resumes immediately after this request returns successfully.

It's important to note that they won't be able to play the stream if they refresh the page and their TOTP has expired. However, if the TOTP is still valid and they refresh, they will be reauthenticated and able to resume playing the stream.
