---
title: Keycloak Integration
description: This guide explains how you can integrate your streaming application with Keycloak Identity Management to make WebRTC pages secure.
keywords: [Keycloak, Stream security, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 7
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

- Try to publish a WebRTC stream through a sample publish page.

  `https://{AMS-URL}:5443/{APP-NAME}/samples/publish_webrtc.html`

- Try to play a stream through the sample play page:

  `https://{AMS-URL}:5443/{APP-NAME}/player.html`

- When you try to publish or play, it will first ask you to authenticate with the keycloak user that we created.

  ![](@site/static/img/stream-security/keycloak-login.png)

  Once you authenticate, you will be able to publish the stream via sample page.
