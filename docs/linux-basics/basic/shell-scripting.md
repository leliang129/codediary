---
title: Shell脚本编程基础
sidebar_position: 8
---

# Shell脚本编程基础

## Shell脚本概述

Shell脚本是一种批处理脚本，用于自动化执行一系列命令。它允许用户将多个命令组合在一起，创建复杂的程序来完成各种任务。

### 什么是Shell

Shell是Linux系统的命令解释器，它接收用户输入的命令并执行相应的操作。常见的Shell包括：

1. **Bash** (Bourne Again Shell) - 最常用的Shell
2. **Sh** (Bourne Shell) - 传统的Unix Shell
3. **Zsh** (Z Shell) - 功能增强的Shell
4. **Fish** (Friendly Interactive Shell) - 用户友好的Shell

### Shell脚本的优势

1. **自动化** - 自动执行重复性任务
2. **批处理** - 一次执行多个命令
3. **可移植性** - 在不同系统间移植
4. **效率** - 提高工作效率

## 创建和运行Shell脚本

### 编写第一个Shell脚本

```bash
#!/bin/bash
# 这是一个简单的Shell脚本示例

echo "Hello, World!"
echo "当前时间: $(date)"
echo "当前用户: $(whoami)"
```

### 脚本执行方式

```bash
# 1. 使用bash命令执行
bash script.sh

# 2. 给脚本添加执行权限后直接执行
chmod +x script.sh
./script.sh

# 3. 使用source或.命令在当前shell中执行
source script.sh
# 或
. script.sh
```

### Shell脚本的基本结构

```bash
#!/bin/bash
# 脚本描述和作者信息

# 变量定义
variable=value

# 函数定义
function_name() {
    # 函数体
}

# 主要代码逻辑
echo "脚本开始执行"

# 条件判断和循环
if [ condition ]; then
    # 条件为真时执行
fi

# 脚本结束
echo "脚本执行完成"
```

## 变量和参数

### 变量定义和使用

```bash
#!/bin/bash

# 定义变量
name="Linux"
version="5.4"
number=42

# 使用变量
echo "系统名称: $name"
echo "版本号: $version"
echo "数字: $number"

# 变量拼接
message="欢迎使用 $name 系统"
echo $message

# 变量赋值时使用命令输出
current_date=$(date)
echo "当前日期: $current_date"

# 使用反引号（旧式语法）
current_user=`whoami`
echo "当前用户: $current_user"
```

### 特殊变量

```bash
#!/bin/bash

# 脚本参数
echo "脚本名称: $0"
echo "第一个参数: $1"
echo "第二个参数: $2"
echo "所有参数: $@"
echo "参数个数: $#"

# 进程相关变量
echo "当前进程ID: $$"
echo "最后运行的后台进程ID: $!"

# 上一个命令的退出状态
ls /nonexistent
echo "上一个命令的退出状态: $?"
```

### 数组

```bash
#!/bin/bash

# 定义数组
fruits=("苹果" "香蕉" "橙子")
numbers=(1 2 3 4 5)

# 访问数组元素
echo "第一个水果: ${fruits[0]}"
echo "第二个水果: ${fruits[1]}"

# 获取数组所有元素
echo "所有水果: ${fruits[@]}"

# 获取数组长度
echo "水果数量: ${#fruits[@]}"

# 添加数组元素
fruits[3]="葡萄"
fruits+=("西瓜")

# 遍历数组
for fruit in "${fruits[@]}"; do
    echo "水果: $fruit"
done
```

## 运算符

### 算术运算符

```bash
#!/bin/bash

a=10
b=5

# 基本算术运算
echo "加法: $((a + b))"
echo "减法: $((a - b))"
echo "乘法: $((a * b))"
echo "除法: $((a / b))"
echo "取余: $((a % b))"

# 自增自减
echo "a自增前: $a"
((a++))
echo "a自增后: $a"

echo "b自减前: $b"
((b--))
echo "b自减后: $b"

# 使用expr命令（旧式语法）
result=$(expr $a + $b)
echo "使用expr: $result"
```

### 比较运算符

