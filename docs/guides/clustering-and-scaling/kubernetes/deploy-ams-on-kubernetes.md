---
title: Manual Deployment 
description: Deploy Ant Media Server on Kubernetes
keywords: [Deploy Ant Media Server on Kubernetes, Kubernetes, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

# Deploy Ant Media Server on Kubernetes 

## Sample Deployment File

Ant Media Server has such a deployment file structure. This file has a few differences according to the deployment type. Here we will introduce the general file structure.

```yaml
kind: Service
apiVersion: v1
metadata:
  name: ant-media-server
spec:
  selector:
    app: ant-media
  ports:
    - name: http
      protocol: TCP
      port: 5080 
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ant-media-server
spec:
  selector:
    matchLabels:
      app: ant-media
  replicas: 1
  template:
    metadata:
      labels:
        app: ant-media
    spec:
      affinity:
        podAntiAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
          - labelSelector:
              matchExpressions:
              - key: app
                operator: In
                values:
                - ant-media
            topologyKey: "kubernetes.io/hostname"
      hostNetwork: true
      dnsPolicy: ClusterFirstWithHostNet
      containers:
      - name: ant-media-server
        imagePullPolicy: IfNotPresent # change this value accordingly. It can be Never, Always or IfNotPresent
        image: ant-media-server-enterprise-k8s:test #change this value according to your image.
# By default, mongodb deployment is used. If you're using mongodb somewhere else, specify it  with server url(-h) below. 
# You may also need to add -u and -p parameters for
# specifying mongodb username and passwords respectively         
        args: ["-g", "true", "-s", "true", "-r", "true", "-m", "cluster", "-h", "mongo"]
        resources:
          requests:
              cpu: 4000m
```
Here are the explanations for the common parameters and the changes parameters.

### Common Parameters

  
**The following parameters are common parameters independent of deployment type.**  

*   **imagePullPolicy:** `IfNotPresent` means that if the image is available in local environment it will not pull from the private or public registry.
*   **image:** `ant-media-server-enterprise-k8s:test` specifies the name of the image. You should pay attention here as it should be the same name as the image you built in previous step.
*   **args:** `["-g", "true", "-s", "true", "-r", "true", "-m", "cluster", "-h", "127.0.0.1"]` specifies the parameters for running the Ant Media Server pods. Below we'll explain what they are used for.
    *   **`"-g", "true"`**: It means that Ant Media Server uses the public IP address of the host for internal cluster communication. Default value is false.
    *   **`"-s", "true"`**: It makes Ant Media Server uses its public IP address as the server name.
    *   **`"-r", "true"`**: It makes Ant Media Server replaces the local IP address in the ICE candidates with the server name. It's false by default.
    *   **` "-m", "cluster"`**: It specifies the server mode. It can be cluster or standalone. Its default value is standalone. If you're running Ant Media Server in Kubernetes, it's most likely you're running the Ant Media Server in cluster mode. This means you need to specify your MongoDB host, username, and password as parameter.
    *    **`"-h", "127.0.0.1"`**: It specifies the MongoDB host address. It's necessary to use if you're running in cluster mode. In this example, it's 127.0.0.1 because in the CI pipeline, local MongoDB is installed. You should change it with your own MongoDB address or replica set.
    *    **`"-u", "username"`**: It specifies the username to connect to MongoDB. If you don't have credentials, you don't need to specify.
    *    **`"-p", "password"`**: It specifies the password to connect to MongoDB. If you don't have credentials, you don't need to specify.
    *    **`"-l", "license number"`**: It makes Ant Media Server uses the license key.

### Deployment Specific Parameters

**The following parameters are different according to the deployment type.**

*   **hostNetwork:** true line above means that Ant Media Server uses the host network. It is required as there is a wide range of UDP and TCP ports are being used for WebRTC streaming. This also means that you can only use one pod of Ant Media Server in a host instance. Don't worry about where and how to deploy as K8s handles that. We're just letting you know this to determine total number of nodes in your cluster.
*   **affinity: TODO**
*   **labels:** for origin edge distinction TODO

## Origin & Edge configurations

We strongly recommend separate origin and edge instances in Ant Media Cluster. So we have two sets of deployment files for origins and edges. 

While publishing a stream, you should use the URL of the load balancer of origins. ```ORIGIN_LOAD_BALANCER_URL/WebRTCAppEE```

Similarly, you should use the URL of the load balancer of edges in playing. ```EDGE_LOAD_BALANCER_URL/WebRTCAppEE/player.html```

## Horizontal Pod Autoscaling

Kubernetes lets you scale the pods automatically to optimize resource usage and make the backend ready according to the load in your service. Horizontal Pod Autoscaler which is a built-in component can scale your pods automatically.

Firstly, we need to have a Metrics Server to collect the metrics of the pods. To provide metric via the Metrics API, metric server monitoring must be deployed on the cluster. Horizontal Pod Autoscaler uses this API to collect metrics.

### Install Metric Server

Metric Server is usually deployed by the cloud provider. If you are using a custom Kubernetes cluster or the Metric Server is not deployed by your cloud provider you should deploy it manually as explained below. 

To check if a metrics-server is installed,  use the following command.

```shell
kubectl get pods --all-namespaces | grep -i "metric"
```

If the metric server exists, then you should see an output exactly like the below.

```shell
kube-system   metrics-server-5bb577dbd8-7f58c           1/1     Running   7          23h
```

If there is no output as above, proceed to install the metric server manually. 

#### Step 1: Download the components.yaml file on the master

```shell
wget https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

#### Step 2: Modify the components.yaml file

Add the following to line 132 of the file: `--kubelet-insecure-tls`.

```yml
spec:
  containers:
  - args:
    - --kubelet-insecure-tls
    - --cert-dir=/tmp
    - --secure-port=4443
    - --kubelet-preferred-address-types=InternalIP,ExternalIP,Hostname
    - --kubelet-use-node-status-port
    image: k8s.gcr.io/metrics-server/metrics-server:v0.4.2
```

#### Step 3: Deploy the Components.yaml file

```shell
kubectl apply -f components.yaml
```

#### Step 4: Verify Successful Deployment

Check whether everything is working properly by running the following command:

```shell
kubectl get apiservices |grep "v1beta1.metrics.k8s.io"
```
The expected output of the command should be as follows.

```shell
v1beta1.metrics.k8s.io                 kube-system/metrics-server   True        21h
```


### Configure Autoscaling

Make a small changes in the yaml files for edge and origin configurations in Ant Media Server:

```shell
kubectl edit deployment ant-media-server-origin 
kubectl edit deployment ant-media-server-edge
```

It's necessary to configure the required CPU cores for our edge and origin by editing the following lines. The value is measured in Millicores.

Millicores is a metric which is used to measure CPU usage. It is a CPU core divided into 1000 units (milli = 1000). 1000 = 1 core. So the below configuration defines 4 cores (4000 milliocores).

```yml
resources:
  requests:
  cpu: 4000m
```
  
After adding the content, the file should be as follows:

```yml
kind: Service
apiVersion: v1
metadata:
  name: ant-media-server
spec:
  selector:
    app: ant-media
  ports:
    - name: http
      protocol: TCP
      port: 5080 
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ant-media-server
spec:
  selector:
    matchLabels:
      app: ant-media
  replicas: 1
  template:
    metadata:
      labels:
        app: ant-media
    spec:
      affinity:
        podAntiAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
          - labelSelector:
              matchExpressions:
              - key: app
                operator: In
                values:
                - ant-media
            topologyKey: "kubernetes.io/hostname"
      hostNetwork: true
      dnsPolicy: ClusterFirstWithHostNet
      containers:
      - name: ant-media-server
        imagePullPolicy: IfNotPresent # change this value accordingly. It can be Never, Always or IfNotPresent
        image: ant-media-server-enterprise-k8s:test #change this value according to your image.
# By default, mongodb deployment is used. If you're using mongodb somewhere else, specify it  with server url(-h) below. 
# You may also need to add -u and -p parameters for
# specifying mongodb username and passwords respectively         
        args: ["-g", "true", "-s", "true", "-r", "true", "-m", "cluster", "-h", "mongo"]
        resources:
          requests:
              cpu: 4000m
```

Check the accuracy of the value we entered using the command below.  
  
```shell
kubectl describe deployment/ant-media-server-origin
kubectl describe deployment/ant-media-server-edge
```

Now that the deployment is running, we're going to create a Horizontal Pod Autoscaler:  
  
```shell
kubectl autoscale deployment ant-media-server-origin --cpu-percent=60 --min=1 --max=10
kubectl autoscale deployment ant-media-server-edge --cpu-percent=60 --min=1 --max=10
```

alternatively,  you can use the following YAML file:  
  
```shell
#origin
kubectl create -f https://raw.githubusercontent.com/ant-media/Scripts/master/kubernetes/ams-k8s-hpa-origin.yaml
#edge
kubectl create -f https://raw.githubusercontent.com/ant-media/Scripts/master/kubernetes/ams-k8s-hpa-edge.yaml
```

In the above configuration, the CPU resource usage is set to 60%, a minimum pod of 1 and a maximum pod of 10. It means, that whenever the CPU average resource usage exceeds 60%, a new pod will be created to a maximum of 10 pods. 

You can monitor the situation in the following output.  
  
```shell
root@k8s-master:~$ kubectl get hpa
NAME               REFERENCE                     TARGETS   MINPODS   MAXPODS   REPLICAS   AGE
ant-media-server   Deployment/ant-media-server   3%/60%   1         10         1          20h
```

When the cpu average value decreases below 60%, then the pods are going to be terminated.  
  
```shell
root@k8s-master:~$ kubectl get hpa
NAME               REFERENCE                     TARGETS   MINPODS   MAXPODS   REPLICAS   AGE
ant-media-server   Deployment/ant-media-server   52%/60%   1         10         4          20h
```

Check the number of pods running using the following command.  
  
```shell
root@k8s-master:~$ kubectl get pods
NAME                                READY   STATUS    RESTARTS   AGE
ant-media-server-7b9c6844b9-4dtwj   1/1     Running   0          42m
ant-media-server-7b9c6844b9-7b8hp   1/1     Running   0          19h
ant-media-server-7b9c6844b9-9rrwf   1/1     Running   0          18m
ant-media-server-7b9c6844b9-tdxhl   1/1     Running   0          47m
mongodb-9b99f5c-x8j5x               1/1     Running   0          20h
```
### Useful Commands

The following command provides information about AutoScale configuration:  
  
```shell
kubectl get hpa
```
  
Check the load of pods running the following command:  
  
```shell
kubectl top nodes
```
  
This command prints out the following:

```shell
root@k8s-master:~$ kubectl top node
NAME         CPU(cores)   CPU%   MEMORY(bytes)   MEMORY%   
k8s-node     111m         5%     717Mi           38%       
k8s-node-2   114m         5%     1265Mi          68%       
k8s-node-3   98m          4%     663Mi           35%       
k8s-node-4   102m         5%     666Mi           35%       
n8s-master   236m         11%    1091Mi          58%
```
## Kubernetes Ingress

We are going to use Nginx as an Ingress Controller and install it via Helm. An Ingress Controller is a component in the Kubernetes cluster that configures an HTTP load balancer according to Ingress resources that have been created.

Helm is a tool that automates the creation, packaging, configuration, and deployment of Kubernetes applications by combining configuration files into a single reusable package. 

There is already a Nginx Ingress Controller package ready to use, so we can fetch and deploy it via Helm to make life easier.

Run the following commands to install helm and Nginx as Ingress.  
  
```shell
wget -qO- https://get.helm.sh/helm-v3.5.2-linux-amd64.tar.gz | tar zxvf - 
cd linux-amd64/
./helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
./helm repo update
./helm install ingress-nginx ingress-nginx/ingress-nginx
```

Or you can install it via the APT tool.  
  
```shell
curl https://baltocdn.com/helm/signing.asc | gpg --dearmor | sudo tee /usr/share/keyrings/helm.gpg >` /dev/null
sudo apt-get install apt-transport-https --yes
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/helm.gpg] https://baltocdn.com/helm/stable/debian/ all main" | sudo tee /etc/apt/sources.list.d/helm-stable-debian.list
sudo apt-get update
sudo apt-get install helm
```

Make sure everything is working correctly with the following command.

```shell
kubectl get pods -n default | grep "ingress"
```

## Deploy with HostNetwork

Run the following commands with hostNetwork

```shell
kubectl create -f https://raw.githubusercontent.com/ant-media/Scripts/master/kubernetes/ams-k8s-mongodb.yaml
kubectl create -f https://raw.githubusercontent.com/ant-media/Scripts/master/kubernetes/ams-k8s-deployment-edge.yaml  
kubectl create -f https://raw.githubusercontent.com/ant-media/Scripts/master/kubernetes/ams-k8s-deployment-origin.yaml
kubectl create -f https://raw.githubusercontent.com/ant-media/Scripts/master/kubernetes/ams-k8s-hpa-origin.yaml  
kubectl create -f https://raw.githubusercontent.com/ant-media/Scripts/master/kubernetes/ams-k8s-hpa-edge.yaml
kubectl create -f https://raw.githubusercontent.com/ant-media/Scripts/master/kubernetes/ams-k8s-ingress-origin.yaml
kubectl create -f https://raw.githubusercontent.com/ant-media/Scripts/master/kubernetes/ams-k8s-ingress-edge.yaml
kubectl create -f https://raw.githubusercontent.com/ant-media/Scripts/master/kubernetes/ams-k8s-rtmp.yaml
```

## Deploy without HostNetwork

Run the following commands without hostNetwork

```shell
kubectl create -f https://raw.githubusercontent.com/ant-media/Scripts/babf478b99c7e6b15edbd5aa220fde5ba4cd3adb/kubernetes/ams-with-turn-server/ams-k8s-mongodb.yaml
kubectl create -f https://raw.githubusercontent.com/ant-media/Scripts/babf478b99c7e6b15edbd5aa220fde5ba4cd3adb/kubernetes/ams-with-turn-server/ams-k8s-coturn.yaml
kubectl create -f https://raw.githubusercontent.com/ant-media/Scripts/babf478b99c7e6b15edbd5aa220fde5ba4cd3adb/kubernetes/ams-with-turn-server/ams-k8s-deployment-edge.yaml
kubectl create -f https://raw.githubusercontent.com/ant-media/Scripts/babf478b99c7e6b15edbd5aa220fde5ba4cd3adb/kubernetes/ams-with-turn-server/ams-k8s-deployment-origin.yaml
kubectl create -f https://raw.githubusercontent.com/ant-media/Scripts/babf478b99c7e6b15edbd5aa220fde5ba4cd3adb/kubernetes/ams-with-turn-server/ams-k8s-hpa-origin.yaml
kubectl create -f https://raw.githubusercontent.com/ant-media/Scripts/babf478b99c7e6b15edbd5aa220fde5ba4cd3adb/kubernetes/ams-with-turn-server/ams-k8s-hpa-edge.yaml
kubectl create -f https://raw.githubusercontent.com/ant-media/Scripts/babf478b99c7e6b15edbd5aa220fde5ba4cd3adb/kubernetes/ams-with-turn-server/ams-k8s-ingress-edge.yaml
kubectl create -f https://raw.githubusercontent.com/ant-media/Scripts/babf478b99c7e6b15edbd5aa220fde5ba4cd3adb/kubernetes/ams-with-turn-server/ams-k8s-ingress-origin.yaml
kubectl create -f https://raw.githubusercontent.com/ant-media/Scripts/master/kubernetes/ams-k8s-rtmp.yaml
```
## Install an SSL Certificate

### Custom certificate

If you have your own certificate, you can add it as follows. If you are going to use Let's Encrypt, you can proceed to the next step.

```shell 
kubectl create secret tls ${CERT_NAME} --key ${KEY_FILE} --cert ${CERT_FILE}
kubectl create secret tls antmedia-cert --key="ams.key" --cert="ams.crt"
```

If everything is fine, the output of **kubectl get ingress** will be as follows. So the ADDRESS column is a Public IP address.

```shell
root@kubectl:~# kubectl get ingress
NAME               CLASS    HOSTS               ADDRESS       PORTS     AGE
ant-media-server   `<none>`   test.antmedia.io   146.59.2.42   80, 443   94m
```

### Let's Encrypt Configuration

For this, install Helm and Cert-Manager by following the steps below.

#### Step 1

Begin by adding the Jetstack repository to your Helm installation then update the repo.

```shell
helm repo add jetstack https://charts.jetstack.io
helm repo update
```

#### Step 2
Install in your Cert-Manager cluster by running the following line  
  
```shell
helm install cert-manager jetstack/cert-manager --namespace cert-manager --create-namespace --version v1.9.1 --set installCRDs=true
```

#### Step 3
Install the CustomResourceDefinition resources by using the following command.  
  
```shell
kubectl apply -f https://github.com/jetstack/cert-manager/releases/download/v1.9.1/cert-manager.crds.yaml
```

#### Step 4
Create a YAML file in your working directory and name it **ams-k8s-issuer-production.yaml** Add the following content:

```yml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-production
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: change_me
    privateKeySecretRef:
      name: letsencrypt-production
    solvers:
      - http01:
          ingress:
            class: nginx
