---
title: Simulcasting to social media channels
sidebar_position: 7
---

This guide will show you how to use Ant Media Server to live stream to social media and other third-party RTMP end points.

<VideoPlayer youtube="true" video="https://www.youtube.com/embed/NVhYthQk_js" />

## How to Publish Live Stream on Facebook

You can publish live streams on your pages/accounts. Just click the **Live** button in the Create Post tab.

![](@site/static/img/iosmediacaptureresolutions(1).png)

After the click Live Button, you can see Facebook Live Dashboard as in the image shown below:

![](@site/static/img/facebook-live-dashboard.png)

You just need to copy the **Stream URL** and **Stream Key.**

**PS:** If you want to use a persistent stream key, you just need to enable **Use a Persistent Stream key** in Setup Option.

Your Facebook RTMP Endpoint URL that you will use in Ant Media Server should be like this: ```rtmps://rtmps://live-api-s.facebook.com:443/rtmp/Stream-key```

For example: ```rtmps://live-api-s.facebook.com:443/rtmp/677122211923308?s_bl=1&s_psm=1&s_sc=677124129589969&s_sw=0&s_vt=api-s&a=AbxqZXR6X1VaKBzk```

![](@site/static/img/publish-live-stream/simulcasting/edit-endpoint.png)

Simply add your Facebook RTMP Endpoint URL to the Ant Media Server ```Edit RTMP Endpoints``` tab, as shown in the image below.

![](@site/static/img/publish-live-stream/simulcasting/add-fb-endpoint.png)

So, you can start broadcasting now!

## How to Publish Live Stream on Youtube

You can publish live streams on your YouTube account. Just click the **Create** button and select **Go Live.**

![](@site/static/img/image-1645118331005.png)

Just Click the **Go** button on the **Streaming Software** tab.

![](@site/static/img/youtube-studio.png)

Then copy the **Stream URL** and **Stream Key.****![](@site/static/img/youtube-studio-stream-url-stream-key.png)**

Your YouTube RTMP Endpoint URL that you will use in Ant Media Server should be like this: ```rtmp://a.rtmp.youtube.com/live2/Stream-key```

For example: ```rtmp://a.rtmp.youtube.com/live2/dq1j-waph-e322-waxd-dxzd```

![](@site/static/img/publish-live-stream/simulcasting/edit-endpoint.png)

Simply add your YouTube RTMP Endpoint URL to the Ant Media Server ```Edit RTMP Endpoints``` tab, as shown in the image below.

![](@site/static/img/publish-live-stream/simulcasting/add-youtube-endpoint.png)

So, you can start broadcasting now!

## How to Publish Live Stream on Periscope

You can publish live streams on your periscope account. Just click the **Profile** button and select **Producer.**

![](@site/static/img/periscope-profile-producer.png)

Then copy **Stream URL** and **Stream Key.****![](@site/static/img/periscope-stream-url-stream-key.png)**  

Your Periscope RTMP Endpoint URL that you will use in Ant Media Server should be like this: `rtmp://de.pscp.tv:80/x/Stream-key`

For example: ,```rtmp://de.pscp.tv:80/x/baps3a3x7j32```

![](@site/static/img/publish-live-stream/simulcasting/edit-endpoint.png)

Simply add your Periscope RTMP Endpoint URL to the Ant Media Server ```Edit RTMP Endpoints``` tab, as shown in the image below.

![](@site/static/img/publish-live-stream/simulcasting/add-periscope-endpoint.png)

So, you can start broadcasting now!

## How to Add/Remove RTMP Endpoints?

There are two options for adding/removing RTMP endpoints.

One of them is Add/Remove RTMP Endpoint with Dashboard, as shown in the examples above. It is intended for the general purpose.

Another option is to use the REST API to Add/Remove RTMP Endpoints.

### REST API to add/remove RTMP endpoint

This option is for advanced users by making an API request to the rtmp-endpoint.

#### Add an RTMP endpoint

```bash
curl -X 'POST' \
  'https://AMS-domain:5443/App-Name/rest/v2/broadcasts/streamId/rtmp-endpoint' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "rtmpUrl": "rtmp://endpoint-URL/StreamKey",
}'
```
After adding the endpoint, you will receive one random ```dataId``` that will be used to remove the added endpoint using the remove rtmp-endpoint Rest API described in next step.

```bash
{
"success":  true,
"message":  null,
"dataId":  "customqfjJGd",
"errorId":  0
} 
```
You can get more information in the following [REST API](https://antmedia.io/rest/#/BroadcastRestService/addEndpointV3).

#### Remove an RTMP endpoint

Now, that ```dataId``` will be used to remove the added RTMP Endpoint.
```bash
curl -X 'DELETE' \
  'https://AMS-domain:5443/App-Name/rest/v2/broadcasts/streamId/rtmp-endpoint?endpointServiceId=dataId-from-add-endpoint-response' \
  -H 'accept: application/json'
```

You can get more information in the following [REST API](https://antmedia.io/rest/#/BroadcastRestService/removeEndpointV2).


Click for more detail about [REST API Guide](https://antmedia.io/docs/category/rest-api-guide/).

**PS:** To use the Rest APIs, please add your IP address to the ```Enable IP Filter for RESTful API``` option in the application Settings.
