---
title: AWS Elastic Kubernetes Service 
description: Installing Ant Media Server on AWS EKS
keywords: [Installing Ant Media Server on AWS EKS, AWS EKS, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 6
---

# Installing Ant Media Server on Amazon Elastic Kubernetes Service (EKS)

:::info
You need to have the [AWS CLI software](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)  and the [Kubernetes command line tool](https://kubernetes.io/docs/tasks/tools/) installed on your computer.
:::

## Step 1: Navigate to EKS Service

After logging into AWS, search for the **EKS** service and find the **Elastic Kubernetes Service,** then click the **Add Cluster > Create** button.

![image.png](@site/static/img/image-286329.png)

* * *

## Step 2: Name the Kubernetes Cluster

After setting a name for the cluster, the Kubernetes version and Cluster Service Role should be selected. You can follow this link to create a [Cluster Service Role](https://docs.aws.amazon.com/eks/latest/userguide/service_IAM_role.html).

![image.png](@site/static/img/image-286429.png)

* * *

## Step 3: Configure Networking

In this section, subnets under VPC and VPC should be selected and a security group should be created.

![image.png](@site/static/img/image-286529.png)

Endpoint access should be selected as **Public** and the **Next** button is clicked.

![image.png](@site/static/img/image-286629.png)

* * *

## Step 4: Optionally Setup Logging

You can activate the following options for logging.

![image.png](@site/static/img/image-286729.png)

* * *

## Step 5: Create the Cluster

Let’s confirm the configurations have been set correctly and create the cluster by clicking the **Create** button.

![image.png](@site/static/img/image-286829.png)

* * *

## Step 6: Create a Node Group

When your cluster’s status is changed from pending to active, click on the **Configuration > Compute** tab and click on the **Add Node Group** button.

![image.png](@site/static/img/image-286929.png)

* * *

Type your node name and create the [Node IAM Role](https://docs.aws.amazon.com/eks/latest/userguide/create-node-role.html).

![image.png](@site/static/img/image-287029.png)

* * *

## Step 7: Scaling Configure 

Click on the **Next** button after you configure the scaling of the **AMI type, Capacity type, Instance type, Disk and Node Group**.

![image.png](@site/static/img/image-287129.png)

* * *

## Step 9: Select Subnets

Select your subnets and click on the **Next** button.

![image.png](@site/static/img/image-287229.png)

* * *

## Step 10: Create the Node Pool

Finally, after checking the configurations, create the Node Pool by clicking on the **Create** button.

![image.png](@site/static/img/image-287329.png)

* * *

## Step 11: Update Kubernetes Cluster

Update the Kubernetes cluster `kubeconfig` settings and then list the nodes with the `kubectl get nodes` command.
```
    aws eks --region your_region update-kubeconfig --name clustername
```    

![image.png](@site/static/img/image-287429.png)

* * *
## Step 12: Deploy Ant Media Server

Now, it’s time to deploy Ant Media Server on the Kubernetes cluster by creating the `yaml` files.

First, you should organize your image field since you are going to change images. Here are the steps to organize your image field:

```shell
wget https://raw.githubusercontent.com/ant-media/Scripts/master/kubernetes/ams-k8s-deployment.yaml 
kubectl create -f ams-k8s-deployment.yaml
kubectl create -f https://raw.githubusercontent.com/ant-media/Scripts/master/kubernetes/ams-k8s-hpa.yaml
kubectl create -f https://raw.githubusercontent.com/ant-media/Scripts/master/kubernetes/ams-k8s-rtmp.yaml 
wget https://raw.githubusercontent.com/ant-media/Scripts/master/kubernetes/ams-k8s-ingress.yaml
```
    

[Deploy the ingress.](/guides/clustering-and-scaling/kubernetes/deploy-ams-on-kubernetes/#kubernetes-ingress)

Once the changes on the **ams-k8s-ingress.yaml** file are done, let’s create our ingress.

```shell
kubectl create -f ams-k8s-ingress.yaml
```

If everything works well, you will see the public IP address/domain name in the **kubectl get ingress** command’s output. After you make your DNS registration, you will be able to access over the domain you have determined.

![image.png](@site/static/img/image-287529.png)

Run **kubectl get services** command to get the RTMP address. You can send broadcasts over 1935 to the domain name that appears as EXTERNAL-IP.

![image.png](@site/static/img/image-287629.png)

When we check the Ant Media Server dashboard, we can see that 2 nodes have joined the cluster.

![image.png](@site/static/img/image-287729.png)
