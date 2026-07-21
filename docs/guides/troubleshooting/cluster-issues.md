---
title: Cluster Issues
description: Troubleshoot Ant Media Server cluster problems, including streams not playable on edge nodes, MongoDB connectivity, and node registration issues.
keywords: [cluster troubleshooting, origin edge, MongoDB connection, Ant Media Server cluster, Ant Media Server Documentation]
sidebar_position: 4
---

# Cluster Issues

In cluster mode, streams are published to **origin** nodes, stream metadata is stored in **MongoDB**, and viewers are served by **edge** nodes. Most cluster problems come down to one of these three links being broken. Review the [cluster architecture](/guides/clustering-and-scaling/manual-configuration/cluster-installation/) if you are not familiar with these roles.

## A node does not appear in the cluster

**Symptom:** A freshly configured node is missing from the cluster node list in the Web Panel.

**Check:**

1. Confirm the node is really in cluster mode. The mode is set with:

```shell
cd /usr/local/antmedia
sudo ./change_server_mode.sh cluster mongodb://[username]:[password]@[mongodb-host]
```

2. Check `ant-media-server.log` for MongoDB connection errors right after startup. Authentication failures and unreachable hosts are logged there.
3. Verify the node can reach MongoDB directly:

```shell
mongosh "mongodb://[username]:[password]@[mongodb-host]:27017"
```

4. If MongoDB runs on a separate host, confirm `bindIp` in `/etc/mongod.conf` is `0.0.0.0` (or includes the node's network) and port 27017 is open between the node and the database.

**Resolution:** Fix the connection string or network path and restart the service with `sudo service antmedia restart`.

## Stream publishes to origin but does not play on edge

**Symptom:** The publisher connects successfully and the stream is visible on the origin node's panel, but playback via the load balancer or directly on an edge node fails (`no_stream_exist`).

**Check:**

1. **Port 5000:** Edge nodes fetch streams from origin nodes over TCP port **5000**. This port must be open between all cluster nodes on the internal network (and must NOT be exposed to the public internet).

```shell
# from an edge node
nc -zv <origin-node-ip> 5000
```

2. **Origin address registration:** Each node registers its address in MongoDB. If nodes register with an IP that other nodes cannot reach (for example a public IP in a VPC where only private IPs are routable), edges cannot connect. Check the registered node addresses in the Web Panel cluster view.
3. **Same MongoDB:** Confirm all nodes use the same MongoDB connection string. A node pointed at a different database is effectively in a different cluster.

**Resolution:** Open port 5000 between the nodes, and ensure nodes register a mutually reachable network address.

## Streams are visible on the panel but not listed on other nodes

**Symptom:** Different nodes show different stream lists.

**Check:** This indicates the nodes are not sharing the same database. Verify the MongoDB connection string in `/usr/local/antmedia/conf/red5.properties` (`clusterdb.host`) is identical on every node.

**Resolution:** Re-run `change_server_mode.sh cluster` with the correct connection string on the misconfigured node.

## MongoDB fails to start or crashes under load

**Symptom:** MongoDB terminates with "too many open files" errors, or nodes randomly lose their database connection under high stream counts.

**Check:** With MongoDB 4.4+, the open file limit must be raised. Verify the limits in `/etc/security/limits.conf` include:

```
mongodb soft    nofile         65535
mongodb hard    nofile         65535
```

**Resolution:** Apply the ulimit configuration from the [cluster installation guide](/guides/clustering-and-scaling/manual-configuration/cluster-installation/#configure-mongodb-limits) and restart MongoDB. For managed alternatives, consider [MongoDB Atlas](/guides/clustering-and-scaling/supported-databases/scaling-with-mongodb-atlas/), [AWS DocumentDB](/guides/clustering-and-scaling/supported-databases/scaling-with-aws-documentdb/), or [Redis](/guides/clustering-and-scaling/supported-databases/scaling-with-redis/).

## Load balancer sends viewers to origin nodes (or publishers to edges)

**Symptom:** Uneven load, or transcoding load appears on nodes intended to be edges.

**Check:** The load balancer must route publish traffic to the origin group and play traffic to the edge group. Review your Nginx/HAProxy upstream configuration against the reference configurations.

**Resolution:** Follow the [Nginx load balancer](/guides/clustering-and-scaling/load-balancing/nginx-load-balancer/) or [HAProxy load balancer](/guides/clustering-and-scaling/load-balancing/haproxy-load-balancer/) guides. In Kubernetes, origin/edge separation is handled by the deployment labels — see [deploying AMS on Kubernetes](/guides/clustering-and-scaling/kubernetes/deploy-ams-on-kubernetes/).

## Related documentation

- [Cluster installation](/guides/clustering-and-scaling/manual-configuration/cluster-installation/)
- [Multi-level cluster](/guides/clustering-and-scaling/manual-configuration/multi-level-cluster/)
- [Collecting logs from an AMS cluster](/guides/monitoring/collecting-logs-from-ams-cluster/)