```bash
#!/bin/bash

# 数值比较
num1=10
num2=20

if [ $num1 -eq $num2 ]; then
    echo "$num1 等于 $num2"
elif [ $num1 -ne $num2 ]; then
    echo "$num1 不等于 $num2"
fi

if [ $num1 -gt $num2 ]; then
    echo "$num1 大于 $num2"
elif [ $num1 -lt $num2 ]; then
    echo "$num1 小于 $num2"
fi

# 字符串比较
str1="hello"
str2="world"

if [ "$str1" = "$str2" ]; then
    echo "字符串相等"
elif [ "$str1" != "$str2" ]; then
    echo "字符串不相等"
fi

# 文件测试运算符
if [ -f "/etc/passwd" ]; then
    echo "/etc/passwd 是一个普通文件"
fi

if [ -d "/home" ]; then
    echo "/home 是一个目录"
fi

if [ -r "/etc/passwd" ]; then
    echo "/etc/passwd 可读"
fi

if [ -w "/tmp" ]; then
    echo "/tmp 可写"
fi

if [ -x "/bin/bash" ]; then
    echo "/bin/bash 可执行"
fi
```

## 条件判断

### if语句

```bash
#!/bin/bash

# 基本if语句
age=18

if [ $age -ge 18 ]; then
    echo "已成年"
else
    echo "未成年"
fi

# 多重条件判断
score=85

if [ $score -ge 90 ]; then
    echo "优秀"
elif [ $score -ge 80 ]; then
    echo "良好"
elif [ $score -ge 70 ]; then
    echo "中等"
elif [ $score -ge 60 ]; then
    echo "及格"
else
    echo "不及格"
fi

# 多个条件组合
user="admin"
password="123456"

if [ "$user" = "admin" ] && [ "$password" = "123456" ]; then
    echo "登录成功"
else
    echo "用户名或密码错误"
fi
```

### case语句

```bash
#!/bin/bash

# case语句示例
read -p "请输入一个数字 (1-3): " number

case $number in
    1)
        echo "你输入了数字一"
        ;;
    2)
        echo "你输入了数字二"
        ;;
    3)
        echo "你输入了数字三"
        ;;
    *)
        echo "输入无效"
        ;;
esac

# 使用通配符的case语句
read -p "请输入文件扩展名: " extension

case $extension in
    .txt|.log)
        echo "文本文件"
        ;;
    .jpg|.png|.gif)
        echo "图片文件"
        ;;
    .mp3|.wav)
        echo "音频文件"
        ;;
    *)
        echo "未知文件类型"
        ;;
esac
```

## 循环结构

### for循环

```bash
#!/bin/bash

# 基本for循环
for i in 1 2 3 4 5; do
    echo "数字: $i"
done

# 使用范围的for循环
for i in {1..10}; do
    echo "计数: $i"
done

# 使用seq命令
for i in $(seq 1 5); do
    echo "序列: $i"
done

# C风格的for循环
for ((i=1; i<=5; i++)); do
    echo "C风格循环: $i"
done

# 遍历数组
fruits=("苹果" "香蕉" "橙子")
for fruit in "${fruits[@]}"; do
    echo "水果: $fruit"
done

# 遍历文件
for file in /etc/*.conf; do
    if [ -f "$file" ]; then
        echo "配置文件: $(basename $file)"
    fi
done
```

### while循环

```bash
#!/bin/bash

# 基本while循环
count=1
while [ $count -le 5 ]; do
    echo "计数: $count"
    ((count++))
done

# 无限循环（需要break退出）
while true; do
    read -p "输入'quit'退出: " input
    if [ "$input" = "quit" ]; then
        break
    fi
    echo "你输入了: $input"
done

# 读取文件内容
while read line; do
    echo "行内容: $line"
done < /etc/hosts
```

### until循环

```bash
#!/bin/bash

# until循环示例
count=1
until [ $count -gt 5 ]; do
    echo "计数: $count"
    ((count++))
done
```

## 函数

### 定义和调用函数

```bash
#!/bin/bash

# 定义函数
greet() {
    echo "你好, $1!"
}

# 调用函数
greet "张三"
greet "李四"

# 带返回值的函数
add() {
    local sum=$(( $1 + $2 ))
    echo $sum
}

# 调用带返回值的函数
result=$(add 10 20)
echo "10 + 20 = $result"

# 函数中使用全局变量和局部变量
global_var="全局变量"

test_scope() {
    local local_var="局部变量"
    echo "函数内: $global_var"
    echo "函数内: $local_var"
}

test_scope
echo "函数外: $global_var"
# echo "函数外: $local_var"  # 这会报错，因为局部变量在函数外不可访问
```