```

Or you can [download](https://raw.githubusercontent.com/ant-media/Scripts/master/kubernetes/ams-k8s-issuer-production.yaml) it from the GitHub repository.

:::tip
Provide a valid email address. You will receive email notifications on certificate renewals or alerts.  
:::

Let's deploy the YAML file that we created.


```shell
kubectl create -f ams-production-issuer.yaml
```

When you run the `kubectl get clusterissuers` command, you will see an output like the one below.

```shell
NAME                     READY   AGE
letsencrypt-production   True    27m
```

#### Step 5
We use the `antmedia-cert-edge` and `antmedia-cert-origin` secrets by default for the Origin and Edge sides, and we delete them because there are self-signed certificates.

```shell
kubectl delete -n antmedia secret antmedia-cert-edge kubectl delete -n antmedia secret antmedia-cert-origin
```

#### Step 6
You must add an annotation **cert-manager.io/cluster-issuer: letsencrypt-production**" in the ingress configuration with the issuer or cluster issuer name.  

```shell
kubectl annotate ingress cert-manager.io/cluster-issuer=letsencrypt-production --all
```

If everything went well, the output of the **kubectl get -n antmedia certificate** command will show the value True** as follows.

```shell
NAME                   READY   SECRET                 AGEantmedia-cert-origin   True    antmedia-cert-origin   21mantmedia-cert-edge     True    antmedia-cert-edge     24m
```



**YAML file for Origin**

```yml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
name: ant-media-server-origin
annotations:
  kubernetes.io/ingress.class: nginx
  cert-manager.io/cluster-issuer: letsencrypt-production
  nginx.ingress.kubernetes.io/affinity: "cookie"
  nginx.ingress.kubernetes.io/session-cookie-name: "route"
  nginx.ingress.kubernetes.io/session-cookie-expires: "172800"
  nginx.ingress.kubernetes.io/session-cookie-max-age: "172800"
