---
title: TURN Load Balancing
description: Scale Coturn with DNS round-robin and a shared MariaDB user database for consistent TURN authentication across multiple relay nodes.
keywords: [TURN Load Balancing, Coturn, Round Robin DNS, MariaDB, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

# TURN Load Balancing

When a single Coturn node is not enough, run **multiple Coturn servers** behind one hostname and share credentials through **MariaDB**. **DNS round-robin** distributes new client connections across nodes; the shared database keeps authentication consistent no matter which server answers.

This guide walks through DNS, database, and Coturn configuration for a two-node example. Adapt IP addresses and hostnames to your environment.

For a single-node setup, start with [Coturn Quick Installation](/guides/advanced-usage/turn-instalation/coturn-quick-installation/).

## What you'll accomplish

By the end of this guide, you will:

1. Point one **TURN hostname** at multiple Coturn servers using **DNS round-robin**.
2. Run a shared **MariaDB** database for Coturn long-term credentials.
3. Configure **two Coturn nodes** with identical `turnserver.conf` settings.
4. Create TURN users and verify relay through the load-balanced hostname.

## How it works

```text
Client → turn.example.com (DNS round-robin) → Coturn 1 or Coturn 2 → MariaDB (shared auth)
```

1. Clients connect to a single TURN hostname (for example, `turn.antmedia.io`).
2. **DNS** returns Coturn server IPs in rotation (round-robin).
3. Each Coturn node authenticates against the same **MariaDB** user database.

![](@site/static/img/turn_dns_round_robin.png)

## Prerequisites

Before you begin, confirm the following:

- **Two** Linux hosts for Coturn (this guide uses `192.168.1.201` and `192.168.1.202`).
- **One** MariaDB server (this guide uses `192.168.1.200`).
- **DNS** access to create multiple **A records** for your TURN hostname.
- Coturn installed on both nodes — see [Coturn Quick Installation](/guides/advanced-usage/turn-instalation/coturn-quick-installation/) if needed.
- Firewall ports from [Coturn Quick Installation](/guides/advanced-usage/turn-instalation/coturn-quick-installation/#step-4-open-firewall-ports) open on **each** Coturn node.

Example lab layout:

| Role | Host | IP (example) |
|------|------|--------------|
| DNS | — | `192.168.1.199` |
| MariaDB | Database server | `192.168.1.200` |
| Coturn 1 | TURN node | `192.168.1.201` |
| Coturn 2 | TURN node | `192.168.1.202` |

## Step 1: Configure DNS round-robin

Create **two A records** for your TURN subdomain, each pointing at a different Coturn server IP:

```text
turn.antmedia.io    IN    A    192.168.1.201
turn.antmedia.io    IN    A    192.168.1.202
```

Replace `turn.antmedia.io` and the IP addresses with your hostname and Coturn server addresses. Resolvers return these addresses in rotation so new connections spread across nodes.

## Step 2: Configure MariaDB

Install MariaDB on the database server and allow connections from both Coturn nodes.

### 2.1 Install MariaDB

```bash
sudo apt-get update && sudo apt-get install -y mariadb-server
```

### 2.2 Allow remote connections

Edit `/etc/mysql/mariadb.conf.d/50-server.cnf` and set:

```ini
bind-address            = 0.0.0.0
innodb_file_format=Barracuda
innodb_file_per_table=1
innodb_large_prefix=1
```

Restart MariaDB:

```bash
sudo systemctl restart mariadb
```

### 2.3 Create database and users

Log in to the MariaDB shell:

```bash
mysql -uroot -p
```

Run the following SQL. Replace `coturn123` with a strong password and adjust Coturn node IPs if needed:

```sql
SET SESSION innodb_strict_mode=ON;
SET GLOBAL innodb_default_row_format='dynamic';

CREATE DATABASE coturn;
CREATE USER 'coturn'@'192.168.1.201' IDENTIFIED BY 'coturn123';
CREATE USER 'coturn'@'192.168.1.202' IDENTIFIED BY 'coturn123';

GRANT ALL PRIVILEGES ON coturn.* TO 'coturn'@'192.168.1.201';
GRANT ALL PRIVILEGES ON coturn.* TO 'coturn'@'192.168.1.202';
FLUSH PRIVILEGES;
QUIT;
```

## Step 3: Install Coturn on both nodes

Repeat these steps on **Coturn 1** and **Coturn 2**.

### 3.1 Install and enable Coturn

```bash
sudo apt-get update && sudo apt-get install -y coturn
sudo sed -i 's/#TURNSERVER_ENABLED.*/TURNSERVER_ENABLED=1/g' /etc/default/coturn
sudo systemctl enable coturn
```

### 3.2 Configure turnserver.conf

Back up the default config and create a new one:

```bash
sudo mv /etc/turnserver.conf /etc/turnserver.conf_bck
sudo vim /etc/turnserver.conf
```

Add the following (use the same `realm`, database host, and password on **both** nodes):

```bash
fingerprint
lt-cred-mech
realm=turn.antmedia.io
mysql-userdb="host=192.168.1.200 dbname=coturn user=coturn password=coturn123 port=3306 connect_timeout=60 read_timeout=60"
syslog
```

After restart, both nodes should log Coturn startup to syslog:

![](@site/static/img/coturn-2.png)

## Step 4: Import Coturn schema and create users

Copy the Coturn schema from either node to the database server:

```bash
scp /usr/share/coturn/schema.sql root@192.168.1.200:
```

On the database server, import the schema:

```bash
mysql -uroot -p coturn < schema.sql
```

Create a TURN user on either Coturn node:

```bash
sudo turnadmin -a --mysql-userdb="host=192.168.1.200 dbname=coturn user=coturn password=coturn123" -u antmedia -p 123456 -r turn.antmedia.io
```

Restart Coturn on **both** nodes:

```bash
sudo systemctl restart coturn
```

## Step 5: Test the load-balanced TURN setup

### Verify DNS round-robin

```bash
nslookup turn.antmedia.io
```

Repeated lookups should alternate between your Coturn server IPs:

![](@site/static/img/coturn-nslookup.png)

### Verify TURN relay

```bash
turnutils_uclient -v -t -T -u antmedia -w 123456 -p 3478 turn.antmedia.io
```

A successful run shows relay allocations similar to the example below:

![](@site/static/img/coturn-output.png)

Run the test several times to confirm different DNS answers still authenticate and relay correctly.

## Step 6: Connect to Ant Media Server

Point Ant Media Server and client SDKs at the **load-balanced hostname** (`turn.antmedia.io` in this example), not individual node IPs. See [STUN/TURN Server Configuration](/guides/configuration-and-testing/configuring-stun-turn-addresses/).

## Related guides

- [TURN Server Installation](/guides/advanced-usage/turn-instalation/) — when TURN is required and how relay fits WebRTC.
- [Coturn Quick Installation](/guides/advanced-usage/turn-instalation/coturn-quick-installation/) — single-node Coturn setup.
- [STUN/TURN Server Configuration](/guides/configuration-and-testing/configuring-stun-turn-addresses/) — register TURN in Ant Media Server.

## Troubleshooting

| Symptom | What to check |
|---------|----------------|
| `nslookup` always returns one IP | DNS provider supports round-robin for multiple A records; flush local DNS cache; wait for TTL to expire after record changes. |
| Coturn cannot connect to MariaDB | `bind-address = 0.0.0.0` on MariaDB; firewall allows **3306** from both Coturn IPs; `coturn` user host entries match node IPs. |
| Authentication fails on one node only | Identical `turnserver.conf` on both nodes; same `realm` and `mysql-userdb` string; Coturn restarted after config changes. |
| `turnutils_uclient` works by IP but not hostname | DNS records point to correct Coturn IPs; hostname in test matches `realm` and DNS A records. |
| Schema import errors | Run `SET GLOBAL innodb_default_row_format='dynamic'` before import; use `/usr/share/coturn/schema.sql` from the installed `coturn` package. |
| Relay works once then fails on retry | Both nodes have [relay ports open](/guides/advanced-usage/turn-instalation/coturn-quick-installation/#step-4-open-firewall-ports); session stickiness is not required for TURN—check per-node logs in syslog. |
| User created with `turnadmin` not found | Command run with correct `--mysql-userdb` connection string; user created for the same `realm` as `turnserver.conf`. |
