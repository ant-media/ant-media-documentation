---
title: Enable SSL
description: Setting up SSL for Ant Media Server using Let's Encrypt certificate.
keywords: [Setting up SSL for Ant Media Server, Lets Encrypt, Let's Encrypt Certificate, Ant Media Server Documentation, Ant Media Server Tutorials, SSL]
sidebar_position: 6
---

# How to Enable SSL

SSL is mandatory for secure access to the camera and microphone in the browser, and for WebSocket Secure (WSS) connections in WebRTC — most modern browsers require it. Most AMS users should start with the **Web Panel** — it's the fastest way to get a standard setup working. The terminal is there for everything else: enterprise deployments, cluster/load-balancer setups, scripting and automation, and a couple of cases the panel doesn't handle at all.

By the end of this guide, SSL will be enabled on your server and you'll be able to confirm it's working over HTTPS.

```mermaid
%%{init: {'flowchart': {'curve': 'linear', 'nodeSpacing': 80, 'rankSpacing': 80}}}%%
flowchart TD
    A["Enable SSL from the Web Panel: Settings > SSL<br/>(fastest path for a standard setup)"]
    A --> B{"Need more control? (enterprise, cluster/load balancer, scripting)"}
    B -->|A certificate file already| D["Import Your Custom Certificate — terminal<br/>enable_ssl.sh -f FULL_CHAIN_FILE -p PRIVATE_KEY_FILE -c CHAIN_FILE -d DOMAIN_NAME"]
    B -->|Just local dev, no public domain| E["Self-Signed Certificate — terminal<br/>enable_ssl.sh -f ams.crt -p ams.key -c ams.crt -d SERVER_IP"]
    B -->|Need a Let's Encrypt cert via terminal| F{Can port 80 be reached from the internet?}
    F -->|Yes, and I have a domain| G["Let's Encrypt, HTTP-01 — terminal<br/>enable_ssl.sh -d DOMAIN_NAME"]
    F -->|Yes, but no domain yet| H["Free antmedia.cloud Subdomain — terminal<br/>enable_ssl.sh"]
    F -->|No, port 80 is blocked or unavailable| I{Using AWS Route 53 for DNS?}
    I -->|Yes| J["Let's Encrypt DNS-01 + Route 53 — terminal<br/>enable_ssl.sh -d DOMAIN_NAME -v route53"]
    I -->|No| K["Let's Encrypt DNS-01, manual — terminal<br/>enable_ssl.sh -d DOMAIN_NAME -v custom"]
```

:::info
To avoid any issue later, make sure that your server has a **static/fixed IP address** so that the domain can be mapped to a fixed IP.

If the IP is dynamic/changed, then the server will not be accessible on a previously generated subdomain.
:::

## Option 1: Enable SSL from the Web Panel (Recommended)

In previous versions, configuring SSL involved intricate steps, such as accessing the server through SSH and executing the `enable_ssl.sh` script from the installation directory `/usr/local/antmedia`.

However, starting with AMS version 2.6.2, this process is streamlined so you can enable SSL directly from the AMS Web Panel.

- After [installing AMS](/guides/installing-on-linux/installing-ams-on-linux/), log in to the web panel and navigate to `SETTINGS > SSL`.
![](@site/static/img/ssl-webpanel/ssl-settings.png)

- In the drop-down select box named Type, choose among the various options to enable SSL, like [using your own domain](#create-lets-encrypt-certificate-with-http-01-challenge), [free subdomain of antmedia.cloud](#get-a-free-subdomain-and-install-ssl-with-lets-encrypt), or [import your own certificate](#import-your-custom-certificate), and then click Activate to enable SSL and restart your server.

![](@site/static/img/ssl-webpanel/ssl-options.png)

- This will start to enable SSL for AMS.
![](@site/static/img/ssl-webpanel/enabling-ssl.png)

- The AMS instance will restart and the server can now be accessed securely with SSL enabled.
![](@site/static/img/ssl-webpanel/ssl-status.png)

## Option 2: Install SSL Using the Terminal

The terminal covers everything the Web Panel does — your own domain, the free antmedia.cloud subdomain, importing a certificate — plus two cases the panel doesn't handle at all: a **self-signed certificate** for local development, and a **DNS-01 challenge** when port 80 isn't reachable from the internet. It's the natural choice for enterprise deployments, cluster/load-balancer setups, or scripting and automating server setup instead of clicking through the UI.

:::info
Every method below that requests a new Let's Encrypt certificate — everything except importing your own certificate — needs port 80 free on the server (nothing else listening on it), even the DNS-01 methods that don't need port 80 open to the internet. `enable_ssl.sh` checks this and exits if something else, like Apache or Nginx, is already using it. Stop or disable that service first, for example: `sudo service apache2 stop`.
:::

### Get a free subdomain and install SSL with Let's Encrypt

If you do not have a domain name and want to install an SSL certificate, you can use this feature. With this feature, **enterprise users** will have a free domain name with the extension **ams-[id].antmedia.cloud**, and the Let's Encrypt certificate will be automatically installed. This feature is available in versions after 2.5.2.

**Requirements:** a valid Enterprise license key already configured on the server (the script checks for it and exits without one), a static/fixed public IP address, and port 80 reachable from the internet — this method validates the certificate the same way HTTP-01 does.

:::info
If you want to use the free sub-domain from `antmedia.cloud`, make sure your server has a static/fixed IP address so the domain can be mapped to it.

If the IP is dynamic and changes, the server will no longer be accessible on a previously generated sub-domain.
:::

- Go to the folder where AMS is installed. The default directory is `/usr/local/antmedia`

  ```bash
  cd /usr/local/antmedia
  ```
  
- Run the `enable_ssl.sh` command to install the SSL.

  ```bash
  sudo ./enable_ssl.sh
  ```

### Create Let's Encrypt certificate with HTTP-01 challenge

The script in this document installs a **Let's Encrypt** SSL certificate.

**Requirements:** a domain with an `A` record pointing to your server's public IP, and port 80 reachable from the internet — Let's Encrypt connects to your server on port 80 to validate the domain.

First, create an `A` record for your domain name in your DNS records. This way, your domain name will be resolved to your server's `public IP address`. Note that this guide is for Ubuntu systems, but there are several guides on the internet for other Linux distributions as well.

- If there is a service that uses port 80, you need to disable it first. For example, if your system has an Apache web server, you need to disable it using:

  ```bash
  sudo service apache2 stop
  ```

- Go to the folder where AMS is installed. The default directory is `/usr/local/antmedia`

  ```bash
  cd /usr/local/antmedia
  ```

- Run the `enable_ssl.sh` command to install the SSL.

  ```bash
  sudo ./enable_ssl.sh -d example.com
  ```

### Self-Signed Certificate (Local Development)

If you're developing locally and don't have a public domain yet, a self-signed certificate lets you enable HTTPS/WSS on `localhost` or your local network so you can test camera/microphone access and WebRTC without waiting on a real certificate.

**Requirements:** just OpenSSL. No domain, no static IP, and no port 80 — this is one of the few options that doesn't need it, since nothing is validated over the internet.

:::info
Browsers will show a security warning for self-signed certificates since they aren't issued by a trusted authority. This is expected — click through the warning (e.g. "Advanced" > "Proceed") to continue. Self-signed certificates are for local development only; use Let's Encrypt or your own certificate (above) for anything public-facing.
:::

1. Install OpenSSL if it isn't already available:

    ```bash
    apt-get update && apt-get install openssl -y
    ```

2. Generate a self-signed certificate and key:

    ```bash
    openssl req -newkey rsa:4096 -x509 -sha256 -days 3650 -nodes -out ams.crt -keyout ams.key
    ```

    You'll be prompted for certificate details. Any values work for local use, for example:

    ```
    Country Name (2 letter code) [AU]:UK
    State or Province Name (full name) [Some-State]:London
    Locality Name (eg, city) []:London
    Organization Name (eg, company) [Internet Widgits Pty Ltd]:Ant Media
    Organizational Unit Name (eg, section) []:Support
    Common Name (e.g. server FQDN or YOUR name) []:domain.com
    Email Address []: contact@antmedia.io
    ```

3. Enable SSL with the certificate you just created, replacing `<SERVER_IP>` with your server's IP address:

    ```bash
    sudo /usr/local/antmedia/enable_ssl.sh -f ams.crt -p ams.key -c ams.crt -d <SERVER_IP>
    ```

4. **Using a local domain name instead of an IP:** add an entry to `/etc/hosts` mapping your chosen domain to the server's IP:

    ```
    <SERVER_IP> domain.com
    ```

    Then re-run `enable_ssl.sh` with the domain name:

    ```bash
    sudo /usr/local/antmedia/enable_ssl.sh -f ams.crt -p ams.key -c ams.crt -d domain.com
    ```

Once this completes, your server is reachable over HTTPS/WSS at `https://<DOMAIN_OR_IP>:5443` for local development.

### Import your custom certificate

If you already have a certificate from your own provider, `enable_ssl.sh` can install it directly — no port 80 needed, since nothing is validated over the internet.

**Requirements:** all three files together — full chain, private key, and chain file. Providing only some of them is an error the script rejects. The file extensions (`.pem`, `.crt`, etc.) don't matter to the script, only the content.

```bash
sudo ./enable_ssl.sh -f <FULL_CHAIN_FILE> -p <PRIVATE_KEY_FILE> -c <CHAIN_FILE> -d <DOMAIN_NAME>
```

Example:

```bash
sudo ./enable_ssl.sh -f yourdomain.crt -p yourdomain.key -c yourdomainchain.crt -d yourdomain.com
```

:::info
**Known limitation:** your private key file must not be passphrase-protected. `enable_ssl.sh` passes it straight into `openssl` to build the server's keystore, without ever prompting for a passphrase — so an encrypted key will hang or fail. If your key has one, strip it first:

```bash
openssl rsa -in yourdomain.key -out yourdomain-nopass.key
```
:::

### Create Let's Encrypt certificate with DNS-01 challenge

In this method, there will be no HTTP requests back to your server, so port 80 doesn't need to be reachable from the internet (it still needs to be free locally — see the note above). This method is useful to create an SSL certificate in restricted environments, such as AWS Wavelength. This feature is available in versions after 2.4.0.2.

**Requirements:** access to add a TXT record with your DNS provider, and an interactive terminal session — the script pauses partway through and waits for you to create the record before continuing, so this isn't suitable for unattended or scripted runs.

Run `enable_ssl.sh` with `-v custom` as follows:

```bash
sudo ./enable_ssl.sh -d <DOMAIN_NAME> -v custom
```

The script will ask you to create a TXT record for your domain name, and print something like this:

```comments
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Please deploy a DNS TXT record under the name
_acme-challenge.subdomain.yourdomain.com with the following value:

ziB3UjMMSSO-La7jgqPXXXXeK-r2Ja80HluNJVvkg

Before continuing, verify the record is deployed.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
```

Create a TXT record in your DNS records as instructed above. For the sample above, we created a TXT **record _acme-challenge.subdomain.yourdomain.com** with the value **ziB3UjMMSSO-La7jgqPXXXXeK-r2Ja80HluNJVvkg**.

After you create the TXT record, press Enter to continue. The process should complete successfully if everything is set correctly.

### Create Let's Encrypt certificate with DNS-01 challenge and Route 53

Let's Encrypt has plugins to simplify authorization. The Route 53 plugin creates TXT records and deletes them after authorization is done. It's useful when creating instances in AWS Wavelength Zones, since the HTTP-01 challenge doesn't work there. Unlike the manual DNS-01 method above, this one is fully automated — no need to create the TXT record yourself or run it interactively.

**Requirements:** your domain hosted in Route 53, an IAM role with the policy below attached to the EC2 instance, and port 80 free locally (not required to be open to the internet — this method doesn't use HTTP-01).

- Create a policy (e.g., `dns-challenge-policy`) in the IAM service with the following content. [Check this out if you don't know how to create a policy](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-and-attach-iam-policy.html).

```json
{
  "Version": "2012-10-17",
  "Id": "certbot-dns-route53 sample policy",
  "Statement": [
      {
          "Effect": "Allow",
          "Action": [
              "route53:ListHostedZones",
              "route53:GetChange"
          ],
          "Resource": [
              "*"
          ]
      },
      {
          "Effect" : "Allow",
          "Action" : [
              "route53:ChangeResourceRecordSets"
          ],
          "Resource" : [
              "arn:aws:route53:::hostedzone/*"
          ]
      }
  ]
}
```

- Create a Role (e.g., `dns-challenger`) in IAM for EC2 and attach the policy above to that role.
- Assign this role to the EC2 instance where you plan to install SSL.
- Create an `A` record for your domain name in Route 53 that resolves to your IP address.
- Run `enable_ssl.sh` as follows:

    ```bash
    sudo ./enable_ssl.sh -d <DOMAIN_NAME> -v route53
    ```

- If everything is set up properly, you can access the server via `https://<DOMAIN_NAME>:5443`

## Renewing or Replacing Your Certificate

Which fix applies depends on how you originally got the certificate:

- **Let's Encrypt certificate** (any method above except importing your own) that didn't renew automatically — see below.
- **Your own imported certificate** that's expired — see below.

### Let's Encrypt Certificates That Didn't Auto-Renew

Every time `enable_ssl.sh` issues a Let's Encrypt certificate, it schedules a cron job to renew it automatically, running `enable_ssl.sh -d <DOMAIN_NAME> -r` every 85 days (Let's Encrypt certificates are valid for 90 days, leaving a few days of buffer).

To renew manually — for example, after the cron job failed silently:

```shell
sudo ./enable_ssl.sh -d <DOMAIN_NAME> -r
```

You don't need to stop the AMS service first — `enable_ssl.sh` restarts it automatically once the new certificate is in place.

:::info
**Why the cron job can fail silently**: verified directly against the script — the renewal command always validates over HTTP-01 (port 80 reachable from the internet), regardless of which method you originally used to get the certificate. In practice:

- If you originally used **HTTP-01** or the **free antmedia.cloud subdomain**, renewal fails if port 80 became unreachable in the meantime — a firewall rule changed, another service started using it, and so on. Reopen port 80 and re-run the command above.
- If you originally used **DNS-01 (manual or Route 53)** specifically because port 80 isn't reachable in your environment, the built-in renewal will never succeed — it doesn't fall back to DNS-01, and there's no flag to make it do so. Contact [Technical Support](mailto:support@antmedia.io) for a DNS-01 renewal path.
:::

### Replacing an Expired Custom Certificate

If you imported your own certificate ([above](#import-your-custom-certificate)) and it's expired, there's no separate "renew" command — get the new certificate files from your provider and run the same import command again with them:

```shell
sudo ./enable_ssl.sh -f <NEW_FULL_CHAIN_FILE> -p <NEW_PRIVATE_KEY_FILE> -c <NEW_CHAIN_FILE> -d <DOMAIN_NAME>
```

:::info
Don't add `-r` here — that flag only applies to Let's Encrypt-obtained certificates. Combining it with `-f`/`-p`/`-c` triggers a pointless Let's Encrypt renewal attempt in the background (which may fail, harmlessly) before your custom certificate files still get applied correctly afterward. Simplest and correct: just re-run the import command above with your new files, no `-r`.
:::

## Verify SSL Is Working

After running any of the methods above — including a renewal or certificate replacement — confirm the certificate is actually in place:

```shell
curl -Iv https://<DOMAIN_NAME>:5443 2>&1 | grep -i "subject\|SSL certificate"
```

Or simply open `https://<DOMAIN_NAME>:5443` in a browser and check for the padlock icon. If the browser shows a certificate warning, double-check the domain matches what you issued the certificate for, and that the `enable_ssl.sh` command completed without errors.

![](@site/static/img/ssl-webpanel/ssl-panel-connected.png)

To check the certificate's expiry date directly — useful for confirming a renewal actually pushed it out:

```shell
echo | openssl s_client -connect <DOMAIN_NAME>:5443 2>/dev/null | openssl x509 -noout -enddate
```

SSL is now enabled on your Ant Media Server and verified working. From here, [publish a stream](/guides/publish-live-stream/webrtc/) or access the web panel securely over HTTPS.

## Troubleshooting

| Symptom | Fix |
|---|---|
| The script exits asking for a license, or `The license key is invalid.` | The [free antmedia.cloud subdomain method](#get-a-free-subdomain-and-install-ssl-with-lets-encrypt) requires a valid Enterprise license key already configured on the server; check it under License in the web panel. |
| `The domain exists, please re-run the enable_ssl.sh script.` | A previous run already registered an `ams-XXXXX.antmedia.cloud` subdomain for this server. Just re-running the same command generates a new random subdomain and retries — this isn't a sign anything is broken. |
| Running AMS inside a Docker container | `enable_ssl.sh` detects this automatically and skips `service antmedia restart` at the end, printing a message asking you to restart the container yourself instead. If the certificate installs but HTTPS still isn't reachable, restart the container. |
| Checking whether your certificate is close to expiring | AMS also installs a systemd timer (`antmedia-ssl-renew.timer`) that checks expiry daily and renews once you're within 30 days. Check its status with `systemctl status antmedia-ssl-renew.timer`. |

Two errors need more context than a table row allows:

- **`Port 80 is currently in use by <SERVICE>...`** — this is `enable_ssl.sh`'s own port check, and it applies to every method above except importing your own certificate. Stop whatever's using port 80 (see the note near the top of Option 2) and re-run the same command.
- **`Missing full chain or private key file. Please provide both or neither of them` / `Missing chain file...`** — you passed some but not all of the `-f`/`-p`/`-c` flags when [importing a custom certificate](#import-your-custom-certificate). All three are required together. If you're not sure how to build a full chain file from what your provider gave you, see [this FAQ entry](https://github.com/ant-media/Ant-Media-Server/wiki/Frequently-Asked-Questions#how-to-install-custom-ssl-by-building-full-chain-certificate-).

## Need Help?

If SSL setup isn't working, reach out on [GitHub Discussions](https://github.com/orgs/ant-media/discussions) or contact [Technical Support](mailto:support@antmedia.io).
