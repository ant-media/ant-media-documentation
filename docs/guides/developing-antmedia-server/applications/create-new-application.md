---
title: Creating a new application 
description: Ant Media Server supports creating application development on the fly. You may create seprate applications for each stream domains if you are managing multiple streams from same server.
keywords: [Creating New Application, Creating Application Ant Media Server, Application Development, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2

---

# Creating a new application

Ant Media Server supports dynamic application development, effectively addressing the multi-tenancy challenges of online video platforms. With three built-in applications, the server allows users to configure distinct settings for each application and customize application names.

Customers can create or delete applications as needed. There are multiple methods available for managing applications, outlined below.

## Web Panel

The fastest and easiest way to create new applications is via the web panel.

### Step 1

Login to the web panel, navigate to the Dashboard, and click the New Application button.

![image](https://github.com/user-attachments/assets/4df34b28-ff9d-429b-a061-8dd5b6938d5f)

### Step 2

Enter the application name and click the ```Create``` button.

![image](https://github.com/user-attachments/assets/546a3581-0dbb-494f-8600-0248fc0eaa8b)

:::info

In cluster mode, the server automatically creates the new application across all nodes in the cluster. Similarly, if an application is deleted, it will be removed from all nodes as well.

:::

## Shell Script

You can also use a script to create new applications easily. Follow these steps:

### Step 1

Go to the folder where Ant-Media-Server is installed. The default directory is ```/usr/local/antmedia```.

```bash
cd /usr/local/antmedia
```

### Step 2

The `create\_app.sh` usage in below.


```bash
sudo ./create_app.sh -n applicationName -p AMS-Installation-Directory
```

For example:

```bash
sudo ./create_app.sh -n livestream -p /usr/local/antmedia
```

Available parameters in the **create_app** script:

**-n:**  Name of the application that you want to have. It's mandatory  
**-p:**  (Optional) Path is the install location of Ant Media Server which is /usr/local/antmedia by default.  
**-w:**  (Optional) The flag to deploy application as war file. Default value is false  
**-c:**  (Optional) The flag to deploy application in cluster mode. Default value is false  
**-m:**  Mongo DB host. If it's a cluster, it's mandatory. Otherwise optional  
**-u:**  Mongo DB user. If it's a cluster, it's mandatory. Otherwise optional  
**-s:**  Mongo DB password. If it's a cluster, it's mandatory. Otherwise optional  
**-h:**  print this usage  

For more details, check the [Create App Script](https://github.com/ant-media/Ant-Media-Server/blob/master/src/main/server/create_app.sh#L5).

### Step 3

Restart Ant Media Service.

```bash
sudo service antmedia restart
```

## Rest Method

In order to create and delete the application via Rest API, the management APIs needs to be called. Check out [this document](https://antmedia.io/docs/guides/developer-sdk-and-api/rest-api-guide/management-rest-apis/) for reference.

### Create Application

Call the following method to create an application with curl.

```
curl -X POST -H "Content-Type: application/json" "https://{YOUR_SERVER_ADDRESS}:5443/rest/v2/applications/App_Name"
```

### Delete Application

Call the following method to delete an application with curl.

```
curl -X DELETE -H "https://{YOUR_SERVER_ADDRESS}:5443/rest/v2/applications/App_Name"
```
## Congratulations!

You now know how to create and manage applications in Ant Media Server using the web panel, shell scripts, or REST methods. You are ready to organize multiple streaming applications efficiently and deploy them across clusters with ease.
