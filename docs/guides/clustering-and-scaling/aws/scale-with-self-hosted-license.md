---
title: Scale AMS on AWS using Self-Hosted license
description: Scale AMS on AWS using self-hosted license
keywords: [Scale AMS with AWS CloudFormation, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 7
---


# Deploy and Scale Ant Media Server on AWS Using a Self-Hosted License

The default Ant Media Server **[AWS CloudFormation](https://antmedia.io/docs/guides/clustering-and-scaling/aws/scale-with-aws-cloudformation/)** deployment uses the Ant Media Server image available on the AWS Marketplace.

However, if you have purchased a **[self-hosted license directly from Ant Media](https://antmedia.io/#products)**, you may want to deploy and autoscale your cluster using your own licensed Ant Media Server image instead of the Marketplace image.

This guide explains how to create a custom AWS AMI with your Ant Media Server license preconfigured and use it in the CloudFormation autoscaling template.

:::info
This guide assumes that you already have valid Ant Media Server Enterprise licenses for your deployment. If you need licenses, please contact contact@antmedia.io
:::

## Prerequisites

Before you begin, ensure that you have:

-   An AWS account with permissions to create EC2 instances and AMIs
-   A valid Ant Media Server Enterprise self-hosted license
-   Basic familiarity with AWS EC2 and CloudFormation

## Step 1: Create a Licensed Ant Media Server AMI

### Launch and Install Ant Media Server

1.  Launch a standard EC2 instance (recommended: **c5.xlarge**).
2.  Install Ant Media Server by following the [**Linux installation**](https://antmedia.io/docs/guides/installing-on-linux/installing-ams-on-linux/) guide.
3.  After installation:
    -   SSL configuration is **not required** for the AMI.
    -   Ensure all required [**AMS ports**](https://resources.antmedia.io/docs/installation#server-ports) are allowed in your Security Group.

### Configure Your License

- SSH into the server and add your license key to:

  ```bash
  sudo nano /usr/local/antmedia/conf/red5.properties
  ```

- Add the following line and save the settings:

  ```bash
  server.licence_key=YOUR_AMS_LICENSE_KEY
  ```

- Restart Ant Media Server:

  ```
  sudo service antmedia restart
  ```
   
### Verify the Installation

Open the AMS dashboard:

```html
http://<SERVER_IP>:5080
```

Verify that Ant Media Server starts successfully. You do not need to create an administrator account before creating the AMI.

### Create the AMI

1. Navigate to **EC2 → Instances**.
2. Select your Ant Media Server instance.
3. Go to **Instances →Actions → Image and Templates → Create Image**
    
![](@site/static/img/clustering-and-scaling/aws-cloudformation/create-aws-ami.png)

4. Provide an image name and description.
5. Click **Create Image**.

![](@site/static/img/clustering-and-scaling/aws-cloudformation/ams-image.png)

### Retrieve the AMI ID

After the image creation process completes:

1.  Navigate to **EC2 → AMIs**.
2.  Locate your newly created image.
3.  Copy and save the **AMI ID**.

![](@site/static/img/clustering-and-scaling/aws-cloudformation/ami-id.png)

You will use this AMI ID in the CloudFormation template.

## Step 2: Update the CloudFormation Template

Download the Ant Media Server autoscaling CloudFormation template:

[https://raw.githubusercontent.com/ant-media/Scripts/master/cloudformation/antmedia-aws-autoscale-template.yaml](https://raw.githubusercontent.com/ant-media/Scripts/master/cloudformation/antmedia-aws-autoscale-template.yaml)

Open the template and replace the default Marketplace image references with the AMI ID (ami-xxxxxxxxxxxxxxxxx) created in Step 1.

### Update the Origin Launch Template Part

Replace the `ImageId` value with your AMI ID:

```yaml
  LaunchTemplateOrigin:
    Type: 'AWS::EC2::LaunchTemplate'
    Properties:
      LaunchTemplateName: !Sub ${AWS::StackName}-AntMedia-LaunchTemplateOrigin
      LaunchTemplateData:
        InstanceType: !Ref OriginInstanceType
        KeyName: !Ref KeyName
        ImageId: !If [UseGPUImage, !Ref AntMediaGPUAmi, ami-xxxxxxxxxxxxxxxxx]
        SecurityGroupIds:
          - !GetAtt "InstanceSecurityGroup.GroupId"
        BlockDeviceMappings:
          - DeviceName: /dev/sda1
            Ebs:
              VolumeSize: !Ref DiskSize
              VolumeType: gp2
              DeleteOnTermination: true
```

:::info
If you plan to use GPU-enabled Origin instances, create a separate GPU-based Ant Media Server AMI and use its AMI ID in place of `!Ref AntMediaGPUAmi`.

When the `GPU` deployment option is enabled, CloudFormation will launch instances using the GPU AMI. Otherwise, it will use the standard AMI.  
:::

### Update the Edge Launch Template

Replace the Edge image reference as well:

:::info
- If the license key is different for Edge Servers, then you will have to create one more image for the edge group.
- In case you want to have some extra changes for Edge servers, then in that case also you can create the separate AMI for Edge.
:::

```yaml
  LaunchTemplateEdge:
    Type: 'AWS::EC2::LaunchTemplate'
    Properties:
      LaunchTemplateName: !Sub ${AWS::StackName}-AntMedia-LaunchTemplateEdge
      LaunchTemplateData:
        InstanceType: !Ref EdgeInstanceType
        KeyName: !Ref KeyName
        ImageId: ami-xxxxxxxxxxxxxxxxx
        SecurityGroupIds:
          - !GetAtt "InstanceSecurityGroup.GroupId"
        BlockDeviceMappings:
          - DeviceName: /dev/sda1
            Ebs:
              VolumeSize: !Ref DiskSize
              VolumeType: gp2
              DeleteOnTermination: true
```

Save the modified template after updating.

## Step 3: Deploy the Cluster

After updating the template, follow the standard AWS CloudFormation deployment guide:

[https://antmedia.io/docs/guides/clustering-and-scaling/aws/scale-with-aws-cloudformation/](https://antmedia.io/docs/guides/clustering-and-scaling/aws/scale-with-aws-cloudformation/)

You can start directly from **Step 5** of that guide. The remaining deployment process is identical.

CloudFormation will provision Origin and Edge instances using your custom AMI, ensuring that every instance starts with your preconfigured Ant Media Server license.


<br /><br />
---

<div align="center"> <h2>🔐 Scale with Your Own Licensed AMS Deployment 🚀</h2> </div>

You have successfully created a custom Ant Media Server AMI with your self-hosted license and integrated it into the AWS CloudFormation autoscaling workflow. Every Origin and Edge instance launched by CloudFormation now uses your licensed image, giving you complete control over your deployment while retaining the flexibility and scalability of AWS.

Enjoy a fully automated, enterprise-ready AMS cluster built on your own licensing model 🚀.  
