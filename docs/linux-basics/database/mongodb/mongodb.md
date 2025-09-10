---
title: MongoDB数据库管理
sidebar_position: 4
---

# MongoDB数据库管理

MongoDB是一个开源的文档数据库，属于NoSQL数据库的一种。它使用类似JSON的BSON格式存储数据，具有高性能、高可用性和易扩展性等特点，广泛应用于现代Web应用开发中。

## MongoDB安装

### 使用包管理器安装

#### Ubuntu/Debian系统

```bash
# 导入MongoDB公钥
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# 添加MongoDB仓库
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# 更新包列表并安装
sudo apt update
sudo apt install -y mongodb-org

# 启动MongoDB服务
sudo systemctl start mongod

# 设置开机自启
sudo systemctl enable mongod

# 检查服务状态
sudo systemctl status mongod
```

#### CentOS/RHEL系统

```bash
# 创建MongoDB仓库文件
sudo tee /etc/yum.repos.d/mongodb-org-6.0.repo << EOF
[mongodb-org-6.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/\$releasever/mongodb-org/6.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-6.0.asc
EOF

# 安装MongoDB
sudo yum install -y mongodb-org

# 启动MongoDB服务
sudo systemctl start mongod

# 设置开机自启
sudo systemctl enable mongod

# 检查服务状态
sudo systemctl status mongod
```

### 手动安装

```bash
# 下载MongoDB
wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu2004-6.0.0.tgz

# 解压
tar -zxvf mongodb-linux-x86_64-ubuntu2004-6.0.0.tgz

# 移动到合适位置
sudo mv mongodb-linux-x86_64-ubuntu2004-6.0.0 /usr/local/mongodb

# 创建数据和日志目录
sudo mkdir -p /var/lib/mongo
sudo mkdir -p /var/log/mongodb

# 设置权限
sudo chown -R mongodb:mongodb /var/lib/mongo
sudo chown -R mongodb:mongodb /var/log/mongodb
```

## MongoDB基本配置

### 配置文件位置

```bash
# 主配置文件
/etc/mongod.conf
```

### 核心配置参数

```yaml
# 存储配置
storage:
  dbPath: /var/lib/mongodb
  journal:
    enabled: true

# 系统日志配置
systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log

# 网络配置
net:
  port: 27017
  bindIp: 127.0.0.1

# 进程管理配置
processManagement:
  fork: true
  pidFilePath: /var/run/mongodb/mongod.pid

# 安全配置
security:
  authorization: enabled
```

## MongoDB启动和管理

### 系统服务管理

```bash
# 启动MongoDB服务
sudo systemctl start mongod

# 停止MongoDB服务
sudo systemctl stop mongod

# 重启MongoDB服务
sudo systemctl restart mongod

# 设置开机自启
sudo systemctl enable mongod

# 禁用开机自启
sudo systemctl disable mongod

# 检查服务状态
sudo systemctl status mongod
```

### 手动启动

```bash
# 使用配置文件启动
mongod -f /etc/mongod.conf

# 指定参数启动
mongod --dbpath /var/lib/mongodb --logpath /var/log/mongodb/mongod.log --fork

# 连接MongoDB
mongo
# 或使用新的MongoDB Shell
mongosh
```

## MongoDB基本操作

### 连接MongoDB

```bash
# 连接本地MongoDB
mongo
# 或
mongosh

# 连接远程MongoDB
mongo "mongodb://host:27017"
# 或
mongosh "mongodb://host:27017"

# 连接带认证的MongoDB
mongo "mongodb://username:password@host:27017/database"
# 或
mongosh "mongodb://username:password@host:27017/database"
```

### 数据库操作

```javascript
// 查看所有数据库
show dbs

// 切换/创建数据库
use mydatabase

// 查看当前数据库
db

// 删除数据库
use mydatabase
db.dropDatabase()
```

### 集合操作

```javascript
// 查看所有集合
show collections

// 创建集合
db.createCollection("users")

// 删除集合
db.users.drop()

// 重命名集合
db.users.renameCollection("customers")
```

