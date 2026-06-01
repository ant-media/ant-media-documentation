---
title: AWS Elastic Kubernetes Service 
description: Installing Ant Media Server on AWS EKS
keywords: [Installing Ant Media Server on AWS EKS, AWS EKS, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 6
---

# Installing Ant Media Server on Amazon Elastic Kubernetes Service (EKS)

:::info
Ensure you have the [AWS CLI software](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)  and the [Kubernetes command line tool](https://kubernetes.io/docs/tasks/tools/) installed on your computer.
:::

## Step 1: Navigate to EKS Service

After logging into AWS, search for the **EKS** service, select **Elastic Kubernetes Service**, then click the 'Create Cluster' button and choose 'Custom Configuration'.

![image.png](https://github.com/user-attachments/assets/5100a760-00a0-41c0-899f-0eeadafd63bc)

* * *

## Step 2: Name the Kubernetes Cluster

After setting a name for the cluster, Cluster IAM Role should be selected. Then choose the Kubernetes version. You can follow this link to create a [Cluster Service Role](https://docs.aws.amazon.com/eks/latest/userguide/service_IAM_role.html).


![image.png](https://github.com/user-attachments/assets/8d39835b-8ebf-4df4-ab69-ff88d19fdc1b)


* * *

## Step 3: Configure Networking

In this section, subnets under VPC should be selected and a security group should be created.

![image.png](https://github.com/user-attachments/assets/731ff942-e566-457c-95b7-de640f02fe09)


* * *

## Step 4: Optionally Setup Logging

You can activate the following options for logging.

![image.png](https://github.com/user-attachments/assets/cc62d1d8-3cd1-4f2d-b9a3-eebcd1f87190)


* * *

## Step 5: Select add-ons

Follow this step with default selections.

![image.png](https://github.com/user-attachments/assets/f553f9bd-34f0-4455-8c4f-1e3c96481d49)


* * * 

## Step 6: Configure add-on Settings

Follow this step with default selections.

![image.png](https://github.com/user-attachments/assets/0e5b9c7b-3e0c-42e5-a2a5-3720936ea96e)


* * *

## Step 7: Create the Cluster

Let’s confirm the configurations have been set correctly and create the cluster by clicking the **Create** button.




* * *

## Step 8: Create a Node Group

When your cluster’s status is changed from pending to active, click on the **Configuration > Compute** tab and click on the **Add Node Group** button.

![image.png](https://github.com/user-attachments/assets/b650ca44-b77d-4568-975e-28cd2ee124f2)


* * *

Type your node name and create the [Node IAM Role](https://docs.aws.amazon.com/eks/latest/userguide/create-node-role.html).

![image.png](https://github.com/user-attachments/assets/f0e20712-6e8f-4ed3-ae60-a07f626290ab)


* * *

## Step 9: Scaling Configure 

Click on the **Next** button after you configure the scaling of the **AMI type, Capacity type, Instance type, Disk and Node Group**.

![image.png](https://github.com/user-attachments/assets/0d969172-ea61-4404-a1e4-7e1e37de7379)


* * *

## Step 10: Select Subnets

Select your subnets and click on the **Next** button.

![image.png](https://github.com/user-attachments/assets/d3c3f032-9043-452f-81ac-9112670b849a)


* * *

## Step 11: Create the Node Pool

Finally, after checking the configurations, create the Node Pool by clicking on the **Create** button.


* * *

## Step 12: Update Security Group

From the **Networking** tab, click on your **Cluster security group**.

![image.png](@site/static/img/aws-eks/aws-eks-12-1.png)

And then open UDP ports 50000-60000. 

![image.png](@site/static/img/aws-eks/aws-eks-12-2.png)

## Step 13: Update Kubernetes Cluster

Update the Kubernetes cluster `kubeconfig` settings and then list the nodes with the `kubectl get nodes` command.

```
aws eks --region your_region update-kubeconfig --name clustername
``` 

![image.png](@site/static/img/aws-eks/aws-eks-11.png)

* * *
## Step 14: Deploy Ant Media Server

Now, it’s time to deploy Ant Media Server on the Kubernetes cluster by applying the `yaml` files.

Download all yaml files from the following link or clone the repo.

https://github.com/ant-media/Scripts/tree/master/kubernetes

After downloading the files, you can customize the YAML files or deploy them directly.

```
kubectl create -f ams-k8s-mongodb.yaml
kubectl create -f ams-k8s-deployment-origin.yaml
kubectl create -f ams-k8s-deployment-edge.yaml
kubectl create -f ams-k8s-hpa-origin.yaml
kubectl create -f ams-k8s-hpa-edge.yaml
kubectl create -f ams-k8s-rtmp.yaml
```

[Deploy the ingress.](/guides/clustering-and-scaling/kubernetes/deploy-ams-on-kubernetes/#kubernetes-ingress)

Once the changes on the **ams-k8s-ingress.yaml** file are done, let’s create our ingress.

```
kubectl create -f ams-k8s-ingress-origin.yaml
kubectl create -f ams-k8s-ingress-edge.yaml
```

If everything works well, you will see the public IP address/domain name in the **kubectl get ingress** command’s output. After you make your DNS registration, you will be able to access over the domain you have determined.

![image.png](@site/static/img/aws-eks/kubectl-1.png)

Run **kubectl get services** command to get the RTMP address. You can send broadcasts over 1935 to the domain name that appears as EXTERNAL-IP.

![image.png](@site/static/img/aws-eks/kubectl-1.png)

When we check the Ant Media Server dashboard, we can see that 2 nodes have joined the cluster.

![image.png](@site/static/img/aws-eks/ams-dashboard.png)

If you don't want to deal with any of this then I suggest you look at helm deployment.

https://github.com/ant-media/helm


<div align="center">
  <h2> 🎊 Kubernetes Conquered — AMS on AWS EKS! ☁️🚀 </h2>
</div>

Congratulations! Your Ant Media Server cluster is now running on **AWS EKS** — fully **containerized, clustered, and ready to scale like a pro.** Origin and Edge nodes are humming, MongoDB is in place, and your Load Balancer is directing traffic flawlessly.

Take a deep breath, celebrate this milestone, and **get ready to stream like never before!** 🎬🎉