### 函数参数

```bash
#!/bin/bash

# 处理函数参数
show_args() {
    echo "函数名称: $0"
    echo "第一个参数: $1"
    echo "第二个参数: $2"
    echo "所有参数: $@"
    echo "参数个数: $#"
}

show_args "参数1" "参数2" "参数3"

# 参数默认值
greet_user() {
    local name=${1:-"访客"}  # 如果$1为空，则使用"访客"
    echo "你好, $name!"
}

greet_user "张三"
greet_user  # 使用默认值
```

## 输入输出

### 读取用户输入

```bash
#!/bin/bash

# 基本读取输入
read -p "请输入您的姓名: " name
echo "您好, $name!"

# 读取密码（不显示输入）
read -s -p "请输入密码: " password
echo
echo "密码已输入"

# 读取多个值
read -p "请输入姓名和年龄: " name age
echo "姓名: $name, 年龄: $age"

# 设置读取超时
if read -t 5 -p "请输入内容（5秒超时）: " input; then
    echo "您输入了: $input"
else
    echo "超时未输入"
fi
```

### 输出重定向

```bash
#!/bin/bash

# 输出重定向到文件
echo "这是第一行" > output.txt
echo "这是第二行" >> output.txt

# 错误输出重定向
ls /nonexistent 2> error.txt

# 标准输出和错误输出分别重定向
command > output.txt 2> error.txt

# 标准输出和错误输出重定向到同一文件
command > all_output.txt 2>&1
# 或
command &> all_output.txt

# 丢弃输出
command > /dev/null 2>&1
```

### 格式化输出

```bash
#!/bin/bash

# 使用printf格式化输出
name="张三"
age=25
height=175.5

printf "姓名: %s\n" "$name"
printf "年龄: %d\n" "$age"
printf "身高: %.1f cm\n" "$height"
printf "格式化字符串: %s, 数字: %d\n" "测试" 123

# 颜色输出
echo -e "\033[31m红色文本\033[0m"
echo -e "\033[32m绿色文本\033[0m"
echo -e "\033[33m黄色文本\033[0m"
echo -e "\033[34m蓝色文本\033[0m"

# 背景颜色
echo -e "\033[41m红色背景\033[0m"
echo -e "\033[42m绿色背景\033[0m"
```

## 调试和错误处理

### 调试选项

```bash
#!/bin/bash

# 使用set命令调试
set -x  # 显示执行的命令
echo "调试模式开启"
set +x  # 关闭调试模式

# 使用bash -x执行脚本
# bash -x script.sh

# 显示执行过程但不显示命令
set -v
echo "显示模式开启"
set +v

# 同时开启详细模式和调试模式
set -vx
echo "详细调试模式"
set +vx
```

### 错误处理

```bash
#!/bin/bash

# 检查命令执行结果
if ! ls /nonexistent > /dev/null 2>&1; then
    echo "命令执行失败"
    exit 1
fi

# 使用set -e在命令失败时自动退出
set -e
echo "这条命令会执行"
# ls /nonexistent  # 这条命令会导致脚本退出
echo "这条命令不会执行到"

# 捕获错误信号
trap 'echo "脚本被中断"; exit 1' INT TERM

# 捕获退出信号
trap 'echo "脚本执行完成"' EXIT

# 自定义错误处理函数
error_exit() {
    echo "错误: $1"
    exit 1
}

# 使用自定义错误处理
command || error_exit "命令执行失败"
```

## 实用Shell脚本示例

### 系统信息收集脚本

```bash
#!/bin/bash
# system_info.sh - 系统信息收集脚本

echo "=== 系统信息报告 ==="
echo "生成时间: $(date)"
echo "主机名: $(hostname)"
echo "用户: $(whoami)"
echo

echo "=== 硬件信息 ==="
echo "CPU信息:"
lscpu | head -10
echo

echo "内存信息:"
free -h
echo

echo "磁盘使用情况:"
df -h
echo

echo "=== 网络信息 ==="
echo "网络接口:"
ip addr show | grep "inet "
echo

echo "路由表:"
ip route show
echo

echo "=== 进程信息 ==="
echo "运行中的进程数: $(ps aux | wc -l)"
echo "CPU使用率最高的5个进程:"
ps aux --sort=-%cpu | head -6
echo

echo "=== 系统负载 ==="
uptime
```

