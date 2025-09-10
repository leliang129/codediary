---
title: Linux文件系统详解
sidebar_position: 3
---

# Linux文件系统详解

## Linux文件系统概述

Linux文件系统是Linux操作系统的核心组件之一，它定义了文件和目录在存储设备上的组织结构。Linux采用了层次化的树形文件系统结构，以根目录（/）为起点，所有文件和目录都从根目录开始组织。

### 文件系统的特点

1. **单一根目录**：整个文件系统只有一个根目录（/）
2. **层次结构**：所有文件和目录都组织在树形结构中
3. **一切皆文件**：在Linux中，设备、目录、普通文件等都被视为文件
4. **挂载机制**：可以将不同的存储设备挂载到文件系统的不同位置

## Linux文件系统层次结构标准（FHS）

Linux文件系统层次结构标准（Filesystem Hierarchy Standard, FHS）定义了Linux发行版中主要目录的用途和内容。

### 根目录（/）下的重要目录

#### /bin - 基本命令
存放系统启动和运行必需的基本命令，如ls、cp、mv等，这些命令对所有用户都可用。

```bash
# 查看/bin目录中的命令
ls /bin
```

#### /boot - 启动文件
包含系统启动所需的文件，包括内核文件和引导加载程序文件。

```bash
# 查看启动文件
ls /boot
```

#### /dev - 设备文件
包含设备文件，Linux将所有硬件设备都视为文件来处理。

```bash
# 查看设备文件
ls /dev
```

常见设备文件：
- `/dev/sda` - 第一块硬盘
- `/dev/tty1` - 虚拟终端
- `/dev/null` - 空设备
- `/dev/zero` - 零设备

#### /etc - 配置文件
存放系统和应用程序的配置文件。

```bash
# 查看重要配置文件
ls /etc
```

重要配置文件：
- `/etc/passwd` - 用户账户信息
- `/etc/group` - 用户组信息
- `/etc/fstab` - 文件系统挂载信息
- `/etc/hosts` - 主机名解析

#### /home - 用户主目录
每个用户的个人目录都存放在此目录下。

```bash
# 查看用户主目录
ls /home
```

#### /lib - 系统库文件
存放系统启动和运行必需的共享库文件。

```bash
# 查看系统库文件
ls /lib
```

#### /media - 可移动媒体挂载点
用于挂载可移动媒体（如U盘、光盘）的目录。

```bash
# 查看媒体挂载点
ls /media
```

#### /mnt - 临时挂载点
用于临时挂载文件系统的目录。

```bash
# 查看临时挂载点
ls /mnt
```

#### /opt - 可选应用程序
用于安装可选的第三方应用程序。

```bash
# 查看可选应用程序
ls /opt
```

#### /proc - 进程信息
虚拟文件系统，提供有关进程和系统状态的信息。

```bash
# 查看进程信息
ls /proc
```

#### /root - root用户主目录
root用户的主目录（不是/root目录）。

```bash
# 查看root用户主目录
ls /root
```

#### /run - 运行时数据
存放系统运行时需要的变量数据。

```bash
# 查看运行时数据
ls /run
```

#### /sbin - 系统管理命令
存放系统管理员使用的系统管理命令。

```bash
# 查看系统管理命令
ls /sbin
```

#### /srv - 服务数据
存放系统服务相关的数据。

```bash
# 查看服务数据
ls /srv
```

#### /sys - 系统信息
虚拟文件系统，提供设备和驱动程序的信息。

```bash
# 查看系统信息
ls /sys
```

#### /tmp - 临时文件
存放临时文件，系统重启时通常会被清空。

```bash
# 查看临时文件
ls /tmp
```

#### /usr - 用户程序
存放用户程序和文件，是文件系统的重要组成部分。

重要子目录：
- `/usr/bin` - 用户命令
- `/usr/lib` - 用户库文件
- `/usr/local` - 本地安装的软件
- `/usr/share` - 共享数据

```bash
# 查看用户程序目录
ls /usr
```

#### /var - 可变数据
存放经常变化的文件，如日志文件、邮件等。

重要子目录：
- `/var/log` - 系统日志文件
- `/var/mail` - 用户邮件
- `/var/spool` - 等待处理的任务
- `/var/tmp` - 临时文件（重启后保留）

```bash
# 查看可变数据目录
ls /var
```

## 文件类型

Linux系统中有多种文件类型，可以通过ls -l命令的第一列字符来识别：

### 普通文件（-）
最常见的文件类型，包括文本文件、二进制文件、图像文件等。

```bash
# 查看普通文件
ls -l /etc/passwd
# 输出示例：-rw-r--r-- 1 root root 1234 date passwd
```

### 目录（d）
用于组织其他文件和目录的容器。

```bash
# 查看目录
ls -ld /etc
# 输出示例：drwxr-xr-x 100 root root 12345 date etc
```

