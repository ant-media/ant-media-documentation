---
title: Keycloak Integration
description: This guide explains how you can integrate your streaming application with [Keycloak](https://www.keycloak.org/) Identity Management to make WebRTC pages secure.
keywords: [Keycloak, Stream security, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 7
---

[Keycloak](https://www.keycloak.org/) is an Identity Management tool which makes authentication and authorization easy for different services by providing a single sign-on (SSO) solution. We can use Keycloak to make WebRTC pages secure by Keycloak authentication.

Ant Media default streaming application `StreamApp.war` has Keycloak integration as disabled. So if you create your own streaming application using from `StreamApp.war` or configure an existing application coming from installation, you should enable and configure Keycloak configurations. Here we will tell Keycloak and Ant Media Side configurations.

# Keycloak Confiuration

1. Please check [Keycloak Getting Started](https://www.keycloak.org/guides#getting-started) documentation to Setup Keycloak.
2. After make it run we will create a **Realm** from Keycloak Dashboard. Lets name it **antmedia**
3. Create an **Open ID Client** in the Realm (**antmedia**) we created in step2. Lets name it **stream-application**. Then set the URL as in the image below.
![](@site/static/img/stream-security/keycloak-client-creation.png)

4. Create a role in the Client (**stream-application**) we created in step3. Lets make role name **user**
5. Create a User in Realm with the role (**user**) we created in step4. Lets make user name **streamer1**


With the above configurations Keycloak side is ready. Now we will proceed with AMS configuration.

# AMS Configuration
1. Please navigate to the application folder in your AMS installation like:
`cd /usr/local/antmedia/webapps/{APP-NAME}/WEB-INF`
2. Uncomment the following lines in red5-web.xml and set the values according to you Keycloak server configurations.
   ```xml
   <!-- For Keycloak Integration -->
	<!--
	<bean id="openid.config" class="io.antmedia.SecurityConfiguration">
		<property name="realmUrl" value="http://keycloak.antmedia.cloud:8080/realms/antmedia" />
		<property name="appName" value="demo" />
		<property name="clientId" value="stream-application" />
		<property name="role" value="user" />
	</bean>
	-->
   ```
   **Note that:** appName should be the same with the application name we are configuring. Also all these parameters shoul be compatible with the configuration in the Keycloak.

3. Uncomment the following lines in web.xml
   ```xml
   <!-- For Keycloak Integration -->
	<!--
	<filter>
		<filter-name>ContentSecurityPolicyHeaderFilter</filter-name>
		<filter-class>io.antmedia.filter.ContentSecurityPolicyHeaderFilter</filter-class>
		<async-supported>true</async-supported>
	</filter>
	<filter-mapping>
		<filter-name>ContentSecurityPolicyHeaderFilter</filter-name>
		<url-pattern>/*</url-pattern>
	</filter-mapping>
   -->
   ```
4. Restart the antmedia service
   
   `sudo service antmedia restart`

 # AMS Configuration

Try to publish a WebRTC stream through sample publish page. It should requires Keycloak authentication.
`https://{AMS-URL}/{APP-NAME}/samples/publish_webrtc.html`


Try to play a stream through sample play page:
`https://{AMS-URL}/{APP-NAME}/player.html`