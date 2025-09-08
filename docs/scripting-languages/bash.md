---
title: Bash脚本编程指南
slug: /scripting-languages/bash
---

# Bash脚本编程指南

## Bash基础

### 第一个Bash脚本
```bash
#!/bin/bash
# 这是一个注释
echo "Hello, World!"
```

保存为 `hello.sh`，然后赋予执行权限：
```bash
chmod +x hello.sh
./hello.sh
```

### 变量
```bash
# 定义变量
name="John"
age=25

# 使用变量
echo "Name: $name"
echo "Age: $age"

# 只读变量
readonly PI=3.14159

# 删除变量
unset name
```

### 特殊变量
```bash
echo "脚本名称: $0"
echo "第一个参数: $1"
echo "所有参数: $@"
echo "参数个数: $#"
echo "进程ID: $$"
echo "退出状态: $?"
```

## 字符串操作

### 字符串长度
```bash
str="Hello"
echo ${#str}  # 输出 5
```

### 子字符串
```bash
str="Hello World"
echo ${str:0:5}    # 输出 Hello
echo ${str:6}      # 输出 World
```

### 字符串替换
```bash
str="Hello World"
echo ${str/World/Bash}  # 输出 Hello Bash
echo ${str//l/L}        # 输出 HeLLo WorLd
```

## 数组

### 定义数组
```bash
# 方式一
fruits=("apple" "banana" "cherry")

# 方式二
fruits[0]="apple"
fruits[1]="banana"
fruits[2]="cherry"
```

### 访问数组
```bash
echo ${fruits[0]}     # 第一个元素
echo ${fruits[@]}     # 所有元素
echo ${#fruits[@]}    # 数组长度
echo ${!fruits[@]}    # 所有索引
```

### 数组操作
```bash
# 添加元素
fruits+=("orange")

# 删除元素
unset fruits[1]

# 切片
echo ${fruits[@]:1:2}  # 从索引1开始取2个元素
```

## 条件判断

### 基本语法
```bash
if [ condition ]; then
    # commands
elif [ condition ]; then
    # commands  
else
    # commands
fi
```

### 文件测试
```bash
if [ -f "file.txt" ]; then
    echo "文件存在"
fi

if [ -d "directory" ]; then
    echo "目录存在"
fi

# 常用文件测试运算符
# -e 文件存在
# -f 是普通文件
# -d 是目录
# -r 可读
# -w 可写  
# -x 可执行
# -s 文件不为空
```

### 字符串比较
```bash
if [ "$str1" = "$str2" ]; then
    echo "字符串相等"
fi

if [ "$str1" != "$str2" ]; then
    echo "字符串不相等"
fi

if [ -z "$str" ]; then
    echo "字符串为空"
fi

if [ -n "$str" ]; then
    echo "字符串不为空"
fi
```

### 数值比较
```bash
if [ $a -eq $b ]; then  # 等于
if [ $a -ne $b ]; then  # 不等于
if [ $a -gt $b ]; then  # 大于
if [ $a -lt $b ]; then  # 小于
if [ $a -ge $b ]; then  # 大于等于
if [ $a -le $b ]; then  # 小于等于
```

### 逻辑运算符
```bash
if [ condition1 ] && [ condition2 ]; then  # 与
if [ condition1 ] || [ condition2 ]; then  # 或
if ! [ condition ]; then                   # 非
```

## 循环

### for循环
```bash
# 遍历列表
for fruit in "apple" "banana" "cherry"; do
    echo "I like $fruit"
done

# 遍历数组
for fruit in "${fruits[@]}"; do
    echo "Fruit: $fruit"
done

# C风格for循环
for ((i=0; i<10; i++)); do
    echo "Number: $i"
done
```

### while循环
```bash
# 基本while循环
count=1
while [ $count -le 5 ]; do
    echo "Count: $count"
    count=$((count + 1))
done

# 读取文件行
while IFS= read -r line; do
    echo "Line: $line"
done < "file.txt"
```

### until循环
```bash
count=1
until [ $count -gt 5 ]; do
    echo "Count: $count"
    count=$((count + 1))
done
```

### 循环控制
```bash
# break - 跳出循环
for i in {1..10}; do
    if [ $i -eq 5 ]; then
        break
    fi
    echo $i
done

# continue - 跳过本次循环
for i in {1..5}; do
    if [ $i -eq 3 ]; then
        continue
    fi
    echo $i
done
```

## 函数

### 定义函数
```bash
# 方式一
function greet() {
    echo "Hello, $1!"
}

# 方式二
greet() {
    echo "Hello, $1!"
}

# 调用函数
greet "John"
```

### 返回值
```bash
add() {
    local result=$(( $1 + $2 ))
    return $result
}

add 5 3
echo "Sum: $?"

# 更好的方式：使用echo返回值
add() {
    echo $(( $1 + $2 ))
}

result=$(add 5 3)
echo "Sum: $result"
```

