---
title: Installing AMS on Linux
---

Ant Media can be installed on Linux, specifically Ubuntu (18.04, 20.04, and 22.04), CentOS (8 and 9), Rocky Linux (8 and 9), and Alma Linux (8 and 9). It is compatible with both the x86-64 and Arm64 architectures.

To run AMS on a single instance, you'll need at least 4 vCPU dedicated compute optimized servers with 8 GB of RAM. In terms of smooth read-write performance, SSD disks are highly recommended.

This document describes how to install both the Community Edition and the Enterprise Edition. There are several installation methods available, including deployment to a full VM, Docker, or Kubernetes.

**Note:** When manually installing AMS, this procedure can be used for both on-premises and cloud instances.

## Download Ant Media Server (AMS)

Download and save the latest AMS Community Edition or Enterprise Edition package.

*   Community Edition can be downloaded from Github [Releases](https://github.com/ant-media/Ant-Media-Server/releases) page.
*   Enterprise Edition can be downloaded from your account after you get a license on [antmedia.io](https://antmedia.io/)

If you downloaded the zip file locally on your system, you can use the general **scp** command to copy the file from your system to your AMS instance if it is running in the Cloud or in any Data Centre.

This command works on all Linux, Windows and Mac OS.

 - In case, you are using an SSH key:

```shell
scp -i ssh-key AMS-zip-file username@Ip-address:/home/username
```

 - In case you are using password for SSH:

```shell
scp AMS-zip-file username@Ip-address:/home/username
```
After you've downloaded or copied the file to the AMS instance, open a terminal and navigate to the directory where you downloaded/copied the AMS zip file.

```shell
cd path/to/where/ant-media-server....zip
```

## Download the installation script

Download the ```install_ant-media-server.sh``` shell script.

    sudo wget https://raw.githubusercontent.com/ant-media/Scripts/master/install_ant-media-server.sh && sudo chmod 755 install_ant-media-server.sh

## Run the installation script

    sudo ./install_ant-media-server.sh -i <ANT_MEDIA_SERVER_ZIP_FILE>

For more command line options, type ```sudo ./install_ant-media-server.sh -h```

## Check if the service is running

You can check the service by using service command.

```shell
sudo service antmedia status
```

You can also start/stop the AMS service.

```shell
sudo service antmedia stop
sudo service antmedia start
```

## Install SSL on AMS

Before proceeding, ensure that your AMS instance has a static public IP address and a domain is assigned to that public IP address. Also, ensure that TCP port 80 on the firewall/security groups is enabled, as this is required for the public SSL certificate.

Then, go to the folder where AMS is installed. Default directory is ```/usr/local/antmedia```

```shell
cd /usr/local/antmedia
```

Run ```./enable_ssl.sh``` script in the AMS installation directory. Please don't forget to replace ```{DOMAIN_NAME}``` with your domain name.

```shell
sudo ./enable_ssl.sh -d {DOMAIN_NAME}
```

For detailed information about SSL, follow [SSL Setup](/guides/installing-on-linux/setting-up-ssl/).

## Accessing the web panel

Once your AMS is installed, open your browser and navigate to the web panel by typing ```http://SERVER IP ADDRESS:5080```. If you're having trouble accessing the web panel, it's possible that a firewall is blocking access to the 5080 port.

If an SSL certificate is installed, the server can be reached at 
```http://domain-name:5443```

## Docker installation

Please visit for more information [Docker and Docker Compose](/guides/clustering-and-scaling/docker/docker-and-docker-compose-installation).

## Cluster installation

Cluster installation is an advanced topic and it has its own page. Please visit [Clustering & Scaling](/guides/clustering-and-scaling/cluster-installation/).

## Server ports

In order to server run properly you need to open some network ports, defined below:

*   TCP: 80 (SSL)
*   TCP: 5080 (HTTP)
*   TCP: 5443 (HTTPS)
*   UDP: 4200 (SRT)
*   TCP : 1935 (RTMP)
*   UDP: 50000-60000 (WebRTC. The default range is 50000-60000 in v2.4.3 & above. Before 2.4.3, the default value was 5000-65000. Note that you can [change port range](https://github.com/orgs/ant-media/discussions/4944) in all releases.
*   TCP: 5000 (You need to open this port in only cluster mode for the internal network communication. It should not be open to the public)

## Forward default http (80), https (443) ports to 5080 and 5443

Generally, port forwarding is used to forward default ports to the server's ports for convenience. For example, let's forward all incoming data from 80 to 5080.

```shell
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 5080
sudo iptables -t nat -A PREROUTING -p tcp --dport 443 -j REDIRECT --to-port 5443
```

After running the command above, HTTP requests going to 80 will be forwarded to 5080. The HTTP requests going to 443 will be forwarded to 5443. 

Please pay attention that once you enable SSL, port 80 should not be used by any processes, or should not be forwarded to any other port.

## Listing and deleting current port forwardings

To list port forwarding run the command below.

```shell
sudo iptables -t nat --line-numbers -L
```

To delete a port forwarding run the command below.

```shell
iptables -t nat -D PREROUTING [LINE_NUMBER_IN_PREVIOUS_COMMAND]
```

## Make port forwarding persistent

If you want the server to reload port forwarding after reboot, we need to install iptables-persistent package and save rules like below.

    sudo apt-get install iptables-persistent

The command above will install iptables-persistent package. After installation, run the command below every time you make a change and want it to be persistent.

    sudo sh -c "iptables-save >` /etc/iptables/rules.v4"

## Please watch the quick installation of Ant Media Server.

<iframe width="560" height="315" src="https://www.youtube.com/embed/0m27oDIb95s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
