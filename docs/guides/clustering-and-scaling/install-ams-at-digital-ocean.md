---
title: How to Install Ant Media Server on Digital Ocean with just One Click
sidebar_position: 8
---

Hello,

In this article I m going to explain how to install Ant Media Server K8s on DigitalOcean with just one click.

In this article, I'm going to explain how to install Ant Media Server K8s on DigitalOcean with just one click.

Login to Digital Ocean, click on the Marketplace tab.

![image.png](@site/static/img/ams-do-marketpace-1.png)

Then enter **"Ant Media Server Enterprise"** in the search field and select it as shown in the screenshot.

![image.png](@site/static/img/ams-do-marketpace-2.png)

Click **"Install App"** and then click **"Install"**.

![image.png](@site/static/img/ams-do-marketpace-3.png)

Choose the location, NodePool, and other settings and start the cluster setup.

![image.png](@site/static/img/ams-do-marketpace-4-1.png)
![image.png](@site/static/img/ams-do-marketpace-4-2.png)

After the installation is complete, download the kubernetes configuration file from the **Actions > Download Config** menu and export it as follows.

```
export KUBECONFIG=~/Downloads/ant-media-k8s-1-26-3-do-0-fra1-1679679927785-kubeconfig.yaml
```
Let's check everything is working.

```
kubectl get pods -n antmedia
```
```
NAME                                                 READY   STATUS    RESTARTS   AGE
ant-media-server-edge-6bc98b95d7-hrdlj               1/1     Running   0          6m49s
ant-media-server-origin-7d56c5f8d-sp2nl              1/1     Running   0          6m49s
antmedia-ingress-nginx-controller-755b7f6fb8-kmwrm   1/1     Running   0          6m49s
mongo-7946fc86ff-lzjnr                               1/1     Running   0          6m49s
```

```
kubectl get ingress -n antmedia
```
```
NAME                      CLASS   HOSTS              ADDRESS         PORTS     AGE
ant-media-server-edge     nginx   origin.localhost   x.x.x.x         80, 443   11m
ant-media-server-origin   nginx   edge.localhost     x.x.x.x         80, 443   11m
```

Unfortunately, the domain/subdomain cannot be determined during the installation in DigitalOcean, so update your Edge and Origin HOSTS addresses as follows.
```
kubectl patch ing/ant-media-server-origin --type=json -p='[{"op": "replace", "host": "edge.antmedia.cloud", "value":"test"}]' -n antmedia
kubectl patch ing/ant-media-server-origin --type=json -p='[{"op": "replace", "host": "edge.antmedia.cloud", "value":"test"}]' -n antmedia
```
Make sure your own domains are updated when you run the kubectl get ingress -n antmedia command again then you can update your dns.

You can now access your Ant Media Cluster over Ingress.

https://edge.{yourdomain}.com
http://origin.{yourdomain}.com

The Marketplace product comes with a self-signed certificate. If you want to use Let's Encrypt or your own certificate, you can follow the below document.

https://github.com/ant-media/helm#installing-ssl


