---
title: Kubernetes深入指南
slug: /cloud-native/kubernetes
---

# Kubernetes深入指南

## Kubernetes架构

### 控制平面组件
- **API Server**: 集群的前端，处理所有REST操作
- **etcd**: 高可用的键值存储，保存集群所有数据
- **Scheduler**: 负责将Pod调度到合适的节点
- **Controller Manager**: 运行控制器进程

### 节点组件
- **Kubelet**: 与API Server通信，管理节点上的Pod
- **Kube Proxy**: 维护节点网络规则
- **Container Runtime**: 运行容器的软件（Docker、containerd等）

## 核心概念

### Pod
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mypod
spec:
  containers:
  - name: nginx
    image: nginx:1.14.2
    ports:
    - containerPort: 80
```

### Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
```

### Service
```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: MyApp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 9376
```

### ConfigMap和Secret
```yaml
# ConfigMap示例
apiVersion: v1
kind: ConfigMap
metadata:
  name: game-config
data:
  game.properties: |
    enemy.types=aliens,monsters
    player.maximum-lives=5
```

## 常用kubectl命令

### 基础命令
```bash
kubectl get pods                  # 获取所有Pod
kubectl get services              # 获取所有Service
kubectl get deployments           # 获取所有Deployment
kubectl get nodes                 # 获取所有节点

kubectl describe pod <pod-name>   # 查看Pod详情
kubectl logs <pod-name>           # 查看Pod日志
kubectl exec -it <pod-name> -- bash # 进入Pod
```

### 部署和管理
```bash
kubectl apply -f deployment.yaml  # 部署YAML文件
kubectl delete -f deployment.yaml # 删除部署
kubectl scale deployment/nginx --replicas=5 # 扩展副本数
kubectl rollout status deployment/nginx # 查看部署状态
```

### 故障排查
```bash
kubectl get events                # 查看事件
kubectl top pods                  # 查看Pod资源使用
kubectl top nodes                 # 查看节点资源使用
kubectl debug <pod-name> -it --image=busybox # 调试Pod
```

## 网络策略

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: test-network-policy
spec:
  podSelector:
    matchLabels:
      role: db
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          role: frontend
    ports:
    - protocol: TCP
      port: 6379
```

## 存储管理

### PersistentVolume
```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-volume
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: "/mnt/data"
```

### PersistentVolumeClaim
```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pv-claim
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 3Gi
```

## 配置最佳实践

### 资源限制
```yaml
resources:
  requests:
    memory: "64Mi"
    cpu: "250m"
  limits:
    memory: "128Mi"
    cpu: "500m"
```

### 健康检查
```yaml
livenessProbe:
  httpGet:
    path: /healthz
    port: 8080
  initialDelaySeconds: 3
  periodSeconds: 3

readinessProbe:
  httpGet:
    path: /ready
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 5
```

## Helm包管理

### 安装Helm
```bash
# 安装Helm
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# 添加仓库
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
```

### 使用Helm
```bash
# 安装Chart
helm install my-release bitnami/nginx

# 列出安装的Release
helm list

# 升级Release
helm upgrade my-release bitnami/nginx

# 卸载Release
helm uninstall my-release
```

## 监控和日志

### 安装Prometheus Stack
```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-community/kube-prometheus-stack
```

### 查看指标
```bash
# 端口转发到Grafana
kubectl port-forward svc/prometheus-grafana 3000:80

# 访问 http://localhost:3000
# 默认用户名: admin, 密码: prom-operator
```

## 安全实践

### ServiceAccount
```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: build-robot
```

### Role和RoleBinding
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: default
  name: pod-reader
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "watch", "list"]
```

## 故障排除技巧

1. **检查Pod状态**: `kubectl describe pod <pod-name>`
2. **查看日志**: `kubectl logs <pod-name>`
3. **检查事件**: `kubectl get events --sort-by=.metadata.creationTimestamp`
4. **进入容器**: `kubectl exec -it <pod-name> -- bash`
5. **检查资源**: `kubectl top pods` / `kubectl top nodes`

## 学习资源

- [Kubernetes官方文档](https://kubernetes.io/docs/)
- [Kubernetes实战](https://kubernetesbyexample.com/)
- [Awesome Kubernetes](https://github.com/ramitsurana/awesome-kubernetes)