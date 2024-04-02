---
title: Scale AMS with Azure ARM Template 
description: Scale AMS with Azure ARM Template
keywords: [Scale AMS with Azure ARM Template, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---

# Scale AMS with Azure ARM Template

Let's now dive into setting up the ARM template and proceed step by step.

**1.** Sign in to Azure Portal Sign in to your Azure account and navigate to portal.azure.com

**2.** Search "Resource groups" from the search bar, then click the **New** button to create a new resource group. Specify the resource group name and location.

![](@site/static/img/azure/ams-cluster-in-azure-with-arm-1.png)

**3.** Search "Deploy a custom template" from the search bar, then click the **Build your own template in the editor** button to upload the template that you download [here](https://raw.githubusercontent.com/ant-media/Scripts/master/azure-arm-template/antmedia-azure-autoscale.yaml) and then upload the template by using **Load file**

![](@site/static/img/azure/ams-cluster-in-azure-with-arm-2.png)

**4.** After uploading the ARM template you will see a screen like the one below. Fill in the required parameters.

![](@site/static/img/azure/ams-cluster-in-azure-with-arm-3.png)

**Resource Group**: Resource group where the cluster will be installed

**Region**: Region where the cluster will be established.

**Origin Instance Capacity**: How many instances will be created in the Origin cluster

**Origin Instance Type**: Origin cluster's instance type

**Edge Instance Capacity**: How many instances will be created in the edge cluster

**Edge Instance Type**: Edge cluster instance type

**CPU Policy Target Value**: Average CPU utilization of the Auto Scaling group. When the server reaches %60 CPU utilization average, new servers will be added

**MongoDB Instance Type**: MongoDB's instance type

**Cert Data**: The base64 version of your certificate in pfx format.

**Cert Password**: Password for your certificate

**Authentication Type**: Whether the connection method to all instances will be Password or SSH key. If you choose Password, you must fill in the Password field

**5.** Certification processes (Cert Data and Cert Password)

If you do not have a certificate, you can check this [link](https://antmedia.io/enable-ssl-on-ant-media-server/) to create one.

- Convert the existing or newly created certificate to pfx format as shown below(Enter the password you entered here in the Cert Password field.).
```
openssl pkcs12 -inkey /etc/letsencrypt/live/azure.antmedia.cloud/privkey.pem -in /etc/letsencrypt/live/azure.antmedia.cloud/cert.pem -export -out azure.antmedia.cloud.pfx
```
- Now convert the *.pfx format to base64 as follows.
```
openssl base64 -in azure.antmedia.cloud.pfx -out azure.antmedia.cloud.base64
```
Enter the content of the resulting file with the .base64 extension into **Cert Data** field. After filling in all fields, click **Review + Create** button to start the deployment process. Wait for Deployment Completion of the AMS cluster to complete. This process usually takes a few minutes but may vary depending on the size and configuration of the cluster.

**6.** When the deployment process is complete, you will see a screen like the one below. You can then go to the Application Gateway service and connect to your cluster via the Public IP it has or you can update your DNS based on the certificate hostname

![](@site/static/img/azure/ams-cluster-in-azure-with-arm-4.png)

**7.** The common name of my certificate was azure.antmedia.cloud, I entered the IP address of the Application Gateway from DNS as an A record and I was able to access it as follows.

![](@site/static/img/azure/ams-cluster-in-azure-with-arm-5-1.png)
![](@site/static/img/azure/ams-cluster-in-azure-with-arm-5-2.png)

