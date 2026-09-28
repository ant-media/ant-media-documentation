---
title: Coturn Quick Installation
description: Install and configure Coturn as a TURN relay for Ant Media Server WebRTC, including cloud NAT, firewall ports, and connectivity tests.
keywords: [Setup TURN Server, TURN Server Installation, Coturn Quick Installation, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

# Coturn Quick Installation

**Coturn** is an open-source **STUN/TURN** server that relays WebRTC media when a direct path between the browser and Ant Media Server cannot be established. This guide covers automated and manual installation, cloud NAT settings, testing, and wiring Coturn into Ant Media Server.

For background on when TURN is required, see [TURN Server Installation](/guides/advanced-usage/turn-instalation/).

## What you'll accomplish

By the end of this guide, you will:

1. Install **Coturn** on your server (automatic script or manual steps).
2. Configure credentials, `realm`, and cloud **NAT** settings where needed.
3. Open the required **firewall ports** for STUN/TURN and relay traffic.
4. Verify relay connectivity from the **command line** and a **browser ICE test**.
5. Point Ant Media Server at your TURN endpoint using [STUN/TURN Server Configuration](/guides/configuration-and-testing/configuring-stun-turn-addresses/).

## When you need Coturn

Ant Media Server does **not** require a TURN server for standard publish/play workflows, even with symmetric NAT. You **do** need Coturn when:

- **UDP ports are blocked** on the client or network path.
- Clients are on **strict corporate or private networks**.
- Ant Media Server is used as a **signaling server in P2P WebRTC**.

If WebRTC fails despite open ports on the Ant Media Server host, a TURN relay is the usual fix.

## Prerequisites

Before you begin, confirm the following:

- A **Linux** host (Ubuntu/Debian recommended) with `sudo` access.
- A **public IP** or correctly mapped **cloud NAT** (AWS EC2, GCP, Azure, and similar).
- Permission to open **TCP/UDP ports** on the host firewall and cloud security group.
- A **username** and **password** to set in `turnserver.conf` (the install script can generate these).

## Step 1: Automatic installation (recommended)

Download and run the Ant Media Server Coturn install script:

```bash
sudo wget https://raw.githubusercontent.com/ant-media/Scripts/master/install_turn-server.sh
sudo chmod +x install_turn-server.sh
sudo ./install_turn-server.sh
```

The script installs Coturn, enables the service, and applies baseline configuration. Continue with [Step 3](#step-3-configure-cloud-nat-aws-gcp-azure) if the server runs behind cloud NAT.

## Step 2: Manual installation

Use manual installation when you need full control over `turnserver.conf` or cannot run the install script.

### 2.1 Install Coturn

```bash
sudo apt-get update && sudo apt-get install -y coturn
```

### 2.2 Enable the Coturn service

Edit `/etc/default/coturn` and set:

```bash
TURNSERVER_ENABLED=1
```

### 2.3 Configure credentials and realm

Edit `/etc/turnserver.conf` and add:

```bash
user=username:password
realm=your_public_ip_address
```

Replace `username:password` with your TURN credentials and `your_public_ip_address` with the server's public IP or hostname.

### 2.4 Restart Coturn

```bash
sudo systemctl restart coturn
```

## Step 3: Configure cloud NAT (AWS, GCP, Azure)

On cloud instances that use **NAT** (private IP inside the VM, public IP on the edge), add these lines to `/etc/turnserver.conf`:

```bash
relay-ip=your_instance_private_ip
external-ip=your_instance_public_ip/your_instance_private_ip
```

Replace the placeholders with your instance's private and public addresses.

## Step 4: Open firewall ports

Allow the following ports on the **host firewall** and **cloud security group**:

| Port | Protocol | Purpose |
|------|----------|---------|
| **443** | TCP | TLS listening (if enabled) |
| **3478–3479** | TCP, UDP | Coturn STUN/TURN listening |
| **32355–65535** | TCP, UDP | Relay port range |

Without the relay range open, clients may gather TURN candidates but media relay will fail under load.

## Step 5: Test the TURN server

### Command line

Install Coturn utilities if needed (`coturn` package includes them), then run:

```bash
turnutils_uclient -v -t -T -u username -w password -p 3478 turn_server_ip
```

Replace `username`, `password`, and `turn_server_ip` with your values. A successful run shows allocated relay candidates and completed allocations.

### Web browser (Trickle ICE)

1. Open the [WebRTC Trickle ICE sample](https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/).
2. Enter your TURN server details and click **Add Server**.

![TURN server Trickle ICE configuration](@site/static/img/turn1.png)

3. Click **Gather candidates**. Valid configuration produces **relay** candidates in the results list, similar to the example below.

![](https://raw.githubusercontent.com/wiki/ant-media/Ant-Media-Server/images/turn3.png)

## Step 6: Connect Coturn to Ant Media Server

After Coturn is running and tested, register it in Ant Media Server so WebRTC clients receive the TURN endpoint automatically. See [STUN/TURN Server Configuration](/guides/configuration-and-testing/configuring-stun-turn-addresses/) for dashboard and SDK settings.

For scaling relay traffic across multiple Coturn nodes, see [TURN Load Balancing](/guides/advanced-usage/turn-instalation/turn-load-balancing/).

## Related guides

- [TURN Server Installation](/guides/advanced-usage/turn-instalation/) — when STUN is enough and when TURN is required.
- [STUN/TURN Server Configuration](/guides/configuration-and-testing/configuring-stun-turn-addresses/) — point Ant Media Server and SDKs at your Coturn endpoint.
- [TURN Load Balancing](/guides/advanced-usage/turn-instalation/turn-load-balancing/) — distribute relay load across multiple servers.
- [WebRTC in Restricted Networks](/guides/advanced-usage/overcoming-restricted-networks-webrtc-ams/) — broader connectivity patterns for locked-down environments.

## Troubleshooting

| Symptom | What to check |
|---------|----------------|
| `coturn` service will not start | `TURNSERVER_ENABLED=1` in `/etc/default/coturn`; valid syntax in `/etc/turnserver.conf`; run `sudo systemctl status coturn` and check `/var/log/syslog`. |
| `turnutils_uclient` fails or times out | Username/password match `turnserver.conf`; port **3478** reachable; [firewall ports](#step-4-open-firewall-ports) open on host and security group. |
| Trickle ICE shows no **relay** candidates | TURN URL uses `turn:` scheme with correct host, port, username, and password; UDP **3478** and relay port range are not blocked. |
| Works on server but not from remote clients | On cloud VMs, set [relay-ip and external-ip](#step-3-configure-cloud-nat-aws-gcp-azure); confirm the **public IP** in `realm` matches what clients reach. |
| Relay candidates appear but WebRTC still fails | Relay range **32355–65535** open on **both** TCP and UDP; no middlebox blocking UDP after ICE succeeds. |
| Ant Media Server clients ignore TURN | Configure TURN in [STUN/TURN Server Configuration](/guides/configuration-and-testing/configuring-stun-turn-addresses/); restart Ant Media Server after changing application settings. |
| TLS/TURNS on port 443 not working | TLS certificates and `tls-listening-port` configured in `turnserver.conf`; port **443** allowed separately from UDP TURN. |
