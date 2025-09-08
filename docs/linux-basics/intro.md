---
title: Linux基础入门
slug: /linux-basics/intro
---

# Linux基础入门

## 什么是Linux？

Linux是一个开源的类Unix操作系统内核，由Linus Torvalds在1991年创建。如今，Linux已成为服务器、嵌入式系统和超级计算机等领域的主流操作系统。

## 核心概念

### 文件系统结构
- `/` - 根目录
- `/bin` - 基本命令二进制文件
- `/etc` - 系统配置文件
- `/home` - 用户主目录
- `/var` - 可变数据文件
- `/tmp` - 临时文件

### 常用命令
```bash
# 文件和目录操作
ls          # 列出目录内容
cd          # 切换目录
pwd         # 显示当前目录
mkdir       # 创建目录
rm          # 删除文件或目录
cp          # 复制文件
mv          # 移动文件

# 文件查看和编辑
cat         # 查看文件内容
more/less   # 分页查看文件
nano/vim    # 文本编辑器

# 系统信息
uname -a    # 系统信息
df -h       # 磁盘空间使用情况
free -h     # 内存使用情况
```

## 权限管理

Linux使用权限系统来控制对文件和目录的访问：

- **用户权限**：文件所有者
- **组权限**：文件所属组
- **其他用户权限**：其他所有用户

权限类型：
- `r` (read) - 读取权限
- `w` (write) - 写入权限  
- `x` (execute) - 执行权限

示例：
```bash
chmod 755 filename    # 设置权限为rwxr-xr-x
chown user:group file # 更改文件所有者和组
```

## 进程管理

```bash
ps aux        # 查看所有进程
top           # 实时进程监控
kill PID      # 终止进程
killall name  # 终止指定名称的所有进程
```

## 网络命令

```bash
ping host     # 测试网络连接
ifconfig      # 网络接口配置
netstat       # 网络统计信息
ssh user@host # 安全远程登录
scp           # 安全文件传输
```

## 包管理

### Ubuntu/Debian (apt)
```bash
sudo apt update        # 更新包列表
sudo apt install package  # 安装包
sudo apt remove package   # 移除包
sudo apt upgrade       # 升级所有包
```

### CentOS/RHEL (yum/dnf)
```bash
sudo yum install package  # 安装包
sudo yum remove package   # 移除包
sudo yum update          # 更新包
```

## Shell脚本基础

```bash
#!/bin/bash
# 这是一个简单的shell脚本示例

echo "Hello, World!"

# 变量使用
name="Linux User"
echo "Welcome, $name!"

# 条件判断
if [ -f "/etc/passwd" ]; then
    echo "File exists"
else
    echo "File not found"
fi

# 循环
for i in {1..5}; do
    echo "Number: $i"
done
```

## 实用技巧

1. **命令历史**：使用 `history` 查看命令历史，`!number` 执行历史命令
2. **Tab补全**：按Tab键自动补全命令和文件名
3. **管道和重定向**：使用 `|` 管道和 `>`、`>>` 重定向
4. **后台运行**：在命令后加 `&` 使命令在后台运行
5. **命令别名**：使用 `alias` 创建命令别名

## 学习资源

- [Linux命令行基础](https://www.learnenough.com/command-line-tutorial)
- [Linux文件系统层次标准](https://refspecs.linuxfoundation.org/FHS_3.0/fhs-3.0.pdf)
- [Bash脚本指南](https://tldp.org/LDP/abs/html/)