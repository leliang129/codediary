---
title: Docker 基本命令
description: Docker 基本命令介绍
sidebar_position: 3
---

# Docker 常用命令速查

本文整理日常使用最频繁的 Docker CLI 命令，按照镜像、容器、网络与数据管理等场景分类，适用于 Docker Engine 以及 Docker Desktop (含 `docker compose`)。

## 1. 环境信息

```bash
docker version          # 查看客户端/服务端版本
docker info             # 查看运行时、存储驱动、镜像/容器数量等
docker system df        # 统计镜像、容器、卷所占空间
```

## 2. 镜像管理

```bash
docker search nginx                     # 在默认仓库查找镜像
docker pull nginx:1.27-alpine           # 拉取指定标签
docker images                           # 列出本地镜像
docker rmi nginx:latest                 # 删除镜像
docker rmi $(docker images -q)          # 删除所有镜像（谨慎）
docker build -t myapp:dev .             # 通过 Dockerfile 构建镜像
docker tag myapp:dev registry/myapp:v1  # 重新打标签（推送前常用）
docker push registry/myapp:v1           # 推送到远程仓库
docker save -o nginx.tar nginx:1.27     # 导出镜像为 tar 包（含多层）
docker load -i nginx.tar                # 从 tar 包加载镜像
docker export web > web-rootfs.tar      # 导出容器文件系统
docker import web-rootfs.tar web:rootfs # 由文件系统创建新镜像
```

### 2.1 镜像导入/导出说明

- `docker save`/`docker load` 面向镜像层，保留历史层与标签，适合迁移或备份镜像库。
- `docker export`/`docker import` 面向容器的最终文件系统，不包含镜像层元数据、历史记录（如多阶段构建信息）。
- 通过 `docker save image | gzip > image.tar.gz`、`gunzip -c image.tar.gz | docker load` 可配合压缩节省存储。
- 也可以直接重定向输出：`docker save nginx:1.22.0 > nginx.tar.gz`，等价于 `docker save -o nginx.tar.gz ...`，`docker load -i nginx.tar.gz` 即可导入（注意此写法默认未压缩，只是更改了扩展名）。
- 导出的 tar 可分发到无网络环境的机器，配合 `docker load` 或 `import` 重新生成镜像。

常用导入/导出写法：

```bash
# 方法一：显式指定输出文件
docker save -o nginx-1.22.tar nginx:1.22.0
docker load -i nginx-1.22.tar

# 方法二：shell 重定向（效果同上）
docker save nginx:1.22.0 > nginx-1.22.tar
docker load < nginx-1.22.tar

# 方法三：链入压缩程序
docker save nginx:1.22.0 | gzip > nginx-1.22.tar.gz
gunzip -c nginx-1.22.tar.gz | docker load
```

示例：

```bash
# 一次导出多个镜像并压缩
docker save nginx:alpine redis:7 busybox:latest | gzip > base-images.tar.gz

# 在目标主机加载并验证
gunzip -c base-images.tar.gz | docker load
docker images | grep -E 'nginx|redis|busybox'

# 以容器文件系统创建新镜像（常用于最小化根文件系统）
docker run --name web-demo nginx:alpine
docker export web-demo | gzip > web-rootfs.tar.gz
gunzip -c web-rootfs.tar.gz | docker import - web:rootfs

# 基于导入镜像运行
docker run --rm web:rootfs cat /etc/os-release
```

## 3. 容器生命周期

```bash
docker run -d --name web -p 8080:80 nginx:stable        # 以后台模式运行
docker run -it --rm ubuntu:22.04 /bin/bash              # 临时交互容器，退出即删除
docker ps                                               # 查看运行中的容器
docker ps -a                                            # 包含已退出容器
docker stop web                                         # 停止容器
docker start web                                        # 启动已存在容器
docker restart web                                      # 重启容器
docker rename web web-old                               # 修改容器名称
docker rm web                                           # 删除容器
docker rm $(docker ps -aq)                              # 删除所有容器（谨慎）
```

## 4. 调试与进入容器

```bash
docker logs -f web                        # 实时查看日志
docker logs --since=10m web               # 查看最近 10 分钟日志
docker exec -it web /bin/bash             # 进入容器交互 shell
docker exec web cat /etc/os-release       # 在容器内运行一次性命令
docker inspect web                        # 以 JSON 输出容器详细信息
docker port web                           # 查看端口映射关系
```

## 5. 数据卷与文件

```bash
docker volume create data-vol             # 创建数据卷
docker volume ls                          # 列出所有卷
docker run -v data-vol:/var/lib/mysql mysql:8.0
docker volume inspect data-vol            # 查看挂载路径
docker volume rm data-vol                 # 删除卷（需确保未使用）

# 绑定宿主机目录
docker run -v /opt/app:/app alpine ls /app

# 宿主机与容器互拷
docker cp web:/etc/nginx/nginx.conf ./nginx.conf   # 从容器复制到主机
docker cp ./config/app.conf web:/etc/app/app.conf  # 将主机文件复制到容器
```

