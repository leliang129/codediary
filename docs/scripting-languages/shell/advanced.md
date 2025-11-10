---
title: Shell脚本高级技巧
slug: /scripting-languages/shell/advanced
sidebar_position: 2
---

# Shell脚本高级技巧

## 高级变量操作

### 字符串处理
```bash
# 字符串长度
str="Hello World"
echo ${#str}  # 11

# 子字符串提取
echo ${str:0:5}    # Hello
echo ${str:6}      # World

# 字符串替换
echo ${str/World/Bash}  # Hello Bash
echo ${str//l/L}        # HeLLo WorLd

# 大小写转换
str="hello world"
echo ${str^^}          # HELLO WORLD (转大写)
echo ${str,,}          # hello world (转小写)
echo ${str^}           # Hello world (首字母大写)
```

### 数组高级操作
```bash
# 数组定义
fruits=("apple" "banana" "cherry" "date" "elderberry")

# 数组切片
echo ${fruits[@]:1:3}    # banana cherry date

# 数组元素操作
fruits=("${fruits[@]}" "fig")      # 添加元素
fruits=("grape" "${fruits[@]}")    # 开头添加
unset fruits[2]                     # 删除元素

# 关联数组（Bash 4+）
declare -A person
person["name"]="Alice"
person["age"]=25
person["city"]="New York"

echo ${person["name"]}  # Alice
```

### 变量默认值
```bash
# 如果变量未设置，使用默认值
name=${NAME:-"Guest"}
echo $name  # 如果NAME未设置，输出Guest

# 如果变量未设置，设置并使用默认值
: ${COUNT:=10}
echo $COUNT  # 如果COUNT未设置，设置为10并输出

# 检查变量是否设置
: ${REQUIRED_VAR:?"变量必须设置"}
```

## 函数高级用法

### 函数参数处理
```bash
# 处理函数参数
process_args() {
    echo "参数个数: $#"
    echo "所有参数: $@"
    echo "第一个参数: $1"
    echo "第二个参数: $2"
    
    # 遍历所有参数
    for arg in "$@"; do
        echo "参数: $arg"
    done
}

process_args "one" "two" "three"
```

### 函数返回值
```bash
# 使用return返回状态码
check_file() {
    if [ -f "$1" ]; then
        return 0  # 成功
    else
        return 1  # 失败
    fi
}

check_file "test.txt"
if [ $? -eq 0 ]; then
    echo "文件存在"
else
    echo "文件不存在"
fi

# 使用echo返回数据
get_timestamp() {
    echo $(date +%s)
}

timestamp=$(get_timestamp)
echo "时间戳: $timestamp"
```

### 局部变量和作用域
```bash
# 使用local关键字
counter=0

increment() {
    local counter=10  # 局部变量
    ((counter++))
    echo "函数内: $counter"
}

increment
echo "函数外: $counter"  # 仍然是0
```

## 输入输出高级技巧

### 格式化输出
```bash
# 使用printf格式化输出
printf "%-10s %5d %8.2f\n" "Alice" 25 1234.56
printf "%-10s %5d %8.2f\n" "Bob" 30 567.89

# 输出结果:
# Alice         25  1234.56
# Bob           30   567.89

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'  # No Color

echo -e "${RED}错误信息${NC}"
echo -e "${GREEN}成功信息${NC}"
```

### 高级重定向
```bash
# 同时重定向stdout和stderr
command > output.log 2>&1
command &> output.log

# 重定向到多个文件
tee命令用法:
echo "测试内容" | tee file1.txt file2.txt

# 进程替换
diff <(sort file1.txt) <(sort file2.txt)

# 自定义文件描述符
exec 3> custom_output.txt
echo "自定义输出" >&3
exec 3>&-  # 关闭文件描述符
```

### 读取输入技巧
```bash
# 读取多行输入
read -d '' -r -a lines <<'EOF'
第一行内容
第二行内容
第三行内容
EOF

for line in "${lines[@]}"; do
    echo "行: $line"
done

# 超时读取
if read -t 5 -p "请在5秒内输入: " input; then
    echo "你输入了: $input"
else
    echo "时间到!"
fi
```

## 进程和作业控制

### 高级进程管理
```bash
# 后台进程管理
sleep 60 &
bg_pid=$!

# 检查进程是否存在
if kill -0 $bg_pid 2>/dev/null; then
    echo "进程还在运行"
else
    echo "进程已结束"
fi

# 等待进程结束
wait $bg_pid
echo "后台进程已完成"

# 超时等待
timeout 10s sleep 60
echo "命令超时"
```

