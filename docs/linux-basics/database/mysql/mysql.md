---
title: MySQL数据库管理
sidebar_position: 1
---

# MySQL数据库管理

MySQL是最流行的开源关系型数据库管理系统之一，广泛应用于Web应用开发中。掌握MySQL的安装、配置和管理对于Linux系统管理员至关重要。

## MySQL安装

### Ubuntu/Debian系统

```bash
# 更新包列表
sudo apt update

# 安装MySQL服务器
sudo apt install mysql-server

# 启动MySQL服务
sudo systemctl start mysql

# 设置开机自启
sudo systemctl enable mysql

# 运行安全配置脚本
sudo mysql_secure_installation
```

### CentOS/RHEL系统

```bash
# 安装MySQL（使用MySQL官方仓库）
sudo yum install mysql-server

# 或安装MariaDB（MySQL的替代品）
sudo yum install mariadb-server

# 启动服务
sudo systemctl start mysqld
# 或
sudo systemctl start mariadb

# 设置开机自启
sudo systemctl enable mysqld
# 或
sudo systemctl enable mariadb
```

## MySQL基本配置

### 配置文件位置

```bash
# 主配置文件
/etc/mysql/mysql.conf.d/mysqld.cnf  # Ubuntu/Debian
/etc/my.cnf                        # CentOS/RHEL
```

### 基本配置参数

```ini
[mysqld]
# 基本设置
port = 3306
bind-address = 127.0.0.1

# 字符集设置
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci

# 连接设置
max_connections = 200
max_connect_errors = 10

# 缓存设置
innodb_buffer_pool_size = 1G
query_cache_size = 64M

# 日志设置
log-error = /var/log/mysql/error.log
slow_query_log = 1
slow_query_log_file = /var/log/mysql/slow.log
long_query_time = 2
```

## MySQL用户管理

### 登录MySQL

```bash
# 使用root用户登录
sudo mysql -u root -p

# 或者使用sudo（Ubuntu默认配置）
sudo mysql
```

### 用户管理命令

```sql
-- 创建用户
CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
CREATE USER 'username'@'%' IDENTIFIED BY 'password';

-- 授权
GRANT ALL PRIVILEGES ON database_name.* TO 'username'@'localhost';
GRANT SELECT, INSERT, UPDATE, DELETE ON database_name.* TO 'username'@'%';

-- 刷新权限
FLUSH PRIVILEGES;

-- 查看用户
SELECT User, Host FROM mysql.user;

-- 删除用户
DROP USER 'username'@'localhost';
```

## 数据库操作

### 数据库管理

```sql
-- 创建数据库
CREATE DATABASE database_name;
CREATE DATABASE database_name CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 查看数据库
SHOW DATABASES;

-- 使用数据库
USE database_name;

-- 删除数据库
DROP DATABASE database_name;
```

### 表操作

```sql
-- 创建表
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 查看表
SHOW TABLES;
DESCRIBE table_name;

-- 修改表结构
ALTER TABLE users ADD COLUMN age INT;
ALTER TABLE users MODIFY COLUMN email VARCHAR(150);
ALTER TABLE users DROP COLUMN age;

-- 删除表
DROP TABLE table_name;
```

### 数据操作

```sql
-- 插入数据
INSERT INTO users (username, email) VALUES ('john', 'john@example.com');

-- 查询数据
SELECT * FROM users;
SELECT username, email FROM users WHERE id = 1;

-- 更新数据
UPDATE users SET email = 'newemail@example.com' WHERE id = 1;

-- 删除数据
DELETE FROM users WHERE id = 1;
```

## MySQL备份和恢复

### mysqldump备份

```bash
# 备份单个数据库
mysqldump -u root -p database_name > backup.sql

# 备份所有数据库
mysqldump -u root -p --all-databases > all_databases.sql

# 备份特定表
mysqldump -u root -p database_name table_name > table_backup.sql

# 备份并压缩
mysqldump -u root -p database_name | gzip > backup.sql.gz
```

### 恢复数据

```bash
# 恢复数据库
mysql -u root -p database_name < backup.sql

# 从压缩文件恢复
gunzip -c backup.sql.gz | mysql -u root -p database_name

# 恢复所有数据库
mysql -u root -p < all_databases.sql
```

## MySQL性能监控

### 状态查看

```sql
-- 查看MySQL状态
SHOW STATUS;

-- 查看进程列表
SHOW PROCESSLIST;

-- 查看引擎状态
SHOW ENGINE INNODB STATUS;

-- 查看变量设置
SHOW VARIABLES;
```

### 性能监控命令

```bash
# 查看MySQL进程
ps aux | grep mysql

# 查看MySQL端口
netstat -tuln | grep 3306

# 查看MySQL日志
sudo tail -f /var/log/mysql/error.log

# 使用mysqladmin查看状态
mysqladmin -u root -p status
mysqladmin -u root -p extended-status
```

