---
title: Scaling Ant Media Server
sidebar_position: 1
---
# Scaling Ant Media Server


Cluster installation
--------------------

AMS can run in cluster mode. This way, a number of AMS nodes can work together to increase the number of viewers and publishers. In other words, you can publish a live stream to one node of AMS in the cluster and you can watch the stream in another ...

[Read more](/guides/clustering-and-scaling/cluster-installation/)


Configuring RTMP LB in AWS
--------------------------

Follow the instructions below to configure RTMP Load Balancer in Ant Media Server Auto Scaling structure. 1. Click on Create Load Balancer and create a new Load Balancer. (EC2 >` Load Balancers >` Create Load Balancer ) 2. Create a Classic Lo...

[Read more](/guides/clustering-and-scaling/aws/configuring-rtmp-lb-in-aws/)



Configuring RTMP LB in Azure
----------------------------

Follow the below instructions to configure RTMP Load Balancer in Ant Media Server Auto Scaling structure. 1. Click on Create load balancer and create a new Load Balancer. (Search >` Load Balancing) 2. In this section, select Resource Gro...

[Read more](/guides/clustering-and-scaling/azure/configuring-rtmp-lb-in-azure)



Scaling with Alibaba
--------------------

In this document, we’re going to explain how to setup a Scalable Ant Media Server Cluster in Alibaba. Here below is the diagram about how Ant Media Server is architecturized within Alibaba. Lets start with brief definitions MongoDB Databas...

[Read more](/guides/clustering-and-scaling/scaling-with-alibaba/)



How to Setup Ant Media Server Clustering on Azure
-------------------------------------------------

In this guide, I will explain how to setup Ant Media Server Clustering on Azure. When your load is high, one server instance is not enough for you and you can handle that load with a clustering solution. For streaming applications, you will need a ...

[Read more](/guides/clustering-and-scaling/azure/setup-ams-clustering-at-azure)



Installing with Nginx load balancer
-----------------------------------

What is Nginx ? Nginx started out as an open source web server designed for maximum performance and stability. Today, however, it also serves as a reverse proxy, HTTP load balancer, and email proxy for IMAP, POP3, and SMTP. Prerequisites One ser...

[Read more](/guides/clustering-and-scaling/load-balancing/nginx-load-balancer/)



Load Balancer with HAProxy SSL Termination
------------------------------------------

Load Balancer is the sister of cluster so If you make Ant Media Server instances run in Cluster Mode. Then a load balancer will be required to balance the load. In this documentation, you will learn how to install HAProxy Load Balancer with SSL term...

[Read more](/guides/clustering-and-scaling/load-balancing/load-balancer-with-haproxy-ssl-termination/)



CloudFormation Installation For Scaling Ant Media Server
--------------------------------------------------------

Now let's start on to the CloudFormation setup and continue step by step. Watch the YouTube Video: Setting up an Ant Media Server Scaling Solution with CloudFormation In 5 minutes 1. Firstly, let's subscribe to the Ant Media Server on the Amaz...

[Read more](/guides/clustering-and-scaling/aws/scale-with-aws-cloudformation/)



Multi Level Cluster
-------------------

What is Multi-Level Cluster? A cluster which has different regions is called Multi-Level Cluster where each region has its own origin for a stream. Ant Media Server can be scaled in different physical locations. You can set the node group parameter...

[Read more](/guides/clustering-and-scaling/multi-level-cluster/)



Clustering with AWS
-------------------

In this document, we’re going to explain how to setup a Scalable Ant Media Server Cluster in Amazon Web Services. Scaling is required when a single server cannot meet the required demand. You can also estimate your cost and server requirement throug...

[Read more](/guides/clustering-and-scaling/aws/clustering-with-aws/)



Installing Ant Media Server on AWS EKS
--------------------------------------

In this post, we are going to guide you on how to run Ant Media Server on AWS EKS step by step. 1. After you are logged in to AWS, search the EKS keyword, find the Elastic Kubernetes Service, and click the Add Cluster >` Create button. 2....

[Read more](/guides/clustering-and-scaling/aws/installing-ams-on-aws-eks/)
