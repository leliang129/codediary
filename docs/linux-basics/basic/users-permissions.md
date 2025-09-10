---
title: Linux用户和权限管理
sidebar_position: 4
---

# Linux用户和权限管理

## 用户和组的概念

Linux是一个多用户操作系统，支持多个用户同时登录和使用系统。为了确保系统安全和资源合理分配，Linux提供了完善的用户和组管理机制。

### 用户类型

1. **root用户**：超级用户，拥有系统的完全控制权
2. **系统用户**：系统服务运行所需的用户账户
3. **普通用户**：日常使用的用户账户

### 组的概念

组是用户的集合，用于简化权限管理。一个用户可以属于多个组，文件和目录的权限可以分配给特定的组。

## 用户管理

### 查看用户信息

```bash
# 查看当前用户
whoami

# 查看系统所有用户
cat /etc/passwd

# 查看当前登录用户
who

# 查看详细登录信息
w

# 查看用户详细信息
id
id username
```

### 添加用户

```bash
# 添加新用户
sudo useradd newuser

# 添加用户并创建主目录
sudo useradd -m newuser

# 添加用户并指定shell
sudo useradd -m -s /bin/bash newuser

# 添加用户并指定用户ID
sudo useradd -m -u 1001 newuser

# 添加用户并指定组
sudo useradd -m -g groupname newuser

# 添加用户并指定附加组
sudo useradd -m -G group1,group2 newuser
```

### 设置用户密码

```bash
# 为用户设置密码
sudo passwd newuser

# 设置密码过期时间
sudo passwd -e newuser

# 锁定用户账户
sudo passwd -l newuser

# 解锁用户账户
sudo passwd -u newuser
```

### 修改用户信息

```bash
# 修改用户信息
sudo usermod -c "User Full Name" username

# 修改用户主目录
sudo usermod -d /new/home/directory username

# 修改用户shell
sudo usermod -s /bin/zsh username

# 将用户添加到附加组
sudo usermod -aG groupname username

# 修改用户登录名
sudo usermod -l newname oldname
```

### 删除用户

```bash
# 删除用户（保留主目录）
sudo userdel username

# 删除用户及其主目录
sudo userdel -r username

# 删除用户及其主目录和邮件
sudo userdel -r -f username
```

## 组管理

### 查看组信息

```bash
# 查看当前用户所属组
groups

# 查看用户所属组
groups username

# 查看系统所有组
cat /etc/group

# 查看组详细信息
getent group groupname
```

### 添加组

```bash
# 添加新组
sudo groupadd newgroup

# 添加系统组
sudo groupadd -r sysgroup

# 添加组并指定组ID
sudo groupadd -g 1001 newgroup
```

### 修改组

```bash
# 修改组名
sudo groupmod -n newname oldname

# 修改组ID
sudo groupmod -g 2001 groupname
```

### 删除组

```bash
# 删除组
sudo groupdel groupname
```

### 管理组成员

```bash
# 将用户添加到组
sudo usermod -aG groupname username

# 将用户从组中移除
sudo gpasswd -d username groupname

# 设置组管理员
sudo gpasswd -A adminuser groupname

# 设置组密码
sudo gpasswd groupname
```

## 文件权限管理

### 权限类型

Linux文件系统有三种基本权限：

1. **读权限（r）**：允许查看文件内容或列出目录内容
2. **写权限（w）**：允许修改文件内容或在目录中创建/删除文件
3. **执行权限（x）**：允许执行文件或进入目录

### 权限类别

每种权限类型都对应三类用户：

1. **所有者（user, u）**：文件的拥有者
2. **组（group, g）**：文件所属组的成员
3. **其他用户（others, o）**：既不是所有者也不属于该组的用户

### 查看文件权限

```bash
# 查看文件详细信息
ls -l filename

# 查看目录详细信息
ls -ld directory

# 以数字形式显示权限
stat -c "%a %n" filename
```

输出格式解释：
```
-rwxr-xr-- 1 user group 1234 date filename
||||||||||
||| ||| ||`--- 其他用户权限 (r--)
||| ||| |`---- 组权限 (r-x)
||| ||| `----- 文件类型 (- = 普通文件, d = 目录)
||| `--------- 所有者权限 (rwx)
```

### 权限数字表示法

权限可以用三位或四位八进制数字表示：

- **读（r）= 4**
- **写（w）= 2**
- **执行（x）= 1**

三位数字分别代表所有者、组、其他用户的权限：

```bash
# 示例权限数字
755 = rwxr-xr-x (所有者：读写执行，组和其他：读执行)
644 = rw-r--r-- (所有者：读写，组和其他：只读)
600 = rw------- (所有者：读写，组和其他：无权限)
```

### 修改文件权限

#### 使用数字模式

```bash
# 设置权限为755
chmod 755 filename

# 设置权限为644
chmod 644 filename

# 设置权限为600
chmod 600 filename
```

#### 使用符号模式

```bash
# 给所有者添加执行权限
chmod u+x filename

# 移除组的写权限
chmod g-w filename

# 给其他用户添加读权限
chmod o+r filename

# 给所有用户添加读权限
chmod a+r filename

# 设置所有者权限为读写执行
chmod u=rwx filename

# 同时修改多个权限
chmod u+r,g-w,o=r filename
```

### 修改文件所有者和组

