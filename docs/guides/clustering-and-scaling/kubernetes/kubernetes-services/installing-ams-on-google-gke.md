---
title: GCP Kubernetes Service 
description: Installing Ant Media Server on GCP GKE
keywords: [Installing Ant Media Server on GCP GKE, GCP GKE, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 9
---

# Installing Ant Media Server on Google Kubernetes Engine (GKE)

In this post, I will guide you through the straightforward process of installing Ant Media Server on Google Kubernetes Engine (GKE). We'll explore the deployment method using Helm for seamless setup.

:::info
Before diving in, you need to have the [Google Cloud CLI ](https://cloud.google.com/sdk/docs/install), [Kubernetes command line tool](https://kubernetes.io/docs/tasks/tools/) and [Helm](https://helm.sh/docs/helm/helm_install/) installed on your computer.
:::

## Step 1: Creating Your GKE Cluster

Let's first set up a cluster on GKE. If the Kubernetes Engine service is not active, let's activate it, then open it and click **Create** button.

![image.png](@site/static/img/gcp-gke/antmedia-gke-1.png)

## Step 2: Cluster Configuration on Kubernetes Engine

Navigate to the Kubernetes Engine service and select `SWITCH TO STANDARD CLUSTER` on the top right corner while creating the cluster.

![image.png](@site/static/img/gcp-gke//antmedia-gke-2.png)


## Step 3: Customizing Cluster Settings

In this menu, select fields such as Zone, Name, and Kubernetes version, and then go to the Nodes tab.

![image.png](@site/static/img/gcp-gke//antmedia-gke-3.png)


## Step 4: Instance Selection and Configuration

We recommend using a compute-optimized instance. Here we select the c2-standard-4 node type.

![image.png](@site/static/img/gcp-gke//antmedia-gke-4.png)


## Step 5: Finalizing Cluster Setup

After making sure that Public Cluster is selected in the Networking tab, change the other settings to your requirements and click the `Create` button to complete the cluster setup.

![image.png](@site/static/img/gcp-gke/antmedia-gke-5.png)


## Step 6: Connect to Your Cluster

Now that our cluster is up and running, let's establish a connection using the Google SDK or Google Cloud CLI. Check out [this link](https://cloud.google.com/sdk/gcloud/reference/auth/login) for detailed instructions.

```bash
gcloud container clusters get-credentials ams-gke-cluster --zone us-central1-c --project antmedia-public-385620
```

![image.png](@site/static/img/gcp-gke/antmedia-gke-6.png)


## Step 7: Install Ant Media Server Cluster using Helm

It's time to deploy Ant Media Server onto our GKE cluster, and we'll do it effortlessly using Helm. If you would like to deploy using yaml files, please visit [here](https://antmedia.io/docs/guides/clustering-and-scaling/kubernetes/deploy-ams-on-kubernetes/) for manual deployment.

 - Add the Ant Media repository to Helm as follows:.

```bash
helm repo add antmedia https://ant-media.github.io/helm
helm repo update
```

 - Run the below command to start the deployment using the helm chart. For other parameters, please visit [here](https://github.com/ant-media/helm).

   ```bash
    helm install antmedia antmedia/antmedia \
    --set origin={origin}.{example.com} \
    --set edge={edge}.{example.com} \
    --set UseGlobalIP=false \
    --set licenseKey="YOUR_LICENSE_KEY" \
    --namespace antmedia \
    --create-namespace
   ```

If everything works well, you will see the public IP address/domain name in the `kubectl get ingress` command’s output. After that, you need to do the DNS registration to map the Ingress IP address to the Origin and Edge domains.

Once the DNS is mapped, you can confirm it via the below commands. You need to replace your domain.

```bash
dig origin.antmedia.cloud +noall +answer
dig edge.antmedia.cloud +noall +answer
```

## Step 8: Enable SSL

After the DNS configuration is done, set up SSL according to the steps [here](https://github.com/ant-media/helm?tab=readme-ov-file#installing-ssl).

There are multiple ways to setup the SSL certificate. If you do not have your own certificate to import, you can generate the SSL certificate by Let's Encrypt using the [bash script](https://github.com/ant-media/helm?tab=readme-ov-file#lets-encrypt).


## Step 9: Access AMS Cluster

Once all steps are done, you will be able to access your AMS cluster on the registered domains.

![image.png](@site/static/img/gcp-gke/antmedia-gke-7.png)

Congratulations! You've successfully deployed Ant Media Server on GKE. Let's get ready to publish and play!
