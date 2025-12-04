---
title: Deploy AMS Cluster on AWS ECS
description: Deploy AMS Cluster on AWS ECS
keywords: [ECS in cluster mode, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

# Run Ant Media Server Enterprise Edition container on Amazon Elastic Container Service (ECS) in cluster mode

This document explains how to run an Ant Media Server Enterprise edition container on ECS in cluster mode.

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
   
   - **Cluster name**: test-cluster


4. **Configure Infrastructure Settings**:
   
   - **Infrastructure**: Amazon EC2 instance.
   - **Provisioning model**: On-demand.
   - **EC2 instance type**: c5.xlarge (change to ensure compatibility with your workload).
   - **Desired capacity**: As needed.
   - **SSH Key pair**: Select your existing key pair or create a new one to access EC2 instances.


5. **Network Settings**:
   
   - Choose a **public VPC** or use the default VPC.
   - **Auto-assign public IP**: True
     
   ![image](https://github.com/user-attachments/assets/4d0d727b-4bd4-4478-a389-89c5a148c760)

6. **Create the Cluster**:
   
   - Review other default settings.
   - Click **Create**.
     
   ![image](https://github.com/user-attachments/assets/834311c5-e35f-4738-82f4-0e798bdcfe28)


## Step 2: Create an Identity and Access Management (IAM) Role for Task Execution

1. **Open the IAM Console**:
   
   - Go to **Identity and Access Management (IAM)** → **Roles** → **Create Role**.
  
3. **Choose Trusted Entity Type**:
   
   - **Trusted entity type**: AWS service.
  
4. **Choose Use Case**:
   
   - **Service or use case**: Elastic Container Service Task → **Next**.
     
     ![image](https://github.com/user-attachments/assets/bb46d5bd-4ce9-4955-ba81-a44fe7fcbd72)

5. **Attach Policies**:
   
   - Add the following managed policies:
   - **AmazonECSTaskExecutionRolePolicy** (mandatory for ECS task execution).
   - **AWSMarketplaceMeteringRegisterUsage** (required for Ant Media Server container licensing and metering).
  
6. **Review and Create**
   
   - Name the role **ecsTaskExecutionRole-test-cluster**.
   - Review the summary and click Create Role.
     
     ![image](https://github.com/user-attachments/assets/0ab6c231-8861-4e3a-99da-4dc3e438fc56)

## Step 3: Create an ECS Task Definition

1. **Create the Task Definition**:
   
   - Open the ECS Service and click **Task Definitions** → **Create New Task Definition with JSON**.
   
3. **Paste and Customize the JSON Configuration**:
   
   Replace ``xxxxxxxx`` in the ``taskRoleArn`` and ``executionRoleAr``n with the actual ARN of your ``ecsTaskExecutionRole``
   
```js

     {
    "family": "ams-task-definiton",
    "containerDefinitions": [
        {
            "name": "ams",
            "image": "709825985650.dkr.ecr.us-east-1.amazonaws.com/ant-media/ant-media-server-ee:2.11.3",
            "cpu": 0,
            "portMappings": [],
            "essential": true,
            "environment": [],
            "environmentFiles": [],
            "mountPoints": [],
            "volumesFrom": []
        }
    ],
    "taskRoleArn": "arn:aws:iam::xxxxxxxx:role/ecsTaskExecutionRole",
    "executionRoleArn": "arn:aws:iam::xxxxxxxx:role/ecsTaskExecutionRole",
    "networkMode": "host",
    "requiresCompatibilities": [
        "EC2"
    ],
    "cpu": "4048",
    "memory": "4096",
    "runtimePlatform": {
        "cpuArchitecture": "X86_64",
        "operatingSystemFamily": "LINUX"
    }
  }
  
```

- **Optional**: Update the ``image`` tag for the latest Ant Media Server version and adjust ``cpu`` and ``memory`` values if necessary.

  ![task-definition](https://github.com/user-attachments/assets/20aa19ed-0d89-4d1d-8f14-a724e45eb9a9)

## Step 4: Run the AMS Task

1. **Launch the Task**:
   
   - Go to **ECS Clusters** → ``test-cluster``.
   - Click **Tasks** → **Run New Task**.
   - Under **Compute configuration (advanced)** Choose **EC2** as the launch type.
   - **Deployment configuration** → Task → Task Definition → Choose **ams-task-definition**
     
     ![image](https://github.com/user-attachments/assets/7e043b3e-cf54-442a-a548-b03e0e1bb163)

   - Click **Create**.

3. **Verify Task Status**:
   
   - Ensure the task shows a **RUNNING** status under the **Tasks** tab.
     
     ![tasks](https://github.com/user-attachments/assets/66ebaca3-28bd-4387-a797-572b28cf92aa)


## Step 5: Test the Setup

1. **Find the EC2 Instance IP**:

   - Open the **EC2 Dashboard** → **Instances**.
   - Locate the instance running your container and note its public IP address.
  
     ![image](https://github.com/user-attachments/assets/f17f5a81-8c6d-47a0-90e5-70844212cbf1)

2. **Access Ant Media Server Dashboard:**

   - Open a browser and visit: ``http://<EC2-Instance-IP>:5080``
   - Log in to the dashboard by creating your credentials.
  
     ![image](https://github.com/user-attachments/assets/574133a6-39cf-4283-969c-b7bfccf14df5)

   - Your Ant Media Server using AWS ECS is ready to use.

     ![image](https://github.com/user-attachments/assets/53fd9282-4163-45fe-a279-43556687fb94)



<br /><br />
---

<div align="center">
<h2> 🚀 AMS on ECS — Scalable and Simplified </h2>
</div>

By deploying Ant Media Server on AWS ECS, you've embraced a **scalable**, **containerized architecture** that ensures high availability and efficient resource utilization. With ECS managing the **orchestration**, you can focus on **delivering seamless streaming experiences to your audience**, while AWS handles the underlying infrastructure complexities.


