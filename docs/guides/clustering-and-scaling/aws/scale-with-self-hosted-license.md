---
title: Scale AMS on AWS using Self-Hosted license
description: Scale AMS on AWS with AWS CloudFormation using self-hosted license
keywords: [Scale AMS with AWS CloudFormation, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 6
---

# Scale AMS with AWS CloudFormation using Self-Hosted license

If you have already gone through the Ant Media Server cluster deployment via [AWS CloudFormation](https://antmedia.io/docs/guides/clustering-and-scaling/aws/scale-with-aws-cloudformation/) service, by default it uses the AWS [marketplace image](https://aws.amazon.com/marketplace/pp/prodview-464ritgzkzod6?sr=0-1&ref_=beagle&applicationId=AWSMPContessa#pdp-overview) of AMS.

Now here comes the question of how to deploy the Ant Media cluster quickly via CloudFormation while using the `self-hosted license` purchased via [AntMedia](https://antmedia.io/#products) directly.

So in this document, we will go through the step-by-step guide to deploy the AMS cluster with CloudFormation using the self-hosted license of Ant Media Server.

:::info
We are assuming that you already have purchased the licenses for your AMS cluster. If not, reach out to contact@antmedia.io for the discussion.
:::

## Step 1: Create the image (AMI) of AMS on your AWS account

 - First, you need to install the AMS on a basic 4-core instance
   (c5.xlarge). Please follow the [installation
   document](https://antmedia.io/docs/guides/installing-on-linux/installing-ams-on-linux/) to install the server.
   
   After the AMS is installed, there is no need to install the SSL
   certificate for the image. Please make sure that all the required
   [server ports](https://resources.antmedia.io/docs/installation#server-ports) are allowed in the security groups.
   
 - Once the server is installed, SSH into the server and put the license key in the  **red5.properties**  file under the **/usr/local/antmedia/conf** folder. It should look like this:    

   ```bash
   server.licence_key=put-your-AMS-license-key     
   ```
   
   After saving the settings, restart the server with **sudo service antmedia restart**

- Open the server at [http://IP-address:5080](http://ip-address:5080/) to verify if it is working. You do not have to create an account for web panel.

- Then remove the **instanceId** file from the same **/usr/local/antmedia/conf**  folder.

- Then create the AMI by selecting the `Instances` --> `Actions` --> `Image and templates` --> `Create image`.

![](@site/static/img/clustering-and-scaling/aws-cloudformation/create-aws-ami.png)

During the image creation, just provide the name and description of the image and create the image.

![](@site/static/img/clustering-and-scaling/aws-cloudformation/ams-image.png)

To check the image, go to the Images section of EC2 and select AMIs. Under that section, you will see your created image.

You need to note down the AMI ID of your Ant Media Server image.

![](@site/static/img/clustering-and-scaling/aws-cloudformation/ami-id.png)

## Step 2: Download and Edit the CloudFormation Template

Download the CloudFormation template from the below link to your computer.

[https://raw.githubusercontent.com/ant-media/Scripts/master/cloudformation/antmedia-aws-autoscale-template.yaml](https://raw.githubusercontent.com/ant-media/Scripts/master/cloudformation/antmedia-aws-autoscale-template.yaml)

After the template is downloaded, we have to edit it and put our image ID (an AMS image with a pre-configured license key) instead of using the marketplace image of Ant Media Server.

In the template, edit the **ImageId** in the Origin and Edge Launch template part as below and put your AMI ID that we generated in Step 1.

:::info
In Origin configuration, you may use the GPU image as well so for that, you need to create the AMS image on the GPU-based instance and then you have to put the ImageId in place of **!Ref AntMediaGPUAmi**

The GPU Image will be used when you set the GPU option to true during the deployment; otherwise, a normal image will be used, like we created and used in this document.
:::

```yaml
  LaunchTemplateOrigin:
    Type: 'AWS::EC2::LaunchTemplate'
    Properties:
      LaunchTemplateName: !Sub ${AWS::StackName}-AntMedia-LaunchTemplateOrigin
      LaunchTemplateData:
        InstanceType: !Ref OriginInstanceType
        KeyName: !Ref KeyName
        ImageId: !If [UseGPUImage, !Ref AntMediaGPUAmi, Put-Your-ImageId]
        SecurityGroupIds:
          - !GetAtt "InstanceSecurityGroup.GroupId"
        BlockDeviceMappings:
          - DeviceName: /dev/sda1
            Ebs:
              VolumeSize: !Ref DiskSize
              VolumeType: gp2
              DeleteOnTermination: true
```

Similarly for Edge Group

```yaml
  LaunchTemplateEdge:
    Type: 'AWS::EC2::LaunchTemplate'
    Properties:
      LaunchTemplateName: !Sub ${AWS::StackName}-AntMedia-LaunchTemplateEdge
      LaunchTemplateData:
        InstanceType: !Ref EdgeInstanceType
        KeyName: !Ref KeyName
        ImageId: Put-Your-ImageId
        SecurityGroupIds:
          - !GetAtt "InstanceSecurityGroup.GroupId"
        BlockDeviceMappings:
          - DeviceName: /dev/sda1
            Ebs:
              VolumeSize: !Ref DiskSize
              VolumeType: gp2
              DeleteOnTermination: true
```

## Step 3: Deploy the AMS Cluster using the CloudFormation Template

Now, in order to deploy the Ant Media Cluster with CloudFormation, follow this [CloudFormation document](https://antmedia.io/docs/guides/clustering-and-scaling/aws/scale-with-aws-cloudformation/) step-by-step from step/point 5. All the steps will remain same for further deployment.

Once the installation is done, your servers will be launched using your own Ant Media Server Image with the pre-configured self-hosted license that you have purchased from Ant Media.

:::info
The above steps in this document were to instruct on how to create the AWS AMI of Ant Media Server with a pre-configured self-hosted license and use it to deploy the cluster.

Please feel free to reach out to [Github discussions](https://github.com/orgs/ant-media/discussions) if you have any query.
:::
