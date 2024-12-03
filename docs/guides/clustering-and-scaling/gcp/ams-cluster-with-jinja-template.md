---
title: Cluster with GCP Jinja Template
description: Cluster Deployment with GCP Jinja Template
keywords: [AMS Cluster Deployment on GCP, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

In this guide, we’ll dive into how to use Jinja Templates and Google Cloud Deployment Manager to streamline the deployment of Ant Media Server clusters on Google Cloud Platform (GCP). We’ll cover the essentials of both Jinja Templates and Deployment Manager, explore how these tools integrate seamlessly, and provide a step-by-step walkthrough to help you deploy an Ant Media Server cluster with confidence and ease.

## What is Google Deployment Manager and Jinja Template?

Let's first learn about the Google Deployment Manager and GCP Jinja Template.

### Google Deployment Manager
It is an infrastructure management service provided by Google Cloud Platform (GCP). It allows you to define the desired state of your cloud resources using configuration files, enabling you to automate the creation, deployment, and updates of complex cloud infrastructure.

### Jinja 
It is a templating engine for Python that allows for the creation of dynamic configuration files. In the context of GCP Deployment Manager, Jinja Template enables you to generate resource configurations based on predefined templates, incorporating variables, loops, and logic to tailor deployments to specific requirements.

## Prerequisites
Before you begin the deployment process, ensure you have the following prerequisites in place:

* **Google Cloud Platform Account:** Ensure that you have access to a Google Cloud Platform account with the necessary permissions to create and manage resources. If you don’t have an account yet, you can sign up for a free trial or a paid subscription on the Google Cloud Platform website.

* **Google Cloud SDK (gcloud CLI):** Install the [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) and ensure that the gcloud command-line tool is available in your environment. This tool will be used to interact with Google Cloud Platform (GCP) resources and services.

* **Enable Compute Engine API:** Make sure to enable the [Compute Engine API](https://cloud.google.com/compute/docs/reference/rest/v1) in your GCP project. This API is required to create and manage virtual machine instances, which are essential for hosting Ant Media Server clusters.

* **Infrastructure Manager API:** Enable the [Infrastructure Manager API](https://cloud.google.com/infrastructure-manager/docs/reference/rest) in your GCP project. This API allows you to create and manage infrastructure resources using tools like Google Deployment Manager.

* **Ant Media Server Marketplace Image:** Ant Media Server Marketplace Image will serve as the base for your Ant Media Server cluster. To create an image, you first need to launch an Ant Media Server instance from GCP Marketplace and then create an image from that. Please follow the instructions in [Step 2 of this blog post](https://antmedia.io/scale-ant-media-server-google-cloud-platform-guide/) to create an image.

:::info
Please note the name of the image, as it will be used in the configuration file to create the cluster. For this demo, I will name the image **ams-latest**
:::

* **Ant Media Server Cluster GCP Jinja Template:** Get the Ant Media Server Cluster [GCP Jinja Template](https://github.com/ant-media/Scripts) from the GitHub repository. This template contains the configuration settings for deploying an Ant Media Server cluster on GCP using Google Deployment Manager and Jinja Templates.

## Accessing the Google Cloud Account

Now that we have all the prerequisites covered, let’s access the GCP account to get started.

* Login to your GCP account using the gcloud CLI tool in the terminal

 ```bash
 gcloud auth login
 ```
  
  ![image](https://github.com/user-attachments/assets/4f209dc6-d2ac-47cf-ad73-e7d474d4b585)
  
* Go to the above-displayed URL in your browser, follow the prompts, and enter the verification code, and you will be logged in to your gCloud environment.

* You can create a new project for the deployment or if you already have a project created, you can switch to the existing project with
  
```bash
gcloud config set project YOUR_PROJECT_ID
```

## Deploy the Cluster

To deploy the Ant Media Cluster, we will quickly edit a couple of files and then launch it with a single command.

### Step 1: Edit the antmedia.yaml file

* Open the **antmedia.yaml** file to edit from the `gcp-jinja-template` files you downloaded with your favorite editor.
* Adjust the region, zone, and instance type settings according to your structure and save it
   
```properties:
 default_zone: us-central1-a
 default_region: us-central1
 mongodb_machine_type: e2-standard-2
 origin_machine_type: c2d-standard-4
 edge_machine_type: c2d-standard-4
```

* If you have named your Ant Media Server Marketplace image something other than ams-latest, you can pass it to the properties as

  ```image_id: "image-name"```
  
![image](https://github.com/user-attachments/assets/8c25de85-c3c7-4c15-8edd-c54c3b09452a)

### Step 2: Edit the antmedia-loadbalancer-template.jinja file

Edit the **antmedia-loadbalancer-template.jinja** file to add the certificate content created for your wildcard domain.

```
certificate: fullchain.pem or certificate
privateKey: private key
```
```
– name: ams-ssl-cert-{{ scenario }}
type: compute.v1.sslCertificate
properties:
certificate: |
—–BEGIN CERTIFICATE—–
Your Certificate
—–END CERTIFICATE—–
privateKey: |
—–BEGIN PRIVATE KEY—–
Your Private Key
—–END PRIVATE KEY—–
```

* Make sure that your certificate and private key are properly indented to avoid any errors.

* Save the file and exit from the editor.

![image](https://github.com/user-attachments/assets/7ae6182e-ab14-48e8-81d1-89e12970039c)

### Step 3: Launch the Cluster

Once the above configurations are complete, deploy the Ant Media Server Cluster using **gcloud** cli as follows:.

```bash
gcloud deployment-manager deployments create ams-cluster --config antmedia.yaml
```

This step will take advantage of the automatic scaling and management features provided by GCP and create the Ant Media Server Cluster using a Jinja template.

![image](https://github.com/user-attachments/assets/46517184-a4d2-4b6f-8950-4960b9cb1b08)

* In case the deployment is aborted or halted due to any issues, you can check the deployment status with
  
  ```bash
  gcloud deployment-manager deployments describe ams-cluster
  ```
  
* If the deployment failed and you need to redeploy from scratch, you can delete the failed deployment and create it again

 ```bash
gcloud deployment-manager deployments delete ams-cluster
gcloud deployment-manager deployments create ams-cluster --config antmedia.yaml
```

**Congratulations!** Your very own Ant Media Server Cluster is ready using Google Deployment Manager and the Jinja template. 

## Access the Ant Media Server Cluster

Now that your Ant Media Server cluster is created and ready, let’s connect to it.

* Go to your GCP account console > Load Balancing and under Load Balancers.

* There will be two load balancers, one of them is Edge and another one is Origin, named ams-edge and ams-origin.

* You can connect to your cluster via the Load Balancer Public IP or update your DNS records based on the certificate hostname.

  Ant Media Server LBs
  ![image](https://github.com/user-attachments/assets/8004069b-95bb-469d-ba98-6ac6196f84ae)

* Once you reach the Load Balancer IP address, you will see the Ant Media Server Web panel dashboard and can create your login credentials.

Ant Media Server dashboard
![image](https://github.com/user-attachments/assets/a996972f-2858-478d-aa46-b0b58e31e3ee)

## WebRTC Publish and Play

Now that everything is up and running, let’s explore our collection of [WebRTC samples](https://antmedia.io/webrtc-samples/) to publish and play with WebRTC and get started.

Webrtc sample publish page
![image](https://github.com/user-attachments/assets/815add4e-0701-4e93-99d7-fc0bf6b33acb)

Webrtc player page
![image](https://github.com/user-attachments/assets/476d44e4-12ff-4694-b3e5-c701e59d42b6)
