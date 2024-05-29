
# Uninstalling Ant Media Server on Linux

This guide provides step-by-step instructions for uninstalling Ant Media Server from a Linux system. Follow the commands listed below to ensure a complete removal of the application.

### Stop the Ant Media Server Service

Before uninstalling, stop the Ant Media Server service to ensure there are no running processes.

    sudo service antmedia stop

### Remove Ant Media Server Files

Delete the directory where Ant Media Server is installed. This removes all application files and data.

    sudo rm -rf /usr/local/antmedia


### Delete the Ant Media Server User

If a specific user was created for running Ant Media Server, delete this user.

    sudo userdel antmedia

### Disable the Ant Media Server Service

Prevent the service from starting automatically on boot by disabling it.

    sudo systemctl disable antmedia.service

### Reload the Systemd Manager Configuration

Reload the systemd manager configuration to apply the changes made by disabling the service.

    sudo systemctl daemon-reload

### Reset Failed Systemd Services

Reset the status of any failed services to ensure the systemd state is clean.

    sudo systemctl reset-failed
