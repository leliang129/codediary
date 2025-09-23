---
title: Kubernetes核心概念
slug: /cloud-native/kubernetes/intro
sidebar_position: 1
---

# Kubernetes核心概念

## 什么是Kubernetes？

Kubernetes（常简称为K8s）是一个开源的容器编排平台，用于自动化部署、扩展和管理容器化应用程序。它最初由Google开发，现在由Cloud Native Computing Foundation（CNCF）维护。

## 核心组件

### 控制平面（Control Plane）
- **API Server**: 集群的入口点，处理所有REST请求
- **etcd**: 分布式键值存储，保存集群状态
- **Scheduler**: 负责将Pod调度到合适的节点
- **Controller Manager**: 运行各种控制器

### 工作节点（Worker Nodes）
- **Kubelet**: 与API Server通信，管理节点上的Pod
- **Kube Proxy**: 维护网络规则和负载均衡
- **容器运行时**: Docker、containerd、CRI-O等

## 基本资源对象

### Pod
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
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
  type: ClusterIP
```

## 常用kubectl命令

### 基础查询
```bash
kubectl get pods                   # 获取所有Pod
kubectl get services               # 获取所有Service
kubectl get deployments            # 获取所有Deployment
kubectl get nodes                  # 获取所有节点
```

### 详细查看
```bash
kubectl describe pod <pod-name>    # 查看Pod详情
kubectl describe node <node-name>  # 查看节点详情
kubectl get events                 # 查看集群事件
```

### 部署管理
```bash
kubectl apply -f deployment.yaml   # 部署YAML文件
kubectl delete -f deployment.yaml  # 删除部署
kubectl scale deployment/nginx --replicas=5  # 扩展副本
```

## 网络模型

### Service类型
- **ClusterIP**: 集群内部IP（默认）
- **NodePort**: 在每个节点上暴露端口
- **LoadBalancer**: 云提供商负载均衡器
- **ExternalName**: 外部服务别名

### Ingress
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: example-ingress
spec:
  rules:
  - host: example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: web-service
            port:
              number: 80
```

## 存储管理

### PersistentVolume (PV)
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

### PersistentVolumeClaim (PVC)
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

## 配置管理

### ConfigMap
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: game-config
data:
  game.properties: |
    enemy.types=aliens,monsters
    player.maximum-lives=5
  ui.properties: |
    color.good=purple
    color.bad=yellow
```

### Secret
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: mysecret
type: Opaque
data:
  username: YWRtaW4=  # base64编码
  password: MWYyZDFlMmU2N2Rm
```

## 最佳实践

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

### 滚动更新策略
```yaml
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxSurge: 25%
    maxUnavailable: 25%
```

## 故障排除

### 常用命令
```bash
kubectl logs <pod-name>            # 查看Pod日志
kubectl exec -it <pod-name> -- bash # 进入Pod
kubectl top pods                   # 查看资源使用
kubectl top nodes                  # 查看节点资源
```

### 调试技巧
1. 检查Pod状态: `kubectl describe pod`
2. 查看事件: `kubectl get events --sort-by=.metadata.creationTimestamp`
3. 检查资源配额: `kubectl describe resourcequota`
4. 网络诊断: 使用busybox Pod进行网络测试

## 安全实践

### ServiceAccount
```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: build-robot
```

### RBAC授权
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

## 学习资源

- [Kubernetes官方文档](https://kubernetes.io/docs/)
- [Kubernetes实战教程](https://kubernetesbyexample.com/)
- [Kubernetes the Hard Way](https://github.com/kelseyhightower/kubernetes-the-hard-way)
- [Awesome Kubernetes](https://github.com/ramitsurana/awesome-kubernetes)