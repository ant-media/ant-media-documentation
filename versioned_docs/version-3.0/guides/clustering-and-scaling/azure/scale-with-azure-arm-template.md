---
title: Scale AMS with Azure ARM Template
description: Scale AMS with Azure ARM Template
keywords: [Scale AMS with Azure ARM Template, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 3
---

# Scale AMS with Azure ARM (Azure Resource Manager)

Azure Resource Manager (ARM) is a service provided by Microsoft as part of its Azure cloud computing platform that allows for centralized resource management. Azure Resource Manager allows you to easily automate and orchestrate the deployment of Ant Media Server clusters using a single file.

## Creating Azure Resource Group

Let's now dive into setting up the ARM template and proceed step by step.

 - Sign in to the Azure portal (portal.azure.com) and sign in to your Azure account.
 
 - Search for "Resource groups" in the search bar, then click **New** to create a resource group. Specify the name and location.

![](@site/static/img/azure/ams-cluster-in-azure-with-arm-1.png)


## Azure Resource Manager Custom Deployment Template

 - Search for "Deploy a custom template" in the search bar, then click **Build your own template in the editor**. Download the template from [here](https://raw.githubusercontent.com/ant-media/Scripts/master/azure-arm-template/antmedia-azure-autoscale.yaml) and then upload the template using **Load file**.

![](@site/static/img/azure/ams-cluster-in-azure-with-arm-2.png)

 - After uploading the ARM template, you will see a screen like the one below. Fill in the required parameters.

![](@site/static/img/azure/ams-cluster-in-azure-with-arm-3.png)

**Resource Group**: The resource group where the cluster will be installed.

**Region**: The region where the cluster will be deployed.

**Origin Instance Capacity**: The number of instances that will be created in the origin group.

**Origin Instance Type**: The origin node instance type.

**Edge Instance Capacity**: The number of instances that will be created in the edge group.

**Edge Instance Type**: The edge node instance type.

**CPU Policy Target Value**: Average CPU utilization of the auto-scaling group. When the server reaches a 60% CPU utilization average, new servers will be added.

**MongoDB Instance Type**: MongoDB's instance type

**Cert Data**: The base64 version of your certificate in pfx format.

**Cert Password**: Password for your certificate

**Authentication Type**: Whether the connection/SSH method to all instances will be password or SSH key. If you choose the password, you must fill in the password field.

## Certification processes (Cert Data and Cert Password)

If you do not have a certificate, you can check this [link](https://antmedia.io/enable-ssl-on-ant-media-server/) to create one.

- Convert the existing or newly created certificate to pfx format as shown below (Enter the password you entered here in the Cert Password field.).

```bash
openssl pkcs12 -inkey /etc/letsencrypt/live/azure.antmedia.cloud/privkey.pem -in /etc/letsencrypt/live/azure.antmedia.cloud/cert.pem -export -out azure.antmedia.cloud.pfx
```

- Now convert the *.pfx format to base64 as follows:.

```bash
openssl base64 -in azure.antmedia.cloud.pfx -out azure.antmedia.cloud.base64
```

:::info
Replace the azure.antmedia.cloud domain with your own domain.
:::

 - Enter the content of the resulting file with the .base64 extension
   into **Cert Data** field.
   
 - After filling in all fields, click **Review + Create** button to
   start the deployment process. Wait for the deployment completion of the AMS cluster to complete. This process usually takes a few minutes but may vary depending on the size and configuration of the cluster.

## Connecting to the Cluster

Now that the cluster is created and ready, let’s connect to it.

-   Navigate to the  **Application Gateway**  service.

![Screenshot 2024 04 02 011235](https://antmedia.io/wp-content/uploads/2024/04/Screenshot-2024-04-02-011235-1024x510.png)
   
- You can connect to your cluster via the application gateway Public IP or you can update your DNS records based on the certificate hostname.

![Screenshot 2024 04 02 011309](https://antmedia.io/wp-content/uploads/2024/04/Screenshot-2024-04-02-011309-1024x499.png)

-   Once you reach the application gateway IP address, you will see the Ant Media Server Web panel dashboard and can create your login credentials.

![Screenshot 2024 04 02 011350](https://antmedia.io/wp-content/uploads/2024/04/Screenshot-2024-04-02-011350-1024x552.png)

 - The common name of the certificate was `azure.antmedia.cloud`, after I entered the IP address of the Application Gateway from DNS as an A record, I was able to access the Ant Media Server cluster with the domain directly.

![](@site/static/img/azure/ams-cluster-in-azure-with-arm-5-1.png)

- The origin node pool is routed to port 443 whereas the edge nodes can be reached on port 5443.


Congratulations! Your Ant Media Cluster has been deployed.

If you have any questions, please just drop your query at [GitHub discussions](https://github.com/orgs/ant-media/discussions).



<div align="center">
  <h2> 🧩 A³ — Azure, Ant Media, ARM! 🚀 </h2>
</div>

Your Ant Media Server cluster has been deployed using the **Azure ARM template**. With your **certificate, Application Gateway, and autoscaling parameters** in place, the cluster is ready to serve resilient, scalable streaming workloads.

All set — your streaming infrastructure is automated, repeatable, and under control. **Go stream confidently!** 🎬
