---
title: K8s by Digital Ocean
description: Install Ant Media Server on Digital Ocean with just One Click
keywords: [How to Install Ant Media Server on Digital Ocean with just One Click, One Click Application, Digital Ocean, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 7
---

# Installing Ant Media Server on K8s by Digital Ocean

In this guide, we’ll walk through how to deploy **Ant Media Server Enterprise Edition** on a Kubernetes cluster using **DigitalOcean’s Marketplace** — all with just a few clicks.

:::info
Before you begin, make sure you have the [Kubernetes command line tool (`kubectl`)](https://kubernetes.io/docs/tasks/tools/) installed on your local machine.
:::

---

## Step 1: Launch the Ant Media Server App on DigitalOcean

1. Log into your [DigitalOcean Dashboard](https://cloud.digitalocean.com).
2. From the sidebar, navigate to **Marketplace**.
3. In the search field, type **"Ant Media Server Enterprise"**.
4. Click the app card when it appears.
5. Once selected, click **Install App**, then click **Install** to proceed with the deployment.

![Ant Media Server Search](@site/static/img/kubernetes/digitalOceanImageOnew.webp)

---

## Step 2: Install the Kubernetes Cluster

1. Select your preferred **data center region**.
2. Choose a **node pool** size suitable for your expected load (we recommend at least 3 nodes with `s-4vcpu-8gb` or better).
3. Review other cluster settings as needed.
4. Click **Create Cluster** to begin provisioning.

![Cluster Region and Pool Setup](@site/static/img/kubernetes/digitalOceanImageThreew.webp)
![Cluster Settings Confirmation](@site/static/img/kubernetes/digitalOceanImageFourw.webp)

## Step 3: Connect to Kubernetes

Once your cluster is deployed, you’ll be prompted to connect to it via the **“Getting Started with Kubernetes”** wizard.

We recommend following the **Automated (recommended)** setup, which uses the `doctl` CLI to configure access to your cluster.

If you haven't installed `doctl` yet, you can do so via:

```bash
sudo snap install doctl
```
Then, authenticate using:

```bash
doctl auth init
```

Paste your DigitalOcean API token when prompted. (Which you can create in your Digital Ocean Controll panel by navigating to the API tab > Generate New Token Button):

![Cluster Settings Confirmation](@site/static/img/kubernetes/digitalOceanImageFivew.webp)

Once authenticated, run the command shown in the Getting Started tab to save your kubeconfig locally. It will look something like this:

```bash
doctl kubernetes cluster kubeconfig save <your-cluster-id-or-name>
```

You can finish the rest of the **“Getting Started with Kubernetes”** wizard.

During the installation on DigitalOcean, default hostnames like edge.localhost or origin.localhost are set, but these need to be updated to match your own domain.

Replace yourdomain.com with your actual domain name (or use a temporary test domain like localtest.me if you're still testing).

:::info
localtest.me automatically resolves to 127.0.0.1, which is not your cluster’s IP.

To make origin.localtest.me and edge.localtest.me point to your actual cluster, you’ll need to override it locally:

On your local machine, open /etc/hosts as root and add the following line (replacing the load-balancer-ip with your own):

```bash
load-balancer-ip   origin.localtest.me edge.localtest.me
```
:::

```bash
# Set the hostname for the ORIGIN ingress
kubectl patch ingress ant-media-server-origin -n antmedia --type='json' -p='[{"op": "replace", "path": "/spec/rules/0/host", "value": "origin.yourdomain.com"}]'
```

```bash
# Set the hostname for the EDGE ingress
kubectl patch ingress ant-media-server-edge -n antmedia --type='json' -p='[{"op": "replace", "path": "/spec/rules/0/host", "value": "edge.yourdomain.com"}]'
```
If everything was setup correctly edge.yourdomain.com or origin.yourdomain.com will display the Ant Media Server Create Account Page:

![AMS registration page](@site/static/img/kubernetes/digitalOceanEightw.webp)


## Step 5: Setup SSL

The Marketplace product comes with a self-signed certificate. If you want to use Let's Encrypt or your own certificate, follow the documentation to [install an SSL certificate via Helm](/guides/clustering-and-scaling/kubernetes/deploy-ams-with-helm/#install-ssl)


