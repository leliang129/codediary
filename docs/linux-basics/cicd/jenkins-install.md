---
title: Jenkins 安装指南
slug: /linux-basics/cicd/jenkins-install
sidebar_position: 1
---

# Jenkins 安装指南

Jenkins 是最流行的开源持续集成与持续交付（CI/CD）平台之一，能够帮助团队构建、测试、发布软件。本指南将覆盖常见平台上的安装方式，帮助你快速搭建可用的 Jenkins 环境。

## 安装前准备

- **操作系统**：支持大多数 Linux 发行版（例如 Ubuntu、Debian、CentOS、Rocky Linux）、macOS 以及 Windows。本文以 Linux 为例。
- **硬件建议**：至少 2 核 CPU、4GB 内存、50GB 可用磁盘空间。并行构建较多时需要更高配置。
- **Java 运行时**：从 Jenkins 2.357 起推荐使用 Java 11 或 17。本指南使用 OpenJDK 17。

安装 Java 以 Ubuntu/Debian 为例：
```bash
sudo apt update
sudo apt install -y fontconfig openjdk-17-jre
java -version
```

RHEL/CentOS/Rocky 等发行版：
```bash
sudo dnf install -y java-17-openjdk
java -version
```

## 安装方式一：Debian/Ubuntu 软件仓库

1. 添加 Jenkins 官方 GPG 密钥与仓库：
   ```bash
   sudo mkdir -p /usr/share/keyrings
   curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee /usr/share/keyrings/jenkins-keyring.asc > /dev/null
   echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/" | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null
   ```
2. 更新仓库并安装 Jenkins：
   ```bash
   sudo apt update
   sudo apt install -y jenkins
   ```
3. 启动并设置开机自启：
   ```bash
   sudo systemctl enable --now jenkins
   sudo systemctl status jenkins
   ```
4. 若服务器启用了防火墙，放通 8080 端口：
   ```bash
   sudo ufw allow 8080/tcp
   ```

## 安装方式二：RHEL/CentOS/Fedora 软件仓库

1. 导入仓库与 GPG 密钥：
   ```bash
   sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key
   sudo tee /etc/yum.repos.d/jenkins.repo <<'YUM'
   [jenkins]
   name=Jenkins-stable
   baseurl=https://pkg.jenkins.io/redhat-stable
   gpgcheck=1
   gpgkey=https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key
   YUM
   ```
2. 安装 Jenkins：
   ```bash
   sudo dnf install -y jenkins
   ```
3. 开启 Jenkins 服务：
   ```bash
   sudo systemctl enable --now jenkins
   sudo systemctl status jenkins
   ```
4. 如使用 firewalld，放通端口：
   ```bash
   sudo firewall-cmd --permanent --add-port=8080/tcp
   sudo firewall-cmd --reload
   ```

## 安装方式三：Docker 容器

Docker 方式适合快速体验或需要容器化部署的场景。

```bash
# 拉取 LTS 版本镜像
docker pull jenkins/jenkins:lts

# 启动容器，映射配置与作业数据
docker volume create jenkins-data
docker run -d \
  --name jenkins \
  -p 8080:8080 -p 50000:50000 \
  -v jenkins-data:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkins/jenkins:lts
```

- `jenkins-data` 卷用于持久化 Jenkins 主目录。
- 可挂载宿主机的 Docker 套接字，实现流水线中直接构建 Docker 镜像。
- 若需要自定义插件或初始化脚本，可挂载额外目录到 `/usr/share/jenkins/ref`。

升级 Jenkins 时，只需重新拉取镜像并重建容器，挂载的数据卷会自动保留历史数据。

## 浏览器首次访问与初始化

1. 浏览器访问 `http://<服务器IP>:8080`。
2. 使用初始管理员密码解锁 Jenkins：
   ```bash
   sudo cat /var/lib/jenkins/secrets/initialAdminPassword
   ```
   Docker 部署则从容器内部读取：
   ```bash
   docker exec -it jenkins cat /var/jenkins_home/secrets/initialAdminPassword
   ```
3. 根据向导安装插件，建议先选择“Install suggested plugins”（安装推荐插件）。
4. 创建首个管理员用户，保存实例 URL，完成初始化。
5. 建议开启系统设置中的镜像源加速（如清华/华为云镜像），加快插件下载速度。

## 常见问题排查

- **端口被占用**：修改 `/etc/default/jenkins` 中的 `JENKINS_PORT`（或 `--httpPort=` 参数），重启服务。
- **插件下载失败**：检查网络代理、防火墙或配置国内镜像源。
- **Java 版本不兼容**：使用 `java -version` 确认版本，建议使用 OpenJDK 11/17，并更新 `JAVA_HOME`。
- **服务启动失败**：通过 `journalctl -u jenkins -xe` 查看日志，重点关注权限问题或磁盘空间不足。

## 后续维护建议

- 定期更新 Jenkins 核心与插件，保持安全性。
- 配置自动备份（如使用 `thinBackup` 插件或定期备份 `/var/lib/jenkins`）。
- 将 Jenkinsfile 纳入代码库，结合分支策略实现流水线即代码。
- 建议结合 Nginx/Traefik 等进行反向代理，启用 HTTPS 与访问控制。

以上步骤即可快速完成 Jenkins 的安装和基础配置，为后续持续集成与交付流程打下基础。
