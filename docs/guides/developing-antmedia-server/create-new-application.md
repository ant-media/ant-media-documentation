---
title: Creating a new application 
description: Ant Media Server supports creating application development on the fly. You may create seprate applications for each stream domains if you are managing multiple streams from same server.
keywords: [Creating New Application, Creating Application Ant Media Server, Application Development, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1

---

# Creating a new application

Ant Media Server supports dynamic application development, effectively addressing the multi-tenancy challenges of online video platforms. With three built-in applications, the server allows users to configure distinct settings for each application and customize application names.

Customers can create or delete applications as needed. There are multiple methods available for managing applications, outlined below.

### Web Panel

The fastest and easiest way to create new applications is via the web panel.

#### Step 1

Login to the web panel, navigate to the Dashboard, and click the New Application button.

![image](https://github.com/user-attachments/assets/4df34b28-ff9d-429b-a061-8dd5b6938d5f)

#### Step 2

Enter the application name and click the ```Create``` button.

![image](https://github.com/user-attachments/assets/546a3581-0dbb-494f-8600-0248fc0eaa8b)

Note- In cluster mode, the server automatically creates the new application across all nodes in the cluster. Similarly, if an application is deleted, it will be removed from all nodes as well.

### Shell Script

You can also use a script to create new applications easily. Follow these steps:

#### Step 1

Go to the folder where Ant Media Server is installed. The default directory is ```/usr/local/antmedia```
```bash
cd /usr/local/antmedia
```

#### Step 2

Use the ` create_app.sh` script as follows:

```bash
sudo ./create_app.sh -n applicationName -p AMS-Installation-Directory
```

For example:

```bash
sudo ./create_app.sh -n streamHive -p /usr/local/antmedia
```

Available parameters in the **create_app** script:

-n:  Name of the application (mandatory) 
-p:  Installation path of Ant Media Server (Optional, default `/usr/local/antmedia` by default).  
-w:  Deploy application as WAR file (Optional, default `false`)  
-c:  Deploy application in cluster mode (optional, default `false`) 
-m:  MongoDB host (mandatory for cluster mode)
-u:  MongoDB user (mandatory for cluster mode) 
-s:  MongoDB password (mandatory for cluster mode)  
-h:  Print usage 

For more details, see the [Create App Script](https://github.com/ant-media/Ant-Media-Server/blob/master/src/main/server/create_app.sh#L5)

![](@site/static/img/image-1645437714786.png)

#### Step 3

Restart Ant Media Service

```bash
sudo service antmedia restart
```
\*This feature is available in Ant Media Server 1.9.0+ versions.


### Rest Method

#### Create Application

The web panel provides a REST method to create an application:
```
    @POST
    @Path("/applications/{appName}")
    @Produces(MediaType.APPLICATION_JSON)
```
You can call this method programmatically using `curl`. Example:
```
    curl -X POST -H "Content-Type: application/json" "https://{YOUR_SERVER_ADDRESS}:5443/rest/v2/applications/myapp"
```

### Delete Application

To delete an application via REST:
```
    @DELETE
    @Path("/applications/{appName}")
    @Produces(MediaType.APPLICATION_JSON)
```
Example using `curl` to delete an application:
```
    curl -X DELETE -H "https://{YOUR_SERVER_ADDRESS}:5443/rest/v2/applications/myapp"
```
## Congratulations!

You now know how to create and manage applications in Ant Media Server using the web panel, shell scripts, or REST methods. You are ready to organize multiple streaming applications efficiently and deploy them across clusters with ease.