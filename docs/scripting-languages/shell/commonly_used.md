---
title: Shell常用脚本
sidebar_position: 3
---
## 密钥分发脚本
>在批量部署或调试 Kubernetes 工作负载时，常常需要将 SSH 公钥分发到所有节点，下面的脚本演示了如何将本地 `~/.ssh/id_rsa.pub` 公钥分发到所有节点。

```bash
#!/bin/bash

# 脚本功能：SSH公钥批量分发脚本
# 注意：执行前请确保当前用户具有sudo权限或本身就是root用户，并且目标机器的密码正确。

# 定义变量
USER="root" # 目标机器上的用户名，根据实际情况修改
PASSWORD="your_target_password" # 目标机器的登录密码，请务必修改
TARGET_IPS=("192.168.1.101" "192.168.1.102" "192.168.1.103") # 目标机器的IP地址列表，请修改为你的实际IP
SSH_KEY_TYPE="rsa" # 密钥类型，通常使用rsa或ecdsa
SSH_KEY_PATH="$HOME/.ssh/id_${SSH_KEY_TYPE}"

# 引入action函数用于更友好的输出（仅适用于CentOS/RHEL系列）
# 如果找不到该函数，可以注释掉，使用简单的echo输出
if [ -f /etc/init.d/functions ]; then
    . /etc/init.d/functions
else
    action() {
        if [ "$2" = "/bin/true" ]; then
            echo "[OK] $1"
        else
            echo "[FAIL] $1"
        fi
    }
fi

# 1. 检查并生成SSH密钥对
echo "步骤1：检查SSH密钥对..."
if [ ! -f "${SSH_KEY_PATH}" ]; then
    echo "未找到现有密钥对，正在生成新的 ${SSH_KEY_TYPE} 密钥对..."
    ssh-keygen -t ${SSH_KEY_TYPE} -f "${SSH_KEY_PATH}" -N "" -q
    if [ $? -eq 0 ]; then
        action "SSH密钥对生成成功" /bin/true
    else
        action "SSH密钥对生成失败" /bin/false
        exit 1
    fi
else
    action "发现现有密钥对，跳过生成步骤" /bin/true
fi

# 2. 检查sshpass命令是否存在
echo -e "\n步骤2：检查sshpass..."
if ! command -v sshpass &> /dev/null; then
    action "sshpass未安装，尝试自动安装..." /bin/true
    # 尝试使用yum或apt-get安装
    if command -v yum &> /dev/null; then
        sudo yum install -y sshpass > /dev/null 2>&1
    elif command -v apt-get &> /dev/null; then
        sudo apt-get update > /dev/null 2>&1
        sudo apt-get install -y sshpass > /dev/null 2>&1
    else
        action "无法确定包管理器，请手动安装sshpass。" /bin/false
        exit 1
    fi
    # 再次检查安装结果
    if command -v sshpass &> /dev/null; then
        action "sshpass安装成功" /bin/true
    else
        action "sshpass安装失败，请手动安装。" /bin/false
        exit 1
    fi
else
    action "sshpass已安装" /bin/true
fi

# 3. 批量分发公钥
echo -e "\n步骤3：开始向目标机器分发公钥..."
for IP in "${TARGET_IPS[@]}"; do
    echo "正在处理主机：$IP"
    
    # 可选：简单检测目标主机是否可达
    ping -c 1 -W 1 $IP > /dev/null 2>&1
    if [ $? -ne 0 ]; then
        action "主机 $IP 无法ping通，跳过" /bin/false
        continue
    fi

    # 核心分发命令
    # -o StrictHostKeyChecking=no 用于避免首次连接时出现"yes/no"提示
    sshpass -p "$PASSWORD" ssh-copy-id -i "${SSH_KEY_PATH}.pub" -o StrictHostKeyChecking=no ${USER}@${IP} > /dev/null 2>&1

    if [ $? -eq 0 ]; then
        action "公钥分发到 $IP 成功" /bin/true
    else
        action "公钥分发到 $IP 失败" /bin/false
    fi
done

# 4. 验证分发结果
echo -e "\n步骤4：验证免密登录..."
for IP in "${TARGET_IPS[@]}"; do
    ssh -o BatchMode=yes -o ConnectTimeout=5 ${USER}@${IP} "hostname" > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        action "免密登录 $IP 验证成功" /bin/true
    else
        action "免密登录 $IP 验证失败" /bin/false
    fi
done

echo -e "\n所有操作执行完毕！"
```
:::info[注意]
脚本需使用bash执行，如：bash copy_ssh.sh
:::

