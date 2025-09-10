---
title: 系统监控和性能调优
sidebar_position: 1
---

# 系统监控和性能调优

系统监控是Linux系统管理的重要组成部分。通过监控系统资源使用情况，可以及时发现性能瓶颈并进行调优。

## 系统监控工具

### top命令

top命令是Linux系统中最常用的实时监控工具，可以显示系统中各个进程的资源占用情况。

```bash
# 启动top命令
top

# top命令的交互操作：
# q - 退出
# k - 终止进程
# r - 调整进程优先级
# P - 按CPU使用率排序
# M - 按内存使用率排序
# T - 按运行时间排序
```

### htop命令

htop是top命令的增强版本，提供了更友好的用户界面和更多功能。

```bash
# 安装htop（Ubuntu/Debian）
sudo apt install htop

# 安装htop（CentOS/RHEL/Fedora）
sudo yum install htop
# 或
sudo dnf install htop

# 运行htop
htop
```

### ps命令

ps命令用于查看当前系统中的进程状态。

```bash
# 查看所有进程
ps aux

# 查看完整格式的进程信息
ps -ef

# 查看特定用户的进程
ps -u username

# 查看进程树
ps -ejH

# 查看线程信息
ps -eLf
```

### vmstat命令

vmstat命令用于报告虚拟内存统计信息，包括进程、内存、分页、块IO、系统和CPU活动。

```bash
# 查看系统整体状态
vmstat

# 每2秒刷新一次，共显示5次
vmstat 2 5

# 显示详细统计信息
vmstat -s

# 显示磁盘统计信息
vmstat -d
```

### iostat命令

iostat命令用于监控系统输入/输出设备负载。

```bash
# 安装sysstat包（Ubuntu/Debian）
sudo apt install sysstat

# 安装sysstat包（CentOS/RHEL/Fedora）
sudo yum install sysstat
# 或
sudo dnf install sysstat

# 查看CPU和设备使用情况
iostat

# 每2秒刷新一次
iostat 2

# 查看扩展统计信息
iostat -x

# 查看特定设备
iostat -p sda
```

## 内存监控

### free命令

free命令用于显示系统中物理和交换内存的使用情况。

```bash
# 显示内存使用情况（KB为单位）
free

# 以人类可读的格式显示
free -h

# 以MB为单位显示
free -m

# 每2秒刷新一次
free -s 2
```

### sar命令

sar命令用于收集、报告和保存系统活动信息。

```bash
# 查看CPU使用情况
sar -u

# 查看内存使用情况
sar -r

# 查看网络统计
sar -n DEV

# 查看I/O统计
sar -b

# 每2秒刷新一次，共显示5次
sar -u 2 5
```

## 网络监控

### netstat/ss命令

netstat和ss命令用于显示网络连接、路由表、接口统计等信息。

```bash
# 查看所有监听端口（netstat）
netstat -tuln

# 查看所有监听端口（ss，推荐）
ss -tuln

# 查看网络连接统计
netstat -s
ss -s

# 查看路由表
netstat -r
ip route show
```

### iftop命令

iftop命令用于实时显示网络接口的带宽使用情况。

```bash
# 安装iftop（Ubuntu/Debian）
sudo apt install iftop

# 安装iftop（CentOS/RHEL）
sudo yum install iftop

# 监控eth0接口
sudo iftop -i eth0

# 显示字节计数
sudo iftop -B
```

### nethogs命令

nethogs命令按进程显示网络带宽使用情况。

```bash
# 安装nethogs（Ubuntu/Debian）
sudo apt install nethogs

# 安装nethogs（CentOS/RHEL）
sudo yum install nethogs

# 监控eth0接口
sudo nethogs eth0

# 监控所有接口
sudo nethogs
```

## 磁盘监控

### df命令

df命令用于显示文件系统磁盘空间使用情况。

```bash
# 显示所有文件系统使用情况
df -h

# 显示inode使用情况
df -i

# 显示特定文件系统
df -h /
```

### du命令

du命令用于估算文件和目录的磁盘使用空间。

```bash
# 显示当前目录磁盘使用情况
du -h

# 显示指定目录磁盘使用情况
du -h /var/log

# 显示目录中各子目录的大小
du -h --max-depth=1 /var

# 显示最大的10个文件
du -ah /var | sort -rh | head -10
```

### iotop命令

iotop命令用于监控磁盘I/O使用情况。

```bash
# 安装iotop（Ubuntu/Debian）
sudo apt install iotop

# 安装iotop（CentOS/RHEL）
sudo yum install iotop

# 实时监控I/O使用情况
sudo iotop

# 只显示有I/O活动的进程
sudo iotop -o

# 显示累计I/O
sudo iotop -a
```

## 进程监控

### lsof命令

lsof命令用于列出当前系统打开的文件。

```bash
# 查看所有打开的文件
lsof

# 查看特定进程打开的文件
lsof -p PID

# 查看特定用户打开的文件
lsof -u username

# 查看特定端口的使用情况
lsof -i :80

# 查看网络连接
lsof -i
```

