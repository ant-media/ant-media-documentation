---
title: User Management
slug: /user-management
description: Create and manage Ant Media Server users and roles from the web panel or REST API.
keywords: [Ant Media Server Documentation, User Management, User Roles, Admin, Read-only, REST API]
sidebar_position: 2
sidebar_label: User Management
---

# User Management

Ant Media Server lets you create web panel users with different roles. Permissions apply through the dashboard and the management REST API.

Users only see applications and panel sections they are allowed to access. There are three role types:

| Role | Access |
| --- | --- |
| **Admin** | Full CRUD within their scope, including web panel services |
| **User** | Can work in assigned applications only; cannot manage other apps |
| **Read-only** | Can view assigned applications; cannot change settings, create apps, or start broadcasts |

## Manage users in the web panel

1. Open **Settings → Users**.
2. Click **New User**.
3. Set name, email, password, scope, and role for your use case.

![](@site/static/img/get-started/user-management/user-management.png)

After you sign in as the new user, the dashboard reflects that user’s applications and permissions:

![specific-application-admin-user-dashboard](https://antmedia.io/wp-content/uploads/2022/02/specific-application-admin-user-dashboard.png)

## Manage users with the REST API

Management user APIs require authentication. See [Management REST APIs](/guides/developer-sdk-and-api/rest-api-guide/management-rest-apis/).

:::info
- `scope` — `system` for server-wide access, or an application name such as `LiveApp` to limit the user to that app.
- `userType` — `ADMIN`, `USER`, or `READ-ONLY`.
:::

### Create a user

```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"firstName": "Ant", "lastName": "Media", "email": "abc@antmedia.io", "password": "testtest", "scope": "system", "userType": "ADMIN"}' \
  "https://{YOUR_SERVER_ADDRESS}:5443/rest/v2/users"
```

### Edit a user

```bash
curl -X PUT -H "Content-Type: application/json" \
  -d '{"firstName": "Ant", "lastName": "Media", "email": "test", "password": "testtest", "scope": "system", "userType": "USER"}' \
  "https://{YOUR_SERVER_ADDRESS}:5443/rest/v2/users"
```

### Remove a user

```bash
curl -X DELETE -H "Content-Type: application/json" \
  "https://{YOUR_SERVER_ADDRESS}:5443/rest/v2/users/{username}"
```

## Multi-application access

From Ant Media Server **2.10.1**, the same user can have different roles per application.

Example:

- **ADMIN** on `LiveApp` — full control of that app
- **USER** on `WebRTCAppEE` — standard access only
- **READ-ONLY** on `live` — view only

### Web panel

Assign per-app roles when creating or editing the user:

![User-Management](@site/static/img/user-management/user_management_screen.png)

### REST API

Use `appNameUserType` to map applications to roles:

```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"firstName": "Ant", "lastName": "Media", "email": "abc@antmedia.io", "password": "testtest", "appNameUserType": {"LiveApp": "ADMIN", "WebRTCAppEE": "USER", "live": "READ_ONLY"}}' \
  "https://{YOUR_SERVER_ADDRESS}:5443/rest/v2/users"
```

This keeps permissions scoped to each application, which is useful when one person needs admin rights in one app and limited access in others.