### 文件备份脚本

```bash
#!/bin/bash
# backup.sh - 文件备份脚本

SOURCE_DIR="/home/user/documents"
BACKUP_DIR="/backup"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="backup_$DATE.tar.gz"

# 检查源目录是否存在
if [ ! -d "$SOURCE_DIR" ]; then
    echo "错误: 源目录 $SOURCE_DIR 不存在"
    exit 1
fi

# 创建备份目录
mkdir -p "$BACKUP_DIR"

# 执行备份
echo "开始备份 $SOURCE_DIR 到 $BACKUP_DIR/$BACKUP_NAME"
tar -czf "$BACKUP_DIR/$BACKUP_NAME" -C "$(dirname "$SOURCE_DIR")" "$(basename "$SOURCE_DIR")"

if [ $? -eq 0 ]; then
    echo "备份成功完成"
    echo "备份文件: $BACKUP_DIR/$BACKUP_NAME"
    echo "备份大小: $(du -h "$BACKUP_DIR/$BACKUP_NAME" | cut -f1)"
else
    echo "备份失败"
    exit 1
fi

# 清理7天前的备份文件
find "$BACKUP_DIR" -name "backup_*.tar.gz" -mtime +7 -delete
echo "已清理7天前的备份文件"
```

### 日志分析脚本

```bash
#!/bin/bash
# log_analyzer.sh - 日志分析脚本

LOG_FILE="/var/log/syslog"
OUTPUT_FILE="log_analysis_$(date +%Y%m%d).txt"

# 检查日志文件是否存在
if [ ! -f "$LOG_FILE" ]; then
    echo "错误: 日志文件 $LOG_FILE 不存在"
    exit 1
fi

echo "开始分析日志文件: $LOG_FILE"
echo "分析时间: $(date)" > "$OUTPUT_FILE"

echo "=== 错误日志统计 ===" >> "$OUTPUT_FILE"
grep -i "error" "$LOG_FILE" | wc -l >> "$OUTPUT_FILE"

echo "=== 警告日志统计 ===" >> "$OUTPUT_FILE"
grep -i "warning" "$LOG_FILE" | wc -l >> "$OUTPUT_FILE"

echo "=== 最常见的错误 ===" >> "$OUTPUT_FILE"
grep -i "error" "$LOG_FILE" | cut -d' ' -f5- | sort | uniq -c | sort -nr | head -10 >> "$OUTPUT_FILE"

echo "=== 活跃IP地址 ===" >> "$OUTPUT_FILE"
# 假设是Web服务器日志
grep "GET\|POST" "$LOG_FILE" | grep -oE "\b([0-9]{1,3}\.){3}[0-9]{1,3}\b" | sort | uniq -c | sort -nr | head -10 >> "$OUTPUT_FILE"

echo "日志分析完成，结果保存在: $OUTPUT_FILE"
```

## 实践练习

### 练习1：基础脚本编写

```bash
#!/bin/bash
# practice1.sh

# 1. 创建一个脚本，显示系统信息
echo "=== 系统信息 ==="
echo "当前时间: $(date)"
echo "当前用户: $(whoami)"
echo "工作目录: $(pwd)"
echo "系统负载: $(uptime | awk -F'load average:' '{print $2}')"

# 2. 使用变量存储信息
os_name=$(uname -s)
os_version=$(uname -r)
echo "操作系统: $os_name $os_version"

# 3. 条件判断
if [ -f "/etc/passwd" ]; then
    echo "用户账户数: $(wc -l < /etc/passwd)"
else
    echo "无法读取用户信息"
fi
```

### 练习2：循环和数组

```bash
#!/bin/bash
# practice2.sh

# 1. 创建数组并遍历
services=("ssh" "httpd" "mysql" "nginx")
echo "=== 服务状态检查 ==="

for service in "${services[@]}"; do
    if systemctl is-active --quiet $service 2>/dev/null; then
        echo "✓ $service 正在运行"
    else
        echo "✗ $service 未运行"
    fi
done

# 2. 使用while循环计数
echo "=== 倒计时 ==="
count=10
while [ $count -gt 0 ]; do
    echo "倒计时: $count"
    sleep 1
    ((count--))
done
echo "倒计时结束!"
```

### 练习3：函数和参数处理

