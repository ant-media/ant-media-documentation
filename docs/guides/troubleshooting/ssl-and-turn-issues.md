---
title: SSL & TURN Issues
description: Troubleshoot SSL certificate problems and TURN/STUN connectivity issues that prevent WebRTC streaming in Ant Media Server.
keywords: [SSL troubleshooting, TURN server, STUN, certificate error, WebSocket connection failed, Ant Media Server Documentation]
sidebar_position: 3
---

# SSL & TURN Issues

WebRTC has two infrastructure dependencies that commonly break streaming: a valid SSL certificate (browsers refuse camera access and secure WebSocket connections without it) and, on restricted networks, a reachable TURN server.

## Browser shows a certificate warning or the WebSocket connection fails

**Symptom:** `wss://` connection errors in the browser console, or the browser warns that the connection is not secure.

**Check:**

1. Make sure you access the server via the **domain name** in the certificate, not the raw IP address. Certificates are issued for domains; accessing `https://1.2.3.4:5443` will always fail validation.
2. Verify the DNS A record points to your server: use [dnschecker.org](https://dnschecker.org/).
3. Check whether the certificate has expired:

```shell
echo | openssl s_client -connect YOUR_DOMAIN:5443 2>/dev/null | openssl x509 -noout -dates
```

**Resolution:** Re-run the SSL setup from the Web Panel (`SETTINGS > SSL`) or follow the [SSL setup guide](/guides/installing-on-linux/setting-up-ssl/). Behind a load balancer, terminate SSL on the load balancer and make sure the certificate there is valid — see [AWS CloudFormation scaling](/guides/clustering-and-scaling/aws/aws-cloudformation/scale-with-aws-cloudformation/) for an example.

## `PKIX path building failed` in the server logs

**Symptom:** `ant-media-server.log` contains:

```
Caused by: sun.security.validator.ValidatorException: PKIX path building failed:
sun.security.provider.certpath.SunCertPathBuilderException:
unable to find valid certification path to requested target
```

**Check:** The CA root/intermediate certificates of your SSL provider are missing from the Java trust store.

**Resolution:** Download the root and intermediate certificates from your SSL provider and import them into the Java keystore:

```shell
keytool -import -trustcacerts -alias providerRoot -file provider-root.crt \
  -keystore /usr/lib/jvm/java-8-openjdk-amd64/jre/lib/security/cacerts
keytool -import -trustcacerts -alias providerIntermediate -file provider-intermediate.crt \
  -keystore /usr/lib/jvm/java-8-openjdk-amd64/jre/lib/security/cacerts
```

Adjust the keystore path to your installed Java version, then restart Ant Media Server.

## WebRTC works locally but fails for remote or corporate-network users

**Symptom:** Publish/play works from your office or home, but users behind corporate firewalls, VPNs, or mobile carrier NAT cannot connect. The ICE connection state goes to `failed` in `chrome://webrtc-internals`.

**Check:**

1. WebRTC media flows over UDP ports **50000–60000** by default. Restricted networks often allow only TCP 80/443.
2. Check whether a STUN server alone is sufficient (works for most NATs) or whether the client network requires TURN relay over TCP/TLS.
3. Test your TURN server independently with the [Trickle ICE tool](https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/).

**Resolution:** Deploy a TURN server (Coturn) listening on 443/TCP and configure both the server and clients to use it. The full walkthrough is in [Overcoming Restricted Networks](/guides/advanced-usage/overcoming-restricted-networks-webrtc-ams/). In summary:

1. Install Coturn and configure it to listen on ports 80/443 with your domain certificate ([Coturn quick installation](/guides/advanced-usage/turn-installation/coturn-quick-installation/)).
2. In the AMS application settings (Settings > Advanced), set:

```properties
stunServerURI=turn:your-turn-server:443?transport=tcp
turnServerUsername=your-username
turnServerCredential=your-password
```

3. Add the same TURN server to the `iceServers` configuration in your client code.

## TURN server is configured but relay still fails

**Symptom:** The Trickle ICE test does not return a `relay` candidate.

**Check:**

1. Confirm Coturn is actually listening: `lsof -i:80 -i:443` on the TURN host.
2. Verify the username/password in `/etc/turnserver.conf` (`lt-cred-mech` and `user=` lines) match what the clients send.
3. If TLS is used, the certificate configured in `turnserver.conf` (`cert=`/`pkey=`) must match the TURN server's domain.

**Resolution:** Fix the mismatched item and restart Coturn (`systemctl restart coturn`). For high availability, see [TURN load balancing](/guides/advanced-usage/turn-installation/turn-load-balancing/).

## Related documentation

- [Setting up SSL](/guides/installing-on-linux/setting-up-ssl/)
- [Configuring STUN/TURN addresses](/guides/advanced-usage/turn-installation/configuring-stun-turn-addresses/)
- [Overcoming restricted networks](/guides/advanced-usage/overcoming-restricted-networks-webrtc-ams/)
