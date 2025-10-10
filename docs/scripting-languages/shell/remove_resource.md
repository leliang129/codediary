---
title: kubectl命令移除资源限制配置
sidebar_position: 2
---

在批量迁移或调试 Kubernetes 工作负载时，常常需要临时去掉 Deployment 中的 `requests`/`limits` 配置，避免资源配额带来的调度失败。下面的脚本演示了如何针对指定命名空间的所有 Deployment 删除容器级别的资源限制。

## 前置条件

- 已正确配置 `kubectl` 上下文，能够访问目标集群。
- 本地安装了 `jq`（用于解析 `kubectl` 输出的 JSON）。
- 了解移除资源限制可能带来的影响，例如容器抢占资源或违反组织的配额策略。

## 使用方式

1. 将需要处理的命名空间写入 `namespace_array` 数组，可一次处理多个命名空间。
2. 保存脚本至 `remove_resource.sh`（或直接复制到终端执行）。
3. 在具备足够权限的终端中运行脚本：

   ```bash
   bash remove_resource.sh
   ```

4. 运行完成后，可通过 `kubectl get deployment -o yaml` 验证资源配置是否已被清空。

## 脚本示例

```bash
namespace_array=("default")

for namespace in "${namespace_array[@]}"; do
  for deployment in $(kubectl get deployments -n $namespace -o=name); do
    n=$(kubectl get -n $namespace $deployment -ojson |jq '.spec.template.spec.containers|length')
    for ((i=0;i<n;i++)); do
      kubectl patch -n $namespace $deployment --type=json -p="[{\"op\": \"replace\", \"path\": \"/spec/template/spec/containers/$i/resources\", \"value\": {}}]"
    done
  done
done
```

## 关键逻辑解析

- **命名空间循环**：`namespace_array` 控制要处理的命名空间，可根据需要扩展为 `("default" "prod" "staging")` 等形式。
- **Deployment 遍历**：通过 `kubectl get deployments -o=name` 拿到资源名，后续使用同样的名字进行 `patch`。
- **容器索引获取**：使用 `jq` 计算每个 Pod 模板中的容器数量，确保脚本遍历到每一个容器。
- **JSON Patch**：`kubectl patch --type=json` 将每个容器的 `resources` 字段替换为空对象 `{}`，即同时清除 `requests` 与 `limits`。

## 注意事项

- 资源字段被清空后，容器将不再受资源保障与限制，需监控节点资源使用情况。
- 如果只需要移除特定容器或仅删除 `limits`/`requests`，可调整 `jq` 获取的索引或替换的 JSON 结构。
- 建议先在测试环境验证脚本行为，再推广到生产环境。