### 文档操作

```javascript
// 插入文档
db.users.insertOne({
  name: "张三",
  age: 30,
  email: "zhangsan@example.com",
  hobbies: ["读书", "游泳", "编程"]
})

// 插入多个文档
db.users.insertMany([
  {
    name: "李四",
    age: 25,
    email: "lisi@example.com",
    hobbies: ["音乐", "电影"]
  },
  {
    name: "王五",
    age: 35,
    email: "wangwu@example.com",
    hobbies: ["旅行", "摄影"]
  }
])

// 查询所有文档
db.users.find()

// 格式化查询结果
db.users.find().pretty()

// 条件查询
db.users.find({age: 30})
db.users.find({"hobbies": "编程"})

// 更新文档
db.users.updateOne(
  {name: "张三"},
  {$set: {age: 31}}
)

// 更新多个文档
db.users.updateMany(
  {age: {$lt: 30}},
  {$set: {status: "young"}}
)

// 删除文档
db.users.deleteOne({name: "王五"})
db.users.deleteMany({status: "young"})
```

## MongoDB查询操作

### 基本查询

```javascript
// 等值查询
db.users.find({name: "张三"})

// 范围查询
db.users.find({age: {$gte: 25, $lte: 35}})

// 逻辑查询
db.users.find({
  $and: [
    {age: {$gte: 25}},
    {hobbies: "编程"}
  ]
})

db.users.find({
  $or: [
    {age: {$lt: 25}},
    {hobbies: "音乐"}
  ]
})

// 数组查询
db.users.find({hobbies: {$in: ["读书", "音乐"]}})
db.users.find({hobbies: {$all: ["读书", "编程"]}})
```

### 高级查询

```javascript
// 正则表达式查询
db.users.find({name: /^张/})

// 存在性查询
db.users.find({phone: {$exists: true}})

// 类型查询
db.users.find({age: {$type: "int"}})

// 限制返回数量
db.users.find().limit(5)

// 跳过指定数量
db.users.find().skip(10)

// 排序
db.users.find().sort({age: 1})   // 升序
db.users.find().sort({age: -1})  // 降序
```

### 聚合查询

```javascript
// 聚合管道
db.users.aggregate([
  {$match: {age: {$gte: 25}}},
  {$group: {
    _id: "$status",
    count: {$sum: 1},
    avgAge: {$avg: "$age"}
  }},
  {$sort: {count: -1}}
])

// 投影
db.users.aggregate([
  {$project: {
    name: 1,
    age: 1,
    isAdult: {$gte: ["$age", 18]}
  }}
])

// 查找数组元素
db.users.aggregate([
  {$unwind: "$hobbies"},
  {$group: {
    _id: "$hobbies",
    count: {$sum: 1}
  }},
  {$sort: {count: -1}}
])
```

## MongoDB索引管理

### 创建索引

```javascript
// 创建单字段索引
db.users.createIndex({name: 1})

// 创建复合索引
db.users.createIndex({name: 1, age: -1})

// 创建唯一索引
db.users.createIndex({email: 1}, {unique: true})

// 创建数组索引
db.users.createIndex({"hobbies": 1})

// 创建文本索引
db.users.createIndex({name: "text", email: "text"})

// 创建地理空间索引
db.places.createIndex({location: "2dsphere"})
```

### 索引管理

```javascript
// 查看索引
db.users.getIndexes()

// 查看索引统计
db.users.stats()

// 删除索引
db.users.dropIndex({name: 1})
db.users.dropIndex("name_1_age_-1")

// 删除所有索引
db.users.dropIndexes()
```

## MongoDB用户和权限管理

### 启用认证

```yaml
# /etc/mongod.conf
security:
  authorization: enabled
```

```bash
# 重启MongoDB服务
sudo systemctl restart mongod
```

### 用户管理

