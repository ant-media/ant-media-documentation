---
title: Deploying Ant Media Server at AWS Wavelength 
description: Deploying Ant Media Server at AWS Wavelength
keywords: [Deploying Ant Media Server at AWS Wavelength, AWS Wavelength, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 5
---

# Deploying Ant Media Server at AWS Wavelength

AWS Wavelength enables developers to build applications that deliver ultra-low latencies to mobile devices and end users. Wavelength deploys standard AWS compute and storage services to the edge of telecommunication carriers' 5G networks. 

You can extend an Amazon Virtual Private Cloud (VPC) to one or more Wavelength zones. You can then use AWS resources like Amazon Elastic Compute Cloud (Amazon EC2) instances to run the applications that require ultra-low latency and a connection to AWS services in the Region.

Deploying AMS on Wavelength helps you decrease the latency to under 150 milliseconds with the conditions provided within AWS Wavelength.

AWS Wavelength needs some special care to make the Ant Media Server run successfully. The first point is the SSL and STUN Server configurations both in standalone and cluster deployments. You can find the solutions in the below links for SSL and STUN servers.

Second, there is no Elastic Load Balancer in Wavelength Zones for the Auto-scalable Cluster deployments. This problem is also addressed by providing a special NGINX load balancer that listens to the auto-scalable group and updates its configuration. It's installed automatically through the CloudFormation template below.

You can use Ant Media Server v2.4.1 and later for AWS Wavelength Deployments.

*   [Install SSL](/guides/installing-on-linux/setting-up-ssl)
*   [Configure STUN Server](https://antmedia.io/docs/guides/configuration-and-testing/configuring-stun-turn-addresses/)
*   [Standalone Server Deployment with Cloudformation](/guides/clustering-and-scaling/aws/aws-wavelength-standalone-deployment/)
*   [Auto-Scalable Cluster Deployment with Cloudformation](/guides/clustering-and-scaling/aws/aws-wavelength-cluster-deployment/)