### 局部变量
```bash
my_func() {
    local local_var="I'm local"
    global_var="I'm global"
}

my_func
echo "$local_var"   # 空
echo "$global_var"  # I'm global
```

## 输入输出

### 读取输入
```bash
# 读取用户输入
read -p "Enter your name: " name
echo "Hello, $name!"

# 读取多个值
read -p "Enter first and last name: " first last
echo "First: $first, Last: $last"

# 静默读取（用于密码）
read -s -p "Enter password: " password
echo
```

### 输出格式
```bash
# 基本输出
echo "Hello World"

# 输出不换行
echo -n "Processing..."

# 输出带转义字符
echo -e "Line 1\nLine 2"

# printf格式化输出
printf "Name: %s, Age: %d\n" "John" 25
```

## 高级特性

### 命令替换
```bash
# 方式一：反引号
current_date=`date`

# 方式二：$()
current_date=$(date)
current_user=$(whoami)
```

### 算术运算
```bash
# 方式一：$(( ))
a=5
b=3
sum=$((a + b))
product=$((a * b))

# 方式二：expr
sum=$(expr $a + $b)

# 方式三：let
let "sum = a + b"
let "product = a * b"
```

### 调试脚本
```bash
#!/bin/bash
# 调试选项
set -x  # 开启调试
echo "Debug mode on"
set +x  # 关闭调试
echo "Debug mode off"

# 其他有用的调试选项
set -e  # 遇到错误退出
set -u  # 遇到未定义变量退出
set -o pipefail  # 管道中任何命令失败则整个管道失败
```

### 信号处理
```bash
# 捕获Ctrl+C
trap 'echo "Script interrupted"; exit' INT

# 清理函数
cleanup() {
    echo "Cleaning up..."
    rm -f tempfile.txt
}

trap cleanup EXIT
```

## 实用脚本示例

### 备份脚本
```bash
#!/bin/bash
# 简单备份脚本

BACKUP_DIR="/backup"
SOURCE_DIR="/home/user/documents"
DATE=$(date +%Y%m%d_%H%M%S)

# 创建备份目录
mkdir -p "$BACKUP_DIR"

# 创建备份
tar -czf "$BACKUP_DIR/backup_$DATE.tar.gz" "$SOURCE_DIR"

# 删除7天前的备份
find "$BACKUP_DIR" -name "*.tar.gz" -mtime +7 -delete

echo "Backup completed: $BACKUP_DIR/backup_$DATE.tar.gz"
```

### 系统监控脚本
```bash
#!/bin/bash
# 系统监控脚本

# 获取系统信息
CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)
MEM_USAGE=$(free | grep Mem | awk '{printf "%.2f", $3/$2 * 100}')
DISK_USAGE=$(df / | grep / | awk '{print $5}' | sed 's/%//g')

# 输出信息
echo "=== System Monitor ==="
echo "CPU Usage: $CPU_USAGE%"
echo "Memory Usage: $MEM_USAGE%"
echo "Disk Usage: $DISK_USAGE%"

# 检查阈值
if [ $CPU_USAGE -gt 90 ]; then
    echo "WARNING: CPU usage is high!"
fi

if [ $MEM_USAGE -gt 90 ]; then
    echo "WARNING: Memory usage is high!"
fi

if [ $DISK_USAGE -gt 90 ]; then
    echo "WARNING: Disk usage is high!"
fi
```

### 文件处理脚本
```bash
#!/bin/bash
# 批量重命名脚本

# 重命名所有.txt文件为.bak
for file in *.txt; do
    if [ -f "$file" ]; then
        mv "$file" "${file%.txt}.bak"
        echo "Renamed: $file -> ${file%.txt}.bak"
    fi
done

# 批量转换文件编码
for file in *.txt; do
    if [ -f "$file" ]; then
        iconv -f GBK -t UTF-8 "$file" > "${file%.txt}_utf8.txt"
        echo "Converted: $file"
    fi
done
```

## 最佳实践

1. **使用引号**: 总是引用变量防止单词分割
2. **错误处理**: 使用 `set -euo pipefail` 和 `trap`
3. **代码注释**: 添加有意义的注释
4. **函数化**: 将重复代码封装为函数
5. **输入验证**: 验证用户输入和参数
6. **日志记录**: 添加日志功能便于调试
7. **可移植性**: 避免使用bash特有特性（如果需要可移植）

## 学习资源

- [Bash Guide](https://mywiki.wooledge.org/BashGuide)
- [Advanced Bash-Scripting Guide](https://tldp.org/LDP/abs/html/)
- [Google Shell Style Guide](https://google.github.io/styleguide/shellguide.html)
- [Bash Hackers Wiki](https://wiki.bash-hackers.org/)