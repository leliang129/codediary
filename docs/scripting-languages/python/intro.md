---
title: Python脚本编程
slug: /scripting-languages/python/intro
---

# Python脚本编程

## Python简介

Python是一种高级、解释型的通用编程语言，以其简洁的语法和强大的功能而闻名。它广泛应用于Web开发、数据分析、人工智能、自动化脚本等领域。

### Python特点
- **简洁易读**: 语法清晰，类似英语
- **跨平台**: 支持Windows、Linux、macOS等
- **丰富的库**: 庞大的标准库和第三方库
- **面向对象**: 支持面向对象编程
- **动态类型**: 变量无需声明类型

## 基础语法

### Hello World
```python
# 最简单的Python程序
print("Hello, World!")
```

### 变量和数据类型
```python
# 变量定义
name = "Alice"
age = 25
height = 1.75
is_student = True

# 数据类型
print(type(name))      # <class 'str'>
print(type(age))       # <class 'int'>
print(type(height))    # <class 'float'>
print(type(is_student)) # <class 'bool'>
```

### 字符串操作
```python
# 字符串定义
s1 = '单引号字符串'
s2 = "双引号字符串"
s3 = """多行
字符串"""

# 字符串方法
name = "python programming"
print(name.upper())        # PYTHON PROGRAMMING
print(name.lower())        # python programming
print(name.title())        # Python Programming
print(name.replace('p', 'P')) # Python Programming
print(len(name))           # 18
```

### 列表（List）
```python
# 列表定义
fruits = ['apple', 'banana', 'cherry']
numbers = [1, 2, 3, 4, 5]

# 列表操作
fruits.append('orange')     # 添加元素
fruits.insert(1, 'grape')   # 插入元素
fruits.remove('banana')     # 删除元素
fruits.pop()                # 删除最后一个元素

# 列表切片
print(fruits[0])           # 第一个元素
print(fruits[-1])          # 最后一个元素
print(fruits[1:3])         # 切片操作
print(fruits[::-1])        # 反转列表
```

### 字典（Dictionary）
```python
# 字典定义
person = {
    'name': 'Alice',
    'age': 25,
    'city': 'New York'
}

# 字典操作
print(person['name'])      # 访问值
person['job'] = 'Engineer' # 添加键值对
person['age'] = 26         # 修改值
del person['city']         # 删除键值对

# 字典方法
print(person.keys())       # 所有键
print(person.values())     # 所有值
print(person.items())      # 所有键值对
```

## 控制流程

### 条件语句
```python
# if-elif-else
age = 18

if age < 13:
    print("儿童")
elif age < 18:
    print("青少年")
elif age < 60:
    print("成年人")
else:
    print("老年人")

# 三元运算符
status = "成年" if age >= 18 else "未成年"
print(status)
```

### 循环语句
```python
# for循环
fruits = ['apple', 'banana', 'cherry']

for fruit in fruits:
    print(fruit)

# 带索引的循环
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")

# while循环
count = 0
while count < 5:
    print(count)
    count += 1

# 循环控制
for i in range(10):
    if i == 3:
        continue    # 跳过本次循环
    if i == 7:
        break       # 退出循环
    print(i)
```

## 函数

### 函数定义
```python
# 简单函数
def greet(name):
    """问候函数"""
    return f"Hello, {name}!"

print(greet("Alice"))

# 默认参数
def power(base, exponent=2):
    return base ** exponent

print(power(3))      # 9
print(power(3, 3))   # 27

# 可变参数
def sum_numbers(*args):
    return sum(args)

print(sum_numbers(1, 2, 3, 4))  # 10
```

### Lambda函数
```python
# 匿名函数
square = lambda x: x ** 2
print(square(5))  # 25

# 用于排序
fruits = ['apple', 'banana', 'cherry', 'date']
fruits.sort(key=lambda x: len(x))
print(fruits)  # ['date', 'apple', 'banana', 'cherry']
```

## 文件操作

### 读写文件
```python
# 写入文件
with open('example.txt', 'w') as f:
    f.write("Hello, World!\n")
    f.write("This is a test file.\n")

# 读取文件
with open('example.txt', 'r') as f:
    content = f.read()
    print(content)

# 逐行读取
with open('example.txt', 'r') as f:
    for line in f:
        print(line.strip())

# 追加内容
with open('example.txt', 'a') as f:
    f.write("Appended content.\n")
```

### CSV文件处理
```python
import csv

# 写入CSV
with open('data.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(['Name', 'Age', 'City'])
    writer.writerow(['Alice', '25', 'New York'])
    writer.writerow(['Bob', '30', 'London'])

# 读取CSV
with open('data.csv', 'r') as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)
```

## 错误处理

### 异常处理
```python
try:
    # 可能出错的代码
    result = 10 / 0
except ZeroDivisionError:
    print("不能除以零!")
except Exception as e:
    print(f"发生错误: {e}")
else:
    print("没有错误发生")
finally:
    print("无论是否出错都会执行")

# 自定义异常
class MyError(Exception):
    pass

def check_age(age):
    if age < 0:
        raise MyError("年龄不能为负数")
    return age
```

## 模块和包

