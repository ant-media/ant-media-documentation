---
title: User Management
description: Create and Manage Users with Roles at Ant Media Server. 
keywords: [Ant Media Server Documentation, Ant Media Server Tutorials, User Management, Create and Manage Users with Roles]
sidebar_position: 4
---

# Ant Media Server User Management

Ant Media supports different user roles. You can, for example, create an admin user to virtually do everything to read-only users, who only can view the dashboard and not do something harmful like removing an application. These permission models are both in API and Ant Media administration tools.

AMS dashboard users can only view applications and sections of the dashboard they have been given access to. There are 3 types of user access in the AMS dashboard:

*   **Admin** can do anything in its scope, e.g can CRUD anything and access all web panel services.
*   **User** can do anything in the dashboard for particular applications granted. He cannot see or modify other applications.
*   **Read-only user** can read anything in the dashboard for applications granted. This user cannot access web panel services, create an application, or start a broadcast.

Creating Users roles in Ant Media Server
----------------------------------------

Just need to navigate `Settings` text on the left menu. After that click `Users` section and click `New User` button. Just fill the blanks according to your use case.

![](@site/static/img/get-started/user-management/user-management.png)

After login with your `new User`, you will see likely as below:

![specific-application-admin-user-dashboard](https://antmedia.io/wp-content/uploads/2022/02/specific-application-admin-user-dashboard.png)

How to use Multi-Tenancy with REST API?
---------------------------------------

Using below Rest API methods, you can manage user's access on the Ant Media Server.

> **Note**: `scope` parameter can be `system` or specific application name such as `LiveApp`. If you use `LiveApp` user scope is will only `LiveApp`. `system` can reach everywhere in application scopes.

`userType` parameter can be `ADMIN`, `USER` or `READ-ONLY`.

## Create User

Web panel has the following REST method to create users for applications

```json
    @POST
    @Path("/users")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
```  

It means that you can call the following method to create a user with curl.

``` curl -X POST -H "Content-Type: application/json" -d '{"firstName": "Ant", "lastName": "Media", "email": "abc@antmedia.io", "password": "testtest", "scope": "system", "userType": "ADMIN"}'  "https://{YOUR_SERVER_ADDRESS}:5443/rest/v2/users" ```
    

## Edit User

Web panel has the following REST method to edit user for applications

```json
    @PUT
    @Path("/users")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
```

It means that you can call the following method to edit a user with curl.

```
curl -X PUT -H "Content-Type: application/json" -d '{"firstName": "Ant", "lastName": "Media", "email": "test", "password": "testtest", "scope": "system", "userType": "USER"}'  "https://{YOUR_SERVER_ADDRESS}:5443/rest/v2/users"
```

## Remove User

Web panel has the following REST method to create user for applications

```json
    @DELETE
    @Path("/users/{username}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
```

It means that you can call the following method to remove a user with curl.
```
curl -X DELETE -H "Content-Type: application/json" "https://{YOUR_SERVER_ADDRESS}:5443/rest/v2/users/{username}"
```
