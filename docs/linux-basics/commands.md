---
title: Linux常用命令详解
slug: /linux-basics/commands
---

# Linux常用命令详解

## 文件和目录操作

### ls - 列出目录内容
```bash
ls          # 列出当前目录内容
ls -l       # 详细列表格式
ls -a       # 显示所有文件（包括隐藏文件）
ls -la      # 详细列表显示所有文件
ls -lh      # 人类可读的文件大小
ls /path/to/dir  # 列出指定目录内容
```

### cd - 切换目录
```bash
cd          # 返回用户主目录
cd ~        # 返回用户主目录
cd ..       # 返回上一级目录
cd -        # 返回上一个工作目录
cd /path/to/dir  # 切换到指定目录
```

### pwd - 显示当前目录
```bash
pwd         # 显示当前工作目录的完整路径
```

### mkdir - 创建目录
```bash
mkdir dirname          # 创建单个目录
mkdir -p parent/child  # 创建多级目录
mkdir dir1 dir2 dir3   # 创建多个目录
```

### rm - 删除文件或目录
```bash
rm filename          # 删除文件
rm -r dirname        # 递归删除目录
rm -f filename       # 强制删除，不提示
rm -rf dirname       # 强制递归删除目录
```

### cp - 复制文件
```bash
cp source dest        # 复制文件
cp -r source dest     # 递归复制目录
cp -v source dest     # 显示复制进度
cp -i source dest     # 交互式复制（提示覆盖）
```

### mv - 移动或重命名文件
```bash
mv oldname newname    # 重命名文件
mv file dir/          # 移动文件到目录
mv -i file dir/       # 交互式移动
```

## 文件查看和编辑

### cat - 查看文件内容
```bash
cat filename          # 显示文件内容
cat file1 file2       # 连接多个文件并显示
cat > newfile         # 创建新文件（输入内容后Ctrl+D保存）
```

### more/less - 分页查看文件
```bash
more filename         # 分页查看文件（只能向下翻页）
less filename         # 分页查看文件（可上下翻页，支持搜索）
```

### head/tail - 查看文件开头/结尾
```bash
head filename         # 显示文件前10行
head -n 20 filename   # 显示文件前20行

tail filename         # 显示文件最后10行  
tail -n 20 filename   # 显示文件最后20行
tail -f filename      # 实时跟踪文件变化（常用于日志文件）
```

### grep - 文本搜索
```bash
grep "pattern" filename    # 在文件中搜索模式
grep -r "pattern" dir/     # 递归搜索目录
grep -i "pattern" filename # 忽略大小写搜索
grep -v "pattern" filename # 反向搜索（不匹配模式的行）
```

## 系统信息命令

### uname - 系统信息
```bash
uname -a              # 显示所有系统信息
uname -s              # 显示内核名称
uname -r              # 显示内核版本
uname -m              # 显示机器硬件名称
```

### df - 磁盘空间使用
```bash
df -h                 # 人类可读的磁盘空间使用情况
df -i                 # 显示inode使用情况
```

### free - 内存使用情况
```bash
free -h               # 人类可读的内存使用情况
free -m               # 以MB为单位显示
```

### top/htop - 进程监控
```bash
top                   # 实时显示系统进程信息
htop                  # 增强版的top（需要安装）
```

## 网络命令

### ping - 网络连通性测试
```bash
ping example.com      # 测试到主机的连通性
ping -c 4 example.com # 发送4个包后停止
```

### ifconfig/ip - 网络接口配置
```bash
ifconfig              # 显示网络接口信息（较老命令）
ip addr show         # 显示IP地址信息（新命令）
ip link show         # 显示网络链接信息
```

### netstat - 网络统计
```bash
netstat -tuln         # 显示所有监听端口
netstat -r            # 显示路由表
netstat -s            # 显示网络统计信息
```

### ssh - 安全远程登录
```bash
ssh user@hostname     # 连接到远程主机
ssh -p port user@host # 指定端口连接
ssh -i keyfile user@host # 使用密钥文件连接
```

### scp - 安全文件传输
```bash
scp file user@host:path    # 复制文件到远程主机
scp user@host:file path    # 从远程主机复制文件
scp -r dir user@host:path  # 递归复制目录
```

## 权限管理命令

### chmod - 更改文件权限
```bash
chmod 755 filename    # 设置权限为rwxr-xr-x
chmod u+x filename    # 给所有者添加执行权限
chmod g-w filename    # 移除组的写权限
chmod a+r filename    # 给所有用户添加读权限
```

权限数字表示：
- 4 = 读 (r)
- 2 = 写 (w)  
- 1 = 执行 (x)

示例：
- 755 = rwxr-xr-x
- 644 = rw-r--r--
- 600 = rw-------

### chown - 更改文件所有者
```bash
chown user filename      # 更改文件所有者
chown user:group filename # 同时更改所有者和组
chown -R user:group dir/ # 递归更改目录所有权
```

### chgrp - 更改文件组
```bash
chgrp group filename    # 更改文件所属组
chgrp -R group dir/     # 递归更改目录组
```

## 压缩和解压缩

### tar - 打包和解包
```bash
tar -czvf archive.tar.gz dir/  # 创建gzip压缩包
tar -xzvf archive.tar.gz       # 解压gzip压缩包
tar -cjvf archive.tar.bz2 dir/ # 创建bzip2压缩包
tar -xjvf archive.tar.bz2      # 解压bzip2压缩包
```

### zip/unzip
```bash
zip archive.zip file1 file2    # 创建zip压缩包
unzip archive.zip              # 解压zip压缩包
```

### gzip/gunzip
```bash
gzip filename          # 压缩文件（生成.gz文件）
gunzip filename.gz     # 解压.gz文件
```

## 进程管理

### ps - 进程状态
```bash
ps aux                 # 显示所有用户的所有进程
ps -ef                 # 显示完整格式的进程信息
ps -u username         # 显示指定用户的进程
```

### kill - 终止进程
```bash
kill PID               # 终止指定PID的进程
kill -9 PID            # 强制终止进程
killall processname    # 终止所有指定名称的进程
```

### jobs/fg/bg - 作业控制
```bash
jobs                   # 显示后台作业
fg %1                  # 将作业1切换到前台
bg %1                  # 在后台继续运行作业1
```

## 实用技巧

### 命令组合
```bash
command1 && command2   # command1成功后才执行command2
command1 || command2   # command1失败后才执行command2
command1 ; command2    # 顺序执行两个命令
```

### 输入输出重定向
```bash
command > file         # 标准输出重定向到文件（覆盖）
command >> file        # 标准输出重定向到文件（追加）
command < file         # 从文件读取标准输入
command 2> file        # 标准错误重定向到文件
command &> file        # 标准和错误输出都重定向到文件
```

### 管道
```bash
command1 | command2    # 将command1的输出作为command2的输入
```

### 命令替换
```bash
$(command)             # 执行命令并用输出替换
`command`              # 旧式命令替换（同上）
```

## 环境变量

```bash
echo $PATH            # 显示PATH环境变量
export VAR=value      # 设置环境变量
unset VAR             # 删除环境变量
env                   # 显示所有环境变量
```

## 查找命令

### find - 查找文件
```bash
find /path -name "*.txt"     # 按名称查找文件
find /path -type f           # 查找所有普通文件
find /path -mtime -7         # 查找7天内修改的文件
find /path -size +1M         # 查找大于1MB的文件
```

### which/whereis - 查找命令位置
```bash
which command          # 显示命令的完整路径
whereis command        # 显示命令的路径、手册页等
```

### locate - 快速文件查找
```bash
locate filename        # 快速查找文件（需要updatedb数据库）
```