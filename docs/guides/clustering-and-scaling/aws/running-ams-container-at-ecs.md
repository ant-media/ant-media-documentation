In this document we will tell how you can run Ant Media Server Enterprise edition container on ECS in cluster mode.

### Step 0. Register to Ant Media Server Container product

### Step 1. Create AWS ECS Cluster
- Open AWS ECS Service
- Navigate Clusters
- Click *Create Cluster*
- Write *ams-cluster* as cluster name 
- Under Networking Settings  Select public VPC as Cluster VPC
  - Select at least one subnet from VPC
  
  ![](@site/static/img/ecs-standalone/create-ecs-cluster-1.png)

- Under Infrastructure settings
  - Set *EC2 instance type* to *c5.xlarge*
  - Select your keypair 

  ![](@site/static/img/ecs-standalone/create-ecs-cluster-1.png)



- then click create
  

### Step 2: Create AMS task definition
- Create a role with name of *ecsTaskExecutionRole* and attach *AmazonECSTaskExecutionRolePolicy*, *AWSMarketplaceMeteringRegisterUsage* policies

  ![](@site/static/img/ecs-standalone/ecs-task-execution-role.png)

- Open AWS ECS Service
- Navigate Task Definitions
- Click *Create New Task Definition with JSON*
- Paste following JSON by changing the execution role ARN:

```
  {
    "family": "ams-task-definiton",
    "containerDefinitions": [
        {
            "name": "ams",
            "image": "709825985650.dkr.ecr.us-east-1.amazonaws.com/ant-media/ant-media-server-ee:2.5.3",
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

- You may also change the image version, cpu and memory limit. 
- Click *Create*

### Step 3. Run AMS task definition
- Open AWS ECS Service
- Navigate Clusters
- Selec *ams-cluster*
- Navigate *Tasks* tab
- Click *Run New Task*
- Select *EC2* as Launch type

  ![](@site/static/img/ecs-standalone/run-task-1.png)

- Select *ams-task-definition* as Task Definition
- Click *Run Task*

### Step 4. Test the structure
- Access the login page http://EC2-Instance-IP:5080
- Login to access to the dashboard
  