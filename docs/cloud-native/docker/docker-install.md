---
title: Docker 安装
description: Docker 安装
sidebar_position: 2
---

# Docker 安装指南

Docker 提供跨平台的一致运行环境，推荐在本地使用 Docker Desktop（macOS/Windows）或原生 Docker Engine（Linux）进行管理。下面列出各平台的安装方式、常见验证步骤以及基础命令速查。

## 1. 安装前提

- 64 位操作系统并启用虚拟化（BIOS/UEFI 中打开 Intel VT-x/AMD-V）。
- 至少 4 GB 可用内存，推荐 60 GB 以上磁盘空间用于镜像与日志。
- 公司/团队若有统一镜像仓库或代理，请预先获取地址与凭据，方便安装完成后配置镜像加速。

## 2. 平台安装步骤

### macOS

1. 推荐通过 [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop/) 安装，下载 dmg 后拖入 `Applications` 即可。
2. 若使用 Homebrew，可执行：
   ```bash
   brew install --cask docker
   open /Applications/Docker.app
   ```
3. 首次启动需要授权辅助程序，状态栏出现鲸鱼图标并显示 *Docker Desktop is running* 表示成功。
4. 默认包含 Docker Engine、Docker Compose、BuildKit 等组件，可在 `Settings -> Resources` 中调整 CPU、内存、磁盘配额。

### Windows 10/11

1. 要求 64 位专业版或企业版，启用 `Virtualization`、`Hyper-V` 与 `WSL 2` 功能：
   ```powershell
   dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
   dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
   ```
2. 安装并设置 WSL 2（`wsl --install`，选择 Ubuntu 等发行版）。
3. 下载并安装 [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/)，安装结束后在设置中选择 `Use WSL 2 based engine`。
4. 在 `Resources -> WSL Integration` 勾选需要启用 Docker 的发行版；任务栏鲸鱼图标常亮表示服务就绪。

### Linux（Debian/Ubuntu）

1. 移除历史版本：
   ```bash
   sudo apt-get remove docker docker-engine docker.io containerd runc
   ```
2. 配置仓库并安装：
   ```bash
   sudo apt-get update
   sudo apt-get install ca-certificates curl gnupg lsb-release
   sudo install -m 0755 -d /etc/apt/keyrings
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
   echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | \
     sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   sudo apt-get update
   sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
   ```
3. 启动并设置随系统自启：
   ```bash
   sudo systemctl enable --now docker
   ```
4. 如需无 `sudo` 使用 Docker，将当前用户加入 `docker` 组：
   ```bash
   sudo usermod -aG docker $USER
   newgrp docker
   ```

### Linux（CentOS / RHEL / AlmaLinux）

1. 清理旧版本：`sudo yum remove docker docker-client docker-common docker-engine`。
2. 添加 Docker 官方仓库并安装：
   ```bash
   sudo yum install -y yum-utils
   sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
   sudo yum install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
   ```
3. 启动与开机自启：
   ```bash
   sudo systemctl enable --now docker
   ```

### ✅ **快速安装脚本**

>对于受支持的发行版（Debian/Ubuntu/CentOS 等），可使用官方一键脚本：

```bash
curl -fsSL https://get.docker.com | bash -s docker
```

脚本会自动安装 Docker Engine 及依赖，完成后按提示执行 `sudo systemctl enable --now docker` 并添加用户组权限即可。

## 3. 安装验证

```bash
docker version          # 查看客户端与服务端版本
docker info             # 查看运行时、存储驱动等详情
docker run hello-world  # 拉取官方镜像并运行测试容器
```

若 `hello-world` 输出“Hello from Docker!”，则表示引擎和网络均正常。

## 4. 常见操作

- **镜像管理**：`docker images`、`docker pull <name>`、`docker rmi <name>`。
- **容器生命周期**：`docker run -d --name demo nginx:stable`、`docker ps -a`、`docker stop demo`、`docker rm demo`。
- **日志与调试**：`docker logs -f <container>`、`docker exec -it <container> /bin/bash`。
- **资源清理**：`docker system df`、`docker system prune -f` 删除悬挂镜像与已退出容器。
- **Compose**：Docker Desktop 已自带 `docker compose`（V2），Linux 若需 V1，可单独安装 `docker-compose` 包。

## 5. 镜像加速与代理（可选）

- 在 Docker Desktop `Settings -> Docker Engine` 中为 `registry-mirrors` 添加镜像加速地址，例如 `https://registry.docker-cn.com`。
- Linux 修改 `/etc/docker/daemon.json`：
  ```json
  {
    "registry-mirrors": ["https://<your-mirror>"]
  }
  ```
  修改后执行 `sudo systemctl restart docker` 生效。
- 如果公司需要走 HTTP/HTTPS 代理，可在 `daemon.json` 中配置 `"proxies"` 或在系统环境变量中设置 `HTTP_PROXY/HTTPS_PROXY`。

## 6. 升级与卸载

- **升级**：
  - macOS/Windows 直接在 Docker Desktop 中勾选 “Automatically check for updates”，或下载新版本覆盖安装。
  - Linux 通过包管理器 `sudo apt-get upgrade docker-ce` 或 `sudo yum update docker-ce`。
- **卸载**：
  - Docker Desktop 应用拖入回收站/通过“应用和功能”卸载，并手动删除 `~/.docker` 缓存。
  - Linux 使用包管理器卸载相关组件，再执行 `sudo rm -rf /var/lib/docker /var/lib/containerd` 清理数据（谨慎执行，会删除所有镜像与容器）。

至此，Docker 基础环境就绪，可继续配置私有镜像仓库、Compose 编排或 Kubernetes 等高级用法。
