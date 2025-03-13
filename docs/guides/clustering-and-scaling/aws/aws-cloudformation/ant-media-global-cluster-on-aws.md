---
title: Deploying Ant Media Server Global Cluster On AWS 
description: Deploying Ant Media Server Global Cluster On AWS
keywords: [AMS Global Cluster on AWS, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

# Ant Media Server Global Cluster

Ant Media Server Global Cluster is like a team of servers spread across different regions of AWS, all working together to make sure you can watch videos without any interruptions. With Ant Media Server Global Cluster, each region hosts its own streaming origin, forming a network that leverages AWS's global infrastructure to ensure high availability and scalability. This document provides insights into the architecture and how to easily create an Ant Media Server Global Cluster on AWS.

## Defining Regions for Global Cluster

In a global cluster, we can create separate Ant Media Server cluster in each region and then club them together so that it behaves like one single cluster of Ant Media Server.

You can have an `N` number of regions but for simplicity, we will be creating this Global Cluster using two AWS regions, namely the Frankfurt region and the Mumbai region. The reason behind choosing these two regions is that one is in Europe and other in Asia and therefore are far from each other in terms of distance.

Before we start, make sure that you have an AWS account and have subscribed to [Ant Media Server Enterprise Edition on AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-464ritgzkzod6?sr=0-1&ref_=beagle&applicationId=AWSMPContessa) and a domain/subdomain for SSL certificate.

## Step 1: Launcing Ant Media Server Cluster

As the first step, we will be using the [AWS cloudformation template](https://antmedia.io/docs/guides/clustering-and-scaling/aws/scale-with-aws-cloudformation/) to launch Ant Media autoscaling clusters in both regions.

### Launch a cluster in Frankfurt region

Using the CloudFormation template, launch a cluster in the Frankfurt region by making the below changes.

- VpcCidrBlock: 172.31.0.0/16
- OriginCidrBlock: 172.31.1.0/24	
- EdgeCidrBlock: 172.31.2.0/24

### Lauch a cluster in Mumbai region

Using the CloudFormation template, launch another cluster in the Mumbai region with the default configurations.


## Step 2: Creating Peering Connection

Once the cluster creation in both regions is completed, you can proceed with VPC peering.

### Frankfurt VPC Peering Connection

- Go to VPC service in the Frankfurt region.

  **VPC > Peering connections > Create Peering connection**

  **VPC ID (Requester) :** Your VPC where Ant Media Cluster is installed. In this case, the requester is Frankfurt region.

  **Another Region :** Enter another region VPC Id where Ant Media Server Cluster is installed. In this case, the acceptor region is Mumbai.

  ![](@site/static/img/aws-global-cluster/peering-connection.png)

### Mumbai VPC Peering Connection

- Now, switch to the Mumbai region and accept the **Pairing** request in **VPC > Pairing connections**

  ![](@site/static/img/aws-global-cluster/accept-peering.png)

### Adding Routing Tables

- For the communication of VPCs, go to **VPC > Route tables** and add the default route for the Ant Media Cluster VPC as follows.

- In Frankfurt region, enter Mumbai region VpcCidrBlock **(10.0.0.0/16)** and select **Peering Connection** and **pcx-*** as the target.

  ![](@site/static/img/aws-global-cluster/spain-routing.png)

- We will do the same thing for the Mumbai region as well. Enter VpcCidrBlock **(172.31.0.0/16)** of Frankfurt region and select **Peering Connection** and **pcx-*** as the target.

  ![](@site/static/img/aws-global-cluster/hong-kong-routing.png)


## Step 3: MongoDB Setup

- When an Ant Media Server Cluster is launched with the CloudFormation template, along with the Origin and Edge nodes, it also creates a MongoDB instance which is used as the database.

- As we launched two exclusive clusters, one each in the Frankfurt region and the Mumbai region, it also created two MongoDB instances.

- Since we are configuring a global cluster, it will only require one database and therefore we can **terminate** the **MongoDB instance of the Mumbai region** and only **keep the Frankfurt region MongoDB node**.

- You can do it vice-versa as well.

### Updating MongoDB Security Group

- Now that the Mumbai region MongoDB node is terminated. Let's edit the Frankfurt region MongoDB node security group so that it can be used as the central database for the Global Cluster.

- You can open the MongoDB port 27017 for the Mumbai cluster by whitelisting the Mumbai cluster IP range as shown below.

  ![](@site/static/img/aws-global-cluster/mongo-security.png)


## Step 4: Editing the User Data for the Mumbai Cluster

- Now that we have updated the MongoDB security group settings, we need to modify the User Data settings for the Origin and Edge Launch templates of the Mumbai Cluster.

- Go to **EC2 > Autoscaling Groups > Launch Template > Origin and Edge tab** and **click Modify Template (Create new version)**

- From the **Actions** menu, go to **Advanced details > User data**.

- Find the below line and replace it with the MongoDB server private IP address in the Frankfurt region and save.

  ```bash
  bash /usr/local/antmedia/change_server_mode.sh cluster Frankfurt_MongoDB_Private_IP
  ```

  ![](@site/static/img/aws-global-cluster/user-data.png)

- The above needs to be done for both the Origin as well as the Edge groups.


## Step 5: Changing the Launch Template Version for AutoScaling Group

- After editing and updating the Launch templates for the Origin and Edge groups, we need to select the new template version.

- **Auto Scaling Groups > Origin > Details > Launch Template > Edit** and **Version**, select **Latest and update**.

  ![](@site/static/img/aws-global-cluster/hong-kong-launch-template.png)

- Do the same for the Edge group as well.

- Finally, **reset the AutoScale group capacity in Mumbai region** by setting the Desired Capacity to 0.

- This will terminate the current nodes and increasing the capacity again will launch new nodes with the updated settings.

- Now, when you will login to the Ant Media Server web panel, under Cluster tab all the nodes of both regions will be visible.

  ![](@site/static/img/aws-global-cluster/cluster-nodes.png)

## Step 6: Setting AWS Global Accelerator

AWS Global Accelerator is a service in which you create accelerators to improve the performance of your applications for local and global users. It is a global service that supports endpoints in multiple AWS Regions.

- Find the Global Accelerator service and click **Create Accelerator**

  ![](@site/static/img/aws-global-cluster/global-accelerator.png)

- Add TCP listener for ports 443, 5443, and 1935

  ![](@site/static/img/aws-global-cluster/tcp-listeners.png)

 - Now, first add the endpoint groups before adding the endpoints.

   ![](@site/static/img/aws-global-cluster/endpoint-groups.png)

 - Add the endpoint as follows for the Frankfurt zone.

   ![](@site/static/img/aws-global-cluster/spain-accelerator.png)

- For the Mumbai region, add endpoint as follows

  ![](@site/static/img/aws-global-cluster/hong-kong-accelerator.png)

- Click **Create accelerator** and wait for it to be deployed.

- Finally the Global Accelarator is ready and can be accessed with the DNS name like
```aa9a2b9bdeef1fb0c.awsglobalaccelerator.com```

  ![](@site/static/img/aws-global-cluster/accelerator-complete.png)

  You can also map this DNS name with a domain of your choice.

- Congratulations, your multi region Ant Media Server Global Cluster is now ready. 