### 5.1 docker cp 进阶

- **目录同步**：`docker cp web:/var/log/nginx ./logs`、`docker cp ./assets/. web:/usr/share/nginx/html`（末尾的 `.` 可避免重复目录层）。
- **与 tar 结合**：
  ```bash
  # 将容器目录打包到宿主机（保留权限/软链）
  docker exec web tar czf - /app | tar xzf - -C ./backup

  # 备份容器文件为压缩包
  docker exec web sh -c 'tar czf - /etc/nginx' > nginx-backup.tar.gz
  ```
- **跨主机操作**：配合 SSH，直接在远程主机执行 `docker cp` 或 `docker exec`，如 `ssh prod 'docker cp web:/app/logs ./logs'`。
- **Compose 项目**：支持 `docker compose cp service:/path ./local`，与单容器命令行为一致。
- **注意事项**：`docker cp` 不会解析符号链接目标；若容器使用 overlay/只读文件系统，确保对应路径可访问。

## 6. 网络

```bash
docker network ls                         # 查看网络
docker network create backend             # 创建自定义 bridge 网络
docker run -d --network backend --name api myorg/api
docker network inspect backend            # 查看网络详情
docker network connect backend web        # 将现有容器接入网络
docker network disconnect backend web     # 移除网络
docker network rm backend                 # 删除网络
```

## 7. docker compose

Docker Desktop 与 Docker Engine 默认集成了 V2 版本 `docker compose` CLI，使用同一 `docker-compose.yml` 描述多容器应用。

### 7.1 典型 docker-compose.yml

```yaml
version: "3.9"
services:
  web:
    image: nginx:1.27-alpine
    ports:
      - "8080:80"
    volumes:
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf:ro
    depends_on:
      - app
  app:
    build: ./app
    environment:
      DATABASE_URL: postgres://postgres:postgres@db:5432/postgres
    restart: unless-stopped
  db:
    image: postgres:16
    volumes:
      - db-data:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: postgres
volumes:
  db-data:
```

- 通过 `.env` 文件声明公共变量（如镜像版本、端口），`docker compose` 会自动加载。
- 使用 `docker-compose.override.yml` 为本地开发追加配置（热重载、绑定 host 目录等）。

### 7.2 常用命令

```bash
docker compose up -d                      # 后台启动/更新服务
docker compose up app -d --build          # 仅构建并启动某个服务
docker compose run --rm job python main.py# 运行一次性任务
docker compose ps                         # 查看服务状态
docker compose logs -f app                # 跟踪单个服务日志
docker compose logs --tail=100 -f         # 查看全部服务的最新日志
docker compose exec web sh                # 进入运行中容器
docker compose stop                       # 停止服务但保留资源
docker compose down --remove-orphans      # 删除服务及孤立容器
docker compose down -v                    # 同时删除卷（谨慎）
docker compose restart app                # 重启某个服务
```

### 7.3 配置与调试

```bash
docker compose config                     # 合并/验证所有 compose 文件
docker compose build                      # 仅构建镜像
docker compose pull                       # 预先拉取远端镜像
docker compose push                       # 推送构建产物到仓库
docker compose top                        # 查看服务内的进程
docker compose cp web:/etc/nginx/nginx.conf ./ # 拷贝容器文件
```

- 通过 `profiles` 控制某些服务只在特定场景启用：`profiles: ["debug"]`，运行时 `docker compose --profile debug up`。
- 若某容器需要独立资源限制，可直接在 compose 文件中使用 `deploy.resources.limits` 或 `mem_limit` 等字段。
- 结合 `docker compose watch`（实验特性）可监听源代码变化并热更新容器。

## 8. 系统清理

```bash
docker system prune                       # 删除悬挂镜像/未使用容器
docker system prune -a                    # 同时删除所有未被使用的镜像
docker volume prune                       # 删除未使用的数据卷
docker builder prune                      # 清理构建缓存
```

## 9. 常见排障

- **Docker Daemon 无法启动**：检查 `systemctl status docker`，确认虚拟化已开启并查看 `/var/log/syslog` 日志。
- **镜像拉取缓慢/失败**：配置镜像加速器或代理，参见安装文档中的镜像加速章节。
- **端口被占用**：`docker ps` 查找冲突容器或使用 `lsof -i :<port>` 排查宿主机进程。
- **容器磁盘占用过大**：通过 `docker system df` 分析，定期执行 `prune` 命令，或使用外部日志收集方案。

:::info[💡 **技巧**]
可以创建 `~/.docker/config.json` 自定义 CLI 输出或启用实验功能；在 `docker run` 时配合 `--restart=always`/`unless-stopped` 实现自动拉起。
:::