## kubectl移除资源限制配置
>在批量迁移或调试 Kubernetes 工作负载时，常常需要临时去掉 Deployment 中的 `requests`/`limits` 配置，避免资源配额带来的调度失败。下面的脚本演示了如何针对指定命名空间的所有 Deployment 删除容器级别的资源限制。

```bash
#!/bin/bash
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
## kubectl复制资源到其它命名空间
>在批量迁移或调试 Kubernetes 工作负载时，常常需要将资源复制到其它命名空间，下面的脚本演示了如何针对指定命名空间的所有 Deployment 复制到其它命名空间。

```bash
#!/bin/bash
ns_name=default
new_ns_name=dev
config_name=cm_file_name

kubectl get cm ${config_name} -n ${ns_name} -o yaml   | sed "s/namespace: ${ns_name}/namespace: ${new_ns_name}/"   | kubectl apply -f -
```

## kubectl手动触发计划任务
>在 Kubernetes 中，计划任务（CronJob）默认是根据指定的时间间隔自动触发的。但在某些场景下，我们可能需要手动触发某个 CronJob，例如在调试或批量处理时。下面的脚本演示了如何手动触发指定命名空间的所有 CronJob。

```bash
#!/bin/bash

kubectl create job -n $1 --from cronjob/$2 $2-$(date +%s)
```
:::info[注意]
脚本需使用bash执行，如：bash trigger_cronjob.sh default my-cronjob
:::

## kubectl删除异常状态pod
>在 Kubernetes 中，Pod 可能会因为多种原因进入异常状态，例如 CrashLoopBackOff、ImagePullBackOff 等。这些异常状态的 Pod 可能会占用资源，影响集群的正常运行。下面的脚本演示了如何删除指定命名空间中所有异常状态的 Pod。

```bash
#!/bin/bash
set -euo pipefail

NAMESPACE="${1:-default}"
ABNORMAL_PHASES=${ABNORMAL_PHASES:-"Failed Unknown"}
ABNORMAL_REASONS=${ABNORMAL_REASONS:-"CrashLoopBackOff ImagePullBackOff ErrImagePull CreateContainerConfigError CreateContainerError"}

command -v kubectl >/dev/null 2>&1 || { echo "kubectl 未安装"; exit 1; }
command -v jq >/dev/null 2>&1 || { echo "jq 未安装"; exit 1; }

mapfile -t pods < <(
  kubectl get pods -n "$NAMESPACE" -o json | jq -r \
    --arg phases "$ABNORMAL_PHASES" \
    --arg reasons "$ABNORMAL_REASONS" '
      def list_from($text): ($text | split(" ") | map(select(length > 0)));
      def phase_list: list_from($phases);
      def reason_list: list_from($reasons);
      def in_list($list; $value): ($list | index($value)) != null;
      def waiting_hit($statuses):
        [$statuses[]? | .state.waiting.reason // empty]
        | map(select(. != "" and in_list(reason_list; .)))
        | length > 0;
      .items[]
      | select(
          (.status.phase // "") as $phase
          | ($phase != "Running")
          and (
            in_list(phase_list; $phase)
            or waiting_hit(.status.containerStatuses)
            or waiting_hit(.status.initContainerStatuses)
          )
        )
      | .metadata.name
    '
)

if [ "${#pods[@]}" -eq 0 ]; then
  echo "命名空间 $NAMESPACE 未发现异常 Pod"
  exit 0
fi

for pod in "${pods[@]}"; do
  echo "删除异常 Pod: $pod"
  kubectl delete pod -n "$NAMESPACE" "$pod"
done
```

- `ABNORMAL_PHASES`：控制需要清理的 Pod 阶段（默认 Failed/Unknown，可按需追加 Pending 等）。
- `ABNORMAL_REASONS`：可自定义待删除的异常原因（默认包含 CrashLoopBackOff、ImagePullBackOff、ErrImagePull 等）。
- 未指定命名空间时默认清理 `default` 命名空间，可以通过 `bash delete_abnormal_pods.sh kube-system` 指定。
- 所有 `Running` 状态的 Pod 会被跳过，仅删除非运行状态且命中异常原因或阶段的 Pod。
:::info[注意]
脚本需使用bash执行，并依赖 `kubectl` 与 `jq`，如：`ABNORMAL_REASONS="CrashLoopBackOff ImagePullBackOff" bash delete_abnormal_pods.sh default`
:::