### 信号处理高级用法
```bash
# 多个信号处理
cleanup() {
    echo "正在清理..."
    rm -f tempfile*.txt
    exit 0
}

trap cleanup INT TERM EXIT

# 忽略信号
trap '' INT  # 忽略Ctrl+C

# 重置信号处理
trap - INT   # 恢复默认信号处理
```

### 并行处理
```bash
# 使用&实现简单并行
for i in {1..5}; do
    (process_task $i) &
done

wait  # 等待所有后台进程完成
echo "所有任务完成"

# 使用xargs并行
echo {1..10} | xargs -n 1 -P 4 -I {} sh -c 'echo Processing {}; sleep 1'

# 使用GNU parallel（需要安装）
# parallel -j 4 process_task ::: {1..10}
```

## 文本处理高级技巧

### 高级sed用法
```bash
# 多命令执行
sed -e 's/foo/bar/g' -e '/baz/d' file.txt

# 脚本文件
cat > sed_script.sed <<'EOF'
s/old/new/g
/pattern/d
p  # 打印
EOF

sed -n -f sed_script.sed file.txt

# 保持空间操作
sed -n '1!G;h;$p' file.txt  # 反转文件行
```

### 高级awk用法
```bash
# 复杂数据处理
awk '
BEGIN { FS=","; OFS="|"; print "开始处理..." }
$3 > 100 { sum += $3; count++ }
END { 
    print "处理完成"
    print "总计:", sum
    print "平均值:", sum/count
}
' data.csv

# 数组使用
awk '{ count[$1]++ } END { for (word in count) print word, count[word] }' text.txt

# 自定义函数
awk '
function double(x) { return x * 2 }
{ print $1, double($1) }
' numbers.txt
```

### 正则表达式高级匹配
```bash
# 扩展正则表达式
grep -E 'pattern1|pattern2' file.txt

# Perl兼容正则表达式
grep -P '\d{3}-\d{2}-\d{4}' file.txt  # 匹配SSN

# 前后查找
grep -P 'foo(?=bar)' file.txt    # 后面是bar的foo
grep -P '(?<=foo)bar' file.txt   # 前面是foo的bar
```

## 错误处理和调试

### 严格模式
```bash
#!/bin/bash
set -euo pipefail  # 严格模式
# -e: 遇到错误退出
# -u: 遇到未定义变量退出
# -o pipefail: 管道中任何命令失败则整个管道失败

# 还可以添加
set -x  # 调试模式，显示执行的命令
# set -v  # 显示shell输入行
```

### 自定义错误处理
```bash
# 错误处理函数
error_exit() {
    echo "错误: $1" >&2
    exit 1
}

# 使用
[ -f "required.file" ] || error_exit "文件不存在"

# 带堆栈跟踪的错误处理
show_stack() {
    local i=0
    while caller $i; do
        ((i++))
    done
}

trap 'echo "错误发生在:"; show_stack' ERR
```

### 高级调试技巧
```bash
# 调试函数
debug() {
    if [ "$DEBUG" = "true" ]; then
        echo "DEBUG: $@" >&2
    fi
}

# 使用
DEBUG=true
debug "开始处理文件"

# 使用Bash调试器
# 在脚本开头添加: set -x
# 或使用: bash -x script.sh

# 使用trap调试
trap 'echo "在行号 $LINENO: $BASH_COMMAND"' DEBUG
```

## 性能优化

### 减少子进程调用
```bash
# 不好的做法: 多次调用子进程
for file in *.txt; do
    lines=$(wc -l < "$file")  # 每次循环都调用wc
    echo "$file: $lines lines"
done

# 好的做法: 使用内置命令
for file in *.txt; do
    lines=0
    while IFS= read -r; do
        ((lines++))
    done < "$file"
    echo "$file: $lines lines"
done
```

### 使用数组代替重复命令
```bash
# 不好的做法
result1=$(command1)
result2=$(command2)
result3=$(command3)

# 好的做法: 使用数组
commands=("command1" "command2" "command3")
results=()

for cmd in "${commands[@]}"; do
    results+=("$($cmd)")
done
```

### 使用here文档减少IO
```bash
# 使用here文档一次性处理
process_data() {
    cat <<'EOF' | process_command
数据行1
数据行2
数据行3
EOF
}

# 而不是多次调用
echo "数据行1" | process_command
echo "数据行2" | process_command
echo "数据行3" | process_command
```

## 安全最佳实践

