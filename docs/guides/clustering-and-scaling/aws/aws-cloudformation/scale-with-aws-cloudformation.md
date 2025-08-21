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

![](/img/clustering-and-scaling/aws-cloudformation/1-View%20Purchase%20Options.webp)


**2.** Now review the settings as shown in below screenshots and Please proceed by clicking “Subscribe” button

![](/img/clustering-and-scaling/aws-cloudformation/2.1-Subscribe.webp)

![](/img/clustering-and-scaling/aws-cloudformation/2.2-Subscribe.webp)

![](/img/clustering-and-scaling/aws-cloudformation/2.3-Subscribe.webp)


**3.** if everything goes well, you will see the screenshot below.

![](/img/clustering-and-scaling/aws-cloudformation/3.Launch.webp)

**4.** Now, download the CloudFormation template from the below link to your computer.

[https://raw.githubusercontent.com/ant-media/Scripts/master/cloudformation/antmedia-aws-autoscale-template.yaml](https://raw.githubusercontent.com/ant-media/Scripts/master/cloudformation/antmedia-aws-autoscale-template.yaml)

<br/>
<br/>

**5.** Log in to the AWS Dashboard and find **CloudFormation** in the search box.

![](/img/clustering-and-scaling/aws-cloudformation/4-CloudFormation.webp)

**6.** Click on **Create Stack** > **With New Resources** from the menu.

**7.** Select **Choose an Existing Template** > **Upload a Template File** and upload the downloaded YAML file. Click on "Next",

![](/img/clustering-and-scaling/aws-cloudformation/5-Create%20Stack-Upload%20Template.webp)

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

![](/img/clustering-and-scaling/aws-cloudformation/6.1-Configure%20Stack%20Options.webp)

![](/img/clustering-and-scaling/aws-cloudformation/6.2-%20Configure%20Stack%20Options.webp)

**10.** On the **Review and Create page**, you can review the summary of all parameters you’ve entered. If needed, you can edit any of them before proceeding.


**11.** If the template has been installed successfully, it says **Create Complete** in the red rectangle.

![](@site/static/img/AntMedia-CloudFormation-7.png)

**12.** You can access the URL addresses for LoadBalancer HTTP and HTTPS in the Outputs tab. If you define the CNAME record for the domain you have defined on Certificate Manager to the Load Balancer address below, you can access Ant Media Server without a certificate error on the domain you have defined.

![](@site/static/img/AntMedia-CloudFormation-8.png)

**13.** When you enter the Load Balancer URL in your browser, the Ant Media Dashboard will open. Here, you can create your account by providing the following details: **First Name, Last Name, Email Address, Password, and Confirm Password**.
<br/>
<br/>

![](/img/clustering-and-scaling/aws-cloudformation/create%20account%202.webp)

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
