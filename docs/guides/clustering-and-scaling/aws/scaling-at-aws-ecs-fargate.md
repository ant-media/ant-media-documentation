---
title: Scale AMS with AWS ECS Fargate 
description: Scale AMS with AWS ECS Fargate
keywords: [Scale AMS with AWS ECS Fargate, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 10
---

# Scale AMS with AWS ECS Fargate

This document will explain how to set up a Scalable Ant Media Server Cluster in Amazon Web Services (AWS) ECS Fargate with the Ant Media Server Container. If you are not familiar with Ant Media Server Cluster, you may check the introduction part of [this](https://antmedia.io/docs/guides/clustering-and-scaling/manual-configuration/cluster-installation/) to be familiar with the definitions and the components.

Please consider there will be two different _Cluster_ word usage in this document. The first one is [Ant Media Server Scalable Cluster](https://antmedia.io/docs/version-2.11.3/category/clustering-and-scaling/) and we will use _Ant Media Server Cluster_ to refer to it. The other is the AWS [ECS Cluster](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/clusters.html) which is a logical grouping of tasks or services and we will use _ECS Cluster_ to refer to it.

## Step 0. Register for Ant Media Server Container Product

Ensure you have registered & subscribed to the [Ant Media Server Enterprise container image](https://aws.amazon.com/marketplace/pp/prodview-w5vfsfcf3puju?sr=0-6&ref_=beagle&applicationId=AWSMPContessa) on the AWS Marketplace.

![container-image](https://github.com/user-attachments/assets/ce36ae7b-b389-470e-aed8-9430f13e5e0f)

## Step 1. Create AWS ECS Cluster

1. **Open the AWS Management Console**:
   
   - Navigate to the Amazon **Elastic Container Service (ECS)**.

2. **Create the Cluster**:
   
   - Click **Clusters** → **Create Cluster**.
   
   ![aws-ecs-home-page](https://github.com/user-attachments/assets/dfe6e3ba-fa05-42a2-a6e6-024ee5b9adc3)

3. **Configure Cluster Settings**:
   
   - **Cluster name**: ams-cluster-fargate
  
4. **Configure Infrastructure Settings**:

   - **Infrastructure**: AWS Fargate (serverless).
  
5. Review & create the cluster.


## Step 2: Create Mongo Task Definition for MongoDB Container

1. Go to **Task Definitions** in ECS.
2. Click Create **New Task Definition**.
3. Name the task definition (e.g., ``mongo-task-definition``)
4. **Infrastructure requirements**:
   - Launch type: AWS Fargate.
   - Operating system/Architecture: X86_64
   - Set CPU & Memory as you need.
   - Create an IAM role with the name of ``ecsTaskExecutionRole`` and attach ``AmazonECSTaskExecutionRolePolicy``, ``AWSMarketplaceMeteringRegisterUsage`` policies.
   - Select the ``ecsTaskExecutionRole`` under Task roles.
     
Check: [Creating an IAM role](https://antmedia.io/docs/version-2.11.3/guides/clustering-and-scaling/aws/running-ams-container-at-ecs/#step-2-create-an-identity-and-access-management-iam-role-for-task-execution).

5. Add a Container:
   - Container Name: **mongo-container**
   - Image: **mongo**
   - Container port: 27017 TCP

6. Review & create the task.


## Step 3: Run the Mongo Task Definition

1. In **Clusters**, select your cluster (e.g., ams-cluster-fargate).
2. Navigate to the **Tasks tab** and click **Run New Task**.
3. **Environment**:
   - Launch type: Fargate
   - Platform version: Latest
4. **Deployment Configuration**:
   - Family: mongo-task-definition
   - Revision: Latest
5. **Networking**:
   - VPC: Select a public VPC.
   - Subnets: Choose at least one.
   - Security Group: Allow 27017 TCP.
   - Public IP: Turned on.
6. Review & Create the task.
7. Once running, note the **Private IP** of the MongoDB container.

   ![image](https://github.com/user-attachments/assets/b50e9513-6c17-4c0a-a1d0-ca2c1a954c41)


## Step 4: Create the Ant Media Server (AMS) node task definition

1. Create a new task definition (similar to MongoDB).
2. Name it ``ams-node-task-definition``.
3. Assign the ``ecsTaskExecutionRole``.
4. **Infrastructure requirements**
   - Launch type: Fargate
   - Operating system/Architecture: X86_64
   - In the task size, set CPU & memory as needed. For AMS, using at least a 4-core CPU-optimized instance with 8GB RAM is recommended.
   - Assign the ``ecsTaskExecutionRole``.
5. Add a container.
   - **Container Name**: ams-container
   - **Image**: Replace with your AMS container image (e.g., 709825985650.dkr.ecr.us-east-1.amazonaws.com/ant-media/ant-media-server-ee:2.11.3).
   - **Port Mapping**: Add 5080 TCP.
6. Docker configuration.
   - **Entry point**: ``/usr/local/antmedia/start.sh,-m,cluster,-h,172.31.23.234`` (replace the private IP address with your MongoDB container private IP address).
   - Review & Create the task definition.
  
     ![image](https://github.com/user-attachments/assets/a21225f3-c57e-4b22-b3f2-51f1ec65d326)

  
## Step 5: Set Up Load Balancers

Now, we will create an application load balancer, to create a LB, one must create target groups.

### Origin Target Group

1. Go to EC2 Dashboard > Load Balancing > Target Groups.
2. Go to Create Target Group.
3. Configure:
   - **Target type**: IP addresses.
   - **Target group name**: ``origin-target-group``.
   - **Protocol**: HTTP
   - **Port**: 5080
   - **IP address type**: IPv4.
   - Select a public VPC.
4. Click Next.
5. Review & Create the target group.

    ![image](https://github.com/user-attachments/assets/2131525d-ee5e-468d-b1f1-60b991088d90)

### Edge Target Group

1. Go to EC2 Dashboard > Load Balancing > Target Groups.
2. Go to Create Target Group.
3. Configure:
   - **Target type**: IP addresses.
   - **Target group name**: ``edge-target-group``.
   - **Protocol**: HTTP
   - **Port**: 5080
   - **IP address type**: IPv4.
   - Select a public VPC.
4. Click Next.
5. Review & Create the target group.

    ![image](https://github.com/user-attachments/assets/88153f5e-af94-4a6f-be9b-bb962ffe8aba)


### Create an Application Load Balancer

1. Go to EC2 Dashboard > Load Balancing > Load Balancers.
2. Go to Create load balancer.
3. **Load balancer types**: Application Load Balancer.
4. Load Balancer Name: ``ams-load-balancer-fargate``.
5. **Scheme**: Internet-facing.
6. Select the public VPC & AZs.

   ![image](https://github.com/user-attachments/assets/fb7f527e-dbb1-433d-b168-4a775eeb8187)

7. **Security groups**: Add a Security group that allows the ports 80, 5080, 443, and 5443.
8. **Listeners and routing**: Add Listeners as forwarding 80, 443 to the ``origin-target-group`` and 5080, 5443 to the ``edge-target-group``.

   ![image](https://github.com/user-attachments/assets/298f038f-f44f-43a6-9b25-92072470a8f0)
  
9. **Default SSL/TLS server certificate**: Choose a certificate for SSL to access the LB. For this cluster, we'll use a certificate from the ACM.

    ![image](https://github.com/user-attachments/assets/2fa217af-121b-4fba-ba67-e043256458e0)

10. Review & Create the Load balancer.


## Step 6: Create an ECS Service for Origin Nodes

1. In **ECS Clusters**, select your ``ams-cluster-fargate`` cluster.
2. Go to **Services** and click Create.
3. Configure:
   - **Launch Type**: Fargate.
   - **Task Definition**: ams-node-task-definition.
   - **Service Name**: origin-service.
  
     ![image](https://github.com/user-attachments/assets/73d13f17-450c-4c36-b1c5-baea508456a3)

4. **Networking**:
   - VPC: Public VPC
   - Subnets: Choose at least one.
   - Security Group: Edit Security Group for the Ant Medi Server to allow the required [server ports](https://antmedia.io/docs/guides/installing-on-linux/installing-ams-on-linux/#server-ports).
  
     ![image](https://github.com/user-attachments/assets/99f7b099-92b8-467d-a1bc-75a15de57784)

5. **Load Balancer**:
   - Choose the **Application Load Balancer**.

     ![image](https://github.com/user-attachments/assets/943d63c2-7f3e-494b-916c-1146a9f2129b)

   - Use the **origin-target-group** for HTTP/HTTPS listeners.
  
     ![image](https://github.com/user-attachments/assets/dc8f4538-6016-45e8-9c4e-abca0ab2ed7a)

6. **Service Auto Scaling**:
   - Define min, max, and desired container numbers.
   - Add a CPU-based scaling policy.
  
     ![image](https://github.com/user-attachments/assets/1f6fad00-e9e3-46ac-b288-630a022ad5bf)

   - Review & Create the service.
  

## Step 7: Create an ECS Service for Edge Nodes

Repeat Step 6 with:
- Rename service to ``edge-service``.
- Replace HTTP/HTTPS listeners with AMS ports (5080/5443).
- Use **edge-target-group** for routing.

  ![image](https://github.com/user-attachments/assets/6651a2f7-5b85-4a3c-995c-83fd62b94fad)

- Congratulations! The Cluster is created. You can also check the different services & their status in CloudFormation > Stacks.

  ![image](https://github.com/user-attachments/assets/edfb81d2-25c3-4550-8a33-287575e733d3)



## Access the Cluster

- Go to the Load Balancer under EC2 Dashboard.
- Use the Load Balancer DNS Name to access the cluster.

  ![image](https://github.com/user-attachments/assets/4a859f50-d91b-4970-8d55-f61f9bfe7e54)

- The Origin Group is accessible via HTTPS on port 443

  ![image](https://github.com/user-attachments/assets/517535ba-50c9-4755-a886-c7bc45dc6c1c)

- The Edge Group is accessible via HTTPS on port 5443

  ![image](https://github.com/user-attachments/assets/2efb347c-689c-4e05-861e-a7be3a546643)

- You can create DNS record to access the cluster securily over HTTPS.















