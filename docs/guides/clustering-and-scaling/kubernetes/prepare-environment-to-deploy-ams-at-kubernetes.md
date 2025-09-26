---
title: K8s Preparation 
description: Preparation of Kubernetes Environment for AMS Deployment
keywords: [Kubernetes Environment for AMS Deployment, Ant Media Server Deployment, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

# Preparation of Kubernetes Environment for AMS Deployment

Kubernetes as known is the open source container orchestration tool that is widely used all over the world. With version 2.2.0+, Ant Media Server is fully compatible with Kubernetes. 

Let us show how to use Ant Media Server with Kubernetes.

## Introduction

The scope of this document is to give you the basics about how to run the Ant Media Server Kubernetes Cluster. If you're not familiar with [Kubernetes](https://kubernetes.io/docs/home/) then you can get started with Kubernetes and follow [interactive tutorials.](https://kubernetes.io/docs/tutorials/kubernetes-basics/create-cluster/cluster-intro/)

Running the Ant Media Server in Kubernetes is fully about clustering. If you are unfamiliar with Ant Media Server Clustering & Scaling, please read the [Cluster & Scaling documentation](https://antmedia.io/docs/category/clustering-and-scaling/).

You should have some prerequisites to deploy the Ant Media Server Cluster on Kubernetes.

## Prerequisites

### Docker Image

First of all, you should have an Ant Media Server docker image as a scaling unit. You can create your docker image or pull it from the docker repositories like Docker Hub, or AWS.

#### Create a Docker Image

We first need to create a docker image to run our pods in Kubernetes.

*   Get the Dockerfile: Dockerfile is available in Ant Media Server's Scripts repository that is actively used in the CI pipeline. You can get it with the command below.

    wget https://raw.githubusercontent.com/ant-media/Scripts/master/docker/Dockerfile_Process \
    -O Dockerfile_Process
    
*   Download or copy the AMS Enterprise Edition ZIP file into the same directory that you download the Dockerfile above.
*   Create the docker image. Before running the command below, please pay attention that you should replace `{CHANGE_YOUR_ANT_MEDIA_SERVER_ZIP_FILE}` in the command below with your exact Ant Media Server ZIP file name.

```shell
sudo docker build --network=host --file=Dockerfile_Process -t ant-media-server-enterprise-k8s:test --build-arg AntMediaServer={CHANGE_YOUR_ANT_MEDIA_SERVER_ZIP_FILE} .
```

The second thing we should point out is the image name and tag. The command above uses the `ant-media-server-enterprise-k8s:test` as the image name and tag. The image name is compatible with the deployment file. I mean you can change the image name and tag, just make it compatible with the deployment file we'll mention soon.

If everything is OK, your image is available in your environment. If you're going to use this image in AWS EKS or a similar service, you need to upload the image to a repository such as [AWS ECR](https://aws.amazon.com/ecr/) or you can run a [local registry.](https://docs.docker.com/registry/deploying/#run-a-local-registry)

#### Pulling Images from Repositories

You can get ready images from the following repositories.

**Docker Hub**: antmedia/enterprise:latest

## Kubernetes Cluster

### Own Kubernetes Cluster

You can create your own Kubernetes Cluster [on your servers.](https://antmedia.io/scale-ant-media-server-with-kubernetes/)

### Cloud Services

You can have a Kubernetes Cluster on the cloud services. You will find blog posts about how to create such a Kubernetes cluster below.

* [AWS EKS](/guides/clustering-and-scaling/kubernetes/installing-ams-on-aws-eks/)
* [Digital Ocean](https://antmedia.io/how-to-create-kubernetes-cluster-on-digital-ocean/) 
* [OVH](https://antmedia.io/auto-scaling-streaming-server-with-kubernetes/)


## Install Metric Server 

A metric server is used for autoscaling and is usually deployed by the cloud providers. If you are using a custom Kubernetes or the Metric Server is not deployed by your cloud provider you should deploy it manually as explained below. Firstly, Check if metrics-server is installed using the command below.  
  
```shell
kubectl get pods --all-namespaces | grep -i "metric"
```

You are going to see an output exactly like the below.  
  
```shell
kube-system   metrics-server-5bb577dbd8-7f58c           1/1     Running   7          23h
```
  

### Manual Installation

Download the components.yaml file on the master.

```shell
wget https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

Add the following line to line 132 of the file. ```--kubelet-insecure-tls```. The lines are going to seem exactly as below.

Deploy the YAML file that we have made changes.  
  
```shell
kubectl apply -f components.yaml
```
  
Check whether everything is working properly.  
  
```shell
kubectl get apiservices |grep "v1beta1.metrics.k8s.io"
```
  
The output of the command should be as follows.  
  
```shell
v1beta1.metrics.k8s.io                 kube-system/metrics-server   True        21h
```

## Preparing MongoDB

MongoDB is essential to create an Ant Media Server cluster. Before running Ant Media Server nodes, you should prepare it first. You can run it anywhere that can be accessible from the Ant Media Server nodes in one of the following ways.

*   You can install and run it directly [on a computer using this link.](https://github.com/ant-media/Ant-Media-Server/wiki/Scaling-and-Load-Balancing#1-installing-databasemongodb)
*   You can also use [Mongo Atlas](https://www.mongodb.com/cloud/atlas) as a cloud-based data store.
*   You can deploy it in your Kubernetes with the following command: **kubectl create -f https://raw.githubusercontent.com/ant-media/Scripts/master/kubernetes/ams-k8s-mongodb.yaml**

Whichever way you deploy Mongo DB, you should note the IP, user name, and password if exist. We will use them soon.

### Determine the Deployment Type

You can deploy your AMS onto Kubernetes in 2 ways: with HostNetwork or without HostNetwork.

If you prefer **With HostNetwork**, then you will have a single pod on a single node. In this deployment type, pods have their public IPs. So WebRTC connection is performed over these IPs.

If you prefer **Without HostNetwork**, then you can deploy multiple pods on a node. In this mode, you should have a TURN server in your setup for WebRTC connectivity.

Now, you can go to the next phase: AMS Kubernetes Deployment.  
  
At this point, you have a Kubernetes cluster now, to create an Ant Media Server cluster you can continue with this document. Please keep in mind that according to the deployment type, you should need some customization as told in the document.


<div align="center">
  <h2> 🚀 Your Streaming Infrastructure- Kubernetes way! 🎉 </h2>
</div>

Congratulations! You've successfully prepared your Kubernetes environment for Ant Media Server deployment. With your **Docker image built**, Kubernetes cluster set up, and Metric Server installed, you're all set to scale your **streaming infrastructure effortlessly.**

From here, you can proceed to deploy AMS using your preferred method—be it **manual deployment, Helm charts, or cloud-specific templates**. Your journey towards a robust, scalable, and automated streaming solution has just begun!

Get ready to deliver high-quality, low-latency streams to your audience with confidence. **The cloud is your stage—let the streaming begin! **🎬🌐✨