## MySQL安全配置

### 安全设置

```sql
-- 删除匿名用户
DELETE FROM mysql.user WHERE User='';

-- 禁止root远程登录
DELETE FROM mysql.user WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1');

-- 删除测试数据库
DROP DATABASE IF EXISTS test;
DELETE FROM mysql.db WHERE Db='test' OR Db='test\\_%';

-- 刷新权限
FLUSH PRIVILEGES;
```

### 防火墙配置

```bash
# Ubuntu/Debian (ufw)
sudo ufw allow from 192.168.1.0/24 to any port 3306

# CentOS/RHEL (firewalld)
sudo firewall-cmd --permanent --add-rich-rule="rule family='ipv4' source address='192.168.1.0/24' port protocol='tcp' port='3306' accept"
sudo firewall-cmd --reload
```

## 常用管理命令

### 系统管理

```bash
# 启动MySQL服务
sudo systemctl start mysql

# 停止MySQL服务
sudo systemctl stop mysql

# 重启MySQL服务
sudo systemctl restart mysql

# 查看MySQL服务状态
sudo systemctl status mysql

# 查看MySQL版本
mysql -V

# 查看MySQL配置
mysql --help | grep "Default options" -A 1
```

### 日志管理

```bash
# 查看错误日志
sudo tail -f /var/log/mysql/error.log

# 查看慢查询日志
sudo tail -f /var/log/mysql/slow.log

# 查看二进制日志（如果启用）
mysql -u root -p -e "SHOW BINARY LOGS;"
```

## 实践练习

### 练习1：MySQL安装和基本配置

```bash
# 1. 安装MySQL
sudo apt update
sudo apt install mysql-server

# 2. 启动并检查服务
sudo systemctl start mysql
sudo systemctl enable mysql
sudo systemctl status mysql

# 3. 运行安全配置
sudo mysql_secure_installation

# 4. 登录MySQL
sudo mysql

# 5. 创建测试数据库和用户
CREATE DATABASE testdb;
CREATE USER 'testuser'@'localhost' IDENTIFIED BY 'password123';
GRANT ALL PRIVILEGES ON testdb.* TO 'testuser'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# 6. 测试新用户登录
mysql -u testuser -p
```

### 练习2：数据库操作

```sql
-- 1. 使用测试数据库
USE testdb;

-- 2. 创建表
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(50),
    salary DECIMAL(10,2),
    hire_date DATE
);

-- 3. 插入数据
INSERT INTO employees (name, department, salary, hire_date) VALUES 
('张三', '技术部', 8000.00, '2023-01-15'),
('李四', '销售部', 6000.00, '2023-02-20'),
('王五', '人事部', 7000.00, '2023-03-10');

-- 4. 查询数据
SELECT * FROM employees;
SELECT name, salary FROM employees WHERE salary > 6500;

-- 5. 更新数据
UPDATE employees SET salary = 8500.00 WHERE name = '张三';

-- 6. 删除数据
DELETE FROM employees WHERE name = '王五';
```

### 练习3：备份和恢复

```bash
# 1. 备份数据库
mysqldump -u root -p testdb > testdb_backup.sql

# 2. 查看备份文件
cat testdb_backup.sql | head -20

# 3. 删除表数据
mysql -u root -p -e "USE testdb; DROP TABLE employees;"

# 4. 从备份恢复
mysql -u root -p testdb < testdb_backup.sql

# 5. 验证恢复结果
mysql -u root -p -e "USE testdb; SELECT * FROM employees;"
```

## 故障排除

### 常见问题

1. **无法连接MySQL**
   ```bash
   # 检查MySQL服务状态
   sudo systemctl status mysql
   
   # 检查端口监听
   netstat -tuln | grep 3306
   
   # 检查错误日志
   sudo tail -f /var/log/mysql/error.log
   ```

2. **忘记root密码**
   ```bash
   # 停止MySQL服务
   sudo systemctl stop mysql
   
   # 跳过权限表启动
   sudo mysqld_safe --skip-grant-tables &
   
   # 登录并重置密码
   mysql -u root
   USE mysql;
   UPDATE user SET authentication_string=PASSWORD('newpassword') WHERE User='root';
   FLUSH PRIVILEGES;
   EXIT;
   
   # 重启MySQL服务
   sudo systemctl restart mysql
   ```

3. **磁盘空间不足**
   ```bash
   # 查看磁盘使用情况
   df -h
   
   # 清理二进制日志（如果启用）
   mysql -u root -p -e "PURGE BINARY LOGS BEFORE DATE(NOW() - INTERVAL 7 DAY);"
   
   # 清理慢查询日志
   sudo truncate /var/log/mysql/slow.log --size 0
   ```

通过掌握MySQL数据库管理技能，你可以有效地在Linux系统上部署、配置和维护MySQL数据库服务。