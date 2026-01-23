---
title: Ant Media Server Azure Scale Set (VMSS) Upgrade
description: Ant Media Server Azure Scale Set (VMSS) Upgrade
keywords: [Ant Media Server Documentation, Ant Media Server Tutorials, Ant Media Server Azure Scale Set (VMSS) Upgrade Guide, Ant Media Server Azure Scale Set Upgrade]
sidebar_position: 4
---

# Ant Media Server Azure Scale Set (VMSS) Upgrade Guide

This document outlines the steps required to update the image version of an Ant Media Server Enterprise cluster on Azure.

### 1. Updating the VMSS Model

This step updates the Scale Set definition (blueprint) to the new version. This change does not immediately affect running instances; it only defines the configuration for "future" or "updated" instances.

```
az vmss update \
  --resource-group <Your-Resource-Group> \
  --name <Your-VMSS-Name> \
  --set \
    virtualMachineProfile.storageProfile.imageReference.publisher="antmedia" \
    virtualMachineProfile.storageProfile.imageReference.offer="ant_media_server_enterprise" \
    virtualMachineProfile.storageProfile.imageReference.sku="enterprise_edition" \
    virtualMachineProfile.storageProfile.imageReference.version="latest"
```

**Note:** If you wish to roll back or stay on a specific version, replace **latest** with a specific version number like **2.16.2**, **2.13.2**.

### 2. Applying the New Image to Instances (Update/Reimage)

Once the model is updated, existing instances must be manually triggered to adopt the change.

Updating All Instances:
```
az vmss update-instances \
  --resource-group <Your-Resource-Group> \
  --name <Your-VMSS-Name> \
  --instance-ids "*"
```

  **Warning:** This process restarts the machines and wipes the OS disk to install the new image. Any active live streams will be disconnected during this process.


### 3. Verification

You can verify the success of the update using three different methods:

#### 1. Via Azure Portal: 

Navigate to VMSS > Settings > Operating System > Image Reference and check the version.

#### 2. Via CLI: 
```
az vmss show -g <Your-Resource-Group> -n <Your-VMSS-Name> --query "virtualMachineProfile.storageProfile.imageReference.version"
```

#### 3. Ant Media Dashboard: 

Log in to the web panel and check the version number in the bottom right corner.