To briefly mention Helm, Helm is a tool that allows you to manage applications on Kubernetes easily. It's possible to deploy, upgrade, and control versions with Helm.

The key point, you can deploy Ant Media Server to your Kubernetes via Helm. Today, we are going to take a look at a step-by-step how to deploy Ant Media Server with helm. The part that excites me is that you can create an Ant Media Server Cluster environment with one click.

Helm supports installations on Ubuntu and other distros. Before installing Helm on any operating system, it is necessary to set up a Kubernetes cluster. If Helm is not installed on your computer, you can follow the steps below for Ubuntu 20.04 and check this link for other distro downloads.

### Prerequisites

- Kubernetes >= 1.23 (Your cluster must be ready and accessible)
- Helm v3
- cert-manager

### Install Helm

Install the helm tool by running the commands below.

```
curl https://baltocdn.com/helm/signing.asc | gpg --dearmor | sudo tee /usr/share/keyrings/helm.gpg > /dev/null 
sudo apt-get install apt-transport-https --yes 
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/helm.gpg] https://baltocdn.com/helm/stable/debian/ all main" | sudo tee /etc/apt/sources.list.d/helm-stable-debian.list 
sudo apt-get update 
sudo apt-get install helm
```
### Install the Ant Media Server Helm Chart

Ant Media Server Helm chart installs the following

- MongoDB deployment
- Origin deployment
- Edge Deployment
- Ingress controller

Add the AMS repository to Helm then install it as follows.

```
helm repo add antmedia https://ant-media.github.io/helm
helm repo update
helm install antmedia antmedia/antmedia --set origin={origin}.{example.com} --set edge={edge}.{example.com} --namespace antmedia --create-namespace
```
After the installation is finished, 1 MongoDB pod, 1 Ant Media Origin pod, 1 Ant Media Edge pod, and Nginx Ingress will be installed (Go to the bottom of the page for available parameters.) and the output of **kubectl get pods -n antmedia** will be as follows.

```
NAME READY STATUS RESTARTS AGE ant-media-server-edge-7d8fd58f94-dwqbs 1/1 Running 0 2m15s ant-media-server-origin-57d974f4f7-655rf 1/1 Running 0 2m15s antmedia-ingress-nginx-controller-6b49f64bfc-zbblx 1/1 Running 0 2m15s mongo-69888cbbb9-d2zrc 1/1 Running 0          2m15s
```
If the installation went as expected, run **kubectl get ingress -n antmedia** command to get your Ingress IP address and then update your DNS according to the ingress IP address and hostnames.

`kubectl get ingress -n antmedia`

**Example Output**

```
NAME                      CLASS    HOSTS                   ADDRESS        PORTS     AGE
ant-media-server-origin   <none>   origin.antmedia.cloud   x.x.x.x        80, 443   9m45s
ant-media-server-edge     <none>   edge.antmedia.cloud     x.x.x.x        80, 443   9m55s
```
You can do a DNS query as follows.
```
dig origin.antmedia.cloud +noall +answer
dig edge.antmedia.cloud +noall +answer
```
Example output:
```
root@murat:~# dig edge.antmedia.cloud +noall +answer
edge.antmedia.cloud.	300	IN	A	x.x.x.x
```
If the result of this output is your Ingress IP address, your DNS has been updated so you can access via HTTPS (self-signed) or HTTP.

### Install SSL

By default, a self-signed certificate comes in the Ant Media Server Kubernetes structure that you install with Helm. If you want, you can replace it with your own certificate as below or follow the steps below for Let's Encrypt.
```
kubectl create -n antmedia secret tls ${CERT_NAME} --key ${KEY_FILE} --cert ${CERT_FILE} 
Use Let's Encrypt
```
If you want, you can do this with the script we have prepared below or a step-by-step installation.
```
wget https://raw.githubusercontent.com/ant-media/helm/add_helm_repo/ams-k8s-ssl.sh
bash ams-k8s-ssl.sh
```
Then wait for the certificate to be created.

If everything went well, the output of the **kubectl get -n antmedia** certificate command will show the value **True** as follows.
```
NAME                   READY   SECRET                 AGE
antmedia-cert-origin   True    antmedia-cert-origin   21m
antmedia-cert-edge     True    antmedia-cert-edge     24m
```
Then you can reach the Ant Media Edge/Origin instances over HTTPS.

https://{origin}.{example}.{com}
https://{edge}.{example}.{com}

### Parameters

You can customize the Ant Media Cluster installation using the following parameters.

| Parameter                               | Description                                                                                              | Default                                                                            |
|------------------------------------------------| -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `image.repository`                                        | image repository                                                                                         | `antmedia/enterprise` |
| `image.tag`                                        | image tag                                                                                         | `latest` |
| `origin`                                       | Domain name of Origin server                                                                             | `{}`                                                                        |
| `edge`                                         | Domain name of Edge server                                                                               | `{}`                                                                     |
| `hostNetwork`                                  | If `false`, use turn server                                                                              | `true`                                                                            |
| `mongodb`                                      | MongoDB host                                                                                             | `mongo`                                                                     |
| `licenseKey`                                      | License key                                                                                            | `{}`                                                                     |
| `autoscalingOrigin.targetCPUUtilizationPercentage`                            | Target CPU utilization percentage for autoscaler for Origin                                                                          | `60`                                                                               |
| `autoscalingOrigin.minReplicas`                                 | Minimum number of deployment replicas for the compute container.                                                                                | `1`                                                                               |
| `autoscalingOrigin.maxReplicas`                                  | Maximum number of deployment replicas for the compute container.                                    | `10`                                                                               |
| `autoscalingEdge.targetCPUUtilizationPercentage`                                 | Target CPU utilization percentage for autoscaler for Edge                         | `60`                                                                                |
| `autoscalingEdge.minReplicas`                          | Minimum number of deployment replicas for the compute container.     | `1`                                                                               |
| `autoscalingEdge.maxReplicas`                               | Maximum number of deployment replicas for the compute container.                                                         | `10`                                                                               |
| `MongoDBNodeSelector`                               | Node Affinity for MongoDB deployment.                                                         | `{}`                                                                               |
| `EdgeNodeSelector`                               | Node Affinity for AMS Edge deployment.                                                         | `{}`                                                                               |
| `OriginNodeSelector`                               | Node Affinity for Edge Origin deployment.                                                         | `{}`                                                                               |



## Example Usage
```
helm install antmedia antmedia/antmedia --set origin=origin.antmedia.io --set edge=edge.antmedia.io --set autoscalingEdge.targetCPUUtilizationPercentage=20 --set autoscalingEdge.minReplicas=2 --namespace antmedia --create-namespace

```
