---
title: Enable IP filter behind AWS load balancer 
description: Enabling IP filtering behind a load balancer in AWS
keywords: [Load Balancer, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

# Enabling IP filtering behind a load balancer in AWS

This document explains how to enable IP filter for Ant Media Server behind a load balancer in AWS. Follow the instructions below.

1.  Edit the following file with a text editor.
    
```shell
vim /usr/local/antmedia/conf/jee-container.xml
```
    

2.  Find the line:
    
```xml
<bean id="valve.access" class="org.apache.catalina.valves.AccessLogValve">
```
    
And add the following line before it.
    
```xml
<bean id="valve.access" class="org.apache.catalina.valves.RemoteIpValve" />
```
    

3.  Find the line:

```xml
<property name="rotatable" value="true" />
```
    
and add the following line before it.
    
```xml
<property name="requestAttributesEnabled" value="true" />
```
    

4.  After adding these lines, restart Ant Media Server using the following command.
    
```shell
service antmedia restart
```
    
The final edited version of the file will look like the following.

```xml
<bean id="valve.access" class="org.apache.catalina.valves.RemoteIpValve" />
<bean id="valve.access" class="org.apache.catalina.valves.AccessLogValve">
    <property name="directory" value="log" />
    <property name="prefix" value="${http.host}_access" />
    <property name="suffix" value=".log" />
    <property name="pattern" value="common" />
    <property name="rotatable" value="true" />
    <property name="requestAttributesEnabled" value="true" />
```
Now, You can use the IP filter.