### 输入验证和清理
```bash
# 验证数字
validate_number() {
    local num="$1"
    if ! [[ "$num" =~ ^[0-9]+$ ]]; then
        echo "错误: 请输入数字" >&2
        return 1
    fi
}

# 清理文件名
safe_filename() {
    local filename="$1"
    # 移除危险字符
    echo "$filename" | sed 's/[^a-zA-Z0-9._-]//g'
}

# 使用
filename=$(safe_filename "user input")
```

### 安全执行外部命令
```bash
# 不安全的方式
eval "$user_input"

# 安全的方式
# 使用数组传递参数
cmd=("ls" "-l")
if [ -n "$user_input" ]; then
    cmd+=("$user_input")
fi

"${cmd[@]}"

# 或者使用case语句
case "$user_input" in
    "safe_command1")
        safe_command1
        ;;
    "safe_command2")
        safe_command2
        ;;
    *)
        echo "无效命令"
        ;;
esac
```

### 权限管理
```bash
# 检查root权限
check_root() {
    if [ "$EUID" -ne 0 ]; then
        echo "请使用root权限运行" >&2
        exit 1
    fi
}

# 最小权限原则
run_as_user() {
    local user="$1"
    local cmd="$2"
    sudo -u "$user" bash -c "$cmd"
}
```

## 实用脚本模式

### 配置管理
```bash
# 配置文件读取
read_config() {
    local config_file="${1:-config.conf}"
    while IFS='=' read -r key value; do
        # 跳过注释和空行
        [[ "$key" =~ ^# ]] || [[ -z "$key" ]] && continue
        # 移除引号
        value=${value%\"}
        value=${value#\"}
        # 设置变量
        declare -g "${key}=${value}"
    done < "$config_file"
}

# 使用
read_config
echo "Host: $HOST"
echo "Port: $PORT"
```

### 日志记录框架
```bash
# 日志函数
log() {
    local level="$1"
    local message="$2"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    
    echo "[$timestamp] [$level] $message" >> "$LOG_FILE"
    
    if [ "$level" = "ERROR" ]; then
        echo "错误: $message" >&2
    fi
}

# 使用
log "INFO" "程序启动"
log "ERROR" "文件不存在"
```

### 命令行界面
```bash
# 命令行参数解析
while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            show_help
            exit 0
            ;;
        -v|--verbose)
            VERBOSE=true
            ;;
        -f|--file)
            FILE="$2"
            shift
            ;;
        *)
            echo "未知选项: $1"
            exit 1
            ;;
    esac
    shift
done
```

## 跨平台兼容性

### 检测操作系统
```bash
# 操作系统检测
case "$(uname -s)" in
    Linux*)
        OS="Linux"
        ;;
    Darwin*)
        OS="macOS"
        ;;
    CYGWIN*|MINGW*|MSYS*)
        OS="Windows"
        ;;
    *)
        OS="其他"
        ;;
esac

echo "操作系统: $OS"

# 平台特定命令
if [ "$OS" = "Linux" ]; then
    # Linux特定命令
    PACKAGE_MANAGER="apt-get"
elif [ "$OS" = "macOS" ]; then
    # macOS特定命令
    PACKAGE_MANAGER="brew"
fi
```

### 路径处理
```bash
# 标准化路径
normalize_path() {
    local path="$1"
    # 处理相对路径
    if [[ "$path" != /* ]]; then
        path="$PWD/$path"
    fi
    # 解析 .. 和 .
    path=$(cd "$(dirname "$path")" && pwd)/"$(basename "$path")"
    echo "$path"
}

# 使用
abs_path=$(normalize_path "../relative/path")
```

## 学习资源

- [Bash Hackers Wiki](https://wiki.bash-hackers.org/)
- [Advanced Bash-Scripting Guide](https://tldp.org/LDP/abs/html/)
- [Google Shell Style Guide](https://google.github.io/styleguide/shellguide.html)
- [ShellCheck](https://www.shellcheck.net/) - Shell脚本静态分析工具

## 最佳实践总结

1. **使用严格模式**: `set -euo pipefail`
2. **变量引用**: 总是引用变量 `"$var"`
3. **错误处理**: 使用trap和自定义错误函数
4. **代码注释**: 添加有意义的注释
5. **函数化**: 将功能封装成函数
6. **输入验证**: 验证所有用户输入
7. **性能考虑**: 减少子进程调用
8. **可移植性**: 考虑跨平台兼容性
9. **安全性**: 避免代码注入风险
10. **测试**: 编写测试用例验证功能