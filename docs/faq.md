---
title: Frequently Asked Questions
sidebar_position: 4
---
# Frequently Asked Questions

## How can I install SSL on an AWS EC2 instance?

1.  Configure an Elastic IP address.
2.  Add an A record to your Elastic IP address.
3.  Check the new A record exists using [dnschecker](https://dnschecker.org/)
4.  Then follow the [SSL Setup Tutorial](/guides/installing-on-linux/setting-up-ssl/)

## Where can I download the JavaScript SDK?

The JavaScript SDK is available for Ant Media Server and can be accessed via ```http://SERVER_ADDR:5080/LiveApp/js/webrtc_adaptor.js```. 

Its file location is ```/usr/local/antmedia/webapps/LiveApp/js/webrtc_adaptor.js``` and the source code is available [here](https://github.com/ant-media/StreamApp/blob/master/src/main/webapp/js/webrtc_adaptor.js)

## Can I use Docker to deploy Ant Media Server?

Yes. Utilizing a Docker image is a very common way of deploying Ant Media Server. Check the [Installation](/guides/clustering-and-scaling/docker/docker-and-docker-compose-installation/) and the official Ant Media Server Docker images [here](https://hub.docker.com/u/antmedia)

## I cannot login to AMS dashboard after upgrading

Starting from version 2.2, Ant Media stores passwords with MD5 encryption. For this reason, you need to change your passwords to MD5 encryption. You can encrypt your password using any MD5 encryption tool like: [hmd5online.org](https://www.md5online.org/md5-encrypt.html)

Here are the steps:

1.  Login to MongoDB
2.  Run the commands below:

```js
use serverdb
db.getCollection('User').find() //Get User details```
db.User.updateOne({"_id": "5e978ef3c9e77c0001228040"}, {$set:{password: "md5Password"}}) //Use User ID in updateOne section and use password with MD5 protection
```

## How can I reset the admin password?

*   Stop the server using ```service antmedia stop```.
*   Delete the ```server.db``` file under ```/usr/local/antmedia/```
*   Start the server using ```service antmedia start```

If you're using ```mongodb``` as the database, your password will be stored in the ```serverdb``` database under the ```User``` collection.

*   Connect to your ```mongodb``` server with ```mongo``` client.
*   Type ```use serverdb;```
*   Type ```db.User.find()``` and it shows you the output like below. ```{ "_id" : ObjectId("5ea486690f09e71c2462385a"), "className" : "io.antmedia.rest.model.User", "email" : "test@antmedia.io", "password" : "1234567", "userType" : "ADMIN" }```
*   You can update the password with a command something like below. Change the parameters below according to the your case. ```db.User.updateOne( { email:"test@antmedia.io" }, { $set: { "password" : "test123" }})```
*   Alternatively, you can delete the user with a command something like below. Change the parameters below according to the your case. ```db.User.deleteOne( { "email": "test@antmedia.io" } )```
*   As of version 2.3.2, passwords should be hashed with MD5.

## What is HLS?

The HLS (HTTP Live Streaming) protocol was developed by Apple. The HLS streaming protocol works by chopping MPEG-TS video content into short chunks. On slow network speeds, HLS allows the player to use a lower quality video, thus reducing bandwidth usage. HLS videos can be made highly available by providing multiple servers for the same video, allowing the player to swap seamlessly if one of the servers fails.

## How can I reduce the latency for RTMP to HLS streaming

To reduce the HLS latency, you need to modify a few parameters to achieve a reduced latency of around 8-10 secs.

*   Update the HLS segment time to 2 seconds. You can decrease this value to have lower latency but players start to poll servers more frequently which is a waste of resources.
*   Update the key frame interval to 2 seconds (this value should be consistent with the HLS segment time). Open Broadcaster Software (OBS) sends key frames every 10 seconds by default.

![](@site/static/img/image-1645447048346.png)

After making these adjustments, the latency should be significantly reduced.

## How can I enable SSL for Ant Media Server?

Follow the [SSL Setup Tutorial](/guides/installing-on-linux/setting-up-ssl/)

## How can I remove port forwarding?

Check that which port forwarding exist in your system with the command below.

```shell
sudo iptables -t nat --line-numbers -L
```

The command above should give an output live as follows:

```shell
  Chain PREROUTING (policy ACCEPT)
  num  target     prot opt source               destination         
  1    REDIRECT   tcp  --  anywhere             anywhere             tcp dpt:https redir ports 5443
  2    REDIRECT   tcp  --  anywhere             anywhere             tcp dpt:http redir ports 5080
```

You can delete any rule in the output by referencing its line number. For instance, in order to delete the rule for port 5080 forwarding, run the below command. Notice the second parameter is the line number.

```shell
iptables -t nat -D PREROUTING 2
```

## How can I fix "Make sure that your domain name was entered correctly and the DNS A/AAAA record(s)" error?

*   First, make sure that A record is entered in your DNS settings and pointed to your server.
*   Check the ports (443 and 80) are not blocked or are not forwarded to any other ports.
*   If you forward 80 or 443 ports to 5080 and 5443, then remove these port forwarding settings as described above.

## How can I fix "NotSupportedError" while publishing ?

To solve this problem you must enable SSL. Follow the [SSL Setup Tutorial](/guides/installing-on-linux/setting-up-ssl/)

## WebRTC stream stops after a few seconds.

This issue is generally caused by closed UDP ports. Please make sure that UDP ports 5000 to 65535 are open.

## How can I fix a 403 Forbidden error?

Please see [this](/guides/developer-sdk-and-api/rest-api-guide/rest-api-guide/#rest-api-security-with-ip-filtering) document.

## How does adaptive bitrate work (ABR)?

Ant Media Server measures the client's bandwidth and chooses the best quality in the adaptive bitrates according to the bandwidth of the client. 

For instance, if there are three bitrates, 2000Kbps, 1500Kbps, 1000Kbps and client's bandwidth is 1700Kbps, then the video with 1500Kbps will be sent to the client automatically.

## How to configure auto-scaling and clustering with Ant Media Server?

Please refer to the auto-scaling documentation [here](/guides/clustering-and-scaling/scaling-ant-media-server/).

## What is the difference between the LiveApp and the WebRTCAppEE?

The only difference between the two applications is the name. For increased flexibility of Ant Media Server, each application has its own options and configurations.

The two applications shipped with Ant Media Server enable you to use two different applications using different settings that may represent two different use cases. Such as enabling H.264 in one app and enabling VP8 in the other. 

## How can I improve WebRTC bit rate?

You can set the ```bandwidth``` property to any value you want to use in ```WebRTCAdaptor``` using the Javascript SDK. This is the maximum bitrate value that WebRTC can use. Its default value is set to 900kbps.

## What latencies can I achieve with Ant Media Server Enterprise Edition?

| **Latency (seconds)** | **Publish**       | **Play**   | **Platform**       |
|-------------------|---------------|--------|----------------|
| 0.15              | WebRTC        | WebRTC | AWS Wavelength |  
| 0.5               | WebRTC        | WebRTC | Standard       | 
| 0.5-1             | RTSP / RTMP   | WebRTC | Standard       | 
| 8-12              | RTMP / WebRTC | HLS    | Standard       |  


## How many different bit rates are possible with Ant Media Server Enterprise Edition?

There is no soft limit. Generally, it's recommended to use 2 or 3 bitrates for most cases.

The recommended resolutions and corresponding bitrates are:

| **Resolution** | **Bitrate (Kbps)** |
|----------------|--------------------|
| 240p           | 500                |
| 360p           | 800                |
| 480p           | 1000               | 
| 720p           | 1500               | 
| 1080p          | 2000               | 



## Does ultra-low latency streaming support adaptive bit rates?

Yes. Ant Media Server provides ultra-low latency and adaptive bitrate support at the same time.

## Does Ant Media Server have an Embedded SDK?

Yes. Ant Media Server Enterprise has a native Embedded SDK for ARM, x86 and x64 platforms.

## How can I configure the location for MP4 recordings?

MP4 files are recorded to the streams folder under the web apps. A soft link can be created for that path using this command: ```ln -s {target_folder} {link_name}```.

## How to use Self-Signed Certificate on Ant Media Server?

### 1.Install OpenSSL package. 

This example is for Ubuntu, but you can install self-signed certificate using yum under CentOS as well.

```
apt-get update && apt-get install openssl -y
```

### 2. Create a self-signed certificate.

Use the below command to create a self-signed certificate.

ams.crt = your certificate file
ams.key = your key file

```
openssl req -newkey rsa:4096 -x509 -sha256 -days 3650 -nodes -out ams.crt -keyout ams.key
```

### 3.Submit the requested

 Submit the information and press the Enter button.

```
Country Name (2 letter code) [AU]:UK
State or Province Name (full name) [Some-State]:London
Locality Name (eg, city) []:London
Organization Name (eg, company) [Internet Widgits Pty Ltd]:Ant Media
Organizational Unit Name (eg, section) []:Support
Common Name (e.g. server FQDN or YOUR name) []:domain.com
Email Address []: contact@antmedia.io
```

### 4. Enable SSH

The certificate and private key will be created at the specified location. Run the ```enable_ssl.sh``` script as below.

```
/usr/local/antmedia/enable_ssl.sh -f ams.crt -p ams.key -c ams.crt -d ams_server_ip
```

#### Enable SSH locally

If you want to use a domain name with your local network, you need to add the parameter below in ```/etc/hosts``` file.

```
ams_server_ip domain.com
```

When you add a domain name in your hosts file, you need run ```enable_ssl.sh``` script.

```
/usr/local/antmedia/enable_ssl.sh -f ams.crt -p ams.key -c ams.crt -d domain.com
```

## How can I install a custom SSL by building a chain certificate?

The most important reason to upload your intermediate certificate with your SSL certificate is that the browser attempts to verify whether your SSL certificate is real or not.

You are able to provide intermediate certificates from the certificate provider web page.

The order of the certificate should be as follows.

```
Root Certificate
Intermediate Certificate
```

To give an example for Comodo:

```
cat COMODORSAAddTrustCA.crt COMODORSADomainValidationSecureServerCA.crt AddTrustExternalCARoot.crt > chain.crt
```

Now, your full chain certificate is ```chain.crt```

## How can I change the default HTTP port (5080)?

If you need to run Ant Media Server on a HTTP port that's not the default 5080, you need to update a setting in the server configuration file. 

Change the value of the ```http.port``` setting in the file located at ```/AMS-FOLDER/conf/red5.properties```. For example, to change the default port of ```5080``` to ```8080```, use the below setting.

```conf
http.port=8080 // the value has been updated from 5080 to 8080
```

After the server configuration file has been changed, it's necessary to change the **RequestDispatherFilter** parameter in the file located at ```/AMS-FOLDER/webapps/root/WEB-INF/web.xml``` as shown below:

```xml
<servlet>
  <servlet-name>RequestDispatherFilter</servlet-name>
  <servlet-class>io.antmedia.console.servlet.ProxyServlet</servlet-class>
  <init-param>
    <param-name>targetUri</param-name>
    <param-value>http://localhost:8080/{_path}</param-value>  // value has changed from 5080 to 8080
  </init-param>
  <init-param>
    <param-name>log</param-name>
    <param-value>false</param-value>
  </init-param>
  <init-param>
    <param-name>forwardip</param-name>
    <param-value>false</param-value>
  </init-param>
</servlet>
```

## Where can I get WebRTC viewers information?

Ant Media Server doesn't get any information for WebRTC viewers on the server side. However, you can set this data in plain text format for each client in your application. This information may be a unique id, IP address, location or similar.

This data is involved in the return of the [webrtc-client-stats](https://antmedia.io/rest/#/BroadcastRestService/getWebRTCClientStatsListV2) REST method and also in Grafana reports.

You should pass this information by setting the ```viewerInfo``` field of WebRTCAdaptor object in your WebRTC player.

For example, to assign IDs to viewers according to the time, you can add ```viewerInfo : "test_"+Date.now()``` in player.html. 

Then make an API request to the REST method to see the result:

```
http://AMS_URL/APP_NAME/rest/v2/broadcasts/STREAM_ID/webrtc-client-stats/0/5
```

## How to set Apache Reverse Proxy settings for Ant Media Server?

Use the below configuration to setup an Apache virtual host as a reverse proxy.

```xml
<VirtualHost *:80>
    RewriteEngine On
    RewriteCond %{HTTP_HOST} ^(.*)$
    RewriteRule ^(.*)$ https://%1$1 [R=Permanent,L,QSA]
</VirtualHost>

<VirtualHost *:443>
    ServerName yourdomain.com
    SSLEngine On
    SSLCertificateFile /etc/apache2/ssl/yourdomain.crt
    SSLCertificateKeyFile /etc/apache2/ssl/server.key
    SSLCertificateChainFile /etc/apache2/ssl/yourchain.crt
    RewriteEngine on
    RewriteCond %{HTTP:Upgrade} =websocket [NC]
    RewriteRule /(.*)           ws://localhost:5080/$1 [P,L]
    RewriteCond %{HTTP:Upgrade} !=websocket [NC]
    RewriteRule /(.*)           http://localhost:5080/$1 [P,L]
    ProxyPass / http://localhost:5080/
    ProxyPassReverse / http://localhost:5080/
</VirtualHost>
```

## How can I install the Ant Media Server on Ubuntu 18.04 with ARM64?

First, build glibc 2.29.

    sudo apt install build-essential bison
    wget http://ftp.gnu.org/gnu/glibc/glibc-2.29.tar.gz
    tar -xf glibc-2.29.tar.gz
    cd glibc-2.29/
    mkdir build
    cd build
    ../configure --prefix=/opt/glibc-2.29
    make
    sudo make install

Run the server as an init.d service.

    sudo systemctl stop antmedia
    sudo systemctl disable antmedia
    sudo rm /etc/systemd/system/antmedia.service
    sudo cp /usr/local/antmedia/antmedia /etc/init.d/
    sudo update-rc.d antmedia defaults
    sudo update-rc.d antmedia enable

Add LD\_PRELOAD to the init.d script.

    sudo nano /etc/init.d/antmedia 
    # ADD the following line before the line case "$1" in
    export LD_PRELOAD="/opt/glibc-2.29/lib/libm.so.6"

Save and exit the editor. Run the following commands.

    sudo systemctl daemon-reload
    sudo service antmedia stop
    sudo service antmedia start