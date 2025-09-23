---
title: Docker的使用
description: Docker的安装与基本使用
keywords: [docker, k8s]
sidebar_position: 2
---

Docker 是最流行的容器运行时之一，提供统一的镜像格式与运行 API，常与 Kubernetes、CI/CD 流水线和开发环境集成。本文整理在 Linux 上安装 Docker Engine、配置守护进程、常见命令与排障要点，帮助快速掌握日常使用方法。

## 安装 Docker Engine

以下步骤适用于主流 Debian/Ubuntu 发行版，其他发行版可参考 [官方文档](https://docs.docker.com/engine/install/)。

1. 移除旧版本（存在时）：

   ```bash
   sudo apt-get remove docker docker-engine docker.io containerd runc
   ```

2. 安装依赖并配置官方仓库：

   ```bash
   sudo apt-get update
   sudo apt-get install -y ca-certificates curl gnupg lsb-release
   sudo install -m 0755 -d /etc/apt/keyrings
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
   echo \
     "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \\
     $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   sudo apt-get update
   ```

3. 安装 Docker Engine、CLI 及 containerd：

   ```bash
   sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
   ```

4. 验证安装：

   ```bash
   sudo systemctl status docker
   sudo docker run --rm hello-world
   ```

> 若希望非 root 用户执行 Docker 命令，可运行 `sudo usermod -aG docker $USER` 并重新登录会话。

## 守护进程配置

Docker Daemon 的默认配置文件位于 `/etc/docker/daemon.json`。常见配置示例：

```json
{
  "registry-mirrors": [
    "https://bqr1dr1n.mirror.aliyuncs.com"
  ],
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m",
    "max-file": "3"
  },
  "storage-driver": "overlay2"
}
```

修改后执行 `sudo systemctl restart docker` 并通过 `docker info` 校验配置是否生效。若用于 Kubernetes，确保 `cgroup` 驱动与 kubelet 保持一致（建议使用 `systemd`）。

## 镜像管理

- 拉取镜像：`docker pull ubuntu:22.04`
- 构建镜像：`docker build -t myapp:1.0 .`
- 查看镜像：`docker images` 或 `docker images --digests`
- 删除镜像：`docker rmi <IMAGE_ID>`
- 保存/加载：`docker save myapp:1.0 -o myapp.tar` 与 `docker load -i myapp.tar`

构建镜像时，建议写 `.dockerignore` 排除无关文件，缩小体积并提升缓存命中率。

## 容器生命周期

常见容器操作命令：

```bash
# 新建并后台运行容器
docker run -d --name nginx -p 8080:80 nginx:alpine

# 查看容器列表
docker ps          # 运行中
docker ps -a       # 包含已退出

# 进入容器（采用交互式终端）
docker exec -it nginx /bin/sh

# 查看日志（支持 --tail / --since 等参数）
docker logs -f nginx

# 停止、启动、删除容器
docker stop nginx
docker start nginx
docker rm nginx

# 在容器与主机之间拷贝文件
docker cp nginx:/etc/nginx/nginx.conf ./
docker cp ./index.html nginx:/usr/share/nginx/html/
```

使用 `docker inspect <NAME>` 可以获取详细配置、网络、挂载信息。对资源使用情况，可配合 `docker stats` 实时查看 CPU、内存、网络 IO。

## Docker Compose 快速上手

Compose 适合定义多容器应用。新建 `docker-compose.yml`：

```yaml
services:
  web:
    image: nginx:alpine
    ports:
      - "8080:80"
  redis:
    image: redis:7-alpine
```

运行命令：

```bash
docker compose up -d
docker compose ps
docker compose down
```

Compose 会自动创建网络并管理容器依赖，适合开发测试或小型部署。

## 健康检查与优化建议

- 定期清理无用镜像、容器与卷：`docker system prune`
- 为业务容器定义 `HEALTHCHECK` 指令，便于监控重启。
- 生产环境限制容器日志尺寸，避免占满磁盘。
- 结合 `docker update --cpus`、`--memory` 控制资源上限，与 Kubernetes 的 Requests/Limits 对齐。

## 常见故障排查

1. **服务无法启动**：查看 `sudo journalctl -u docker` 与 `/var/log/docker.log`。若缺少内核模块，可加载 `sudo modprobe overlay`。
2. **镜像拉取缓慢**：确认镜像源可达，必要时启用镜像加速器或配置私有 Registry。
3. **权限问题**：确保当前用户在 `docker` 组内，或在命令前加 `sudo`。
4. **磁盘不足**：使用 `docker system df` 分析空间占用，配合 `prune` 清理未使用资源。

通过以上配置与命令，可以快速搭建可靠的 Docker 运行环境，并为后续容器编排（如 Kubernetes、Swarm）奠定基础。
