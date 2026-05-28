---
title: User Management
description: Create and Manage Users with Roles at Ant Media Server. 
keywords: [Ant Media Server Documentation, Ant Media Server Tutorials, User Management, Create and Manage Users with Roles]
sidebar_position: 4
---

# Ant Media Server User Management

Ant Media Server supports various user roles. For example, you can create an admin user who can perform all actions, while a read-only user can only view the dashboard and cannot perform actions that could potentially remove applications. These permission models are available through both the API and Ant Media Server’s administration tools.

Users in the AMS dashboard can only view applications and sections of the dashboard to which they have been granted access. There are three types of user access in the AMS dashboard:

*   **Admin:** Can perform all actions within their scope, such as creating, reading, updating, and deleting (CRUD) resources, and can access all web panel services.
*   **User:** Can perform actions on applications to which they have been granted access but cannot see or modify other applications.
*   **Read-only user:** Can view all data in the dashboard for applications to which they have been granted access but cannot access web panel services, create applications, or start broadcasts.

## User Management via Web Panel

To create user roles in Ant Media Server, navigate to the `Settings` menu on the left, then click on the `Users` section, and click the `New User` button. Fill out the required fields according to your use case.

![](@site/static/img/get-started/user-management/user-management.png)

After logging in with your new user credentials, you will see a dashboard similar to the one below:

![specific-application-admin-user-dashboard](https://antmedia.io/wp-content/uploads/2022/02/specific-application-admin-user-dashboard.png)

## User Management via Rest API

With the following REST API methods, you can manage user access on the Ant Media Server:

:::info

 - The `scope` parameter can be set to either `system` or a specific application name, such as `LiveApp`. If you use `LiveApp`, the user’s scope will be limited to `LiveApp` and if you want whole access to the server, then `system` scope can be defined.

 - The `userType` parameter can be set to `ADMIN`, `USER` or
   `READ-ONLY`.

 - To use the management APIs, authentication is required. Check out this [Rest API document](https://antmedia.io/docs/guides/developer-sdk-and-api/rest-api-guide/management-rest-apis/) for more details.
:::

### Create User

You can call the following method to create a user:

```json
curl -X POST -H "Content-Type: application/json" -d '{"firstName": "Ant", "lastName": "Media", "email": "abc@antmedia.io", "password": "testtest", "scope": "system", "userType": "ADMIN"}'  "https://{YOUR_SERVER_ADDRESS}:5443/rest/v2/users"
```    

### Edit User

You can call the following method to edit a user:

```json
curl -X PUT -H "Content-Type: application/json" -d '{"firstName": "Ant", "lastName": "Media", "email": "test", "password": "testtest", "scope": "system", "userType": "USER"}'  "https://{YOUR_SERVER_ADDRESS}:5443/rest/v2/users"
```

### Remove User

You can call the following method to remove a user:

```json
curl -X DELETE -H "Content-Type: application/json" "https://{YOUR_SERVER_ADDRESS}:5443/rest/v2/users/{username}"
```

## Multi Application Access Management

In version 2.10.1 and above of Ant Media Server, you can manage user access more precisely by assigning different levels of permissions to the same user across multiple applications. This feature enhances flexibility and control over user roles within your environment.

### How It Works

With this feature, you can define the scope of a user’s access on a per-application basis. This means you can grant a user various types of access depending on the application they are interacting with. 

For example:

 *   **ADMIN Access** The user has full administrative rights within the access to the `LiveApp`. This includes the ability to create, modify, delete, and manage all aspects of `LiveApp`. 

 *   **USER Access** The same user can have standard user privileges within the `WebRTCAppEE` application. They can interact with `WebRTCAppEE` but cannot perform administrative tasks.

 *   **READ-ONLY Access** The user can have read-only access to `live`.They can view content and data in `live` but cannot make changes or perform any modifications.

#### Create multi-app user access via Web Panel

![User-Management](@site/static/img/user-management/user_management_screen.png)

#### Create multi-app user access via API

```json
curl -X POST -H "Content-Type: application/json" -d '{"firstName": "Ant", "lastName": "Media", "email":  "abc@antmedia.io", "password": "testtest", "appNameUserType": {"LiveApp": "ADMIN",  "WebRTCAppEE": "USER", "live": "READ_ONLY"}}'  "https://{YOUR_SERVER_ADDRESS}:5443/rest/v2/users"
```

### Benefits

This level of control allows for:

*   **Granular Permissions:** Tailor access based on the specific needs and responsibilities of each user. This minimizes the risk of unauthorized actions or exposure of sensitive information.
*   **Flexible User Management:** Assign different roles and permissions for different applications without affecting the user's overall access to other parts of the system.
*   **Improved Security:** By limiting access to only the relevant applications and actions, you can better safeguard your system against accidental or malicious misuse.

Overall, this feature makes it easier to manage user roles and access in a multi-application environment, ensuring that users have appropriate permissions aligned with their specific responsibilities.
