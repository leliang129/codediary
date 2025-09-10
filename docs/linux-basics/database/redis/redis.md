---
title: Redis数据库管理
sidebar_position: 2
---

# Redis数据库管理

Redis是一个开源的内存数据结构存储系统，可以用作数据库、缓存和消息中间件。它支持多种数据结构，如字符串、哈希、列表、集合等，具有高性能和丰富的特性。

## Redis安装

### Ubuntu/Debian系统

```bash
# 更新包列表
sudo apt update

# 安装Redis服务器
sudo apt install redis-server

# 启动Redis服务
sudo systemctl start redis-server

# 设置开机自启
sudo systemctl enable redis-server

# 检查Redis服务状态
sudo systemctl status redis-server
```

### CentOS/RHEL系统

```bash
# 安装EPEL仓库
sudo yum install epel-release

# 安装Redis
sudo yum install redis

# 启动Redis服务
sudo systemctl start redis

# 设置开机自启
sudo systemctl enable redis

# 检查Redis服务状态
sudo systemctl status redis
```

### 从源码编译安装

```bash
# 安装编译依赖
sudo apt install build-essential tcl  # Ubuntu/Debian
sudo yum groupinstall "Development Tools"  # CentOS/RHEL

# 下载Redis源码
wget http://download.redis.io/redis-stable.tar.gz
tar xzf redis-stable.tar.gz
cd redis-stable

# 编译安装
make
make test
sudo make install

# 创建Redis用户
sudo adduser --system --group --no-create-home redis

# 创建数据目录
sudo mkdir /var/lib/redis
sudo chown redis:redis /var/lib/redis
sudo chmod 770 /var/lib/redis
```

## Redis基本配置

### 配置文件位置

```bash
# 主配置文件
/etc/redis/redis.conf  # Ubuntu/Debian
/etc/redis.conf        # CentOS/RHEL
```

### 重要配置参数

```conf
# 网络配置
bind 127.0.0.1          # 绑定IP地址
port 6379               # 监听端口
timeout 0               # 客户端空闲超时时间

# 安全配置
requirepass yourpassword  # 设置密码
rename-command FLUSHDB ""  # 禁用危险命令
rename-command FLUSHALL "" # 禁用危险命令

# 持久化配置
save 900 1              # 900秒内至少1个key改变则保存
save 300 10             # 300秒内至少10个key改变则保存
save 60 10000           # 60秒内至少10000个key改变则保存

# 内存管理
maxmemory 256mb         # 最大内存使用
maxmemory-policy allkeys-lru  # 内存淘汰策略

# 日志配置
loglevel notice         # 日志级别
logfile /var/log/redis/redis-server.log  # 日志文件路径

# 数据目录
dir /var/lib/redis      # 数据文件存储目录
dbfilename dump.rdb     # 数据库文件名
```

## Redis基本操作

### 连接Redis

```bash
# 连接本地Redis
redis-cli

# 连接远程Redis
redis-cli -h hostname -p port

# 连接带密码的Redis
redis-cli -a password

# 连接指定数据库
redis-cli -n 1
```

### 基本命令

```bash
# 查看Redis信息
INFO

# 查看服务器信息
INFO server

# 查看内存信息
INFO memory

# 查看客户端信息
INFO clients

# 查看持久化信息
INFO persistence

# 查看统计信息
INFO stats

# 查看配置
CONFIG GET *

# 设置配置
CONFIG SET loglevel verbose

# 选择数据库（0-15）
SELECT 0

# 查看所有key
KEYS *

# 查看key类型
TYPE keyname

# 检查key是否存在
EXISTS keyname

# 删除key
DEL keyname

# 设置过期时间
EXPIRE keyname 60
TTL keyname
```

## 数据类型操作

### 字符串（String）

```bash
# 设置字符串
SET mykey "Hello World"

# 获取字符串
GET mykey

# 设置多个键值对
MSET key1 "value1" key2 "value2"

# 获取多个值
MGET key1 key2

# 自增/自减
INCR counter
DECR counter
INCRBY counter 5
DECRBY counter 3

# 追加字符串
APPEND mykey " Additional text"
```

### 哈希（Hash）

