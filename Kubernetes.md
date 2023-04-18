# Kubernetes Guide ☸

- Make sure you have Docker Desktop installed and running on your local machine.

- To enable Kubernetes on Docker Desktop, go to Preferences > Kubernetes and check the Enable Kubernetes checkbox.

- Create a Kubernetes deployment YAML file for each service. In this example, we will create one for the admin-service and one for the user-service. Here's an example YAML file for the user-service:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
  labels:
    app: user-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: user-service
  template:
    metadata:
      labels:
        app: user-service
    spec:
      containers:
        - name: user-service
          image: user-service:latest
          imagePullPolicy: Always
          ports:
            - containerPort: 8080
```

- Create a Kubernetes service YAML file for each service. This file defines the service type, port, and target port. Here's an example YAML file for the user-service:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: user-service
  labels:
    app: user-service
spec:
  selector:
    app: user-service
  ports:
    - protocol: TCP
      port: 9120
      targetPort: 9120
  type: LoadBalancer
```

- Create a Kubernetes secret YAML file for each service that needs access to sensitive information, such as database credentials. Here's an example YAML file for the mongo-secret:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: mongo-secret
type: Opaque
data:
  MONGO_URI: 'mongodb://mongo:27017' # Replace with your MongoDB URI
  MONGO_DB: 'user-service' # Replace with your MongoDB database name
  MONGO_COLLECTION: 'users' # Replace with your MongoDB collection name
  PORT: '8080' # Replace with your service port
```

- Apply each YAML file using the kubectl apply command. For example:

```bash
   kubectl apply -f kubernetes/user-service
   kubectl apply -f kubernetes/admin-service
   kubectl apply -f kubernetes/product-service
   kubectl apply -f kubernetes/email-service
   kubectl apply -f kubernetes/order-service
   kubectl apply -f kubernetes/frontend-service
```

- To view the status of your Kubernetes cluster, use the kubectl get command. For example:

```bash
   kubectl get pods
```

```bash
   kubectl get services
   kubectl get service user-service
```

```bash
   kubectl get secrets
```

```bash
   kubectl get deployments
```

```bash
   kubectl get all
```

- To view the logs of a pod, use the kubectl logs command. For example:

```bash
   kubectl logs user-service-5f7f7d9f9d-7j2xg
```

```bash
   kubectl logs user-service-5f7f7d9f9d-7j2xg -f
```

- To delete a pod, use the kubectl delete command. For example:

```bash
   kubectl delete pod user-service-5f7f7d9f9d-7j2xg
```

```bash
   kubectl delete pod user-service-5f7f7d9f9d-7j2xg -f
```

- To delete a deployment, use the kubectl delete command. For example:

```bash
   kubectl delete deployment user-service
```

- Access your services using the external IP address of the LoadBalancer service, or by using the kubectl port-forward command to forward traffic to a local port. For example:

```bash
   kubectl port-forward service/user-service 8080:8080
```
