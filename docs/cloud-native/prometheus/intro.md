---
title: Prometheus监控系统
slug: /cloud-native/prometheus/intro
---

# Prometheus监控系统

## 什么是Prometheus？

Prometheus是一个开源的系统监控和警报工具包，最初由SoundCloud开发，现在已成为Cloud Native Computing Foundation（CNCF）的毕业项目。它具有以下特点：

- 多维数据模型（时间序列由指标名称和键/值对标识）
- 灵活的查询语言（PromQL）
- 不依赖分布式存储，单个服务器节点是自治的
- 通过HTTP拉取模式进行时间序列收集
- 通过中间网关支持推送时间序列
- 通过服务发现或静态配置发现目标
- 多种图形和仪表板支持模式

## 核心组件

### Prometheus Server
- 负责抓取和存储时间序列数据
- 提供PromQL查询语言
- 内置数据存储（TSDB）

### Client Libraries
- 用于检测应用程序代码
- 支持多种语言：Go、Java、Python、Ruby等

### Exporters
- 用于暴露现有第三方系统的指标
- 例如：Node Exporter、MySQL Exporter、Blackbox Exporter

### Alertmanager
- 处理警报的去重、分组和路由
- 支持多种通知方式：Email、Slack、PagerDuty等

### Pushgateway
- 支持短期作业的指标推送
- 允许临时性作业向Prometheus暴露指标

## 数据模型

### 指标类型
- **Counter**: 累计指标，只能增加或重置为0
- **Gauge**: 可增可减的指标，表示当前值
- **Histogram**: 对观察结果进行采样
- **Summary**: 类似Histogram，但也提供百分位数

### 指标格式
```
# HELP http_requests_total The total number of HTTP requests.
# TYPE http_requests_total counter
http_requests_total{method="post",code="200"} 1027
http_requests_total{method="post",code="400"} 3
```

## 安装和配置

### 使用Docker运行
```bash
docker run -p 9090:9090 prom/prometheus
```

### 配置文件示例
```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

alerting:
  alertmanagers:
    - static_configs:
        - targets:
          # - alertmanager:9093

rule_files:
  # - "first_rules.yml"
  # - "second_rules.yml"

scrape_configs:
  - job_name: "prometheus"
    static_configs:
      - targets: ["localhost:9090"]

  - job_name: "node"
    static_configs:
      - targets: ["node-exporter:9100"]
```

## PromQL查询语言

### 基本查询
```promql
# 选择所有时间序列
up

# 选择特定指标
http_requests_total

# 带标签过滤
http_requests_total{job="api-server"}
http_requests_total{environment=~"staging|testing"}

# 范围向量
http_requests_total[5m]
```

### 聚合操作
```promql
# 求和
sum(http_requests_total)

# 按标签分组求和
sum by (job) (http_requests_total)

# 平均值
avg(node_memory_MemFree_bytes)

# 最大值
max(process_cpu_seconds_total)

# 分位数
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))
```

### 函数使用
```promql
# 速率计算
rate(http_requests_total[5m])

# 增量
delta(node_cpu_seconds_total[5m])

# 预测
predict_linear(node_filesystem_free_bytes[1h], 4 * 3600)

# 时间
time()
```

## 常用Exporters

### Node Exporter
```bash
# 运行Node Exporter
docker run -p 9100:9100 prom/node-exporter

# 指标示例
node_cpu_seconds_total
node_memory_MemTotal_bytes
node_filesystem_size_bytes
```

### cAdvisor
```bash
# 运行cAdvisor
docker run -p 8080:8080 gcr.io/cadvisor/cadvisor

# 容器指标
container_cpu_usage_seconds_total
container_memory_usage_bytes
```

### Blackbox Exporter
```yaml
modules:
  http_2xx:
    prober: http
    http:
      preferred_ip_protocol: "ip4"
  tcp_connect:
    prober: tcp
  icmp:
    prober: icmp
```

## Alertmanager配置

### 配置文件示例
```yaml
global:
  resolve_timeout: 5m
  smtp_smarthost: 'smtp.example.com:25'
  smtp_from: 'alertmanager@example.com'

route:
  group_by: ['alertname']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 4h
  receiver: 'team-x-mails'

receivers:
- name: 'team-x-mails'
  email_configs:
  - to: 'team-x+alerts@example.com'
```

### 告警规则
```yaml
groups:
- name: example
  rules:
  - alert: HighRequestLatency
    expr: job:request_latency_seconds:mean5m{job="myjob"} > 0.5
    for: 10m
    labels:
      severity: page
    annotations:
      summary: High request latency
      description: "{{ $labels.instance }} has high request latency"
```

## Grafana集成

### 数据源配置
```yaml
apiVersion: 1

datasources:
  - name: Prometheus
    type: prometheus
    url: http://prometheus:9090
    access: proxy
    isDefault: true
```

### 常用仪表板
- Node Exporter Full: 1860
- Kubernetes cluster monitoring (via Prometheus): 315
- 1 Node Exporter Server Metrics: 405

## Kubernetes中的Prometheus

### Prometheus Operator
```yaml
apiVersion: monitoring.coreos.com/v1
kind: Prometheus
metadata:
  name: prometheus
spec:
  serviceAccountName: prometheus
  serviceMonitorSelector: {}
  resources:
    requests:
      memory: 400Mi
```

### ServiceMonitor
```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: example-app
  labels:
    team: frontend
spec:
  selector:
    matchLabels:
      app: example-app
  endpoints:
  - port: web
```

## 最佳实践

### 指标命名
- 使用`_total`后缀表示计数器
- 使用`_bytes`后缀表示字节数
- 使用`_seconds`后缀表示时间
- 使用小写字母和下划线

### 标签设计
- 避免高基数标签（如用户ID、IP地址）
- 使用有意义的标签名称
- 保持标签值的一致性

### 资源优化
- 适当设置抓取间隔
- 使用记录规则预处理复杂查询
- 定期清理旧数据

## 故障排除

### 常见问题
1. **指标不可见**: 检查服务发现配置
2. **查询超时**: 优化PromQL查询
3. **内存不足**: 调整资源限制
4. **磁盘空间不足**: 配置数据保留策略

### 诊断命令
```bash
# 检查配置
promtool check config prometheus.yml

# 测试规则
promtool check rules rules.yml

# 查询测试
promtool query instant http://localhost:9090 'up'
```

## 学习资源

- [Prometheus官方文档](https://prometheus.io/docs/)
- [PromQL查询指南](https://prometheus.io/docs/prometheus/latest/querying/basics/)
- [Awesome Prometheus](https://github.com/roaldnefs/awesome-prometheus)
- [Prometheus Conference](https://promcon.io/)