```bash
# 设置哈希字段
HSET user:1 name "John" age "30" email "john@example.com"

# 获取哈希字段
HGET user:1 name

# 获取所有字段和值
HGETALL user:1

# 获取所有字段名
HKEYS user:1

# 获取所有字段值
HVALS user:1

# 检查字段是否存在
HEXISTS user:1 name

# 删除字段
HDEL user:1 email

# 字段数量
HLEN user:1
```

### 列表（List）

```bash
# 在列表左侧插入元素
LPUSH mylist "item1"
LPUSH mylist "item2"

# 在列表右侧插入元素
RPUSH mylist "item3"

# 获取列表元素
LRANGE mylist 0 -1

# 获取列表长度
LLEN mylist

# 从左侧弹出元素
LPOP mylist

# 从右侧弹出元素
RPOP mylist

# 在指定元素前后插入
LINSERT mylist BEFORE "item2" "newitem"
```

### 集合（Set）

```bash
# 添加元素到集合
SADD myset "item1"
SADD myset "item2" "item3"

# 查看集合所有元素
SMEMBERS myset

# 检查元素是否在集合中
SISMEMBER myset "item1"

# 获取集合元素数量
SCARD myset

# 删除元素
SREM myset "item1"

# 集合交集
SINTER set1 set2

# 集合并集
SUNION set1 set2

# 集合差集
SDIFF set1 set2
```

### 有序集合（Sorted Set）

```bash
# 添加元素到有序集合
ZADD myzset 1 "item1"
ZADD myzset 2 "item2" 3 "item3"

# 查看有序集合元素
ZRANGE myzset 0 -1 WITHSCORES

# 按分数范围获取元素
ZRANGEBYSCORE myzset 1 2

# 获取元素排名
ZRANK myzset "item2"

# 获取元素分数
ZSCORE myzset "item2"

# 删除元素
ZREM myzset "item1"

# 获取元素数量
ZCARD myzset
```

## Redis持久化

### RDB持久化

```bash
# 手动生成RDB快照
SAVE

# 后台生成RDB快照
BGSAVE

# 查看最近一次保存时间
LASTSAVE
```

### AOF持久化

```conf
# 在redis.conf中启用AOF
appendonly yes

# AOF文件名
appendfilename "appendonly.aof"

# AOF同步策略
appendfsync everysec

# AOF重写配置
auto-aof-rewrite-percentage 100
auto-aof-rewrite-min-size 64mb
```

### 持久化管理

```bash
# 重写AOF文件
BGREWRITEAOF

# 查看持久化状态
INFO persistence
```

## Redis性能监控

### 性能指标

```bash
# 查看连接数
INFO clients

# 查看内存使用
INFO memory

# 查看命令统计
INFO commandstats

# 查看慢查询日志
SLOWLOG GET 10
SLOWLOG LEN
SLOWLOG RESET
```

### 性能优化

```bash
# 查看最大内存配置
CONFIG GET maxmemory

# 查看内存淘汰策略
CONFIG GET maxmemory-policy

# 设置最大内存
CONFIG SET maxmemory 512mb

# 设置内存淘汰策略
CONFIG SET maxmemory-policy allkeys-lru
```

## Redis安全配置

### 密码认证

```conf
# 在redis.conf中设置密码
requirepass yourpassword
```

```bash
# 连接后认证
AUTH yourpassword

# 或在连接时指定密码
redis-cli -a yourpassword
```

### 网络安全

```conf
# 绑定特定IP地址
bind 127.0.0.1 192.168.1.100

# 禁用危险命令
rename-command FLUSHDB ""
rename-command FLUSHALL ""
rename-command KEYS ""
rename-command CONFIG "CONFIG_b83c92d1c2d34123"
```

### 防火墙配置

```bash
# Ubuntu/Debian (ufw)
sudo ufw allow from 192.168.1.0/24 to any port 6379

# CentOS/RHEL (firewalld)
sudo firewall-cmd --permanent --add-rich-rule="rule family='ipv4' source address='192.168.1.0/24' port protocol='tcp' port='6379' accept"
sudo firewall-cmd --reload
```

## Redis集群和复制

### 主从复制

