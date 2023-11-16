---
title: Azure Kubernetes Service 
description: Installing Ant Media Server on Azure AKS 
keywords: [Installing Ant Media Server on AWS EKS, AWS EKS, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 8
---

# Installing Ant Media Server on Azure AKS

In this document, you will see step-by-step instructions on how to run Ant Media Server Enterprise version on Azure Kubernetes Service (AKS).

:::info
You need to have the [Azure CLI software](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli) and the [Kubernetes command line tool](https://kubernetes.io/docs/tasks/tools/)installed on your computer.
:::

## Step 1: Create a Kubernetes Cluster

After logging in to the Azure Portal, open the Kubernetes service and click on the **Create > Create a Kubernetes cluster** button.

![](@site/static/img/azure-aks/azure-aks-1.png)

After creating the Resource Group and configuring settings such as Region and Kubernetes cluster name, navigate to the **Next: Node pools** tab.

![](@site/static/img/azure-aks/azure-aks-2.png)

## Step 2: Configure Node Pools

In the **Node pools** tab, enter the node pool (default agent pool) and make the desired changes according to your preferences. However, it is essential to ensure that **Enable public IP per node** is selected here.

![](@site/static/img/azure-aks/azure-aks-3-1.png)
![](@site/static/img/azure-aks/azure-aks-3-2.png)

## Step 3: Review and Create Cluster

Navigate to the **Review + create** tab and click **Create** to complete the setup (other settings are optional).

![](@site/static/img/azure-aks/azure-aks-4.png)

## Step 4: Connect to Cluster

When the installation is complete, you will see a screen like the one below. And then Click on the **Connect to cluster** button.

![](@site/static/img/azure-aks/azure-aks-5-1.png)

Run the following commands to connect to the cluster from your local computer.

![](@site/static/img/azure-aks/azure-aks-5-2.png)

```
az account set --subscription your-subscription
az aks get-credentials --resource-group your-resource-group --name your-cluster-name

```
## Step 5: Install Ant Media Server via Helm

After successfully accessing the cluster, let's add and update the Ant Media Helm repository as follows.

```
helm repo add antmedia https://ant-media.github.io/helm
helm repo update
```

And start the installation as follows

:::warning
Don't forget to change your licenseKey, origin and edge values.
:::

```
helm install antmedia antmedia/antmedia --set origin=origin.antmedia.cloud --set edge=edge.antmedia.cloud  --set licenseKey="your-key" --set UseGlobalIP=false 
--namespace antmedia --create-namespace
```

## Step 6: Configure Ingress Controller

In Azure AKS, we need to use an Application Gateway for which you can select **Networking > Enable ingress controller** from your cluster, and then create the Application Gateway.

![](@site/static/img/azure-aks/azure-aks-7.png)

Then run the following command to enable Application Gateway Ingress.

```shell
kubectl annotate ingress -n antmedia kubernetes.io/ingress.class=azure/application-gateway --overwrite --all
```

If the installation and configuration was successful, the public IP address/domain name will be output when running the command `kubectl get ingress -n antmedia`. After making the DNS registration, you will be able to access Ant Media Server using the hostname thats been configured.

![](@site/static/img/azure-aks/azure-aks-8-1.png)

Execute the `kubectl get svc -n antmedia` command to fetch the RTMP address from the `EXTERNAL-IP` column to start live streaming using RTMP on port 1935.

![](@site/static/img/azure-aks/azure-aks-8-2.png)
