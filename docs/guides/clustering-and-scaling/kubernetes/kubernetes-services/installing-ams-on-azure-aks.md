---
title: Azure Kubernetes Service 
description: Installing Ant Media Server on Azure AKS 
keywords: [Installing Ant Media Server on AWS EKS, AWS EKS, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 8
---

# Installing Ant Media Server on Azure AKS

In this document, you will see step-by-step instructions on how to run Ant Media Server Enterprise version on Azure Kubernetes Service (AKS).

:::info
You need to have the [Azure CLI software](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli) and the [Kubernetes command line tool](https://kubernetes.io/docs/tasks/tools/) installed on your computer.
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

There are a number of ways to connect to the cluster like using the `Cloud Shell`, `Azure CLI`, or `Run command`. So, let's discuss a couple of them.

### Using `Cloud Shell`

Open `Cloud Shell` and Run the following commands to connect to the cluster directly from the web.

![](@site/static/img/azure-aks/using-cloud-shell.png)

```
az account set --subscription your-subscription
az aks get-credentials --resource-group your-resource-group --name your-cluster-name
```

### Using 'Azure CLI`

To use `Azire CLI` on your local or remote computer, please make sure the prerequisites `Azure CLI` and `Kubectl` are installed on your computer.

![](@site/static/img/azure-aks/using-azure-cli.png)

Run the following commands to connect to the cluster from your computer.
```
az login
```
:::info
Afer you run the above command, you will see a prompt message like "To sign in, use a web browser to open the page https://microsoft.com/devicelogin and enter the code XXXXXXXXX to authenticate.
:::

- Follow the instructions, authenticate the code, and `Azire CLI` will open in the terminal.

![](@site/static/img/azure-aks/azure-cli-success.png)

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

You have two alternatives: you can opt for either Azure Application Gateway or Nginx Ingress Controller.

By default, Ant Media Server deploys a self-signed certificate. If You should prefer to utilize a signed certificate, kindly refer to [this link](https://antmedia.io/docs/guides/clustering-and-scaling/kubernetes/deploy-ams-on-kubernetes/#install-an-ssl-certificate) for detailed instructions.


1. Nginx Ingress Controller: For the Nginx Ingress Controller, you will only need to run the following command.

```
kubectl annotate service antmedia-ingress-nginx-controller service.beta.kubernetes.io/azure-load-balancer-health-probe-request-path=/healthz -n antmedia
```


2. Azure Application Gateway: Need to use an Application Gateway for which you can select **Networking > Enable ingress controller** from your cluster, and then create the Application Gateway.

![](@site/static/img/azure-aks/azure-aks-7.png)

Then run the following command to enable Application Gateway Ingress.

```shell
kubectl annotate ingress -n antmedia kubernetes.io/ingress.class=azure/application-gateway --overwrite --all
```
If you are using Application Gateway as Ingress, you should make changes to the deployment files as follows.
```
kubectl edit deployment ant-media-server-origin -n antmedia
```
Add the following lines under `image:`

```
        lifecycle:
          postStart:
            exec:
              command:
              - /bin/sh
              - -c
              - sed -i '/org.apache.catalina.valves.RemoteIpValve/d' /usr/local/antmedia/conf/jee-container.xml
```
These changes must be made on both Origin and Edge deployment side.

## Step 7

If the installation and configuration was successful, the public IP address/domain name will be output when running the command `kubectl get ingress -n antmedia`. After making the DNS registration, you will be able to access Ant Media Server using the hostname thats been configured.

![](@site/static/img/azure-aks/azure-aks-8-1.png)

Execute the `kubectl get svc -n antmedia` command to fetch the RTMP address from the `EXTERNAL-IP` column to start live streaming using RTMP on port 1935.

![](@site/static/img/azure-aks/azure-aks-8-2.png)

## Step 8: Enable SSL
We will discuss how to enable SSL for both cases, using `Nginx Ingress Controller` or using `Azure Application Gateway`

### Nginx Ingress Controller
After creating the DSN records for both Origin and Edge.
- Get the `ams-k8s-ssl.sh` script and run it.
```
wget https://raw.githubusercontent.com/ant-media/helm/add_helm_repo/ams-k8s-ssl.sh
bash ams-k8s-ssl.sh
```

### Azure Application Gateway
Enabling SSL for Azure Application gateway is complicated as compared to Nginx Ingress.

If you want to use Azure Application gateway, please follow this guide to [Enable SSL for Azure Application Gateway](https://antmedia.io/ssl-for-azure-app-gateway-for-scaling-azure-ant-media/)