```bash
# 修改文件所有者
sudo chown newuser filename

# 修改文件所有者和组
sudo chown newuser:newgroup filename

# 递归修改目录及其内容的所有者
sudo chown -R newuser:newgroup directory

# 只修改文件所属组
sudo chgrp newgroup filename

# 递归修改目录及其内容的组
sudo chgrp -R newgroup directory
```

## 特殊权限

### SetUID（SUID）

当一个可执行文件设置了SUID位时，任何用户执行该文件时都会以文件所有者的权限运行。

```bash
# 设置SUID位
chmod u+s filename
# 或
chmod 4755 filename

# 查看SUID位
ls -l filename
# 输出示例：-rwsr-xr-x 1 root root 1234 date filename
```

### SetGID（SGID）

当一个目录设置了SGID位时，在该目录中创建的文件会继承目录的组所有权。

```bash
# 设置SGID位
chmod g+s directory
# 或
chmod 2755 directory

# 查看SGID位
ls -ld directory
# 输出示例：drwxr-sr-x 2 user group 4096 date directory
```

### Sticky Bit

当一个目录设置了Sticky Bit时，只有文件所有者才能删除该目录中的文件。

```bash
# 设置Sticky Bit
chmod +t directory
# 或
chmod 1755 directory

# 查看Sticky Bit
ls -ld directory
# 输出示例：drwxrwxrwt 2 user group 4096 date directory
```

## 访问控制列表（ACL）

ACL提供了比传统权限模型更精细的权限控制。

### 安装ACL支持

```bash
# Ubuntu/Debian
sudo apt install acl

# CentOS/RHEL
sudo yum install acl
```

### 使用ACL

```bash
# 查看文件ACL
getfacl filename

# 为特定用户设置ACL
setfacl -m u:username:rwx filename

# 为特定组设置ACL
setfacl -m g:groupname:rx filename

# 设置默认ACL（对新创建的文件有效）
setfacl -d -m u:username:rwx directory

# 删除特定用户的ACL
setfacl -x u:username filename

# 删除所有ACL
setfacl -b filename
```

## 用户和权限安全实践

### 安全建议

1. **避免使用root账户进行日常操作**
   ```bash
   # 使用sudo执行管理任务
   sudo command
   ```

2. **定期检查用户账户**
   ```bash
   # 查看没有密码的账户
   sudo awk -F: '($2 == "") {print $1}' /etc/shadow
   
   # 查看最近添加的用户
   tail /etc/passwd
   ```

3. **设置强密码策略**
   ```bash
   # 配置密码复杂度要求（/etc/pam.d/common-password）
   password requisite pam_pwquality.so retry=3 minlen=8 difok=3
   ```

4. **限制用户登录**
   ```bash
   # 禁止用户登录
   sudo usermod -s /usr/sbin/nologin username
   ```

5. **定期审查权限**
   ```bash
   # 查找全局可写的文件
   sudo find / -perm -0002 -type f -not -path "/proc/*" -not -path "/sys/*"
   
   # 查找设置了SUID的文件
   sudo find / -perm -4000 -type f
   ```

## 实践练习

### 练习1：用户和组管理

```bash
# 1. 创建新用户和组
sudo groupadd developers
sudo useradd -m -g developers -s /bin/bash alice
sudo useradd -m -g developers -s /bin/bash bob

# 2. 设置用户密码
sudo passwd alice
sudo passwd bob

# 3. 查看用户信息
id alice
groups alice

# 4. 将用户添加到附加组
sudo usermod -aG sudo alice

# 5. 验证组成员
getent group developers
getent group sudo
```

### 练习2：文件权限管理

```bash
# 1. 创建测试目录和文件
mkdir ~/test_permissions
cd ~/test_permissions
touch file1 file2
mkdir dir1 dir2

# 2. 查看默认权限
ls -l

# 3. 修改文件权限
chmod 644 file1
chmod 755 dir1
chmod u+x file2

# 4. 修改所有者和组
sudo chown alice:developers file1
sudo chown -R bob:developers dir1

# 5. 验证权限更改
ls -l
```

### 练习3：特殊权限应用

```bash
# 1. 创建测试脚本
cat > ~/test_script.sh << 'EOF'
#!/bin/bash
echo "Current user: $(whoami)"
echo "Effective user: $(id -un)"
EOF

chmod 755 ~/test_script.sh

# 2. 设置SUID位
sudo chown root:root ~/test_script.sh
sudo chmod u+s ~/test_script.sh

# 3. 测试SUID效果
~/test_script.sh

# 4. 创建共享目录并设置SGID和Sticky Bit
sudo mkdir /shared
sudo chown root:developers /shared
sudo chmod 2775 /shared
sudo chmod +t /shared

# 5. 验证特殊权限
ls -ld /shared
```

## 总结

Linux用户和权限管理是系统安全的基础。通过合理的用户和组管理，以及适当的文件权限设置，可以有效保护系统资源不被未授权访问。掌握这些概念和命令对于Linux系统管理员至关重要。

关键要点：
1. 理解用户和组的概念及管理方法
2. 掌握文件权限的三种类型和三类用户
3. 熟练使用chmod、chown、chgrp命令
4. 了解特殊权限（SUID、SGID、Sticky Bit）的应用
5. 学会使用ACL进行精细权限控制
6. 遵循安全最佳实践，定期审查用户和权限设置