```bash
#!/bin/bash
# practice3.sh

# 1. 定义计算函数
calculate() {
    local operation=$1
    local num1=$2
    local num2=$3
    
    case $operation in
        add)
            echo $(($num1 + $num2))
            ;;
        sub)
            echo $(($num1 - $num2))
            ;;
        mul)
            echo $(($num1 * $num2))
            ;;
        div)
            if [ $num2 -ne 0 ]; then
                echo $(($num1 / $num2))
            else
                echo "错误: 除数不能为零"
            fi
            ;;
        *)
            echo "错误: 不支持的操作 $operation"
            ;;
    esac
}

# 2. 处理命令行参数
if [ $# -ne 3 ]; then
    echo "用法: $0 <操作> <数字1> <数字2>"
    echo "操作: add|sub|mul|div"
    exit 1
fi

operation=$1
num1=$2
num2=$3

result=$(calculate $operation $num1 $num2)
echo "结果: $result"
```

### 练习4：文件操作脚本

```bash
#!/bin/bash
# file_manager.sh

# 1. 创建目录结构
create_structure() {
    local base_dir=$1
    mkdir -p "$base_dir"/{documents,pictures,videos,music}
    echo "目录结构创建完成: $base_dir"
}

# 2. 统计文件类型
count_files() {
    local dir=$1
    echo "=== $dir 目录文件统计 ==="
    find "$dir" -type f -name "*.txt" | wc -l | xargs echo "文本文件:"
    find "$dir" -type f -name "*.jpg" -o -name "*.png" | wc -l | xargs echo "图片文件:"
    find "$dir" -type f -name "*.mp3" -o -name "*.wav" | wc -l | xargs echo "音频文件:"
}

# 3. 清理临时文件
clean_temp() {
    local dir=$1
    echo "清理临时文件..."
    find "$dir" -name "*.tmp" -delete
    find "$dir" -name "*~" -delete
    echo "临时文件清理完成"
}

# 主程序
if [ $# -lt 1 ]; then
    echo "用法: $0 <目录路径> [create|count|clean]"
    exit 1
fi

target_dir=$1
action=${2:-"count"}

case $action in
    create)
        create_structure "$target_dir"
        ;;
    count)
        count_files "$target_dir"
        ;;
    clean)
        clean_temp "$target_dir"
        ;;
    *)
        echo "不支持的操作: $action"
        echo "支持的操作: create|count|clean"
        ;;
esac
```

## 最佳实践

### 脚本编写规范

1. **使用正确的Shebang**
   ```bash
   #!/bin/bash
   ```

2. **添加注释**
   ```bash
   #!/bin/bash
   # 脚本功能：备份重要文件
   # 作者：张三
   # 日期：2023-01-01
   ```

3. **变量命名规范**
   ```bash
   # 使用有意义的变量名
   backup_directory="/backup"
   current_date=$(date +%Y%m%d)
   ```

4. **错误处理**
   ```bash
   # 检查命令执行结果
   if ! command; then
       echo "命令执行失败"
       exit 1
   fi
   ```

5. **输入验证**
   ```bash
   # 验证参数
   if [ $# -ne 2 ]; then
       echo "用法: $0 <参数1> <参数2>"
       exit 1
   fi
   ```

### 性能优化建议

1. **避免不必要的子shell**
   ```bash
   # 不好的做法
   count=$(ls *.txt | wc -l)
   
   # 更好的做法
   count=$(find . -maxdepth 1 -name "*.txt" | wc -l)
   ```

2. **使用内置命令**
   ```bash
   # 不好的做法
   if [ $(echo "$num1 > $num2" | bc) -eq 1 ]; then
   
   # 更好的做法
   if [ $num1 -gt $num2 ]; then
   ```

3. **批量处理**
   ```bash
   # 不好的做法
   for file in *.txt; do
       process_file "$file"
   done
   
   # 更好的做法
   process_files *.txt
   ```

## 总结

Shell脚本编程是Linux系统管理的重要技能。通过掌握变量、条件判断、循环、函数等基本概念，可以编写出功能强大的自动化脚本来提高工作效率。

关键要点：
1. 理解Shell脚本的基本结构和执行方式
2. 掌握变量定义和使用方法
3. 熟练运用条件判断和循环结构
4. 学会定义和调用函数
5. 掌握输入输出处理技巧
6. 能够进行调试和错误处理
7. 遵循脚本编写最佳实践