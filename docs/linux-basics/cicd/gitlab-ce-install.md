---
title: GitLab CE 安装指南
slug: /linux-basics/cicd/gitlab-ce-install
---

# GitLab CE 安装指南

GitLab 社区版（Community Edition，简称 GitLab CE）是功能完善的自托管 DevOps 平台，支持代码托管、CI/CD、制品管理和监控。本指南介绍在主流 Linux 发行版上部署 GitLab CE 的常见方式，帮助你快速交付可用环境。

## 安装前准备

- **操作系统**：推荐使用 64 位的 Ubuntu 20.04+/Debian 10+ 或 CentOS 7+/Rocky Linux 8+。
- **硬件建议**：最少 4 核 CPU、8GB 内存、128GB 磁盘；并发用户或 CI 任务较多时需进一步扩容。
- **网络与端口**：默认使用 80/443（HTTP/HTTPS）与 22（SSH）。如位于防火墙后，请预先放通。
- **依赖软件**：GitLab 打包自带所有依赖，确保系统时钟同步（建议开启 NTP），并安装基础工具：
  ```bash
  sudo apt install -y curl ca-certificates tzdata perl # Debian/Ubuntu
  sudo dnf install -y curl policycoreutils-python-utils perl # RHEL 系列
  ```

## 安装方式一：Debian/Ubuntu Omnibus 包

1. 添加 GitLab 官方仓库脚本（包含 GPG 密钥导入）：
   ```bash
   curl -fsSL https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.deb.sh | sudo bash
   ```
2. 安装 GitLab CE：
   ```bash
   sudo apt update
   sudo apt install -y gitlab-ce
   ```
3. 设置访问域名或 IP，并初始化配置：
   ```bash
   sudo EXTERNAL_URL="https://gitlab.example.com" gitlab-ctl reconfigure
   ```
4. 检查服务状态，确保所有组件运行正常：
   ```bash
   sudo gitlab-ctl status
   ```
5. 如服务器启用了 UFW，放通相关端口：
   ```bash
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw allow 22/tcp
   ```

## 安装方式二：RHEL/CentOS/Rocky Omnibus 包

1. 通过官方脚本配置仓库并导入密钥：
   ```bash
   curl -fsSL https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.rpm.sh | sudo bash
   ```
2. 安装 GitLab CE：
   ```bash
   sudo dnf install -y gitlab-ce
   ```
   若使用 CentOS 7，可将 `dnf` 替换为 `yum`。
3. 配置外部访问地址并执行初始化：
   ```bash
   sudo EXTERNAL_URL="https://gitlab.example.com" gitlab-ctl reconfigure
   ```
4. 若系统启用了 firewalld，放通 HTTP/HTTPS/SSH：
   ```bash
   sudo firewall-cmd --permanent --add-service=http
   sudo firewall-cmd --permanent --add-service=https
   sudo firewall-cmd --permanent --add-service=ssh
   sudo firewall-cmd --reload
   ```
5. SELinux 处于 Enforcing 时，可使用：
   ```bash
   sudo setsebool -P httpd_can_network_connect 1
   sudo setsebool -P httpd_can_network_connect_db 1
   ```
   或参考官方文档配置更细粒度的策略。

## 安装方式三：Docker 容器

Docker 适用于测试环境或通过编排平台（如 Kubernetes）部署。

```bash
sudo docker run -d \
  --name gitlab \
  --hostname gitlab.example.com \
  -p 80:80 -p 443:443 -p 2222:22 \
  -v gitlab-config:/etc/gitlab \
  -v gitlab-logs:/var/log/gitlab \
  -v gitlab-data:/var/opt/gitlab \
  gitlab/gitlab-ce:latest
```

- 通过 `-p 2222:22` 将容器 SSH 映射到宿主机 2222 端口，可在界面中配置对应端口。
- 数据目录挂载后可持久化配置、仓库与日志，便于备份迁移。
- 若需要自定义 `external_url`，可在首次运行前设置环境变量：
  ```bash
  sudo docker run ... -e GITLAB_OMNIBUS_CONFIG="external_url 'https://gitlab.example.com'" ...
  ```

## 首次登录与基础配置

1. 浏览器访问 `http://<域名或IP>`，首次启动可能需要数分钟完成初始化。
2. 默认管理员用户为 `root`，初始密码保存在 `/etc/gitlab/initial_root_password`：
   ```bash
   sudo cat /etc/gitlab/initial_root_password
   ```
   Docker 部署则位于容器内的同一路径，可通过 `docker exec` 读取。
3. 登录后立即修改管理员密码，并在 **Admin Area → Settings** 中更新实例名称、可见性策略及容器注册表配置。
4. 建议配置 SMTP 或企业邮箱用于发送通知，可在 `/etc/gitlab/gitlab.rb` 中设置并执行 `gitlab-ctl reconfigure` 应用。

## 常用运维命令

- **查看服务状态**：`sudo gitlab-ctl status`
- **启动/停止服务**：`sudo gitlab-ctl start|stop`
- **查看健康检查**：`sudo gitlab-rake gitlab:check`
- **查看应用日志**：`sudo gitlab-ctl tail`
- **备份数据**：`sudo gitlab-rake gitlab:backup:create`

## 常见问题排查

- **端口冲突**：修改 `/etc/gitlab/gitlab.rb` 中的 `external_url` 或自定义端口配置（如 `nginx['listen_port']`），然后执行 `gitlab-ctl reconfigure`。
- **内存不足导致服务不稳定**：提高系统内存或添加交换分区，确保 `sidekiq` 与 `puma` 正常运行。
- **邮件发送失败**：确认 SMTP 配置正确，测试命令 `sudo gitlab-rake gitlab:doctor:secrets` 与 `gitlab:check`。
- **升级失败/回滚**：使用 `gitlab-backup` 定期备份，升级前阅读[官方发布说明](https://docs.gitlab.com/ee/update/) 并在测试环境演练。

## 维护与安全建议

- 设置自动备份任务，将 `/etc/gitlab` 与 `/var/opt/gitlab/backups` 复制到安全位置。
- 将 GitLab 置于 Nginx/Traefik 等反向代理之后，开启 HTTPS 与 WAF，必要时启用双因素认证。
- 定期更新 GitLab 版本，优先使用 LTS 分支，补丁版本应及时跟进。
- 配合 GitLab Runner 构建 CI/CD 流水线，并将 Runner 与 GitLab 实例隔离部署提升安全性。

按以上步骤即可完成 GitLab CE 的部署与初始配置，后续可根据团队规模和安全需求持续优化。
