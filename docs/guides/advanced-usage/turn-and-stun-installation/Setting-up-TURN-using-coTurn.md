# Setting up TURN using coTurn

In this guide, we're going to explain how to create a load balancer using Turn Server (MySQL support) as DNS Round Robin.

## What is Round Robin DNS?

Round Robin DNS is a fast, simple and cost-effective way to load balance or distribute traffic evenly over multiple servers or devices.

## How does Round Robin work?

By using Round Robin DNS, when a user accesses the home page, the request will be sent to the first IP address. The second user who accesses the home page will be sent to the next IP address, and the third user will be sent to the third IP address. In a nutshell, Round Robin network load balancing rotates connection requests among web servers in the order that requests are received.

## Block Diagram of the Installation  
![](@site/static/img/turn_dns_round_robin.png)

1.  Clients try to access the turn server via a domain name such ```turn.antmedia.io```
2.  DNS resolves the ```turn.antmedia.io``` to the backends ```Turn Server - 1``` and ```Turn Server - 2``` by using Round Robin algorithm.
3.  Turn Servers access to the same Database for authentication and serves the client.

## System Requirements

```shell
2 x Turn Server
1 x MySQL/MariaDB server
1 x DNS Access

DNS    : 192.168.1.199
MariaDB: 192.168.1.200
Coturn1: 192.168.1.201
Coturn2: 192.168.1.202
```

 This "How to" guide has been tested in a real lab environment so you have to set up the configuration according to your own setup.

## DNS Configuration

Assuming this is a fully-registered domain, we will add the following in the DNS settings. We add two A records for the subdomain turn.antmedia.io and point them to the turn server servers IP address.

Example DNS Record is as follows:

    turn.antmedia.io	IN		A		192.168.1.201
    turn.antmedia.io	IN		A		192.168.1.202

 In this way, when we request to turn.antmedia.io, it will distribute every request in the round-robin structure to the ip addresses we have stated above.

## Database Configuration

We always prefer to install the Database Server on a separate server and we choose MariaDB. We use long-term authentication in this structure and we authenticate to the turn server with the users that we created.

### 1 Install MariaDB

Update the repository and install MariaDB with the following command:

```shell   
apt-get update && apt-get install mariadb-server -y
```
    
### 2 Edit Configuration file

Edit the following configuration file ```/etc/mysql/mariadb.conf.d/50-server.cnf``` with your favorite editor such as ```vim``` or ```nano``` Please add the following lines then save and exit:

```shell
bind-address = 0.0.0.0
innodb_file_format=Barracuda
innodb_file_per_table=1
innodb_large_prefix=1
```
    
### 3 Restart the MariaDB Server.
    
```shell
systemctl restart mysqld
```
    
### 4 Login to Mariadb:

Login to Mariadb shell using the following command:
 
```shell
mysql -uroot -p
```
    
### 5 Create coturn credentials

Run the SQL command as follows on the MariaDB shell. In the SQL below, we are setting the password to ```coturn123``` but you can choose any secure password you want. Make sure to note what you set, because it will be used later. 
    
```sql
SET SESSION innodb_strict_mode=ON;
SET GLOBAL innodb_default_row_format='dynamic';

create database coturn;
CREATE USER 'coturn'@'192.168.1.201' IDENTIFIED BY 'coturn123';
CREATE USER 'coturn'@'192.168.1.202' IDENTIFIED BY 'coturn123';

GRANT ALL PRIVILEGES ON coturn.* TO 'coturn'@'192.168.1.201';
GRANT ALL PRIVILEGES ON coturn.* TO 'coturn'@'192.168.1.202';
flush privileges;
quit;
```
    

## Install TURN Server

In this section, we will install and configure CoTurn on Coturn1 and Coturn2 server.

### 1 Update the repository

Update the repository and install CoTurn with the following command
    
```shell
apt-get update && apt-get install coturn -y
```
    
### 2 Enable the TURN server

Use the following command to enable the TURN server:
    
```shell
sed -i 's/#TURNSERVER_ENABLED.*/TURNSERVER_ENABLED=1/g' /etc/default/coturn
```
    
### 3 Add CoTurn to start at boot time
    
```shell
systemctl enable coturn
```
    
### 4 Backup original conf file:
    
```shell 
mv /etc/turnserver.conf{,_bck}
```
    
### 5 Create the configuation file:

Create the following configuration file with the editor of your choice:
    
```shell
vim /etc/turnserver.conf
```
    
Now add the below lines and save the file. Keep in mind that in a previous step, we set the password ```coturn123``` which is the value we are using below. If you did change the password to something else, use your own password instead of ```coturn123```:

```conf
fingerprint
lt-cred-mech
realm=turn.antmedia.io
mysql-userdb="host=192.168.1.200 dbname=coturn user=coturn password=coturn123 port=3306 connect_timeout=60 read_timeout=60"
syslog
```
    
Make sure you're doing this step on Coturn1 and Coturn2 server separately. The syslog output of all servers is as follows:
    
    ![](@site/static/img/coturn-2.png)
    
### 6 Import SQL schema

Import the SQL schema ```/usr/share/coturn/schema.sql``` to the database server. The file ```/usr/share/coturn/schema.sql``` is in one of the turn servers. Upload to the database server and ```schema.sql``` is imported.
    
```shell
scp -r /usr/share/coturn/schema.sql root@192.168.1.200:
```
    
Now run the following command to import the SQL file:
    
```shell
mysql -uroot -p coturn `< schema.sql
```
    
Finally, restart the service on both CoTURN instances nodes:
    
```shell
systemctl restart coturn
```
    
### 7 Create a username and password

To create a username and password, run the following command on the turn1 or turn2 server:
    
```shell
turnadmin -a --mysql-userdb="host=192.168.1.200 dbname=coturn user=coturn password=coturn123" -u antmedia -p 123456 -r turn.antmedia.io
```

### 8 Check configuration is working

Let's check if the configurations are working correctly:
    
```shell
turnutils_uclient -v -t -T -u antmedia -w 123456 -p 3478 turn.antmedia.io
```
    
If everything is fine, your output will be as follows

![](@site/static/img/coturn-output.png)

## Troubleshooting

You can use the following command to check that DNS Round-Robin is working correctly:

```shell
nslookup turn.antmedia.io
```

![](@site/static/img/coturn-nslookup.png)

If you have any questions, please just drop a line to contact (at) antmedia.io
