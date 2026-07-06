---
title: Uninstall on Linux
description: Uninstall Ant Media Server
keywords: [Uninstall Ant Media Server, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 4
---

This guide provides step-by-step instructions for uninstalling Ant Media Server from a Linux system. Follow the commands listed below to ensure the complete removal of the application.

### Stop the Ant Media Server Service

Before uninstalling, stop the Ant Media Server service to ensure there are no running processes.

```bash
sudo service antmedia stop
```

### Remove Ant Media Server Files

Delete the directory where Ant Media Server is installed. This removes all application files and data.

**Note**- Ensure you have a backup if you want any data or config preserved, because this is destructive.

```bash
sudo rm -rf /usr/local/antmedia
```

### Delete the Ant Media Server User

The specific user was created to run Ant Media Server, delete this user.

```bash
sudo userdel antmedia
```

### Delete systemd file

```bash
sudo rm -rf /etc/systemd/system/antmedia.service
sudo systemctl daemon-reload
```

<br /><br />
---

<div align="center">
<h2> All set 🔧 </h2>
</div>

You have successfully **uninstalled Ant Media Server** from your system. Your server is now clean and ready for a fresh start.  

