# Prometheus setup notes for future guides

Working notes from the September 17, 2026 demo deployment. These notes are outside `docs/` so they do not become a published Docusaurus article. No license keys, passwords, or actual infrastructure addresses are included.

## What was deployed and observed

- Ubuntu 24.04 on two AMS nodes, one MongoDB host, and one monitoring host, connected by a private network.
- Initial AMS Enterprise 3.1.0 installation lacked the native Prometheus endpoint: no listener on 9090, no Prometheus configuration/classes. `/metrics` on 5080 returned 404.
- Community PR #7960 merged September 14 into master, commit `476998a25ff3615e04f0736a05f1720e2df8d368`. The master build was `4.0.0-SNAPSHOT`.
- Both nodes were upgraded using the complete September 13 Enterprise master CI package with newly built Community master server/service jars, updated connector/servlet configuration, and Maven-resolved Prometheus runtime libraries. Enterprise component commit: `aa07d1bd32bba36341ded264cc540aefed5b18e7`; parent: `9c0dc6b`.
- Use the classified `ant-media-server-server.jar` when deploying a local Community build. Its `Implementation-Version` manifest is required for Enterprise's native version check. An unclassified jar can cause `Unmatched version` at startup.
- Upgrading needs more than a jar: the Prometheus connector, root web.xml servlet/filter mapping, Actuator, Micrometer, Prometheus libraries, and runtime histogram dependencies are required. Prefer a complete supported installer containing the feature for public instructions.
- The installer with `-r true` restores the previous `jee-container.xml`, which can remove the new metrics connector. In this demo the updated template was restored and cluster mode reapplied with the existing MongoDB URI.
- AMS `/metrics` responded on 9090 with native `antmedia_*`, JVM, and system metrics. Initial firewall rules allowed the monitoring host over the private interface only; the final setup uses source-restricted public-IP scraping (see below).
- Prometheus 3.14.0 and Grafana OSS 13.2.2 were installed as systemd services, enabled at boot. The live demo uses UI ports 9090 and 3000 on a dedicated host, with authentication. The article uses a loopback-only Prometheus UI on 9091 to work for colocated deployments too.
- Prometheus initially scraped both private AMS addresses every 15 seconds. Both targets returned `up = 1`. Retention was 15 days, capped at 15 GB.
- Grafana login, Prometheus data source health, and the provisioned dashboard were checked. AMS login, license validity, and two-member cluster status were checked on node 1 after upgrade. Node 2 verification was limited to startup and successful scraping at the user's request.
- Automated tests were not run for the upgrade, per the user's instruction to keep this demo lightweight.

## Discovery facts grounded in source

- `ClusterStore` defaults to database `clusterdb`; the MongoDB entity collection is `clusternode`.
- Registry fields include `ip` and `lastUpdateTime` (epoch milliseconds). Morphia maps the node identifier to `_id`.
- `status` is `@NotSaved`. Do not query `{status: "alive"}` in MongoDB.
- Heartbeats have a 5-second period. `ClusterNode.getStatus()` uses a 20-second threshold; MongoDB cluster node listing/counting uses a 30-second recency window in the inspected build.
- The article's 300-second exporter cutoff is intentionally a discovery grace period, not a claim about AMS's internal threshold. Removing targets hides their `up == 0` series eventually; separate capacity/discovery monitoring is needed.
- In the demo, `ip` held the public address because AMS advertised its public address, despite MongoDB and metrics scraping using private interfaces. The final setup scrapes those registered public IPs directly; the initial static address map was removed.
- Sources: `ClusterNode.java` in Community and `ClusterStore.java` / `MongoDBClusterStore.java` in Enterprise, inspected at the above commits.

## Implemented documentation versus live validation

The new article covers installation, single-target scraping, fixed clusters, and a Python + systemd timer recipe exporting MongoDB membership to Prometheus file SD. The documented dynamic exporter was subsequently installed on the monitoring host and exercised against the live demo MongoDB. Prometheus now uses file SD for AMS targets. Two consecutive automatic exports each produced both nodes, and the Prometheus target API confirmed both targets were up with `__meta_filepath` pointing to the generated file. Single-host colocation remains documented but was not deployed in this session.

The recipe uses a read-only database account, atomic same-directory file replacement, millisecond heartbeat filtering, deduplication, IPv6 formatting, and last-file retention on errors. A successful empty result deliberately writes `[]`; a missing collection or failed query must not erase the prior file.

## Follow-up work before splitting into standalone setup guides