### strace命令

strace命令用于跟踪程序执行时的系统调用。

```bash
# 跟踪命令的系统调用
strace ls

# 跟踪正在运行的进程
strace -p PID

# 跟踪特定系统调用
strace -e trace=open,read,write ls

# 将输出保存到文件
strace -o trace.log ls
```

## 日志监控

### journalctl命令

journalctl命令用于查询systemd日志。

```bash
# 查看所有日志
journalctl

# 查看最近的日志
journalctl -n

# 实时查看日志
journalctl -f

# 查看特定服务的日志
journalctl -u service_name

# 查看特定时间范围的日志
journalctl --since "2023-01-01" --until "2023-01-02"
```

### tail命令

tail命令用于查看文件的末尾内容，常用于监控日志文件。

```bash
# 查看文件末尾10行
tail /var/log/syslog

# 实时监控文件变化
tail -f /var/log/syslog

# 查看末尾20行
tail -n 20 /var/log/syslog

# 从第10行开始显示
tail -n +10 /var/log/syslog
```

## 性能调优

### CPU调优

```bash
# 查看CPU信息
lscpu

# 查看CPU使用情况
top
htop

# 调整进程优先级
nice -n 10 command
renice 5 PID
```

### 内存调优

```bash
# 查看内存使用情况
free -h

# 清理缓存
sync && echo 3 | sudo tee /proc/sys/vm/drop_caches

# 调整swappiness参数
sudo sysctl vm.swappiness=10
```

### 网络调优

```bash
# 查看网络接口统计
ip -s link show

# 调整TCP参数
sudo sysctl net.core.rmem_max=16777216

# 查看网络缓冲区大小
cat /proc/sys/net/core/rmem_default
```

## 实践练习

### 练习1：系统监控

```bash
# 1. 使用top命令查看系统进程
top

# 2. 使用htop命令查看系统进程（如果已安装）
htop

# 3. 查看内存使用情况
free -h

# 4. 查看磁盘使用情况
df -h

# 5. 查看网络连接
ss -tuln
```

### 练习2：进程管理

```bash
# 1. 查看所有进程
ps aux

# 2. 查找特定进程
ps aux | grep bash

# 3. 查看进程打开的文件
lsof -p $$

# 4. 跟踪命令执行
strace echo "Hello World"
```

### 练习3：性能监控脚本

```bash
#!/bin/bash
# system_monitor.sh - 简单的系统监控脚本

echo "=== 系统监控报告 ==="
echo "时间: $(date)"
echo "主机名: $(hostname)"
echo "用户: $(whoami)"
echo

echo "=== CPU使用情况 ==="
top -bn1 | grep "Cpu(s)" | awk '{print $2}' | awk -F'%' '{print "CPU使用率: " $1 "%"}'
echo

echo "=== 内存使用情况 ==="
free -h | grep Mem
echo

echo "=== 磁盘使用情况 ==="
df -h | grep -E '^/dev/'
echo

echo "=== 网络连接 ==="
ss -tuln | wc -l
echo "活动连接数: $(ss -tuln | wc -l)"
echo

echo "=== 运行中的进程 ==="
echo "进程总数: $(ps aux | wc -l)"
```

## 故障排除

### 常见问题

1. **系统响应缓慢**
   ```bash
   # 检查CPU使用情况
   top
   
   # 检查内存使用情况
   free -h
   
   # 检查磁盘I/O
   iostat -x 1 5
   ```

2. **内存不足**
   ```bash
   # 查看内存使用情况
   free -h
   
   # 查找内存使用最多的进程
   ps aux --sort=-%mem | head -10
   
   # 清理缓存（谨慎使用）
   sync && echo 3 | sudo tee /proc/sys/vm/drop_caches
   ```

3. **磁盘空间不足**
   ```bash
   # 查看磁盘使用情况
   df -h
   
   # 查找大文件
   find / -type f -size +100M -exec ls -lh {} \; 2>/dev/null | head -10
   
   # 清理临时文件
   sudo find /tmp -type f -atime +7 -delete
   ```

4. **网络问题**
   ```bash
   # 检查网络连接
   ping google.com
   
   # 查看网络接口状态
   ip link show
   
   # 查看路由表
   ip route show
   ```

## 最佳实践

### 监控策略

1. **定期监控**：建立定期监控机制，及时发现异常
2. **阈值设置**：为关键指标设置合理阈值
3. **日志分析**：定期分析系统日志，发现潜在问题
4. **报警机制**：建立自动报警机制，及时响应异常

### 性能调优

1. **基准测试**：在调优前进行基准测试，记录原始性能
2. **逐步调优**：一次只调整一个参数，观察效果
3. **回滚计划**：准备回滚计划，防止调优失败
4. **文档记录**：记录所有调优操作和效果

通过掌握这些系统监控和性能调优技能，你可以更好地维护Linux系统的稳定性和性能。