```conf
# 从服务器配置
slaveof masterip masterport

# 从服务器密码认证
masterauth masterpassword
```

### 哨兵模式

```conf
# sentinel.conf配置
sentinel monitor mymaster 127.0.0.1 6379 2
sentinel auth-pass mymaster password
sentinel down-after-milliseconds mymaster 5000
sentinel parallel-syncs mymaster 1
sentinel failover-timeout mymaster 10000
```

## 常用管理命令

### 系统管理

```bash
# 启动Redis服务
sudo systemctl start redis-server

# 停止Redis服务
sudo systemctl stop redis-server

# 重启Redis服务
sudo systemctl restart redis-server

# 查看Redis服务状态
sudo systemctl status redis-server

# 查看Redis版本
redis-server --version
redis-cli --version
```

### 数据库管理

```bash
# 切换数据库
SELECT 0

# 清空当前数据库
FLUSHDB

# 清空所有数据库
FLUSHALL

# 查看数据库大小
DBSIZE

# 后台保存数据
BGSAVE

# 查看最后保存时间
LASTSAVE
```

## 实践练习

### 练习1：Redis安装和基本配置

```bash
# 1. 安装Redis
sudo apt update
sudo apt install redis-server

# 2. 启动并检查服务
sudo systemctl start redis-server
sudo systemctl enable redis-server
sudo systemctl status redis-server

# 3. 连接Redis
redis-cli

# 4. 基本操作
SET mykey "Hello Redis"
GET mykey
INFO

# 5. 退出Redis客户端
EXIT
```

### 练习2：数据类型操作

```bash
# 1. 字符串操作
redis-cli
SET counter 0
INCR counter
INCR counter
GET counter

# 2. 哈希操作
HSET user:1 name "Alice" age "25" city "Beijing"
HGETALL user:1
HGET user:1 name

# 3. 列表操作
LPUSH tasks "task1"
LPUSH tasks "task2"
RPUSH tasks "task3"
LRANGE tasks 0 -1

# 4. 集合操作
SADD tags "redis" "database" "nosql"
SMEMBERS tags
SISMEMBER tags "redis"

# 5. 有序集合操作
ZADD scores 100 "Alice" 95 "Bob" 87 "Charlie"
ZRANGE scores 0 -1 WITHSCORES
```

### 练习3：持久化和备份

```bash
# 1. 查看持久化状态
redis-cli INFO persistence

# 2. 手动生成RDB快照
redis-cli BGSAVE

# 3. 查看AOF文件
ls -la /var/lib/redis/

# 4. 模拟数据备份
redis-cli SAVE
sudo cp /var/lib/redis/dump.rdb /backup/redis_backup.rdb

# 5. 恢复数据（需要停止Redis服务）
sudo systemctl stop redis-server
sudo cp /backup/redis_backup.rdb /var/lib/redis/dump.rdb
sudo chown redis:redis /var/lib/redis/dump.rdb
sudo systemctl start redis-server
```

## 故障排除

### 常见问题

1. **无法连接Redis**
   ```bash
   # 检查Redis服务状态
   sudo systemctl status redis-server
   
   # 检查端口监听
   netstat -tuln | grep 6379
   
   # 检查绑定地址配置
   grep "^bind" /etc/redis/redis.conf
   
   # 检查错误日志
   sudo tail -f /var/log/redis/redis-server.log
   ```

2. **内存不足**
   ```bash
   # 查看内存使用情况
   redis-cli INFO memory
   
   # 设置最大内存
   redis-cli CONFIG SET maxmemory 256mb
   
   # 设置内存淘汰策略
   redis-cli CONFIG SET maxmemory-policy allkeys-lru
   
   # 查看key数量
   redis-cli DBSIZE
   ```

3. **性能问题**
   ```bash
   # 查看慢查询日志
   redis-cli SLOWLOG GET 10
   
   # 查看命令统计
   redis-cli INFO commandstats
   
   # 查看客户端连接数
   redis-cli INFO clients
   
   # 优化大key
   redis-cli --bigkeys
   ```

通过掌握Redis数据库管理技能，你可以有效地在Linux系统上部署、配置和维护Redis数据库服务，为应用提供高性能的缓存和数据存储解决方案。