---
title: K8s by Digital Ocean
description: Install Ant Media Server on Digital Ocean with just One Click
keywords: [How to Install Ant Media Server on Digital Ocean with just One Click, One Click Application, Digital Ocean, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 7
---

# Installing Ant Media Server on K8s by Digital Ocean

In this article, I'm going to explain how to install Ant Media Server K8s on DigitalOcean with just one click.

:::info
You need to have the [Kubernetes command line tool](https://kubernetes.io/docs/tasks/tools/) installed on your computer.
:::

## Step 1: Install Ant Media Server App

Login to Digital Ocean, click on the Marketplace tab.

![image.png](@site/static/img/kubernetes/ams-do-marketpace-1.png)

Then enter **"Ant Media Server Enterprise"** in the search field and select it as shown in the screenshot.

![image.png](@site/static/img/kubernetes/ams-do-marketpace-2.png)

Click **"Install App"** and then click **"Install"**.

![image.png](@site/static/img/kubernetes/ams-do-marketpace-3.png)

## Step 2: Install the Kubernetes Cluster

Choose the location, NodePool, and other settings and start the cluster setup.

![image.png](@site/static/img/kubernetes/ams-do-marketpace-4-1.png)
![image.png](@site/static/img/kubernetes/ams-do-marketpace-4-2.png)

## Step 3: Connect to Kubernetes

After the installation is complete, download the kubernetes configuration file from the **Actions > Download Config** menu and export it as follows.

```shell
export KUBECONFIG=~/Downloads/ant-media-k8s-1-26-3-do-0-fra1-1679679927785-kubeconfig.yaml
```
Let's check everything is working.

```shell
kubectl get pods -n antmedia
```
```shell
NAME                                                 READY   STATUS    RESTARTS   AGE
ant-media-server-edge-6bc98b95d7-hrdlj               1/1     Running   0          6m49s
ant-media-server-origin-7d56c5f8d-sp2nl              1/1     Running   0          6m49s
antmedia-ingress-nginx-controller-755b7f6fb8-kmwrm   1/1     Running   0          6m49s
mongo-7946fc86ff-lzjnr                               1/1     Running   0          6m49s
```

```shell
kubectl get ingress -n antmedia
```

```shell
NAME                      CLASS   HOSTS              ADDRESS         PORTS     AGE
ant-media-server-edge     nginx   origin.localhost   x.x.x.x         80, 443   11m
ant-media-server-origin   nginx   edge.localhost     x.x.x.x         80, 443   11m
```
## Step 4: Configure Hostnames
Unfortunately, the domain/subdomain cannot be determined during the installation in DigitalOcean, so update your Edge and Origin HOSTS addresses as follows.

```shell
kubectl patch ing/ant-media-server-origin --type=json -p='[{"op": "replace", "host": "edge.antmedia.cloud", "value":"test"}]' -n antmedia
kubectl patch ing/ant-media-server-origin --type=json -p='[{"op": "replace", "host": "edge.antmedia.cloud", "value":"test"}]' -n antmedia
```
Make sure your own domains are updated when you run the `kubectl get ingress -n antmedia` command again,  then you can update your DNS.

You can now access your Ant Media Cluster over Ingress.

```
https://edge.{yourdomain}.com
http://origin.{yourdomain}.com
```

## Step 5: Setup SSL

The Marketplace product comes with a self-signed certificate. If you want to use Let's Encrypt or your own certificate, follow the documentation to [install an SSL certificate via Helm](/guides/clustering-and-scaling/kubernetes/deploy-ams-with-helm/#install-ssl)