spec:
rules:
- host: origin.antmedia.cloud
  http:
    paths:
    - path: /
      pathType: Prefix
      backend:
        service:
          name: ant-media-server-origin
          port:
            number: 5080

tls:
  - hosts:
    - origin.antmedia.cloud
    secretName: ams-certificate-origin
```

**YAML file for Edge**

```yml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
name: ant-media-server-edge
annotations:
  kubernetes.io/ingress.class: nginx
  cert-manager.io/cluster-issuer: letsencrypt-production
  nginx.ingress.kubernetes.io/affinity: "cookie"
  nginx.ingress.kubernetes.io/session-cookie-name: "route"
  nginx.ingress.kubernetes.io/session-cookie-expires: "172800"
  nginx.ingress.kubernetes.io/session-cookie-max-age: "172800"
spec:
rules:
- host: edge.antmedia.cloud
  http:
    paths:
    - path: /
      pathType: Prefix
      backend:
        service:
          name: ant-media-server-edge
          port:
            number: 5080

tls:
  - hosts:
    - edge.antmedia.cloud
    secretName: ams-certificate-edge
```
#### Step 6  
After creating Ingress you should have tls secret in `kubectl get secret` output.

```shell
NAME                                  TYPE                                  DATA   AGE
ams-certificate-origin                kubernetes.io/tls                     2      44m
ams-certificate-edge                  kubernetes.io/tls                     2      44m
default-token-72fnb                   kubernetes.io/service-account-token   3      78m
ingress-nginx-admission               Opaque                                3      60m
ingress-nginx-token-ncck2             kubernetes.io/service-account-token   3      60m
sh.helm.release.v1.ingress-nginx.v1   helm.sh/release.v1                    1      60m
```  
#### Step 7
Get the Load Balancer IP address with the `kubectl get ingress` command and add it to your DNS server.

```shell
NAME                      CLASS    HOSTS                   ADDRESS         PORTS     AGE
ant-media-server-origin   `<none>`   origin.antmedia.cloud   xxx.xxx.xxx.xxx   80, 443   26m
ant-media-server-edge   `<none>`   edge.antmedia.cloud   xxx.xxx.xxx.xxx   80, 443   26m
```
#### Step 8
Check whether the certificate has been created by running the `kubectl get cert` command and if you see it as `True`, your certificate will be uploaded to your cluster in a few minutes. 

Now you can reach it as https://edge.domain.com and https://origin.domain.com