---
title: Collecting Logs and Metrics on Kubernetes
description: Collect Ant Media Server logs and Kubernetes metrics with Loki, Promtail, Prometheus, and Grafana on a cluster.
keywords: [Collecting Logs and Metrics of Ant Media Server on Kubernetes, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 4
sidebar_label: Kubernetes Logs & Metrics
---

# Collecting Logs and Metrics on Kubernetes

Monitor Ant Media Server on Kubernetes by combining **Loki** for log aggregation, **Prometheus** for cluster and application metrics, and **Grafana** for visualization.

Ant Media Server default Kubernetes manifests already include log configuration compatible with this setup — no extra pod annotations are required for basic log collection.

:::info
For Ant Media's managed centralized logging, see [Centralized Logging Setup](/guides/monitoring/centralized-logging/). For self-hosted Graylog on VMs, see [Collecting logs from an AMS cluster](/guides/monitoring/collecting-logs-from-ams-cluster/).
:::

## What you'll accomplish

By the end of this guide, you will:

1. Deploy **Loki** and **Promtail** to collect Ant Media Server pod logs.
2. Deploy **Prometheus** and **Grafana** with the kube-prometheus-stack Helm chart.
3. Connect Grafana to Loki as a data source.
4. Import a dashboard to search and monitor AMS pod logs.

## How it works

**Promtail** (installed with the Loki stack) ships container logs from each node to **Loki**. **Prometheus** scrapes cluster and workload metrics. **Grafana** queries both systems — metrics from Prometheus and logs from Loki — in one UI.

```
AMS pods → Promtail → Loki → Grafana
Cluster metrics → Prometheus → Grafana
```

## Prerequisites

Before you begin, confirm the following:

- A running **Kubernetes** cluster with Ant Media Server deployed. See [Deploy AMS on Kubernetes](/guides/clustering-and-scaling/kubernetes/deploy-ams-on-kubernetes/).
- **kubectl** configured for the cluster.
- **Helm v3+** installed locally.
- A default **StorageClass** (or update `storageClassName` in the Helm commands below).
- Permission to create resources in the `monitoring` namespace.

## Step 1: Create the monitoring namespace

```bash
kubectl create namespace monitoring
```

## Step 2: Install Loki and Promtail

Add the Grafana Helm repository and install the Loki stack with Promtail enabled:

```bash
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

helm install loki grafana/loki-stack \
  --namespace monitoring \
  --set grafana.enabled=false \
  --set promtail.enabled=true \
  --set prometheus.enabled=false \
  --set loki.persistence.enabled=true \
  --set loki.persistence.size=5Gi \
  --set loki.persistence.storageClassName=default
```

Promtail collects logs from Ant Media Server pods and forwards them to Loki.

## Step 3: Install Prometheus and Grafana

Add the Prometheus community Helm repository and install the kube-prometheus-stack:

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

helm install prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --set alertmanager.enabled=true \
  --set grafana.enabled=true \
  --set grafana.sidecar.datasources.enabled=true \
  --set grafana.persistence.enabled=true \
  --set grafana.persistence.size=5Gi \
  --set grafana.persistence.storageClassName=default \
  --set grafana.service.type=LoadBalancer \
  --set prometheus.prometheusSpec.storageSpec.volumeClaimTemplate.spec.storageClassName=default \
  --set prometheus.prometheusSpec.storageSpec.volumeClaimTemplate.spec.resources.requests.storage=10Gi \
  --set alertmanager.alertmanagerSpec.storage.volumeClaimTemplate.spec.storageClassName=default \
  --set alertmanager.alertmanagerSpec.storage.volumeClaimTemplate.spec.resources.requests.storage=5Gi \
  --set grafana.adminPassword='{YOUR_GRAFANA_PASSWORD}'
```

Replace `{YOUR_GRAFANA_PASSWORD}` with a strong admin password.

## Step 4: Add the Loki data source to Grafana

Create a ConfigMap so Grafana's sidecar picks up Loki automatically. Save the following as `loki-datasource.yaml`:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: loki-grafana-datasource
  namespace: monitoring
  labels:
    grafana_datasource: "1"
data:
  loki-datasource.yaml: |
    apiVersion: 1
    datasources:
      - name: Loki
        type: loki
        access: proxy
        url: http://loki:3100
        isDefault: false
```

Apply it:

```bash
kubectl apply -f loki-datasource.yaml
```

Grafana reloads data sources from ConfigMaps labeled `grafana_datasource: "1"`.

## Step 5: Access Grafana

Retrieve the admin password (if you did not store the Helm value):

```bash
kubectl --namespace monitoring get secrets prometheus-grafana \
  -o jsonpath="{.data.admin-password}" | base64 -d ; echo
```

Get the Grafana service address:

```bash
kubectl get svc -n monitoring prometheus-grafana
```

Open Grafana in your browser using the **EXTERNAL-IP** (LoadBalancer) or port-forward:

```text
http://{GRAFANA_EXTERNAL_IP}
```

Log in with username **`admin`** and your password. You should see the default Prometheus dashboards:

![](@site/static/img/ams-loki-1.png)

## Step 6: Import the AMS logs dashboard

1. In Grafana, go to **Dashboards → New → Import**.
2. Enter dashboard ID **`15141`** and load it.
3. Select **Loki** as the data source when prompted.

You can now search and filter Ant Media Server pod logs from one place:

![](@site/static/img/ams-loki-2.png)

---

## Troubleshooting

| Symptom | What to check |
|---------|----------------|
| Helm install fails on storage | `storageClassName` matches your cluster; PVCs can bind successfully. |
| No logs in Grafana | Promtail pods are running (`kubectl get pods -n monitoring`); Loki service reachable at `http://loki:3100`. |
| Loki not in Grafana | ConfigMap applied in `monitoring` namespace with label `grafana_datasource: "1"`; Grafana sidecar is enabled. |
| Cannot access Grafana UI | LoadBalancer EXTERNAL-IP assigned, or use `kubectl port-forward svc/prometheus-grafana -n monitoring 3000:80`. |
| Empty log dashboard | Ant Media Server pods are running and producing logs; time range in Grafana includes recent data. |

For broader Grafana-based monitoring outside Kubernetes, see [Monitoring with Grafana](/guides/monitoring/monitoring-ams-with-grafana/).
