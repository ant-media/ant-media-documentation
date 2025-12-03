---
title: GCP Installation 
description: GCP Installation
keywords: [GCP, GCP Installation, Ant Media Server Documentation, Ant Media Server Tutorials, Google Cloud Platform installation]
sidebar_position: 1
---

# Google Cloud Platform (GCP)

In this comprehensive guide, we’ll walk you through the steps to efficiently expand your Ant Media Server infrastructure on GCP, ensuring optimal performance and an exceptional viewing experience for your audience.

Let’s move on to the installation.

After logging into Google Cloud Platform, create a project. We created a project named "antmedia-test" for testing purposes.

### Step 1: Install MongoDB server

To create an instance in Google Cloud Platform:

1. Go to VM Instances > CREATE INSTANCE, and select Ubuntu 22.04 as the boot disk.

2. Under Advanced Options, navigate to the Management tab. Add the following lines to the Automation section:

```shell
#!/bin/bash
wget https://raw.githubusercontent.com/ant-media/Scripts/master/install_mongodb.sh && chmod +x install_mongodb.sh
./install_mongodb.sh
```

3. Click Create to complete the process. Once the instance is created, make sure to note down its private IP address.

### Step 2: Install Ant Media Server Enterprise Edition

To deploy Ant Media Server Enterprise Edition as a cluster on GCP, start by launching Ant Media Server Enterprise Edition through the Marketplace. For detailed steps, refer to this blog post on launching AMS through the Marketplace.

![](@site/static/img/gcp-installation/antmedia-gcp-marketplace-image-one.png)

After the deployment, stop the instance.

Next, go to Images > CREATE IMAGE and select the instance you just set up as the Source disk.

![](@site/static/img/gcp-installation/antmedia-gcp-marketplace-image-two-1024x496.png)

### Step 3: Create an Instance Template

After creating the image, navigate to Instance Templates > CREATE INSTANCE TEMPLATE menu.

Select the instance type
![](@site/static/img/gcp-installation/antmedia-gcp-marketplace-image-three.png)

On the same screen, navigate to the Boot Disk section and click on Change > Custom Images. Then, select the image you created in the previous step.

![](@site/static/img/gcp-installation/antmedia-gcp-marketplace-image-four.png)

After that, go to Advanced Options > Management Tab and add the following startup script to the Automation section:

```shell
#!/bin/bash
rm -rf /usr/local/antmedia/conf/instanceId
rm -rf /usr/local/antmedia/*.db.*
rm -rf /usr/local/antmedia/*.db
cd /usr/local/antmedia
./change_server_mode.sh cluster 10.128.0.5
```

In the script, please replace the private IP of your MongoDB created in Step 1. Click the Create button to create the template.

### Step 4: Create the Instance group

Navigate on Google Cloud to Compute Engine > Instance Groups > CREATE INSTANCE GROUP. Then, select the name and template as shown in the screenshot, and choose Multiple Zones for the Location.

![](@site/static/img/gcp-installation/antmedia-gcp-marketplace-image-five.png)

For auto-scaling, specify the minimum and maximum instance counts you want to set up, then configure the CPU Utilization to 60% and click on the Create button.

Then repeat the same process for the Edge group as well.

### Step 5: Create a Load Balancer

The autoscaling groups are now created. Let’s move on to configuring the Load Balancer to distribute the load.

In the search bar, type “Load Balancer” and open the “Load balancing” service, then click **CREATE LOAD BALANCER** and select **Application Load Balancer**.

![](@site/static/img/gcp-installation/antmedia-gcp-marketplace-image-six.png)

In the Load Balancer menu, after selecting the Name and Protocol, go to the certificate section and create a new certificate by choosing “CREATE A NEW CERTIFICATE.”

![](@site/static/img/gcp-installation/antmedia-gcp-marketplace-image-seven.png)

![](@site/static/img/gcp-installation/antmedia-gcp-marketplace-image-eight.png)

Then, fill in the required fields and create the certificate. You can also use your own SSL certificate by uploading it. After that, click on the “Backend configuration” section.

![](@site/static/img/gcp-installation/antmedia-gcp-marketplace-image-nine.png)

![](@site/static/img/gcp-installation/antmedia-gcp-marketplace-image-ten.png)

In the upcoming screen, we will create the Backend Pool (both Origin and Edge) and Health Check.

In the same backend configuration, to create the Health Check configuration, click on Health Check > CREATE HEALTH CHECK and add it as shown below:

![](@site/static/img/gcp-installation/antmedia-gcp-marketplace-image-eleven.png)

Click on Create to finalize the configuration for both the Backend and the Health check. Then, click Create again to complete the Load Balancer configuration.

Repeat these steps for the Edge side as well.

:::info
If the Load Balancers cannot access the Backend servers, you should add a firewall rule as shown below.
:::

Go to VPC Network > Firewall > Create firewall Rule and add the rule as shown below. Now the load balancer should be able to access the Ant Media Server Backend servers.

You can allow all IPs by adding the 0.0.0.0/0 CIDR block if required.

![](@site/static/img/gcp-installation/antmedia-gcp-marketplace-image-twelve.png)

### Step 6: Configure Firewall rule for Ant Media Servers

For TCP port 5000 and UDP ports 50000–60000, go to VPC Network > Firewall > Create firewall rule and add the rule as shown in the image below.

![](@site/static/img/gcp-installation/antmedia-gcp-marketplace-image-thirteen.png)

Finally, in your DNS management, define the IP addresses of both the origin and edge load balancers.

That’s it! You’re all set. You can now access the Ant Media Server servers to publish, and play the streams using either the origin or edge group.

![](@site/static/img/gcp-installation/antmedia-gcp-marketplace-image-fourteen.png)


![](@site/static/img/gcp-installation/antmedia-gcp-marketplace-image-fifteen.png)


<div align="center">
  <h2> ☁️ GCP Magic — Clustered, Scalable, Stream-Ready! ✨ </h2>
</div>

Your Ant Media Server cluster is now humming on **Google Cloud Platform!** With Origin and Edge nodes, a MongoDB backend, and a fully configured Load Balancer, your streaming setup can handle high traffic without breaking a sweat.

From deployment to broadcast, everything is automated, resilient, and under your control. Sit back, relax, and let the streams roll — **your viewers are in for a smooth ride!** 🎬🚀

