---
title: Linux高级命令
slug: /linux-basics/commands/advanced
---

# Linux高级命令

## 文本处理三剑客

### grep - 文本搜索
```bash
# 基本搜索
grep "pattern" file.txt

# 递归搜索
grep -r "pattern" directory/

# 忽略大小写
grep -i "pattern" file.txt

# 显示行号
grep -n "pattern" file.txt

# 反向搜索（不匹配）
grep -v "pattern" file.txt

# 统计匹配行数
grep -c "pattern" file.txt
```

### sed - 流编辑器
```bash
# 替换文本
sed 's/old/new/g' file.txt

# 原地替换（备份原文件）
sed -i.bak 's/old/new/g' file.txt

# 删除行
sed '5d' file.txt              # 删除第5行
sed '1,5d' file.txt           # 删除1-5行
sed '/pattern/d' file.txt     # 删除匹配行

# 插入和追加
sed '3i\插入的内容' file.txt    # 在第3行前插入
sed '3a\追加的内容' file.txt    # 在第3行后追加
```

### awk - 文本处理语言
```bash
# 打印特定列
awk '{print $1}' file.txt      # 打印第一列
awk '{print $1,$3}' file.txt   # 打印第一和第三列

# 条件过滤
awk '$3 > 100 {print $0}' file.txt  # 第三列大于100的行

# 内置变量
awk '{print NR, NF, $0}' file.txt   # 行号, 列数, 整行

# 字段分隔符
awk -F: '{print $1}' /etc/passwd    # 使用冒号分隔

# 统计计算
awk '{sum += $1} END {print sum}' file.txt  # 求和
awk '{count++} END {print count}' file.txt  # 计数
```

## 系统监控命令

### top/htop - 进程监控
```bash
top                           # 基本进程监控
htop                          # 增强版top（需要安装）

# top常用快捷键
# P - 按CPU使用排序
# M - 按内存使用排序
# T - 按运行时间排序
# k - 杀死进程
# q - 退出
```

### iotop - I/O监控
```bash
sudo iotop                    # 监控磁盘I/O

# 选项
iotop -o                      # 只显示有I/O的进程
iotop -P                      # 显示所有进程
iotop -a                      # 累计I/O
```

### nethogs - 网络流量监控
```bash
sudo nethogs                  # 按进程监控网络流量
sudo nethogs eth0             # 监控特定网卡
```

## 网络诊断工具

### netstat/ss - 网络统计
```bash
# netstat（较老，建议使用ss）
netstat -tuln                 # 所有监听端口
netstat -r                    # 路由表
netstat -s                    # 网络统计

# ss（现代替代品）
ss -tuln                      # 所有监听端口
ss -s                         # 摘要统计
ss -t state established       # 已建立连接
```

### traceroute/mtr - 路由追踪
```bash
traceroute example.com        # 路由追踪
mtr example.com               # 实时路由追踪（需要安装）
```

### tcpdump - 网络抓包
```bash
sudo tcpdump -i eth0          # 捕获eth0流量
sudo tcpdump port 80          # 捕获80端口流量
sudo tcpdump host 192.168.1.1 # 捕获特定主机流量
sudo tcpdump -w capture.pcap  # 保存到文件
```

## 文件系统工具

### find - 文件查找
```bash
# 按名称查找
find /path -name "*.txt"
find /path -iname "*.TXT"     # 忽略大小写

# 按类型查找
find /path -type f            # 普通文件
find /path -type d            # 目录
find /path -type l            # 符号链接

# 按时间查找
find /path -mtime -7          # 7天内修改的文件
find /path -mtime +30         # 30天前修改的文件
find /path -newer file.txt    # 比file.txt新的文件

# 按大小查找
find /path -size +1M          # 大于1MB的文件
find /path -size -100k        # 小于100KB的文件

# 执行操作
find /path -name "*.log" -delete            # 删除找到的文件
find /path -name "*.txt" -exec chmod 644 {} \;  # 修改权限
```

### rsync - 远程同步
```bash
# 本地同步
rsync -av source/ destination/

# 远程同步
rsync -av source/ user@host:destination/
rsync -av user@host:source/ destination/

# 常用选项
rsync -avz                   # 压缩传输
rsync -av --progress         # 显示进度
rsync -av --delete           # 删除目标多余文件
rsync -av --exclude='*.tmp'  # 排除文件
```

