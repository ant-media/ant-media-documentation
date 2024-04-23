---
title: GCP Kubernetes Service 
description: Installing Ant Media Server on GCP GKE
keywords: [Installing Ant Media Server on GCP GKE, GCP GKE, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 9
---

# Installing Ant Media Server on Google Kubernetes Service (GKE)

In this post, I will guide you through the straightforward process of installing Ant Media Server on Google Kubernetes Engine (GKE). We'll explore the deployment method using Helm for seamless setup.

:::info
Before diving in, ensure you have the following tools at your disposal:

- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [Google SDK](https://cloud.google.com/sdk/docs/install)
- [helm](https://helm.sh/docs/helm/helm_install/)
You need to have the [AWS CLI software](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)  and the [Kubernetes command line tool](https://kubernetes.io/docs/tasks/tools/) installed on your computer.
:::

## Step 1: Creating Your GKE Cluster

Let's first set up a cluster on GKE. If the Kubernetes Engine service is not active, let's activate it then open then click **Create** button.

![image.png](@site/static/img/gcp-gke/antmedia-gke-1.png)

* * *

## Step 2: Cluster Configuration on Kubernetes Engine

Navigate to the Kubernetes Engine service and select "SWITCH TO STANDARD CLUSTER".

![image.png](@site/static/img/gcp-gke//antmedia-gke-2.png)

* * *

## Step 3: Customizing Cluster Settings

In this menu, select fields such as Zone, Name and Kubernetes version and then go to the Nodes tab.

![image.png](@site/static/img/gcp-gke//antmedia-gke-3.png)

* * *

## Step 4: Instance Selection and Configuration

We recommend using a compute optimized instance. Here we select the c2-standard-4 node type.

![image.png](@site/static/img/gcp-gke//antmedia-gke-4.png)

* * *

## Step 5: Finalizing Cluster Setup

After making sure that Public Cluster is selected in the Networking tab, change the other settings to your requirements and click the "Create" button to complete the cluster setup.

![image.png](@site/static/img/gcp-gke/antmedia-gke-5.png)

* * * 

## Step 6: Connect to Your Cluster

Now that our cluster is up and running, let's establish a connection using the Google SDK. Check out [this link](https://cloud.google.com/sdk/gcloud/reference/auth/login) for detailed instructions.

```
gcloud container clusters get-credentials ams-gke-cluster --zone us-central1-c --project antmedia-public-385620
```

![image.png](@site/static/img/gcp-gke/antmedia-gke-6.png)

* * *

## Step 7: Install Ant Media Server Cluster by using Helm

It's time to deploy Ant Media Server onto our GKE cluster, and we'll do it effortlessly using Helm. (If you would like to deploy using yaml files, please visit [here](https://github.com/ant-media/Scripts/tree/master/kubernetes).)

1. Add the Ant Media repository to Helm as follows.
```
helm repo add antmedia https://ant-media.github.io/helm
helm repo update
```
2. Set up your cluster as follows. For other parameters please visit [here](https://github.com/ant-media/helm).
```
helm install antmedia antmedia/antmedia \
--set origin={origin}.{example.com} \
--set edge={edge}.{example.com} \
--set UseGlobalIP=false \
--set licenseKey="YOUR_LICENSE_KEY" \
--namespace antmedia \
--create-namespace
```
* * *

If everything works well, you will see the public IP address/domain name in the kubectl get ingress command’s output. After you make your DNS registration, you will be able to access over the domain you have determined.

![image.png](@site/static/img/gcp-gke/antmedia-gke-7.png)


* * *

## Step 8: Enable SSL

After setting up SSL according to the steps [here](https://github.com/ant-media/helm?tab=readme-ov-file#installing-ssl), let's do publish/play.

Congratulations! You've successfully deployed Ant Media Server on GKE. Let's get ready to publish and play!