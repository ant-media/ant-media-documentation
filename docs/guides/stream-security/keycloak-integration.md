---
title: Keycloak Integration
description: Secure Ant Media Server WebRTC sample pages with Keycloak single sign-on.
keywords: [Keycloak, SSO, Stream Security, Ant Media Server Documentation]
sidebar_position: 9
sidebar_label: Keycloak Integration
---

# Keycloak Integration

[Keycloak](https://www.keycloak.org/) is an Identity Management tool that makes authentication and authorization easy for different services by providing a single sign-on (SSO) solution. We can use Keycloak to make WebRTC pages secure by Keycloak authentication.

Ant Media default streaming application `StreamApp.war` has Keycloak integration disabled. So if you create your own streaming application using `StreamApp.war` or configure an existing application coming from installation, you should enable and configure Keycloak configurations. 

In this documentation, we will go through Keycloak and Ant Media Side configurations.

## Keycloak Configuration

1. Please check [Keycloak Getting Started](https://www.keycloak.org/guides#getting-started) documentation to Setup Keycloak.

2. After making it run, we will create a **Realm** from Keycloak Dashboard. Let's name it **antmedia**.

3. Create an **Open ID Client** in the Realm (**antmedia**). Let's name it **stream-application**. Then set the URL as in the image below.

![](@site/static/img/stream-security/keycloak-client-creation.png)

:::tip
You can use any name you need as the **Client ID**. Set the **Root URL** to your Ant Media Server URL (for example `https://your-ams-domain:5443`).
:::

4. Create a role in the client (**stream-application**). Let's make a role name **user**.

![](@site/static/img/stream-security/keycloak-role.png)

5. Create a User in Realm with the role (**user**) we created in step4. Lets make user name **streamer1**

![](@site/static/img/stream-security/keycloak-user.png)

Please do not forget to create the password from `Users            --> Click streamer1 --> Credentials --> Set Password`

With the above configurations, the Keycloak side is ready. Now we will proceed with AMS configuration.

## AMS Configuration

1. Please navigate to the application folder in your AMS installation, like:

   ```bash
   cd /usr/local/antmedia/webapps/{APP-NAME}/WEB-INF
   ```

2. Uncomment the following lines in `red5-web.xml` and set the values according to your Keycloak server configurations.

   ```xml
   <!-- For Keycloak Integration -->
	<bean id="openid.config" class="io.antmedia.SecurityConfiguration">
		<property name="realmUrl" value="http://keycloak.antmedia.cloud:8080/realms/antmedia" />
		<property name="appName" value="live" />
		<property name="clientId" value="stream-application" />
		<property name="role" value="user" />
	</bean>
   ```
   
:::info
The appName should be the same as the application name we are configuring. Also, all these parameters should be compatible with the configuration in the Keycloak.
:::

3. Uncomment the following lines in web.xml as below:

   ```xml
   <!-- For Keycloak Integration -->
	<filter>
		<filter-name>ContentSecurityPolicyHeaderFilter</filter-name>
		<filter-class>io.antmedia.filter.ContentSecurityPolicyHeaderFilter</filter-class>
		<async-supported>true</async-supported>
	</filter>
	<filter-mapping>
		<filter-name>ContentSecurityPolicyHeaderFilter</filter-name>
		<url-pattern>/*</url-pattern>
	</filter-mapping>
   ```
   
4. Restart the antmedia service.

   ```bash
   sudo service antmedia restart
   ```

## Stream Testing with Keycloak Integration

### Before Enabling Keycloak

Before Keycloak integration is enabled, the sample pages are accessible directly without authentication.

- Publish page:

  `https://{AMS-URL}:5443/{APP-NAME}/samples/publish_webrtc.html`
#### publish-page-without-keycloak.png
  ![](@site/static/img/stream-security/publish-page-without-keycloak.png)

- Player page:

  `https://{AMS-URL}:5443/{APP-NAME}/player.html`

#### player-page-without-keycloak.png
  ![](@site/static/img/stream-security/player-page-without-keycloak.png)

### After Enabling Keycloak

After enabling Keycloak integration, the same URLs are no longer accessible anonymously.

When you open either the publish or player page, Ant Media Server redirects you to the Keycloak login page.

![](@site/static/img/stream-security/keycloak-login.png)

After signing in with a user that has the required role, you are redirected back to the requested page and can continue publishing or playing streams normally.

#### publish-page-after-login.png
![](@site/static/img/stream-security/publish-page-after-login.png)

  Once you authenticate, you will be able to publish the stream via sample page.

## Congratulations!

You have successfully integrated Keycloak with Ant Media Server. Your sample pages are now protected by single sign-on (SSO). When you open a sample page, Keycloak prompts you to sign in. Only authenticated users with the required role can access the streaming UI.

From here, you can:

* Add more users and roles in Keycloak to control who can publish or play.
* Apply the same configuration to other applications beyond the default samples.
* Combine SSO with [JWT Stream Token](/guides/stream-security/jwt-stream-security-filter/) or [Webhook Authorization](/guides/stream-security/webhook-stream-authorization/) for additional stream-level controls.
* Extend Keycloak with MFA, social login, or federation using the [Keycloak documentation](https://www.keycloak.org/documentation).