```javascript
// 切换到admin数据库
use admin

// 创建管理员用户
db.createUser({
  user: "admin",
  pwd: "password123",
  roles: ["userAdminAnyDatabase", "dbAdminAnyDatabase", "readWriteAnyDatabase"]
})

// 创建数据库用户
use mydatabase
db.createUser({
  user: "myuser",
  pwd: "mypassword",
  roles: ["readWrite"]
})

// 验证用户
db.auth("myuser", "mypassword")

// 查看用户
db.getUser("myuser")

// 删除用户
db.dropUser("myuser")
```

### 角色管理

```javascript
// 内置角色
// read - 读取权限
// readWrite - 读写权限
// dbAdmin - 数据库管理权限
// userAdmin - 用户管理权限
// clusterAdmin - 集群管理权限

// 创建自定义角色
db.createRole({
  role: "readWriteLimited",
  privileges: [
    {
      resource: {db: "mydatabase", collection: "users"},
      actions: ["find", "insert", "update"]
    }
  ],
  roles: []
})
```

## MongoDB备份和恢复

### mongodump/mongorestore

```bash
# 备份所有数据库
mongodump --host localhost --port 27017

# 备份指定数据库
mongodump --db mydatabase --out /backup/

# 备份指定集合
mongodump --db mydatabase --collection users --out /backup/

# 备份带认证
mongodump --host localhost --port 27017 --username myuser --password mypassword --db mydatabase

# 压缩备份
mongodump --db mydatabase --gzip --archive=/backup/mydatabase.gz

# 恢复数据库
mongorestore --db mydatabase /backup/mydatabase/

# 从压缩文件恢复
mongorestore --gzip --archive=/backup/mydatabase.gz

# 恢复带认证
mongorestore --host localhost --port 27017 --username myuser --password mypassword --db mydatabase /backup/mydatabase/
```

### mongoexport/mongoimport

```bash
# 导出JSON格式
mongoexport --db mydatabase --collection users --out users.json

# 导出CSV格式
mongoexport --db mydatabase --collection users --type=csv --fields name,age,email --out users.csv

# 导入JSON格式
mongoimport --db mydatabase --collection users --file users.json

# 从CSV导入
mongoimport --db mydatabase --collection users --type=csv --headerline --file users.csv
```

## MongoDB性能监控

### 数据库统计

```javascript
// 查看数据库统计
db.stats()

// 查看集合统计
db.users.stats()

// 查看服务器状态
db.serverStatus()

// 查看构建信息
db.hostInfo()

// 查看连接信息
db.currentOp()
```

### 性能分析

```javascript
// 启用数据库分析器
db.setProfilingLevel(1, {slowms: 100})

// 查看分析器状态
db.getProfilingStatus()

// 查看慢查询
db.system.profile.find().pretty()

// 禁用分析器
db.setProfilingLevel(0)
```

### 索引优化

```javascript
// 查看查询执行计划
db.users.find({name: "张三"}).explain("executionStats")

// 查看索引使用情况
db.users.find({name: "张三"}).hint({name: 1}).explain()

// 强制不使用索引
db.users.find({name: "张三"}).hint({$natural: 1}).explain()
```

## MongoDB安全配置

### 网络安全

```yaml
# /etc/mongod.conf
net:
  port: 27017
  bindIp: 127.0.0.1,192.168.1.100  # 绑定特定IP
```

```bash
# 防火墙配置
# Ubuntu/Debian (ufw)
sudo ufw allow from 192.168.1.0/24 to any port 27017

# CentOS/RHEL (firewalld)
sudo firewall-cmd --permanent --add-rich-rule="rule family='ipv4' source address='192.168.1.0/24' port protocol='tcp' port='27017' accept"
sudo firewall-cmd --reload
```

### TLS/SSL配置

```yaml
# /etc/mongod.conf
net:
  tls:
    mode: requireTLS
    certificateKeyFile: /etc/ssl/mongodb.pem
    CAFile: /etc/ssl/ca.pem
```

## MongoDB复制和分片

### 副本集配置

```javascript
// 初始化副本集
rs.initiate()

// 查看副本集状态
rs.status()

// 添加副本集成员
rs.add("host2:27017")
rs.add("host3:27017")

// 查看副本集配置
rs.conf()
```

### 分片配置