### 符号链接（l）
指向另一个文件或目录的快捷方式。

```bash
# 查看符号链接
ls -l /var/run
# 输出示例：lrwxrwxrwx 1 root root 4 date run -> /run
```

### 字符设备文件（c）
提供对字符设备的访问接口。

```bash
# 查看字符设备文件
ls -l /dev/tty
# 输出示例：crw-rw-rw- 1 root tty 5, 0 date tty
```

### 块设备文件（b）
提供对块设备的访问接口。

```bash
# 查看块设备文件
ls -l /dev/sda
# 输出示例：brw-rw---- 1 root disk 8, 0 date sda
```

### 套接字文件（s）
用于进程间通信的特殊文件。

```bash
# 查看套接字文件
ls -l /run/systemd/private
# 输出示例：srw-rw-rw- 1 root root 0 date private
```

### 命名管道（p）
用于进程间通信的FIFO特殊文件。

```bash
# 创建命名管道
mkfifo mypipe
ls -l mypipe
# 输出示例：prw-r--r-- 1 user user 0 date mypipe
```

## 文件路径

### 绝对路径
从根目录开始的完整路径。

```bash
# 绝对路径示例
/etc/passwd
/home/user/document.txt
/usr/bin/bash
```

### 相对路径
相对于当前目录的路径。

```bash
# 相对路径示例（假设当前目录为/home/user）
document.txt
./document.txt
../otheruser/file.txt
```

### 特殊路径符号

- `.` - 当前目录
- `..` - 父目录
- `~` - 用户主目录
- `-` - 上一个工作目录

```bash
# 使用特殊路径符号
cd ~          # 切换到用户主目录
cd ..         # 切换到父目录
cd -          # 切换到上一个工作目录
pwd           # 显示当前目录
```

## 文件系统操作命令

### 查看文件系统信息

```bash
# 查看文件系统挂载信息
df -h

# 查看文件系统类型
df -T

# 查看inode使用情况
df -i
```

### 挂载和卸载文件系统

```bash
# 挂载文件系统
sudo mount /dev/sdb1 /mnt/mydisk

# 查看挂载信息
mount | grep sdb1

# 卸载文件系统
sudo umount /mnt/mydisk
```

### 创建和管理目录

```bash
# 创建单个目录
mkdir mydir

# 创建多级目录
mkdir -p parent/child/grandchild

# 创建带权限的目录
mkdir -m 755 secure_dir

# 删除空目录
rmdir empty_dir

# 删除非空目录
rm -rf full_dir
```

### 查看目录内容

```bash
# 基本列出
ls

# 详细列表
ls -l

# 包含隐藏文件
ls -a

# 人类可读的文件大小
ls -lh

# 递归列出
ls -R

# 按时间排序
ls -lt

# 按大小排序
ls -lS
```

## 文件系统维护

### 检查文件系统

```bash
# 检查文件系统（需要卸载）
sudo fsck /dev/sdb1

# 检查根文件系统（在启动时）
sudo fsck -f /
```

### 磁盘配额管理

```bash
# 启用配额（需要在/etc/fstab中配置）
sudo quotacheck -cum /home

# 编辑用户配额
sudo edquota user

# 查看配额报告
quota -u user
```

## 实践练习

### 练习1：浏览文件系统结构

```bash
# 1. 查看根目录内容
ls /

# 2. 进入/etc目录并查看内容
cd /etc
ls -la

# 3. 查看passwd文件内容
cat /etc/passwd

# 4. 查看当前工作目录
pwd

# 5. 返回上一级目录
cd ..
```

### 练习2：创建目录结构

```bash
# 1. 在家目录创建项目目录结构
mkdir -p ~/projects/webapp/{src,docs,tests,config}

# 2. 查看创建的目录结构
tree ~/projects/webapp
# 或使用find命令
find ~/projects/webapp -type d

# 3. 在src目录下创建文件
touch ~/projects/webapp/src/{main.py,utils.py,config.py}

# 4. 查看文件创建结果
ls -l ~/projects/webapp/src
```

### 练习3：查看文件系统信息

```bash
# 1. 查看磁盘空间使用情况
df -h

# 2. 查看特定目录的磁盘使用情况
du -sh /home

# 3. 查看最大的目录
du -h /home | sort -hr | head -10

# 4. 查看inode使用情况
df -i
```

## 总结

Linux文件系统是Linux操作系统的基础，理解文件系统的结构和操作对于Linux用户和系统管理员至关重要。通过掌握FHS标准、文件类型、路径概念和相关命令，可以更好地管理和使用Linux系统。

关键要点：
1. Linux采用单一根目录的树形文件系统结构
2. FHS定义了主要目录的标准用途
3. 理解不同文件类型的特征和用途
4. 掌握文件系统操作命令的使用方法
5. 定期维护文件系统以确保系统稳定运行