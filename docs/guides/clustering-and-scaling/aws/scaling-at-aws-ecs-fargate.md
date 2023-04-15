In this document, we’re going to explain how to setup a Scalable Ant Media Server Cluster in Amazon Web Services (AWS) ECS Fargate with Ant Media Server Container. If you are not familiar with Ant Media Server Cluster, you may check the introduction part of [this](https://github.com/ant-media/Ant-Media-Server/wiki/Scaling-and-Load-Balancing) to be familiar with the definitions and the components.

Please consider there will be two different _"Cluster"_ word usage in this document. First one is [Ant Media Server Scalable Cluster](https://antmedia.io/ant-media-server-cluster) and we will use _Ant Media Server Cluster_ to refer it. The other is the AWS [ECS Cluster](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/clusters.html) which is a logical grouping of tasks or services and we will use _ECS Cluster_ to refer it.

### Step 0. Register to Ant Media Server Container product

### Step 1. Create AWS ECS Cluster
- Open AWS ECS Service
- Navigate Clusters
- Click *Create Cluster*
- Select Networking Only Type then click next
- Write *ams-cluster* as cluster name then click create
  
  ![](@site/static/img/ecs-cluster/ecs-fargate-create-cluster.png)

### Step 2: Create mongo task definition for MongoDB Container
- Open AWS ECS Service
- Navigate Task Definitions
- Click *Create New Task Definition*
- Select Fargate then click next
- Write *mongo-task-definiton* as Task Definition Name
- Create a role with name of *ecsTaskExecutionRole* and attach *AmazonECSTaskExecutionRolePolicy*, *AWSMarketplaceMeteringRegisterUsage* policies

  ![](@site/static/img/ecs-cluster/ecs-task-execution-role.png)

- Select ecsTaskExecutionRole as Task Role
  
  ![](@site/static/img/ecs-cluster/ecs-fargate-mongo-taskdef.png)

- In Task size Part set Task Memory 2 GB and Task CPU 1 vCPU
  
  ![](@site/static/img/ecs-cluster/ecs-fargate-mongo-task-size.png)

- Click *Add Container*
- Write mongo-container into Container Name, Write mongo into Image then click *Add*
- In Task Definition Page click *Create*

### Step 3. Run mongo task definition
- Open AWS ECS Service
- Navigate Clusters
- Selec *ams-cluster*
- Navigate *Tasks* tab
- Click *Run New Task*
- Select *Fargate* as Launch type
- Select *mongo-task-definition* as Task Definition
  
  ![](@site/static/img/ecs-cluster/ecs-fargate-run-mongo-taskdef.png)

- In VPC and security groups Part
- Select public VPC as Cluster VPC
- Select at least one subnet from VPC
- Edit Security Group as enabling 27017 TCP port
  
  ![](@site/static/img/ecs-cluster/ecs-fargate-mongo-security-group.png)

- It should be like
  
  ![](@site/static/img/ecs-cluster/ecs-fargate-mongo-vpc-sg.png)

- Click *Run Task*
- When task starts to work, copy the Private IP of Mongo Container

  ![](@site/static/img/ecs-cluster/ecs-fargete-running-mongo-task.png)

### Step 4. Create AMS node task definition
- Open AWS ECS Service
- Navigate Task Definitions
- Click *Create New Task Definition*
- Select Fargate then click next
- Write *ams-node-task-definiton* as Task Definition Name
- Select ecsTaskExecutionRole as Task Role
- In Task size Part set Task Memory 8 GB and Task CPU 4 vCPU
  
  ![](@site/static/img/ecs-cluster/ecs-fargate-ams-node-taskdef.png)

- Click *Add Container*
- Write 
  - ams-container into Container Name, 
  - 709825985650.dkr.ecr.us-east-1.amazonaws.com/ant-media/ant-media-server-ee:2.4.0.2 into Image 
  - add 5080 TCP into Port Mapping

  ![](@site/static/img/ecs-cluster/ecs-fargate-ams-container-def.png)

  - /usr/local/antmedia/start.sh,-m,cluster,-h, {Mongo Container IP} into Entry point
  then click *Add*
  ![](@site/static/img/ecs-cluster/ecs-fargate-ams-entry-point.png)

- In Task Definition Page click *Create*

### Step 5. Create Load Balancer
- Create an *origin-target-group* from EC2 Load Balancing
- Set Target Type *IP*, Port *5080*, VPC the public VPC 

  ![](@site/static/img/ecs-cluster/ecs-fargate-origin-target-group.png)

- Create an *edge-target-group* from EC2 Load Balancing
- Set Target Type *IP*, Port *5080*, VPC the public VPC 

  ![](@site/static/img/ecs-cluster/ecs-fargate-edge-target-group.png)

- Create an Application Load Balancer
- Add listeners for HTTP(S) 80, 5080, 443, 5443 
- Add Sertificate to ALB
- Add Security group that allows the ports 80, 5080, 443, 5443
- Configure routing using the previously created *origin-target-group*. Note that we will edit the routing after creation.
- When it is created edit Listeners as forwarding 80, 443 to *origin-target-group*, 5080, 5443 to *edge-target-group*
  
  ![](@site/static/img/ecs-cluster/ecs-fargate-alb-mapping.png)

### Step 6. Create ECS Service for origin nodes
- Open AWS ECS Service
- Navigate Clusters
- Selec *ams-cluster*
- Navigate *Services* tab
- Click *Create*
- Select *Fargate* as Launch type
- Select *ams-node-task-definition* as Task Definition
- Write *origin-service* as Service Name

  ![](@site/static/img/ecs-cluster/ecs-fargate-origin-service.png)

- Click Next
- In Configure network Page
  - Select public VPC as Cluster VPC
  - Select at least one subnet from VPC
  - Edit Security Group for Ant MediaServer
  
  ![](@site/static/img/ecs-cluster/ecs-fargate-ams-security-group.png)

  - Select Application LoadBalancer
  - Add 80/443 Listener Ports and select *origin-target-group*

  ![](@site/static/img/ecs-cluster/ecs-fargate-service-alb-configuration.png)

- In Auto Scaling Page  
- Define min, max, desired number of containers
- Add a CPU policy for scale in

  ![](@site/static/img/ecs-cluster/ecs-fargate-autoscale.png)


### Step 7. Create ECS Service for edge nodes
- Follow Step 6 by changing all *origin* to *edge* and *80/443* to *5080/5443*

### Step 8. Test the structure
- Access the login page http://Load-Balancer-URL:5080
- Login to access to the dashboard