- Confirm the first released AMS version containing the feature; replace snapshot-specific prerequisites when appropriate.
- Validate MongoDB discovery end to end: new node joins, node retirement, restart, clock skew, database outage, registered-address changes, file ownership, and return to healthy discovery.
- Validate scaling from zero nodes. Distinguish a genuinely empty registry from a database/collection typo or an uninitialized cluster.
- Decide whether to distribute the exporter through the Scripts repository rather than maintain a long article code block.
- For deployments requiring private-IP discovery, prefer the cloud inventory integration rather than reintroducing a manually maintained address map.
- Add discovery freshness/capacity alerting in a dedicated follow-up. File SD retaining the last known list does not by itself expose exporter health to Prometheus.
- Consider a separate Grafana provisioning/dashboard download guide and TLS access guide. Do not mix the older Kafka/Elasticsearch monitoring architecture into native Prometheus setup.
- If documenting administrative account creation by API, match the dashboard's password encoding. The initial API-created account worked with a plain-password API request but failed in the legacy dashboard until stored hashing was corrected. Avoid including this unrelated detail in the Prometheus article.

## References

- https://github.com/ant-media/Ant-Media-Server/pull/7960
- https://prometheus.io/download/
- https://prometheus.io/docs/guides/file-sd/
- https://prometheus.io/docs/prometheus/latest/configuration/configuration/#file_sd_config
- https://prometheus.io/docs/prometheus/latest/configuration/https/
- https://grafana.com/docs/grafana/latest/setup-grafana/installation/debian/

## Live MongoDB discovery rollout

- Installed the article's Python script at `/usr/local/bin/ams-prometheus-discovery.py`, running as `ams-discovery` with group `prometheus`.
- Created a dedicated MongoDB account with the `read` role on `clusterdb`; allowed the monitoring host to connect through the database's private interface.
- Initially configured a protected environment file and public-to-private address map. The final configuration retains `/etc/ams-discovery/environment` and removes the map, as described below.
- The enabled `ams-prometheus-discovery.timer` runs every 30 seconds and atomically replaces `/var/lib/prometheus/file_sd/antmedia.json`. Heartbeats older than 300 seconds are excluded.
- Replaced only the `antmedia` static scrape job with file SD; retained Prometheus self-monitoring and authentication. Relabeling preserves the existing `node` and `public_ip` labels for the two demo nodes, with registered IP as the default descriptive node label for future nodes.
- Automatic Ubuntu updates initially held the apt lock. Retried with `DPkg::Lock::Timeout=180`. Before switching the scrape job, require the exporter service to succeed and the generated file to contain the expected initial targets; `promtool check config` alone merely warns about a missing discovery file.
- Verified repeated scheduled exports and healthy file-discovered scrapes. Join/leave, database failure retention, and scaling from zero have not been exercised.
- Additional autoscaled nodes need reachable registered public addresses and source-restricted metrics firewall rules in their provisioning template. No discovery-side map updates are needed.

## Final article positioning and demo metrics

- Present provider discovery first for scaling infrastructure: AWS EC2, Azure VM/VMSS, GCP Compute Engine, and OVHcloud. Link Prometheus's official configuration reference rather than duplicate each provider's credential setup.
- Distinguish OVH VPS/dedicated discovery (`ovhcloud_sd_configs`) from OVH Public Cloud (`openstack_sd_configs`, instance role).
- Position MongoDB registration plus file SD as the alternative when no provider-specific mechanism is used. Select one discovery mechanism per set of nodes to avoid duplicate collection.
- Started three low-load FFmpeg publishers for demonstration: one on node 1 and two on node 2. Each loops a pre-encoded 640×360, 15 fps SMPTE-bars clip, video only, over RTMP with stream copy. Native `antmedia_streams_live` returned 1 and 2 respectively.
- Final article includes the observed requirement to generate and inspect the first target file before replacing a static job; a successful Prometheus configuration check does not ensure that a file-SD target file exists.

## Final public-IP scraping configuration

At the user’s request, removed `ADDRESS_MAP_FILE`, the address-map file, and all translation code from both the deployed exporter and article. Each target now uses the MongoDB `ip` directly, with IPv6 bracket formatting when applicable. MongoDB access remains private.

AMS TCP 9090 is allowed on each public interface only from the monitoring server’s public IP; the old private-interface scrape rules were removed. Prometheus automatically reloads the rewritten target file. Existing descriptive `node` and `public_ip` labels are retained; the `instance` label changes from private to public address, so those series start with the new address.

Documentation uses reserved public example addresses for AMS nodes and the monitoring source IP, and private examples only for MongoDB connectivity. New instances require the same metrics source-IP allowlist, supplied at provisioning time.