### tar - 打包压缩
```bash
# 创建压缩包
tar -czvf archive.tar.gz directory/
tar -cjvf archive.tar.bz2 directory/

# 解压缩
tar -xzvf archive.tar.gz
tar -xjvf archive.tar.bz2

# 列出内容
tar -tzvf archive.tar.gz

# 追加文件
tar -rvf archive.tar newfile.txt
```

## 用户和权限管理

### sudo - 特权执行
```bash
sudo command                  # 以root权限执行
sudo -u user command         # 以指定用户执行
sudo -i                      # 切换到root shell
sudo -s                      # 启动root shell
```

### chmod/chown/chgrp
```bash
# 权限管理
chmod 755 file.txt           # 设置权限
chmod u+x file.txt           # 添加执行权限
chmod g-w file.txt           # 移除写权限

# 所有权管理
chown user:group file.txt    # 更改所有者和组
chown -R user:group dir/     # 递归更改
chgrp group file.txt         # 更改组
```

### umask - 默认权限
```bash
umask                        # 查看当前umask
umask 022                    # 设置umask

# umask计算：默认权限666(文件)或777(目录)减去umask值
# umask 022 → 文件权限644，目录权限755
```

## 进程管理高级技巧

### nohup - 后台运行
```bash
nohup command &              # 后台运行，忽略挂起信号
nohup command > output.log 2>&1 &  # 重定向输出
```

### screen/tmux - 终端复用
```bash
# screen
screen -S session_name        # 创建新会话
screen -r session_name        # 恢复会话
screen -ls                    # 列出会话

# tmux
tmux new -s session_name      # 创建新会话
tmux attach -t session_name   # 附加到会话
tmux ls                       # 列出会话
```

### systemctl - 服务管理
```bash
systemctl start service       # 启动服务
systemctl stop service        # 停止服务
systemctl restart service     # 重启服务
systemctl status service      # 查看状态
systemctl enable service      # 启用开机启动
systemctl disable service     # 禁用开机启动
```

## 性能调优命令

### vmstat - 虚拟内存统计
```bash
vmstat 1                     # 每秒刷新一次
vmstat -s                    # 显示统计摘要
```

### iostat - I/O统计
```bash
iostat -x 1                  # 扩展统计，每秒刷新
iostat -d sda                # 特定设备统计
```

### free - 内存使用
```bash
free -h                      # 人类可读格式
free -m                      # MB格式
free -s 5                    # 每5秒刷新
```

## 实用脚本技巧

### 命令行历史
```bash
history                      # 查看命令历史
!number                      # 执行历史命令
!!                           # 执行上一条命令
!string                      # 执行以string开头的最近命令
```

### 命令别名
```bash
alias ll='ls -alF'           # 创建别名
alias grep='grep --color=auto'
unalias ll                   # 删除别名
```

### 输入输出重定向
```bash
command > file               # 标准输出重定向
command 2> file              # 标准错误重定向
command &> file              # 所有输出重定向
command >> file              # 追加输出
command < file               # 输入重定向
```

## 安全相关命令

### ssh-keygen - SSH密钥生成
```bash
ssh-keygen -t rsa -b 4096    # 生成RSA密钥
ssh-keygen -t ed25519        # 生成Ed25519密钥
ssh-keygen -f ~/.ssh/key     # 指定密钥文件
```

### openssl - 加密工具
```bash
# 生成证书
openssl req -new -x509 -key key.pem -out cert.pem -days 365

# 加密解密
openssl enc -aes-256-cbc -salt -in file.txt -out file.enc
openssl enc -d -aes-256-cbc -in file.enc -out file.txt
```

### fail2ban - 防暴力破解
```bash
sudo fail2ban-client status   # 查看状态
sudo fail2ban-client set sshd banip 192.168.1.100  # 手动封禁IP
```

## 调试和故障排除

### strace - 系统调用跟踪
```bash
strace command               # 跟踪命令系统调用
strace -p PID                # 跟踪运行中进程
strace -e trace=open,read,write command  # 跟踪特定调用
```

### lsof - 列出打开文件
```bash
lsof -i :80                  # 查看80端口使用情况
lsof -u username             # 查看用户打开的文件
lsof -p PID                  # 查看进程打开的文件
```

### dmesg - 内核消息
```bash
dmesg                         # 查看内核消息
dmesg -T                      # 带时间戳
dmesg -l err,crit             # 只显示错误和严重消息
```

## 学习资源

- [Linux Command Library](https://linuxcommand.org/)
- [Explain Shell](https://explainshell.com/)
- [Linux man pages online](https://man7.org/linux/man-pages/)
- [Advanced Bash-Scripting Guide](https://tldp.org/LDP/abs/html/)