```javascript
// 连接mongos
mongo --host mongos-host:27017

// 添加分片
sh.addShard("shard1/host1:27017,host2:27017")

// 启用数据库分片
sh.enableSharding("mydatabase")

// 对集合进行分片
sh.shardCollection("mydatabase.users", {userId: 1})
```

## 实践练习

### 练习1：MongoDB安装和基本配置

```bash
# 1. 安装MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org

# 2. 启动服务
sudo systemctl start mongod
sudo systemctl enable mongod
sudo systemctl status mongod

# 3. 连接MongoDB
mongosh

# 4. 基本操作
use testdb
db.test.insertOne({name: "test", value: 123})
db.test.find().pretty()
```

### 练习2：数据操作和查询

```javascript
// 1. 创建测试数据
use company
db.employees.insertMany([
  {
    name: "张三",
    age: 30,
    department: "技术部",
    salary: 8000,
    skills: ["Java", "Python", "MongoDB"]
  },
  {
    name: "李四",
    age: 25,
    department: "销售部",
    salary: 6000,
    skills: ["沟通", "谈判", "客户管理"]
  },
  {
    name: "王五",
    age: 35,
    department: "技术部",
    salary: 12000,
    skills: ["架构设计", "团队管理", "MongoDB"]
  }
])

// 2. 查询操作
db.employees.find({department: "技术部"})
db.employees.find({age: {$gte: 30}})
db.employees.find({skills: "MongoDB"})

// 3. 更新操作
db.employees.updateOne(
  {name: "李四"},
  {$set: {salary: 6500}}
)

// 4. 聚合查询
db.employees.aggregate([
  {$group: {
    _id: "$department",
    avgSalary: {$avg: "$salary"},
    count: {$sum: 1}
  }}
])
```

### 练习3：索引和性能优化

```javascript
// 1. 创建索引
db.employees.createIndex({name: 1})
db.employees.createIndex({department: 1, salary: -1})
db.employees.createIndex({skills: 1})

// 2. 查看索引
db.employees.getIndexes()

// 3. 性能分析
db.employees.find({name: "张三"}).explain("executionStats")

// 4. 创建文本索引并搜索
db.employees.createIndex({name: "text", department: "text", skills: "text"})
db.employees.find({$text: {$search: "技术 MongoDB"}})
```

### 练习4：备份和恢复

```bash
# 1. 备份数据库
mongodump --db company --out /backup/

# 2. 查看备份文件
ls -la /backup/company/

# 3. 删除数据
mongo
use company
db.employees.drop()

# 4. 恢复数据
mongorestore --db company /backup/company/

# 5. 验证恢复
mongo
use company
db.employees.find().pretty()
```

## 故障排除

### 常见问题

1. **无法连接MongoDB**
   ```bash
   # 检查服务状态
   sudo systemctl status mongod
   
   # 检查端口监听
   netstat -tuln | grep 27017
   
   # 检查配置文件
   grep bindIp /etc/mongod.conf
   
   # 查看日志
   sudo tail -f /var/log/mongodb/mongod.log
   ```

2. **磁盘空间不足**
   ```bash
   # 查看磁盘使用情况
   df -h
   
   # 查看MongoDB数据目录大小
   du -sh /var/lib/mongodb/
   
   # 清理日志文件
   sudo mongod --repair --dbpath /var/lib/mongodb
   ```

3. **性能问题**
   ```javascript
   // 查看慢查询
   use admin
   db.setProfilingLevel(1, {slowms: 100})
   
   // 查看服务器状态
   db.serverStatus()
   
   // 查看当前操作
   db.currentOp()
   ```

4. **内存不足**
   ```bash
   # 查看系统内存使用
   free -h
   
   # 调整WiredTiger缓存
   # 在配置文件中添加：
   storage:
     wiredTiger:
       engineConfig:
         cacheSizeGB: 1
   ```

通过掌握MongoDB数据库管理技能，你可以有效地在Linux系统上部署、配置和维护MongoDB数据库服务，为应用提供灵活的文档存储和查询能力。