### 导入模块
```python
# 导入整个模块
import math
print(math.sqrt(16))  # 4.0

# 导入特定函数
from math import sqrt, pi
print(sqrt(9))        # 3.0
print(pi)             # 3.141592653589793

# 别名导入
import numpy as np
import pandas as pd
```

### 创建模块
```python
# mymodule.py
def greet(name):
    return f"Hello, {name}!"

PI = 3.14159

# 主程序中使用
# from mymodule import greet, PI
# print(greet("Alice"))
# print(PI)
```

## 常用标准库

### os模块 - 操作系统接口
```python
import os

# 文件和目录操作
print(os.getcwd())          # 当前工作目录
os.mkdir('new_dir')         # 创建目录
os.listdir('.')             # 列出目录内容
os.rename('old.txt', 'new.txt')  # 重命名文件

# 环境变量
print(os.environ.get('HOME'))
print(os.environ.get('PATH'))
```

### sys模块 - 系统相关功能
```python
import sys

# 命令行参数
print(sys.argv)            # 命令行参数列表

# 退出程序
if len(sys.argv) < 2:
    print("Usage: python script.py <name>")
    sys.exit(1)

# Python路径
print(sys.path)
```

### datetime模块 - 日期时间
```python
from datetime import datetime, date, timedelta

# 当前时间
now = datetime.now()
print(now)
print(now.strftime("%Y-%m-%d %H:%M:%S"))

# 日期计算
today = date.today()
tomorrow = today + timedelta(days=1)
print(f"Today: {today}, Tomorrow: {tomorrow}")

# 时间差
delta = datetime(2024, 1, 1) - datetime(2023, 1, 1)
print(delta.days)  # 365
```

### json模块 - JSON处理
```python
import json

# 字典转JSON
data = {
    'name': 'Alice',
    'age': 25,
    'cities': ['New York', 'London']
}

json_str = json.dumps(data, indent=2)
print(json_str)

# JSON转字典
parsed_data = json.loads(json_str)
print(parsed_data['name'])

# 文件操作
with open('data.json', 'w') as f:
    json.dump(data, f, indent=2)

with open('data.json', 'r') as f:
    loaded_data = json.load(f)
```

## 实用脚本示例

### 文件批量重命名
```python
import os
import re

# 批量重命名文件
def batch_rename(directory, pattern, replacement):
    for filename in os.listdir(directory):
        if re.search(pattern, filename):
            new_name = re.sub(pattern, replacement, filename)
            old_path = os.path.join(directory, filename)
            new_path = os.path.join(directory, new_name)
            os.rename(old_path, new_path)
            print(f"Renamed: {filename} -> {new_name}")

# 使用示例
# batch_rename('.', r'\d+', 'NUM')
```

### 日志分析脚本
```python
# 分析日志文件
def analyze_logs(log_file):
    error_count = 0
    warning_count = 0
    
    with open(log_file, 'r') as f:
        for line in f:
            if 'ERROR' in line:
                error_count += 1
            elif 'WARNING' in line:
                warning_count += 1
    
    print(f"Errors: {error_count}")
    print(f"Warnings: {warning_count}")
    return error_count, warning_count

# 使用示例
# errors, warnings = analyze_logs('app.log')
```

### 网络请求脚本
```python
import requests

# 简单的HTTP请求
def fetch_url(url):
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()  # 检查HTTP错误
        return response.text
    except requests.RequestException as e:
        print(f"请求失败: {e}")
        return None

# 使用示例
# content = fetch_url('https://example.com')
# if content:
#     print(content[:200])
```

## 调试技巧

### pdb调试器
```python
# 插入断点
import pdb

def complex_function():
    pdb.set_trace()  # 在这里设置断点
    # 复杂的代码...

# 命令行调试
# python -m pdb script.py
```

### 日志调试
```python
import logging

# 配置日志
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    filename='app.log'
)

# 使用日志
logging.debug('调试信息')
logging.info('一般信息')
logging.warning('警告信息')
logging.error('错误信息')
```

## 性能优化

### 使用生成器
```python
# 生成器函数
def read_large_file(file_path):
    with open(file_path, 'r') as f:
        for line in f:
            yield line.strip()

# 使用生成器
for line in read_large_file('large_file.txt'):
    process_line(line)  # 逐行处理，节省内存
```

### 列表推导式
```python
# 传统的循环
squares = []
for x in range(10):
    squares.append(x**2)

# 列表推导式
squares = [x**2 for x in range(10)]

# 带条件的推导式
even_squares = [x**2 for x in range(10) if x % 2 == 0]
```

## 学习资源

- [Python官方文档](https://docs.python.org/3/)
- [Real Python教程](https://realpython.com/)
- [Python Crash Course](https://nostarch.com/pythoncrashcourse2e)
- [Awesome Python](https://github.com/vinta/awesome-python)

## 最佳实践

1. **遵循PEP 8**: Python代码风格指南
2. **使用虚拟环境**: 隔离项目依赖
3. **编写文档字符串**: 为函数和模块添加文档
4. **单元测试**: 使用unittest或pytest进行测试
5. **错误处理**: 合理使用try-except块
6. **代码复用**: 将功能封装成函数和模块
7. **性能考虑**: 避免不必要的计算和内存使用