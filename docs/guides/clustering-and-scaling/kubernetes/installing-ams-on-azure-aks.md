---
title: Installing Ant Media Server on Azure AKS 
description: Installing Ant Media Server on Azure AKS 
keywords: [Installing Ant Media Server on AWS EKS, AWS EKS, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 8
---

# Installing Ant Media Server on Azure AKS

In this document, you will see step-by-step instructions on how to run Ant Media Server Enterprise version on Azure Kubernetes Service (AKS).

* You need to have the Azure CLI software installed on your computer.

1. After logging in to the Azure Portal, open the Kubernetes service and click on the **Create > Create a Kubernetes cluster** button.

![](@site/static/img/azure-aks/azure-aks-1.png)

2. After creating the Resource Group and configuring settings such as Region and Kubernetes cluster name, navigate to the **Next: Node pools** tab.

![](@site/static/img/azure-aks/azure-aks-2.png)

3. In the **Node pools** tab, enter the node pool (default agent pool) and make the desired changes according to your preferences. However, it is essential to ensure that **Enable public IP per node** is selected here.

![](@site/static/img/azure-aks/azure-aks-3-1.png)
![](@site/static/img/azure-aks/azure-aks-3-2.png)

4. Navigate to the **Review + create** tab and click **Create** to complete the setup (other settings are optional).

![](@site/static/img/azure-aks/azure-aks-4.png)

5. When the installation is complete, you will see a screen like the one below. And then Click on the **Connect to cluster** button.

![](@site/static/img/azure-aks/azure-aks-5-1.png)

Run the following commands to connect to the cluster from your local computer.

![](@site/static/img/azure-aks/azure-aks-5-2.png)

```
az account set --subscription your-subscription
az aks get-credentials --resource-group your-resource-group --name your-cluster-name

```


6. After successfully accessing the cluster, let's add and update the Ant Media Helm repository as follows.s

```
helm repo add antmedia https://ant-media.github.io/helm
helm repo update
```

And start the installation as follows (Don't forget to change your licenseKey and origin and edge values).

```
helm install antmedia antmedia/antmedia --set origin=origin.antmedia.cloud --set edge=edge.antmedia.cloud  --set licenseKey="your-key" --set UseGlobalIP=false 
--namespace antmedia --create-namespace
```

7. In Azure AKS, we need to use an Application Gateway for which you can select **Networking > Enable ingress controller** from your cluster, and then create the Application Gateway.

![](@site/static/img/azure-aks/azure-aks-7.png)

8. If everything works well, you will see the public IP address/domain name in the `kubectl get ingress -n antmedia` command’s output. After you make your DNS registration, you will be able to access over the domain you have determined.

Run kubectl get services command to get the RTMP address. You can send broadcasts over 1935 to the domain name that appears as EXTERNAL-IP.