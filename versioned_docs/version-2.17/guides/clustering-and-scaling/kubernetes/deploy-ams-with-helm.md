---
title: Helm Deployment 
description: Deploy Ant Media Server with Helm Charts
keywords: [Deploy Ant Media Server with Helm Charts, Helm Charts, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 5
---

# Deploy Ant Media Server with Helm Charts

Helm is a tool that enables the management of applications on a Kubernetes cluster. It's possible to deploy, upgrade, and control versions using Helm.

Ant Media Server can be easily deployed to a Kubernetes cluster via Helm with just one click. 

Helm supports installations on Ubuntu and other distros. Before installing Helm on any operating system, it is necessary to set up a Kubernetes cluster. If Helm is not installed on your computer, you can follow the steps below for Ubuntu 20.04 and also refer to the [Helm installation documentation](https://helm.sh/docs/intro/install/) for other distributions.

:::info
You will need to have the [Kubernetes command line tool](https://kubernetes.io/docs/tasks/tools/) and [Helm](https://helm.sh/docs/intro/install/) that package manager for Kubernetes installed on your computer.
:::

## Visual Walkthrough: Video Guide

<iframe width="560" height="315" src="https://www.youtube.com/embed/FKX86Ng8Z7Y?si=c_UwLJfNxIHtgooL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


## Prerequisites

- Kubernetes >= 1.23 (Your cluster must be ready and accessible)
- Helm v3
- cert-manager

## Install Helm

Install the helm tool by running the following commands.

```shell
curl https://baltocdn.com/helm/signing.asc | gpg --dearmor | sudo tee /usr/share/keyrings/helm.gpg > /dev/null 
sudo apt-get install apt-transport-https --yes 
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/helm.gpg] https://baltocdn.com/helm/stable/debian/ all main" | sudo tee /etc/apt/sources.list.d/helm-stable-debian.list 
sudo apt-get update 
sudo apt-get install helm
```
## Install the Helm Chart

A Helm chart is a package that contains all the necessary resources to deploy an application to a Kubernetes cluster. This includes YAML configuration files for deployments, services, secrets, and config maps that define the desired state of your application. In this case, Ant Media Server.

The Ant Media Server Helm chart installs the following:

- MongoDB deployment
- Origin deployment
- Edge Deployment
- Ingress controller

Add the Ant Media Server repository to Helm and install it using the following commands.

```shell
helm repo add antmedia https://ant-media.github.io/helm
helm repo update
helm install antmedia antmedia/antmedia --set origin={origin}.{example.com} --set edge={edge}.{example.com} --namespace antmedia --create-namespace
```
After the installation is finished there will be:

 - 1 MongoDB pod
 - 1 Ant Media Origin pod
 - 1 Ant Media Edge pod
 - Nginx Ingress will be installed (navigate to the end of this page for available parameters)
  
The output of the command `kubectl get pods -n antmedia` should be as below.

```shell
NAME READY STATUS RESTARTS AGE ant-media-server-edge-7d8fd58f94-dwqbs 1/1 Running 0 2m15s ant-media-server-origin-57d974f4f7-655rf 1/1 Running 0 2m15s antmedia-ingress-nginx-controller-6b49f64bfc-zbblx 1/1 Running 0 2m15s mongo-69888cbbb9-d2zrc 1/1 Running 0          2m15s
```
If the installation completed successfully, execute `kubectl get ingress -n antmedia` command to fetch the Ingress IP address so that the DNS records for the hostname can be updated. 

`kubectl get ingress -n antmedia`

**Example Output**

```shell
NAME                      CLASS    HOSTS                   ADDRESS        PORTS     AGE
ant-media-server-origin   <none>   origin.antmedia.cloud   x.x.x.x        80, 443   9m45s
ant-media-server-edge     <none>   edge.antmedia.cloud     x.x.x.x        80, 443   9m55s
```
Confirm the DNS update by making a query:

```shell
dig origin.antmedia.cloud +noall +answer
dig edge.antmedia.cloud +noall +answer
```
Example output:
```shell
root@murat:~$ dig edge.antmedia.cloud +noall +answer
edge.antmedia.cloud.	300	IN	A	x.x.x.x
```
If the result of this output is the expected Ingress IP address, then the DNS has been updated successfully and Ant Media Server can be accessed via HTTPS (self-signed) or HTTP.

## Install SSL

By default, a self-signed certificate comes in the Ant Media Server Kubernetes structure that is installed with Helm. If required, this can be replaced with a custom certificate as shown below or follow the steps further down to install via Let's Encrypt.

```shell
kubectl create -n antmedia secret tls ${CERT_NAME} --key ${KEY_FILE} --cert ${CERT_FILE} 
Use Let's Encrypt
```

This can also be executed using a script through a guided installation process:

```shell
wget https://raw.githubusercontent.com/ant-media/helm/add_helm_repo/ams-k8s-ssl.sh
bash ams-k8s-ssl.sh
```
Expect a short pause while the certificate is being created.

If everything went well, the output of the `kubectl get -n antmedia` certificate command will show the value **True** as follows.

```shell
NAME                   READY   SECRET                 AGE
antmedia-cert-origin   True    antmedia-cert-origin   21m
antmedia-cert-edge     True    antmedia-cert-edge     24m
```
Now Ant Media Server Edge/Origin instances can be accessed over HTTPS.

```
https://{origin}.{example}.{com}
https://{edge}.{example}.{com}
```

## Parameters

You can customize the Ant Media Cluster installation using the following parameters.

| Parameter                               | Description                                                                                              | Default                                                                            |
|------------------------------------------------| -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `image.repository`                                        | image repository                                                                                         | `antmedia/enterprise` |
| `image.tag`                                        | image tag                                                                                         | `latest` |
| `origin`                                       | Domain name of Origin server                                                                             | `{}`                                                                        |
| `edge`                                         | Domain name of Edge server                                                                               | `{}`                                                                     |
| `hostNetwork`                                  | If `false`, use turn server                                                                              | `true`                                                                            |
| `mongodb`                                      | MongoDB host                                                                                             | `mongo`                                                                     |
| `licenseKey`                                      | License key                                                                                            | `{}`                                                                     |
| `autoscalingOrigin.targetCPUUtilizationPercentage`                            | Target CPU utilization percentage for autoscaler for Origin                                                                          | `60`                                                                               |
| `autoscalingOrigin.minReplicas`                                 | Minimum number of deployment replicas for the compute container.                                                                                | `1`                                                                               |
| `autoscalingOrigin.maxReplicas`                                  | Maximum number of deployment replicas for the compute container.                                    | `10`                                                                               |
| `autoscalingEdge.targetCPUUtilizationPercentage`                                 | Target CPU utilization percentage for autoscaler for Edge                         | `60`                                                                                |
| `autoscalingEdge.minReplicas`                          | Minimum number of deployment replicas for the compute container.     | `1`                                                                               |
| `autoscalingEdge.maxReplicas`                               | Maximum number of deployment replicas for the compute container.                                                         | `10`                                                                               |
| `MongoDBNodeSelector`                               | Node Affinity for MongoDB deployment.                                                         | `{}`                                                                               |
| `EdgeNodeSelector`                               | Node Affinity for AMS Edge deployment.                                                         | `{}`                                                                               |
| `OriginNodeSelector`                               | Node Affinity for Edge Origin deployment.                                                         | `{}`                                                                               |



## Example Usage
```shell
helm install antmedia antmedia/antmedia --set origin=origin.antmedia.io --set edge=edge.antmedia.io --set autoscalingEdge.targetCPUUtilizationPercentage=20 --set autoscalingEdge.minReplicas=2 --namespace antmedia --create-namespace
```


<div align="center">
  <h2> 🚀 AMS on Helm — Click, Deploy, Done! 🎉 </h2>
</div>

Ta-da! Your Ant Media Server cluster is now running via **Helm with Origin and Edge, database, and Ingress all set.** Everything’s automated, modular, and scalable.

**Helm just made your life easier**. You clicked deploy, and boom — streaming infrastructure done. Grab coffee, celebrate, and **get ready to stream like a boss!** ☕🎥

