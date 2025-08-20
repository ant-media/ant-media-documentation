---
title: Scale AMS with AWS CloudFormation 
description: Scale AMS with AWS CloudFormation
keywords: [Scale AMS with AWS CloudFormation, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

# Scale AMS with AWS CloudFormation

Now let's start on to the CloudFormation setup and continue step by step.

[Watch the YouTube Video: Setting up an Ant Media Server Scaling Solution with CloudFormation In 5 minutes](https://www.youtube.com/watch?v=y7bP0u0jQRQ)

**1.** Firstly, let's subscribe to the Ant Media Server on the Amazon Marketplace.    
Open the link: [https://aws.amazon.com/marketplace/pp/B07569Y9SJ/](https://aws.amazon.com/marketplace/pp/B07569Y9SJ/) then please proceed by clicking “View Purchase Options” button.

<img width="1600" height="1200" alt="image" src="https://github.com/user-attachments/assets/b647b6ea-cd8c-49a2-865c-ec8070b8cbb6"/>
<br/>
<br/>


**2.** Now review the settings as shown in below screenshots and Please proceed by clicking “Subscribe” button

<img width="1600" height="1200" alt="image" src="https://github.com/user-attachments/assets/41f9613b-8ab5-48a8-8c0a-38d9ae2b679c" />

<img width="1600" height="1200" alt="image" src="https://github.com/user-attachments/assets/4a6fa128-c328-41f1-b5c0-27a6d7cd50f0" />

<img width="1797" height="794" alt="image" src="https://github.com/user-attachments/assets/d70684ad-5c7b-49d3-af10-a0c8d6ece3d1" />
<br/>
<br/>


**3.** if everything goes well, you will see the screenshot below.

<img width="2238" height="329" alt="image" src="https://github.com/user-attachments/assets/f3fbd09a-3bb0-4e5d-a5f4-70f7c0ce5672" />
<br/>
<br/>

**4.** Now, download the CloudFormation template from the below link to your computer.

[https://raw.githubusercontent.com/ant-media/Scripts/master/cloudformation/antmedia-aws-autoscale-template.yaml](https://raw.githubusercontent.com/ant-media/Scripts/master/cloudformation/antmedia-aws-autoscale-template.yaml)

<br/>
<br/>

**5.** Log in to the AWS Dashboard and find **CloudFormation** in the search box.

<img width="1600" height="695" alt="image" src="https://github.com/user-attachments/assets/da30d81e-d88d-4308-9c46-915543d49f35" />
<br/>
<br/>

**6.** Click on **Create Stack** > **With New Resources** from the menu.

**7.** Select **Choose an Existing Template** > **Upload a Template File** and upload the downloaded YAML file. Click on "Next",

<img width="3326" height="1497" alt="image" src="https://github.com/user-attachments/assets/6f33533f-42ca-49f4-b9e2-4373994f56d0" />

<br/>
<br/>

**8.** The **Specify Stack Deatils** page is where we will adjust all our settings.

![](@site/static/img/AntMedia-CloudFormation-4.png)

-   **Stack Name:** it will describe your stacks, it will be like a skeleton
-   **AntMediaEdgeCapacity:** How many Edge servers will be created.
-   **AntMediaEdgeCapacityMax:** Edge Server where Auto Scale will reach maximum
-   **AntMediaOriginCapacity:** How many Origin servers will be created.
-   **AntMediaOriginCapacityMax:** Origin Server where Auto Scale will reach maximum
-   **CPUPolicyTargetValue:** Average CPU utilization of the Auto Scaling group. When the server reaches %60 CPU utilization average, new servers will be added
-   **EdgeInstanceType:** Edge Instance Type

![](@site/static/img/AntMedia-CloudFormation-4-1.png)

-   **Email:** Subscription Email
-   **KeyName:** An Amazon EC2 key pair name.If there is no value here, you must create an ssh key (EC2 > Key Pairs).
-   **LoadBalancerCertificateArn:** Amazon Resource Name (ARN) of the certificate to associate with the load balancer. Please check this guide: [https://antmedia.io/ssl-from-aws-certificate-manager-for-domain-name/](https://antmedia.io/ssl-from-aws-certificate-manager-for-domain-name/)
-   **MongoDBInstanceType:** MongoDB Instance Type
-   **OriginInstanceType:** Origin Server Instance Type
-   **RTMP:** If you want to install RTMP Load balancer, please select True
-   **SSHLocation:** The IP address range that can be used to SSH to the EC2 instances
-   **Subnets:** The list of SubnetIDs in your Virtual Private Cloud (VPC). You must choose at least 2 subnets from the same VPC network.
-   **VpcCidrBlock:** Associates a CIDR block with your VPC. It should be the same as the VPC Network.
-   **VpcId:** VpcId of your existing Virtual Private Cloud (VPC). The VpcId must be the same as the subnets you choose.
  <br/>

<br/>

**9.** On the **Configure Stack Options** page, select the relevant options. Since this stack uses AWS Lambda, you’ll need to check the box **"I acknowledge that AWS CloudFormation might create IAM resources"** (IAM permissions are required for Lambda to fetch the latest image). Once done, click **Next** to continue.

<img width="2960" height="1499" alt="image" src="https://github.com/user-attachments/assets/8b7356a5-9fd2-446a-8f15-9cd4cae1e010" />
<br/>
<br/>
<img width="2486" height="1616" alt="image" src="https://github.com/user-attachments/assets/82dc5037-ebf0-4d9d-a96c-2d08ef3d4d9b" />

<br/>

<br/>

**10.** On the **Review and Create page**, you can review the summary of all parameters you’ve entered. If needed, you can edit any of them before proceeding.


**11.** If the template has been installed successfully, it says **Create Complete** in the red rectangle.

![](@site/static/img/AntMedia-CloudFormation-7.png)

**12.** You can access the URL addresses for LoadBalancer HTTP and HTTPS in the Outputs tab. If you define the CNAME record for the domain you have defined on Certificate Manager to the Load Balancer address below, you can access Ant Media Server without a certificate error on the domain you have defined.

![](@site/static/img/AntMedia-CloudFormation-8.png)

**13.** When you enter the Load Balancer URL in your browser, the Ant Media Dashboard will open. Here, you can create your account by providing the following details: **First Name, Last Name, Email Address, Password, and Confirm Password**.
<br/>
<br/>

<img width="600" height="586" alt="image" src="https://github.com/user-attachments/assets/fb1c9d51-9b02-4cb9-a0b2-210416e3d640" />
<br/>

<br/>

 **14.** Once logged in, When you click on the **Cluster tab**, you can see the servers in Cluster.

![](@site/static/img/AntMedia-CloudFormation-9.png)

**15.** When you delete a stack, the AWS CloudFormation deletes all resources in that stack.

![](@site/static/img/AntMedia-CloudFormation-10(1).png)


<br/>
<br/>

We have now covered most of the topics around CloudFormation. So, what do we actually gain by using the CloudFormation template for Ant Media Server?
Well, while you’re sipping your coffee, the following steps are automatically handled for you:

-  EC2 instance provisioning
-  Security Group configuration
-  Ant Media Server installation
-  Ant Media Server Cluster setup
-  Auto Scaling configuration
-  Load Balancer setup

If you have any questions, feel free to drop your query here: https://github.com/orgs/ant-media/discussions
